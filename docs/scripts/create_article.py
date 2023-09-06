import argparse
import os
import arxiv
import datetime
from dataclasses import dataclass
from typing import List
from github import Github


def create_arxiv_data(arxiv_url):
    if arxiv_url is not None:
        arxiv_id = os.path.basename(arxiv_url).removesuffix(".pdf")
        search = arxiv.Search(id_list=[arxiv_id])
        paper = next(search.results())
        arxiv_title: str = paper.title
        arxiv_submission_date: str = paper.published.strftime("%Y/%m/%d")
        arxiv_authors: List[str] = ", ".join([f.name for f in paper.authors])
    else:
        arxiv_title: str = None
        arxiv_submission_date: str = None
        arxiv_authors: List[str] = None
    return arxiv_title, arxiv_submission_date, arxiv_authors


def create_github_url(github_url):
    if github_url is not None:
        github_url = github_url.removesuffix(".git")
        paths = github_url.split("/")
        github_userdir = f"{paths[-2]}/{paths[-1]}"
        g = Github()
        repo = g.get_repo(github_userdir)
        latest_commit = repo.get_commits()[0]

        github_url: str = github_url
        github_dir: str = repo.name
        github_userdir: str = github_userdir
        github_commit_hash: str = latest_commit.sha
        github_commit_hash_date: str = latest_commit.commit.author.date.strftime(
            "%Y/%m/%d"
        )
        github_license: str = repo.get_license().license.name
    else:
        github_url: str = None
        github_dir: str = None
        github_userdir: str = None
        github_commit_hash: str = None
        github_commit_hash_date: str = None
    return (
        github_url,
        github_dir,
        github_userdir,
        github_commit_hash,
        github_commit_hash_date,
        github_license,
    )


@dataclass
class Data:
    arxiv_title: str
    arxiv_url: str
    arxiv_submission_date: str
    arxiv_authors: List[str]
    github_url: str
    github_dir: str
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
        os.path.join(os.path.dirname(__file__), "configs/temp.md"), encoding="utf-8"
    ) as f:
        temp_article = f.read()

    splited_temp_articles = temp_article.split("@{")
    splited_articles = []
    for splited_temp_article in splited_temp_articles[1:]:
        end_word_index = splited_temp_article.find("}")
        value_name = splited_temp_article[:end_word_index]
        value = getattr(data, value_name)
        splited_article = value + splited_temp_article[end_word_index + 1 :]
        splited_articles.append(splited_article)

    article = "".join(splited_articles)
    return article


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--arxiv_url", "-a")
    parser.add_argument("--github_url", "-g")
    parser.add_argument("--base_nvidia_image", "-b")
    args = parser.parse_args()

    # arxiv_url = args.arxiv_url
    arxiv_url = "https://arxiv.org/abs/1612.00593"
    # github_url = args.github_url
    github_url = "https://github.com/charlesq34/pointnet"
    # base_nvidia_image = args.base_nvidia_image
    base_nvidia_image = "nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04"

    arxiv_title, arxiv_submission_date, arxiv_authors = create_arxiv_data(arxiv_url)
    (
        github_url,
        github_dir,
        github_userdir,
        github_commit_hash,
        github_commit_hash_date,
        github_license,
    ) = create_github_url(github_url)

    update_date = datetime.datetime.now().strftime("%Y/%m/%d")
    myrepo_article_abb = "".join([t[0] for t in arxiv_title.split(" ")])

    data = Data(
        arxiv_title=arxiv_title,
        arxiv_url=arxiv_url,
        arxiv_submission_date=arxiv_submission_date,
        arxiv_authors=arxiv_authors,
        github_url=github_url,
        github_dir=github_dir,
        github_userdir=github_userdir,
        github_commit_hash=github_commit_hash,
        github_commit_hash_date=github_commit_hash_date,
        github_license=github_license,
        update_date=update_date,
        base_nvidia_image=base_nvidia_image,
        myrepo_article_abb=myrepo_article_abb,
    )
    article = create_article(data)

    output_file_path = os.path.join(
        os.path.dirname(__file__),
        "../public/data",
        arxiv_title.replace(":", "") + ".md",
    )
    if not os.path.exists(output_file_path):
        with open(output_file_path, "w", encoding="utf-8") as f:
            f.write(article)
    else:
        print(f"exist: {output_file_path}")

    os.makedirs(
        os.path.join(
            os.path.dirname(__file__), "../public/data/img", myrepo_article_abb
        )
    )
    os.makedirs(
        os.path.join(
            os.path.dirname(__file__), "../../environments", myrepo_article_abb
        )
    )


if __name__ == "__main__":
    main()
