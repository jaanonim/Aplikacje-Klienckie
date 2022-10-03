export function degToRad(deg: number) {
    return deg * (Math.PI / 180);
}

export function map(
    v: number,
    minIn: number,
    maxIn: number,
    minOut: number,
    maxOut: number
): number {
    return ((v - minIn) * (maxOut - minOut)) / (maxIn - minIn) + minIn;
}

export function clamp(v: number, min: number = 0, max: number = 1) {
    if (v < min) v = min;
    if (v > max) v = max;
    return v;
}

export function getRandom(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)];
}
