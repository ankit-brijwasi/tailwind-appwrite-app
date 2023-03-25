import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("http://localhost:8000/v1")
  .setProject("63a96feb49ccac6189bf");

export const account = new Account(client);
export const databases = new Databases(client);