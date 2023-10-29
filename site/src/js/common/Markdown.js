import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'

function HeadingRenderer(h_number, value){
    if (h_number === 1)
    {
        return (
            <div>
                {React.createElement('h' + h_number, {}, value)}
            </div>
        )
    } else
    {
        return (
            <div>
                <div className="pound_link_adjustment" id={value}></div>
                {React.createElement('h' + h_number, {}, value)}
            </div>
        )
    }
}

const H1Render = ({node, ...props}) => {return HeadingRenderer(1, props.children)}
const H2Render = ({node, ...props}) => {return HeadingRenderer(2, props.children)}
const H3Render = ({node, ...props}) => {return HeadingRenderer(3, props.children)}
const H4Render = ({node, ...props}) => {return HeadingRenderer(4, props.children)}
const H5Render = ({node, ...props}) => {return HeadingRenderer(5, props.children)}

export function MarkdownRender(props)
{
    return (
        <ReactMarkdown
            children={props.children}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            urlTransform={uri => `../${uri}`}
            components={{
                h1: H1Render,
                h2: H2Render,
                h3: H3Render,
                h4: H4Render,
                h5: H5Render,
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
    for (let it in lines)
    {
        if (lines[it].match(/^```.?/))
        {
            in_code = in_code ? false : true;
        }
        if (lines[it][0] === '#' && !in_code && lines[it][1] !== ' ')
        {
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

