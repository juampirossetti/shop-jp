const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cbFunc => {
  fs.readFile(p, (err, data) => {
    if (err) {
      cbFunc([]);
    } else {
      cbFunc(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  };

  static deleteById(id) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(prod => prod.id !== id);
      const product = products.find(prod => prod.id === id);
      console.log(id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err){
          Cart.deleteProduct(id, product.price);
        }
      })
    });
  };

  static fetchAll(cbFunc) {
    getProductsFromFile(cbFunc);
  };

  static findById(id, cbFunc) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cbFunc(product);
    });
  }
};
