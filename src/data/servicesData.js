export const SERVICES = [
  // Category 1: Luxury Gel-X Extensions
  {
    id: 'gel-x-full-set-short',
    title: 'Luxury Gel-X Full Set (Short / Medium)',
    category: 'Gel-X Extensions',
    subType: 'Apres Gel-X Architecture',
    price: '$75.00',
    duration: '90 min',
    popular: true,
    description: 'Full set of soft gel extensions using authentic Aprés Gel-X tips. Includes dry e-file Russian cuticle manicure, structural sizing, application, single gel polish color, and glossy topcoat.',
    tags: ['Best Seller', 'Zero Damage', '4-5 Week Retention']
  },
  {
    id: 'gel-x-full-set-long',
    title: 'Luxury Gel-X Full Set (Long / Extra Long)',
    category: 'Gel-X Extensions',
    subType: 'Apres Gel-X Architecture',
    price: '$85.00',
    duration: '105 min',
    popular: false,
    description: 'Sculpted long or XXL Gel-X extensions tailored with reinforced apex architecture for high durability and perfect balance. Includes meticulous cuticle care and choice of shape (Almond, Coffin, Stiletto, Square).',
    tags: ['Dramatic Length', 'Reinforced Apex']
  },
  {
    id: 'gel-x-rebalance',
    title: 'Gel-X Rebalance & Fill-In',
    category: 'Gel-X Extensions',
    subType: 'Extension Maintenance',
    price: '$65.00',
    duration: '75 min',
    popular: false,
    description: 'Precision maintenance service for Gel-X sets within 3-4 weeks. Growth gap is filled, apex rebalanced with builder gel, and nails repolished.',
    tags: ['Maintenance', '3-4 Weeks']
  },

  // Category 2: Structured Gel Manicures
  {
    id: 'structured-gel-manicure',
    title: 'Structured Gel Manicure (Luminary Builder Gel)',
    category: 'Structured Gel',
    subType: 'Natural Nail Overlay',
    price: '$65.00',
    duration: '75 min',
    popular: true,
    description: 'The ultimate natural nail strengthening treatment. Uses Luminary multi-flex builder gel to build a natural apex and shield natural nails, allowing them to grow long and healthy without breakage.',
    tags: ['Nail Health', 'Natural Growth', 'No Chipping']
  },
  {
    id: 'structured-gel-fill',
    title: 'Structured Gel Rebalance & Fill',
    category: 'Structured Gel',
    subType: 'Maintenance Fill',
    price: '$55.00',
    duration: '60 min',
    popular: false,
    description: 'Regular maintenance for your structured gel overlay. Growth zone prep, e-file cuticle clean up, rebalancing of stress point, and fresh polish application.',
    tags: ['Every 3-4 Weeks', 'Cuticle Cleanse']
  },
  {
    id: 'hard-gel-overlay',
    title: 'Hard Gel Full Overlay',
    category: 'Structured Gel',
    subType: 'Hard Gel Reinforcement',
    price: '$70.00',
    duration: '80 min',
    popular: false,
    description: 'Ultra-durable non-soak hard gel overlay for clients with weak, brittle, or frequently water-exposed nails who require maximum structural rigidity.',
    tags: ['Maximum Strength', 'Rigid Armor']
  },

  // Category 3: Custom Nail Art Menu
  {
    id: 'art-french-tips',
    title: 'French Tips (Classic, Deep V, or Modern Micro)',
    category: 'Custom Nail Art',
    subType: 'Nail Art Add-On',
    price: '+$20.00',
    duration: '15 min',
    popular: true,
    description: 'Hand-painted smile lines tailored to your nail shape. Crisp white, monochrome black, pastel French, or metallic micro-lines.',
    tags: ['Timeless Chic', 'Hand-Painted']
  },
  {
    id: 'art-chrome-full',
    title: 'Chrome / Glazed Donut Finish (Full Set)',
    category: 'Custom Nail Art',
    subType: 'Nail Art Add-On',
    price: '+$15.00',
    duration: '10 min',
    popular: true,
    description: 'High-shine pearlescent Hailey Bieber glazed donut chrome, silver liquid metal, gold dust, or unicorn iridescent mirror pigment over any base.',
    tags: ['Hailey Bieber Glazed', 'High Gloss Mirror']
  },
  {
    id: 'art-3d-sculpting',
    title: '3D Sculpted Art & Character Gel (Full Set)',
    category: 'Custom Nail Art',
    subType: '3D Texture Art',
    price: '+$20.00',
    duration: '20 min',
    popular: true,
    description: 'Hand-sculpted raised 3D textures, drippy metallic liquid chrome lines, sweater knits, bubbles, and custom dimensional shapes.',
    tags: ['Dimensional Art', 'Trending Tech']
  },
  {
    id: 'art-aura-airbrush',
    title: 'Aura Nails / Airbrush Ombre',
    category: 'Custom Nail Art',
    subType: 'Airbrush Art',
    price: '+$15.00',
    duration: '15 min',
    popular: true,
    description: 'Soft blurred aura gradients and delicate airbrushed fades using professional precision nail airbrush techniques.',
    tags: ['Aura Glow', 'Soft Gradient']
  },
  {
    id: 'art-bling-charms',
    title: 'Luxury Crystals, Bling & Charms',
    category: 'Custom Nail Art',
    subType: 'Luxury Embellishment',
    price: '+$5.00 - $20.00',
    duration: '15 min',
    popular: false,
    description: 'Genuine Swarovski crystals, luxury Korean nail charms, pearls, and metallic gems securely encapsulated with builder gel.',
    tags: ['Swarovski Crystals', 'Encapsulated']
  },
  {
    id: 'art-hand-painted',
    title: 'Hand-Painted Intricate Art (Animal Print, Florals)',
    category: 'Custom Nail Art',
    subType: 'Fine Brush Art',
    price: '+$15.00',
    duration: '20 min',
    popular: false,
    description: 'Detailed hand-painted designs: tortoise shell, leopard, delicate blooming flowers, hearts, stars, and abstract fine line work.',
    tags: ['Fine Art', 'Custom Inspo']
  },

  // Category 4: Permanent Jewelry Bar
  {
    id: 'pj-bracelet-14k',
    title: '14k Gold Filled Permanent Bracelet',
    category: 'Permanent Jewelry',
    subType: 'Custom Micro-Welding',
    price: '$65.00',
    duration: '20 min',
    popular: true,
    description: 'Custom-fitted 14k gold filled chain seamlessly micro-welded onto your wrist with zero clasp. Waterproof, tarnish-resistant, and hypoallergenic.',
    tags: ['Claspless', '14k Gold Filled', 'Tarnish-Free']
  },
  {
    id: 'pj-stack-3chain-gold',
    title: 'Three-Chain Stack Permanent Bracelet (14k Gold)',
    category: 'Permanent Jewelry',
    subType: 'Multi-Chain Stack',
    price: '$145.00',
    duration: '30 min',
    popular: true,
    description: 'The signature layered look. Three delicate complementary 14k gold filled chain styles (paperclip, rope, figaro) welded together for an effortless golden stack.',
    tags: ['Signature Stack', 'Best Value']
  },
  {
    id: 'pj-anklet-gold',
    title: '14k Gold Filled Permanent Anklet',
    category: 'Permanent Jewelry',
    subType: 'Custom Micro-Welding',
    price: '$65.00',
    duration: '20 min',
    popular: false,
    description: 'A delicate permanent chain custom fitted around your ankle and micro-welded into place for continuous sparkle through beach and everyday wear.',
    tags: ['Summer Ready', 'Permanent Anklet']
  },
  {
    id: 'pj-necklace-gold',
    title: '14k Gold Filled Permanent Necklace',
    category: 'Permanent Jewelry',
    subType: 'Permanent Neck Chain',
    price: '$85.00',
    duration: '25 min',
    popular: false,
    description: 'Custom sized necklace chain micro-welded at the nape of the neck. Designed for 24/7 effortless shine without fidgeting with tangled clasps.',
    tags: ['Zero Clasp', 'Flawless Fit']
  },
  {
    id: 'pj-silver-stack',
    title: 'Sterling Silver (.925) 3-Chain Stack',
    category: 'Permanent Jewelry',
    subType: 'Sterling Silver Stack',
    price: '$135.00',
    duration: '30 min',
    popular: false,
    description: 'Premium bright .925 sterling silver three-chain welded stack. Cool tone luxury for sterling silver lovers.',
    tags: ['.925 Sterling Silver', 'Cool Tones']
  },
  {
    id: 'pj-reweld-fee',
    title: 'Permanent Jewelry Re-Weld Service',
    category: 'Permanent Jewelry',
    subType: 'Jewelry Service',
    price: '$10.00',
    duration: '10 min',
    popular: false,
    description: 'Did you need to temporarily remove your permanent chain for medical imaging (MRI) or sports? Bring your chain back to Jenna for a quick precision re-weld.',
    tags: ['Quick Re-Weld', 'Chain Repair']
  },

  // Category 5: Removals & Care
  {
    id: 'care-soak-off',
    title: 'Gentle E-File & Acetone Soak-Off',
    category: 'Removals & Care',
    subType: 'Safe Nail Removal',
    price: '$25.00',
    duration: '35 min',
    popular: false,
    description: 'Safe, non-damaging removal of Gel-X or soft gel enhancements. We debulk with ceramic bits and gently soak off without aggressive scraping or nail bed thinning.',
    tags: ['Zero Damage', 'Natural Nail Preservation']
  }
];