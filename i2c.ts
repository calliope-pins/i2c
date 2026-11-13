
//% color=#007FFF icon="\uf1e6" block="i2c" weight=24
namespace i2c
/*


*/

{
    //% group="Funktionen" subcategory="i2c Scan"
    //% block="%i0 zwischen %i1 und %i2" weight=4
    export function between(i0: number, i1: number, i2: number): boolean { return (i0 >= i1 && i0 <= i2) }

    //% group="Funktionen" subcategory="i2c Scan"
    //% block="%text .charCodeAt (index %index)" weight=3
    export function charCodeAt(text: string, index: number) {
        return text.charCodeAt(index)
    }



}