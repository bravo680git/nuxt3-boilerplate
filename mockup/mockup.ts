/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const baseUrl = '/mockup/';

function sendResponse(req, res, url) {
  const apiPath = path.join(__dirname, url);
  const jsonData = fs.readFileSync(apiPath);
  res.status(200).send(jsonData);
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.options('*', function (req, res) {
  res.sendStatus(200);
});

app.use(baseUrl + 'getUser', (req, res) => {
  sendResponse(req, res, './getUser.json');
});

app.listen(8081);
