// ==UserScript==
// @name                hide already liked/retweeted tweetdeck
// @version             1.0
// @match               https://tweetdeck.twitter.com/*
// @grant               none
// ==/UserScript==

(function() {
    'use strict';

    const to_hide = [
        `i.js-icon-favorite.icon-heart-filled`,
        `i.js-icon-retweet.icon-retweet-filled`
    ];
    let updating = false;

    function init(times) {
        for (let i=0; i<times; i++) {
            for (const target of to_hide) {
                setTimeout(() => hideTweets(target), 500 * i);
            }
        }
    }

    function hideTweets(target) {
        document.querySelectorAll(`${target}:not(.userscript-already-hidden)`).forEach(icon => {
            let tweet = icon.closest(".stream-item");
            if (!tweet.querySelector(':hover')) { // don't pull stuff out from beneath our feet
              icon.classList.add("userscript-already-hidden");
              tweet.style.display = "none";
              console.log("rm", tweet, "for reason", target);
            }
        });
    }

    function update() {
        if (updating) return;
        console.log("updating");
        updating = true;
        init(3);
        setTimeout(() => { updating = false; }, 1000);
    }

    // listen to document scroll events, as tweetdeck columns aren't `window`
    // useCapture true because scroll doesn't normally bubble
    document.addEventListener('scroll', update, true);
    init(10);
})();
