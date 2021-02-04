const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// object 만둘기
var template = {
  html: (title, list, body, control) => {
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
        ${control}
        ${body}
      </body>
      </html>
  
    `;
  },

  list: (files) => {
    var list = '<ul>';
    var i = 0;
    while(i< files.length ){
      list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
      i++;
  
    }
    list = list + '</ul>';
    return list;
  }
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
            var description = "Hello Node.js";  

            var list = template.list(files);              
            var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`, 
            `<a href="/create">create</a>`);

            response.writeHead(200); // 파일을 성공적으로 전송했다.
            response.end(html);

          }) 
      }
      else{
        const testFolder = './data/';

        fs.readdir(testFolder, (err, files) => { 

          fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
            var title = queryData.id;      
            var list = template.list(files);
            var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`, 
            `<a href="/create">create</a> 
            <a href="/update?id=${title}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            </form>
            `);
    
            response.writeHead(200); // 파일을 성공적으로 전송했다.
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){
      const testFolder = './data/';

      fs.readdir(testFolder, (err, files) => { 
          var title = 'WEB - create';
          var list = template.list(files);
   
          var html = template.html(title, list, `
          <form action="/create_process" method="POST">
            <p>
                <input type="text" name="title" placeholder="title">
            </p>
            
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            
            <p>
                <input type="submit">
            </p>
          </form>
          
          `, '');

          response.writeHead(200); // 파일을 성공적으로 전송했다.
          response.end(html);

        }) 
    } else if(pathname === '/create_process'){
      var body ='';
      request.on('data', function(data){
        body = body + data;
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title; // create로 부터 입력받은 title을 얻을 수 있다.
        var descrtiption = post.description;
        
        fs.writeFile(`./data/${title}`, descrtiption, 'utf8', (err) => {
          if (err) throw err;
          
          response.writeHead(302, {Location: `/?id=${title}`}); // 302는 사용자를 해당 웹페이지로 리다이렉션하는 명령어이다.
          response.end();
        });
      });

    } else if(pathname === '/update'){
      
      const testFolder = './data/';

        fs.readdir(testFolder, (err, files) => { 

          fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
            var title = queryData.id;      
            var list = template.list(files);
            var html = template.html(title, list, 
              `
              <form action="/update_process" method="POST">
                <input type="hidden" name="id" value="${title}">
                <p>
                    <input type="text" name="title" placeholder="title" value="${title}">
                </p>
                
                <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                </p>
                
                <p>
                    <input type="submit">
                </p>
              </form>
              `, 
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a> `);
    
            response.writeHead(200); // 파일을 성공적으로 전송했다.
            response.end(html);
          });
        });

    } else if(pathname === '/update_process'){
      var body ='';
      request.on('data', function(data){
        body = body + data;
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        // console.log(post);
        var title = post.title; // create로 부터 입력받은 title을 얻을 수 있다.
        var descrtiption = post.description;
        fs.rename(`data/${id}`, `data/${title}`, (err) => {
          fs.writeFile(`./data/${title}`, descrtiption, 'utf8', (err) => {
          if (err) throw err;
          
          response.writeHead(302, {Location: `/?id=${title}`}); // 302는 사용자를 해당 웹페이지로 리다이렉션하는 명령어이다.
          response.end();
        });

        })  
      
      });

    } else if(pathname === '/delete_process') {
      var body ='';
      request.on('data', function(data){
        body = body + data;
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`./data/${id}`, (error)=>{
          response.writeHead(302, {Location: `/`}); // 302는 사용자를 해당 웹페이지로 리다이렉션하는 명령어이다.
          response.end();
        })
      
      });
    } else{
      response.writeHead(404); // 파일을 찾을 수 없다.
      response.end('Not Found');
      return;
    }
   });
app.listen(3000);