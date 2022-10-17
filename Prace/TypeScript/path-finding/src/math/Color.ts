import { clamp, map } from "./Math";

export function grayscale(
    _target: Color,
    _name: string,
    descriptor: PropertyDescriptor
) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const t = this as Color;
        const v = t.b + t.r + t.g / (3 * 255);
        return originalMethod.apply(new Color(v, v, v, t.a), args);
    };
    return descriptor;
}

export default class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    static get red() {
        return new Color(255, 0, 0, 255);
    }
    static get green() {
        return new Color(0, 255, 0, 255);
    }
    static get blue() {
        return new Color(0, 0, 255, 255);
    }
    static get white() {
        return new Color(255, 255, 255, 255);
    }
    static get black() {
        return new Color(255, 255, 255, 255);
    }
    static get yellow() {
        return new Color(255, 255, 0, 255);
    }
    static get magenta() {
        return new Color(255, 0, 255, 255);
    }
    static get cyan() {
        return new Color(0, 255, 255, 255);
    }

    static get gray() {
        return new Color(100, 100, 100, 255);
    }

    static get opaque() {
        return new Color(0, 0, 0, 0);
    }

    static random() {
        return new Color(
            Math.round((Math.random() * 255) / 25) * 25,
            Math.round((Math.random() * 255) / 25) * 25,
            Math.round((Math.random() * 255) / 25) * 25,
            255
        );
    }

    /**
     * Create new color
     * @param r red value in range 0-255
     * @param g green value in range 0-255
     * @param b blue value in range 0-255
     * @param a opacity value in range 0-255
     */
    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
        this.r = clamp(r, 0, 255);
        this.g = clamp(g, 0, 255);
        this.b = clamp(b, 0, 255);
        this.a = clamp(a, 0, 255);
    }

    verifyValue(v: number) {
        return v <= 255 && v >= 0;
    }

    _valueToHex(v: number) {
        var hex = v.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    getHex() {
        return (
            "#" +
            this._valueToHex(this.r) +
            this._valueToHex(this.g) +
            this._valueToHex(this.b)
        );
    }

    /**
     * @todo add decorator
     * @returns string for css
     */
    //@grayscale
    getStringRGBA() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    copy() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    /** Multiply two colors
     * @param can be Color or number
     * @return modified color
     */
    multiply(v: number | Color) {
        if (v instanceof Color) {
            this.r = map(this.r * v.r, 0, 255, 0, 255);
            this.g = map(this.g * v.g, 0, 255, 0, 255);
            this.b = map(this.b * v.b, 0, 255, 0, 255);
            this.a = map(this.a * v.a, 0, 255, 0, 255);
            return this;
        } else {
            this.r *= v;
            this.g *= v;
            this.b *= v;
            return this;
        }
    }

    /** Make colors value form 0-1 instead of 0-255*/
    normalize() {
        this.r /= 255;
        this.g /= 255;
        this.b /= 255;
        this.a /= 255;
        return this;
    }

    /** Add color to color and clamp values */
    add(v: Color) {
        this.r = clamp(this.r + v.r, 0, 255);
        this.g = clamp(this.g + v.g, 0, 255);
        this.b = clamp(this.b + v.b, 0, 255);
        this.a = clamp(this.a + v.a, 0, 255);
        return this;
    }

    /** Check if colors are equals */
    equals(v: Color) {
        return v.r == this.r && v.g == this.g && v.b == this.b && v.a == this.a;
    }
}
