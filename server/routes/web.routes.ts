import { Router, Request, Response } from "express";
import { client } from "../../src/index";
const router = Router(); 

router.get("/", (req: Request, res: Response) => {
    res.render("login.ejs", {
        user: req.user,
        _client: client,
    })
});

export { router }