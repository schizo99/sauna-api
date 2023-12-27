const app = require('./app')

const port = process.env.PORT || '3000'; app.listen(port);

function shutdownGracefully() {
    console.log("Server doing graceful shutdown");
    app.server.close();
}
console.log(`Listening on port ${port}`);

process.on("SIGINT", shutdownGracefully);
process.on("SIGTERM", shutdownGracefully);
