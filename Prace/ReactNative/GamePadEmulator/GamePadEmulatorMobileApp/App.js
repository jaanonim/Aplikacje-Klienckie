import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GamePad from "./screens/GamePad";
import QrScanner from "./screens/QrScanner";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="QrScanner"
                    component={QrScanner}
                    options={{ title: "GamePadEmulator 3000" }}
                />
                <Stack.Screen
                    name="GamePad"
                    component={GamePad}
                    options={{ title: "GamePadEmulator 3000" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
