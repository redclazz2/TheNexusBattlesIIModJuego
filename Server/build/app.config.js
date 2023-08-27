"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = __importDefault(require("@colyseus/tools"));
const monitor_1 = require("@colyseus/monitor");
const playground_1 = require("@colyseus/playground");
const colyseus_1 = require("colyseus");
const MyRoom_1 = require("./rooms/MyRoom");
const Room2V2_1 = require("./rooms/Room2V2");
exports.default = (0, tools_1.default)({
    options: {
        presence: new colyseus_1.RedisPresence(),
        driver: new colyseus_1.RedisDriver(),
        publicAddress: process.env.DOMAIN + "/server-" + process.env.NODE_APP_INSTANCE
    },
    initializeGameServer: (gameServer) => {
        gameServer.define('my_room', MyRoom_1.MyRoom);
        gameServer.define('2v2', Room2V2_1.Room2v2);
    },
    initializeExpress: (app) => {
        app.get("/hello_world", (req, res) => {
            res.send("Colyseus Ready! Welcome to The Nexus Battles II.");
        });
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground_1.playground);
        }
        app.use("/colyseus", (0, monitor_1.monitor)());
    },
    beforeListen: () => {
    }
});
