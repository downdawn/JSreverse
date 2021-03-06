// ==UserScript==
// @name         Hook setInterval
// @namespace    http://match.yuanrenxue.com/match/16
// @version      0.1
// @description  Hook
// @author       down
// @match        http://match.yuanrenxue.com/match/16
// @grant        none
// @run-at document-start
// ==/UserScript==
(function () {
    'use strict'
    window.setInterval = function(f, t) {
        console.log('hooked!')
    }
})()