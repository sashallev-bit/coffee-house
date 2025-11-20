import data from '../assets/products.json'
import Product from '../Product';
import ProductAdditive from '../ProductAdditive';
import ProductSize from '../ProductSize';

export class MenuRepository {
  
    async getProducts(){

      const data = await fetch('./assets/products.json')
      const json = await data.json();
      console.log(json);
      let prod = json.map((element) => this.dtoToProduct(element));
      
      return prod;
    }


    dtoToProduct(dto) {
        const sizes = [];
        for (const key in dto.sizes) {

            sizes.push(this.dtoToSize(key, dto.sizes[key]))
        };

        const additives = dto.additives.map((element, i) => this.dtoToAdditive(element));
        console.log(dto);

        return new Product(
            dto.name,
            dto.description,
            dto.price,
            dto.category,
            dto.imag, 
            sizes,
            additives
        );
    }

    dtoToSize(key, dto) {
        return new ProductSize(
            key,
            dto.size,
            dto['add-price']
        )

    }

    dtoToAdditive(dto) {
        return new ProductAdditive(        
            dto.name,
            dto['add-price']
        )
    }

} 