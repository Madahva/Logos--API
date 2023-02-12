const express = require("express");
const simpleIcons = require("simple-icons");

const app = express();
const port = 3000;

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
  return res.send(modifiedSvg);
});

app.listen(port, () => {
  console.log(`🚀 API listening on port ${port} 🚀`);
});
