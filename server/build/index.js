"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
app.use('/', express_1.default.static('dist'));
app.get('/movie', (req, res) => {
    res.sendFile(process.env.MOVIE);
});
io.on("connection", (socket) => {
    socket.on('video-event', (payload) => {
        io.emit('video-event', payload);
    });
    socket.on('skip', (payload) => {
        io.emit('skip', payload);
    });
});
httpServer.listen(80, () => {
    console.log('Running on port 3000');
});
