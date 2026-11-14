
namespace i2c { // text.ts



    // ========== group="Text (string)"

    //% blockId=bit_text
    //% group="Text (string)" subcategory=Text
    //% block="%s" weight=9
    export function bit_text(s: string): string { return s }

    //% group="Text (string)" subcategory=Text
    //% block="wandle %pInt um in Text %plLength" weight=8
    //% pLength.defl=bit.eLength.HEX_FF
    export function formatNumber(pInt: number, pLength: eLength) {
        let ht: string = ""
        let hi: number = Math.trunc(pInt)
        /* 
                if (hi < 0) { // negative number behandeln, links unerwünschte FF abschneiden
                    hi = ~(Math.abs(hi) - 1)
                    if (pLength == eLength.HEX_F || pLength == eLength.BIN_1111) { hi = hi & 0xF }
                    else if (pLength == eLength.HEX_FF || pLength == eLength.BIN_11111111) { hi = hi & 0xFF }
                    else if (pLength == eLength.HEX_FFF || pLength == eLength.BIN_12_) { hi = hi & 0xFFF }
                    else if (pLength == eLength.HEX_FFFF || pLength == eLength.BIN_16_) { hi = hi & 0xFFFF }
                    else if (pLength == eLength.HEX_FFFFFF) { hi = hi & 0xFFFFFF }
                    else if (pLength == eLength.HEX_FFFFFFFF) { hi = hi & 0xFFFFFFFF }
                    else if (pLength == eLength.toString) { }
                    else { hi = hi & 0xFF } // Standard 8 Bit
                }
         */
        if (pLength < eLength.BIN_) {
            // HEX pLength = 0, 1, 2, 3, 4, 6, 8
            while (hi > 0) {
                ht = "0123456789ABCDEF".charAt(hi % 16) + ht
                //hi = hi >> 4 // bei 32 bit number >= 0x80000000 kommt 0 raus
                hi = Math.trunc(hi / 16)
            }
            // kürzere Strings mit "0" verlängern, längere so lassen
            if (ht.length < pLength) { ht = replicate("0", pLength - ht.length) + ht }
        } else if (pLength == eLength.toString) {
            // toString pLength = 0x1000
            ht = pInt.toString()
        } else {
            // BIN
            while (hi > 0) {
                ht = "01".charAt(hi % 2) + ht
                hi = hi >> 1
            }
            // kürzere Strings mit "0" verlängern, längere so lassen
            // BIN_ = 0
            if (ht.length < pLength - eLength.BIN_) { ht = replicate("0", pLength - eLength.BIN_ - ht.length) + ht }
        }
        return ht
    }

    //% group="Text (string)" subcategory=Text
    //% block="wandle %pNumber um in HEX %pFormat" weight=7
    //% pFormat.defl=NumberFormat.UInt16BE
    export function formatHex(pNumber: number, pFormat: NumberFormat) {
        let bu = Buffer.create(Buffer.sizeOfNumberFormat(pFormat))
        bu.setNumber(pFormat, 0, pNumber)
        return bu.toHex()
    }

    //% group="Text (string)" subcategory=Text
    //% block="format %pText length %pLength align %pFormat" weight=6
    //% pText.shadow="bit_text"
    export function formatText(pText: any, pLength: number, pFormat: eAlign) {
        let text: string = convertToText(pText)
        if (text.length > pLength) { return text.substr(0, pLength) }
        else if (text.length < pLength && pFormat == eAlign.left) { return text + replicate(" ", pLength - text.length) }
        else if (text.length < pLength && pFormat == eAlign.right) { return replicate(" ", pLength - text.length) + text }
        else { return text }
    }

    //% group="Text (string)" subcategory=Text
    //% block="wiederhole Char %pChar length %pLength" weight=5
    export function replicate(pChar: string, pLength: number) {
        let s: string = ""
        if (pChar.length > 0 && pLength > 0) {
            while (s.length < pLength) {
                s = s + pChar
            }
        }
        return s
    }


    //% group="String" subcategory=Text
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


} // text.ts
