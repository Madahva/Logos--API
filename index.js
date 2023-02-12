const app = require("./src/app.js");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 API listening on port ${port} 🚀`);
});
