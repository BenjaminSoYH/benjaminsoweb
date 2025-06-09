import { useRef, useEffect } from 'react';

const StarsBackground = () => {
    const canvasRef = useRef(null);
    let angle = 0;
    let starPost = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            clearStars();
            starPost = [];
            initializeStars();
        }

        function clearStars() {
            const grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
                grd.addColorStop(0, 'rgba(33, 33, 167, 1)');        // 0%
                grd.addColorStop(0.08, 'rgba(33, 33, 159, 1)');     // 8%
                grd.addColorStop(0.24, 'rgba(43, 23, 101, 1)');     // 24%
                grd.addColorStop(0.66, 'rgba(3, 3, 73, 1)');        // 66%
                grd.addColorStop(0.90, 'rgba(18, 18, 136, 1)');     // 90%
                grd.addColorStop(1, 'rgba(18, 18, 140, 1)');

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function drawDot(x, y, r, color, opacity) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
        }

        function animate() {
            clearStars();
            angle += 0.0002;

            for (let i = 0; i < starPost.length; i++) {
                const star = starPost[i];
                const blinkSpeed = star[2];
                const opacity = Math.abs(Math.sin(Date.now() * blinkSpeed));
                let newAngle = angle;
                if (i%5 ===0) {
                    newAngle *= 1.5
                }
                else if (i%2 === 0) {
                    newAngle *= 1.25
                }

                drawDot(
                    star[1] * Math.cos(star[0] + newAngle),
                    star[1] * Math.sin(star[0] + newAngle),
                    1.5,
                    'white',
                    opacity
                );
            }
            requestAnimationFrame(animate);
        }

        function skewedRandom(min, max, skew) {
            const range = max - min;
            const random = Math.random();
            const skewed = min + range * Math.pow(random, skew);
            return skewed;
        }

        function initializeStars() {
            for (let i = 0; i < window.innerWidth; i++) {
                const randomAngle = Math.random() * (2 * Math.PI);
                const randomLength = skewedRandom(window.innerWidth , window.innerWidth/ 3, 2);
                const blinkSpeed = skewedRandom(0.0005, 0.002, 2); // Random blink speed for each star
                starPost.push([randomAngle, randomLength, blinkSpeed]);
            }
        }

        initializeStars();
        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [angle]);

    return (
        <canvas
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                display: 'block',
            }}
            ref={canvasRef}
            id="stars-background"
        ></canvas>
    );
};

export default StarsBackground;
