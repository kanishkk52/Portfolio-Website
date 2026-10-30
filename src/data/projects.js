
export const projects = [
  
{
  id: "01",
  title: "A Study in Identity",
  category: "Brand Identity",
  style: "Minimal",
  year: "2026",
  description: "Visual identity & brand system",
  image: "/images/branding/study-in-identity.jpg",
  pdfUrl: "/documents/brand-guidelines.pdf",
  viewerTitle: "The NJA Case Study",
  viewerEyebrow: "THE BRAND BOOK",
  viewerDescription: "Explore the complete visual identity system.",
  featured: true,
  layout: "tall",
  placeholder: "identity",

  story: {
    label: "THE PROJECT",
    heading: "Building a cohesive identity.",
    paragraphs: [
      "Contributed to the development of NJA's brand guidelines, focusing on visual identity, typography, color consistency, and overall design aesthetics.",
      "The deliverables included stationery materials such as letterheads, envelopes, folders, notepads, notebooks, and business cards, alongside digital designs such as presentations, company profiles, website UI, social media posts, and LinkedIn banners."
    ]
  }
},

{
  id: "09",
  title: "Beyond the Board",
  category: "Event Print Designs",
  style: "Playful & Interactive",
  year: "2026",
  description: "Large-format prints and interactive designs for college events",
  image: "/images/events/coverimage.JPG", 
  featured: true,
  layout: "wide",
  placeholder: "event-print",

  story: {
    label: "EVENT DESIGN",
    heading: "Designing experiences beyond the screen.",
    paragraphs: [
      "A collection of print designs created for college events, bringing interactive games and shared experiences into the physical space.",
      "The project includes a 20 × 20 ft Snake and Ladders game, a 6 × 4 ft reflection wall, small-format game placards, and a 70 cm diameter Spin the Wheel. Each piece was designed for physical production and use during the event."
    ]
  },

  eventPrintSections: [
    {
  number: "01",
  title: "Event ID Cards & Lanyards",
  label: "EVENT IDENTITY",
  dimensions: "Volunteer identification",
  description:
    "A coordinated event identity system featuring custom-designed volunteer ID cards and branded lanyards, bringing consistency and recognition to the event team.",
  image: "/images/events/event-id-cards.png",
  type: "event-identity"
},
    
    {
      number: "02",
      title: "Snakes & Ladders",
      label: "LARGE-FORMAT PRINT",
      dimensions: "20 × 20 ft",
      description: "A life-sized Snakes and Ladders game designed for an interactive event experience.",
      image: "/images/events/snake-and-ladders.png",
      type: "snake-ladders"
    },
    {
      number: "03",
      title: "Reflection Wall",
      label: "INTERACTIVE INSTALLATION",
      dimensions: "6 × 4 ft",
      description: "A printed reflection wall created as a shared space for participants to engage and contribute.",
      image: "/images/events/reflection-wall.jpg",
      type: "reflection-wall"
    },
    {
      number: "04",
      title: "Game Placards",
      label: "SMALL-FORMAT PRINT",
      dimensions: "Various sizes",
      description: "Supporting placards designed to guide participants through the event games and activities.",
      image: "/images/events/game-placards.png",
      type: "game-placards"
    },
    {
      number: "05",
      title: "Spin the Wheel",
      label: "INTERACTIVE GAME",
      dimensions: "70 cm diameter",
      description: "A circular printed game wheel designed to bring an extra element of interaction to the event.",
      image: "/images/events/spin-the-wheel.png",
      type: "spin-wheel"
    }
  ]
},
    
{
  id: "02",
  title: "The Campus Edit",
  category: "Editorial Design",
  style: "Bauhaus",
  year: "2026",
  description:
    "College newsletter design exploring bold Bauhaus geometry, typography, and color.",
  longDescription:
    "A college newsletter design inspired by the Bauhaus movement. The visual direction combines geometric compositions, expressive typography, and a bold palette of red, mustard yellow, and warm beige to create an engaging editorial experience.",
  image: "/images/print/delve-cover.jpg",
  pdfUrl: "/documents/college-newsletter.pdf",
  viewerTitle: "Delve",
  viewerEyebrow: "COLLEGE NEWSLETTER",
  viewerDescription:
    "An editorial exploration of Bauhaus color, geometry and typography.",
  featured: true,
  layout: "wide",
  placeholder: "bauhaus",

  
story: {
  label: "EDITORIAL DESIGN",
  heading: "The Campus Edit.",
  paragraphs: [
    "A college newsletter designed around the principles of the Bauhaus movement.",
    "The visual system combines geometric compositions, expressive typography, and bold colors to present campus activities, student creativity, and editorial content in an engaging format."
  ]
}

},

  // {
  //   id: "03",
  //   title: "Good Things Inside",
  //   category: "Packaging",
  //   style: "Retro",
  //   year: "2026",
  //   description: "Packaging & visual language",
  //   image: "",
  //   featured: true,
  //   layout: "wide",
  //   placeholder: "retro",
  // },
  // {
  //   id: "04",
  //   title: "Digital Perspectives",
  //   category: "UI Design",
  //   style: "Contemporary",
  //   year: "2026",
  //   description: "Website & interface design",
  //   image: "",
  //   featured: true,
  //   layout: "tall",
  //   placeholder: "digital",
  // },
  // {
  //   id: "05",
  //   title: "The Company Edit",
  //   category: "Presentation",
  //   style: "Editorial",
  //   year: "2026",
  //   description: "Company profile & presentation",
  //   image: "",
  //   featured: true,
  //   layout: "wide",
  //   placeholder: "editorial",
  // },
  // {
  //   id: "06",
  //   title: "Objects of Everyday",
  //   category: "Stationery",
  //   style: "Minimal",
  //   year: "2026",
  //   description: "Stationery & print collateral",
  //   image: "",
  //   featured: true,
  //   layout: "wide",
  //   placeholder: "stationery",
  // },
  





];

export const categories = [
  "All Work",
  "Brand Identity",
  "Logo Design",
  "UI Design",
  "Packaging",
  "Print Design",
  "Event Print Designs",
  "Stationery",
  "Presentation",
  "Other",
];
