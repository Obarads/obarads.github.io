
function chenge_id() {
  var h_list = [1, 2, 3, 4, 5]
  var new_ids = []
  for (var i in h_list) {
    h = h_list[i]
    var element = document.getElementsByTagName("h" + h)
    var counter = 0
    while (counter < element.length) {
      new_id = "_" + h + "-" + counter
      element[counter].id = new_id
      new_ids.push(new_id)
      counter = counter + 1
    }
  }
  return new_ids
}

function headline(markdown, new_ids) {
  lines = markdown.split("\n");
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
      title = lines[it].replace(/^#+/, '').trim()
    }
  }

  // 表示用のリスト構文
  var preview = "<a style='font-size: 30px; color: white;' href=\"javascript:id_scroll('"
    + "_1-0"
    + "')\">"
    + title
    + "</a><br>";
  var counter = [0, 0, 0, 0, 0] // [h1,h2,h3,h4,h5]
  for (var it in headline) {
    preview += "<div class='toc-"
      + headline[it][1]
      + "'>"
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
  // 確認用
  $('#headline-preview').html(preview);
  // 更新用
  $('#headline').html(headline.join(','));
}

function id_scroll(id_name) {
  var element = document.getElementById(id_name);
  element.scrollIntoView({
    behavior: 'auto',
    block: 'start',
    inline: 'nearest',
  });
}

function detail(name, title) {
  $('#_header').load('../html/header.html', function () {
    document.getElementById("page_title").innerHTML = title;
  });
  $("#_main_left").load("/html/detail/main_left.html");

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
    var div = document.getElementById("_main_right");
    div.innerHTML = _html;
    MathJax.Hub.Configured();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, div]);
    new_ids = chenge_id()
    headline(text, new_ids)
    var div = document.getElementById("headline-preview").innerHTML;
    MathJax.Hub.Configured();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, div]);
  }).catch(function (err) {
    // jqueryのpromiseはthenの中でエラー吐いて止まってもconsoleに表示してくれないので表示させる
    console.error(err);
  });
}

