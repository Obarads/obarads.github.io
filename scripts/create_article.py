import argparse
import os
import arxiv
import datetime
from dataclasses import dataclass
from typing import List
from github import Github
import github
import shutil


class ArxivData:
    arxiv_url: str = None
    arxiv_title: str = None
    arxiv_submission_date: str = None
    arxiv_authors: List[str] = None
    ar5iv_url: str = None

    def __init__(self, arxiv_url: str) -> None:
        if arxiv_url is not None:
            arxiv_id = os.path.basename(arxiv_url).removesuffix(".pdf")
            search = arxiv.Search(id_list=[arxiv_id])
            paper = next(search.results())
            self.arxiv_url = arxiv_url
            self.arxiv_title: str = paper.title
            self.arxiv_submission_date: str = paper.published.strftime("%Y/%m/%d")
            self.arxiv_authors: List[str] = ", ".join([f.name for f in paper.authors])
            self.ar5iv_url: str = "https://ar5iv.labs.arxiv.org/html/" + arxiv_id


class GithubData:
    github_url: str = None
    github_dir: str = None
    github_dir_lowercase: str = None
    github_userdir: str = None
    github_commit_hash: str = None
    github_commit_hash_date: str = None
    github_license: str = "Not described"

    def __init__(self, github_url) -> None:
        if github_url is not None:
            github_url = github_url.removesuffix(".git")
            paths = github_url.split("/")
            github_userdir = f"{paths[-2]}/{paths[-1]}"
            g = Github()
            repo = g.get_repo(github_userdir)
            latest_commit = repo.get_commits()[0]

            self.github_url: str = github_url
            self.github_dir: str = repo.name
            self.github_dir_lowercase: str = repo.name.lower()
            self.github_userdir: str = github_userdir
            self.github_commit_hash: str = latest_commit.sha
            self.github_commit_hash_date: str = (
                latest_commit.commit.author.date.strftime("%Y/%m/%d")
            )

            try:
                self.github_license = repo.get_license().license.name
            except github.UnknownObjectException:
                pass


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
