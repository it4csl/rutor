#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

url_z_kino = "http://rutor.info/browse/0/1/0/2";

const arr_obj = [];
const arr_html = [];

function out_obj(arr_s, arr_o) {
  for(let i = 0; i < arr_s.length; i++) {
    let out = `<tr><td>${i+1})</td><td><a href="${arr_s[i].url}">${arr_s[i].text}</a></td><td>${arr_s[i].size}</td></tr>`;
    arr_o.push(out);
  }
}
function parse(url) {
  request(url, (error, response, body) => {
    if(!error) {
      $ = cheerio.load(body);
      const obj_list_tr = $("#index").children("table").children("tbody").children("tr")

      let get_data = (from_parse, in_obj) => {
        let size = 0;
        for(let i = 1; i < from_parse.length; i++) {
          let url = "http://rutor.info" + $($(from_parse[i]).children("td").children("a")[2]).attr("href");
          let text = $($(from_parse[i]).children("td").children("a")[2]).text();
  
          if(Object.keys($($($(from_parse[i]).children("td")))).length === 8) {
            size = $($($(from_parse[i]).children("td")[2])).text();
          }
          if(Object.keys($($($(from_parse[i]).children("td")))).length === 9) {
            size = $($($(from_parse[i]).children("td")[3])).text();
          }

          in_obj.push({text, url, size});
        }
      }
      get_data(obj_list_tr, arr_obj);
    }
  });
}


for(let i = 0; i < 2; i++) {
  new_url = `http://rutor.info/browse/${i}/1/0/2`;
  parse(new_url);
}

// arr_obj.sort((a, b) => {
//   let nameA=a.text, nameB=b.text;
//   if (nameA < nameB) return -1;    // разобраться с сортировкой и асинхронностью
//   if (nameA > nameB) return 1;
//   return 0;
// });

// setTimeout(() => out_obj(arr_obj, arr_html), 5000);

app.get("/", (req, res) => {
  res.end(`
    <html>
        <head>
          <meta charset="utf-8">
          <style>
            body, table { font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 12px; }
            a { text-decoration: none; color: #000000; }
            tr:hover { background: #bccae0; color: #ffe; } 
          </style>
        </head>
        <body>
          <table>
            <tbody>
              <h3>Top</h3>
              ${arr_html.join("")}
            </tbody>
          </table>
        </body>
    </html>`);
});
app.listen(9999);