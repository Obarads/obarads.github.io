import React from 'react';
import { Link } from 'react-router-dom';

import PageStructure from './PageStructure';
import { MarkdownRender } from "./Markdown";
import { TagRender } from './Tag';
import raw from "./raw.macro";
import actlog_list_for_papers from './build/actlog_list_for_papers'

export function CreateHome(prop)
{
    const markdown_contents = raw("../README.md");
    document.title = "Home" + prop.title_domain;
    return (
        <React.StrictMode>
            <PageStructure
                contents={<MarkdownRender children={markdown_contents} />}
                navigator={<ActLogNavigatorRender />}
            />
        </React.StrictMode>
    );
}

function ActLogNavigatorRender(props)
{
    // for navigator
    const act_log = actlog_list_for_papers();

    return (
        <span>  <div className='actlog-header'>最近更新した記事</div>
            {act_log.map((log) => (
                <div className="actlog-block">
                    <div className={"actlog-log"}>{log[0]}</div>
                    <Link to={"/papers/" + log[3]} className={"actlog-link"}>{log[1]}</Link><br />
                    {log[2].split(",").map((keyword) => (
                        <TagRender keyword={keyword} />
                    ))}
                </div>
            ))}
        </span>
    )
}

