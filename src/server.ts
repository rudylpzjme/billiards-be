// import express, { Request, Response } from 'express';

import App from "./app";
import IndexRoute from "./routes/index.route";
import OrderRoutes from "./routes/orders.routes";
import ProductRoutes from "./routes/products.routes";
import UsersRoute from "./routes/users.routes";

// const app = express();
// const port = process.env.PORT || 3001;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript Express!');
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const app = new App([new IndexRoute(), new UsersRoute(), new ProductRoutes(), new OrderRoutes()])
app.listen()
