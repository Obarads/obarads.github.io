function HomeBreadcrumbContents() {
    return "<ol class=\"breadcrumb\">" + BreadcrumbActive("OPMemo") + "</ol>";
}
function CriteriaBreadcrumbContents() {
    return "<ol class=\"breadcrumb\">" + Breadcrumb("OPMemo", "/") + BreadcrumbActive("papers") + "</ol>";
}
function DetailBreadcrumbContents() {
    return "<ol class=\"breadcrumb\">" + Breadcrumb("OPMemo", "/") + Breadcrumb("papers", "/papers/") + BreadcrumbActive("detail") + "</ol>";
}
function Breadcrumb(disp, link) {
    return "<li class=\"breadcrumb-item\"><a href=\"" + link + "\">" + disp + "</a></li>";
}
function BreadcrumbActive(disp) {
    return "<li class=\"breadcrumb-item active\" aria-current=\"page\">" + disp + "</li>";
}
function CreatingTags(raw_tags, join = true) {
    var tags = raw_tags.map((raw_tag) => {
        var cn = "btn-flat " + "__" + raw_tag.replace(/ /g, "_").replace(/&/g, "_");
        return "<a class=\"" + cn + "\">" + raw_tag + "</a>"
    });
    if (join) {
        tags = tags.join("")
    }
    return tags
}
function CreatingLinks(raw_links, join = true) {
    var link_counter = -1
    var links = raw_links.map((raw_link) => {
        link_counter = link_counter + 1
        var tags = CreatingTags(raw_link[1].split(','));
        var raw_link_for_href = "/papers/#" + raw_link[0]
        return "<tr><td><div><a class=\"paper_title title-font\" href=\"" + raw_link_for_href + "\">" + raw_link[4] + "</a></div>" + tags + "</td><td class=\"align-middle text-center\">" + raw_link[2] + "</td><td class=\"align-middle text-center\">" + raw_link[3] + "</td></tr>"
    });
    if (join) {
        links = links.join("")
    }
    return links;
}
function CreatingLinksForActLog(raw_actlogs, join = true) {
    var link_counter = -1
    var actlogs = raw_actlogs.map((actlog) => {
        link_counter = link_counter + 1
        var raw_link_for_href = "/papers/#" + actlog[1]
        return "<div class=\"actlog_row\"><div>" + link_counter + " : " + actlog[0] + " : " + actlog[3] + "</div><a class=\"paper_title title-font\" href=\"" + raw_link_for_href + "\">" + actlog[4] + "</a><div>" + CreatingTags(actlog[2].split(',')) + "</div></div>"
    });
    if (join) {
        actlogs = actlogs.join("")
    }
    return actlogs;
}

function chenge_id_and_headline(markdown) {
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
    $('.toc-title').html(page_title);
    var preview = ""
    var counter = [0, 0, 0, 0, 0] // [h1,h2,h3,h4,h5]
    for (var it in headline) {
        preview += "<div class='toc-"
            + headline[it][1]
            + "' style='display: block;'>"
            + "<div class='toc-con-"
            + headline[it][1]
            + "'>"
            + "<div class='toc-con2-"
            + headline[it][1]
            + "'>"
            + "<a href=\"javascript:id_scroll('"
            + "_" + headline[it][1] + "-" + counter[headline[it][1] - 1]
            + "')\">"
            + headline[it][0]
            + "</a></div></div></div>";
        counter[headline[it][1] - 1] = counter[headline[it][1] - 1] + 1
    }
    $('.toc-contents').html(preview);
    /*return null}*/
}
function id_scroll(id_name) {
    var element = document.getElementById(id_name);
    element.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
    });
}

function adding_param(url_param, def_url_param) {
    let result = ""
    if (url_param != def_url_param) {
        result = "&"
    }
    return result
}

function getting_search_parameters(category_name = null) {
    // コメントアウトはタイトル検索に基づくもの
    //let url_tf = getParam("tf", null);
    var url_tag = getParam("tag", null);
    var tag_names = []
    var new_tag_names = []
    //let title_filter = ""

    /* urlから検索パラメータの抽出 */
    if (url_tag != null) {
        tag_names = url_tag.split(",");
        if (category_name != null) {
            new_tag_names = url_tag.split(",").filter(n => n !== category_name);
        }
    }
    /*
    if(url_tf===null){
      title_filter = ""
    }else{
      title_filter = url_tf.replace("/","")
    }*/

    //return {tag_names: tag_names, new_tag_names: new_tag_names, title_filter: title_filter}
    return { tag_names: tag_names, new_tag_names: new_tag_names }
}

function setting_search_parameters(tag_names, title, title_filter) {
    var def_url_param = "?"
    var additional_url_param = def_url_param

    /* タグに関してurlへの結果反映 */
    if (Object.keys(tag_names).length == 0) {
        document.title = title;
    } else {
        document.title = tag_names + " - " + title;
        additional_url_param += 'tag=' + tag_names
    }

    /* タイトル検索に関してurlへの結果反映 */
    /* xss対策とかするのめんどくさいためなしで encodeURIComponentとか使えば良さそう*/
    /*
    if (title_filter != "") {
      additional_url_param += adding_param(additional_url_param, def_url_param) + 'tf=' + title_filter
    }
    */

    /* 検索の?を消すかどうか */
    if (adding_param(additional_url_param, def_url_param) === "") {
        additional_url_param = ""
    }

    window.history.replaceState('', '', "/papers/" + additional_url_param);
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function table_show_and_hide(title_filter, tag_names) {
    $('#papers_tbody tr').each(function () {
        var sw_0 = 0;
        var sw_0_num = 0;
        var sw_1 = 0;

        $(this).find("td:eq(0) .btn-flat").each(function () {
            if (tag_names.indexOf($(this).html().replace('&amp;', '&')) >= 0) {
                sw_0_num++;
            }
        });

        if (sw_0_num == Object.keys(tag_names).length) {
            sw_0 = 1;
        }

        if ($(this).find("td:eq(0) .paper_title").html().match(title_filter) != null) {
            sw_1 = 1;
        }

        if (sw_0 && sw_1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function event_start(title, tag_names) {
    const _title = title
    var title_filter = ""

    $(document).on('input', '._filter_input', function () {
        var { tag_names, new_tag_names } = getting_search_parameters()
        var value = $(this).val();
        $('._filter_input').val(value);
        title_filter = value;
        setting_search_parameters(tag_names, _title, title_filter)
        table_show_and_hide(title_filter, tag_names);
    });

    $(document).on("click", '.btn-flat', function () {
        var category_name = $(this).html().replace('&amp;', '&');

        var { tag_names, new_tag_names } = getting_search_parameters(category_name)

        /* 検索タグの有無を調べて検索タグ追加or削除 */
        if (new_tag_names.toString() == tag_names.toString()) {
            tag_names.unshift(category_name);
        } else {
            tag_names = new_tag_names;
        }

        /* btnのホバー処理 */
        $('.btn-flat').each(function () {
            if (category_name == $(this).html().replace('&amp;', '&')) {
                $(this).toggleClass('hovered');
            }
        });

        setting_search_parameters(tag_names, _title, title_filter)
        table_show_and_hide(title_filter, tag_names);
    });

    /* table column sw */
    $(document).on("click", '.btn-column', function () {
        var column_name = $(this).html().split(' ')[0];
        var column_dict = { 'Title': 1, 'Year': 2, 'Status': 3 };
        var cn = String(column_dict[column_name]);
        $("td:nth-of-type(" + cn + ")")
            .toggleClass("column-hidden");
        $("th:nth-of-type(" + cn + ")")
            .toggleClass("column-hidden");
        $(this).toggleClass("bc-hovered");
    });

    $(document).on("click", '._initialization_button', function () {
        $('._filter_input').val('');
        $('#_papers_tbody tr').show();
        $(".btn-flat").removeClass("hovered");
        var href = (window.location.href).split("?");
        window.history.replaceState('', '', href[0]);
        title_filter = ""
        var { tag_names, new_tag_names } = getting_search_parameters()
        table_show_and_hide(title_filter, tag_names)
    });
}

function toc_toggle_switch(companion_id){
    const toc5 = document.getElementsByClassName("toc-5");
    Array.prototype.forEach.call(toc5, function(t5) {
        if(t5.style.display=="block"){
            // noneで非表示
            t5.style.display ="none";
        }else{
            // blockで表示
            t5.style.display ="block";
        }
    });
    var companion = document.getElementById(companion_id)
    companion.checked = !companion.checked
}