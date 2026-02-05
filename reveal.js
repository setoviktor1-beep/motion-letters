function revealText(el, opts = {}) {
    const text = el.dataset.reveal || "";
    const step = opts.step ?? 0.03;
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
    document.querySelectorAll(".reveal-text").forEach((el, i) => {
        revealText(el, { base: i * 0.15, step: 0.028 });
    });
});
