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
const bcrypt_1 = require("bcrypt");
const users_schema_1 = __importDefault(require("../schemas/users.schema"));
const utils_1 = require("../utils/utils");
class UserService {
    constructor() {
        this.users = users_schema_1.default;
        // public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
        //   if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
        //   if (userData.email) {
        //     const findUser: User = await this.users.findOne({ email: userData.email });
        //     if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
        //   }
        //   if (userData.password) {
        //     const hashedPassword = await hash(userData.password, 10);
        //     userData = { ...userData, password: hashedPassword };
        //   }
        //   const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
        //   if (!updateUserById) throw new HttpException(409, "User doesn't exist");
        //   return updateUserById;
        // }
        // public async deleteUser(userId: string): Promise<User> {
        //   const deleteUserById: User = await this.users.findByIdAndDelete(userId);
        //   if (!deleteUserById) throw new HttpException(409, "User doesn't exist");
        //   return deleteUserById;
        // }
    }
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.users.find();
            return users;
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.isEmpty)(userId))
                throw new Error("UserId is empty");
            const findUser = yield this.users.findOne({ _id: userId });
            if (!findUser)
                throw new Error("User doesn't exist");
            return findUser;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.isEmpty)(userData))
                throw new Error("userData is empty");
            const findUser = yield this.users.findOne({ email: userData.email });
            if (findUser)
                throw new Error(`This email ${userData.email} already exists`);
            const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
            const createUserData = yield this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            return createUserData;
        });
    }
}
exports.default = UserService;
