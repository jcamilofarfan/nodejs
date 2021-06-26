"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getProducts = exports.createProduct = void 0;

var createProduct = function createProduct(req, res) {
  res.json("Create products");
};

exports.createProduct = createProduct;

var getProducts = function getProducts(req, res) {
  res.json("Get products");
};

exports.getProducts = getProducts;

var getProductById = function getProductById(req, res) {
  res.json("Get a product by Id");
};

exports.getProductById = getProductById;

var updateProductById = function updateProductById(req, res) {
  res.json("Update Products");
};

exports.updateProductById = updateProductById;

var deleteProductById = function deleteProductById(req, res) {
  res.json("Delete Products");
};

exports.deleteProductById = deleteProductById;