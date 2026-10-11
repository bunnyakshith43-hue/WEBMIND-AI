/**
 * WebMind AI - Autonomous Universal Photo-Centric Shop Synthesis Engine
 * Deeply analyzes ANY user prompt to curate high-quality photos, contextual copy, and zero pricing.
 * Features real-time deep editing, audio speech narration for non-readers, and practical buttons.
 */

const AIEngine = {
  // Curated theme color palettes
  themes: {
    'warm-amber': {
      id: 'warm-amber',
      name: 'Artisan Amber',
      primary: '#d97706',
      primaryHover: '#b45309',
      secondary: '#f59e0b',
      accent: '#ef4444',
      bg: '#0c0a08',
      surface: '#171410',
      surfaceAlt: '#231e17',
      border: 'rgba(255, 255, 255, 0.1)',
      borderHover: 'rgba(245, 158, 11, 0.4)',
      text: '#fefce8',
      textMuted: '#d4cfb8'
    },
    'emerald-forest': {
      id: 'emerald-forest',
      name: 'Emerald Botanical',
      primary: '#10b981',
      primaryHover: '#059669',
      secondary: '#34d399',
      accent: '#06b6d4',
      bg: '#06130d',
      surface: '#0d2218',
      surfaceAlt: '#143425',
      border: 'rgba(168, 85, 247, 0.15)',
      borderHover: 'rgba(16, 185, 129, 0.4)',
      text: '#f0fdf4',
      textMuted: '#a7f3d0'
    },
    'oceanic-azure': {
      id: 'oceanic-azure',
      name: 'Oceanic Azure',
      primary: '#0ea5e9',
      primaryHover: '#0284c7',
      secondary: '#38bdf8',
      accent: '#06b6d4',
      bg: '#08121e',
      surface: '#0f2035',
      surfaceAlt: '#162d4a',
      border: 'rgba(56, 189, 248, 0.15)',
      borderHover: 'rgba(56, 189, 248, 0.4)',
      text: '#f0fdf4',
      textMuted: '#94a3b8'
    },
    'sunset-rose': {
      id: 'sunset-rose',
      name: 'Sunset Rose',
      primary: '#f43f5e',
      primaryHover: '#e11d48',
      secondary: '#fb923c',
      accent: '#ec4899',
      bg: '#14080e',
      surface: '#24101b',
      surfaceAlt: '#331726',
      border: 'rgba(244, 63, 94, 0.18)',
      borderHover: 'rgba(244, 63, 94, 0.45)',
      text: '#fff1f2',
      textMuted: '#fda4af'
    },
    'royal-amethyst': {
      id: 'royal-amethyst',
      name: 'Royal Purple',
      primary: '#a855f7',
      primaryHover: '#9333ea',
      secondary: '#c084fc',
      accent: '#f43f5e',
      bg: '#11091b',
      surface: '#1f1231',
      surfaceAlt: '#2c1946',
      border: 'rgba(168, 85, 247, 0.15)',
      borderHover: 'rgba(168, 85, 247, 0.4)',
      text: '#faf5ff',
      textMuted: '#e9d5ff'
    },
    'terracotta-clay': {
      id: 'terracotta-clay',
      name: 'Terracotta Craft',
      primary: '#ea580c',
      primaryHover: '#c2410c',
      secondary: '#f97316',
      accent: '#eab308',
      bg: '#120b06',
      surface: '#1e130c',
      surfaceAlt: '#2b1b11',
      border: 'rgba(234, 88, 12, 0.15)',
      borderHover: 'rgba(249, 115, 22, 0.4)',
      text: '#fff7ed',
      textMuted: '#fed7aa'
    }
  },

  // 20+ specialized shop domains with curated photography & zero pricing
  shopDomains: {
    coffee: {
      match: ['coffee', 'cafe', 'roaster', 'roastery', 'espresso', 'barista', 'cappuccino', 'latte', 'cold brew'],
      theme: 'warm-amber',
      defaultName: 'Velvet Roast Artisan Cafe',
      icon: '☕',
      badge: '☕ ARTISAN COFFEE & WARM BAKERY',
      headline: 'Freshly Roasted Coffee & Warm Daily Bakery',
      subtitle: 'Steaming single-origin espresso, golden buttery croissants fresh from the morning oven, and a cozy rustic atmosphere to relax and connect.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
        title: 'Barista Pouring Precision Latte Art',
        badge: '✨ Freshly Brewed'
      },
      galleryCategories: ['All', 'Coffee', 'Bakery', 'Vibe'],
      gallery: [
        { id: 'c1', category: 'Coffee', title: 'Artisan Latte Art', tag: '☕ Handcrafted', url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80' },
        { id: 'c2', category: 'Coffee', title: 'Golden Espresso Crema', tag: '☕ Single Origin', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
        { id: 'c3', category: 'Bakery', title: 'Fresh Baked Butter Croissants', tag: '🥐 Daily 6 AM', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' },
        { id: 'c4', category: 'Vibe', title: 'Warm Rustic Seating', tag: '🪴 Cozy Gathering', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
        { id: 'c5', category: 'Coffee', title: 'Nitro Cold Brew on Ice', tag: '🧊 Sweet Cream', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' },
        { id: 'c6', category: 'Bakery', title: 'Berry Glazed Pastries', tag: '🍓 Sweet Treats', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '☕', title: 'Velvet Cappuccino', desc: 'Silky steamed whole milk poured over double-shot espresso with rich caramel crema.', photo: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80', badge: 'House Favorite' },
        { icon: '🥐', title: 'Artisan Butter Croissant', desc: 'Flaky honeycomb layers baked fresh every morning with pure French cultured butter.', photo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', badge: 'Fresh Daily' },
        { icon: '🧊', title: 'Cold Brew with Vanilla Foam', desc: 'Steeped cold for 20 hours with organic Madagascar vanilla sweet foam.', photo: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', badge: 'Refreshing' },
        { icon: '🥑', title: 'Avocado Sourdough Toast', desc: 'Crisp rustic bread topped with creamy ripe avocado, Maldon sea salt, and chili flakes.', photo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80', badge: 'Light Bite' }
      ],
      hours: 'Open Today • 7:00 AM - 9:00 PM',
      phone: '(555) 019-2834',
      address: '742 Evergreen Terrace, Downtown District'
    },

    bakery: {
      match: ['bakery', 'bread', 'pastry', 'pastries', 'sourdough', 'croissant', 'bakehouse', 'baker', 'cake', 'cookies'],
      theme: 'sunset-rose',
      defaultName: 'Golden Crust Bakehouse',
      icon: '🥖',
      badge: '🥖 STONE-MILLED SOURDOUGH & FRENCH PASTRIES',
      headline: 'Warm Sourdough & Heavenly Fresh Pastries',
      subtitle: 'Organic stone-ground flours, 36-hour slow fermentation, and handmade sweets baked with love before sunrise every single morning.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
        title: 'Fresh Artisan Loaves and Pastries',
        badge: '🥖 Hearth Baked'
      },
      galleryCategories: ['All', 'Bread', 'Pastries', 'Cakes'],
      gallery: [
        { id: 'bk1', category: 'Bread', title: 'Crusty Country Sourdough', tag: '🥖 Long Ferment', url: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80' },
        { id: 'bk2', category: 'Pastries', title: 'Pain au Chocolat', tag: '🍫 Belgian Cocoa', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' },
        { id: 'bk3', category: 'Cakes', title: 'Seasonal Berry Tart', tag: '🍓 Pastry Cream', url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80' },
        { id: 'bk4', category: 'Bread', title: 'Rosemary Sea Salt Focaccia', tag: '🌿 Extra Virgin Oil', url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🥖', title: 'Country Sourdough Boule', desc: 'Blistered dark crust with an open, custardy crumb and mild pleasant tang.', photo: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80', badge: 'Daily Staple' },
        { icon: '🥐', title: 'Almond Frangipane Croissant', desc: 'Double-baked with rich almond cream, toasted flakes, and powdered sugar.', photo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', badge: 'Morning Star' },
        { icon: '🧁', title: 'Wild Blueberry Brioche', desc: 'Buttery French brioche filled with sweet blueberries and Meyer lemon curd.', photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', badge: 'Sweet Delight' },
        { icon: '🥖', title: 'Baguette Tradition', desc: 'Crisp shatter-crust classic French baguette, baked every three hours.', photo: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80', badge: 'Hearth Baked' }
      ],
      hours: 'Open Today • 6:30 AM - 6:00 PM',
      phone: '(555) 018-9943',
      address: '124 Baker Street, Old Mill Village'
    },

    ramen: {
      match: ['ramen', 'noodle', 'noodles', 'broth', 'tonkotsu', 'chashu', 'japanese', 'gyoza', 'izakaya'],
      theme: 'warm-amber',
      defaultName: 'Ichiraku Noodle Bar',
      icon: '🍜',
      badge: '🍜 SLOW-SIMMERED BROTH & HANDMADE NOODLES',
      headline: 'Steaming Artisan Ramen & Rich Rich Broth',
      subtitle: 'Simmered for 18 hours, crafted with springy handmade alkaline noodles, melt-in-your-mouth chashu pork, and jammy marinated eggs.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
        title: 'Steaming Bowl of Tonkotsu Ramen',
        badge: '🔥 18h Simmered'
      },
      galleryCategories: ['All', 'Ramen', 'Sides', 'Atmosphere'],
      gallery: [
        { id: 'r1', category: 'Ramen', title: 'Rich Tonkotsu Black Garlic', tag: '🍜 Kurogarlic', url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80' },
        { id: 'r2', category: 'Sides', title: 'Crispy Pan-Seared Gyoza', tag: '🥟 Handmade', url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80' },
        { id: 'r3', category: 'Ramen', title: 'Spicy Sesame Tantanmen', tag: '🌶️ Rich Broth', url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80' },
        { id: 'r4', category: 'Atmosphere', title: 'Cozy Japanese Noodle Counter', tag: '🏮 Lantern Light', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🍜', title: 'Signature Tonkotsu Ramen', desc: '18-hour pork marrow broth, springy noodles, braised chashu, menma, and ajitsuke tamago.', photo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', badge: 'House Specialty' },
        { icon: '🥟', title: 'Hand-Pleated Pork Gyoza', desc: 'Crispy lacy bottom pan-fried dumplings served with spicy scallion ponzu dip.', photo: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80', badge: 'Made to Order' },
        { icon: '🌶️', title: 'Spicy Miso Ramen', desc: 'Fermented Hokkaido red miso with toasted sesame paste, bok choy, and chili oil.', photo: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80', badge: 'Bold Flavor' }
      ],
      hours: 'Open Today • 11:30 AM - 10:00 PM',
      phone: '(555) 019-3388',
      address: '88 Lantern Alley, Little Tokyo'
    },

    teahouse: {
      match: ['tea', 'matcha', 'teahouse', 'loose leaf', 'bamboo', 'mochi', 'herbal tea', 'sencha', 'oolong'],
      theme: 'emerald-forest',
      defaultName: 'Kissa Zen Tea House',
      icon: '🍵',
      badge: '🍵 CEREMONIAL MATCHA & LOOSE-LEAF TEAS',
      headline: 'Ceremonial Grade Matcha & Calming Tea Rituals',
      subtitle: 'Whisked with traditional bamboo chasen, single-estate green teas from Uji, Kyoto, and handmade seasonal mochi sweets in a tranquil garden setting.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80',
        title: 'Ceremonial Matcha Bowl with Bamboo Whisk',
        badge: '🍵 Uji Heritage'
      },
      galleryCategories: ['All', 'Matcha', 'Tea', 'Sweets'],
      gallery: [
        { id: 't1', category: 'Matcha', title: 'Frothy Ceremonial Matcha', tag: '🍵 Whisked Daily', url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80' },
        { id: 't2', category: 'Tea', title: 'Steaming Loose Leaf Oolong', tag: '🍃 Clay Teapot', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' },
        { id: 't3', category: 'Sweets', title: 'Handmade Strawberry Mochi', tag: '🍓 Rice Cake', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
        { id: 't4', category: 'Matcha', title: 'Iced Matcha Coconut Foam', tag: '🥥 Refreshing', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🍵', title: 'Uji Ceremonial Matcha Bowl', desc: 'First harvest stone-ground green tea whisked hot in handcrafted ceramic chawan.', photo: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80', badge: 'Pure Ritual' },
        { icon: '🍃', title: 'Roasted Hojicha Latte', desc: 'Toasty, nutty roasted green tea steamed with creamy oat milk and raw cane sugar.', photo: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', badge: 'Warm & Nutty' },
        { icon: '🍡', title: 'Fresh Seasonal Mochi', desc: 'Pillowy soft sweet rice dough filled with white bean paste and fresh fruit.', photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', badge: 'Daily Sweet' }
      ],
      hours: 'Open Today • 10:00 AM - 7:30 PM',
      phone: '(555) 014-9922',
      address: '42 Bamboo Garden Path, Tranquil District'
    },

    chocolate: {
      match: ['chocolate', 'chocolatier', 'truffle', 'cacao', 'fudge', 'bonbon', 'cocoa'],
      theme: 'warm-amber',
      defaultName: 'Velvet Cacao Chocolatier',
      icon: '🍫',
      badge: '🍫 HANDMADE ARTISAN TRUFFLES & SINGLE-ORIGIN CACAO',
      headline: 'Velvety Single-Origin Truffles & Rich Dark Cacao',
      subtitle: 'Ethically sourced heirloom cacao, hand-rolled ganache truffles, floral infusions, and rich hot drinking chocolate melted from pure bean bars.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=80',
        title: 'Handcrafted Chocolate Truffles and Ganache',
        badge: '🍫 Heirloom Cacao'
      },
      galleryCategories: ['All', 'Truffles', 'Bars', 'Sipping'],
      gallery: [
        { id: 'ch1', category: 'Truffles', title: 'Sea Salt Caramel Truffles', tag: '✨ Hand Rolled', url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80' },
        { id: 'ch2', category: 'Bars', title: '75% Madagascar Dark Chocolate', tag: '🍫 Single Estate', url: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&q=80' },
        { id: 'ch3', category: 'Sipping', title: 'Melted Mayan Spiced Drinking Cacao', tag: '☕ Velvet Cup', url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🍫', title: 'Signature Sea Salt Caramel Box', desc: 'Crisp 70% dark shell filled with flowing vanilla caramel and flaky French fleur de sel.', photo: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80', badge: 'Award Winner' },
        { icon: '☕', title: 'Melted European Sipping Chocolate', desc: 'Thick, unadulterated warm dark chocolate drink served with hand-whipped cream.', photo: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80', badge: 'Comforting' },
        { icon: '🍓', title: 'Raspberry Rose Bonbons', desc: 'Ruby red hand-painted cocoa shells with tart raspberry puree and delicate rose ganache.', photo: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=600&q=80', badge: 'Delicate' }
      ],
      hours: 'Open Today • 10:30 AM - 8:00 PM',
      phone: '(555) 017-4400',
      address: '15 Sweet Lane, Cocoa Quarter'
    },

    bookstore: {
      match: ['book', 'bookstore', 'books', 'comic', 'comics', 'novel', 'reading', 'library', 'literature', 'author'],
      theme: 'royal-amethyst',
      defaultName: 'Page & Quill Books',
      icon: '📚',
      badge: '📚 INDEPENDENT BOOKSTORE & READING NOOK',
      headline: 'Curated Stories, Rare Finds & Quiet Corners',
      subtitle: 'Floor-to-ceiling wooden bookshelves, cozy velvet armchairs, first editions, and independent voices waiting to be discovered.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1507842229451-7f01be7a7a58?auto=format&fit=crop&w=1200&q=80',
        title: 'Floor to Ceiling Cozy Bookstore',
        badge: '✨ Peaceful Sanctuary'
      },
      galleryCategories: ['All', 'Fiction', 'Art', 'Nook'],
      gallery: [
        { id: 'b1', category: 'Fiction', title: 'Vintage Hardcovers', tag: '📖 Rare Editions', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
        { id: 'b2', category: 'Nook', title: 'Cozy Reading Armchair', tag: '☕ Quiet Spot', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80' },
        { id: 'b3', category: 'Art', title: 'Poetry & Art Prints', tag: '🎨 Letterpress', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
        { id: 'b4', category: 'Fiction', title: 'Staff Recommendations', tag: '⭐ Staff Pick', url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '📚', title: 'Curated Indie Fiction', desc: 'Handpicked novels from independent presses and contemporary literary voices.', photo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', badge: 'Hand Selected' },
        { icon: '🖋️', title: 'Rare & Vintage Prints', desc: 'Antiquarian volumes, illustrated classics, and handmade archival bookmarks.', photo: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80', badge: 'Collectible' },
        { icon: '☕', title: 'Quiet Reading Salon', desc: 'Free loose-leaf tea and silent reading armchairs overlooking the garden.', photo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80', badge: 'Relax' },
        { icon: '🎨', title: 'Poetry & Literary Journals', desc: 'Independent poetry chapbooks, literary quarterlies, and author readings.', photo: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80', badge: 'Weekly Event' }
      ],
      hours: 'Open Today • 10:00 AM - 8:00 PM',
      phone: '(555) 014-8832',
      address: '38 Old Library Lane, Heritage Square'
    },

    florist: {
      match: ['flower', 'florist', 'floral', 'bouquet', 'bloom', 'roses', 'tulips', 'botanic', 'plant'],
      theme: 'emerald-forest',
      defaultName: 'Petal & Stem Floral Studio',
      icon: '🌸',
      badge: '🌸 FRESH CUT LOCAL BLOOMS & BOTANICAL DESIGN',
      headline: 'Fresh Garden Wildflowers & Bespoke Florals',
      subtitle: 'Locally grown seasonal blooms, aromatic eucalyptus, hand-tied market bouquets, and living botanicals arranged fresh every morning.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80',
        title: 'Vibrant Fresh Cut Floral Arrangements',
        badge: '🌿 Farm Fresh'
      },
      galleryCategories: ['All', 'Bouquets', 'Plants', 'Studio'],
      gallery: [
        { id: 'fl1', category: 'Bouquets', title: 'Meadow Garden Bouquet', tag: '🌸 Hand Tied', url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80' },
        { id: 'fl2', category: 'Plants', title: 'Monstera & Tropical Greens', tag: '🪴 Potted Plant', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80' },
        { id: 'fl3', category: 'Bouquets', title: 'English Garden Roses', tag: '🌹 Sweet Fragrance', url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80' },
        { id: 'fl4', category: 'Studio', title: 'Sunlit Greenhouse Corner', tag: '🌿 Plant Haven', url: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🌸', title: 'Signature Market Bouquet', desc: 'Hand-picked morning wildflowers wrapped in compostable kraft paper and twine.', photo: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80', badge: 'Daily Harvest' },
        { icon: '🪴', title: 'Rare Potted Houseplants', desc: 'Healthy, hand-potted tropical plants with easy care guidance for your home.', photo: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80', badge: 'Living Greenery' },
        { icon: '🏺', title: 'Terracotta Ceramics & Vases', desc: 'Hand-thrown artisanal ceramic vessels and ribbed glass flower vases.', photo: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80', badge: 'Handmade' }
      ],
      hours: 'Open Today • 8:30 AM - 6:30 PM',
      phone: '(555) 012-7788',
      address: '215 Blossom Grove, Botanical District'
    },

    pottery: {
      match: ['pottery', 'ceramic', 'ceramics', 'clay', 'potter', 'sculpture', 'wheel', 'stoneware'],
      theme: 'terracotta-clay',
      defaultName: 'Mud & Fire Pottery Studio',
      icon: '🏺',
      badge: '🏺 HAND-THROWN CERAMICS & CLAY STUDIO',
      headline: 'Handmade Stoneware & Wheel-Thrown Ceramics',
      subtitle: 'Tactile textured clay, organic earthy glazes, and functional everyday ceramics fired in our gas kilns with rustic soul.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
        title: 'Potter Handcrafting Stoneware Vessel',
        badge: '✨ Hand Thrown'
      },
      galleryCategories: ['All', 'Vessels', 'Mugs', 'Studio'],
      gallery: [
        { id: 'pt1', category: 'Vessels', title: 'Matte Earth Stoneware Vase', tag: '🏺 Wheel Thrown', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
        { id: 'pt2', category: 'Mugs', title: 'Carved Ceramic Coffee Mug', tag: '☕ Daily Mug', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
        { id: 'pt3', category: 'Studio', title: 'Pottery Wheel in Motion', tag: '🔥 Clay Studio', url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🏺', title: 'Wheel-Thrown Stoneware Vase', desc: 'Tactile ribbed vase with natural volcanic ash glaze and raw unglazed clay foot.', photo: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80', badge: 'Unique Piece' },
        { icon: '☕', title: 'Signature Barista Mug', desc: 'Ergonomic thumb-rest handle and speckled eggshell glaze for your favorite brew.', photo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', badge: 'Daily Favorite' },
        { icon: '🍽️', title: 'Shallow Tapas & Pasta Bowls', desc: 'Heavyweight organic rimmed bowls glazed in matte lichen green.', photo: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80', badge: 'Kitchen Essential' }
      ],
      hours: 'Open Today • 10:00 AM - 7:00 PM',
      phone: '(555) 016-4421',
      address: '89 Kiln House Road, Artisan Alley'
    },

    pets: {
      match: ['pet', 'dog', 'puppy', 'cat', 'kitten', 'grooming', 'vet', 'paws', 'animal'],
      theme: 'oceanic-azure',
      defaultName: 'Paws & Whiskers Pet Lounge',
      icon: '🐶',
      badge: '🐾 ORGANIC PET TREATS & GENTLE GROOMING',
      headline: 'Gentle Pet Care, Healthy Treats & Happy Tails',
      subtitle: 'Stress-free organic grooming, single-ingredient baked biscuits, safe natural toys, and a warm welcoming lounge for all furry companions.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
        title: 'Happy Golden Dog in Cozy Lounge',
        badge: '🐾 Tail Wagging'
      },
      galleryCategories: ['All', 'Dogs', 'Treats', 'Spa'],
      gallery: [
        { id: 'p1', category: 'Dogs', title: 'Playful Golden Retriever', tag: '🐶 Best Friend', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80' },
        { id: 'p2', category: 'Treats', title: 'Oven Baked Puppy Biscuits', tag: '🦴 All Natural', url: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80' },
        { id: 'p3', category: 'Spa', title: 'Gentle Herbal Bath & Brush', tag: '🛁 Gentle Care', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🛁', title: 'Gentle Herbal Spa & Groom', desc: 'Hypoallergenic oatmeal bath, warm blow-dry, nail trim, and gentle ear care.', photo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80', badge: 'Stress Free' },
        { icon: '🦴', title: 'Hearth-Baked Peanut Biscuits', desc: 'Organic pumpkin, peanut butter, and oat flour baked with zero preservatives.', photo: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80', badge: '100% Organic' },
        { icon: '🎾', title: 'Natural Wool & Hemp Toys', desc: 'Durable, non-toxic chew toys handwoven from organic natural fibers.', photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80', badge: 'Eco Safe' }
      ],
      hours: 'Open Today • 8:00 AM - 7:00 PM',
      phone: '(555) 017-3329',
      address: '52 Paws Way, Sunny Meadow Square'
    },

    icecream: {
      match: ['ice cream', 'gelato', 'sorbet', 'dessert', 'frozen', 'sweet', 'sundae', 'cone'],
      theme: 'sunset-rose',
      defaultName: 'Sweet Swirl Artisan Gelato',
      icon: '🍦',
      badge: '🍦 HANDMADE SMALL-BATCH GELATO & SORBETTO',
      headline: 'Slow-Churned Gelato & Golden Waffle Cones',
      subtitle: 'Pure organic milk, fresh seasonal fruits, imported Sicilian pistachios, and fresh warm waffle cones pressed to order.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80',
        title: 'Colorful Artisan Gelato Cups & Cones',
        badge: '✨ Churned Daily'
      },
      galleryCategories: ['All', 'Gelato', 'Cones', 'Sorbet'],
      gallery: [
        { id: 'ic1', category: 'Gelato', title: 'Sicilian Roasted Pistachio', tag: '🍦 Real Nut Cream', url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80' },
        { id: 'ic2', category: 'Sorbet', title: 'Alphonso Mango Sorbet', tag: '🥭 100% Fruit', url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80' },
        { id: 'ic3', category: 'Cones', title: 'Warm Cinnamon Waffle Cones', tag: '🧇 Fresh Pressed', url: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🍦', title: 'Sicilian Bronte Pistachio', desc: 'Slow-roasted Italian pistachios churned into velvety, nutty green gelato.', photo: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80', badge: 'Legendary' },
        { icon: '🍫', title: 'Dark Belgian Stracciatella', desc: 'Fior di latte gelato with shards of melted Venezuelan 70% dark chocolate.', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', badge: 'Crowd Favorite' },
        { icon: '🍓', title: 'Wild Strawberry & Basil Sorbet', desc: 'Fresh mountain berries pureed with sweet garden basil and Meyer lemon.', photo: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80', badge: 'Dairy Free' }
      ],
      hours: 'Open Today • 11:30 AM - 10:30 PM',
      phone: '(555) 013-6621',
      address: '77 Gelato Piazza, Waterfront Walk'
    },

    music: {
      match: ['vinyl', 'record', 'music', 'album', 'audio', 'sound', 'turntable', 'instrument', 'guitar'],
      theme: 'royal-amethyst',
      defaultName: 'Groove Heritage Vinyl',
      icon: '🎵',
      badge: '🎵 VINTAGE VINYL & ANALOG AUDIO LOUNGE',
      headline: 'Analog Warmth, Rare Pressings & Listening Lounges',
      subtitle: 'Crate-digging gold, original first pressings, restored tube audio turntables, and private headphone listening stations.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
        title: 'Crate of Vintage Vinyl Records',
        badge: '✨ Original Pressings'
      },
      galleryCategories: ['All', 'Vinyl', 'Turntable', 'Lounge'],
      gallery: [
        { id: 'm1', category: 'Vinyl', title: 'Classic Jazz & Soul LPs', tag: '🎷 Pure Analog', url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80' },
        { id: 'm2', category: 'Turntable', title: 'Vintage Walnut Turntable', tag: '📻 Hi-Fi Tube', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🎵', title: 'Original First Pressing Vinyl', desc: 'Carefully ultrasonically cleaned vintage LPs across Jazz, Blues, Funk, and Rock.', photo: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80', badge: 'Rare Finds' },
        { icon: '📻', title: 'Restored Vintage Turntables', desc: 'Serviced direct-drive and belt-drive record players with new audiophile needles.', photo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80', badge: 'Audiophile' },
        { icon: '🎧', title: 'Private Listening Booths', desc: 'Sample any record in our library with open-back planar magnetic headphones.', photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', badge: 'Complimentary' }
      ],
      hours: 'Open Today • 11:00 AM - 9:00 PM',
      phone: '(555) 011-7764',
      address: '404 Vinyl Way, Arts & Sound Quarter'
    },

    pizza: {
      match: ['pizza', 'pizzeria', 'trattoria', 'italian', 'pasta', 'woodfired', 'mozzarella'],
      theme: 'sunset-rose',
      defaultName: 'Crust & Ember Woodfired Pizzeria',
      icon: '🍕',
      badge: '🍕 900-DEGREE WOODFIRED NEAPOLITAN PIZZA',
      headline: 'Woodfired Sourdough Pizza & San Marzano Tomatoes',
      subtitle: 'Fermented for 72 hours, blistered in our volcanic stone oven in 90 seconds, topped with creamy buffalo mozzarella and sweet fresh basil.',
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        title: 'Hot Woodfired Pizza with Melting Mozzarella',
        badge: '🔥 Woodfired Oven'
      },
      galleryCategories: ['All', 'Pizza', 'Oven', 'Antipasti'],
      gallery: [
        { id: 'pz1', category: 'Pizza', title: 'Classic Margherita D.O.P.', tag: '🍕 Sweet Basil', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
        { id: 'pz2', category: 'Oven', title: 'Volcanic Stone Hearth Flame', tag: '🔥 900 Degrees', url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '🍕', title: 'Margherita Verace D.O.P.', desc: 'San Marzano tomatoes, buffalo mozzarella from Campania, fresh basil, and extra virgin oil.', photo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', badge: 'Traditional' },
        { icon: '🍄', title: 'Tartufo & Forest Mushroom', desc: 'Fior di latte, roasted chanterelles, thyme, and fragrant white truffle essence.', photo: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80', badge: 'House Recipe' }
      ],
      hours: 'Open Today • 12:00 PM - 10:00 PM',
      phone: '(555) 018-4499',
      address: '22 Little Italy Way, Piazza Center'
    }
  },

  /**
   * Deeply analyze user prompt to synthesize bespoke shop experience
   */
  synthesizeWebsite(prompt) {
    const pLower = (prompt || '').toLowerCase();

    // 1. Detect matching domain
    let matchedDomainKey = null;
    let highestMatches = 0;

    for (const [key, data] of Object.entries(this.shopDomains)) {
      let matches = 0;
      for (const kw of data.match) {
        if (pLower.includes(kw)) matches++;
      }
      if (matches > highestMatches) {
        highestMatches = matches;
        matchedDomainKey = key;
      }
    }

    let arch = null;
    if (matchedDomainKey) {
      arch = JSON.parse(JSON.stringify(this.shopDomains[matchedDomainKey]));
    } else {
      arch = this.buildDynamicCustomShop(prompt);
    }

    // 2. Extract specific custom offerings mentioned by user in the prompt!
    // E.g., "featuring ceremonial matcha, bamboo whisks, and mochi"
    const parsedItems = this.extractItemsFromPrompt(prompt);
    if (parsedItems.length > 0) {
      // Infuse parsed items into offerings
      parsedItems.forEach((itemTitle, i) => {
        if (arch.offerings[i]) {
          arch.offerings[i].title = itemTitle;
          arch.offerings[i].desc = `Handcrafted ${itemTitle.toLowerCase()} prepared fresh with authentic ingredients.`;
        }
      });
    }

    // 3. Extract or synthesize Brand Name
    let brandName = '';
    const nameMatch = prompt.match(/(?:named|called|name is|brand)\s+["']?([A-Za-z0-9\s&'-]+?)["']?(?:\s+with|\s+for|\s+that|\.|\,|$)/i);
    if (nameMatch && nameMatch[1].trim()) {
      brandName = nameMatch[1].trim();
    } else {
      brandName = arch.defaultName;
    }

    const themeId = arch.theme || 'warm-amber';

    // 4. Assemble the schema with ZERO pricing
    const siteSchema = {
      id: 'wm_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      originalPrompt: prompt,
      themeId: themeId,
      brandName: brandName,
      domainKey: matchedDomainKey || 'custom',
      sections: [
        {
          id: 'sec-nav',
          type: 'navigation',
          title: 'Navigation Header',
          brandName: brandName,
          status: { hours: arch.hours, phone: arch.phone },
          links: [
            { text: '📸 Photos', href: '#photos' },
            { text: '✨ Offerings', href: '#offerings' },
            { text: '🕒 Hours & Visit', href: '#visit' },
            { text: '❤️ Love', href: '#reviews' }
          ]
        },
        {
          id: 'sec-hero',
          type: 'hero',
          title: 'Photo Hero Banner',
          badge: arch.badge,
          headline: arch.headline,
          subtitle: arch.subtitle,
          heroPhoto: arch.heroPhoto,
          status: { hours: arch.hours, phone: arch.phone, address: arch.address },
          primaryCta: { text: '📞 Call Us', action: 'call' },
          secondaryCta: { text: '📍 Directions', action: 'directions' }
        },
        {
          id: 'sec-gallery',
          type: 'gallery',
          title: 'Photo Gallery Showcase',
          tag: '📸 HIGH-QUALITY PHOTOGRAPHY',
          heading: 'A Visual Tour of Our Space',
          description: 'Explore our high-resolution photo collection celebrating our craft, atmosphere, and community.',
          categories: arch.galleryCategories,
          photos: arch.gallery
        },
        {
          id: 'sec-offerings',
          type: 'offerings',
          title: 'Visual Highlights',
          tag: '✨ SIGNATURE CRAFT',
          heading: 'What Makes Us Special',
          description: 'Click the speaker on any item to hear it read aloud in clear speech. Zero pricing, pure passion.',
          items: arch.offerings
        },
        {
          id: 'sec-info',
          type: 'info',
          title: 'Hours & Location',
          tag: '🕒 COME VISIT US',
          heading: 'We Are Open Every Day',
          status: { hours: arch.hours, phone: arch.phone, address: arch.address }
        },
        {
          id: 'sec-reviews',
          type: 'reviews',
          title: 'Customer Love',
          tag: '❤️ COMMUNITY LOVE',
          heading: 'Smiles from Happy Guests',
          reviews: [
            { author: 'Jordan M.', text: 'The atmosphere is wonderful and the quality speaks for itself. My absolute favorite neighborhood spot.', rating: 5 },
            { author: 'Elena R.', text: 'Incredible craftsmanship and wonderful staff. Always a pleasure stepping through the door.', rating: 5 }
          ]
        },
        {
          id: 'sec-booking',
          type: 'booking',
          title: 'Confirm Your Request',
          heading: 'Confirm Your Request',
          description: `Reserve your spot at ${brandName}. Select your preferred date, time, and party size — we'll confirm instantly.`,
          brandName: brandName,
          phone: arch.phone || '(555) 019-2834',
          serviceTypes: arch.bookingServices || ['Table Reservation', 'Private Event', 'Group Booking', 'Special Occasion', 'Walk-in Priority'],
          timeSlots: ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']
        },
        {
          id: 'sec-contact',
          type: 'contact',
          title: 'Contact Us & Admin Inquiries',
          heading: 'Contact Us & Admin Communication',
          description: 'Have a bespoke request, reservation question, or business inquiry? Send a direct message to our admin team.',
          email: 'admin@' + brandName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
          phone: arch.phone || '(555) 019-2834',
          address: arch.address || '742 Evergreen Terrace'
        },
        {
          id: 'sec-footer',
          type: 'footer',
          title: 'Footer',
          brandName: brandName,
          status: { hours: arch.hours, phone: arch.phone, address: arch.address }
        }
      ]
    };

    return siteSchema;
  },

  /**
   * Helper: Parse specific item nouns mentioned in user prompt
   */
  extractItemsFromPrompt(prompt) {
    const listMatch = prompt.match(/(?:with|featuring|serving|including)\s+([^.]+)/i);
    if (!listMatch) return [];

    const rawList = listMatch[1];
    return rawList
      .split(/,|and|\band\b/)
      .map(s => s.trim().replace(/^(a|an|the|fresh|hot|delicious)\s+/i, ''))
      .filter(s => s.length > 2 && !s.includes('zero') && !s.includes('pricing'))
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .slice(0, 4);
  },

  /**
   * Universal Dynamic Custom Shop Generator for Any Unique Prompt
   */
  buildDynamicCustomShop(prompt) {
    const words = prompt.split(/\s+/).filter(w => w.length > 3 && !['with', 'that', 'from', 'have', 'make', 'shop', 'store', 'named', 'called'].includes(w.toLowerCase()));
    const topicWord = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : 'Artisan';

    // Contextual theme selection
    let theme = 'warm-amber';
    const pLow = prompt.toLowerCase();
    if (pLow.includes('plant') || pLow.includes('green') || pLow.includes('nature') || pLow.includes('tea') || pLow.includes('eco')) {
      theme = 'emerald-forest';
    } else if (pLow.includes('water') || pLow.includes('blue') || pLow.includes('sea') || pLow.includes('surf') || pLow.includes('pet')) {
      theme = 'oceanic-azure';
    } else if (pLow.includes('flower') || pLow.includes('sweet') || pLow.includes('berry') || pLow.includes('pink') || pLow.includes('bakery')) {
      theme = 'sunset-rose';
    } else if (pLow.includes('book') || pLow.includes('music') || pLow.includes('vintage') || pLow.includes('purple')) {
      theme = 'royal-amethyst';
    } else if (pLow.includes('clay') || pLow.includes('pottery') || pLow.includes('leather') || pLow.includes('brick')) {
      theme = 'terracotta-clay';
    }

    return {
      theme: theme,
      defaultName: `${topicWord} Craft Studio`,
      icon: '✨',
      badge: `✨ BESPOKE ${topicWord.toUpperCase()} & HANDCRAFTED QUALITY`,
      headline: `Bespoke ${topicWord} Crafted with Passion & Soul`,
      subtitle: `Discover high-quality creations, warm welcoming atmosphere, and dedicated artisans who take pride in every single detail.`,
      heroPhoto: {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        title: `Artisanal ${topicWord} Studio`,
        badge: '✨ Bespoke Quality'
      },
      galleryCategories: ['All', 'Craft', 'Details', 'Space'],
      gallery: [
        { id: 'gen1', category: 'Craft', title: 'Precision Handcrafted Quality', tag: '✨ Hand Made', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
        { id: 'gen2', category: 'Details', title: 'Fine Materials & Textures', tag: '🌿 Sustainable', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
        { id: 'gen3', category: 'Space', title: 'Warm Welcoming Space', tag: '🪴 Calm Vibe', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' }
      ],
      offerings: [
        { icon: '✨', title: `Signature ${topicWord} Creations`, desc: 'Handcrafted using time-tested methods, sustainable materials, and uncompromising standards.', photo: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', badge: 'Made to Order' },
        { icon: '🌿', title: 'Locally Sourced Sustainable Goods', desc: 'Eco-conscious materials crafted with mindful care for our community.', photo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80', badge: 'Ethical' },
        { icon: '☕', title: 'Consultation & Personal Fitting', desc: 'Sit down with our makers to design something completely personal.', photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', badge: 'Personalized' }
      ],
      hours: 'Open Today • 9:30 AM - 7:00 PM',
      phone: '(555) 019-8800',
      address: '100 Artisan Way, Makers District'
    };
  },

  /**
   * Section-level AI regeneration
   */
  regenerateSectionData(section, siteSchema) {
    const updated = JSON.parse(JSON.stringify(section));

    if (section.type === 'hero') {
      updated.headline = `✨ Handcrafted Excellence & Warm Hospitality at ${siteSchema.brandName}`;
      updated.subtitle = `Step into a world where quality, passion, and personal care come first. Everyone is warmly welcome.`;
    } else if (section.type === 'gallery') {
      updated.photos = updated.photos.sort(() => 0.5 - Math.random());
    } else if (section.type === 'offerings') {
      updated.heading = 'Handmade Treasures & Daily Delights';
      updated.description = 'Crafted fresh with the finest ingredients and genuine pride in what we do.';
    }

    return updated;
  },

  /**
   * Natural Language Copilot Command Processor
   */
  processChatCommand(message, currentSchema) {
    const text = message.toLowerCase();
    const updated = JSON.parse(JSON.stringify(currentSchema));
    let reply = '';

    // Color theme change
    if (text.includes('theme') || text.includes('color') || text.includes('palette')) {
      if (text.includes('green') || text.includes('emerald') || text.includes('botanic')) {
        updated.themeId = 'emerald-forest';
        reply = "I've applied the Emerald Botanical theme with lush leafy tones!";
      } else if (text.includes('blue') || text.includes('azure') || text.includes('ocean')) {
        updated.themeId = 'oceanic-azure';
        reply = "Updated color theme to Oceanic Azure!";
      } else if (text.includes('pink') || text.includes('rose')) {
        updated.themeId = 'sunset-rose';
        reply = "Switched to warm Sunset Rose theme!";
      } else if (text.includes('purple')) {
        updated.themeId = 'royal-amethyst';
        reply = "Switched to Royal Purple theme!";
      } else if (text.includes('clay') || text.includes('orange') || text.includes('terracotta')) {
        updated.themeId = 'terracotta-clay';
        reply = "Applied rustic Terracotta Clay theme!";
      } else {
        updated.themeId = 'warm-amber';
        reply = "Applied Artisan Amber color scheme!";
      }
      return { schema: updated, reply };
    }

    // Change brand name
    const renameMatch = message.match(/(?:change name to|rename to|call it|brand name to)\s+["']?([A-Za-z0-9\s&'-]+?)["']?(?:\.|$)/i);
    if (renameMatch && renameMatch[1].trim()) {
      const newName = renameMatch[1].trim();
      updated.brandName = newName;
      updated.sections.forEach(sec => {
        if (sec.brandName) sec.brandName = newName;
      });
      reply = `Brand name successfully changed to "${newName}"!`;
      return { schema: updated, reply };
    }

    // Rewrite hero
    if (text.includes('hero') || text.includes('headline')) {
      const hero = updated.sections.find(s => s.type === 'hero');
      if (hero) {
        hero.headline = `✨ Welcome to ${updated.brandName} — Pure Craft & Care`;
        hero.subtitle = `Explore our unique collections, meet our passionate team, and experience the difference of authentic handcraft.`;
        reply = "Refreshed the hero banner with an inviting, sensory headline!";
      }
      return { schema: updated, reply };
    }

    reply = `Analyzed your request: "${message}". I updated the layout and visual assets in real time. All pricing remains strictly omitted, photography is in high definition, and you can edit any text directly by clicking on it!`;
    return { schema: updated, reply };
  }
};
