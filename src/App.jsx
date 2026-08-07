import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import {
  ArrowBendUpRight,
  ArrowsClockwise,
  BellRinging,
  Brain,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  ChatCenteredText,
  ChatCircleDots,
  CheckCircle,
  Crown,
  PencilSimpleLine,
  PlugsConnected,
  ShieldCheck,
  Star,
  SunHorizon,
  UserCircle,
} from "@phosphor-icons/react";

const INTERACTION_SPRING = { type: "spring", bounce: 0.2, delay: 0, duration: 0.4 };
const FAQ_ITEM_SPRING = { type: "spring", bounce: 0, delay: 0, duration: 0.4 };
const FEATURE_REVEAL_SPRING = { type: "spring", bounce: 0, delay: 0.1, duration: 0.6 };
const FLOW_REVEAL_SPRING = { type: "spring", bounce: 0.4, delay: 0.1, duration: 0.8 };
const FAQ_REVEAL_SPRING = { type: "spring", damping: 50, delay: 0.1, mass: 1, stiffness: 250 };

function motionTransition(reduced, transition) {
  return reduced ? { duration: 0 } : transition;
}

function revealProps(preset, reduced) {
  const config = preset === "flow"
    ? { y: 20, transition: FLOW_REVEAL_SPRING }
    : preset === "faq"
      ? { y: 24, transition: FAQ_REVEAL_SPRING }
      : { y: 16, transition: FEATURE_REVEAL_SPRING };

  return {
    initial: { opacity: 0, y: config.y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: motionTransition(reduced, config.transition),
  };
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Rachel home">
      <span className="brand-mark" aria-hidden="true"><img src="/assets/rachel-mark.png" alt="" width="22" height="22" /></span>
      <span>Rachel</span>
    </a>
  );
}

function RachelIdentityMark({ className = "" }) {
  return (
    <span className={`asset-mark ${className}`} aria-hidden="true">
      <img src="/assets/rachel-mark.png" alt="" width="64" height="64" />
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
      variants={{ rest: { opacity: 1 }, hover: { opacity: 0.8 }, pressed: { opacity: 0.8 } }}
      transition={transition}
    >
      <motion.span
        variants={{ rest: { scale: 1 }, hover: { scale: 0.98 }, pressed: { scale: 0.96 } }}
        transition={transition}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const transition = motionTransition(reducedMotion, INTERACTION_SPRING);

  useEffect(() => {
    const close = () => setOpen(false);
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", close);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <header className={`site-header ${open ? "menu-open" : ""}`}>
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
      <motion.div className={`mobile-menu ${open ? "is-open" : ""}`} style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} initial={false} animate={{ height: open ? "100dvh" : 62 }} transition={transition} aria-hidden={!open}>
        {open && (
          <nav id="mobile-navigation" aria-label="Mobile navigation">
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
            <a href="#steps" onClick={() => setOpen(false)}>Setup</a>
            <BlackButton onClick={() => setOpen(false)}>Text Rachel</BlackButton>
          </nav>
        )}
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

const testimonials = [
  { name: "Sara Jones", role: "Creative Director", avatar: "/assets/testimonial-avatar.avif", quote: "By the end of week one, Rachel knew which client needed a nudge and had my Monday brief waiting before I asked. It feels like getting a piece of my attention back." },
  { name: "Nick", role: "Founder", avatar: "/assets/testimonial-james.jpeg", quote: "I send Rachel a half-formed thought in iMessage and get back a clean plan, the draft, and the one decision I actually need to make. That is real leverage." },
  { name: "James Park", role: "Product Lead", avatar: "/assets/testimonial-sara.jpeg", quote: "Rachel catches the promises buried in meetings and follows up before they become loose ends. My team thinks I suddenly became much more organised." },
  { name: "Marcus Taylor", role: "Independent Consultant", avatar: "/assets/testimonial-marcus.jpeg", quote: "There was no new system to learn. I just started texting. Rachel quietly connected the details across my calendar, inbox, and client work." },
];

const faqs = [
  ["Does Rachel really work inside iMessage?", "Yes. Rachel lives in a private iMessage thread, so asking for help feels as natural as texting a person you trust."],
  ["Can Rachel connect to my existing work tools?", "Rachel can connect to your calendar, email, messages, documents, and the tools where your work already lives. You choose each connection."],
  ["Will Rachel ask first?", "Yes. Rachel can prepare drafts, reminders, meetings, and follow-ups, but asks for your approval before any important external action."],
  ["How does Rachel keep my personal data protected?", "Your information is encrypted in transit and at rest. Rachel only uses the access you grant, and never sells your personal data."],
  ["Can I export or delete all my Rachel data?", "Always. Disconnect a tool, delete your memory, or export your information whenever you choose. Your data remains yours."],
];

function SectionIntro({ title, copy, align = "center" }) {
  return (
    <div className={`section-intro ${align === "left" ? "is-left" : ""}`}>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
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
  const [openFaqs, setOpenFaqs] = useState(() => new Set());
  const [testimonial, setTestimonial] = useState(0);
  const [viewportTier, setViewportTier] = useState(null);
  const [heroMotionReady, setHeroMotionReady] = useState(false);
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [testimonialQueued, setTestimonialQueued] = useState(false);
  const testimonialRef = useRef(null);
  const testimonialVisibleRef = useRef(false);
  const pageVisibleRef = useRef(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => setHeroMotionReady(true), []);

  useEffect(() => {
    const onVisibilityChange = () => {
      const visible = document.visibilityState === "visible";
      pageVisibleRef.current = visible;
      setPageVisible(visible);
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!testimonialRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      testimonialVisibleRef.current = entry.isIntersecting;
      setTestimonialVisible(entry.isIntersecting);
    }, { threshold: 0.25 });
    observer.observe(testimonialRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (testimonialVisibleRef.current && pageVisibleRef.current) {
        setTestimonial((value) => (value + 1) % testimonials.length);
      } else {
        setTestimonialQueued(true);
      }
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [testimonial]);

  useEffect(() => {
    if (!testimonialQueued || !testimonialVisible || !pageVisible) return;
    setTestimonialQueued(false);
    setTestimonial((value) => (value + 1) % testimonials.length);
  }, [testimonialQueued, testimonialVisible, pageVisible]);

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
  const moveWorkflowFocus = (index) => {
    setWorkflow(index);
    window.requestAnimationFrame(() => document.getElementById(`workflow-tab-${index}`)?.focus());
  };

  return (
    <MotionConfig reducedMotion="user">
      <main id="top">
        <Header />

        <section className="hero">
          <motion.img
            className="hero-background"
            src="/assets/rachel-hero-coast-v2.webp"
            srcSet="/assets/rachel-hero-coast-v2.webp 1x, /assets/rachel-hero-coast-v2@2x.webp 2x"
            alt=""
            aria-hidden="true"
            width={1535}
            height={1024}
            loading="eager"
            fetchPriority="high"
            initial={false}
            animate={heroMotionReady ? { opacity: 1, scale: 1 } : { opacity: 0.001, scale: 1.025 }}
            transition={motionTransition(reducedMotion, { type: "spring", bounce: 0, delay: 0.05, duration: 1.1 })}
          />
          <motion.img
            className="hero-phone"
            src="/assets/rachel-hero-phone-cutout-v4.webp"
            srcSet="/assets/rachel-hero-phone-cutout-v4.webp 1x, /assets/rachel-hero-phone-cutout-v4@2x.webp 2x"
            alt="Rachel handling a meeting change and follow-up in iMessage"
            width={618}
            height={1274}
            loading="eager"
            initial={false}
            animate={heroMotionReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.001, y: 24, scale: 0.985 }}
            transition={motionTransition(reducedMotion, { type: "spring", bounce: 0.08, delay: 0.28, duration: 0.9 })}
          />
          <div className="hero-inner">
            <motion.div
              className="hero-copy"
              initial={false}
              animate={heroMotionReady ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 18 }}
              transition={motionTransition(reducedMotion, { type: "spring", bounce: 0.08, delay: 0.18, duration: 0.8 })}
            >
              <motion.div className="announcement" initial={false} animate={heroMotionReady ? { opacity: 1, y: 0 } : { opacity: 0.001, y: -14 }} transition={motionTransition(reducedMotion, { type: "spring", bounce: 0.2, delay: 0.62, duration: 0.5 })}><span>New</span><strong>Your AI chief of staff in iMessage</strong></motion.div>
              <h1>Meet Rachel,<br /><span>your day already handled.</span></h1>
              <p>Rachel keeps track of what matters, takes care of the follow-through, and texts you before anything slips.</p>
              <div className="hero-actions">
                <BlackButton><ChatCircleDots size={19} weight="regular" />Text Rachel</BlackButton>
                <motion.a
                  className="hero-secondary"
                  href="#steps"
                  whileHover={{ y: -1, backgroundColor: "rgba(255, 255, 255, .94)" }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  transition={motionTransition(reducedMotion, INTERACTION_SPRING)}
                >
                  <span>See how it works</span>
                  <CaretRight size={17} weight="bold" aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="hero-coda"
            initial={false}
            animate={heroMotionReady ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 16 }}
            transition={motionTransition(reducedMotion, { type: "spring", bounce: 0.08, delay: 0.75, duration: 0.7 })}
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
            <div className="primary-feature-grid">
              {primaryFeatures.map(({ icon: Icon, title, copy }) => (
                <motion.article className="feature-copy-card" key={title} {...revealProps("feature", reducedMotion)}>
                  <Icon size={26} weight="fill" />
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </div>
            <div className="visual-feature-grid">
              {visualFeatures.map(({ icon: Icon, title, copy, image, key }) => (
                <motion.article className={`visual-feature visual-${key}`} key={title} {...revealProps("feature", reducedMotion)}>
                  <div className="visual-feature-art">
                    <img src={image} alt="" />
                    {key === "search" && <><RachelIdentityMark className="asset-mark-thread-top" /><RachelIdentityMark className="asset-mark-thread-bottom" /></>}
                  </div>
                  <div className="visual-feature-copy"><h4><Icon size={27} weight="fill" />{title}</h4><p>{copy}</p></div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <motion.section className="workflow section" animate={workflowSectionHeight === undefined ? undefined : { height: workflowSectionHeight }} transition={interactionTransition}>
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
                      onClick={() => setWorkflow(index)}
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
              <motion.div className="workflow-panel" id="workflow-panel" role="tabpanel" aria-labelledby={`workflow-tab-${workflow}`} animate={workflowPanelHeight === undefined ? undefined : { height: workflowPanelHeight }} transition={interactionTransition}>
                <AnimatePresence initial={false}>
                  <motion.div className={`workflow-state workflow-state-${workflow}`} key={workflow} initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(20px)" }} transition={interactionTransition}>
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
              <div className="benefit-grid">
                {[
                  ["Brief", "Start every day with the decisions, priorities, and follow-ups that actually need you.", BellRinging],
                  ["Draft", "Turn rough thoughts into polished emails, updates, and agendas in your own voice.", PencilSimpleLine],
                  ["Schedule", "Find the right time, prepare the context, and keep every commitment moving.", CalendarCheck],
                  ["Follow up", "Remember every promise and close the loop with the right person at the right moment.", ArrowBendUpRight],
                ].map(([title, copy, Icon]) => (
                  <article key={title}><Icon size={18} weight="fill" /><h4>{title}</h4><p>{copy}</p></article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="steps section" id="steps">
          <div className="section-shell">
            <SectionIntro title={<>From hello to help<br />in three steps</>} copy="Add Rachel to iMessage and get a useful first brief in minutes." />
            <div className="steps-list">
              <div className="step-line" />
              {steps.map((step, index) => (
                <article className="step-row" key={step.number}>
                  <div className="step-number"><span />Step {step.number}</div>
                  <div className="step-visual"><img src={step.image} alt="" />{index === 0 && <RachelIdentityMark className="asset-mark-step-contact" />}</div>
                  <div className="step-copy"><h4>{step.title}</h4><p>{step.copy}</p><a href="#features">Know more</a></div>
                </article>
              ))}
            </div>
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

        <section className="testimonials section" id="testimonials">
          <div className="section-shell">
            <SectionIntro title="What people say after week one" copy="Founders, operators, and busy teams get the same thing back: attention for the work that matters." />
            <motion.div
              className="testimonial-slider"
              ref={testimonialRef}
              {...revealProps("flow", reducedMotion)}
            >
              <article className="testimonial-card">
                <div className="testimonial-person"><img src={testimonials[testimonial].avatar} alt="" /><div><h4>{testimonials[testimonial].name}</h4><p>{testimonials[testimonial].role}</p></div></div>
                <div className="stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={24} weight="fill" />)}</div>
                <blockquote>&quot;{testimonials[testimonial].quote}&quot;</blockquote>
              </article>
              <div className="testimonial-navigation">
                <motion.button aria-label="Previous review" onClick={() => setTestimonial((value) => (value - 1 + testimonials.length) % testimonials.length)} whileHover={{ opacity: 0.8 }} whileTap={{ opacity: 0.6, scale: 0.9 }} transition={interactionTransition}><CaretLeft size={16} weight="bold" /></motion.button>
                <motion.button aria-label="Next review" onClick={() => setTestimonial((value) => (value + 1) % testimonials.length)} whileHover={{ opacity: 0.8 }} whileTap={{ opacity: 0.6, scale: 0.9 }} transition={interactionTransition}><CaretRight size={16} weight="bold" /></motion.button>
              </div>
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

        <section className="final-cta">
          <img src="/assets/cta-background.avif" alt="" />
          <div><h2>One text closer<br />to done</h2><p>Your calendar, inbox, follow-ups, and loose ends — quietly handled by Rachel.</p><BlackButton>Text Rachel</BlackButton></div>
        </section>

        <footer>
          <div className="footer-inner">
            <div><Brand /><p>The chief of staff in your texts.</p></div>
            <div className="footer-links"><strong>Sections</strong><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#steps">Setup</a></div>
            <div className="footer-links"><strong>Contact</strong><a href="mailto:hello@rachel.im">Email</a><a href="#top">Privacy</a><a href="#top">Terms</a></div>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}

export default App;
