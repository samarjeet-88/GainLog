import { v7 as uuidv7 } from "uuid"
import argon2 from "argon2"

class BaseService {

    static generateId = () => {
        const id = uuidv7();
        return id;
    }

    static hashValue = async (value) => {
        const hashedValue =
            await argon2.hash(value, { type: argon2.argon2id })

        return hashedValue;
    }
}


export default BaseService;