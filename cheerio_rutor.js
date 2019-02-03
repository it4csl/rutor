#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

let app = express();

let url_new = "http://rutor.info/new";
let url_top = "http://rutor.info/top";

let arr_top = [];
let arr_new = [];

let func = (ur, arr) => {
  request(ur, (error, response, body) => {
    if(!error) {
      $ = cheerio.load(body);
      let name1 = $(".tum a");
      let name2 = $(".gai a");

      let parce = (arg) => {
        for (let i = 0; i < $(arg).length; i++) {
          var text = $(arg[i]).text();

          if(text.length === 0) continue;
          var found = false;

          if( text.indexOf("iTunes") !== -1 ) {
            found = true;
          }

          if( text.indexOf("Лицензия") !== -1 ) {
            found = true;
          }
          
          if (found) {
            arr.push(`<tr><td><a href="http://rutor.info/${$(arg[i]).attr("href")}">${text}</a></td></tr>`);
          }
        }
      }
      parce(name1);
      parce(name2);
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
            body, table{ font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 12px; }
            a{ text-decoration: none; color: #000000; }
            tr:hover { background: #bccae0; color: #ffe; } 
          </style>
        </head>
        <body>
          <table>
            <tbody>
              <h3>Top</h3>
              ${arr_top.sort((a, b) => {
                var nameA=a.match("[А-Я][а-я]"), nameB=b.match("[А-Я][а-я]")
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
              }).join('')}
            </tbody>
          </table>
          <table>
            <tbody>
              <h3>New</h3>
              ${arr_new.sort((a, b) => {
                var nameA=a.match("[А-Я][а-я]"), nameB=b.match("[А-Я][а-я]")
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
              }).join('')}
            </tbody>
          </table>
        </body>
    </html>`);
});

app.listen(9999);