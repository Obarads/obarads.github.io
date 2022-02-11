import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'

import "./css/markdown.css"
import "./css/toc.css"
import "./css/home.css"
import "./css/all.css"

const HeadingRenderer = ({ node, ...props }) =>
{
    if (props.level === 1)
    {
        return (
            <div>
                {React.createElement('h' + props.level, {}, props.children)}
            </div>
        )
    } else
    {
        return (
            <div>
                <div className="pound_link_adjustment" id={props.children[0]}></div>
                {React.createElement('h' + props.level, {}, props.children)}
            </div>
        )
    }
}

export function MarkdownRender(props)
{
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

export function MarkdownNavigatorRender(props)
{
    const markdown_contents = props.children;
    let lines = markdown_contents.split("\n");
    let headline = [];
    let in_code = false;
    // let page_title = null
    for (let it in lines)
    {
        if (lines[it].match(/^```.?/))
        {
            // コードの行内の場合は外す
            in_code = in_code ? false : true;
        }
        if (lines[it][0] === '#' && !in_code && lines[it][1] !== ' ')
        {
            // 先頭の#とスペースを削除して追加
            let line_content = lines[it].replace(/^#+/, '').trim()
            let dollar_split = line_content.split("$")
            if (dollar_split.length >= 1)
            {
                for (let jt in dollar_split)
                {
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

