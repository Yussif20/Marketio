import confetti from 'canvas-confetti';

export const firework = () => {
  const duration = 3 * 1000; // 3 seconds
  const end = Date.now() + duration;

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffcc00', '#ff66cc'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: Math.random() * 360,
      spread: 55,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2, // Move origin upward for more fireworks
      },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
