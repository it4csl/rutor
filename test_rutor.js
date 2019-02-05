#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

const url_new = "http://rutor.info/new", url_top = "http://rutor.info/browse/0/1/0/2";

const arr_top = [], arr_new = [];
const obj_tum = {}, obj_gai = {};

request(url_top, (error, response, body) => {
  if(!error) {
    $ = cheerio.load(body);
    const tum = $(".tum"), gai = $(".gai");

    get_data = (from_parse, in_obj) => {
      for(let i = 0; i < from_parse.length; i++) {
        let url = "http://rutor.info" + $($(from_parse[i]).children("td").children("a")[2]).attr("href");
        let text = $($(from_parse[i]).children("td").children("a")[2]).text();
        let size = $($(from_parse[i]).children("td")[3]).text();

        in_obj[i] = {url, text, size};
      }
    }
    get_data(tum, obj_tum);
    //get_data(gai, obj_gai);
  }
  // out_obj = (obj) => {
  //   for(let i = 0; i < Object.keys(obj).length; i++) {
  //     let out = `${obj[i].url} || ${obj[i].text} || ${obj[i].size}`;
  //     console.log(out);
  //   }
  // }
  // out_obj(obj_tum);
  // out_obj(obj_gai);
  console.log(Object.keys(obj_tum).length);
});
