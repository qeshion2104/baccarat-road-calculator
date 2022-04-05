
// return number from min to max (include max)
export function getRandomInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max + 1 - min))
}