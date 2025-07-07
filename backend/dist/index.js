"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const template_1 = __importDefault(require("./routes/template"));
const chat_1 = __importDefault(require("./routes/chat"));
const config_1 = require("./config");
const app = (0, express_1.default)();
// Correct CORS setup
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});
app.use(express_1.default.json());
// Routes
app.use('/template', template_1.default);
app.use('/chat', chat_1.default);
// Start server
app.listen(config_1.config.port, () => {
    console.log(`Gemini server running on http://localhost:${config_1.config.port}`);
});
