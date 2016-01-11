// ==UserScript==
// @name            Netflix Continue Playing
// @description     Automatically continues playing videos when Netflix interrupts the experience every third video with the "Continue Playing" dialog.
// @author          braincomb
// @icon            http://techblog.netflix.com/favicon.ico
// @homepageURL     https://github.com/braincomb/netflix-continueplaying
// @namespace       http://braincomb.com
// @version         0.1.4
// @include         http*://*.netflix.com/*
// @include         http*://netflix.com/*
// @require         https://code.jquery.com/jquery-2.1.4.min.js
// @grant           GM_registerMenuCommand
// ==/UserScript==

var menuCommandText = "Toggle True Continuous Play...";
var LS_TCP_KEY = "NetflixContinuePlaying_tcp";
var LS_NOTCP_INDEX_KEY = "NetflixContinuePlaying_notcp_index";
var noTcpThreshold = 2;

var tcp = localStorage.getItem(LS_TCP_KEY);
if (!tcp) {
  tcp = false; // set to off by default
  localStorage.setItem(LS_TCP_KEY, tcp);
}

var timesPauseSkipped = localStorage.getItem(LS_NOTCP_INDEX_KEY);
if (!timesPauseSkipped) {
  localStorage.setItem(LS_NOTCP_INDEX_KEY, 0);
}

GM_registerMenuCommand(menuCommandText, function() {
  var cssToggleMessage = 'width:100%;height:80px;position:absolute;top:0;background-color:#FF4081;margin:0 auto;text-align:center;line-height:80px;font-size:32px;color:#FFF;z-index:9999;box-shadow:0px 5px 5px #FFF;';
  var tcp = localStorage.getItem(LS_TCP_KEY);
  if (tcp == "false" || tcp == false) {
    localStorage.setItem(LS_TCP_KEY, true);
    $("<div style='" + cssToggleMessage + "'><span>True Continuous Play is now ON</span></div>").insertAfter("body").fadeIn(400).delay(1800).fadeOut(400);
  } else {
    localStorage.setItem(LS_TCP_KEY, false);
    $("<div style='" + cssToggleMessage + "'><span>True Continuous Play is now OFF</span></div>").insertAfter("body").fadeIn(400).delay(1800).fadeOut(400);
  }
}, "t");

$(window).load(function() {
  setInterval(function() {
    var timesPauseSkipped = localStorage.getItem(LS_NOTCP_INDEX_KEY);
    var c = $('button.continue-playing');
    if (c && c.length > 0 && (timesPauseSkipped < noTcpThreshold)) {
      c.click();
      timesPauseSkipped++;
      localStorage.setItem(LS_NOTCP_INDEX_KEY, timesPauseSkipped);
    } else if (c && c.length > 0 && (timesPauseSkipped == noTcpThreshold)) {
      $('.player-autoplay-interrupter').one("click", function() {
        localStorage.setItem(LS_NOTCP_INDEX_KEY, 0); // reset
      });
    }
  }, 5000);
});