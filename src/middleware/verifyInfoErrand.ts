import { NextFunction, Request, Response } from "express"

export function VerifyInfoErrand(
req: Request,
res: Response,
next: NextFunction
) {
const { title, detail } = req.body

if (!title) {
    return res.status(400).send({
        ok: false,
        message: "title was not provided",
    })
}

if (!detail) {
    return res.status(400).send({
        ok: false,
        message: "Detail was not provided",
    })
}
next()
}
