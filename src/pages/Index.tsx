import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Cat,
  Github,
  Linkedin,
  MapPin,
  Menu,
  Wand2,
  X,
} from "lucide-react";
import photo from "@/assets/bhuvana-photo.webp";
import aerospikeMark from "@/assets/logos/aerospike-mark.png";
import { logos, type LogoKey } from "@/data/logos";
import {
  EMAIL,
  GITHUB,
  LINKEDIN,
  aiTools,
  experience,
  passions,
  sideProjects,
  stack,
  workProjects,
  type Passion,
  type Project,
  type Tool,
} from "@/data/portfolio";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "personal-projects", label: "Personal projects" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "outside-work", label: "Outside work" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

const container = "mx-auto w-full max-w-[68rem] px-5 sm:px-8 lg:px-16";
const subheadStyle = "text-sm font-medium text-muted-foreground";

/* ─── Hooks ─── */

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

/** True once the hero has scrolled out of view. */
const usePastHero = () => {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return past;
};

/* ─── Small parts ─── */

const TextLink = ({
  href,
  children,
  quiet = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  quiet?: boolean;
  external?: boolean;
}) => {
  // In-page anchors need no icon; anything that leaves the page gets the north-east arrow.
  const leavesPage = !href.startsWith("#");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium underline decoration-1 underline-offset-[6px] transition-colors ${
        quiet
          ? "text-muted-foreground decoration-border-strong hover:text-foreground hover:decoration-foreground"
          : "text-primary decoration-primary hover:text-foreground"
      }`}
    >
      {children}
      {leavesPage && (
        <ArrowUpRight
          size={15}
          strokeWidth={1.75}
          aria-hidden
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
};

const LinkArrow = ({ size = 16 }: { size?: number }) => (
  <ArrowUpRight
    size={size}
    strokeWidth={1.75}
    aria-hidden
    className="ml-1.5 inline-block shrink-0 align-[-0.1em] text-subtle transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
  />
);

const Tags = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((t) => (
      <li
        key={t}
        className="border border-border-strong px-2 py-0.5 text-xs text-muted-foreground"
      >
        {t}
      </li>
    ))}
  </ul>
);

const Logo = ({ name, size = 16 }: { name: LogoKey; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden
  >
    <path d={logos[name].path} />
  </svg>
);

/** A raster logo drawn as a single-colour mark, so company logos match the brand glyphs. */
const Mark = ({ src, size = 16 }: { src: string; size?: number }) => (
  <span
    aria-hidden
    className="block shrink-0 bg-current"
    style={{
      width: size,
      height: size,
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
    }}
  />
);

const LogoTile = ({ name }: { name: LogoKey }) => (
  <span className="grid h-8 w-8 shrink-0 place-items-center border bg-muted text-foreground">
    <Logo name={name} />
  </span>
);

const Accent = ({ children }: { children: ReactNode }) => (
  <em className="font-normal italic text-primary">{children}</em>
);

const SectionHeader = ({
  title,
  intro,
}: {
  title: ReactNode;
  intro?: string;
}) => (
  <header>
    <h2 className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
      {title}
    </h2>
    {intro && <p className="mt-3 text-base text-muted-foreground">{intro}</p>}
  </header>
);

const Section = ({ id, children }: { id: string; children: ReactNode }) => (
  <section id={id} className="border-t">
    <div className={`${container} py-16 md:py-24`}>{children}</div>
  </section>
);

const Screenshot = ({
  image,
  className,
}: {
  image: Project["image"];
  className: string;
}) => (
  <img
    src={image.src}
    width={image.width}
    height={image.height}
    alt=""
    loading="lazy"
    className={`w-full border border-border-strong object-cover object-top ${className}`}
  />
);

/* ─── Navigation ─── */

const NavList = ({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: () => void;
}) => (
  <ul className="space-y-1">
    {SECTIONS.map((s) => {
      const isActive = active === s.id;
      return (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={onNavigate}
            aria-current={isActive ? "true" : undefined}
            className={`block py-2 text-sm transition-colors ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </a>
        </li>
      );
    })}
  </ul>
);

const CatButton = ({
  onCat,
  talking,
  summon,
}: {
  onCat: () => void;
  talking: boolean;
  summon: number;
}) => (
  <button
    type="button"
    onClick={onCat}
    aria-label="Say hi to the cat"
    className={`group grid h-10 w-10 place-items-center rounded-full border transition-colors ${
      talking
        ? "border-primary text-primary"
        : "border-border-strong text-subtle hover:border-primary hover:text-primary"
    }`}
  >
    {/* Keyed by click count so the wiggle restarts on every click. */}
    <Cat
      key={summon}
      size={18}
      strokeWidth={1.75}
      aria-hidden
      className={
        talking
          ? "[animation:cat-talk_.9s_ease-in-out_2]"
          : "group-hover:[animation:cat-wiggle_.6s_ease-in-out]"
      }
    />
  </button>
);

const RAIL_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M16 12v8M12 16h8' stroke='%23efe9e1' stroke-opacity='0.14' stroke-width='1'/%3E%3C/svg%3E")`;

const Rail = ({
  active,
  onCat,
  talking,
  summon,
}: {
  active: string;
  onCat: () => void;
  talking: boolean;
  summon: number;
}) => (
  <aside className="fixed inset-y-0 left-0 z-20 hidden w-52 isolate flex-col justify-between border-r bg-elevated px-9 pb-8 pt-16 lg:flex">
    {/* A quiet grid of plus marks, only in the menu. */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: RAIL_PATTERN, backgroundSize: "32px 32px" }}
    />
    <nav aria-label="Sections">
      <NavList active={active} />
    </nav>
    <CatButton onCat={onCat} talking={talking} summon={summon} />
  </aside>
);

const MobileBar = ({
  active,
  onCat,
  talking,
  summon,
}: {
  active: string;
  onCat: () => void;
  talking: boolean;
  summon: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-20 border-b bg-background lg:hidden">
      <div className="flex h-14 items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-serif text-lg font-medium">
          Bhuvana Sundaram
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex h-10 items-center gap-2 px-2 text-sm font-medium text-muted-foreground"
        >
          {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="flex items-end justify-between border-t bg-elevated px-5 pb-6 pt-3 sm:px-8"
        >
          <NavList active={active} onNavigate={() => setOpen(false)} />
          <CatButton onCat={onCat} talking={talking} summon={summon} />
        </nav>
      )}
    </div>
  );
};

const LANGUAGES = ["TypeScript", "React", "Go", "Python", "Java", "NodeJS"];

/** One word that quietly swaps every few seconds, fading through a soft blur. */
const RotatingWord = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-grid align-baseline">
      <span className="sr-only">{words.join(", ")}</span>
      {/* Every word shares one grid cell, so the line keeps the widest word's width. */}
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden
          className={`col-start-1 row-start-1 font-code text-[1.0625rem] font-semibold transition-[opacity,filter,transform] duration-500 ease-out ${
            i === index
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-1 opacity-0 blur-[3px]"
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
};

/* ─── Sections ─── */

const Hero = () => (
  <section id="home" className="flex items-center lg:min-h-[88dvh]">
    <div
      className={`${container} grid items-center gap-10 pb-16 pt-12 md:grid-cols-[minmax(0,1fr)_16rem] md:pt-20 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20 lg:pb-20`}
    >
      <div>
        <p className="text-sm font-medium text-primary">
          Frontend-focused full-stack engineer who writes{" "}
          <RotatingWord words={LANGUAGES} />
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.025em]">
          Bhuvana
          <br />
          Sundaram
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Architecting scalable, high-performance systems with 8+ years of
          expertise in modern technologies.
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>Lead UI Developer at</span>
          <a
            href="https://aerospike.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
          >
            <span className="grid h-6 w-6 place-items-center border bg-muted text-foreground">
              <Mark src={aerospikeMark} size={13} />
            </span>
            Aerospike
            <ArrowUpRight
              size={14}
              strokeWidth={1.75}
              aria-hidden
              className="text-subtle transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </a>
          <span aria-hidden className="hidden text-subtle sm:inline">
            /
          </span>
          <span className="inline-flex items-center gap-1 text-subtle">
            <MapPin size={13} strokeWidth={1.75} aria-hidden />
            Bengaluru, IN
          </span>
        </p>

        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-1">
          <TextLink href="#work">See projects</TextLink>
          <TextLink href="#contact" quiet>
            Contact me
          </TextLink>
        </div>
      </div>

      <img
        src={photo}
        width={1000}
        height={1252}
        alt="Bhuvana Sundaram smiling on a viewing deck above the London skyline"
        // React 18 only forwards the lowercase attribute.
        {...{ fetchpriority: "high" }}
        className="aspect-[4/5] w-full max-w-[19rem] object-cover"
      />
    </div>
  </section>
);

const About = () => (
  <Section id="about">
    <SectionHeader
      title={
        <>
          The short <Accent>version</Accent>
        </>
      }
    />
    <div className="mt-8 grid max-w-4xl gap-4 text-base text-muted-foreground">
      <p>
        I joined Aerospike as its{" "}
        <span className="text-primary">first UI developer</span> and have led
        the cloud console since its first commit: the architecture, the coding
        standards, a shared component library that cut development effort by
        35%, and the product's move to the cloud on AWS and GCP. More recently I
        built Voyager, a desktop workspace for Aerospike with MCP support for AI
        coding agents.
      </p>
      <p>
        Before that I built security analytics at F5 and owned the payments
        module at Oracle, where it earned a{" "}
        <span className="text-primary">Spot Award</span>. I work with Cursor and
        Claude every day, and still care about the details AI tends to skip.
      </p>
    </div>
  </Section>
);

const FeaturedCard = ({ project }: { project: Project }) => (
  <li>
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Screenshot
        image={project.image}
        className="aspect-[16/10] transition-colors group-hover:border-primary"
      />
      <h3 className="mt-5 font-serif text-2xl font-medium leading-tight transition-colors group-hover:text-primary">
        {project.title}
        <LinkArrow size={20} />
      </h3>
      <p className="mt-1 text-sm text-subtle">{project.tagline}</p>
      <p className="mt-3 text-muted-foreground">{project.description}</p>
    </a>
    <div className="mt-4">
      <Tags items={project.stack} />
    </div>
  </li>
);

const CompactRow = ({ project }: { project: Project }) => (
  <li>
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-[8rem_minmax(0,1fr)] items-start gap-5"
    >
      <Screenshot
        image={project.image}
        className="aspect-video transition-colors group-hover:border-primary"
      />
      <div>
        <h3 className="font-serif text-lg font-medium leading-snug transition-colors group-hover:text-primary">
          {project.title}
          <LinkArrow />
        </h3>
        <p className="text-sm text-subtle">{project.tagline}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>
    </a>
  </li>
);

const Work = () => {
  const featured = workProjects.slice(0, 2);
  const earlier = workProjects.slice(2);
  return (
    <Section id="work">
      <SectionHeader
        title={
          <>
            Shipped at <Accent>work</Accent>
          </>
        }
        intro="Products I architected and built with teams at Aerospike, F5 and Oracle."
      />
      <ul className="mt-10 grid gap-12 md:grid-cols-2 md:gap-x-14">
        {featured.map((p) => (
          <FeaturedCard key={p.title} project={p} />
        ))}
      </ul>
      <div className="mt-14 border-t pt-8">
        <h3 className={subheadStyle}>Earlier</h3>
        <ul className="mt-5 grid gap-8 md:grid-cols-2 md:gap-x-14">
          {earlier.map((p) => (
            <CompactRow key={p.title} project={p} />
          ))}
        </ul>
      </div>
    </Section>
  );
};

const PersonalProjects = () => (
  <Section id="personal-projects">
    <SectionHeader
      title={
        <>
          Personal <Accent>projects</Accent>
        </>
      }
      intro="Ideas I couldn't leave alone. Designed, built and shipped end to end, outside the day job."
    />
    <ul className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {sideProjects.map((p) => (
        <li key={p.title}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col border bg-elevated transition-colors hover:border-primary"
          >
            <img
              src={p.image.src}
              width={p.image.width}
              height={p.image.height}
              alt={`${p.title} screenshot`}
              loading="lazy"
              className="aspect-[16/10] w-full border-b object-cover object-top"
            />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-serif text-xl font-medium leading-tight">
                {p.title}
                <LinkArrow size={18} />
              </h3>
              <p className="mt-1 text-sm text-subtle">{p.tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-auto pt-5">
                <Tags items={p.stack} />
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </Section>
);

const Experience = () => (
  <Section id="experience">
    <SectionHeader
      title={
        <>
          How I've <Accent>grown</Accent>
        </>
      }
      intro="From shipping features to owning the frontend of a product, end to end."
    />
    <ol className="mt-10">
      {experience.map((c) => (
        <li
          key={c.company}
          className="grid gap-5 border-t py-10 first:border-t-0 first:pt-0 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16"
        >
          <div className="flex items-start gap-3.5">
            <span
              role="img"
              aria-label={`${c.company} logo`}
              className="grid h-11 w-11 shrink-0 place-items-center border bg-muted text-foreground"
            >
              <Mark src={c.logo} size={22} />
            </span>
            <div>
              <h3 className="font-serif text-xl font-medium leading-tight">
                {c.company}
              </h3>
              <p className="mt-1 text-sm text-subtle">{c.location}</p>
              <p className="mt-1.5 font-code text-xs tabular-nums text-primary">
                {c.period}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {c.roles.map((r) => (
              <div key={r.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-medium text-foreground">{r.title}</p>
                  {r.period && (
                    <p className="font-code text-xs tabular-nums text-subtle">
                      {r.period}
                    </p>
                  )}
                </div>
                {r.summary && (
                  <p className="mt-2 text-muted-foreground">{r.summary}</p>
                )}
                <ul className="mt-3 space-y-1.5">
                  {r.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-5 text-muted-foreground before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rotate-45 before:border before:border-primary"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Tags items={c.stack} />
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

const ToolGrid = ({ title, tools }: { title: string; tools: Tool[] }) => (
  <div>
    <h3 className={subheadStyle}>{title}</h3>
    <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {tools.map((t) => (
        <li
          key={t.name}
          className="flex items-center gap-3 border bg-elevated p-2 pr-3 transition-colors hover:border-border-strong"
        >
          <LogoTile name={t.logo} />
          <span className="truncate text-sm">{t.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Toolkit = () => (
  <Section id="toolkit">
    <SectionHeader
      title={
        <>
          What I <Accent>build</Accent> with
        </>
      }
      intro="The languages and frameworks I ship in, and the AI tools that sit beside me while I do it."
    />
    <div className="mt-10 space-y-10">
      <ToolGrid title="Stack" tools={stack} />
      <ToolGrid title="AI tools" tools={aiTools} />
    </div>
  </Section>
);

const PassionCaption = ({ item }: { item: Passion }) => (
  <figcaption className="mt-4">
    <h3 className="font-serif text-lg font-medium leading-snug">
      {item.title}
    </h3>
    <p className="text-sm text-subtle">{item.subtitle}</p>
    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
    {item.link && (
      <TextLink href={item.link.url} external quiet>
        {item.link.label}
      </TextLink>
    )}
  </figcaption>
);

const PassionImage = ({
  item,
  className,
}: {
  item: Passion;
  className: string;
}) => (
  <img
    src={item.image.src}
    width={item.image.width}
    height={item.image.height}
    alt={item.alt}
    loading="lazy"
    className={`w-full object-cover ${className}`}
  />
);

/** A collage: one tall photo, one wide banner, two small photos. */
const OutsideWork = () => {
  const [triathlon, cat, art, books] = passions;
  return (
    <Section id="outside-work">
      <SectionHeader
        title={
          <>
            Life beyond the <Accent>laptop</Accent>
          </>
        }
        intro="Yes I have a life outside work :) It has always fueled my creativity more"
      />
      <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-12">
        {/* The tall photo stretches to the right column's height so both columns end level. */}
        <figure className="flex flex-col md:col-span-5">
          <div className="relative h-72 md:h-auto md:flex-1">
            <PassionImage
              item={triathlon}
              className="absolute inset-0 h-full object-[50%_40%]"
            />
          </div>
          <PassionCaption item={triathlon} />
        </figure>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-7">
          <figure className="sm:col-span-2">
            <PassionImage item={cat} className="h-44 object-[25%_50%]" />
            <PassionCaption item={cat} />
          </figure>
          <figure>
            <PassionImage item={art} className="h-32" />
            <PassionCaption item={art} />
          </figure>
          <figure>
            <PassionImage item={books} className="h-32" />
            <PassionCaption item={books} />
          </figure>
        </div>
      </div>
    </Section>
  );
};

const Contact = () => (
  <Section id="contact">
    <SectionHeader
      title={
        <>
          Let's <Accent>talk</Accent>
        </>
      }
      intro="Hiring for a frontend role, curious about something I built, or have a book to recommend? Write to me."
    />
    <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-1">
      <a
        href={`mailto:${EMAIL}`}
        className="text-lg font-medium text-primary underline decoration-1 underline-offset-[6px] transition-colors hover:text-foreground"
      >
        {EMAIL}
      </a>
    </div>
  </Section>
);

/* ─── Little extras ─── */

const CAT_LINES = [
  "She has finished three triathlons. I have finished three naps. Today.",
  "I volunteer here too. Mostly as a keyboard warmer",
  "Psst: the email link works. She actually replies",
  "Ask her what she is reading. Then clear your afternoon",
  "Meow :)",
];

/** The sidebar cat talks for a few seconds after a click. */
const useCat = () => {
  const [summon, setSummon] = useState(0);
  const [talking, setTalking] = useState(false);
  const timer = useRef<number>();
  const call = useRef(() => setSummon((n) => n + 1)).current;

  useEffect(() => {
    if (summon === 0) return;
    setTalking(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setTalking(false), 6000);
  }, [summon]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { summon, talking, call };
};

const CatBubble = ({
  summon,
  talking,
}: {
  summon: number;
  talking: boolean;
}) => (
  <div
    role="status"
    aria-live="polite"
    className="pointer-events-none fixed bottom-6 left-5 z-30 lg:bottom-8 lg:left-[5.25rem]"
  >
    {talking && (
      <div
        key={summon}
        className="relative max-w-[17rem] origin-bottom-left rounded-2xl rounded-bl-sm border border-border-strong bg-elevated px-4 py-3 text-sm shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] [animation:cat-pop_.45s_cubic-bezier(.22,1,.36,1)_both]"
      >
        {CAT_LINES[(summon - 1) % CAT_LINES.length]}
      </div>
    )}
  </div>
);

const BackToTop = ({ show }: { show: boolean }) => (
  <a
    href="#home"
    aria-label="Back to top"
    tabIndex={show ? 0 : -1}
    className={`fixed bottom-6 right-6 z-30 grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-elevated text-muted-foreground transition-[opacity,transform,color,border-color] duration-300 hover:border-primary hover:text-primary ${
      show
        ? "translate-y-0 opacity-100"
        : "pointer-events-none translate-y-2 opacity-0"
    }`}
  >
    <ArrowUp size={15} strokeWidth={1.75} aria-hidden />
  </a>
);

const SOCIALS = [
  { href: LINKEDIN, label: "LinkedIn", Icon: Linkedin },
  { href: GITHUB, label: "GitHub", Icon: Github },
];

/** What this site itself was built with. */
const SITE_BUILD: { name: string; role: string; logo?: LogoKey }[] = [
  {
    name: "Claude Code",
    role: "Built it with me",
    logo: "claude",
  },
  { name: "Impeccable", role: "Design direction skill" },
  { name: "Taste skill", role: "Anti-slop checks" },
  { name: "React + Vite", role: "Framework and build", logo: "react" },
  { name: "Tailwind CSS", role: "Styling", logo: "tailwindcss" },
  { name: "Vercel", role: "Hosting", logo: "vercel" },
];

/** "Made with Claude Code" opens a small card of how this site was built. */
const MadeWith = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group relative"
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-build-card"
        className="inline-flex min-h-10 items-center gap-2 text-subtle transition-colors hover:text-foreground"
      >
        <Logo name="claude" size={15} />
        <span className="underline decoration-border-strong decoration-dotted underline-offset-4">
          Made with Claude Code, {new Date().getFullYear()}
        </span>
      </button>
      <div
        id="site-build-card"
        className={`absolute bottom-full left-0 mb-3 w-[22rem] border border-border-strong bg-elevated p-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)] transition-[opacity,transform] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-1 opacity-0"
        }`}
      >
        <p className="px-2 pb-2 pt-1 text-xs text-subtle">
          How this site was built
        </p>
        <ul className="divide-y">
          {SITE_BUILD.map((t) => (
            <li key={t.name} className="flex items-center gap-3 px-2 py-2">
              {t.logo ? (
                <LogoTile name={t.logo} />
              ) : (
                <span className="grid h-8 w-8 shrink-0 place-items-center border bg-muted text-primary">
                  <Wand2 size={15} strokeWidth={1.75} aria-hidden />
                </span>
              )}
              <span className="whitespace-nowrap text-sm text-foreground">
                {t.name}
              </span>
              <span className="truncate text-xs text-subtle">{t.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="border-t">
    <div
      className={`${container} flex flex-wrap items-center justify-between gap-4 py-6 text-sm`}
    >
      <MadeWith />
      <div className="-mr-3 flex items-center text-subtle">
        {SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="grid h-10 w-10 place-items-center transition-colors hover:text-primary"
          >
            <Icon size={17} strokeWidth={1.75} aria-hidden />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

/* ─── Page ─── */

const Index = () => {
  const active = useActiveSection(SECTION_IDS);
  const pastHero = usePastHero();
  const cat = useCat();

  return (
    <div className="min-h-[100dvh] overflow-x-clip">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to work
      </a>
      <Rail
        active={active}
        onCat={cat.call}
        talking={cat.talking}
        summon={cat.summon}
      />
      <MobileBar
        active={active}
        onCat={cat.call}
        talking={cat.talking}
        summon={cat.summon}
      />
      <div className="lg:pl-52">
        <main>
          <Hero />
          <About />
          <Work />
          <PersonalProjects />
          <Experience />
          <Toolkit />
          <OutsideWork />
          <Contact />
        </main>
        <Footer />
      </div>
      <BackToTop show={pastHero} />
      <CatBubble summon={cat.summon} talking={cat.talking} />
    </div>
  );
};

export default Index;
