# WebMind AI — Universal Photo-First Web Platform Engine

> **"A fully functional web platform generated dynamically from ANY user-provided shop description, automatically populating the site with high-quality, topic-specific photography, deeply editable sections for real-time changes, non-reader audio speech narration, and zero pricing details."**

---

## 🌟 Core Capabilities & Design Features

### 1. 🌐 Universal Shop Synthesis (Any Shop Description)
- **Domain-Specific Content & Photography:** Analyzes any user prompt (e.g. coffee roasteries, sourdough bakeries, independent comic bookstores, handmade pottery studios, organic pet grooming lounges, artisan gelato parlors, vinyl record listening lounges, barbershops, pizzerias, etc.).
- **Smart Custom Fallback:** For unique or niche concepts (e.g. "Mechanical Watch Restorer" or "Eco Surfboard Shaper"), the AI engine automatically extracts topic semantics, assigns matching curated high-resolution photography, constructs contextual offerings, and crafts tailored copy.
- **Zero Pricing Everywhere:** Strictly omits any cost, fee, dollar amount, subscription tier, or pricing matrix across all templates, schemas, and exported files.

### 2. ✏️ Deeply Editable Sections (Real-Time WYSIWYG & Visual Inspector)
- **Direct Inline Text Editing:** Click any headline, subtitle, offering title, description, business hours, address, or phone number directly in the live preview to edit in real time (`contenteditable="true"`). Changes auto-save instantly with visual cues.
- **Visual Section Editor Drawer:** Hover over any section and click `✏️ Edit Section` to open a structured form where you can edit titles, icons, descriptions, and business information.
- **Real-Time Photo Swapper:** Click `📷 Swap Photo` on the hero banner, any gallery card, or offering item to pick an alternative high-resolution photo from the curated library or paste any custom image URL.
- **Section Reordering & AI Refresh:** Use `⬆️ Move Up`, `⬇️ Move Down`, and `✨ AI Refresh` to reorganize or rewrite copy with 1 click.

### 3. 📸 Prominent High-Quality Photography
- **Topic-Matched Photo Showcase:** Displays rich, atmospheric photos matching the specific domain (e.g. barista latte art, golden hearth-baked loaves, vintage bookshelves, ceramic wheels, organic dog biscuits, gelato cones).
- **Interactive Photo Gallery:** Filterable by categories (`All`, `Craft`, `Details`, `Space`).
- **High-Resolution Lightbox:** Click any photo to zoom into a full-screen modal with captions.

### 4. 🔊 Accessible for Users with No Reading Skills
- **Web Speech API Audio Narration (`🔊 Listen`):** Every single section and offering card has a dedicated speaker button. Clicking it reads the name, description, and status aloud in natural human speech.
- **Universal Visual Iconography:** Uses universally understood visual symbols (☕, 🥐, 📚, 🐾, 🏺, 🍦, 🎵, ✂️, 🍕, 📍, 📞, 🕒, 🟢, ❤️).
- **Visual Status Signals:** Large glowing green beacon `🟢 OPEN NOW` ensures operating hours are instantly clear without reading small text.

### 5. ⚡ 100% Practical Interactive Buttons
Every interactive button has a concrete, functional purpose:
- **`📞 Call Us`**: Direct telephone dialer (`tel:5550192834`) and callback request connected to the backend.
- **`📍 Directions`**: Opens location modal with street address and navigation routing.
- **`❤️ Love / Like`**: Interacts with the Python backend via `POST /api/like`, increments the live server counter, and plays heart animations.
- **`🔊 Listen`**: Synthesizes speech narration.
- **`📸 Category Filters`**: Filters the gallery photos dynamically.
- **`🔍 Photo Lightbox`**: Full-screen image zoom.
- **`💾 Export Code`**: 1-click download of clean, offline-ready standalone HTML.
- **`🔗 Share Link`**: Lossless URL hash state encoding.

### 6. 🐍 Responsive Full-Stack Architecture
- **Backend Server (`server.py`):** Python HTTP server with live REST endpoints:
  - `GET /api/likes` — Fetches current like count
  - `POST /api/like` — Increments and persists like count
  - `GET /api/status` — Returns live operating hours and open/closed status
  - `POST /api/inquiry` — Saves customer callback requests to persistent storage
- **Static Asset Serving:** Serves HTML, CSS, JS, and responsive assets with HTTP 200 OK.

---

## 🚀 How to Run

1. The server is actively running in the background:
   ```bash
   python server.py
   ```
2. Open in your browser:
   ```
   http://localhost:8080/
   ```
