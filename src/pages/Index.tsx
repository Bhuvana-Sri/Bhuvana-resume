import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import aerospikeCloudImage from "@/assets/aerospike-cloud.png";
import aerospikeVoyagerImage from "@/assets/aerospike-voyager.png";
import eapImage from "@/assets/eap.png";
import opowerImage from "@/assets/opower.png";
import dancingCatImage from "@/assets/dancing-cat.png";
import floraAndFrameImage from "@/assets/flora-and-frame.png";
import triathlonImage from "@/assets/triathlon.png";
import bibliophileImage from "@/assets/bibliophile.png";
import lumiereImage from "@/assets/lumiere.png";
import dreamCatcherImage from "@/assets/dreamCatcher.png";
import llmCompareImage from "@/assets/llm-compare.png";

import {
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Github,
  Heart,
  Trophy,
  Palette,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Starfield Background ─── */
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: {
      x: number;
      y: number;
      r: number;
      speed: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = canvas.height;
          s.x = Math.random() * canvas.width;
        }
        s.opacity += (Math.random() - 0.5) * 0.02;
        s.opacity = Math.max(0.1, Math.min(0.7, s.opacity));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(215, 90%, 71%, ${s.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

/* ─── Magnetic Button ─── */
const MagneticButton = ({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

/* ─── NavBar ─── */
const NavBar = () => (
  <motion.nav
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="fixed top-0 left-0 right-0 z-50 glass-card px-6 py-4"
  >
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex gap-6 font-body text-sm tracking-wide">
        {["Projects", "Experience", "Outside Work"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 story-link"
          >
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://linkedin.com/in/bhuvana-sri/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-highlight transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="https://github.com/Bhuvana-Sri/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-highlight transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github size={16} />
        </a>
      </div>
    </div>
  </motion.nav>
);

/* ─── Hero ─── */
const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Parallax floating shapes */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 gap-8"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-secondary font-body text-lg tracking-widest "
          >
            Frontend focused Fullstack dev
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display text-5xl md:text-7xl font-bold leading-tight"
          >
            <span className="gradient-text">Bhuvana</span>
            <br />
            <span className="text-foreground">Sundaram</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground font-body text-lg max-w-lg mx-auto leading-relaxed"
          >
            Architecting scalable, high-performance systems with 8+ years of
            expertise in modern technologies.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex gap-4 flex-wrap justify-center"
          >
            <MagneticButton
              href="https://linkedin.com/in/bhuvana-sri/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold hover:brightness-110"
            >
              <Linkedin size={18} /> LinkedIn
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Bhuvana-Sri/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold hover:brightness-110"
            >
              <Github size={18} /> GitHub
            </MagneticButton>
            <MagneticButton
              href="mailto:bsundaram@aerospike.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-body font-semibold hover:bg-muted"
            >
              <Mail size={18} /> Get in Touch
            </MagneticButton>
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex gap-4 text-muted-foreground text-sm font-body justify-center"
          >
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Bengaluru, India
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── Projects ─── */
type Project = {
  title: string;
  description: string;
  url: string;
  tech?: string[];
  image?: string;
};

const professionalProjects: Project[] = [
  {
    title: "Aerospike Cloud Console",
    description:
      "Built and led the UI architecture for a DBaaS platform with enterprise-grade integrations.",
    url: "https://aerospike.com/products/aerospike-cloud/",
    image: aerospikeCloudImage,
  },
  {
    title: "Aerospike Voyager",
    description:
      "Coded a Desktop developer workspace tool for exploring, editing, and visualizing Aerospike databases with integrated MCP support.",
    url: "https://aerospike.com/products/voyager/",
    image: aerospikeVoyagerImage,
  },
  {
    title: "F5 Essential App Protect",
    description:
      "Delivered security-focused UI experiences for attack analytics, mitigation, and monitoring.",
    url: "https://www.f5.com/",
    image: eapImage,
  },
  {
    title: "Oracle Opower",
    description:
      "Developed customer engagement workflows and payments modules.",
    url: "https://www.oracle.com/utilities/opower/",
    image: opowerImage,
  },
];

const personalProjects: Project[] = [
  {
    title: "LLM Compare",
    description:
      "AI costs exceeding budget? Here's a real time of comparison LLMs — live pricing, benchmark scores, and task-based recommendations to optimise cost and maximise performance",
    url: "https://llm-compare-chi.vercel.app/",
    tech: ["OpenRouter API", "React", "NextJS", "Tailwind"],
    image: llmCompareImage,
  },
  {
    title: "Lumière — Booking + Payment Beauty Clinic Platform",
    description:
      "Comissioned full-stack SaaS booking and payment platform for appointment-based services. Features a Booking interface, Admin dashboard, Payment processing, and Email confirmations.",
    url: "https://lumiere-phi-three.vercel.app/",
    tech: ["React", "Razorpay", "Supabase", "Tailwind"],
    image: lumiereImage,
  },
  {
    title: "Dream catcher",
    description:
      "Turn your dreams into illustrated graphic novels with Claude & Gemini integrations. Use free tier or bring your own api key",
    url: "https://dream-catcher-sable.vercel.app/",
    tech: ["Claude & Gemini", "React", "Tailwind", "Vite", "ExpressJS"],
    image: dreamCatcherImage,
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <a
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className="glass-card rounded-2xl overflow-hidden border border-border/60 hover:border-secondary/40 transition-all duration-300 block group"
  >
    <div className="h-40 bg-muted/20">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground font-body bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10">
          Image placeholder (I will add my own)
        </div>
      )}
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {project.title}
        </h3>
        <ExternalLink
          size={16}
          className="text-secondary mt-1 shrink-0 group-hover:text-accent transition-colors"
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-body">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech?.map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-body"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </a>
);

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<"professional" | "personal">(
    "professional",
  );
  const activeProjects =
    activeTab === "professional" ? professionalProjects : personalProjects;

  return (
    <section id="projects" className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full text-center font-display text-4xl md:text-5xl font-bold gradient-text mb-4 pb-2"
        >
          Projects
        </motion.h2>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "professional" | "personal")
          }
          className="mb-10"
        >
          <div className="flex items-center justify-center">
            <TabsList className="bg-transparent p-0 h-auto rounded-none border-0 shadow-none border-b border-border/50">
              <TabsTrigger
                value="professional"
                className="px-8 py-3 rounded-none border-b-2 border-transparent font-body text-base text-muted-foreground data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:bg-transparent hover:text-foreground"
              >
                Professional
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className="px-8 py-3 rounded-none border-b-2 border-transparent font-body text-base text-muted-foreground data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:bg-transparent hover:text-foreground"
              >
                Personal
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div
          className={`grid md:grid-cols-2 ${activeTab === "professional" ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6`}
        >
          {activeProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Experience ─── */
const experiences = [
  {
    title: "Senior Software Engineer — Lead UI Developer",
    company: "Aerospike",
    location: "Bengaluru, India & Mountain View, CA",
    period: "Nov 2021 – Present",
    description:
      "As the Lead UI Developer for the DBaaS platform, led the end-to-end development from inception — defining architecture, driving design, technology strategy, and contributing to the product’s successful transition to the cloud and connection via AWS and GCP.",
    highlights: [
      "First UI developer hired and was responsible for architecting, setting various coding standards and best practices",
      "Developed seamlessly in React and Next.js, incorporating several 3rd-party integrations for Authentication, Billing, Analytics, Charting, i18n, Feature flags etc",
      "Developed an internal component library that reduced development effort by 35%, with seamless integration to the publishing Artifactory for automated versioning, release, and consumption",
      "Built Voyager, a developer workspace for exploring, creating, editing, and visualizing Aerospike databases with integrated MCP support for AI coding agents. Built with Wails, Go and React, it runs as a native desktop app or web browser",
    ],
    skills: [
      "AI: Cursor & Claude",
      "3rd party Integrations",
      "Architecting",
      "Performance",
      "Scalability",
      "React",
      "Next.js",
      "Redux",
      "GO",
    ],
  },
  {
    title: "Software Engineer",
    company: "F5 Networks",
    location: "Hyderabad, India",
    period: "Feb 2020 – Nov 2020",
    description:
      "Contributed to UI development aimed at fortifying customer websites against cyberattacks, enhancing security and user trust.",
    highlights: [
      "Developed sophisticated UI features for data representation, attack mitigation, and security event tracking using React",
      "Created advanced real-time graphical data visualizations, elevating the analytical capabilities of the platform",
      "Implemented automated testing utilizing Python, Selenium, Jest and Enzyme",
    ],
    skills: ["React", "Typescript", "Redux", "D3", "Python", "CI/CD"],
  },
  {
    title: "Application Developer",
    company: "Oracle",
    location: "Hyderabad, India",
    period: "Jun 2018 – Jan 2020",
    description:
      "Played a key role in the Frontend and Microservices teams, developing comprehensive applications for utility consumption and analysis.",
    highlights: [
      "Won 'Spot Award' for building and owning the Payments module",
      "Developed new applications in React in addition to migrating code from AngularJS",
      "Developed and maintained back-end microservices in Java",
      "Showcased technical creativity by participating in multiple Hackathons, building Visual Regression Testing (VRT) tools and Apps for Environment comparison",
    ],
    skills: [
      "React",
      "AngularJS",
      "Typescript",
      "Redux",
      "Microservices",
      "Java",
    ],
  },
  {
    title: "Intern",
    company: "Oracle",
    location: "Hyderabad, India",
    period: "Jan 2018 – Jun 2018",
    description: "",
    highlights: [
      "Automated the entire Localization process using scripts to integrate the codebase with JIRA, Github, and Translation vendors",
      "Developed key features using AngularJS",
    ],
    skills: ["AngularJS", "CI/CD"],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="relative py-16 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="w-full text-center font-display text-4xl md:text-5xl font-bold gradient-text mb-10 pb-2"
      >
        Experience
      </motion.h2>

      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px timeline-line hidden md:block" />
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
              className="relative grid md:grid-cols-2 gap-8 items-start"
            >
              <div
                className={`hidden md:block absolute top-7 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent glow-accent`}
              />
              <div
                className={i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}
              >
                <div className="glass-card rounded-xl p-6 hover:border-secondary/30 transition-all duration-500 group">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-secondary font-body font-medium">
                        {exp.company} — {exp.location}
                      </p>
                    </div>
                    <span className="text-accent font-body text-sm font-semibold whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-muted-foreground font-body text-sm mb-3 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                  <ul className="space-y-2 mt-2">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="text-muted-foreground font-body text-sm flex gap-2"
                      >
                        <span className="text-accent shrink-0 mt-[2px] leading-[1.25rem]">
                          ▸
                        </span>
                        <span className="leading-[1.25rem]">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-body font-medium bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-foreground transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── Outside Work ─── */
type Passion = {
  title: string;
  subtitle: string;
  description: string;
  link?: string;
  icon: LucideIcon;
  imagePlaceholder: string;
  image?: string;
};

const passions: Passion[] = [
  {
    title: "Volunteering at The Dancing Cat",
    subtitle: "Web Developer Volunteer",
    description:
      "I'm cat crazy and what better way to combine my skills and love for cats than volunteering at a cat shelter. Check out their website to see my contribution as a web developer.",
    link: "https://www.thedancingcat.org/",
    icon: Heart,
    imagePlaceholder: "Cat shelter volunteering image",
    image: dancingCatImage,
  },
  {
    title: "Triathlon Winner & Finisher",
    subtitle: "2 down, next coming up!",
    description:
      "Been overly disciplined and never a person to give up. This sport has challenged and changed me beyond words",
    icon: Trophy,
    imagePlaceholder: "Triathlon finish line image",
    image: triathlonImage,
  },
  {
    title: "Art",
    subtitle: "Florals, Paints and Poetry",
    description:
      "I'm whimsical and explore art in the form of poetry, paintings, flower pressing and so much more!",
    link: "https://flora-and-frame.vercel.app/",
    icon: Palette,
    imagePlaceholder: "Pressed flower artwork image",
    image: floraAndFrameImage,
  },
  {
    title: "Bibliophile",
    subtitle: "So many books, so little time",
    description:
      "Apart from keeping upto date on tech, I'm a bookworm and have lately found solace in philosophical books. Wanna discuss a book? Hit me up on Goodreads ",
    link: "https://www.goodreads.com/user/show/76787074-bhuvana",
    icon: Palette,
    imagePlaceholder: "Pressed flower artwork image",
    image: bibliophileImage,
  },
];

const OutsideWorkSection = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveIndex(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setIsAutoPlayEnabled(true);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!carouselApi || !isAutoPlayEnabled || !isInView) return;
    const intervalId = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 8000);
    return () => window.clearInterval(intervalId);
  }, [carouselApi, isAutoPlayEnabled, isInView]);

  const handleManualNav = (direction: "prev" | "next") => {
    if (!carouselApi) return;
    setIsAutoPlayEnabled(false);
    if (direction === "prev") carouselApi.scrollPrev();
    else carouselApi.scrollNext();
  };

  const handleDotClick = (index: number) => {
    if (!carouselApi) return;
    carouselApi.scrollTo(index);
  };

  return (
    <section id="outside-work" className="py-16 px-6 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full text-center font-display text-4xl md:text-5xl font-bold gradient-text mb-4 pb-2"
        >
          Outside Work
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-muted-foreground font-body text-center max-w-2xl mx-auto mb-12"
        >
          Yes I have a life outside work :) It has always fueled my creativity
          more
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="px-2 md:px-8"
        >
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {passions.map((item) => {
                const Icon = item.icon;
                return (
                  <CarouselItem key={item.title}>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card rounded-2xl overflow-hidden border border-border/60 block group hover:border-secondary/40 transition-all duration-300"
                      >
                        <div className="h-[340px] bg-muted/20">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10">
                              <Icon size={36} className="text-accent mb-3" />
                              <p className="text-sm text-muted-foreground font-body">
                                {item.imagePlaceholder}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <p className="text-accent font-body text-sm">
                              {item.subtitle}
                            </p>
                            <ExternalLink
                              size={16}
                              className="text-secondary mt-0.5 shrink-0 group-hover:text-accent transition-colors"
                            />
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-muted-foreground font-body leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <article className="glass-card rounded-2xl overflow-hidden border border-border/60">
                        <div className="h-[340px] bg-muted/20">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10">
                              <Icon size={36} className="text-accent mb-3" />
                              <p className="text-sm text-muted-foreground font-body">
                                {item.imagePlaceholder}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <p className="text-accent font-body text-sm mb-2">
                            {item.subtitle}
                          </p>
                          <h3 className="font-display text-2xl font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-muted-foreground font-body leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => handleManualNav("prev")}
              className="h-8 w-8 rounded-full bg-background/80 border-border/70"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </Button>
            <div
              className="flex items-center gap-2"
              aria-label="Carousel slide indicators"
            >
              {passions.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-6 bg-accent"
                      : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeIndex === index}
                />
              ))}
            </div>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => handleManualNav("next")}
              className="h-8 w-8 rounded-full bg-background/80 border-border/70"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Main ─── */
const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <Starfield />
      <NavBar />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <OutsideWorkSection />
    </div>
  );
};

export default Index;
