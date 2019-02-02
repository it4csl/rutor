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
        if($(arg[i]).text().length !== 0) {
          if( $(arg[i]).text().indexOf("iTunes") !== -1 ) {
            arrr.push(`<tr><td><a href="http://rutor.info/${$(arg[i]).attr("href")}">${$(arg[i]).text()}</a></td></tr>`);
          }
          if( $(arg[i]).text().indexOf("Лицензия") !== -1 ) {
            arrr.push(`<tr><td><a href="http://rutor.info/${$(arg[i]).attr("href")}">${$(arg[i]).text()}</a></td></tr>`);
          }
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
          </style>
        </head>
        <body><table>
            <tbody>
              ${arrr}
            </tbody>
          </table>
        </body>
    </html>`);
});

app.listen(9999);