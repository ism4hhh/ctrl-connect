# Grid-aware geometry comparison, build vs reference, both 1179x2556 (393x852 @3x). usage: measure.py <round>
import sys, numpy as np
from PIL import Image
rnd=sys.argv[1]; S=3
def load(p): return np.array(Image.open(p).convert('RGB')).astype(int)
def bbox(a,x0,y0,x1,y1,fn):
    sub=a[int(y0):int(y1),int(x0):int(x1)]; m=fn(sub); ys,xs=np.where(m)
    return None if len(xs)==0 else (int(xs.min()+x0),int(xs.max()+x0),int(ys.min()+y0),int(ys.max()+y0))
white=lambda s: s.sum(-1)>650
blue=lambda s: (s[...,2]>120)&(s[...,0]<120)&(s[...,1]<140)
dark=lambda s: s.sum(-1)<300
navact=lambda s: (np.abs(s-np.array([26,115,232])).sum(-1)<90)
teal=lambda s: (np.abs(s-np.array([46,176,191])).sum(-1)<110)&(s[...,2]>140)&(s[...,0]<120)
def runs(mask,off=0):
    out=[];st=None
    for i,v in enumerate(mask):
        if v and st is None: st=i
        if not v and st is not None: out.append((st+off,i-1+off)); st=None
    if st is not None: out.append((st+off,len(mask)-1+off))
    return [r for r in out if r[1]-r[0]>=1]
def fmt(b):
    if b is None: return 'None'
    x0,x1,y0,y1=b; return f'x{x0/S:6.1f}-{x1/S:6.1f} y{y0/S:6.1f}-{y1/S:6.1f} w{(x1-x0+1)/S:5.1f} h{(y1-y0+1)/S:5.1f}'
def cmp(label,b,r):
    print(f'{label:30s} ref {fmt(r)} | build {fmt(b)}')
COL=[15,143.33,271.67]; TW=106.67; PITCH=128.67
def tile_rows(first_top, labels):
    out=[]
    for ri,row in enumerate(labels):
        top=first_top+ri*PITCH
        for ci,l in enumerate(row):
            if l: out.append((l,COL[ci],top))
    return out
def tiles_report(B,R,tiles):
    for l,x,y in tiles:
        X0,X1,Y0,Y1=x*S,(x+TW)*S,y*S,(y+TW)*S
        if Y1>2556 or Y0<0: continue
        cmp(f'{l[:14]} label', bbox(B,X0+4,Y0+4,X1-4,Y0+62*S,white), bbox(R,X0+4,Y0+4,X1-4,Y0+62*S,white))
        cmp(f'{l[:14]} icon', bbox(B,X0+4,Y0+62*S,X1-4,Y1-4,white), bbox(R,X0+4,Y0+62*S,X1-4,Y1-4,white))
for case,ref in [('home-top','qa/ref-1-home-top.png'),('home-mid','qa/ref-3.png'),('home-bottom','qa/ref-4.png')]:
    B=load(f'qa/out/{rnd}/{case}-build.png'); R=load(ref)
    print('=====',case)
    if case=='home-top':
        cmp('logo', bbox(B,250,180,900,370,blue), bbox(R,250,180,900,370,blue))
        cmp('refresh icon', bbox(B,900,230,1040,340,dark), bbox(R,900,230,1040,340,dark))
        cmp('kebab', bbox(B,1040,230,1179,340,dark), bbox(R,1040,230,1179,340,dark))
        cmp('greeting', bbox(B,0,450,1100,720,white), bbox(R,0,450,1100,720,white))
        cmp('greeting H', bbox(B,120,450,240,720,white), bbox(R,120,450,240,720,white))
        for y in (900,1700): print(f'teal row y={y}: ref {runs(teal(R[y]))} | build {runs(teal(B[y]))}')
        for x in (200,980): print(f'teal col x={x}: ref {runs(teal(R[:,x]))} | build {runs(teal(B[:,x]))}')
        cmp('AskQM label', bbox(B,80,850,700,1000,white), bbox(R,80,850,700,1000,white))
        cmp('AskQM bubble', bbox(B,80,1100,700,1470,white), bbox(R,80,1100,700,1470,white))
        tiles_report(B,R,[('Timetable',COL[2],267),('MySiS',COL[2],267+PITCH)]+tile_rows(267+2*PITCH,[['QMplus','Campus map','Your Union'],['Email','Library','Events']]))
        print('hairline rows x=12 ref', runs(R[2200:2260,12].sum(-1)<600,2200), 'build', runs(B[2200:2260,12].sum(-1)<600,2200))
        for i,(a,b) in enumerate([(0,236),(236,472),(472,708),(708,944),(944,1179)]):
            cmp(f'nav{i} icon', bbox(B,a,2250,b,2365,lambda s: dark(s)|navact(s)), bbox(R,a,2250,b,2365,lambda s: dark(s)|navact(s)))
            cmp(f'nav{i} label', bbox(B,a,2365,b,2440,lambda s: dark(s)|navact(s)), bbox(R,a,2365,b,2440,lambda s: dark(s)|navact(s)))
        bs=B[380:1100,0:40].mean(-1).mean(1); rs=R[380:1100,0:40].mean(-1).mean(1)
        best=min(range(-30,31), key=lambda d: np.mean((np.roll(bs,d)[40:-40]-rs[40:-40])**2)); print('hero dy (shift build by):',best)
    if case=='home-mid':
        tiles_report(B,R,tile_rows(136,[['Email','Library','Events'],['Exam timetable','Missed teaching','Desk availability'],['Print credit','IT status','Transport']]))
        red=lambda s:(s[...,0]>140)&(s[...,1]<80)&(s[...,2]<80)
        cmp('banner', bbox(B,0,1500,1179,1950,red), bbox(R,0,1500,1179,1950,red))
        cmp('banner title', bbox(B,40,1580,800,1660,white), bbox(R,40,1580,800,1660,white))
        cmp('banner line2', bbox(B,40,1690,860,1770,white), bbox(R,40,1690,860,1770,white))
        cmp('banner line3', bbox(B,40,1790,480,1880,white), bbox(R,40,1790,480,1880,white))
        cmp('warn icon', bbox(B,850,1570,1160,1890,white), bbox(R,850,1570,1160,1890,white))
        cmp('pause circle', bbox(B,1030,1780,1150,1890,lambda s:(s.sum(-1)<300)), bbox(R,1030,1780,1150,1890,lambda s:(s.sum(-1)<300)))
        cmp('dots pill', bbox(B,450,1800,720,1890,lambda s:(s.sum(-1)<330)), bbox(R,450,1800,720,1890,lambda s:(s.sum(-1)<330)))
        tiles_report(B,R,tile_rows(136+PITCH*4+(120+2*15.3-PITCH)+PITCH*0+0,[['MyQMUL','Queen Mary Net','Your guide']]))
    if case=='home-bottom':
        tiles_report(B,R,tile_rows(240,[['MyQMUL','Queen Mary Net','Your guide'],['Room availabil','Report a probl','LinkedIn'],['Careers','Alumni','Module Eval'],['Exam timetable','Record my att',None]]))
        grey=lambda s:(np.abs(s-np.array([207,214,228])).sum(-1)<70)
        cmp('badge', bbox(B,1000,1450,1179,1620,grey), bbox(R,1000,1450,1179,1620,grey))
        yel=lambda s:(s[...,0]>180)&(s[...,1]>180)&(s[...,2]<120)
        cmp('yellow outline', bbox(B,0,1800,420,2250,yel), bbox(R,0,1800,420,2250,yel))
