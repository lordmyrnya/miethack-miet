import {
    scryptSync,
    randomFillSync,
    createCipheriv,
    createDecipheriv,
    randomBytes
} from 'crypto';
  
import { Buffer } from 'node:buffer';

const defaultAlgorithm = "aes-256-cbc"
  
namespace enc{
    export function encrypt(text:string, password: string, algorithm: string = "aes-256-cbc", iv?:Buffer): Object{
        let result = {}
        
        let key = scryptSync(password, "", 32)
      
        if(!iv) iv = randomBytes(16);
        let cipher = createCipheriv(algorithm, key, iv)
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        result["enc"] = encrypted
        result["iv"] = iv.toString("hex")
      
        return result
    }
      
    export function decrypt(enc: string, password: string, algorithm: string = "aes-256-cbc", iv:Buffer): string{
        let key = scryptSync(password, "", 32)
        let decipher = createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(enc, "hex", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted.toString();
    }
  
    export function createIV(): Buffer{
        return randomBytes(16);
    }

    export function convertFromHex(hex: string){
        return Buffer.from(hex, "hex")
    }
  
    export function decryptStudents(students: Array<Object>){
        for(let i=0; i<students.length; i++){
            
        }
    }
  }
  
  export default enc