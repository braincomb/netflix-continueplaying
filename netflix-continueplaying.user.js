// ==UserScript==
// @name            Netflix Continue Playing
// @description     Automatically continues playing videos when Netflix interrupts the experience every third video with the "Continue Playing" dialog.
// @author          braincomb
// @icon            http://techblog.netflix.com/favicon.ico
// @homepageURL     https://github.com/braincomb/netflix-continueplaying
// @namespace       http://braincomb.com
// @version         0.1.2
// @include         http*://*.netflix.com/*
// @include         http*://netflix.com/*
// @require         https://code.jquery.com/jquery-2.1.4.min.js
// @grant           none
// ==/UserScript==

$(window).load(function() {
  setInterval(function() {
    var c = $('button.continue-playing');
    if (c) {
      c.click();
    }
  }, 5000);
});