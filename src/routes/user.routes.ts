import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { VerifyUser } from "../middleware/verifyUser";
import { errandRoutes } from "./errand.routes";

export const appRoutes = () => {
    const app = Router();

    app.get("/", new UserController().getAllUsers);
    app.post("/", VerifyUser, new UserController().createUser);
    app.put("/:id", new UserController().updateUser);
    app.delete("/:id", new UserController().deleteUser);
    app.post("/login", new UserController().login);

    app.use("/:userId/errands", errandRoutes());

    return app;
};