import aerospikeCloudImage from "@/assets/aerospike-cloud.webp";
import aerospikeVoyagerImage from "@/assets/aerospike-voyager.webp";
import eapImage from "@/assets/eap.png";
import opowerImage from "@/assets/opower.png";
import dancingCatImage from "@/assets/dancing-cat.webp";
import floraAndFrameImage from "@/assets/flora-and-frame.webp";
import triathlonImage from "@/assets/triathlon.webp";
import bibliophileImage from "@/assets/bibliophile.webp";
import lumiereImage from "@/assets/lumiere.webp";
import dreamCatcherImage from "@/assets/dreamCatcher.webp";
import llmCompareImage from "@/assets/llm-compare.webp";
import aerospikeLogo from "@/assets/logos/aerospike-mark.png";
import f5Logo from "@/assets/logos/f5-mark.png";
import oracleLogo from "@/assets/logos/oracle-mark.png";
import type { LogoKey } from "@/data/logos";

// Every contact link reads these.
export const EMAIL = "bhuvana969@gmail.com";
export const LINKEDIN = "https://linkedin.com/in/bhuvana-sri/";
export const GITHUB = "https://github.com/Bhuvana-Sri/";

export type Image = { src: string; width: number; height: number };

export type Project = {
  title: string;
  tagline: string;
  description: string;
  url: string;
  stack: string[];
  image: Image;
};

/* Shipped as part of a team, at a company. */
export const workProjects: Project[] = [
  {
    title: "Aerospike Cloud Console",
    tagline: "Database-as-a-service console at Aerospike",
    description:
      "Built and led the UI architecture of Aerospike's DBaaS platform from the first commit, with enterprise integrations for auth, billing, analytics and feature flags.",
    url: "https://aerospike.com/products/aerospike-cloud/",
    stack: ["React", "Next.js", "Redux", "i18n", "Go"],
    image: { src: aerospikeCloudImage, width: 1024, height: 650 },
  },
  {
    title: "Aerospike Voyager",
    tagline: "Desktop developer workspace at Aerospike",
    description:
      "A workspace for exploring, editing and visualizing Aerospike databases, with integrated MCP support for AI coding agents. Runs as a native desktop app or in the browser.",
    url: "https://aerospike.com/products/voyager/",
    stack: ["Wails", "Go", "React"],
    image: { src: aerospikeVoyagerImage, width: 884, height: 488 },
  },
  {
    title: "F5 Essential App Protect",
    tagline: "Web app security at F5 Networks",
    description:
      "Security-focused UI for attack analytics, mitigation and real-time monitoring.",
    url: "https://www.f5.com/",
    stack: ["React", "TypeScript", "D3", "Python"],
    image: { src: eapImage, width: 299, height: 168 },
  },
  {
    title: "Oracle Opower",
    tagline: "Utility customer engagement at Oracle",
    description:
      "Customer engagement workflows for utilities, and the payments module I built and owned.",
    url: "https://www.oracle.com/utilities/opower/",
    stack: ["React", "AngularJS", "Java"],
    image: { src: opowerImage, width: 300, height: 168 },
  },
];

/* Designed, built and shipped on my own. */
export const sideProjects: Project[] = [
  {
    title: "LLM Compare",
    tagline: "The right model for the job and the budget",
    description:
      "AI costs running over budget? Live pricing, benchmark scores and task-based recommendations to cut cost and keep performance.",
    url: "https://llm-compare-chi.vercel.app/",
    stack: ["Next.js", "OpenRouter API", "Tailwind"],
    image: { src: llmCompareImage, width: 1600, height: 635 },
  },
  {
    title: "Lumière",
    tagline: "Commissioned booking and payments platform",
    description:
      "Full-stack SaaS for an appointment-based beauty clinic: booking flow, admin dashboard, Razorpay payments and email confirmations.",
    url: "https://lumiere-phi-three.vercel.app/",
    stack: ["React", "Supabase", "Razorpay"],
    image: { src: lumiereImage, width: 1600, height: 780 },
  },
  {
    title: "Dream Catcher",
    tagline: "Your dreams as illustrated graphic novels",
    description:
      "Turns dreams into illustrated graphic novels with Claude and Gemini. Use the free tier or bring your own API key.",
    url: "https://dream-catcher-sable.vercel.app/",
    stack: ["React", "Express", "Claude", "Gemini"],
    image: { src: dreamCatcherImage, width: 1600, height: 924 },
  },
];

export type Role = {
  title: string;
  period?: string;
  summary?: string;
  highlights: string[];
};

export type Company = {
  company: string;
  logo: string;
  location: string;
  period: string;
  roles: Role[];
  stack: string[];
};

export const experience: Company[] = [
  {
    company: "Aerospike",
    logo: aerospikeLogo,
    location: "Bengaluru, IN and Mountain View, CA",
    period: "Nov 2021 - Present",
    roles: [
      {
        title: "Senior Software Engineer, Lead UI Developer",
        summary:
          "Led the DBaaS platform UI end to end from inception: architecture, design direction and technology strategy, through the product's move to the cloud on AWS and GCP.",
        highlights: [
          "First UI developer hired. Set the architecture, coding standards and best practices.",
          "Built in React and Next.js with third-party integrations for authentication, billing, analytics, charting, i18n and feature flags.",
          "Created an internal component library that cut development effort by 35%, published to Artifactory with automated versioning and releases.",
          "Built Voyager with Wails, Go and React: a database workspace with MCP support for AI coding agents.",
        ],
      },
    ],
    stack: ["React", "Next.js", "Redux", "Go", "Cursor", "Claude"],
  },
  {
    company: "F5 Networks",
    logo: f5Logo,
    location: "Hyderabad, IN",
    period: "Feb 2020 - Nov 2020",
    roles: [
      {
        title: "Software Engineer",
        summary:
          "UI for a product that protects customer websites against cyberattacks.",
        highlights: [
          "Built features for data representation, attack mitigation and security event tracking.",
          "Created real-time data visualizations that deepened the platform's analytics.",
          "Automated testing with Python, Selenium, Jest and Enzyme.",
        ],
      },
    ],
    stack: ["React", "TypeScript", "Redux", "D3", "Python"],
  },
  {
    company: "Oracle",
    logo: oracleLogo,
    location: "Hyderabad, IN",
    period: "Jan 2018 - Jan 2020",
    roles: [
      {
        title: "Application Developer",
        period: "Jun 2018 - Jan 2020",
        summary:
          "Frontend and microservices work on applications for utility consumption and analysis.",
        highlights: [
          "Won a Spot Award for building and owning the Payments module.",
          "Built new React applications and migrated code from AngularJS.",
          "Built and maintained back-end microservices in Java.",
          "Hackathons: a visual regression testing tool and an environment comparison app.",
        ],
      },
      {
        title: "Intern",
        period: "Jan 2018 - Jun 2018",
        highlights: [
          "Automated localization with scripts connecting the codebase to JIRA, GitHub and translation vendors.",
          "Built key features in AngularJS.",
        ],
      },
    ],
    stack: ["React", "AngularJS", "TypeScript", "Java"],
  },
];

export type Passion = {
  title: string;
  subtitle: string;
  description: string;
  link?: { label: string; url: string };
  image: Image;
  alt: string;
};

export const passions: Passion[] = [
  {
    title: "Triathlon Winner & Finisher",
    subtitle: "3 down, next coming up!",
    description:
      "Been overly disciplined and never a person to give up. This sport has challenged and changed me beyond words",
    image: { src: triathlonImage, width: 1600, height: 1200 },
    alt: "Bhuvana holding her trophy at the Bergman triathlon in Mysuru",
  },
  {
    title: "Volunteering at The Dancing Cat",
    subtitle: "Web Developer Volunteer",
    description:
      "I'm cat crazy and what better way to combine my skills and love for cats than volunteering at a cat shelter. Check out their website to see my contribution as a web developer.",
    link: { label: "The Dancing Cat", url: "https://www.thedancingcat.org/" },
    image: { src: dancingCatImage, width: 1600, height: 526 },
    alt: "A cat on The Dancing Cat shelter website",
  },
  {
    title: "Art",
    subtitle: "Florals, Paints and Poetry",
    description:
      "I'm whimsical and explore art in the form of poetry, paintings, flower pressing and so much more!",
    link: {
      label: "Flora and Frame",
      url: "https://flora-and-frame.vercel.app/",
    },
    image: { src: floraAndFrameImage, width: 1024, height: 447 },
    alt: "Pressed flower artwork from Flora and Frame",
  },
  {
    title: "Bibliophile",
    subtitle: "So many books, so little time",
    description:
      "Apart from keeping upto date on tech, I'm a bookworm and have lately found solace in philosophical books. Wanna discuss a book? Hit me up on Goodreads",
    link: {
      label: "Goodreads",
      url: "https://www.goodreads.com/user/show/76787074-bhuvana",
    },
    image: { src: bibliophileImage, width: 1200, height: 800 },
    alt: "A copy of The Midnight Library by Matt Haig",
  },
];

export type Tool = { name: string; logo: LogoKey };

export const stack: Tool[] = [
  { name: "React", logo: "react" },
  { name: "Next.js", logo: "nextdotjs" },
  { name: "TypeScript", logo: "typescript" },
  { name: "JavaScript", logo: "javascript" },
  { name: "Redux", logo: "redux" },
  { name: "Angular", logo: "angular" },
  { name: "Python", logo: "python" },
  { name: "Go", logo: "go" },
  { name: "Java", logo: "openjdk" },
  { name: "Node.js", logo: "nodedotjs" },
  { name: "Express", logo: "express" },
  { name: "Databases", logo: "database" },
];

export const aiTools: Tool[] = [
  { name: "Claude Code", logo: "claude" },
  { name: "Cursor", logo: "cursor" },
  { name: "Codex", logo: "openai" },
  { name: "GitHub Copilot", logo: "githubcopilot" },
];
