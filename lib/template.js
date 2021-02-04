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
  
  module.exports = template;