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

const syncHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 50);
};
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener("hashchange", () => {
  // Anchor jumps may not fire a scroll event until after layout.
  requestAnimationFrame(syncHeader);
});
window.addEventListener("pageshow", syncHeader);

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

const syncNavFromScroll = () => {
  if (!sections.length) return;
  // At the hero / very top, no section should claim the nav.
  if (window.scrollY < 80) {
    setCurrentNav(null);
    return;
  }
  const headerOffset = 100;
  const focusY = window.scrollY + window.innerHeight * 0.28;
  let active = null;
  for (const section of sections) {
    const top = section.offsetTop - headerOffset;
    const bottom = top + section.offsetHeight;
    if (focusY >= top && focusY < bottom) {
      active = section.id;
      break;
    }
  }
  setCurrentNav(active);
};

setCurrentNav(null);
syncNavFromScroll();
window.addEventListener("scroll", syncNavFromScroll, { passive: true });
window.addEventListener("hashchange", () => requestAnimationFrame(syncNavFromScroll));

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
    approach_intro:
      "Everyone deserves proper legal representation, whether the matter is large or small. Proper representation also depends on the right fit between client and counsel. Call us, at no charge, and we will see whether we are a good fit for each other.",
    cta_whatsapp: "WhatsApp us",
    cta_call: "Call now",
    contact_kicker: "Chambers",
    contact_title: "Set out the matter. We will tell you if we can act.",
    contact_body:
      "Email is the ordinary way to reach us. We offer a complimentary fifteen-minute discussion to decide whether the firm is the right fit. You are billed only if you instruct us to proceed. Our chambers sit Monday to Friday, 08:00 to 17:00. Life does not pause at the close of business. If a matter cannot wait until morning, telephone or WhatsApp and we will see how we can assist.",
    practice_1_title: "Family, succession and property",
    practice_1_body:
      "Domestic relations, including matrimonial proceedings, and the administration of estates. Conveyancing for the purchase, sale and transfer of land. We treat these files with the discretion they require, and with the same rigour as any commercial brief.",
    practice_2_title: "Corporate, commercial and company secretarial",
    practice_2_body:
      "Formation, governance and the day-to-day life of companies. Contract drafting, commercial advice and merger work. Competition issues are handled as part of the same commercial picture, not as an afterthought.",
    practice_3_title: "Employment, labour and collective claims",
    practice_3_body:
      "Instructions from both employers and employees, including disputes that rise beyond a single workplace. We are presently instructed on collective action against a substantial employer, and we remain available for ordinary labour files as well.",
    practice_4_title: "Litigation, crime and dispute resolution",
    practice_4_body:
      "Civil litigation in the superior courts, criminal defence, and debt recovery. Where a quieter route is available, we advise on alternative dispute resolution. The object is a result, not a spectacle.",
    practice_5_title: "Banking, finance and public-sector work",
    practice_5_body:
      "Lending, security and the recovery of private loans. Public procurement, constitutional and administrative law, and government-related mandates, drawing on more than two decades of procurement experience within the team. We are comfortable opposite the State, and instructed by it.",
    practice_6_title: "Immigration, intellectual property and rights",
    practice_6_body:
      "Permits, status and related applications. Intellectual property, including the managing partner’s postgraduate specialism. Human rights instructions, and legislative drafting for those who need a statute or instrument properly made.",
    story_1_title: "Government and related mandates",
    story_1_body:
      "Instructions touching the State, public bodies and public procurement. Work that requires both courtesy and a complete file.",
    story_2_title: "Labour disputes and collective claims",
    story_2_body:
      "Including a class of claims against a large employer. Individual grievances are received with the same attention.",
    story_3_title: "Divorce and related matters",
    story_3_body:
      "Divorce and related arrangements, conducted without publicity and without treating the family as a spectacle.",
    story_4_title: "Private lending and recovery",
    story_4_body:
      "Demand, account and, where required, proceedings to recover sums advanced, with interest and limitation kept in view.",
    story_5_title: "Land, title and occupation",
    story_5_body:
      "Disputes as to identity of land, chain of interest and the proper forum, including work that arises outside Lusaka as well as within it.",
    step_1_title: "Write to us",
    step_1_body:
      "A short account of what has occurred is enough. Email is the ordinary channel. Documents need not be perfect on the first sending.",
    step_2_title: "Fifteen minutes, without charge",
    step_2_body:
      "We listen, and we say whether we are the right firm. If we are not, we will say so. Nothing is billed for that discussion.",
    step_3_title: "A quotation, then instructions",
    step_3_body:
      "If you wish to proceed, we quote. Fees arise only once you instruct us. Scope and next steps are agreed in writing.",
    step_4_title: "The file is held",
    step_4_body:
      "Filing, negotiation or hearing. You will know who has conduct. If the matter cannot wait until morning, say so.",
    team_kicker: "People",
    team_title: "The advocates with conduct of the work.",
    team_intro:
      "A lean Lusaka bench: court craft, public-service experience, procurement, legislative drafting and commercial work.",
    role_managing_partner: "Managing Partner",
    role_advocate: "Advocate",
    role_senior_associate: "Senior Associate",
    role_legal_consultant: "Legal Consultant",
    bio_monde:
      "Advocate of the High Court for Zambia. LLB (ZAOU); LLM in Intellectual Property (UNILUS); postgraduate diplomas in legislative drafting (ZIALE) and lecturing. Formerly Principal State Advocate, Ministry of Justice. Audience in all Superior Courts of Zambia.",
    bio_samarantha:
      "Advocate of the High Court for Zambia. LLB and Master of Arts in Development Studies (Cavendish University). More than five years in corporate advisory, legal compliance, contract management, labour advisory and litigation support.",
    bio_gilbert:
      "Advocate of the High Court for Zambia. LLB; LLM in Environmental Law; presently pursuing a postgraduate diploma in Risk Management. More than twenty years in government and private practice across criminal law, civil litigation, corporate governance and compliance.",
    bio_maxwell:
      "Advocate of the High Court for Zambia. Public health specialist and trade unionist; formerly President of EPHUZ and presently Vice President of UHAWUZ. LLB (ZAOU); Diploma in Environmental Health Sciences (Evelyn Hone College).",
    footer_rights: "Sepo Legal Practitioners. All rights reserved.",
    footer_notice:
      "This site does not collect or store personal data. Correspondence you choose to send by email, telephone or WhatsApp is received off-site for the purpose of considering instructions. This page is not legal advice, and contact does not create a client relationship until we confirm we can act.",

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
    approach_intro:
      "Aliyense ayenera kupeza chithandizo cha zamalamulo choyenera, kaya nkhani ndi yaikulu kapena yaing’ono. Chithandizo choyenera chimafunikiranso kugwirizana kwa kasitomala ndi loya. Timbani, kwaulere, tionetse ngati tingagwirizane.",
    cta_whatsapp: "WhatsApp",
    cta_call: "Imbani tsopano",
    contact_kicker: "Ofesi",
    contact_title: "Fotokozani nkhaniyanu. Tiwuza ngati titha kugwira.",
    contact_body:
      "Imelo ndiyo njira yabwinoko. Timapereka kukambirana kwa mphindi khumi ndi zisanu zaulere kuti tionetse ngati ndife kampani yoyenera. Mumalipira pokhapokha mutatipatsa ntchito. Ofesi ili pa Lolemba mpaka Lachisanu, 08:00 mpaka 17:00. Ngati nkhani siyingadikire m’mawa, imbani kapena WhatsApp.",
    practice_1_title: "Banja, cholowa ndi malo",
    practice_1_body:
      "Nkhani za banja, kuphatikizapo milandu ya ukwati, ndi kuyang’anira chuma cha omwalira. Conveyancing pa kugula, kugulitsa ndi kusamutsa malo. Timagwira mafayilowa mwachinsinsi, ndi kuchita bwino ngati ntchito ina iliyonse ya bizinesi.",
    practice_2_title: "Makampani, malonda ndi company secretarial",
    practice_2_body:
      "Kukhazikitsa makampani, kayendedwe kawo ndi ntchito za tsiku ndi tsiku. Kulemba makontrakiti, upangiri wa malonda ndi ntchito za merger. Nkhani za competition zimayendetsedwa pamodzi ndi nkhani yonse ya bizinesi, osati monga chinthu chotsatirira.",
    practice_3_title: "Ntchito, labour ndi milandu yogwirizana",
    practice_3_body:
      "Timalandira nkhani kuchokera kwa abwana ndi antchito, kuphatikizapo milandu yopitilira malo amodzi a ntchito. Pakali pano tili ndi ntchito ya collective claims motsutsana ndi kampani yaikulu, ndipo tiliponso okonzeka pa nkhani za labour za tsiku ndi tsiku.",
    practice_4_title: "Milandu,upandu ndi kuthetsa mikangano",
    practice_4_body:
      "Civil litigation m’makhoti apamwamba, chitetezo cha milandu yaupandu, ndi kubweza ngongole. Pomwe njira yachetechete ilipo, timapereka upangiri wa alternative dispute resolution. Cholinga ndi chotsatira, osati chiwonetsero.",
    practice_5_title: "Mabanki, ndalama ndi ntchito za boma",
    practice_5_body:
      "Ngongole, chitetezo ndi kubweza ndalama za munthu payekha. Public procurement, constitutional ndi administrative law, ndi ntchito zogwirizana ndi boma, potengera zaka zoposa makumi awiri za procurement mu gulu lathu. Timakhala bwino motsutsana ndi boma, komanso tikalandira ntchito kuchokera kwa boma.",
    practice_6_title: "Immigration, intellectual property ndi ufulu",
    practice_6_body:
      "Ziphaso, udindo ndi mapempho ogwirizana. Intellectual property, kuphatikizapo maphunziro a managing partner. Nkhani za human rights, ndi legislative drafting kwa iwo ofuna malamulo kapena zolemba zopangidwa bwino.",
    story_1_title: "Ntchito za boma ndi zofananira",
    story_1_body:
      "Nkhani zokhudza boma, mabungwe a boma ndi public procurement. Ntchito yofuna ulemu ndi fayilo yathunthu.",
    story_2_title: "Mikangano ya ntchito ndi collective claims",
    story_2_body:
      "Kuphatikizapo gulu la milandu motsutsana ndi abwana aakulu. Nkhani ya munthu payekha imalandiridwanso ndi chidwi chomwecho.",
    story_3_title: "Chisudzulo ndi nkhani zofananira",
    story_3_body:
      "Chisudzulo ndi makonzedwe ofananira, mopanda kufalitsa nkhani ndi mopanda kuchita banja ngati chiwonetsero.",
    story_4_title: "Ngongole zapayekha ndi kubweza",
    story_4_body:
      "Kufunsa, kuwerengera ndi, ngati kufunika, milandu yobweza ndalama zoperekedwa, ndi chiwongoladzanja ndi nthawi yalamulo zikuganiziridwa.",
    story_5_title: "Malo, title ndi kukhalapo",
    story_5_body:
      "Mikangano ya kudziwika kwa malo, mbiri ya ufulu ndi khoti loyenera, kuphatikizapo ntchito kunja kwa Lusaka komanso mkati mwake.",
    step_1_title: "Tilembereni",
    step_1_body:
      "Nkhani yachidule ya zomwe zachitika ndi yokwanira. Imelo ndiyo njira yodziwika. Mapepala sayenera kukhala angwiro pa kutumiza koyamba.",
    step_2_title: "Mphindi khumi ndi zisanu, kwaulere",
    step_2_body:
      "Timamvera, ndipo timanena ngati ndife kampani yoyenera. Ngati sitiri, tiwuza. Palibe cholowera pa kukambiranako.",
    step_3_title: "Mtengo, kenako ntchito",
    step_3_body:
      "Ngati mukufuna kupitiliza, tipereka mtengo. Malipiro amayamba pokhapokha mutatipatsa ntchito. Kukula kwa ntchito ndi zotsatira zimavomerezedwa pa chikalata.",
    step_4_title: "Fayilo imasungidwa",
    step_4_body:
      "Kufayila, kukambirana kapena khoti. Mudzidziwa amene ali ndi fayilo. Ngati nkhani siyingadikire m’mawa, nenani.",
    team_kicker: "Anthu",
    team_title: "Ma advocate omwe ali ndi ntchito.",
    team_intro:
      "Gulu laling’ono la Lusaka: luso la khoti, ntchito ya boma, procurement, kulemba malamulo ndi ntchito za bizinesi.",
    role_managing_partner: "Managing Partner",
    role_advocate: "Advocate",
    role_senior_associate: "Senior Associate",
    role_legal_consultant: "Legal Consultant",
    bio_monde:
      "Advocate wa High Court ya Zambia. LLB (ZAOU); LLM ya Intellectual Property (UNILUS); diploma za legislative drafting (ZIALE) ndi kuphunzitsa. Kale Principal State Advocate, Ministry of Justice. Ali ndi ufulu wa kuyimba m’makhoti onse apamwamba a Zambia.",
    bio_samarantha:
      "Advocate wa High Court ya Zambia. LLB ndi Master of Arts ya Development Studies (Cavendish University). Zaka zoposa zisanu mu upangiri wa makampani, kugwirizana ndi malamulo, kayendedwe ka makontrakiti, labour ndi thandizo la milandu.",
    bio_gilbert:
      "Advocate wa High Court ya Zambia. LLB; LLM ya Environmental Law; pakali pano akupanga postgraduate diploma ya Risk Management. Zaka zoposa makumi awiri mu boma ndi ntchito yachinsinsi pa criminal law, civil litigation, corporate governance ndi compliance.",
    bio_maxwell:
      "Advocate wa High Court ya Zambia. Katswiri wa umoyo wa anthu ndi trade unionist; kale Purezidenti wa EPHUZ ndipo panopa Wachiwiri kwa Purezidenti wa UHAWUZ. LLB (ZAOU); Diploma ya Environmental Health Sciences (Evelyn Hone College).",
    footer_rights: "Sepo Legal Practitioners. Ufulu wonse wasungidwa.",
    footer_notice:
      "Tsambali silisonkhana kapena kusunga data yanu. Makalata omwe mumasankha kutumiza ndi imelo, foni kapena WhatsApp amalandiridwa kunja kwa tsamba kuti tionetse ngati tingalandire ntchito. Izi sizalangiza za malamulo, ndipo kulumikizana sikupanga ubale wa kasitomala mpaka titsiye kuti titha kugwira.",

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
    approach_intro:
      "Umuntu onse afwile ukwata ubufundo ubusuma, nangu umulandu ulechepa nangu ukalamba. Ubufundo ubusuma bulaloleka na pa kulingana pakati ka kasitomala na lawyer. Itileni, kwa bulyo, pakumona nga twalingana.",
    cta_whatsapp: "WhatsApp",
    cta_call: "Itileni nomba",
    contact_kicker: "Icipinda",
    contact_title: "Landa umulandu. Tukamweba nga twingabomba.",
    contact_body:
      "Imelo e nshila iisuma. Tupela ukulanaya kwa mineti ikumi na isano kwa bulyo pakumona nga ndiwe kampani isuma. Mulelipila fye nga mwatuma umulimo. Icipinda cili pa Mande kufika pa Friday, 08:00 kufika 17:00. Nga umulandu taukonka mailo, itileni nangu WhatsApp.",
    practice_1_title: "Umukwai, ukupokelela ne fyalo",
    practice_1_body:
      "Imilandu ya umukwai, ukupatulapo imilandu ya cupo, no kulungamika ifintu fya bafwilile. Conveyancing pa kushita, ukushitisha no kusamusha ifyalo. Twabomba ifyailo ifi mu bufiifwa, no mu cinecine nga imilimo iingi iya bizinesi.",
    practice_2_title: "Amakampani, amalonda na company secretarial",
    practice_2_body:
      "Ukwikisha amakampani, ukutungulula no milimo ya ciku na ciku. Ukulenga amakontrakiti, ubufundo bwa malonda ne milimo ya merger. Imilandu ya competition ilebomba pamodzi ne mulandu wonse wa bizinesi, te nga cuma cakutwala.",
    practice_3_title: "Imilimo, labour ne milandu iyabombela pamo",
    practice_3_body:
      "Twapokelela imilandu kuli ababomba na abakalamba, ukupatulapo imilandu iyalenga icalo cimo. Nomba tuli ne milimo ya collective claims ukulwa ne kampani ikalamba, kabili twakwata no milandu iya labour iya ciku na ciku.",
    practice_4_title: "Imilandu, ububifi no kusonta amakaka",
    practice_4_body:
      "Civil litigation mu makoti ayakalamba, ukulama mu milandu yaububifi, no kukonka amalampo. Apo inshila iishipilibuka ili, tupela ubufundo bwa alternative dispute resolution. Icilolwa e ficincincye, te ciishibishibisha.",
    practice_5_title: "Amabanki, indalama ne milimo ya govamente",
    practice_5_body:
      "Amalampo, ukulama no kukonka indalama sha muntu mwine. Public procurement, constitutional na administrative law, ne milimo iya govamente, ukufuma ku myaka iingi iya procurement mu tremu yesu. Twishiba ukubomba na govamente, kabili twapokelela no milimo kuli yo.",
    practice_6_title: "Immigration, intellectual property ne nsambu",
    practice_6_body:
      "Amapemiti, umushobo ne filombwa ifyalunduluka. Intellectual property, ukupatulapo amasambililo ya managing partner. Imilandu ya human rights, ne legislative drafting kuli abo abafwaya ifunde nangu icipapulo icisuma.",
    story_1_title: "Imilimo ya govamente ne ifyalunduluka",
    story_1_body:
      "Imilandu iya govamente, amabungwe ya boma ne public procurement. Imilimo iifwaya ubucinshi ne fyailo fyasuma.",
    story_2_title: "Amakaka ya milimo ne collective claims",
    story_2_body:
      "Ukupatulapo icilunduluko ca milandu ukulwa ne bakalamba. Umulandu wa muntu umo naumo wapokelelwa ne cinecine cimo.",
    story_3_title: "Ukulekana ne milandu iyalunduluka",
    story_3_body:
      "Ukulekana ne fikonka, ukwabula ukufumya ifyebo no kwabula ukucita umukwai nga ciishibishibisha.",
    story_4_title: "Amalampo ya muntu mwine no kukonka",
    story_4_body:
      "Ukufwaya, ukubala, na apo cifwile, imilandu yakukonka indalama shapelwe, ne interest ne nshita ya mulandu shiletungululwa.",
    story_5_title: "Ifyalo, title ne ukwikala",
    story_5_body:
      "Amakaka ya kwishiba icalo, umulandu wa nsambu ne koti iyene, ukupatulapo imilimo iya kunse kwa Lusaka na muli yo.",
    step_1_title: "Mutulembeniko",
    step_1_body:
      "Umulandu wanguhi wa ifyo fyacitike e wakwanisha. Imelo e nshila iishibikwa. Amapepala tayafwile ukuba ayasuma pa kutuma kwa ntanshi.",
    step_2_title: "Amineti ikumi na isano, kwa bulyo",
    step_2_body:
      "Twumfwa, no kwipusha nga ndiwe kampani isuma. Nga tetuli, tukamweba. Takuli ukulipila pa ukulanaya uku.",
    step_3_title: "Umushinshi, elyo imilimo",
    step_3_body:
      "Nga mufwaya ukutwala, tupela umushinshi. Indalama shaletendeka fye nga mwatuma umulimo. Ukukulu kwa milimo ne fikonka fyalangululwa pa cipapulo.",
    step_4_title: "Ifyailo fyasungwa",
    step_4_body:
      "Ukufayila, ukulanaya nangu koti. Mukamona uuli ne fyailo. Nga umulandu taukonka mailo, landeni.",
    team_kicker: "Abantu",
    team_title: "Aba advocate abali ne milimo.",
    team_intro:
      "Itremu inono iya Lusaka: ubukankala bwa koti, imilimo ya govamente, procurement, ukulenga ifunde ne milimo ya bizinesi.",
    role_managing_partner: "Managing Partner",
    role_advocate: "Advocate",
    role_senior_associate: "Senior Associate",
    role_legal_consultant: "Legal Consultant",
    bio_monde:
      "Advocate wa High Court ya Zambia. LLB (ZAOU); LLM ya Intellectual Property (UNILUS); diploma sha legislative drafting (ZIALE) no kufunda. Kale Principal State Advocate, Ministry of Justice. Ali ne nsambu shakwimba mu makoti yonse ayakalamba aya Zambia.",
    bio_samarantha:
      "Advocate wa High Court ya Zambia. LLB ne Master of Arts ya Development Studies (Cavendish University). Imyaka iingi iya konsa mu ubufundo bwa amakampani, ukukonka ifunde, ukutungulula amakontrakiti, labour no kwafwilisha imilandu.",
    bio_gilbert:
      "Advocate wa High Court ya Zambia. LLB; LLM ya Environmental Law; nomba alebomba postgraduate diploma ya Risk Management. Imyaka iingi iya makumi yabili mu govamente ne milimo ya cinecine pa criminal law, civil litigation, corporate governance ne compliance.",
    bio_maxwell:
      "Advocate wa High Court ya Zambia. Ubukankala bwa umoyo wa bantu ne trade unionist; kale Purezidenti wa EPHUZ kabili nomba Wachibili ku Purezidenti wa UHAWUZ. LLB (ZAOU); Diploma ya Environmental Health Sciences (Evelyn Hone College).",
    footer_rights: "Sepo Legal Practitioners. Nsambu shonse shasungwa.",
    footer_notice:
      "Ici peji tacilundulula nangu ukusunga data yenu. Amakalata ayo musala ukutuma ne imelo, foni nangu WhatsApp yapokelelwa kunse kwa peji pakumona nga twingapokelela umulimo. Ici te bufundo bwa milandu, no kwisalana takuleta ubulundano bwa kasitomala ilyo twamweba ukuti twingabomba.",

    lang_label: "Ululimi",
  },
};

let currentLang = "en";

const applyLang = (lang) => {
  currentLang = copy[lang] ? lang : "en";
  const dict = copy[currentLang];
  document.documentElement.lang = currentLang === "ny" ? "ny" : currentLang === "bem" ? "bem" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === currentLang));
  });
  try {
    localStorage.setItem("sepo-lang", currentLang);
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
    if (typeof applyHeroContent === "function" && heroSlides?.length) {
      applyHeroContent(heroIndex);
    }
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
const heroCopyByLang = {
  en: [
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
  ],
  ny: [
    {
      title: "Ngongole sizikulipidwa?",
      copy: "Ma loya athu amabweza zoyenera, ndi kufunsa kapena ndi khoti, fayilo ikakhala yabwino kuyambira kalata yoyamba.",
    },
    {
      title: "Nkhani ya banja yofuna kuyang’aniridwa mwachinsinsi?",
      copy: "Nkhani za ukwati, ana ndi cholowa zimagwiridwa mwachinsinsi, ndi kukonzekera kofanana ndi ntchito ina iliyonse ya bizinesi.",
    },
    {
      title: "Mukugula, kugulitsa kapena kusamutsa malo?",
      copy: "Conveyancing imagwiridwa ndi title, kukhalapo ndi register zikuganiziridwa, kuti kusamutsa kukhale kolimba.",
    },
    {
      title: "Mkangano wa ntchito usatheka wokha?",
      copy: "Timayimira abwana ndi antchito, kuphatikizapo collective claims motsutsana ndi mabungwe aakulu, osasiya fayilo ya munthu payekha.",
    },
    {
      title: "Mukumangidwa milandu yaupandu?",
      copy: "Chitetezo m’makhoti chimakonzekera mosamala. Mudzidziwa amene ali ndi fayilo, ndi zotsatira.",
    },
    {
      title: "Mukufuna kukonza udindo wanu mu Zambia?",
      copy: "Nkhani za immigration zimagwiridwa ngati fayilo, osati fomu yokha. Ziphaso, udindo ndi mapempho, zofotokozedwa musanafayilidwe.",
    },
    {
      title: "Wina akugwiritsa ntchito zomwe munapanga?",
      copy: "Intellectual property ndi luso la managing partner. Timateteza, kulembetsa ndi, ngati kufunika, kukakamiza.",
    },
    {
      title: "Kampani yofuna zoposa chitsindikizo chabe?",
      copy: "Kukhazikitsa, kayendedwe, makontrakiti, mergers ndi competition zili mu chithunzi chimodzi cha bizinesi, chokwanira nkhaniyanu.",
    },
    {
      title: "Ntchito ya boma, kapena motsutsana ndi boma?",
      copy: "Ntchito za boma ndi procurement ndi zodziwika. Ulemu ku ofesi, ndi mbiri yathunthu ya fayilo.",
    },
    {
      title: "Mkangano woyenera khoti?",
      copy: "Civil litigation m’makhoti apamwamba, kapena njira yachetechete ya alternative dispute resolution pomwe izothandizani.",
    },
  ],
  bem: [
    {
      title: "Amalampo tayalipilwa?",
      copy: "Aba lawyer besu bakonka ifyo fyafwile, ukufuma ku kufwaya nangu ku koti, ifyailo fyasuma ukufuma ku kalata ka ntanshi.",
    },
    {
      title: "Umulandu wa umukwai uufwaya ukutungululwa mu bufiifwa?",
      copy: "Imilandu ya cupo, abana ne ukupokelela ilebomba mu bufiifwa, no kwampana ukulingana ne milimo iingi iya bizinesi.",
    },
    {
      title: "Muleshita, ukushitisha nangu ukusamusha icalo?",
      copy: "Conveyancing ilebomba ne title, ukwikala ne register shiletungululwa, pakuti ukusamusha kube kwasuma.",
    },
    {
      title: "Akaka ka milimo takaleka mwine?",
      copy: "Twimina ababomba na abakalamba, ukupatulapo collective claims ukulwa ne mabungwe ayakalamba, ukwabula ukuleka ifyailo fya muntu umo.",
    },
    {
      title: "Muli ne milandu yaububifi?",
      copy: "Ukulama mu makoti kulelangululwa mu cinecine. Mukamona uuli ne fyailo, ne fikonka.",
    },
    {
      title: "Mufwaya ukulungamika umushobo mu Zambia?",
      copy: "Imilandu ya immigration ilebomba nga fyailo, te fomu fye. Amapemiti, umushobo ne filombwa, fyalandululwa ilyo tetafayilwa.",
    },
    {
      title: "Umbi alebomba ifyo mwalenga?",
      copy: "Intellectual property e bukankala bwa managing partner. Tulama, ukulembanya, na apo cifwile, ukukakatika.",
    },
    {
      title: "Ikampani iifwaya ukulenga icipande cimo?",
      copy: "Ukwikisha, ukutungulula, amakontrakiti, mergers ne competition yaba mu cishinka cimo ca bizinesi, icakulingana ne mulandu wenu.",
    },
    {
      title: "Imilimo ya govamente, nangu ukulwa na yo?",
      copy: "Imilimo ya govamente ne procurement eyishibikwa. Ubucinshi ku ofesi, ne fyebo fyasuma fya fyailo.",
    },
    {
      title: "Akaka kafwile ku koti?",
      copy: "Civil litigation mu makoti ayakalamba, nangu inshila iishipilibuka ya alternative dispute resolution apo ikafwa.",
    },
  ],
};

const getHeroCopySet = () => heroCopyByLang[currentLang] || heroCopyByLang.en;

let heroIndex = 0;
let heroTimer;
let heroBusy = false;
const heroCopyEl = document.querySelector(".hero-copy");
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const applyHeroContent = (index) => {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === heroIndex));
  const item = getHeroCopySet()[heroIndex];
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

(() => {
  const personCards = [...document.querySelectorAll(".person-card")];
  if (!personCards.length) return;

  const tapMedia = window.matchMedia("(hover: none)");
  let tapUi = tapMedia.matches;

  const collapseAll = () => {
    personCards.forEach((card) => card.classList.remove("is-expanded"));
  };

  const syncTabIndex = () => {
    personCards.forEach((card) => {
      const open = !tapUi || card.classList.contains("is-expanded");
      card.querySelectorAll(".person-links a").forEach((link) => {
        link.tabIndex = open ? 0 : -1;
      });
    });
  };

  tapMedia.addEventListener("change", () => {
    tapUi = tapMedia.matches;
    if (!tapUi) collapseAll();
    syncTabIndex();
  });

  personCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (!tapUi) return;
      if (event.target.closest(".person-links a")) return;
      const willExpand = !card.classList.contains("is-expanded");
      collapseAll();
      if (willExpand) card.classList.add("is-expanded");
      syncTabIndex();
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!tapUi) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (personCards.some((card) => card.contains(target))) return;
    collapseAll();
    syncTabIndex();
  });

  syncTabIndex();
})();
