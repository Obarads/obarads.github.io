// https://ja.reactjs.org/docs/state-and-lifecycle.html
// https://codepen.io/gaearon/pen/amqdNA?editors=0010
function HomeBreadcrumbContents(props) {
  return (
    <ol className="breadcrumb">
      <BreadcrumbActive disp="OPMemo" />
    </ol>
  );
}
function PapersBreadcrumbContents(props) {
  return (
    <ol className="breadcrumb">
      <Breadcrumb link="/" disp="OPMemo" />
      <BreadcrumbActive disp="papers" />
    </ol>
  );
}
function DetailBreadcrumbContents(props) {
  return (
    <ol className="breadcrumb">
      <Breadcrumb link="/" disp="OPMemo" />
      <Breadcrumb link="/papers" disp="papers" />
      <BreadcrumbActive disp={props.disp} />
    </ol>
  );
}
function Breadcrumb(props) {
  return <li className="breadcrumb-item"><a href={props.link}>{props.disp}</a></li>;
}
function BreadcrumbActive(props) {
  return <li className="breadcrumb-item active" aria-current="page">{props.disp}</li>;
}
class Header extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark tab-color font-noto scrollable-menu col-lg-9" aria-label="breadcrumb">
        {this.props.breadcrumb_contents}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto"></ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/papers/">Papers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/Obarads/obarads.github.io">Github</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/Obarads/obarads.github.io/issues">Issues</a>
            </li>
            <li className="nav-item">
              <div id="_add_item" className="d-block d-lg-none d-xl-none">
                {this.props.add_item}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class Collapser extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <div className="pos-f-t">
        <a className="nav-link" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" href="" >
          {this.props._add_item_title}
        </a>
        <div className="collapse" id="navbarToggleExternalContent">
          {this.props._add_item_contents}
        </div>
      </div>
    )
  }
}

class PapersIndex extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 left-panel position-fixed d-none d-lg-block d-xl-block">
              <div id="_main_left">
                {this.props._main_left}
              </div>
            </div>
            <div className="col-lg-9 offset-lg-3">
              <div>
                <div id="_header">
                  <Header page_title={this.props._header_title} add_item={this.props._add_item} breadcrumb_contents={this.props.bc} />
                </div>
              </div>
              <div className="right-panel">
                <div className="right-panel-adjustment">
                  <div id="_main_right">
                    {this.props._main_right}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class SearchPanel extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <div>
        <div className="panel_title">
          Criteria
        </div>
        <div className="row-custom">
          <label>Hidden columns
            <div>
              <a className="btn-column" id="__Title">Title & Tags</a>
              <a className="btn-column" id="__Year">Year</a>
              <a className="btn-column" id="__Status">Status</a>
            </div>
          </label>
        </div>
        <div className="row-custom">
          <label htmlFor="_filter_input">Title Filter</label>
          <input className="form-control _filter_input" id="_filter_input" type="text" placeholder="Fast R-CNN" />
        </div>
        <div className="row-custom">
          <a className="btn btn-danger btn-block _initialization_button">Init</a>
        </div>
        <div className="row-custom">
          <label>
            Contents
            <div className="_contents_tags">
              <CreatingTags key="_contents_tags" raw_tags={tag_contents_list_for_papers()} />
            </div>
          </label>
        </div>
        <div className="row-custom">
          <label>
            Field
            <div className="_field_tags">
              <CreatingTags key="_field_tags" raw_tags={tag_field_list_for_papers()} />
            </div>
          </label>
        </div>
        <div className="row-custom">
          <label>
            Learning Method
            <div className="_method_tags">
              <CreatingTags key="_method_tags" raw_tags={tag_method_list_for_papers()} />
            </div>
          </label>
        </div>
        <div className="row-custom">
          <label>
            Data
            <div className="_data_tags">
              <CreatingTags key="_data_tags" raw_tags={tag_data_list_for_papers()} />
            </div>
          </label>
        </div>
        <div className="row-custom">
          <label>
            Task
            <div className="_task_tags">
              <CreatingTags key="_task_tags" raw_tags={tag_task_list_for_papers()} />
            </div>
          </label>
        </div>
        <div className="row-custom">
          <label>
            Structure, Form, etc.
            <div className="_etc_tags">
              <CreatingTags key="_etc_tags" raw_tags={tag_etc_list_for_papers()} />
            </div>
          </label>
        </div>
      </div>
    );
  }
}

class TablePanel extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <table id="_papers_table" className="table tablesorter-default">
        <thead>
          <tr>
            <th>Title & Tags</th>
            <th width="60">Year</th>
            <th width="75">Status</th>
          </tr>
        </thead>
        <tbody id="_papers_tbody">
          <CreatingLinks raw_links={information_list_for_papers()} />
        </tbody>
      </table>
    );
  }
}

function CreatingTags(props) {
  const raw_tags = props.raw_tags;
  var tag_counter = -1
  const tags = raw_tags.map((raw_tag) => {
    var cn = "btn-flat " + "__" + raw_tag.replace(/ /g, "_").replace(/&/g, "_");
    tag_counter = tag_counter + 1
    return (
      <a key={"_tag_" + tag_counter} className={cn}>
        {raw_tag}
      </a>
    );
  });
  return tags
}

function CreatingLinks(props) {
  var link_counter = -1
  const links = props.raw_links.map((raw_link) => {
    link_counter = link_counter + 1
    var tags = <CreatingTags raw_tags={raw_link[1].split(',')} />;
    var raw_link_for_href = "#" + raw_link[0]
    return (
      <tr>
        <td>
          <div>
            <a className="paper_title title-font" key={"_link_" + link_counter} href={raw_link_for_href}>
              {raw_link[4]}
            </a>
          </div>
          {tags}
        </td>
        <td key={"_link1_" + link_counter} className="align-middle text-center">
          {raw_link[2]}
        </td>
        <td key={"_link2_" + link_counter} className="align-middle text-center">
          {raw_link[3]}
        </td>
      </tr>
    )
  });
  return links;
}

class TOCPanel extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <React.Fragment>
        <div className="panel_title">
          Contents
        </div>
        <div className="row-custom">
          <div className="headline-preview">
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class MDPanel extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <React.Fragment>
        <div id="_md_panel_contents" className="">
        </div>
      </React.Fragment>
    );
  }
}

function CreatingLinksForActLog(props) {
  var link_counter = -1
  const actlogs = props.raw_actlogs.map((actlog) => {
    link_counter = link_counter + 1
    var raw_link_for_href = "/papers/#" + actlog[1]
    return (
      <div className="actlog_row">
        <React.Fragment>
          <div>{link_counter} : {actlog[0]} : {actlog[3]}</div>
          <a className="paper_title title-font" key={"_link_" + link_counter} href={raw_link_for_href}>
            {actlog[4]}
          </a>
          <div><CreatingTags raw_tags={actlog[2].split(',')} /></div>
        </React.Fragment>
      </div>
    )
  });
  return (
    <div>
      {actlogs}
    </div>
  );
}

function CreatingTOCTitle(props) {
  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      <a class='toc-title' href="javascript:id_scroll('_1-0')">
        {props.page_title}
      </a>
    </div>
  );
}

function CreatingTOCSubtitle(props) {
  return (
    <div className={'toc-' + props.hl1}>
      <div className={'toc-con-' + props.hl1}>
        <div className={'toc-con2-' + props.hl1}>
          <a href={"javascript:id_scroll('" + props.hl1 + "-" + props.counter1 + "')"}>
            {props.hl0}
          </a>
        </div>
      </div>
    </div>
  );
}

function creatingTOC(props) {
  var link_counter = 0
  var counter = [0, 0, 0, 0, 0] // [h1,h2,h3,h4,h5]
  const toc_title = <CreatingTOCTitle page_title={props.page_title} />
  const toc = props.headline.map((it) => {
    link_counter = link_counter + 1
    counter[it[1] - 1] = counter[it[1] - 1] + 1
    const ts = <CreatingTOCSubtitle hl0={it[0]} hl1={it[1]} counter1={counter[it[1] - 1]}/>
    return ts;
  });
  
  return (
    <React.Fragment>
      {toc_title}
      {toc}
    </React.Fragment>
  );
}

function ChengeIDAndHeadline(props) {
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
  var lines = props.markdown.split("\n");
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
  let toc = <creatingTOC headline={headline} page_title={page_title}/>

  return toc;
}


class PapersActivityLog extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    var actlogs = <CreatingLinksForActLog raw_actlogs={actlog_list_for_papers()} />
    return (
      <React.Fragment>
        <div className="panel_title">
          Update log
        </div>
        {actlogs}
      </React.Fragment>
    );
  }
}

/*
export{
  HomeBreadcrumbContents,
  PapersBreadcrumbContents,
  DetailBreadcrumbContents,
  Breadcrumb,
  BreadcrumbActive,
  Header,
  Collapser,
  PapersIndex,
  SearchPanel,
  TablePanel,
  CreatingTags,
  CreatingLinks,
  TOCPanel,
  MDPanel,
  CreatingLinksForActLog,
  PapersActivityLog
}
*/