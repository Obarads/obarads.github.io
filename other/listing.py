# coding: UTF-8

import csv
import os
import datetime
import glob
import copy
import argparse
import yaml
import numpy as np
import re
from distutils.util import strtobool

PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),"..")
PATH_OTHER = os.path.dirname(os.path.abspath(__file__))

def creating_tag_dict_and_list(dir_name):
    tag_dict = {}
    tag_list = []
    with open(PATH_OTHER + "/tag_list_for_"+ dir_name +".yaml", encoding="utf-8") as f:
        yml = yaml.load(f,Loader=yaml.SafeLoader)

    count = 0
    for yml_key in yml:
        for yml_key_in_categoreis in yml[yml_key]:
            tag_dict[yml_key_in_categoreis] = count
            tag_list.append(yml_key_in_categoreis)
            count += 1

    return tag_dict, tag_list

# tag_listとtag_listにあるタグの有無を調べるためだけの関数
def tag_list_conf(yml, yml_temp):
    confirmation_origin = np.array(sorted(yml_temp["other"]))
    confirmation = []
    confirmation.extend(yml["contents"])
    confirmation.extend(yml["field"])
    confirmation.extend(yml["method"])
    confirmation.extend(yml["data"])
    confirmation.extend(yml["task"])
    confirmation.extend(yml["etc"])
    confirmation = np.array(sorted(confirmation))

    print("以下のタグがtag_listに含まれていない")
    for i,l in zip(confirmation_origin,np.in1d(confirmation_origin,confirmation)):
        if l == False:
            print(i)

    print("以下のタグがtag_listに余計に含まれている")
    for i,l in zip(confirmation,np.in1d(confirmation,confirmation_origin)):
        if l == False:
            print(i)

def create_toc(md):
    toc = []
    for x in md:
        in_code = False
        if re.search("/^```.?/", x):
            # コードの行内の場合は外す
            if in_code:
                in_code = False
            else:
                in_code = True
        if len(x) >= 2:
            if x[0] == "#" and in_code == False and x[1] != ' ':
                # 先頭の#とスペースを削除して追加
                toc_data = x
                #x_shape = x.split(" ")[0]
                #toc_data = [
                #    str(x_shape.count("#")),
                #    x.replace("/^#+/,",""),
                #]
                toc.append(toc_data)
    return toc

def extract_data(path,tag_dict,tag_list):
    status_counter = {"完了":0, "省略":0,"参照":0,"未完":0,"修正":0,"導入":0}
    md_list = glob.glob(path+"*.md")
    path_list = md_list
    info_list = []  # 検索用の情報を取得する。
    actlog_list = [] # 更新確認用の情報を取得する。これ専用の情報抽出処理は検索用よりも後になる。
    kw_tags = []
    date_tags = []
    status_tags = []
    md_list = [os.path.split(m)[1].replace(".md","") for m in md_list]
    rd_type_0 = "## 投稿日付(yyyy/MM/dd)"
    rd_type_1 = "## Release date(yyyy/MM/dd)" # I don't use this now.
    for (ml,pl) in zip(md_list,path_list):
        with open(pl, 'r',encoding="utf-8") as f:
            content = f.read().split("\n")
            kw = ""
            date = "????"
            status = "????"
            if "## key-words" in content:
                kw_index = content.index("## key-words")
                if kw_index != -1 and len(content[kw_index:kw_index+2]) == 2:
                    kw = content[kw_index+1].replace("##### ","").replace(" ","").replace("_"," ")
                    kw_list = []
                    for k in kw.split(","):
                        k = "'"+k+"'"
                        if k == "''":
                            print(ml+":include none tag")
                        else:
                            if not k in kw_tags:
                                kw_tags.append(k)
                            kw_list.append(tag_dict[k])
                    kw_list.sort()
                    kw_sort = []
                    for kl in kw_list:
                        kw_sort.append(tag_list[kl].replace("'",""))
                    kw_sort = ",".join(kw_sort)
            rd_type = None
            if rd_type_0 in content:
                rd_type = rd_type_0
            elif rd_type_1 in content:
                rd_type = rd_type_1
            if rd_type is not None:
                date_index = content.index(rd_type)
                if date_index != -1:
                    if content[date_index+1].split("/")[0] != "":
                        date = content[date_index+1].split("/")[0].replace("##### ","")
                        date_tags.append(date)
            if "## status" in content:
                status_index = content.index("## status")
                if status_index != -1:
                    status = content[status_index+1].replace("##### ","")
                    if status in ["省略","参照","未完","修正","導入","完了"]:
                        status_tags.append(status)
                        status_counter[status]+=1
                        if status == "導入":
                            #print(ml)
                            pass
                    else:
                        pass
            if "# " in content[0]:
                title = content[0].replace("# ","").replace("'","\\'")
            else:
                title = ml

            # 更新確認用情報の抽出処理
            p = os.path.getmtime(pl)
            dt = datetime.datetime.fromtimestamp(p)
            dt = dt.strftime('%Y/%m/%d %H:%M:%S')

            #toc = create_toc(content)

            info_list.append([ml,kw_sort,date,status,title])
            actlog_list.append([p,dt,ml,kw_sort,status,title])

    date_tags = list(set(date_tags))
    status_tags = list(set(status_tags))

    info_list.sort()
    kw_tags.sort()
    date_tags.sort()
    status_tags.sort()
    actlog_list.sort(reverse=True)

    info_list = ["['"+"','".join(il)+"']" for il in info_list]
    print(status_counter)

    return info_list,kw_tags,date_tags,status_tags,actlog_list

def coloring_tag_template(tags,propertis='background:rgb(0,0,0);\ncolor:#fff;'):
    tag_css_class = ""
    for t in tags:
        tag_css_class += '.__'+ t.replace(" ","_").replace("&","_").replace("'","") + '{\n'+propertis+'\n}\n\n' 
    return tag_css_class

def cmd_line_args(args=None):
    parser = argparse.ArgumentParser(description='-m l:listing, t:classes tag category')
    # parser.add_argument('--conv-layers', '-c', type=int, default=4)
    parser.add_argument('--mode', '-m', type=str, default="l", choices=["l","t"]) # lはmdの情報を/papersページのリストに反映、tは新規タグを反映させる。タグに反映させる際はother/tag_list.yamlに新たなtagを入力しなければいけない。
    parser.add_argument('--css', '-c', type=strtobool, default='false') # tabの色を指定色に決めるかどうか、現在はtrueを適応している。
    args = parser.parse_args()
    return args

def update_lists(dir_name, tag_dict, tag_list):

    # create new papers contents (I don't use status_tags still.)
    info_list, kw_tags, date_tags, status_tags, actlog_list = extract_data(PATH+"/"+ dir_name +"/", tag_dict, tag_list)

    # create list.js
    info_list_for_js = "function information_list_for_"+ dir_name +"(){ return ["+",".join(info_list)+"]}\n"

    kw_tags_for_js = "function tag_list_for_"+ dir_name +"(){ return ["+ ",".join(kw_tags) +"]}\n"
    date_tags_for_js = "function date_tag_list_for_"+ dir_name +"(){ return ["+ ",".join(date_tags) +"]}\n"
    with open(PATH+"/js/build/list_for_"+ dir_name +".js", 'w', encoding="utf-8") as f:
        f.writelines(info_list_for_js)
        f.writelines(kw_tags_for_js)
        f.writelines(date_tags_for_js)

    # create a css template
    kw_tags_for_css = copy.copy(kw_tags)
    kw_tags_for_css = list(set(kw_tags_for_css))
    kw_tags_for_css = coloring_tag_template(kw_tags_for_css)
    with open(PATH+"/css/tag_temp_for_"+ dir_name +".css", 'w') as f:
        f.writelines(kw_tags_for_css)

    # create a tag list template
    with open(PATH_OTHER + "/tag_list_temp_for_"+ dir_name +".yaml", 'w', encoding="utf-8") as f:
        f.writelines("other: [")
        for kt in kw_tags:
            f.writelines('"'+kt+'",\n')
        f.writelines("]")

    # create actloger
    with open(PATH + "/js/build/actlog_list_for_"+ dir_name +".js", 'w', encoding="utf-8") as f:
        top10_actlog = actlog_list[0:10]
        actlog_js = "function actlog_list_for_"+ dir_name + "(){return ["
        for ta in top10_actlog:
            actlog = "['"+ ta[1] + "','"+ ta[2] + "','"+ ta[3] + "','"+ ta[4] + "','"+ ta[5]+"'],"
            actlog_js += actlog
        actlog_js += "]}"
        f.write(actlog_js)

def update_tags(dir_name, ucss):
    with open(PATH_OTHER + "/tag_list_for_"+ dir_name +".yaml") as f:
        yml = yaml.load(f,Loader=yaml.SafeLoader)
    with open(PATH_OTHER + "/tag_list_temp_for_"+ dir_name +".yaml") as f:
        yml_temp = yaml.load(f,Loader=yaml.SafeLoader)

    # tag_listとtag_listにあるタグの有無を調べるためだけの関数
    tag_list_conf(yml, yml_temp)

    # タグのカテゴリーごとのjavascript関数を作成する。
    with open(PATH+"/js/build/tag_for_"+ dir_name +".js", 'w') as f:
        f.writelines("function tag_status_list_for_"+ dir_name +"(){ return [" + ",".join(sorted(yml["status"]))+"]}\n")
        f.writelines("function tag_contents_list_for_"+ dir_name +"(){ return [" + ",".join(sorted(yml["contents"]))+"]}\n")
        f.writelines("function tag_field_list_for_"+ dir_name +"(){ return [" + ",".join(sorted(yml["field"]))+"]}\n")
        f.writelines("function tag_method_list_for_"+ dir_name +"(){ return [" + ",".join(sorted(yml["method"]))+"]}\n")
        f.writelines("function tag_data_list_for_"+ dir_name +"(){ return [" + ",".join(sorted(yml["data"]))+"]}\n")
        f.writelines("function tag_task_list_for_"+ dir_name +"(){ return [" + ",".join(sorted(yml["task"]))+"]}\n")
        f.writelines("function tag_etc_list_for_"+ dir_name +"(){ return [" + ",".join(sorted(yml["etc"]))+"]}\n")

    # タグのカテゴリーごとの既定の色に変更する。
    if ucss:
        # タグ中の/を別の値に変換、対象はcssのみ。この変更に対応するために、all.jsのCreatingTagsも変更している。
        for k in yml:
            for i in range(len(yml[k])):
                yml[k][i] = yml[k][i].replace("/","")

        with open(PATH+"/css/tag_for_"+ dir_name +".css", 'w') as f:
            f.writelines(coloring_tag_template(yml["status"],propertis='background:#fbff21;\ncolor:#000;'))
            f.writelines(coloring_tag_template(yml["contents"],propertis='background:#d9333f;\ncolor:#fff;'))
            f.writelines(coloring_tag_template(yml["field"],propertis='background:#005FFF;\ncolor:#fff;'))
            f.writelines(coloring_tag_template(yml["method"],propertis='background:#eb6101;\ncolor:#fff;'))
            f.writelines(coloring_tag_template(yml["data"],propertis='background:#228B22;\ncolor:#fff;'))
            f.writelines(coloring_tag_template(yml["task"],propertis='background:#36558F;\ncolor:#fff;'))
            f.writelines(coloring_tag_template(yml["etc"],propertis='background:#aa08d3;\ncolor:#fff;'))

def main():
    args = cmd_line_args()
    tag_dict, tag_list = creating_tag_dict_and_list("papers")

    # ファイルの内容を検索欄に表示するための処理を行う。
    if args.mode=="l":
        update_lists("papers", tag_dict, tag_list)
        #update_lists("complementary", tag_dict, tag_list)

    # 検索などのためのタグの反映を行う。
    elif args.mode=="t":
        update_tags("papers", args.css)
        #update_tags("complementary", args.css)

if __name__ == '__main__':
    main()
