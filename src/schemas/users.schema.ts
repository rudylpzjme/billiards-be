import { model, Schema, Document } from 'mongoose';
import { User } from '../models/users.model';

const usersSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  }
});

const users = model<User & Document>('User', usersSchema);

export default users;