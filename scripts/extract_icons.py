# Extract the real app's tile icons from the 3x screenshots as transparent PNG masks + a metadata file.
import json, numpy as np
from PIL import Image
S=3; COL=[15,143.33,271.67]; TW=106.67; PITCH=128.67
def load(p): return np.array(Image.open(p).convert('RGB')).astype(float)
NAVY_L=(6+52+134)/3
meta={}
def extract(img, key, tl, tt, tw=TW, th=TW, label_h=50, border=2):
    x0,y0,x1,y1=int(tl*S)+6,int((tt+label_h)*S),int((tl+tw)*S)-6,int((tt+th)*S)-6
    sub=img[y0:y1,x0:x1]; lum=sub.mean(-1); m=lum>150; ys,xs=np.where(m)
    bx0,bx1,by0,by1=max(xs.min()-2,0),xs.max()+3,max(ys.min()-2,0),ys.max()+3
    crop=lum[by0:by1,bx0:bx1]; alpha=np.clip((crop-NAVY_L)/(255-NAVY_L),0,1)
    out=np.zeros((*crop.shape,4),np.uint8); out[...,:3]=255; out[...,3]=(alpha*255).astype(np.uint8)
    Image.fromarray(out,'RGBA').save(f'public/img/icons/{key}.png')
    ax0,ay0=x0+bx0,y0+by0; w=(bx1-bx0)/S; h=(by1-by0)/S
    left=ax0/S-tl-border; bottom=(tt+th)-(ay0/S+h)-border
    meta[key]={'w':round(w,2),'h':round(h,2),'left':round(left,2),'bottom':round(bottom,2)}
    print(f'{key:10s} w{w:5.1f} h{h:5.1f} left{left:5.1f} bottom{bottom:5.1f}')
r1=load('refs/ref-1-home-top.png'); r3=load('refs/ref-3.png'); r4=load('refs/ref-4.png')
# ref-1
extract(r1,'bubble',21.7,273.7,tw=221.3,th=221.6,label_h=70,border=4)
extract(r1,'clock',COL[2],267); extract(r1,'person',COL[2],267+PITCH)
for k,c in zip(['plus','pin','union'],COL): extract(r1,k,c,267+2*PITCH)
# ref-3 rows from 136
for ri,row in enumerate([['mail','book','calstar'],['caldots','xsquare','monitor'],['printer','gear','bike']]):
    for k,c in zip(row,COL): extract(r3,k,c,136+ri*PITCH,label_h=66 if k=='xsquare' else 50)
# ref-4 rows from 240
for ri,row in enumerate([['info','globe','guide'],['door','warn','linkedin'],['careers','alumni','clipboard'],[None,'docpen',None]]):
    for k,c in zip(row,COL):
        if k: extract(r4,k,c,240+ri*PITCH)
json.dump(meta,open('src/data/iconMeta.json','w'),indent=1)
# badge colour sample
b=r4[int(500*S):int(532*S),int(338*S):int(374*S)].reshape(-1,3).astype(int)
from collections import Counter
cnt=Counter(map(tuple,b)); print('badge top colours', cnt.most_common(4))
dark=b[b.sum(1)<400]; print('badge text colour mean', dark.mean(0) if len(dark) else None)
