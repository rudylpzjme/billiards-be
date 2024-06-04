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
const users_service_1 = __importDefault(require("../services/users.service"));
class UsersController {
    constructor() {
        this.usersService = new users_service_1.default();
        this.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findAllUsersData = yield this.usersService.findAllUser();
                res.status(200).json({ data: findAllUsersData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const findOneUserData = yield this.usersService.findUserById(userId);
                res.status(200).json({ data: findOneUserData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const createUserData = yield this.usersService.createUser(userData);
                res.status(201).json({ data: createUserData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        });
        // public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const userId: string = req.params.id;
        //     const userData: CreateUserDto = req.body;
        //     const updateUserData: User = await this.userService.updateUser(userId, userData);
        //     res.status(200).json({ data: updateUserData, message: 'updated' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const userId: string = req.params.id;
        //     const deleteUserData: User = await this.userService.deleteUser(userId);
        //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
}
exports.default = UsersController;
