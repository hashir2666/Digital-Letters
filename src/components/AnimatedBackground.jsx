import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const symbolsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function drawBg(W, H) {
      const g = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, W*0.8);
      g.addColorStop(0,    "#c2185b");
      g.addColorStop(0.45, "#ad1457");
      g.addColorStop(0.8,  "#880e4f");
      g.addColorStop(1,    "#6d0b3e");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      [
        { x: 0,     y: 0, c: "rgba(233,30,140,0.22)" },
        { x: W,     y: 0, c: "rgba(194,24,91,0.18)"  },
        { x: 0,     y: H, c: "rgba(216,27,96,0.2)"   },
        { x: W,     y: H, c: "rgba(173,20,87,0.16)"  },
        { x: W*0.5, y: 0, c: "rgba(240,98,146,0.15)" },
      ].forEach(({ x, y, c }) => {
        const rg = ctx.createRadialGradient(x, y, 0, x, y, W*0.5);
        rg.addColorStop(0, c); rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
      });
    }

    function drawHeart(x, y, r, alpha) {
      const bl = ctx.createRadialGradient(x, y, 0, x, y, r*3);
      bl.addColorStop(0, `rgba(255,180,210,${alpha*0.4})`);
      bl.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bl; ctx.beginPath(); ctx.arc(x,y,r*3,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.translate(x, y);
      const s = r;
      ctx.beginPath();
      ctx.moveTo(0, s*0.35);
      ctx.bezierCurveTo(-s*0.05,s*0.15,-s*0.5,-s*0.05,-s*0.5,-s*0.28);
      ctx.bezierCurveTo(-s*0.5,-s*0.62,0,-s*0.58,0,-s*0.22);
      ctx.bezierCurveTo(0,-s*0.58,s*0.5,-s*0.62,s*0.5,-s*0.28);
      ctx.bezierCurveTo(s*0.5,-s*0.05,s*0.05,s*0.15,0,s*0.35);
      ctx.closePath();
      const hg = ctx.createRadialGradient(-s*0.15,-s*0.28,0,0,0,s*0.55);
      hg.addColorStop(0, `rgba(255,230,240,${alpha})`);
      hg.addColorStop(0.4, `rgba(255,160,190,${alpha*0.95})`);
      hg.addColorStop(1,   `rgba(200,50,100,${alpha*0.75})`);
      ctx.fillStyle=hg; ctx.shadowBlur=22; ctx.shadowColor=`rgba(255,120,160,${alpha*0.7})`;
      ctx.fill(); ctx.restore();
    }

    function drawRose(x, y, r, alpha) {
      const bl = ctx.createRadialGradient(x,y,0,x,y,r*3);
      bl.addColorStop(0,`rgba(255,150,190,${alpha*0.35})`);
      bl.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=bl; ctx.beginPath(); ctx.arc(x,y,r*3,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.translate(x,y);
      for(let i=0;i<5;i++){
        const a=(i/5)*Math.PI*2; ctx.save(); ctx.rotate(a);
        ctx.beginPath(); ctx.ellipse(0,-r*0.48,r*0.28,r*0.42,0,0,Math.PI*2);
        const pg=ctx.createRadialGradient(0,-r*0.3,0,0,-r*0.48,r*0.44);
        pg.addColorStop(0,`rgba(255,225,235,${alpha})`);
        pg.addColorStop(0.5,`rgba(240,120,160,${alpha*0.9})`);
        pg.addColorStop(1,`rgba(180,40,80,${alpha*0.7})`);
        ctx.fillStyle=pg; ctx.shadowBlur=14; ctx.shadowColor=`rgba(255,130,170,${alpha*0.5})`;
        ctx.fill(); ctx.restore();
      }
      for(let i=0;i<5;i++){
        const a=(i/5)*Math.PI*2+0.32; ctx.save(); ctx.rotate(a);
        ctx.beginPath(); ctx.ellipse(0,-r*0.28,r*0.2,r*0.3,0,0,Math.PI*2);
        const pg2=ctx.createRadialGradient(0,-r*0.18,0,0,-r*0.28,r*0.3);
        pg2.addColorStop(0,`rgba(255,235,242,${alpha})`);
        pg2.addColorStop(1,`rgba(230,100,140,${alpha*0.8})`);
        ctx.fillStyle=pg2; ctx.fill(); ctx.restore();
      }
      const cg=ctx.createRadialGradient(0,0,0,0,0,r*0.2);
      cg.addColorStop(0,`rgba(255,245,250,${alpha})`);
      cg.addColorStop(1,`rgba(240,140,170,${alpha})`);
      ctx.fillStyle=cg; ctx.shadowBlur=18; ctx.shadowColor=`rgba(255,130,170,${alpha})`;
      ctx.beginPath(); ctx.arc(0,0,r*0.2,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }

    function drawEnvelope(x, y, w, alpha, flapOpen) {
      const h = w * 0.65;
      const x0 = x - w/2, y0 = y - h/2;
      const bl = ctx.createRadialGradient(x,y,0,x,y,w*1.1);
      bl.addColorStop(0,`rgba(255,200,225,${alpha*0.32})`);
      bl.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=bl; ctx.beginPath(); ctx.arc(x,y,w*1.1,0,Math.PI*2); ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x0, y0, w, h, 3);
      const bodyG = ctx.createLinearGradient(x0, y0, x0, y0+h);
      bodyG.addColorStop(0, `rgba(255,235,245,${alpha})`);
      bodyG.addColorStop(1, `rgba(255,210,232,${alpha})`);
      ctx.fillStyle=bodyG;
      ctx.shadowBlur=16; ctx.shadowColor=`rgba(255,130,170,${alpha*0.55})`;
      ctx.fill();
      ctx.strokeStyle=`rgba(255,180,210,${alpha*0.65})`; ctx.lineWidth=0.8; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x0,y0+h); ctx.lineTo(x,y0+h*0.55); ctx.lineTo(x0+w,y0+h);
      ctx.strokeStyle=`rgba(220,120,160,${alpha*0.4})`; ctx.lineWidth=0.7; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x0,y0); ctx.lineTo(x,y0+h*0.55);
      ctx.moveTo(x0+w,y0); ctx.lineTo(x,y0+h*0.55);
      ctx.strokeStyle=`rgba(220,120,160,${alpha*0.3})`; ctx.stroke();
      // flap
      ctx.save();
      ctx.translate(x, y0);
      ctx.transform(1,0,0,Math.cos(flapOpen*0.6),0,0);
      ctx.beginPath();
      ctx.moveTo(-w/2,0); ctx.lineTo(0,h*0.47); ctx.lineTo(w/2,0); ctx.closePath();
      const fG=ctx.createLinearGradient(0,0,0,h*0.47);
      fG.addColorStop(0,`rgba(255,215,238,${alpha})`);
      fG.addColorStop(1,`rgba(245,175,210,${alpha*0.85})`);
      ctx.fillStyle=fG; ctx.shadowBlur=6; ctx.shadowColor=`rgba(255,130,170,${alpha*0.4})`;
      ctx.fill();
      ctx.strokeStyle=`rgba(220,140,175,${alpha*0.5})`; ctx.lineWidth=0.7; ctx.stroke();
      ctx.restore();
      // tiny heart seal
      const hs=w*0.09, hx=x, hy=y+h*0.1;
      ctx.beginPath();
      ctx.moveTo(hx,hy+hs*0.35);
      ctx.bezierCurveTo(hx-hs*0.05,hy+hs*0.15,hx-hs*0.5,hy-hs*0.05,hx-hs*0.5,hy-hs*0.28);
      ctx.bezierCurveTo(hx-hs*0.5,hy-hs*0.62,hx,hy-hs*0.58,hx,hy-hs*0.22);
      ctx.bezierCurveTo(hx,hy-hs*0.58,hx+hs*0.5,hy-hs*0.62,hx+hs*0.5,hy-hs*0.28);
      ctx.bezierCurveTo(hx+hs*0.5,hy-hs*0.05,hx+hs*0.05,hy+hs*0.15,hx,hy+hs*0.35);
      ctx.closePath();
      ctx.fillStyle=`rgba(220,80,120,${alpha*0.9})`;
      ctx.shadowBlur=5; ctx.shadowColor=`rgba(255,100,140,${alpha*0.5})`; ctx.fill();
      ctx.restore();
    }

    function drawSparkle(x, y, r, alpha) {
      const sg=ctx.createRadialGradient(x,y,0,x,y,r*2.5);
      sg.addColorStop(0,`rgba(255,230,242,${alpha})`);
      sg.addColorStop(0.4,`rgba(255,160,200,${alpha*0.6})`);
      sg.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(x,y,r*2.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=`rgba(255,245,252,${alpha})`;
      ctx.beginPath(); ctx.arc(x,y,r*0.5,0,Math.PI*2); ctx.fill();
    }

    function makeSymbol(W, H) {
      const types = ["envelope","envelope","envelope","heart","heart","heart","rose","rose","sparkle","sparkle","sparkle","sparkle"];
      const type = types[Math.floor(Math.random()*types.length)];
      const isEnv = type==="envelope";
      const isSpark = type==="sparkle";
      return {
        type,
        x: Math.random()*W,
        y: Math.random()*H,
        // ← envelopes now 14–24px radius (was 26–46)
        r: isEnv ? 14+Math.random()*10 : isSpark ? 2+Math.random()*4 : 7+Math.random()*13,
        speed: (Math.random()-0.5)*(isEnv?0.2:0.16),
        drift: (Math.random()-0.5)*(isEnv?0.15:0.13),
        alpha: Math.random()*0.3,
        targetAlpha: isEnv ? 0.32+Math.random()*0.38 : 0.28+Math.random()*0.42,
        tw: Math.random()*Math.PI*2,
        ts: 0.01+Math.random()*0.015,
        flap: Math.random()*Math.PI*2,
        flapSpeed: 0.007+Math.random()*0.011,
      };
    }

    symbolsRef.current = Array.from({ length: 55 }, () =>
      makeSymbol(canvas.width, canvas.height)
    );

    function loop() {
      const W=canvas.width, H=canvas.height;
      ctx.clearRect(0,0,W,H);
      drawBg(W,H);
      symbolsRef.current.forEach(p => {
        p.y+=p.speed; p.x+=p.drift; p.tw+=p.ts;
        if(p.type==="envelope") p.flap+=p.flapSpeed;
        if(p.y>H+65) p.y=-65;
        if(p.y<-65)  p.y=H+65;
        if(p.x>W+65) p.x=-65;
        if(p.x<-65)  p.x=W+65;
        if(p.alpha<p.targetAlpha) p.alpha=Math.min(p.alpha+0.004,p.targetAlpha);
        const a=p.alpha*(0.82+Math.sin(p.tw)*0.18);
        if      (p.type==="heart")    drawHeart(p.x,p.y,p.r,a);
        else if (p.type==="rose")     drawRose(p.x,p.y,p.r,a);
        else if (p.type==="sparkle")  drawSparkle(p.x,p.y,p.r,a);
        else if (p.type==="envelope") drawEnvelope(p.x,p.y,p.r*2,a,Math.sin(p.flap));
      });
      rafRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
      }}
    />
  );
}
