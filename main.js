const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.removeItem('theme');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }
});

class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);
        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 18px;
                    font-weight: bold;
                    color: white;
                    background-color: ${color};
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    transform-origin: center center;
                    animation: fall 1s ease-in-out forwards;
                }

                @keyframes fall {
                    0% {
                        transform: translateY(-200px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getColor(number) {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
        return colors[number % colors.length];
    }
}

customElements.define('lotto-ball', LottoBall);

const drawButton = document.getElementById('draw-button');
const drawnNumbersContainer = document.querySelector('.drawn-numbers');
const lottoBallsContainer = document.querySelector('.lotto-balls');

drawButton.addEventListener('click', () => {
    drawnNumbersContainer.innerHTML = '';
    lottoBallsContainer.innerHTML = '';
    const numbers = generateLottoNumbers();
    animateLottoBalls(numbers);
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
}

function animateLottoBalls(numbers) {
    numbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoBallsContainer.appendChild(lottoBall);

            const drawnBall = document.createElement('div');
            drawnBall.classList.add('drawn-ball');
            drawnBall.textContent = number;
            drawnBall.style.backgroundColor = new LottoBall().getColor(number);
            drawnNumbersContainer.appendChild(drawnBall);
        }, index * 1000);
    });
}

// Add styles for the drawn balls
const style = document.createElement('style');
style.textContent = `
    .drawn-ball {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);