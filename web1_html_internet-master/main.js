const http = require('http');
const fs = require('fs');
const url = require('url');

function templateHTML(title, list, body){
  return `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
    </body>
    </html>

  `;
}

function templateList(files){
  var list = '<ul>';
  var i = 0;
  while(i< files.length ){
    list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
    i++;

  }
  list = list + '</ul>';
  return list;
}

const app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){

        const testFolder = './data/';

        fs.readdir(testFolder, (err, files) => { 
            var title = 'Welcome';
            var list = templateList(files);

            var description = "Hello Node.js";      
            var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);

            response.writeHead(200); // 파일을 성공적으로 전송했다.
            response.end(template);

          }) 
      }
      else{
        const testFolder = './data/';

        fs.readdir(testFolder, (err, files) => { 
          
          
        
          fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
            var title = queryData.id;      
            var list = templateList(files);
            var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
    
            response.writeHead(200); // 파일을 성공적으로 전송했다.
            response.end(template);
          });
        });
      }
    } else{
      response.writeHead(404); // 파일을 찾을 수 없다.
      response.end('Not Found');
      return;
    }
   });
app.listen(3000);