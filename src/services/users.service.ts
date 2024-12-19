import { hash } from 'bcrypt';
import { User } from '../models/users.model';
import usersModel from '../schemas/users.schema';
import { isEmpty } from '../utils/utils';
import { UserError } from '../errors/user.error';

class UserService {
  public users = usersModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new Error("UserId is empty");

    const findUser: User | null = await this.users.findOne({ _id: userId });
    if (!findUser) throw new Error("User doesn't exist");

    return findUser;
  }

  public async findUserByUsername(username: string): Promise<User> {
    if (isEmpty(username)) throw new Error("username is empty");

    const findUser: User | null = await this.users.findOne({ username: username });
    if (!findUser) throw new Error("User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    if (isEmpty(userData)) {
      throw new UserError({
        name: "USER_DATA_EMPTY",
        message: "User data is empty",
      });
    }

    const findUser: User | null = await this.users.findOne({ username: userData.username });
    // no permitir mismo username
    if (findUser) {
      throw new UserError({
        name: "USER_ALREADY_EXISTS",
        message: `El username: ${userData.email} ya existe`,
      });
    }

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }
}

export default UserService;
