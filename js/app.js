var title_filter = "";
var size_states = 0;

function table_show_and_hide() {
  $('#_papers_tbody tr').each(function () {
    var sw_0 = 0;
    //var sw_0_arr = new Array(tag_names.length).fill(0);
    var sw_0_num = 0;
    $(this).find("td:eq(0) .btn-flat").each(function () {
      if (tag_names.indexOf($(this).html().replace('&amp;', '&')) >= 0) {
        sw_0_num++;
      }
    });
    //if(!sw_0_arr.inclodes(0)){
    if (sw_0_num == Object.keys(tag_names).length) {
      sw_0 = 1;
    }

    var sw_1 = 0;
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

function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function create_tag(tag) {
  tag_class = '__' + tag.replace(/ /g, "_").replace(/&/g, "_");
  return '<a class="btn-flat ' + tag_class + '">' + tag + '</a>';
}

function create_links(link) {
  var tags = [];
  //console.log(link);
  if (link[1] != "") {
    tags = link[1].split(',').map(create_tag);
  }
  tags = tags.join(" ");
  return '<tr ><td><a class="paper_title title-font" href="#' + link[0] + '.md">' + link[0] + '</a> ' + tags + ' </td><td>' + link[2] + '</td><td>' + link[3] + '</td></tr>';
}

function search(il, tl, title, path) {
  _html = il;
  html = _html.map(create_links);
  var div = document.getElementById("_papers_tbody");
  div.innerHTML = html.join("");
  _html = tl;
  html = _html.map(create_tag);
  var div = document.getElementById("_category_tags");
  div.innerHTML = html.join(" ");
  url_param = getParam("tag");
  if (url_param == null) {
    tag_names = []
    document.title = title;
  } else {
    tag_names = url_param.split(",");
    document.title = tag_names + " - " + title;
  }
  var $_tags_txt = $('.btn-flat');
  $_tags_txt.each(function () {
    for (var i = 0; i < Object.keys(tag_names).length; i++) {
      if (tag_names[i] == $(this).html().replace('&amp;', '&')) {
        $(this).toggleClass('hovered');
      }
    }
  });
  table_show_and_hide();

  /*create this page*/
  $('#_header').load('../html/index_header.html', function () {
    document.getElementById("page_title").innerHTML = title
    var size = document.getElementById("body").clientWidth;
    if (size < 576) {
      size_states = 1;
      $('#sidebar').appendTo('#s-sb');
    }
  });

  $(window).resize(function () {
    var size = document.getElementById("body").clientWidth;
    if (size < 576 && size_states == 0) {
      size_states = 1;
      $('#sidebar').appendTo('#s-sb');
    } else if (size >= 576 && size_states == 1) {
      size_states = 0;
      $('#sidebar').appendTo('#l-sb');
    }
  });

  $(function () {
    $("#_papers_table").tablesorter({});
    var $input = $('#_filter_input');
    $input.on('input', function (event) {
      var value = $input.val();
      var re = new RegExp(value);
      title_filter = re;
      table_show_and_hide();
    });
    $('.btn-flat').click(function () {
      var category_name = $(this).html().replace('&amp;', '&');
      var new_tag_names = tag_names.filter(n => n !== category_name);
      if (new_tag_names.toString() == tag_names.toString()) {
        tag_names.unshift(category_name);
      } else {
        tag_names = new_tag_names;
      }
      var $_tags_txt = $('.btn-flat');
      $_tags_txt.each(function () {
        if (category_name == $(this).html().replace('&amp;', '&')) {
          $(this).toggleClass('hovered');
        }
      });
      if (Object.keys(tag_names).length == 0) {
        document.title = title;
        window.history.replaceState('', '', '/' + path);
      } else {
        document.title = tag_names + " - " + title;
        window.history.replaceState('', '', '?tag=' + tag_names);
      }
      table_show_and_hide();
    });
    $('#_initialization_button').bind("click", function () {
      //var len=$('tbody tr').filter(':visible').length;
      //console.log(len);
      $('#_filter_input').val('');
      $('#_papers_tbody tr').show();
      $(".btn-flat").removeClass("hovered");
      title_filter = "";
      tag_names = [];
    });
  });

}

function detail(name, title) {
  $('#_header').load('../html/index_header_container.html', function () {
    document.getElementById("page_title").innerHTML = title;
  });

  var get = $.get;
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: false,
    smartypants: false
  });

  document.title = decodeURI(name).replace(".md", "") + " - " + title;
  // ページ内リンクなのでhistory.pushStateする必要はない
  get(name).catch(function () {
    return Promise.resolve("# 404 page not found");
  }).then(function (text) {
    // markedにlatexタグ食わせると&<>とかがエスケープされるので<pre />で包んで退避
    // ちなみに```mathとかで<pre><code class="lang-math">になったのはエスケープされるので注意
    var PREFIX = "<pre><code class=\"lang-math\">";
    var SUFFIX = "</code></pre>";
    var reg = new RegExp(
      ("(?:" + PREFIX + "([\\s\\S]*?)" + SUFFIX + ")")
        .replace(/\//g, "\/"),
      "gm");
    var wraped = text.split("$$")
      .reduce(function (sum, str, i) {
        return i % 2 === 0 ?
          sum + str :
          sum + PREFIX + str + SUFFIX;
      }, "");
    var html = marked(wraped);
    // 退避したlatexタグを$$で包み直す
    var _html = html;
    var tuple = null;
    while (tuple = reg.exec(html)) {
      _html = _html.split(tuple[0]).join("$$" + tuple[1] + "$$");
    }
    // mathjaxで処理
    var div = document.getElementById("content");
    div.innerHTML = _html;
    MathJax.Hub.Configured();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, div]);
  }).catch(function (err) {
    // jqueryのpromiseはthenの中でエラー吐いて止まってもconsoleに表示してくれないので表示させる
    console.error(err);
  });
}

function home(name) {
  $('#_header').load('../html/index_header_container.html', function () {
    document.getElementById("page_title").innerHTML = "Obarads"
  });

  var get = $.get;
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: false,
    smartypants: false
  });

  document.title = "Obarads - home"
  // ページ内リンクなのでhistory.pushStateする必要はない
  get(name).catch(function () {
    return Promise.resolve("# 404 page not found");
  }).then(function (text) {
    var _html = marked(text);
    var div = document.getElementById("content");
    div.innerHTML = _html;
  });
}