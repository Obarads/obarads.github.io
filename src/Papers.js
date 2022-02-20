import React, { useEffect } from 'react';
import { Link, useSearchParams } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { tag_for_papers } from "./build/tag_for_papers";
import { information_list_for_papers } from "./build/list_for_papers"
import { HoverManager, TagRender } from './Tag';
import PageStructure from "./PageStructure"

const ROW_DATA_LIST = information_list_for_papers()
const PAPER_LINK = "/papers/";

const CustomTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "rgb(24, 32, 44)",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export function CreatePapers(prop) {
    document.title = "Papers" + prop.title_domain;
    const list_render = TableRender()
    const navi_render = NaviRender()

    HoverManager()

    return (
        <React.StrictMode>
            <PageStructure
                contents={list_render}  //{<ListRender />}
                navigator={navi_render} //{<ListNavigatorRender />}
                use_wrapper={false} // content内に余白を設けるかどうか
            />
        </React.StrictMode>
    );
}

function NaviRender() {
    const tag_dict = tag_for_papers()
    const class_to_keywords = {
        "Field": tag_dict["field"],
        "Learning Method": tag_dict["method"],
        "Data": tag_dict["data"],
        "Task": tag_dict["task"],
        "Structure, Form, etc.": tag_dict["etc"]
    };

    return (
        <span>
            {Object.keys(class_to_keywords).map((class_name) => (
                <div className="list-nav">
                    <div className={"list-category"}>{class_name}</div>
                    {class_to_keywords[class_name].map((keyword) => (
                        <TagRender keyword={keyword} />
                    ))}
                </div>
            ))}
        </span>
    )
}

function TableRender() {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHeadRender />
                <TableBodyRender />
            </Table>
        </TableContainer>
    )
}

function TableHeadRender() {
    return (<TableHead>
        <TableRow>
            <CustomTableCell align="left">
                {"Name"}
            </CustomTableCell>
            <CustomTableCell align="left">
                {"Year"}
            </CustomTableCell>
        </TableRow>
    </TableHead>)
}

function TableBodyRender() {
    const row_data_list = ROW_DATA_LIST;
    HiddenRows(row_data_list)
    return (
        <TableBody id={"data_table"}>
            {row_data_list.map((row_data) => (
                <TableRowDataRender row_data_dict={row_data} />
            ))}
        </TableBody>
    )
}

function TableRowDataRender(props) {
    const paper_link = PAPER_LINK;
    const row_data_dict = props.row_data_dict
    const keyword_list = row_data_dict['keywords'].split(',')
    return (
        <TableRow id={row_data_dict['filename']}>
            <TableCell component="th" scope="row">
                <span>
                    <Link className="list-link" to={paper_link + row_data_dict['filename']}>
                        {row_data_dict['title']}
                    </Link><br />
                    {keyword_list.map((keyword) => (
                        <TagRender keyword={keyword} />
                    ))}
                </span>
            </TableCell>
            <TableCell component="th" scope="row">
                {row_data_dict['year']}
            </TableCell>
        </TableRow >
    )
}

function HiddenRows(table_row_data_list) {
    const searchParams = useSearchParams()[0];
    let current_keywords = searchParams.get("keywords");

    useEffect(() => {
        if (current_keywords !== null) {
            table_row_data_list.map((table_row_data) => (
                create_row(table_row_data, String(current_keywords).split(','))
            ))
        }
    });
}

function create_row(row, keyword_list) { // TODO: this is not readable.
    let sw = 0;
    let row_keyword_list = row['keywords'].split(',')
    Array.prototype.forEach.call(row_keyword_list, (row_keyword) => {
        let css_row_keyword = "__" + row_keyword.replace(/\s+/g, "_").replace(/\//g, "").replace(/&/g, "_")
        keyword_list.forEach((keyword) => {
            if (css_row_keyword === keyword) { sw += 1 };
        })
    })

    let row_ele = document.getElementById(row["filename"])
    if (sw === keyword_list.length) {
        row_ele.style.display = "table-row";
    } else {
        row_ele.style.display = "none";
    }
}