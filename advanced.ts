// Gib deinen Code hier ein
namespace i2c // i2c.ts


{ 

    // ========== group="Kommentar" advanced=true

    //% blockId=pins_text block="%s" blockHidden=true
    export function pins_text(s: string): string { return s }

    //% group="Kommentar" advanced=true
    //% block="// %text" weight=9
    //% text.shadow="pins_text"
    export function comment(text: any): void { }



    // ========== group="Logik" subcategory=Funktionen

    //% group="Logik" advanced=true
    //% block="Simulator" weight=7
    export function simulator() {
        return "€".charCodeAt(0) == 8364
    }

    //% group="Logik" advanced=true
    //% block="%i0 zwischen %i1 und %i2" weight=6
    export function between(i0: number, i1: number, i2: number): boolean { return (i0 >= i1 && i0 <= i2) }

    //% group="Logik" advanced=true
    //% block="%b if true %a1 if false %a2" weight=5
    export function iif(b: boolean, a1: any, a2: any) {
        return b ? a1 : a2
    }

    //% group="Logik" advanced=true
    //% block="%variable === undefined" weight=3
    export function isundefined(variable: any): boolean {
        return (variable === undefined)
    }

    //% group="Logik" advanced=true
    //% block="Number.isNaN(%variable)" weight=2
    export function isnan(variable: any): boolean {
        return Number.isNaN(variable)
    }



    // ========== group="Mathematik" subcategory=Funktionen


    //% group="Mathematik" advanced=true
    //% block="charCodeAt %text index %index" weight=6
    export function charCodeAt(text: string, index: number) {
        return text.charCodeAt(index)
    }

    //% group="Mathematik" advanced=true
    //% block="parseInt %text || radix %radix" weight=4
    //% radix.min=2 radix.max=16 radix.defl=10
    export function parseint(text: string, radix?: number) {
        return parseInt(text, radix)
    }

    //% group="Mathematik" advanced=true
    //% block="roundWithPrecision number %x digits %digits" weight=2
    //% digits.min=0 digits.max=4 digits.defl=2
    export function roundWithPrecision(x: number, digits: number) { return Math.roundWithPrecision(x, digits) }


    //% group="Mathematik" advanced=true
    //% block="min %x1 %x2 || Grenzwert %grenzwert" weight=1
    //% grenzwert.defl=4096
    export function minx(x1: number, x2: number, grenzwert = 4096) {
        let d1 = x1 - x2
        let d2 = (x1 + grenzwert) - x2
        let d3 = x1 - (x2 + grenzwert)
        if (Math.abs(d1) <= Math.abs(d2) && Math.abs(d1) <= Math.abs(d3))
            return d1
        else if (Math.abs(d2) <= Math.abs(d1) && Math.abs(d2) <= Math.abs(d3))
            return d2
        else
            return d3
    }


    //% group="String" advanced=true
    //% block="Zahl %n → Text || Kommastellen %kommastellen" weight=6
    //% kommastellen.min=0 kommastellen.max=4
    export function toText(n: number, kommastellen?: number): string {
        let t = n.toString()
        if (kommastellen > 0 && kommastellen <= 4) {
            let i = t.indexOf(".")
            if (i == -1) { // i=-1 Zahl enthält kein Komma
                t += "."
                i = t.indexOf(".")
            }
            t = (t + "0000").substr(0, i + 1 + kommastellen)
        }
        return t.replace(".", ",")
    }


    //% group="String" advanced=true
    //% block="Zahl %n → HEX || %h" weight=5
    //% h.defl=h
    export function toHex(n: number, h?: string): string {
        let hex = ""
        do {
            hex = "0123456789AbCdEF".charAt(n % 16) + hex
            n >>= 4 //   n = Math.idiv(n, 16) // Integer-Division in MakeCode
        } while (n > 0)
        if (h)
            return h + hex
        else
            return hex
    }

    //% group="String" advanced=true
    //% block="Zahl %n → BIN || %b" weight=4
    //% b.defl=b
    export function toBin(n: number, b?: string): string {
        let bin = ""
        do {
            bin = "01".charAt(n % 2) + bin
            n >>= 1
        } while (n > 0)
        if (b)
            return b + bin
        else
            return bin
    }




    // ========== group="25 LED Matrix" advanced=true

    //% group="25 LED Matrix" advanced=true
    //% block="25 LED x→0..4 %x n↑0..31 %n" weight=5
    //% x.min=0 x.max=4 n.min=0 n.max=31
    export function plot25LED(x: number, n: number) {
        if (between(x, 0, 4)) {
            if ((n & 1) == 1) { led.plot(x, 4) } else { led.unplot(x, 4) }
            n >>= 1
            if ((n & 1) == 1) { led.plot(x, 3) } else { led.unplot(x, 3) }
            n >>= 1
            if ((n & 1) == 1) { led.plot(x, 2) } else { led.unplot(x, 2) }
            n >>= 1
            if ((n & 1) == 1) { led.plot(x, 1) } else { led.unplot(x, 1) }
            n >>= 1
            if ((n & 1) == 1) { led.plot(x, 0) } else { led.unplot(x, 0) }

            /*   if (y.length > 0 && y.get(0)) { led.plot(x, 4) } else { led.unplot(x, 4) }
              if (y.length > 1 && y.get(1)) { led.plot(x, 3) } else { led.unplot(x, 3) }
              if (y.length > 2 && y.get(2)) { led.plot(x, 2) } else { led.unplot(x, 2) }
              if (y.length > 3 && y.get(3)) { led.plot(x, 1) } else { led.unplot(x, 1) }
              if (y.length > 4 && y.get(4)) { led.plot(x, 0) } else { led.unplot(x, 0) } */
        }
    }




} // i2c.ts
