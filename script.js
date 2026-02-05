const CONFIG = {
    brand: "Studio",
    topRightText: "Next phase loading.",
    ctaText: "Contact ↗",
    word: "VECTOR",
    slides: [
        {
            letter: "V",
            label: "Phase 01",
            text: "Abstract motion systems.",
            asset: "./assets/letter-01.svg",
            link: { text: "Explore ↗", href: "#v" }
        },
        {
            letter: "E",
            label: "Phase 02",
            text: "Signal and noise.",
            asset: "./assets/letter-02.svg",
            link: { text: "Explore ↗", href: "#e" }
        },
        {
            letter: "C",
            label: "Phase 03",
            text: "Human × Machine.",
            asset: "./assets/letter-03.svg",
            link: { text: "Explore ↗", href: "#c" }
        },
        {
            letter: "T",
            label: "Phase 04",
            text: "Synthetic culture.",
            asset: "./assets/letter-04.svg",
            link: { text: "Explore ↗", href: "#t" }
        },
        {
            letter: "O",
            label: "Phase 05",
            text: "Future states.",
            asset: "./assets/letter-05.svg",
            link: { text: "Explore ↗", href: "#o" }
        },
        {
            letter: "R",
            label: "Phase 06",
            text: "Infinite possibilities.",
            asset: "./assets/letter-01.svg",
            link: { text: "Explore ↗", href: "#r" }
        }
    ]
};

let activeIndex = 0;
let debounceTimer = null;

const wordEl = document.getElementById('word');
const panelEl = document.getElementById('panel');
const pillEl = document.getElementById('pill');
const panelTextEl = document.getElementById('panelText');
const panelLinkEl = document.getElementById('panelLink');
const mainEl = document.querySelector('.main');
const modalEl = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

function init() {
    CONFIG.slides.forEach((slide, index) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = slide.letter;
        span.dataset.index = index;

        // Mouse events for desktop
        span.addEventListener('mouseenter', () => {
            setActive(index);
        });

        // Touch events for mobile - just activate, don't prevent default
        span.addEventListener('touchstart', () => {
            setActive(index);
        }, { passive: true });

        // Click/tap to navigate - works for both mouse and touch
        span.addEventListener('click', (e) => {
            // Small delay to allow animation to show
            setTimeout(() => {
                window.location.href = `./${slide.letter.toLowerCase()}.html`;
            }, 150);
        });

        wordEl.appendChild(span);
    });

    setActive(0);
}

function setActive(index) {
    if (index < 0 || index >= CONFIG.slides.length) return;

    activeIndex = index;
    const slide = CONFIG.slides[index];

    document.querySelectorAll('.letter').forEach((letter, i) => {
        letter.classList.toggle('active', i === index);
    });

    mainEl.style.backgroundImage = `url('${slide.asset}')`;

    pillEl.textContent = slide.label;
    panelTextEl.textContent = slide.text;
    panelLinkEl.textContent = slide.link.text;
    panelLinkEl.href = slide.link.href;

    panelEl.classList.add('visible');
    panelLinkEl.classList.add('visible');
}

function nextSlide() {
    setActive((activeIndex + 1) % CONFIG.slides.length);
}

function prevSlide() {
    setActive((activeIndex - 1 + CONFIG.slides.length) % CONFIG.slides.length);
}

window.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (debounceTimer) return;

    debounceTimer = setTimeout(() => {
        debounceTimer = null;
    }, 600);

    if (e.deltaY > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Escape') {
        modalEl.classList.remove('open');
    }
});

openModalBtn.addEventListener('click', () => {
    modalEl.classList.add('open');
});

closeModalBtn.addEventListener('click', () => {
    modalEl.classList.remove('open');
});

modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
        modalEl.classList.remove('open');
    }
});

init();
