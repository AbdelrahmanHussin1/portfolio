/**
 * Splits an element's text into word spans, wrapped for clip-path/translate reveals.
 * Lightweight replacement for GSAP's paid SplitText plugin.
 * Returns the array of inner word elements so callers can animate them.
 */
export function splitWords(el) {
  if (!el || el.dataset.split === "true") {
    return el ? Array.from(el.querySelectorAll(".split-word > span")) : [];
  }

  const text = el.textContent;
  el.textContent = "";
  el.dataset.split = "true";

  const words = text.split(/(\s+)/).filter((w) => w !== "");

  words.forEach((word) => {
    if (/^\s+$/.test(word)) {
      el.appendChild(document.createTextNode(word));
      return;
    }
    const wrapper = document.createElement("span");
    wrapper.className = "split-word";
    const inner = document.createElement("span");
    inner.textContent = word;
    inner.style.display = "inline-block";
    wrapper.appendChild(inner);
    el.appendChild(wrapper);
  });

  return Array.from(el.querySelectorAll(".split-word > span"));
}

/**
 * Splits an element's children (assumed to be block-level lines, e.g. <div> per line)
 * into overflow-hidden wrappers for line-reveal animations.
 */
export function splitLines(el) {
  if (!el) return [];
  const lines = Array.from(el.children);
  lines.forEach((line) => {
    if (line.dataset.split === "true") return;
    line.dataset.split = "true";
    line.classList.add("split-line");
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.innerHTML = line.innerHTML;
    line.innerHTML = "";
    line.appendChild(inner);
  });
  return lines.map((l) => l.firstChild);
}
