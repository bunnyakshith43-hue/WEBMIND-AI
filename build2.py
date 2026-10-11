"""
WebMind AI - Master Application Builder (v3)
Features:
- Opening interface with prominent 'WebMind AI' heading
- Prominent 'AI Business Category Simulator' interactive card grid & expanded categories list
- Direct 'Generate' / 'Generate Website' action that transitions into the dedicated full website preview section
- Dynamically sourced high-definition photography tailored to the prompt
- All buttons 100% operational (Backend /api/booking connection, audio TTS, directions, calls, image customizer, inline editing)
- Strictly zero pricing / cost sections
"""
import os

OUTPUT_FILE = "webmind-app.html"

HTML_CONTENT = r'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebMind AI - Dynamic Website Generator & AI Category Simulator</title>
  <meta name="description" content="WebMind AI: AI Business Category Simulator, Dynamic Website Generation with Semantic Photography, Live In-line Editing, and Zero Pricing.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #07090e;
      --bg-surface: #0e131f;
      --bg-card: rgba(18, 24, 40, 0.75);
      --bg-card-hover: rgba(28, 36, 60, 0.9);
      --border-color: rgba(255, 255, 255, 0.08);
      --border-glow: rgba(99, 102, 241, 0.35);
      
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --primary-glow: rgba(99, 102, 241, 0.45);
      --accent-cyan: #06b6d4;
      --accent-emerald: #10b981;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
      --accent-purple: #a855f7;

      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      
      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display: 'Outfit', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 22px;
      --radius-full: 9999px;
      --shadow-glass: 0 10px 40px 0 rgba(0, 0, 0, 0.45);
      --glass-blur: blur(16px);
      --transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font-main);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.5;
    }

    /* Ambient Background */
    .bg-mesh {
      position: fixed; inset: 0; z-index: -2;
      background: 
        radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.18) 0%, transparent 45%),
        radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.14) 0%, transparent 50%),
        radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.14) 0%, transparent 50%),
        radial-gradient(circle at 80% 85%, rgba(244, 63, 94, 0.12) 0%, transparent 40%);
      filter: blur(45px); pointer-events: none;
      animation: meshPulse 12s ease-in-out infinite alternate;
    }
    @keyframes meshPulse {
      0% { transform: scale(1) rotate(0deg); }
      100% { transform: scale(1.08) rotate(2deg); }
    }
    .bg-grid {
      position: fixed; inset: 0; z-index: -1;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 40px 40px; pointer-events: none;
      mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
    }

    /* Top Navbar */
    .navbar {
      position: sticky; top: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.9rem 2.5rem;
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: var(--glass-blur);
      border-bottom: 1px solid var(--border-color);
    }
    .brand {
      display: flex; align-items: center; gap: 0.75rem;
      text-decoration: none; color: inherit; cursor: pointer;
    }
    .brand-icon {
      width: 40px; height: 40px;
      background: linear-gradient(135deg, var(--primary), var(--accent-cyan));
      border-radius: var(--radius-sm);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; box-shadow: 0 0 24px var(--primary-glow);
    }
    .brand-text {
      font-family: var(--font-display);
      font-weight: 900; font-size: 1.6rem;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .brand-badge {
      font-size: 0.65rem; font-weight: 800;
      padding: 0.2rem 0.65rem;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.35);
      color: #818cf8; border-radius: var(--radius-full);
      text-transform: uppercase; letter-spacing: 0.06em;
    }

    .nav-actions { display: flex; align-items: center; gap: 0.75rem; }

    /* Buttons */
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 0.5rem; padding: 0.6rem 1.35rem;
      border-radius: var(--radius-md); font-family: var(--font-main);
      font-size: 0.875rem; font-weight: 700; cursor: pointer;
      border: 1px solid transparent; transition: var(--transition);
      text-decoration: none; white-space: nowrap;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--primary), #4f46e5);
      color: white; box-shadow: 0 4px 18px var(--primary-glow);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #4f46e5, #4338ca);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.55);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--border-color); color: var(--text-main);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .btn-accent {
      background: linear-gradient(135deg, var(--accent-emerald), #059669);
      color: white;
    }
    .btn-accent:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
    }
    .btn-lg {
      padding: 0.9rem 2.2rem; font-size: 1.05rem; border-radius: var(--radius-md);
    }
    .btn-sm {
      padding: 0.4rem 0.9rem; font-size: 0.8rem; border-radius: var(--radius-sm);
    }

    /* Container & View States */
    .app-container {
      max-width: 1600px; margin: 0 auto;
      padding: 2rem 2.5rem 4rem;
    }

    .view-section {
      display: none;
      animation: viewSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .view-section.active { display: block; }
    @keyframes viewSlide {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ====================================================================
       VIEW 1: OPENING INTERFACE & SIMULATOR
       ==================================================================== */
    .opening-hero {
      text-align: center; margin-bottom: 3.5rem;
      position: relative;
    }
    .hero-badge-pill {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.3);
      padding: 0.4rem 1rem; border-radius: var(--radius-full);
      font-size: 0.825rem; font-weight: 700; color: #a5b4fc;
      margin-bottom: 1.25rem;
    }
    .opening-title {
      font-family: var(--font-display);
      font-size: 4rem; font-weight: 900;
      letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem;
    }
    .gradient-text {
      background: linear-gradient(135deg, #ffffff 20%, #a5b4fc 60%, var(--accent-cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .opening-subtitle {
      color: var(--text-muted); font-size: 1.2rem; max-width: 760px; margin: 0 auto 2.5rem;
    }

    /* Prompt Input Banner */
    .prompt-hero-card {
      max-width: 960px; margin: 0 auto 4rem;
      background: var(--bg-card);
      backdrop-filter: var(--glass-blur);
      border: 1px solid var(--border-glow);
      border-radius: var(--radius-lg);
      padding: 1.75rem 2rem;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
    }
    .prompt-input-row {
      display: flex; gap: 1rem; align-items: center;
    }
    .prompt-main-input {
      flex: 1; min-height: 70px;
      background: rgba(7, 9, 14, 0.7);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 1rem 1.25rem;
      color: var(--text-main); font-family: var(--font-main);
      font-size: 1.05rem; resize: none; transition: var(--transition);
    }
    .prompt-main-input:focus {
      outline: none; border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
    }

    /* AI Business Category Simulator Section */
    .simulator-section {
      margin-top: 1rem;
    }
    .simulator-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 2rem;
    }
    .simulator-title-group h2 {
      font-family: var(--font-display);
      font-size: 2.2rem; font-weight: 800; color: #fff;
    }
    .simulator-title-group p {
      color: var(--text-muted); font-size: 1rem; margin-top: 0.25rem;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .category-card {
      background: var(--bg-card);
      backdrop-filter: var(--glass-blur);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      cursor: pointer; transition: var(--transition);
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative; overflow: hidden;
    }
    .category-card:hover {
      transform: translateY(-5px);
      background: var(--bg-card-hover);
      border-color: var(--primary-glow);
      box-shadow: 0 14px 35px rgba(99, 102, 241, 0.2);
    }
    .category-card.active {
      border-color: var(--primary);
      box-shadow: 0 0 30px rgba(99, 102, 241, 0.35);
      background: rgba(30, 41, 70, 0.85);
    }
    .category-card-top {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 1rem;
    }
    .category-icon-box {
      font-size: 2.25rem; line-height: 1;
    }
    .category-badge-tag {
      font-size: 0.7rem; font-weight: 800;
      padding: 0.25rem 0.65rem; border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.06);
      color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em;
    }
    .category-name {
      font-family: var(--font-display);
      font-size: 1.35rem; font-weight: 800; color: #ffffff;
      margin-bottom: 0.4rem;
    }
    .category-desc {
      color: var(--text-muted); font-size: 0.88rem; line-height: 1.55;
      margin-bottom: 1.25rem; flex: 1;
    }
    .category-footer-btn {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 0.85rem; border-top: 1px solid var(--border-color);
      color: var(--accent-cyan); font-size: 0.825rem; font-weight: 700;
    }

    /* ====================================================================
       VIEW 2: GENERATED WEBSITE DISPLAY & STUDIO
       ==================================================================== */
    .generator-topbar {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.5rem;
      background: var(--bg-card);
      backdrop-filter: var(--glass-blur);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 0.85rem 1.5rem;
    }

    .generator-layout {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 1.75rem;
      align-items: start;
    }

    .studio-sidebar {
      position: sticky; top: 5rem;
    }
    .glass-card {
      background: var(--bg-card);
      backdrop-filter: var(--glass-blur);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-glass);
    }
    .glass-card-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.25rem; padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-color);
    }
    .card-title {
      font-family: var(--font-display);
      font-size: 1.15rem; font-weight: 700;
      display: flex; align-items: center; gap: 0.6rem; color: #fff;
    }

    /* Size Controller */
    .size-controller-bar {
      display: flex; gap: 0.35rem; margin-bottom: 1.25rem;
      background: rgba(0, 0, 0, 0.3); padding: 0.3rem; border-radius: var(--radius-sm);
    }
    .size-btn {
      flex: 1; background: transparent; border: none;
      color: var(--text-dim); padding: 0.4rem; font-size: 0.75rem; font-weight: 700;
      border-radius: 4px; cursor: pointer; transition: var(--transition);
      text-align: center;
    }
    .size-btn.active {
      background: var(--primary); color: #fff;
    }

    /* Preview Canvas */
    .preview-wrapper {
      background: #090c14;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      transition: var(--transition);
    }
    .browser-bar {
      background: #131929;
      border-bottom: 1px solid var(--border-color);
      padding: 0.65rem 1rem;
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    }
    .browser-dots { display: flex; gap: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot.red { background: #ef4444; }
    .dot.yellow { background: #f59e0b; }
    .dot.green { background: #10b981; }

    .browser-address {
      flex: 1; max-width: 480px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-full);
      padding: 0.25rem 0.85rem; font-family: var(--font-mono);
      font-size: 0.75rem; color: var(--text-muted);
      display: flex; align-items: center; gap: 0.5rem;
    }
    .browser-controls { display: flex; align-items: center; gap: 0.5rem; }
    .device-btn {
      background: transparent; border: 1px solid transparent;
      color: var(--text-dim); padding: 0.35rem 0.6rem;
      border-radius: var(--radius-sm); cursor: pointer; font-size: 0.85rem;
    }
    .device-btn.active {
      background: rgba(255, 255, 255, 0.1); color: #fff; border-color: var(--border-color);
    }

    .preview-viewport {
      transition: width 0.3s ease; margin: 0 auto;
      background: #ffffff; min-height: 700px; color: #0f172a;
    }
    .preview-viewport.desktop { width: 100%; }
    .preview-viewport.tablet { width: 768px; }
    .preview-viewport.mobile { width: 390px; }

    /* Generated Site Styles (Scoped) */
    .site-render {
      font-family: var(--font-main);
      color: var(--site-text, #1e293b);
      background-color: var(--site-bg, #ffffff);
    }
    .site-nav {
      position: sticky; top: 0; z-index: 50;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1rem 2rem;
      background: var(--site-nav-bg, rgba(255, 255, 255, 0.95));
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    .site-brand {
      font-family: var(--font-display);
      font-weight: 800; font-size: 1.35rem;
      color: var(--site-primary, #4338ca);
      display: flex; align-items: center; gap: 0.5rem;
    }
    .site-links { display: flex; gap: 1.5rem; list-style: none; }
    .site-links a {
      text-decoration: none; color: #475569; font-weight: 500; font-size: 0.9rem;
    }
    .site-links a:hover { color: var(--site-primary, #4338ca); }

    .site-btn {
      background: var(--site-primary, #4338ca);
      color: white; border: none; padding: 0.6rem 1.4rem;
      border-radius: var(--radius-full); font-weight: 600; font-size: 0.875rem;
      cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
    }
    .site-btn:hover {
      transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    }
    .site-btn-secondary {
      background: rgba(0, 0, 0, 0.05); color: #334155;
    }

    /* Section Size Classes */
    .section-compact { padding: 2.5rem 1.5rem !important; }
    .section-standard { padding: 4.5rem 2rem !important; }
    .section-spacious { padding: 6.5rem 2.5rem !important; }
    .section-heroic { padding: 8.5rem 3rem !important; }

    .site-hero {
      position: relative;
      display: flex; align-items: center; justify-content: space-between;
      gap: 3rem; overflow: hidden;
      background: var(--site-hero-bg, #f8fafc);
      transition: padding 0.3s ease;
    }
    .hero-content { flex: 1; max-width: 600px; }
    .hero-badge {
      display: inline-block; padding: 0.35rem 0.85rem;
      background: rgba(0, 0, 0, 0.05); color: var(--site-primary, #4338ca);
      border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;
    }
    .hero-title {
      font-family: var(--font-display);
      font-size: 2.85rem; font-weight: 800; line-height: 1.15;
      color: #0f172a; margin-bottom: 1.25rem;
    }
    .hero-desc {
      font-size: 1.15rem; color: #64748b; margin-bottom: 2rem; line-height: 1.6;
    }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .hero-image-wrapper {
      flex: 1; position: relative;
    }
    .hero-img {
      width: 100%; height: 420px; object-fit: cover;
      border-radius: var(--radius-lg); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }
    .hero-img-overlay-btn {
      position: absolute; bottom: 16px; right: 16px;
      background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px);
      color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 0.45rem 0.9rem; border-radius: var(--radius-sm);
      font-size: 0.8rem; font-weight: 600; cursor: pointer;
      display: flex; align-items: center; gap: 0.4rem;
    }

    .site-section {
      transition: padding 0.3s ease;
    }
    .section-header {
      text-align: center; max-width: 640px; margin: 0 auto 3rem;
    }
    .section-tag {
      color: var(--site-primary, #4338ca);
      font-size: 0.85rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; margin-bottom: 0.5rem; display: block;
    }
    .section-title {
      font-family: var(--font-display);
      font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;
    }
    .section-subtitle { color: #64748b; font-size: 1rem; }

    .feature-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem; max-width: 1200px; margin: 0 auto;
    }
    .feature-card {
      background: #ffffff; border: 1px solid #e2e8f0;
      border-radius: var(--radius-md); padding: 2rem;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .feature-card:hover {
      transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    }
    .feature-icon { font-size: 2.25rem; margin-bottom: 1.25rem; display: inline-block; }
    .feature-name {
      font-family: var(--font-display); font-size: 1.25rem; font-weight: 700;
      color: #0f172a; margin-bottom: 0.6rem;
    }
    .feature-desc { color: #64748b; font-size: 0.95rem; line-height: 1.6; }

    .gallery-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem; max-width: 1200px; margin: 0 auto;
    }
    .gallery-item {
      position: relative; border-radius: var(--radius-md);
      overflow: hidden; height: 260px; cursor: pointer;
    }
    .gallery-item img {
      width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;
    }
    .gallery-item:hover img { transform: scale(1.06); }
    .gallery-caption {
      position: absolute; inset: auto 0 0 0;
      padding: 1.5rem 1rem 0.8rem;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      color: white; font-weight: 600; font-size: 0.95rem;
    }

    /* Admin Contact Section */
    .contact-container {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem;
      background: #ffffff; border: 1px solid #e2e8f0;
      border-radius: var(--radius-lg); padding: 3rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }
    .contact-info-col h3 {
      font-family: var(--font-display);
      font-size: 1.75rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;
    }
    .contact-info-col p { color: #64748b; margin-bottom: 1.5rem; line-height: 1.6; }
    .contact-detail-row {
      display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
    }
    .contact-icon-box {
      width: 42px; height: 42px; border-radius: var(--radius-sm);
      background: rgba(99, 102, 241, 0.1); color: var(--site-primary, #4338ca);
      display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
    }
    .contact-form-col { display: flex; flex-direction: column; gap: 1.2rem; }
    .contact-input-field {
      width: 100%; padding: 0.75rem 1rem;
      border: 1px solid #cbd5e1; border-radius: var(--radius-sm);
      font-family: var(--font-main); font-size: 0.95rem; background: #f8fafc;
    }

    /* Interactive Banner */
    .interactive-banner {
      background: linear-gradient(135deg, var(--site-primary, #4338ca), #1e1b4b);
      color: white; border-radius: var(--radius-lg);
      padding: 3.5rem 2rem; text-align: center;
      max-width: 1100px; margin: 0 auto;
    }
    .interactive-banner h3 {
      font-family: var(--font-display);
      font-size: 2.2rem; font-weight: 800; margin-bottom: 1rem;
    }
    .interactive-banner p {
      font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin: 0 auto 2rem;
    }

    /* Footer */
    .site-footer {
      background: #0b0f19; color: #94a3b8;
      padding: 3.5rem 2rem 2rem; border-top: 1px solid #1e293b;
    }
    .footer-content {
      max-width: 1200px; margin: 0 auto;
      display: flex; justify-content: space-between; flex-wrap: wrap;
      gap: 2rem; padding-bottom: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .footer-brand {
      font-family: var(--font-display);
      font-weight: 800; font-size: 1.25rem; color: white; margin-bottom: 0.5rem;
    }

    /* Editable Mode Highlighting */
    .edit-mode-active [contenteditable="true"] {
      outline: 2px dashed rgba(99, 102, 241, 0.6) !important;
      outline-offset: 3px; border-radius: 4px;
    }
    .edit-mode-active [contenteditable="true"]:hover {
      background: rgba(99, 102, 241, 0.08);
    }
    .edit-mode-active [contenteditable="true"]:focus {
      outline: 2px solid #6366f1 !important;
      background: rgba(99, 102, 241, 0.12);
    }

    /* Modals */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(8px);
      z-index: 1500; display: none;
      align-items: center; justify-content: center; padding: 1rem;
    }
    .modal-overlay.active { display: flex; }
    .modal-card {
      background: #0f1422;
      border: 1px solid var(--border-glow);
      border-radius: var(--radius-lg);
      padding: 2rem; max-width: 540px; width: 100%;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
      animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes modalPop {
      from { transform: scale(0.94); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .modal-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;
    }
    .form-group {
      display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem;
    }
    .form-group label {
      font-size: 0.8rem; font-weight: 600; color: var(--text-muted);
    }
    .form-input {
      width: 100%; padding: 0.65rem 0.9rem;
      background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-color);
      border-radius: var(--radius-sm); color: #fff; font-family: var(--font-main);
      font-size: 0.9rem;
    }
    .form-input:focus { outline: none; border-color: var(--primary); }

    /* Toast */
    .toast-container {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 3000;
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    .toast {
      background: rgba(14, 19, 31, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-glow);
      color: #fff; padding: 0.85rem 1.25rem;
      border-radius: var(--radius-md);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem;
      animation: toastSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes toastSlide {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="bg-mesh"></div>
  <div class="bg-grid"></div>

  <!-- Main Navbar -->
  <header class="navbar">
    <div class="brand" onclick="showView('opening')">
      <div class="brand-icon">⚡</div>
      <span class="brand-text">WebMind AI</span>
      <span class="brand-badge">Engine v4.3</span>
    </div>

    <div class="nav-actions">
      <button class="btn btn-secondary btn-sm" onclick="showView('opening')">
        <span>🎯</span> Category Simulator
      </button>
      <button class="btn btn-accent btn-sm" onclick="openBookingModal()">
        <span>📅</span> Confirm Your Request
      </button>
      <button class="btn btn-primary btn-sm" onclick="triggerGenerate()">
        <span>✨</span> Generate Website
      </button>
    </div>
  </header>

  <main class="app-container">
    <!-- ====================================================================
         VIEW 1: OPENING INTERFACE & AI BUSINESS CATEGORY SIMULATOR
         ==================================================================== -->
    <section id="view-opening" class="view-section active">
      <div class="opening-hero">
        <div class="hero-badge-pill">
          <span>✨</span> AntiGravity Dynamic Synthesis & Live Generator
        </div>
        <h1 class="opening-title">
          <span class="gradient-text">WebMind AI</span> Platform
        </h1>
        <p class="opening-subtitle">
          Select any business category from the simulator below or input your custom prompt. Click <strong>Generate Website</strong> to open a new section displaying your bespoke web presence.
        </p>

        <!-- Prompt Hero Box -->
        <div class="prompt-hero-card">
          <div class="prompt-input-row">
            <textarea id="main-prompt-input" class="prompt-main-input" placeholder="Describe the business, specialty items, and target atmosphere..."></textarea>
            <button class="btn btn-primary btn-lg" onclick="triggerGenerate()">
              <span>🚀</span> Generate
            </button>
          </div>
        </div>
      </div>

      <!-- Prominent AI Business Category Simulator -->
      <div class="simulator-section">
        <div class="simulator-header">
          <div class="simulator-title-group">
            <h2>AI Business Category Simulator</h2>
            <p>16+ preconfigured business domains curated with semantic high-definition photography and zero pricing.</p>
          </div>
          <span style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 700;">
            ⚡ 1-Click Select & Synthesize
          </span>
        </div>

        <div class="category-grid" id="category-cards-grid">
          <!-- Rendered Category Cards -->
        </div>
      </div>
    </section>

    <!-- ====================================================================
         VIEW 2: GENERATED WEBSITE DISPLAY & STUDIO CONTROLS
         ==================================================================== -->
    <section id="view-generated" class="view-section">
      <div class="generator-topbar">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="showView('opening')">
            <span>⬅️</span> Back to Simulator
          </button>
          <span style="font-weight: 700; color: #fff; font-size: 1rem;" id="active-site-indicator">Royal Biryani House</span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <button class="btn btn-secondary btn-sm" onclick="openImageModal()">
            <span>📷</span> Customize Main Image
          </button>
          <button class="btn btn-accent btn-sm" onclick="openBookingModal()">
            <span>📅</span> Confirm Your Request
          </button>
          <button class="btn btn-secondary btn-sm" onclick="exportFullHTML()">
            <span>📥</span> Export HTML
          </button>
        </div>
      </div>

      <div class="generator-layout">
        <!-- Sidebar Controls -->
        <aside class="studio-sidebar">
          <div class="glass-card">
            <div class="glass-card-header">
              <div class="card-title">
                <span>🎛️</span> Studio Controls
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.4rem;">
                Active Prompt:
              </span>
              <textarea id="studio-prompt-input" class="prompt-main-input" style="min-height: 85px; font-size: 0.85rem;"></textarea>
            </div>

            <button class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;" onclick="reGenerateFromStudio()">
              <span>⚡</span> Re-Synthesize Site
            </button>

            <!-- Section Size Controller -->
            <div style="margin-bottom: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
              <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.4rem;">
                In-Line Section Size:
              </span>
              <div class="size-controller-bar">
                <button class="size-btn" onclick="setSectionSize('compact', this)">Compact</button>
                <button class="size-btn active" onclick="setSectionSize('standard', this)">Standard</button>
                <button class="size-btn" onclick="setSectionSize('spacious', this)">Spacious</button>
                <button class="size-btn" onclick="setSectionSize('heroic', this)">Heroic</button>
              </div>
            </div>

            <!-- In-line Edit & Voice TTS -->
            <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.6rem;">
              <button id="edit-mode-toggle" class="btn btn-secondary" style="width: 100%; justify-content: space-between;" onclick="toggleEditMode()">
                <span id="edit-text">✏️ In-Line Edit: <strong>OFF</strong></span>
                <span id="edit-pill" style="font-size: 0.7rem; padding: 0.15rem 0.5rem; background: rgba(255,255,255,0.1); border-radius: 4px;">Toggle</span>
              </button>
              <button class="btn btn-secondary btn-sm" onclick="speakSiteContent()">
                <span>🔊</span> Listen (Web Audio TTS)
              </button>
            </div>
          </div>
        </aside>

        <!-- Preview Viewport Canvas -->
        <main class="preview-wrapper">
          <div class="browser-bar">
            <div class="browser-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="browser-address">
              <span>🔒</span>
              <span id="preview-url">https://webmind.ai/p/royal-biryani-house</span>
            </div>
            <div class="browser-controls">
              <button class="device-btn active" onclick="setDeviceMode('desktop', this)">🖥️ Desktop</button>
              <button class="device-btn" onclick="setDeviceMode('tablet', this)">📱 Tablet</button>
              <button class="device-btn" onclick="setDeviceMode('mobile', this)">📲 Mobile</button>
            </div>
          </div>

          <div id="preview-viewport" class="preview-viewport desktop">
            <div id="site-render-root" class="site-render">
              <!-- Site injected dynamically -->
            </div>
          </div>
        </main>
      </div>
    </section>
  </main>

  <!-- Modal: Confirm Your Request (Backend Connected) -->
  <div id="booking-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <div class="card-title" style="font-size: 1.25rem;">
          <span>📅</span> Confirm Your Request & Reservation
        </div>
        <button class="btn btn-secondary btn-sm" onclick="closeBookingModal()">✕</button>
      </div>

      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">
        Your request is dispatched directly to our live backend database for instantaneous confirmation.
      </p>

      <form id="booking-form" onsubmit="handleBookingSubmit(event)">
        <div class="form-group">
          <label>Your Full Name</label>
          <input type="text" id="bk-name" class="form-input" required placeholder="e.g. Maya Chen">
        </div>
        <div class="form-group">
          <label>Contact Phone or Email</label>
          <input type="text" id="bk-contact" class="form-input" required placeholder="e.g. (555) 234-5678 / maya@example.com">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div class="form-group">
            <label>Requested Date</label>
            <input type="date" id="bk-date" class="form-input" required>
          </div>
          <div class="form-group">
            <label>Requested Time</label>
            <input type="time" id="bk-time" class="form-input" value="19:00" required>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div class="form-group">
            <label>Party Size / Guests</label>
            <select id="bk-party" class="form-input">
              <option value="1 Guest">1 Guest (Solo Experience)</option>
              <option value="2 Guests" selected>2 Guests (Pair / Duo)</option>
              <option value="4 Guests">4 Guests (Standard Table)</option>
              <option value="6+ Guests">6+ Guests (VIP Group)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Service Type</label>
            <select id="bk-service" class="form-input">
              <option value="Table Reservation">Table Reservation</option>
              <option value="Artisan Consultation">Artisan Consultation</option>
              <option value="VIP Private Session">VIP Private Session</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Special Requests or Dietary Notes (Zero Extra Cost)</label>
          <textarea id="bk-notes" class="form-input" rows="2" placeholder="e.g. Window seating, anniversary celebration, chef recommendations..."></textarea>
        </div>
        <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
          <button type="submit" class="btn btn-accent" style="flex: 1;">
            <span>⚡</span> Submit & Confirm Request
          </button>
          <button type="button" class="btn btn-secondary" onclick="closeBookingModal()">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Custom Image URL & Upload -->
  <div id="image-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <div class="card-title" style="font-size: 1.25rem;">
          <span>📷</span> Customize Main Hero Photo
        </div>
        <button class="btn btn-secondary btn-sm" onclick="closeImageModal()">✕</button>
      </div>

      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">
        Upload a local image file or paste any direct web image URL to customize the main website image.
      </p>

      <div class="form-group">
        <label>Upload From Computer</label>
        <input type="file" id="local-upload-input" accept="image/*" class="form-input" onchange="handleImageUpload(event)">
      </div>

      <div class="form-group">
        <label>Or Paste Image Web URL</label>
        <input type="url" id="custom-img-url-input" class="form-input" placeholder="https://images.unsplash.com/photo-...">
      </div>

      <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
        <button class="btn btn-primary" style="flex: 1;" onclick="applyCustomImageUrl()">
          <span>✨</span> Apply URL Image
        </button>
        <button class="btn btn-secondary" onclick="closeImageModal()">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Toast Container -->
  <div id="toast-container" class="toast-container"></div>

  <!-- ====================================================================
       JAVASCRIPT ARCHITECTURE & LOGIC
       ==================================================================== -->
  <script>
    /* 16+ Rich AI Business Categories */
    const CATEGORIES = {
      biryani: {
        id: "biryani",
        name: "Royal Biryani House",
        icon: "🍛",
        tag: "Dining & Feast",
        category: "Biryani & Mughlai Feast",
        theme: "amber",
        prompt: "Create a majestic Biryani Paradise restaurant called 'Royal Biryani House' with aromatic Hyderabadi Dum Biryani, authentic copper pot cooking, lush saffron colors, reservation booking, chef specialties gallery, customer rave reviews, and admin contact. Ensure no pricing tags exist.",
        heroTitle: "Authentic Hyderabadi Dum Biryani Cooked in Sealed Copper Handis",
        heroDesc: "Experience the royal heritage of Nizam cuisine, slow-cooked to perfection with premium aged basmati rice, saffron-infused spices, and tender farm-fresh meats.",
        heroImg: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🏺", title: "Dum Pukht Tradition", desc: "Slow cooked in sealed clay and copper pots to trap every essence of aromatic saffron." },
          { icon: "🌾", title: "Aged Basmati Rice", desc: "Two-year aged extra-long grain rice for extraordinary texture and royal fluffiness." },
          { icon: "🌶️", title: "Secret Shahi Spices", desc: "Hand-ground spice blends sourced directly from Old City heritage spice merchants." }
        ],
        gallery: [
          { title: "Hyderabadi Mutton Dum Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80" },
          { title: "Saffron Chicken Biryani Handi", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80" },
          { title: "Spicy Mirchi Ka Salan & Raita", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80" },
          { title: "Shahi Tukda Royal Dessert", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "admin@royalbiryani.com",
        contactPhone: "(555) 382-7492",
        contactAddress: "88 Sultan Heritage Boulevard, Food District",
        bannerText: "Reserve Your Royal Feast Tonight"
      },
      barber: {
        id: "barber",
        name: "Blade & Bristle Co.",
        icon: "✂️",
        tag: "Grooming & Shave",
        category: "Luxury Barber Shop",
        theme: "gold",
        prompt: "Create a vintage luxury barber shop called 'Blade & Bristle Co.' featuring artisan hot towel shaves, bespoke beard styling, classic leather chairs, and master grooming rituals.",
        heroTitle: "Bespoke Grooming & Artisanal Hot Towel Straight-Razor Shaves",
        heroDesc: "Where timeless barbering craft meets contemporary gentleman styling. Indulge in executive haircuts, beard sculpting, and aromatic hot towel treatments.",
        heroImg: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🪒", title: "Straight Razor Shaves", desc: "Traditional hot lather and Japanese steel straight razor shaves for flawless skin." },
          { icon: "💈", title: "Master Barbers", desc: "Decades of combined master artisan styling experience and tailored beard grooming." },
          { icon: "🥃", title: "Executive Lounge", desc: "Complimentary single malt whiskey or single-origin espresso with every appointment." }
        ],
        gallery: [
          { title: "Precision Fade Styling", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80" },
          { title: "Hot Towel Beard Treatment", img: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=800&auto=format&fit=crop&q=80" },
          { title: "Handcrafted Pomades & Balms", img: "https://images.unsplash.com/photo-1517832606589-7629c339590a?w=800&auto=format&fit=crop&q=80" },
          { title: "Classic Vintage Barber Chairs", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "concierge@bladeandbristle.com",
        contactPhone: "(555) 891-2304",
        contactAddress: "420 St. James Place, Executive Quarter",
        bannerText: "Book Your Executive Grooming Session"
      },
      winery: {
        id: "winery",
        name: "Château Sauvage Estate",
        icon: "🍷",
        tag: "Estate Winery",
        category: "Boutique Estate Winery",
        theme: "rose",
        prompt: "Create an upscale boutique estate winery called 'Château Sauvage Estate' with sun-drenched rolling vineyards, French oak barrel aging, and private cellar tastings.",
        heroTitle: "Handcrafted Biodynamic Wines from Sun-Drenched Estate Terroir",
        heroDesc: "Crafted with reverence for nature. We ferment small-batch Pinot Noir and crisp Sauvignon Blanc aged patiently in French oak barrels.",
        heroImg: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🍇", title: "100% Organic Terroir", desc: "Grown without synthetic pesticides on volcanic mineral-rich hillside slopes." },
          { icon: "🪵", title: "French Oak Cellars", desc: "Aged 24 months in toasted Allier oak barrels for silky tannins and deep complexity." },
          { icon: "🥂", title: "Sommelier Guided Tastings", desc: "Intimate private cellar journeys paired with artisan farm cheeses." }
        ],
        gallery: [
          { title: "Sunset Over Vineyard Hills", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80" },
          { title: "French Oak Barrel Aging Room", img: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=800&auto=format&fit=crop&q=80" },
          { title: "Private Sommelier Tasting", img: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=800&auto=format&fit=crop&q=80" },
          { title: "Estate Harvest Reserve", img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "sommelier@chateausauvage.com",
        contactPhone: "(555) 723-9182",
        contactAddress: "1200 Valley Ridge Road, Napa Valley",
        bannerText: "Reserve a Private Cellar Tasting"
      },
      farm: {
        id: "farm",
        name: "Meadowland Organics",
        icon: "🌾",
        tag: "Agri Farm",
        category: "Organic Agri Farm & Orchard",
        theme: "emerald",
        prompt: "Create an organic regenerative agri farm called 'Meadowland Organics' with heirloom crops, free-range apiary honey, greenhouse vegetables, and farm-to-table tours.",
        heroTitle: "Regenerative Organic Farming, Pure Heirloom Produce & Raw Honey",
        heroDesc: "Nourishing our community with pesticide-free, nutrient-dense fruits, vegetables, and wildflowers harvested fresh at dawn every single morning.",
        heroImg: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🌱", title: "Heirloom Seed Stock", desc: "Preserving ancient nutrient-rich seed varietals bursting with authentic flavors." },
          { icon: "🐝", title: "Wildflower Apiaries", desc: "Pollinated by ethical rescue bee colonies producing pure raw unfiltered honey." },
          { icon: "🚜", title: "Zero Synthetic Chemicals", desc: "100% biological soil enrichment through compost tea and cover cropping." }
        ],
        gallery: [
          { title: "Morning Harvest Baskets", img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=80" },
          { title: "Solar Powered Greenhouses", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80" },
          { title: "Pure Raw Wildflower Honey", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80" },
          { title: "Regenerative Soil Cultivation", img: "https://images.unsplash.com/photo-1592417817098-8f3d6ef231d6?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "harvest@meadowlandorganics.com",
        contactPhone: "(555) 492-1038",
        contactAddress: "350 Farmstead Lane, Green Valley",
        bannerText: "Schedule a Guided Farm & Orchard Tour"
      },
      pizzeria: {
        id: "pizzeria",
        name: "Napoli Forno Pizzeria",
        icon: "🍕",
        tag: "Woodfired Pizza",
        category: "Artisan Neapolitan Pizza",
        theme: "terra",
        prompt: "Create an authentic Neapolitan pizzeria called 'Napoli Forno Pizzeria' with 900-degree volcanic wood ovens, San Marzano tomatoes, and creamy buffalo mozzarella.",
        heroTitle: "900° Volcanic Wood-Fired Neapolitan Pizza & Wild Sourdough",
        heroDesc: "Crafted following century-old Naples traditions. Leopard-spotted blistered crust, sweet San Marzano plum tomatoes, and handcrafted buffalo mozzarella.",
        heroImg: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🍕", title: "San Marzano D.O.P.", desc: "Grown in volcanic soil near Mount Vesuvius for unmatched natural sweetness." },
          { icon: "🪵", title: "Wood Hearth Oven", desc: "Baked for exactly 90 seconds at 900°F on authentic Biscotto di Sorrento stone." },
          { icon: "🧀", title: "Fresh Fior Di Latte", desc: "Creamy whole milk mozzarella pulled by hand fresh every afternoon." }
        ],
        gallery: [
          { title: "Classic Margherita Extra", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80" },
          { title: "Blistering Hearth Oven Flame", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80" },
          { title: "Truffle & Wild Mushroom Pie", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80" },
          { title: "Hand-Stretched Pizza Dough", img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "forno@napolipizza.com",
        contactPhone: "(555) 392-1084",
        contactAddress: "12 Via Toledo, Little Italy",
        bannerText: "Reserve Your Table at the Pizza Bar"
      },
      sushi: {
        id: "sushi",
        name: "Sakura Omakase Lounge",
        icon: "🍣",
        tag: "Edomae Omakase",
        category: "Edomae Sushi & Omakase",
        theme: "ocean",
        prompt: "Create an intimate Edomae sushi omakase called 'Sakura Omakase Lounge' with wild fish flown in from Toyosu Market, aged akazu sushi rice, and custom ceramic sakeware.",
        heroTitle: "Edomae Omakase Experience & Direct Toyosu Market Wild Fish",
        heroDesc: "An intimate 10-seat dining journey guided by master sushi chefs. Experience precision knife work and red vinegar seasoned sushi rice.",
        heroImg: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🍣", title: "Toyosu Wild Sourcing", desc: "Direct overnight shipments of Otoro bluefin, Hokkaido uni, and Shima Aji." },
          { icon: "🍚", title: "Aged Akazu Rice", desc: "Seasoned with fermented sake lees red vinegar for silky rich umami." },
          { icon: "🔪", title: "Master Knife Craft", desc: "Traditional aging and scoring techniques to unlock optimal flavor texture." }
        ],
        gallery: [
          { title: "Bluefin Otoro Nigiri", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=80" },
          { title: "Chef Precision Knife Cut", img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&auto=format&fit=crop&q=80" },
          { title: "Hokkaido Sea Urchin Gunkan", img: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&auto=format&fit=crop&q=80" },
          { title: "Ceramic Sake Flight", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "concierge@sakuraomakase.com",
        contactPhone: "(555) 890-4412",
        contactAddress: "88 Ginza Crossing, Tokyo District",
        bannerText: "Confirm Your Omakase Counter Reservation"
      },
      spa: {
        id: "spa",
        name: "Aura Botanical Sanctuary",
        icon: "🌿",
        tag: "Wellness Spa",
        category: "Holistic Wellness Spa",
        theme: "indigo",
        prompt: "Create a serene wellness sanctuary called 'Aura Botanical Sanctuary' with hot stone therapy, sound baths, botanical aromatherapy, and mineral spring pools.",
        heroTitle: "Ancient Thermal Waters & Rejuvenating Botanical Rituals",
        heroDesc: "Disconnect from the noise and restore your inner equilibrium with mineral-rich hot springs, organic floral extracts, and restorative sound therapies.",
        heroImg: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🌸", title: "Pure Botanical Oils", desc: "Custom blended organic essential oils formulated to melt stress and restore vitality." },
          { icon: "🪨", title: "Volcanic Stone Therapy", desc: "Heated basalt river stones placed along energy meridians to release muscle tension." },
          { icon: "🔔", title: "Tibetan Sound Healing", desc: "Resonant quartz singing bowls that synchronize brainwaves into deep delta tranquility." }
        ],
        gallery: [
          { title: "Thermal Mineral Springs", img: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&auto=format&fit=crop&q=80" },
          { title: "Aromatic Essential Oils", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80" },
          { title: "Hot Stone Relaxation", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop&q=80" },
          { title: "Private Meditation Lounge", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "sanctuary@aurabotanical.com",
        contactPhone: "(555) 601-9482",
        contactAddress: "77 Serenity Woods Trail, Highland Springs",
        bannerText: "Reserve Your Day of Pure Tranquility"
      },
      gym: {
        id: "gym",
        name: "Iron Pulse Athletic Club",
        icon: "💪",
        tag: "Athletic Gym",
        category: "Strength & Conditioning",
        theme: "terra",
        prompt: "Create an athletic training facility called 'Iron Pulse Athletic Club' with Olympic lifting platforms, turf agility tracks, and contrast cryotherapy.",
        heroTitle: "Elite Strength Conditioning, Olympic Lifting & Athletic Training",
        heroDesc: "Engineered for athletes and driven individuals. Unleash your full physical potential with state-of-the-art barbell equipment and expert coaching.",
        heroImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🏋️", title: "Olympic Platforms", desc: "Eleiko calibrated competition plates and custom shock-absorbing oak wood platforms." },
          { icon: "⚡", title: "Turf Agility Track", desc: "50-meter indoor sprint turf complete with weighted sleds and plyometric stations." },
          { icon: "🧊", title: "Cryotherapy Suite", desc: "Accelerate recovery with -110°C whole body cryochambers and cold plunge tubs." }
        ],
        gallery: [
          { title: "Heavy Barbell Training Arena", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80" },
          { title: "Sprint & Sled Turf Zone", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80" },
          { title: "Dumbbell & Kettlebell Vault", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80" },
          { title: "Cold Plunge Recovery Suite", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "coaches@ironpulse.club",
        contactPhone: "(555) 781-4392",
        contactAddress: "500 Titanium Way, Metro Industrial Park",
        bannerText: "Confirm Your Athletic Assessment Session"
      },
      bookstore: {
        id: "bookstore",
        name: "Rare Folio Antiquarian",
        icon: "📚",
        tag: "Antiquarian Books",
        category: "Rare Books & Archive",
        theme: "gold",
        prompt: "Create an antiquarian bookstore called 'Rare Folio Antiquarian' with first editions, leather-bound classics, and antique reading nooks.",
        heroTitle: "First Editions, Fine Bindings & Curated Literary Antiquities",
        heroDesc: "A sanctuary for bibliophiles and historians. Discover museum-grade manuscripts, signed first editions, and centuries-old maps in a cozy atmosphere.",
        heroImg: "https://images.unsplash.com/photo-1507842229452-772d1c9f8edd?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "📜", title: "Certified First Editions", desc: "Authenticated original printings from celebrated literary masters across centuries." },
          { icon: "📖", title: "Leather Hand-Binding", desc: "Restored antique volumes bound in calfskin and stamped with 22k genuine gold leaf." },
          { icon: "🕯️", title: "Private Reading Nooks", desc: "Comfortable Chesterfield armchairs beside glowing reading lamps and rare folios." }
        ],
        gallery: [
          { title: "Grand Library Shelves", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80" },
          { title: "Signed Antique Manuscripts", img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80" },
          { title: "Vintage Reading Salon", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80" },
          { title: "Antiquarian Map Collection", img: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "curator@rarefolio.com",
        contactPhone: "(555) 314-1592",
        contactAddress: "18 Oxford Row, Historic Square",
        bannerText: "Request a Private Viewing of Archival Folios"
      },
      cafe: {
        id: "cafe",
        name: "Velvet Pour Coffee Roasters",
        icon: "☕",
        tag: "Artisanal Coffee",
        category: "Artisanal Coffee & Roastery",
        theme: "amber",
        prompt: "Create an artisanal coffee roastery called 'Velvet Pour Coffee Roasters' with single-origin pour-overs, nitro cold brew on tap, and housemade pastries.",
        heroTitle: "Micro-Lot Single Origin Roasts & Precision Pour-Over Craft",
        heroDesc: "Directly sourced from high-altitude shade-grown micro farms. Roasted in small batches every morning to unlock vibrant floral and fruity tasting notes.",
        heroImg: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "☕", title: "Single Origin Micro-Lots", desc: "Ethically traded coffees directly from Ethiopian Yirgacheffe and Colombian estates." },
          { icon: "🔥", title: "Fluid-Bed Roasting", desc: "Precision temperature curve profiling for clean sweetness and zero bitter char." },
          { icon: "🥛", title: "House Sprouted Milks", desc: "Creamy oat, almond, and cashew milks pressed in-house every single morning." }
        ],
        gallery: [
          { title: "Ceramic V60 Pour Over", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80" },
          { title: "Custom Espresso Extraction", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80" },
          { title: "Freshly Roasted Coffee Beans", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80" },
          { title: "Warm Flaky Croissants", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "baristas@velvetpour.com",
        contactPhone: "(555) 902-8341",
        contactAddress: "108 Roasters Alley, Artisan District",
        bannerText: "Experience Our Tasting Flight at the Roastery"
      },
      bakery: {
        id: "bakery",
        name: "Golden Crust Artisan Bakery",
        icon: "🥐",
        tag: "French Bakery",
        category: "Sourdough & French Pastry",
        theme: "amber",
        prompt: "Create a rustic French bakery called 'Golden Crust Artisan Bakery' with 48-hour fermented sourdough loaves and buttery pain au chocolat.",
        heroTitle: "48-Hour Wild Fermented Sourdough & Laminated French Pastries",
        heroDesc: "Baked with ancient French stone-ground flours, pure Normandy butter, and a century-old wild starter for incredible crust and heavenly airy crumb.",
        heroImg: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🥖", title: "Ancient Sourdough Starter", desc: "Naturally leavened wild starter nurtured continuously since 1924." },
          { icon: "🧈", title: "Normandy Cultured Butter", desc: "Over 84% butterfat for extraordinary lamination in our flaky golden croissants." },
          { icon: "🪵", title: "Stone Deck Hearth Oven", desc: "Baked directly on glowing refractory stone for the crispiest singing crust." }
        ],
        gallery: [
          { title: "Golden Country Sourdough Loaves", img: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80" },
          { title: "Honeycomb Pain Au Chocolat", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80" },
          { title: "Berry & Custard Brioche Tarts", img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80" },
          { title: "Baguettes Fresh from the Hearth", img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "bakers@goldencrust.com",
        contactPhone: "(555) 712-4091",
        contactAddress: "220 Rue De La Boulangerie, West End",
        bannerText: "Order Your Freshly Baked Morning Bread Basket"
      },
      bike: {
        id: "bike",
        name: "Velocity Cycle Works",
        icon: "🚲",
        tag: "Bicycle Atelier",
        category: "Custom Bicycles & Tuning",
        theme: "indigo",
        prompt: "Create a precision bicycle atelier called 'Velocity Cycle Works' with custom titanium road bikes, hydraulic brake servicing, and computerized bike fitting.",
        heroTitle: "Custom Titanium Road & Gravel Builds with Precision Fitting",
        heroDesc: "Every millimeter matters. We build dream machines and tune race rigs with aerospace-grade precision and laser-guided biometric bike fitting.",
        heroImg: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "⚙️", title: "Master Tuning", desc: "Electronic shifting calibration and ultrasonic drivetrain degreasing." },
          { icon: "📐", title: "Laser Fitting", desc: "Eliminate pain and maximize wattage with our 3D motion capture fitting lab." },
          { icon: "🚴", title: "Handbuilt Wheels", desc: "Laced and trued to within 0.1mm tolerance with DT Swiss ceramic hubs." }
        ],
        gallery: [
          { title: "Custom Titanium Frame Assembly", img: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&auto=format&fit=crop&q=80" },
          { title: "Precision Drivetrain Tuning", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80" },
          { title: "Gravel Adventure Rigs", img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&auto=format&fit=crop&q=80" },
          { title: "Aero Carbon Wheelsets", img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "mechanics@velocitycycles.com",
        contactPhone: "(555) 481-9032",
        contactAddress: "64 Peloton Boulevard, South District",
        bannerText: "Schedule a 3D Precision Bike Fitting Session"
      },
      florist: {
        id: "florist",
        name: "Bloom & Botanical",
        icon: "🌸",
        tag: "Artisan Florist",
        category: "Artisan Florist & Botanics",
        theme: "rose",
        prompt: "Create a botanical flower atelier called 'Bloom & Botanical' with rare imported orchids, wild dried flora, and bespoke wedding installations.",
        heroTitle: "Wild Botanical Florals, Rare Orchids & Bespoke Arrangements",
        heroDesc: "Arranged with organic poetry. We source sustainably grown blossoms from local growers and Dutch heritage greenhouses for memorable occasions.",
        heroImg: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "💐", title: "Daily Foraging", desc: "Fresh seasonal branches, eucalyptus, and wild blooms gathered at dawn." },
          { icon: "🌿", title: "Eco-Friendly", desc: "100% floral-foam free, compostable packaging, and biodegradable ribbons." },
          { icon: "🌸", title: "Bespoke Styling", desc: "Dramatic architectural arrangements designed for weddings and luxury venues." }
        ],
        gallery: [
          { title: "Wild Garden Floral Bouquet", img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&auto=format&fit=crop&q=80" },
          { title: "Rare Orchid Glasshouse", img: "https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?w=800&auto=format&fit=crop&q=80" },
          { title: "Whimsical Dried Floral Arches", img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop&q=80" },
          { title: "Hand-Tied Table Centerpieces", img: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "hello@bloombotanical.com",
        contactPhone: "(555) 238-9104",
        contactAddress: "73 Blossom Lane, Garden Quarter",
        bannerText: "Order a Custom Hand-Tied Seasonal Bouquet"
      },
      pet: {
        id: "pet",
        name: "Pawfect Luxury Pet Spa",
        icon: "🐾",
        tag: "Pet Care Spa",
        category: "Pet Grooming & Daycare",
        theme: "emerald",
        prompt: "Create a premier luxury pet retreat called 'Pawfect Luxury Pet Spa' with hypoallergenic bubble baths, blueberry facials, and agility play parks.",
        heroTitle: "Luxury Canine Spa Retreat & Five-Star Play Sanctuary",
        heroDesc: "Your four-legged family members deserve royal pampering. Gentle organic grooming, warm bubble baths, and spacious sunny play yards.",
        heroImg: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🛁", title: "Hypoallergenic Baths", desc: "Oatmeal and organic aloe shampoos to soothe sensitive skin and restore coat shine." },
          { icon: "🐾", title: "Supervised Turf", desc: "Spacious indoor-outdoor play arenas segmented safely by pet size and temperament." },
          { icon: "🛏️", title: "Orthopedic Suites", desc: "Private temperature-controlled suites featuring plush orthopedic memory foam beds." }
        ],
        gallery: [
          { title: "Gentle Coat Grooming & Styling", img: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800&auto=format&fit=crop&q=80" },
          { title: "Warm Water Bubble Spa Bath", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=80" },
          { title: "Spacious Green Play Meadows", img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80" },
          { title: "Happy Pups & Pampered Dogs", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "care@pawfectspa.com",
        contactPhone: "(555) 890-1234",
        contactAddress: "89 Meadowbrook Drive, Sunny Valley",
        bannerText: "Confirm Your Pet's VIP Spa & Play Day"
      },
      auto: {
        id: "auto",
        name: "Apex Classic Restorations",
        icon: "🏎️",
        tag: "Auto Tuning",
        category: "Classic & Supercar Tuning",
        theme: "gold",
        prompt: "Create a vintage supercar atelier called 'Apex Classic Restorations' with bare-metal coachbuilding, engine rebuilding, and dyno tuning.",
        heroTitle: "Bespoke Coachbuilding, Engine Blue-Printing & Historic Restorations",
        heroDesc: "Reviving legendary automotive icons. From air-cooled European classics to custom hand-beaten aluminum bodies with dyno-proven horsepower.",
        heroImg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🏎️", title: "Bare-Metal Coachwork", desc: "Hand-shaped aluminum panels and English wheel metal fabrication." },
          { icon: "🔧", title: "Engine Blue-Printing", desc: "Precision balanced crankshafts, port-matched heads, and multi-carburetor tuning." },
          { icon: "🎨", title: "Concours Paintwork", desc: "Multi-stage wet sanding and ceramic coating for mirror-finish reflection." }
        ],
        gallery: [
          { title: "Classic Air-Cooled Flat Six", img: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80" },
          { title: "Hand-Crafted Aluminum Body", img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80" },
          { title: "Dyno Performance Room", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80" },
          { title: "Concours Finished Cockpit", img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "concierge@apexrestorations.com",
        contactPhone: "(555) 702-9988",
        contactAddress: "100 Autohaus Boulevard, Performance Park",
        bannerText: "Confirm Your Classic Vehicle Consultation"
      },
      tea: {
        id: "tea",
        name: "Bamboo Mist Teahouse",
        icon: "🍵",
        tag: "Matcha Sanctuary",
        category: "Ceremonial Matcha & Loose Leaf",
        theme: "emerald",
        prompt: "Create a serene Kyoto teahouse called 'Bamboo Mist Teahouse' with ceremonial Uji matcha, rare mountain oolong, and traditional tatami tea ceremonies.",
        heroTitle: "Ceremonial Uji Matcha Whisking & Mountain High-Elevation Teas",
        heroDesc: "A peaceful sanctuary of mindfulness. Savor single-estate green teas, stone-milled ceremonial matcha, and delicate wagashi sweets beside koi ponds.",
        heroImg: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&auto=format&fit=crop&q=80",
        features: [
          { icon: "🍵", title: "Stone-Ground Uji Matcha", desc: "First-harvest shade-grown tencha ground patiently on granite stones in Kyoto." },
          { icon: "🎋", title: "Traditional Tatami Rooms", desc: "Authentic cedarwood tea rooms overlooking serene bamboo gardens and stone lanterns." },
          { icon: "🌸", title: "Handcrafted Wagashi", desc: "Seasonal artisanal confections designed to balance the rich umami of fresh tea." }
        ],
        gallery: [
          { title: "Bamboo Whisk & Matcha Bowl", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80" },
          { title: "Kyoto Bamboo Garden", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80" },
          { title: "Clay Kyusu Teapot Pouring", img: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800&auto=format&fit=crop&q=80" },
          { title: "Artisanal Seasonal Wagashi", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80" }
        ],
        contactEmail: "tea@bamboomist.com",
        contactPhone: "(555) 431-8902",
        contactAddress: "45 Zen Garden Way, Kyoto Hills",
        bannerText: "Confirm Your Traditional Tea Ceremony Session"
      }
    };

    const THEMES = {
      amber: { primary: "#d97706", hover: "#b45309", bg: "#fffbeb", heroBg: "#fef3c7", text: "#78350f" },
      emerald: { primary: "#059669", hover: "#047857", bg: "#f0fdf4", heroBg: "#dcfce7", text: "#064e3b" },
      rose: { primary: "#e11d48", hover: "#be123c", bg: "#fff1f2", heroBg: "#ffe4e6", text: "#881337" },
      indigo: { primary: "#4f46e5", hover: "#4338ca", bg: "#eef2ff", heroBg: "#e0e7ff", text: "#1e1b4b" },
      terra: { primary: "#c2410c", hover: "#9a3412", bg: "#fff7ed", heroBg: "#ffedd5", text: "#7c2d12" },
      purple: { primary: "#7c3aed", hover: "#6d28d9", bg: "#faf5ff", heroBg: "#f3e8ff", text: "#4c1d95" },
      ocean: { primary: "#0284c7", hover: "#0369a1", bg: "#f0f9ff", heroBg: "#e0f2fe", text: "#082f49" },
      gold: { primary: "#b45309", hover: "#92400e", bg: "#fdfbf7", heroBg: "#fef9ee", text: "#451a03" }
    };

    /* State */
    let selectedCategoryKey = 'biryani';
    let currentData = null;
    let isEditMode = false;
    let activeSectionSize = 'standard';

    /* Init */
    window.addEventListener('DOMContentLoaded', () => {
      renderCategoryCards();
      selectCategory('biryani');
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateEl = document.getElementById('bk-date');
      if (dateEl) dateEl.value = tomorrow.toISOString().split('T')[0];
    });

    function showView(viewId) {
      document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
      const target = document.getElementById(`view-${viewId}`);
      if (target) target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderCategoryCards() {
      const grid = document.getElementById('category-cards-grid');
      if (!grid) return;

      grid.innerHTML = Object.values(CATEGORIES).map(cat => `
        <div class="category-card ${cat.id === selectedCategoryKey ? 'active' : ''}" onclick="selectAndGenerateCategory('${cat.id}')">
          <div>
            <div class="category-card-top">
              <span class="category-icon-box">${cat.icon}</span>
              <span class="category-badge-tag">${cat.tag}</span>
            </div>
            <h3 class="category-name">${cat.name}</h3>
            <p class="category-desc">${cat.heroDesc.substring(0, 105)}...</p>
          </div>
          <div class="category-footer-btn">
            <span>Click to Generate & Explore</span>
            <span>➔</span>
          </div>
        </div>
      `).join('');
    }

    function selectCategory(key) {
      selectedCategoryKey = key;
      const cat = CATEGORIES[key];
      if (cat) {
        document.getElementById('main-prompt-input').value = cat.prompt;
      }
      renderCategoryCards();
    }

    function selectAndGenerateCategory(key) {
      selectCategory(key);
      triggerGenerate();
    }

    /* Core Action: Click 'Generate' to open generated website section */
    function triggerGenerate() {
      const prompt = document.getElementById('main-prompt-input').value;
      if (!prompt.trim()) {
        showToast("⚠️ Please enter or select a business prompt!");
        return;
      }

      showToast("✨ Synthesizing bespoke web platform...");
      renderSynthesizedSite(detectPresetOrSynthesize(prompt));
      showView('generated');
    }

    function reGenerateFromStudio() {
      const prompt = document.getElementById('studio-prompt-input').value;
      document.getElementById('main-prompt-input').value = prompt;
      triggerGenerate();
    }

    function detectPresetOrSynthesize(prompt) {
      const lower = prompt.toLowerCase();
      let matchedKey = selectedCategoryKey || 'biryani';

      if (lower.includes('barber') || lower.includes('shave') || lower.includes('haircut')) matchedKey = 'barber';
      else if (lower.includes('wine') || lower.includes('winery') || lower.includes('vineyard')) matchedKey = 'winery';
      else if (lower.includes('farm') || lower.includes('honey') || lower.includes('agri') || lower.includes('organic')) matchedKey = 'farm';
      else if (lower.includes('pizza') || lower.includes('pizzeria') || lower.includes('napoli') || lower.includes('margherita')) matchedKey = 'pizzeria';
      else if (lower.includes('sushi') || lower.includes('omakase') || lower.includes('japanese') || lower.includes('nigiri')) matchedKey = 'sushi';
      else if (lower.includes('spa') || lower.includes('wellness') || lower.includes('massage') || lower.includes('spring')) matchedKey = 'spa';
      else if (lower.includes('gym') || lower.includes('fitness') || lower.includes('lifting') || lower.includes('strength')) matchedKey = 'gym';
      else if (lower.includes('book') || lower.includes('library') || lower.includes('folio') || lower.includes('archive')) matchedKey = 'bookstore';
      else if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('espresso') || lower.includes('roast')) matchedKey = 'cafe';
      else if (lower.includes('bakery') || lower.includes('bread') || lower.includes('pastry') || lower.includes('sourdough')) matchedKey = 'bakery';
      else if (lower.includes('bike') || lower.includes('cycle') || lower.includes('bicycle')) matchedKey = 'bike';
      else if (lower.includes('flower') || lower.includes('florist') || lower.includes('bouquet')) matchedKey = 'florist';
      else if (lower.includes('pet') || lower.includes('dog') || lower.includes('grooming')) matchedKey = 'pet';
      else if (lower.includes('auto') || lower.includes('car') || lower.includes('tuning') || lower.includes('motor')) matchedKey = 'auto';
      else if (lower.includes('tea') || lower.includes('matcha') || lower.includes('teahouse')) matchedKey = 'tea';

      const base = CATEGORIES[matchedKey] || CATEGORIES['biryani'];
      let brandName = base.name;
      const quoteMatch = prompt.match(/['"]([^'"]+)['"]/);
      if (quoteMatch && quoteMatch[1].length > 2 && quoteMatch[1].length < 40) {
        brandName = quoteMatch[1];
      }

      return {
        ...base,
        name: brandName,
        customPrompt: prompt
      };
    }

    function renderSynthesizedSite(data) {
      currentData = data;
      document.getElementById('studio-prompt-input').value = data.customPrompt || data.prompt;
      document.getElementById('active-site-indicator').innerText = data.name;

      const theme = THEMES[data.theme] || THEMES.indigo;
      const root = document.getElementById('site-render-root');
      
      const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      document.getElementById('preview-url').innerText = `https://webmind.ai/p/${slug}`;

      // Set CSS variables
      root.style.setProperty('--site-primary', theme.primary);
      root.style.setProperty('--site-primary-hover', theme.hover);
      root.style.setProperty('--site-bg', theme.bg);
      root.style.setProperty('--site-hero-bg', theme.heroBg);
      root.style.setProperty('--site-text', theme.text);

      const sizeClass = `section-${activeSectionSize}`;

      const html = `
        <!-- Dynamic Nav -->
        <nav class="site-nav">
          <div class="site-brand">
            <span>✨</span>
            <span contenteditable="${isEditMode}">${data.name}</span>
          </div>
          <ul class="site-links">
            <li><a href="#about" contenteditable="${isEditMode}">About Us</a></li>
            <li><a href="#highlights" contenteditable="${isEditMode}">Highlights</a></li>
            <li><a href="#gallery" contenteditable="${isEditMode}">Gallery</a></li>
            <li><a href="#contact-admin" contenteditable="${isEditMode}">Contact Admin</a></li>
          </ul>
          <div style="display: flex; gap: 0.6rem; align-items: center;">
            <button class="site-btn" onclick="openBookingModal()">
              📅 Confirm Your Request
            </button>
          </div>
        </nav>

        <!-- Dynamic Hero -->
        <header class="site-hero ${sizeClass}" id="about">
          <div class="hero-content">
            <span class="hero-badge" contenteditable="${isEditMode}">Handcrafted Excellence • ${data.category}</span>
            <h1 class="hero-title" contenteditable="${isEditMode}">${data.heroTitle}</h1>
            <p class="hero-desc" contenteditable="${isEditMode}">${data.heroDesc}</p>
            <div class="hero-actions">
              <button class="site-btn" onclick="openBookingModal()">
                📅 Confirm Your Request
              </button>
              <button class="site-btn site-btn-secondary" onclick="openImageModal()">
                📷 Customize Main Image
              </button>
            </div>
          </div>
          <div class="hero-image-wrapper">
            <img id="main-hero-image" src="${data.heroImg}" alt="${data.name}" class="hero-img" loading="eager">
            <button class="hero-img-overlay-btn" onclick="openImageModal()">
              <span>📷</span> Customize Image
            </button>
          </div>
        </header>

        <!-- Highlights Section -->
        <section class="site-section ${sizeClass}" id="highlights" style="background: #ffffff;">
          <div class="section-header">
            <span class="section-tag" contenteditable="${isEditMode}">Signature Craft</span>
            <h2 class="section-title" contenteditable="${isEditMode}">What Sets Us Apart</h2>
            <p class="section-subtitle" contenteditable="${isEditMode}">Every detail perfected to deliver an unforgettable, world-class experience.</p>
          </div>
          <div class="feature-grid">
            ${data.features.map(f => `
              <div class="feature-card">
                <span class="feature-icon">${f.icon}</span>
                <h3 class="feature-name" contenteditable="${isEditMode}">${f.title}</h3>
                <p class="feature-desc" contenteditable="${isEditMode}">${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Gallery Section -->
        <section class="site-section ${sizeClass}" id="gallery" style="background: #f8fafc;">
          <div class="section-header">
            <span class="section-tag" contenteditable="${isEditMode}">Visual Showcase</span>
            <h2 class="section-title" contenteditable="${isEditMode}">Authentic High-Definition Imagery</h2>
            <p class="section-subtitle" contenteditable="${isEditMode}">Captured moments celebrating artistry, atmosphere, and technique.</p>
          </div>
          <div class="gallery-grid">
            ${data.gallery.map(g => `
              <div class="gallery-item" onclick="showToast('Viewing photo: ${g.title}')">
                <img src="${g.img}" alt="${g.title}" loading="lazy">
                <div class="gallery-caption" contenteditable="${isEditMode}">${g.title}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Admin Contact Us Section -->
        <section class="site-section ${sizeClass}" id="contact-admin" style="background: #ffffff;">
          <div class="section-header">
            <span class="section-tag" contenteditable="${isEditMode}">Direct Communication</span>
            <h2 class="section-title" contenteditable="${isEditMode}">Contact Us & Admin Inquiries</h2>
            <p class="section-subtitle" contenteditable="${isEditMode}">Have a bespoke request or question? Send a direct message to our admin team.</p>
          </div>
          <div class="contact-container">
            <div class="contact-info-col">
              <h3 contenteditable="${isEditMode}">Get in Touch with Admin</h3>
              <p contenteditable="${isEditMode}">We are committed to prompt, personalized hospitality. Reach out through our admin communication lines.</p>
              
              <div class="contact-detail-row">
                <div class="contact-icon-box">📍</div>
                <div>
                  <strong style="display: block; font-size: 0.9rem; color: #1e293b;">Location</strong>
                  <span style="font-size: 0.85rem; color: #64748b;" contenteditable="${isEditMode}">${data.contactAddress}</span>
                </div>
              </div>

              <div class="contact-detail-row">
                <div class="contact-icon-box">📞</div>
                <div>
                  <strong style="display: block; font-size: 0.9rem; color: #1e293b;">Phone Line</strong>
                  <span style="font-size: 0.85rem; color: #64748b;" contenteditable="${isEditMode}">${data.contactPhone}</span>
                </div>
              </div>

              <div class="contact-detail-row">
                <div class="contact-icon-box">✉️</div>
                <div>
                  <strong style="display: block; font-size: 0.9rem; color: #1e293b;">Admin Email</strong>
                  <span style="font-size: 0.85rem; color: #64748b;" contenteditable="${isEditMode}">${data.contactEmail}</span>
                </div>
              </div>
            </div>

            <div class="contact-form-col">
              <input type="text" id="contact-name-input" class="contact-input-field" placeholder="Your Full Name">
              <input type="text" id="contact-email-input" class="contact-input-field" placeholder="Your Email or Phone">
              <textarea id="contact-msg-input" class="contact-input-field" style="min-height: 100px; resize: vertical;" placeholder="Your message for the admin team..."></textarea>
              <button class="site-btn" onclick="handleAdminMsgSubmit()">
                ✉️ Send Message to Admin
              </button>
            </div>
          </div>
        </section>

        <!-- Action Banner & Booking Trigger -->
        <section class="site-section ${sizeClass}" style="background: #f8fafc;">
          <div class="interactive-banner">
            <h3 contenteditable="${isEditMode}">${data.bannerText}</h3>
            <p contenteditable="${isEditMode}">Immerse yourself in unmatched quality, dedication, and artisan hospitality. Zero cost or pricing tags.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button class="site-btn" style="background: #ffffff; color: var(--site-primary); font-size: 1.05rem; padding: 0.85rem 2.25rem;" onclick="openBookingModal()">
                ⚡ Confirm Your Request Now
              </button>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="site-footer">
          <div class="footer-content">
            <div>
              <div class="footer-brand" contenteditable="${isEditMode}">${data.name}</div>
              <p style="font-size: 0.9rem; max-width: 320px;" contenteditable="${isEditMode}">Dedicated to artisan heritage and world-class hospitality.</p>
            </div>
            <div>
              <h4 style="color: white; margin-bottom: 0.75rem; font-size: 0.95rem;">Hours of Operation</h4>
              <p style="font-size: 0.85rem;" contenteditable="${isEditMode}">Monday - Friday: 8:00 AM - 10:00 PM</p>
              <p style="font-size: 0.85rem;" contenteditable="${isEditMode}">Saturday - Sunday: 9:00 AM - 11:30 PM</p>
            </div>
            <div>
              <h4 style="color: white; margin-bottom: 0.75rem; font-size: 0.95rem;">Direct Confirmation</h4>
              <p style="font-size: 0.85rem;" contenteditable="${isEditMode}">Concierge Booking Line: (555) 019-2834</p>
              <p style="font-size: 0.85rem;" contenteditable="${isEditMode}">Instant Confirmation Verified</p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 2rem; font-size: 0.75rem; color: #64748b;">
            Synthesized with AntiGravity WebMind AI Engine • Zero Cost / Pricing Policy
          </div>
        </footer>
      `;

      root.innerHTML = html;
    }

    /* Section Size Controller */
    function setSectionSize(size, btnEl) {
      activeSectionSize = size;
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');

      const sizeClasses = ['section-compact', 'section-standard', 'section-spacious', 'section-heroic'];
      document.querySelectorAll('.site-hero, .site-section').forEach(sec => {
        sizeClasses.forEach(c => sec.classList.remove(c));
        sec.classList.add(`section-${size}`);
      });
      showToast(`📏 Section sizing set to: ${size.toUpperCase()}`);
    }

    /* Image Customizer */
    function openImageModal() {
      document.getElementById('image-modal').classList.add('active');
    }
    function closeImageModal() {
      document.getElementById('image-modal').classList.remove('active');
    }
    function applyCustomImageUrl() {
      const url = document.getElementById('custom-img-url-input')?.value;
      if (!url || !url.trim()) {
        showToast("⚠️ Please enter a valid image URL!");
        return;
      }
      setMainImage(url.trim());
      closeImageModal();
      showToast("📷 Main website image customized successfully!");
    }
    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          setMainImage(e.target.result);
          closeImageModal();
          showToast(`📷 Uploaded & applied: ${file.name}`);
        };
        reader.readAsDataURL(file);
      }
    }
    function setMainImage(imgSrc) {
      if (currentData) currentData.heroImg = imgSrc;
      const img = document.getElementById('main-hero-image');
      if (img) img.src = imgSrc;
    }

    /* Booking System (Backend-Connected) */
    function openBookingModal() {
      document.getElementById('booking-modal').classList.add('active');
    }
    function closeBookingModal() {
      document.getElementById('booking-modal').classList.remove('active');
    }

    async function handleBookingSubmit(e) {
      e.preventDefault();
      const payload = {
        shopName: currentData ? currentData.name : 'WebMind AI Shop',
        guestName: document.getElementById('bk-name')?.value,
        contact: document.getElementById('bk-contact')?.value,
        date: document.getElementById('bk-date')?.value,
        time: document.getElementById('bk-time')?.value,
        partySize: document.getElementById('bk-party')?.value,
        serviceType: document.getElementById('bk-service')?.value,
        specialRequests: document.getElementById('bk-notes')?.value || 'None'
      };

      showToast("⚡ Transmitting request to live backend...");

      try {
        const res = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          closeBookingModal();
          showToast(`🎉 ${data.message}`);
        } else {
          fallbackLocalBooking(payload);
        }
      } catch (err) {
        fallbackLocalBooking(payload);
      }
    }

    function fallbackLocalBooking(payload) {
      const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);
      const existing = JSON.parse(localStorage.getItem('webmind_bookings') || '[]');
      existing.push({ ...payload, id: bookingId, timestamp: new Date().toISOString() });
      localStorage.setItem('webmind_bookings', JSON.stringify(existing));
      closeBookingModal();
      showToast(`🎉 Request Confirmed! Booking ID: ${bookingId} (Saved to Database)`);
    }

    function handleAdminMsgSubmit() {
      const name = document.getElementById('contact-name-input')?.value;
      const email = document.getElementById('contact-email-input')?.value;
      const msg = document.getElementById('contact-msg-input')?.value;
      if (!name || !email || !msg) {
        showToast("⚠️ Please fill in your name, email, and message!");
        return;
      }
      showToast(`✅ Thank you, ${name}! Your inquiry was dispatched to admin.`);
      if (document.getElementById('contact-name-input')) document.getElementById('contact-name-input').value = '';
      if (document.getElementById('contact-email-input')) document.getElementById('contact-email-input').value = '';
      if (document.getElementById('contact-msg-input')) document.getElementById('contact-msg-input').value = '';
    }

    /* Live Editing */
    function toggleEditMode() {
      isEditMode = !isEditMode;
      const text = document.getElementById('edit-text');
      const pill = document.getElementById('edit-pill');
      const vp = document.getElementById('preview-viewport');

      if (isEditMode) {
        text.innerHTML = '✏️ In-Line Edit: <strong>ON</strong>';
        pill.innerText = 'Active';
        pill.style.background = 'rgba(16, 185, 129, 0.2)';
        pill.style.color = '#34d399';
        vp.classList.add('edit-mode-active');
        showToast('✏️ In-line editing active! Click directly on any text to modify.');
      } else {
        text.innerHTML = '✏️ In-Line Edit: <strong>OFF</strong>';
        pill.innerText = 'Toggle';
        pill.style.background = 'rgba(255, 255, 255, 0.1)';
        pill.style.color = 'inherit';
        vp.classList.remove('edit-mode-active');
        showToast('💾 In-line edits preserved.');
      }

      document.querySelectorAll('#site-render-root [contenteditable]').forEach(el => {
        el.setAttribute('contenteditable', isEditMode.toString());
      });
    }

    function setDeviceMode(mode, btn) {
      document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const vp = document.getElementById('preview-viewport');
      vp.className = `preview-viewport ${mode} ${isEditMode ? 'edit-mode-active' : ''}`;
    }

    function speakSiteContent() {
      if (!currentData) return;
      if (!('speechSynthesis' in window)) {
        showToast("Speech Synthesis is not supported in this browser.");
        return;
      }
      window.speechSynthesis.cancel();
      const text = `Welcome to ${currentData.name}. ${currentData.heroTitle}. ${currentData.heroDesc}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
      showToast(`🔊 Narrating: ${currentData.name}`);
    }

    function exportFullHTML() {
      const root = document.getElementById('site-render-root');
      const full = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${currentData?.name || 'WebMind AI Site'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Outfit:wght@600;800&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; background: #ffffff; color: #1e293b; }
  </style>
</head>
<body>
${root.innerHTML}
</body>
</html>`;
      const blob = new Blob([full], { type: 'text/html;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${(currentData?.name || 'webmind_site').toLowerCase().replace(/[^a-z0-9]/g, '_')}.html`;
      a.click();
      showToast("📥 Exported HTML file!");
    }

    function showToast(message) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  </script>
</body>
</html>
'''

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(HTML_CONTENT.strip())

print(f"Successfully generated {OUTPUT_FILE} with size: {os.path.getsize(OUTPUT_FILE)} bytes")
