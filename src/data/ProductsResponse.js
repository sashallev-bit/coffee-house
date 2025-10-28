

export class ProductsResponse {
  constructor (data, finishFlag = false){
    this.data = data;
    this.finishFlag = finishFlag;
  }
}