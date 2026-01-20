import express from "express";
import bodyParser from "body-parser";

const locationResponse =
    '<?xml version="1.0" encoding="UTF-8"?><LocationConstraint><LocationConstraint>eu-west-1</LocationConstraint></LocationConstraint>';
const api = express();
const router = express.Router();
const jsonParser = bodyParser.json();
api.use(jsonParser);
router.get("/", (_, res) => {
    res.status(200);
    res.end();
});
router.post("/", async (req, res) => {
    const url = new URL(req.url);
    if (url.searchParams.has("location")) {
        res.status(200).send(locationResponse);
        return;
    }
    res.status(200).send("OK");
});
api.use(router);
api.listen(3003);
console.log("listening...");
