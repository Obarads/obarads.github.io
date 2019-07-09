# coding: UTF-8

import csv
import os
import glob
import copy
import argparse
import yaml
import numpy as np

def change_tag_names(path,target,changed_name):
    path_list = glob.glob("./"+ path +"/*.md")
    for pl in path_list:
        kw=""
        with open(pl, 'r',encoding="utf-8") as f:
            content = f.read().split("\n")
            if "## key-words" in content:
                kw_index = content.index("## key-words")
                if kw_index != -1 and len(content[kw_index:kw_index+2]) == 2:
                    if target in content[kw_index+1]:
                        content[kw_index+1] = content[kw_index+1].replace(target,changed_name)
                        kw = "A!"
        if kw != "":
            with open(pl, 'w',encoding="utf-8") as f:
                f.write('\n'.join(content))

def main():
    parser = argparse.ArgumentParser(description='change category name')
    # parser.add_argument('--conv-layers', '-c', type=int, default=4)
    parser.add_argument('--target', '-t', type=str, default="")
    parser.add_argument('--changed', '-c', type=str, default="")
    args = parser.parse_args()
    target = args.target
    changed = args.changed

    if target !="" and changed !="":
        change_tag_names("papers",target,changed)
        change_tag_names("complementary",target,changed)

if __name__ == '__main__':
    main()
