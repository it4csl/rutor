#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

const url_new = "http://rutor.info/new", url_top = "http://rutor.info/browse/0/1/0/2";

const arr_top = [], arr_new = [];
const arr_obj = {};

request(url_top, (error, response, body) => {
  if(!error) {
    $ = cheerio.load(body);
    const tum = $(".tum"), gai = $(".gai a");

    get_data = (from_parse) => {
      for(let i = 0; i < from_parse.length; i++) {
        let url = "http://rutor.info" + $($(from_parse[i]).children("td").children("a")[2]).attr("href");
        let text = $($(from_parse[i]).children("td").children("a")[2]).text();
        let size = $($(from_parse[i]).children("td")[3]).text();

        arr_obj[i] = {url, text, size};
      }
    }
    get_data(tum);
    
    //let out_html = `<tr><td><a href="${href_torrent}">${text}</a></td><td>${size}</td></tr>`; 

  }
  for(let i = 0; i < Object.keys(arr_obj).length; i++) {
    let out = `${arr_obj[i].url} || ${arr_obj[i].text} || ${arr_obj[i].size}`;
    console.log(out);
  }
});
