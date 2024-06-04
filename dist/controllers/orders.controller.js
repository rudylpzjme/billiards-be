"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_service_1 = __importDefault(require("../services/orders.service"));
const products_service_1 = __importDefault(require("../services/products.service"));
class OrderController {
    constructor() {
        this.ordersService = new orders_service_1.default();
        this.getOrders = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.ordersService.findAll();
                res.status(200).json({ data: orders, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        });
        this.createOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // use Response object to send a good response to the frontend
            try {
                const order = {
                    name: req.body.name,
                    date: req.body.date,
                    status: req.body.status,
                    cart: {
                        line_items: req.body.cart.lineItems,
                        total: req.body.cart.total,
                    }
                };
                yield this.ordersService.createOrder(order);
                res.status(200).json({
                    message: "OK"
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const cart = {
                    line_items: req.body.cart.lineItems,
                    total: req.body.cart.total,
                };
                yield this.ordersService.updateOrder(id, cart);
                res.status(200).json({
                    message: "OK"
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.payOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const productsService = new products_service_1.default();
            try {
                yield this.ordersService.payOrder(id, req.body.status);
                res.status(200).json({
                    message: "OK"
                });
                const order = yield this.ordersService.getOrder(id);
                order === null || order === void 0 ? void 0 : order.cart.line_items.forEach((item) => {
                    const { id, quantity } = item;
                    console.log(`Item: ${item}`);
                    console.log(`ID: ${id} QTY: ${quantity}`);
                    productsService.decrease(id, quantity);
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = OrderController;
