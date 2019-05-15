#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

url_z_kino = "http://rutor.info/browse/0/1/0/2";

const arr_obj = [];
const arr_html = [];

const obj_in_html = async (arr_s, arr_o) => {
  for(let i = 0; i < arr_s.length; i++) {
    let out = `<tr><td>${i+1})</td><td><a href="${arr_s[i].url}">${arr_s[i].text}</a></td><td>${arr_s[i].size}</td></tr>`;
    arr_o.push(out);
  }
  console.log("obj_in_html отработал");
}
const parse = async () => {
  for(let i = 0; i < 2; i++) { 
    let new_url = `http://rutor.info/browse/${i}/1/0/2`;
    request(new_url, async (error, response, body) => {
      if(!error) {
        $ = cheerio.load(body);
        const obj_list_tr = $("#index").children("table").children("tbody").children("tr")

        let size = 0;
        for(let i = 1; i < obj_list_tr.length; i++) {
          let url = "http://rutor.info" + $($(obj_list_tr[i]).children("td").children("a")[2]).attr("href");
          let text = $($(obj_list_tr[i]).children("td").children("a")[2]).text();
  
          if(Object.keys($($($(obj_list_tr[i]).children("td")))).length === 8) {
            size = $($($(obj_list_tr[i]).children("td")[2])).text();
          }
          if(Object.keys($($($(obj_list_tr[i]).children("td")))).length === 9) {
            size = $($($(obj_list_tr[i]).children("td")[3])).text();
          }

          arr_obj.push({text, url, size});
        }
        await console.log("request отработал");
      }
    });
  }
  await console.log(arr_obj);
  await obj_in_html(arr_obj, arr_html);
}

const oout = async () => {
  await parse();
  //console.log(arr_obj);
  
}
//oout();
parse();
// arr_obj.sort((a, b) => {
//   let nameA=a.text, nameB=b.text;
//   if (nameA < nameB) return -1;    // разобраться с сортировкой и асинхронностью
//   if (nameA > nameB) return 1;
//   return 0;
// });
// setTimeout(() => out_obj(arr_obj, arr_html), 5000);
const ao = () => {
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
  console.log("app отработал");
}
//ao();