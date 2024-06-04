"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
class ProductRoutes {
    constructor() {
        this.path = '/products';
        this.router = (0, express_1.Router)();
        this.productsController = new products_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.productsController.getProducts);
    }
}
exports.default = ProductRoutes;
