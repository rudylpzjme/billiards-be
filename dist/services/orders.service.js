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
const orders_schema_1 = __importDefault(require("../schemas/orders.schema"));
const utils_1 = require("../utils/utils");
class OrdersService {
    constructor() {
        this.orders = orders_schema_1.default;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // add try catch
            const orders = yield this.orders.find();
            return orders;
        });
    }
    getOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            // add try catch
            const order = yield this.orders.findById(orderId);
            return order;
        });
    }
    createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.isEmpty)(orderData))
                throw new Error("orderData is empty");
            const createdOrder = yield this.orders.create(Object.assign({}, orderData));
            return createdOrder;
        });
    }
    updateOrder(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.isEmpty)(cart))
                throw new Error("cart data is empty");
            const updatedOrder = yield this.orders.findOneAndUpdate({
                _id: id,
            }, {
                cart,
            });
            return updatedOrder;
        });
    }
    payOrder(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!status)
                throw new Error("status is empty");
            const updatedOrder = yield this.orders.findOneAndUpdate({
                _id: id,
            }, {
                status: status,
            });
            return updatedOrder;
        });
    }
}
exports.default = OrdersService;
