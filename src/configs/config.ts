import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3001;

export const config = {
  port: process.env.NODE_APP_PORT || 3001,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    name: process.env.NODE_ENV === 'production' ? process.env.DB_NAME : process.env.DB_NAME_DEV,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  thirdPartyAPIs: {},
}

