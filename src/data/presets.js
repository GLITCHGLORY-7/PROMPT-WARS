/**
 * High-grade intelligent celebration & event templates.
 * Provides instant rich generative responses and acts as reliable fallback
 * or baseline for Gemini API calls.
 */

export const PRESET_EVENTS = {
  wedding: {
    title: "Celestial Royal Gala",
    subtitle: "A regal, ethereal union enveloped in moonlit violet and champagne radiance",
    theme: {
      name: "Nocturne & Champagne Silk",
      vibe: "Opulent, romantic, timeless & cinematic",
      colorPalette: [
        { name: "Royal Amethyst", hex: "#4C1D95", role: "Primary draping & floral accents" },
        { name: "Champagne Lumina", hex: "#FDE68A", role: "Lighting, cutlery & stationery" },
        { name: "Deep Obsidian Slate", hex: "#0F172A", role: "Suits, table runner baseline" },
        { name: "Moonlit Rose", hex: "#FDA4AF", role: "Floral highlights & bride bouquet" },
        { name: "Warm Gold Foil", hex: "#F59E0B", role: "Printed motifs & seal" }
      ],
      decorStyle: "Archways cascading with wisteria, fairy-light canopies, mirrored aisle runway, candelabra centerpieces with scented damask rose.",
      musicAtmosphere: "Acoustic strings transitioning into deep jazz lounge, followed by celebratory orchestral pop crescendo.",
      dressCodePrompt: "Black-Tie with jewel-tone royal accents (Deep amethyst, emerald or midnight navy)."
    },
    budgetBreakdown: [
      { id: "b1", category: "Venue & Architectural Staging", percentage: 40, allocated: 0, spent: 0, icon: "Building2", notes: "Ballroom, lawn gazebo & bridal suite booking" },
      { id: "b2", category: "Gourmet Catering & Mixology", percentage: 28, allocated: 0, spent: 0, icon: "Utensils", notes: "5-course curated tasting menu, artisan cocktail bar" },
      { id: "b3", category: "Floral, Lighting & Decor Scenography", percentage: 14, allocated: 0, spent: 0, icon: "Sparkles", notes: "Live floral arches, ambient ambient pin-spots" },
      { id: "b4", category: "Cinematography & Editorial Photography", percentage: 10, allocated: 0, spent: 0, icon: "Camera", notes: "Drone footage, 35mm candid captures & album" },
      { id: "b5", category: "Live Band & Sonic Entertainment", percentage: 5, allocated: 0, spent: 0, icon: "Music", notes: "Quartet for walk-in, live 6-piece band for reception" },
      { id: "b6", category: "Contingency & Host Hospitality", percentage: 3, allocated: 0, spent: 0, icon: "ShieldCheck", notes: "Emergency reserve & concierge amenities" }
    ],
    timeline: [
      { id: "t1", phase: "3 to 6 Months Out", task: "Lock prime venue & sign master contract", deadline: "120 days prior", priority: "High", completed: false, category: "Venue" },
      { id: "t2", phase: "2 Months Out", task: "Curate tasting menu and confirm bespoke wine pairing", deadline: "60 days prior", priority: "High", completed: false, category: "Catering" },
      { id: "t3", phase: "1 Month Out", task: "Dispatch digital RSVP invitations with bespoke attire guide", deadline: "30 days prior", priority: "Medium", completed: false, category: "Guests" },
      { id: "t4", phase: "2 Weeks Out", task: "Finalize minute-by-minute order of events & sound checks", deadline: "14 days prior", priority: "High", completed: false, category: "Coordination" },
      { id: "t5", phase: "48 Hours Out", task: "Walkthrough rehearsal dinner & vendor access permits", deadline: "2 days prior", priority: "Urgent", completed: false, category: "Logistics" },
      { id: "t6", phase: "Day of Event", task: "Morning bridal suite breakfast & champagne toast rollout", deadline: "0 days", priority: "Urgent", completed: false, category: "Milestone" }
    ],
    vendors: [
      { id: "v1", name: "Grand Palais Regency & Gardens", category: "Venue", status: "In Discussion", budgetEstimate: 0, contact: "concierge@grandpalais.luxury", notes: "Includes valet & security permits" },
      { id: "v2", name: "Artisan Culinary Atelier", category: "Catering", status: "Not Started", budgetEstimate: 0, contact: "events@ateliergastronomy.com", notes: "Chef tasting session pending" },
      { id: "v3", name: "Velvet & Petal Floral Design", category: "Floral & Decor", status: "Not Started", budgetEstimate: 0, contact: "hello@velvetpetal.co", notes: "Requires floor plan schematics" },
      { id: "v4", name: "Lumina Cinematic Studios", category: "Photography", status: "Booked", budgetEstimate: 0, contact: "studio@luminacinema.io", notes: "Contract signed, deposit paid" },
      { id: "v5", name: "The Silverline Jazz Collective", category: "Entertainment", status: "Not Started", budgetEstimate: 0, contact: "booking@silverlinejazz.com", notes: "Needs stage power riders" }
    ]
  },
  birthday: {
    title: "Golden Horizon Milestone Soirée",
    subtitle: "A luminous, chic rooftop evening commemorating another exceptional year",
    theme: {
      name: "Metropolitan Gold & Velvet Twilight",
      vibe: "Electric, stylish, intimate yet high-energy",
      colorPalette: [
        { name: "Sunset Amber", hex: "#D97706", role: "Accent candle lights & neons" },
        { name: "Deep Indigo", hex: "#1E1B4B", role: "Rooftop canopy & table linens" },
        { name: "Gleaming Champagne", hex: "#FDE68A", role: "Tiered cake trims & champagne towers" },
        { name: "Smoked Platinum", hex: "#E2E8F0", role: "Minimalist seating accents" }
      ],
      decorStyle: "Warm filament bulbs, mirror-finish bar counter, custom neon motto sign, velvet lounge pods.",
      musicAtmosphere: "Melodic deep house shifting to throwback vinyl anthems as night deepens.",
      dressCodePrompt: "Cocktail Chic with gilded accessories."
    },
    budgetBreakdown: [
      { id: "b1", category: "Rooftop Lounge / Private Space", percentage: 35, allocated: 0, spent: 0, icon: "Building2", notes: "Exclusive terrace buyout" },
      { id: "b2", category: "Signature Cocktails & Heavy Hors d’oeuvres", percentage: 32, allocated: 0, spent: 0, icon: "Utensils", notes: "Passed sliders, sushi counter, open bar" },
      { id: "b3", category: "Custom Cake & Dessert Bar", percentage: 8, allocated: 0, spent: 0, icon: "Sparkles", notes: "3-tier sculpture cake with fireworks sparklers" },
      { id: "b4", category: "DJ Sound Rig & Custom Neon Staging", percentage: 15, allocated: 0, spent: 0, icon: "Music", notes: "Pioneer DJ deck & atmospheric lights" },
      { id: "b5", category: "Flash Content Creator & Polaroids", percentage: 10, allocated: 0, spent: 0, icon: "Camera", notes: "Live reels creator + guest polaroid guestbook" }
    ],
    timeline: [
      { id: "t1", phase: "4 Weeks Out", task: "Lock venue deposit & secure date exclusivity", deadline: "30 days prior", priority: "High", completed: false, category: "Venue" },
      { id: "t2", phase: "3 Weeks Out", task: "Send digital passes with Spotify collaborative playlist link", deadline: "21 days prior", priority: "Medium", completed: false, category: "Invites" },
      { id: "t3", phase: "2 Weeks Out", task: "Finalize customized birthday cake sculpture design", deadline: "14 days prior", priority: "Medium", completed: false, category: "Dessert" },
      { id: "t4", phase: "3 Days Out", task: "Confirm final guest count with head bartender", deadline: "3 days prior", priority: "High", completed: false, category: "Catering" },
      { id: "t5", phase: "Night Of", task: "Arrival cocktail hour begins at 7:30 PM sharp", deadline: "0 days", priority: "Urgent", completed: false, category: "Party" }
    ],
    vendors: [
      { id: "v1", name: "Skylight Penthouse Terrace", category: "Venue", status: "In Discussion", budgetEstimate: 0, contact: "events@skylightpenthouse.com", notes: "Rain-cover retractable awning verified" },
      { id: "v2", name: "Craft & Barrel Mixology", category: "Bar & Drinks", status: "Not Started", budgetEstimate: 0, contact: "info@craftandbarrel.com", notes: "Custom signature cocktail menu" },
      { id: "v3", name: "DJ Dash Electronic Collective", category: "DJ & Audio", status: "In Discussion", budgetEstimate: 0, contact: "dash@beatsmgmt.io", notes: "Subwoofer & lighting gear included" },
      { id: "v4", name: "Velvet Crust Cake Artistry", category: "Cake", status: "Not Started", budgetEstimate: 0, contact: "orders@velvetcrust.com", notes: "Gluten-free layer requested" }
    ]
  },
  corporate: {
    title: "Apex Innovation Summit & Gala",
    subtitle: "A premier executive symposium blending thought leadership with grand evening networking",
    theme: {
      name: "Hyper-Modern Luminary Slate",
      vibe: "Visionary, polished, prestigious & seamless",
      colorPalette: [
        { name: "Obsidian Void", hex: "#09090B", role: "Stage backdrops & LED panels" },
        { name: "Electric Violet", hex: "#7C3AED", role: "Keynote lighting & badge ribbons" },
        { name: "Cyan Spark", hex: "#06B6D4", role: "Tech display outlines & app accents" },
        { name: "Titanium Silver", hex: "#CBD5E1", role: "Podium & executive collateral" }
      ],
      decorStyle: "Seamless curved LED walls, geometric stage architecture, minimalist leather lounge seating.",
      musicAtmosphere: "Ambient synth soundscapes during breaks, dynamic orchestral fanfare for awards.",
      dressCodePrompt: "Executive Business Formal / Modern Black-Tie."
    },
    budgetBreakdown: [
      { id: "b1", category: "Convention Auditorium & VIP Lounges", percentage: 38, allocated: 0, spent: 0, icon: "Building2", notes: "Includes breakout executive suites" },
      { id: "b2", category: "Audio-Visual, LED Walls & Live Broadcast", percentage: 25, allocated: 0, spent: 0, icon: "Sparkles", notes: "4K live stream rig & multi-cam production" },
      { id: "b3", category: "Executive Dining, Coffee Bars & Gala Dinner", percentage: 22, allocated: 0, spent: 0, icon: "Utensils", notes: "All-day barista station & sit-down gala" },
      { id: "b4", category: "Keynote Honorariums & MC Talent", percentage: 10, allocated: 0, spent: 0, icon: "Music", notes: "Industry guest speaker & professional anchor" },
      { id: "b5", category: "Executive Welcome Kits & Badges", percentage: 5, allocated: 0, spent: 0, icon: "ShieldCheck", notes: "NFC smart badges & branded luxury leather folios" }
    ],
    timeline: [
      { id: "t1", phase: "8 Weeks Out", task: "Contract convention facility & block hotel room inventory", deadline: "60 days prior", priority: "High", completed: false, category: "Venue" },
      { id: "t2", phase: "6 Weeks Out", task: "Finalize keynote agenda & tech demo dry-runs", deadline: "42 days prior", priority: "High", completed: false, category: "Content" },
      { id: "t3", phase: "3 Weeks Out", task: "Review AV tech rider: 4K LED displays & simultaneous translation", deadline: "21 days prior", priority: "High", completed: false, category: "AV Rig" },
      { id: "t4", phase: "1 Week Out", task: "Lock registered delegate lists & print VIP credentials", deadline: "7 days prior", priority: "Medium", completed: false, category: "Registration" },
      { id: "t5", phase: "Day Of (07:00 AM)", task: "AV system rehearsal, wireless mic frequency sweep & badge check-in", deadline: "0 days", priority: "Urgent", completed: false, category: "Execution" }
    ],
    vendors: [
      { id: "v1", name: "Metropolitan Convention Center", category: "Venue", status: "Booked", budgetEstimate: 0, contact: "sales@metrocenter.org", notes: "Hall A + Breakout B & C reserved" },
      { id: "v2", name: "ProMedia Global AV & Staging", category: "Production", status: "In Discussion", budgetEstimate: 0, contact: "tech@promediaglobal.com", notes: "Includes audio engineers" },
      { id: "v3", name: "Four Seasons Executive Banquets", category: "Catering", status: "In Discussion", budgetEstimate: 0, contact: "banquets@fourseasons.com", notes: "Dietary restrictions accounted for" }
    ]
  },
  community: {
    title: "Harmony Eco-Carnival & Cultural Festival",
    subtitle: "A vibrant, open-air celebration uniting community, arts, artisan food & local music",
    theme: {
      name: "Bohemian Emerald & Sunburst Gold",
      vibe: "Warm, inclusive, joyous & celebratory",
      colorPalette: [
        { name: "Forest Emerald", hex: "#065F46", role: "Eco-canopies & signage" },
        { name: "Sunburst Marigold", hex: "#F59E0B", role: "Ribbons, flags & stage florals" },
        { name: "Terracotta Earth", hex: "#B45309", role: "Pottery stalls & organic textures" },
        { name: "Crisp Cream", hex: "#FEF3C7", role: "Fair-trade cotton banners" }
      ],
      decorStyle: "Festoon string bulbs overhead, upcycled wood food kiosks, hay bale lounge clusters, vibrant botanical installations.",
      musicAtmosphere: "Folk fusion, acoustic indie ensembles, and lively brass street parade.",
      dressCodePrompt: "Festive Bohemian / Comfortable Colorful Casual."
    },
    budgetBreakdown: [
      { id: "b1", category: "Open Park / Amphitheater & Municipal Permits", percentage: 25, allocated: 0, spent: 0, icon: "Building2", notes: "City council park clearance & sanitation" },
      { id: "b2", category: "Stage Rigging, Sound & Fairground Lighting", percentage: 30, allocated: 0, spent: 0, icon: "Music", notes: "Generators, festoon strings & dual acoustic stages" },
      { id: "b3", category: "Local Artisan Stalls & Kiosk Canopies", percentage: 20, allocated: 0, spent: 0, icon: "Sparkles", notes: "30 eco-friendly bamboo stall booths" },
      { id: "b4", category: "Safety, Medical Station & Waste Management", percentage: 15, allocated: 0, spent: 0, icon: "ShieldCheck", notes: "EMT on site & zero-waste recycling sorting squad" },
      { id: "b5", category: "Promotional Street Posters & Community Swag", percentage: 10, allocated: 0, spent: 0, icon: "Camera", notes: "Seed-paper flyers & reusable tote bags" }
    ],
    timeline: [
      { id: "t1", phase: "6 Weeks Out", task: "Submit municipal public gathering permits & fire safety review", deadline: "45 days prior", priority: "High", completed: false, category: "Permits" },
      { id: "t2", phase: "4 Weeks Out", task: "Curate 30 food truck & craft vendor stall allotments", deadline: "30 days prior", priority: "High", completed: false, category: "Vendors" },
      { id: "t3", phase: "2 Weeks Out", task: "Publish musical lineup map and volunteer shift schedules", deadline: "14 days prior", priority: "Medium", completed: false, category: "Community" },
      { id: "t4", phase: "24 Hours Out", task: "Erect safety barricades, install temporary eco-toilets & test audio", deadline: "1 day prior", priority: "Urgent", completed: false, category: "Logistics" }
    ],
    vendors: [
      { id: "v1", name: "City Parks & Recreation Authority", category: "Permits/Venue", status: "Booked", budgetEstimate: 0, contact: "parks@citygov.org", notes: "Permit #PK-2026 granted" },
      { id: "v2", name: "GreenTent Sustainable Structures", category: "Canopies", status: "Not Started", budgetEstimate: 0, contact: "rentals@greentent.eco", notes: "Bamboo arches quote pending" },
      { id: "v3", name: "SolarPulse Sound Systems", category: "Audio/Stage", status: "In Discussion", budgetEstimate: 0, contact: "sound@solarpulse.org", notes: "Solar powered audio array" }
    ]
  }
};
