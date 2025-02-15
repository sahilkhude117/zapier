// types/express.d.ts
import { JwtPayload } from "jsonwebtoken";

declare module "express" {
    interface Request {
        id: string; // Add the `id` property to the Request object
    }
}