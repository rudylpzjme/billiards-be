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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
class App {
    constructor(routes) {
        this.allowedOrigins = ['http://localhost:3000'];
        this.app = (0, express_1.default)();
        this.port = 3001;
        this.app.use((0, cors_1.default)({
            origin: this.allowedOrigins
        }));
        this.app.use(body_parser_1.default.json());
        this.connectToDatabase();
        this.initializeRoutes(routes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: development =======`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    closeDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongoose_1.disconnect)();
                console.log('Disconnected from MongoDB');
            }
            catch (error) {
                console.error('Error closing database connection:', error);
            }
        });
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = "mongodb+srv://rudylpzjme:465-austin@cluster0.02otob3.mongodb.net/billiards-pos?retryWrites=true&w=majority&appName=Cluster0";
                yield (0, mongoose_1.connect)(uri);
                console.log("Database connection sucessful");
            }
            catch (error) {
                console.error(`ERROR: ${error}`);
            }
        });
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}
exports.default = App;
