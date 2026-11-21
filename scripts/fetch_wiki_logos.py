# Pull brand logos from each company's Wikipedia infobox (File:*logo*.svg) via the MediaWiki API.
import json, time, urllib.request, urllib.parse, sys, os, io
from PIL import Image
UA='PlusOneHackathonPrototype/1.0 (student hackathon project; non-commercial demo)'
def get(url):
    for i in range(3):
        try:
            r=urllib.request.Request(url,headers={'User-Agent':UA}); return urllib.request.urlopen(r,timeout=30).read()
        except Exception as e:
            time.sleep(2+i*2)
    return None
def api(params):
    b=get('https://en.wikipedia.org/w/api.php?'+urllib.parse.urlencode(params|{'format':'json'}))
    return json.loads(b) if b else None
TARGETS={'pret.co.uk':'Pret a Manger','greggs.co.uk':'Greggs','nandos.co.uk':"Nando's",'francomanca.co.uk':'Franco Manca','wasabi.uk.com':'Wasabi (restaurant)',
 'gsk.com':'GSK plc','deloitte.com':'Deloitte','goldmansachs.com':'Goldman Sachs','ubs.com':'UBS','bankofengland.co.uk':'Bank of England','santander.co.uk':'Santander UK','wellcome.org':'Wellcome Trust','rsb.org.uk':'Royal Society of Biology','chevening.org':'Chevening Scholarship','180dc.org':'180 Degrees Consulting'}
os.makedirs('public/logos/domains',exist_ok=True)
SKIP=set(sys.argv[1:])
for dom,title in TARGETS.items():
    if dom in SKIP: continue
    d=api({'action':'query','titles':title,'prop':'images','imlimit':'60','redirects':'1'}); time.sleep(1.2)
    if not d: print(dom,'api fail'); continue
    page=list(d['query']['pages'].values())[0]; imgs=[i['title'] for i in page.get('images',[])]
    BAD=('commons','wiki','edit','flag','symbol','icon','question','ambox','pictogram')
    logos=[t for t in imgs if 'logo' in t.lower() and not t.lower().endswith('.gif') and not any(b in t.lower() for b in BAD)]
    logos.sort(key=lambda t:(0 if t.lower().endswith('.svg') else 1, len(t)))
    if not logos: print(dom,'no logo file among',imgs[:6]); continue
    f=logos[0]
    d2=api({'action':'query','titles':f,'prop':'imageinfo','iiprop':'url','iiurlwidth':'512'}); time.sleep(1.2)
    if not d2: print(dom,'imageinfo fail'); continue
    info=list(d2['query']['pages'].values())[0].get('imageinfo',[{}])[0]; url=info.get('thumburl') or info.get('url')
    if not url: print(dom,'no url for',f); continue
    b=get(url); time.sleep(0.6)
    if not b: print(dom,'download fail'); continue
    try:
        im=Image.open(io.BytesIO(b)).convert('RGBA')
    except Exception as e: print(dom,'bad image',e); continue
    s=160; canvas=Image.new('RGBA',(s,s),(255,255,255,255)); r=im.copy(); r.thumbnail((s-16,s-16),Image.LANCZOS)
    canvas.paste(r,((s-r.width)//2,(s-r.height)//2),r); canvas.save(f'public/logos/domains/{dom}.png')
    print(dom,'<-',f,im.size)
