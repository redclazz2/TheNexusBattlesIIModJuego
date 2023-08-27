import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { RedisDriver,RedisPresence} from "colyseus";

import { MyRoom } from "./rooms/MyRoom";
import { Room2v2 } from "./rooms/Room2V2";

export default config({

    options:{
        presence: new RedisPresence(),
        driver: new RedisDriver(),
        publicAddress: process.env.DOMAIN + "/server-" + process.env.NODE_APP_INSTANCE
    },

    initializeGameServer: (gameServer) => {
        gameServer.define('my_room', MyRoom);
        gameServer.define('2v2', Room2v2);
    },

    initializeExpress: (app) => {
        app.get("/hello_world", (req, res) => {
            res.send("Colyseus Ready! Welcome to The Nexus Battles II.");
        });

        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground);
        }

        app.use("/colyseus", monitor());
    },


    beforeListen: () => {

    }
});
