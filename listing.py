# coding: UTF-8

import csv
import os
import glob

def extract_data(path):
    md_list = glob.glob("./"+ path +"/*.md")
    path_list = md_list
    info_list = []
    kw_tags = []
    date_tags = []
    md_list = [m.replace("./"+ path +"/","").replace(".md","") for m in md_list] #linux path
    md_list = [m.replace("./"+ path +"\\","").replace(".md","") for m in md_list] #windows path
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
                    date_tags.append(date)

            info_list.append([ml,kw,date])

    date_tags = list(set(date_tags))

    info_list.sort()
    kw_tags.sort()
    date_tags.sort()

    info_list = ["['"+"','".join(il)+"']" for il in info_list]

    return info_list,kw_tags,date_tags

def main():
    info_list_papers,kw_tags_papers,date_tags_papers = extract_data("papers")
    info_list_complementary,kw_tags_complementary,date_tags_complementary = extract_data("complementary")

    info_list_papers = "function information_list(){ return ["+",".join(info_list_papers)+"]}\n"
    kw_tags_papers = "function tag_list(){ return ["+ ",".join(kw_tags_papers) +"]}\n"
    date_tags_papers = "function date_tag_list(){ return ["+ ",".join(date_tags_papers) +"]}\n"
    info_list_complementary = "function information_list_c(){ return ["+",".join(info_list_complementary)+"]}\n"
    kw_tags_complementary = "function tag_list_c(){ return ["+ ",".join(kw_tags_complementary) +"]}\n"
    date_tags_complementary = "function date_tag_list_c(){ return ["+ ",".join(date_tags_complementary) +"]}"

    with open('js/list.js', 'w') as f:
        f.writelines(info_list_papers)
        f.writelines(kw_tags_papers)
        f.writelines(date_tags_papers)
        f.writelines(info_list_complementary)
        f.writelines(kw_tags_complementary)
        f.writelines(date_tags_complementary)
        f.close()

if __name__ == '__main__':
    main()