/* ==========================================================================
   笛子 / 竖笛 B A G 练习与教学系统 - JavaScript App Engine
   ========================================================================== */

// --- 1. 音符数据与指法定义 ---
const NOTE_DATA = {
  B4: {
    name: "B",
    solfege: "7 (Si)",
    freq: 493.88,
    abcName: "B",
    numbered: "7",
    recorderHoles: [1, 1, 0, 0, 0, 0, 0, 0], // [Thumb, H1, H2, H3, H4, H5, H6, H7] (1=covered, 0=open)
    bambooHoles: [1, 1, 0, 0, 0, 0],         // 竹笛: 1=按住, 0=放开
    descRecorder: "左手按住【背孔】与【第1孔】",
    descBamboo: "开第5, 6孔 (按住上3孔)"
  },
  A4: {
    name: "A",
    solfege: "6 (La)",
    freq: 440.00,
    abcName: "A",
    numbered: "6",
    recorderHoles: [1, 1, 1, 0, 0, 0, 0, 0],
    bambooHoles: [1, 1, 1, 0, 0, 0],
    descRecorder: "左手按住【背孔】与【第1、2孔】",
    descBamboo: "开第6孔 (按住第1,2,3,4,5孔)"
  },
  G4: {
    name: "G",
    solfege: "5 (Sol)",
    freq: 392.00,
    abcName: "G",
    numbered: "5",
    recorderHoles: [1, 1, 1, 1, 0, 0, 0, 0],
    bambooHoles: [1, 1, 1, 1, 1, 1],
    descRecorder: "左手按住【背孔】与【第1、2、3孔】",
    descBamboo: "全按 (按住所有6个音孔)"
  },
  C5: {
    name: "C (高音)",
    solfege: "1 (Do)",
    freq: 523.25,
    abcName: "c",
    numbered: "1",
    isNew: true,
    recorderHoles: [1, 0, 1, 0, 0, 0, 0, 0], // Thumb + Hole 2
    bambooHoles: [1, 1, 1, 0, 0, 0],         // 竹笛高音 Do
    descRecorder: "左手按住【背孔】与【第2孔】（第1孔放开！）",
    descBamboo: "开4, 5, 6孔 (按上2孔与高音气流)"
  }
};

// --- 2. 练习曲目数据库 ---
const SONGS = [
  {
    id: "song-warmup",
    title: "1. 三音长音暖身练习",
    level: "基础 warmup",
    badgeClass: "badge-basic",
    bpm: 65,
    description: "练习稳定持笛与长音吐音，音符切换平顺无杂音。",
    abc: `X:1\nT:1. 三音长音暖身练习\nM:4/4\nL:1/4\nK:C\n"B"B4 | "A"A4 | "G"G4 | "G"G4 |\n"B"B2 "A"A2 | "G"G4 | "B"B2 "A"A2 | "G"G4 |]`,
    notes: [
      { note: "B4", dur: 4 }, { note: "A4", dur: 4 }, { note: "G4", dur: 4 }, { note: "G4", dur: 4 },
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 }, { note: "G4", dur: 4 },
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 }, { note: "G4", dur: 4 }
    ]
  },
  {
    id: "song-tonguing",
    title: "2. 吐音与节奏小练习",
    level: "节奏节奏",
    badgeClass: "badge-basic",
    bpm: 75,
    description: "每音念「Tu (吐)」，保持节奏轻快均匀。",
    abc: `X:2\nT:2. 吐音与节奏小练习\nM:4/4\nL:1/4\nK:C\n"B"B B B B | "A"A A A A | "G"G G G G | "G"G4 |\n"B"B B "A"A A | "G"G G "A"A A | "B"B B "A"A A | "G"G4 |]`,
    notes: [
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 1 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "G4", dur: 1 },
      { note: "G4", dur: 4 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 }
    ]
  },
  {
    id: "song-hot-cross-buns",
    title: "3. 热十字包 (Hot Cross Buns)",
    level: "经典入门",
    badgeClass: "badge-easy",
    bpm: 80,
    description: "经典入门小曲，极好上手！注意最后两句八分音符的连贯。",
    abc: `X:3\nT:3. 热十字包 (Hot Cross Buns)\nM:4/4\nL:1/4\nK:C\n"B"B2 "A"A2 | "G"G4 | "B"B2 "A"A2 | "G"G4 |\n"G"G/2G/2G/2G/2 "A"A/2A/2A/2A/2 | "B"B2 "A"A2 | "G"G4 |]`,
    notes: [
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 }, { note: "G4", dur: 4 },
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 }, { note: "G4", dur: 4 },
      { note: "G4", dur: 0.5 }, { note: "G4", dur: 0.5 }, { note: "G4", dur: 0.5 }, { note: "G4", dur: 0.5 },
      { note: "A4", dur: 0.5 }, { note: "A4", dur: 0.5 }, { note: "A4", dur: 0.5 }, { note: "A4", dur: 0.5 },
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 }, { note: "G4", dur: 4 }
    ]
  },
  {
    id: "song-mary-lamb",
    title: "4. 玛莉的小羊 (Mary Had a Little Lamb)",
    level: "经典入门",
    badgeClass: "badge-easy",
    bpm: 85,
    description: "熟悉 B A G 三音流畅转换与旋律起伏。",
    abc: `X:4\nT:4. 玛莉的小羊 (Mary Had a Little Lamb)\nM:4/4\nL:1/4\nK:C\n"B"B "A"A "G"G "A"A | "B"B "B"B "B"B2 | "A"A "A"A "A"A2 | "B"B "B"B "B"B2 |\n"B"B "A"A "G"G "A"A | "B"B "B"B "B"B | "A"A "A"A "B"B "A"A | "G"G4 |]`,
    notes: [
      { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 2 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 2 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 2 },
      { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 1 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 }
    ]
  },
  {
    id: "song-au-clair",
    title: "5. 月光下 (Au Clair de la Lune)",
    level: "长曲进阶",
    badgeClass: "badge-medium",
    bpm: 80,
    description: "法民歌旋律，结构完整，训练耳朵与气息持久度。",
    abc: `X:5\nT:5. 月光下 (Au Clair de la Lune)\nM:4/4\nL:1/4\nK:C\n"G"G G G "A"A | "B"B2 "A"A2 | "G"G "B"B "A"A "A"A | "G"G4 |\n"G"G G G "A"A | "B"B2 "A"A2 | "G"G "B"B "A"A "A"A | "G"G4 |\n"A"A A A A | "G"G2 "G"G2 | "A"A "B"B "A"A "G"G | "A"A4 |\n"G"G G G "A"A | "B"B2 "A"A2 | "G"G "B"B "A"A "A"A | "G"G4 |]`,
    notes: [
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 },
      { note: "G4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 },
      { note: "G4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 2 }, { note: "G4", dur: 2 },
      { note: "A4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 },
      { note: "A4", dur: 4 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 2 }, { note: "A4", dur: 2 },
      { note: "G4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 }
    ]
  },
  {
    id: "song-bag-rhapsody",
    title: "6. 稍长综合：三音欢唱狂想曲",
    level: "综合大曲",
    badgeClass: "badge-advanced",
    bpm: 85,
    description: "16小节稍长练习曲！包含段落对比与完整终止式，充分锻炼熟练度。",
    abc: `X:6\nT:6. 三音欢唱狂想曲\nM:4/4\nL:1/4\nK:C\n"B"B B "A"A A | "G"G G "A"A2 | "B"B "A"A "G"G "A"A | "B"B4 |\n"B"B B "A"A A | "G"G G "A"A2 | "B"B "A"A "G"G "A"A | "G"G4 |\n"A"A A "A"A A | "B"B "B"B "B"B2 | "A"A "A"A "A"A A | "B"B4 |\n"B"B B "A"A A | "G"G G "A"A2 | "B"B "A"A "G"G "A"A | "G"G4 |]`,
    notes: [
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 2 },
      { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 4 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 2 },
      { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 2 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 4 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 2 },
      { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 }
    ]
  },
  // --- 新音练习曲（扩展部分）---
  {
    id: "song-new-note-c-jump",
    title: "7. 🎉 新音拓展：高音 C 跳跃队",
    level: "新音解锁",
    badgeClass: "badge-new-note",
    isNewNoteSong: true,
    bpm: 80,
    description: "解锁高音 C (1)！体会从 B (7) 到 C (1) 的手指松开与按压转换。",
    abc: `X:7\nT:7. 新音拓展：高音 C 跳跃队\nM:4/4\nL:1/4\nK:C\n"B"B B "C"c "C"c | "B"B B "A"A2 | "G"G G "A"A A | "B"B "C"c "B"B2 |\n"C"c "C"c "B"B B | "A"A A "G"G2 | "B"B "C"c "B"B "A"A | "G"G4 |]`,
    notes: [
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "C5", dur: 1 }, { note: "C5", dur: 1 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 2 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 1 }, { note: "C5", dur: 1 }, { note: "B4", dur: 2 },
      { note: "C5", dur: 1 }, { note: "C5", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 1 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 2 },
      { note: "B4", dur: 1 }, { note: "C5", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 }
    ]
  },
  {
    id: "song-four-note-dance",
    title: "8. 🎉 新音拓展：四音阶小舞曲 (G A B C)",
    level: "四音级进",
    badgeClass: "badge-new-note",
    isNewNoteSong: true,
    bpm: 85,
    description: "涵盖 G A B C 四个音符的上行与下行级进，音域全面提升！",
    abc: `X:8\nT:8. 四音阶小舞曲 (G A B C)\nM:4/4\nL:1/4\nK:C\n"G"G "A"A "B"B "C"c | "C"c "B"B "A"A "G"G | "B"B "C"c "B"B "A"A | "G"G4 |\n"C"c "C"c "B"B B | "A"A A "B"B2 | "C"c "B"B "A"A "B"B | "C"c4 |\n"G"G G "A"A A | "B"B B "C"c2 | "C"c "B"B "A"A "G"G | "G"G4 |]`,
    notes: [
      { note: "G4", dur: 1 }, { note: "A4", dur: 1 }, { note: "B4", dur: 1 }, { note: "C5", dur: 1 },
      { note: "C5", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 },
      { note: "B4", dur: 1 }, { note: "C5", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "G4", dur: 4 },
      { note: "C5", dur: 1 }, { note: "C5", dur: 1 }, { note: "B4", dur: 1 }, { note: "B4", dur: 1 },
      { note: "A4", dur: 1 }, { note: "A4", dur: 1 }, { note: "B4", dur: 2 },
      { note: "C5", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "B4", dur: 1 },
      { note: "C5", dur: 4 },
      { note: "G4", dur: 1 }, { note: "G4", dur: 1 }, { note: "A4", dur: 1 }, { note: "A4", dur: 1 },
      { note: "B4", dur: 1 }, { note: "B4", dur: 1 }, { note: "C5", dur: 2 },
      { note: "C5", dur: 1 }, { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G4", dur: 1 },
      { note: "G4", dur: 4 }
    ]
  }
];

// --- 3. Web Audio 音频合成器 ---
class FluteSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, duration = 0.5) {
    this.init();
    const now = this.ctx.currentTime;

    // 笛子双振荡器 (Sine + Soft Triangle)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, now);

    // 颤音 (LFO ~5Hz)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(5.2, now);
    lfoGain.gain.setValueAtTime(freq * 0.008, now);
    lfo.connect(osc1.frequency);
    lfo.connect(osc2.frequency);
    lfo.start(now);
    lfo.stop(now + duration + 0.1);

    // 吹奏气息白噪声 (Breath noise)
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(freq * 1.6, now);
    noiseFilter.Q.setValueAtTime(3.5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.015, now);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    // 包络线 (ADSR)
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.35, now + 0.04); // Attack
    gainNode.gain.setValueAtTime(0.32, now + duration - 0.05);   // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Release

    const masterGain = this.ctx.createGain();
    masterGain.gain.value = 0.6;

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(masterGain);
    noiseGain.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    noise.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    noise.stop(now + duration);
  }

  playMetronomeClick() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(1000, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }
}

const synth = new FluteSynth();

// --- 4. SVG 指法图渲染引擎 ---
let currentInstrumentType = "recorder"; // "recorder" (8孔竖笛) 或 "bamboo" (6孔竹笛)

function renderFluteSVG(noteKey, mode = currentInstrumentType) {
  const noteInfo = NOTE_DATA[noteKey];
  if (!noteInfo) return "";

  if (mode === "recorder") {
    // 8孔竖笛: [0:背孔, 1:第1孔, 2:第2孔, 3:第3孔, 4:第4孔, 5:第5孔, 6:第6孔, 7:第7孔]
    const h = noteInfo.recorderHoles;
    return `
      <svg width="60" height="260" viewBox="0 0 60 260" xmlns="http://www.w3.org/2000/svg">
        <!-- 笛身 -->
        <rect x="18" y="10" width="24" height="240" rx="12" fill="#f8fafc" stroke="#334155" stroke-width="2.5"/>
        <path d="M 22,25 L 38,25" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <!-- 背孔 T (Thumb) -->
        <g transform="translate(10, 45)">
          <circle cx="0" cy="0" r="6" fill="${h[0] ? '#1e293b' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
          <text x="-8" y="14" font-size="9" font-weight="bold" fill="#64748b">背</text>
        </g>
        <!-- 正面7孔 -->
        <!-- 左手区 (1, 2, 3) -->
        <circle cx="30" cy="50" r="6.5" fill="${h[1] ? '#2563eb' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
        <text x="44" y="53" font-size="9" fill="#475569">1</text>
        <circle cx="30" cy="75" r="6.5" fill="${h[2] ? '#2563eb' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
        <text x="44" y="78" font-size="9" fill="#475569">2</text>
        <circle cx="30" cy="100" r="6.5" fill="${h[3] ? '#2563eb' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
        <text x="44" y="103" font-size="9" fill="#475569">3</text>
        <!-- 分割线 -->
        <line x1="22" y1="120" x2="38" y2="120" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="2 2"/>
        <!-- 右手区 (4, 5, 6, 7) -->
        <circle cx="30" cy="135" r="6.5" fill="${h[4] ? '#2563eb' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
        <text x="44" y="138" font-size="9" fill="#94a3b8">4</text>
        <circle cx="30" cy="160" r="6.5" fill="${h[5] ? '#2563eb' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
        <text x="44" y="163" font-size="9" fill="#94a3b8">5</text>
        <circle cx="30" cy="185" r="6.5" fill="${h[6] ? '#2563eb' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
        <text x="44" y="188" font-size="9" fill="#94a3b8">6</text>
        <circle cx="30" cy="210" r="6.5" fill="${h[7] ? '#2563eb' : '#ffffff'}" stroke="#1e293b" stroke-width="2"/>
        <text x="44" y="213" font-size="9" fill="#94a3b8">7</text>
      </svg>
    `;
  } else {
    // 6孔竹笛: [1, 2, 3, 4, 5, 6] (从上到下)
    const h = noteInfo.bambooHoles;
    return `
      <svg width="60" height="240" viewBox="0 0 60 240" xmlns="http://www.w3.org/2000/svg">
        <!-- 笛身 -->
        <rect x="18" y="10" width="24" height="220" rx="12" fill="#fef3c7" stroke="#78350f" stroke-width="2.5"/>
        <!-- 吹孔 -->
        <ellipse cx="30" cy="30" rx="5" ry="3.5" fill="#78350f"/>
        <!-- 膜孔 -->
        <ellipse cx="30" cy="50" rx="4" ry="2.5" fill="#fde68a" stroke="#b45309" stroke-width="1"/>
        <!-- 6个音孔 -->
        <circle cx="30" cy="80" r="6" fill="${h[0] ? '#78350f' : '#ffffff'}" stroke="#78350f" stroke-width="2"/>
        <text x="42" y="83" font-size="9" fill="#78350f">6</text>
        <circle cx="30" cy="104" r="6" fill="${h[1] ? '#78350f' : '#ffffff'}" stroke="#78350f" stroke-width="2"/>
        <text x="42" y="107" font-size="9" fill="#78350f">5</text>
        <circle cx="30" cy="128" r="6" fill="${h[2] ? '#78350f' : '#ffffff'}" stroke="#78350f" stroke-width="2"/>
        <text x="42" y="131" font-size="9" fill="#78350f">4</text>
        <circle cx="30" cy="152" r="6" fill="${h[3] ? '#78350f' : '#ffffff'}" stroke="#78350f" stroke-width="2"/>
        <text x="42" y="155" font-size="9" fill="#78350f">3</text>
        <circle cx="30" cy="176" r="6" fill="${h[4] ? '#78350f' : '#ffffff'}" stroke="#78350f" stroke-width="2"/>
        <text x="42" y="179" font-size="9" fill="#78350f">2</text>
        <circle cx="30" cy="200" r="6" fill="${h[5] ? '#78350f' : '#ffffff'}" stroke="#78350f" stroke-width="2"/>
        <text x="42" y="203" font-size="9" fill="#78350f">1</text>
      </svg>
    `;
  }
}

// --- 5. 页面组件交互控制 ---
let currentSongIndex = 0;
let isPlaying = false;
let playInterval = null;
let currentNoteIndex = 0;
let isMetronomeOn = true;
let currentNotationView = "staff"; // "staff" 或 "numbered"

document.addEventListener("DOMContentLoaded", () => {
  initFingeringGrid();
  initSongSelector();
  initPlayerControls();
  initQuiz();
  renderCurrentSong();
});

// 渲染基础音符指法卡片
function initFingeringGrid() {
  const grid = document.getElementById("fingeringGrid");
  if (!grid) return;

  grid.innerHTML = Object.keys(NOTE_DATA).map(key => {
    const item = NOTE_DATA[key];
    return `
      <div class="fingering-card ${item.isNew ? 'new-note-card' : ''}" onclick="selectAndPlayFingering('${key}')">
        <div class="note-header">
          <span class="note-name">${item.name}</span>
          <span class="note-solfege">${item.solfege}</span>
        </div>
        <div class="flute-diagram-container" id="svg-diag-${key}">
          ${renderFluteSVG(key)}
        </div>
        <div class="fingering-desc">
          ${currentInstrumentType === 'recorder' ? item.descRecorder : item.descBamboo}
        </div>
        <button class="btn-play-tone" onclick="event.stopPropagation(); synth.playNote(${item.freq}, 0.8)">
          🔊 试听发音
        </button>
      </div>
    `;
  }).join("");
}

function selectAndPlayFingering(key) {
  const note = NOTE_DATA[key];
  if (note) {
    synth.playNote(note.freq, 0.8);
    // 高亮当前选中的指法卡片
    document.querySelectorAll('.fingering-card').forEach(c => c.classList.remove('active'));
    event.currentTarget?.classList.add('active');
  }
}

// 切换乐器类型 (8孔竖笛 / 6孔竹笛)
function setInstrumentType(type) {
  currentInstrumentType = type;
  document.getElementById("btnTypeRecorder").classList.toggle("active", type === "recorder");
  document.getElementById("btnTypeBamboo").classList.toggle("active", type === "bamboo");
  
  // 重新渲染指法图解
  initFingeringGrid();
  updateRealtimeFingering();
}

// 渲染曲目选择卡片
function initSongSelector() {
  const container = document.getElementById("songSelectorGrid");
  if (!container) return;

  container.innerHTML = SONGS.map((song, idx) => `
    <div class="song-card ${idx === currentSongIndex ? 'selected' : ''} ${song.isNewNoteSong ? 'new-note-song' : ''}" 
         onclick="selectSong(${idx})">
      <span class="song-level">${song.level}</span>
      <h3>${song.title}</h3>
      <p>${song.description}</p>
    </div>
  `).join("");
}

function selectSong(idx) {
  stopPlayback();
  currentSongIndex = idx;
  currentNoteIndex = 0;
  
  document.querySelectorAll('.song-card').forEach((c, i) => {
    c.classList.toggle('selected', i === idx);
  });
  
  renderCurrentSong();
}

// 渲染选中的曲目 (五线谱与简谱)
function renderCurrentSong() {
  const song = SONGS[currentSongIndex];
  if (!song) return;

  document.getElementById("playerSongTitle").textContent = song.title;
  document.getElementById("playerSongDesc").textContent = song.description;
  document.getElementById("bpmInput").value = song.bpm;
  document.getElementById("bpmValue").textContent = song.bpm + " BPM";

  // 1. ABCjs 渲染五线谱
  if (window.ABCJS) {
    ABCJS.renderAbc("abcContainer", song.abc, {
      responsive: "resize",
      staffwidth: 750,
      add_classes: true
    });
  }

  // 2. 渲染简谱视图
  renderNumberedNotation(song);
  
  // 3. 更新实时指法预览
  updateRealtimeFingering();
}

// 渲染简谱
function renderNumberedNotation(song) {
  const container = document.getElementById("numberedContainer");
  if (!container) return;

  let html = `<div class="numbered-notation-view">`;
  let currentMeasure = [];
  let beatsInMeasure = 0;

  song.notes.forEach((item, idx) => {
    const noteInfo = NOTE_DATA[item.note];
    const num = noteInfo ? noteInfo.numbered : "?";
    
    // 生成音符显示
    currentMeasure.push(`
      <span class="numbered-note" id="num-note-${idx}">
        ${num}${item.dur === 2 ? ' -' : item.dur === 4 ? ' - - -' : ''}
      </span>
    `);
    
    beatsInMeasure += item.dur;
    if (beatsInMeasure >= 4 || idx === song.notes.length - 1) {
      html += `<div class="numbered-bar">${currentMeasure.join("")}</div>`;
      currentMeasure = [];
      beatsInMeasure = 0;
    }
  });

  html += `</div>`;
  container.innerHTML = html;
}

// 切换谱表视图 (五线谱 / 简谱)
function setNotationView(view) {
  currentNotationView = view;
  document.getElementById("tabStaff").classList.toggle("active", view === "staff");
  document.getElementById("tabNumbered").classList.toggle("active", view === "numbered");
  
  document.getElementById("abcContainer").style.display = view === "staff" ? "block" : "none";
  document.getElementById("numberedContainer").style.display = view === "numbered" ? "block" : "none";
}

// --- 6. 播放器跟练逻辑 ---
function initPlayerControls() {
  document.getElementById("bpmInput")?.addEventListener("input", (e) => {
    document.getElementById("bpmValue").textContent = e.target.value + " BPM";
  });
}

function togglePlay() {
  if (isPlaying) {
    stopPlayback();
  } else {
    startPlayback();
  }
}

function startPlayback() {
  const song = SONGS[currentSongIndex];
  if (!song) return;

  isPlaying = true;
  document.getElementById("btnPlay").innerHTML = "⏸️ 暂停播放";
  document.getElementById("btnPlay").classList.remove("btn-action");
  document.getElementById("btnPlay").classList.add("btn-action", "btn-success");

  const bpm = parseInt(document.getElementById("bpmInput").value) || song.bpm;
  const beatDurationMs = (60 / bpm) * 1000;

  let step = currentNoteIndex;

  const playStep = () => {
    if (!isPlaying) return;

    if (step >= song.notes.length) {
      stopPlayback();
      currentNoteIndex = 0;
      return;
    }

    const noteItem = song.notes[step];
    const noteInfo = NOTE_DATA[noteItem.note];

    if (noteInfo) {
      // 播放声音
      synth.playNote(noteInfo.freq, (noteItem.dur * beatDurationMs / 1000) * 0.9);
      
      // 节拍器辅助
      if (isMetronomeOn) {
        synth.playMetronomeClick();
      }

      // 更新高亮与当前指法
      highlightCurrentNote(step);
      updateRealtimeFingering(noteItem.note);
    }

    currentNoteIndex = step;
    step++;

    const delay = noteItem.dur * beatDurationMs;
    playInterval = setTimeout(playStep, delay);
  };

  playStep();
}

function stopPlayback() {
  isPlaying = false;
  if (playInterval) clearTimeout(playInterval);
  document.getElementById("btnPlay").innerHTML = "▶️ 开始跟练播放";
  document.getElementById("btnPlay").classList.remove("btn-success");
  document.getElementById("btnPlay").classList.add("btn-action");
  clearHighlights();
}

function highlightCurrentNote(index) {
  clearHighlights();
  // 简谱高亮
  const numElem = document.getElementById(`num-note-${index}`);
  if (numElem) {
    numElem.classList.add("current-highlight");
  }
}

function clearHighlights() {
  document.querySelectorAll(".numbered-note").forEach(el => el.classList.remove("current-highlight"));
}

function updateRealtimeFingering(noteKey = null) {
  const key = noteKey || (SONGS[currentSongIndex]?.notes[0]?.note) || "B4";
  const noteInfo = NOTE_DATA[key];
  if (!noteInfo) return;

  document.getElementById("rtNoteName").textContent = `${noteInfo.name} (${noteInfo.solfege})`;
  document.getElementById("rtNoteDesc").textContent = currentInstrumentType === 'recorder' ? noteInfo.descRecorder : noteInfo.descBamboo;
  document.getElementById("rtFluteSvg").innerHTML = renderFluteSVG(key);
}

// --- 7. 互动指法小测试 (Quiz) ---
let quizScore = 0;
let currentQuizTarget = null;

function initQuiz() {
  nextQuizQuestion();
}

function nextQuizQuestion() {
  const keys = Object.keys(NOTE_DATA);
  currentQuizTarget = keys[Math.floor(Math.random() * keys.length)];
  const item = NOTE_DATA[currentQuizTarget];

  document.getElementById("quizTargetName").textContent = `请找出音符 【 ${item.name} (${item.solfege}) 】 的正确指法：`;
  document.getElementById("quizFeedback").textContent = "";

  // 生成混淆选项 (显示3个指法图)
  const options = [...keys].sort(() => 0.5 - Math.random());
  document.getElementById("quizOptions").innerHTML = options.map(key => `
    <button class="btn-quiz-opt" onclick="checkQuizAnswer('${key}')">
      <div style="pointer-events:none;">${renderFluteSVG(key)}</div>
    </button>
  `).join("");
}

function checkQuizAnswer(selectedKey) {
  const feedback = document.getElementById("quizFeedback");
  if (selectedKey === currentQuizTarget) {
    quizScore += 10;
    feedback.style.color = "var(--accent-green)";
    feedback.textContent = "🎉 答对啦！指法非常精准！+10分";
    synth.playNote(NOTE_DATA[selectedKey].freq, 0.5);
    document.getElementById("quizScore").textContent = `得分: ${quizScore}`;
    setTimeout(nextQuizQuestion, 1500);
  } else {
    feedback.style.color = "var(--danger)";
    feedback.textContent = "❌ 答错了哦，再仔细看一看各个音孔的位置！";
    synth.playNote(220, 0.3); // 错误提示音
  }
}
