const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('../models/Portfolio');

dotenv.config();

const portfolioData = [
  {
    title: "Strategic Planning for Global Tech Startup",
    category: "Strategic Planning",
    client: "TechVision Global",
    year: 2024,
    image: {
      url: "/public/STORMLAB-LOGOArtboard-9.png"
    },
    tags: ["Strategy", "Planning", "Business"],
    description: "Comprehensive strategic planning initiative for a rapidly growing tech startup, creating measurable goals and complete business roadmap that resulted in 300% growth trajectory.",
    challenge: "Developing a scalable strategy that balances aggressive growth targets with sustainable business practices in a competitive market.",
    result: "Achieved 300% growth target, expanded to 5 new markets, and secured $10M Series A funding.",
    color: "rgba(147, 51, 234, 0.1)",
    featured: true,
    status: "published"
  },
  {
    title: "Social Media Revolution for Fashion Brand",
    category: "Social Media Planning",
    client: "Urban Fashion Co.",
    year: 2024,
    image: {
      url: "/public/STORMLAB-LOGOArtboard-9.png"
    },
    tags: ["Social Media", "Content", "Engagement"],
    description: "Complete social media strategy overhaul including content planning, influencer partnerships, and community management that transformed brand presence across all platforms.",
    challenge: "Breaking through social media noise and creating authentic connections with Gen Z audience while maintaining brand sophistication.",
    result: "500% increase in engagement rate, 2.5M+ new followers, and 85% boost in social commerce sales.",
    color: "rgba(59, 130, 246, 0.1)",
    featured: true,
    status: "published"
  },
  {
    title: "SEO Domination for E-Learning Platform",
    category: "SEO & Content Marketing",
    client: "LearnHub Academy",
    year: 2024,
    image: {
      url: "/public/STORMLAB-LOGOArtboard-9.png"
    },
    tags: ["SEO", "Content", "Marketing"],
    description: "Data-driven SEO strategy combined with high-quality content marketing that positioned the brand as industry thought leader and drove massive organic traffic growth.",
    challenge: "Competing with established players in saturated e-learning market while building organic visibility from scratch.",
    result: "450% increase in organic traffic, #1 rankings for 50+ keywords, and 200% boost in qualified leads.",
    color: "rgba(16, 185, 129, 0.1)",
    featured: false,
    status: "published"
  },
  {
    title: "Visual Identity for Sustainable Food Brand",
    category: "Design and Graphics",
    client: "GreenBite Foods",
    year: 2024,
    image: {
      url: "/public/STORMLAB-LOGOArtboard-9.png"
    },
    tags: ["Design", "Branding", "Graphics"],
    description: "Complete visual identity system including logo design, packaging, marketing materials, and digital assets that communicate sustainability and premium quality.",
    challenge: "Creating a visual language that appeals to eco-conscious consumers while conveying premium positioning and standing out on retail shelves.",
    result: "Award-winning design, 40% increase in brand recall, and successful launch in 500+ retail locations.",
    color: "rgba(236, 72, 153, 0.1)",
    featured: false,
    status: "published"
  },
  {
    title: "Data Intelligence for FinTech Company",
    category: "Analytics & Reporting",
    client: "SecurePay Solutions",
    year: 2024,
    image: {
      url: "/public/STORMLAB-LOGOArtboard-9.png"
    },
    tags: ["Analytics", "Data", "Reporting"],
    description: "Implementation of comprehensive analytics framework with custom dashboards, automated reporting, and actionable insights that transformed decision-making processes.",
    challenge: "Building unified analytics system across multiple data sources while ensuring data accuracy and creating actionable insights for various stakeholders.",
    result: "30% improvement in decision-making speed, 25% cost reduction through optimization, and real-time performance visibility.",
    color: "rgba(34, 197, 94, 0.1)",
    featured: false,
    status: "published"
  },
  {
    title: "Strategic Market Entry for Healthcare Tech",
    category: "Strategic Planning",
    client: "MediTech Innovations",
    year: 2023,
    image: {
      url: "/public/STORMLAB-LOGOArtboard-9.png"
    },
    tags: ["Strategy", "Healthcare", "Expansion"],
    description: "Strategic market entry plan for healthcare technology company expanding into Southeast Asia, including competitive analysis, partnership strategy, and go-to-market roadmap.",
    challenge: "Navigating complex healthcare regulations across multiple countries while establishing credibility in new markets with entrenched competitors.",
    result: "Successful entry into 3 countries, partnerships with 15+ healthcare providers, and $5M revenue in first year.",
    color: "rgba(251, 146, 60, 0.1)",
    featured: false,
    status: "published"
  }
];

const seedPortfolio = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Deleting existing portfolio data...');
    await Portfolio.deleteMany();
    console.log('Existing data deleted');

    console.log('Inserting new portfolio data...');
    const inserted = await Portfolio.insertMany(portfolioData);
    console.log(`${inserted.length} portfolio items inserted successfully`);

    console.log('\nPortfolio items:');
    inserted.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title} (${item.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding portfolio:', error);
    process.exit(1);
  }
};

seedPortfolio();