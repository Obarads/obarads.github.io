import csv
import os
import glob

def main():
    md_list = glob.glob("./papers/*.md")
    md_list = [m.replace("./papers/","").replace(".md","") for m in md_list]
    for m in md_list:
        print(m)
    md_list.sort()

    with open('list.csv', 'w') as f:
        writer = csv.writer(f, lineterminator='\n')
        writer.writerow(md_list)

        f.close()

if __name__ == '__main__':
    main()