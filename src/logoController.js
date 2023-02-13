const simpleIcons = require("simple-icons");

const createLogo = (req, res) => {
  let { name, width, text, textColor, bgColor, borderRadius, animation } =
    req.query;

  name = name[0].toUpperCase() + name.substring(1);
  if (!width) width = 100;
  if (!textColor) textColor = "333";
  if (!bgColor) bgColor = "fff";
  if (!borderRadius) borderRadius = 0;
  let logo;

  for (let prop in simpleIcons) {
    if (simpleIcons[prop].title === name) {
      logo = simpleIcons[prop];
      break;
    }
  }

  if (!logo) {
    return res.status(404).send({ error: "Logo not found" });
  }

  let svg = `<svg height="60" width="200" xmlns="http://www.w3.org/2000/svg">
        <style>
        
         foreignObject svg ${
           animation
             ? `{
                  width: 30px;
                  height: 30px;
                  line-height: 40px;
                  margin-top:2px;
                  text-align: center;
                  fill: #15d8fe;
                  -moz-animation: spin 4s linear infinite;
                  -webkit-animation: spin 4s linear infinite;
                  animation: spin 4s linear infinite;
                }`
             : `{
                  width: 30px;
                  height: 30px;
                  line-height: 40px;
                  margin-top:2px;
                  text-align: center;
                  fill: #15d8fe;
                }`
         }

                .gradient-btn {
                          display: flex;
                          height: 57px;
                          padding-left: 15px;
                          padding-right: 15px;
                          border-radius: ${borderRadius};
                          float: left;
                          color: #fff;
                          box-shadow: 3px 3px 2px -1px #a5a5a5;
                          text-transform: capitalize;
                          font-size: 20px;
                        }
                .text {
                          color: #${textColor};
                          margin-top: 16px;
                          margin-left: 10px;
                          font-size: 1.1rem;
                          font-weight: 700;
                          white-space:nowrap;
                        }
                .svg {
                          margin-top: 10px;
                        }
                .btn-color {
                          background: #${bgColor};
                        }
                @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
                @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
                @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
            
              </style>
          <foreignObject style="transform:scale(undefined)" height="60" width="${width}">
                  <div class="gradient-btn btn-color" xmlns="http://www.w3.org/1999/xhtml">
                          <div class="svg">
                            
        ${logo.svg.replace(/<path /, `<path fill="#${logo.hex}" `)}
                          </div>
                            ${
                              !text
                                ? `<div class="text"><div>${logo.title}</div></div>`
                                : ""
                            }
                  </div>
          </foreignObject>
  </svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  return res.send(svg);
};

module.exports = { createLogo };
