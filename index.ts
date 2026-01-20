import express from "express";
import bodyParser from "body-parser";

const locationResponse =
    '<?xml version="1.0" encoding="UTF-8"?><LocationConstraint><LocationConstraint>eu-west-1</LocationConstraint></LocationConstraint>';
const api = express();
const router = express.Router();
const jsonParser = bodyParser.json();
api.use(jsonParser);
router.get("/", (req, res) => {
    console.log("GET", req.url);
    res.status(200);
    res.end();
});
router.post("/", async (req, res) => {
    console.log("POST", req.url);
    const url = new URL(process.env.HOSTNAME + req.url);
    if (url.searchParams.has("location")) {
        res.status(200).send(locationResponse);
        return;
    }

    console.log("Simulating write to", url);
    console.log(req.body);
    await new Promise<void>((resolve) => {
        const delay = Math.random() * 1000 * 3; // max 3 seconds
        console.log("Reponse delay:", delay);
        setTimeout(() => {
            resolve();
        }, delay);
    });

    res.status(200).send("OK");
});
api.use(router);
api.listen(3003);
console.log("listening...");
