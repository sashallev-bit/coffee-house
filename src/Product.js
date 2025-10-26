
export class Product {
    constructor(name = '', description = '', price = 0, category = '', imag = '', sizes = [], additives = []) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imag = imag;
        this.sizes = sizes;
        this.additives = additives;        
    }
}