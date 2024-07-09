import { model, Schema, Document } from 'mongoose';
import { User } from '../models/users.model';

const usersSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: true,
    unique: false,
  },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  }
});

const users = model<User & Document>('User', usersSchema);

export default users;
