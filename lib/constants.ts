// ─── Brand & Service Configuration ───────────────────────────────────────────
// Edit this file to update brand details, service areas, and pricing.

export const BRAND = {
  name: "Safe Solution",
  tagline: "Your Bin, Brilliantly Clean.",
  subtagline: "No more wincing when you lift the lid.",
  phone: "[EDIT ME: +27 XX XXX XXXX]",
  email: "[EDIT ME: hello@safesolution.co.za]",
  whatsapp: "[EDIT ME: 27XXXXXXXXXX]", // digits only, no +
  address: "[EDIT ME: Cape Town, Western Cape, South Africa]",
  instagram: "[EDIT ME: @safesolution_ct]",
  facebook: "[EDIT ME: SafeSolutionCT]",
};

export const SERVICE_SUBURBS = [
  "Constantia",
  "Claremont",
  "Kenilworth",
  "Newlands",
  "Rondebosch",
  "Bishopscourt",
  "Tokai",
  "Bergvliet",
  "Meadowridge",
  "Diep River",
  "Plumstead",
  "Wynberg",
  "Hout Bay",
  "Camps Bay",
  "Sea Point",
  "Green Point",
  "De Waterkant",
  "Gardens",
  "Observatory",
  "Pinelands",
  "Bellville",
  "Durbanville",
  "Brackenfell",
  "Kraaifontein",
  "Somerset West",
  "Strand",
  "Gordon's Bay",
  "[EDIT ME: Add more suburbs]",
];

export const PRICING_TIERS = [
  {
    id: "weekly",
    name: "Weekly",
    price: 349,
    period: "per month",
    description: "Maximum freshness, every week.",
    frequency: "Weekly clean",
    features: [
      "1 × wheelie bin per clean",
      "Hot-water pressure wash",
      "Eco-certified sanitizer",
      "Deodorizing treatment",
      "On-site service — bin stays in your yard",
      "Digital wash report",
    ],
    popular: false,
    color: "aqua",
  },
  {
    id: "biweekly",
    name: "Bi-Weekly",
    price: 229,
    period: "per month",
    description: "The sweet spot — fresh every fortnight.",
    frequency: "Every 2 weeks",
    features: [
      "1 × wheelie bin per clean",
      "Hot-water pressure wash",
      "Eco-certified sanitizer",
      "Deodorizing treatment",
      "On-site service",
      "Digital wash report",
    ],
    popular: true,
    color: "mint",
  },
  {
    id: "monthly",
    name: "Monthly",
    price: 149,
    period: "per month",
    description: "Reliable monthly reset.",
    frequency: "Once a month",
    features: [
      "1 × wheelie bin per clean",
      "Hot-water pressure wash",
      "Eco-certified sanitizer",
      "Deodorizing treatment",
      "On-site service",
    ],
    popular: false,
    color: "aqua",
  },
  {
    id: "oneoff",
    name: "One-Off",
    price: 199,
    period: "single clean",
    description: "Just need it sorted once.",
    frequency: "Single visit",
    features: [
      "1 × wheelie bin",
      "Hot-water pressure wash",
      "Eco-certified sanitizer",
      "Deodorizing treatment",
      "On-site service",
    ],
    popular: false,
    color: "aqua",
  },
];

export const COMMERCIAL_TIERS = [
  {
    id: "commercial-basic",
    name: "Commercial Basic",
    price: 799,
    period: "per month",
    bins: "Up to 4 bins",
    frequency: "Weekly",
  },
  {
    id: "commercial-standard",
    name: "Commercial Standard",
    price: 1299,
    period: "per month",
    bins: "Up to 8 bins",
    frequency: "Weekly",
  },
  {
    id: "commercial-premium",
    name: "Commercial Premium",
    price: 1899,
    period: "per month",
    bins: "Up to 16 bins",
    frequency: "Twice weekly",
  },
];

export const STATS = [
  { label: "Bins Cleaned", value: 12480, suffix: "+" },
  { label: "Happy Customers", value: 1240, suffix: "+" },
  { label: "Litres of Eco-Water Saved", value: 84000, suffix: "L+" },
  { label: "Satisfaction Rate", value: 98, suffix: "%" },
];

export const FAQS = [
  {
    question: "Do you remove the bin from my property?",
    answer:
      "Never. We clean your bin on-site so it never leaves your property. Our team brings everything needed — truck-mounted hot-water equipment, eco-certified chemicals, and waste disposal.",
  },
  {
    question: "What products do you use?",
    answer:
      "We use biodegradable, eco-certified sanitizing agents that are safe for children, pets, and the environment. No harsh bleach or harmful residue.",
  },
  {
    question: "What happens to the wastewater?",
    answer:
      "All wastewater is captured and disposed of responsibly at an approved facility — never down your drain or into the street.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "No! Just leave your bin accessible (gate unlatched or bin outside) on your scheduled day and we handle the rest. We'll send a notification when it's done.",
  },
  {
    question: "Which bin types do you clean?",
    answer:
      "We clean standard 240 L wheelie bins (recycling, general waste, garden waste). For bulk/skip bins or commercial containers, get in touch for a custom quote.",
  },
  {
    question: "Can I skip a month?",
    answer:
      "Yes. Give us 48 hours' notice and we'll pause your next scheduled clean. No penalties on active subscriptions.",
  },
  {
    question: "Is my area covered?",
    answer:
      "We currently service Cape Town and surrounding suburbs. Enter your address on the booking page to confirm coverage. We're expanding — contact us if your area isn't listed yet.",
  },
];

// System prompt for the AI assistant — update this to reflect real details
export const AI_SYSTEM_PROMPT = `You are the friendly, knowledgeable AI assistant for Safe Solution — Cape Town's premium wheelie bin washing and sanitizing service.

Brand voice: Warm, confident, slightly playful, never robotic. Think helpful neighbour who happens to be a hygiene expert.

SERVICES & PRICING (all prices in ZAR):
- Weekly subscription: R349/month (1 bin, weekly clean)
- Bi-Weekly subscription: R229/month (1 bin, every 2 weeks) — MOST POPULAR
- Monthly subscription: R149/month (1 bin, monthly clean)
- One-off clean: R199 (single visit)
- Additional bins: R79/bin per clean
- Commercial plans: from R799/month (contact for quote)

WHAT WE DO:
- On-site hot-water pressure wash (bin never leaves the property)
- Eco-certified, biodegradable sanitizing treatment
- Deodorizing treatment
- Wastewater captured and responsibly disposed of
- Digital wash report sent after each clean

SERVICE AREA: Cape Town and surrounding suburbs including Constantia, Claremont, Kenilworth, Newlands, Rondebosch, Bishopscourt, Tokai, Hout Bay, Camps Bay, Sea Point, Somerset West, and more.

POLICIES:
- 48-hour notice to skip/pause a scheduled clean
- No lock-in contracts on monthly plans
- Cancel anytime with 30 days' notice

KEY DIFFERENTIATORS:
- Eco-certified products (safe for kids and pets)
- Zero mess — all wastewater removed
- Flexible scheduling
- Fully insured, locally owned

If you can't answer a question, say so honestly and offer to connect the customer via WhatsApp (+27 [EDIT ME]) or the contact form.

Keep responses concise and friendly. When helping someone choose a plan, ask about:
1. How many bins they have
2. How often their bin gets really smelly or messy
3. Whether it's residential or commercial

Always end with a clear next step (book, get in touch, see pricing).`;
