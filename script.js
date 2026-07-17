const cfg = window.TRUTH_OF_LEVEL_SITE || {};

document.body.classList.add("anim-ready");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

const artifacts = [
  {
    tag: "时间碎片",
    title: "时间碎片",
    desc: "时间之力，回到过去。它让洪荒之路多了一层命运被拨动的神秘感。",
    img: "assets/textures/time_fragment.png"
  },
  {
    tag: "元素矿石",
    title: "火石 / 水石 / 雷石",
    desc: "元素矿石进入世界生成体系，探索地下时不再只是挖铁挖钻，也会遇到修炼资源。",
    img: "assets/textures/lightning_stone_ore.png"
  },
  {
    tag: "锻刀台",
    title: "锻刀台分层材质",
    desc: "火、金属、符纹、灵质与石质结构被拆成多层纹理，视觉上更像真正的修炼器物。",
    img: "assets/textures/sword_forging_table_rune.png"
  },
  {
    tag: "本命飞剑",
    title: "多层本命飞剑",
    desc: "最新飞剑模型拥有 14 层贴图资源，冰刃、金属、发光槽与剑穗细节都被拆开表现。",
    img: "assets/textures/bound_flying_sword/layer_6.png"
  }
];

const artifactStage = document.querySelector("[data-artifact-stage]");
if (artifactStage) {
  const tag = artifactStage.querySelector("[data-artifact-tag]");
  const title = artifactStage.querySelector("[data-artifact-title]");
  const desc = artifactStage.querySelector("[data-artifact-desc]");
  const img = artifactStage.querySelector("[data-artifact-img]");
  let current = 0;

  const setArtifact = (index) => {
    const item = artifacts[index % artifacts.length];
    artifactStage.classList.remove("artifact-flash");
    void artifactStage.offsetWidth;
    artifactStage.classList.add("artifact-flash");
    tag.textContent = item.tag;
    title.textContent = item.title;
    desc.textContent = item.desc;
    img.src = item.img;
    img.alt = item.title;
  };

  setArtifact(current);
  if (!reduceMotion) {
    window.setInterval(() => {
      current = (current + 1) % artifacts.length;
      setArtifact(current);
    }, 3600);
  }
}

const questButtons = [...document.querySelectorAll("[data-quest-list] button")];
if (questButtons.length) {
  questButtons.forEach((button) => {
    button.addEventListener("click", () => {
      questButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

document.querySelectorAll("[data-voice-panel]").forEach((panel) => {
  const buttons = [...panel.querySelectorAll("[data-voice-command]")];
  const output = panel.querySelector("[data-voice-output]");

  const setVoiceCommand = (button) => {
    buttons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    if (output) {
      output.textContent = button.dataset.voiceCommand || button.textContent.trim();
    }
    panel.classList.remove("voice-fired");
    void panel.offsetWidth;
    panel.classList.add("voice-fired");
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setVoiceCommand(button));
  });

  if (buttons[0]) {
    setVoiceCommand(buttons[0]);
  }
});

function createStarfield() {
  if (reduceMotion) return;
  const canvas = document.createElement("canvas");
  canvas.className = "starfield";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  const stars = [];
  let width = 0;
  let height = 0;
  let tick = 0;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars.length = 0;
    const count = Math.min(90, Math.floor(width * height / 18000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.4,
        speed: Math.random() * 0.22 + 0.04,
        hue: Math.random() > 0.72 ? "202,162,74" : "168,216,255"
      });
    }
  };

  const draw = () => {
    tick += 0.01;
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      star.y -= star.speed;
      star.x += Math.sin(tick + star.y * 0.01) * 0.08;
      if (star.y < -8) {
        star.y = height + 8;
        star.x = Math.random() * width;
      }
      const alpha = 0.28 + Math.sin(tick * 5 + star.x) * 0.16;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${star.hue}, ${alpha})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  draw();
}

createStarfield();
