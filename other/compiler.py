import glob
import os
import re

PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),"..")
HTML_PATH = os.path.join(PATH,"html")

#print(PATH,HTML_PATH)

build_js_dir_path = os.path.join(PATH,"js","build")
build_js_list = []
if not os.path.isdir(build_js_dir_path):
    os.makedirs(build_js_dir_path)

html_path_list = glob.glob(os.path.join(HTML_PATH,"*.html"))
html_name_list = [os.path.split(h)[1].replace(".html","") for h in html_path_list]

#print(html_path_list,html_name_list)

for html_path,html_name in zip(html_path_list,html_name_list):
    with open(html_path) as f:
        html = f.read()
        #print(html)
        html = html.replace("\n","").replace("\"","\\\"").split("{@}")
        arguments = ""
        html_with_arguments = "\"" + html[0]
        for i in range(len(html)-1):
            argument = "v" + str(i)

            arguments += argument + ","
            html_with_arguments += "\" + " + argument + " + \"" + html[i+1]
        js = "function " + html_name + "("+ arguments.strip(",") +"){ return " + html_with_arguments + "\";};\n "
    build_js_list.append(js)
with open(os.path.join(build_js_dir_path,"build.js"), mode="w") as f:
    f.writelines(build_js_list)