# coding: UTF-8

import csv
import os
import glob
import copy
import argparse
import yaml
import numpy as np
from distutils.util import strtobool
import re
import pprint

def check_files(path=None):
    assert path in ["papers"]
    path_list = glob.glob("./"+ path +"/*.md")
    not_found = []
    for pl in path_list:
        with open(pl, 'r',encoding="utf-8") as f:
            content = f.read()
        search_res = re.search('Github Issues : \[#[0-9]*\]',content)
        if search_res is None:
            not_found.append(pl)

    pprint.pprint(not_found,width=200)


def main():
    parser = argparse.ArgumentParser(description='check files')
    # parser.add_argument('--conv-layers', '-c', type=int, default=4)
    args = parser.parse_args()

    check_files(path="../papers")

if __name__ == '__main__':
    main()
