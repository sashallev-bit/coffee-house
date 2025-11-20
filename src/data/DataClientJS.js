
class DataClient {
  constructor(namespace = "coffee-house") {
    this.namespace = namespace;
  }

  async getItem(key) {
    const value = localStorage.getItem(`${this.namespace}:${key}`);
    return Boolean(value) ? JSON.parse(value) : null;
  }

  setItem(key, value) {
    localStorage.setItem(`${this.namespace}:${key}`, JSON.stringify(value));
  }

  removeItem(key) {
    localStorage.removeItem(`${this.namespace}:${key}`);
  }  
}