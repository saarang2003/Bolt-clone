"use strict";
require("dotenv").config();
// console.log(process.env.OPENAI_API_KEY);
// import OpenAI from "openai";
// const client = new OpenAI();
// async function main(){
//     const response = await client.responses.create({
//     model: "gpt-4.1",
//     input: "Write a one-sentence bedtime story about a unicorn.",
// // });
// console.log("response ",response.output_text);
// }
// main()
const express = require("express");
const cors = require("cors");
const { config } = require('./config/index');
const app = express();
app.use(cors());
app.use(express.json());
app.listen(config.port, () => {
    console.log(`Gemini server running on http://localhost:${config.port}`);
});
