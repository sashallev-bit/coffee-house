
class LocalClient {
  private namespace: string;

  constructor() {
    this.namespace = 'coffee-house';
  }

  async getItem(key: string): Promise<object | null> {
    const value = localStorage.getItem(`${this.namespace}:${key}`);
    if (value === null) {
      return null;
    } 
    return JSON.parse(value);
  }

  setItem(key: string, value: object): void{
    localStorage.setItem(`${this.namespace}:${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(`${this.namespace}:${key}`);
  }  
}