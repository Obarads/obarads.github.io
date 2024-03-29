import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NoMatchRender } from "./js/404";
import { CreatePapers } from './js/Papers';
import { CreateHome } from './js/Home';
import { CreateDetail } from './js/Detail';
// import raw from "./raw.macro";

import "./css/all.css"
import "./css/home.css"
import "./css/list.css"
import "./css/tag_for_papers.css"
import "./css/markdown.css"
import "./css/toc.css"

// title
const title_domain = " - Note board"

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<CreateHome title_domain={title_domain} />} />
      <Route exact path="/papers/" element={<CreatePapers title_domain={title_domain} />} />
      <Route path="/papers/:id" element={<CreateDetail title_domain={title_domain} />} />
      <Route path="*" element={<NoMatchRender />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
