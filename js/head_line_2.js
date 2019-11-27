
function chenge_id_and_headline2(markdown) {
    //function chenge_id() {
    var h_list = [1, 2, 3, 4, 5]
    var new_ids = []
    for (var i in h_list) {
        var h = h_list[i]
        var element = document.getElementsByTagName("h" + h)
        var counter = 0
        while (counter < element.length) {
            var new_id = "_" + h + "-" + counter
            element[counter].id = new_id
            new_ids.push(new_id)
            counter = counter + 1
        }
    }
    /* return new_ids} */

    // ↓この関数はchange_id()と一体化していると考えていい。
    //function headline(markdown) {
    var lines = markdown.split("\n");
    var headline = [];
    var in_code = false;
    for (var it in lines) {
        if (lines[it].match(/^```.?/)) {
            // コードの行内の場合は外す
            in_code = in_code ? false : true;
        }
        if (lines[it][0] == '#' && !in_code && lines[it][1] != ' ') {
            // 先頭の#とスペースを削除して追加
            headline.push([lines[it].replace(/^#+/, '').trim(), lines[it].split(" ")[0].length]);
        }
        // #が1個だけ(記事のタイトル)の場合のみ別の処理
        if (lines[it][0] == '#' && !in_code && lines[it][1] == ' ') {
            var page_title = lines[it].replace(/^#+/, '').trim()
        }
    }
    // 表示用のリスト構文
    var preview = "<a class='toc-title' href=\"javascript:id_scroll('"
        + "_1-0"
        + "')\">"
        + page_title
        + "</a><br>";
    preview += "<div class='toc-outer'>"
    var counter = [0, 0, 0, 0, 0] // [h1,h2,h3,h4,h5]
    var ago = 2
    for (var it in headline) {
        if (headline[it][1] === ago || headline[it][1] === 5) {
            preview += creating_preview(headline, it, counter);
        } else if (headline[it][1] < ago) {
            preview += creating_preview(headline, it, counter);
            preview += "</div>".repeat(ago - headline[it][1])
        } else if (headline[it][1] > ago) {
            preview += "<div class='toc'>"
            preview += creating_preview(headline, it, counter);
        }
        if (headline[it][1] !== 5) {
            ago = headline[it][1]
        }
        counter[headline[it][1] - 1] = counter[headline[it][1] - 1] + 1
    }
    $('.toc-contents').html(preview);
    /*return null}*/
}

function creating_preview(headline,it,counter){
    var preview = "<div class='toc-con-"
    + headline[it][1]
    + "'>"
    + "<div class='toc-con2-"
    + headline[it][1]
    + "'>"
    + "<a href=\"javascript:id_scroll('"
    + "_" + headline[it][1] + "-" + counter[headline[it][1] - 1]
    + "')\">"
    + headline[it][0]
    + "</a></div></div>";
    return preview
}