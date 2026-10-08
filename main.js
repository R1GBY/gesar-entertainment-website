(() => {
  'use strict';

  const POW = {
    ADM: { c: '#C9A227', en: 'Admin', tr: 'İdari' },
    DIP: { c: '#8DA3C4', en: 'Diplomacy', tr: 'Diplomasi' },
    MIL: { c: '#C87D7D', en: 'Military', tr: 'Askerî' },
    FTH: { c: '#9B7FD4', en: 'Faith', tr: 'İnanç' },
    ALL: { c: '#141210', en: 'All powers', tr: 'Tüm güçler', fg: '#F1EDE6' },
  };
  const POWERS = [
    ['ADM', ['Administrative', 'Core new lands, keep subject kingdoms loyal and hold the realm together.'], ['İdari', 'Yeni toprakları benimseyin, bağlı krallıkları sadık tutun, ülkeyi bir arada tutun.']],
    ['DIP', ['Diplomatic', 'Press claims, find a casus belli, bind vassals and send envoys on the hajj.'], ['Diplomatik', 'Hak iddia edin, savaş gerekçesi bulun, bağıl devletler edinin, hacca elçi gönderin.']],
    ['MIL', ['Military', 'Generals, mercenaries, sieges, plunder and fleets.'], ['Askerî', 'Generaller, paralı askerler, kuşatmalar, yağma ve donanmalar.']],
    ['FTH', ['Faith', 'The power your mages draw from the Yorulma and spend on their spells.'], ['İnanç', 'Büyücülerinizin Yorulma\'dan topladığı ve büyülerine harcadığı güç.']],
  ];
  const FEATURES = [
    ['DIP', ['The Pilgrimage', 'Every realm sends its envoys on the hajj to Henâru, under truce. Pilgrim roads shape trade, supply lines, diplomatic dilemmas and royal patronage.'],
      ['Hac', 'Her ülke ateşkes ilan edip elçilerini Henâru\'ya, hacca gönderir. Hac yolları ticareti, ikmal hatlarını, diplomatik açmazları ve kraliyet himayesini şekillendirir.']],
    ['ALL', ['Seven Asymmetric Races', 'Elves, dwarves, humans, the Hive, the four-armed Henâtirû, the amphibians of the Breakwater Syndicate and the Bendegân. Each plays by its own rules.'],
      ['Yedi Asimetrik Irk', 'Elfler, cüceler, insanlar, Hive, dört kollu Henâtirû, Dalgakıran Sendikası\'nın amfibileri ve Bendegân. Her biri kendi kurallarıyla oynar.']],
    ['FTH', ['Magic of the Yorulma', 'Where the laws of nature tire, waterfalls flow upward and stone melts. Mages are born of these anomalies, absorb them and spend that power on the battlefield. Every state keeps its mages on a short leash.'],
      ['Yorulma Büyüsü', 'Doğa yasalarının yorulduğu yerlerde şelaleler yukarı akar, taş erir. Büyücüler bu anomalilerden doğar, onları özümser ve bu gücü savaş meydanında harcar. Her devlet büyücülerini sıkı denetim altında tutar.']],
    ['FTH', ['A Mage for Every Race', 'Field the human Ermiş, the elven Sîmge, the dwarven Kızıl Rahip, the Hive\'s Kıv, the Syndicate\'s Yumrucan or the Kalde Semagöz, each with its own spells.'],
      ['Her Irka Bir Büyücü', 'İnsanların Ermiş\'i, elflerin Sîmge\'si, cücelerin Kızıl Rahip\'i, Hive\'ın Kıv\'ı, Sendika\'nın Yumrucan\'ı ya da Kaldelilerin Semagöz\'ü; her birinin kendi büyüleri var.']],
    ['ADM', ['An Empire of Four Kingdoms', 'Dergâh-ı Vâhid governs, Kavm-i Hezâr-Mâbud fights, Bedregân trades and Seng-i Bîdâr labours. Keep their liberty desire in check or watch the empire come apart.'],
      ['Dört Krallıklı İmparatorluk', 'Dergâh-ı Vâhid yönetir, Kavm-i Hezâr-Mâbud savaşır, Bedregân ticaret yapar, Seng-i Bîdâr çalışır. Bağımsızlık arzularını dizginleyin, yoksa imparatorluğun dağılışını izleyin.']],
    ['ADM', ['Trade & the Sea', 'Gold, labour and trade nodes. The Breakwater Syndicate leases its fleets, plants trading posts and digs canals to rule the island\'s shipping.'],
      ['Ticaret ve Deniz', 'Altın, işgücü ve ticaret düğümleri. Dalgakıran Sendikası filolarını kiralar, ticaret karakolları kurar ve adanın deniz ticaretine hükmetmek için kanallar kazar.']],
    ['MIL', ['War, Day by Day', 'Battles resolve in daily turns. Raise militia and cavalry, hire mercenary companies, besiege provinces and plunder them. The Hive cannot march without its pheromone-bearing generals.'],
      ['Gün Gün Savaş', 'Muharebeler günlük turlarla çözülür. Milis ve süvari toplayın, paralı bölükler kiralayın, eyaletleri kuşatıp yağmalayın. Hive orduları feromon taşıyan generalleri olmadan yürüyemez.']],
    ['DIP', ['Claims & Vassals', 'Fabricate temporary or permanent claims, justify your wars and bind lesser states as vassals. The dwarves claim every iron vein they can see.'],
      ['Hak İddiaları ve Bağıl Devletler', 'Geçici ya da kalıcı hak iddiaları uydurun, savaşlarınızı gerekçelendirin, küçük devletleri bağıl devlet yapın. Cüceler gördükleri her demir damarında hak iddia eder.']],
    ['FTH', ['One Pantheon, Many Readings', 'Anrâ, Unâ, Panâs and Uârû are worshipped by every race, each in its own way. Humans absorb the gods of every land they reach, and the dwarves serve the Crimson Fungus.'],
      ['Tek Panteon, Pek Çok Yorum', 'Anrâ, Unâ, Panâs ve Uârû\'ya her ırk kendi yoluyla tapar. İnsanlar ulaştıkları her diyarın tanrılarını panteona katar, cüceler Kızıl Fungus\'a hizmet eder.']],
    ['ALL', ['Events & Omens', 'Aurora glares, the silk molting of the Kalde, disputed comets and lost caravans. Every campaign is shaped by what the sky and the roads bring.'],
      ['Olaylar ve Alametler', 'Kutup ışıkları, Kaldelilerin ipek dökümü, tartışmalı kuyruklu yıldızlar ve kayıp kervanlar. Her seferi gökyüzünün ve yolların getirdikleri şekillendirir.']],
  ];
  const REALMS = [
    ['Ebedi Nizam', '#5E5680', '#fff', ['Elf Empire', 'Elves made near-immortal by an ancient ritual. They once ruled the whole island and now hold a dwindling empire behind the Great Mountains.'], ['Elf İmparatorluğu', 'Kadim bir ritüelle neredeyse ölümsüzleşmiş elfler. Bir zamanlar tüm adaya hükmettiler; şimdi Yüce Dağlar\'ın ardında giderek eriyen bir imparatorluğu ellerinde tutuyorlar.']],
    ['Kızıl Misak', '#A0503A', '#fff', ['Dwarven Realm', 'The Crimson Pact: dwarves of the iron mountains, zealots of the Crimson Fungus, who claim every iron vein and wall their conquests with the Walls of Barzar.'], ['Cüce Devleti', 'Demir dağlarının cüceleri; Kızıl Fungus\'u kutsal sayar, her demir damarında hak iddia eder ve fetihlerini Barzar Surları\'yla çevirirler.']],
    ['Hive', '#8F5F68', '#fff', ['Hive Kingdom', 'A giant insect kingdom of the east, bound to its Queen\'s pheromones. It colonises rather than conquers and grows its buildings as living flesh.'], ['Kovan Krallığı', 'Kraliçesinin feromonlarına bağlı doğunun dev böcek krallığı. Fethetmek yerine kolonileştirir, binalarını canlı et olarak büyütür.']],
    ['Dalgakıran Sendikası', '#C9A548', '#141210', ['Amphibian Republic', 'The Breakwater Syndicate: an oligarchic republic of the coastal marshes that wants to own the island\'s shipping. Your rank is the number of galleons you can launch.'], ['Amfibi Cumhuriyeti', 'Adanın deniz ticaretini tekeline almak isteyen kıyı bataklıklarının oligarşik cumhuriyeti. Toplumdaki yerinizi denize indirebildiğiniz kalyon sayısı belirler.']],
    ['Henâru', '#9DA661', '#141210', ['Henâru Realm', 'The four-armed Henâtirû of the northern plateau. They shun conquest, read fate in the stars from obsidian ziggurats and host the island\'s great pilgrimage.'], ['Henâru Diyarı', 'Kuzey platosunun dört kollu Henâtirû\'su. Fetihten kaçınır, obsidyen zigguratlarından yıldızlarda kaderi okur ve adanın büyük haccına ev sahipliği yaparlar.']],
    ['Dergâh-ı Vâhid', '#4E6B50', '#fff', ['Human Empire · Rule', 'The imperial seat of the humans. It holds political power over four quarrelling kingdoms bound by a shared, ever-growing pantheon.'], ['İnsan İmparatorluğu · Yönetim', 'İnsanların imparatorluk merkezi. Ortak ve sürekli büyüyen bir panteonla birbirine bağlı, kavgacı dört krallığın siyasi yönetimini elinde tutar.']],
    ['Bedregân', '#5F5F8A', '#fff', ['Human Kingdom · Trade', 'The empire\'s merchant kingdom. It favours peace and trade with loyal brethren abroad, and pulls against its warlike neighbours.'], ['İnsan Krallığı · Ticaret', 'İmparatorluğun tüccar krallığı. Barışı ve sınır ötesindeki vefalı kardeşlerle ticareti savunur, savaşçı komşularına direnir.']],
    ['Kavm-i Hezâr-Mâbud', '#B4CBA8', '#141210', ['Human Kingdom · Military', 'The people of a thousand gods and the empire\'s sword-arm. It takes in the gods of every land it reaches and wants many more.'], ['İnsan Krallığı · Askeriye', 'Bin tanrının kavmi, imparatorluğun kılıç kolu. Ulaştığı her diyarın tanrılarını panteona katar ve daha fazlasını ister.']],
    ['Seng-i Bîdâr', '#8DB8B0', '#141210', ['Human Kingdom · Labour', 'The labouring backbone of the human empire, whose hands raise its cities and work its lands.'], ['İnsan Krallığı · Emek', 'İnsan imparatorluğunun emekçi omurgası; şehirlerini onun elleri yükseltir, topraklarını onun elleri işler.']],
  ];
  // Set `photo` to an image path (e.g. 'assets/team/oguz.jpg') to replace the placeholder.
  const TEAM = [
    { name: 'Oğuz Ağırbaş', role: { en: 'Creative Writer', tr: 'Kreatif Yazar' }, photo: null },
    { name: 'Sarper Dündar', role: { en: '3D Artist', tr: '3D Sanatçı' }, photo: null },
    { name: 'Umut Arda Kapan', role: { en: 'Software Developer', tr: 'Yazılım Geliştirici' }, photo: null },
    { name: 'Ziya Kutay Katlandur', role: { en: 'UI Designer', tr: 'Arayüz Tasarımcısı' }, photo: null },
  ];
  const STR = {
    en: { emailPh: 'your@email.com', subscribe: 'Subscribe', subscribed: 'Sworn in. The first dispatch is on its way.', topic: 'Topic', name: 'Name', email: 'Email', message: 'Message', send: 'Send', sentLabel: 'Message sent', sentMsg: 'Your envoy has reached the court. We will reply soon.', sending: 'Sending…', subscribeError: 'The messenger was lost on the road. Please try again.', sendError: 'Your envoy was turned back. Please try again, or write to us at info@gesarentertainment.me.', portrait: 'Portrait' },
    tr: { emailPh: 'eposta@adresiniz.com', subscribe: 'Abone ol', subscribed: 'Yemin edildi. İlk bülten yolda.', topic: 'Konu', name: 'Ad', email: 'E-posta', message: 'Mesaj', send: 'Gönder', sentLabel: 'Mesaj gönderildi', sentMsg: 'Elçiniz saraya ulaştı. Yakında yanıt vereceğiz.', sending: 'Gönderiliyor…', subscribeError: 'Ulak yolda kayboldu. Lütfen tekrar deneyin.', sendError: 'Elçiniz geri çevrildi. Lütfen tekrar deneyin ya da info@gesarentertainment.me adresine yazın.', portrait: 'Portre' },
  };
  const FACTS = {
    en: [['Genre', 'Grand strategy'], ['Mode', 'Real-time with pause'], ['Setting', 'High fantasy'], ['Engine', 'Unity'], ['Languages', 'English · Turkish'], ['Status', 'Pre-alpha']],
    tr: [['Tür', 'Büyük strateji'], ['Mod', 'Duraklatılabilir gerçek zamanlı'], ['Dünya', 'Fantastik'], ['Motor', 'Unity'], ['Diller', 'İngilizce · Türkçe'], ['Durum', 'Pre-alpha']],
  };
  const PHASES = {
    en: { names: ['Core Prototype', 'Identity', 'Atmosphere', 'Expansion'], status: ['Now', 'Next', 'Later', 'Later'], label: 'Phase ' },
    tr: { names: ['Çekirdek Prototip', 'Kimlik', 'Atmosfer', 'Genişleme'], status: ['Şimdi', 'Sırada', 'Sonra', 'Sonra'], label: 'Faz ' },
  };
  const TOPICS = { en: ['Press', 'Business', 'Jobs', 'Community'], tr: ['Basın', 'İş birliği', 'Kariyer', 'Topluluk'] };
  const channels = lang => [
    { k: lang === 'en' ? 'Email' : 'E-posta', lang, v: 'info@gesarentertainment.me', href: 'mailto:info@gesarentertainment.me' },
    { k: 'Discord', lang: 'en', v: '[ Discord invite ]', href: '#' },
    { k: 'X', lang: 'en', v: '[ @handle ]', href: '#' },
    { k: 'Reddit', lang: 'en', v: 'r/BellumOmnium_TR', href: 'https://www.reddit.com/r/BellumOmnium_TR/' },
    { k: 'Steam', lang: 'en', v: lang === 'en' ? 'Store page coming soon' : 'Mağaza sayfası yakında', href: null },
    { k: 'LinkedIn', lang: 'en', v: 'gesar-entertainment', href: 'https://www.linkedin.com/company/gesar-entertainment' },
  ];

  const VIEWS = ['game', 'team', 'contact'];
  const state = { view: 'game', lang: 'en', realm: 0, topic: 0 };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  try {
    const saved = localStorage.getItem('gesar-lang');
    if (saved === 'en' || saved === 'tr') state.lang = saved;
  } catch (e) {}

  /* ---------- Renderers ---------- */
  function renderFacts() {
    const el = $('#facts');
    el.classList.add('cells');
    el.innerHTML = FACTS[state.lang].map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  }

  function renderPowers() {
    const el = $('#powers');
    el.classList.add('cells');
    const i = state.lang === 'en' ? 1 : 2;
    el.innerHTML = POWERS.map(p => `
      <div class="power" style="background:${POW[p[0]].c}">
        <span class="power-code">${p[0]}</span>
        <span class="power-name">${esc(p[i][0])}</span>
        <span class="power-desc">${esc(p[i][1])}</span>
      </div>`).join('');
  }

  function renderFeatures() {
    const i = state.lang === 'en' ? 1 : 2;
    $('#features').innerHTML = FEATURES.map((f, n) => {
      const pw = POW[f[0]];
      return `
      <div class="feature">
        <div class="feature-n">${n + 1}</div>
        <div class="feature-body">
          <h3>${esc(f[i][0])}</h3>
          <p>${esc(f[i][1])}</p>
          <span class="tag" style="background:${pw.c};color:${pw.fg || '#141210'}">${esc(pw[state.lang])}</span>
        </div>
      </div>`;
    }).join('');
  }

  function renderRealms() {
    const i = state.lang === 'en' ? 3 : 4;
    $('#realm-list').innerHTML = REALMS.map((r, n) => `
      <li><button type="button" data-realm="${n}">
        <span class="r-name">${esc(r[0])}</span>
        <span class="r-type">${esc(r[i][0])}</span>
      </button></li>`).join('');
    updateRealm();
  }

  function updateRealm() {
    const i = state.lang === 'en' ? 3 : 4;
    const r = REALMS[state.realm];
    $$('#realm-list button').forEach((b, n) => {
      const active = n === state.realm;
      b.setAttribute('aria-pressed', String(active));
      b.style.background = active ? REALMS[n][1] : 'transparent';
      b.style.color = active ? REALMS[n][2] : '#F1EDE6';
    });
    const banner = $('#realm-banner');
    banner.style.background = r[1];
    banner.style.color = r[2];
    $('#realm-type').textContent = r[i][0];
    $('#realm-name').textContent = r[0];
    $('#realm-desc').textContent = r[i][1];
  }

  function renderPhases() {
    const el = $('#phases');
    el.classList.add('cells');
    const P = PHASES[state.lang];
    el.innerHTML = P.names.map((name, n) => {
      const bg = n === 0 ? '#B5332E' : n === 1 ? '#E6E0D6' : '#F1EDE6';
      const fg = n === 0 ? '#fff' : '#141210';
      return `
      <div class="phase" style="background:${bg};color:${fg}">
        <div class="phase-head"><span>${P.label}${n + 1}</span><span>${esc(P.status[n])}</span></div>
        <div class="phase-name">${esc(name)}</div>
      </div>`;
    }).join('');
  }

  function renderTeam() {
    const el = $('#team-grid');
    el.classList.add('cells');
    el.innerHTML = TEAM.map(m => `
      <article class="member" data-reveal>
        <div class="portrait">${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">` : esc(STR[state.lang].portrait)}</div>
        <div class="member-info">
          <span lang="tr" class="member-name">${esc(m.name)}</span>
          <span class="member-role">${esc(m.role[state.lang])}</span>
        </div>
      </article>`).join('');
  }

  function renderChannels() {
    $('#channels').innerHTML = channels(state.lang).map(c => `
      <li>${c.href ? `<a href="${esc(c.href)}"${/^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : ''}>` : '<div class="ch-soon">'}
        <span lang="${c.lang}" class="ch-k">${esc(c.k)}</span>
        <span class="ch-v">${esc(c.v)}</span>
        <span aria-hidden="true" class="ch-arrow"${c.href ? '' : ' style="visibility:hidden"'}>↗</span>
      ${c.href ? '</a>' : '</div>'}</li>`).join('');
  }

  function renderTopics() {
    $('#topics').innerHTML = TOPICS[state.lang].map((label, n) =>
      `<button type="button" data-topic="${n}" aria-pressed="${n === state.topic}">${esc(label)}</button>`).join('');
  }

  function renderStrings() {
    const t = STR[state.lang];
    $$('[data-t]').forEach(el => { el.textContent = t[el.dataset.t]; });
    $$('[data-t-ph]').forEach(el => { el.placeholder = t[el.dataset.tPh]; });
  }

  function renderAll() {
    renderStrings();
    renderFacts();
    renderPowers();
    renderFeatures();
    renderRealms();
    renderPhases();
    renderTeam();
    renderChannels();
    renderTopics();
    setupReveal();
  }

  /* ---------- Language ---------- */
  function setLang(lang) {
    state.lang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    $$('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)));
    try { localStorage.setItem('gesar-lang', lang); } catch (e) {}
    renderAll();
  }

  /* ---------- Routing ---------- */
  function showView(view, scroll) {
    if (!VIEWS.includes(view)) view = 'game';
    state.view = view;
    $$('main[data-view]').forEach(m => { m.hidden = m.dataset.view !== view; });
    $$('.primary-nav a').forEach(a => {
      if (a.dataset.go === view) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (scroll) window.scrollTo(0, 0);
    setupReveal();
    onScroll();
  }

  function go(view) {
    try { history.pushState(null, '', view === 'game' ? location.pathname + location.search : '#' + view); } catch (e) {}
    showView(view, true);
  }

  /* ---------- Motion ---------- */
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = !reduced && 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 }) : null;
  if (io) document.documentElement.classList.add('motion');

  function setupReveal() {
    if (!io) return;
    $$('[data-reveal]:not([data-rv])').forEach(el => { el.setAttribute('data-rv', ''); io.observe(el); });
  }

  function onScroll() {
    if (reduced) return;
    $$('main:not([hidden]) [data-parallax]').forEach(el => {
      const r = el.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const slack = r.height * 0.12;
      const y = Math.max(-slack, Math.min(slack, -r.top * 0.12));
      el.style.transform = `translate3d(0,${y}px,0)`;
    });
  }

  /* ---------- Events ---------- */
  document.addEventListener('click', e => {
    const goEl = e.target.closest('[data-go]');
    if (goEl) { e.preventDefault(); go(goEl.dataset.go); return; }
    const langEl = e.target.closest('[data-set-lang]');
    if (langEl) { setLang(langEl.dataset.setLang); return; }
    const realmEl = e.target.closest('[data-realm]');
    if (realmEl) { state.realm = +realmEl.dataset.realm; updateRealm(); return; }
    const topicEl = e.target.closest('[data-topic]');
    if (topicEl) {
      state.topic = +topicEl.dataset.topic;
      $$('#topics button').forEach((b, n) => b.setAttribute('aria-pressed', String(n === state.topic)));
    }
  });

  const realmList = $('#realm-list');
  const pickRealm = e => {
    const b = e.target.closest('[data-realm]');
    if (b && +b.dataset.realm !== state.realm) { state.realm = +b.dataset.realm; updateRealm(); }
  };
  realmList.addEventListener('mouseover', pickRealm);
  realmList.addEventListener('focusin', pickRealm);

  // Form submissions are emailed to info@gesarentertainment.me via Web3Forms.
  // The access key is public by design (it only allows sending to the registered address).
  const WEB3FORMS_KEY = 'e936a78e-01ae-4d6f-85fd-e691e0b77c64';
  async function sendToWeb3Forms(fields) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: 'Gesar Entertainment website', language: state.lang.toUpperCase(), ...fields }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) throw new Error(json.message || res.status);
  }

  // Newsletter signups land in the inbox until a mailing-list service is chosen.
  $('#newsletter-form').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = $('#newsletter-submit');
    const err = $('#newsletter-error');
    if (btn.disabled) return;
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    btn.disabled = true;
    err.hidden = true;
    btn.textContent = STR[state.lang].sending;
    try {
      await sendToWeb3Forms({
        subject: `New newsletter signup: ${email}`,
        email,
        signup: 'Newsletter (Dispatches)',
        botcheck: data.get('botcheck') ? true : '',
      });
      form.hidden = true;
      $('#newsletter-done').hidden = false;
    } catch (ex) {
      err.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = STR[state.lang].subscribe;
    }
  });

  $('#contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = $('#contact-submit');
    const label = $('#contact-submit-label');
    const err = $('#contact-error');
    if (btn.disabled) return;
    const data = new FormData(form);
    const topic = TOPICS.en[state.topic];
    const name = String(data.get('name') || '').trim();
    btn.disabled = true;
    err.hidden = true;
    label.textContent = STR[state.lang].sending;
    try {
      await sendToWeb3Forms({
        subject: `[${topic}] Website message from ${name}`,
        topic,
        name,
        email: data.get('email'),
        message: data.get('message'),
        botcheck: data.get('botcheck') ? true : '',
      });
      form.hidden = true;
      $('#contact-sent').hidden = false;
    } catch (ex) {
      err.hidden = false;
    } finally {
      btn.disabled = false;
      label.textContent = STR[state.lang].send;
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('popstate', () => showView(location.hash.slice(1), false));

  setLang(state.lang);
  showView(location.hash.slice(1), false);
})();
