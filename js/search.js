var title_filter = "";

function create_tag(tag) {
  tag_class = '__' + tag.replace(/ /g, "_").replace(/&/g, "_");
  return '<a class="btn-flat ' + tag_class + '">' + tag + '</a>';
}

function create_links(link) {
  var tags = [];
  if (link[1] != "") {
    tags = link[1].split(',').map(create_tag);
  }
  tags = tags.join("");
  return '<tr><td><div><a class="paper_title title-font" href="#' + link[0] + '.md">' + link[0] + '</a></div>' + tags + '</td><td class="align-middle text-center">' + link[2] + '</td><td class="align-middle text-center">' + link[3] + '</td></tr>';
}

function embeding_search_tags_for_a_class_name(il, class_name, create_function) {
  _html = il;
  html = _html.map(create_function);
  var div = document.getElementsByClassName(class_name);
  var counter = 0
  while (counter < div.length) {
    div[counter].innerHTML = html.join("");
    counter = counter + 1
  }
}

function embeding_search_tags_for_a_id(il, id, create_function) {
  _html = il;
  html = _html.map(create_function);
  var div = document.getElementById(id);
  div.innerHTML = html.join("");
}

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

function search(title, path) {

  $(document).on('input', '._filter_input', function () {
    var value = $(this).val();
    $('._filter_input').val(value);
    var re = new RegExp(value);
    title_filter = re;
    table_show_and_hide();
  });

  $(document).on("click", '.btn-flat', function () {
    var category_name = $(this).html().replace('&amp;', '&');
    var new_tag_names = tag_names.filter(n => n !== category_name);
    if (new_tag_names.toString() == tag_names.toString()) {
      tag_names.unshift(category_name);
    } else {
      tag_names = new_tag_names;
    }
    $('.btn-flat').each(function () {
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
    title_filter = "";
    tag_names = [];
  });
};