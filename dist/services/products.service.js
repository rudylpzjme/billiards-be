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
const products_schema_1 = __importDefault(require("../schemas/products.schema"));
class ProductService {
    constructor() {
        this.products = products_schema_1.default;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.products.find();
            return products;
        });
    }
    decrease(id, qtyToDecrease) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.products.findByIdAndUpdate(id, {
                $inc: { quantity: -qtyToDecrease }
            });
        });
    }
}
exports.default = ProductService;
