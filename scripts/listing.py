from audioop import reverse
from dataclasses import dataclass
from pydoc import classname
from re import A
from statistics import mode
from typing import Dict, List

import os
import glob
import yaml
import datetime

PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
PATH_OTHER = os.path.dirname(os.path.abspath(__file__))


def extracting_filename(file_path: str):
    """get filename without extension

    To use:
    >>> extracting_filename("../../path/filename.txt")
    filename
    """

    filename_w_ext = os.path.basename(file_path)
    filename_wo_ext = os.path.splitext(filename_w_ext)[0]
    return filename_wo_ext


@dataclass(init=True)
class TableRowData:
    title: str
    filename: str
    keyword_list: List[str]
    year: int = 0  # TODO


def extract_data(markdown_dir_path: str):
    markdown_path_list = glob.glob(markdown_dir_path + "*.md")
    table_row_data_list: List[TableRowData] = []
    print(f"number of file: {len(markdown_path_list)}")

    for markdown_path in markdown_path_list:
        # set filename
        filename = os.path.basename(markdown_path)

        # open a markdown file
        with open(markdown_path, "r", encoding="utf-8") as f:
            content = f.read().split("\n")

        # extract a title
        title: str = None
        if "# " in content[0]:
            title = content[0].replace("# ", "").replace("'", "\\'")
        else:
            raise ValueError(f"Not found title (#): {markdown_path}")

        # extract key words
        keywords: List[str] = []
        if "## key-words" in content:
            keyword_row_index = content.index("## key-words")
            # If key-words is found and there is keyword_row_index + 1 row
            if (keyword_row_index != -1) and (
                keyword_row_index + 1 < len(content)
            ):
                # modify key words
                keywords_string = (
                    content[keyword_row_index + 1]
                    .replace("##### ", "")
                    .replace(" ", "")
                    .replace("_", " ")
                )
                keyword_list = keywords_string.split(",")
            else:
                raise ValueError(
                    f"Invalid keyword format (## key-words): {markdown_path}"
                )
        else:
            raise ValueError(
                f"Not found key words (## key-words): {markdown_path}"
            )

        table_row_data_list.append(
            TableRowData(title, filename, keyword_list, 0)
        )

    return table_row_data_list


def extract_keyword_dict(yaml_path: str):
    with open(yaml_path, encoding="utf-8") as f:
        class_to_keyword = yaml.load(f, Loader=yaml.SafeLoader)

    keyword_to_class = {}
    for class_name in class_to_keyword:
        keywords = class_to_keyword[class_name]
        for keyword in keywords:
            keyword_to_class[keyword] = class_name

    return keyword_to_class, class_to_keyword


def write_table_row_data_list_to_js(
    output_file_path: str, table_row_data_list: List[TableRowData]
):
    js_string: str = "export function information_list_for_papers(){ return ["

    for table_row_data in table_row_data_list:
        js_string += "["
        js_string += f"'{table_row_data.filename}',"
        js_string += f"'{','.join(table_row_data.keyword_list)}',"
        js_string += f"'{table_row_data.title}',"
        js_string += f"'{table_row_data.year}',"
        js_string += "],"

    js_string += "]}"

    with open(output_file_path, mode="w") as f:
        f.write(js_string)


def write_class_and_tag_to_js(
    output_file_path: str, class_to_keyword: Dict[str, List[str]]
):
    js_string: str = ""

    for class_name in class_to_keyword:
        js_string += f"export function tag_{class_name}_list_for_papers()"
        js_string += "{ return ["
        for keyword in class_to_keyword[class_name]:
            js_string += f"'{keyword}',"

        js_string = js_string[:-1]  # remove last comma
        js_string += "]}\n"

    with open(output_file_path, mode="w") as f:
        f.write(js_string)


CSS_COLOR_LIST = {
    "field": "background:#005FFF;\ncolor:#fff;",
    "method": "background:#eb6101;\ncolor:#fff;",
    "data": "background:#228B22;\ncolor:#fff;",
    "task": "background:#36558F;\ncolor:#fff;",
    "etc": "background:#aa08d3;\ncolor:#fff;",
}


def write_css(output_file_path: str, class_to_keyword: Dict[str, List[str]]):
    css_string: str = ""

    for class_name in class_to_keyword:
        for keyword in class_to_keyword[class_name]:
            css_class = (
                keyword.replace(" ", "_").replace("/", "").replace("&", "_")
            )
            css_string += f".__{css_class}"
            css_string += "{"
            css_string += f"{CSS_COLOR_LIST[class_name]}"
            css_string += "}\n\n"

    with open(output_file_path, mode="w") as f:
        f.write(css_string)


def write_actlog_to_js(
    output_file_path: str,
    markdown_dir_path: str,
    table_row_data_list: List[TableRowData],
):
    actlog_list: List[
        List[float, str, TableRowData]
    ] = []  # (time, time_string, TableRowData)

    # create an update time list
    for table_row_data in table_row_data_list:
        # get time and time string
        p = os.path.getmtime(
            os.path.join(markdown_dir_path, table_row_data.filename)
        )
        dt = datetime.datetime.fromtimestamp(p)
        dt = dt.strftime("%Y/%m/%d %H:%M:%S")

        actlog_list.append([p, dt, table_row_data])

    # sort update time and get top-10
    actlog_list.sort(reverse=True)
    actlog_top = actlog_list[0:10]

    # write update time list into js
    js_string: str = "export function actlog_list_for_papers() { return ["
    for actlog in actlog_top:
        js_string += "["
        js_string += f"'{actlog[1]}',"
        js_string += f"'{actlog[2].title}',"
        js_string += f"'{','.join(actlog[2].keyword_list)}',"
        js_string += f"'{actlog[2].filename}',"
        js_string += "],"
    js_string += "]}\nexport default actlog_list_for_papers"

    with open(output_file_path, mode="w") as f:
        f.write(js_string)


def main():
    table_row_data_list = extract_data(os.path.join(PATH, "public/data/"))
    _, class_to_keyword = extract_keyword_dict(
        os.path.join(PATH, "scripts/tag_list_for_papers.yaml")
    )

    write_table_row_data_list_to_js(
        os.path.join(PATH, "src/build/list_for_papers.js"), table_row_data_list
    )

    write_class_and_tag_to_js(
        os.path.join(PATH, "src/build/tag_for_papers.js"), class_to_keyword
    )

    write_css(
        os.path.join(PATH, "src/css/tag_for_papers.css"), class_to_keyword
    )

    write_actlog_to_js(
        os.path.join(PATH, "src/build/actlog_list_for_papers.js"),
        os.path.join(PATH, "public/data/"),
        table_row_data_list,
    )


if __name__ == "__main__":
    main()
