// ==UserScript==
// @name    hide already liked/retweeted tweetdeck
// @version 1.0
// @match   https://tweetdeck.twitter.com/*
// @run-at  document-idle
// ==/UserScript==

(function() {
  'use strict';

  const observer = new MutationObserver(mutations => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' &&
          mutation.target.className.includes("chirp-container") &&
          mutation.addedNodes.length > 1) {
        for (let tweet of mutation.addedNodes) {
          if (tweet.querySelectorAll(`i.js-icon-favorite.icon-heart-filled, i.js-icon-retweet.icon-retweet-filled`).length > 0) {
            tweet.style.display = "none";
            console.log("rm", tweet);
          }
        }
      }
    });
  });

  // observe on .application, which also includes e.g. user chirp-container modals
  observer.observe(document.querySelector(".application"), {childList: true, subtree: true});
})();
