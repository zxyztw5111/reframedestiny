/* ═══ Real BaZi (lunar-javascript) & natal positions (astronomy-engine) ═══ */

const CITY_COORDS = {
  上海: [31.2304, 121.4737],
  北京: [39.9042, 116.4074],
  广州: [23.1291, 113.2644],
  深圳: [22.5431, 114.0579],
  成都: [30.5728, 104.0668],
  杭州: [30.2741, 120.1551],
  重庆: [29.4316, 106.9123],
  武汉: [30.5928, 114.3055],
  西安: [34.3416, 108.9398],
  南京: [32.0603, 118.7969],
  香港: [22.3193, 114.1694],
  台北: [25.033, 121.5654],
};

const ZODIAC_ZH = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
const ZODIAC_EN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const STEM_META = {
  甲: { el: 'wood', zh: '甲木', en: 'Jia Wood' },
  乙: { el: 'wood', zh: '乙木', en: 'Yi Wood' },
  丙: { el: 'fire', zh: '丙火', en: 'Bing Fire' },
  丁: { el: 'fire', zh: '丁火', en: 'Ding Fire' },
  戊: { el: 'earth', zh: '戊土', en: 'Wu Earth' },
  己: { el: 'earth', zh: '己土', en: 'Ji Earth' },
  庚: { el: 'metal', zh: '庚金', en: 'Geng Metal' },
  辛: { el: 'metal', zh: '辛金', en: 'Xin Metal' },
  壬: { el: 'water', zh: '壬水', en: 'Ren Water' },
  癸: { el: 'water', zh: '癸水', en: 'Gui Water' },
};

const EL_ZH = { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' };

function resolvePlace(name = '') {
  const n = String(name).trim();
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    if (n.includes(city)) return { lat: coords[0], lon: coords[1], label: city };
  }
  return { lat: 31.2304, lon: 121.4737, label: n || '上海' };
}

function readBirthForm() {
  const date = document.querySelector('.birth-form input[type="date"]')?.value;
  const time = document.querySelector('.birth-form input[type="time"]')?.value || '12:00';
  const place = document.querySelector('.birth-form input[type="text"]')?.value || '上海';
  if (!date) return null;
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const geo = resolvePlace(place);
  return { y, m, d, hh, mm, place, geo };
}

function signFromLongitude(lon) {
  const idx = ((Math.floor(lon / 30) % 12) + 12) % 12;
  return { index: idx, zh: ZODIAC_ZH[idx], en: ZODIAC_EN[idx] };
}

function bodyLongitude(body, astroTime) {
  if (typeof Astronomy === 'undefined') return null;
  try {
    const vec = Astronomy.GeoVector(body, astroTime, true);
    const ecl = Astronomy.Ecliptic(vec);
    return ecl.elon;
  } catch {
    return null;
  }
}

function computeAscendant(astroTime, lat, lon) {
  const theta0 = Astronomy.SiderealTime(astroTime);
  const lst = theta0 + lon / 15;
  const ramc = ((lst * 15) % 360 + 360) % 360;
  const phi = (lat * Math.PI) / 180;
  const eps = (23.4392911 * Math.PI) / 180;
  const ramcRad = (ramc * Math.PI) / 180;
  let ascRad = Math.atan2(
    Math.cos(ramcRad),
    -(Math.sin(ramcRad) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))
  );
  let ascLon = (ascRad * 180) / Math.PI;
  if (ascLon < 0) ascLon += 360;
  return ascLon;
}

function houseOf(longitude, ascLon) {
  return Math.floor(((longitude - ascLon + 360) % 360) / 30) + 1;
}

const ChartCalc = {
  readBirthForm,

  computeBazi(form = null) {
    const f = form || readBirthForm();
    if (!f || typeof Solar === 'undefined') return null;

    const solar = Solar.fromYmdHms(f.y, f.m, f.d, f.hh, f.mm, 0);
    const ec = solar.getLunar().getEightChar();

    const pillars = [
      { key: 'year', label: '年柱', enLabel: 'Year', gz: ec.getYear() },
      { key: 'month', label: '月柱', enLabel: 'Month', gz: ec.getMonth() },
      { key: 'day', label: '日柱', enLabel: 'Day', gz: ec.getDay() },
      { key: 'hour', label: '时柱', enLabel: 'Hour', gz: ec.getTime() },
    ].map(p => {
      const stem = p.gz.charAt(0);
      const branch = p.gz.charAt(1);
      const meta = STEM_META[stem] || { el: 'earth', zh: stem, en: stem };
      return { ...p, stem, branch, meta };
    });

    const dayStem = pillars[2].stem;
    const dayMeta = STEM_META[dayStem] || { el: 'earth', zh: dayStem, en: dayStem };

    return {
      pillars,
      dayStem,
      dayMaster: dayMeta,
      summary: {
        zh: `四柱：${pillars.map(p => p.gz).join(' ')}，日主${dayMeta.zh}`,
        en: `Pillars: ${pillars.map(p => p.gz).join(' ')} — Day Master ${dayMeta.en}`,
      },
    };
  },

  computeAstro(form = null) {
    const f = form || readBirthForm();
    if (!f || typeof Astronomy === 'undefined') return null;

    const utcMs = Date.UTC(f.y, f.m - 1, f.d, f.hh - 8, f.mm, 0);
    const date = new Date(utcMs);
    const astroTime = Astronomy.MakeTime(date);

    const bodies = [
      { key: 'sun', body: Astronomy.Body.Sun, zh: '太阳', en: 'Sun', sym: '☉' },
      { key: 'moon', body: Astronomy.Body.Moon, zh: '月亮', en: 'Moon', sym: '☽' },
      { key: 'mercury', body: Astronomy.Body.Mercury, zh: '水星', en: 'Mercury', sym: '☿' },
      { key: 'venus', body: Astronomy.Body.Venus, zh: '金星', en: 'Venus', sym: '♀' },
      { key: 'mars', body: Astronomy.Body.Mars, zh: '火星', en: 'Mars', sym: '♂' },
      { key: 'jupiter', body: Astronomy.Body.Jupiter, zh: '木星', en: 'Jupiter', sym: '♃' },
      { key: 'saturn', body: Astronomy.Body.Saturn, zh: '土星', en: 'Saturn', sym: '♄' },
    ];

    const planets = bodies.map(b => {
      const lon = bodyLongitude(b.body, astroTime);
      const sign = lon != null ? signFromLongitude(lon) : { index: 0, zh: '—', en: '—' };
      return { ...b, longitude: lon ?? 0, sign, house: null };
    });

    const ascLon = computeAscendant(astroTime, f.geo.lat, f.geo.lon);
    const ascSign = signFromLongitude(ascLon);
    planets.forEach(p => {
      if (p.longitude != null) p.house = houseOf(p.longitude, ascLon);
    });

    const sun = planets[0];
    const moon = planets[1];

    return {
      planets,
      ascLon,
      ascSign,
      sunSign: sun.sign,
      moonSign: moon.sign,
      place: f.geo,
      summary: {
        zh: `上升${ascSign.zh} · 太阳${sun.sign.zh} · 月亮${moon.sign.zh} · ${f.geo.label}`,
        en: `Asc ${ascSign.en} · Sun ${sun.sign.en} · Moon ${moon.sign.en} · ${f.geo.label}`,
      },
    };
  },

  computeAll(form = null) {
    const birth = form || readBirthForm();
    if (!birth) return null;
    return {
      birth,
      bazi: this.computeBazi(birth),
      astro: this.computeAstro(birth),
    };
  },
};
