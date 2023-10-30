import os
import re
import arxiv
import github
from typing import List

OGI_SECTION_LIST = {
    "Demo abstract": ["\n## Demo abstract\n", "\n## Demo implementation info\n"],
    "Demo implementation_info": [
        "\n## Demo implementation info\n",
        "\n## Demo enviroment\n",
    ],
    "Demo enviroment": ["\n## Demo enviroment\n", "\n## Demo process\n"],
    "Demo process": ["\n## Demo process\n", "\n## Note\n"],
}


class OGIData:
    ogi_demo_abstract: str = None
    ogi_implementation_info: str = None
    ogi_demo_enviroment: str = None
    ogi_demo_process: str = None
    ogi_github_dir: str = None

    def __init__(self, ogi_readmme_path=None) -> None:
        if ogi_readmme_path is not None:
            with open(ogi_readmme_path, encoding="utf-8") as f:
                ogi_readme = f.read()

            self.ogi_demo_abstract = self.range_clipping(
                ogi_readme, *OGI_SECTION_LIST["Demo abstract"]
            )
            self.ogi_implementation_info = self.range_clipping(
                ogi_readme, *OGI_SECTION_LIST["Demo implementation_info"]
            )
            self.ogi_demo_enviroment = self.range_clipping(
                ogi_readme, *OGI_SECTION_LIST["Demo enviroment"]
            )
            self.ogi_demo_process = self.range_clipping(
                ogi_readme, *OGI_SECTION_LIST["Demo process"]
            )

            self.ogi_github_dir = os.path.basename(os.path.dirname(ogi_readmme_path))

    @staticmethod
    def range_clipping(text, start_word, end_word):
        return text[text.find(start_word) : text.find(end_word)].replace(start_word, "")

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
            g = github.Github()
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
