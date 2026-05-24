# 🌐 SIGAP Dashboard — Web Command Center

> React.js Dashboard untuk Dispatcher & Manajer DLH DKI Jakarta
> Bagian dari ekosistem **SIGAP — Sistem Integrasi Gerak Armada Pintar**

---

## 🎨 Brand Colors

Mengikuti identitas visual resmi **Dinas Lingkungan Hidup DKI Jakarta**:

| Nama | Hex | Kegunaan |
|---|---|---|
| **Orange** | `#f59827` | Primary action, tombol, navbar active, alert badge |
| **Green** | `#27ab7d` | Success, on-route status, konfirmasi, sidebar accent |
| **White** | `#ffffff` | Background utama seluruh dashboard |
| **Orange Light** | `#fff3e0` | Background card highlight, hover state |
| **Green Light** | `#e8f8f3` | Background status sukses, badge normal |
| **Dark** | `#1a1a1a` | Teks utama, heading |
| **Grey** | `#f5f5f5` | Background sidebar, divider |

### CSS Variables

```css
/* src/styles/variables.css */

:root {
  --color-orange:       #f59827;
  --color-orange-light: #fff3e0;
  --color-green:        #27ab7d;
  --color-green-light:  #e8f8f3;
  --color-white:        #ffffff;
  --color-dark:         #1a1a1a;
  --color-grey-bg:      #f5f5f5;
  --color-grey-text:    #888888;
  --color-border:       #e5e7eb;

  /* Status truk */
  --color-status-normal:    #27ab7d;   /* on route ✅ */
  --color-status-violation: #ef4444;   /* pelanggaran 🔴 */
  --color-status-idle:      #f59827;   /* idle/berhenti 🟠 */
  --color-status-offline:   #9ca3af;   /* offline ⚫ */
}
```

### Tailwind Config

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          orange:       '#f59827',
          'orange-light': '#fff3e0',
          green:        '#27ab7d',
          'green-light':  '#e8f8f3',
        }
      }
    }
  }
}
```

---

## Penggunaan Warna Per Komponen

### Navbar / Header
```jsx
// Navbar putih dengan logo dan aksen orange
<nav className="bg-white border-b border-gray-100 shadow-sm">
  <div className="flex items-center gap-3">
    <span className="text-2xl font-bold text-[#1a1a1a]">SIGAP</span>
    <span className="text-sm text-[#f59827] font-medium">
      Command Center
    </span>
  </div>
  {/* Active nav item = orange */}
  <NavLink
    className={({ isActive }) =>
      isActive
        ? "text-[#f59827] font-semibold border-b-2 border-[#f59827]"
        : "text-gray-500 hover:text-[#f59827]"
    }
  >
    Dashboard
  </NavLink>
</nav>
```

### KPI Cards
```jsx
// Card putih dengan top border warna sesuai konteks
<div className="bg-white rounded-2xl p-5 shadow-sm border-t-4 border-[#f59827]">
  <p className="text-gray-500 text-sm">Total Armada</p>
  <p className="text-3xl font-bold text-[#1a1a1a]">577</p>
  <span className="text-[#27ab7d] text-sm font-medium">↑ On Duty</span>
</div>

// KPI sukses — green border
<div className="bg-white rounded-2xl p-5 shadow-sm border-t-4 border-[#27ab7d]">
  <p className="text-gray-500 text-sm">On Route</p>
  <p className="text-3xl font-bold text-[#1a1a1a]">543</p>
  <span className="text-[#27ab7d] text-sm font-medium">✅ Normal</span>
</div>

// KPI warning — orange border
<div className="bg-white rounded-2xl p-5 shadow-sm border-t-4 border-[#f59827]">
  <p className="text-gray-500 text-sm">Pelanggaran</p>
  <p className="text-3xl font-bold text-[#1a1a1a]">12</p>
  <span className="text-[#f59827] text-sm font-medium">⚠️ Hari ini</span>
</div>
```

### Tombol Utama
```jsx
// Primary button — orange
<button className="
  bg-[#f59827] hover:bg-[#e08820]
  text-white font-semibold
  px-6 py-2.5 rounded-xl
  transition-colors duration-200
">
  Generate Laporan
</button>

// Secondary button — green
<button className="
  bg-[#27ab7d] hover:bg-[#1e9068]
  text-white font-semibold
  px-6 py-2.5 rounded-xl
  transition-colors duration-200
">
  Konfirmasi Slot TPA
</button>

// Outline button — orange border
<button className="
  border-2 border-[#f59827] text-[#f59827]
  hover:bg-[#fff3e0]
  font-semibold px-6 py-2.5 rounded-xl
  transition-colors duration-200
">
  Lihat Detail
</button>
```

### Alert Panel (Pelanggaran)
```jsx
// Alert card — background orange light
<div className="bg-[#fff3e0] border-l-4 border-[#f59827] rounded-r-xl p-4">
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#f59827] rounded-full animate-pulse" />
    <span className="font-semibold text-[#1a1a1a]">B-1234-DLH</span>
    <span className="text-xs bg-[#f59827] text-white px-2 py-0.5 rounded-full">
      ROUTE DEVIATION
    </span>
  </div>
  <p className="text-sm text-gray-600 mt-1">
    Keluar rute di Jl. Bekasi Timur
  </p>
</div>
```

### Badge Status Truk
```jsx
function TruckStatusBadge({ status }) {
  const config = {
    ON_ROUTE:  { bg: '#e8f8f3', text: '#27ab7d', label: '✅ On Route' },
    VIOLATION: { bg: '#fee2e2', text: '#ef4444', label: '🔴 Violation' },
    IDLE:      { bg: '#fff3e0', text: '#f59827', label: '🟠 Idle' },
    OFFLINE:   { bg: '#f3f4f6', text: '#9ca3af', label: '⚫ Offline' },
  }
  const c = config[status]
  return (
    <span style={{ background: c.bg, color: c.text }}
      className="text-xs font-semibold px-3 py-1 rounded-full">
      {c.label}
    </span>
  )
}
```

### Sidebar Navigasi
```jsx
// Sidebar putih dengan active item orange
<aside className="bg-white w-64 border-r border-gray-100 h-screen">
  {/* Logo area */}
  <div className="p-6 border-b border-gray-100">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#f59827] rounded-lg flex items-center justify-center">
        <span className="text-white text-sm font-bold">S</span>
      </div>
      <span className="font-bold text-[#1a1a1a]">SIGAP</span>
    </div>
  </div>

  {/* Nav items */}
  {navItems.map(item => (
    <NavLink key={item.path}
      className={({ isActive }) => `
        flex items-center gap-3 px-6 py-3 text-sm font-medium
        transition-colors duration-150
        ${isActive
          ? 'bg-[#fff3e0] text-[#f59827] border-r-2 border-[#f59827]'
          : 'text-gray-600 hover:bg-gray-50 hover:text-[#f59827]'
        }
      `}
    >
      <item.icon size={18} />
      {item.label}
    </NavLink>
  ))}
</aside>
```

### Mapbox Truck Markers
```javascript
// Warna marker di peta sesuai status — konsisten dengan UI
const TRUCK_COLORS = {
  ON_ROUTE:  '#27ab7d',   // hijau — normal
  VIOLATION: '#ef4444',   // merah — pelanggaran
  IDLE:      '#f59827',   // orange — berhenti terlalu lama
  OFFLINE:   '#9ca3af',   // abu — GPS mati
}

map.addLayer({
  id: 'trucks',
  type: 'circle',
  paint: {
    'circle-color': [
      'match', ['get', 'status'],
      'ON_ROUTE',  '#27ab7d',
      'VIOLATION', '#ef4444',
      'IDLE',      '#f59827',
      '#9ca3af'   // default offline
    ],
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff',
  }
})
```

---

## Tentang Dashboard Ini

SIGAP Dashboard adalah pusat komando berbasis web yang memberikan visibilitas penuh kepada dispatcher armada dan manajer DLH terhadap seluruh operasional pengangkutan sampah DKI Jakarta secara real-time.

---

## Halaman Utama

| Halaman | Akses | Fungsi |
|---|---|---|
| **Live Map** | Dispatcher, Manager | Peta real-time 577 truk + alert |
| **Simulator** | Dispatcher | Slot TPA + what-if rerouting |
| **Analytics** | Manager | KPI, tren, distribusi wilayah |
| **Driver Scorecard** | Manager | Kinerja + skor per pengemudi |
| **Executive Reports** | Manager | Laporan harian auto-generate AI |

---

## Tech Stack

| Kebutuhan | Teknologi |
|---|---|
| Framework | React.js 18 + Vite |
| Maps | Mapbox GL JS 3.x + react-map-gl |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Real-time | socket.io-client (WebSocket) |
| HTTP | Axios |

---

## Struktur Folder

```
dashboard/src/
├── styles/
│   └── variables.css          ← CSS variables warna brand
├── pages/
│   ├── Dashboard.jsx           ← Live command center
│   ├── Simulator.jsx           ← TPA slot + rerouting
│   ├── Analytics.jsx           ← KPI & charts
│   ├── DriverScorecard.jsx     ← Kinerja pengemudi
│   └── Reports.jsx             ← Executive summary
├── components/
│   ├── LiveMap.jsx             ← Mapbox fleet map
│   ├── TruckMarker.jsx         ← Marker warna per status
│   ├── AlertPanel.jsx          ← Panel pelanggaran
│   ├── KPICards.jsx            ← Stats cards
│   ├── TruckStatusBadge.jsx    ← Badge warna status
│   └── Sidebar.jsx             ← Navigasi
└── hooks/
    └── useWebSocket.js         ← Real-time GPS stream
```

---

## Setup

```bash
cd sigap/dashboard
npm install
cp .env.example .env
# isi VITE_MAPBOX_TOKEN dan VITE_API_URL
npm run dev
```

---

> Bagian dari ekosistem **SIGAP** — [Backend](../backend/README.md) · [Mobile App](../mobile/README.md)
