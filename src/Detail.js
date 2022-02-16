import React from 'react';
import { useParams } from "react-router-dom";

import raw from "./raw.macro";
import { MarkdownRender, MarkdownNavigatorRender } from "./Markdown";
import { NoMatchRender } from './404';
import { information_list_for_papers } from "./build/list_for_papers";
import PageStructure from './PageStructure';

import "./css/list.css"
import "./css/tag_for_papers.css"


export function CreateDetail(prop) {
    let { id } = useParams(); // filename
    document.title = id + prop.title_domain;

    const paper_list = information_list_for_papers();
    const paper_exists = paper_list.some((paper) => {
        return paper.filename === id;
    });
    console.log(id, paper_exists)
    if (paper_exists) {
        const markdown_contents = raw(`../public/data/${id}`);
        return (
            <React.StrictMode>
                <PageStructure
                    contents={<MarkdownRender children={markdown_contents} />}
                    navigator={<MarkdownNavigatorRender children={markdown_contents} />}
                />
            </React.StrictMode>
        );
    } else {
        return (
            <NoMatchRender />
        )
    }
}