import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

export function HoverManager()
{
    const searchParams = useSearchParams()[0];
    let current_keywords = String(searchParams.get("keywords"));
    const keyword_list = current_keywords.split(',')

    useEffect(() =>
    {
        keyword_list.forEach((keyword, index) =>
        {
            let elements = document.getElementsByClassName(keyword)
            Array.prototype.forEach.call(elements, function (e)
            {
                e.classList.add("hovered");
            });
        })
    });
};

export function TagRender(props)
{
    const keyword = props.keyword
    const keyword_css_classname = "__" + keyword.replace(/\s+/g, "_").replace(/\//g, "").replace(/&/g, "_")
    const search_param_link = CreateSearchParamLink(keyword_css_classname)

    return (
        <span>
            <a className={keyword_css_classname + " list-link btn-flat"}
                href={search_param_link}>
                {keyword}
            </a>
        </span >
    )
}

function CreateSearchParamLink(keyword_css_classname)
{

    const searchParams = useSearchParams()[0];
    let location = useLocation();
    const current_path = location.pathname;
    let current_keywords = searchParams.get("keywords");

    if (current_keywords !== null)
    {
        current_keywords = String(current_keywords)
        const keyword_list = current_keywords.split(',')
        var idx = keyword_list.indexOf(keyword_css_classname);
        if (idx >= 0)
        {
            keyword_list.splice(idx, 1);
        } else
        {
            keyword_list.push(keyword_css_classname)
        }

        let current_search_params = ""
        if (keyword_list.length !== 0)
        {
            current_search_params = "?keywords=" + keyword_list.join()
        }

        return current_path + current_search_params
    }
    else
    {
        return current_path + "?keywords=" + keyword_css_classname
    }
}
