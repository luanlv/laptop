(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var Main = Main || {};

// Main.Home = require('./main/_home.msx');
//Main.Dashboard = require('./main/_dashboard.msx');
// Main.Product = require('./main/_product.msx');
// Main.Category = require('./main/_category.msx');
// Main.Search = require('./main/_search.msx');

module.exports = Main;
},{}],2:[function(require,module,exports){
"use strict";


m.route.mode = "pathname";

//window.Nav = require('./_nav.msx');
window.Main = require('./_main.msx');
//window.Footer = require('./_footer.msx');



//re-route to dashboard
//m.route("/dashboard"); // logs "unloading home component"








},{"./_main.msx":1}]},{},[2])