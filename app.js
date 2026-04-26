// ═══════════════════════════════════════════════════════════
// AVEIRO GREEN APP — app.js
// Lógica central da aplicação
// ═══════════════════════════════════════════════════════════

// ── DADOS: Ecopontos de Aveiro (coordenadas reais) ──────────
const ECOPONTOS = [
  {
    id: 1,
    nome: "Ecoponto Fórum Aveiro",
    morada: "R. de Batalhão de Caçadores 10, Aveiro",
    lat: 40.6405,
    lng: -8.6534,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 2,
    nome: "Ecoponto Glória (Mercado Municipal)",
    morada: "Mercado Manuel Firmino, Aveiro",
    lat: 40.6423,
    lng: -8.6556,
    tipos: ["papel", "plastico", "vidro", "organico"]
  },
  {
    id: 3,
    nome: "Ecoponto Beira-Mar",
    morada: "Av. Dr. Lourenço Peixinho, Aveiro",
    lat: 40.6447,
    lng: -8.6478,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 4,
    nome: "Ecoponto Rossio (Centro)",
    morada: "Praça do Rossio, Aveiro",
    lat: 40.6408,
    lng: -8.6512,
    tipos: ["papel", "plastico", "vidro", "organico"]
  },
  {
    id: 5,
    nome: "Ecoponto Estação CP Aveiro",
    morada: "Largo da Estação, Aveiro",
    lat: 40.6370,
    lng: -8.6591,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 6,
    nome: "Ecoponto Bairro de Santiago",
    morada: "R. Doutor Mário Sacramento, Aveiro",
    lat: 40.6387,
    lng: -8.6522,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 7,
    nome: "Ecoponto Universidade de Aveiro",
    morada: "Campus Universitário de Santiago, Aveiro",
    lat: 40.6318,
    lng: -8.6575,
    tipos: ["papel", "plastico", "vidro", "organico"]
  },
  {
    id: 8,
    nome: "Ecoponto Gafanha da Nazaré",
    morada: "Av. 25 de Abril, Gafanha da Nazaré",
    lat: 40.6330,
    lng: -8.6980,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 9,
    nome: "Ecoponto Ílhavo (Centro)",
    morada: "Praça da República, Ílhavo",
    lat: 40.6011,
    lng: -8.6696,
    tipos: ["papel", "plastico", "vidro", "organico"]
  },
  {
    id: 10,
    nome: "Ecoponto Esgueira",
    morada: "R. da Igreja, Esgueira, Aveiro",
    lat: 40.6468,
    lng: -8.6363,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 11,
    nome: "Ecoponto São Bernardo",
    morada: "R. Principal, São Bernardo, Aveiro",
    lat: 40.6272,
    lng: -8.6421,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 12,
    nome: "Ecoponto Vera Cruz",
    morada: "R. de Coimbra, Vera Cruz, Aveiro",
    lat: 40.6434,
    lng: -8.6600,
    tipos: ["papel", "plastico", "vidro", "organico"]
  },
  {
    id: 13,
    nome: "Ecoponto Aradas",
    morada: "R. de Aradas, Aveiro",
    lat: 40.6195,
    lng: -8.6538,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 14,
    nome: "Ecoponto Cacia",
    morada: "Av. Principal, Cacia, Aveiro",
    lat: 40.6670,
    lng: -8.6050,
    tipos: ["papel", "plastico", "vidro"]
  },
  {
    id: 15,
    nome: "Ecoponto Posto Prio Aveiro",
    morada: "Posto Prio — Aveiro",
    lat: 40.6415,
    lng: -8.6545,
    tipos: ["papel", "plastico", "vidro"],
    destaque: true
  }
];

// Cores por tipo de contentor (padrão Portugal)
const TIPO_CONFIG = {
  papel:    { cor: "#1565C0", label: "Papel/Cartão",  emoji: "📦" },
  plastico: { cor: "#FBC02D", label: "Plástico/Metal", emoji: "🛢️" },
  vidro:    { cor: "#2E7D32", label: "Vidro",          emoji: "🍾" },
  organico: { cor: "#6D4C41", label: "Orgânico",       emoji: "🥦" }
};

// ── DADOS: Guia de Reciclagem ───────────────────────────────
const GUIA_RESIDUOS = [
  {
    id: "plastico",
    nome: "Amarelo — Plástico e Metal",
    emoji: "🛢️",
    cor: "#FFF9C4",
    corBorda: "#F9A825",
    aceita: [
      "Garrafas PET (água, refrigerante)",
      "Embalagens de iogurte e margarina",
      "Frascos de shampoo e detergente",
      "Latas de alumínio (bebidas)",
      "Latas de conserva (metálicas)",
      "Embalagens Tetra Pak (leite, sumo)",
      "Sacos de plástico rígidos",
      "Tampas plásticas"
    ],
    naoAceita: [
      "Sacos de plástico finos/moles",
      "Embalagens com restos de comida",
      "Brinquedos ou utensílios plásticos",
      "Mangueiras ou tubagens"
    ]
  },
  {
    id: "papel",
    nome: "Azul — Papel e Cartão",
    emoji: "📰",
    cor: "#E3F2FD",
    corBorda: "#1565C0",
    aceita: [
      "Jornais e revistas",
      "Caixas de cartão (cereal, sapatos)",
      "Folhas de papel de escritório",
      "Envelopes (sem janela plástica)",
      "Rolos de papel higiénico (tubo)",
      "Embalagens de ovos (cartão)",
      "Livros e cadernos"
    ],
    naoAceita: [
      "Papel de cozinha usado",
      "Guardanapos e lenços de papel",
      "Papel engordurado (pizza, etc.)",
      "Papel plastificado ou parafinado",
      "Papel molhado"
    ]
  },
  {
    id: "vidro",
    nome: "Verde — Vidro",
    emoji: "🍾",
    cor: "#E8F5E9",
    corBorda: "#2E7D32",
    aceita: [
      "Garrafas de vinho, cerveja e água",
      "Frascos de conservas e compotas",
      "Frascos de perfume e cosméticos",
      "Copos e taças de vidro liso"
    ],
    naoAceita: [
      "Vidro de janelas e espelhos",
      "Lâmpadas e néons",
      "Cristal (taças decorativas)",
      "Frascos com rolha de cortiça inserida",
      "Cerâmica e porcelana",
      "Vidro temperado (Pyrex)"
    ]
  },
  {
    id: "organico",
    nome: "Castanho — Orgânico",
    emoji: "🥦",
    cor: "#EFEBE9",
    corBorda: "#6D4C41",
    aceita: [
      "Restos de frutas e vegetais",
      "Cascas de ovo",
      "Borra de café e filtros de papel",
      "Saquinhos de chá",
      "Restos de comida (sem carne em alguns municípios)",
      "Flores e plantas naturais"
    ],
    naoAceita: [
      "Carne e peixe (verificar município)",
      "Óleos de cozinha",
      "Fezes de animais domésticos",
      "Cinzas de lareira",
      "Madeira tratada"
    ]
  },
  {
    id: "indiferenciado",
    nome: "Preto/Cinza — Indiferenciado",
    emoji: "🗑️",
    cor: "#EEEEEE",
    corBorda: "#424242",
    aceita: [
      "Sacos de plástico finos",
      "Papel higiénico e lenços usados",
      "Fraldas e absorventes",
      "Resíduos de varrimento",
      "Embalagens sujas sem possibilidade de limpeza",
      "Borracha e couro"
    ],
    naoAceita: [
      "Pilhas e baterias (ponto específico)",
      "Medicamentos (farmácia — Valormed)",
      "Óleos (oleão)",
      "Eletrodomésticos (REEE)",
      "Tintas e produtos químicos"
    ]
  }
];

// ── DADOS: Calculadora CO₂ ──────────────────────────────────
// Fatores de CO₂ evitado por unidade (kg CO₂eq) — fonte APA/EEA
const CO2_FATORES = {
  pet:      0.34,   // garrafa PET ~0,5L
  lata:     0.16,   // lata alumínio ~330ml
  cartao:   0.18,   // caixa cartão média
  papel:    0.08,   // jornal/revista
  vidro:    0.27,   // garrafa vidro 750ml
  organico: 0.05    // porção orgânico ~200g
};

const quantidades = { pet: 0, lata: 0, cartao: 0, papel: 0, vidro: 0, organico: 0 };

// ═══════════════════════════════════════════════════════════
// MAPA
// ═══════════════════════════════════════════════════════════
function initMap() {
  const map = L.map('map').setView([40.6400, -8.6540], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  ECOPONTOS.forEach(ep => {
    const popupHtml = `
      <div class="popup-title">${ep.destaque ? '⭐ ' : ''}${ep.nome}</div>
      <div class="popup-addr">📍 ${ep.morada}</div>
      <div class="popup-types">
        ${ep.tipos.map(t => `
          <span class="popup-tag" style="background:${TIPO_CONFIG[t].cor}20;color:${TIPO_CONFIG[t].cor};border:1px solid ${TIPO_CONFIG[t].cor}40">
            ${TIPO_CONFIG[t].emoji} ${TIPO_CONFIG[t].label}
          </span>
        `).join('')}
      </div>
    `;

    const markerColor = ep.destaque ? '#1a3c2e' : '#40916c';
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        width:32px;height:32px;
        background:${markerColor};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
      "><div style="transform:rotate(45deg);font-size:13px;">♻️</div></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34]
    });

    L.marker([ep.lat, ep.lng], { icon })
      .addTo(map)
      .bindPopup(popupHtml);
  });
}

// ── Lista de ecopontos ──────────────────────────────────────
function renderEcopontoList() {
  const container = document.getElementById('ecoponto-list');
  if (!container) return;

  container.innerHTML = ECOPONTOS.map(ep => `
    <div class="ecoponto-card">
      <div class="ecoponto-icon">${ep.destaque ? '⭐' : '♻️'}</div>
      <div class="ecoponto-info">
        <h4>${ep.nome}</h4>
        <p>📍 ${ep.morada}</p>
        <div class="ecoponto-types">
          ${ep.tipos.map(t => `
            <span class="type-dot" style="background:${TIPO_CONFIG[t].cor}" title="${TIPO_CONFIG[t].label}"></span>
          `).join('')}
          <span style="font-size:0.7rem;color:var(--text-light);margin-left:4px">
            ${ep.tipos.map(t => TIPO_CONFIG[t].label).join(', ')}
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════
// GUIA DE RECICLAGEM
// ═══════════════════════════════════════════════════════════
function renderWasteGuide() {
  const container = document.getElementById('waste-guide');
  if (!container) return;

  container.innerHTML = GUIA_RESIDUOS.map(item => `
    <div class="waste-item" id="waste-${item.id}">
      <div class="waste-header" onclick="toggleWaste('${item.id}')">
        <div class="waste-color" style="background:${item.cor};border:2px solid ${item.corBorda}">
          ${item.emoji}
        </div>
        <h3>${item.nome}</h3>
        <span class="chevron">▼</span>
      </div>
      <div class="waste-body">
        <div class="waste-body-inner">
          <div class="accepts-label">✅ Aceita</div>
          <div class="waste-tags">
            ${item.aceita.map(a => `<span class="waste-tag">${a}</span>`).join('')}
          </div>
          <div class="accepts-label" style="margin-top:14px">❌ Não aceita</div>
          <div class="waste-tags">
            ${item.naoAceita.map(n => `<span class="waste-tag no">${n}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleWaste(id) {
  const el = document.getElementById('waste-' + id);
  el.classList.toggle('open');
}

// ═══════════════════════════════════════════════════════════
// CALCULADORA DE IMPACTO
// ═══════════════════════════════════════════════════════════
function initCalculator() {
  updateResult();
}

function change(tipo, delta) {
  quantidades[tipo] = Math.max(0, quantidades[tipo] + delta);
  document.getElementById('qty-' + tipo).textContent = quantidades[tipo];
  updateResult();
}

function updateResult() {
  let total = 0;
  for (const [tipo, qty] of Object.entries(quantidades)) {
    total += qty * CO2_FATORES[tipo];
  }

  const display = total.toFixed(1).replace('.', ',');
  document.getElementById('co2-value').textContent = display;

  const msg = getMensagem(total);
  document.getElementById('result-msg').textContent = msg;
}

function getMensagem(kg) {
  if (kg === 0) return "Regista o que reciclaste para ver o teu impacto.";
  if (kg < 0.5) return "Boa começar! Cada pequena ação conta para o planeta.";
  if (kg < 1.5) return "Excelente! Isso equivale a conduzir menos de 7 km de carro.";
  if (kg < 3.0) return "Incrível! Equivale a plantar metade de uma árvore jovem.";
  if (kg < 5.0) return "Fantástico! Estás a fazer uma diferença real para Aveiro.";
  return "Herói da reciclagem! O teu compromisso ambiental é inspirador! 🌍";
}

// ═══════════════════════════════════════════════════════════
// SERVICE WORKER REGISTRATION (chamado de cada página)
// ═══════════════════════════════════════════════════════════
// Registado inline em cada HTML com:
// if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }
