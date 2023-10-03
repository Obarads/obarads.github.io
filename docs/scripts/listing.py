from dataclasses import dataclass
from typing import Dict, List

import os
import re
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


def get_num_space_for_indentation(text: str):
    return len(text) - len(text.lstrip())


def exist_list(text):
    if len(text) == 0:
        return False

    num_space = get_num_space_for_indentation(text)
    return text[num_space : num_space + 2] == "- "


def markdow_to_list(raw_list, min_space_indentation):
    res_list = []

    prev_space_indentation = 0
    for raw in raw_list:
        if not exist_list(raw):
            break
        current_space_indentation = get_num_space_for_indentation(raw)
        diff_space_indentation = current_space_indentation - prev_space_indentation
        new_content = raw[current_space_indentation + 2 :]
        if diff_space_indentation == 0 or (
            diff_space_indentation < 0
            and (diff_space_indentation % min_space_indentation) == 0
        ):
            indentation = int(current_space_indentation / min_space_indentation)
            sub_res_list = res_list
            for i in range(indentation):
                sub_res_list = sub_res_list[-1]
            sub_res_list.append(new_content)
        elif diff_space_indentation == min_space_indentation:
            indentation = int(current_space_indentation / min_space_indentation)
            sub_res_list = res_list
            for i in range(indentation - 1):
                sub_res_list = sub_res_list[-1]
            sub_res_list.append([new_content])
        else:
            raise ValueError("Invalid indentation")

        prev_space_indentation = current_space_indentation

    return res_list


@dataclass(init=True)
class TableRowData:
    title: str
    filename: str
    keyword_list: List[str]
    update_date: datetime.datetime
    year: int = 0


ELEMENT_INFO = "ℹ️ Info"


def extract_data(markdown_dir_path: str):
    markdown_path_list = glob.glob(markdown_dir_path + "*.md")
    table_row_data_list: List[TableRowData] = []
    print(f"number of file: {len(markdown_path_list)}")

    for markdown_path in markdown_path_list:
        # set filename
        filename = os.path.basename(markdown_path)

        # open a markdown file
        with open(markdown_path, "r", encoding="utf-8") as f:
            raw_content = f.read()
            content = raw_content.split("\n")  # TODO: remove
            content_by_section = raw_content.split("## ")

        # re-format
        content_dict = {c.split("\n")[0]: c.split("\n")[1:] for c in content_by_section}
        if ELEMENT_INFO in content_dict.keys():
            space_indentation_list = []
            for text in content_dict[ELEMENT_INFO]:
                if get_num_space_for_indentation(text) != 0:
                    space_indentation_list.append(get_num_space_for_indentation(text))

            if len(space_indentation_list) > 0:
                min_space_indentation = min(space_indentation_list)
            else:
                raise ValueError(f"Invalid info format (## ℹ️ Info): {markdown_path}")

            content_dict[ELEMENT_INFO] = markdow_to_list(
                content_dict[ELEMENT_INFO], min_space_indentation
            )

        # extract a title
        title: str = None
        if "# " in content[0]:
            title = content[0].replace("# ", "").replace("'", "\\'")
        else:
            raise ValueError(f"Not found title (#): {markdown_path}")

        pattern = re.compile(r"^Update: (\d{4})[/](\d{2})[/](\d{2})")
        update_date_re_list = list(re.finditer(pattern, content[2]))
        if len(update_date_re_list) > 0:
            update_date_row_str = content[2][
                update_date_re_list[0].start() : update_date_re_list[0].end()
            ]
            update_date_re = list(
                re.finditer(
                    re.compile(r"(\d{4})[/](\d{2})[/](\d{2})"), update_date_row_str
                )
            )[0]
            update_date = datetime.datetime.strptime(
                update_date_row_str[update_date_re.start() : update_date_re.end()],
                "%Y/%m/%d",
            )
        else:
            update_date = datetime.datetime(2000, 1, 1)

        # extract a year
        year: int = None
        if ELEMENT_INFO in content_dict.keys():
            if (
                re.fullmatch(
                    r"^Submission date: \d{4}/\d{2}/\d{2}$",
                    content_dict[ELEMENT_INFO][1][0],
                )
                is not None
            ):
                date = content_dict[ELEMENT_INFO][1][0].split(": ")[-1]
                if len(date) == 1:
                    raise ValueError("Invalid date format: {markdown_path}")
                date = datetime.datetime.strptime(date, "%Y/%m/%d")
                year = date.year
            if (
                re.fullmatch(r"^Release: \d{4}$", content_dict[ELEMENT_INFO][1][0])
                is not None
            ):
                date = content_dict[ELEMENT_INFO][1][0].split(": ")[-1]
                if len(date) == 1:
                    raise ValueError("Invalid date format: {markdown_path}")
                date = datetime.datetime.strptime(date, "%Y")
                year = date.year
            if year is None:
                raise ValueError(f"Invalid info format (## ℹ️ Info): {markdown_path}")
        else:
            if "Cite: " in content[2]:
                year_str: str = content[2].split(". “")[0].split(". ")[-1]
                if len(year_str) == 4:
                    year = int(year_str)
                else:
                    raise ValueError(f"Invalid year: {markdown_path}")
            else:
                raise ValueError(f"Not found year: {markdown_path}")

        # extract key words
        keyword_list: List[str] = []
        if ELEMENT_INFO in content_dict.keys():
            if (
                re.fullmatch(r"^Keywords: .*$", content_dict[ELEMENT_INFO][4])
                is not None
            ):
                keywords_string = content_dict[ELEMENT_INFO][4].split(": ")[-1]
                keyword_list = keywords_string.split(", ")

            if len(keyword_list) == 0:
                raise ValueError(f"Invalid info format (## ℹ️ Info): {markdown_path}")
        elif "## key-words" in content:
            keyword_row_index = content.index("## key-words")
            # If key-words is found and there is keyword_row_index + 1 row
            if (keyword_row_index != -1) and (keyword_row_index + 1 < len(content)):
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
            raise ValueError(f"Not found key words (## key-words): {markdown_path}")

        table_row_data_list.append(
            TableRowData(title, filename, keyword_list, update_date, year)
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
        js_string += "{"
        js_string += f"'filename':'{table_row_data.filename}',"
        js_string += f"'keywords':'{','.join(table_row_data.keyword_list)}',"
        js_string += f"'title':'{table_row_data.title}',"
        js_string += f"'year':'{table_row_data.year}',"
        js_string += "},"

    js_string += "]}"

    with open(output_file_path, mode="w", encoding="UTF-8") as f:
        f.write(js_string)


def write_class_and_tag_to_js(
    output_file_path: str, class_to_keyword: Dict[str, List[str]]
):
    js_string: str = "export function tag_for_papers(){ return {"

    for class_name in class_to_keyword:
        js_string += f"'{class_name}' : ["
        for keyword in class_to_keyword[class_name]:
            js_string += f"'{keyword}',"
        js_string += "],"

    js_string = js_string[:-1]  # remove last comma
    js_string += "}}\n"

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
            css_class = keyword.replace(" ", "_").replace("/", "").replace("&", "_")
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
        # p = os.path.getmtime(os.path.join(markdown_dir_path, table_row_data.filename))
        p = table_row_data.update_date
        # dt = datetime.datetime.fromtimestamp(p)
        dt = p.strftime("%Y/%m/%d")

        actlog_list.append([p, dt, table_row_data])

    # sort update time and get top-10
    actlog_list = sorted(actlog_list, reverse=True, key=lambda actlog: actlog[0])
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

    with open(output_file_path, mode="w", encoding="UTF-8") as f:
        f.write(js_string)


def main():
    table_row_data_list = extract_data(os.path.join(PATH, "public/data/"))
    _, class_to_keyword = extract_keyword_dict(
        os.path.join(PATH, "scripts/configs/tag_list_for_papers.yaml")
    )

    write_table_row_data_list_to_js(
        os.path.join(PATH, "src/build/list_for_papers.js"), table_row_data_list
    )

    write_class_and_tag_to_js(
        os.path.join(PATH, "src/build/tag_for_papers.js"), class_to_keyword
    )

    write_css(os.path.join(PATH, "src/css/tag_for_papers.css"), class_to_keyword)

    write_actlog_to_js(
        os.path.join(PATH, "src/build/actlog_list_for_papers.js"),
        os.path.join(PATH, "public/data/"),
        table_row_data_list,
    )


if __name__ == "__main__":
    main()
