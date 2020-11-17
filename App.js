#!/usr/bin/env node
require('dotenv').config()
var express = require('express'),
app = express(),
axios = require('axios')
argv = process.argv[2],
pck = require('./package.json'),  
port = process.env.PORT || argv || 3000;

app.get('/', (req, res) => {
    res.json({'info':'This is the version badge'})
})
app.get('/github', (req, res) => {
    res.redirect(pck.homepage)
})
app.get('/:user/:repo/:color/', (req, res,next) => {
    if (typeof req.params.user !== 'string' || req.params.user === '')
    return next(new Error('user param not specified'))
  if (typeof req.params.repo !== 'string' || req.params.repo === '')
    return next(new Error('repo param not specified'))
var Giturl = 'https://raw.github.com/' + req.params.user + '/' + req.params.repo + '/master/package.json'
axios.get(Giturl)
  .then(function (response) {
    var body = response.data
    if (typeof body.version !== 'string' || body.version === '')
      return next(new Error('version not found in package.json'))
      var color = req.params.color 
      var badgeUrl = `https://img.shields.io/badge/Version-${body.version}-${color}`
      res.type('svg').set('Cache-Control', 'no-cache')
    if(color=='text'){
    res.send('<!DOCTYPE svg PUBLIC "-//W3C//DTD VG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="10"><text y="9" font-size="12" fill="#2d2d2d" font-family="Arial">v' + body.version + '</text></svg>')
}
else{
    axios.get(badgeUrl)
  .then(function (response) {
res.send(response.data)
})
  .catch(function (error) {
    // handle error
    console.log(error);
  })
} 
})
  .catch((error) => {
    return next(err)  
})
})

app.listen(port, () => console.log(`server running at ${port}`))
