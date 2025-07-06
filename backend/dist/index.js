"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const template_1 = __importDefault(require("./routes/template"));
const chat_1 = __importDefault(require("./routes/chat"));
const config_1 = require("./config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Correct CORS setup
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// For handling preflight requests
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/template', template_1.default);
app.use('/chat', chat_1.default);
// Start server
app.listen(config_1.config.port, () => {
    console.log(`Server running on http://localhost:${config_1.config.port}`);
});
