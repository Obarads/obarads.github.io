import React from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
// import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'

// design
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import "./css/markdown.css"
import "./css/toc.css"
import "./css/home.css"
import "./css/all.css"

// tag data
import { tag_data_list_for_papers, tag_contents_list_for_papers, tag_etc_list_for_papers, tag_field_list_for_papers, tag_method_list_for_papers, tag_status_list_for_papers, tag_task_list_for_papers } from "./build/tag_for_papers";
import { information_list_for_papers } from "./build/list_for_papers"
import { actlog_list_for_papers } from "./build/actlog_list_for_papers"

export const paper_link = "/papers/"

export function NoMatchRender(props) {
  return (
    <h3> 404: Not found </h3>
  )

}

const HeadingRenderer = ({ node, ...props }) => {
  if (props.level === 1) {
    return (
      <div>
        {React.createElement('h' + props.level, {}, props.children)}
      </div>
    )
  } else {
    return (
      <div>
        <div className="pound_link_adjustment" id={props.children[0]}></div>
        {React.createElement('h' + props.level, {}, props.children)}
      </div>
    )
  }
}

export function MarkdownRender(props) {
  return (
    <ReactMarkdown
      children={props.children}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      transformImageUri={uri => `${'/data/'}${uri}`}
      components={{
        h1: HeadingRenderer,
        h2: HeadingRenderer,
        h3: HeadingRenderer,
        h4: HeadingRenderer,
        h5: HeadingRenderer
      }}>
    </ReactMarkdown>
  );
}

export function MarkdownNavigatorRender(props) {
  const markdown_contents = props.children;
  let lines = markdown_contents.split("\n");
  let headline = [];
  let in_code = false;
  // let page_title = null
  for (let it in lines) {
    if (lines[it].match(/^```.?/)) {
      // コードの行内の場合は外す
      in_code = in_code ? false : true;
    }
    if (lines[it][0] === '#' && !in_code && lines[it][1] !== ' ') {
      // 先頭の#とスペースを削除して追加
      let line_content = lines[it].replace(/^#+/, '').trim()
      let dollar_split = line_content.split("$")
      if (dollar_split.length >= 1) {
        for (let jt in dollar_split) {
          if (jt % 2 === 1) { dollar_split[jt] = <ReactMarkdown children={dollar_split[jt]} /> }
        }
        line_content = dollar_split.map((line) => (line)); // 連結
      }
      headline.push([line_content, lines[it].split(" ")[0].length]);

    }
  }

  return (
    <div>
      {headline.map((hl) => (
        <div className={"toc-" + hl[1].toString() + " toc-right-padding"}>
          <div className={"toc-con-" + hl[1].toString()}>
            <div className={"toc-con2-" + hl[1].toString()}>
              <a href={"#" + hl[0]} className={"toc-contents"}>
                {hl[0]}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ActLogNavigatorRender(props) {
  // for navigator
  const act_log = actlog_list_for_papers();

  return (
    <span>
      {act_log.map((log) => (
        <div className="actlog-block">
          <div className={"actlog-log"}>{log[0]} {":" + log[3]}</div>
          <Link to={paper_link + log[1]} className={"actlog-link"}>{log[4]}</Link><br />
          <TagRender tag={log[2].split(",")} />
        </div>
      ))}
    </span>
  )
}

export function TagRender(props) {
  const tag = props.tag;
  let tag_action = props.action;
  if (tag_action === undefined) {
    tag_action = (tag_name) => (console.log("not available: tag_action"))
  }

  return <span>
    {tag.map((tag_name) => (
      <a className={"__" + tag_name.replace(/\s+/g, "_").replace(/\//g, "").replace(/&/g, "_") + " list-link btn-flat"}
        onClick={() => tag_action(tag_name, "__" + tag_name.replace(/\s+/g, "_").replace(/\//g, "").replace(/&/g, "_"))}>
        {tag_name}
      </a>))}
  </span>
}

// ListRender
const StyledTableRow = withStyles((theme) => ({
  root: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(24, 32, 44)",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export class Toggle {
  constructor() {
    // tag setting
    this.tags = []
    this.handleClick = this.handleClick.bind(this);

    // navigator setting
    this.tag_dict = this.create_table_contents();

    // table contents setting
    this.data_list = information_list_for_papers();
    this.list_head = ["Name", "year", "Status"];
    this.link_number = 4;
    this.column_order = [this.link_number, 2, 3];
    this.row_id = this.link_number;
    this.row_function = (column_number, row) => {
      if (column_number === this.link_number) {
        const tag = row[1].split(",")
        return (<span>
          <Link className="list-link" to={paper_link + row[0]}>{row[column_number]} </Link><br />
          <TagRender tag={tag} action={this.handleClick} />
        </span>)
      }
      return row[column_number]
    };
  }

  handleClick(tag_name, unique) {
    const data_list = this.data_list;
    const column_order = this.column_order;
    const row_id = this.row_id;
    const row_function = this.row_fction;
    var idx = this.tags.indexOf(tag_name);
    let ele = document.getElementsByClassName(unique)
    if (idx >= 0) {
      this.tags.splice(idx, 1);
      Array.prototype.forEach.call(ele, function (e) {
        e.classList.remove("hovered");
      });
    } else {
      this.tags.push(tag_name)
      Array.prototype.forEach.call(ele, function (e) {
        e.classList.add("hovered");
      });
    }

    this.create_rows(data_list, row_id, column_order, row_function)
  }

  create_row(column_order, row, row_id, row_function) {
    let row_ele = document.getElementById(row[4])
    let ele = row_ele.children[0].getElementsByTagName("a");
    let sw = 0;
    Array.prototype.forEach.call(ele, (a) => {
      this.tags.forEach((t) => {
        if (a.innerHTML === t) { sw += 1 };
      })
    })

    if (sw === this.tags.length) {
      row_ele.style.display = "table-row";
    } else {
      row_ele.style.display = "none";
    }
  }

  create_rows(data_list, row_id, column_order, row_function) {
    data_list.map((row) => (this.create_row(column_order, row, row_id, row_function)))
  }

  create_table_contents() {
    const categories = ["Status", "Contents", "Field", "Learning Method", "Data", "Task", "Structure, Form, etc."];
    const tags = [
      tag_status_list_for_papers(),
      tag_contents_list_for_papers(),
      tag_field_list_for_papers(),
      tag_method_list_for_papers(),
      tag_data_list_for_papers(),
      tag_task_list_for_papers(),
      tag_etc_list_for_papers()
    ];
    const tag_dict = {}
    for (var i = 0; i < categories.length; i++) {
      tag_dict[categories[i]] = tags[i]
    }

    return tag_dict;
  }

  ListRender() {
    const data_list = this.data_list;
    const list_head = this.list_head;
    const column_order = this.column_order;
    const row_id = this.row_id;
    const row_function = this.row_function;

    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {list_head.map((column) => (
                <StyledTableCell align="left">{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody id={"data_table"}>
            {data_list.map((row) => (
              <StyledTableRow id={row[row_id]}>
                {column_order.map((column_number) => (
                  <TableCell component="th" scope="row">{row_function(column_number, row)}</TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  NaviRender() {
    // for navigator
    const categories = ["Status", "Contents", "Field", "Learning Method", "Data", "Task", "Structure, Form, etc."];
    const tags = [
      tag_status_list_for_papers(),
      tag_contents_list_for_papers(),
      tag_field_list_for_papers(),
      tag_method_list_for_papers(),
      tag_data_list_for_papers(),
      tag_task_list_for_papers(),
      tag_etc_list_for_papers()
    ];
    const tag_dict = {}
    for (var i = 0; i < categories.length; i++) {
      tag_dict[categories[i]] = tags[i]
    }

    return (
      <span>
        {Object.keys(tag_dict).map((key) => (
          <div className="list-nav">
            <div className={"list-category"}>{key}</div>
            <TagRender tag={tag_dict[key]} action={this.handleClick} />
          </div>
        ))}
      </span>
    )
  }
}

