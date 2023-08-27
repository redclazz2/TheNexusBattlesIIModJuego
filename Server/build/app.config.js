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
        publicAddress: "172.190.6.2/server-" + process.env.NODE_APP_INSTANCE
    },
    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom_1.MyRoom);
        gameServer.define('2v2', Room2V2_1.Room2v2);
        gameServer.define('lobby', colyseus_1.LobbyRoom);
    },
    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         * Read more: https://expressjs.com/en/starter/basic-routing.html
         */
        app.get("/hello_world", (req, res) => {
            res.send("Colyseus Ready!");
        });
        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground_1.playground);
        }
        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/colyseus", (0, monitor_1.monitor)());
    },
    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
