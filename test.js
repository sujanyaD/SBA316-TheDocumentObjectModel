const wheel = document.getElementById('wheel');
        const spinBtn = document.getElementById('spin-btn');
        const resultText = document.getElementById('result');

        const prizes = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6', 'Prize 7', 'Prize 8'];

        function spinWheel() {
            // Disable button during spin
            spinBtn.disabled = true;

            // Randomly select a prize
            const randomIndex = Math.floor(Math.random() * prizes.length);
            const prize = prizes[randomIndex];

            // Calculate the degree to rotate the wheel
            const degree = 360 / prizes.length;
            const rotateDegree = 360 * 5 + degree * randomIndex;

            // Apply rotation animation
            wheel.style.transition = 'transform 5s ease-out';
            wheel.style.transform = `rotate(${rotateDegree}deg)`;

            // Show result after animation
            setTimeout(() => {
                resultText.textContent = `You won: ${prize}`;
                spinBtn.disabled = false;
            }, 5000);
        }