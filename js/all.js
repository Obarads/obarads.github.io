// https://ja.reactjs.org/docs/state-and-lifecycle.html
// https://codepen.io/gaearon/pen/amqdNA?editors=0010

class Header extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top tab-color font-noto scrollable-menu">
        <a className="navbar-brand" href="/" id="page_title">
          {this.props.page_title}
        </a>
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

class PapersIndex extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    return (
      <div>
        <div id="_header">
          <Header page_title="Obarads/papers" add_item={this.props._add_item} />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 left-panel position-fixed d-none d-lg-block d-xl-block">
              <div id="_main_left">
                {this.props._main_left}
              </div>
            </div>
            <div className="col-lg-9 offset-lg-3 right-panel ">
              <div id="_main_right">
                {this.props._main_right}
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
              {raw_link[0]}
            </a>
          </div>
          {tags}
        </td>
        <td className="align-middle text-center">
          {raw_link[2]}
        </td>
        <td className="align-middle text-center">
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
        <div className="row-custom">
          <div id="headline-preview">
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
      </React.Fragment>
    );
  }
}
