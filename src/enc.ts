//Если нужно сменить алгоритм шифрования - следует заменить его в нижестоящем import
import {enc as CTSEnc, AES as cipher} from "crypto-ts"
import { CipherParams } from "crypto-ts/src/lib/CipherParams"
import { WordArray } from "crypto-ts/src/lib/WordArray"

namespace enc{
    export function encrypt(decrypted: string | WordArray, key: string | WordArray){
        return cipher.encrypt(decrypted, key).iv.toString()
    }

    export function decrypt(encrypted: string | CipherParams, key: string | WordArray){
        return cipher.decrypt(encrypted, key).toString(CTSEnc.Utf8)
    }
}

export default enc

