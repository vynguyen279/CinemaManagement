const app = require("./utils");
const routes = require("./routes");
routes(app);

app.listen(8080, () => console.log("App running 8080"));
