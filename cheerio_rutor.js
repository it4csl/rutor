#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

let app = express();

let url = "http://rutor.info/top";

let arrr = [];

request(url, (error, response, body) => {
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
          arrr.push(`<tr><td><a href="http://rutor.info/${$(arg[i]).attr("href")}">${text}</a></td></tr>`);
        }
      }
    }
    parce(name1);
    parce(name2);
  }
});

app.get("/", (req, res) => {
  res.end(`
    <html>
        <head>
          <meta charset="utf-8">
          <style>
            body, table{
              font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;
              font-size: 12px;
            }
            a{
              text-decoration: none;
              color: #000000;
            }
            tr:hover {
              background: #786b59; 
              color: #ffe; 
            } 
          </style>
        </head>
        <body>
          <table>
            <tbody>
              ${arrr.join('')}
            </tbody>
          </table>
        </body>
    </html>`);
});

app.listen(9999);