const cfg = window.TRUTH_OF_LEVEL_SITE || {};

document.querySelectorAll("[data-site-name]").forEach((el) => {
  el.textContent = cfg.siteName || "洪荒之路";
});

document.querySelectorAll("[data-version]").forEach((el) => {
  el.textContent = cfg.modVersion || "1.0.1";
});

document.querySelectorAll("[data-minecraft]").forEach((el) => {
  el.textContent = cfg.minecraftVersion || "1.20.1";
});

document.querySelectorAll("[data-loader]").forEach((el) => {
  el.textContent = cfg.loader || "Forge";
});

document.querySelectorAll("[data-jar]").forEach((el) => {
  el.textContent = cfg.jarFileName || "truthoflevel-1.0.1.jar";
});

document.querySelectorAll("[data-size]").forEach((el) => {
  el.textContent = cfg.jarSize || "7.0 MB";
});

document.querySelectorAll("[data-local-path]").forEach((el) => {
  el.textContent = cfg.localJarPath || "";
});

document.querySelectorAll("[data-download-link]").forEach((el) => {
  el.setAttribute("href", cfg.packDownloadUrl || cfg.downloadUrl || "#download");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
