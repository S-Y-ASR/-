/* ===== 星空背景 ===== */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.004 + 0.002,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,200,180,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createStars(220);
  window.addEventListener('resize', () => { resize(); createStars(220); });
  requestAnimationFrame(draw);
})();


/* ===== データ ===== */
const STARS_DATA = [
  { name: '紫微星', key: '帝王・統率', desc: '権威と威厳を持つ帝王星。指導力に優れ、周囲を引き付けるカリスマがある。' },
  { name: '天機星', key: '知恵・機転', desc: '頭脳明晰で機知に富む。変化への適応力が高く、戦略的思考を持つ。' },
  { name: '太陽星', key: '輝き・奉仕', desc: '太陽のように明るく奉仕精神旺盛。名誉と社会的地位を重んじる。' },
  { name: '武曲星', key: '財・行動力', desc: '実行力と財運を象徴。堅実で粘り強く、目標に向かって着実に進む。' },
  { name: '天同星', key: '温和・享楽', desc: '温厚で平和を好む。芸術的センスがあり、安定した生活を求める。' },
  { name: '廉貞星', key: '欲望・情熱', desc: '情熱的でエネルギッシュ。欲望と規律の間で葛藤しながら成長する。' },
  { name: '天府星', key: '蓄財・安定', desc: '財を蓄える才能と安定志向。保守的だが信頼性が高く基盤を作る。' },
  { name: '太陰星', key: '陰徳・直感', desc: '繊細で直感力が高い。内省的で芸術・美への感受性が豊か。' },
  { name: '貪狼星', key: '欲・魅力', desc: '多才で魅力的。欲望のエネルギーが才能と行動力に変わる。' },
  { name: '巨門星', key: '言葉・探究', desc: '雄弁で探究心が強い。言葉を武器に真実を追求する。' },
  { name: '天相星', key: '補佐・調和', desc: '協調性に優れ、人をサポートする力を持つ。調和を重んじる。' },
  { name: '天梁星', key: '庇護・長寿', desc: '寛大で保護する力がある。長寿と知恵を象徴し、人を導く。' },
  { name: '七殺星', key: '変革・闘志', desc: '強烈な変革のエネルギー。果敢に挑戦し、困難を突破する。' },
  { name: '破軍星', key: '革命・突破', desc: '旧体制を壊し新しいものを生む。革命的でパイオニア精神がある。' }
];

const PALACES = ['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','交友','官禄','田宅','福徳','父母'];

// 年支の表
const year_branches = [
  { name: '子', reading: 'ね' },
  { name: '丑', reading: 'うし' },
  { name: '寅', reading: 'とら' },
  { name: '卯', reading: 'う' },
  { name: '辰', reading: 'たつ' },
  { name: '巳', reading: 'み' },
  { name: '午', reading: 'うま' },
  { name: '未', reading: 'ひつじ' },
  { name: '申', reading: 'さる' },
  { name: '酉', reading: 'とり' },
  { name: '戌', reading: 'いぬ' },
  { name: '亥', reading: 'い' }
];

// 命主
const life_master = [
  { name: '貪狼', reading: 'たんろう' },
  { name: '巨門', reading: 'こもん' },
  { name: '禄存', reading: 'ろくぞん' },
  { name: '文曲', reading: 'ぶんきょく' },
  { name: '廉貞', reading: 'れんてい' },
  { name: '武曲', reading: 'ぶきょく' },
  { name: '破軍', reading: 'はぐん' }
]

// 身主
const body_master = [
  { name: '火星', reading: 'かせい' },
  { name: '天相', reading: 'てんそう' },
  { name: '天梁', reading: 'てんりょう' },
  { name: '天同', reading: 'てんどう' },
  { name: '文昌', reading: 'ぶんしょう' },
  { name: '天機', reading: 'てんき' }
]

// 年干系統の諸星表（暫定版）
const heavenly_stem_stars = [
  { name: '禄存', reading: 'ろくぞん' },
  { name: '擎羊', reading: 'けいよう' },
  { name: '陀羅', reading: 'だら' },
  { name: '天魁', reading: 'てんかい' },
  { name: '天鉞', reading: 'てんえつ' },
  { name: '天官', reading: 'てんかん' },
  { name: '天福', reading: 'てんぷく' },
  { name: '天厨', reading: 'てんちゅう' }
]

// 年干系統の諸星表の対応表（正式版）
const yearStemStarPositions = {
  '甲': {
    '禄存': '寅',
    '擎羊': '卯',
    '陀羅': '丑',
    '天魁': '丑',
    '天鉞': '未',
    '天官': '未',
    '天福': '酉',
    '天厨': '巳'
  },

  '乙': {
    '禄存': '卯',
    '擎羊': '辰',
    '陀羅': '寅',
    '天魁': '子',
    '天鉞': '申',
    '天官': '辰',
    '天福': '申',
    '天厨': '午'
  },

  '丙': {
    '禄存': '巳',
    '擎羊': '午',
    '陀羅': '辰',
    '天魁': '亥',
    '天鉞': '酉',
    '天官': '巳',
    '天福': '子',
    '天厨': '子'
  },

  '丁': {
    '禄存': '午',
    '擎羊': '未',
    '陀羅': '巳',
    '天魁': '亥',
    '天鉞': '酉',
    '天官': '寅',
    '天福': '亥',
    '天厨': '巳'
  },

  '戊': {
    '禄存': '巳',
    '擎羊': '午',
    '陀羅': '辰',
    '天魁': '丑',
    '天鉞': '未',
    '天官': '卯',
    '天福': '卯',
    '天厨': '午'
  },

  '己': {
    '禄存': '午',
    '擎羊': '未',
    '陀羅': '巳',
    '天魁': '子',
    '天鉞': '申',
    '天官': '酉',
    '天福': '寅',
    '天厨': '申'
  },

  '庚': {
    '禄存': '申',
    '擎羊': '酉',
    '陀羅': '未',
    '天魁': '丑',
    '天鉞': '未',
    '天官': '亥',
    '天福': '午',
    '天厨': '寅'
  },

  '辛': {
    '禄存': '酉',
    '擎羊': '戌',
    '陀羅': '申',
    '天魁': '午',
    '天鉞': '寅',
    '天官': '酉',
    '天福': '巳',
    '天厨': '午'
  },

  '壬': {
    '禄存': '亥',
    '擎羊': '子',
    '陀羅': '戌',
    '天魁': '卯',
    '天鉞': '巳',
    '天官': '戌',
    '天福': '午',
    '天厨': '酉'
  },

  '癸': {
    '禄存': '子',
    '擎羊': '丑',
    '陀羅': '亥',
    '天魁': '卯',
    '天鉞': '巳',
    '天官': '午',
    '天福': '巳',
    '天厨': '亥'
  }
};

// 年支系統の諸星表(暫定版)
const earthly_branch_stars = [
  { name: '天馬', reading: 'てんま' },
  { name: '天哭', reading: 'てんこく' },
  { name: '天虚', reading: 'てんきょ' },
  { name: '龍池', reading: 'りゅうち' },
  { name: '鳳閣', reading: 'ほうかく' },
  { name: '紅鸞', reading: 'こうらん' },
  { name: '天喜', reading: 'てんき' },
  { name: '孤辰', reading: 'こしん' },
  { name: '寡宿', reading: 'かしゅく' },
  { name: '蜚廉', reading: 'ひれん' },
  { name: '破碎', reading: 'はさい' },
  { name: '華蓋', reading: 'かがい' },
  { name: '咸池', reading: 'かんち' },
  { name: '天徳', reading: 'てんとく' },
  { name: '月徳', reading: 'げっとく' },
  { name: '天才', reading: 'てんさい' },
  { name: '天寿', reading: 'てんじゅ' }
]

// 年支系統の諸星表の対応表(正式版)
const earthlyBranchStarPosition = {
  '子': {
    '天馬': '寅',
    '天哭': '午',
    '天虚': '午',
    '龍池': '辰',
    '鳳閣': '戌',
    '紅鸞': '卯',
    '天喜': '酉',
    '孤辰': '寅',
    '寡宿': '戌', 
    '蜚廉': '申',
    '破碎': '巳',
    '華蓋': '辰',
    '咸池': '酉',
    '天徳': '酉',
    '月徳': '巳',
    '天才': '命宮'
  },  

  '丑': {
    '天馬': '亥',
    '天哭': '巳',
    '天虚': '未',
    '龍池': '巳',
    '鳳閣': '酉',
    '紅鸞': '寅',
    '天喜': '申',
    '孤辰': '寅',
    '寡宿': '戌', 
    '蜚廉': '酉',
    '破碎': '丑',
    '華蓋': '丑',
    '咸池': '午',
    '天徳': '戌',
    '月徳': '午',
    '天才': '父母'
  },  

  '寅': {
    '天馬': '申',
    '天哭': '辰',
    '天虚': '申',
    '龍池': '午',
    '鳳閣': '申',
    '紅鸞': '丑',
    '天喜': '未',
    '孤辰': '巳',
    '寡宿': '丑', 
    '蜚廉': '戌',
    '破碎': '酉',
    '華蓋': '戌',
    '咸池': '卯',
    '天徳': '亥',
    '月徳': '未',
    '天才': '福徳'
  },    

  '卯': {
    '天馬': '巳',
    '天哭': '卯',
    '天虚': '酉',
    '龍池': '未',
    '鳳閣': '未',
    '紅鸞': '子',
    '天喜': '午',
    '孤辰': '巳',
    '寡宿': '丑', 
    '蜚廉': '巳',
    '破碎': '巳',
    '華蓋': '未',
    '咸池': '子',
    '天徳': '子',
    '月徳': '申',
    '天才': '田宅'
  },

  '辰': {
    '天馬': '寅',
    '天哭': '寅',
    '天虚': '戌',
    '龍池': '申',
    '鳳閣': '午',
    '紅鸞': '亥',
    '天喜': '巳',
    '孤辰': '巳',
    '寡宿': '丑', 
    '蜚廉': '午',
    '破碎': '丑',
    '華蓋': '辰',
    '咸池': '酉',
    '天徳': '丑',
    '月徳': '酉',
    '天才': '事業'
  },  

  '巳': {
    '天馬': '亥',
    '天哭': '丑',
    '天虚': '亥',
    '龍池': '酉',
    '鳳閣': '巳',
    '紅鸞': '戌',
    '天喜': '辰',
    '孤辰': '申',
    '寡宿': '辰', 
    '蜚廉': '未',
    '破碎': '酉',
    '華蓋': '丑',
    '咸池': '午',
    '天徳': '寅',
    '月徳': '戌',
    '天才': '交友'
  }, 

  '午': {
    '天馬': '申',
    '天哭': '子',
    '天虚': '子',
    '龍池': '戌',
    '鳳閣': '辰',
    '紅鸞': '酉',
    '天喜': '卯',
    '孤辰': '申',
    '寡宿': '辰', 
    '蜚廉': '寅',
    '破碎': '巳',
    '華蓋': '戌',
    '咸池': '卯',
    '天徳': '卯',
    '月徳': '亥',
    '天才': '遷移'
  },   

  '未': {
    '天馬': '巳',
    '天哭': '亥',
    '天虚': '丑',
    '龍池': '亥',
    '鳳閣': '卯',
    '紅鸞': '申',
    '天喜': '寅',
    '孤辰': '申',
    '寡宿': '辰', 
    '蜚廉': '卯',
    '破碎': '丑',
    '華蓋': '未',
    '咸池': '子',
    '天徳': '辰',
    '月徳': '子',
    '天才': '疾厄'
  },   

  '申': {
    '天馬': '寅',
    '天哭': '戌',
    '天虚': '寅',
    '龍池': '子',
    '鳳閣': '寅',
    '紅鸞': '未',
    '天喜': '丑',
    '孤辰': '亥',
    '寡宿': '未', 
    '蜚廉': '辰',
    '破碎': '酉',
    '華蓋': '辰',
    '咸池': '酉',
    '天徳': '巳',
    '月徳': '丑',
    '天才': '財帛'
  },   
  
  '酉': {
    '天馬': '亥',
    '天哭': '酉',
    '天虚': '卯',
    '龍池': '丑',
    '鳳閣': '丑',
    '紅鸞': '午',
    '天喜': '子',
    '孤辰': '亥',
    '寡宿': '未', 
    '蜚廉': '亥',
    '破碎': '巳',
    '華蓋': '丑',
    '咸池': '午',
    '天徳': '午',
    '月徳': '寅',
    '天才': '子女'
  },   

  '戌': {
    '天馬': '申',
    '天哭': '申',
    '天虚': '辰',
    '龍池': '寅',
    '鳳閣': '子',
    '紅鸞': '巳',
    '天喜': '亥',
    '孤辰': '亥',
    '寡宿': '未', 
    '蜚廉': '子',
    '破碎': '丑',
    '華蓋': '戌',
    '咸池': '卯',
    '天徳': '未',
    '月徳': '卯',
    '天才': '夫妻'
  },   

  '亥': {
    '天馬': '巳',
    '天哭': '未',
    '天虚': '巳',
    '龍池': '卯',
    '鳳閣': '亥',
    '紅鸞': '辰',
    '天喜': '戌',
    '孤辰': '寅',
    '寡宿': '戌', 
    '蜚廉': '丑',
    '破碎': '酉',
    '華蓋': '未',
    '咸池': '子',
    '天徳': '申',
    '月徳': '辰',
    '天才': '兄弟'
  }   
};

// 月系統の諸星表
const month_based_stars = [
  { name: '左輔', reading: 'さほ' },
  { name: '右弼', reading: 'うひつ' },
  { name: '天刑', reading: 'てんけい' },
  { name: '天姚', reading: 'てんよう' },
  { name: '解神', reading: 'かいしん' },
  { name: '天巫', reading: 'てんふ' },
  { name: '天月', reading: 'てんげつ' },
  { name: '陰煞', reading: 'いんさつ' }
]

// 日系統の諸星表
const daily_stars = [
  { name: '三台', reading: 'さんだい' },
  { name: '八座', reading: 'はちざ' },
  { name: '恩光', reading: 'おんこう' },
  { name: '天貴', reading: 'てんき' }
]

  // 時系統の諸星表
  const time_stars = [
    { name: '文昌', reading: 'ぶんしょう' },
    { name: '文曲', reading: 'ぶんきょく' },
    { name: '火星', reading: 'かせい' },
    { name: '鈴星', reading: 'れいせい' },
    { name: '地劫', reading: 'ちごう' },
    { name: '地空', reading: 'ちくう' },
    { name: '台輔', reading: 'たいほ' },
    { name: '封誥', reading: 'ほうこう' }
  ]

//長生十二神の表
// 長生十二神の表
const changshengStars = [
  { name: "長生", reading: "ちょうせい" },
  { name: "沐浴", reading: "もくよく" },
  { name: "冠帯", reading: "かんたい" },
  { name: "建禄", reading: "けんろく" },
  { name: "帝旺", reading: "ていおう" },
  { name: "衰", reading: "すい" },
  { name: "病", reading: "びょう" },
  { name: "死", reading: "し" },
  { name: "墓", reading: "ぼ" },
  { name: "絶", reading: "ぜつ" },
  { name: "胎", reading: "たい" },
  { name: "養", reading: "よう" }
];

// 博士十二神の表
const doctor_stars = [
  { name: '博士', reading: 'はかせ' },
  { name: '力士', reading: 'りきし' },
  { name: '青龍', reading: 'せいりゅう' },
  { name: '小耗', reading: 'しょうもう' },
  { name: '将軍', reading: 'しょうぐん' },
  { name: '奏書', reading: 'そうしょ' },
  { name: '飛廉', reading: 'ひれん' },
  { name: '喜神', reading: 'きしん' },
  { name: '病符', reading: 'びょうふ' },
  { name: '大耗', reading: 'たいもう' },
  { name: '伏兵', reading: 'ふくへい' },
  { name: '官府', reading: 'かんぷ' }
];

// 流年歳前諸星の表
const saizen_stars = [
  { name: '歳建', reading: 'さいけん' },
  { name: '晦気', reading: 'かいき' },
  { name: '喪門', reading: 'そうもん' },
  { name: '貫索', reading: 'かんさく' },
  { name: '官符', reading: 'かんぷ' },
  { name: '小耗', reading: 'しょうもう' },
  { name: '大耗', reading: 'たいもう' },
  { name: '龍徳', reading: 'りゅうとく' },
  { name: '白虎', reading: 'びゃっこ' },
  { name: '天徳', reading: 'てんとく' },
  { name: '弔客', reading: 'ちょうきゃく' },
  { name: '病符', reading: 'びょうふ' }
];

// 流年将前諸星の表
const shouzen_stars = [
  { name: '将星', reading: 'しょうせい' },
  { name: '攀鞍', reading: 'はんあん' },
  { name: '歳驛', reading: 'さいえき' },
  { name: '息神', reading: 'そくしん' },
  { name: '華蓋', reading: 'かがい' },
  { name: '劫煞', reading: 'ごうさつ' },
  { name: '災煞', reading: 'さいさつ' },
  { name: '天煞', reading: 'てんさつ' },
  { name: '指背', reading: 'しはい' },
  { name: '咸池', reading: 'かんち' },
  { name: '月煞', reading: 'げっさつ' },
  { name: '亡神', reading: 'ぼうしん' }
];

//全国主要都市の時差表
// 出生地・経度補正の表
const birth_places = [
  {
    name: '釧路',
    prefecture: '北海道',
    correction: 37
  },
  {
    name: '帯広',
    prefecture: '北海道',
    correction: 32
  },
  {
    name: '旭川',
    prefecture: '北海道',
    correction: 29
  },
  {
    name: '札幌',
    prefecture: '北海道',
    correction: 25
  },
  {
    name: '青森',
    prefecture: '青森県',
    correction: 23
  },
  {
    name: '盛岡',
    prefecture: '岩手県',
    correction: 24
  },
  {
    name: '秋田',
    prefecture: '秋田県',
    correction: 20
  },
  {
    name: '仙台',
    prefecture: '宮城県',
    correction: 23
  },
  {
    name: '山形',
    prefecture: '山形県',
    correction: 21
  },
  {
    name: '福島',
    prefecture: '福島県',
    correction: 21
  },
  {
    name: '宇都宮',
    prefecture: '栃木県',
    correction: 19
  },
  {
    name: '前橋',
    prefecture: '群馬県',
    correction: 16
  },
  {
    name: '水戸',
    prefecture: '茨城県',
    correction: 21
  },
  {
    name: 'さいたま',
    prefecture: '埼玉県',
    correction: 18
  },
  {
    name: '千葉',
    prefecture: '千葉県',
    correction: 20
  },
  {
    name: '東京',
    prefecture: '東京都',
    correction: 19
  },
  {
    name: '横浜',
    prefecture: '神奈川県',
    correction: 18
  },
  {
    name: '新潟',
    prefecture: '新潟県',
    correction: 16
  },
  {
    name: '富山',
    prefecture: '富山県',
    correction: 8
  },
  {
    name: '金沢',
    prefecture: '石川県',
    correction: 6
  },
  {
    name: '福井',
    prefecture: '福井県',
    correction: 4
  },
  {
    name: '長野',
    prefecture: '長野県',
    correction: 12
  },
  {
    name: '甲府',
    prefecture: '山梨県',
    correction: 14
  },
  {
    name: '静岡',
    prefecture: '静岡県',
    correction: 13
  },
  {
    name: '岐阜',
    prefecture: '岐阜県',
    correction: 7
  },
  {
    name: '名古屋',
    prefecture: '愛知県',
    correction: 7
  },
  {
    name: '大津',
    prefecture: '滋賀県',
    correction: 3
  },
  {
    name: '津',
    prefecture: '三重県',
    correction: 6
  },
  {
    name: '京都',
    prefecture: '京都府',
    correction: 3
  },
  {
    name: '大阪',
    prefecture: '大阪府',
    correction: 2
  },
  {
    name: '奈良',
    prefecture: '奈良県',
    correction: 3
  },
  {
    name: '和歌山',
    prefecture: '和歌山県',
    correction: 0
  },
  {
    name: '神戸',
    prefecture: '兵庫県',
    correction: 0
  },
  {
    name: '鳥取',
    prefecture: '鳥取県',
    correction: -3
  },
  {
    name: '松江',
    prefecture: '島根県',
    correction: -7
  },
  {
    name: '岡山',
    prefecture: '岡山県',
    correction: -4
  },
  {
    name: '広島',
    prefecture: '広島県',
    correction: -10
  },
  {
    name: '山口',
    prefecture: '山口県',
    correction: -14
  },
  {
    name: '徳島',
    prefecture: '徳島県',
    correction: -1
  },
  {
    name: '高松',
    prefecture: '香川県',
    correction: -3
  },
  {
    name: '松山',
    prefecture: '愛媛県',
    correction: -8
  },
  {
    name: '高知',
    prefecture: '高知県',
    correction: -5
  },
  {
    name: '福岡',
    prefecture: '福岡県',
    correction: -18
  },
  {
    name: '大分',
    prefecture: '大分県',
    correction: -13
  },
  {
    name: '佐賀',
    prefecture: '佐賀県',
    correction: -18
  },
  {
    name: '長崎',
    prefecture: '長崎県',
    correction: -20
  },
  {
    name: '熊本',
    prefecture: '熊本県',
    correction: -17
  },
  {
    name: '宮崎',
    prefecture: '宮崎県',
    correction: -14
  },
  {
    name: '鹿児島',
    prefecture: '鹿児島県',
    correction: -17
  },
  {
    name: '那覇',
    prefecture: '沖縄県',
    correction: -29
  }
];


// 天干四化星の表
const heavenly_stem_transformations = [
  {
    stem: '甲',
    reading: 'こう',
    hua: {
      lu: '廉貞',
      quan: '破軍',
      ke: '武曲',
      ji: '太陽'
    }
  },
  {
    stem: '乙',
    reading: 'おつ',
    hua: {
      lu: '天機',
      quan: '天梁',
      ke: '紫微',
      ji: '太陰'
    }
  },
  {
    stem: '丙',
    reading: 'へい',
    hua: {
      lu: '天同',
      quan: '天機',
      ke: '文昌',
      ji: '廉貞'
    }
  },
  {
    stem: '丁',
    reading: 'てい',
    hua: {
      lu: '太陰',
      quan: '天同',
      ke: '天機',
      ji: '巨門'
    }
  },
  {
    stem: '戊',
    reading: 'ぼ',
    hua: {
      lu: '貪狼',
      quan: '太陰',
      ke: '右弼',
      ji: '天機'
    }
  },
  {
    stem: '己',
    reading: 'き',
    hua: {
      lu: '武曲',
      quan: '貪狼',
      ke: '天梁',
      ji: '文曲'
    }
  },
  {
    stem: '庚',
    reading: 'こう',
    hua: {
      lu: '太陽',
      quan: '武曲',
      ke: '太陰',
      ji: '天同'
    }
  },
  {
    stem: '辛',
    reading: 'しん',
    hua: {
      lu: '巨門',
      quan: '太陽',
      ke: '文曲',
      ji: '文昌'
    }
  },
  {
    stem: '壬',
    reading: 'じん',
    hua: {
      lu: '天梁',
      quan: '紫微',
      ke: '左輔',
      ji: '武曲'
    }
  },
  {
    stem: '癸',
    reading: 'き',
    hua: {
      lu: '破軍',
      quan: '巨門',
      ke: '太陰',
      ji: '貪狼'
    }
  }
];

// 12宮
const palacePositions = [
  '巳', '午', '未', '申',
  '辰', null, null, '酉',
  '卯', null, null, '戌',
  '寅', '丑', '子', '亥'
];

// 中央の空白がない12宮
const palaceBranches = [
  '巳', '午', '未', '申',
  '酉', '戌', '亥', '子',
  '丑', '寅', '卯', '辰'
];

const positive_negative = [
  {name: '陰'},
  {name: '陽'}
];

const tigerStartStem = {
  '甲': '丙',
  '乙': '戊',
  '丙': '庚',
  '丁': '壬',
  '戊': '甲',
  '己': '丙',
  '庚': '戊',
  '辛': '庚',
  '壬': '壬',
  '癸': '甲'
};

//五行局
const fiveElementTable = {
  '甲己': {
    '子丑': '水',
    '寅卯': '火',
    '辰巳': '木',
    '午未': '土',
    '申酉': '金',
    '戌亥': '火'
  },

  '乙庚': {
    '子丑': '火',
    '寅卯': '土',
    '辰巳': '金',
    '午未': '木',
    '申酉': '水',
    '戌亥': '土'
  },

  '丙辛': {
    '子丑': '土',
    '寅卯': '木',
    '辰巳': '水',
    '午未': '金',
    '申酉': '火',
    '戌亥': '木'
  },

  '丁壬': {
    '子丑': '木',
    '寅卯': '金',
    '辰巳': '火',
    '午未': '水',
    '申酉': '土',
    '戌亥': '金'
  },

  '戊癸': {
    '子丑': '金',
    '寅卯': '水',
    '辰巳': '土',
    '午未': '火',
    '申酉': '木',
    '戌亥': '水'
  }
};

const fiveElementNumber = {
  '水': '水二局',
  '木': '木三局',
  '金': '金四局',
  '土': '土五局',
  '火': '火六局'
};

const stemGroups = {
  '甲': '甲己',
  '己': '甲己',

  '乙': '乙庚',
  '庚': '乙庚',

  '丙': '丙辛',
  '辛': '丙辛',

  '丁': '丁壬',
  '壬': '丁壬',

  '戊': '戊癸',
  '癸': '戊癸'
};

const branchGroups = {
  '子': '子丑',
  '丑': '子丑',

  '寅': '寅卯',
  '卯': '寅卯',

  '辰': '辰巳',
  '巳': '辰巳',

  '午': '午未',
  '未': '午未',

  '申': '申酉',
  '酉': '申酉',

  '戌': '戌亥',
  '亥': '戌亥'
};

//五局での始まる年齢
const fiveElementStartAge = {
  '水二局': 2,
  '木三局': 3,
  '金四局': 4,
  '土五局': 5,
  '火六局': 6
};

//紫微星の宮
const ziweiTable = {

  '水二局': {
    1: '丑',
    2: '寅',
    3: '寅',
    4: '卯',
    5: '卯',
    6: '辰',
    7: '辰',
    8: '巳',
    9: '巳',
    10: '午',
    11: '午',
    12: '未',
    13: '未',
    14: '申',
    15: '申',
    16: '酉',
    17: '酉',
    18: '戌',
    19: '戌',
    20: '亥',
    21: '亥',
    22: '子',
    23: '子',
    24: '丑',
    25: '丑',
    26: '寅',
    27: '寅',
    28: '卯',
    29: '卯',
    30: '辰'
  },

  '木三局': {
    1: '辰',
    2: '丑',
    3: '寅',
    4: '巳',
    5: '宙',　// これから問い合わせてくれる
    6: '卯',
    7: '午',
    8: '卯',
    9: '辰',
    10: '未',
    11: '辰',
    12: '巳',
    13: '申',
    14: '巳',
    15: '午',
    16: '酉',
    17: '午',
    18: '未',
    19: '戌',
    20: '未',
    21: '申',
    22: '亥',
    23: '申',
    24: '酉',
    25: '子',
    26: '酉',
    27: '戌',
    28: '丑',
    29: '戌',
    30: '亥'
  },

  '金四局': {
    1: '亥',
    2: '辰',
    3: '丑',
    4: '寅',
    5: '子',
    6: '巳',
    7: '寅',
    8: '卯',
    9: '丑',
    10: '午',
    11: '卯',
    12: '辰',
    13: '寅',
    14: '未',
    15: '辰',
    16: '巳',
    17: '卯',
    18: '申',
    19: '巳',
    20: '午',
    21: '辰',
    22: '酉',
    23: '午',
    24: '未',
    25: '巳',
    26: '戌',
    27: '未',
    28: '申',
    29: '午',
    30: '亥'
  },

  '土五局': {
    1: '午',
    2: '亥',
    3: '辰',
    4: '丑',
    5: '寅',
    6: '未',
    7: '子',
    8: '巳',
    9: '寅',
    10: '卯',
    11: '申',
    12: '丑',
    13: '午',
    14: '卯',
    15: '辰',
    16: '酉',
    17: '寅',
    18: '未',
    19: '辰',
    20: '巳',
    21: '戌',
    22: '卯',
    23: '申',
    24: '巳',
    25: '午',
    26: '亥',
    27: '辰',
    28: '酉',
    29: '午',
    30: '未'
  },

  '火六局': {
    1: '酉',
    2: '午',
    3: '亥',
    4: '辰',
    5: '丑',
    6: '寅',
    7: '戌',
    8: '未',
    9: '子',
    10: '巳',
    11: '寅',
    12: '卯',
    13: '亥',
    14: '申',
    15: '丑',
    16: '午',
    17: '卯',
    18: '辰',
    19: '子',
    20: '酉',
    21: '寅',
    22: '未',
    23: '辰',
    24: '巳',
    25: '丑',
    26: '戌',
    27: '卯',
    28: '申',
    29: '巳',
    30: '午'
  }

};

// 時系統の諸星表（火星、鈴星）
const fireBellStarTable = {

  // 寅・午・戌年
  '寅午戌': {
    '子': { '火星': '丑', '鈴星': '卯' },
    '丑': { '火星': '寅', '鈴星': '辰' },
    '寅': { '火星': '卯', '鈴星': '巳' },
    '卯': { '火星': '辰', '鈴星': '午' },
    '辰': { '火星': '巳', '鈴星': '未' },
    '巳': { '火星': '午', '鈴星': '申' },
    '午': { '火星': '未', '鈴星': '酉' },
    '未': { '火星': '申', '鈴星': '戌' },
    '申': { '火星': '酉', '鈴星': '亥' },
    '酉': { '火星': '戌', '鈴星': '子' },
    '戌': { '火星': '亥', '鈴星': '丑' },
    '亥': { '火星': '子', '鈴星': '寅' }
  },

  // 申・子・辰年
  '申子辰': {
    '子': { '火星': '寅', '鈴星': '戌' },
    '丑': { '火星': '卯', '鈴星': '亥' },
    '寅': { '火星': '辰', '鈴星': '子' },
    '卯': { '火星': '巳', '鈴星': '丑' },
    '辰': { '火星': '午', '鈴星': '寅' },
    '巳': { '火星': '未', '鈴星': '卯' },
    '午': { '火星': '申', '鈴星': '辰' },
    '未': { '火星': '酉', '鈴星': '巳' },
    '申': { '火星': '戌', '鈴星': '午' },
    '酉': { '火星': '亥', '鈴星': '未' },
    '戌': { '火星': '子', '鈴星': '申' },
    '亥': { '火星': '丑', '鈴星': '酉' }
  },

  // 巳・酉・丑年
  '巳酉丑': {
    '子': { '火星': '卯', '鈴星': '戌' },
    '丑': { '火星': '辰', '鈴星': '亥' },
    '寅': { '火星': '巳', '鈴星': '子' },
    '卯': { '火星': '午', '鈴星': '丑' },
    '辰': { '火星': '未', '鈴星': '寅' },
    '巳': { '火星': '申', '鈴星': '卯' },
    '午': { '火星': '酉', '鈴星': '辰' },
    '未': { '火星': '戌', '鈴星': '巳' },
    '申': { '火星': '亥', '鈴星': '午' },
    '酉': { '火星': '子', '鈴星': '未' },
    '戌': { '火星': '丑', '鈴星': '申' },
    '亥': { '火星': '寅', '鈴星': '酉' }
  },

  // 亥・卯・未年
  '亥卯未': {
    '子': { '火星': '酉', '鈴星': '戌' },
    '丑': { '火星': '戌', '鈴星': '亥' },
    '寅': { '火星': '亥', '鈴星': '子' },
    '卯': { '火星': '子', '鈴星': '丑' },
    '辰': { '火星': '丑', '鈴星': '寅' },
    '巳': { '火星': '寅', '鈴星': '卯' },
    '午': { '火星': '卯', '鈴星': '辰' },
    '未': { '火星': '辰', '鈴星': '巳' },
    '申': { '火星': '巳', '鈴星': '午' },
    '酉': { '火星': '午', '鈴星': '未' },
    '戌': { '火星': '未', '鈴星': '申' },
    '亥': { '火星': '申', '鈴星': '酉' }
  }

};


// 五行局ごとの長生開始位置
const changshengStart = {

  '水二局': '申',
  '木三局': '亥',
  '金四局': '巳',  
  '土五局': '申',
  '火六局': '寅'
};

const mainStarTable = {
  '子': {
    '子': ['紫微'],
    '丑': [],
    '寅': ['破軍'],
    '卯': [],
    '辰': ['廉貞', '天府'],
    '巳': ['太陰'],
    '午': ['貪狼'],
    '未': ['天同', '巨門'],
    '申': ['武曲', '天相'],
    '酉': ['太陽', '天梁'],
    '戌': ['七殺'],
    '亥': ['天機']
  },

  '丑': {
    '子': ['天機'],
    '丑': ['紫微', '破軍'],
    '寅': [],
    '卯': ['天府'],
    '辰': ['太陰'],
    '巳': ['廉貞', '貪狼'],
    '午': ['巨門'],
    '未': ['天相'],
    '申': ['天同', '天梁'],
    '酉': ['武曲', '七殺'],
    '戌': ['太陽'],
    '亥': []
  },

  '寅': {
    '子': ['破軍'],
    '丑': ['天機'],
    '寅': ['紫微', '天府'],
    '卯': ['太陰'],
    '辰': ['貪狼'],
    '巳': ['巨門'],
    '午': ['廉貞', '天相'],
    '未': ['天梁'],
    '申': ['七殺'],
    '酉': ['天同'],
    '戌': ['武曲'],
    '亥': ['太陽']
  },

  '卯': {
    '子': ['太陽'],
    '丑': ['天府'],
    '寅': ['天機', '太陰'],
    '卯': ['紫微', '貪狼'],
    '辰': ['巨門'],
    '巳': ['天相'],
    '午': ['天梁'],
    '未': ['廉貞', '七殺'],
    '申': [],
    '酉': [],
    '戌': ['天同'],
    '亥': ['武曲', '破軍']
  },

  '辰': {
    '子': ['武曲', '天府'],
    '丑': ['太陽', '太陰'],
    '寅': ['貪狼'],
    '卯': ['天機', '巨門'],
    '辰': ['紫微', '天相'],
    '巳': ['天梁'],
    '午': ['七殺'],
    '未': [],
    '申': ['廉貞'],
    '酉': [],
    '戌': ['破軍'],
    '亥': ['天同']
  },

  '巳': {
    '子': ['天同', '太陰'],
    '丑': ['武曲', '貪狼'],
    '寅': ['太陽', '巨門'],
    '卯': ['天相'],
    '辰': ['天機', '天梁'],
    '巳': ['紫微', '七殺'],
    '午': [],
    '未': [],
    '申': [],
    '酉': ['廉貞', '破軍'],
    '戌': [],
    '亥': ['天府']
  },

  '午': {
    '子': ['貪狼'],
    '丑': ['天同', '巨門'],
    '寅': ['武曲', '天相'],
    '卯': ['太陽', '天梁'],
    '辰': ['七殺'],
    '巳': ['天機'],
    '午': ['紫微'],
    '未': [],
    '申': ['破軍'],
    '酉': [],
    '戌': ['廉貞', '天府'],
    '亥': ['太陰']
  },

  '未': {
    '子': ['巨門'],
    '丑': ['天相'],
    '寅': ['天同', '天梁'],
    '卯': ['武曲', '七殺'],
    '辰': ['太陽'],
    '巳': [],
    '午': ['天機'],
    '未': ['紫微', '破軍'],
    '申': [],
    '酉': ['天府'],
    '戌': ['太陰'],
    '亥': ['廉貞', '貪狼']
  },

  '申': {
    '子': ['廉貞', '天相'],
    '丑': ['天梁'],
    '寅': ['七殺'],
    '卯': ['天同'],
    '辰': ['武曲'],
    '巳': ['太陽'],
    '午': ['破軍'],
    '未': ['天機'],
    '申': ['紫微', '天府'],
    '酉': ['太陰'],
    '戌': ['貪狼'],
    '亥': ['巨門']
  },

  '酉': {
    '子': ['天梁'],
    '丑': ['廉貞', '七殺'],
    '寅': [],
    '卯': [],
    '辰': ['天同'],
    '巳': ['武曲', '破軍'],
    '午': ['太陽'],
    '未': ['天府'],
    '申': ['天機', '太陰'],
    '酉': ['紫微', '貪狼'],
    '戌': ['巨門'],
    '亥': ['天相']
  },

  '戌': {
    '子': ['七殺'],
    '丑': [],
    '寅': ['廉貞'],
    '卯': [],
    '辰': ['破軍'],
    '巳': ['天同'],
    '午': ['武曲', '天府'],
    '未': ['太陰', '太陽'],
    '申': ['貪狼'],
    '酉': ['天機', '巨門'],
    '戌': ['紫微', '天相'],
    '亥': ['天梁']
  },

  '亥': {
    '子': [],
    '丑': [],
    '寅': [],
    '卯': ['廉貞', '破軍'],
    '辰': [],
    '巳': ['天府'],
    '午': ['天同', '太陰'],
    '未': ['武曲', '貪狼'],
    '申': ['太陽', '巨門'],
    '酉': ['天相'],
    '戌': ['天機', '天梁'],
    '亥': ['紫微', '七殺']
  }
};


/* ===== 主星一覧レンダリング ===== */
function renderStarsGrid() {
  const grid = document.getElementById('starsGrid');
}

    const birthplace_select = document.getElementById('birthplace');
    birth_places.forEach(place => {
      const option = document.createElement('option');

      option.value = place.name;
      option.textContent = `${place.prefecture}・${place.name}`;

      birthplace_select.appendChild(option);
    });

    birthplace_select.addEventListener('change', () => {
    console.log(birthplace_select.value);
  });



/* ===== 命盤生成（簡易シミュレーション） ===== */
function generateChart() {
  const date   = document.getElementById('birthdate').value;
  const time   = Number(document.getElementById('birthtime').value);
  const gender = document.querySelector('input[name="gender"]:checked');
  
  //西暦のみ抽出 
  const birthDate = new Date(date);
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  if (!date || time === '' || !gender) {
    alert('すべての項目を入力してください。');
    return;
  }

  // 新暦→旧暦変換
  const lunar = Lunar.fromDate(new Date(date));
  const lunarMonth = lunar.getMonth();
  const lunarDay = lunar.getDay();
  const lunarYear = lunar.getYear();
  console.log(lunarMonth,lunarDay,lunarYear);

  // 天干地支変換
  a = (year -3) % 60;
  heavenly_stems = a % 10;
  earthly_branchs = a % 12;
    if(heavenly_stems != 0){
      console.log(`天干 ${heavenly_stem_transformations[heavenly_stems-1].stem}`);
      correct_stem = heavenly_stems-1;
    }
    else{
      console.log(`天干 heavenly_stem_transformations[heavenly_stems].stem`);
      correct_stem = heavenly_stems;
    }

    if(earthly_branchs != 0){
      console.log(`地支 ${year_branches[earthly_branchs-1].name}`);
      correct_branchs = earthly_branchs-1;
    }
    else{
      console.log(`地支 ${year_branches[earthly_branchs].name}`);
      correct_branchs = earthly_branchs;
    }


    // 時差取得
    const birthplace = document.getElementById('birthplace').value;

    const selected_place = birth_places.find(
      place => place.name === birthplace
    );
    console.log(selected_place.correction);

    // 時間(hour) 分(minute)取得
    const birthtime = document.getElementById('birthTime').value;
    const [hour, minute] = birthtime.split(':').map(Number);
    console.log(hour);   // 14
    console.log(minute); // 35

    //時差から正確な12刻取得
    if(minute + selected_place.correction >= 60){
      console.log(`${year_branches[time+1].name}刻`);
      correct_time = time+1;
    }
    else{
      console.log(`${year_branches[time].name}刻`);
      correct_time = time;
    }

    //陰陽の男女区別
    gender_1 = document.querySelector('input[name="gender"]:checked');
    if(correct_stem % 2 == 0){
      attribute = '陽';
    }
    else{
      attribute = '陰';
    }
    if(gender_1.value == 'male'){
      gender_2 = '男';
    }
    else{
      gender_2 = '女';
    }
    console.log(`attribute = ${attribute}`);
    console.log(`gender_2 = ${gender_2}`);

    //命宮、身宮特定
switch (lunarMonth) {
  case 1:
    life_start = 2;  // 寅
    break;

  case 2:
    life_start = 3;  // 卯
    break;

  case 3:
    life_start = 4;  // 辰
    break;

  case 4:
    life_start = 5;  // 巳
    break;

  case 5:
    life_start = 6;  // 午
    break;

  case 6:
    life_start = 7;  // 未
    break;

  case 7:
    life_start = 8;  // 申
    break;

  case 8:
    life_start = 9;  // 酉
    break;

  case 9:
    life_start = 10; // 戌
    break;

  case 10:
    life_start = 11; // 亥
    break;

  case 11:
    life_start = 0;  // 子
    break;

  case 12:
    life_start = 1;  // 丑
    break;
}
const life_index = (life_start - correct_time + 12) % 12;
const body_index = (life_start + correct_time) % 12;

console.log(life_index);
console.log(body_index);

const life_branch = year_branches[life_index].name;
const body_branch = year_branches[body_index].name;
const life_position = palacePositions.indexOf(life_branch);
const body_position = palacePositions.indexOf(body_branch);
console.log('命宮:', life_branch);
console.log('命宮の盤上位置:', life_position);

console.log('身宮:', body_branch);
console.log('身宮の盤上位置:', body_position);

//命宮起点とした12宮
const life_position_2 = palaceBranches.indexOf(life_branch);
console.log(life_position_2);
const palaceAssignment = [];

for (let i = 0; i < 12; i++) {

  const position = (life_position_2 - i + 12) % 12;

  palaceAssignment.push({
    palace: PALACES[i],
    branch: palaceBranches[position]
  });
  console.log(PALACES[i]);
  console.log(palaceBranches[position]);
}

//生年天干と宮干
const startStem = tigerStartStem[heavenly_stem_transformations[correct_stem].stem];
console.log(startStem); //寅宮に入る宮がはいる
const startStemIndex =
  heavenly_stem_transformations.findIndex(
    item => item.stem === startStem
  );
palaceAssignment.forEach(item => {

  const branchIndex = palaceBranches.indexOf(item.branch);
  const tigerIndex = palaceBranches.indexOf('寅');

  const diff = (branchIndex - tigerIndex + 12) % 12;

  const stemIndex = (startStemIndex + diff) % 10;

  item.stem =
    heavenly_stem_transformations[stemIndex].stem;

});

//five_element = getFiveElement()


    /* htmlに出力だが、いったんこれはコメントアウト
    const calculationResult = document.getElementById('calculationresult');
    calculationResult.innerHTML = `
      <p>西暦 : ${year}年 ${heavenly_stem_transformations[correct_stem].stem}${year_branches[correct_branchs].name}年
      <p>旧暦 : ${lunarYear}年 ${lunarMonth}月 ${lunarDay}日 ${year_branches[correct_time].name}刻</p>
      <p>新暦 : ${month}月 ${day}日 ${hour}時 ${minute}分生まれ
    `;
    */

  // 生年月日から簡易的に命宮インデックスを算出
  const d = new Date(date);
  const monthIndex = d.getMonth(); // 0-11
  const timeIndex  = parseInt(time);
  const mainPalaceIndex = (monthIndex + timeIndex) % 12;

  // 星をランダムに12宮へ配置（シード付き擬似乱数）
  const seed = d.getFullYear() + d.getMonth() * 100 + d.getDate() + timeIndex;
  const rng  = seededRandom(seed);
  const shuffled = [...STARS_DATA].sort(() => rng() - 0.5);
  const assignment = PALACES.map((name, i) => ({
    palace: name,
    star:   shuffled[i % shuffled.length].name,
    highlight: i === mainPalaceIndex
  }));

  /*
  // 結果グリッド  ここはサンプルなのでいったんコメントアウト
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = assignment.map(p => `
    <div class="palace-cell ${p.highlight ? 'highlight' : ''}">
      <div class="palace-name">${p.palace}</div>
      <div class="palace-star">${p.star}</div>
    </div>
  `).join('');

  */



const grid = document.getElementById('resultGrid');

// 命宮を取得
const lifePalace = palaceAssignment.find(
  item => item.branch === life_branch
);

console.log('lifePalace:', lifePalace);

const birthStem =
  heavenly_stem_transformations[correct_stem].stem;

const lifeBranch = lifePalace.branch;

const fiveElement =
  getFiveElement(birthStem, lifeBranch);

console.log(`局${fiveElement}`);


// 大限を起こす年齢幅を特定
const daLimits = [];

// 陽男・陰女 → 時計回り
// 陰男・陽女 → 反時計回り
const direction =
  (attribute === '陽' && gender_2 === '男') ||
  (attribute === '陰' && gender_2 === '女')
    ? 1
    : -1;

console.log(`direction = ${direction}`);
// 命宮の12宮配列上の位置
const lifeBranchIndex = palaceBranches.indexOf(life_branch);


for (let i = 0; i < 12; i++) {

  // 年齢
  const startAge = fiveElementStartAge[fiveElement] + i * 10;
  const endAge = startAge + 9;

  // 大限が入る地支
  const branchIndex =
    (lifeBranchIndex + i * direction + 12) % 12;

  const branch = palaceBranches[branchIndex];

  // その地支の十二宮を取得
  const palace = palaceAssignment.find(
    item => item.branch === branch
  );

  daLimits.push({
    startAge,
    endAge,
    branch,
    palace: palace?.palace ?? ''
  });
}
console.log('===== 大限 DEBUG =====');

daLimits.forEach(limit => {
  console.log(
    `${limit.startAge}～${limit.endAge}歳`,
    limit.branch,
    limit.palace
  );
});

// 紫微星取得
const ziweiBranch = ziweiTable[fiveElement][lunarDay];

console.log('五行局:', fiveElement);
console.log('旧暦日:', lunarDay);
console.log('紫微星の地支:', ziweiBranch);


// 年干系統の諸星表取得
const yearStem = heavenly_stem_transformations[correct_stem].stem;

const yearStars = yearStemStarPositions[yearStem];

console.log(yearStem);
console.log(yearStars);


// 年支系統の諸星表取得
const yearBranch =
  year_branches[correct_branchs].name;

// 身宮の位置を取得
const shenIndex = palaceBranches.indexOf(body_branch);

// 出生年の地支を取得
const BirthYearBranch = year_branches[correct_branchs].name;

// 出生年の地支のインデックス
const birthYearIndex = year_branches.findIndex(
  branch => branch.name === BirthYearBranch
);

// 天寿の配置位置
const tenjuIndex = (shenIndex + birthYearIndex) % 12;

// 天寿の配置先
const tenjuBranch = palaceBranches[tenjuIndex];

console.log('生年天干:', yearStem);
console.log('生年地支:', yearBranch);
const branchStars =
  earthlyBranchStarPosition[yearBranch];
console.log('年支系統:', branchStars);

// 月系統の諸星表取得
let monthStarPositions = {};

switch (lunarMonth) {

  case 1:
    monthStarPositions = {
      '左輔': '辰',
      '右弼': '戌',
      '天刑': '酉',
      '天姚': '丑',
      '解神': '申',
      '天巫': '巳',
      '天月': '戌',
      '陰煞': '寅'
    };
    break;

  case 2:
    monthStarPositions = {
      '左輔': '巳',
      '右弼': '酉',
      '天刑': '戌',
      '天姚': '寅',
      '解神': '申',
      '天巫': '申',
      '天月': '巳',
      '陰煞': '子'
    };
    break;

  case 3:
    monthStarPositions = {
      '左輔': '午',
      '右弼': '申',
      '天刑': '亥',
      '天姚': '卯',
      '解神': '戌',
      '天巫': '寅',
      '天月': '辰',
      '陰煞': '戌'
    };
    break;

  case 4:
    monthStarPositions = {
      '左輔': '未',
      '右弼': '未',
      '天刑': '子',
      '天姚': '辰',
      '解神': '戌',
      '天巫': '亥',
      '天月': '寅',
      '陰煞': '申'
    };
    break;

  case 5:
    monthStarPositions = {
      '左輔': '申',
      '右弼': '午',
      '天刑': '丑',
      '天姚': '巳',
      '解神': '子',
      '天巫': '巳',
      '天月': '未',
      '陰煞': '午'
    };
    break;

  case 6:
    monthStarPositions = {
      '左輔': '酉',
      '右弼': '巳',
      '天刑': '寅',
      '天姚': '午',
      '解神': '子',
      '天巫': '申',
      '天月': '卯',
      '陰煞': '辰'
    };
    break;

  case 7:
    monthStarPositions = {
      '左輔': '戌',
      '右弼': '辰',
      '天刑': '卯',
      '天姚': '未',
      '解神': '寅',
      '天巫': '寅',
      '天月': '亥',
      '陰煞': '寅'
    };
    break;

  case 8:
    monthStarPositions = {
      '左輔': '亥',
      '右弼': '卯',
      '天刑': '辰',
      '天姚': '申',
      '解神': '寅',
      '天巫': '亥',
      '天月': '未',
      '陰煞': '子'
    };
    break;

  case 9:
    monthStarPositions = {
      '左輔': '子',
      '右弼': '寅',
      '天刑': '巳',
      '天姚': '酉',
      '解神': '辰',
      '天巫': '巳',
      '天月': '寅',
      '陰煞': '戌'
    };
    break;

  case 10:
    monthStarPositions = {
      '左輔': '丑',
      '右弼': '丑',
      '天刑': '午',
      '天姚': '戌',
      '解神': '辰',
      '天巫': '申',
      '天月': '午',
      '陰煞': '申'
    };
    break;

  case 11:
    monthStarPositions = {
      '左輔': '寅',
      '右弼': '子',
      '天刑': '未',
      '天姚': '亥',
      '解神': '午',
      '天巫': '寅',
      '天月': '戌',
      '陰煞': '午'
    };
    break;

  case 12:
    monthStarPositions = {
      '左輔': '卯',
      '右弼': '亥',
      '天刑': '申',
      '天姚': '子',
      '解神': '午',
      '天巫': '亥',
      '天月': '寅',
      '陰煞': '辰'
    };
    break;
  default:
    break;
}
console.log('===== 月系統 DEBUG =====');
console.log('旧暦月:', lunarMonth);

Object.entries(monthStarPositions).forEach(
  ([starName, branch]) => {
    console.log(`${starName} → ${branch}`);
  }
);

let hourStarPositions = {};

// 火星、鈴星以外の条件分岐
switch (year_branches[correct_time].name) {

  case '子':
    hourStarPositions = {
      '文昌': '戌',
      '文曲': '辰',
      '地空': '亥',
      '地劫': '亥',
      '台輔': '午',
      '封誥': '寅'
    };
    break;

  case '丑':
    hourStarPositions = {
      '文昌': '酉',
      '文曲': '巳',
      '地空': '戌',
      '地劫': '子',
      '台輔': '未',
      '封誥': '卯'
    };
    break;

  case '寅':
    hourStarPositions = {
      '文昌': '申',
      '文曲': '午',
      '地空': '酉',
      '地劫': '丑',
      '台輔': '申',
      '封誥': '辰'
    };
    break;

  case '卯':
    hourStarPositions = {
      '文昌': '未',
      '文曲': '未',
      '地空': '申',
      '地劫': '寅',
      '台輔': '酉',
      '封誥': '巳'
    };
    break;

  case '辰':
    hourStarPositions = {
      '文昌': '午',
      '文曲': '申',
      '地空': '未',
      '地劫': '卯',
      '台輔': '戌',
      '封誥': '午'
    };
    break;

  case '巳':
    hourStarPositions = {
      '文昌': '巳',
      '文曲': '酉',
      '地空': '午',
      '地劫': '辰',
      '台輔': '亥',
      '封誥': '未'
    };
    break;

  case '午':
    hourStarPositions = {
      '文昌': '辰',
      '文曲': '戌',
      '地空': '巳',
      '地劫': '巳',
      '台輔': '子',
      '封誥': '申'
    };
    break;

  case '未':
    hourStarPositions = {
      '文昌': '卯',
      '文曲': '亥',
      '地空': '辰',
      '地劫': '午',
      '台輔': '丑',
      '封誥': '酉'
    };
    break;

  case '申':
    hourStarPositions = {
      '文昌': '寅',
      '文曲': '子',
      '地空': '卯',
      '地劫': '未',
      '台輔': '寅',
      '封誥': '戌'
    };
    break;

  case '酉':
    hourStarPositions = {
      '文昌': '丑',
      '文曲': '丑',
      '地空': '寅',
      '地劫': '申',
      '台輔': '卯',
      '封誥': '亥'
    };
    break;

  case '戌':
    hourStarPositions = {
      '文昌': '子',
      '文曲': '寅',
      '地空': '丑',
      '地劫': '酉',
      '台輔': '辰',
      '封誥': '子'
    };
    break;

  case '亥':
    hourStarPositions = {
      '文昌': '亥',
      '文曲': '卯',
      '地空': '子',
      '地劫': '戌',
      '台輔': '巳',
      '封誥': '丑'
    };
    break;
}


let fireBellGroup;
// 火星、鈴星の条件分岐
switch (year_branches[correct_branchs].name) {
  case '寅':
  case '午':
  case '戌':
    fireBellGroup = '寅午戌';
    break;

  case '申':
  case '子':
  case '辰':
    fireBellGroup = '申子辰';
    break;

  case '巳':
  case '酉':
  case '丑':
    fireBellGroup = '巳酉丑';
    break;

  case '亥':
  case '卯':
  case '未':
    fireBellGroup = '亥卯未';
    break;
}

console.log('時系統の諸星:', hourStarPositions);

for (const [star, palace] of Object.entries(hourStarPositions)) {
  console.log(`${star} → ${palace}`);
}

console.log('==============================');

const fireBellStars =
  fireBellStarTable[fireBellGroup][year_branches[correct_time].name];

console.log('year_branches[correct_time].name:',year_branches[correct_branchs].name);
console.log('火星:', fireBellStars['火星']);
console.log('鈴星:', fireBellStars['鈴星']);


// 起点となる星のインデックス
const zuofuIndex = palaceBranches.indexOf(monthStarPositions['左輔']);
const youbiIndex = palaceBranches.indexOf(monthStarPositions['右弼']);

const bunsyoIndex = palaceBranches.indexOf(hourStarPositions['文昌']);
const bunkyokuIndex = palaceBranches.indexOf(hourStarPositions['文曲']);

// 三台：左輔から時計回り
const santaiIndex = (zuofuIndex + lunarDay - 1) % 12;

// 八座：右弼から反時計回り
const bazIndex = (youbiIndex - (lunarDay - 1) + 36) % 12;

// 恩光：文昌から時計回りに数えて1宮戻る
const onkoIndex = (bunsyoIndex + lunarDay - 2 + 12) % 12;

// 天貴：文曲から時計回りに数えて1宮戻る
const tenkiIndex = (bunkyokuIndex + lunarDay - 2 + 12) % 12;

// 配置先の地支
const santaiBranch = palaceBranches[santaiIndex];
const bazBranch = palaceBranches[bazIndex];
const onkoBranch = palaceBranches[onkoIndex];
const tenkiBranch = palaceBranches[tenkiIndex];

const additionalStarPositions = {
  '三台': santaiBranch,
  '八座': bazBranch,
  '恩光': onkoBranch,
  '天貴': tenkiBranch,
  '天寿': tenjuBranch
};
// 八座のデバッグ
console.log('--- 八座 DEBUG ---');
console.log('旧暦の日付:', lunarDay);
console.log('右弼の位置:', monthStarPositions['右弼']);
console.log('右弼Index:', youbiIndex);
console.log('八座Index:', bazIndex);
console.log('八座の配置先:', bazBranch);

// 天貴のデバッグ
console.log('--- 天貴 DEBUG ---');
console.log('旧暦の日付:', lunarDay);
console.log('文曲の位置:', hourStarPositions['文曲']);
console.log('文曲Index:', bunkyokuIndex);
console.log('天貴Index:', tenkiIndex);
console.log('天貴の配置先:', tenkiBranch);


// 長生十二神の表取得
// 長生十二神の配置
let changshengPositions = {};

const startBranch = changshengStart[fiveElement];

if (startBranch) {

const startIndex = year_branches.findIndex(
  branch => branch.name === startBranch
);
  // 陽男・陰女 → 順回り
  // 陰男・陽女 → 逆回り

  const isForward =
    (attribute === '陽' && gender_2 === '男') ||
    (attribute === '陰' && gender_2 === '女');

  changshengStars.forEach((star, index) => {

    const branchIndex = isForward
      ? (startIndex + index) % 12
      : (startIndex - index + 12) % 12;

    changshengPositions[star.name] = year_branches[branchIndex].name;

  });

}

console.log('===== 長生十二神 =====');

changshengStars.forEach(star => {
  console.log(`${star.name} → ${changshengPositions[star.name]}`);
});


// 博士十二星の表取得
// ========================================
let doctorStarPositions = {};

// 禄存の宮を取得
const rokuzonBranch = yearStars['禄存'];

if (rokuzonBranch) {

  const rokuzonIndex = year_branches.findIndex(
    branch => branch.name === rokuzonBranch
  );

  // 陽男・陰女 → 時計回り
  // 陰男・陽女 → 反時計回り
  const isClockwise =
    (attribute === '陽' && gender_2 === '男') ||
    (attribute === '陰' && gender_2 === '女');

  doctor_stars.forEach((star, index) => {

    const branchIndex = isClockwise
      ? (rokuzonIndex + index) % 12
      : (rokuzonIndex - index + 12) % 12;

    doctorStarPositions[star.name] =
      year_branches[branchIndex].name;

  });
}
console.log('===== 博士十二星 =====');

doctor_stars.forEach(star => {
  console.log(
    `${star.name} → ${doctorStarPositions[star.name]}`
  );
});

// 小限宮の表取得
// ========================================
// 小限宮
// ========================================

const shogenStart = {
  '寅午戌': '辰',
  '申子辰': '戌',
  '巳酉丑': '未',
  '亥卯未': '丑'
};

const shogenGroups = {
  '寅': '寅午戌',
  '午': '寅午戌',
  '戌': '寅午戌',

  '申': '申子辰',
  '子': '申子辰',
  '辰': '申子辰',

  '巳': '巳酉丑',
  '酉': '巳酉丑',
  '丑': '巳酉丑',

  '亥': '亥卯未',
  '卯': '亥卯未',
  '未': '亥卯未'
};


// 生年支からグループを取得
const shogenGroup = shogenGroups[year_branches[correct_branchs].name];

// 1歳の起点
const shogenStartBranch = shogenStart[shogenGroup];

const shogenStartIndex = year_branches.findIndex(
  branch => branch.name === shogenStartBranch
);

// 男 → 時計回り
// 女 → 反時計回り
const isShogenClockwise = gender_2 === '男';


// 各宮に入る数え年,小限宮の表
let shogenAges = {};

for (let age = 1; age <= 109; age++) {

const shogenIndex = isShogenClockwise
  ? (shogenStartIndex + (age - 1)) % 12
  : ((shogenStartIndex - (age - 1)) % 12 + 12) % 12;

console.log('年齢:', age);
console.log('shogenIndex:', shogenIndex);
console.log('取得データ:', year_branches[shogenIndex]);

  const branch = year_branches[shogenIndex].name;

  if (!shogenAges[branch]) {
    shogenAges[branch] = [];
  }

  shogenAges[branch].push(age);
}




// デバッグ
console.log('===== 小限宮 =====');

year_branches.forEach(branch => {
  const name = branch.name;

  console.log(
    `${name} → ${shogenAges[name]?.join(', ') ?? ''}`
  );
});


// 流年歳前諸星の表
const yearlyPreStars = [
  { name: '歳建', reading: 'さいけん' },
  { name: '晦氣', reading: 'かいき' },
  { name: '喪門', reading: 'そうもん' },
  { name: '貫索', reading: 'かんさく' },
  { name: '官符', reading: 'かんぷ' },
  { name: '小耗', reading: 'しょうもう' },
  { name: '大耗', reading: 'たいもう' },
  { name: '龍徳', reading: 'りゅうとく' },
  { name: '白虎', reading: 'びゃっこ' },
  { name: '天徳', reading: 'てんとく' },
  { name: '弔客', reading: 'ちょうきゃく' },
  { name: '病府', reading: 'びょうふ' }
];

let yearlyPreStarPositions = {};

const birthYearBranch = year_branches[correct_branchs].name;

const startIndex = year_branches.findIndex(
  branch => branch.name === birthYearBranch
);

yearlyPreStars.forEach((star, index) => {
  const branchIndex = (startIndex + index) % 12;

  yearlyPreStarPositions[star.name] =
    year_branches[branchIndex].name;
});

console.log('===== 流年歳前諸星 =====');

yearlyPreStars.forEach(star => {
  console.log(`${star.name} → ${yearlyPreStarPositions[star.name]}`);
});


const stemData = heavenly_stem_transformations.find(
  item => item.stem === heavenly_stem_transformations[correct_stem].stem
);

const transformationMap = {
  '化禄': stemData?.hua.lu,
  '化権': stemData?.hua.quan,
  '化科': stemData?.hua.ke,
  '化忌': stemData?.hua.ji
};

function addTransformation(starName) {
  const hua = Object.entries(transformationMap)
    .find(([huaName, targetStar]) => targetStar === starName);

  if (hua) {
    return `${starName}（${hua[0]}）`;
  }

  return starName;
}


// 14主星の配置
const mainStarPositions = {};

const mainStardata = mainStarTable[ziweiBranch];

if (mainStardata) {
  Object.entries(mainStardata).forEach(([branch, stars]) => {
    stars.forEach(star => {
      mainStarPositions[star] = branch;
    });
  });
}

// デバッグ
console.log('紫微の位置:', ziweiBranch);
console.log('14主星の配置:', mainStarPositions);



// 最終出力になる予定部分
// HTML出力
grid.innerHTML = palacePositions.map(palaceName => {

  // 中央4マスは空にする
  if (palaceName === null) {
    return '';
  }

// 大限出力 
const daLimit = daLimits.find(
  item => item.branch === palaceName
);  

//紫微星出力
const isZiwei = palaceName === ziweiBranch;

// palaceAssignmentから該当する地支の宮を探す
const p = palaceAssignment.find(
  item => item.branch === palaceName
);

const isMing = palaceName === life_branch;
const isShen = palaceName === body_branch;
const isZaiBo = p?.palace === '財帛';
const isKanroku = p?.palace === '官禄'
const isSeni = p?.palace === '遷移'


const palaceLabel = [...new Set([
  p?.palace,
  isMing ? '命宮' : '',
  isShen ? '身宮' : ''
].filter(Boolean))].join('・');

const starsInPalace = Object.entries(yearStars)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => {

    const hua = Object.entries(transformationMap)
      .find(([huaName, targetStar]) => targetStar === starName);

    console.log(
      '星:',
      starName,
      '四化:',
      hua
    );

const displayName = hua
  ? `${starName}（${hua[0]}）`
  : starName;

if (starName === '禄存' || starName === '天魁' || starName ==='天鉞') {
  return `<span class="lu-cun">${displayName}</span>`;
}
else if (starName === '天福' || starName === '天官' || starName ==='天厨') {
  return `<span class="blue-star">${displayName}</span>`; 
}

return displayName;
  });

  
// この宮に入る年支系統の星を取得
const branchStarsInPalace = Object.entries(branchStars)
  .filter(([starName, branch]) => {

    // 通常の地支指定
    if (palaceBranches.includes(branch)) {
      return branch === palaceName;
    }

    // 「命宮」と指定されている場合
    if (branch === '命宮') {
      return palaceName === life_branch;
    }

    // 「父母」「福徳」など十二宮名で指定されている場合
    const targetPalace = palaceAssignment.find(
      item => item.palace === branch
    );

    return targetPalace?.branch === palaceName;
  })
  .map(([starName]) => {
    if (starName === '天馬') {
      return `<span class="tenma-star">${starName}</span>`;
    }
    else if ( starName === '天哭' || starName === '天虚' || starName === "龍池" || 
              starName === '鳳閣' || starName === '紅鸞' || starName === '天喜' || 
              starName === '孤辰' || starName === '寡宿' || starName === '蜚廉' ||
              starName === '破碎' || starName === '華蓋' || starName === '咸池' ||
              starName === '天徳' || starName === '月徳' || starName === '天才') {
      return `<span class="blue-star">${starName}</span>`;
    }

    return starName;
  });

// この宮に入る月系統の星を取得
const monthStarsInPalace = Object.entries(monthStarPositions)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => {
    const displayName = addTransformation(starName);

    if (starName === '左輔' || starName === '右弼') {
      return `<span class="purple-star">${displayName}</span>`;
    }
    else {
      return `<span class="blue-star">${displayName}</span>`;
    }

    return displayName;
  });

// この宮に入る時系統の星を取得
const hourStarsInPalace = Object.entries(hourStarPositions)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => {
    const displayName = addTransformation(starName);

    if (starName === '文昌' || starName === '文曲') {
      return `<span class="purple-star">${displayName}</span>`;
    }
    else if (starName === '封誥'){
      return `<span class="blue-star">${displayName}</span>`;
    }

    return displayName;
  });

// この宮に入る火星・鈴星を取得
const fireBellStarsInPalace = Object.entries(fireBellStars)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => starName);

// 三台・八座・恩光・天貴
const additionalStarsInPalace = Object.entries(additionalStarPositions)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => starName); 

// この宮に入る長生十二神を取得
const changshengStarsInPalace = Object.entries(changshengPositions)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => starName);  

// この宮に入る博士十二星を取得
const doctorStarsInPalace = Object.entries(doctorStarPositions)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => starName);

// この宮に入る流年歳前諸星を取得
const yearlyPreStarsInPalace = Object.entries(yearlyPreStarPositions)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => starName);  

const mainStarsInPalace = Object.entries(mainStarPositions)
  .filter(([starName, branch]) => branch === palaceName)
  .map(([starName]) => {

    // この主星が四化の対象か調べる
    const hua = Object.entries(transformationMap)
      .find(([huaName, targetStar]) => targetStar === starName);

    const displayName = hua
      ? `${starName}（${hua[0]}）`
      : starName;

    return `<span class="red-star">${displayName}</span>`;
  });


return `
<div class="palace-cell ${isMing ? 'ming-palace' : ''} ${isZaiBo ? 'zai-bo-palace' : ''} ${isSeni ? 'senni-palace' : ''} ${isKanroku ? 'kanroku-palace' : ''} ">

     <div class="twelve-palace">
      ${palaceLabel}
    </div>

    <div class="year-stem-stars">
      ${starsInPalace.join('<br>')}
    </div>


${mainStarsInPalace.length > 0 ? `
  <div class="main-stars">
    ${mainStarsInPalace.join('<br>')}
  </div>
` : ''}

    <div class="year-branch-stars">
      ${branchStarsInPalace.join('<br>')}
    </div>  

    <div class="month-stars">
      ${monthStarsInPalace.join('<br>')}
    </div>    

    <div class="hour-stars">
      ${hourStarsInPalace.join('<br>')}
    </div>

    <div class="fire-bell-stars">
      ${fireBellStarsInPalace.join('<br>')}
    </div>

    <div class="additional-stars">
      ${additionalStarsInPalace.join('<br>')}
    </div>



    <div class="doctor-stars">
      ${doctorStarsInPalace.join('<br>')}
    </div>
  
     <div class="palace-stem">
      ${p?.stem ?? ''}${palaceName}
    </div>
    <div class="da-limit">
      ${daLimit ? `${daLimit.startAge}～${daLimit.endAge}歳` : ''}
    </div>    


  </div>
  `;

}).join('') + `

  <div class="calculation-center">
    <div>
      <p>
        西暦：${year}年 ${heavenly_stem_transformations[correct_stem].stem}${year_branches[correct_branchs].name}年
      </p>
      <p>
        旧暦：${lunarYear}年
        ${lunarMonth}月
        ${lunarDay}日
        ${year_branches[correct_time].name}刻
      </p>

      <p>
        新暦：${month}月
        ${day}日
        ${hour}時${minute}分生まれ
      </p>
      <p>
        ${attribute}${gender_2}
      </p>
      <p>
        ${fiveElement}
      </p>
    </div>
  </div>
`;

  // 命宮の主星情報
  const mainStarName = assignment[mainPalaceIndex].star;
  const mainStarData = STARS_DATA.find(s => s.name === mainStarName);

  const result = document.getElementById('result');
  result.style.display = 'block';
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 五行局判定
function getFiveElement(stem, branch) {

  const stemGroup = stemGroups[stem];
  const branchGroup = branchGroups[branch];

  console.log('stem:', stem);
  console.log('branch:', branch);
  console.log('stemGroup:', stemGroup);
  console.log('branchGroup:', branchGroup);

  const element = fiveElementTable[stemGroup][branchGroup];

  return fiveElementNumber[element];
}

// シード付き乱数（Mulberry32）
function seededRandom(seed) {
  let s = seed >>> 0;
  return function() {
    s += 0x6d2b79f5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 0xffffffff;
  };
}


/* ===== 初期化 ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderStarsGrid();
  document.getElementById('generateBtn').addEventListener('click', generateChart);
});
