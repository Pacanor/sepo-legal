const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
const revealItems = document.querySelectorAll("[data-reveal]");

const closeMenu = () => {
  menuButton?.setAttribute("aria-expanded", "false");
  nav?.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener(
  "scroll",
  () => header?.classList.toggle("scrolled", window.scrollY > 16),
  { passive: true },
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px 60px" },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const sectionIds = ["about", "practice", "matters", "approach", "team", "contact"];
const navLinks = [...(nav?.querySelectorAll("[data-nav]") || [])];
const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

const setCurrentNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-current", link.dataset.nav === id);
  });
};

if (sections.length && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setCurrentNav(visible.target.id);
    },
    { threshold: [0.18, 0.4, 0.6], rootMargin: "-18% 0px -48% 0px" },
  );
  sections.forEach((section) => navObserver.observe(section));
}

const copy = {
  en: {
    nav_about: "The firm",
    nav_practice: "Practice",
    nav_matters: "Matters",
    nav_approach: "Approach",
    nav_team: "People",
    nav_contact: "Instruct us",
    hero_kicker: "Lusaka · Advocates, notaries and commissioners for oaths",
    hero_title: "Counsel equal to the brief.",
    hero_intro:
      "Sepo Legal Practitioners acts for government, companies, employees and families. The standard of preparation does not change with the size of the client.",
    cta_email: "Write to the firm",
    cta_urgent: "Urgent? Call or WhatsApp",
    about_kicker: "The firm",
    about_title: "A Lusaka practice with range, and a single standard of care.",
    about_lead:
      "Established in 2021, we are a team of Zambian advocates committed to professional, ethical and client-centred work.",
    about_body:
      "We offer a modern approach to legal matters, with a confidential and courteous service fitted to the brief. The work of recent weeks has included public-sector mandates, lending, matrimonial proceedings and employment claims, including collective action against a substantial employer.",
    mission_label: "Mission",
    mission_text:
      "To be responsive to our clients’ needs by the provision of relevant and practical legal services in a timely manner.",
    vision_label: "Vision",
    vision_text:
      "To provide quality legal services with a reputation of integrity, excellence and results.",
    values_label: "Values",
    values_text: "Integrity, confidentiality, excellence and accountability.",
    practice_kicker: "Areas of practice",
    practice_title: "The full breadth of the brief, under one roof.",
    practice_intro:
      "Instruct us on any of the following. If your matter sits across more than one, that is ordinary. We will tell you how we propose to staff it.",
    matters_kicker: "Selected work",
    matters_title: "The kinds of matters we are instructed on.",
    matters_intro:
      "Names, figures and court files stay in chambers. What follows is the character of the work, not a client list. If your situation resembles any of these, we are prepared to consider it.",
    approach_kicker: "How we are instructed",
    approach_title: "A short conversation before any fee.",
    contact_kicker: "Chambers",
    contact_title: "Set out the matter. We will tell you if we can act.",
    contact_body:
      "Email is the ordinary way to reach us. We offer a complimentary fifteen-minute discussion to decide whether the firm is the right fit. You are billed only if you instruct us to proceed. Our chambers sit Monday to Friday, 08:00 to 17:00. Life does not pause at the close of business. If a matter cannot wait until morning, telephone or WhatsApp and we will see how we can assist.",
    lang_label: "Language",
  },
  ny: {
    nav_about: "Kampani",
    nav_practice: "Ntchito",
    nav_matters: "Milandu",
    nav_approach: "Njira",
    nav_team: "Anthu",
    nav_contact: "Lembani",
    hero_kicker: "Lusaka · Ma advocate, ma notary ndi ma commissioner for oaths",
    hero_title: "Upangiri wokwanira nkhaniyanu.",
    hero_intro:
      "Sepo Legal Practitioners imagwira ntchito ndi boma, makampani, ogwira ntchito ndi mabanja. Kukonzekera kwathu sikusintha chifukwa cha kukula kwa kasitomala.",
    cta_email: "Lemberani kampani",
    cta_urgent: "Zafunika msanga? Imbani kapena WhatsApp",
    about_kicker: "Kampani",
    about_title: "Kampani ya Lusaka yokhala ndi nzeru zambiri, ndi chitetezo chimodzi.",
    about_lead:
      "Tinakhazikitsidwa mu 2021. Ndife gulu la ma advocate a ku Zambia ogwira ntchito mwaulemu, moona mtima ndi moganizira kasitomala.",
    about_body:
      "Timapereka chithandizo cha zamalamulo cha masiku ano, mwachinsinsi ndi mwaulemu. M’sabata zapitazi tagwira ntchito za boma, ngongole, nkhani za banja ndi milandu ya ntchito.",
    mission_label: "Cholinga",
    mission_text:
      "Kuyankha zosowa za makasitomala athu mwa kupereka chithandizo cha zamalamulo choyenera, chothandiza ndi m’nthawi yake.",
    vision_label: "Masomphenya",
    vision_text:
      "Kupereka chithandizo chapamwamba cha zamalamulo, ndi mbiri ya kukhulupirika, ukadaulo ndi zipatso.",
    values_label: "Mfundo",
    values_text: "Kukhulupirika, chinsinsi, ukadaulo ndi kuyankha.",
    practice_kicker: "Magawo a ntchito",
    practice_title: "Ntchito yonse ya zamalamulo, pa malo amodzi.",
    practice_intro:
      "Mutha kutitumizira nkhani iliyonse ya izi. Ngati nkhaniyanu ikhudza magawo angapo, ndicho chizolowezi. Tiwuza momwe tingagwire.",
    matters_kicker: "Ntchito yosankhidwa",
    matters_title: "Mitundu ya nkhani timagwira.",
    matters_intro:
      "Mayina ndi mafayilo amakhala m’chipinda chathu. Izi zikuwonetsa mtundu wa ntchito, osati mndandanda wa makasitomala.",
    approach_kicker: "Momwe timayambira",
    approach_title: "Kukambirana kwafupifupi musanakalipire.",
    contact_kicker: "Ofesi",
    contact_title: "Fotokozani nkhaniyanu. Tiwuza ngati titha kugwira.",
    contact_body:
      "Imelo ndiyo njira yabwinoko. Timapereka kukambirana kwa mphindi khumi ndi zisanu zaulere kuti tionetse ngati ndife kampani yoyenera. Mumalipira pokhapokha mutatipatsa ntchito. Ofesi ili pa Lolemba mpaka Lachisanu, 08:00 mpaka 17:00. Ngati nkhani siyingadikire m’mawa, imbani kapena WhatsApp.",
    lang_label: "Chilankhulo",
  },
  bem: {
    nav_about: "Kampani",
    nav_practice: "Imilimo",
    nav_matters: "Imilandu",
    nav_approach: "Inshila",
    nav_team: "Abantu",
    nav_contact: "Lembeni",
    hero_kicker: "Lusaka · Abadvocate, abanotary na commissioners for oaths",
    hero_title: "Ubufundo bwakulingana ne mulandu.",
    hero_intro:
      "Sepo Legal Practitioners ilebomba na govamente, amakampani, ababomba na imikwai. Ukwampana ukubomba takwaluka ukulingana ne bukulu bwa kasitomala.",
    cta_email: "Lembeniko kampani",
    cta_urgent: "Cakansa? Itileni nangu WhatsApp",
    about_kicker: "Kampani",
    about_title: "Ubufundo bwa ku Lusaka ubwa mitwe iingi, no musango umo uwakubomba.",
    about_lead:
      "Twaliikile mu 2021. Tuli tremu ya ba advocate ba Zambia ababomba mu busuma, mu kwishinka no kutungulula umulandu wa kasitomala.",
    about_body:
      "Tupela ubufundo bwa milandu iya nomba, mu bufiifwa no mu cinecine. Mu nsbita shilepita twabomba imilimo ya govamente, amalampo, imilandu ya cupo no milandu ya milimo.",
    mission_label: "Icilolwa",
    mission_text:
      "Ukwasuka ifyo abakasitomala bafwaya ukupitila mu kuleta ubufundo ubwakwebeleko no bwakwafwa mu nshita iine.",
    vision_label: "Iculo",
    vision_text:
      "Ukupeela ubufundo ubusuma ubwa milandu, ne shuko lya kwishinka, ubukankala ne ficincincye.",
    values_label: "Imfwa",
    values_text: "Ukwishinka, ubufiifwa, ubukankala no kwasuka.",
    practice_kicker: "Ifipande fya milimo",
    practice_title: "Ubufundo bonse, mu ng’anda imo.",
    practice_intro:
      "Mwingatuma umulandu uuli onse uwa pano. Nga umulandu uleikuma ifipande ifingi, efico twishiba. Tukamweba ifyo twingabomba.",
    matters_kicker: "Imilimo iyasalwa",
    matters_title: "Imitundu ya milandu twabomba.",
    matters_intro:
      "Amasina na mafyailo yaba mu cipinda. Ici cilelanga umutundu wa milimo, te ndalama ya bakasitomala.",
    approach_kicker: "Ifyo twatendeka",
    approach_title: "Ukulanaya kwa kufupi ilyo tetulipila.",
    contact_kicker: "Icipinda",
    contact_title: "Landa umulandu. Tukamweba nga twingabomba.",
    contact_body:
      "Imelo e nshila iisuma. Tupela ukulanaya kwa mineti ikumi na isano kwa bulyo pakumona nga ndiwe kampani isuma. Mulelipila fye nga mwatuma umulimo. Icipinda cili pa Mande kufika pa Friday, 08:00 kufika 17:00. Nga umulandu taukonka mailo, itileni nangu WhatsApp.",
    lang_label: "Ululimi",
  },
};

const applyLang = (lang) => {
  const dict = copy[lang] || copy.en;
  document.documentElement.lang = lang === "ny" ? "ny" : lang === "bem" ? "bem" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
  try {
    localStorage.setItem("sepo-lang", lang);
  } catch {
    /* ignore */
  }
};

const langMenu = document.querySelector("[data-lang-menu]");
const langToggle = langMenu?.querySelector(".lang-toggle");
const langCard = langMenu?.querySelector(".lang-card");

const setLangOpen = (open) => {
  langToggle?.setAttribute("aria-expanded", String(open));
  if (langCard) langCard.hidden = !open;
};

langToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  setLangOpen(langToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("click", (event) => {
  if (langMenu && !langMenu.contains(event.target)) setLangOpen(false);
});

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLang(btn.dataset.lang);
    setLangOpen(false);
  });
});

let saved = "en";
try {
  saved = localStorage.getItem("sepo-lang") || "en";
} catch {
  saved = "en";
}
applyLang(saved);

const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroTitle = document.querySelector("[data-hero-title]");
const heroCopy = document.querySelector("[data-hero-copy]");
const tickerButtons = [...document.querySelectorAll("[data-ticker] [data-slide]")];
const heroCopySet = [
  {
    title: "Debtors not paying what they owe?",
    copy: "Our lawyers recover what is due, by demand or by the courts, with the file kept in order from the first letter.",
  },
  {
    title: "A family matter that needs quiet handling?",
    copy: "Matrimonial, children’s and succession work is conducted with discretion, and with the same preparation as any commercial brief.",
  },
  {
    title: "Buying, selling or transferring land?",
    copy: "Conveyancing is done with title, occupancy and the register kept in view, so the transfer stands when it has to.",
  },
  {
    title: "A workplace dispute that will not settle itself?",
    copy: "We act for employers and employees, including collective claims against large organisations, without losing the individual file.",
  },
  {
    title: "Facing a criminal charge?",
    copy: "Defence in the courts is prepared with care. You will know who has conduct, and what happens next.",
  },
  {
    title: "Need to regularise status in Zambia?",
    copy: "Immigration instructions are handled as a file, not a form. Permits, status and related applications, explained before they are lodged.",
  },
  {
    title: "Someone using what you created?",
    copy: "Intellectual property is a named specialism of the managing partner. We protect, register and, where required, enforce.",
  },
  {
    title: "A company that needs more than a rubber stamp?",
    copy: "Formation, governance, contracts, mergers and competition sit in one commercial picture, staffed for the brief you actually have.",
  },
  {
    title: "Instructed by, or opposite, the State?",
    copy: "Public-sector mandates and procurement files are familiar ground. Courtesy to the office, and a complete record of the file.",
  },
  {
    title: "A dispute that belongs in court?",
    copy: "Civil litigation in the superior courts, or a quieter route through alternative dispute resolution where that will serve you better.",
  },
];

let heroIndex = 0;
let heroTimer;
let heroBusy = false;
const heroCopyEl = document.querySelector(".hero-copy");
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const applyHeroContent = (index) => {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === heroIndex));
  const item = heroCopySet[heroIndex];
  if (heroTitle) heroTitle.textContent = item.title;
  if (heroCopy) heroCopy.textContent = item.copy;
  tickerButtons.forEach((btn) => {
    btn.classList.toggle("is-current", Number(btn.dataset.slide) === heroIndex);
  });
};

const setHero = async (index, animate = true) => {
  if (!heroSlides.length || heroBusy) return;
  const next = (index + heroSlides.length) % heroSlides.length;
  if (next === heroIndex && animate) return;
  if (!animate || !heroCopyEl) {
    applyHeroContent(next);
    return;
  }
  heroBusy = true;
  heroCopyEl.classList.add("is-leaving");
  await wait(1000);
  applyHeroContent(next);
  await wait(1000);
  heroCopyEl.classList.remove("is-leaving");
  heroBusy = false;
};

const restartHero = () => {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    setHero(heroIndex + 1);
  }, 16000);
};

if (heroSlides.length) {
  applyHeroContent(0);
  restartHero();
  tickerButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setHero(Number(btn.dataset.slide));
      restartHero();
    });
  });
}

const storyButtons = [...document.querySelectorAll("[data-story]")];
const storyImages = [...document.querySelectorAll(".stories-media img")];
const storyIndexEl = document.querySelector("[data-stories-index]");
let storyIndex = 0;
let storyTimer;

const setStory = (index) => {
  if (!storyButtons.length) return;
  storyIndex = (index + storyButtons.length) % storyButtons.length;
  storyButtons.forEach((btn, i) => btn.classList.toggle("is-active", i === storyIndex));
  storyImages.forEach((img, i) => img.classList.toggle("is-active", i === storyIndex));
  if (storyIndexEl) storyIndexEl.textContent = String(storyIndex + 1).padStart(2, "0");
};

const restartStory = () => {
  window.clearInterval(storyTimer);
  storyTimer = window.setInterval(() => setStory(storyIndex + 1), 16000);
};

if (storyButtons.length) {
  setStory(0);
  restartStory();
  storyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setStory(Number(btn.dataset.story));
      restartStory();
    });
  });
}

const focusGrid = document.querySelector(".practice-grid");
const focusCards = [...document.querySelectorAll(".practice-card")];
if (focusGrid && focusCards.length) {
  const clearFocusHover = () => {
    focusCards.forEach((card) => card.classList.remove("is-hovered"));
  };

  focusGrid.addEventListener("pointerover", (event) => {
    const card = event.target.closest(".practice-card");
    if (!card || !focusGrid.contains(card)) return;
    focusCards.forEach((item) => item.classList.toggle("is-hovered", item === card));
  });

  focusGrid.addEventListener("pointerout", (event) => {
    const fromCard = event.target.closest(".practice-card");
    if (!fromCard) return;
    const toNode = event.relatedTarget;
    const toEl = toNode && toNode.nodeType === 1 ? toNode : toNode?.parentElement;
    const toCard = toEl?.closest?.(".practice-card");
    if (toCard && focusGrid.contains(toCard)) return;
    clearFocusHover();
  });
}

document.querySelectorAll(".hero-slide img, .stories-media img").forEach((img) => {
  img.setAttribute("alt", "");
});
