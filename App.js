#!/usr/bin/env node
require('dotenv').config()
var express = require('express'),
app = express(),
argv = process.argv[2],
pck = require('./package.json'),  
port = process.env.PORT || argv || 3000;

app.get('/', (req, res) => {
    res.json({'info':'This is the version badge'})
})

app.get('/github', (req, res) => {
    res.redirect(pck.homepage)
})

app.get('/:user/:repo', (req, res,next) => {
    if (typeof req.params.user !== 'string' || req.params.user === '')
    return next(new Error('user param not specified'))
  if (typeof req.params.repo !== 'string' || req.params.repo === '')
    return next(new Error('repo param not specified'))
var Giturl = 'https://raw.github.com/' + req.params.user + '/' + req.params.repo + '/master/package.json'

})

app.listen(port, () => console.log(`server running at ${port}`))
