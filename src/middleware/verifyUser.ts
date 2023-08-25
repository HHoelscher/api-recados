import { NextFunction, Request, Response } from "express";

export function VerifyUser(req: Request, res: Response, next: NextFunction) {
const {email, password, confirmPassword } = req.body;


        if (!confirmPassword) {
        return res.status(400).send({
            ok: false,
            message: "ConfirmPassword is not provided",
        });
        }

        if(!email) {
        return res.status(400).send({
            ok: false,
            message: "E-mail was not provided",
            });
        }

        if (!password) {
        return res.status(400).send({
            ok: false,
            message: "Password was not provided",
        });
        }
        next()
}