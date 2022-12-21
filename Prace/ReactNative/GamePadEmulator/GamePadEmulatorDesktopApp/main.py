import asyncio
import socket

import socketio
import vgamepad as vg
from aiohttp import web
from textual.app import App, ComposeResult
from textual.containers import Container, Horizontal
from textual.reactive import reactive
from textual.screen import Screen
from textual.widget import Widget
from textual.widgets import Header, Footer, Label, Button
from textual_qrcode import QRCode

sio = socketio.AsyncServer(async_mode='aiohttp')
webApp = web.Application()
sio.attach(webApp)
sensitivity = 2
gamepad = None
ground = (0, 0, 0)
orientation = True
controller = None


def get_ip():
    hostname = socket.gethostname()
    return socket.gethostbyname(hostname)


class StatusScreen(Screen):
    def compose(self) -> ComposeResult:
        yield Header(show_clock=True)
        yield Horizontal(Button("Low", id="lo"),
                         Button("Medium", id="md", classes="selected"),
                         Button("High", id="hi"))
        yield Container(
            Label("Values"),
            Position(id="pos"), id="posC")
        yield Container(
            Label("Reference"),
            Position(id="rel"), id="relC")
        yield Footer()

    def pop_screen(self):
        self.app.pop_screen()

    def update_pos(self, pos):
        self.query_one("#pos", Position).pos = pos

    def update_rel(self, rel):
        self.query_one("#rel", Position).pos = rel

    def on_button_pressed(self, event: Button.Pressed) -> None:
        global sensitivity
        self.query(Button).remove_class("selected")
        event.button.add_class("selected")
        if event.button.id == "lo":
            sensitivity = 1
        if event.button.id == "md":
            sensitivity = 2
        if event.button.id == "hi":
            sensitivity = 3


screen = StatusScreen()


class Position(Widget):
    pos = reactive((0, 0, 0))

    def render(self) -> str:
        try:
            x, y, z = self.pos
        except:
            return f"{self.pos}"
        return f"x: {x}\ny: {y}\nz: {z}"


class App(App):
    CSS_PATH = "style.css"
    TITLE = "GamePadEmulator 3000"

    async def on_mount(self):
        runner = web.AppRunner(webApp)
        await runner.setup()
        site = web.TCPSite(runner, host="0.0.0.0", port=3000)
        await site.start()

    def compose(self) -> ComposeResult:
        yield Header(show_clock=True)
        yield QRCode(f'gm://{get_ip()}:3000/', id="qr")
        yield Label(id="info")
        yield Label(id="idk")
        yield Footer()

    def on_qrcode_encoded(self, _: QRCode.Encoded) -> None:
        """Respond to the QR code being encoded fine."""
        label = self.query_one("#info", Label)
        label.update("Waiting for connection...")
        label.set_class(False, "error")

    def on_qrcode_error(self, event: QRCode.Error) -> None:
        """Respond to the QR code having a problem."""
        label = self.query_one("#info", Label)
        label.update(f"Error: {event.error!r}")
        label.set_class(True, "error")

    def change_screen(self):
        global screen
        screen = StatusScreen()
        self.push_screen(screen)


app = App()


def game_pad_callback(client, target, large_motor, small_motor, led_number, user_data):
    print(large_motor, small_motor)
    asyncio.run(sio.emit('haptic', {'large_motor': large_motor, 'small_motor': small_motor}))


def clap(v, min_v, max_v):
    return max(min(v, max_v), min_v)


@sio.event
async def pos(sid, data):
    global sensitivity
    rel_x, rel_y, rel_z = ground
    x = round((float(data['x']) - rel_x) * 100) / 100 * sensitivity
    y = round((float(data['y']) - rel_y) * 100) / 100 * sensitivity
    z = round((float(data['z']) - rel_z) * 100) / 100 * sensitivity
    print(clap(x, -1, 1), clap(y, -1, 1), clap(z, -1, 1))

    global gamepad
    global orientation
    if orientation:
        gamepad.right_joystick_float(x_value_float=clap(y, -1, 1), y_value_float=clap(-x, -1, 1))
        gamepad.left_joystick_float(x_value_float=clap(y, -1, 1), y_value_float=clap(-x, -1, 1))

    else:
        gamepad.right_joystick_float(x_value_float=clap(x, -1, 1), y_value_float=clap(y, -1, 1))
        gamepad.left_joystick_float(x_value_float=clap(x, -1, 1), y_value_float=clap(y, -1, 1))
    gamepad.update()

    screen.update_pos((x, y, z))

    await sio.emit('pos', {"x": float(data['x']), "y": float(data['y']), "z": float(data['z'])})


@sio.event
def button(sid, data):
    index = data["id"] - 1
    if index >= 4:
        asyncio.ensure_future(_dpad(index - 4))
    else:
        asyncio.ensure_future(_button(index))


async def _button(index):
    BUTTONS = [vg.DS4_BUTTONS.DS4_BUTTON_TRIANGLE, vg.DS4_BUTTONS.DS4_BUTTON_SQUARE, vg.DS4_BUTTONS.DS4_BUTTON_CIRCLE,
               vg.DS4_BUTTONS.DS4_BUTTON_CROSS]
    global gamepad
    gamepad.press_button(button=BUTTONS[index])
    gamepad.update()
    await asyncio.sleep(0.1)
    gamepad.release_button(button=BUTTONS[index])
    gamepad.update()


async def _dpad(index):
    BUTTONS = [vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_NORTH, vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_WEST,
               vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_EAST, vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_SOUTH]
    global gamepad
    gamepad.directional_pad(direction=BUTTONS[index])
    gamepad.update()
    await asyncio.sleep(0.1)
    gamepad.directional_pad(direction=vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_NONE)
    gamepad.update()


@sio.event
def orient(sid, data):
    global orientation
    global ground
    ground = (0, 0, 0)
    screen.update_rel(ground)
    orientation = data["portrait"]


@sio.event
def calibrate(sid, data):
    global ground
    ground = (float(data['x']), float(data['y']), float(data['z']))
    screen.update_rel(ground)


@sio.event
def con(sid, data):
    global controller
    global gamepad
    global orientation
    global ground
    global sensitivity
    if controller is None:
        controller = sid
        sensitivity = 2
        orientation = True
        ground = (0, 0, 0)
        gamepad = vg.VDS4Gamepad()
        gamepad.register_notification(callback_function=game_pad_callback)
        app.change_screen()
    else:
        sio.disconnect(sid)


@sio.event
def connect(sid, environ):
    print("Connected ", sid)


@sio.event
def disconnect(sid):
    print("Disconnect ", sid)
    global gamepad
    global controller
    if controller == sid:
        controller = None
        gamepad = None
        screen.pop_screen()


async def main():
    await app.run_async()


if __name__ == "__main__":
    asyncio.run(main())
