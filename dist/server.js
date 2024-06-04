"use strict";
// import express, { Request, Response } from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
// const app = express();
// const port = process.env.PORT || 3001;
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript Express!');
// });
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
const app = new app_1.default([new index_route_1.default(), new users_routes_1.default(), new products_routes_1.default(), new orders_routes_1.default()]);
app.listen();
