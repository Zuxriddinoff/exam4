import { config } from 'dotenv';
config();

export default {
  PORT: Number(process.env.PORT),
  PG_PORT: Number(process.env.PG_PORT),
  PG_HOST: String(process.env.PG_HOST),
  PG_USER: String(process.env.PG_USER),
  PG_PASS: String(process.env.PG_PASS),
  PG_DB: String(process.env.PG_DB),
  ADMIN_FIRST_NAME: String(process.env.ADMIN_FIRST_NAME),
  ADMIN_LAST_NAME: String(process.env.ADMIN_LAST_NAME),
  ADMIN_AGE: String(process.env.ADMIN_AGE),
  ADMIN_GENDER: String(process.env.ADMIN_GENDER),
  ADMIN_EMAIL: String(process.env.ADMIN_EMAIL),
  ADMIN_PASSWORD: String(process.env.ADMIN_PASSWORD),
  ADMIN_PHONE_NUMBER: String(process.env.ADMIN_PHONE_NUMBER),
  ADMIN_ADDRESS: String(process.env.ADMIN_ADDRESS),
};
