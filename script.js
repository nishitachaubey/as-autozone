/* AS Autozone: catalog, hero carousel, compare, Help me choose and the enquiry form (sent with FormSubmit). */
(function () {
  "use strict";

  /* ---------- Settings you can change ---------- */
  var FORMSUBMIT_EMAIL = "asautozone01@gmail.com";   /* every enquiry is emailed here */
  var CONFIG = { phone: "", whatsapp: "", email: "", address: "", hours: "" };  /* shown in the contact block when filled in */
  var PHOTO_DIR = "images/";   /* put vehicle photos in this folder */
  var PHOTO_EXTS = ["jpg", "jpeg", "png", "webp"];   /* photo name = vehicle id + one of these, e.g. images/tata-intra-v30.jpg */

  var BRANDS = { tata: { label: "Tata" }, mahindra: { label: "Mahindra" }, maruti: { label: "Maruti" }, eicher: { label: "Eicher" } };
  var CATS = { tempo: "Tempos and cargo", pickup: "Pickups" };
  var CAT_SINGLE = { tempo: "Tempo / mini truck", pickup: "Pickup" };

  /* kg and seats are approximate and only used to sort results in Help me choose. */
  var V = [
    { id: "tata-ace-gold", brand: "tata", name: "Ace Gold", cat: "tempo", body: "mini", fuels: ["Diesel", "Petrol", "CNG"], capLabel: "Payload", cap: "Around 750 kg", kg: 750,
      blurb: "Compact four-wheel mini truck for dense city deliveries.", good: ["Shop and market deliveries", "FMCG and e-commerce distribution", "Narrow lanes and tight turns"] },
    { id: "tata-ace-pro", brand: "tata", name: "Ace Pro", cat: "tempo", body: "mini", fuels: ["Petrol", "CNG", "Electric"], capLabel: "Payload", cap: "Around 750 kg", kg: 750,
      blurb: "Small truck with several fuel choices, including electric.", good: ["City delivery routes", "Operators who want lower running costs", "Fleets that mix fuel types"] },
    { id: "tata-ace-ev", brand: "tata", name: "Ace EV", cat: "tempo", body: "mini", fuels: ["Electric"], capLabel: "Payload", cap: "Around 600 kg", kg: 600,
      blurb: "Electric small truck for fixed city routes.", good: ["Last-mile logistics", "Routes with overnight charging", "Zero tailpipe emissions"] },
    { id: "tata-intra-v30", brand: "tata", name: "Intra V30", cat: "pickup", body: "pickup", fuels: ["Diesel"], capLabel: "Payload", cap: "1,300 kg", kg: 1300,
      blurb: "Pickup for heavier loads and longer daily distances.", good: ["Building material and cartons", "Agricultural produce", "Intercity goods runs"] },
    { id: "tata-intra-v40", brand: "tata", name: "Intra V40", cat: "pickup", body: "pickup", fuels: ["Petrol", "CNG"], capLabel: "Payload", cap: "Ask our team", kg: 1100,
      blurb: "Bi-fuel pickup from the Intra range that runs on petrol and CNG.", good: ["Operators who want CNG running costs", "City and intercity goods", "Fleets moving to alternate fuels"] },
    { id: "tata-intra-v50", brand: "tata", name: "Intra V50", cat: "pickup", body: "pickup", fuels: ["Diesel"], capLabel: "Payload", cap: "Ask our team", kg: 1500,
      blurb: "Diesel pickup from the Intra range for bigger loads.", good: ["Heavy goods", "Long daily distances", "Construction and agri supply"] },
    { id: "tata-intra-v70", brand: "tata", name: "Intra V70", cat: "pickup", body: "pickup", fuels: ["Diesel"], capLabel: "Payload", cap: "2 tonne class", kg: 2000,
      blurb: "Two-tonne class diesel pickup, the biggest of the Intra range.", good: ["Heavy and bulky loads", "Highway and long-route goods", "Transport and logistics fleets"] },

    { id: "mahindra-bolero-pikup", brand: "mahindra", name: "Bolero Pik-Up", cat: "pickup", body: "pickup", fuels: ["Diesel"], capLabel: "Payload", cap: "1.3 to 1.7 tonne and above", kg: 1500,
      blurb: "Widely used pickup for tough roads and heavy loads.", good: ["Agriculture and rural transport", "Construction and building material", "Long-route goods"] },
    { id: "mahindra-veero", brand: "mahindra", name: "Veero", cat: "pickup", body: "pickup", fuels: ["Diesel", "CNG"], capLabel: "Payload", cap: "Ask our team", kg: 1500,
      blurb: "Mahindra small commercial vehicle available in both diesel and CNG.", good: ["City and intercity goods", "Operators who want a CNG option", "Small businesses and fleets"] },

    { id: "maruti-super-carry", brand: "maruti", name: "Super Carry", cat: "tempo", body: "mini", fuels: ["Petrol", "CNG"], capLabel: "Payload", cap: "Around 740 kg", kg: 740,
      blurb: "Mini truck with petrol and CNG options.", good: ["City goods delivery", "Small traders and shops", "Low-noise urban routes"] },
    { id: "maruti-eeco-cargo", brand: "maruti", name: "Eeco Cargo", cat: "tempo", body: "vancargo", fuels: ["Petrol", "CNG"], capLabel: "Body", cap: "Enclosed cargo van", kg: 500,
      blurb: "Closed cargo van that keeps goods dry and secure.", good: ["Courier and parcel service", "Enclosed goods", "Door-to-door supply"] },

    { id: "eicher-pro-x", brand: "eicher", name: "Pro X", cat: "pickup", body: "truck", fuels: ["Diesel", "CNG"], capLabel: "Payload", cap: "Ask our team", kg: 2000,
      blurb: "Eicher light truck available in diesel and CNG.", good: ["Regular heavy runs", "City and intercity goods", "Transport and fleet businesses"] }
  ];

  var SLIDES = [
    { vid: "eicher-pro-x", filter: { brand: "eicher" }, label: "Eicher", h: "Meet the <em>Pro X</em>", cta: "See Eicher",
      sub: "The Eicher Pro X is available in both diesel and CNG." },
    { vid: "tata-intra-v70", filter: { cat: "pickup" }, label: "Pickups", h: "Power for <em>heavy</em> loads", cta: "See all pickups",
      sub: "Tata Intra pickups, the Mahindra Bolero Pik-Up and the Eicher Pro X for heavy loads and long routes." },
    { vid: "tata-ace-gold", filter: { cat: "tempo" }, label: "Tempos and cargo", h: "Built for <em>daily</em> deliveries", cta: "See tempos and cargo",
      sub: "Tata Ace, Maruti Super Carry and Eeco Cargo for shops, markets and delivery fleets." },
    { vid: "mahindra-bolero-pikup", filter: { brand: "mahindra" }, label: "Mahindra", h: "Built for <em>tough</em> roads", cta: "See Mahindra",
      sub: "The Mahindra Bolero Pik-Up and the Veero, which comes in both diesel and CNG." }
  ];

  /* ---------- Helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function byId(id) { for (var i = 0; i < V.length; i++) if (V[i].id === id) return V[i]; return null; }
  function fullName(v) { return BRANDS[v.brand].label + " " + v.name; }
  var reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- Vehicle pictures ----------
     A real photo (images/<id>.jpg) is used when it exists. Until then a drawn vehicle is shown. */
  var photos = {}, probing = {};
  function photoUrls(v) { return v.photo ? [v.photo] : PHOTO_EXTS.map(function (x) { return PHOTO_DIR + v.id + "." + x; }); }
  function applyPhoto(id) {
    $$('.vimg[data-id="' + id + '"]').forEach(function (el) {
      if (el.classList.contains("has-photo")) return;
      var img = $("img", el); if (!img) return;
      img.src = photos[id]; el.classList.add("has-photo");
    });
  }
  function probe(id) {
    if (id in photos || probing[id]) { if (photos[id]) applyPhoto(id); return; }
    probing[id] = true;
    var urls = photoUrls(byId(id)), k = 0;
    (function next() {
      if (k >= urls.length) { photos[id] = false; return; }
      var im = new Image(), u = urls[k++];
      im.onload = function () { photos[id] = u; applyPhoto(id); };
      im.onerror = next;
      im.src = u;
    })();
  }
  function hydrate() { $$(".vimg:not(.has-photo)").forEach(function (el) { probe(el.getAttribute("data-id")); }); }
  function vimg(v) {
    var url = photos[v.id];
    return '<div class="vimg' + (url ? " has-photo" : "") + '" data-id="' + esc(v.id) + '"><div class="fb" aria-hidden="true"><span class="fbn">' + esc(v.name) + "</span>" + art(v) + "</div>" +
      '<img alt="' + esc(fullName(v)) + '" decoding="async"' + (url ? ' src="' + esc(url) + '"' : "") + "></div>";
  }

  function wheel(x, r) {
    r = r || 15; var cy = 128 - r, hub = r * 0.5, sp = r * 0.42;
    return '<g class="wh"><circle cx="' + x + '" cy="' + cy + '" r="' + r + '" fill="#1B1B20"/><circle cx="' + x + '" cy="' + cy + '" r="' + hub + '" fill="#D8D8DE"/>' +
      '<path d="M' + (x - sp) + " " + cy + "H" + (x + sp) + "M" + x + " " + (cy - sp) + "V" + (cy + sp) + '" stroke="#9A9AA4" stroke-width="2"/><circle cx="' + x + '" cy="' + cy + '" r="2.6" fill="#C00000"/></g>';
  }
  function lettering(x, y, size, text, fill) {
    return '<text x="' + x + '" y="' + y + '" font-family="Barlow Condensed, Arial Narrow, Arial, sans-serif" font-weight="700" font-style="italic" font-size="' + size + '" fill="' + fill + '">' + esc(text) + "</text>";
  }
  function art(v) {
    var body = v.body, brand = BRANDS[v.brand].label.toUpperCase(), model = v.name.toUpperCase();
    var s = '<svg viewBox="0 0 240 140" role="img" aria-hidden="true">', edge = ' stroke="#9E9EA8" stroke-width="1.2"';
    var ev = v.fuels.length === 1 && v.fuels[0] === "Electric";
    if (body === "pickup") {
      s += '<rect x="14" y="98" width="206" height="7" rx="2" fill="#3A3A42"/>';
      s += '<rect x="14" y="66" width="126" height="32" rx="3" fill="url(#gCargo)"' + edge + "/>";
      s += '<rect x="14" y="66" width="126" height="6" fill="#C00000" opacity=".85"/>';
      if (v.id.indexOf("bolero") >= 0) s += '<path d="M20 66V50h114v16" fill="none" stroke="#3A3A42" stroke-width="3" stroke-linejoin="round"/>';
      s += lettering(22, 82, 9, brand, "#55555E") + lettering(22, 94, 15, model, "#C00000");
      s += '<polygon points="144,98 144,46 180,46 196,70 220,76 220,98" fill="url(#gBody)" stroke-linejoin="round"/>';
      s += '<polygon points="150,52 176,52 189,70 150,70" fill="url(#gGlass)"/><rect x="210" y="77" width="9" height="5" rx="1.5" fill="#FFF3B0"/>';
      s += wheel(56) + wheel(186);
    } else if (body === "truck") {
      s += '<rect x="10" y="100" width="216" height="8" rx="2" fill="#3A3A42"/>';
      s += '<rect x="12" y="34" width="138" height="66" rx="3" fill="url(#gCargo)"' + edge + "/>";
      s += '<path d="M12 52h138" stroke="#C00000" stroke-width="5"/>';
      s += lettering(24, 76, 24, brand, "#C00000") + lettering(24, 92, 15, model, "#55555E");
      s += '<polygon points="154,100 154,40 192,40 210,70 228,76 228,100" fill="url(#gBody)" stroke-linejoin="round"/>';
      s += '<polygon points="160,46 188,46 203,70 160,70" fill="url(#gGlass)"/><rect x="218" y="78" width="9" height="5" rx="1.5" fill="#FFF3B0"/>';
      s += wheel(52, 16) + wheel(114, 16) + wheel(194, 16);
    } else if (body === "vancargo") {
      s += '<polygon points="16,100 16,44 148,44 188,68 218,74 218,100" fill="url(#gBody)" stroke-linejoin="round"/>';
      s += '<polygon points="120,52 148,52 178,68 120,68" fill="url(#gGlass)"/><path d="M26 50v46M112 50v46" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>';
      s += lettering(34, 74, 18, brand, "#FFFFFF") + lettering(34, 90, 13, model, "#FFFFFF");
      s += '<rect x="208" y="78" width="9" height="5" rx="1.5" fill="#FFF3B0"/>' + wheel(58) + wheel(178);
    } else {
      s += '<rect x="14" y="98" width="196" height="7" rx="2" fill="#3A3A42"/>';
      s += '<rect x="16" y="50" width="122" height="48" rx="4" fill="url(#gCargo)"' + edge + "/>";
      s += '<rect x="16" y="50" width="122" height="6" fill="#C00000" opacity=".85"/>';
      s += lettering(26, 72, 10, brand, "#55555E") + lettering(26, 90, 18, model, "#C00000");
      if (ev) s += '<rect x="108" y="60" width="24" height="14" rx="7" fill="#C00000"/>' + lettering(113, 71, 11, "EV", "#FFFFFF");
      s += '<polygon points="142,98 142,54 176,54 194,80 208,84 208,98" fill="url(#gBody)" stroke-linejoin="round"/>';
      s += '<polygon points="149,60 172,60 186,80 149,80" fill="url(#gGlass)"/><rect x="198" y="84" width="9" height="5" rx="1.5" fill="#FFF3B0"/>';
      s += wheel(58) + wheel(178);
    }
    return s + "</svg>";
  }

  /* ---------- Header, progress, floating buttons ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || document.documentElement.scrollTop, max = document.documentElement.scrollHeight - window.innerHeight;
      $("#progress").style.setProperty("--p", max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
      $("#topbar").classList.toggle("scrolled", y > 8);
      $("#fab").classList.toggle("show", y > 520);
      $("#totop").classList.toggle("show", y > 900);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#totop").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });

  /* ---------- Full-screen menu ---------- */
  var menu = $("#menu"), menuBtn = $("#menu-open");
  function openMenu() { menu.removeAttribute("inert"); menu.setAttribute("aria-hidden", "false"); menu.classList.add("open"); menuBtn.setAttribute("aria-expanded", "true"); document.documentElement.classList.add("lock"); setTimeout(function () { $("#menu-close").focus(); }, 80); }
  function closeMenu() { menu.classList.remove("open"); menu.setAttribute("inert", ""); menu.setAttribute("aria-hidden", "true"); menuBtn.setAttribute("aria-expanded", "false"); if ($("#overlay").hidden) document.documentElement.classList.remove("lock"); }
  menuBtn.addEventListener("click", openMenu);
  $("#menu-close").addEventListener("click", function () { closeMenu(); menuBtn.focus(); });
  menu.addEventListener("click", function (e) { if (e.target.closest("nav a")) closeMenu(); });

  /* ---------- Hero carousel ---------- */
  var cur = 0, prog = 0, paused = reduced, hoverPause = false, lastT = performance.now(), DUR = 7000;
  function buildHero() {
    $("#slides").innerHTML = SLIDES.map(function (s, i) {
      var v = byId(s.vid), fa = s.filter.cat ? 'data-cat="' + s.filter.cat + '"' : 'data-brand="' + s.filter.brand + '"';
      return '<div class="slide' + (i === 0 ? " is-active" : "") + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + " of " + SLIDES.length + '"><div class="shape"></div><div class="wrap">' +
        '<div class="copy"><span class="label">' + esc(s.label) + "</span><h1>" + s.h + '</h1><p class="sub">' + esc(s.sub) + "</p>" +
        '<div class="cta"><button class="arrow-link" type="button" ' + fa + '><span class="t">' + esc(s.cta) + '</span><span class="ar" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 9h11M10 4l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>' +
        '<button class="btn ghost" type="button" data-enquire="' + esc(v.id) + '">Enquire about ' + esc(v.name) + "</button></div></div>" +
        '<div class="stage"><div class="speed" aria-hidden="true"><i></i><i></i><i></i></div><div class="frame">' + vimg(v) + '</div><div class="tag"><small>' + esc(BRANDS[v.brand].label) + "</small><b>" + esc(v.name) + "</b></div></div></div></div>";
    }).join("");
    $("#inds").innerHTML = SLIDES.map(function (s, i) {
      return '<button class="ind-b" type="button" data-slide="' + i + '" aria-label="Go to slide ' + (i + 1) + ": " + esc(s.label) + '"><span class="bar2"><i></i></span><span class="n">' + ("0" + (i + 1)) + " " + esc(s.label) + "</span></button>";
    }).join("");
    go(0);
  }
  function go(i) {
    cur = (i + SLIDES.length) % SLIDES.length; prog = 0;
    $$(".slide").forEach(function (s, k) { s.classList.toggle("is-active", k === cur); if (k === cur) s.removeAttribute("inert"); else s.setAttribute("inert", ""); });
    $$(".ind-b").forEach(function (b, k) { b.setAttribute("aria-current", String(k === cur)); $("i", b).style.width = "0%"; });
  }
  function setPaused(p) { paused = p; $("#ic-pause").hidden = p; $("#ic-play").hidden = !p; $("#h-play").setAttribute("aria-label", p ? "Play slideshow" : "Pause slideshow"); }
  function tick(t) {
    var dt = Math.min(120, t - lastT); lastT = t;
    if (!paused && !hoverPause) { prog += dt / DUR; if (prog >= 1) go(cur + 1); }
    var b = $$(".ind-b")[cur]; if (b) $("i", b).style.width = (Math.min(prog, 1) * 100).toFixed(1) + "%";
    requestAnimationFrame(tick);
  }
  $("#h-prev").addEventListener("click", function () { go(cur - 1); });
  $("#h-next").addEventListener("click", function () { go(cur + 1); });
  $("#h-play").addEventListener("click", function () { setPaused(!paused); });
  $("#inds").addEventListener("click", function (e) { var b = e.target.closest("[data-slide]"); if (b) go(parseInt(b.getAttribute("data-slide"), 10)); });
  var heroEl = $(".hero");
  heroEl.addEventListener("mouseenter", function () { hoverPause = true; });
  heroEl.addEventListener("mouseleave", function () { hoverPause = false; heroEl.style.setProperty("--px", 0); heroEl.style.setProperty("--py", 0); });
  heroEl.addEventListener("focusin", function () { hoverPause = true; });
  heroEl.addEventListener("focusout", function () { hoverPause = false; });
  heroEl.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") go(cur - 1); if (e.key === "ArrowRight") go(cur + 1); });
  if (!reduced && window.matchMedia && window.matchMedia("(hover: hover)").matches) {
    heroEl.addEventListener("pointermove", function (e) {
      var r = heroEl.getBoundingClientRect();
      heroEl.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      heroEl.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  }

  /* ---------- Stats, reel, brand cards ---------- */
  function renderStats() {
    var items = [[V.length, "Models in the catalog"], [4, "Brands"], [2, "Vehicle types"], [4, "Fuel options"]];
    $("#stats").innerHTML = items.map(function (it) { return '<div class="stat"><b data-target="' + it[0] + '">' + it[0] + "</b><span>" + esc(it[1]) + "</span></div>"; }).join("");
    if (reduced || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return; io.unobserve(en.target);
        var el = en.target, target = parseInt(el.getAttribute("data-target"), 10), t0 = performance.now();
        (function step(t) { var k = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(target * e); if (k < 1) requestAnimationFrame(step); })(t0);
      });
    }, { threshold: 0.6 });
    $$("#stats b").forEach(function (b) { io.observe(b); });
  }
  function renderReel() {
    function tiles(dup) {
      return V.map(function (v) {
        return '<button class="reel-tile" type="button" data-detail="' + esc(v.id) + '"' + (dup ? ' tabindex="-1" aria-hidden="true"' : "") + ">" + vimg(v) +
          '<span class="cap"><small>' + esc(BRANDS[v.brand].label) + "</small><b>" + esc(v.name) + "</b></span></button>";
      }).join("");
    }
    $("#reel-track").innerHTML = tiles(false) + tiles(true);
  }
  function renderBrands() {
    $("#brand-panels").innerHTML = Object.keys(BRANDS).map(function (k, i) {
      var list = V.filter(function (v) { return v.brand === k; });
      return '<button class="brand reveal" style="--d:' + (i * 90) + 'ms" type="button" data-brand="' + k + '"><div><h3>' + esc(BRANDS[k].label) + '</h3><p class="n">' + list.length + (list.length === 1 ? " vehicle" : " vehicles") + '</p></div><div class="models">' +
        list.map(function (v) { return "<span>" + esc(v.name) + "</span>"; }).join("") + '</div><span class="go">View vehicles <i aria-hidden="true">→</i></span></button>';
    }).join("");
    $$(".brand").forEach(function (b) {
      b.addEventListener("pointermove", function (e) { var r = b.getBoundingClientRect(); b.style.setProperty("--mx", (e.clientX - r.left) + "px"); b.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    });
  }

  /* ---------- Catalog ---------- */
  var state = { q: "", brand: "all", cat: "all", fuel: "all" };
  var compare = [];
  function seg(el, items, key) {
    el.innerHTML = items.map(function (it) { return '<button type="button" data-v="' + esc(it[0]) + '" aria-pressed="' + (state[key] === it[0]) + '">' + esc(it[1]) + "</button>"; }).join("");
    el.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; state[key] = b.getAttribute("data-v"); syncSeg(); renderGrid(); });
  }
  function syncSeg() {
    [["#f-brand", "brand"], ["#f-cat", "cat"]].forEach(function (p) { $$("button", $(p[0])).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-v") === state[p[1]])); }); });
  }
  function matches(v) {
    if (state.brand !== "all" && v.brand !== state.brand) return false;
    if (state.cat !== "all" && v.cat !== state.cat) return false;
    if (state.fuel !== "all" && v.fuels.indexOf(state.fuel) < 0) return false;
    if (state.q) {
      var hay = (BRANDS[v.brand].label + " " + v.name + " " + v.fuels.join(" ") + " " + v.blurb + " " + CAT_SINGLE[v.cat]).toLowerCase();
      var parts = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      for (var i = 0; i < parts.length; i++) if (hay.indexOf(parts[i]) < 0) return false;
    }
    return true;
  }
  function cardHTML(v, i) {
    var on = compare.indexOf(v.id) >= 0;
    return '<article class="card" style="--i:' + (i || 0) + '"><div class="media">' + vimg(v) + '<span class="brandchip">' + esc(BRANDS[v.brand].label) + "</span>" +
      '<button class="cmp" type="button" data-cmp="' + esc(v.id) + '" aria-pressed="' + on + '" aria-label="Compare ' + esc(fullName(v)) + '">' + (on ? "Added" : "+ Compare") + "</button></div>" +
      '<div class="body"><h3><button type="button" data-detail="' + esc(v.id) + '">' + esc(v.name) + "</button></h3>" +
      '<p class="cardtype">' + esc(CAT_SINGLE[v.cat]) + " · " + esc(v.blurb) + "</p>" +
      '<div class="cap2"><span>' + esc(v.capLabel) + "</span><b>" + esc(v.cap) + "</b></div>" +
      '<div class="tags">' + v.fuels.map(function (f) { return '<span class="tag2">' + esc(f) + "</span>"; }).join("") + "</div>" +
      '<div class="actions"><button class="btn ghost small" type="button" data-detail="' + esc(v.id) + '">Details</button><button class="btn red small" type="button" data-enquire="' + esc(v.id) + '">Enquire</button></div></div></article>';
  }
  function renderGrid() {
    var list = V.filter(matches);
    $("#count").textContent = "Showing " + list.length + " of " + V.length + " vehicles";
    $("#grid").innerHTML = list.length ? list.map(cardHTML).join("") : '<div class="empty"><h3>No vehicles match</h3><p>Try a different brand, type or fuel, or clear the search.</p><button class="btn red" type="button" id="reset">Show all vehicles</button></div>';
    hydrate();
  }
  function resetFilters() { state = { q: "", brand: "all", cat: "all", fuel: "all" }; $("#f-q").value = ""; $("#f-fuel").value = "all"; syncSeg(); renderGrid(); }
  function showCatalog(patch) {
    state = { q: "", brand: "all", cat: "all", fuel: "all" };
    Object.keys(patch || {}).forEach(function (k) { state[k] = patch[k]; });
    $("#f-q").value = ""; $("#f-fuel").value = "all"; syncSeg(); renderGrid();
    $("#catalog").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }
  if (window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduced) {
    var gridEl = $("#grid");
    gridEl.addEventListener("pointermove", function (e) {
      var c = e.target.closest(".card"); if (!c) return;
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.setProperty("--ry", (x * 6).toFixed(2) + "deg"); c.style.setProperty("--rx", (-y * 6).toFixed(2) + "deg");
    });
    gridEl.addEventListener("pointerout", function (e) { var c = e.target.closest(".card"); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--ry", "0deg"); c.style.setProperty("--rx", "0deg"); } });
  }

  /* ---------- Compare ---------- */
  function toggleCompare(id) {
    var i = compare.indexOf(id);
    if (i >= 0) compare.splice(i, 1); else { if (compare.length >= 3) compare.shift(); compare.push(id); }
    syncCompare();
  }
  function syncCompare() {
    $$("[data-cmp]").forEach(function (b) { var on = compare.indexOf(b.getAttribute("data-cmp")) >= 0; b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "Added" : "+ Compare"; });
    $("#cmpbar").hidden = compare.length === 0;
    document.body.classList.toggle("has-cmp", compare.length > 0);
    $("#cmp-names").innerHTML = compare.map(function (id) { return "<span>" + esc(fullName(byId(id))) + "</span>"; }).join("");
    $("#cmp-open").textContent = compare.length < 2 ? "Add one more to compare" : "Compare " + compare.length;
    $("#cmp-open").disabled = compare.length < 2;
  }
  function openCompare() {
    var vs = compare.map(byId);
    var rows = [["Brand", function (v) { return BRANDS[v.brand].label; }], ["Type", function (v) { return CAT_SINGLE[v.cat]; }], ["Fuel", function (v) { return v.fuels.join(", "); }],
      ["Capacity", function (v) { return v.capLabel + ": " + v.cap; }], ["Good for", function (v) { return v.good.join("; "); }]];
    $("#view-compare").innerHTML = '<div class="cmp-table"><table><thead><tr><th></th>' + vs.map(function (v) { return "<th>" + esc(v.name) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) { return '<tr><th scope="row">' + r[0] + "</th>" + vs.map(function (v) { return "<td>" + esc(r[1](v)) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>" +
      '<p class="note">Specifications are indicative. Our team confirms exact variants and prices when they call.</p><button class="btn red" type="button" id="cmp-enq">Enquire about these vehicles</button>';
    openOverlay("Compare vehicles", "compare");
  }

  /* ---------- Help me choose ---------- */
  var fin = { step: 0, size: null, fuel: null };
  function renderFinder() {
    var body = $("#finder-body"), dots = '<div class="dots" aria-hidden="true">' + [0, 1].map(function (i) { return '<i class="' + (i <= fin.step ? "on" : "") + '"></i>'; }).join("") + "</div>";
    function opts(arr, key) { return '<div class="opts">' + arr.map(function (o) { return '<button class="opt" type="button" data-fin="' + key + '" data-val="' + esc(o[0]) + '">' + esc(o[1]) + "</button>"; }).join("") + "</div>"; }
    if (fin.step === 0) body.innerHTML = '<div class="fq">' + dots + "<h3>How heavy is a typical load?</h3>" + opts([["light", "Up to 600 kg"], ["mid", "600 kg to 1 tonne"], ["heavy", "Over 1 tonne"]], "size") + "</div>";
    else if (fin.step === 1) body.innerHTML = '<div class="fq">' + dots + "<h3>Any fuel preference?</h3>" + opts([["any", "No preference"], ["Diesel", "Diesel"], ["CNG", "CNG"], ["Petrol", "Petrol"], ["Electric", "Electric"]], "fuel") + "</div>";
    else showFinderResult();
  }
  function finderMatch(v, useFuel) {
    if (!v.kg) return false;
    if (fin.size === "light" && v.kg > 600) return false;
    if (fin.size === "mid" && (v.kg <= 600 || v.kg > 1000)) return false;
    if (fin.size === "heavy" && v.kg <= 1000) return false;
    if (useFuel && fin.fuel !== "any" && v.fuels.indexOf(fin.fuel) < 0) return false;
    return true;
  }
  function showFinderResult() {
    var exact = V.filter(function (v) { return finderMatch(v, true); }), list = exact, msg;
    if (!exact.length) { list = V.filter(function (v) { return finderMatch(v, false); }); msg = list.length ? "No exact match for " + fin.fuel + ". These are the closest options in other fuels." : "We could not find a close match. Send an enquiry and our team will suggest options."; }
    else msg = exact.length + (exact.length === 1 ? " vehicle fits" : " vehicles fit") + " what you described.";
    $("#finder-body").innerHTML = '<div class="fres"><p class="note2">' + esc(msg) + '</p><div class="grid">' + list.slice(0, 6).map(cardHTML).join("") + '</div><div class="fbtns"><button class="btn white" type="button" data-enquire="">Send an enquiry</button><button class="btn ghost-light" type="button" id="fin-redo">Start again</button></div></div>';
    hydrate();
  }
  $("#finder-body").addEventListener("click", function (e) {
    var b = e.target.closest("[data-fin]");
    if (b) { fin[b.getAttribute("data-fin")] = b.getAttribute("data-val"); fin.step++; renderFinder(); return; }
    if (e.target.closest("#fin-redo")) { fin = { step: 0, size: null, fuel: null }; renderFinder(); }
  });

  /* ---------- Side panel ---------- */
  var overlay = $("#overlay"), lastFocus = null;
  var views = ["detail", "compare", "enquiry", "success", "fallback"];
  function showView(name) { views.forEach(function (v) { $("#view-" + v).hidden = v !== name; }); }
  function openOverlay(title, view) {
    lastFocus = document.activeElement; $("#panel-title").textContent = title; showView(view);
    overlay.hidden = false; document.documentElement.classList.add("lock"); $(".panel-body").scrollTop = 0;
    setTimeout(function () { var p = $(".panel"); if (p) p.focus(); }, 0);
  }
  function closeOverlay() {
    overlay.hidden = true; if (!menu.classList.contains("open")) document.documentElement.classList.remove("lock");
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }
  function openDetail(id) {
    var v = byId(id); if (!v) return;
    $("#view-detail").innerHTML =
      '<div class="d-art">' + vimg(v) + "</div>" +
      '<p class="brandtag">' + esc(BRANDS[v.brand].label) + " · " + esc(CAT_SINGLE[v.cat]) + "</p>" +
      '<p style="margin-top:8px">' + esc(v.blurb) + "</p>" +
      "<h3>Good for</h3><ul>" + v.good.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul>" +
      '<h3>Key facts</h3><dl class="facts"><dt>Fuel</dt><dd>' + esc(v.fuels.join(", ")) + "</dd><dt>" + esc(v.capLabel) + "</dt><dd>" + esc(v.cap) + "</dd><dt>Type</dt><dd>" + esc(CAT_SINGLE[v.cat]) + "</dd></dl>" +
      '<p class="note">Variants, price and availability change by city and offers. Send an enquiry and our team will share the current details.</p>' +
      '<button class="btn red" type="button" data-enquire="' + esc(v.id) + '">Enquire about this vehicle</button>';
    openOverlay(fullName(v), "detail"); hydrate();
  }

  /* ---------- Enquiry form (sent to your email with FormSubmit) ---------- */
  function buildVehicleSelect() {
    var h = '<option value="">Not sure yet, help me choose</option>';
    Object.keys(BRANDS).forEach(function (bk) {
      h += '<optgroup label="' + esc(BRANDS[bk].label) + '">' + V.filter(function (v) { return v.brand === bk; }).map(function (v) { return '<option value="' + esc(v.id) + '">' + esc(fullName(v)) + "</option>"; }).join("") + "</optgroup>";
    });
    $("#f-vehicle").innerHTML = h;
  }
  function openEnquiry(id, prefill) {
    $("#f-vehicle").value = id && byId(id) ? id : "";
    if (prefill) $("#e-msg").value = prefill;
    ["name", "phone", "city", "email", "consent"].forEach(function (k) { setErr(k, ""); });
    $("#e-submit").disabled = false; $("#e-submit").textContent = "Send my details";
    openOverlay("Send an enquiry", "enquiry");
  }
  function setErr(k, msg) {
    var e = $("#err-" + k), input = $("#e-" + k);
    if (e) e.textContent = msg;
    if (input) { if (msg) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid"); }
  }
  function cleanPhone(raw) {
    var d = String(raw || "").replace(/\D/g, "");
    if (d.length === 12 && d.indexOf("91") === 0) d = d.slice(2);
    if (d.length === 11 && d.charAt(0) === "0") d = d.slice(1);
    return d;
  }
  function vehicleLabel(id) { var v = byId(id); return v ? fullName(v) : "Not sure yet"; }
  function validate() {
    var bad = [], f = $("#enq-form");
    var name = f.name.value.trim(), phone = cleanPhone(f.phone.value), city = f.city.value.trim(), email = f.email.value.trim();
    ["name", "phone", "city", "email", "consent"].forEach(function (k) { setErr(k, ""); });
    if (name.length < 2) { setErr("name", "Enter your name."); bad.push("e-name"); }
    if (!/^[6-9]\d{9}$/.test(phone)) { setErr("phone", "Enter a 10-digit mobile number, for example 98765 43210."); bad.push("e-phone"); }
    if (city.length < 2) { setErr("city", "Enter your city or town."); bad.push("e-city"); }
    if (!email) { setErr("email", "Enter your email address."); bad.push("e-email"); }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("email", "Check the email address. It should look like name@example.com."); bad.push("e-email"); }
    if (!f.consent.checked) { setErr("consent", "Please tick this so we can call you."); bad.push("e-consent"); }
    if (bad.length) { var first = document.getElementById(bad[0]); if (first) first.focus(); return null; }
    return { name: name, phone: phone, city: city, email: email, vehicle: vehicleLabel(f.vehicle.value),
      use: f.use.value, timeline: f.when.value, message: f.message.value.trim() };
  }
  function enquiryText(l) {
    return ["Enquiry for AS Autozone", "Name: " + l.name, "Phone: " + l.phone, "City: " + l.city, l.email ? "Email: " + l.email : null,
      "Vehicle: " + l.vehicle, "Use: " + l.use, "Buying: " + l.timeline, l.message ? "Message: " + l.message : null].filter(Boolean).join("\n");
  }
  function withTimeout(p, ms) { return Promise.race([p, new Promise(function (_, rej) { setTimeout(function () { rej({ code: "timeout" }); }, ms); })]); }

  var lastLead = null;
  $("#enq-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var lead = validate(); if (!lead) return;
    lastLead = lead;
    var f = $("#enq-form");
    if (f._honey && f._honey.value) return;   /* bots fill the hidden field */
    var btn = $("#e-submit"); btn.disabled = true; btn.textContent = "Sending…";
    var payload = {
      name: lead.name, phone: lead.phone, city: lead.city, email: lead.email,
      vehicle: lead.vehicle, use: lead.use, buying: lead.timeline, message: lead.message || "-",
      received: new Date().toLocaleString("en-IN"),
      _subject: "New enquiry from AS Autozone: " + lead.vehicle + " (" + lead.name + ")",
      _template: "table", _captcha: "false"
    };
    payload._replyto = lead.email;
    withTimeout(fetch("https://formsubmit.co/ajax/" + FORMSUBMIT_EMAIL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok || !(data.success === true || data.success === "true")) throw { code: "rejected", message: data.message || "" };
        return data;
      });
    }), 20000).then(function () { showSuccess(lead); }, function (err) {
      var why = err && err.code === "rejected" ? err.message : "";
      if (!why) {
        why = location.protocol === "file:"
          ? "Browsers block this when the page is opened as a file from your computer. Open the site from a web address, or use the button below."
          : "The request did not reach FormSubmit. Check the internet connection, or use the button below.";
      }
      showFallback(lead, why);
    });
  });
  /* Backup: a normal form post to FormSubmit. It works from any page, including a local file,
     and it is how FormSubmit sends its first activation email. */
  function sendViaFormSubmitPage(lead) {
    var f = document.createElement("form");
    f.method = "POST"; f.action = "https://formsubmit.co/" + FORMSUBMIT_EMAIL; f.style.display = "none";
    var fields = {
      name: lead.name, phone: lead.phone, city: lead.city, email: lead.email, vehicle: lead.vehicle,
      use: lead.use, buying: lead.timeline, message: lead.message || "-",
      _subject: "New enquiry from AS Autozone: " + lead.vehicle + " (" + lead.name + ")", _template: "table", _captcha: "false"
    };
    fields._replyto = lead.email;
    if (/^https?:$/.test(location.protocol)) fields._next = location.href.split("#")[0];
    Object.keys(fields).forEach(function (k) { var i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = fields[k]; f.appendChild(i); });
    document.body.appendChild(f); f.submit();
  }
  function showSuccess(lead) {
    var first = lead.name.split(/\s+/)[0];
    $("#view-success").innerHTML = "<h3>Thank you, " + esc(first) + "</h3><p>We have your details for <b>" + esc(lead.vehicle) + "</b>. Our team will call you on " + esc(lead.phone.slice(0, 5) + " " + lead.phone.slice(5)) + '.</p><div class="btns"><button class="btn ghost" type="button" id="again">Send another enquiry</button><button class="btn red" type="button" data-close>Back to vehicles</button></div>';
    $("#panel-title").textContent = "Enquiry received";
    $("#enq-form").reset(); $("#e-when").value = "This month";
    showView("success");
  }
  function showFallback(lead, reason) {
    var text = enquiryText(lead), wa = String(CONFIG.whatsapp || "").replace(/\D/g, "");
    var h = '<h3 style="margin-top:0;font-size:1.9rem;text-transform:uppercase">We could not send this online</h3><p class="note" style="margin-top:8px">Your enquiry has not been sent. ' + (reason ? esc(reason) + " " : "") + 'Copy it and send it to us directly.</p>' +
      '<label for="fb-text" class="lbl">Your enquiry</label><textarea class="input" id="fb-text" readonly>' + esc(text) + '</textarea><div class="btn-row"><button class="btn red" type="button" id="fb-send">Send via FormSubmit page</button><button class="btn ghost" type="button" id="fb-copy">Copy enquiry</button>';
    if (wa) h += '<a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/' + wa + "?text=" + encodeURIComponent(text) + '">Open WhatsApp</a>';
    h += '<button class="btn ghost" type="button" id="fb-back">Edit details</button></div>';
    var contact = []; if (CONFIG.phone) contact.push("Phone: " + esc(CONFIG.phone)); if (CONFIG.email) contact.push("Email: " + esc(CONFIG.email));
    if (contact.length) h += '<p class="note">' + contact.join(" · ") + "</p>";
    $("#view-fallback").innerHTML = h; $("#panel-title").textContent = "Send it to us directly"; showView("fallback");
  }

  /* ---------- Contact block ---------- */
  function renderContact() {
    var rows = [["Phone", CONFIG.phone], ["WhatsApp", CONFIG.whatsapp], ["Email", CONFIG.email], ["Visit us", CONFIG.address], ["Hours", CONFIG.hours]].filter(function (r) { return r[1]; });
    if (!rows.length) { $("#contact-details").hidden = true; return; }
    $("#contact-title").textContent = "Visit or call us";
    $("#contact-details").innerHTML = rows.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
  }

  /* ---------- Scroll reveal ---------- */
  function setupReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduced) { document.documentElement.classList.add("no-reveal"); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el, i) {
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", ((i % 4) * 70) + "ms");
      io.observe(el);
    });
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target, el;
    if ((el = t.closest("[data-enquire]"))) { if (menu.classList.contains("open")) closeMenu(); openEnquiry(el.getAttribute("data-enquire")); return; }
    if ((el = t.closest("[data-detail]"))) { openDetail(el.getAttribute("data-detail")); return; }
    if ((el = t.closest("[data-cmp]"))) { toggleCompare(el.getAttribute("data-cmp")); return; }
    if ((el = t.closest("[data-cat]"))) { showCatalog({ cat: el.getAttribute("data-cat") }); return; }
    if ((el = t.closest("[data-brand]"))) { showCatalog({ brand: el.getAttribute("data-brand") }); return; }
    if (t.closest("[data-close]")) { closeOverlay(); return; }
    if (t.closest("#cmp-open")) { if (compare.length >= 2) openCompare(); return; }
    if (t.closest("#cmp-clear")) { compare = []; syncCompare(); return; }
    if (t.closest("#cmp-enq")) { openEnquiry(compare[0], "Interested in: " + compare.map(function (id) { return fullName(byId(id)); }).join(", ")); return; }
    if (t.id === "reset") { resetFilters(); return; }
    if (t.id === "again") { openEnquiry(""); return; }
    if (t.id === "fb-back") { $("#panel-title").textContent = "Send an enquiry"; showView("enquiry"); $("#e-submit").disabled = false; $("#e-submit").textContent = "Send my details"; return; }
    if (t.id === "fb-send") { if (lastLead) { t.disabled = true; t.textContent = "Opening FormSubmit…"; sendViaFormSubmitPage(lastLead); } return; }
    if (t.id === "fb-copy") {
      var ta = $("#fb-text"), done = function () { t.textContent = "Copied"; }, sel = function () { ta.focus(); ta.select(); t.textContent = "Selected. Press copy on your device"; };
      try { navigator.clipboard.writeText(ta.value).then(done, sel); } catch (err) { sel(); }
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!overlay.hidden) closeOverlay(); else if (menu.classList.contains("open")) { closeMenu(); menuBtn.focus(); }
  });
  $("#f-q").addEventListener("input", function (e) { state.q = e.target.value.trim(); renderGrid(); });
  $("#f-fuel").addEventListener("change", function (e) { state.fuel = e.target.value; renderGrid(); });

  /* ---------- Start ---------- */
  try {
    seg($("#f-brand"), [["all", "All brands"], ["tata", "Tata"], ["mahindra", "Mahindra"], ["maruti", "Maruti"], ["eicher", "Eicher"]], "brand");
    seg($("#f-cat"), [["all", "All types"], ["tempo", "Tempos and cargo"], ["pickup", "Pickups"]], "cat");
    buildHero(); renderStats(); renderReel(); renderBrands(); renderGrid(); renderFinder(); buildVehicleSelect(); renderContact();
    hydrate(); setupReveal();
    setPaused(reduced);
    requestAnimationFrame(function (t) { lastT = t; requestAnimationFrame(tick); });
  } catch (err) {
    document.documentElement.classList.add("no-reveal");
    if (window.console) console.error(err);
  }
})();
