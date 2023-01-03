const express = require("express");
const app = express();
const csvFilePath = "./internet.csv";
const csvFilePath2 = "./country.csv";
const csv = require("csvtojson");
const cors = require("cors");

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
    console.log("hello");
    const jsondata = await csv().fromFile(csvFilePath);
    const jsondata2 = await csv().fromFile(csvFilePath2);
    res.send([jsondata, jsondata2]);
});

app.listen(8000, () => {
    console.log("server is running...");
});
