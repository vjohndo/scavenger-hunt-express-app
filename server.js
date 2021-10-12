const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("client"));

// start the web server
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});