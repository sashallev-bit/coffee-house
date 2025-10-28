import data from '../assets/products.json'
import Product from '../Product';
import ProductAdditive from '../ProductAdditive';
import ProductSize from '../ProductSize';
import { ProductsResponse } from './ProductsResponse';

export class MenuRepository {
  
    async getProducts(category, perPagePosition, perPageColumn){

      const data = await fetch('./assets/products.json')
      const json = await data.json();
      let prodList = json.map((element) => this.dtoToProduct(element)).filter((product) => product.category == category);
      let finishFlag;
      const finishPosition = perPageColumn === Infinity ? prodList.length : perPagePosition + perPageColumn;
      const startPosition = perPagePosition;
      if((perPagePosition + perPageColumn) >= prodList.length - 1) {
        finishFlag = true;
      };
      return new ProductsResponse(prodList.slice(startPosition, finishPosition), finishFlag);
    }

    async getProduct(productName) {
        const data = await fetch('./assets/products.json');
        const json = await data.json();
        const product = json.map((value) => this.dtoToProduct(value)).filter((product) => product.name == productName);
        return product[0];
    }


    dtoToProduct(dto) {
        const sizes = [];
        for (const key in dto.sizes) {

            sizes.push(this.dtoToSize(key, dto.sizes[key]))
        };

        const additives = dto.additives.map((element, i) => this.dtoToAdditive(element));

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