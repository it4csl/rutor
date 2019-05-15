#!/usr/bin/env iced

express = require('express')
cheerio = require('cheerio')
request = require('request')
app = express()

out_obj = (arr_s, arr_o) ->
  for s,i in arr_s
    out = """
      <tr>
        <td>#{i+1})</td>
        <td><a href="#{s.url}">#{s.text}</a></td>
        <td>#{s.size}</td>
      </tr>
      """#"
    arr_o.push out
  return

parse = (url, cb) ->
  await request url, defer(error, response, body)
  return if error
  $ = cheerio.load(body)
  obj_list_tr = $('#index').children('table').children('tbody').children('tr')

  for obj, i in obj_list_tr
    continue if i == 0
    url = 'http://rutor.info' + $($(obj).children('td').children('a')[2]).attr('href')
    text = $($(obj).children('td').children('a')[2]).text()
    size = 0
    if Object.keys($($($(obj).children('td')))).length == 8
      size = $($($(obj).children('td')[2])).text()
    if Object.keys($($($(obj).children('td')))).length == 9
      size = $($($(obj).children('td')[3])).text()
    arr_obj.push {text, url, size}
  cb()
  return

url_z_kino = 'http://rutor.info/browse/0/1/0/2'
arr_obj = []
arr_html = []

for i in [0 ... 2]
  console.log "page #{i}"
  new_url = "http://rutor.info/browse/#{i}/1/0/2"
  await parse new_url, defer()

arr_obj.sort (a, b)->
  a.text.localeCompare b.text

out_obj arr_obj, arr_html

app.get '/', (req, res) ->
  res.end """
    <html>
        <head>
          <meta charset="utf-8">
          <style>
            body, table {
              font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;
              font-size: 12px;
            }
            a {
              text-decoration: none;
              color: #000000;
            }
            tr:hover {
              background: #bccae0;
              color: #ffe;
            } 
          </style>
        </head>
        <body>
          <table>
            <tbody>
              <h3>Top</h3>
              #{arr_html.join("")}
            </tbody>
          </table>
        </body>
    </html>
  """
  return
app.listen 9999
console.log "started"
