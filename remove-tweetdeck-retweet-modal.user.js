// ==UserScript==
// @name        Remove TweetDeck Retweet Modal Dialog
// @description Skips the "Retweet to your followers?" modal asking whether or not to quote tweet for TweetDeck
// @namespace   https://github.com/alexwh
// @updateURL   https://github.com/alexwh/userscripts/raw/master/remove-tweetdeck-retweet-modal.user.js
// @version     1.0
// @match       https://tweetdeck.twitter.com/*
// ==/UserScript==

(function() {
  'use strict';

    // monkeypatch the displayTweet function that's called near the end of
    // initing the ActionDialog object. we need to call selectAccount first
    // since that's done after the displayTweet call, and we can't really
    // cleanly patch anything later. the original code calls, in order:
    // this.displayTweet(t)
    // this.accountSelector.$node.on(TD.components.AccountSelector.CHANGE, this._handleAccountSelectionChange.bind(this))
    // this.accountSelector.selectAccount(t.account)
    // this.setAndShowContainer((0, s.default) ('#actions-modal'))

    TD.components.ActionDialog.prototype.displayTweet = function(t) {
        this.accountSelector.selectAccount(t.account)
        this._retweet()
    }

    // patch setAndShowContainer to not show if we're being called from the
    // retweet ActionDialog. two places call with the #actions-modal selector,
    // retweets, and lists. to not remove lists, check for the presence of the
    // this.$retweetButton variable also. the rest of the function after the
    // first line remains unchanged from the original
    TD.components.BaseModal.prototype.setAndShowContainer = function(e, t) {
        if (e.selector === "#actions-modal" && typeof this.$retweetButton !== 'undefined') { return; }
        'boolean' != typeof t && (t = !0),
            t && e.empty(),
            e.append(this.$node).show(),
            this._checkIfTouchModal(e)
    }
})();
