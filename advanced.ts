// Gib deinen Code hier ein
namespace i2c // i2c.ts


{ 

    // ========== group="Kommentar" advanced=true

  
    //% group="Kommentar" advanced=true
    //% block="// %text" weight=9
    //% text.shadow="i2c_text"
    export function comment(text: any): void { }



    // ========== group="Logik (boolean)" subcategory=Funktionen

    //% group="Logik (boolean)" advanced=true
    //% block="Simulator" weight=7
    export function simulator() {
        return "€".charCodeAt(0) == 8364
    }

    //% group="Logik (boolean)" advanced=true
    //% block="%i0 zwischen %i1 und %i2" weight=6
    export function between(i0: number, i1: number, i2: number): boolean { return (i0 >= i1 && i0 <= i2) }

    //% group="Logik (boolean)" advanced=true
    //% block="%b if true %a1 if false %a2" weight=5
    export function iif(b: boolean, a1: any, a2: any) {
        return b ? a1 : a2
    }

    //% group="Logik (boolean)" advanced=true
    //% block="%variable === undefined" weight=3
    export function isundefined(variable: any): boolean {
        return (variable === undefined)
    }

    //% group="Logik (boolean)" advanced=true
    //% block="Number.isNaN(%variable)" weight=2
    export function isnan(variable: any): boolean {
        return Number.isNaN(variable)
    }



    // ========== group="Zahl (number)" subcategory=Funktionen


    //% group="Zahl (number)" advanced=true
    //% block="charCodeAt %text index %index" weight=16
    export function charCodeAt(text: string, index: number) {
        return text.charCodeAt(index)
    }

    //% group="Zahl (number)" advanced=true
    //% block="parseInt %text || radix %radix" weight=14
    //% radix.min=2 radix.max=16 radix.defl=10
    export function parseint(text: string, radix?: number) {
        return parseInt(text, radix)
    }

    //% group="Zahl (number)" advanced=true
    //% block="runden %x Kommastellen %digits" weight=12
    //% digits.min=0 digits.max=4 digits.defl=2
    export function roundWithPrecision(x: number, digits: number) { return Math.roundWithPrecision(x, digits) }


    //% group="Zahl (number)" advanced=true
    //% block="min %x1 %x2 || Grenzwert %grenzwert" weight=11
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




    // ========== group="Logik (number)"

    export enum eBit {
        //% block="a & b AND"
        AND,
        //% block="a | b OR"
        OR,
        //% block="a ^ b XOR"
        XOR,
        //% block="(~a) & b (NOT a) AND b"
        NOT_AND,
        //% block="a << b"
        LEFT,
        //% block="a >> b"
        RIGHT,
        //% block="a >>> b"
        RIGHTZ
    }

    //% group="Zahl (number)" advanced=true
    //% block="Bitweise %a %operator %b" weight=4
    export function bitwise(a: number, operator: eBit, b: number): number {
        switch (operator) {
            case eBit.AND: { return a & b }
            case eBit.OR: { return a | b }
            case eBit.XOR: { return a ^ b }
            case eBit.NOT_AND: { return (~a) & b }
            case eBit.LEFT: { return a << b }
            case eBit.RIGHT: { return a >> b }
            case eBit.RIGHTZ: { return a >>> b }
            default: { return a }
        }
    }

    //% group="Zahl (number)" advanced=true
    //% block="Bitweise NOT %a" weight=3
    export function not(a: number): number { return ~a }


    //% group="Zahl (number)" advanced=true
    //% block="Vorzeichen %i Bits 2** %exp" weight=2
    //% exp.defl=7
    export function sign(i: number, exp: number): number {
        //i = i2c.HEXe(i2c.H4.x40, i2c.H0.x1)
        if (i < 2 ** exp) { // 2**6 = 64 = 0x40
            return i
        } else {
            i = ~i // Bitwise Not
            i = i & ((2 ** exp) - 1) // 63 = 0x3F alle Bits links löschen
            i += 1
            return -i
        }
    }






    // ========== group="25 LED-Matrix" advanced=true

    //% group="25 LED-Matrix" advanced=true
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
