// Utility to create ISO date strings relative to today
const getRelativeDate = (daysOffset) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const INITIAL_EVENTS = [
  {
    id: "evt-hackathon-2026",
    title: "InnovateX 2026: 36-Hour National Hackathon",
    category: "Hackathon",
    date: getRelativeDate(14),
    time: "09:00 AM - 09:00 PM (36 Hrs)",
    venue: "Main Auditorium & Computing Center",
    shortDescription: "Build game-changing web, AI, and hardware prototypes in a high-energy 36-hour sprint with $5,000+ in prize pool.",
    description: "InnovateX 2026 is our flagship inter-college hackathon bringing together over 300+ visionary students, designers, and developers. Participants will build innovative solutions under themes including Generative AI, Sustainable Tech, Smart Campus, and Open Innovation. Mentors from top tech firms will be on site to provide direct guidance, code reviews, and career insights. Free meals, exclusive swag kit, certificate of participation, and internship opportunities for finalists!",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(10),
    maxParticipants: 120,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "evt-fullstack-workshop",
    title: "Modern Fullstack React & Cloud Architecture Workshop",
    category: "Workshop",
    date: getRelativeDate(5),
    time: "02:00 PM - 06:00 PM",
    venue: "Lab 304, CS Department Building",
    shortDescription: "Hands-on coding masterclass covering React 19, Tailwind CSS, Serverless deployment, and Edge performance optimization.",
    description: "Dive deep into modern frontend and serverless cloud workflows. In this interactive 4-hour workshop, you will build and deploy a production-grade web application from scratch. Key topics include component patterns, modern state management, high performance styling, and deploying on global edge networks. Laptop is required. Beginner to intermediate friendly.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(4),
    maxParticipants: 50,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "evt-ai-ml-seminar",
    title: "Next-Gen AI & LLM Systems Industry Seminar",
    category: "Seminar",
    date: getRelativeDate(8),
    time: "10:30 AM - 01:00 PM",
    venue: "Seminar Hall B, Engineering Block",
    shortDescription: "Explore large language models, agentic workflows, and the future of AI engineering with senior guest researchers.",
    description: "Join leading industry researchers for an insightful dive into cutting-edge Large Language Models, Multi-Agent architectures, and their real-world enterprise applications. The session concludes with a live Q&A panel on breaking into Machine Learning roles and AI safety research.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(7),
    maxParticipants: 80,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "evt-speed-coding",
    title: "CodeSprint: Speed Algorithm Challenge",
    category: "Competition",
    date: getRelativeDate(18),
    time: "03:00 PM - 06:00 PM",
    venue: "Online / Coding Lab 101",
    shortDescription: "Test your algorithmic problem-solving speed across data structures, dynamic programming, and logic puzzles.",
    description: "Compete against the sharpest minds in college in a timed 3-round algorithmic showdown. Problems range from beginner logic challenges to advanced graph and DP puzzles. Top 3 scorers win cash prizes, medals, and direct referrals to upcoming recruitment drives.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(16),
    maxParticipants: 75,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "evt-startup-talk",
    title: "From College Project to Funded Startup: Founders' Talk",
    category: "Seminar",
    date: getRelativeDate(22),
    time: "04:00 PM - 06:30 PM",
    venue: "Innovation Center Amphitheatre",
    shortDescription: "Alumni founders share their journey of building venture-backed tech startups straight out of university.",
    description: "Learn what it takes to validate ideas, build an MVP, find your first 1,000 users, and pitch to seed angel investors. Includes an open pitch deck review session where student teams can get live feedback on their early venture ideas.",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(20),
    maxParticipants: 100,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "evt-cultural-night",
    title: "Symphony & Beats: Annual Campus Cultural Fiesta",
    category: "Cultural",
    date: getRelativeDate(28),
    time: "06:00 PM - 10:30 PM",
    venue: "Open Air Theatre (OAT)",
    shortDescription: "An electrifying evening of live music bands, acoustic jams, dance troupes, and visual arts performances.",
    description: "Celebrate the creative spirit of our college community! The night features 8 student bands, hip-hop & contemporary dance battles, live digital painting exhibitions, and delicious food stalls hosted by campus student clubs.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(26),
    maxParticipants: 250,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "evt-sports-meet",
    title: "Inter-Department Esports & Futsal Championship",
    category: "Sports",
    date: getRelativeDate(35),
    time: "09:00 AM - 05:00 PM",
    venue: "University Sports Arena & Gaming Lounge",
    shortDescription: "Multi-discipline sports tournament featuring 5v5 Futsal, Table Tennis, and Valorant / FIFA gaming brackets.",
    description: "Rep your department and compete for the prestigious Annual Sports Cup. Both physical sports (Futsal, Badminton, TT) and competitive Esports tournaments will run concurrently with live commentary and streaming on club channels.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(30),
    maxParticipants: 150,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "evt-past-git-workshop",
    title: "Open Source Git & GitHub Essentials Masterclass",
    category: "Technical",
    date: getRelativeDate(-12),
    time: "02:00 PM - 05:00 PM",
    venue: "Central Seminar Hall",
    shortDescription: "Complete guide to Git branches, pull requests, resolving merge conflicts, and contributing to Open Source.",
    description: "A comprehensive past workshop where 60+ students learned version control fundamentals, git rebase/merge, GitHub Actions CI/CD workflows, and made their very first open-source contributions to real repositories.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    registrationDeadline: getRelativeDate(-14),
    maxParticipants: 60,
    isFeatured: false,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString()
  }
];

export const INITIAL_REGISTRATIONS = [
  {
    id: "reg-demo-1",
    eventId: "evt-hackathon-2026",
    name: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    college: "Institute of Engineering & Technology",
    year: "3rd Year",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    studentId: "CSE-2023-042",
    registeredAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "reg-demo-2",
    eventId: "evt-hackathon-2026",
    name: "Priya Patel",
    email: "priya.patel@techuniv.ac.in",
    college: "Tech University",
    year: "4th Year",
    phone: "+91 98123 45678",
    department: "Information Technology",
    studentId: "IT-2022-108",
    registeredAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "reg-demo-3",
    eventId: "evt-fullstack-workshop",
    name: "Rohan Verma",
    email: "rohan.v@college.edu",
    college: "Institute of Engineering & Technology",
    year: "2nd Year",
    phone: "+91 97654 32109",
    department: "Electronics & Communication",
    studentId: "ECE-2024-019",
    registeredAt: new Date(Date.now() - 3 * 86400000).toISOString()
  }
];
