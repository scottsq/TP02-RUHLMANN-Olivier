export class Product {
    public id: number;
    public name: string;
    public price: number;
    public pic: string;
    public format: string;
    public amount: number;
    public ref: string;
    
    constructor() {}
    static fromJson(json): Product {
        let p = new Product();
        p.id = json.id;
        p.name = json.name;
        p.price = json.price;
        p.pic = json.pic;
        p.format =  json.format,
        p.amount =  json.amount,
        p.ref = json.ref;
        return p;
    }
}