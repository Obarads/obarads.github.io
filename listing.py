# coding: UTF-8

import csv
import os
import glob
import copy
import argparse
import yaml
import numpy as np
from distutils.util import strtobool

def extract_data(path):
    status_counter = {"更新済":0,"省略":0,"参照":0,"未完":0,"修正":0,"導入":0}
    md_list = glob.glob("./"+ path +"/*.md")
    path_list = md_list
    info_list = []
    kw_tags = []
    date_tags = []
    status_tags = []
    md_list = [m.replace("./"+ path +"/","").replace(".md","") for m in md_list] #linux path
    md_list = [m.replace("./"+ path +"\\","").replace(".md","") for m in md_list] #windows path
    for (ml,pl) in zip(md_list,path_list):
        with open(pl, 'r',encoding="utf-8") as f:
            content = f.read().split("\n")
            kw = ""
            date = "????"
            status = "????"
            if "## key-words" in content:
                kw_index = content.index("## key-words")
                if kw_index != -1 and len(content[kw_index:kw_index+2]) == 2:
                    kw = content[kw_index+1].replace(" ","").replace("_"," ")
                    for k in kw.split(","):
                        k = "'"+k+"'"
                        if not k in kw_tags:
                            kw_tags.append(k)
            if "## 投稿日付(yyyy/MM/dd)" in content:
                date_index = content.index("## 投稿日付(yyyy/MM/dd)")
                if date_index != -1:
                    date = content[date_index+1].split("/")[0]
                    date_tags.append(date)
            if "## status" in content:
                status_index = content.index("## status")
                if status_index != -1:
                    status = content[status_index+1]
                    status_tags.append(status)
                    if status in ["更新済","省略","参照","未完","修正","導入"]:
                        status_counter[status]+=1

            info_list.append([ml,kw,date,status])

    date_tags = list(set(date_tags))
    status_tags = list(set(status_tags))

    info_list.sort()
    kw_tags.sort()
    date_tags.sort()
    status_tags.sort()

    info_list = ["['"+"','".join(il)+"']" for il in info_list]
    print(status_counter)

    return info_list,kw_tags,date_tags,status_tags

def coloring_tag_template(tags,propertis='background:rgb(0,0,0);\ncolor:#fff;'):
    tag_css_class = ""
    for t in tags:
        tag_css_class += '.__'+ t.replace(" ","_").replace("&","_").replace("'","") + '{\n'+propertis+'\n}\n\n' 
    return tag_css_class

def main():
    parser = argparse.ArgumentParser(description='-m l:listing, t:classes tag category')
    # parser.add_argument('--conv-layers', '-c', type=int, default=4)
    parser.add_argument('--mode', '-m', type=str, default="l")
    parser.add_argument('--css', '-c', type=strtobool, default='false')
    args = parser.parse_args()
    mode = args.mode
    css = args.css

    if mode=="l":
        info_list_papers,kw_tags_papers,date_tags_papers,status_tags_papers = extract_data("papers")
        info_list_complementary,kw_tags_complementary,date_tags_complementary,status_tags_complementary = extract_data("complementary")

        kwt = kw_tags_papers

        # tagのテンプレ作成
        kw_tags = copy.copy(kw_tags_papers)
        kw_tags.extend(kw_tags_complementary)
        kw_tags = list(set(kw_tags))
        kw_tags = coloring_tag_template(kw_tags)

        info_list_papers = "function information_list(){ return ["+",".join(info_list_papers)+"]}\n"
        kw_tags_papers = "function tag_list(){ return ["+ ",".join(kw_tags_papers) +"]}\n"
        date_tags_papers = "function date_tag_list(){ return ["+ ",".join(date_tags_papers) +"]}\n"
        info_list_complementary = "function information_list_c(){ return ["+",".join(info_list_complementary)+"]}\n"
        kw_tags_complementary = "function tag_list_c(){ return ["+ ",".join(kw_tags_complementary) +"]}\n"
        date_tags_complementary = "function date_tag_list_c(){ return ["+ ",".join(date_tags_complementary) +"]}"

        with open('js/list.js', 'w', encoding="utf-8") as f:
            f.writelines(info_list_papers)
            f.writelines(kw_tags_papers)
            f.writelines(date_tags_papers)
            f.writelines(info_list_complementary)
            f.writelines(kw_tags_complementary)
            f.writelines(date_tags_complementary)
            f.close()

        with open('css/tag_temp.css', 'w') as f:
            f.writelines(kw_tags)
            f.close()

        with open('tag_list_temp.yaml', 'w', encoding="utf-8") as f:
            f.writelines("other: [")
            for kt in kwt:
                f.writelines('"'+kt+'",\n')
            f.writelines("]")

    elif mode=="t":
        with open('tag_list.yaml') as f:
            yml = yaml.load(f)
        with open('tag_list_temp.yaml') as f:
            yml_0 = yaml.load(f)
            confirmation_origin = np.array(sorted(yml_0["other"]))
        task = yml["task"]
        data = yml["data"]
        etc = yml["etc"]
        confirmation = []
        confirmation.extend(task)
        confirmation.extend(data)
        confirmation.extend(etc)
        confirmation = np.array(sorted(confirmation))

        print(task)

        print("以下のタグがtag_listに含まれていない")
        for i,l in zip(confirmation_origin,np.in1d(confirmation_origin,confirmation)):
            if l == False:
                print(i)

        print("以下のタグがtag_listに余計に含まれている")
        for i,l in zip(confirmation,np.in1d(confirmation,confirmation_origin)):
            if l == False:
                print(i)

        with open('js/tag_s_list.js', 'w') as f:
            f.writelines("function tag_task_list(){ return [" + ",".join(sorted(task))+"]}\n")
            f.writelines("function tag_data_list(){ return [" + ",".join(sorted(data))+"]}\n")
            f.writelines("function tag_etc_list(){ return [" + ",".join(sorted(etc))+"]}\n")

        if css:
            with open('css/tag.css', 'w') as f:
                f.writelines(coloring_tag_template(task,propertis='background:rgb(33, 83, 219);\ncolor:#fff;'))
                f.writelines(coloring_tag_template(data,propertis='background:rgb(0, 143, 59);\ncolor:#fff;'))
                f.writelines(coloring_tag_template(etc,propertis='background:rgb(216,0,0);\ncolor:#fff;'))
                f.close()




if __name__ == '__main__':
    main()
