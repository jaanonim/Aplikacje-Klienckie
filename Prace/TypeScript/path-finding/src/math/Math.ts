export function degToRad(deg: number) {
    return deg * (Math.PI / 180);
}

/**
 * Scale value from original range to new range
 * @param v
 * @param minIn
 * @param maxIn
 * @param minOut
 * @param maxOut
 * @returns
 */
export function map(
    v: number,
    minIn: number,
    maxIn: number,
    minOut: number,
    maxOut: number
): number {
    return ((v - minIn) * (maxOut - minOut)) / (maxIn - minIn) + minIn;
}
/**
 * Clamp value between two numbers
 * @param v
 * @param min
 * @param max
 * @returns
 */
export function clamp(v: number, min: number = 0, max: number = 1) {
    if (v < min) v = min;
    if (v > max) v = max;
    return v;
}
/**
 * Return random value from table
 * @param array table
 * @returns random value from table
 */
export function getRandom(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)];
}
