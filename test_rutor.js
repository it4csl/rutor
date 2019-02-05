#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

const url_new = "http://rutor.info/new", url_top = "http://rutor.info/top";

const arr_top = [], arr_new = [];

request(url_top, (error, response, body) => {
  if(!error) {
    $ = cheerio.load(body);
    const name1 = $(".tum"), name2 = $(".gai a");
    
    let href_torrent = "http://rutor.info" + $($(name1[1]).children("td").children("a")[2]).attr("href");
    let text = $($(name1[1]).children("td").children("a")[2]).text();
    let size = $($(name1[1]).children("td")[3]).text();

    let out_html = `<tr><td><a href="${href_torrent}">${text}</a></td><td>${size}</td></tr>`;
    arr_top.push(out_html);

    console.log(text);
    console.log(href_torrent);
    console.log(size);
    console.log("");
    console.log(out_html);

  }
});
