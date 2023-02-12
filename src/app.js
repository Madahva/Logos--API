const express = require("express");
const morgan = require("morgan");
const simpleIcons = require("simple-icons");

const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

app.get("/logo", (req, res) => {
  let logoName = req.query.name;

  logoName = logoName[0].toUpperCase() + logoName.substring(1);
  let logo;

  for (let prop in simpleIcons) {
    if (simpleIcons[prop].title === logoName) {
      logo = simpleIcons[prop];
      break;
    }
  }

  if (!logo) {
    return res.status(404).send({ error: "Logo not found" });
  }

  let modifiedSvg = logo.svg.replace(/<path /, `<path fill="#${logo.hex}" `);
  res.setHeader("Content-Type", "text/html");
  return res.send(`
    <html>
      <head>
        <title>${logo.title}</title>
      </head>
      <body>
        <h1>${logo.title}</h1>
        <div>
          ${modifiedSvg}
        </div>
      </body>
    </html>
  `);
});

module.exports = app;
