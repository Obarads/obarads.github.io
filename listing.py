# coding: UTF-8

import csv
import os
import glob

def main():
    md_list = glob.glob("./papers/*.md")
    path_list = md_list
    info_list = []
    kw_tags = []
    md_list = [m.replace("./papers/","").replace(".md","") for m in md_list] #linux path
    md_list = [m.replace("./papers\\","").replace(".md","") for m in md_list] #windows path
    for (ml,pl) in zip(md_list,path_list):
        with open(pl, 'r',encoding="utf-8") as f:
            content = f.read().split("\n")
            kw = ""
            date = "????"
            if "## key-words" in content:
                kw_index = content.index("## key-words")
                if kw_index != -1 and len(content[kw_index:kw_index+2]) == 2:
                    kw = content[kw_index+1].replace(" ","").replace("_"," ")
                    for k in kw.split(","):
                        k = "'"+k+"'"
                        if not k in kw_tags:
                            kw_tags.append(k)
            if "### 投稿日付(yyyy/MM/dd)" in content:
                date_index = content.index("### 投稿日付(yyyy/MM/dd)")
                if date_index != -1:
                    date = content[date_index+1].split("/")[0]

            info_list.append([ml,kw,date])

    info_list.sort()
    kw_tags.sort()

    info_list = ["['"+"','".join(il)+"']" for il in info_list]
    info_list = "function infomation_list(){ return ["+",".join(info_list)+"]}"
    kw_tags = "\n function tag_list(){ return ["+ ",".join(kw_tags) +"]}"

    with open('js/list.js', 'w') as f:
        f.writelines(info_list)
        f.writelines(kw_tags)
        f.close()

if __name__ == '__main__':
    main()