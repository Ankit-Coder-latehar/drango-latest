export const CARS_DATA = [
  {
    id: 'thar-roxx',
    name: 'Mahindra Thar Roxx',
    badge: 'CROWN FLAGSHIP 5-DOOR',
    subtitle: 'The King of Modern SUVs • 2024-2026',
    image: '/images/car_thar_roxx_3d.jpg',
    description: 'Bespoke Maharaja gold matrix grilles, starlight headliners, heavy armour, and imperial red styling kits.',
    partsCount: 28,
  },
  {
    id: 'thar-3d',
    name: 'Mahindra Thar',
    badge: 'OFF-ROAD LEGEND',
    subtitle: 'Pure 4x4 Heritage Machine (3-Door)',
    image: '/images/car_thar_3d.jpg',
    description: 'Heavy winches, gold beadlocks, roof racks, and aggressive off-road armours.',
    partsCount: 24,
  },
  {
    id: 'jimny',
    name: 'Suzuki Jimny',
    badge: 'MINI-G WARRIOR',
    subtitle: 'Ultra Compact Mountain Conqueror',
    image: '/images/car_jimny_3d.jpg',
    description: 'Gold bumper accents, roof tents, ladder mounts, and retro heritage grilles.',
    partsCount: 18,
  },
  {
    id: 'hilux',
    name: 'Toyota Hilux',
    badge: 'INDOMITABLE 4x4',
    subtitle: 'Heavy-Duty Expedition Dual Cab',
    image: '/images/car_hilux_3d.jpg',
    description: 'TRD bash plates, heavy-duty bullbars, overland roof systems, and forged beadlocks.',
    partsCount: 22,
  },
  {
    id: 'dmax',
    name: 'Isuzu D-Max',
    badge: 'OVERLAND TROPHY',
    subtitle: 'V-Cross Adventure Trophy Truck',
    image: '/images/car_dmax_3d.jpg',
    description: 'Safari snorkels, heavy armour rock sliders, sports bars, and matrix lighting.',
    partsCount: 19,
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner',
    badge: 'IMPERIAL RULER',
    subtitle: 'Legender VIP Luxury Off-Roader',
    image: '/images/car_fortuner_3d.jpg',
    description: 'Stealth widebody aero kits, brushed gold emblems, and VIP starlight suites.',
    partsCount: 25,
  },
  {
    id: 'scorpio-n',
    name: 'Mahindra Scorpio-N',
    badge: 'ROYAL BIG DADDY',
    subtitle: 'D-Segment Dominance & Road Authority',
    image: '/images/car_scorpio_n_3d.jpg',
    description: 'Gold honeycomb grilles, adventure side awnings, and executive VIP interior trims.',
    partsCount: 21,
  },
  {
    id: 'thar-crde',
    name: 'Mahindra Thar CRDe',
    badge: 'LEGENDARY CRDe',
    subtitle: 'Classic Pure 4x4 Heritage Off-Roader',
    image: '/images/car_thar_crde_3d.jpg',
    description: 'Retro tubular steel bumpers, rooftop expedition tents, and deep-dish steelies.',
    partsCount: 16,
  },
  {
    id: 'wrangler',
    name: 'Jeep Wrangler',
    badge: 'RUBICON TRAIL',
    subtitle: 'Ultimate Trail Dominator Rubicon',
    image: '/images/car_wrangler_3d.jpg',
    description: 'Stubby rock crawler bumpers, 37" beadlock wheels, and gold Rubicon graphics.',
    partsCount: 26,
  },
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Royal Mods', icon: 'Sparkles' },
  { id: 'external', label: 'External & Armour', icon: 'Shield' },
  { id: 'internal', label: 'Internal & Starlight Cabin', icon: 'Gem' },
  { id: 'lighting', label: 'Lighting & Matrix DRLs', icon: 'Zap' },
  { id: 'alloys', label: 'Forged Alloys & Rims', icon: 'Disc' },
];

export const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'Drango Signature Gold Matrix Front Grille',
    carId: 'thar-roxx',
    category: 'external',
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviewsCount: 142,
    image: '/images/grille_roxx_gold.jpg',
    badge: 'MAHARAJA GOLD • BESTSELLER',
    isFeatured: true,
    compatibility: 'Thar ROXX 5-Door (All Trims)',
    specs: [
      '24K Look Electro-Brushed Gold Finish',
      'High-Grade ABS Material (OEM Spec)',
      'Integrated Amber DRL Mounting Points',
      'Direct Bolt-on Replacement (No Drill)'
    ],
    description: 'The defining statement for your Thar ROXX. Crafted with a majestic brushed gold 7-vertical-slot architecture and center DRANGO sculpted crest.'
  },
  {
    id: 'prod-2',
    name: 'Maharaja Rolls-Royce Starlight Ceiling & Napa Interior',
    carId: 'thar-roxx',
    category: 'internal',
    price: 34999,
    originalPrice: 42000,
    rating: 5.0,
    reviewsCount: 98,
    image: '/images/interior_roxx_starlight.jpg',
    badge: 'ULTRA LUXURY SUITE',
    isFeatured: true,
    compatibility: 'Thar ROXX 5-Door & Thar 3-Door',
    specs: [
      '650+ Optical Fiber Twinkle Stars with App Control',
      'Deep Wine-Red Italian Napa Leather Upholstery',
      'Maharaja Gold Diamond Quilting Embroidery',
      'Gold Electroplated AC Vent Bezels & Center Console'
    ],
    description: 'Transform your Thar ROXX cabin into a palace on wheels with our bespoke starlight ceiling, shooting star effect, and royal quilted leather seats.'
  },
  {
    id: 'prod-3',
    name: '20" Forged Monoblock Gold Concave Wheels (Set of 5)',
    carId: 'thar-roxx',
    category: 'alloys',
    price: 89999,
    originalPrice: 115000,
    rating: 4.9,
    reviewsCount: 76,
    image: '/images/alloys_roxx_gold.jpg',
    badge: 'FORGED PERFORMANCE',
    isFeatured: true,
    compatibility: 'Thar ROXX / Thar 3D / Scorpio-N',
    specs: [
      'Aircraft-Grade 6061-T6 Forged Aluminium',
      'Satin Royal Gold Face with Diamond Cut Rim',
      'Load Rated 1250kg per wheel for Extreme 4x4',
      'Includes Matching Full-Size 5th Spare Wheel Rim'
    ],
    description: 'Uncompromising strength meets royalty. Custom designed lightweight forged alloys engineered to handle extreme trail torque and highway dominance.'
  },
  {
    id: 'prod-4',
    name: 'Drango Stealth Aerodynamic Roof Carrier & Dual LED Bar',
    carId: 'thar-roxx',
    category: 'external',
    price: 27499,
    originalPrice: 32999,
    rating: 4.8,
    reviewsCount: 64,
    image: '/images/roofrack_roxx_gold.jpg',
    badge: 'EXPEDITION GRADE',
    isFeatured: true,
    compatibility: 'Thar ROXX 5-Door',
    specs: [
      'Aerodynamic Laser-Cut Aluminum Body',
      'Dual 42-Inch High Lumen Matrix LED Lightbars',
      'Brushed Gold Mount Brackets & ROXX Engravings',
      'Static Load Capacity: 320kg (Rooftop Tent Ready)'
    ],
    description: 'Heavy-duty expedition roof platform equipped with military-grade matte powder coating and royal gold side stanchions.'
  },
  {
    id: 'prod-5',
    name: 'Royal Gold Lion Crest Hard Spare Wheel Cover',
    carId: 'thar-roxx',
    category: 'external',
    price: 14500,
    originalPrice: 18000,
    rating: 4.9,
    reviewsCount: 110,
    image: '/images/insta_3.jpg',
    badge: 'SIGNATURE EMBLEM',
    isFeatured: false,
    compatibility: 'Thar ROXX & Thar 3-Door (Up to 33" Tyres)',
    specs: [
      'High Impact ABS Polycarbonate Shell',
      '3D Sculpted Royal Golden Lion Crest with Drango Seal',
      'Theft-Proof Keyed Lock Mechanism',
      'Integrated Reverse Camera Housing Cutout'
    ],
    description: 'Protect your fifth tyre while projecting unmistakable royal authority on the road.'
  },
  {
    id: 'prod-6',
    name: 'Halo Bi-LED Amber Matrix Headlamp System (Pair)',
    carId: 'thar-roxx',
    category: 'lighting',
    price: 21999,
    originalPrice: 28000,
    rating: 4.9,
    reviewsCount: 88,
    image: '/images/insta_2.jpg',
    badge: 'EXTREME ILLUMINATION',
    isFeatured: false,
    compatibility: 'Thar ROXX, Thar 3D & Jimny',
    specs: [
      'Dual Projector Osram LED Chips (180W Total)',
      'Royal Amber & Crystal White Switchback Rings',
      'Built-in Heat Sink & IP68 Waterproof Seal',
      'Direct Plug & Play CANBUS Harness (No Wire Splicing)'
    ],
    description: 'Razor-sharp low beam cutoff and high beam penetration that turns darkest jungle trails into broad daylight.'
  },
  {
    id: 'prod-7',
    name: 'Maharaja Edition Flat-Bottom Carbon & Gold Steering Wheel',
    carId: 'thar-roxx',
    category: 'internal',
    price: 24500,
    originalPrice: 31000,
    rating: 5.0,
    reviewsCount: 52,
    image: '/images/insta_4.jpg',
    badge: 'BESPOKE COCKPIT',
    isFeatured: false,
    compatibility: 'Thar ROXX & Scorpio-N',
    specs: [
      'Genuine Toray Gloss Carbon Fiber Top & Bottom',
      'Perforated Nappa Leather Side Grips with Gold Stitching',
      'Maharaja Edition Gold Center Band & Control Trim',
      'Preserves All OEM Airbag & Cruise Controls'
    ],
    description: 'The pinnacle of tactile luxury. Replaces factory wheel with racing geometry and gold Maharaja detailing.'
  },
  {
    id: 'prod-8',
    name: 'Quad Gold Chrome Performance Exhaust Tip Assembly',
    carId: 'thar-roxx',
    category: 'external',
    price: 12999,
    originalPrice: 16500,
    rating: 4.7,
    reviewsCount: 43,
    image: '/images/insta_3.jpg',
    badge: 'SOUND & STYLING',
    isFeatured: false,
    compatibility: 'Thar ROXX Petrol & Diesel Variants',
    specs: [
      'T304 Stainless Steel with Vacuum Gold PVD Coating',
      'Dual Staggered Twin Outlets on Both Sides',
      'Heat-Resistant Non-Fading Finish',
      'Throaty Resonated Tone Enhancement'
    ],
    description: 'Give the rear stance of your Thar ROXX an exotic quad-pipe presence with lustrous gold tips.'
  },
  // Products for other selected vehicles
  {
    id: 'prod-9',
    name: 'Thar 3D Heavy Duty Off-Road Bullbar with Gold Tow Hooks',
    carId: 'thar-3d',
    category: 'external',
    price: 23500,
    originalPrice: 29000,
    rating: 4.9,
    reviewsCount: 135,
    image: '/images/car_thar_3door.jpg',
    badge: 'ROCK CRAWLER SPEC',
    isFeatured: false,
    compatibility: 'Mahindra Thar 3-Door (2020-2026)',
    specs: [
      'Cold Rolled High-Tensile Steel 4mm Plate',
      'Dual 4.75 Ton Forged Gold Recovery Shackles',
      '12,000 lbs Winch Ready Mounting Plate',
      'Textured Black Anti-Scratch Powder Coat'
    ],
    description: 'Extreme bumper engineered for serious trail bashing and recovery operations.'
  },
  {
    id: 'prod-10',
    name: 'Scorpio-N Royal Gold Honeycomb Grille & Mirror Caps',
    carId: 'scorpio-n',
    category: 'external',
    price: 16999,
    originalPrice: 21500,
    rating: 4.8,
    reviewsCount: 57,
    image: '/images/car_scorpio_n.jpg',
    badge: 'EXECUTIVE VIP',
    isFeatured: false,
    compatibility: 'Mahindra Scorpio-N (Z8 / Z8L)',
    specs: [
      'Dual-Tone Royal Gold & Obsidian Gloss Trim',
      'Replacement Front Grille & Aerodynamic Side Mirror Covers',
      'Preserves Front Camera & ADAS Sensors',
      'OEM Snap-Lock Fitment'
    ],
    description: 'Infuse your Scorpio-N with royal VIP presence and distinguished gold accents.'
  },
  {
    id: 'prod-11',
    name: 'Jimny Retro Gold Heritage Grille & Snorkel Kit',
    carId: 'jimny',
    category: 'external',
    price: 15499,
    originalPrice: 19500,
    rating: 4.9,
    reviewsCount: 68,
    image: '/images/car_jimny.jpg',
    badge: 'MINI-G RETRO',
    isFeatured: false,
    compatibility: 'Maruti Suzuki Jimny 5-Door',
    specs: [
      'Classic Vintage Heritage Mesh in Royal Gold',
      'High-Density LLDPE Raised Air Intake Snorkel',
      'Water Wading Depth Increased by 350mm',
      'Includes Laser Cut Jimny Gold Badge'
    ],
    description: 'Transform your Jimny into an iconic retro off-road adventurer.'
  },
  {
    id: 'prod-12',
    name: 'Toyota Hilux TRD Heavy Steel Armour Bullbar & Bash Plate',
    carId: 'hilux',
    category: 'external',
    price: 36999,
    originalPrice: 45000,
    rating: 5.0,
    reviewsCount: 47,
    image: '/images/car_hilux_3d.jpg',
    badge: 'HEAVY EXPEDITION',
    isFeatured: true,
    compatibility: 'Toyota Hilux Revo / Invincible (2021-2026)',
    specs: [
      '5mm Thick Laser-Cut High Tensile Cold-Rolled Steel',
      'Dual 4.75 Ton Forged Gold D-Rings & Recovery Points',
      'Integrated Red & Gold Powder Coated TRD Skid Plate',
      'Accommodates Up to 13,500 lbs Warn Winches'
    ],
    description: 'Heavy-duty front protection for Toyota Hilux with integrated LED spotlight bar mounts and reinforced recovery eyes.'
  },
  {
    id: 'prod-13',
    name: 'Isuzu D-Max Safari Snorkel & Bed Adventure Sports Bar',
    carId: 'dmax',
    category: 'external',
    price: 28999,
    originalPrice: 35000,
    rating: 4.9,
    reviewsCount: 39,
    image: '/images/car_dmax_3d.jpg',
    badge: 'DESERT TROPHY',
    isFeatured: true,
    compatibility: 'Isuzu D-Max V-Cross / Hi-Lander',
    specs: [
      'UV-Stabilized Linear Low Density Polyethylene (LLDPE)',
      'Dual Pipe Tubular Bed Chase Rack with Auxiliary Light Mounts',
      '350mm Water Wading Capacity Extension',
      'Brushed Gold D-Max Crest Inserts'
    ],
    description: 'Ultimate desert expedition setup featuring raised air induction and heavy-duty steel rear bed adventure roll cage.'
  },
  {
    id: 'prod-14',
    name: 'Fortuner Legender Stealth Widebody Lip Kit & Gold Badges',
    carId: 'fortuner',
    category: 'external',
    price: 32500,
    originalPrice: 40000,
    rating: 4.9,
    reviewsCount: 82,
    image: '/images/car_fortuner_3d.jpg',
    badge: 'ROYAL LEGENDER VIP',
    isFeatured: true,
    compatibility: 'Toyota Fortuner & Fortuner Legender (2021-2026)',
    specs: [
      'Aerodynamic ABS Front Chin Spoiler & Rear Diffuser',
      '24K Electro-Plated Gold Toyota Crest & Fortuner Lettering',
      'Integrated Sequential Amber Strobe LED Accents',
      '100% Flush OEM Mount Points'
    ],
    description: 'Elevates your Fortuner Legender to supreme presidential street authority with aggressive aero accents and 24K gold badging.'
  },
  {
    id: 'prod-15',
    name: 'Classic Thar CRDe Retro Tubular Bullbar & iKamper Tent Rack',
    carId: 'thar-crde',
    category: 'external',
    price: 29500,
    originalPrice: 36000,
    rating: 5.0,
    reviewsCount: 91,
    image: '/images/car_thar_crde_3d.jpg',
    badge: 'VINTAGE OVERLAND',
    isFeatured: true,
    compatibility: 'Mahindra Thar CRDe / DI 4x4 (All Classic Years)',
    specs: [
      'Twin-Tube 60mm Seamless Cold-Drawn Steel Construction',
      'Heavy-Duty Roof Overland Cage Tested for 300kg Dynamic Load',
      'Universal iKamper / Rooftop Tent Clamping System',
      'Winch Cradle with 9,500 lbs Pulling Rating'
    ],
    description: 'Honoring the legendary Thar CRDe with uncompromising old-school rugged engineering and overland expedition hardware.'
  },
  {
    id: 'prod-16',
    name: 'Jeep Wrangler Rubicon 37" Rock Crawler Bumper & Beadlock Kit',
    carId: 'wrangler',
    category: 'external',
    price: 48999,
    originalPrice: 62000,
    rating: 5.0,
    reviewsCount: 64,
    image: '/images/car_wrangler_3d.jpg',
    badge: 'RUBICON TRAIL RATED',
    isFeatured: true,
    compatibility: 'Jeep Wrangler JL / Rubicon / Unlimited',
    specs: [
      'Stubby High-Clearance Rock Crawling Front Steel Bumper',
      'Real Functional Beadlock Alloy Ring in Royal Gold Finish',
      'Dual 180W Auxiliary LED Light Cannons',
      'Winch Plate with Gold Hawse Fairlead'
    ],
    description: 'Trail-tested rock crawling hardware designed for extreme approach angles, 37-inch tyres, and unstoppable boulder conquest.'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    name: 'Drango Lifestyle Review',
    location: 'Verified Article',
    vehicle: 'Mahindra Thar & Thar ROXX',
    avatar: '👑',
    rating: 5,
    title: 'Mahindra Thar Rocks: Meet the Drango Chariot Kit, Your Ultimate Luxury Upgrade',
    link: 'https://www.drango.in/post/mahindra-thar-rocks-meet-the-drango-chariot-kit-your-ultimate-luxury-upgrade',
    content: 'So, here’s the deal: the Mahindra Thar started out as this total off-road rockstar, right? It was all about getting muddy and tackling those wild trails. But these days, it’s turned into a bit of a show-off piece too—like the cool ride you take around town just to get those admiring',
    date: 'Featured Review',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Verified Customer',
    location: 'India',
    vehicle: 'Mahindra Thar Owner',
    avatar: '🦁',
    rating: 5,
    title: 'Feels Like Royal',
    content: 'I had purchased thier product and it is the best and awesime products makeing the car feels like royal',
    date: 'Verified Buyer',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Verified Customer',
    location: 'India',
    vehicle: 'Thar ROXX Owner',
    avatar: '⭐',
    rating: 5,
    title: 'Premium Quality Feels',
    content: 'Best quality products and good for the premium quality feels',
    date: 'Verified Buyer',
    verified: true
  }
];

export const INSTAGRAM_REELS = [
  {
    id: 'reel-1',
    shortcode: 'Dd8frmRTOm0',
    url: 'https://www.instagram.com/reel/Dd8frmRTOm0/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/Dd8frmRTOm0/embed',
    title: 'Drango Reel 1',
    author: '@drango.in',
  },
  {
    id: 'reel-2',
    shortcode: 'DWg6UPODLrB',
    url: 'https://www.instagram.com/reel/DWg6UPODLrB/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/DWg6UPODLrB/embed',
    title: 'Drango Reel 2',
    author: '@drango.in',
  },
  {
    id: 'reel-3',
    shortcode: 'DeONH_Szilz',
    url: 'https://www.instagram.com/reel/DeONH_Szilz/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/DeONH_Szilz/embed',
    title: 'Drango Reel 3',
    author: '@drango.in',
  },
  {
    id: 'reel-4',
    shortcode: 'DdymfOxTgfb',
    url: 'https://www.instagram.com/reel/DdymfOxTgfb/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/DdymfOxTgfb/embed',
    title: 'Drango Reel 4',
    author: '@drango.in',
  },
];

export const INSTAGRAM_POSTS = INSTAGRAM_REELS;
