# coding: UTF-8

import csv
import os
import glob

def main():
    md_list = glob.glob("./papers/*.md")
    path_list = md_list
    info_list = []
    md_list = [m.replace("./papers/","").replace(".md","") for m in md_list] #linux path
    md_list = [m.replace("./papers\\","").replace(".md","") for m in md_list] #windows path
    for (ml,pl) in zip(md_list,path_list):
        with open(pl, 'r',encoding="utf-8") as f:
            content = f.read().split("\n")
            kw = ""
            if "## key-words" in content:
                kw_index = content.index("## key-words")
                if kw_index != -1 and len(content[kw_index:kw_index+2]) == 2:
                    kw = '"'+content[kw_index+1]

            info_list.append([ml,kw])

    info_list.sort()

    info_list = ["['"+"','".join(il)+"']" for il in info_list]
    info_list = "function infomation_list(){ return ["+",".join(info_list)+"]}"

    print(info_list)

    with open('js/list.js', 'w') as f:
        f.writelines(info_list)
        f.close()

if __name__ == '__main__':
    main()