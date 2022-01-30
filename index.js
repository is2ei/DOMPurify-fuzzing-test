const createDOMPurify = require('dompurify');
const { JSDOM } = require("jsdom");

const http = require('http');
const url = require('url');

const requestListener = function (req, res) {
  const queryObject = url.parse(req.url, true).query;

  const DOMPurify = createDOMPurify(new JSDOM(`...`).window);

  const dirty = decodeURI(queryObject['q']);
  const clean = DOMPurify.sanitize(dirty);

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
