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

  let modifiedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="100">
    <rect x="0" y="0" width="500" height="100" fill="#ddd"/>
    <g transform="translate(-100, 0)">
        ${logo.svg.replace(/<path /, `<path fill="#${logo.hex}" `)}
          </g>
            <text x="400" y="50" font-size="20" fill="#333">${logo.title}</text>
            </svg>`;

  let svg = `<svg height="60" width="200" xmlns="http://www.w3.org/2000/svg">
        <style>
        
        foreignObject svg {
                  width: 30px;
                  height: 30px;
                  line-height: 40px;
                  margin-top:2px;
                  text-align: center;
                  fill: #15d8fe;
                }

                .gradient-btn {
                          display: flex;
                          height: 57px;
                          padding-left: 15px;
                          padding-right: 15px;
                          border-radius: 50px;
                          float: left;
                          color: #fff;
                          box-shadow: 5px 5px 2px -2px #a5a5a5;
                          text-transform: capitalize;
                          font-size: 20px;
                        }
                .text {
                          color: #333;
                          margin-top: 16px;
                          margin-left: 10px;
                          font-size: 1.1rem;
                          white-space:nowrap;
                        }
                .svg {
                          margin-top: 10px;
                        }
                .btn-color {
                          background: #fff;
                        }
                @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
                @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
                @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
            
              </style>
          <foreignObject style="transform:scale(undefined)" height="60" width="200">
                  <div class="gradient-btn btn-color" xmlns="http://www.w3.org/1999/xhtml">
                          <div class="svg">
                            
        ${logo.svg.replace(/<path /, `<path fill="#${logo.hex}" `)}
                          </div>
                    <div class="text"><div>${logo.title}</div></div>
                  </div>
          </foreignObject>
  </svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  return res.send(modifiedSvg);
});

module.exports = app;
