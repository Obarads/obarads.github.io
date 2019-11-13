function home(name) {
  $('#_header').load('../html/header.html', function () {
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
    var div = document.getElementById("_main_right");
    div.innerHTML = _html;
  });
}