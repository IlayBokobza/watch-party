"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
app.use((0, cors_1.default)());
app.use('/', express_1.default.static('dist'));
app.get('/movie', (req, res) => {
    if (/^http/.test(process.env.MOVIE)) {
        res.redirect(process.env.MOVIE);
    }
    else {
        res.sendFile(process.env.MOVIE);
    }
});
io.on("connection", (socket) => {
    socket.on('video-event', (payload) => {
        io.emit('video-event', payload);
    });
    socket.on('skip', (payload) => {
        io.emit('skip', payload);
    });
});
const port = process.env.PORT;
httpServer.listen(port, () => {
    console.log('Running on port ' + port);
});
