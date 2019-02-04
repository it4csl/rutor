#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

const url_new = "http://rutor.info/new", url_top = "http://rutor.info/top";

const arr_top = [], arr_new = [];

const sort_strarr = (arr) => {
  arr.sort((a, b) => {
    let nameA=a.match("[А-Я][а-я]"), nameB=b.match("[А-Я][а-я]");
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

const func = (url, arr) => {
  request(url, (error, response, body) => {
    if(!error) {
      $ = cheerio.load(body);
      const name1 = $(".tum a"), name2 = $(".gai a");

      const parce = (arg) => {
        for (let i = 0; i < $(arg).length; i++) {
          let text = $(arg[i]).text();

          if(text.length === 0) continue;
          let found = false;

          if( text.indexOf("iTunes") !== -1 && text.indexOf("UKR") === -1) found = true;
          if( text.indexOf("Лицензия") !== -1 && text.indexOf("PC") === -1) found = true;
          
          if (found) {
            arr.push(`<tr><td><a href="http://rutor.info/${$(arg[i]).attr("href")}">${text}</a></td></tr>`);
          }
        }
      }
      parce(name1);
      parce(name2);
      sort_strarr(arr);
    }
  });
}

func(url_top, arr_top);
func(url_new, arr_new);

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
              ${arr_top.join('')}
            </tbody>
          </table>
          <table>
            <tbody>
              <h3>New</h3>
              ${arr_new.join('')}
            </tbody>
          </table>
        </body>
    </html>`);
});

app.listen(9999);

setTimeout(() => process.exit(), 60000);