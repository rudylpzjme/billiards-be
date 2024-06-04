"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = __importDefault(require("../controllers/orders.controller"));
class OrderRoutes {
    constructor() {
        this.path = '/orders';
        this.router = (0, express_1.Router)();
        this.ordersController = new orders_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.ordersController.getOrders);
        this.router.post(`${this.path}`, this.ordersController.createOrder);
        this.router.patch(`${this.path}/:id`, this.ordersController.updateOrder);
        this.router.patch(`${this.path}/:id/pay`, this.ordersController.payOrder);
    }
}
exports.default = OrderRoutes;
