/**
 * WebMind AI - Section Templates & HTML Compiler
 * Photo-Centric • Zero Pricing • Deeply Editable • Audio Narration for Non-Readers
 */

const Templates = {
  /**
   * Render complete website from schema
   */
  renderWebsite(schema, isEditable = true) {
    const theme = AIEngine.themes[schema.themeId] || AIEngine.themes['warm-amber'];

    const themeStyle = `
      --site-primary: ${theme.primary};
      --site-primary-hover: ${theme.primaryHover};
      --site-secondary: ${theme.secondary};
      --site-accent: ${theme.accent};
      --site-bg: ${theme.bg};
      --site-surface: ${theme.surface};
      --site-surface-alt: ${theme.surfaceAlt};
      --site-border: ${theme.border};
      --site-border-hover: ${theme.borderHover};
      --site-text: ${theme.text};
      --site-text-muted: ${theme.textMuted};
    `;

    const sectionsHTML = schema.sections.map((sec, index) => {
      const innerHTML = this.renderSection(sec, schema, isEditable);
      if (!isEditable) return innerHTML;

      // Wrap in deeply editable section wrapper with hover toolbar
      return `
        <div class="section-wrapper" data-section-id="${sec.id}" data-section-index="${index}">
          <div class="section-hover-toolbar">
            <span style="font-size:0.75rem; color:#94a3b8; font-weight:700; margin-right:4px;">${sec.title}</span>
            <button class="sec-tool-btn" onclick="App.openSectionEditor('${sec.id}')" title="Edit content & photos">✏️ Edit Section</button>
            <button class="sec-tool-btn" onclick="App.triggerRegenerateSection('${sec.id}')" title="AI Refresh Copy">✨ AI Refresh</button>
            <button class="sec-tool-btn" onclick="App.moveSection(${index}, -1)" title="Move Up">⬆️</button>
            <button class="sec-tool-btn" onclick="App.moveSection(${index}, 1)" title="Move Down">⬇️</button>
            <button class="sec-tool-btn btn-delete-sec" onclick="App.deleteSection('${sec.id}')" title="Remove Section">🗑️</button>
          </div>
          ${innerHTML}
        </div>
      `;
    }).join('\n');

    return `
      <div class="generated-site-root" style="${themeStyle}">
        ${sectionsHTML}
      </div>
    `;
  },

  renderSection(sec, schema, isEditable) {
    const editAttr = isEditable ? 'contenteditable="true"' : '';

    switch (sec.type) {
      case 'navigation':
        return `
          <header class="gen-nav-wrapper" id="home">
            <div class="gen-container">
              <nav class="gen-nav">
                <a href="#home" class="gen-logo">
                  <div class="gen-logo-icon">✨</div>
                  <span ${editAttr} data-section-id="${sec.id}" data-field="brandName">${schema.brandName}</span>
                </a>

                <div class="gen-nav-actions">
                  <!-- Audio Speech Narration for Non-Readers -->
                  <button class="audio-narration-btn" onclick="App.speak('Welcome to ${schema.brandName}. Explore our fresh creations, high-quality photography, and warm welcoming atmosphere.')" title="Listen to intro">
                    <span>🔊</span> Listen
                  </button>

                  <!-- Live REST Backend Like Button -->
                  <button class="gen-btn gen-btn-like" id="nav-like-btn" onclick="App.handleLike()" title="Send Love to the Shop">
                    <span>❤️</span> <span id="like-counter-val">428</span>
                  </button>

                  <!-- Direct Functional Call Button -->
                  <button class="gen-btn gen-btn-call" onclick="App.openCallModal()" title="Call Now">
                    <span>📞</span> Call Us
                  </button>
                </div>
              </nav>
            </div>
          </header>
        `;

      case 'hero':
        return `
          <section class="gen-hero">
            <div class="gen-container">
              <div class="gen-hero-container">
                <div class="gen-hero-content">
                  <!-- Prominent Visual Open Status Beacon -->
                  <div class="gen-status-badge">
                    <span class="gen-status-beacon"></span>
                    <span id="hero-live-status">🟢 OPEN NOW • ${sec.status?.hours || '9 AM - 8 PM'}</span>
                  </div>

                  <h1 class="gen-hero-title">
                    <span ${editAttr} data-section-id="${sec.id}" data-field="headline">${sec.headline}</span>
                  </h1>

                  <p class="gen-hero-subtitle" ${editAttr} data-section-id="${sec.id}" data-field="subtitle">${sec.subtitle}</p>

                  <div class="gen-hero-actions">
                    <button class="gen-btn gen-btn-call" onclick="App.openCallModal()">
                      <span>📞</span> Call ${sec.status?.phone || '(555) 019-2834'}
                    </button>
                    <button class="gen-btn gen-btn-secondary" onclick="App.openMapModal()">
                      <span>📍</span> Directions
                    </button>
                    <button class="audio-narration-btn" onclick="App.speak('${sec.headline}. ${sec.subtitle}')" title="Listen to description">
                      <span>🔊</span> Read Aloud
                    </button>
                  </div>
                </div>

                <!-- Prominent High-Quality Hero Photo with Swap Action -->
                <div class="gen-hero-photo-showcase" style="position:relative;" onclick="App.openLightbox('${sec.heroPhoto?.url}', '${sec.heroPhoto?.title}')" title="Click to view full photo">
                  ${isEditable ? `<button class="sec-tool-btn" style="position:absolute; top:14px; right:14px; z-index:10; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px);" onclick="event.stopPropagation(); App.openPhotoSwapper('hero', '${sec.id}')">📷 Swap Photo</button>` : ''}
                  <img src="${sec.heroPhoto?.url}" alt="${sec.heroPhoto?.title}" class="gen-hero-photo-img" loading="eager">
                  <div class="gen-hero-photo-overlay">
                    <div class="gen-hero-photo-badge" ${editAttr} data-section-id="${sec.id}" data-field="heroBadge">${sec.heroPhoto?.badge || '✨ Handcrafted'}</div>
                    <div class="gen-hero-photo-title" ${editAttr} data-section-id="${sec.id}" data-field="heroTitle">${sec.heroPhoto?.title || schema.brandName}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        `;

      case 'gallery':
        return `
          <section class="gen-gallery-section" id="photos">
            <div class="gen-container">
              <div class="gen-section-header">
                <div class="gen-section-icon-badge">📸</div>
                <h2 class="gen-section-title" ${editAttr} data-section-id="${sec.id}" data-field="heading">${sec.heading}</h2>
                <p class="gen-section-subtitle" ${editAttr} data-section-id="${sec.id}" data-field="description">${sec.description}</p>
                <div style="margin-top:12px;">
                  <button class="audio-narration-btn" onclick="App.speak('${sec.heading}. ${sec.description}')">
                    <span>🔊</span> Listen to Gallery Intro
                  </button>
                </div>
              </div>

              <!-- Gallery Category Filter Tabs -->
              <div class="gen-filter-tabs">
                ${(sec.categories || ['All', 'Craft', 'Details', 'Space']).map((cat, i) => `
                  <button class="gen-filter-btn ${i === 0 ? 'active' : ''}" onclick="App.filterGallery('${cat}', this)">
                    📸 ${cat}
                  </button>
                `).join('')}
              </div>

              <!-- High-Resolution Photo Cards Grid -->
              <div class="gen-photos-grid" id="gen-photos-grid">
                ${(sec.photos || []).map((photo, i) => `
                  <div class="gen-photo-card" data-category="${photo.category}" onclick="App.openLightbox('${photo.url}', '${photo.title}')">
                    ${isEditable ? `<button class="sec-tool-btn" style="position:absolute; top:10px; right:10px; z-index:10; background:rgba(0,0,0,0.7);" onclick="event.stopPropagation(); App.openPhotoSwapper('gallery-${i}', '${sec.id}', ${i})">📷</button>` : ''}
                    <img src="${photo.url}" alt="${photo.title}" class="gen-photo-img" loading="lazy">
                    <div class="gen-photo-caption">
                      <div class="gen-photo-text">
                        <h4 ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="galleryTitle">${photo.title}</h4>
                        <span ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="galleryTag">${photo.tag}</span>
                      </div>
                      <div class="gen-photo-zoom-icon">🔍</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;

      case 'offerings':
        return `
          <section class="gen-gallery-section" id="offerings" style="background: rgba(255,255,255,0.02);">
            <div class="gen-container">
              <div class="gen-section-header">
                <div class="gen-section-icon-badge">✨</div>
                <h2 class="gen-section-title" ${editAttr} data-section-id="${sec.id}" data-field="heading">${sec.heading}</h2>
                <p class="gen-section-subtitle" ${editAttr} data-section-id="${sec.id}" data-field="description">${sec.description}</p>
              </div>

              <!-- Visual Photo Offerings (Deeply Editable, Zero Pricing) -->
              <div class="gen-offerings-grid">
                ${(sec.items || []).map((item, i) => `
                  <div class="gen-offering-card" style="position:relative;">
                    ${isEditable ? `<button class="sec-tool-btn" style="position:absolute; top:10px; right:10px; z-index:10; background:rgba(0,0,0,0.7); backdrop-filter:blur(6px);" onclick="event.stopPropagation(); App.openPhotoSwapper('offering-${i}', '${sec.id}', ${i})">📷 Swap Photo</button>` : ''}
                    <img src="${item.photo}" alt="${item.title}" class="gen-offering-thumb" onclick="App.openLightbox('${item.photo}', '${item.title}')">
                    <div class="gen-offering-body">
                      <div>
                        <div class="gen-offering-header">
                          <span class="gen-offering-icon" ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="offeringIcon">${item.icon}</span>
                          <span style="font-size:0.75rem; font-weight:700; color:#fde68a; background:rgba(217,119,6,0.2); padding:3px 8px; border-radius:9999px;" ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="offeringBadge">${item.badge}</span>
                        </div>
                        <h3 class="gen-offering-title" ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="offeringTitle">${item.title}</h3>
                        <p class="gen-offering-desc" ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="offeringDesc">${item.desc}</p>
                      </div>

                      <div class="gen-offering-footer">
                        <!-- Speech Narration for Non-Readers -->
                        <button class="audio-narration-btn" onclick="App.speak('${item.title}. ${item.desc}')" title="Listen to this item">
                          <span>🔊</span> Hear It
                        </button>
                        
                        <button class="gen-btn gen-btn-secondary" style="padding:6px 14px; font-size:0.8rem;" onclick="App.handleLikeItem('${item.title}')">
                          <span>❤️</span> Love
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;

      case 'info':
        return `
          <section class="gen-gallery-section" id="visit">
            <div class="gen-container">
              <div class="gen-info-card">
                <div class="gen-info-block">
                  <div class="gen-info-item">
                    <div class="gen-info-icon">🕒</div>
                    <div>
                      <h4>Operating Hours</h4>
                      <p style="color:#10b981; font-weight:700; font-size:1.05rem;" ${editAttr} data-section-id="${sec.id}" data-field="infoHours">🟢 ${sec.status?.hours || 'Open Today • 9:00 AM - 8:00 PM'}</p>
                      <p>Monday - Friday: 8:00 AM - 8:00 PM<br>Saturday - Sunday: 9:00 AM - 9:00 PM</p>
                    </div>
                  </div>

                  <div class="gen-info-item">
                    <div class="gen-info-icon">📍</div>
                    <div>
                      <h4>Our Location</h4>
                      <p style="font-size:1.05rem; color:#ffffff; font-weight:600;" ${editAttr} data-section-id="${sec.id}" data-field="infoAddress">${sec.status?.address || '742 Evergreen Terrace, Downtown District'}</p>
                      <p>Central District • Free Parking & Accessible Entrance</p>
                    </div>
                  </div>

                  <div class="gen-info-item">
                    <div class="gen-info-icon">📞</div>
                    <div>
                      <h4>Direct Contact</h4>
                      <p style="font-size:1.05rem; color:#10b981; font-weight:700;" ${editAttr} data-section-id="${sec.id}" data-field="infoPhone">${sec.status?.phone || '(555) 019-2834'}</p>
                      <p>Call for availability, bespoke inquiries, or quick orders</p>
                    </div>
                  </div>
                </div>

                <!-- Practical Action Callout Block -->
                <div style="display:flex; flex-direction:column; gap:16px; align-items:center; text-align:center; background:rgba(0,0,0,0.3); padding:30px; border-radius:20px; border:1px solid rgba(255,255,255,0.08);">
                  <div style="font-size:2.5rem;">✨ 📍 📞</div>
                  <h3 style="font-size:1.4rem; font-weight:800; color:#ffffff;">Drop By Any Time</h3>
                  <p style="font-size:0.9rem; color:#d4cfb8;">Walk-ins are warmly welcomed. Come say hello!</p>
                  
                  <div style="display:flex; gap:12px; width:100%; justify-content:center; flex-wrap:wrap;">
                    <button class="gen-btn gen-btn-call" style="flex:1;" onclick="App.openCallModal()">
                      <span>📞</span> Call Us
                    </button>
                    <button class="gen-btn gen-btn-primary" style="flex:1;" onclick="App.openMapModal()">
                      <span>📍</span> Directions
                    </button>
                  </div>
                  <button class="audio-narration-btn" onclick="App.speak('We are located at ${sec.status?.address || '742 Evergreen Terrace'}. Open daily. Call us at ${sec.status?.phone || '555-019-2834'}.')">
                    <span>🔊</span> Listen to Directions
                  </button>
                </div>
              </div>
            </div>
          </section>
        `;

      case 'reviews':
        return `
          <section class="gen-gallery-section" id="reviews">
            <div class="gen-container">
              <div class="gen-section-header">
                <div class="gen-section-icon-badge">❤️</div>
                <h2 class="gen-section-title" ${editAttr} data-section-id="${sec.id}" data-field="heading">${sec.heading}</h2>
                <p class="gen-section-subtitle">Real feedback from our happy community guests.</p>
              </div>

              <div class="gen-reviews-grid">
                ${(sec.reviews || []).map((r, i) => `
                  <div class="gen-review-card">
                    <div class="gen-review-stars">★★★★★</div>
                    <p class="gen-review-quote" ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="reviewText">"${r.text}"</p>
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                      <div class="gen-review-author">
                        <div class="gen-review-avatar">${r.author.charAt(0)}</div>
                        <h4 style="font-size:0.95rem; font-weight:700; color:#ffffff;" ${editAttr} data-section-id="${sec.id}" data-item-index="${i}" data-field="reviewAuthor">${r.author}</h4>
                      </div>
                      <button class="audio-narration-btn" style="padding:4px 10px; font-size:0.75rem;" onclick="App.speak('${r.author} says: ${r.text}')">
                        <span>🔊</span>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;

      case 'booking': {
        const todayDate = new Date().toISOString().split('T')[0];
        const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        return `
          <section class="gen-gallery-section gen-booking-section" id="booking">
            <div class="gen-container">
              <div class="gen-section-header">
                <div class="gen-section-icon-badge">📅</div>
                <h2 class="gen-section-title" ${editAttr} data-section-id="${sec.id}" data-field="heading">${sec.heading || 'Confirm Your Request'}</h2>
                <p class="gen-section-subtitle" ${editAttr} data-section-id="${sec.id}" data-field="description">${sec.description || 'Reserve your table or slot — instant confirmation.'}</p>
              </div>

              <div class="gen-booking-wrapper">
                <!-- Booking Form -->
                <form class="gen-booking-form" id="booking-form" onsubmit="event.preventDefault(); App.handleBookingSubmit();">
                  <div class="gen-booking-form-grid">
                    <!-- Guest Name -->
                    <div class="gen-booking-field">
                      <label class="gen-booking-label">
                        <span class="gen-booking-label-icon">👤</span> Full Name
                      </label>
                      <input type="text" id="booking-guest-name" class="gen-booking-input" placeholder="Enter your name" required>
                    </div>

                    <!-- Contact -->
                    <div class="gen-booking-field">
                      <label class="gen-booking-label">
                        <span class="gen-booking-label-icon">📱</span> Phone or Email
                      </label>
                      <input type="text" id="booking-contact" class="gen-booking-input" placeholder="Your phone or email" required>
                    </div>

                    <!-- Date -->
                    <div class="gen-booking-field">
                      <label class="gen-booking-label">
                        <span class="gen-booking-label-icon">📆</span> Preferred Date
                      </label>
                      <input type="date" id="booking-date" class="gen-booking-input" min="${todayDate}" max="${maxDate}" required>
                    </div>

                    <!-- Time Slot -->
                    <div class="gen-booking-field">
                      <label class="gen-booking-label">
                        <span class="gen-booking-label-icon">🕐</span> Time Slot
                      </label>
                      <select id="booking-time" class="gen-booking-input gen-booking-select" required>
                        <option value="" disabled selected>Choose a time</option>
                        ${(sec.timeSlots || ['12:00 PM', '1:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']).map(t => `
                          <option value="${t}">${t}</option>
                        `).join('')}
                      </select>
                    </div>

                    <!-- Party Size -->
                    <div class="gen-booking-field">
                      <label class="gen-booking-label">
                        <span class="gen-booking-label-icon">👥</span> Party Size
                      </label>
                      <select id="booking-party-size" class="gen-booking-input gen-booking-select" required>
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests" selected>2 Guests</option>
                        <option value="3 Guests">3 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="5 Guests">5 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="7-8 Guests">7-8 Guests</option>
                        <option value="9-12 Guests (Large Group)">9-12 Guests</option>
                        <option value="13+ Guests (Private Event)">13+ Guests (Private Event)</option>
                      </select>
                    </div>

                    <!-- Service Type -->
                    <div class="gen-booking-field">
                      <label class="gen-booking-label">
                        <span class="gen-booking-label-icon">✨</span> Service Type
                      </label>
                      <select id="booking-service-type" class="gen-booking-input gen-booking-select">
                        ${(sec.serviceTypes || ['Table Reservation', 'Private Event', 'Group Booking']).map(s => `
                          <option value="${s}">${s}</option>
                        `).join('')}
                      </select>
                    </div>
                  </div>

                  <!-- Special Requests -->
                  <div class="gen-booking-field gen-booking-full-width">
                    <label class="gen-booking-label">
                      <span class="gen-booking-label-icon">💬</span> Special Requests (Optional)
                    </label>
                    <textarea id="booking-special-requests" class="gen-booking-input gen-booking-textarea" rows="3" placeholder="Any dietary needs, celebrations, seating preferences..."></textarea>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="gen-booking-submit-btn" id="booking-submit-btn">
                    <span class="gen-booking-submit-icon">✅</span>
                    <span class="gen-booking-submit-text">Confirm Your Request</span>
                    <span class="gen-booking-submit-arrow">→</span>
                  </button>

                  <p class="gen-booking-disclaimer">
                    📞 Need help? Call us at <strong>${sec.phone || '(555) 019-2834'}</strong> • Instant confirmation • No charges
                  </p>
                </form>

                <!-- Booking Info Sidebar -->
                <div class="gen-booking-info-panel">
                  <div class="gen-booking-info-card">
                    <div class="gen-booking-info-icon">📅</div>
                    <h4>Instant Confirmation</h4>
                    <p>Receive your booking ID immediately after submitting your request.</p>
                  </div>
                  <div class="gen-booking-info-card">
                    <div class="gen-booking-info-icon">🔒</div>
                    <h4>Secure & Private</h4>
                    <p>Your contact info is only used to confirm your reservation.</p>
                  </div>
                  <div class="gen-booking-info-card">
                    <div class="gen-booking-info-icon">🔄</div>
                    <h4>Easy Modifications</h4>
                    <p>Call us anytime to change your reservation details at no charge.</p>
                  </div>
                  <button class="gen-btn gen-btn-secondary" style="width:100%; justify-content:center; margin-top:8px;" onclick="App.openCallModal()">
                    <span>📞</span> Call to Book Instead
                  </button>
                </div>
              </div>
            </div>
          </section>
        `;
      }

      case 'contact':
        return `
          <section class="gen-gallery-section" id="contact" style="background: rgba(255,255,255,0.02);">
            <div class="gen-container">
              <div class="gen-section-header">
                <div class="gen-section-icon-badge">💬</div>
                <h2 class="gen-section-title" ${editAttr} data-section-id="${sec.id}" data-field="heading">${sec.heading || 'Contact Us & Admin Inquiries'}</h2>
                <p class="gen-section-subtitle" ${editAttr} data-section-id="${sec.id}" data-field="description">${sec.description || 'Send a direct message or booking inquiry to the administration team.'}</p>
              </div>

              <div style="max-width:850px; margin:0 auto; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:30px; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
                <div style="display:flex; flex-direction:column; gap:16px;">
                  <h4 style="color:#ffffff; font-size:1.1rem; font-weight:700;">Admin Communication</h4>
                  <p style="color:#94a3b8; font-size:0.9rem; line-height:1.6;">We respond quickly to all customer reservations, event bookings, and bespoke requests.</p>
                  
                  <div style="font-size:0.85rem; color:#cbd5e1; display:flex; flex-direction:column; gap:10px; margin-top:8px;">
                    <div>📍 <strong style="color:#fff;">Address:</strong> ${sec.address || '742 Evergreen Terrace'}</div>
                    <div>📞 <strong style="color:#fff;">Phone:</strong> ${sec.phone || '(555) 019-2834'}</div>
                    <div>✉️ <strong style="color:#fff;">Email:</strong> ${sec.email || 'admin@' + schema.brandName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}</div>
                  </div>

                  <button class="gen-btn gen-btn-secondary" style="margin-top:10px; font-size:0.85rem;" onclick="App.openShareModal ? App.openShareModal() : alert('Share Link: ' + window.location.href)">
                    <span>🚀</span> Share This Web Platform
                  </button>
                </div>

                <form onsubmit="event.preventDefault(); alert('✅ Message sent to Admin! Thank you.'); this.reset();" style="display:flex; flex-direction:column; gap:12px;">
                  <input type="text" placeholder="Your Name" required style="width:100%; padding:10px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:#fff; font-size:0.9rem;">
                  <input type="text" placeholder="Your Email or Phone" required style="width:100%; padding:10px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:#fff; font-size:0.9rem;">
                  <textarea placeholder="Your Message for Admin..." required rows="3" style="width:100%; padding:10px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:#fff; font-size:0.9rem; resize:vertical;"></textarea>
                  <button type="submit" class="gen-btn gen-btn-call" style="width:100%; justify-content:center;">
                    <span>✉️</span> Send Message to Admin
                  </button>
                </form>
              </div>
            </div>
          </section>
        `;

      case 'footer':
        return `
          <footer class="gen-clean-footer">
            <div class="gen-container">
              <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:16px;">
                <span style="font-size:1.8rem;">✨</span>
                <span style="font-size:1.3rem; font-weight:800; color:#ffffff;" ${editAttr} data-section-id="${sec.id}" data-field="brandName">${schema.brandName}</span>
              </div>
              
              <div class="gen-footer-actions">
                <button class="gen-btn gen-btn-call" onclick="App.openCallModal()">
                  <span>📞</span> Call ${sec.status?.phone || '(555) 019-2834'}
                </button>
                <button class="gen-btn gen-btn-secondary" onclick="App.openMapModal()">
                  <span>📍</span> View On Map
                </button>
                <button class="gen-btn gen-btn-secondary" onclick="App.openShareModal ? App.openShareModal() : alert('Share: ' + window.location.href)">
                  <span>🚀</span> Share
                </button>
                <button class="gen-btn gen-btn-like" onclick="App.handleLike()">
                  <span>❤️</span> Like (<span class="footer-like-val">428</span>)
                </button>
              </div>

              <p style="color:#94a3b8; font-size:0.85rem; margin-top:20px;">
                © ${new Date().getFullYear()} ${schema.brandName} • Handcrafted Excellence • Zero Cost/Pricing Policy
              </p>
            </div>
          </footer>
        `;

      default:
        return `<div style="padding:30px; text-align:center;">Section: ${sec.title}</div>`;
    }
  },

  /**
   * Export to clean standalone HTML file
   */
  exportToStandaloneHTML(schema) {
    const rawWebsiteHTML = this.renderWebsite(schema, false);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${schema.brandName} - Handcrafted Web Presence</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/generated-site.css">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #0c0a08;
      color: #fefce8;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      scroll-behavior: smooth;
    }
  </style>
</head>
<body>
  ${rawWebsiteHTML}
  <script>
    function speak(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      }
    }
    const App = {
      speak: speak,
      openCallModal: function() { window.location.href = 'tel:5550192834'; },
      openMapModal: function() { alert('Location: 742 Evergreen Terrace'); },
      handleLike: function() { alert('Thank you for the love! ❤️'); },
      handleLikeItem: function(n) { alert('You loved: ' + n + ' ❤️'); },
      openLightbox: function(u, t) { window.open(u, '_blank'); },
      filterGallery: function() {}
    };
  </script>
</body>
</html>`;
  }
};
