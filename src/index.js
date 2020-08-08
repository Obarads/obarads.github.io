import React from 'react';
import ReactDOM from 'react-dom';

// container
import Paperbase from "./Paperbase";
import { MarkdownRender, MarkdownNavigatorRender, Toggle, ActLogNavigatorRender, NoMatchRender } from "./Renders";
// import * as serviceWorker from './serviceWorker';
import raw from "./raw.macro";

// data
import {information_list_for_papers} from "./build/list_for_papers";

// router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  // useRouteMatch,
} from "react-router-dom";

// design
import "./css/list.css"
import "./css/tag_for_papers.css"

// title
const title_domain = " - OPMemo"

function CreateHome() {
  const markdown_contents = raw("../README.md");
  document.title = "Home" + title_domain;

  return (
    <React.StrictMode>
      <Paperbase
        contents={<MarkdownRender source={markdown_contents} />}
        navigator={<ActLogNavigatorRender />}
      />
    </React.StrictMode>
  );
}

function CreatePapers() {
  document.title = "Papers" + title_domain;
  const papers_contents = new Toggle();
  const list_render = papers_contents.ListRender()
  const navi_render = papers_contents.NaviRender()

  return (
    <React.StrictMode>
      <Paperbase
        contents={list_render}  //{<ListRender />}
        navigator={navi_render} //{<ListNavigatorRender />}
        use_wrapper={false} // content内に余白を設けるかどうか
      />
    </React.StrictMode>
  );
}

function CreateDetail() {
  // let { url } = useRouteMatch();
  let { id } = useParams(); // filename
  document.title = id + title_domain;

  const paper_list = information_list_for_papers();
  const paper_exists = paper_list.some((paper) => {
    return paper[0] === id;
  });
  if (paper_exists) {
    const markdown_contents = raw(`../public/papers/${id}.md`);
    console.log(markdown_contents)
    return (
      <React.StrictMode>
        <Paperbase
          contents={<MarkdownRender source={markdown_contents} />}
          navigator={<MarkdownNavigatorRender source={markdown_contents} />}
        />
      </React.StrictMode>
    );
  } else {
    return (
      <NoMatchRender />
    )
  }
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <CreateHome />
      </Route>
      <Route path="/papers/:id">
        <CreateDetail />
      </Route>
      <Route path="/papers">
        <CreatePapers />
      </Route>
      <Route path="*">
        <NoMatchRender />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
