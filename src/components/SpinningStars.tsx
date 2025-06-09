import React, { useRef, useEffect, useState, type PropsWithChildren } from 'react';
import { Row } from './Layouts';

const sliderStyle: React.CSSProperties = {
  width: '100%',
};

interface SpinningStarsProps extends PropsWithChildren {
  height: string | number; // e.g., '80vh' or 600
}

const SpinningStars: React.FC<SpinningStarsProps> = ({ height, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; z: number }[]>([]);
  const xSpeedRef = useRef(0.001);
  const ySpeedRef = useRef(0.0005);
  const radiusRef = useRef(400);

  const [xSpeed, setXSpeed] = useState(xSpeedRef.current);
  const [ySpeed, setYSpeed] = useState(ySpeedRef.current);
  const [radius, setRadius] = useState(radiusRef.current);

  useEffect(() => {
    const numStars = 400;
    starsRef.current = Array.from({ length: numStars }, () => {
      const r = Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const viewerZ = -400;
    const starSize = 0.5;
    let angleX = 0;
    let angleY = 0;

    function drawCircle(x: number, y: number, size: number, alpha: number) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const effectiveRadius = Math.abs(radiusRef.current);

      for (const star of starsRef.current) {
        const px = star.x * effectiveRadius;
        const py = star.y * effectiveRadius;
        const pz = star.z * effectiveRadius;

        const y1 = py * cosX - pz * sinX;
        const z1 = py * sinX + pz * cosX;
        const x2 = px * cosY - z1 * sinY;
        const z2 = px * sinY + z1 * cosY;

        const zAdjusted = z2 + viewerZ;
        const depth = 1 / (1 + zAdjusted / 800);
        const clampedDepth = Math.max(0.05, Math.min(3, depth));

        const screenX = centerX + x2 * clampedDepth;
        const screenY = centerY + y1 * clampedDepth;
        const alpha = clampedDepth;

        drawCircle(screenX, screenY, starSize * clampedDepth * 1.1, alpha);
      }

      angleY += ySpeedRef.current;
      angleX += xSpeedRef.current;

      requestAnimationFrame(animate);
    }

    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleXSpeedChange = (val: number) => {
    setXSpeed(val);
    xSpeedRef.current = val;
  };

  const handleYSpeedChange = (val: number) => {
    setYSpeed(val);
    ySpeedRef.current = val;
  };

  const handleRadiusChange = (val: number) => {
    setRadius(val);
    radiusRef.current = val;
  };

  return (
    <>
      <div style={{ position: 'relative', height, width: '100%' }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundColor: 'rgba(3, 0, 25)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </div>

      <Row
        style={{
          justifyContent: 'space-evenly',
          margin: '0 30vw',
          gap: '2em',
          // padding: '2em 0',
        }}
      >
        <label>
          X Rotation Speed: {xSpeed.toFixed(4)}
          <input
            type="range"
            min={-0.01}
            max={0.01}
            step={0.0001}
            value={xSpeed}
            onChange={(e) => handleXSpeedChange(parseFloat(e.target.value))}
            style={sliderStyle}
          />
        </label>
        <label>
          Y Rotation Speed: {ySpeed.toFixed(4)}
          <input
            type="range"
            min={-0.01}
            max={0.01}
            step={0.0001}
            value={ySpeed}
            onChange={(e) => handleYSpeedChange(parseFloat(e.target.value))}
            style={sliderStyle}
          />
        </label>
        <label>
          Sphere Radius: {radius}
          <input
            type="range"
            min={150}
            max={500}
            step={10}
            value={radius}
            onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
            style={sliderStyle}
          />
        </label>
      </Row>
    </>
  );
};

export default SpinningStars;
