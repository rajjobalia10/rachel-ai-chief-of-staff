import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowBendUpRight,
  ArrowsClockwise,
  BellRinging,
  Brain,
  CalendarCheck,
  CaretRight,
  ChatCenteredText,
  ChatCircleDots,
  CheckCircle,
  Crown,
  Pause,
  PencilSimpleLine,
  Play,
  PlugsConnected,
  ShieldCheck,
  SunHorizon,
  UserCircle,
} from "@phosphor-icons/react";

const LUXURY_EASE = [0.16, 1, 0.3, 1];
const INTERACTION_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.75 };
const LAYOUT_SPRING = { type: "spring", stiffness: 300, damping: 32, mass: 0.85 };
const FAQ_ITEM_SPRING = { type: "spring", stiffness: 360, damping: 34, mass: 0.8 };
const FEATURE_REVEAL_SPRING = { duration: 0.56, ease: LUXURY_EASE, delay: 0.04 };
const FLOW_REVEAL_SPRING = { duration: 0.68, ease: LUXURY_EASE, delay: 0.05 };
const FAQ_REVEAL_SPRING = { duration: 0.5, ease: LUXURY_EASE, delay: 0.04 };
const REDUCED_FADE = { duration: 0.15, ease: "linear" };

function motionTransition(reduced, transition) {
  return reduced ? REDUCED_FADE : transition;
}

function revealProps(preset, reduced) {
  const config = preset === "flow"
    ? { y: 18, blur: 6, transition: FLOW_REVEAL_SPRING }
    : preset === "faq"
      ? { y: 16, blur: 5, transition: FAQ_REVEAL_SPRING }
      : { y: 14, blur: 4, transition: FEATURE_REVEAL_SPRING };

  return {
    initial: { opacity: 0, y: reduced ? 0 : config.y, filter: reduced ? "blur(0px)" : `blur(${config.blur}px)` },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.25, margin: "0px 0px -8% 0px" },
    transition: motionTransition(reduced, config.transition),
  };
}

function groupRevealProps(reduced, stagger = 0.07) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.24, margin: "0px 0px -8% 0px" },
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: reduced ? 0.02 : stagger, delayChildren: reduced ? 0 : 0.04 } },
    },
  };
}

function revealVariants(reduced, y = 14) {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : y, filter: reduced ? "blur(0px)" : "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: motionTransition(reduced, FEATURE_REVEAL_SPRING) },
  };
}

const workflowStateVariants = {
  enter: ({ direction, mobile, reduced }) => ({
    opacity: 0,
    x: reduced || mobile ? 0 : direction * 12,
    y: reduced ? 0 : mobile ? 8 : 0,
    filter: reduced ? "blur(0px)" : "blur(6px)",
  }),
  center: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
  exit: ({ direction, mobile, reduced }) => ({
    opacity: 0,
    x: reduced || mobile ? 0 : direction * -8,
    y: reduced ? 0 : mobile ? -5 : 0,
    filter: reduced ? "blur(0px)" : "blur(4px)",
  }),
};

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Rachel home">
      <span className="brand-mark" aria-hidden="true"><img src="/assets/rachel-mark-v2.png" alt="" width="22" height="22" /></span>
      <span>Rachel</span>
    </a>
  );
}

function RachelIdentityMark({ className = "" }) {
  return (
    <span className={`asset-mark ${className}`} aria-hidden="true">
      <img src="/assets/rachel-mark-v2.png" alt="" width="64" height="64" />
    </span>
  );
}

function BlackButton({ children, href = "sms:?body=Hi%20Rachel", className = "", onClick }) {
  const reducedMotion = useReducedMotion();
  const transition = motionTransition(reducedMotion, INTERACTION_SPRING);

  return (
    <motion.a
      className={`black-button ${className}`}
      href={href}
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={{
        rest: { opacity: 1, y: 0 },
        hover: { opacity: 1, y: reducedMotion ? 0 : -1 },
        pressed: { opacity: 1, y: 0 },
      }}
      transition={transition}
    >
      <motion.span
        variants={{ rest: { scale: 1 }, hover: { scale: reducedMotion ? 1 : 0.995 }, pressed: { scale: reducedMotion ? 1 : 0.975 } }}
        transition={transition}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const transition = motionTransition(reducedMotion, INTERACTION_SPRING);

  useEffect(() => {
    const close = () => setOpen(false);
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", close);
    window.addEventListener("keydown", closeOnEscape);
    const updateScrolled = () => setScrolled(window.scrollY > 16);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  const menuItemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: (index) => ({ opacity: 1, y: 0, transition: { ...motionTransition(reducedMotion, { duration: 0.32, ease: LUXURY_EASE }), delay: reducedMotion ? 0 : 0.08 + index * 0.04 } }),
    exit: { opacity: 0, y: reducedMotion ? 0 : -4, transition: motionTransition(reducedMotion, { duration: 0.18, ease: LUXURY_EASE }) },
  };

  return (
    <>
      <header className={`site-header ${open ? "menu-open" : ""} ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#steps">Setup</a>
          </nav>
          <BlackButton className="header-cta">Text Rachel</BlackButton>
          <button className={`menu-toggle ${open ? "is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>
            <span className="menu-glyph" aria-hidden="true">
              <motion.span className="menu-bar menu-bar-top" initial={false} animate={{ y: open ? 3 : 0, rotate: open ? 45 : 0 }} transition={transition} />
              <motion.span className="menu-bar menu-bar-bottom" initial={false} animate={{ y: open ? -3 : 0, rotate: open ? -45 : 0 }} transition={transition} />
            </span>
          </button>
        </div>
      </header>
      <motion.div className={`mobile-menu ${open ? "is-open" : ""}`} style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} initial={false} animate={{ height: open ? "100dvh" : 62 }} transition={motionTransition(reducedMotion, LAYOUT_SPRING)} aria-hidden={!open}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav id="mobile-navigation" aria-label="Mobile navigation" initial="hidden" animate="visible" exit="exit">
              {[['#features', 'Features'], ['#pricing', 'Pricing'], ['#faq', 'FAQ'], ['#steps', 'Setup']].map(([href, label], index) => (
                <motion.a custom={index} variants={menuItemVariants} href={href} onClick={() => setOpen(false)} key={href}>{label}</motion.a>
              ))}
              <motion.div custom={4} variants={menuItemVariants}><BlackButton onClick={() => setOpen(false)}>Text Rachel</BlackButton></motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

const primaryFeatures = [
  { icon: SunHorizon, title: "Morning Brief", copy: "Wake up knowing what needs you, what changed overnight, and what Rachel already handled." },
  { icon: ArrowsClockwise, title: "Follow-Through", copy: "Rachel remembers every promise, nudges the right people, and closes the loop before it goes stale." },
  { icon: ShieldCheck, title: "You Stay in Control", copy: "Rachel prepares the work, then asks before anything important is sent, booked, or shared." },
];

const visualFeatures = [
  { icon: Brain, title: "Compounding Memory", copy: "People, preferences, plans, and promises — remembered in context.", image: "/assets/rachel-feature-memory.png", key: "folders" },
  { icon: PlugsConnected, title: "All Your Tools", copy: "Email, calendar, messages, and documents working as one.", image: "/assets/rachel-feature-tools.png", key: "icloud" },
  { icon: ChatCircleDots, title: "One Text Thread", copy: "Delegate naturally in iMessage. No dashboard and no new habit.", image: "/assets/rachel-feature-thread.png", key: "search" },
];

const workflowStates = [
  {
    label: "Connect your world",
    title: "Connect What Matters",
    eyebrow: "Email, calendar, messages, and docs.",
    copy: "Rachel builds the context behind your day, so every request starts informed and stays personal.",
    stat: "10+ Integrations",
    statCopy: "One shared view of your day",
    image: "/assets/rachel-workflow-connect.png",
    icon: PlugsConnected,
  },
  {
    label: "Text Rachel",
    title: "Text It Naturally",
    eyebrow: "Ask like you would ask a person.",
    copy: "Send a request, a voice note, or a messy thought.",
    stat: "One Conversation",
    statCopy: "No new dashboard to learn",
    image: "/assets/rachel-workflow-text.png",
    icon: ChatCenteredText,
  },
  {
    label: "Approve and done",
    title: "Rachel Handles It",
    eyebrow: "Draft, schedule, remind, and follow up.",
    copy: "Rachel gets the work ready and asks before anything important happens.",
    stat: "Hours Back",
    statCopy: <><strong>Every week</strong><br />Without the busywork</>,
    image: "/assets/rachel-workflow-done.png",
    icon: CheckCircle,
  },
];

const workflowSectionHeights = [933.3984375, 921.796875, 909.3984375];
const workflowPanelHeights = [449.3984375, 437.796875, 425.3984375];
const workflowTabletSectionHeights = [1252.8984375, 1248.8984375, 1272.8984375];
const workflowTabletPanelHeights = [832.8984375, 828.8984375, 852.8984375];
const workflowMobileSectionHeights = [1256.8984375, 1289.296875, 1276.8984375];
const workflowMobilePanelHeights = [832.8984375, 865.296875, 852.8984375];
const workflowCopyRightPaddings = [55, 80, 55];

const steps = [
  { number: "01", image: "/assets/rachel-step-text.png", title: "Text Rachel", copy: "Start a private iMessage conversation. Tell Rachel what is on your plate in the same words you would use with a great chief of staff." },
  { number: "02", image: "/assets/rachel-step-connect.png", title: "Connect Your Tools", copy: "Choose the calendar, inbox, and documents Rachel should understand. You stay in control of every permission." },
  { number: "03", image: "/assets/rachel-step-handoff.png", title: "Hand Off Your First Task", copy: "Ask for a morning brief, a meeting plan, or a follow-up. Rachel prepares it and checks with you before acting." },
];

const freeFeatures = ["One iMessage thread", "Daily morning brief", "Calendar connection", "5 tasks each week", "Approval before actions", "Private personal memory"];
const proFeatures = ["Unlimited requests", "Email, docs, and calendar", "Proactive follow-ups", "Meeting briefs and drafts", "Custom routines", "Priority support"];

const comparisonRows = [
  ["Rachel requests", "5/week", "Unlimited"],
  ["Connected tools", "Calendar", "All tools"],
  ["Proactive follow-ups", "—", "check"],
  ["Meeting preparation", "—", "check"],
  ["Custom routines", "—", "check"],
  ["Support", "Standard", "Priority"],
];

const communityStories = [
  { title: "Founder workflow", label: "Monday, 8:02 AM", icon: SunHorizon, copy: "A clear morning brief, the three decisions that need you, and every follow-up already lined up." },
  { title: "Operator workflow", label: "Before the next meeting", icon: CalendarCheck, copy: "The calendar change is held, the attendees are updated, and the context is ready before you join." },
  { title: "Creative lead workflow", label: "From a half-formed thought", icon: PencilSimpleLine, copy: "A polished client note in your voice, prepared in iMessage and waiting for your approval." },
  { title: "Consultant workflow", label: "After the call", icon: ArrowBendUpRight, copy: "Commitments are captured, owners are clear, and the next nudge is scheduled before anything slips." },
];

const faqs = [
  ["Does Rachel really work inside iMessage?", "Yes. Rachel lives in a private iMessage thread, so asking for help feels as natural as texting a person you trust."],
  ["Can Rachel connect to my existing work tools?", "Rachel is designed to connect to your calendar, email, messages, documents, and the tools where your work already lives. You choose each connection."],
  ["Will Rachel ask first?", "Yes. Rachel can prepare drafts, reminders, meetings, and follow-ups, but asks for your approval before any important external action."],
  ["How is Rachel approaching privacy and security?", "Rachel is being designed around permissioned connections and approval-first actions. Detailed security, retention, and data-handling terms will be published before accounts are activated."],
  ["Will I be able to export or delete my Rachel data?", "Data controls are part of the product plan. The exact export, deletion, and retention controls will be documented before accounts are activated."],
];

function SectionIntro({ title, copy, align = "center" }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div className={`section-intro ${align === "left" ? "is-left" : ""}`} {...groupRevealProps(reducedMotion, 0.08)}>
      <motion.h2 variants={revealVariants(reducedMotion, 16)}>{title}</motion.h2>
      <motion.p variants={revealVariants(reducedMotion, 10)}>{copy}</motion.p>
    </motion.div>
  );
}

function PricingCard({ pro = false }) {
  const list = pro ? proFeatures : freeFeatures;
  const [yearly, setYearly] = useState(false);
  const reducedMotion = useReducedMotion();
  const transition = motionTransition(reducedMotion, INTERACTION_SPRING);
  const PlanIcon = pro ? Crown : UserCircle;

  return (
    <motion.article className="pricing-card" {...revealProps("feature", reducedMotion)}>
      <div className="pricing-card-inner">
        <div className="pricing-main">
          <div className="price-top">
            <div className="plan-name"><PlanIcon size={24} weight="fill" /><h4>{pro ? "Pro Plan" : "Free Plan"}</h4></div>
            {pro && <span className="popular">Most Popular</span>}
            <div className="price"><strong>{pro && yearly ? "$24" : pro ? "$29" : "$0"}</strong><span>/per month</span></div>
          </div>
          <div className="price-description">
            <p>{pro ? "Delegate the details and get meaningful time back every week." : "Meet Rachel, get a daily brief, and hand off your first recurring tasks."}</p>
            {pro ? (
              <button className={`billing ${yearly ? "on" : ""}`} type="button" role="switch" aria-checked={yearly} onClick={() => setYearly((value) => !value)}>
                <motion.span className="switch" animate={{ backgroundColor: yearly ? "rgb(7, 220, 113)" : "rgb(224, 224, 224)" }} transition={transition}>
                  <motion.span className="switch-knob" layout transition={transition} />
                </motion.span>
                Billed yearly
              </button>
            ) : (
              <div className="billing off"><span className="switch"><span className="switch-knob" /></span>Billed yearly</div>
            )}
          </div>
        </div>
        <ul>{list.map((item) => <li key={item}><CheckCircle size={16} weight="fill" /><span>{item}</span></li>)}</ul>
        <div className="pricing-button"><BlackButton>{pro ? "Start with Rachel" : "Text Rachel Free"}</BlackButton></div>
      </div>
    </motion.article>
  );
}

export function App() {
  const [workflow, setWorkflow] = useState(0);
  const [workflowDirection, setWorkflowDirection] = useState(1);
  const [openFaqs, setOpenFaqs] = useState(() => new Set());
  const [communityPaused, setCommunityPaused] = useState(false);
  const [viewportTier, setViewportTier] = useState(null);
  const [heroMotionReady, setHeroMotionReady] = useState(false);
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBackgroundY = useTransform(heroScrollProgress, [0, 0.68], [0, 16]);
  const heroPhoneY = useTransform(heroScrollProgress, [0, 0.68], [0, -18]);

  useEffect(() => setHeroMotionReady(true), []);

  useEffect(() => {
    const updateViewportTier = () => setViewportTier(window.innerWidth >= 1200 ? "desktop" : window.innerWidth >= 810 ? "tablet" : "mobile");
    updateViewportTier();
    window.addEventListener("resize", updateViewportTier);
    return () => window.removeEventListener("resize", updateViewportTier);
  }, []);

  const currentWorkflow = workflowStates[workflow];
  const WorkflowIcon = currentWorkflow.icon;
  const interactionTransition = motionTransition(reducedMotion, INTERACTION_SPRING);
  const workflowSectionHeight = viewportTier === "desktop" ? workflowSectionHeights[workflow] : viewportTier === "tablet" ? workflowTabletSectionHeights[workflow] : viewportTier === "mobile" ? workflowMobileSectionHeights[workflow] : undefined;
  const workflowPanelHeight = viewportTier === "desktop" ? workflowPanelHeights[workflow] : viewportTier === "tablet" ? workflowTabletPanelHeights[workflow] : viewportTier === "mobile" ? workflowMobilePanelHeights[workflow] : undefined;
  const toggleFaq = (index) => {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };
  const selectWorkflow = (index) => {
    if (index === workflow) return;
    setWorkflowDirection(index > workflow ? 1 : -1);
    setWorkflow(index);
  };
  const moveWorkflowFocus = (index) => {
    selectWorkflow(index);
    window.requestAnimationFrame(() => document.getElementById(`workflow-tab-${index}`)?.focus());
  };

  return (
    <MotionConfig reducedMotion="user">
      <main id="top">
        <Header />

        <section className="hero" ref={heroRef}>
          <motion.img
            className="hero-background"
            src="/assets/rachel-hero-golden-gate-clouds.webp"
            alt=""
            aria-hidden="true"
            width={1280}
            height={482}
            loading="eager"
            fetchPriority="high"
            style={{ y: reducedMotion ? 0 : heroBackgroundY }}
            initial={false}
            animate={heroMotionReady ? { opacity: 1, scale: 1 } : { opacity: 0.001, scale: reducedMotion ? 1 : 1.018 }}
            transition={motionTransition(reducedMotion, { duration: 1, ease: LUXURY_EASE, delay: 0.04 })}
          />
          <motion.div className="hero-phone-motion" style={{ y: reducedMotion ? 0 : heroPhoneY }}>
            <motion.img
              className="hero-phone"
              src="/assets/rachel-hero-phone-cutout-v4.webp"
              srcSet="/assets/rachel-hero-phone-cutout-v4.webp 1x, /assets/rachel-hero-phone-cutout-v4@2x.webp 2x"
              alt="Rachel handling a meeting change and follow-up in iMessage"
              width={618}
              height={1274}
              loading="eager"
              initial={false}
              animate={heroMotionReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.001, y: reducedMotion ? 0 : 28, scale: reducedMotion ? 1 : 0.98 }}
              transition={motionTransition(reducedMotion, { type: "spring", stiffness: 120, damping: 20, mass: 0.9, delay: 0.3 })}
            />
            <span className="hero-phone-avatar" aria-hidden="true"><img src="/assets/rachel-mark-v2.png" alt="" /></span>
          </motion.div>
          <div className="hero-inner">
            <div className="hero-copy">
              <motion.div className="announcement" initial={false} animate={heroMotionReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0.001, y: reducedMotion ? 0 : -8, filter: reducedMotion ? "blur(0px)" : "blur(5px)" }} transition={motionTransition(reducedMotion, { duration: 0.45, ease: LUXURY_EASE, delay: 0.12 })}><span>New</span><strong>Your AI chief of staff in iMessage</strong><CaretRight size={15} weight="bold" aria-hidden="true" /></motion.div>
              <motion.h1 initial={false} animate={heroMotionReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0.001, y: reducedMotion ? 0 : 18, filter: reducedMotion ? "blur(0px)" : "blur(8px)" }} transition={motionTransition(reducedMotion, { duration: 0.68, ease: LUXURY_EASE, delay: 0.18 })}>Meet Rachel,<br /><span>your day already handled.</span></motion.h1>
              <motion.p initial={false} animate={heroMotionReady ? { opacity: 1, y: 0 } : { opacity: 0.001, y: reducedMotion ? 0 : 12 }} transition={motionTransition(reducedMotion, { duration: 0.56, ease: LUXURY_EASE, delay: 0.28 })}>Proactive, private, personal, and right in your texts.</motion.p>
              <motion.div className="hero-actions" initial={false} animate={heroMotionReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.001, y: reducedMotion ? 0 : 10, scale: reducedMotion ? 1 : 0.985 }} transition={motionTransition(reducedMotion, { duration: 0.5, ease: LUXURY_EASE, delay: 0.36 })}>
                <BlackButton><ChatCircleDots size={19} weight="regular" />Text Rachel</BlackButton>
                <motion.a
                  className="hero-secondary"
                  href="#steps"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap="pressed"
                  variants={{ rest: { y: 0, scale: 1, backgroundColor: "rgba(255, 255, 255, .86)" }, hover: { y: reducedMotion ? 0 : -1, scale: 1, backgroundColor: "rgba(255, 255, 255, .96)" }, pressed: { y: 0, scale: reducedMotion ? 1 : 0.98 } }}
                  transition={motionTransition(reducedMotion, INTERACTION_SPRING)}
                >
                  <span>Explore</span>
                  <motion.span className="hero-secondary-arrow" variants={{ rest: { x: 0 }, hover: { x: reducedMotion ? 0 : 3 }, pressed: { x: 1 } }}><CaretRight size={17} weight="bold" aria-hidden="true" /></motion.span>
                </motion.a>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="hero-coda"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={motionTransition(reducedMotion, { duration: 0.5, ease: LUXURY_EASE })}
          >
            <p>She knows what matters. <span>You decide what happens.</span></p>
          </motion.div>
        </section>

        <section className="challenge" id="challenge">
          <motion.h3 {...revealProps("flow", reducedMotion)}>
            <span>Plans, promises, and loose ends live across your inbox, calendar, messages, and memory.</span>
            <strong>Rachel brings them together and quietly moves everything forward.</strong>
          </motion.h3>
        </section>

        <section className="features section" id="features">
          <div className="section-shell">
            <SectionIntro title={<>Everything a great<br />chief of staff remembers</>} copy="Rachel connects the tools you already use, learns what matters, and handles the follow-through." />
            <motion.div className="primary-feature-grid" {...groupRevealProps(reducedMotion, 0.06)}>
              {primaryFeatures.map(({ icon: Icon, title, copy }) => (
                <motion.article className="feature-copy-card" key={title} variants={revealVariants(reducedMotion, 14)} whileHover={reducedMotion ? undefined : { y: -3 }} transition={motionTransition(reducedMotion, INTERACTION_SPRING)}>
                  <Icon size={26} weight="fill" />
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </motion.div>
            <motion.div className="visual-feature-grid" {...groupRevealProps(reducedMotion, 0.08)}>
              {visualFeatures.map(({ icon: Icon, title, copy, image, key }) => (
                <motion.article className={`visual-feature visual-${key}`} key={title} variants={revealVariants(reducedMotion, 14)}>
                  <div className="visual-feature-art">
                    <img src={image} alt="" />
                    {key === "search" && <><RachelIdentityMark className="asset-mark-thread-top" /><RachelIdentityMark className="asset-mark-thread-bottom" /></>}
                  </div>
                  <div className="visual-feature-copy"><h4><Icon size={27} weight="fill" />{title}</h4><p>{copy}</p></div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <motion.section className="workflow section" animate={workflowSectionHeight === undefined ? undefined : { height: workflowSectionHeight }} transition={motionTransition(reducedMotion, LAYOUT_SPRING)}>
          <div className="section-shell">
            <SectionIntro title="From thought to done in seconds." copy="Choose how you want to delegate. Rachel adapts to your day, not the other way around." />
            <motion.div className="workflow-interactive" {...revealProps("feature", reducedMotion)}>
              <motion.div className="workflow-tabs" role="tablist" aria-label="Rachel workflow" animate={{ x: viewportTier === "mobile" && workflow === 2 ? -163.5 : 0 }} transition={interactionTransition}>
                {workflowStates.map((item, index) => {
                  const active = workflow === index;
                  return (
                    <motion.button
                      id={`workflow-tab-${index}`}
                      role="tab"
                      aria-controls="workflow-panel"
                      aria-selected={active}
                      tabIndex={active ? 0 : -1}
                      className={active ? "active" : ""}
                      key={item.label}
                      onClick={() => selectWorkflow(index)}
                      onKeyDown={(event) => {
                        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                        event.preventDefault();
                        const next = event.key === "Home" ? 0 : event.key === "End" ? workflowStates.length - 1 : event.key === "ArrowRight" ? (index + 1) % workflowStates.length : (index - 1 + workflowStates.length) % workflowStates.length;
                        moveWorkflowFocus(next);
                      }}
                      animate={{ color: active ? "#000000" : "#7a7a7a" }}
                      whileHover={active ? undefined : { color: "#0d0d0d" }}
                      transition={interactionTransition}
                    >
                      {active && <motion.span className="workflow-tab-active" layoutId="workflow-tab-active" transition={interactionTransition} />}
                      <span className="workflow-tab-label">{item.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
              <motion.div className="workflow-panel" id="workflow-panel" role="tabpanel" aria-labelledby={`workflow-tab-${workflow}`} animate={workflowPanelHeight === undefined ? undefined : { height: workflowPanelHeight }} transition={motionTransition(reducedMotion, LAYOUT_SPRING)}>
                <AnimatePresence initial={false} mode="wait" custom={{ direction: workflowDirection, mobile: viewportTier === "mobile", reduced: reducedMotion }}>
                  <motion.div
                    className={`workflow-state workflow-state-${workflow}`}
                    key={workflow}
                    custom={{ direction: workflowDirection, mobile: viewportTier === "mobile", reduced: reducedMotion }}
                    variants={workflowStateVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={motionTransition(reducedMotion, { duration: 0.32, ease: LUXURY_EASE })}
                  >
                    <div className="workflow-copy" style={viewportTier === "desktop" ? { paddingRight: workflowCopyRightPaddings[workflow] } : undefined}>
                      <div>
                        <span className="workflow-icon" aria-hidden="true"><WorkflowIcon size={18} weight="fill" /></span>
                        <h3>{currentWorkflow.title}</h3>
                        <p className="workflow-eyebrow">{currentWorkflow.eyebrow}</p>
                        <p className="workflow-description">{currentWorkflow.copy}</p>
                      </div>
                      <div className="workflow-stat"><h4>{currentWorkflow.stat}</h4><p>{currentWorkflow.statCopy}</p></div>
                    </div>
                    <div className={`workflow-art workflow-art-${workflow}`}>
                      <img className="workflow-image" src={currentWorkflow.image} alt="Rachel workflow interface" />
                      {workflow === 0 && <RachelIdentityMark className="asset-mark-workflow-hub" />}
                      {workflow === 1 && <RachelIdentityMark className="asset-mark-workflow-contact" />}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <section className="ai-section section">
          <div className="section-shell">
            <SectionIntro title={<>Context that keeps<br />up with you</>} copy="Rachel remembers what you decided, who matters, and what still needs a nudge." />
            <motion.div className="solution-visual" {...revealProps("feature", reducedMotion)}>
              <img className="ai-interface" src="/assets/rachel-context.png" alt="Rachel connecting context across work" />
              <motion.div className="benefit-grid" {...groupRevealProps(reducedMotion, 0.055)}>
                {[
                  ["Brief", "Start every day with the decisions, priorities, and follow-ups that actually need you.", BellRinging],
                  ["Draft", "Turn rough thoughts into polished emails, updates, and agendas in your own voice.", PencilSimpleLine],
                  ["Schedule", "Find the right time, prepare the context, and keep every commitment moving.", CalendarCheck],
                  ["Follow up", "Remember every promise and close the loop with the right person at the right moment.", ArrowBendUpRight],
                ].map(([title, copy, Icon]) => (
                  <motion.article key={title} variants={revealVariants(reducedMotion, 10)}><Icon size={18} weight="fill" /><h4>{title}</h4><p>{copy}</p></motion.article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="steps section" id="steps">
          <div className="section-shell">
            <SectionIntro title={<>From hello to help<br />in three steps</>} copy="Add Rachel to iMessage and get a useful first brief in minutes." />
            <motion.div className="steps-list" {...groupRevealProps(reducedMotion, 0.09)}>
              <motion.div className="step-line" variants={{ hidden: { opacity: 0, scaleY: reducedMotion ? 1 : 0 }, visible: { opacity: 1, scaleY: 1, transition: motionTransition(reducedMotion, { duration: 0.9, ease: LUXURY_EASE }) } }} />
              {steps.map((step, index) => (
                <motion.article className="step-row" key={step.number} variants={revealVariants(reducedMotion, 16)}>
                  <div className="step-number"><span />Step {step.number}</div>
                  <div className="step-visual"><img src={step.image} alt="" />{index === 0 && <RachelIdentityMark className="asset-mark-step-contact" />}</div>
                  <div className="step-copy"><h4>{step.title}</h4><p>{step.copy}</p><a href="#features">Know more</a></div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="pricing section" id="pricing">
          <div className="section-shell">
            <SectionIntro title={<>Simple pricing,<br />serious leverage</>} copy="Start free. Upgrade when Rachel becomes the first person you text." />
            <div className="pricing-grid"><PricingCard /><PricingCard pro /></div>
            <motion.div className="comparison" {...revealProps("feature", reducedMotion)}>
              <div className="comparison-head"><h4>Feature Comparison</h4><h4>Free</h4><h4>Pro</h4></div>
              {comparisonRows.map(([feature, free, pro]) => (
                <div className="comparison-row" key={feature}><h4>{feature}</h4><span>{free}</span><span>{pro === "check" ? <CheckCircle size={16} weight="fill" /> : pro}</span></div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="section-shell faq-shell">
            <div className="faq-heading"><SectionIntro align="left" title={<>Frequently asked<br />questions</>} copy="Still have questions? Write to us at hello@rachel.im" /></div>
            <motion.div className="faq-list" {...revealProps("faq", reducedMotion)}>
              {faqs.map(([question, answer], index) => {
                const open = openFaqs.has(index);
                return (
                  <motion.article className={`faq-item ${open ? "open" : ""}`} key={question} layout transition={motionTransition(reducedMotion, FAQ_ITEM_SPRING)}>
                    <button onClick={() => toggleFaq(index)} aria-expanded={open}>
                      <h4>{question}</h4>
                      <span className="faq-icon" aria-hidden="true"><motion.span className="faq-icon-bar" initial={false} animate={{ rotate: open ? 0 : 90 }} transition={motionTransition(reducedMotion, FAQ_ITEM_SPRING)} /><span className="faq-icon-bar" /></span>
                    </button>
                    <motion.div className="faq-answer" initial={false} animate={{ opacity: open ? 1 : 0, filter: open ? "blur(0px)" : "blur(5px)" }} transition={motionTransition(reducedMotion, FAQ_ITEM_SPRING)} aria-hidden={!open}><p>{answer}</p></motion.div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="community-section section" id="community">
          <SectionIntro title="A calmer way to run the day" copy="Four ways Rachel turns an ordinary text into prepared work, clear decisions, and closed loops." />
          <motion.div
            className={`community-rail ${communityPaused ? "is-paused" : ""}`}
            tabIndex="0"
            role="region"
            aria-label="Rachel workflow stories"
            {...revealProps("flow", reducedMotion)}
          >
            <div className="community-track">
              {[...communityStories, ...communityStories].map(({ title, label, icon: StoryIcon, copy }, index) => (
                <article className="community-card" key={`${title}-${index}`} aria-hidden={index >= communityStories.length ? "true" : undefined}>
                  <div className="community-card-head">
                    <span className="community-icon"><StoryIcon size={20} weight="fill" /></span>
                    <div><h3>{title}</h3><p>{label}</p></div>
                    <CheckCircle size={19} weight="fill" aria-hidden="true" />
                  </div>
                  <p className="community-copy">{copy}</p>
                </article>
              ))}
            </div>
          </motion.div>
          <motion.div className="community-actions" {...revealProps("feature", reducedMotion)}>
            <a className="community-link" href="#steps">Explore Rachel workflows <CaretRight size={17} weight="bold" /></a>
            <button
              className="community-motion-toggle"
              type="button"
              aria-pressed={communityPaused}
              onClick={() => setCommunityPaused((paused) => !paused)}
            >
              {communityPaused ? <Play size={14} weight="fill" aria-hidden="true" /> : <Pause size={14} weight="fill" aria-hidden="true" />}
              {communityPaused ? "Play motion" : "Pause motion"}
            </button>
          </motion.div>
        </section>

        <section className="live-metrics section" aria-labelledby="live-metrics-title">
          <motion.div className="live-metrics-inner" {...groupRevealProps(reducedMotion, 0.09)}>
            <motion.div className="live-pill" variants={revealVariants(reducedMotion, 8)}><span aria-hidden="true" />Product principles</motion.div>
            <motion.h2 id="live-metrics-title" variants={revealVariants(reducedMotion, 16)}>Rachel works by two rules.</motion.h2>
            <motion.div className="metrics-grid" variants={revealVariants(reducedMotion, 14)}>
              <article>
                <strong>Ready</strong>
                <h3>When your day changes</h3>
                <p>One private thread keeps the next decision close at hand.</p>
              </article>
              <article>
                <strong>Your call</strong>
                <h3>Before anything important</h3>
                <p>Rachel prepares the next move. You decide what happens.</p>
              </article>
            </motion.div>
          </motion.div>
        </section>

        <section className="final-cta">
          <motion.div className="final-cta-card" {...revealProps("flow", reducedMotion)}>
            <motion.img
              src="/assets/rachel-context.png"
              alt="Rachel organising an afternoon across a meeting, email draft, calendar, and follow-up"
              initial={{ scale: reducedMotion ? 1 : 1.035 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={motionTransition(reducedMotion, { duration: 1.1, ease: LUXURY_EASE })}
            />
            <div className="final-cta-scrim" aria-hidden="true" />
            <motion.div className="final-cta-copy" {...groupRevealProps(reducedMotion, 0.08)}>
              <motion.span className="final-cta-mark" variants={revealVariants(reducedMotion, 8)}><img src="/assets/rachel-mark-v2.png" alt="" /></motion.span>
              <motion.h2 variants={revealVariants(reducedMotion, 12)}>Meet your new chief of staff.</motion.h2>
              <motion.p variants={revealVariants(reducedMotion, 10)}>Rachel lives where your day already happens—and keeps every decision yours.</motion.p>
              <motion.a
                className="final-cta-button"
                href="sms:?body=Hi%20Rachel"
                variants={revealVariants(reducedMotion, 8)}
                whileHover={reducedMotion ? undefined : { y: -1, scale: 1.01 }}
                whileTap={reducedMotion ? undefined : { y: 0, scale: 0.975 }}
                transition={motionTransition(reducedMotion, INTERACTION_SPRING)}
              >
                <span><ChatCircleDots size={18} weight="fill" /></span>Text Rachel
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        <footer>
          <div className="footer-inner">
            <div><Brand /><p>The chief of staff in your texts.</p></div>
            <div className="footer-links"><strong>Sections</strong><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#steps">Setup</a></div>
            <div className="footer-links"><strong>Contact</strong><a href="mailto:hello@rachel.im">Email</a><a href="sms:?body=Hi%20Rachel">Text Rachel</a></div>
          </div>
          <motion.div className="signature-lockup" initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }} whileInView={{ opacity: 0.13, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={motionTransition(reducedMotion, { duration: 0.9, ease: LUXURY_EASE })} aria-hidden="true">
            <img src="/assets/rachel-mark-v2.png" alt="" />
            <span>Rachel</span>
          </motion.div>
        </footer>
      </main>
    </MotionConfig>
  );
}

export default App;
