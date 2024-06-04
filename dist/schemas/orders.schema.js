"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    line_items: [{
            _id: false,
            id: {
                type: String,
            },
            name: {
                type: String,
            },
            image: {
                type: String,
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number,
            }
        }],
    total: {
        type: Number,
        required: true,
    }
});
exports.orderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    cart: {
        type: cartSchema,
        required: false,
        unique: false,
    },
});
const orders = (0, mongoose_1.model)('Order', exports.orderSchema);
exports.default = orders;
