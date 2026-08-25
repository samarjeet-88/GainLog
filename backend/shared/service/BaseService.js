import {v7 as uuidv7} from "uuid"


class BaseService{

    static generateId=()=>{
        const id=uuidv7();
        return id;
    }
}


export default BaseService;