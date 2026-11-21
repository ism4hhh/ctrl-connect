# Fetch specific Wikipedia/Commons files by title as 160px logo tiles. usage: domain=File:Title ...
import json, time, urllib.request, urllib.parse, sys, io
from PIL import Image
UA='PlusOneHackathonPrototype/1.0 (student hackathon project; non-commercial demo)'
def get(url):
    for i in range(4):
        try:
            r=urllib.request.Request(url,headers={'User-Agent':UA}); return urllib.request.urlopen(r,timeout=30).read()
        except Exception as e:
            time.sleep(3+i*3)
    return None
for arg in sys.argv[1:]:
    dom,title=arg.split('=',1)
    url=None
    for host in ('https://en.wikipedia.org','https://commons.wikimedia.org'):
        b=get(host+'/w/api.php?'+urllib.parse.urlencode({'action':'query','titles':title,'prop':'imageinfo','iiprop':'url','iiurlwidth':'512','format':'json'})); time.sleep(1.5)
        if not b: continue
        info=list(json.loads(b)['query']['pages'].values())[0].get('imageinfo')
        if info: url=info[0].get('thumburl') or info[0].get('url'); break
    if not url: print(dom,'NOT FOUND',title); continue
    b=get(url); time.sleep(1.5)
    try: im=Image.open(io.BytesIO(b)).convert('RGBA')
    except Exception as e: print(dom,'bad',e); continue
    s=160; c=Image.new('RGBA',(s,s),(255,255,255,255)); r=im.copy(); r.thumbnail((s-16,s-16),Image.LANCZOS); c.paste(r,((s-r.width)//2,(s-r.height)//2),r); c.save(f'public/logos/domains/{dom}.png'); print(dom,'<-',title,im.size)
