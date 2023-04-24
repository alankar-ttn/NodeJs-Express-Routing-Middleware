const express = require("express");
const app = express();

require("./config/db")();
require("./routes/index")(app);

app.listen(8080, () => console.log("server started"))