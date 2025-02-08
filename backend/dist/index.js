"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const express_2 = require("@clerk/express");
const dotenv_1 = __importDefault(require("dotenv"));
const clerkWebhook_1 = __importDefault(require("./routes/clerkWebhook"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_2.clerkMiddleware)({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY
}));
// Serve static frontend
app.use(express_1.default.static(path_1.default.join(__dirname, "../public"))); // ✅ Correct path
// API Routes
app.use("/api", todoRoute_1.default);
app.use("/api", clerkWebhook_1.default);
// React Catch-All Route (Must be at the bottom)
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "..", "public", "index.html")); // ✅ Correct path resolution
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} jhhhg `);
});
