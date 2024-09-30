import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
const app = express();
const port = 3000

app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", { translated: null , displayError: false})
})

app.post("/translate_text", async (req, res) => {
    try {
        const response = await axios.get(`https://api.funtranslations.com/translate/yoda.json?text=${req.body.input}`);
        res.render("index.ejs", { translated: response.data.contents.translated, displayError: false})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.render("index.ejs", {translated: null, displayError: true})
    }
});

app.listen(port, () => {
    console.log("Server running on port 3000.");
})