
import type { ResponseDto } from "./ResponseDto";



class NetworkClient {
  private url: string 
  constructor() {
    this.url = 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/';
  }

  async getItem<T>(request?: Request) {

    try {
      const response = await fetch(`${request.param, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = { message: '', errors: '-500', data: null } as unknown as ResponseDto<T>;
        return errorResponse;
      }

      const responseData: ResponseDto<T> = await response.json();
      return responseData;
    } catch (error) {
      const errorResponse = { message: '', errors: '-500', data: null } as unknown as ResponseDto<T>;
      console.error('Не удалось получить задачи:', error);
      return errorResponse;
    }    
  }

  setItem(key, value) {
    localStorage.setItem(`${this.namespace}:${key}`, JSON.stringify(value));
  }

  removeItem(key) {
    localStorage.removeItem(`${this.namespace}:${key}`);
  }  
}