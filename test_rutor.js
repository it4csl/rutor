#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

url_z_kino = "http://rutor.info/browse/0/1/0/2";

const arr_obj = [];

out_obj = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    let out = `${arr[i].text} || ${arr[i].size}`;
    console.log(i + ") " + out);
  }
}

request(url_z_kino, (error, response, body) => {
  if(!error) {
    $ = cheerio.load(body);
    const obj_list_tr = $("#index").children("table").children("tbody").children("tr")

    get_data = (from_parse, in_obj) => {
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

  arr_obj.sort((a, b) => {
    let nameA=a.text, nameB=b.text;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
});
setTimeout(() => out_obj(arr_obj), 2000);