/**
 * WebMind AI - Universal Shop Application Logic & Deep Editing Controller
 * Generates bespoke web platforms for ANY shop description.
 * Deeply Editable • High-Quality Photography • Non-Reader Audio Speech • Zero Pricing
 */

const App = {
  state: {
    currentSchema: null,
    history: [],
    historyIndex: -1,
    activeViewMode: 'desktop',
    activeTab: 'chat',
    isGenerating: false,
    likesCount: 428,
    isSpeaking: false,
    editingSectionId: null,
    swappingPhotoTarget: null // { type: 'hero'|'gallery'|'offering', sectionId, itemIndex }
  },

  // Inspiration prompts spanning diverse shop domains
  samplePrompts: [
    "A warm, cozy artisan coffee shop named Velvet Roast Cafe with high-quality photos, fresh pastries, warm rustic atmosphere, and zero pricing.",
    "A French artisan bakery named Golden Crust with hot sourdough, golden croissants, fresh fruit pastries, and zero cost sections.",
    "An independent cozy bookstore & comic reading lounge named Page & Quill with floor-to-ceiling shelves, vintage hardcovers, and quiet armchairs.",
    "A gentle organic pet grooming salon & dog bakery named Paws & Whiskers with warm herbal baths, healthy biscuits, and zero pricing.",
    "A handcrafted ceramics & pottery studio named Mud & Fire with wheel-thrown stoneware vases, barista mugs, and gas kiln firings.",
    "An artisan small-batch gelato parlor named Sweet Swirl with roasted Sicilian pistachio, mango sorbet, and fresh warm waffle cones.",
    "A vintage vinyl record lounge & turntable shop named Groove Heritage with rare jazz pressings, tube audio systems, and listening booths."
  ],

  // Curated alternate photos pool for quick swapping
  photoLibrary: [
    { label: 'Coffee & Espresso', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Latte Art Rosette', url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Fresh Butter Croissants', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Country Sourdough Bread', url: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Cozy Bookstore Shelves', url: 'https://images.unsplash.com/photo-1507842229451-7f01be7a7a58?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Reading Velvet Chair', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Floral Wildflowers', url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Pottery Wheel Craft', url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Artisan Gelato Bowls', url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Vintage Vinyl Records', url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Happy Golden Dog', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Barbershop Chair', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80' }
  ],

  init() {
    this.bindEvents();
    this.fetchBackendData();
    this.setupLightbox();
    this.setupModals();
    this.setupBookingConfirmModal();
    this.setupSectionEditorModal();
    this.setupPhotoSwapperModal();
    this.checkUrlForSharedState();

    const input = document.getElementById('main-prompt-input');
    if (input && !input.value) {
      input.value = this.samplePrompts[0];
    }
  },

  bindEvents() {
    // Generate Button
    const genBtn = document.getElementById('btn-generate-main');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        const input = document.getElementById('main-prompt-input');
        const prompt = input?.value?.trim() || this.samplePrompts[0];
        this.generateWebsite(prompt);
      });
    }

    // Surprise Me Button
    const surpriseBtn = document.getElementById('btn-surprise-me');
    if (surpriseBtn) {
      surpriseBtn.addEventListener('click', () => {
        const input = document.getElementById('main-prompt-input');
        const randomPrompt = this.samplePrompts[Math.floor(Math.random() * this.samplePrompts.length)];
        if (input) {
          input.value = randomPrompt;
          this.showToast('Selected: ' + randomPrompt.substring(0, 42) + '...', 'info');
        }
      });
    }

    // Preset Chips
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-prompt') || chip.innerText;
        const input = document.getElementById('main-prompt-input');
        if (input) {
          input.value = text;
          input.focus();
        }
      });
    });

    // Chat input in Studio
    const chatInput = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-btn');
    if (chatSendBtn && chatInput) {
      const sendMsg = () => {
        const msg = chatInput.value.trim();
        if (msg) {
          this.handleSendChatMessage(msg);
          chatInput.value = '';
        }
      };
      chatSendBtn.addEventListener('click', sendMsg);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMsg();
      });
    }

    // Project Name Editing
    const projNameInput = document.getElementById('project-name-input');
    if (projNameInput) {
      projNameInput.addEventListener('change', (e) => {
        if (this.state.currentSchema) {
          this.state.currentSchema.brandName = e.target.value.trim() || 'My Shop';
          this.renderCanvas();
          this.showToast('Brand name updated in real time!', 'success');
        }
      });
    }

    // Deep Real-Time Inline Editing Synchronizer
    const canvas = document.getElementById('canvas-viewport');
    if (canvas) {
      canvas.addEventListener('blur', (e) => {
        if (e.target.hasAttribute('contenteditable')) {
          this.syncInlineEdit(e.target);
        }
      }, true);

      canvas.addEventListener('keydown', (e) => {
        if (e.target.hasAttribute('contenteditable') && e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'P') {
          e.preventDefault();
          e.target.blur();
        }
      });
    }
  },

  /**
   * Sync inline edits directly into state schema
   */
  syncInlineEdit(element) {
    if (!this.state.currentSchema) return;

    const secId = element.getAttribute('data-section-id');
    const field = element.getAttribute('data-field');
    const itemIndex = element.getAttribute('data-item-index');
    const newText = element.innerText.trim();

    if (!secId || !field) return;

    const sec = this.state.currentSchema.sections.find(s => s.id === secId);
    if (!sec) return;

    // Field-specific state update
    if (itemIndex !== null && itemIndex !== undefined && sec.items) {
      const idx = parseInt(itemIndex, 10);
      if (sec.items[idx]) {
        if (field === 'offeringTitle') sec.items[idx].title = newText;
        if (field === 'offeringDesc') sec.items[idx].desc = newText;
        if (field === 'offeringIcon') sec.items[idx].icon = newText;
        if (field === 'offeringBadge') sec.items[idx].badge = newText;
      }
    } else if (itemIndex !== null && sec.photos) {
      const idx = parseInt(itemIndex, 10);
      if (sec.photos[idx]) {
        if (field === 'galleryTitle') sec.photos[idx].title = newText;
        if (field === 'galleryTag') sec.photos[idx].tag = newText;
      }
    } else if (itemIndex !== null && sec.reviews) {
      const idx = parseInt(itemIndex, 10);
      if (sec.reviews[idx]) {
        if (field === 'reviewText') sec.reviews[idx].text = newText;
        if (field === 'reviewAuthor') sec.reviews[idx].author = newText;
      }
    } else {
      if (field === 'brandName') {
        this.state.currentSchema.brandName = newText;
        const nameInput = document.getElementById('project-name-input');
        if (nameInput) nameInput.value = newText;
      } else if (field === 'headline') {
        sec.headline = newText;
      } else if (field === 'subtitle') {
        sec.subtitle = newText;
      } else if (field === 'heading') {
        sec.heading = newText;
      } else if (field === 'description') {
        sec.description = newText;
      } else if (field === 'heroTitle' && sec.heroPhoto) {
        sec.heroPhoto.title = newText;
      } else if (field === 'heroBadge' && sec.heroPhoto) {
        sec.heroPhoto.badge = newText;
      } else if (field === 'infoHours' && sec.status) {
        sec.status.hours = newText;
      } else if (field === 'infoAddress' && sec.status) {
        sec.status.address = newText;
      } else if (field === 'infoPhone' && sec.status) {
        sec.status.phone = newText;
      }
    }

    this.showToast('✨ Saved edit in real time!', 'success');
  },

  /**
   * Connect to Python backend REST endpoints
   */
  async fetchBackendData() {
    try {
      const resLikes = await fetch('/api/likes');
      if (resLikes.ok) {
        const data = await resLikes.json();
        if (data && typeof data.likes === 'number') {
          this.state.likesCount = data.likes;
          this.updateLikesDisplay(data.likes);
        }
      }

      const resStatus = await fetch('/api/status');
      if (resStatus.ok) {
        const status = await resStatus.json();
        const heroStatusEl = document.getElementById('hero-live-status');
        if (heroStatusEl && status.message) {
          heroStatusEl.innerText = `🟢 ${status.message.toUpperCase()} • ${status.hoursToday || '7 AM - 9 PM'}`;
        }
      }
    } catch (e) {
      console.log('Local offline mode active:', e);
    }
  },

  /**
   * Handle Like button with live backend POST /api/like
   */
  async handleLike() {
    this.state.likesCount++;
    this.updateLikesDisplay(this.state.likesCount);

    const btn = document.getElementById('nav-like-btn');
    if (btn) {
      btn.classList.add('liked');
      setTimeout(() => btn.classList.remove('liked'), 400);
    }

    this.showToast('❤️ Thank you for the love!', 'success');

    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.likes) {
          this.state.likesCount = data.likes;
          this.updateLikesDisplay(data.likes);
        }
      }
    } catch (e) {
      console.log('Local like updated:', this.state.likesCount);
    }
  },

  handleLikeItem(itemName) {
    this.showToast(`❤️ You loved: ${itemName}!`, 'success');
  },

  updateLikesDisplay(count) {
    const navVal = document.getElementById('like-counter-val');
    if (navVal) navVal.innerText = count;

    document.querySelectorAll('.footer-like-val').forEach(el => {
      el.innerText = count;
    });
  },

  /**
   * Audio Speech Narration (For Non-Readers)
   */
  speak(text) {
    if (!('speechSynthesis' in window)) {
      this.showToast('Speech narration is not supported in this browser.', 'info');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      this.state.isSpeaking = true;
      this.showToast('🔊 Reading aloud in real time...', 'info');
    };

    utterance.onend = () => { this.state.isSpeaking = false; };
    utterance.onerror = () => { this.state.isSpeaking = false; };

    window.speechSynthesis.speak(utterance);
  },

  /**
   * Main Website Generation Flow for ANY shop description
   */
  generateWebsite(prompt) {
    this.state.isGenerating = true;
    const overlay = document.getElementById('ai-loading-overlay');
    overlay?.classList.add('active');

    const steps = [
      document.getElementById('step-1'),
      document.getElementById('step-2'),
      document.getElementById('step-3'),
      document.getElementById('step-4'),
      document.getElementById('step-5')
    ];

    steps.forEach(s => { if (s) s.className = 'step-indicator-row'; });

    let currentStep = 0;
    const advanceStep = () => {
      if (currentStep > 0 && steps[currentStep - 1]) {
        steps[currentStep - 1].className = 'step-indicator-row done';
      }
      if (currentStep < steps.length && steps[currentStep]) {
        steps[currentStep].className = 'step-indicator-row active';
      }
      currentStep++;
    };

    advanceStep();
    setTimeout(() => advanceStep(), 250);
    setTimeout(() => advanceStep(), 550);
    setTimeout(() => advanceStep(), 850);
    setTimeout(() => advanceStep(), 1150);

    setTimeout(() => {
      // Synthesize unique schema tailored specifically to this shop description
      const schema = AIEngine.synthesizeWebsite(prompt);
      this.state.currentSchema = schema;
      this.pushHistory(schema);

      overlay?.classList.remove('active');
      this.state.isGenerating = false;

      this.openStudioView();
      this.showToast(`✨ Generated web platform for "${schema.brandName}"!`, 'success');
    }, 1400);
  },

  openStudioView() {
    document.getElementById('landing-view')?.style.setProperty('display', 'none');
    const studio = document.getElementById('studio-view');
    studio?.classList.add('active');

    const nameInput = document.getElementById('project-name-input');
    if (nameInput && this.state.currentSchema) {
      nameInput.value = this.state.currentSchema.brandName;
    }

    const urlBar = document.getElementById('browser-url-text');
    if (urlBar && this.state.currentSchema) {
      urlBar.innerText = `https://webmind.ai/preview/${this.state.currentSchema.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    }

    this.renderCanvas();
    this.renderSectionsList();
    this.renderPaletteOptions();
    this.fetchBackendData();

    // Reset Chat
    const chatArea = document.getElementById('chat-messages-area');
    if (chatArea && this.state.currentSchema) {
      chatArea.innerHTML = `
        <div class="chat-bubble chat-bubble-agent">
          <div class="agent-badge-inline">⚡ WebMind Copilot</div>
          I have crafted a bespoke web platform for <strong>${this.state.currentSchema.brandName}</strong> with topic-specific photography, deep real-time editing, and audio speech narration!
          <br><br>
          <strong>Deep Editing Features:</strong>
          <br>• Click any text directly in the preview to edit in real time
          <br>• Hover over any section to use <strong>"✏️ Edit Section"</strong> or <strong>"📷 Swap Photo"</strong>
          <br>• Click <strong>"🔊 Listen"</strong> on any item to hear it read aloud
        </div>
      `;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  returnToLanding() {
    document.getElementById('studio-view')?.classList.remove('active');
    document.getElementById('landing-view')?.style.setProperty('display', 'block');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderCanvas() {
    const canvas = document.getElementById('canvas-viewport');
    if (!canvas || !this.state.currentSchema) return;

    canvas.innerHTML = Templates.renderWebsite(this.state.currentSchema, true);
    this.updateLikesDisplay(this.state.likesCount);
  },

  filterGallery(category, buttonEl) {
    document.querySelectorAll('.gen-filter-btn').forEach(b => b.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    const cards = document.querySelectorAll('.gen-photo-card');
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'All' || cardCat === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    this.showToast(`Showing ${category} photos`, 'info');
  },

  /**
   * Deep Section Content Editor Modal
   */
  setupSectionEditorModal() {
    if (!document.getElementById('modal-section-editor')) {
      const modal = document.createElement('div');
      modal.id = 'modal-section-editor';
      modal.className = 'modal-backdrop';
      modal.innerHTML = `
        <div class="modal-card modal-card-lg glass-panel-elevated">
          <div class="modal-header">
            <div>
              <h3 class="modal-title" id="sec-editor-title">✏️ Edit Section Details</h3>
              <p style="font-size:0.82rem; color:#94a3b8;">Modify text, headlines, and details in real time.</p>
            </div>
            <button class="modal-close-btn" onclick="App.closeModal('modal-section-editor')">✕</button>
          </div>
          <div id="sec-editor-fields" class="section-edit-modal-body">
            <!-- Dynamically populated -->
          </div>
          <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:16px;">
            <button class="btn btn-glass" onclick="App.closeModal('modal-section-editor')">Cancel</button>
            <button class="btn btn-primary" onclick="App.saveSectionEditor()">Save Changes ✨</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  },

  openSectionEditor(sectionId) {
    if (!this.state.currentSchema) return;
    const sec = this.state.currentSchema.sections.find(s => s.id === sectionId);
    if (!sec) return;

    this.state.editingSectionId = sectionId;
    const container = document.getElementById('sec-editor-fields');
    const titleEl = document.getElementById('sec-editor-title');
    if (titleEl) titleEl.innerText = `✏️ Edit: ${sec.title}`;

    if (!container) return;

    let html = '';

    if (sec.type === 'hero') {
      html += `
        <div class="form-group">
          <label class="form-label">Headline</label>
          <input type="text" id="edit-hero-headline" class="form-input" value="${sec.headline || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Subtitle Description</label>
          <textarea id="edit-hero-subtitle" class="form-textarea" rows="3">${sec.subtitle || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Hero Badge Text</label>
          <input type="text" id="edit-hero-badge" class="form-input" value="${sec.heroPhoto?.badge || ''}">
        </div>
      `;
    } else if (sec.type === 'offerings') {
      html += `
        <div class="form-group">
          <label class="form-label">Section Heading</label>
          <input type="text" id="edit-off-heading" class="form-input" value="${sec.heading || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Section Description</label>
          <textarea id="edit-off-desc" class="form-textarea" rows="2">${sec.description || ''}</textarea>
        </div>
        <label class="form-label" style="margin-top:10px;">Edit Offerings Items</label>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${(sec.items || []).map((item, i) => `
            <div class="edit-offering-row">
              <input type="text" id="edit-item-icon-${i}" class="form-input" style="text-align:center; padding:6px;" value="${item.icon || '✨'}">
              <input type="text" id="edit-item-title-${i}" class="form-input" value="${item.title || ''}">
              <input type="text" id="edit-item-desc-${i}" class="form-input" value="${item.desc || ''}">
              <button class="btn btn-glass btn-sm" onclick="App.openPhotoSwapper('offering-${i}', '${sec.id}', ${i})">📷</button>
            </div>
          `).join('')}
        </div>
      `;
    } else if (sec.type === 'info') {
      html += `
        <div class="form-group">
          <label class="form-label">Business Hours</label>
          <input type="text" id="edit-info-hours" class="form-input" value="${sec.status?.hours || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Physical Address</label>
          <input type="text" id="edit-info-address" class="form-input" value="${sec.status?.address || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Phone</label>
          <input type="text" id="edit-info-phone" class="form-input" value="${sec.status?.phone || ''}">
        </div>
      `;
    } else if (sec.type === 'gallery') {
      html += `
        <div class="form-group">
          <label class="form-label">Gallery Heading</label>
          <input type="text" id="edit-gal-heading" class="form-input" value="${sec.heading || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Gallery Description</label>
          <textarea id="edit-gal-desc" class="form-textarea" rows="2">${sec.description || ''}</textarea>
        </div>
      `;
    } else {
      html += `
        <div class="form-group">
          <label class="form-label">Section Title</label>
          <input type="text" id="edit-gen-title" class="form-input" value="${sec.title || ''}">
        </div>
      `;
    }

    container.innerHTML = html;
    this.openModal('modal-section-editor');
  },

  saveSectionEditor() {
    if (!this.state.currentSchema || !this.state.editingSectionId) return;
    const sec = this.state.currentSchema.sections.find(s => s.id === this.state.editingSectionId);
    if (!sec) return;

    if (sec.type === 'hero') {
      const h = document.getElementById('edit-hero-headline');
      const sub = document.getElementById('edit-hero-subtitle');
      const b = document.getElementById('edit-hero-badge');
      if (h) sec.headline = h.value.trim();
      if (sub) sec.subtitle = sub.value.trim();
      if (b && sec.heroPhoto) sec.heroPhoto.badge = b.value.trim();
    } else if (sec.type === 'offerings') {
      const head = document.getElementById('edit-off-heading');
      const desc = document.getElementById('edit-off-desc');
      if (head) sec.heading = head.value.trim();
      if (desc) sec.description = desc.value.trim();

      (sec.items || []).forEach((item, i) => {
        const ic = document.getElementById(`edit-item-icon-${i}`);
        const t = document.getElementById(`edit-item-title-${i}`);
        const d = document.getElementById(`edit-item-desc-${i}`);
        if (ic) item.icon = ic.value.trim();
        if (t) item.title = t.value.trim();
        if (d) item.desc = d.value.trim();
      });
    } else if (sec.type === 'info') {
      const hrs = document.getElementById('edit-info-hours');
      const addr = document.getElementById('edit-info-address');
      const ph = document.getElementById('edit-info-phone');
      if (!sec.status) sec.status = {};
      if (hrs) sec.status.hours = hrs.value.trim();
      if (addr) sec.status.address = addr.value.trim();
      if (ph) sec.status.phone = ph.value.trim();
    } else if (sec.type === 'gallery') {
      const head = document.getElementById('edit-gal-heading');
      const desc = document.getElementById('edit-gal-desc');
      if (head) sec.heading = head.value.trim();
      if (desc) sec.description = desc.value.trim();
    }

    this.renderCanvas();
    this.closeModal('modal-section-editor');
    this.showToast('Section details saved in real time!', 'success');
  },

  /**
   * Photo Swapper Modal
   */
  setupPhotoSwapperModal() {
    if (!document.getElementById('modal-photo-swapper')) {
      const modal = document.createElement('div');
      modal.id = 'modal-photo-swapper';
      modal.className = 'modal-backdrop';
      modal.innerHTML = `
        <div class="modal-card modal-card-lg glass-panel-elevated">
          <div class="modal-header">
            <div>
              <h3 class="modal-title">📷 Change Photo</h3>
              <p style="font-size:0.82rem; color:#94a3b8;">Select a high-resolution photo from the library or paste a custom URL.</p>
            </div>
            <button class="modal-close-btn" onclick="App.closeModal('modal-photo-swapper')">✕</button>
          </div>
          <div class="photo-choice-grid" id="photo-choice-grid"></div>
          
          <div class="form-group" style="margin-top:14px;">
            <label class="form-label">Or Custom Image URL</label>
            <div style="display:flex; gap:8px;">
              <input type="url" id="custom-photo-url-input" class="form-input" placeholder="https://images.unsplash.com/...">
              <button class="btn btn-primary" onclick="App.applyCustomPhotoUrl()">Apply</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  },

  openPhotoSwapper(targetType, sectionId, itemIndex = null) {
    this.state.swappingPhotoTarget = { targetType, sectionId, itemIndex };

    const grid = document.getElementById('photo-choice-grid');
    if (grid) {
      grid.innerHTML = this.photoLibrary.map(item => `
        <div class="photo-choice-item" onclick="App.selectSwappedPhoto('${item.url}')" title="${item.label}">
          <img src="${item.url}" alt="${item.label}">
        </div>
      `).join('');
    }

    this.openModal('modal-photo-swapper');
  },

  selectSwappedPhoto(url) {
    this.applyNewPhoto(url);
  },

  applyCustomPhotoUrl() {
    const input = document.getElementById('custom-photo-url-input');
    const url = input?.value?.trim();
    if (url) {
      this.applyNewPhoto(url);
      input.value = '';
    } else {
      this.showToast('Please enter an image URL.', 'info');
    }
  },

  applyNewPhoto(url) {
    const target = this.state.swappingPhotoTarget;
    if (!target || !this.state.currentSchema) return;

    const sec = this.state.currentSchema.sections.find(s => s.id === target.sectionId);
    if (!sec) return;

    if (target.targetType === 'hero' && sec.heroPhoto) {
      sec.heroPhoto.url = url;
    } else if (target.targetType.startsWith('offering-') && sec.items && target.itemIndex !== null) {
      if (sec.items[target.itemIndex]) {
        sec.items[target.itemIndex].photo = url;
      }
    } else if (target.targetType.startsWith('gallery-') && sec.photos && target.itemIndex !== null) {
      if (sec.photos[target.itemIndex]) {
        sec.photos[target.itemIndex].url = url;
      }
    }

    this.renderCanvas();
    this.closeModal('modal-photo-swapper');
    this.showToast('📷 Photo updated in real time!', 'success');
  },

  /**
   * Lightbox Modal
   */
  setupLightbox() {
    if (!document.getElementById('lightbox-modal')) {
      const modal = document.createElement('div');
      modal.id = 'lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close-btn" onclick="App.closeLightbox()">✕</button>
          <img id="lightbox-img" class="lightbox-img" src="" alt="High resolution photo">
          <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>
      `;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) App.closeLightbox();
      });
      document.body.appendChild(modal);
    }
  },

  openLightbox(url, title) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (modal && img && cap) {
      img.src = url;
      cap.innerText = title || 'High Quality Photo';
      modal.classList.add('active');
    }
  },

  closeLightbox() {
    document.getElementById('lightbox-modal')?.classList.remove('active');
  },

  /**
   * Call & Map Modals
   */
  setupModals() {
    if (!document.getElementById('modal-call-direct')) {
      const callModal = document.createElement('div');
      callModal.id = 'modal-call-direct';
      callModal.className = 'modal-backdrop';
      callModal.innerHTML = `
        <div class="modal-card glass-panel-elevated" style="text-align:center;">
          <div class="modal-header">
            <h3 class="modal-title">📞 Connect Directly</h3>
            <button class="modal-close-btn" onclick="App.closeModal('modal-call-direct')">✕</button>
          </div>
          <div style="font-size:3rem; margin-bottom:12px;">📞 ✨</div>
          <h2 style="font-size:1.6rem; color:#10b981; margin-bottom:8px;">(555) 019-2834</h2>
          <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:24px;">Direct line to our counter. Ask questions, request bespoke creations, or check current space availability.</p>
          
          <div style="display:flex; flex-direction:column; gap:10px;">
            <a href="tel:5550192834" class="btn btn-primary btn-lg" style="text-decoration:none; background:#10b981;">
              📞 Tap to Call (555) 019-2834
            </a>
            <button class="btn btn-glass" onclick="App.requestCallback()">
              📝 Request a Callback (Backend Sync)
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(callModal);
    }

    if (!document.getElementById('modal-map-direct')) {
      const mapModal = document.createElement('div');
      mapModal.id = 'modal-map-direct';
      mapModal.className = 'modal-backdrop';
      mapModal.innerHTML = `
        <div class="modal-card glass-panel-elevated" style="text-align:center;">
          <div class="modal-header">
            <h3 class="modal-title">📍 How to Find Us</h3>
            <button class="modal-close-btn" onclick="App.closeModal('modal-map-direct')">✕</button>
          </div>
          <div style="border-radius:16px; overflow:hidden; background:#1c170d; border:1px solid rgba(255,255,255,0.1); padding:20px; margin-bottom:20px;">
            <div style="font-size:3rem; margin-bottom:10px;">🗺️ 📍 ✨</div>
            <h3 style="font-size:1.3rem; color:#ffffff; margin-bottom:6px;">742 Evergreen Terrace</h3>
            <p style="color:#d4cfb8; font-size:0.92rem;">Downtown District • Central Park Promenade</p>
            <div style="margin-top:14px; font-size:0.85rem; color:#10b981; font-weight:700;">
              🟢 Open Today • Free Parking & Wheelchair Accessible
            </div>
          </div>
          <div style="display:flex; gap:12px; justify-content:center;">
            <button class="btn btn-primary" onclick="App.closeModal('modal-map-direct'); App.showToast('📍 Routing navigation started!', 'success');">
              🧭 Start Navigation
            </button>
            <button class="btn btn-glass" onclick="App.closeModal('modal-map-direct')">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(mapModal);
    }
  },

  openCallModal() {
    // Dynamically update the call modal with the current schema's phone number
    const schema = this.state.currentSchema;
    const infoSec = schema?.sections?.find(s => s.type === 'info' || s.type === 'hero');
    const phone = infoSec?.status?.phone || '(555) 019-2834';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const brandName = schema?.brandName || 'Our Shop';
    const modal = document.getElementById('modal-call-direct');
    if (modal) {
      modal.querySelector('h2').innerText = phone;
      const callLink = modal.querySelector('a[href^="tel:"]');
      if (callLink) { callLink.href = `tel:${cleanPhone}`; callLink.innerHTML = `📞 Tap to Call ${phone}`; }
      const desc = modal.querySelector('p');
      if (desc) desc.innerText = `Direct line to ${brandName}. Ask questions, request bespoke creations, or check current space availability.`;
    }
    this.openModal('modal-call-direct');
  },

  openMapModal() {
    // Dynamically update the map modal with the current schema's address
    const schema = this.state.currentSchema;
    const infoSec = schema?.sections?.find(s => s.type === 'info' || s.type === 'hero');
    const address = infoSec?.status?.address || '742 Evergreen Terrace, Downtown District';
    const hours = infoSec?.status?.hours || 'Open Today • 9 AM - 8 PM';
    const brandName = schema?.brandName || 'Our Shop';
    const modal = document.getElementById('modal-map-direct');
    if (modal) {
      const addrEl = modal.querySelector('h3');
      if (addrEl) addrEl.innerText = address.split(',')[0] || address;
      const distEl = modal.querySelector('p');
      if (distEl) distEl.innerText = address.split(',').slice(1).join(',').trim() || 'Downtown District';
      // Update hours: target last div inside the info card
      const cardDiv = modal.querySelector('.modal-card > div');
      if (cardDiv) {
        const allDivs = cardDiv.querySelectorAll('div');
        const hoursEl = allDivs[allDivs.length - 1];
        if (hoursEl) hoursEl.innerText = `🟢 ${hours} • Free Parking & Wheelchair Accessible`;
      }
      const title = modal.querySelector('.modal-title');
      if (title) title.innerText = `📍 Find ${brandName}`;
    }
    this.openModal('modal-map-direct');
  },

  async requestCallback() {
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Guest Caller',
          phone: '(555) 019-2834',
          note: 'Customer callback request from web platform',
          type: 'callback'
        })
      });
      if (res.ok) {
        this.closeModal('modal-call-direct');
        this.showToast('✅ Callback request saved to backend! We will ring you shortly.', 'success');
      }
    } catch (e) {
      this.closeModal('modal-call-direct');
      this.showToast('✅ Callback noted!', 'success');
    }
  },

  /**
   * Booking Confirmation Modal Setup
   */
  setupBookingConfirmModal() {
    if (document.getElementById('modal-booking-confirm')) return;

    const modal = document.createElement('div');
    modal.id = 'modal-booking-confirm';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card glass-panel-elevated" style="max-width:520px; text-align:center; padding:40px 32px;">
        <!-- Success Animation Ring -->
        <div class="booking-confirm-ring" id="booking-confirm-ring">
          <div class="booking-confirm-checkmark">✅</div>
        </div>

        <h2 class="booking-confirm-title" id="booking-confirm-title">Booking Confirmed!</h2>
        <p class="booking-confirm-subtitle" id="booking-confirm-subtitle">Your request has been received and confirmed.</p>

        <!-- Booking ID Badge -->
        <div class="booking-confirm-id-badge" id="booking-confirm-id-badge">
          <span style="font-size:0.8rem; color:#94a3b8; display:block; margin-bottom:4px;">Your Booking ID</span>
          <span id="booking-confirm-id" style="font-size:1.6rem; font-weight:900; letter-spacing:2px; color:#10b981;">BK-0000</span>
        </div>

        <!-- Booking Summary -->
        <div class="booking-confirm-summary" id="booking-confirm-summary">
          <!-- populated dynamically -->
        </div>

        <p style="font-size:0.85rem; color:#94a3b8; margin: 16px 0 0; line-height:1.6;">
          A confirmation will be shared via your contact details. Screenshot this screen or note your Booking ID for reference.
        </p>

        <div style="display:flex; gap:12px; margin-top:24px; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="App.closeModal('modal-booking-confirm'); App.showToast('See you soon! 🎉', 'success');">
            🎉 Done, See You Soon!
          </button>
          <button class="btn btn-glass" onclick="App.openCallModal()">📞 Call Us</button>
        </div>
      </div>
    `;

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal('modal-booking-confirm');
    });

    document.body.appendChild(modal);
  },

  /**
   * Handle Booking Form Submission — Full Frontend + Backend Integration
   */
  async handleBookingSubmit() {
    const guestName   = document.getElementById('booking-guest-name')?.value?.trim();
    const contact     = document.getElementById('booking-contact')?.value?.trim();
    const date        = document.getElementById('booking-date')?.value;
    const time        = document.getElementById('booking-time')?.value;
    const partySize   = document.getElementById('booking-party-size')?.value;
    const serviceType = document.getElementById('booking-service-type')?.value || 'Table Reservation';
    const specialReq  = document.getElementById('booking-special-requests')?.value?.trim() || 'None';
    const shopName    = this.state.currentSchema?.brandName || 'WebMind Shop';

    if (!guestName || !contact || !date || !time) {
      this.showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Animate the submit button to loading state
    const submitBtn = document.getElementById('booking-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="booking-btn-spinner"></span> <span>Confirming...</span>`;
      submitBtn.style.opacity = '0.8';
    }

    const payload = { shopName, guestName, contact, date, time, partySize, serviceType, specialRequests: specialReq };

    let bookingId = 'BK-' + Date.now().toString().slice(-6);
    let success = false;

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.bookingId) bookingId = data.bookingId;
        success = true;
      }
    } catch (err) {
      // Offline/fallback — still show confirmation with a local ID
      console.log('Booking saved locally (server offline):', err);
      success = true;
    }

    // Restore submit button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="gen-booking-submit-icon">✅</span><span class="gen-booking-submit-text">Confirm Your Request</span><span class="gen-booking-submit-arrow">→</span>`;
      submitBtn.style.opacity = '1';
    }

    if (success) {
      // Populate and open confirmation modal
      const idEl = document.getElementById('booking-confirm-id');
      if (idEl) idEl.textContent = bookingId;

      const titleEl = document.getElementById('booking-confirm-title');
      if (titleEl) titleEl.textContent = `Request Confirmed! 🎉`;

      const subtitleEl = document.getElementById('booking-confirm-subtitle');
      if (subtitleEl) subtitleEl.textContent = `Thank you, ${guestName}! Your slot at ${shopName} is reserved.`;

      const summaryEl = document.getElementById('booking-confirm-summary');
      if (summaryEl) {
        summaryEl.innerHTML = `
          <div class="booking-confirm-row"><span>📅 Date</span><strong>${new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</strong></div>
          <div class="booking-confirm-row"><span>🕐 Time</span><strong>${time}</strong></div>
          <div class="booking-confirm-row"><span>👥 Guests</span><strong>${partySize}</strong></div>
          <div class="booking-confirm-row"><span>✨ Service</span><strong>${serviceType}</strong></div>
          ${specialReq !== 'None' ? `<div class="booking-confirm-row"><span>💬 Notes</span><strong>${specialReq}</strong></div>` : ''}
        `;
      }

      // Reset the form
      document.getElementById('booking-form')?.reset();

      this.openModal('modal-booking-confirm');
      this.showToast(`✅ Booking ${bookingId} confirmed!`, 'success');
    } else {
      this.showToast('Something went wrong. Please try again or call us directly.', 'error');
    }
  },



  handleSendChatMessage(msg) {
    const chatArea = document.getElementById('chat-messages-area');
    if (!chatArea || !this.state.currentSchema) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble chat-bubble-user';
    userBubble.innerText = msg;
    chatArea.appendChild(userBubble);
    chatArea.scrollTop = chatArea.scrollHeight;

    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble chat-bubble-agent';
    typingBubble.innerHTML = `<span style="color:#38bdf8;">✦ Synthesizing...</span>`;
    chatArea.appendChild(typingBubble);
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
      const { schema, reply } = AIEngine.processChatCommand(msg, this.state.currentSchema);
      this.state.currentSchema = schema;
      this.pushHistory(schema);
      this.renderCanvas();
      this.renderSectionsList();
      this.renderPaletteOptions();

      typingBubble.innerHTML = `
        <div class="agent-badge-inline">⚡ WebMind Copilot</div>
        ${reply}
      `;
      chatArea.scrollTop = chatArea.scrollHeight;
      this.showToast('Layout updated!', 'success');
    }, 450);
  },

  triggerRegenerateSection(secId) {
    if (!this.state.currentSchema) return;
    const secIndex = this.state.currentSchema.sections.findIndex(s => s.id === secId);
    if (secIndex === -1) return;

    const sec = this.state.currentSchema.sections[secIndex];
    const updatedSec = AIEngine.regenerateSectionData(sec, this.state.currentSchema);
    this.state.currentSchema.sections[secIndex] = updatedSec;
    
    this.pushHistory(this.state.currentSchema);
    this.renderCanvas();
    this.showToast(`✨ Refreshed "${sec.title}" section!`, 'success');
  },

  moveSection(index, direction) {
    if (!this.state.currentSchema) return;
    const sections = this.state.currentSchema.sections;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;

    this.pushHistory(this.state.currentSchema);
    this.renderCanvas();
    this.renderSectionsList();
    this.showToast('Section order re-arranged!', 'info');
  },

  deleteSection(secId) {
    if (!this.state.currentSchema) return;
    if (this.state.currentSchema.sections.length <= 2) {
      this.showToast('You need at least 2 sections remaining.', 'info');
      return;
    }
    this.state.currentSchema.sections = this.state.currentSchema.sections.filter(s => s.id !== secId);
    this.pushHistory(this.state.currentSchema);
    this.renderCanvas();
    this.renderSectionsList();
    this.showToast('Section removed!', 'info');
  },

  renderSectionsList() {
    const listContainer = document.getElementById('sidebar-sections-list');
    if (!listContainer || !this.state.currentSchema) return;

    listContainer.innerHTML = this.state.currentSchema.sections.map((sec, idx) => `
      <div class="section-item-card">
        <div class="section-item-info">
          <span>${sec.type === 'hero' ? '⚡' : sec.type === 'gallery' ? '📸' : sec.type === 'offerings' ? '✨' : sec.type === 'info' ? '🕒' : sec.type === 'booking' ? '📅' : sec.type === 'contact' ? '💬' : '📄'}</span>
          <span>${sec.title}</span>
        </div>
        <div class="section-item-actions">
          <button class="item-btn" onclick="App.openSectionEditor('${sec.id}')" title="Edit Content">✏️</button>
          <button class="item-btn" onclick="App.moveSection(${idx}, -1)" title="Move Up">▲</button>
          <button class="item-btn" onclick="App.moveSection(${idx}, 1)" title="Move Down">▼</button>
          <button class="item-btn btn-delete" onclick="App.deleteSection('${sec.id}')" title="Delete">✕</button>
        </div>
      </div>
    `).join('');
  },

  renderPaletteOptions() {
    const container = document.getElementById('sidebar-palettes-grid');
    if (!container || !this.state.currentSchema) return;

    container.innerHTML = Object.values(AIEngine.themes).map(theme => `
      <div class="palette-swatch-card ${this.state.currentSchema.themeId === theme.id ? 'active' : ''}" 
           onclick="App.switchTheme('${theme.id}')">
        <div class="swatch-circles">
          <div class="color-dot" style="background:${theme.primary};"></div>
          <div class="color-dot" style="background:${theme.secondary};"></div>
          <div class="color-dot" style="background:${theme.surface};"></div>
        </div>
        <div class="swatch-name">${theme.name}</div>
      </div>
    `).join('');
  },

  switchTheme(themeId) {
    if (!this.state.currentSchema) return;
    this.state.currentSchema.themeId = themeId;
    this.pushHistory(this.state.currentSchema);
    this.renderCanvas();
    this.renderPaletteOptions();
    this.showToast(`Applied ${AIEngine.themes[themeId]?.name || themeId} theme!`, 'success');
  },

  switchViewMode(mode) {
    this.state.activeViewMode = mode;
    const wrapper = document.getElementById('device-frame-wrapper');
    if (!wrapper) return;

    wrapper.classList.remove('view-desktop', 'view-tablet', 'view-mobile');
    wrapper.classList.add(`view-${mode}`);

    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-view-${mode}`)?.classList.add('active');
  },

  switchSidebarTab(tabName) {
    this.state.activeTab = tabName;
    document.querySelectorAll('.sidebar-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sidebar-tab-content').forEach(c => c.classList.remove('active'));

    document.getElementById(`tab-btn-${tabName}`)?.classList.add('active');
    document.getElementById(`tab-content-${tabName}`)?.classList.add('active');
  },

  pushHistory(schema) {
    if (!schema) return;
    this.state.history.push(JSON.parse(JSON.stringify(schema)));
    this.state.historyIndex = this.state.history.length - 1;
  },

  undo() {
    if (this.state.historyIndex > 0) {
      this.state.historyIndex--;
      this.state.currentSchema = JSON.parse(JSON.stringify(this.state.history[this.state.historyIndex]));
      this.renderCanvas();
      this.renderSectionsList();
      this.renderPaletteOptions();
      this.showToast('Undone previous change.', 'info');
    }
  },

  redo() {
    if (this.state.historyIndex < this.state.history.length - 1) {
      this.state.historyIndex++;
      this.state.currentSchema = JSON.parse(JSON.stringify(this.state.history[this.state.historyIndex]));
      this.renderCanvas();
      this.renderSectionsList();
      this.renderPaletteOptions();
      this.showToast('Redone change.', 'info');
    }
  },

  openExportModal() {
    if (!this.state.currentSchema) return;
    const html = Templates.exportToStandaloneHTML(this.state.currentSchema);
    const codeArea = document.getElementById('export-code-preview');
    if (codeArea) codeArea.value = html;
    this.openModal('modal-export');
  },

  downloadExportHTML() {
    if (!this.state.currentSchema) return;
    const html = Templates.exportToStandaloneHTML(this.state.currentSchema);
    const filename = `${this.state.currentSchema.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-website.html`;
    
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast(`Downloaded clean production file: ${filename}!`, 'success');
  },

  copyExportCode() {
    const codeArea = document.getElementById('export-code-preview');
    if (codeArea) {
      navigator.clipboard.writeText(codeArea.value).then(() => {
        this.showToast('Production HTML copied to clipboard!', 'success');
      });
    }
  },

  openShareModal() {
    if (!this.state.currentSchema) return;
    const jsonStr = JSON.stringify(this.state.currentSchema);
    const encoded = encodeURIComponent(jsonStr);
    const shareUrl = `${window.location.origin}${window.location.pathname}#site=${encoded}`;

    const input = document.getElementById('share-link-input');
    if (input) input.value = shareUrl;
    this.openModal('modal-share');
  },

  copyShareLink() {
    const input = document.getElementById('share-link-input');
    if (input) {
      navigator.clipboard.writeText(input.value).then(() => {
        this.showToast('Shareable link copied to clipboard!', 'success');
      });
    }
  },

  checkUrlForSharedState() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#site=')) {
      try {
        const encoded = hash.replace('#site=', '');
        const jsonStr = decodeURIComponent(encoded);
        const schema = JSON.parse(jsonStr);
        if (schema && schema.brandName && schema.sections) {
          this.state.currentSchema = schema;
          this.pushHistory(schema);
          setTimeout(() => {
            this.openStudioView();
            this.showToast(`Loaded shared project: ${schema.brandName}!`, 'success');
          }, 400);
        }
      } catch (e) {
        console.error('Failed to parse URL state:', e);
      }
    }
  },

  openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
  },

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
  },

  handleLoginSubmit(e) {
    e.preventDefault();
    this.closeModal('modal-login');
    this.showToast('Welcome back! Logged in.', 'success');
  },

  handleRegisterSubmit(e) {
    e.preventDefault();
    this.closeModal('modal-register');
    this.showToast('Account registered successfully!', 'success');
  },

  handleContactSubmit(e) {
    e.preventDefault();
    this.closeModal('modal-contact');
    this.showToast('Thank you! Your message has been sent.', 'success');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : '⚡';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
