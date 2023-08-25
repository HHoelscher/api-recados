import { Router } from "express";
import { ErrandController } from "../controller/errand.controller";
import { VerifyInfoErrand } from "../middleware/verifyInfoErrand";

export const errandRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    const controller = new ErrandController();

    app.post("/", VerifyInfoErrand, new ErrandController().createErrand);
    app.get("/", new ErrandController().listErrand);
    app.put("/:errandId", new ErrandController().updateErrand);
    app.delete("/:errandId", new ErrandController().deleteErrand);

    app.post("/:errandId/archived", new ErrandController().archiveErrand);

    app.get("/filter", new ErrandController().filterErrands);

    return app;
}