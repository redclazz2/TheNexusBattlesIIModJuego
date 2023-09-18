/**
 * 
  const os = require('os');
 * COLYSEUS CLOUD WARNING:
 * ----------------------
 * PLEASE DO NOT UPDATE THIS FILE MANUALLY AS IT MAY CAUSE DEPLOYMENT ISSUES


module.exports = {
  apps : [{
    name: "colyseus-app",
    script: 'build/index.js',
    time: true,
    watch: false,
    instances: os.cpus().length,
    exec_mode: 'fork',
    wait_ready: true,
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};*/

const os = require('os');
module.exports = {
    apps: [{
        port        : 3000,
        name        : "TheNexusBattlesIIServer",
        script      : "./build/index.js", // your entrypoint file
        watch       : true,           // optional
        instances   : 1,
        exec_mode   : 'fork',         // IMPORTANT: do not use cluster mode.
        env: {
            DEBUG: "colyseus:errors",
            NODE_ENV: "production",
            DOMAIN: "game.thenexusbattles2.cloud"
        }
    }]
}
