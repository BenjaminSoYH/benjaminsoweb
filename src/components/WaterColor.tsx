import React, { useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';

interface WaterColorProp extends PropsWithChildren {
  height: string | number;
}

function getOctagonPoints(x: number, y: number, radius: number): number[] {
  const points: number[] = [];
  const sides = 8;
  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides;
    const px = x + radius * Math.cos(angle);
    const py = y + radius * Math.sin(angle);
    points.push(px, py);
  }
  return points;
}

function gaussian(): number {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function deformShape(points: number[], maxDepth: number, addLen: number): number[] {
    let currentPoints = [...points];
  
    for (let depth = 0; depth < maxDepth; depth++) {
      const newPoints: number[] = [];
  
      for (let i = 0; i < currentPoints.length; i += 2) {
        const ax = currentPoints[i];
        const ay = currentPoints[i + 1];
  
        const j = (i + 2) % currentPoints.length;
        const cx = currentPoints[j];
        const cy = currentPoints[j + 1];
  
        const mx = (ax + cx) / 2;
        const my = (ay + cy) / 2;
  
        const bx = mx + gaussian() * (addLen * 0.25);
        const by = my + gaussian() * (addLen * 0.25);
  
        newPoints.push(ax, ay);
        newPoints.push(bx, by);
      }
  
      currentPoints = newPoints;
    }
  
    return currentPoints;
  }
  
  
  

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  points: number[],
  fillColor: string,
  alpha: number
) {
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  for (let i = 2; i < points.length; i += 2) {
    ctx.lineTo(points[i], points[i + 1]);
  }
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.globalAlpha = alpha;
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

const WaterColor: React.FC<WaterColorProp> = ({ height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.offsetWidth;
    const h = typeof height === 'number' ? height : canvas.offsetHeight;
    canvas.width = width;
    canvas.height = typeof height === 'number' ? height : h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate base shape
    let shape = getOctagonPoints(canvas.width / 2, canvas.height / 2, 100);

    // Main shape
    shape = deformShape(shape, 4,50);
    drawPolygon(ctx, shape, '#FF5733', 1.0);

    // Additional transparent overlays
    for (let i = 2; i < 100; i++) {
      const overlay = deformShape(shape, 2,20); // mild variation
      let opacity = 0.04*i/100+0.02;
      drawPolygon(ctx, overlay, '#FF5733', opacity);
    }
  }, [height]);

  return (
    <div style={{ width: '100vw', height: typeof height === 'number' ? `${height}px` : height }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};

export default WaterColor;
