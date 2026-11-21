# Header glyphs + bottom-nav icons from ref-1 as alpha masks (recolourable via CSS mask), plus the wordmark as RGB.
import json, numpy as np
from PIL import Image
S=3
R=np.array(Image.open('refs/ref-1-home-top.png').convert('RGB')).astype(float)
meta={}
def mask(key, x0,y0,x1,y1, chan):
    sub=R[y0:y1,x0:x1]; 
    a=np.clip((255-sub[...,chan])/(255-26),0,1) if chan is not None else np.clip((255-sub.mean(-1))/(255-34),0,1)
    ys,xs=np.where(a>0.15); bx0,bx1,by0,by1=max(xs.min()-2,0),xs.max()+3,max(ys.min()-2,0),ys.max()+3
    crop=a[by0:by1,bx0:bx1]; out=np.zeros((*crop.shape,4),np.uint8); out[...,:3]=255; out[...,3]=(crop*255).astype(np.uint8)
    Image.fromarray(out,'RGBA').save(f'public/img/icons/{key}.png')
    ax0,ay0=(x0+bx0)/S,(y0+by0)/S; w=(bx1-bx0)/S; h=(by1-by0)/S
    meta[key]={'w':round(w,2),'h':round(h,2),'x':round(ax0,2),'y':round(ay0,2)}
    print(f'{key:14s} w{w:5.1f} h{h:5.1f} x{ax0:6.1f} y{ay0:6.1f}')
mask('hdr-refresh',930,255,1020,325,None); mask('hdr-kebab',1060,255,1110,325,None)
for key,(a,b),chan in [('nav-home',(0,236),0),('nav-settings',(236,472),None),('nav-calendar',(472,708),None),('nav-alerts',(708,944),None),('nav-search',(944,1179),None)]:
    mask(key,a,2265,b,2368,chan)
Image.open('refs/ref-1-home-top.png').convert('RGB').crop((290,208,892,372)).save('public/img/qm-logo.png')
json.dump(meta,open('src/data/chromeMeta.json','w'),indent=1); print('logo + meta ok')
