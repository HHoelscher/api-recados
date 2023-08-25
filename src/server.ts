import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import { appRoutes } from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use("/users", appRoutes())
app.get("/", (req, res) => res.json("ok"))


app.listen(process.env.PORT, () =>{
    console.log("Servidor rodando na porta " + process.env.PORT + "!");
    
}
)