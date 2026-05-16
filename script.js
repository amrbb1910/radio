const defaultText = "KLIKNIJ OD 1-5";
const display = document.querySelector(".radio-display");
const displayText = document.querySelector("#displayText");
const hotspots = document.querySelectorAll(".station-hotspot");

function fitDisplayText() {
  const availableWidth = display.clientWidth * 0.94;
  const availableHeight = display.clientHeight * 0.72;
  let size = Math.min(availableHeight, 54);

  displayText.style.fontSize = `${size}px`;

  while (displayText.scrollWidth > availableWidth && size > 8) {
    size -= 1;
    displayText.style.fontSize = `${size}px`;
  }
}

function setDisplayText(value = defaultText) {
  displayText.textContent = value;
  window.requestAnimationFrame(fitDisplayText);
}

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("pointerenter", () => setDisplayText(hotspot.dataset.label));
  hotspot.addEventListener("pointerleave", () => setDisplayText());
  hotspot.addEventListener("mouseenter", () => setDisplayText(hotspot.dataset.label));
  hotspot.addEventListener("focus", () => setDisplayText(hotspot.dataset.label));
  hotspot.addEventListener("mouseleave", () => setDisplayText());
  hotspot.addEventListener("blur", () => setDisplayText());
  hotspot.addEventListener("click", () => setDisplayText(hotspot.dataset.label));
});

window.addEventListener("resize", fitDisplayText);
window.addEventListener("load", fitDisplayText);
fitDisplayText();
