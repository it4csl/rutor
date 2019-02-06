#!/usr/bin/env node

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

const url_new = "http://rutor.info/new", url_top = "http://rutor.info/browse/0/1/0/2";

const arr_top = [], arr_new = [];

out_obj = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    let out = `${arr[i].text} || ${arr[i].size}`;
    console.log(i + ") " + out);
  }
}

request(url_top, (error, response, body) => {
  if(!error) {
    $ = cheerio.load(body);
    const tum = $("#index").children("table").children("tbody").children("tr")

    get_data = (from_parse, in_obj) => {
      for(let i = 1; i < from_parse.length; i++) {
        let url = "http://rutor.info" + $($(from_parse[i]).children("td").children("a")[2]).attr("href");
        let text = $($(from_parse[i]).children("td").children("a")[2]).text();
        let size = $($($(from_parse[i]).children("td")[3]).attr("align", "right")).text();

        in_obj.push({text, url, size});
      }
    }
    //get_data(tum, arr_top);
    let size = $($($(tum[61]).children("td"))).text();  // разобраться с размером когда -1 td

    console.log(size)
    
  }

  arr_top.sort((a, b) => {
    // let nameA=a.size, nameB=b.size;
    // if (nameA < nameB) return -1;
    // if (nameA > nameB) return 1;
    return a.size - b.size;
  });

  
  
  // out_obj(obj_gai);
  //console.log(arr_top[0].text);
});
//setTimeout(() => out_obj(arr_top), 2000);