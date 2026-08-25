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
import { getRachelSmsHref } from "./sms-link.js";
import { scrollToRouteLocation } from "./route-scroll.js";

const LUXURY_EASE = [0.16, 1, 0.3, 1];
const INTERACTION_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.75 };
const LAYOUT_SPRING = { type: "spring", stiffness: 300, damping: 32, mass: 0.85 };
const FAQ_ITEM_SPRING = { type: "spring", stiffness: 360, damping: 34, mass: 0.8 };
const FEATURE_REVEAL_SPRING = { duration: 0.56, ease: LUXURY_EASE, delay: 0.04 };
const FLOW_REVEAL_SPRING = { duration: 0.68, ease: LUXURY_EASE, delay: 0.05 };
const FAQ_REVEAL_SPRING = { duration: 0.5, ease: LUXURY_EASE, delay: 0.04 };
const REDUCED_FADE = { duration: 0.15, ease: "linear" };
const RACHEL_CTA_LABEL = "Text your chief of staff";

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
    <a className="brand" href="/" aria-label="Rachel home">
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

function MessagesCta({ className = "", onClick, variants }) {
  const reducedMotion = useReducedMotion();
  const transition = motionTransition(reducedMotion, { duration: 0.15, ease: [0.2, 0, 0, 1] });

  return (
    <motion.a
      className={`messages-cta ${className}`}
      href={getRachelSmsHref()}
      onClick={onClick}
      variants={variants}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={transition}
    >
      <img src="/assets/imessage-icon.png" alt="" width="20" height="20" aria-hidden="true" />
      <span>{RACHEL_CTA_LABEL}</span>
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
            <a href="/#features">Product</a>
            <a href="/#workflow">Workflows</a>
            <a href="/#community">Use Cases</a>
            <a href="/docs">Docs</a>
            <a href="/pricing">Pricing</a>
          </nav>
          <MessagesCta className="header-cta" />
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
              {[["/#features", "Product"], ["/#workflow", "Workflows"], ["/#community", "Use Cases"], ["/docs", "Docs"], ["/pricing", "Pricing"]].map(([href, label], index) => (
                <motion.a custom={index} variants={menuItemVariants} href={href} onClick={() => setOpen(false)} key={href}>{label}</motion.a>
              ))}
              <motion.div custom={5} variants={menuItemVariants}><MessagesCta onClick={() => setOpen(false)} /></motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

const primaryFeatures = [
  { icon: SunHorizon, title: "Morning Brief", copy: "Ask for a focused view of the priorities, decisions, and reminders that need you next." },
  { icon: ArrowsClockwise, title: "Follow-Through", copy: "Turn loose ends into reminders and clear next steps without leaving your conversation." },
  { icon: ShieldCheck, title: "You Stay in Control", copy: "Rachel prepares the work, then asks before anything important is sent, booked, or shared." },
];

const visualFeatures = [
  { icon: Brain, title: "Compounding Memory", copy: "People, preferences, plans, and promises — remembered in context.", image: "/assets/rachel-feature-memory.png", key: "folders" },
  { icon: PlugsConnected, title: "Permissioned Connections", copy: "Connected tools are enabled account by account during early access.", image: "/assets/rachel-feature-tools.png", key: "icloud" },
  { icon: ChatCircleDots, title: "One Text Thread", copy: "Delegate naturally in iMessage. No dashboard and no new habit.", image: "/assets/rachel-feature-thread.png", key: "search" },
];

const workflowStates = [
  {
    label: "Connect your world",
    title: "Connect What Matters",
    eyebrow: "Calendar context first. More connections as enabled.",
    copy: "Choose what Rachel can understand. Early-access connections are permissioned and activated account by account.",
    stat: "Permissioned Setup",
    statCopy: "You choose every connection",
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
    title: "Prepare the Next Step",
    eyebrow: "Draft, remind, organize, and follow up.",
    copy: "Rachel gets the next step ready and asks before an important external action happens.",
    stat: "Approval First",
    statCopy: <><strong>You stay in control</strong><br />Before anything external</>,
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
  { number: "02", image: "/assets/rachel-step-connect.png", title: "Choose Your Context", copy: "Share what matters in the conversation. Eligible connected tools are enabled account by account, with permission boundaries you can see." },
  { number: "03", image: "/assets/rachel-step-handoff.png", title: "Hand Off Your First Task", copy: "Ask a question, set a reminder, or request a draft. Rachel prepares the work and checks with you before an important external action." },
];

const freeFeatures = ["Private iMessage conversation", "Questions and reminders", "Personal context", "Approval before important actions", "A simple way to try Rachel", "Standard support"];
const proFeatures = ["Everything in Free", "Expanded recurring requests", "More proactive follow-through", "Meeting prep and drafts", "Connected tools as enabled", "Priority support"];

const comparisonRows = [
  ["Rachel requests", "Starter access", "Expanded access"],
  ["Questions and reminders", "check", "check"],
  ["Approval before external actions", "check", "check"],
  ["Proactive follow-through", "Limited", "Expanded"],
  ["Connected tools", "As enabled", "As enabled"],
  ["Support", "Standard", "Priority"],
];

const communityStories = [
  { title: "Founder workflow", label: "Monday, 8:02 AM", icon: SunHorizon, copy: "Ask for a focused brief: the decisions that need you, the reminders you set, and the next step for each." },
  { title: "Operator workflow", label: "Before the next meeting", icon: CalendarCheck, copy: "Bring the context you have shared into one concise prep note, with the open question made clear." },
  { title: "Creative lead workflow", label: "From a half-formed thought", icon: PencilSimpleLine, copy: "Turn a rough idea into a polished client note in your voice, ready for your review in iMessage." },
  { title: "Consultant workflow", label: "After the call", icon: ArrowBendUpRight, copy: "Turn commitments into clear reminders and draft the follow-up without sending anything before approval." },
];

const faqs = [
  ["Does Rachel really work inside iMessage?", "Yes. Rachel lives in a private iMessage thread, so asking for help feels as natural as texting a person you trust."],
  ["Can Rachel connect to my existing work tools?", "Connections are in early access and are enabled account by account. Rachel starts with the context available to your account, and you choose every permission."],
  ["Will Rachel ask first?", "Yes. Rachel can prepare a draft or proposed next step, but asks for your approval before an important external action."],
  ["How is Rachel approaching privacy and security?", "Rachel is being designed around permissioned connections and approval-first actions. Detailed security, retention, and data-handling terms will be published before accounts are activated."],
  ["Will I be able to export or delete my Rachel data?", "Data controls are part of the product plan. The exact export, deletion, and retention controls will be documented before accounts are activated."],
];

const pricingFaqs = [
  ["Can I start without paying?", "Yes. The Free plan is the simplest way to begin a private Rachel conversation and try core questions and reminders."],
  ["What changes when I choose annual billing?", "Rachel Pro is $29 month to month or $24 per month when billed yearly. Use the switch on the Pro card to compare the two monthly rates."],
  ["Are connected tools included in every plan?", "Connected tools are still in early access and are enabled account by account. Availability depends on your account and the permissions you choose."],
  ["Does Rachel take actions without asking?", "Important external actions stay approval-first. Rachel prepares the work and asks you before it is sent, booked, or shared."],
  ["Can I change plans later?", "Yes. Plan and billing controls will be available with account activation, and you can contact support whenever you need help."],
  ["Where can I read the product details?", <>The <a href="/docs">Rachel docs</a> explain the current workflow, connected-tool boundaries, and privacy approach.</>],
];

function RouteMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    const frame = window.requestAnimationFrame(() => scrollToRouteLocation());
    return () => window.cancelAnimationFrame(frame);
  }, [description, title]);
  return null;
}

function SectionIntro({ title, copy, align = "center" }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div className={`section-intro ${align === "left" ? "is-left" : ""}`} {...groupRevealProps(reducedMotion, 0.08)}>
      <motion.h2 variants={revealVariants(reducedMotion, 16)}>{title}</motion.h2>
      <motion.p variants={revealVariants(reducedMotion, 10)}>{copy}</motion.p>
    </motion.div>
  );
}

function FaqList({ items = faqs, idPrefix = "faq" }) {
  const [openFaqs, setOpenFaqs] = useState(() => new Set());
  const reducedMotion = useReducedMotion();
  const toggleFaq = (index) => {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <motion.div className="faq-list" {...revealProps("faq", reducedMotion)}>
      {items.map(([question, answer], index) => {
        const open = openFaqs.has(index);
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <motion.article className={`faq-item ${open ? "open" : ""}`} key={question} layout transition={motionTransition(reducedMotion, FAQ_ITEM_SPRING)}>
            <button onClick={() => toggleFaq(index)} aria-expanded={open} aria-controls={answerId}>
              <h4>{question}</h4>
              <span className="faq-icon" aria-hidden="true"><motion.span className="faq-icon-bar" initial={false} animate={{ rotate: open ? 0 : 90 }} transition={motionTransition(reducedMotion, FAQ_ITEM_SPRING)} /><span className="faq-icon-bar" /></span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div id={answerId} className="faq-answer" initial={{ opacity: 0, filter: "blur(5px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(5px)" }} transition={motionTransition(reducedMotion, FAQ_ITEM_SPRING)}><p>{answer}</p></motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
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
            <p>{pro ? "Expand recurring requests, follow-through, prepared work, and support." : "Start a private conversation, ask questions, and set useful reminders."}</p>
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
        <div className="pricing-button"><MessagesCta /></div>
      </div>
    </motion.article>
  );
}

function FinalCta({ standalone = false }) {
  const reducedMotion = useReducedMotion();
  return (
    <section className={`final-cta ${standalone ? "standalone-final-cta" : ""}`} id={standalone ? "start" : "final-cta"}>
      <motion.div className="final-cta-card" {...revealProps("flow", reducedMotion)}>
        {!standalone && (
          <motion.img
            src="/assets/rachel-final-journey-v2.png"
            alt="A fast-moving team preparing equipment beside a fully stocked service van"
            initial={{ scale: reducedMotion ? 1 : 1.035 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={motionTransition(reducedMotion, { duration: 1.1, ease: LUXURY_EASE })}
          />
        )}
        <div className="final-cta-scrim" aria-hidden="true" />
        <motion.div className="final-cta-copy" {...groupRevealProps(reducedMotion, 0.08)}>
          <motion.h2 variants={revealVariants(reducedMotion, 12)}>{standalone ? "Start with one text." : "Meet your new chief of staff."}</motion.h2>
          {standalone && <motion.p variants={revealVariants(reducedMotion, 10)}>Tell Rachel what is on your plate. You stay in control of what happens next.</motion.p>}
          <MessagesCta
            className="final-cta-button"
            variants={revealVariants(reducedMotion, 8)}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const reducedMotion = useReducedMotion();
  return (
    <footer>
      <div className="footer-inner">
        <div><Brand /><p>The chief of staff in your texts.</p></div>
        <div className="footer-links"><strong>Explore</strong><a href="/#features">Product</a><a href="/#workflow">Workflows</a><a href="/#community">Use Cases</a><a href="/docs">Docs</a><a href="/pricing">Pricing</a></div>
        <div className="footer-links footer-contact"><strong>Contact</strong><a href="mailto:hello@rachel.im">Email</a><MessagesCta className="footer-cta" /></div>
      </div>
      <motion.div className="signature-lockup" initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }} whileInView={{ opacity: 0.13, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={motionTransition(reducedMotion, { duration: 0.9, ease: LUXURY_EASE })} aria-hidden="true">
        <img src="/assets/rachel-mark-v2.png" alt="" />
        <span>Rachel</span>
      </motion.div>
    </footer>
  );
}

function HomePage() {
  const [workflow, setWorkflow] = useState(0);
  const [workflowDirection, setWorkflowDirection] = useState(1);
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
        <RouteMeta title="Rachel — Your AI chief of staff in iMessage" description="Ask questions, set reminders, prepare work, and stay in control with Rachel in iMessage." />
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
                <MessagesCta />
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
            <span>Plans, promises, and loose ends compete for the same limited attention.</span>
            <strong>Rachel gives them one place to become questions, reminders, and clear next steps.</strong>
          </motion.h3>
        </section>

        <section className="features section" id="features">
          <div className="section-shell">
            <SectionIntro title={<>Everything a great<br />chief of staff remembers</>} copy="Rachel keeps the context you share close, turns requests into clear next steps, and helps you follow through." />
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

        <motion.section className="workflow section" id="workflow" animate={workflowSectionHeight === undefined ? undefined : { height: workflowSectionHeight }} transition={motionTransition(reducedMotion, LAYOUT_SPRING)}>
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
                  ["Draft", "Turn rough thoughts into polished messages, updates, and agendas in your own voice.", PencilSimpleLine],
                  ["Schedule", "Review the timing, prepare the context, and turn a commitment into a clear next step.", CalendarCheck],
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
            <SectionIntro title={<>From hello to help<br />in three steps</>} copy="Open Rachel in iMessage and start with one useful request." />
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
                <div className="comparison-row" key={feature}><h4>{feature}</h4><span>{free === "check" ? <CheckCircle size={16} weight="fill" /> : free}</span><span>{pro === "check" ? <CheckCircle size={16} weight="fill" /> : pro}</span></div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="section-shell faq-shell">
            <div className="faq-heading"><SectionIntro align="left" title={<>Frequently asked<br />questions</>} copy="Still have questions? Write to us at hello@rachel.im" /></div>
            <FaqList />
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
            <motion.div className="live-pill" variants={revealVariants(reducedMotion, 8)}><span aria-hidden="true" />How Rachel works</motion.div>
            <motion.h2 id="live-metrics-title" variants={revealVariants(reducedMotion, 16)}>Familiar by design.<br />Clear at every step.</motion.h2>
            <motion.div className="metrics-grid" variants={revealVariants(reducedMotion, 14)}>
              <article>
                <strong className="metrics-word">One thread</strong>
                <h3>Ask naturally</h3>
                <p>Questions, reminders, and prepared work stay in a private iMessage conversation.</p>
              </article>
              <article>
                <strong className="metrics-word">Your approval</strong>
                <h3>Stay in control</h3>
                <p>Rachel checks with you before an important external action is sent, booked, or shared.</p>
              </article>
            </motion.div>
          </motion.div>
        </section>

        <FinalCta />
        <Footer />
      </main>
    </MotionConfig>
  );
}

const pricingFeatureGroups = [
  {
    title: "Conversation",
    rows: [
      ["Private iMessage conversation", "check", "check"],
      ["Questions and reminders", "check", "check"],
      ["Personal context", "check", "check"],
      ["Approval before important actions", "check", "check"],
    ],
  },
  {
    title: "Ways Rachel helps",
    rows: [
      ["Recurring requests", "Starter access", "Expanded access"],
      ["Meeting prep and drafts", "Basic", "Expanded"],
      ["Proactive follow-through", "Limited", "Expanded"],
      ["Connected tools", "Early access", "As enabled"],
    ],
  },
  {
    title: "Account",
    rows: [
      ["Billing", "No charge", "$29 monthly or $24 yearly"],
      ["Support", "Standard", "Priority"],
    ],
  },
];

function ComparisonValue({ value }) {
  return value === "check" ? <CheckCircle size={18} weight="fill" aria-label="Included" /> : value;
}

function PricingPage() {
  const reducedMotion = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      <main className="standalone-page pricing-page" id="top">
        <RouteMeta title="Rachel Pricing — Free and Pro" description="Start with Rachel Free, or choose Pro for expanded requests, follow-through, drafts, and support." />
        <Header />

        <section className="page-hero pricing-page-hero">
          <motion.div className="page-hero-inner" {...groupRevealProps(reducedMotion, 0.08)}>
            <motion.span className="page-kicker" variants={revealVariants(reducedMotion, 8)}>Rachel pricing</motion.span>
            <motion.h1 variants={revealVariants(reducedMotion, 18)}>Predictable pricing<br />for a calmer day.</motion.h1>
            <motion.p variants={revealVariants(reducedMotion, 12)}>Start free. Choose Pro when you want more recurring requests, proactive follow-through, and prepared work.</motion.p>
          </motion.div>
        </section>

        <section className="standalone-plans" aria-labelledby="plans-title">
          <h2 className="sr-only" id="plans-title">Rachel plans</h2>
          <div className="standalone-plan-grid"><PricingCard /><PricingCard pro /></div>
          <motion.p className="early-access-note" {...revealProps("feature", reducedMotion)}><ShieldCheck size={18} weight="fill" aria-hidden="true" />Rachel is in early access. Connected tools are enabled account by account, and important external actions always require your approval.</motion.p>
        </section>

        <section className="pricing-compare" aria-labelledby="compare-title">
          <motion.div className="standalone-section-heading" {...groupRevealProps(reducedMotion, 0.07)}>
            <motion.span className="page-kicker" variants={revealVariants(reducedMotion, 8)}>Compare all features</motion.span>
            <motion.h2 id="compare-title" variants={revealVariants(reducedMotion, 14)}>Choose the room you need.</motion.h2>
            <motion.p variants={revealVariants(reducedMotion, 10)}>Both plans keep Rachel in iMessage and keep you in control. Pro expands how much ongoing work you can delegate.</motion.p>
          </motion.div>
          <motion.div className="feature-table" {...revealProps("feature", reducedMotion)}>
            <table>
              <caption className="sr-only">Rachel Free and Pro feature comparison</caption>
              <colgroup><col className="feature-name-column" /><col /><col /></colgroup>
              <thead><tr className="feature-table-head"><th scope="col">Feature</th><th scope="col">Free</th><th scope="col">Pro</th></tr></thead>
              {pricingFeatureGroups.map((group, groupIndex) => (
                <tbody className="feature-table-group" key={group.title} aria-labelledby={`feature-group-${groupIndex}`}>
                  <tr className="feature-table-group-heading"><th colSpan="3"><h3 id={`feature-group-${groupIndex}`}>{group.title}</h3></th></tr>
                  {group.rows.map(([feature, free, pro]) => (
                    <tr className="feature-table-row" key={feature}>
                      <th scope="row">{feature}</th><td><ComparisonValue value={free} /></td><td><ComparisonValue value={pro} /></td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </motion.div>
        </section>

        <section className="faq standalone-faq" id="faq">
          <div className="section-shell faq-shell">
            <div className="faq-heading"><SectionIntro align="left" title={<>Pricing,<br />made clear</>} copy="Read the essentials here, then explore the docs for the current product boundaries." /></div>
            <FaqList items={pricingFaqs} idPrefix="pricing-faq" />
          </div>
        </section>

        <FinalCta standalone />
        <Footer />
      </main>
    </MotionConfig>
  );
}

const docsNavigation = [
  ["overview", "Overview"],
  ["start", "Start in iMessage"],
  ["ask", "Ask naturally"],
  ["approvals", "Approvals"],
  ["connections", "Connected tools"],
  ["memory", "Memory and privacy"],
  ["plans", "Plans and support"],
];

function DocsPage() {
  const reducedMotion = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      <main className="standalone-page docs-page" id="top">
        <RouteMeta title="Rachel Docs — Delegate from iMessage" description="Learn how to start with Rachel, ask naturally, review approvals, and understand connected-tool and privacy boundaries." />
        <Header />

        <section className="page-hero docs-page-hero">
          <motion.div className="page-hero-inner" {...groupRevealProps(reducedMotion, 0.08)}>
            <motion.span className="page-kicker" variants={revealVariants(reducedMotion, 8)}>Rachel documentation</motion.span>
            <motion.h1 variants={revealVariants(reducedMotion, 18)}>Delegate from iMessage.<br />Stay in control.</motion.h1>
            <motion.p variants={revealVariants(reducedMotion, 12)}>The practical guide to starting a conversation, asking for help, and deciding what Rachel can do next.</motion.p>
          </motion.div>
        </section>

        <div className="docs-layout">
          <aside className="docs-sidebar" aria-label="Documentation navigation">
            <span>On this page</span>
            <nav>{docsNavigation.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
            <a className="docs-support-link" href="mailto:hello@rachel.im">Need help? Email us</a>
          </aside>

          <article className="docs-content">
            <motion.section className="docs-section" id="overview" {...revealProps("feature", reducedMotion)}>
              <span className="docs-section-label">01 / Overview</span>
              <h2>Rachel is your AI chief of staff in iMessage.</h2>
              <p>Rachel gives you one private conversation for questions, reminders, context, and prepared work. You write naturally. Rachel replies with what she knows, what she needs, and the next step you can approve.</p>
              <div className="docs-callout"><RachelIdentityMark /><div><strong>Current product boundary</strong><p>Core conversation and reminders are available first. Connected tools and broader actions are early access, permissioned, and enabled account by account.</p></div></div>
            </motion.section>

            <motion.section className="docs-section" id="start" {...revealProps("feature", reducedMotion)}>
              <span className="docs-section-label">02 / Start in iMessage</span>
              <h2>Start with one real thing.</h2>
              <p>Open Rachel from any “Text your chief of staff” button. Messages opens with “Hi Rachel” filled in; you review it and press Send yourself.</p>
              <ol className="docs-steps">
                <li><span>1</span><div><strong>Open the conversation</strong><p>Use Rachel on iPhone, iPad, or Mac with Messages available.</p></div></li>
                <li><span>2</span><div><strong>Say what is on your plate</strong><p>Share a task, a reminder, or a question in your own words.</p></div></li>
                <li><span>3</span><div><strong>Confirm important details</strong><p>Rachel may ask for timing, context, or permission before moving forward.</p></div></li>
              </ol>
            </motion.section>

            <motion.section className="docs-section" id="ask" {...revealProps("feature", reducedMotion)}>
              <span className="docs-section-label">03 / Ask naturally</span>
              <h2>No commands to memorize.</h2>
              <p>A useful request says what you need, when it matters, and any boundary Rachel should respect.</p>
              <div className="docs-examples">
                <blockquote>“Remind me Friday morning to follow up on the proposal.”</blockquote>
                <blockquote>“Turn these notes into a concise update. Keep it warm and do not send it.”</blockquote>
                <blockquote>“What should I prepare before my next meeting?”</blockquote>
              </div>
            </motion.section>

            <motion.section className="docs-section" id="approvals" {...revealProps("feature", reducedMotion)}>
              <span className="docs-section-label">04 / Approvals</span>
              <h2>Prepared by Rachel. Decided by you.</h2>
              <p>Rachel can draft a response or propose a next step. Before an important external action—such as sending, booking, or sharing—Rachel asks for your approval. Read the details, request a change, or approve when it is right.</p>
            </motion.section>

            <motion.section className="docs-section" id="connections" {...revealProps("feature", reducedMotion)}>
              <span className="docs-section-label">05 / Connected tools</span>
              <h2>Connections are explicit, not assumed.</h2>
              <p>Connected tools are early-access capabilities enabled for eligible accounts. Availability can differ by account. When a connection is offered, Rachel should explain what it can access and ask you to authorize that permission.</p>
              <ul className="docs-checklist"><li><CheckCircle size={18} weight="fill" />You choose each connection.</li><li><CheckCircle size={18} weight="fill" />A connection does not remove approval gates.</li><li><CheckCircle size={18} weight="fill" />Rachel tells you when requested context is unavailable.</li></ul>
            </motion.section>

            <motion.section className="docs-section" id="memory" {...revealProps("feature", reducedMotion)}>
              <span className="docs-section-label">06 / Memory and privacy</span>
              <h2>Context should make Rachel useful—not mysterious.</h2>
              <p>Rachel can use the context shared in your conversation to make future replies more relevant. Permission, retention, export, and deletion controls will be documented as accounts are activated. Do not share credentials or highly sensitive information in a message.</p>
            </motion.section>

            <motion.section className="docs-section" id="plans" {...revealProps("feature", reducedMotion)}>
              <span className="docs-section-label">07 / Plans and support</span>
              <h2>Start free, then expand when you need to.</h2>
              <p>Free is for trying the core Rachel conversation. Pro is $29 per month, or $24 per month when billed yearly, for expanded requests, follow-through, prepared work, and priority support.</p>
              <div className="docs-inline-links"><a href="/pricing">Compare plans <CaretRight size={16} weight="bold" /></a><a href="mailto:hello@rachel.im">Contact support <CaretRight size={16} weight="bold" /></a></div>
            </motion.section>
          </article>
        </div>
        <Footer />
      </main>
    </MotionConfig>
  );
}

export function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  if (pathname === "/pricing") return <PricingPage />;
  if (pathname === "/docs") return <DocsPage />;
  return <HomePage />;
}

export default App;
