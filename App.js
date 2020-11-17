#!/usr/bin/env node
require('dotenv').config()
var express = require('express'),
app = express(),
argv = process.argv[2],
port = process.env.PORT || argv || 3000;

app.get('/', (req, res) => {
    res.json({'info':'This is the version badge'})
})

app.listen(port, () => console.log(`server running at ${port}`))
