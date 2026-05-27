
// biến hệ thống
let dustParticles = [];
let numDust = 80;
let fontSys = 'Courier New';

let bgX = 400;
let bgY = 300;
let chap1BgX = 50; 
let chap1BgY = 50;

let currentPhase = "LOADING_SCREEN";
// biến loading scrn
let loadingTimer = 0;
let loadingProgress = 0;
let loadingDone = false;
let loadingTextAlpha = 0;
let loadingAdviceAlpha = 0;
let loadingFadeOut = false;
let loadingFadeAlpha = 0;
let polaWrapper, polaOffsetX = 0, polaOffsetY = 0;
let binaryDrips = [];

let tmaxLen, tminLen, smaxLen, sminLen;
let treeLayer, c2TreeLayer, treeGrowthY; 

let paperWrapper;
let tracePoints = [];
let recallLevel = 0, isDistorted = false, isFullyRecalled = false; 


// biến sound
let soundMuted = false;
let tapeTriedToPlay = false;
let bgSoundStarted = false;
let rainSoundStarted = false;
let errorSoundStarted = false;
let breakingSoundPlayed = false;
let lastDrawingSoundFrame = 0;
let c1SuccessPlayed = false;
let c3BuriedSuccessPlayed = false;
let drawingShakeStarted = false;

// biến chap2 chap3
let c2Nodes = [];
let c2Connections = [];
let c2ActiveNode = null, c2SisterGlitch = false, c2RejectTimer = 0;
let c2CurrentThought = "", c2ThoughtTimer = 0, c2BaseTreeDrawn = false;
let c2Portraits = {};
let c2PortraitsRequested = false;
let c2PortraitFailed = {};
let glassShards = [];
let draggedShard = null;
let hackerLines = [];
let hiddenLayer; 
let binaryPool = []; 
let vertBinPool = []; 
let floorGridOffset = 0;
let floorNumHorizonLines = 15;
let floorNumVerticalLines = 20;
let transPhase = -1, transOverlayAlpha = 0, transTextAlpha = 0, transTimer = 0;
let trans2Phase = -1, trans2Alpha = 255, trans2TextAlpha = 0, trans2Timer = 0;
let trans3Phase = -1, trans3Alpha = 255, trans3TextAlpha = 0, trans3Timer = 0;
let trans4Phase = -1;
let trans4Alpha = 255;
let trans4TextAlpha = 0;
let trans4Timer = 0;
let c3TargetX = 0;
let c3TargetY = 0;
let c3Spacing = 25;
let c3State = 0; 
let c3TargetAlpha = 0; 
let c3LensFillAlpha = 0;
let c3LensRadius = 90; 
let c3FlashAlpha = 255; 
let c3FallTimer = 0;
let c3TextAlpha = 0;
let c3StateTimer = 0;
let c3Items = [];
let c3FocusItem = null;
let c3DrawingLayer;
let letterImg, photoImg, paperImg;
let c3ItemSceneAlpha = 0;
let c3ImagesRequested = false;
let c3PhotoFailed = false;
let c3LetterFailed = false;
let c3PaperFailed = false;
let c3ActiveItem = null;
let c3FocusLerp = 0;
let c3TargetFocusLerp = 0;

// Animation xuất hiện và vỡ item trong Chapter 3
let c3ShatterPieces = [];
let c3ShatteringItem = null;
let c3IsShattering = false;
let c3ShatterDone = false;
let c3FinalThoughtAlpha = 0;
let c3FinalThought = "";
let c3ItemSceneTimer = 0;
let c3DestroyedItems = [];
let chap4Layer;
let chap4GirlLayer;
let c4ThoughtSequence = [
  { text: "Everything disappeared again.", hold: 90 },
  { text: "The photographs...", hold: 80 },
  { text: "The records...", hold: 80 },
  { text: "I've even started to forget what your voice sounded like...", hold: 120 },

  { pause: true, hold: 70 },

  { text: "Maybe this is what they wanted.", hold: 95 },
  { text: "To erase you so completely…", hold: 100 },
  { text: "that one day…", hold: 85 },
  { text: "even I would start believing you were never real.", hold: 130 },

  { text: "I tried to hold onto every little thing.", hold: 105 },
  { text: "Your letter.", hold: 75 },
  { text: "The old pictures.", hold: 75 },
  { text: "The traces hidden beneath the surface and static.", hold: 120 },

  { text: "But no matter how hard I searched…", hold: 95 },
  { text: "everything eventually slipped through my hands.", hold: 120 },

  { pause: true, hold: 120 },

  { text: "And now…", hold: 75 },
  { text: "there’s nothing left to prove you were ever here.", hold: 135 },

  { text: "No evidence.", hold: 70 },
  { text: "No family record.", hold: 70 },
  { text: "No place where your name still exists.", hold: 110 },

  { pause: true, hold: 90 },

  { text: "Only this feeling.", hold: 85 },
  { text: "This empty space beside me that never truly disappeared.", hold: 130 },

  { text: "Maybe that’s what memory really is.", hold: 105 },
  { text: "Not something you can hold…", hold: 95 },
  { text: "but something that quietly stays with you.", hold: 120 },

  { pause: true, hold: 145 },

  { text: "So even if every trace of you fades away…", hold: 120 },
  { text: "even if time buries your name beneath silence…", hold: 120 },

  { text: "the memory of you will always continue living inside my heart.", hold: 220 }
];

let c4ThoughtIndex = 0;
let c4RainDrops = [];
let c4RainSpeedFactor = 1;
let c4TypedText = "";
let c4TypedIndex = 0;
let c4TypingDone = false;
let c4CanAdvance = false;
let c4Particles = [];
let c4NumParticles = 70;
let c4ConnectionRadius = 100;
let c4HoverRadius = 150;
let c4MaxConnections = 3;
let c4NetProgress = [];
let c4MouseProgress = [];
let c4ConstellationActive = false;
let c4ConstellationAlpha = 0;
class C4RainDrop {
  constructor() {
    this.x = random(0, width);
    this.y = random(-10, height);
    this.d = 2;
    this.h = random(2, 10);
    this.col = map(this.h, 2, 10, 100, 255);

    this.vel = 0;
    this.grv = map(this.h, 2, 10, 3, 10);
    this.off = map(this.h, 2, 10, height / 2, height);
  }

  show() {
    noStroke();
    fill(this.col, 100);
    ellipse(this.x, this.y, this.d, this.h);
  }

  move() {
  this.y += this.vel * c4RainSpeedFactor;
  this.vel = this.grv;

  if (this.y > this.off) {
    this.y = -10;
    this.x = random(0, width);
  }
}
}

function drawChapter4Rain() {
  let targetSpeed = map(mouseY, 0, height, 0.35, 2.4);
  c4RainSpeedFactor = lerp(c4RainSpeedFactor, targetSpeed, 0.08);

  for (let i = 0; i < c4RainDrops.length; i++) {
    c4RainDrops[i].show();
    c4RainDrops[i].move();
  }
}

function initChapter4Constellation() {
  c4Particles = [];
  c4NetProgress = [];
  c4MouseProgress = [];

  for (let i = 0; i < c4NumParticles; i++) {
    c4Particles.push({
      x: random(width),
      y: random(height),
      vx: random(-0.2, 0.2),
      vy: random(-0.2, 0.2),
      size: random(2, 7),
      alphaBase: random(50, 255),
      isRect: random() > 0.5
    });

    c4MouseProgress[i] = 0;
    c4NetProgress[i] = [];

    for (let j = 0; j < c4NumParticles; j++) {
      c4NetProgress[i][j] = 0;
    }
  }

  c4ConstellationActive = false;
  c4ConstellationAlpha = 0;
}

function drawChapter4Constellation() {
  if (!c4ConstellationActive && c4ConstellationAlpha <= 0.01) {
    return;
  }

  let targetAlpha = c4ConstellationActive ? 1 : 0;
  c4ConstellationAlpha = lerp(c4ConstellationAlpha, targetAlpha, 0.045);

  push();

  for (let i = 0; i < c4Particles.length; i++) {
    let p = c4Particles[i];

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) {
      p.vx *= -1;
    }

    if (p.y < 0 || p.y > height) {
      p.vy *= -1;
    }
  }

  for (let i = 0; i < c4Particles.length; i++) {
    let p1 = c4Particles[i];
    let dMouse1 = dist(p1.x, p1.y, mouseX, mouseY);

    if (dMouse1 < c4HoverRadius && c4ConstellationActive) {
      c4MouseProgress[i] = min(1, c4MouseProgress[i] + 0.12);
    } else {
      c4MouseProgress[i] = max(0, c4MouseProgress[i] - 0.12);
    }

    if (c4MouseProgress[i] > 0) {
      let targetX = lerp(p1.x, mouseX, c4MouseProgress[i]);
      let targetY = lerp(p1.y, mouseY, c4MouseProgress[i]);

      let alphaM =
        map(dMouse1, 0, c4HoverRadius, 200, 0) *
        c4MouseProgress[i] *
        c4ConstellationAlpha;

      push();
      stroke(255, 255, 255, alphaM);
      strokeWeight(2);

      drawingContext.shadowColor = `rgba(255, 255, 255, ${alphaM / 255})`;
      drawingContext.shadowBlur = 12;

      line(p1.x, p1.y, targetX, targetY);
      pop();
    }

    let currentConnections = 0;

    for (let j = i + 1; j < c4Particles.length; j++) {
      let p2 = c4Particles[j];
      let d = dist(p1.x, p1.y, p2.x, p2.y);

      let dMouse2 = dist(p2.x, p2.y, mouseX, mouseY);
      let isHovered = dMouse1 < c4HoverRadius || dMouse2 < c4HoverRadius;

      if (
        isHovered &&
        d < c4ConnectionRadius &&
        currentConnections < c4MaxConnections &&
        c4ConstellationActive
      ) {
        c4NetProgress[i][j] = min(1, c4NetProgress[i][j] + 0.1);
        currentConnections++;
      } else {
        c4NetProgress[i][j] = max(0, c4NetProgress[i][j] - 0.1);
      }

      if (c4NetProgress[i][j] > 0) {
        let targetX = lerp(p1.x, p2.x, c4NetProgress[i][j]);
        let targetY = lerp(p1.y, p2.y, c4NetProgress[i][j]);

        let alphaNet =
          map(d, 0, c4ConnectionRadius, 200, 0) *
          c4NetProgress[i][j] *
          c4ConstellationAlpha;

        push();
        stroke(255, 255, 255, alphaNet);
        strokeWeight(2);

        drawingContext.shadowColor = `rgba(255, 255, 255, ${alphaNet / 255})`;
        drawingContext.shadowBlur = 12;

        line(p1.x, p1.y, targetX, targetY);
        
        pop();
      }
    }
  }

  noStroke();
  rectMode(CENTER);

  for (let i = 0; i < c4Particles.length; i++) {
    let p = c4Particles[i];

    drawingContext.shadowBlur = p.size * 2 + 5;
    drawingContext.shadowColor = `rgba(255, 255, 255, ${(p.alphaBase / 255) * c4ConstellationAlpha})`;

    fill(255, 255, 255, p.alphaBase * c4ConstellationAlpha);

    if (p.isRect) {
      rect(p.x, p.y, p.size, p.size);
    } else {
      circle(p.x, p.y, p.size);
    }
  }

  drawingContext.shadowBlur = 0;

  rectMode(CORNER);
  imageMode(CORNER);

  pop();
}




function getSound(id) {
  return document.getElementById(id);
}

function fadeVolume(audio, targetVolume, duration) {
  if (!audio) return;

  let startVolume = audio.volume;
  let startTime = millis();

  function step() {
    let t = constrain((millis() - startTime) / duration, 0, 1);
    let eased = easeInOutCubic(t);

    audio.volume = lerp(startVolume, targetVolume, eased);

    if (t < 1) {
      requestAnimationFrame(step);
    }
  }

  step();
}

function playTapeOnceOnLoad() {
  if (tapeTriedToPlay) return;

  let tape = getSound("snd-tape");
  if (!tape) return;

  tapeTriedToPlay = true;

  tape.loop = false;
  tape.volume = 0;
  tape.currentTime = 0;

  tape.play()
    .then(() => {
      if (!soundMuted) {
        fadeVolume(tape, 0.42, 1300);
      }
    })
    .catch((err) => {
      console.warn("Tape autoplay có thể bị browser chặn:", err);
    });
}

function stopSoundImmediately(id) {
  let audio = getSound(id);
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio.volume = 0;
  audio.dataset.started = "false";
}

function fadeInLoopSound(id, targetVolume, duration = 1500) {
  let audio = getSound(id);
  if (!audio) return;

  if (audio.dataset.started === "true") return;

  audio.loop = true;
  audio.volume = 0;

  audio.play()
    .then(() => {
      audio.dataset.started = "true";

      if (!soundMuted) {
        fadeVolume(audio, targetVolume, duration);
      }
    })
    .catch((err) => {
      console.warn("Audio chưa phát được:", id, err);
    });
}

function fadeOutStopSound(id, duration = 700) {
  let audio = getSound(id);
  if (!audio) return;

  let startVolume = audio.volume;
  let startTime = millis();

  function step() {
    let t = constrain((millis() - startTime) / duration, 0, 1);
    let eased = easeInOutCubic(t);

    audio.volume = lerp(startVolume, 0, eased);

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.dataset.started = "false";
    }
  }

  step();
}

function playOneShotSound(id, volume = 1) {
  if (soundMuted) return;

  let base = getSound(id);
  if (!base) return;

  let s = base.cloneNode(true);
  s.loop = false;
  s.volume = volume;

  s.play().catch((err) => {
    console.warn("Không phát được one-shot sound:", id, err);
  });
}

function startIntroBackgroundSounds() {
  if (bgSoundStarted) return;

  bgSoundStarted = true;

  fadeInLoopSound("snd-bgmusic", 0.28, 2200);

  fadeInLoopSound("snd-buzz", 0.015, 3200);
}

function playDrawingTraceSound() {
  playOneShotSound("snd-drawing", 0.5);
}

function playRandomTreeSound() {
  if (random() < 0.5) {
    playOneShotSound("snd-tree-a", 0.72);
  } else {
    playOneShotSound("snd-tree-b", 0.72);
  }
}

function playRandomCrumbleSound() {
  if (random() < 0.5) {
    playOneShotSound("snd-crumble-a", 0.78);
  } else {
    playOneShotSound("snd-crumble-b", 0.78);
  }
}

function playSpaceSound() {
  playOneShotSound("snd-space", 0.72);
}

function playTransitionSound() {
  playOneShotSound("snd-transition", 0.75);
}

function playSuccessSound() {
  playOneShotSound("snd-success", 0.8);
}

function startDrawingShakeSound() {
  if (drawingShakeStarted) return;

  drawingShakeStarted = true;
  fadeInLoopSound("snd-drawing-shake", 0.45, 500);
}

function stopDrawingShakeSound() {
  if (!drawingShakeStarted) return;

  drawingShakeStarted = false;
  fadeOutStopSound("snd-drawing-shake", 450);
}

function startErrorLoopSound() {
  if (errorSoundStarted) return;

  errorSoundStarted = true;

  fadeInLoopSound("snd-error", 0.7, 300);
  fadeInLoopSound("snd-error-2", 0.55, 300);
}

function stopErrorLoopSound() {
  errorSoundStarted = false;

  fadeOutStopSound("snd-error", 450);
  fadeOutStopSound("snd-error-2", 450);
}

function playBreakingSoundOnce() {
  if (breakingSoundPlayed) return;

  breakingSoundPlayed = true;
  playOneShotSound("snd-breaking", 0.9);
}

function startRainLoopSound() {
  if (rainSoundStarted) return;

  rainSoundStarted = true;
  fadeInLoopSound("snd-rain", 0.34, 2500);
}

function applyMuteState() {
  let ids = [
  "snd-tape",
  "snd-bgmusic",
  "snd-buzz",
  "snd-drawing",
  "snd-tree-a",
  "snd-tree-b",
  "snd-error",
  "snd-error-2",
  "snd-breaking",
  "snd-rain",
  "snd-transition",
  "snd-success",
  "snd-drawing-shake",
  "snd-crumble-a",
  "snd-crumble-b",
  "snd-space"
];

  for (let id of ids) {
    let a = getSound(id);
    if (a) a.muted = soundMuted;
  }
}

function toggleSoundMute() {
  soundMuted = !soundMuted;
  applyMuteState();

  if (soundMuted) {
    let loopIds = ["snd-tape", "snd-bgmusic", "snd-buzz", "snd-error", "snd-rain", "snd-error-2",
"snd-drawing-shake"];

    for (let id of loopIds) {
      let a = getSound(id);
      if (a) {
        a.muted = true;
      }
    }
  }
}

// main setup
function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('tv-container');
  
  hiddenLayer = createGraphics(800, 600);
polaWrapper = select('#pola-wrapper'); 
paperWrapper = select('#paper-wrapper');

playTapeOnceOnLoad();
applyMuteState();

if (polaWrapper) {
  polaWrapper.style('display', 'none');
}

chap4Layer = createDiv('');
chap4Layer.parent('tv-container');
chap4Layer.id('chap4-water-layer');
chap4Layer.style('display', 'none');

chap4GirlLayer = createDiv('');
chap4GirlLayer.parent('tv-container');
chap4GirlLayer.id('chap4-girl-layer');
chap4GirlLayer.style('display', 'none');

for (let i = 0; i < 400; i++) {
  c4RainDrops.push(new C4RainDrop());
}

  let tv = document.getElementById('tv-container');
  if (tv) {
    tv.style.backgroundImage = "url('image/home/bg.png')";
    tv.style.backgroundSize = "800px 600px";
    tv.style.backgroundPosition = "center";
    tv.style.backgroundRepeat = "no-repeat";
  }

  for (let i = 0; i < numDust; i++) {
    dustParticles.push({
      x: random(50, width - 50), y: random(50, height - 50),
      vx: random(-0.2, 0.2), vy: random(-0.2, 0.2), noiseSeed: random(1000)
    });
  }

  for (let i = 0; i < 100; i++) {
    let strH = ""; for(let j=0; j<35; j++) strH += random() > 0.5 ? "1" : "0";
    binaryPool.push(strH);
    let strV = ""; for(let j=0; j<40; j++) strV += (random() > 0.5 ? "1" : "0") + "\n";
    vertBinPool.push(strV);
  }

  for (let i = 0; i < 40; i++) {
    binaryDrips.push({ x: random(0, width), y: random(-600, height), speed: random(0.3, 1.2), len: floor(random(15, 35)) });
  }

  hackerLines = [];
  for (let i = 0; i < 20; i++) {
    let type = random(); let str = "";
    if (type < 0.3) str = "0x" + hex(floor(random(1000000)), 6) + " FATAL_ERR";
    else if (type < 0.6) str = "SYS_OVERRIDE_INIT";
    hackerLines.push({ x: random(20, width - 200), y: random(height), speed: random(0.5, 2.0), isBin: type >= 0.6, str: str });
  }

  tmaxLen = height * 0.32; tminLen = tmaxLen * 0.1;
  smaxLen = height * 0.08; sminLen = tmaxLen * 0.1;
  
  treeLayer = createGraphics(width, height);
  treeGrowthY = height; 
  treeLayer.push(); treeLayer.translate(120, height); generateBareTree(treeLayer, tmaxLen); treeLayer.pop();
  treeLayer.push(); treeLayer.translate(680, height); generateBareTree(treeLayer, tmaxLen); treeLayer.pop();

  c2TreeLayer = createGraphics(width, height);
  c2Nodes = [
    {id: 'Gramms', label: 'Gramms', x: 150, y: 150, isSister: false, hoverVal: 0, particles: []},
    {id: 'Grammy', label: 'Grammy', x: 300, y: 150, isSister: false, hoverVal: 0, particles: []},
    {id: 'Grandpa', label: 'Grandpa', x: 500, y: 150, isSister: false, hoverVal: 0, particles: []},
    {id: 'Grandma', label: 'Grandma', x: 650, y: 150, isSister: false, hoverVal: 0, particles: []},
    {id: 'Father', label: 'Father', x: 225, y: 300, isSister: false, hoverVal: 0, particles: []},
    {id: 'Mother', label: 'Mother', x: 575, y: 300, isSister: false, hoverVal: 0, particles: []},
    {id: 'Me', label: 'Me', x: 400, y: 450, isSister: false, hoverVal: 0, particles: []},
    {id: '???', label: '???', x: 680, y: 450, isSister: true, hoverVal: 0, particles: []} 
  ];

  for (let n of c2Nodes) {
    for(let i = 0; i < 8; i++) n.particles.push({ angle: random(TWO_PI), radius: random(12, 25), speed: random(0.01, 0.04), size: random(1.5, 3.5) });
  }
  loadChapter2PortraitsOnce();
}

function draw() {
  blendMode(BLEND);
  clear(); 

  if (currentPhase !== "CHAPTER_4" && currentPhase !== "TRANS_TO_CHAP4") {
  hideChapter4WaterLayer();
}

  let targetPctX = map(mouseX, 0, width, 0, 100);
  let targetPctY = map(mouseY, 0, height, 0, 100);
  chap1BgX = lerp(chap1BgX, targetPctX, 0.03); 
  chap1BgY = lerp(chap1BgY, targetPctY, 0.03);
  
  if (
    currentPhase === "RECALL_PHASE" ||
    currentPhase === "CHAPTER_2" ||
    currentPhase === "TRANS_TO_CHAP2" ||
    currentPhase === "TRANS_TO_CHAP3" ||
    (currentPhase === "CHAPTER_3" && c3State < 4)
  ) {
    let tv = document.getElementById('tv-container');
    if (tv) {
      tv.style.backgroundPosition = `${chap1BgX}% ${chap1BgY}%`;
    }
  }

  if (currentPhase === "LOADING_SCREEN") drawLoadingScreen();
else if (currentPhase === "PROLOGUE") drawPrologue();
else if (currentPhase === "ECHO_PHASE") drawEchoTransition();
  else if (currentPhase === "RECALL_PHASE") drawRecallPhase();
  else if (currentPhase === "TRANS_TO_CHAP2") drawTransitionToChap2();
  else if (currentPhase === "CHAPTER_2") drawChapter2();
  else if (currentPhase === "SHATTERED") drawShattered();
  else if (currentPhase === "TRANS_TO_CHAP3") drawTransitionToChap3();
else if (currentPhase === "CHAPTER_3") drawChapter3();
else if (currentPhase === "TRANS_TO_CHAP4") drawTransitionToChap4();
else if (currentPhase === "CHAPTER_4") drawChapter4();
  if (currentPhase !== "SHATTERED") {
  drawStaticNoise();
  drawSharedVHS();
  drawCRTTube();
}
}

function drawLoadingScreen() {
  clear();

  if (polaWrapper) {
    polaWrapper.style('display', 'none');
  }

  background(5, 6, 9);

  drawingContext.shadowBlur = 0;
  let grad = drawingContext.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    width * 0.75
  );
  grad.addColorStop(0, 'rgba(35, 38, 48, 0.95)');
  grad.addColorStop(0.45, 'rgba(10, 12, 18, 0.95)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
  drawingContext.fillStyle = grad;
  drawingContext.fillRect(0, 0, width, height);

  if (!loadingDone && !loadingFadeOut) {
    loadingTimer++;
    loadingProgress = constrain(loadingTimer / 180, 0, 1);

    if (loadingProgress >= 1) {
      loadingDone = true;
    }
  }

  if (!loadingDone) {
    loadingTextAlpha = lerp(loadingTextAlpha, 255, 0.06);
    loadingAdviceAlpha = lerp(loadingAdviceAlpha, 0, 0.08);
  } else {
    loadingTextAlpha = lerp(loadingTextAlpha, 130, 0.05);
    loadingAdviceAlpha = lerp(loadingAdviceAlpha, 255, 0.045);
  }

  if (loadingFadeOut) {
    loadingFadeAlpha = min(255, loadingFadeAlpha + 8);
  }

  push();
  textAlign(CENTER, CENTER);
  textFont(fontSys);
  rectMode(CENTER);

  let boxX = width / 2;
  let boxY = height / 2;
  let boxW = 620;
  let boxH = 180;

  drawingContext.shadowBlur = 22;
  drawingContext.shadowColor = `rgba(255,255,255,${0.18 * (loadingTextAlpha / 255)})`;

  fill(8, 10, 14, 220);
  stroke(255, 255, 255, 55);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  drawingContext.shadowBlur = 0;

let loadingTxt = "[ TAPE INSERTING ... ]";
let glitchNow = random() < 0.08;

let tapeAlpha = loadingDone ? 0 : loadingTextAlpha;

if (!loadingDone) {
  textSize(22);
  textStyle(NORMAL);

  if (glitchNow) {
    fill(255, 0, 0, tapeAlpha * 0.7);
    text(loadingTxt, boxX - random(2, 5), boxY - 42 + random(-1, 1));

    fill(0, 255, 255, tapeAlpha * 0.7);
    text(loadingTxt, boxX + random(2, 5), boxY - 42 + random(-1, 1));
  }

  drawingContext.shadowBlur = 14;
  drawingContext.shadowColor = `rgba(255,255,255,${0.5 * (tapeAlpha / 255)})`;
  fill(245, tapeAlpha);
  text(loadingTxt, boxX, boxY - 42);
  drawingContext.shadowBlur = 0;

  // Loading bar
  let barW = 390;
  let barH = 9;
  let barX = boxX;
  let barY = boxY + 6;

  noFill();
  stroke(255, 255, 255, 85);
  strokeWeight(1);
  rect(barX, barY, barW, barH, 2);

  noStroke();
  fill(255, 255, 255, 210);
  let fillW = barW * easeInOutCubic(loadingProgress);
  rectMode(CORNER);
  rect(barX - barW / 2, barY - barH / 2, fillW, barH, 2);

  rectMode(CENTER);

  // Text percent
  fill(180, tapeAlpha);
  textSize(11);
  text("[ " + nf(floor(loadingProgress * 100), 3) + "% MEMORY TAPE LOADED ]", boxX, barY + 26);
}

if (loadingDone) {
  let a = loadingAdviceAlpha;

  let centerY = boxY;

  textSize(14);
  textStyle(NORMAL);
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = `rgba(255,255,255,${0.35 * (a / 255)})`;
  fill(230, a);
  text("FOR THE BEST EXPERIENCE", boxX, centerY - 34);

  drawingContext.shadowBlur = 0;

  textSize(12);
  fill(175, a);
  text("ENTER FULLSCREEN MODE", boxX, centerY - 8);
  text("TURN SOUND ON", boxX, centerY + 14);

  let blink = map(sin(frameCount * 0.08), -1, 1, 110, 255);

  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'rgba(255,255,255,0.45)';
  fill(255, blink * (a / 255));
  textSize(13);
  text("[ PRESS SPACE TO BEGIN ]", boxX, centerY + 52);
  drawingContext.shadowBlur = 0;
}

  pop();

  drawLoadingNoise();

  if (loadingFadeOut) {
    noStroke();
    fill(0, loadingFadeAlpha);
    rectMode(CORNER);
    rect(0, 0, width, height);

    if (loadingFadeAlpha >= 255) {
      currentPhase = "PROLOGUE";

      if (polaWrapper) {
        polaWrapper.style('display', 'block');
      }

      loadingFadeOut = false;
    }
  }
}
function drawLoadingNoise() {
  push();

  noStroke();

  for (let i = 0; i < 180; i++) {
    fill(random(150, 255), random(12, 28));
    rect(random(width), random(height), random(1, 3), random(1, 3));
  }

  stroke(255, 255, 255, 18);
  strokeWeight(1);
  for (let y = 0; y < height; y += 4) {
    line(0, y, width, y);
  }

  if (random() < 0.12) {
    noStroke();
    fill(255, 255, 255, random(15, 45));
    rect(0, random(height), width, random(1, 4));
  }

  pop();
}

function drawPrologue() {
  if (polaWrapper) {
    polaOffsetX = lerp(polaOffsetX, (width / 2 - mouseX) * 0.015, 0.03);
    polaOffsetY = lerp(polaOffsetY, (height / 2 - mouseY) * 0.015, 0.03);
    polaWrapper.style('transform', `translate(calc(-50% + ${polaOffsetX}px), calc(-50% + ${polaOffsetY}px))`);
  }

  drawingContext.shadowBlur = 0; bgX = lerp(bgX, mouseX, 0.05); bgY = lerp(bgY, mouseY, 0.05);
  let grad = drawingContext.createRadialGradient(bgX, bgY, 0, bgX, bgY, width * 0.9);
  grad.addColorStop(0, 'rgba(45, 45, 55, 0.31)'); grad.addColorStop(0.4, 'rgba(25, 25, 32, 0.31)'); grad.addColorStop(1, 'rgba(25, 0, 5, 0.31)');     
  drawingContext.fillStyle = grad; drawingContext.fillRect(0, 0, width, height);

  if (treeGrowthY > 0) treeGrowthY -= 4; 
  if (treeGrowthY < height) image(treeLayer, 0, treeGrowthY, width, height - treeGrowthY, 0, treeGrowthY, width, height - treeGrowthY);

  updateAndDrawDust();
drawPrologueSpecificVHS();
}

function drawTransitionTitleBox(txt, alphaVal) {
  push();

  let boxX = width / 2;
  let boxY = height / 2;
  let boxW = 620;
  let boxH = 110;

  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(fontSys);

  let a = constrain(alphaVal, 0, 255);

  drawingContext.shadowBlur = 18 * (a / 255);
  drawingContext.shadowColor = `rgba(255,255,255,${0.25 * (a / 255)})`;

  fill(8, 10, 14, 220 * (a / 255));
  stroke(255, 255, 255, 60 * (a / 255));
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  drawingContext.shadowBlur = 0;

  noStroke();
  fill(180, 180, 190, a * 0.85);
  textSize(11);
  text("[ MEMORY SEQUENCE ]", boxX, boxY - 32);

  let glitchNow = random() < 0.08;

  textSize(24);
  textStyle(NORMAL);

  if (glitchNow && a > 100) {
    fill(255, 0, 0, a * 0.8);
    text(txt, boxX - 3, boxY + 8);

    fill(0, 255, 255, a * 0.8);
    text(txt, boxX + 3, boxY + 8);
  }

  drawingContext.shadowBlur = 16 * (a / 255);
  drawingContext.shadowColor = `rgba(255,255,255,${0.55 * (a / 255)})`;

  fill(245, 245, 245, a);
  text(txt, boxX, boxY + 8);

  drawingContext.shadowBlur = 0;
  textStyle(NORMAL);

  pop();
}

function drawEchoTransition() {

  push();
  drawRecallPhase();
  pop();

  let overlayAlpha = 0;
  let titleAlpha = 0;

  if (transPhase === 0) {
    overlayAlpha = 210;
    transTextAlpha += 4;

    if (transTextAlpha >= 255) {
      transTextAlpha = 255;
      transPhase = 1;
      transTimer = 0;
    }

    titleAlpha = transTextAlpha;
  }

  else if (transPhase === 1) {
    overlayAlpha = 210;
    titleAlpha = 255;
    transTimer++;

    if (transTimer > 120) {
      transPhase = 2;
    }
  }

  else if (transPhase === 2) {
    transTextAlpha -= 4;
    transOverlayAlpha -= 5;

    transTextAlpha = max(0, transTextAlpha);
    transOverlayAlpha = max(0, transOverlayAlpha);

    overlayAlpha = map(transOverlayAlpha, 255, 0, 210, 0);
    titleAlpha = transTextAlpha;

    if (transOverlayAlpha <= 0 && transTextAlpha <= 0) {
      transOverlayAlpha = 0;
      transTextAlpha = 0;
      transPhase = 3;
    }
  }

  else if (transPhase === 3) {
    currentPhase = "RECALL_PHASE";
    return;
  }

  noStroke();
  fill(0, 0, 0, overlayAlpha);
  rect(0, 0, width, height);

  if (titleAlpha > 0) {
    let txt = "Chapter 1: The Distorted Memory";
    drawTransitionTitleBox(txt, titleAlpha);
  }
}

function clearChapter1TraceMemory() {
  tracePoints = [];
}

// chap1
function drawRecallPhase() {
  if (isDistorted && !isFullyRecalled && frameCount % 8 < 2) { background(100, 0, 0, 40); }

  let dad = document.getElementById('img-dad'); let mom = document.getElementById('img-mom');
  let girl = document.getElementById('img-girl'); let sis = document.getElementById('img-sis');

  if (recallLevel >= 100) {
  if (!isFullyRecalled) {
    isFullyRecalled = true;

    clearChapter1TraceMemory();
  }

  if (dad) dad.style.opacity = 1; 
  if (mom) mom.style.opacity = 1; 
  if (girl) girl.style.opacity = 1;

  if (sis) { 
    sis.style.transition = 'opacity 2s ease'; 
    sis.style.opacity = 1; 
    sis.style.filter = 'none'; 
    sis.style.transform = 'none'; 
  }
} else if (isDistorted) {
    if (sis) {
      sis.style.transition = 'none'; 
      if (frameCount % 6 < 3) {
        sis.style.opacity = 0.9; sis.style.filter = `drop-shadow(${random(-5, 5)}px 0 red)`; sis.style.transform = `translate(${random(-3, 3)}px, ${random(-3, 3)}px) scale(1.05)`;
      } else {
        sis.style.opacity = 0.5; sis.style.filter = 'none'; sis.style.transform = 'none';
      }
    }
  } else {
    if (sis) sis.style.opacity = 0;
  }

  if (currentPhase === "RECALL_PHASE" && mouseIsPressed && !isFullyRecalled) {
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
      if (mouseX >= 100 && mouseX <= 700 && mouseY >= 75 && mouseY <= 525) {
        tracePoints.push({x: mouseX, y: mouseY});

let validPts = tracePoints.filter(p => p !== null).length;
        recallLevel = min(validPts / 15, 100); 
        if (recallLevel >= 80 && recallLevel < 100) {
  startDrawingShakeSound();
}

if (recallLevel >= 100 && !c1SuccessPlayed) {
  c1SuccessPlayed = true;
  stopDrawingShakeSound();
  playSuccessSound();
}
      } else {
        if (tracePoints.length > 0 && tracePoints[tracePoints.length - 1] !== null) {
          tracePoints.push(null);
        }
      }
    }
  }

  if (!isFullyRecalled) {
    drawingContext.save(); drawingContext.beginPath(); drawingContext.rect(100, 75, 600, 450); drawingContext.clip();
    stroke(50, 50, 50, 240); strokeWeight(2.5); noFill(); 
    beginShape();
    for (let p of tracePoints) {
      if (p === null) { endShape(); beginShape(); } 
      else { vertex(p.x + random(-0.5, 0.5), p.y + random(-0.5, 0.5)); }
    }
    endShape(); drawingContext.restore(); 
  }

  if (recallLevel >= 80 && recallLevel < 100) {
  isDistorted = true;
  startDrawingShakeSound();
}

if (recallLevel >= 100) {
  stopDrawingShakeSound();

  if (!c1SuccessPlayed) {
    c1SuccessPlayed = true;
    playSuccessSound();
  }
}
  
  drawNarrativeText(); drawRecallUI();
}

function drawNarrativeText() {
  textAlign(CENTER, CENTER); noStroke();
  let textY = 110; let pulseOp = map(sin(frameCount * 0.03), -1, 1, 100, 255); let smokyBlur = 35 + sin(frameCount * 0.05) * 15;

  let drawThought = (txt) => {
    textSize(16); textStyle(ITALIC);
    drawingContext.shadowBlur = smokyBlur + 15; drawingContext.shadowColor = 'rgba(0, 0, 5, 0.9)'; fill(10, 10, 15, pulseOp - 40); text(txt, width/2, textY);
    drawingContext.shadowBlur = smokyBlur; drawingContext.shadowColor = 'rgba(255, 255, 255, 0.6)'; fill(255, 255, 255, pulseOp - 100); text(txt, width/2, textY);
    drawingContext.shadowBlur = 4; drawingContext.shadowColor = 'rgba(0, 0, 0, 0.8)'; fill(255, 255, 255, pulseOp); text(txt, width/2, textY);
  };

  let drawWhisper = (txt, yOffset) => {
    textSize(18); textStyle(BOLD);
    let posX = width/2 + map(noise(frameCount * 0.02, 100), 0, 1, -1.5, 1.5); let posY = textY + yOffset + map(noise(frameCount * 0.02, 200), 0, 1, -1.5, 1.5);
    drawingContext.shadowBlur = 12; drawingContext.shadowColor = 'rgba(0, 0, 0, 1)'; fill(0); for(let i = 0; i < 5; i++) { text(txt, posX, posY); }
    drawingContext.shadowBlur = 0; fill(0, 255, 255, 180); text(txt, posX - 1.5, posY); fill(255, 0, 0, 180); text(txt, posX + 1.5, posY);
    drawingContext.shadowBlur = 15; drawingContext.shadowColor = 'rgba(255, 0, 0, 0.9)'; fill(255, 220, 220, 255); text(txt, posX, posY);
  };

  if (recallLevel === 0) {
    push(); textFont(fontSys); let instY = height - 75;
    if (frameCount % 60 < 40) {
      textSize(14); drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'rgba(255, 255, 255, 0.8)'; fill(255); 
      text("[ TRACE THE DRAWING TO RECALL MEMORY ]", width/2, instY); drawingContext.shadowBlur = 0;
    }
    pop();
  }
  else if (recallLevel > 0 && recallLevel < 20) drawThought('"It was raining heavily that day..."');
  else if (recallLevel >= 20 && recallLevel < 35) drawThought('"I remember Mom smiling..."');
  else if (recallLevel >= 35 && recallLevel < 50) drawThought('"But... why does this part feel so empty?"');
  else if (recallLevel >= 50 && recallLevel < 65) drawThought('"Someone used to stand here."');
  else if (recallLevel >= 65 && recallLevel < 80) drawThought('"Someone used to braid my hair..."');
  else if (recallLevel >= 80 && recallLevel < 100) {
    let cycle = frameCount % 300; 
    if (cycle < 140) {
      drawWhisper('"DO NOT LET HER KNOW ABOUT THAT INCIDENT"', 0);
    } else if (cycle > 150 && cycle < 290) {
      drawWhisper('"NO ONE IS EVER ALLOWED TO MENTION INEZ IN THIS HOUSE!"', 30);
    }
  } 
  else if (recallLevel >= 100) {
    textSize(16); textStyle(ITALIC);
    drawingContext.shadowBlur = 0; fill(0, 0, 0, pulseOp); text('"But I still remember her..."', width/2 + 1, textY + 1);
    drawingContext.shadowBlur = 15; drawingContext.shadowColor = 'rgba(0, 0, 0, 1)'; fill(0, 0, 0, pulseOp); text('"But I still remember her..."', width/2, textY);
    drawingContext.shadowBlur = 20; drawingContext.shadowColor = 'rgba(255, 0, 0, 0.8)'; fill(255, 210, 210, pulseOp); text('"But I still remember her..."', width/2, textY);
  
    if (frameCount % 60 < 40) {
      push(); textFont(fontSys); textSize(14); textStyle(NORMAL); drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'white'; fill(255);
      text("[ PRESS SPACE TO CONTINUE ]", width/2, height - 80); pop();
    }
  }
  textStyle(NORMAL); drawingContext.shadowBlur = 0; 
}

function drawRecallUI() {
  textAlign(LEFT, BOTTOM); textFont(fontSys); textSize(11); noStroke(); fill(150, 200);
  text(`MNEMONIC_RECOVERY: ${floor(recallLevel)}%`, 55, height - 70);
  let statusText = isFullyRecalled ? "MEMORY_RESTORED" : (isDistorted ? "CORRUPTED_ENTITY_FOUND" : "STABLE");
  text(`STATUS: ${statusText}`, 55, height - 55);

  let barWidth = 250, barHeight = 8, barX = 55, barY = height - 45;
  stroke(100, 150); strokeWeight(1); noFill(); rect(barX, barY, barWidth, barHeight);
  
  noStroke();
  if (isFullyRecalled) fill(150, 0, 0, 255); else if (isDistorted) fill(200, 0, 0, 200); else fill(200, 200); 
  let fillWidth = map(recallLevel, 0, 100, 0, barWidth); rect(barX, barY, fillWidth, barHeight);
}

// transition c1-c2

function drawTransitionToChap2() {

  push();
  drawChapter2();
  pop();

  let overlayAlpha = 0;
  let titleAlpha = 0;

  if (trans2Phase === 0) {
    overlayAlpha = 210;
    trans2TextAlpha += 4;

    if (trans2TextAlpha >= 255) {
      trans2TextAlpha = 255;
      trans2Phase = 1;
      trans2Timer = 0;
    }

    titleAlpha = trans2TextAlpha;
  }

  else if (trans2Phase === 1) {
    overlayAlpha = 210;
    titleAlpha = 255;
    trans2Timer++;

    if (trans2Timer > 120) {
      trans2Phase = 2;
    }
  }

  else if (trans2Phase === 2) {
    trans2TextAlpha -= 4;
    trans2Alpha -= 5;

    trans2TextAlpha = max(0, trans2TextAlpha);
    trans2Alpha = max(0, trans2Alpha);

    overlayAlpha = map(trans2Alpha, 255, 0, 210, 0);
    titleAlpha = trans2TextAlpha;

    if (trans2Alpha <= 0 && trans2TextAlpha <= 0) {
      trans2Alpha = 0;
      trans2TextAlpha = 0;
      trans2Phase = 3;
    }
  }

  else if (trans2Phase === 3) {
    currentPhase = "CHAPTER_2";
    return;
  }

  noStroke();
  fill(0, 0, 0, overlayAlpha);
  rect(0, 0, width, height);

  if (titleAlpha > 0) {
    let txt = "Chapter 2: The Missing Branch";
    drawTransitionTitleBox(txt, titleAlpha);
  }
}

// Chap 2
function loadChapter2PortraitsOnce() {
  if (c2PortraitsRequested) return;
  c2PortraitsRequested = true;

  let portraitPaths = {
    Father: 'image/chap2/father.png',
    Mother: 'image/chap2/mother.png',
    Me: 'image/chap2/me.png',
    Grandpa: 'image/chap2/grandpa.png',
    Grandma: 'image/chap2/grandma.png',
    Gramms: 'image/chap2/gramms.png',
    Grammy: 'image/chap2/grammy.png'
  };

  for (let id in portraitPaths) {
    c2PortraitFailed[id] = false;

    c2Portraits[id] = loadImage(
      portraitPaths[id],
      function(img) {
        c2Portraits[id] = img;
        console.log(id + ' portrait loaded');
      },
      function(err) {
        c2PortraitFailed[id] = true;
        console.warn('Không load được portrait:', portraitPaths[id], err);
      }
    );
  }
}

function drawC2NodePopup(n) {
  if (!n || n.isSister) return;

  if (n.popupLerp === undefined) n.popupLerp = 0;

  let t = easeOutCubic(n.popupLerp);
  if (t <= 0.01) return;

  let portrait = c2Portraits[n.id];
  let imgReady = portrait && portrait.width > 1 && portrait.height > 1;

  let boxW = 132;
  let boxH = 160;

  let boxX = n.x;
  let boxY = n.y - 110;

  boxX = constrain(boxX, boxW / 2 + 18, width - boxW / 2 - 18);
  boxY = constrain(boxY, boxH / 2 + 18, height - boxH / 2 - 18);

  push();

  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(fontSys);

  translate(boxX, boxY);
  scale(lerp(0.86, 1.0, t));

  drawingContext.globalAlpha = t;

  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(90, 65, 35, 0.35)';
  stroke(130, 95, 55, 120 * t);
  strokeWeight(1);
  line(n.x - boxX, n.y - 14 - boxY, 0, boxH / 2);


  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = 'rgba(40, 25, 10, 0.45)';

  fill(222, 203, 165, 238);
  stroke(116, 85, 48, 150);
  strokeWeight(1.4);
  rect(0, 0, boxW, boxH, 8);

  drawingContext.shadowBlur = 0;
  noFill();
  stroke(255, 245, 210, 70);
  strokeWeight(1);
  rect(0, 0, boxW - 8, boxH - 8, 6);

  noStroke();
  for (let i = 0; i < 10; i++) {
    fill(90, 60, 35, 10);
    circle(random(-boxW / 2 + 8, boxW / 2 - 8), random(-boxH / 2 + 8, boxH / 2 - 8), random(1, 3));
  }

  let imgFrameW = 94;
  let imgFrameH = 104;
  let imgFrameY = -22;

  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(60, 35, 15, 0.35)';

  fill(236, 222, 190, 255);
  stroke(100, 70, 38, 130);
  strokeWeight(1.2);
  rect(0, imgFrameY, imgFrameW, imgFrameH, 4);

  let imgBoxW = imgFrameW - 4;
  let imgBoxH = imgFrameH - 4;

  noStroke();

  if (imgReady) {
    let imgRatio = portrait.width / portrait.height;
    let boxRatio = imgBoxW / imgBoxH;

    let drawW, drawH;

    if (imgRatio > boxRatio) {
      drawW = imgBoxW;
      drawH = drawW / imgRatio;
    } else {
      drawH = imgBoxH;
      drawW = drawH * imgRatio;
    }

    image(portrait, 0, imgFrameY, drawW, drawH);
  } else {
    fill(90, 65, 40, 180);
    textSize(9);

    if (c2PortraitFailed[n.id]) {
      text('[ IMAGE\nNOT FOUND ]', 0, imgFrameY);
    } else {
      text('[ LOADING ]', 0, imgFrameY);
    }
  }

  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(255, 245, 210, 0.55)';
  fill(55, 36, 22, 255);
  textSize(13);
  textStyle(BOLD);
  text(n.label, 0, 48);

  drawingContext.shadowBlur = 0;
  fill(95, 67, 42, 210);
  textSize(9);
  textStyle(NORMAL);
  text('[ FAMILY NODE ]', 0, 65);

  drawingContext.globalAlpha = 1;
  pop();
}

function drawChapter2() {
  push();
  if (c2RejectTimer > 0) {
    let shake = map(c2RejectTimer, 100, 0, 15, 0); translate(random(-shake, shake), random(-shake, shake));
  }

  growGuidedBranches(); image(c2TreeLayer, 0, 0); updateAndDrawDust();    

  if (c2RejectTimer > 0) {
    c2RejectTimer--;
    if (frameCount % 6 < 3) {
      drawingContext.fillStyle = 'rgba(200, 0, 0, 0.4)'; drawingContext.fillRect(0, 0, width, height);
    }
    if (c2RejectTimer === 1) {
  playBreakingSoundOnce();

  currentPhase = "SHATTERED"; 
  initGlassShards();

  let tv = document.getElementById('tv-container');
  if(tv) { 
    tv.style.backgroundImage = 'none'; 
    tv.style.backgroundColor = '#020202'; 
  }
}
  }

  c2SisterGlitch = false;
  if (c2ActiveNode) {
    let sisNode = c2Nodes[7]; let dToSis = dist(mouseX, mouseY, sisNode.x, sisNode.y);
    if (dToSis < 80) {
      c2SisterGlitch = true; stroke(255, 0, 0, 255); strokeWeight(3); drawingContext.shadowColor = 'red'; drawingContext.shadowBlur = 20;
      line(c2ActiveNode.x, c2ActiveNode.y, mouseX + random(-10, 10), mouseY + random(-10, 10));
    } else {
      stroke(255, 80, 80, 200); strokeWeight(3); drawingContext.shadowColor = 'rgba(255, 50, 50, 0.8)'; drawingContext.shadowBlur = 15;
      line(c2ActiveNode.x, c2ActiveNode.y, mouseX, mouseY);
    }
  }

  let c2HoveredNode = null;

  for (let n of c2Nodes) {
  noStroke(); 

  let isHover = dist(mouseX, mouseY, n.x, n.y) < 25;

  if (n.popupLerp === undefined) {
    n.popupLerp = 0;
  }

  if (isHover && !n.isSister) {
    c2HoveredNode = n;
  }

  n.hoverVal += ((isHover ? 1 : 0) - n.hoverVal) * 0.15;

  let popupTarget = (isHover && !n.isSister) ? 1 : 0;
  n.popupLerp += (popupTarget - n.popupLerp) * 0.18;

  let hoverScale = 1 + n.hoverVal * 0.4;
  let pulse = sin(frameCount * 0.05 + n.x) * 3;

    if (n.isSister) {
      if (c2SisterGlitch || c2RejectTimer > 0) {
        drawingContext.shadowBlur = 25; drawingContext.shadowColor = 'red'; fill(255, 50, 50, 255);
        circle(n.x + random(-4, 4), n.y + random(-4, 4), 18);
        fill(255, 0, 0, 150); circle(n.x + random(-15, 15), n.y + random(-15, 15), random(2, 6));
      } else {
        drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'rgba(150, 0, 0, 0.4)'; fill(100, 30, 30, 150); circle(n.x, n.y, 10);
      }
    } else {
      let baseAura = color(200, 220, 255, 20 + n.hoverVal*20); let coreColor = lerpColor(color(200, 220, 240), color(255, 255, 255), n.hoverVal);
      drawingContext.shadowBlur = 20 * hoverScale; drawingContext.shadowColor = 'rgba(200, 220, 255, 0.8)';
      fill(baseAura); circle(n.x, n.y, (30 + pulse) * hoverScale); circle(n.x, n.y, (18 + pulse) * hoverScale);
      fill(coreColor); circle(n.x, n.y, 8 * hoverScale);

      drawingContext.shadowBlur = 5;
      for (let p of n.particles) {
        p.angle += p.speed * (1 + n.hoverVal * 2); let pr = p.radius + (n.hoverVal * 8);
        let px = n.x + cos(p.angle) * pr; let py = n.y + sin(p.angle) * pr;
        let pAlpha = map(sin(frameCount*0.05 + p.angle), -1, 1, 30, 255);
        fill(255, 255, 255, pAlpha); circle(px, py, p.size);
      }
    }

    drawingContext.shadowBlur = 0; textAlign(CENTER, TOP); textFont(fontSys); textSize(13);
    
    if (n.isSister) {
      if (c2SisterGlitch || c2RejectTimer > 0) { fill(255, 0, 0); text(n.label, n.x + random(-2, 2), n.y + 15 + random(-2, 2)); }
    } else {
      fill(0, 150 + n.hoverVal*50); rect(n.x - 35, n.y + 16 + (n.hoverVal*4), 70, 16, 3);
      fill(220 + n.hoverVal*35); text(n.label, n.x, n.y + 17 + (n.hoverVal*4));
    }
  }

  for (let n of c2Nodes) {
  if (!n.isSister && n.popupLerp !== undefined && n.popupLerp > 0.01) {
    drawC2NodePopup(n);
  }
}

  textAlign(CENTER, CENTER); textSize(16);
  
  if (c2RejectTimer > 0) {
  } else if (c2SisterGlitch) {
    textStyle(ITALIC); drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'red'; fill(255, 150, 150);
    text('"They cut me from the branches..."', width/2, height - 50);
  } else if (c2ThoughtTimer > 0) {
    c2ThoughtTimer--; textStyle(ITALIC); drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'rgba(255,255,255,0.8)';
    let fade = map(c2ThoughtTimer, 0, 20, 0, 255, true); fill(255, 255, 255, fade);
    text(c2CurrentThought, width/2, height - 50);
  } else {
    textStyle(ITALIC); drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'rgba(255,255,255,0.3)'; fill(150);
    if (c2Connections.length < 6) { text('"Connect the bloodlines..."', width/2, height - 50); } else { text('"But... isn\'t there a branch missing?"', width/2, height - 50); }
  }
  textStyle(NORMAL); drawingContext.shadowBlur = 0; pop(); 
}

// shattered glass
function initGlassShards() {
  glassShards = [];
  for(let i = 0; i < 30; i++) {
    let pts = []; let rBase = random(40, 110); let numPts = floor(random(3, 6));
    for(let j = 0; j < numPts; j++) {
      let a = map(j, 0, numPts, 0, TWO_PI) + random(-0.3, 0.3); let r = rBase + random(-20, 20); pts.push(createVector(cos(a)*r, sin(a)*r));
    }
    glassShards.push({
      x: random(width), y: random(height * 0.8), vx: random(-10, 10), vy: random(-12, 4), angle: random(TWO_PI), vAngle: random(-0.15, 0.15),
      pts: pts, c1: color(255, 255, 255, random(15, 35)), c2: color(200, 240, 255, random(40, 100))
    });
  }
}

function drawHiddenLayer() {
  hiddenLayer.clear(); 
  updateAndDrawCyberFloor(hiddenLayer);

  hiddenLayer.textFont(fontSys); 
  hiddenLayer.textAlign(LEFT, TOP); 
  hiddenLayer.textSize(14); 
  hiddenLayer.fill(0, 255, 0, 130); 
  hiddenLayer.drawingContext.shadowBlur = 6; 
  hiddenLayer.drawingContext.shadowColor = 'rgba(0, 255, 0, 0.5)';
  
  for (let i = 0; i < hackerLines.length; i++) {
    let hl = hackerLines[i]; 
    let yPos = (hl.y + frameCount * hl.speed) % height; 
    let txt = hl.str;

    if (hl.isBin) { 
      txt = binaryPool[(frameCount + i) % 100]; 
    }

    hiddenLayer.text(txt, hl.x, yPos);
  }

  drawShatteredThoughtBoxInHiddenLayer();
drawSharedVHS_Buffer(hiddenLayer);
}


function updateAndDrawCyberFloor(pg) {
  floorGridOffset = (floorGridOffset + 1.2) % floorNumHorizonLines; pg.push(); pg.noFill(); pg.strokeWeight(1.5); 
  let cNeon = color(0, 255, 0, 180); pg.stroke(cNeon); pg.drawingContext.shadowBlur = 15; pg.drawingContext.shadowColor = cNeon;

  let vpX = width / 2; let vpY = height * 0.45; let startY = height; 
  for (let i = 0; i <= floorNumVerticalLines; i++) { let baseX = map(i, 0, floorNumVerticalLines, -width * 0.5, width * 1.5); pg.line(baseX, startY, vpX, vpY); }

  let floorDepth = height - vpY; 
  for (let i = 0; i < floorNumHorizonLines; i++) {
    let rawT = (i + floorGridOffset / floorNumHorizonLines) / floorNumHorizonLines; let t = rawT % 1.0; let perspectiveT = pow(t, 2.0); let hY = vpY + floorDepth * perspectiveT;
    let alphaFade = map(perspectiveT, 0, 1, 30, 200); pg.stroke(0, 255, 0, alphaFade); pg.line(-width * 0.5, hY, width * 1.5, hY);
  }
  pg.drawingContext.shadowBlur = 0; pg.pop();
}

function drawShatteredThoughtBoxInHiddenLayer() {
  let pg = hiddenLayer;

  pg.push();

  pg.textFont(fontSys);
  pg.rectMode(CENTER);
  pg.textAlign(CENTER, CENTER);

  let boxX = width / 2;
  let boxY = height / 2 + 5;
  let boxW = 620;
  let boxH = 150;

  // thought behind shattered glass
  pg.drawingContext.shadowBlur = 18;
  pg.drawingContext.shadowColor = 'rgba(255, 255, 255, 0.15)';
  pg.fill(8, 10, 14, 235);
  pg.stroke(255, 255, 255, 65);
  pg.strokeWeight(1.2);
  pg.rect(boxX, boxY, boxW, boxH, 8);

  pg.drawingContext.shadowBlur = 0;
  pg.noStroke();

  pg.fill(180, 180, 190, 220);
  pg.textSize(11);
  pg.textStyle(NORMAL);
  pg.text("[ INTERNAL THOUGHT ]", boxX, boxY - 52);

  let line1 = "Why were they so determined to erase her from this family?";
  let line2 = "What could she possibly have done to deserve such cruelty?";

  let glitchLine1 = getGlitchText(line1);
  let glitchLine2 = getGlitchText(line2);

  pg.textSize(16);
  pg.textStyle(ITALIC);

  let lineGap = 25;
  let thoughtY = boxY - 8;

  if (frameCount % 6 < 3) {
    pg.drawingContext.shadowBlur = 0;

    pg.fill(255, 60, 60, 90);
    pg.text(glitchLine1, boxX - 1.5, thoughtY - lineGap / 2);
    pg.text(glitchLine2, boxX - 1.5, thoughtY + lineGap / 2);

    pg.fill(0, 255, 255, 90);
    pg.text(glitchLine1, boxX + 1.5, thoughtY - lineGap / 2);
    pg.text(glitchLine2, boxX + 1.5, thoughtY + lineGap / 2);
  }

  pg.drawingContext.shadowBlur = 10;
  pg.drawingContext.shadowColor = 'rgba(255, 255, 255, 0.35)';
  pg.fill(235);
  pg.text(line1, boxX, thoughtY - lineGap / 2);
  pg.text(line2, boxX, thoughtY + lineGap / 2);

  pg.drawingContext.shadowBlur = 0;
  pg.textStyle(NORMAL);

  let blink = map(sin(frameCount * 0.08), -1, 1, 120, 255);

  pg.textSize(13);
  pg.drawingContext.shadowBlur = 8;
  pg.drawingContext.shadowColor = 'rgba(255, 255, 255, 0.45)';
  pg.fill(255, blink);
  pg.text("[ PRESS SPACE TO CONTINUE ]", boxX, boxY + 53);

  pg.drawingContext.shadowBlur = 0;

  pg.pop();
}

function getGlitchText(baseText) {
  let glitchChars = ['#', '?', '0', '1', 'X', '/', '\\', '*', '_', '%'];
  let arr = baseText.split('');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ' ' && arr[i] !== '\n' && random() < 0.035) {
      arr[i] = random(glitchChars);
    }
  }

  return arr.join('');
}



function drawSharedVHS_Buffer(pg) {
  pg.textFont(fontSys); pg.drawingContext.shadowBlur = 0;
  
  let glitchPLAY = (frameCount % 75 < 5) && (random(1) > 0.3); let glitchSYS = (frameCount % 110 < 5) && (random(1) > 0.5); let glitchTIME = (frameCount % 90 < 5) && (random(1) > 0.4); let uiPad = 55; 

  pg.textAlign(LEFT, TOP); pg.textSize(28); let playTxt = "PLAY ►"; let playY = 50; 
  if (frameCount % 60 < 40 || glitchPLAY) {
    if (glitchPLAY) {
      pg.fill(255, 0, 0); pg.text(playTxt, uiPad - random(2,4), playY + random(-2,2));
      pg.fill(0, 255, 0); pg.text(playTxt, uiPad + random(2,4), playY + random(-2,2)); pg.fill(255); pg.text(playTxt, uiPad, playY);
    } else {
      pg.drawingContext.shadowBlur = 10; pg.drawingContext.shadowColor = 'rgba(255, 255, 255, 0.6)'; pg.fill(240); pg.text(playTxt, uiPad, playY); pg.drawingContext.shadowBlur = 0;
    }
  }

  pg.textAlign(RIGHT, TOP); let sysTxt = "SYS_TRACE // SP_MODE"; let sysX = width - 60; let sysY = 50; pg.textSize(16);
  if (glitchSYS) { 
    pg.fill(255, 0, 0); pg.text(sysTxt, sysX - 2, sysY); pg.fill(0, 255, 0); pg.text(sysTxt, sysX + 2, sysY); pg.fill(255); pg.text(sysTxt, sysX, sysY); 
  } else { pg.fill(200); pg.text(sysTxt, sysX, sysY); }
  
  pg.fill(100); pg.textSize(12); let padX = nf(round(mouseX), 3); let padY = nf(round(mouseY), 3); pg.text(`[ ${padX} : ${padY} ]`, sysX, sysY + 18); 

  let d = nf(day(), 2); let m = nf(month(), 2); let h = nf(hour(), 2); let min = nf(minute(), 2); let sec = nf(second(), 2);
  let glitchYear = "20" + nf(floor(random(0, 100)), 2); let dateStr = `${d}.${m}.${glitchYear}`; let timeStr = `${h}:${min}:${sec}`;

  pg.textAlign(RIGHT, BOTTOM); pg.textSize(16); let rightX = width - 60;
  if (glitchTIME) {
    pg.fill(255, 0, 0); pg.text(dateStr, rightX - random(2,4), height - 75 + random(-1,1)); pg.text(timeStr, rightX - random(2,4), height - 60 + random(-1,1));
    pg.fill(0, 255, 0); pg.text(dateStr, rightX + random(2,4), height - 75 + random(-1,1)); pg.text(timeStr, rightX + random(2,4), height - 60 + random(-1,1));
    pg.fill(255); pg.text(dateStr, rightX, height - 75); pg.text(timeStr, rightX, height - 60);
  } else {
    pg.fill(220); pg.text(dateStr, rightX, height - 75); pg.fill((frameCount % 60 < 30) ? 220 : 150); pg.text(timeStr, rightX, height - 60);
  }
}

function drawShattered() {
  background(5, 5, 8); drawHiddenLayer();

  for(let s of glassShards) {
    if(s !== draggedShard) {
      s.vy += 0.5; s.x += s.vx; s.y += s.vy; s.angle += s.vAngle;
      if (s.y > height - 10) { s.y = height - 10; s.vy *= -0.4; s.vx *= 0.8; s.vAngle *= 0.8; }
      if (s.x < 0 || s.x > width) { s.vx *= -0.8; }
    }
    push(); translate(s.x, s.y); rotate(s.angle);
    drawingContext.save(); drawingContext.beginPath(); drawingContext.moveTo(s.pts[0].x, s.pts[0].y);
    for(let i = 1; i < s.pts.length; i++) { drawingContext.lineTo(s.pts[i].x, s.pts[i].y); }
    drawingContext.closePath(); drawingContext.clip(); 
    noStroke(); fill(s.c1); rect(-width, -height, width*2, height*2); 
    push(); rotate(-s.angle); translate(-s.x, -s.y); image(hiddenLayer, 0, 0); pop(); drawingContext.restore(); 

    noFill(); stroke(255, 255, 255, 160); strokeWeight(1.2); beginShape(); for(let p of s.pts) { vertex(p.x, p.y); } endShape(CLOSE);
    noStroke(); fill(s.c2); beginShape(); vertex(s.pts[0].x, s.pts[0].y); vertex(s.pts[1].x, s.pts[1].y); vertex(0, 0); endShape(CLOSE);
    pop();
  }
}

// transition c2-c3
function drawTransitionToChap3() {
  push();
  drawChapter3();
  pop();

  let overlayAlpha = 0;
  let titleAlpha = 0;

  if (trans3Phase === 0) {
    overlayAlpha = 210;
    trans3TextAlpha += 4;

    if (trans3TextAlpha >= 255) {
      trans3TextAlpha = 255;
      trans3Phase = 1;
      trans3Timer = 0;
    }

    titleAlpha = trans3TextAlpha;
  }

  else if (trans3Phase === 1) {
    overlayAlpha = 210;
    titleAlpha = 255;
    trans3Timer++;

    if (trans3Timer > 120) {
      trans3Phase = 2;
    }
  }

  else if (trans3Phase === 2) {
    trans3TextAlpha -= 4;
    trans3Alpha -= 5;

    trans3TextAlpha = max(0, trans3TextAlpha);
    trans3Alpha = max(0, trans3Alpha);

    overlayAlpha = map(trans3Alpha, 255, 0, 210, 0);
    titleAlpha = trans3TextAlpha;

    if (trans3Alpha <= 0 && trans3TextAlpha <= 0) {
      trans3Alpha = 0;
      trans3TextAlpha = 0;
      trans3Phase = 3;
    }
  }

  else if (trans3Phase === 3) {
    currentPhase = "CHAPTER_3";
    return;
  }

  noStroke();
  fill(0, 0, 0, overlayAlpha);
  rect(0, 0, width, height);

  if (titleAlpha > 0) {
    let txt = "Chapter 3: Where Things Were Buried";
    drawTransitionTitleBox(txt, titleAlpha);
  }
}

function initChapter3() {
  loadChapter3ImagesOnce();
  c3State = 0;
  c3TargetAlpha = 0;
  c3LensFillAlpha = 0;
  c3LensRadius = 90;
  c3FlashAlpha = 255;
  c3FallTimer = 0;
  c3TextAlpha = 0;
  c3StateTimer = 0;

  c3Items = [];
  c3FocusItem = null;
  c3DrawingLayer = null;
  c3ItemSceneAlpha = 0;

  c3ActiveItem = null;
  c3FocusLerp = 0;
  c3TargetFocusLerp = 0;

  c3ShatterPieces = [];
c3ShatteringItem = null;
c3IsShattering = false;
c3ShatterDone = false;
c3FinalThoughtAlpha = 0;
c3FinalThought = "";
c3DestroyedItems = [];
  
  let cols = floor((width - 100) / c3Spacing);
  let rows = floor((height - 100) / c3Spacing);

  c3TargetX = 50 + floor(random(1, cols)) * c3Spacing;
  c3TargetY = 50 + floor(random(1, rows)) * c3Spacing;
}

function drawTransitionToChap4() {
  push();
  drawChapter4();
  pop();

  let overlayAlpha = 0;
  let titleAlpha = 0;

  if (trans4Phase === 0) {
    overlayAlpha = 210;
    trans4TextAlpha += 4;

    if (trans4TextAlpha >= 255) {
      trans4TextAlpha = 255;
      trans4Phase = 1;
      trans4Timer = 0;
    }

    titleAlpha = trans4TextAlpha;
  }

  else if (trans4Phase === 1) {
    overlayAlpha = 210;
    titleAlpha = 255;
    trans4Timer++;

    if (trans4Timer > 120) {
      trans4Phase = 2;
    }
  }

  else if (trans4Phase === 2) {
    trans4TextAlpha -= 4;
    trans4Alpha -= 5;

    trans4TextAlpha = max(0, trans4TextAlpha);
    trans4Alpha = max(0, trans4Alpha);

    overlayAlpha = map(trans4Alpha, 255, 0, 210, 0);
    titleAlpha = trans4TextAlpha;

    if (trans4Alpha <= 0 && trans4TextAlpha <= 0) {
      trans4Alpha = 0;
      trans4TextAlpha = 0;
      trans4Phase = 3;
    }
  }

  else if (trans4Phase === 3) {
  currentPhase = "CHAPTER_4";
  initChapter4();
  return;
}

  noStroke();
  fill(0, 0, 0, overlayAlpha);
  rect(0, 0, width, height);

  if (titleAlpha > 0) {
    let txt = "Chapter 4: The Only One Left";
    drawTransitionTitleBox(txt, titleAlpha);
  }
}

function drawChapter3() {
  background(10, 15, 20, 200); updateAndDrawDust();
  let hoverRadius = 75; let revealRadius = 60; let dMouseTarget = dist(mouseX, mouseY, c3TargetX, c3TargetY);

  if (c3State === 0) {
    if (dMouseTarget < revealRadius) {
      c3TargetAlpha = lerp(c3TargetAlpha, 255, 0.05); if (c3TargetAlpha > 200) c3State = 1; 
    } else { c3TargetAlpha = lerp(c3TargetAlpha, 0, 0.05); }
  } 
  else if (c3State === 1) {
  c3LensFillAlpha += 8; 

  if (c3LensFillAlpha >= 255) { 
    c3LensFillAlpha = 255; 
    c3LensRadius += 40; 
  }

  if (c3LensRadius > 1200) {
    if (!c3BuriedSuccessPlayed) {
      c3BuriedSuccessPlayed = true;
      playSuccessSound();
    }

    c3State = 2;
  }
}
  else if (c3State === 2) {
    c3FlashAlpha -= 4; c3FallTimer += 1.5; if (c3FallTimer > 100) { c3State = 3; }
  } 
  else if (c3State === 3) {
    c3FlashAlpha -= 4; c3FallTimer += 1.5; c3TextAlpha = min(255, c3TextAlpha + 3);

    if (c3TextAlpha >= 255) {
      c3StateTimer++;
      if (c3StateTimer >= 180) {
  c3State = 4;

  c3FocusItem = null;
  c3ActiveItem = null;
  c3FocusLerp = 0;
  c3TargetFocusLerp = 0;
  c3ItemSceneAlpha = 0;
  c3ItemSceneTimer = 0;
  initChapter3Items();

  let tv = document.getElementById('tv-container');
  if (tv) {
    tv.style.backgroundImage = "url('image/chap3/bg.png')";
    tv.style.backgroundSize = "100% 100%";
    tv.style.backgroundPosition = "50% 50%";
    tv.style.backgroundRepeat = "no-repeat";
  }

  return;
}
    }
  }

  if (c3State === 4) { drawChapter3ItemScene(); return; }

  noStroke(); drawingContext.shadowBlur = 0;
  for (let x = 50; x < width - 50; x += c3Spacing) {
    for (let y = 50; y < height - 50; y += c3Spacing) {
      let isTarget = (x === c3TargetX && y === c3TargetY);
      if (isTarget && c3State === 0) continue;

      let n = noise(x * 0.02, y * 0.02, frameCount * 0.005);
      let nx = x + map(noise(x, y, 1), 0, 1, -20, 20) * n; let ny = y + map(noise(x, y, 2), 0, 1, -20, 20) * n;
      let dMouse = dist(nx, ny, mouseX, mouseY); let nodeSize = 2 + n * 3;

      if (c3State < 2) {
        if (dMouse < hoverRadius) { let zoomFactor = map(dMouse, 0, hoverRadius, 1.25, 1); nx = mouseX + (nx - mouseX) * zoomFactor; ny = mouseY + (ny - mouseY) * zoomFactor; nodeSize *= 1.8; }
      }

      if (c3State >= 2) {
        let fallGravity = map(noise(x, y, 3), 0, 1, 0.2, 0.8); ny += fallGravity * c3FallTimer * (c3FallTimer * 0.1);
        if (ny > height + 20) continue;
      }

      let blinkWave = sin(frameCount * 0.02 + x * 0.1 + y * 0.1); let blinkAlpha = map(blinkWave, -1, 1, 30, 220);
      fill(0, 255, 100, blinkAlpha * 0.3); circle(nx, ny, nodeSize * 2.5);
      fill(0, 255, 150, blinkAlpha); circle(nx, ny, nodeSize);
      if (nodeSize > 3.5) { fill(255, 255, 255, blinkAlpha * 0.8); circle(nx, ny, nodeSize * 0.4); }
    }
  }

  if (c3State < 2) {
    push();
    if (c3State === 1) { fill(255, 255, 255, c3LensFillAlpha); noStroke(); circle(mouseX, mouseY, c3LensRadius * 2); } 
    else { blendMode(DIFFERENCE); fill(255); noStroke(); circle(mouseX, mouseY, hoverRadius * 2); blendMode(BLEND); }
    pop();
  }

  if (c3State >= 2 && c3FlashAlpha > 0) { push(); noStroke(); fill(255, 255, 255, c3FlashAlpha); rect(0, 0, width, height); pop(); }

  if (c3State === 0 && c3TargetAlpha > 1) {
    let nT = noise(c3TargetX * 0.02, c3TargetY * 0.02, frameCount * 0.005);
    let nxT = c3TargetX + map(noise(c3TargetX, c3TargetY, 1), 0, 1, -20, 20) * nT; let nyT = c3TargetY + map(noise(c3TargetX, c3TargetY, 2), 0, 1, -20, 20) * nT;
drawingContext.shadowBlur = 28;
drawingContext.shadowColor = `rgba(255, 0, 180, ${c3TargetAlpha / 255})`;

noStroke();
fill(255, 0, 180, c3TargetAlpha);
circle(nxT, nyT, 16);

fill(255, 255, 255, c3TargetAlpha);
circle(nxT, nyT, 6);

noFill();
stroke(0, 255, 255, c3TargetAlpha * 0.85);
strokeWeight(2.5);
circle(nxT, nyT, 34);

stroke(255, 0, 180, c3TargetAlpha * 0.55);
strokeWeight(1.5);
circle(nxT, nyT, 46);

drawingContext.shadowBlur = 14;
drawingContext.shadowColor = `rgba(255, 0, 180, ${c3TargetAlpha / 255})`;

noStroke();
fill(255, 235, 255, c3TargetAlpha);
textAlign(CENTER, BOTTOM);
textFont(fontSys);
textSize(16);
text("[ BURIED ITEM ]", nxT, nyT - 28);

drawingContext.shadowBlur = 0;
  }

  drawingContext.shadowBlur = 0;
  if (c3State === 0) {
    if (frameCount % 60 < 40) {
      push(); fill(255); textAlign(CENTER, TOP); textFont(fontSys); textSize(14);
      drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'rgba(255, 255, 255, 0.8)'; text("[ SEARCH FOR THE BURIED ITEMS ]", width / 2, 550); pop();
    }
    strokeWeight(2); stroke(0, 255, 100, 180); noFill(); circle(mouseX, mouseY, hoverRadius * 2);
  }

  if (c3State >= 2) {
    push();
    let endTxt = "[ BURIED ITEMS LOCATION FOUND ]"; let endX = width / 2; let endY = height / 2;
    textAlign(CENTER, CENTER); textFont(fontSys); textSize(22);
    let isGlitch = (frameCount % 12 < 3) || (random() < 0.1);
    if (isGlitch && c3TextAlpha > 100) {
      drawingContext.shadowBlur = 0;
      fill(255, 0, 0, c3TextAlpha); text(endTxt, endX - random(2, 5), endY + random(-2, 2));
      fill(0, 255, 255, c3TextAlpha); text(endTxt, endX + random(2, 5), endY + random(-2, 2));
      fill(255, c3TextAlpha); text(endTxt, endX, endY);
    } else {
      drawingContext.shadowBlur = 15; drawingContext.shadowColor = `rgba(255, 255, 255, ${c3TextAlpha / 255})`; fill(255, c3TextAlpha); text(endTxt, endX, endY);
    }
    pop();
  }
}

function showChapter4WaterLayer() {
  if (chap4Layer) {
    chap4Layer.style('display', 'block');
  }

  if (chap4GirlLayer) {
    chap4GirlLayer.style('display', 'block');
  }

  let tv = document.getElementById('tv-container');
  if (tv) {
    tv.style.backgroundImage = 'none';
    tv.style.backgroundColor = '#020202';
  }
}

function hideChapter4WaterLayer() {
  if (chap4Layer) {
    chap4Layer.style('display', 'none');
  }

  if (chap4GirlLayer) {
    chap4GirlLayer.style('display', 'none');
  }
}

function initChapter4() {
  c4ThoughtIndex = 0;
  c4TypedText = "";
  c4TypedIndex = 0;
  c4TypingDone = false;
  c4CanAdvance = false;

  initChapter4Constellation();

  startChapter4Typing();
}

function updateChapter4ThoughtSequence() {
  if (!c4ThoughtSequence || c4ThoughtSequence.length === 0) return;

  let entry = c4ThoughtSequence[c4ThoughtIndex];
  if (!entry) return;

  if (c4ThoughtState === "fadeIn") {
    c4ThoughtAlpha += 5;

    if (c4ThoughtAlpha >= 255) {
      c4ThoughtAlpha = 255;
      c4ThoughtState = "hold";
      c4ThoughtTimer = 0;
    }
  }

  else if (c4ThoughtState === "hold") {
    c4ThoughtTimer++;

    if (c4ThoughtTimer > entry.hold) {
      if (c4ThoughtIndex >= c4ThoughtSequence.length - 1) {
        c4ThoughtState = "done";
      } else {
        c4ThoughtState = "fadeOut";
      }
    }
  }

  else if (c4ThoughtState === "fadeOut") {
    c4ThoughtAlpha -= 5;

    if (c4ThoughtAlpha <= 0) {
      c4ThoughtAlpha = 0;
      c4ThoughtIndex++;
      c4ThoughtState = "fadeIn";
      c4ThoughtTimer = 0;
    }
  }

  else if (c4ThoughtState === "done") {
    c4ThoughtAlpha = 255;
  }
}

function resetExperienceToLoading() {
  hideChapter4WaterLayer();

  currentPhase = "LOADING_SCREEN";

  loadingTimer = 0;
  loadingProgress = 0;
  loadingDone = false;
  loadingTextAlpha = 0;
  loadingAdviceAlpha = 0;
  loadingFadeOut = false;
  loadingFadeAlpha = 0;

  if (polaWrapper) {
    polaWrapper.style('display', 'none');
  }

  let paper = document.getElementById('paper-wrapper');
  if (paper) {
    paper.style.display = 'none';
  }

  let tv = document.getElementById('tv-container');
  if (tv) {
    tv.style.backgroundImage = "url('image/home/bg.png')";
    tv.style.backgroundSize = "800px 600px";
    tv.style.backgroundPosition = "center";
    tv.style.backgroundRepeat = "no-repeat";
    tv.style.backgroundColor = "";
  }

  tracePoints = [];
  recallLevel = 0;
  isDistorted = false;
  isFullyRecalled = false;

  c2Connections = [];
  c2ActiveNode = null;
  c2SisterGlitch = false;
  c2RejectTimer = 0;
  c2CurrentThought = "";
  c2ThoughtTimer = 0;
  c2BaseTreeDrawn = false;
  c2TreeLayer = createGraphics(width, height);

  c3State = 0;
  c3ShatterPieces = [];
  c3ShatteringItem = null;
  c3IsShattering = false;
  c3ShatterDone = false;
  c3FinalThoughtAlpha = 0;
  c3FinalThought = "";
  c3DestroyedItems = [];
  c3ActiveItem = null;
  c3FocusLerp = 0;
  c3TargetFocusLerp = 0;

  c4ThoughtIndex = 0;
  c4TypedText = "";
  c4TypedIndex = 0;
  c4TypingDone = false;
  c4CanAdvance = false;
  c4ConstellationActive = false;
  c4ConstellationAlpha = 0;
  initChapter4Constellation();

  cursor(ARROW);
}

function drawChapter4ThoughtBox() {
  updateChapter4Typing();

  let entry = c4ThoughtSequence[c4ThoughtIndex];
  if (!entry) return;

  let boxX = width / 2;
  let boxY = 128;
  let boxW = 660;
  let boxH = 110;

  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(fontSys);

  drawingContext.shadowBlur = 18;
  drawingContext.shadowColor = 'rgba(255,255,255,0.22)';

  fill(8, 10, 14, 220);
  stroke(255, 255, 255, 60);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  drawingContext.shadowBlur = 0;

  noStroke();
  fill(180, 180, 190, 220);
  textSize(11);
  text("[ INTERNAL MONOLOGUE ]", boxX, boxY - 32);

  let glitchNow = random() < 0.05 && !entry.pause && c4TypingDone;

  textSize(18);
  textStyle(ITALIC);
  textLeading(28);

  if (glitchNow) {
    fill(255, 0, 0, 180);
    text(c4TypedText, boxX - 2, boxY + 8, boxW - 56, boxH - 24);

    fill(0, 255, 255, 180);
    text(c4TypedText, boxX + 2, boxY + 8, boxW - 56, boxH - 24);
  }

  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = 'rgba(255,255,255,0.45)';
  fill(245);
  text(c4TypedText, boxX, boxY + 8, boxW - 56, boxH - 24);

  drawingContext.shadowBlur = 0;
  textStyle(NORMAL);

if (c4TypingDone) {
  let pressAlpha = map(sin(frameCount * 0.08), -1, 1, 110, 255);
  fill(200, pressAlpha);
  textSize(11);

  if (c4ThoughtIndex < c4ThoughtSequence.length - 1) {
    text("[ SPACE TO CONTINUE ]", boxX, boxY + 40);
  } else {
    text("[ PRESS X TO RESTART ]", boxX, boxY + 40);
  }
}

  pop();
}

function drawChapter4() {
  clear();

  showChapter4WaterLayer();

  noStroke();
  fill(0, 0, 0, 45);
  rect(0, 0, width, height);

drawChapter4Rain();

drawChapter4Constellation();

drawChapter4ThoughtBox();
}

function startChapter4Typing() {
  let entry = c4ThoughtSequence[c4ThoughtIndex];
  if (!entry) return;

  c4TypedText = "";
  c4TypedIndex = 0;
  c4TypingDone = false;
  c4CanAdvance = false;
}

function updateChapter4Typing() {
  let entry = c4ThoughtSequence[c4ThoughtIndex];
  if (!entry) return;

  let fullText = entry.pause ? "..." : entry.text;

  if (!c4TypingDone) {
    if (frameCount % 2 === 0) {
      c4TypedIndex++;
      c4TypedText = fullText.substring(0, c4TypedIndex);

      if (c4TypedIndex >= fullText.length) {
        c4TypedText = fullText;
        c4TypingDone = true;
        c4CanAdvance = true;
      }
    }
  }
}

function handleChapter4Space() {
  let entry = c4ThoughtSequence[c4ThoughtIndex];
  if (!entry) return;

  let fullText = entry.pause ? "..." : entry.text;

  if (!c4TypingDone) {
    c4TypedText = fullText;
    c4TypedIndex = fullText.length;
    c4TypingDone = true;
    c4CanAdvance = true;
    return;
  }

  if (c4CanAdvance) {
  if (c4ThoughtIndex < c4ThoughtSequence.length - 1) {
    c4ThoughtIndex++;

    if (c4ThoughtIndex === c4ThoughtSequence.length - 1) {
      c4ConstellationActive = true;
    }

    startChapter4Typing();
  }
}
}

function loadChapter3ImagesOnce() {
  if (c3ImagesRequested) return;

  c3ImagesRequested = true;

  photoImg = loadImage(
    'image/chap3/photo.png',
    function(img) {
      photoImg = img;
      console.log('photo.png loaded');
    },
    function(err) {
      c3PhotoFailed = true;
      console.warn('Không load được image/chap3/photo.png', err);
    }
  );

  letterImg = loadImage(
    'image/chap3/letter.png',
    function(img) {
      letterImg = img;
      console.log('letter.png loaded');
    },
    function(err) {
      c3LetterFailed = true;
      console.warn('Không load được image/chap3/letter.png', err);
    }
  );

  paperImg = loadImage(
    'image/chap1/paper.png',
    function(img) {
      paperImg = img;
      console.log('paper.png loaded');
    },
    function(err) {
      c3PaperFailed = true;
      console.warn('Không load được image/chap1/paper.png', err);
    }
  );
}

function initChapter3Items() {
  loadChapter3ImagesOnce();

  c3DrawingLayer = createGraphics(600, 450);

  if (paperImg && paperImg.width > 1 && paperImg.height > 1) {
    c3DrawingLayer.image(paperImg, 0, 0, 600, 450);
  } else {
    c3DrawingLayer.background(245, 238, 220);

    c3DrawingLayer.noStroke();
    for (let i = 0; i < 120; i++) {
      c3DrawingLayer.fill(90, random(8, 22));
      c3DrawingLayer.circle(random(600), random(450), random(1, 3));
    }
  }

  let dad = document.getElementById('img-dad');
  let mom = document.getElementById('img-mom');
  let girl = document.getElementById('img-girl');
  let sis = document.getElementById('img-sis');

  let getCol = (el) => {
    if (!el || !el.style.gridColumn) return 99;
    return parseInt(el.style.gridColumn);
  };

  let fam = [
    { el: dad, col: getCol(dad) },
    { el: mom, col: getCol(mom) },
    { el: girl, col: getCol(girl) },
    { el: sis, col: getCol(sis) }
  ]
  .filter(item => item.el)
  .sort((a, b) => a.col - b.col);

let paperW = 600;
let paperH = 450;
let padding = 30;

let gridX = padding;
let gridY = padding;
let gridW = paperW - padding * 2;
let gridH = paperH - padding * 2;

let colW = gridW / 4;
let rowH = gridH;

for (let i = 0; i < fam.length; i++) {
  if (fam[i].el && fam[i].el.complete) {
    try {
      let el = fam[i].el;

      let naturalW = el.naturalWidth || el.width || 100;
      let naturalH = el.naturalHeight || el.height || 150;

      let imgRatio = naturalW / naturalH;
      let cellRatio = colW / rowH;

      let drawW, drawH;

      if (imgRatio > cellRatio) {
        drawW = colW;
        drawH = drawW / imgRatio;
      } else {
        drawH = rowH;
        drawW = drawH * imgRatio;
      }

      let cellX = gridX + i * colW;
      let cellY = gridY;

      let imgX = cellX + (colW - drawW) / 2;
      let imgY = cellY + (rowH - drawH) / 2;

      c3DrawingLayer.push();
      c3DrawingLayer.tint(255, 153);
      c3DrawingLayer.drawingContext.drawImage(
        el,
        imgX,
        imgY,
        drawW,
        drawH
      );
      c3DrawingLayer.pop();

    } catch (e) {
      console.warn('Không vẽ được family image vào drawing layer:', e);
    }
  }
}

  c3Items = [
{
  id: 'photo',
  label: 'PHOTO',
  img: photoImg,
  x: 215,
  y: 320,
  rot: -0.13,
  w: 135,
  h: 190,
  isDrawing: false,
  thought: '"I remember Dad telling us to lie down and smile..."',
  hoverLerp: 0,
  appearLerp: 0,
  appearDelay: 8
},
{
  id: 'letter',
  label: 'LETTER',
  img: letterImg,
  x: 585,
  y: 315,
  rot: 0.12,
  w: 155,
  h: 204,
  isDrawing: false,
  thought: '"Inez... I miss you so much. I wish I could see you again..."',
  hoverLerp: 0,
  appearLerp: 0,
  appearDelay: 18
},
{
  id: 'drawing',
  label: 'DRAWING',
  img: c3DrawingLayer,
  x: 400,
  y: 425,
  rot: -0.04,
  w: 240,
  h: 180,
  isDrawing: true,
  thought: '"I drew this before I understood what they were trying to erase."',
  hoverLerp: 0,
  appearLerp: 0,
  appearDelay: 36
}
  ];
}

function drawC3ItemLerped(item, lerpVal) {
  push();

  if (item.appearLerp === undefined) item.appearLerp = 1;
  if (item.hoverLerp === undefined) item.hoverLerp = 0;

  let appear = item.appearLerp;

  let isHover =
    dist(mouseX, mouseY, item.x, item.y) < max(item.w, item.h) * 0.48 &&
    lerpVal === 0 &&
    c3TargetFocusLerp === 0 &&
    !c3IsShattering &&
    !c3ShatterDone &&
    appear > 0.9;

  item.hoverLerp += ((isHover ? 1 : 0) - item.hoverLerp) * 0.16;

  let hoverScale = lerp(1.0, 1.08, item.hoverLerp);

  let curX = lerp(item.x, width / 2, lerpVal);
  let curY = lerp(item.y + 18 * (1 - appear), height / 2 - 65, lerpVal);

  let appearScale = lerp(0.86, 1.0, easeOutCubic(appear));
  let curScale = lerp(hoverScale * appearScale, 1.9, lerpVal);
  let curRot = lerp(item.rot, 0, lerpVal);

  translate(curX, curY);
  rotate(curRot);
  scale(curScale);

  imageMode(CENTER);
  rectMode(CENTER);

  drawingContext.globalAlpha = appear;

  drawingContext.shadowBlur = lerp(8, 26, max(item.hoverLerp, lerpVal));
  drawingContext.shadowColor = lerpVal > 0
    ? 'rgba(255,255,255,0.35)'
    : `rgba(255,255,255,${0.12 + item.hoverLerp * 0.35})`;

  let displayImg = item.img;

if (item.id === 'photo') {
  displayImg = photoImg;
}

if (item.id === 'letter') {
  displayImg = letterImg;
}

  let imgReady = displayImg && displayImg.width > 1 && displayImg.height > 1;

  if (imgReady) {
    image(displayImg, 0, 0, item.w, item.h);
  } else {
    fill(235);
    stroke(120);
    strokeWeight(1);
    rect(0, 0, item.w, item.h, 4);

    noStroke();
    fill(30);
    textAlign(CENTER, CENTER);
    textFont(fontSys);
    textSize(10);

    if (
      (item.id === 'photo' && c3PhotoFailed) ||
      (item.id === 'letter' && c3LetterFailed) ||
      (item.id === 'drawing' && c3PaperFailed)
    ) {
      text('[ IMAGE NOT FOUND ]', 0, -8);
      textSize(8);
      text(item.id + '.png', 0, 10);
    } else {
      text('[ LOADING ]', 0, 0);
    }
  }

  drawingContext.shadowBlur = 0;
  drawingContext.globalAlpha = 1;

  pop();
}

function easeInOutCubic(t) {
  t = constrain(t, 0, 1);

  if (t < 0.5) {
    return 4 * t * t * t;
  } else {
    return 1 - pow(-2 * t + 2, 3) / 2;
  }
}

function easeOutCubic(t) {
  t = constrain(t, 0, 1);
  return 1 - pow(1 - t, 3);
}

function drawC3FocusOverlayOldStyle(item, lerpVal) {
  if (lerpVal < 0.01) return;

  push();

  let boxW = 620;
  let boxH = 110;
  let boxX = width / 2;
  let boxY = height - 105;

  rectMode(CENTER);

  drawingContext.shadowBlur = 18 * lerpVal;
  drawingContext.shadowColor = `rgba(255,255,255,${0.25 * lerpVal})`;

  fill(8, 10, 14, 235 * lerpVal);
  stroke(255, 255, 255, 70 * lerpVal);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  drawingContext.shadowBlur = 0;

  textAlign(CENTER, CENTER);
  textFont(fontSys);
  noStroke();

  let txtTitle = `[ MEMORY OBJECT: ${item.label} ]`;
  let isGlitch = random() < 0.06;

  textSize(12);

  if (isGlitch) {
    fill(255, 0, 0, 220 * lerpVal);
    text(txtTitle, boxX - 2, boxY - 32);

    fill(0, 255, 255, 220 * lerpVal);
    text(txtTitle, boxX + 2, boxY - 32);
  }

  drawingContext.shadowBlur = 10 * lerpVal;
  drawingContext.shadowColor = `rgba(255,255,255,${0.8 * lerpVal})`;

  fill(255, 255 * lerpVal);
  text(txtTitle, boxX, boxY - 32);

  drawingContext.shadowBlur = 8 * lerpVal;
  drawingContext.shadowColor = `rgba(255,255,255,${0.35 * lerpVal})`;

  fill(245, 255 * lerpVal);
  textSize(15);
  textStyle(ITALIC);
  text(item.thought, boxX, boxY + 2);
  textStyle(NORMAL);

  drawingContext.shadowBlur = 0;

  let blink = map(sin(frameCount * 0.1), -1, 1, 100, 255) * lerpVal;
  fill(180, blink);
  textSize(11);
  text('[ CLICK ANYWHERE TO CLOSE ]', boxX, boxY + 36);

  pop();
}

function drawC3FinalThoughtCenter() {
  c3FinalThoughtAlpha = min(255, c3FinalThoughtAlpha + 3);

  let cx = width / 2;
  let cy = height / 2;

  push();
  textAlign(CENTER, CENTER);
  textFont(fontSys);
  rectMode(CENTER);

  noStroke();
  fill(0, 0, 0, 170);
  rect(width / 2, height / 2, width, height);

  let glitchNow = (frameCount % 12 < 3) || random() < 0.06;

  fill(8, 10, 14, 170);
  stroke(255, 255, 255, 45);
  strokeWeight(1);
  rect(cx, cy, 620, 150, 8);


  textSize(20);
  textStyle(ITALIC);
  textLeading(30);

  if (glitchNow && c3FinalThoughtAlpha > 80) {
    drawingContext.shadowBlur = 0;
    fill(255, 0, 0, c3FinalThoughtAlpha * 0.8);
    text(c3FinalThought, cx - 2, cy - 2, 520, 120);

    fill(0, 255, 255, c3FinalThoughtAlpha * 0.8);
    text(c3FinalThought, cx + 2, cy + 1, 520, 120);
  }

  drawingContext.shadowBlur = 18;
  drawingContext.shadowColor = `rgba(255,255,255,${0.55 * (c3FinalThoughtAlpha / 255)})`;
  fill(245, 245, 245, c3FinalThoughtAlpha);
  text(c3FinalThought, cx, cy, 520, 120);

  textStyle(NORMAL);

  let pressAlpha = map(sin(frameCount * 0.08), -1, 1, 90, 255) * (c3FinalThoughtAlpha / 255);

  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = `rgba(255,255,255,${0.55 * (pressAlpha / 255)})`;
  fill(255, 255, 255, pressAlpha);
  textSize(13);
  text("[ PRESS SPACE TO CONTINUE ]", cx, cy + 100);

  drawingContext.shadowBlur = 0;
  pop();
}

function startC3ItemShatter(item) {
  c3ShatteringItem = item;
  c3IsShattering = true;

  c3ShatterDone = false;
  c3FinalThoughtAlpha = 0;

  c3FinalThought =
    '"Every trace of you was erased until nothing remained. Even time could not hold any evidence that you were ever here."';

  if (!c3DestroyedItems.includes(item.id)) {
    c3DestroyedItems.push(item.id);
  }

  c3ShatterPieces = [];

  let displayImg = item.img;

  if (item.id === 'photo') {
    displayImg = photoImg;
  }

  if (item.id === 'letter') {
    displayImg = letterImg;
  }

let cols = item.id === 'drawing' ? 8 : 10;
let rows = item.id === 'drawing' ? 6 : 8;

let pieceW = item.w / cols;
let pieceH = item.h / rows;

  for (let gx = 0; gx < cols; gx++) {
    for (let gy = 0; gy < rows; gy++) {
      let localX = -item.w / 2 + gx * pieceW + pieceW / 2;
      let localY = -item.h / 2 + gy * pieceH + pieceH / 2;

      let ca = cos(item.rot);
      let sa = sin(item.rot);
      let worldX = item.x + localX * ca - localY * sa;
      let worldY = item.y + localX * sa + localY * ca;

      c3ShatterPieces.push({
        img: displayImg,
        id: item.id,

        x: worldX,
        y: worldY,
        vx: random(-2.8, 2.8),
        vy: random(-3.8, 1.5),
        ax: random(-0.015, 0.015),
        ay: random(0.025, 0.06),

        rot: item.rot,
        vr: random(-0.08, 0.08),

        w: pieceW,
        h: pieceH,

        sx: gx / cols,
        sy: gy / rows,
        sw: 1 / cols,
        sh: 1 / rows,

        life: 255,
        decay: random(2.8, 5.2)
      });
    }
  }
}

function updateAndDrawC3ShatterPieces() {
  if (!c3IsShattering) return;

  let aliveCount = 0;

  for (let p of c3ShatterPieces) {
    if (p.life <= 0) continue;

    aliveCount++;

    p.vx += p.ax;
    p.vy += p.ay;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= p.decay;

    push();
    translate(p.x, p.y);
    rotate(p.rot);

    drawingContext.globalAlpha = constrain(p.life / 255, 0, 1);

    imageMode(CENTER);
    rectMode(CENTER);

    if (p.img && p.img.width > 1 && p.img.height > 1) {
      let srcX = p.sx * p.img.width;
      let srcY = p.sy * p.img.height;
      let srcW = p.sw * p.img.width;
      let srcH = p.sh * p.img.height;

      image(
        p.img,
        0,
        0,
        p.w,
        p.h,
        srcX,
        srcY,
        srcW,
        srcH
      );
    } else {
      noStroke();
      fill(230);
      rect(0, 0, p.w, p.h);
    }

    drawingContext.globalAlpha = 1;
    pop();
  }

  if (aliveCount === 0) {
    c3IsShattering = false;
    c3ShatteringItem = null;
    c3ShatterPieces = [];

    if (c3DestroyedItems.length >= 3) {
      c3ShatterDone = true;
    } else {
      c3ShatterDone = false;
    }
  }
}

function drawChapter3ItemScene() {
  clear();

  if (!c3Items || c3Items.length === 0) {
    initChapter3Items();
  }

  c3ItemSceneAlpha = min(255, c3ItemSceneAlpha + 4);
  c3ItemSceneTimer++;
  noStroke();
  fill(0, 120);
  rect(0, 0, width, height);

  updateAndDrawDust();

  textAlign(CENTER, CENTER);
  textFont(fontSys);

  let titleTxt = '[ BURIED MEMORIES UNCOVERED ]';
  let titleY = 78;
  let isGlitch = random() < 0.08;

  textSize(18);

  if (isGlitch && !c3ShatterDone) {
    drawingContext.shadowBlur = 0;
    fill(255, 0, 0, c3ItemSceneAlpha);
    text(titleTxt, width / 2 - 3, titleY);

    fill(0, 255, 255, c3ItemSceneAlpha);
    text(titleTxt, width / 2 + 3, titleY);
  }

  if (!c3ShatterDone) {
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = `rgba(255, 255, 255, ${0.6 * (c3ItemSceneAlpha / 255)})`;
    fill(255, c3ItemSceneAlpha);
    text(titleTxt, width / 2, titleY);
    drawingContext.shadowBlur = 0;

    fill(210, c3ItemSceneAlpha);
    textSize(12);
    text('[ Click an item to examine ]', width / 2, 104);
  }

  for (let item of c3Items) {
  if (item.appearLerp === undefined) item.appearLerp = 0;

  let targetAppear = c3ItemSceneTimer > item.appearDelay ? 1 : 0;

  item.appearLerp += (targetAppear - item.appearLerp) * 0.055;

  if (abs(1 - item.appearLerp) < 0.003 && targetAppear === 1) {
    item.appearLerp = 1;
  }
}

  c3FocusLerp += (c3TargetFocusLerp - c3FocusLerp) * 0.15;

  if (c3TargetFocusLerp === 0 && c3FocusLerp < 0.01) {
    c3ActiveItem = null;
    c3FocusLerp = 0;
  }

  let isHoveringAny = false;

if (c3Items && c3Items.length > 0 && !c3ShatterDone) {
  for (let item of c3Items) {
    if (c3DestroyedItems.includes(item.id)) continue;

    if (item === c3ActiveItem || item === c3ShatteringItem) continue;

    if (
      dist(mouseX, mouseY, item.x, item.y) <
      max(item.w, item.h) * 0.48 &&
      !c3IsShattering
    ) {
      isHoveringAny = true;
    }

    drawC3ItemLerped(item, 0);
  }
}

  if (c3FocusLerp > 0 && !c3IsShattering) {
    noStroke();
    fill(0, 180 * c3FocusLerp);
    rect(0, 0, width, height);
  }

  if (c3ActiveItem && !c3IsShattering) {
    drawC3ItemLerped(c3ActiveItem, c3FocusLerp);
    drawC3FocusOverlayOldStyle(c3ActiveItem, c3FocusLerp);
  }

updateAndDrawC3ShatterPieces();

if (c3ShatterDone) {
  drawC3FinalThoughtCenter();
  cursor(ARROW);
  return;
}

if (c3IsShattering) {
  cursor(ARROW);
} else if (c3ActiveItem && c3TargetFocusLerp === 1) {
  cursor(HAND);
} else if (isHoveringAny && c3TargetFocusLerp === 0) {
  cursor(HAND);
} else {
  cursor(ARROW);
}
}


function getThoughtForConnection(n1, n2) {
  let ids = [n1.id, n2.id].sort(); let pair = ids.join('-');
  if (pair === 'Father-Mother') return '"A perfect marriage... or so everyone thought."';
  if (pair === 'Gramms-Grammy') return '"They built this family\'s strict legacy from nothing."';
  if (pair === 'Grandma-Grandpa') return '"Mom always feared their harsh judgment."';
  if (pair === 'Father-Me') return '"He taught me to obey. Never to ask questions."';
  if (pair === 'Me-Mother') return '"She loved me, but her eyes always looked so tired."';
  if (pair === 'Father-Gramms' || pair === 'Father-Grammy') return '"Dad just wanted to make them proud."';
  if (pair === 'Grandma-Mother' || pair === 'Grandpa-Mother') return '"She tried so hard to be the perfect daughter."';
  return '"Blood ties bind us... but something feels wrong."';
}

function mousePressed() {
let soundX = width - 60;
let soundY = 88;

if (
  mouseX > soundX - 125 &&
  mouseX < soundX + 5 &&
  mouseY > soundY - 4 &&
  mouseY < soundY + 18
) {
  toggleSoundMute();
  return;
}

if (
  currentPhase === "RECALL_PHASE" &&
  !isFullyRecalled &&
  mouseX >= 100 &&
  mouseX <= 700 &&
  mouseY >= 75 &&
  mouseY <= 525
) {
  playDrawingTraceSound();
}   

if (currentPhase === "CHAPTER_3" && c3State === 4) {
  if (c3IsShattering || c3ShatterDone) {
    return;
  }

  if (c3TargetFocusLerp === 1 && c3ActiveItem) {
  playRandomCrumbleSound();

  startC3ItemShatter(c3ActiveItem);
  c3TargetFocusLerp = 0;
  c3FocusLerp = 0;
  return;
}

  for (let i = c3Items.length - 1; i >= 0; i--) {
  let item = c3Items[i];

  if (c3DestroyedItems.includes(item.id)) continue;

  if (
    item.appearLerp > 0.8 &&
    dist(mouseX, mouseY, item.x, item.y) <
    max(item.w, item.h) * 0.48
  ) {
    c3ActiveItem = item;
    c3TargetFocusLerp = 1;
    return;
  }
}
}

  if (currentPhase === "CHAPTER_2") {
    for (let n of c2Nodes) { if (dist(mouseX, mouseY, n.x, n.y) < 25 && !n.isSister) { c2ActiveNode = n; break; } }
  }
  else if (currentPhase === "SHATTERED") {
    for(let i = glassShards.length - 1; i >= 0; i--) { let s = glassShards[i]; if (dist(mouseX, mouseY, s.x, s.y) < 60) { draggedShard = s; break; } }
  }
}

function mouseDragged() {
  if (currentPhase === "SHATTERED" && draggedShard) { draggedShard.x = mouseX; draggedShard.y = mouseY; draggedShard.vx = mouseX - pmouseX; draggedShard.vy = mouseY - pmouseY; }
}

function mouseReleased() {
  if (currentPhase === "RECALL_PHASE" && !isFullyRecalled) { if (tracePoints.length > 0 && tracePoints[tracePoints.length - 1] !== null) tracePoints.push(null); }
  if (currentPhase === "CHAPTER_2" && c2ActiveNode) {
    let targetNode = null;
    for (let n of c2Nodes) { if (n !== c2ActiveNode && dist(mouseX, mouseY, n.x, n.y) < 25) { targetNode = n; break; } }
    if (targetNode) {
      if (targetNode.isSister) { 
  c2RejectTimer = 100; 
  startErrorLoopSound();
} 
      else {
        let exists = c2Connections.some(c => (c.from === c2ActiveNode && c.to === targetNode) || (c.from === targetNode && c.to === c2ActiveNode));
        if (!exists) {
          let startN = c2ActiveNode; let endN = targetNode;
          if (startN.y < endN.y) { let temp = startN; startN = endN; endN = temp; }
          let yAvg = (startN.y + endN.y) / 2; let swBase = map(yAvg, 150, 450, 8, 18); 
          c2Connections.push({ from: startN, to: endN, progress: 0, steps: dist(startN.x, startN.y, endN.x, endN.y) * 1.5, swStart: swBase + 4, swEnd: swBase - 2, seed: random(1000), completed: false });
          if (!c2BaseTreeDrawn && (startN.id === 'Me' || endN.id === 'Me')) { c2Connections.push({ from: {x: 400, y: 650}, to: c2Nodes.find(n=>n.id==='Me'), progress: 0, steps: 250, swStart: 45, swEnd: 25, seed: random(1000), completed: false }); c2BaseTreeDrawn = true; }
          c2CurrentThought = getThoughtForConnection(c2ActiveNode, targetNode); c2ThoughtTimer = 200; playRandomTreeSound();
        }
      }
    }
    c2ActiveNode = null; 
  }
  if (currentPhase === "SHATTERED" && draggedShard) draggedShard = null;
}


function growGuidedBranches() {
  c2TreeLayer.push();
  for (let conn of c2Connections) {
    if (!conn.completed) {
      if (conn.progress === 0) {
        let distX = conn.to.x - conn.from.x; let distY = conn.to.y - conn.from.y;
        if (abs(distY) > abs(distX)) { conn.cx1 = conn.from.x; conn.cy1 = conn.from.y + distY * 0.6; conn.cx2 = conn.to.x; conn.cy2 = conn.to.y - distY * 0.6; } 
        else { conn.cx1 = conn.from.x + distX * 0.5; conn.cy1 = conn.from.y - 80; conn.cx2 = conn.to.x - distX * 0.5; conn.cy2 = conn.to.y + 80; }
      }
      for(let s = 0; s < 3; s++) {
        if (conn.progress > conn.steps) { conn.completed = true; break; }
        let t = conn.progress / conn.steps;
        let bx = bezierPoint(conn.from.x, conn.cx1, conn.cx2, conn.to.x, t); let by = bezierPoint(conn.from.y, conn.cy1, conn.cy2, conn.to.y, t);
        let tx = bezierTangent(conn.from.x, conn.cx1, conn.cx2, conn.to.x, t); let ty = bezierTangent(conn.from.y, conn.cy1, conn.cy2, conn.to.y, t); let a = atan2(ty, tx) + HALF_PI; 
        let sw = lerp(conn.swStart, conn.swEnd, t); let col = map(constrain(sw, 4, 26), 26, 4, 60, 15);
        c2TreeLayer.push(); c2TreeLayer.translate(bx, by); c2TreeLayer.rotate(a);
        let rough = map(noise(t * 10, conn.seed), 0, 1, -1, 1); c2TreeLayer.translate(rough, 0);
        c2TreeLayer.strokeWeight(1.5);
        c2TreeLayer.stroke(col, 255); if (random() < 0.05) c2TreeLayer.stroke(100, 100, 100, 180); c2TreeLayer.line(0, -sw, 0, -sw * 0.1);
        c2TreeLayer.stroke(col * 0.75, 255); if (random() < 0.1) c2TreeLayer.stroke(60, 60, 60, 180); c2TreeLayer.line(0, -sw * 0.1, 0, sw * 0.32);
        c2TreeLayer.stroke(col * 0.5, 255); if (random() < 0.2) c2TreeLayer.stroke(20, 20, 20, 180); c2TreeLayer.line(0, sw * 0.32, 0, sw);
        if (random() < 0.02 && sw > 4) { c2TreeLayer.push(); c2TreeLayer.rotate(random(-PI*0.5, PI*0.5)); generateBareStick(c2TreeLayer, random(10, 25), 0); c2TreeLayer.pop(); }
        c2TreeLayer.pop(); conn.progress++;
      }
    }
  }
  c2TreeLayer.pop();
}


window.addEventListener("keydown", function(event) {
  if (event.key === "x" || event.key === "X") {
  if (
    currentPhase === "CHAPTER_4" &&
    c4ThoughtIndex === c4ThoughtSequence.length - 1 &&
    c4TypingDone
  ) {
    window.location.reload();
  }
}
  if (event.key === "0") {
    if (currentPhase === "RECALL_PHASE" && !isFullyRecalled) {
      recallLevel = 100; isDistorted = true; isFullyRecalled = true;
      let dad = document.getElementById('img-dad'); let mom = document.getElementById('img-mom'); let girl = document.getElementById('img-girl'); let sis = document.getElementById('img-sis');
      if (dad) dad.style.opacity = 1; if (mom) mom.style.opacity = 1; if (girl) girl.style.opacity = 1;
      if (sis) { sis.style.transition = 'opacity 2s ease'; sis.style.opacity = 1; sis.style.filter = 'none'; sis.style.transform = 'none'; }
    }
  }
  if (event.code === "Space" || event.key === " ") {
  event.preventDefault(); 


  if (currentPhase === "LOADING_SCREEN") {
  if (loadingDone && !loadingFadeOut) {
    playSpaceSound();
    stopSoundImmediately("snd-tape");
    startIntroBackgroundSounds();
    playTransitionSound();

    loadingFadeOut = true;
  }

  return;
}

    if (currentPhase === "PROLOGUE") {
      playSpaceSound();
      playTransitionSound();
  currentPhase = "ECHO_PHASE";

  if (polaWrapper) polaWrapper.style('display', 'none');

  let paper = document.getElementById('paper-wrapper');
  if (paper) {
    paper.style.display = 'grid';
    shuffleFamily();
  }

  let tv = document.getElementById('tv-container');
  if (tv) {
    tv.style.backgroundImage = "url('image/chap1/bg.png')";
    tv.style.backgroundSize = "115% 115%";
    tv.style.backgroundPosition = "50% 50%";
    tv.style.backgroundRepeat = "no-repeat";
  }

  transOverlayAlpha = 255;
  transTextAlpha = 0;
  transPhase = 0;
  transTimer = 0;
}
    else if (currentPhase === "RECALL_PHASE" && isFullyRecalled) {
      playSpaceSound();
      playTransitionSound();
  currentPhase = "TRANS_TO_CHAP2";

  let paper = document.getElementById('paper-wrapper');
  if (paper) paper.style.display = 'none';

  let tv = document.getElementById('tv-container');
  if (tv) {
    tv.style.backgroundImage = "url('image/chap2/bg.png')";
    tv.style.backgroundSize = "105% 105%";
    tv.style.backgroundPosition = "50% 50%";
    tv.style.backgroundRepeat = "no-repeat";
  }

  trans2Phase = 0;
  trans2Alpha = 255;
  trans2TextAlpha = 0;
  trans2Timer = 0;
}
    else if (currentPhase === "SHATTERED") {
      playSpaceSound();
      playTransitionSound();
  stopErrorLoopSound();

  currentPhase = "TRANS_TO_CHAP3";

  let tv = document.getElementById('tv-container');
  if (tv) {
    tv.style.backgroundImage = "url('image/chap3/bg.png')";
    tv.style.backgroundSize = "115% 115%";
    tv.style.backgroundPosition = "50% 50%";
    tv.style.backgroundRepeat = "no-repeat";
  }

  initChapter3();

  trans3Phase = 0;
  trans3Alpha = 255;
  trans3TextAlpha = 0;
  trans3Timer = 0;
}
    else if (currentPhase === "CHAPTER_3" && c3State === 4 && c3ShatterDone) {
      playSpaceSound();
      playTransitionSound();
startRainLoopSound();
  currentPhase = "TRANS_TO_CHAP4";

  showChapter4WaterLayer();

  trans4Phase = 0;
  trans4Alpha = 255;
  trans4TextAlpha = 0;
  trans4Timer = 0;
}
else if (currentPhase === "CHAPTER_4") {
  playOneShotSound("snd-space", 0.18);
  handleChapter4Space();
}
  }
});

function shuffleFamily() {
  let cols = [1, 2, 3]; for (let i = cols.length - 1; i > 0; i--) { let j = Math.floor(Math.random() * (i + 1)); [cols[i], cols[j]] = [cols[j], cols[i]]; }
  let dad = document.getElementById('img-dad'); let mom = document.getElementById('img-mom'); let girl = document.getElementById('img-girl'); let sis = document.getElementById('img-sis');
  if (dad) { dad.style.gridColumn = cols[0]; dad.style.gridRow = '1'; } if (mom) { mom.style.gridColumn = cols[1]; mom.style.gridRow = '1'; }
  if (girl) { girl.style.gridColumn = cols[2]; girl.style.gridRow = '1'; } if (sis) { sis.style.gridColumn = '4'; sis.style.gridRow = '1'; }
}

function updateAndDrawDust() {
  let margin = 40; 
  for (let i = 0; i < numDust; i++) {
    let p = dustParticles[i]; p.x += p.vx + map(noise(p.noiseSeed, frameCount * 0.005), 0, 1, -0.5, 0.5); p.y += p.vy + map(noise(p.noiseSeed + 100, frameCount * 0.005), 0, 1, -0.5, 0.5);
    if (p.x < margin) { p.x = margin; p.vx *= -1; } else if (p.x > width - margin) { p.x = width - margin; p.vx *= -1; }
    if (p.y < margin) { p.y = margin; p.vy *= -1; } else if (p.y > height - margin) { p.y = height - margin; p.vy *= -1; }
  }
  noStroke(); drawingContext.shadowBlur = 0;
  for (let i = 0; i < numDust; i++) { let p = dustParticles[i]; fill(200, 200, 200, random(100, 255)); if (i % 15 === 0) { fill(255); rect(p.x, p.y, 4, 4); } else { circle(p.x, p.y, 2); } }
}

function drawStaticNoise() {
  noStroke(); for (let i = 0; i < 300; i++) { fill(random(150, 255), random(15, 25)); rect(random(width), random(height), random(1, 3), random(1, 4)); }
}

function drawPrologueSpecificVHS() {
  textFont(fontSys); drawingContext.shadowBlur = 0; let glitchTITLE = (frameCount % 100 < 5) && (random(1) > 0.3);
  textAlign(CENTER, TOP); textSize(45); let words = ["A", "TRACE", "OF", "RUIN"]; let titleX = width / 2; let startY = 55; let lineSpacing = 48; 
  for (let i = 0; i < words.length; i++) {
    let word = words[i]; let wordY = startY + (i * lineSpacing); 
    if (glitchTITLE) { fill(255, 0, 0); text(word, titleX - random(2,4), wordY + random(-1,1)); fill(0, 255, 0); text(word, titleX + random(2,4), wordY + random(-1,1)); fill(255); text(word, titleX, wordY); } 
    else { drawingContext.shadowBlur = 8; drawingContext.shadowColor = 'rgba(200, 255, 255, 0.4)'; fill(220); text(word, titleX, wordY); drawingContext.shadowBlur = 0; }
  }
  textSize(16); let spaceY = startY + (words.length * lineSpacing) + 10; 
  if (frameCount % 60 < 40 || glitchTITLE) {
    let spaceTxt = "[ PRESS SPACE TO BEGIN ]";
    if (glitchTITLE) { fill(255, 0, 0); text(spaceTxt, titleX - random(2,4), spaceY + random(-1,1)); fill(0, 255, 0); text(spaceTxt, titleX + random(2,4), spaceY + random(-1,1)); fill(255); text(spaceTxt, titleX, spaceY); } 
    else { drawingContext.shadowBlur = 8; drawingContext.shadowColor = 'rgba(200, 255, 255, 0.4)'; fill(180); text(spaceTxt, titleX, spaceY); drawingContext.shadowBlur = 0; }
  }
  textSize(10); textAlign(CENTER, TOP); textLeading(12); 
  for (let drip of binaryDrips) {
    drip.y += drip.speed; let currentOpacity = map(drip.y, height * 0.3, height + 50, 40, 0, true);
    if (currentOpacity > 0) { fill(150, 150, 150, currentOpacity); let strV = vertBinPool[(frameCount) % 100]; text(strV.substring(0, drip.len * 2), drip.x, drip.y); }
    if (drip.y > height + 60) { drip.y = random(-400, -50); drip.x = random(width); drip.speed = random(0.3, 1.2); drip.len = floor(random(15, 35)); }
  }

}

function drawSharedVHS() {
  textFont(fontSys); drawingContext.shadowBlur = 0; let glitchPLAY = (frameCount % 75 < 5) && (random(1) > 0.3); let glitchSYS = (frameCount % 110 < 5) && (random(1) > 0.5); let glitchTIME = (frameCount % 90 < 5) && (random(1) > 0.4); let uiPad = 55; 
  textAlign(LEFT, TOP); textSize(28); let playTxt = "PLAY ►"; let playY = 50; 
  if (frameCount % 60 < 40 || glitchPLAY) {
    if (glitchPLAY) { fill(255, 0, 0); text(playTxt, uiPad - random(2,4), playY + random(-2,2)); fill(0, 255, 0); text(playTxt, uiPad + random(2,4), playY + random(-2,2)); fill(255); text(playTxt, uiPad, playY); } 
    else { drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'rgba(255, 255, 255, 0.6)'; fill(240); text(playTxt, uiPad, playY); drawingContext.shadowBlur = 0; }
  }
  textAlign(RIGHT, TOP); let sysTxt = "SYS_TRACE // SP_MODE"; let sysX = width - 60; let sysY = 50; textSize(16);
  if (glitchSYS) { fill(255, 0, 0); text(sysTxt, sysX - 2, sysY); fill(0, 255, 0); text(sysTxt, sysX + 2, sysY); fill(255); text(sysTxt, sysX, sysY); } else { fill(200); text(sysTxt, sysX, sysY); }
  fill(100); textSize(12); let padX = nf(round(mouseX), 3); let padY = nf(round(mouseY), 3); text(`[ ${padX} : ${padY} ]`, sysX, sysY + 18); 
  drawSoundToggleUI();
  let d = nf(day(), 2); let m = nf(month(), 2); let h = nf(hour(), 2); let min = nf(minute(), 2); let sec = nf(second(), 2);
  let glitchYear = "20" + nf(floor(random(0, 100)), 2); let dateStr = `${d}.${m}.${glitchYear}`; let timeStr = `${h}:${min}:${sec}`;
  textAlign(RIGHT, BOTTOM); textSize(16); let rightX = width - 60;
  if (glitchTIME) {
    fill(255, 0, 0); text(dateStr, rightX - random(2,4), height - 75 + random(-1,1)); text(timeStr, rightX - random(2,4), height - 60 + random(-1,1));
    fill(0, 255, 0); text(dateStr, rightX + random(2,4), height - 75 + random(-1,1)); text(timeStr, rightX + random(2,4), height - 60 + random(-1,1));
    fill(255); text(dateStr, rightX, height - 75); text(timeStr, rightX, height - 60);
  } else { fill(220); text(dateStr, rightX, height - 75); fill((frameCount % 60 < 30) ? 220 : 150); text(timeStr, rightX, height - 60); }
}

function drawSoundToggleUI() {
  push();

  textFont(fontSys);
  textAlign(RIGHT, TOP);
  textSize(12);

  let soundX = width - 60;
  let soundY = 88;

  let isHover =
    mouseX > soundX - 125 &&
    mouseX < soundX + 5 &&
    mouseY > soundY - 4 &&
    mouseY < soundY + 18;

  let label = soundMuted ? "[ SOUND OFF ]" : "[ SOUND ON ]";

  if (isHover) {
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'rgba(255,255,255,0.55)';
    fill(255);
    cursor(HAND);
  } else {
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = 'rgba(255,255,255,0.25)';
    fill(165);
  }

  text(label, soundX, soundY);

  drawingContext.shadowBlur = 0;
  pop();
}

function drawCRTTube() {
  rectMode(CORNER);
  imageMode(CORNER);

  noFill();
  strokeWeight(2);

  for (let i = 0; i < 35; i++) {
    stroke(0, map(i, 0, 35, 200, 0));
    rect(i, i, width - i * 2, height - i * 2, 60 - i);
  }
}

function generateBareTree(pg, len, depth = 0) {
  if (depth > 2) return; pg.push(); pg.translate(0, 0); let theta = random(-PI * 0.15, PI * 0.15); 
  if (len < tmaxLen) { pg.rotate(theta); } else { pg.rotate(random(-PI * 0.08, PI * 0.08)); } 
  let sw = map(len, tminLen, tmaxLen, 3, 18); pg.strokeWeight(1.5);
  for (let y = 0; y < len * 1.05; y += 2) { 
    let x = map(y, 0, len, sw, sw * 0.8); let col = map(x, 18, 3, 180, 40); 
    pg.push(); pg.translate(random(-x * 0.04, x * 0.04), -y);
    pg.stroke(col, 255); if (random() < 0.05) pg.stroke(200, 200, 200, 180); pg.line(-x, 0, -x * 0.1, 0);
    pg.stroke(col * 0.75, 255); if (random() < 0.1) pg.stroke(120, 120, 120, 180); pg.line(-x * 0.1, 0, x * 0.32, 0);
    pg.stroke(col * 0.5, 255); if (random() < 0.2) pg.stroke(50, 50, 50, 180); pg.line(x * 0.32, 0, x, 0);
    if (depth < 1 && random() < 0.025) {
      pg.push(); pg.translate(0, 0); pg.rotate(random(-PI * 0.15, PI * 0.15)); let swB = sw; pg.strokeWeight(1.5);
      for (let yB = 0; yB < len * 1.05; yB += 2) {
        let xB = map(yB, 0, len, swB, swB * 0.8); let colB = map(xB, 18, 3, 180, 40);
        pg.push(); pg.translate(random(-xB * 0.04, xB * 0.04), -yB);
        pg.stroke(colB, 255); if (random() < 0.05) pg.stroke(180, 180, 180, 150); pg.line(-xB, 0, -xB * 0.1, 0);
        pg.stroke(colB * 0.75, 255); if (random() < 0.1) pg.stroke(100, 100, 100, 150); pg.line(-xB * 0.1, 0, xB * 0.32, 0);
        pg.stroke(colB * 0.5, 255); if (random() < 0.2) pg.stroke(40, 40, 40, 150); pg.line(xB * 0.32, 0, xB, 0);
        pg.pop();
      }
      pg.translate(0, -len); if (len > tminLen) generateBareTree(pg, len * 0.8, depth + 1); pg.pop();
    }
    pg.pop();
    if (depth === 0 && random() < 0.01 && len < tmaxLen * 0.6) { pg.push(); pg.translate(0, 0); pg.rotate(random(-PI * 0.35, PI * 0.35)); generateBareStick(pg, smaxLen * 0.5, 0); pg.pop(); }
  }
  pg.translate(0, -len); if (len > tminLen) generateBareTree(pg, len * 0.8, depth);
  if (depth < 2 && random() < 0.04 && len < tmaxLen * 0.3) { pg.push(); pg.translate(0, 0); pg.rotate(random(-PI * 0.25, PI * 0.25)); generateBareStick(pg, smaxLen * 0.7, 0); pg.pop(); }
  pg.pop();
}

function generateBareStick(pg, len, stickDepth = 0) {
  if (stickDepth > 1) return; pg.push(); pg.translate(0, 0); let theta = random(-PI * 0.08, PI * 0.08); pg.rotate(theta); let sw = map(len, sminLen, smaxLen, 0.5, 1.5); pg.strokeWeight(sw);
  pg.stroke(100, 150); pg.line(0, 0, 0, -len); pg.translate(0, -len); if (len > sminLen * 2.5) generateBareStick(pg, len * 0.6, stickDepth + 1); pg.pop();
}