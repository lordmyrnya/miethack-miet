import {
    scryptSync,
    randomFillSync,
    createCipheriv,
    createDecipheriv
} from 'crypto';
  
import { Buffer } from 'node:buffer';

const defaultAlgorithm = "aes-256-cbc"
  
namespace enc{
    export function encrypt(text:string, password: string, algorithm: string = defaultAlgorithm, iv?:Uint8Array): Object{
        let result = {}
        
        let key = scryptSync(password, "supersecretsalt", 32)
      
        if(!iv) iv = randomFillSync(new Uint8Array(16))
        let cipher = createCipheriv(algorithm, key, iv)
        let encrypted
        cipher.update(text)
      
        result["enc"] = cipher.final().toString("hex");
        result["iv"] = iv
      
        return result
    }
      
    export function decrypt(enc: string, password: string, algorithm: string = defaultAlgorithm, iv:Uint8Array): string{
        let key = scryptSync(password, "supersecretsalt", 32)
        let decipher = createDecipheriv(algorithm, key, iv);
        decipher.update(enc, 'hex', 'utf8');
        return(decipher.final('utf8'));
    }
      
    export function convertToBase64(uint8: Uint8Array):string{
        return Buffer.from(uint8).toString("base64")
    }
      
    export function convertToUint8(base64: string):Uint8Array{
        return Uint8Array.from(Buffer.from(base64, "base64"))
    }
}
  
export default enc