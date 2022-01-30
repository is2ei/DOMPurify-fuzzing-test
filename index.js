const createDOMPurify = require('dompurify');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const http = require('http');
const url = require('url');

const requestListener = function (req, res) {
  const queryObject = url.parse(req.url, true).query;

  const { window } = new JSDOM(`...`);
  const DOMPurify = createDOMPurify(window);

  const clean = DOMPurify.sanitize(decodeURI(queryObject['q']));

  const responseBody = `
<html>
  <head>
  </head>
  <body>
    <h1>DOMPurify version: ${createDOMPurify.version}</h1>
    ${clean != null? clean : ''}
  </body>
</html>
  `
  res.writeHead(200);
  res.end(responseBody);
}

const server = http.createServer(requestListener);
server.listen(8080);
