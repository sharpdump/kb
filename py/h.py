import html2text
import codecs
h=html2text.HTML2Text()
h.ignore_links=True
h.ignore_images=True
h.ignore_anchors=True
h.ignore_emphasis=True
h.ignore_tables=True
f=codecs.open('index.html','r','gbk')
g=f.read()
print h.handle(g)
