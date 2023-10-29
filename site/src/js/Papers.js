import React, { useEffect } from 'react';
import { Link, useSearchParams } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { tag_for_papers } from "./build/tag_for_papers";
import { information_list_for_papers } from "./build/list_for_papers"
import { HoverManager, TagRender } from './common/Tag';
import PageStructure from "./structure/PageStructure"

const ROW_DATA_LIST = information_list_for_papers()
const PAPER_LINK = "/papers/";

export function CreatePapers(prop) {
    document.title = "Papers" + prop.title_domain;
    const list_render = TableRender()
    const navi_render = NaviRender()

    HoverManager()

    return (
        <React.StrictMode>
            <PageStructure
                contents={list_render}
                navigator={navi_render}
                use_wrapper={false} // spaces in content
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
    const row_data_list = ROW_DATA_LIST;
    HiddenRows(row_data_list)
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ background: "rgb(24, 32, 44)", color: "white", fontSize: 14 }}>
                            {"Name"}
                        </TableCell>
                        <TableCell align="left" sx={{ background: "rgb(24, 32, 44)", color: "white", fontSize: 14 }}>
                            {"Year"}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody id={"data_table"}>
                    {row_data_list.map((row_data) => (
                        <TableRowDataRender row_data_dict={row_data} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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

function create_row(row, keyword_list) {
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