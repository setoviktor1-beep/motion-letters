function revealText(el, opts = {}) {
    const text = el.dataset.reveal || "";
    const step = opts.step ?? 0.025;
    const base = opts.base ?? 0;

    el.textContent = "";
    const frag = document.createDocumentFragment();

    [...text].forEach((ch, i) => {
        const s = document.createElement("span");
        s.className = "ch";
        s.textContent = ch === " " ? "\u00A0" : ch;
        s.style.animationDelay = `${base + i * step}s`;
        frag.appendChild(s);
    });

    el.appendChild(frag);
}

document.addEventListener("DOMContentLoaded", () => {
    let currentDelay = 0;
    const charStep = 0.025;
    const elementGap = 0.15;

    document.querySelectorAll(".reveal-text").forEach((el) => {
        const text = el.dataset.reveal || "";
        revealText(el, { base: currentDelay, step: charStep });
        currentDelay += (text.length * charStep) + elementGap;
    });
});
