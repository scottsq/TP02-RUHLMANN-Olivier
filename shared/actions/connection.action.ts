import { Connection } from "../models/connection";

export class Connect {
    static readonly type = "[Connection] Connect"; // indicatif
    constructor(public payload: Connection) {

    }
}

export class Disconnect {
    static readonly type = "[Connection] Disconnect"; // indicatif
    constructor() {
        
    }
}