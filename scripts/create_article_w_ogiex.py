import argparse
import os
import datetime
from dataclasses import dataclass
from typing import List
from lib.structure import ArxivData, OGIData

DIR_PATH = os.path.abspath(os.path.dirname(__file__))


@dataclass
class Data:
    arxiv_title: str
    arxiv_url: str
    arxiv_submission_date: str
    arxiv_authors: List[str]
    ar5iv_url: str
    ogi_demo_abstract: str
    ogi_implementation_info: str
    ogi_demo_enviroment: str
    ogi_demo_process: str
    ogi_github_dir: str
    update_date: str
    myrepo_article_abb: str


def create_doc(data: Data, save_path: str = None):
    with open(
        os.path.join(os.path.dirname(__file__), "template/article_w_ogiex.md"), encoding="utf-8"
    ) as f:
        temp_article = f.read()

    splited_temp_articles = temp_article.split("@{")
    splited_articles = [splited_temp_articles[0]]
    for splited_temp_article in splited_temp_articles[1:]:
        end_word_index = splited_temp_article.find("}")
        value_name = splited_temp_article[:end_word_index]
        # print(value_name)
        value = getattr(data, value_name)
        splited_article = value + splited_temp_article[end_word_index + 1 :]
        splited_articles.append(splited_article)

    article = "".join(splited_articles)

    if save_path is not None:
        with open(save_path, "w", encoding="utf-8") as f:
            f.write(article)

    return article


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--arxiv_url", "-a")
    parser.add_argument("--ogiex_readme_path", "-r")
    args = parser.parse_args()

    arxiv_url = args.arxiv_url
    # arxiv_url = "https://arxiv.org/abs/1612.00593"
    ogiex_readme_path = args.ogiex_readme_path

    arxiv_data = vars(ArxivData(arxiv_url))
    ogi_data = vars(OGIData(ogiex_readme_path))
    data_dict = (
        arxiv_data
        | ogi_data
        | {
            "update_date": datetime.datetime.now().strftime("%Y/%m/%d"),
            "myrepo_article_abb": "".join(
                [t[0] for t in arxiv_data["arxiv_title"].split(" ")]
            ),
        }
    )
    data = Data(**data_dict)

    output_file_path = os.path.join(
        DIR_PATH, "../docs", data.arxiv_title.replace(":", "") + ".md"
    )
    if os.path.exists(output_file_path):
        raise ValueError(f"already exist: {output_file_path}")

    _ = create_doc(data, output_file_path)

    os.makedirs(
        os.path.join(DIR_PATH, "../docs/img", data.myrepo_article_abb), exist_ok=True
    )


if __name__ == "__main__":
    main()
