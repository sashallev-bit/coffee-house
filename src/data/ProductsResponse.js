

export class ProductResponse {
  constructor (data, finishFlag = false){
    this.data = data;
    this.finishFlag = finishFlag;
  }
}