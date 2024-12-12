import dotEnv from "dotenv";
dotEnv.config();

if (process.env.NODE_ENV !== "prod") {
  console.log("Its not a prod...");
  const configFile = `./.env.${process.env.NODE_ENV}`;
  console.log("configFile:", configFile);
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const OPENAI_API_KEY = process.env.OPEN_API_SECRETE_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const JWT_SECRETE_STRING = process.env.JWT_SECRETE_STRING;
