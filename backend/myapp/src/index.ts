import { Elysia } from "elysia";
import * as schema from "./schema";
import { db } from "./db";

const result = await db.select().from(schema.todos);
console.log(result);
const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
