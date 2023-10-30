import argparse
import os
import datetime
from dataclasses import dataclass
from typing import List
import shutil
from lib.structure import ArxivData, GithubData


@dataclass
class Data:
    arxiv_title: str
    arxiv_url: str
    arxiv_submission_date: str
    arxiv_authors: List[str]
    ar5iv_url: str
    github_url: str
    github_dir: str
    github_dir_lowercase: str
    github_userdir: str
    github_commit_hash: str
    github_commit_hash_date: str
    github_license: str
    update_date: str
    base_nvidia_image: str
    myrepo_article_abb: str


def create_article(
    data: Data,
):
    with open(
        os.path.join(os.path.dirname(__file__), "template/article.md"), encoding="utf-8"
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
    return article


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--arxiv_url", "-a")
    parser.add_argument("--github_url", "-g")
    parser.add_argument(
        "--base_nvidia_image",
        "-b",
        default="nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04",
    )
    args = parser.parse_args()

    arxiv_url = args.arxiv_url
    # arxiv_url = "https://arxiv.org/abs/1612.00593"
    github_url = args.github_url
    # github_url = "https://github.com/charlesq34/pointnet"
    base_nvidia_image = args.base_nvidia_image
    # base_nvidia_image = "nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04"

    arxiv_data = vars(ArxivData(arxiv_url))
    github_data = vars(GithubData(github_url))
    data_dict = (
        arxiv_data
        | github_data
        | {
            "update_date": datetime.datetime.now().strftime("%Y/%m/%d"),
            "base_nvidia_image": base_nvidia_image,
            "myrepo_article_abb": "".join(
                [t[0] for t in arxiv_data["arxiv_title"].split(" ")]
            ),
        }
    )
    data = Data(**data_dict)
    article = create_article(data)

    # docs
    output_file_path = os.path.join(
        os.path.dirname(__file__),
        "../docs",
        data.arxiv_title.replace(":", "") + ".md",
    )
    if not os.path.exists(output_file_path):
        with open(output_file_path, "w", encoding="utf-8") as f:
            f.write(article)
    else:
        print(f"exist: {output_file_path}")
    os.makedirs(
        os.path.join(os.path.dirname(__file__), "../docs/img", data.myrepo_article_abb),
        exist_ok=True,
    )

    # environments
    os.makedirs(
        os.path.join(
            os.path.dirname(__file__), "../environments", data.myrepo_article_abb
        ),
        exist_ok=True,
    )
    dockerfile_path = os.path.join(
        os.path.dirname(__file__),
        "../environments",
        data.myrepo_article_abb,
        "Dockerfile",
    )
    if not os.path.exists(dockerfile_path):
        shutil.copy(
            os.path.join(os.path.dirname(__file__), "template/Dockerfile"),
            dockerfile_path,
        )
    req_txt_path = os.path.join(
        os.path.dirname(__file__),
        "../environments",
        data.myrepo_article_abb,
        "requirements.txt",
    )
    if not os.path.exists(req_txt_path):
        shutil.copy(
            os.path.join(os.path.dirname(__file__), "template/requirements.txt"),
            req_txt_path,
        )


if __name__ == "__main__":
    main()
