
/*!
 * Lunr languages, `Japanese` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Chad Liu
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory)
    } else if (typeof exports === 'object') {
        /**
         * Node. Does not work with strict CommonJS, but
         * only CommonJS-like environments that support module.exports,
         * like Node.
         */
        module.exports = factory()
    } else {
        // Browser globals (root is window)
        factory()(root.lunr);
    }
}(this, function() {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return function(lunr) {
        /* throw error if lunr is not yet included */
        if ('undefined' === typeof lunr) {
            throw new Error('Lunr is not present. Please include / require Lunr before this script.');
        }

        /* throw error if lunr stemmer support is not yet included */
        if ('undefined' === typeof lunr.stemmerSupport) {
            throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
        }

        /*
        Japanese tokenization is trickier, since it does not
        take into account spaces.
        Since the tokenization function is represented different
        internally for each of the Lunr versions, this had to be done
        in order to try to try to pick the best way of doing this based
        on the Lunr version
         */
        var isLunr2 = lunr.version[0] == "2";

        /* register specific locale function */
        lunr.jp = function() {
            this.pipeline.reset();
            this.pipeline.add(
                lunr.jp.stopWordFilter,
                lunr.jp.stemmer
            );

            // change the tokenizer for japanese one
            if (isLunr2) { // for lunr version 2.0.0
                this.tokenizer = lunr.jp.tokenizer;
            } else {
                if (lunr.tokenizer) { // for lunr version 0.6.0
                    lunr.tokenizer = lunr.jp.tokenizer;
                }
                if (this.tokenizerFn) { // for lunr version 0.7.0 -> 1.0.0
                    this.tokenizerFn = lunr.jp.tokenizer;
                }
            }
        };
        var segmenter = new lunr.TinySegmenter();  // インスタンス生成

        lunr.jp.tokenizer = function (obj) {
            if (!arguments.length || obj == null || obj == undefined) return []
            if (Array.isArray(obj)) return obj.map(function (t) { return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase() })

            var str = obj.toString().toLowerCase().replace(/^\s+/, '')

            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1)
                    break
                }
            }

            var segs = segmenter.segment(str);  // 単語の配列が返る
            return segs.filter(function (token) {
                    return !!token
                })
                .map(function (token) {
                    return isLunr2 ? new lunr.Token(token) : token
                })
        }

        /* lunr stemmer function */
        lunr.jp.stemmer = (function() {

            /* TODO japanese stemmer  */
            return function(word) {
                return word;
            }
        })();

        lunr.Pipeline.registerFunction(lunr.jp.stemmer, 'stemmer-jp');
        lunr.jp.wordCharacters = "一二三四五六七八九十百千万億兆一-龠々〆ヵヶぁ-んァ-ヴーｱ-ﾝﾞa-zA-Zａ-ｚＡ-Ｚ0-9０-９";

        /* stop word filter function */
        lunr.jp.stopWordFilter = function(token) {
            if (lunr.jp.stopWordFilter.stopWords.indexOf(isLunr2 ? token.toString() : token) === -1) {
                return token;
            }
        };

        // stopword for japanese is from http://www.ranks.nl/stopwords/japanese
        lunr.jp.stopWordFilter = lunr.generateStopWordFilter('的 一 不 在 人 有 是 为 以 于 上 他 而 后 之 来 及 了 因 下 可 到 由 这 与 也 此 但 并 个 其 已 无 小 我 们 起 最 再 今 去 好 只 又 或 很 亦 某 把 那 你 乃 它 吧 被 比 别 趁 当 从 到 得 打 凡 儿 尔 该 各 给 跟 和 何 还 即 几 既 看 据 距 靠 啦 了 另 么 每 们 嘛 拿 哪 那 您 凭 且 却 让 仍 啥 如 若 使 谁 虽 随 同 所 她 哇 嗡 往 哪 些 向 沿 哟 用 于 咱 则 怎 曾 至 致 着 诸 自'.split(' '));
        lunr.Pipeline.registerFunction(lunr.jp.stopWordFilter, 'stopWordFilter-jp');
    };
}))
