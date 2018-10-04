/**
 * 改行をBRタグに変換
 * 
 * @param {String} str 変換したい文字列
 */
var nl2br = function(str) {
    return str.replace(/\n/g, '<br>');
};
/**
 * BRタグを改行に変換（BRの大文字・小文字の区別なし）
 * 
 * @param {String} str 変換したい文字列
 */
var br2nl = function(str) {
    return str.replace(/(<br>|<br \/>)/gi, '\n');
};

/**
 * ひらがなを全角カタカナに変換
 * 
 * 濁音・半濁音のある場合一文字に変換するかは今後の課題
 *
 * 以下の文字は結合してカタカナに変換
 * 「う゛」→「ヴ」
 * 「わ゛」→「ヷ」
 * 「ゐ゛」→「ヸ」
 * 「ゑ゛」→「ヹ」
 * 「を゛」→「ヺ」
 * 「ゝ゛」→「ヾ」
 * 
 * @param {String} str 変換したい文字列
 * @param {Boolean} opt 小文字の「ゕ」「ゖ」を変換するかどうか falseを指定した場合は変換なし
 */
var hira2kana = function(str, opt) {
    str = str
        .replace(/[ぁ-ゔ]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
        })
        .replace(/ﾞ/g, '゛')
        .replace(/ﾟ/g, '゜')
        .replace(/(ウ゛)/g, 'ヴ')
        .replace(/(ワ゛)/g, 'ヷ')
        .replace(/(ヰ゛)/g, 'ヸ')
        .replace(/(ヱ゛)/g, 'ヹ')
        .replace(/(ヲ゛)/g, 'ヺ')
        .replace(/(ゝ゛)/g, 'ヾ')
        .replace(/ゝ/g, 'ヽ')
        .replace(/ゞ/g, 'ヾ');
    if (opt !== false) {
        str = str.replace(/ゕ/g, 'ヵ').replace(/ゖ/g, 'ヶ');
    }
    return str;
};

/**
 * 半角から全角に置き換え
 *
 * チルダは全角チルダに変換
 * 
 * @param {String} str 変換したい文字列
 * @param {Boolean} tilde チルダ falseを指定した場合は変換なし
 * @param {Boolean} mark 記号 falseを指定した場合は変換なし
 * @param {Boolean} hankana 半角カナ記号 falseを指定した場合は変換なし
 * @param {Boolean} space スペース falseを指定した場合は変換なし
 * @param {Boolean} alpha 英字 falseを指定した場合は変換なし
 * @param {Boolean} num 数字 falseを指定した場合は変換なし
 */
var han2zen = function(str, tilde, mark, hankana, space, alpha, num) {
    if (alpha !== false) {
        str = str.replace(/[A-Za-z]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }
    if (num !== false) {
        str = str.replace(/\d/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }
    if (mark !== false) {
        var reg = /[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`\{\|\}]/g;
        str = str.replace(reg, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }
    if (tilde !== false) {
        str = str.replace(/~/g, '～');
    }
    if (space !== false) {
        str = str.replace(/ /g, '　');
    }
    if (hankana !== false) {
        var map = { '｡': '。', '､': '、', '｢': '「', '｣': '」', '･': '・' };
        var reg = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');
        str = str.replace(reg, function(match) {
            return map[match];
        });
    }
    return str;
};

function test() {
    console.log(nl2br("ss"));
    console.log(br2nl("Av<br>"));
    console.log(hira2kana("あ"));
    console.log(han2zen("AA_"));
}
test();