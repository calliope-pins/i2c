
namespace i2c { // text.ts



    // ========== group="25 LED-Matrix" subcategory=Text

    let n_showString = ""

    //% group="25 LED-Matrix" subcategory=Text
    //% block="zeige Text wenn geändert %text" weight=8
    //% text.shadow=i2c_text
    export function zeigeText(text: any) {
        let tx = convertToText(text)
        if (n_showString != tx) {
            n_showString = tx
            basic.showString(tx)
        }
    }

    // ========== group="Text (string)"

    //% blockId=i2c_text
    //% group="Text (string)" subcategory=Text
    //% block="%s" weight=9
    export function i2c_text(s: string): string { return s }




    //% group="Text (string)" subcategory=Text
    //% block="Zahl %n → Text || Kommastellen %kommastellen" weight=7
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

    //% group="Text (string)" subcategory=Text
    //% block="formatiere %pText Länge %pLength %pFormat" weight=6
    //% pText.shadow=i2c_text
    export function formatText(pText: any, pLength: number, pFormat: eAlign) {
        let text: string = convertToText(pText)
        if (text.length > pLength) { return text.substr(0, pLength) }
        else if (text.length < pLength && pFormat == eAlign.left) { return text + replicate(" ", pLength - text.length) }
        else if (text.length < pLength && pFormat == eAlign.right) { return replicate(" ", pLength - text.length) + text }
        else { return text }
    }

    //% group="Text (string)" subcategory=Text
    //% block="wiederhole Zeichen %pChar Länge %pLength" weight=5
    export function replicate(pChar: string, pLength: number) {
        let s: string = ""
        if (pChar.length > 0 && pLength > 0) {
            while (s.length < pLength) {
                s = s + pChar
            }
        }
        return s
    }



} // text.ts
