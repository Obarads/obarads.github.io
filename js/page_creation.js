function table_show_and_hide(title_filter, tag_names) {
  $('#_papers_tbody tr').each(function () {
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

function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
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
  var preview = "<a class='toc-title' href=\"javascript:id_scroll('"
    + "_1-0"
    + "')\">"
    + page_title
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
  $('.headline-preview').html(preview);
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

function adding_param(url_param, def_url_param){
  let result = ""
  if(url_param != def_url_param){
    result = "&"
  }
  return result
}

function getting_search_parameters(category_name=null) {
  // コメントアウトはタイトル検索に基づくもの
  //let url_tf = getParam("tf", null);
  var url_tag = getParam("tag", null);
  var tag_names = []
  var new_tag_names = []
  //let title_filter = ""

  /* urlから検索パラメータの抽出 */
  if (url_tag != null){
    tag_names = url_tag.split(",");
    if(category_name != null){
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
  return {tag_names: tag_names, new_tag_names: new_tag_names}
}

function setting_search_parameters(tag_names, title, title_filter){
  let def_url_param = "?"
  let additional_url_param = def_url_param

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
  if (adding_param(additional_url_param, def_url_param) === ""){
    additional_url_param = ""
  }

  window.history.replaceState('', '', "/papers/" + additional_url_param);
}

class PapersDirIndex {
  constructor({ title = "", position = "" }) {
    this.title = title
    this.position = position
  }

  setting({ title = "", position = "" }) {
    if (title != "") {
      this.title = title
    }
    if (position != "") {
      this.position = position
    }
  }


  event_start() {
    const title = this.title
    var title_filter = ""

    $(document).on('input', '._filter_input', function () {
      let {tag_names, new_tag_names} = getting_search_parameters()
      let value = $(this).val();
      $('._filter_input').val(value);
      title_filter = value;
      setting_search_parameters(tag_names, title, title_filter)
      table_show_and_hide(title_filter, tag_names);
    });

    $(document).on("click", '.btn-flat', function () {
      let category_name = $(this).html().replace('&amp;', '&');

      let {tag_names, new_tag_names} = getting_search_parameters(category_name)

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

      setting_search_parameters(tag_names, title, title_filter)
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
      title_filter = ""
      window.history.replaceState('', '', href[0]);
    });
  }

  creating_detail() {
    var main_left = <TOCPanel />
    var main_right = <MDPanel />
    var name = location.hash.slice(1) + ".md"
    var add_item = <Collapser _add_item_title="Table of Contents" _add_item_contents={main_left} />
    //var bc = <DetailBreadcrumbContents disp={decodeURI(name).replace(".md", "")}/>
    var bc = <DetailBreadcrumbContents disp="detail" />

    ReactDOM.hydrate(
      <PapersIndex _main_left={main_left} _main_right={main_right} _add_item={add_item} _header_title={this.title} bc={bc} />,
      document.getElementById(this.position)
    );

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

    document.title = decodeURI(name).replace(".md", "") + " - " + this.title;

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
      var div = document.getElementById("_md_panel_contents");
      div.innerHTML = _html;
      MathJax.Hub.Configured();
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, div]);

      // tocに対する処理
      chenge_id_and_headline(text)
      var div = document.getElementsByClassName("headline-preview");
      for (var i = 0; i < div.length; i++) {
        div[i].innerHTML
        MathJax.Hub.Configured();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, div]);
      }
    }).catch(function (err) {
      // jqueryのpromiseはthenの中でエラー吐いて止まってもconsoleに表示してくれないので表示させる
      console.error(err);
    });
  }

  creating_search() {
    let main_left = <SearchPanel />
    let main_right = <TablePanel />
    let add_item = <SearchPanel />
    let bc = <PapersBreadcrumbContents />
    let {tag_names, new_tag_names} = getting_search_parameters()

    //ReactDOM.unmountComponentAtNode(document.getElementById(position))
    ReactDOM.hydrate(
      <PapersIndex _main_left={main_left} _main_right={main_right} _add_item={add_item} _header_title={this.title} bc={bc} />,
      document.getElementById(this.position)
    );

    var url_tag = getParam("tag", null);
    if (url_tag == null) {
      this.tag_names = []
      document.title = this.title;
    } else {
      this.tag_names = url_tag.split(",");
      document.title = this.tag_names + " - " + this.title;
    }

    $('.btn-flat').each(function () {
      for (var i = 0; i < Object.keys(tag_names).length; i++) {
        if (tag_names[i] == $(this).html().replace('&amp;', '&')) {
          $(this).toggleClass('hovered');
        }
      }
    });
    //$('._filter_input').val(title_filter);
    let title_filter = ""

    $("#_papers_table").tablesorter({});
    setting_search_parameters(tag_names, this.title, title_filter)
    table_show_and_hide(title_filter, tag_names);
  }
}

class HomeDirIndex {
  constructor({ title = "", position = "" }) {
    this.title = title
    this.position = position
  }

  setting({ title = "", position = "" }) {
    if (title != "") {
      this.title = title
    }
    if (position != "") {
      this.position = position
    }
  }

  creating_home(){
    let main_left = <PapersActivityLog />
    let main_right = ""
    let add_item = <Collapser _add_item_title="Update log" _add_item_contents={main_left}/>
    var bc = <HomeBreadcrumbContents />

    ReactDOM.hydrate(
      <PapersIndex _main_left={main_left} _main_right={main_right} _add_item={add_item} _header_title={this.title} bc={bc}/>,
      document.getElementById(this.position)
    );

    document.title = this.title
    name = "README.md"
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
    // ページ内リンクなのでhistory.pushStateする必要はない
    get(name).catch(function () {
      return Promise.resolve("# 404 page not found");
    }).then(function (text) {
      var _html = marked(text);
      var div = document.getElementById("_main_right");
      div.innerHTML = _html;
    });
  }
}