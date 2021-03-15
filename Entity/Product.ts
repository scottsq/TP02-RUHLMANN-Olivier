export class Product {
    public id: number;
    public name: string;
    public price: number;
    public pic: string;
    
    constructor() {}
    static fromJson(json): Product {
        let p = new Product();
        p.id = json.id;
        p.name = json.name;
        p.price = json.price;
        p.pic = json.pic;
        return p;
    }
}