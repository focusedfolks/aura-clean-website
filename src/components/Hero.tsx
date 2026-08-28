import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowIcon } from "./icons";

const HOLD_MS = 3800;
const EASE = [0.16, 1, 0.3, 1] as const;

type Floater = {
  src: string;
  className: string;
  layer: "back" | "front";
  depth: number;
  delay: number;
};

const VARIANTS = [
  {
    id: "charcoal",
    src: "/product-handwash-charcoal.webp?v=11",
    name: "Charcoal",
    line: "Charcoal Hand Wash",
    word: "DETOX",
    slogan: "Magnetic Purity.",
    description:
      "Draw out the unseen. A deep, unapologetic cleanse with the raw power of activated charcoal.",
    bg: "#3D4450",
    ink: "#F4F1EA",
    cta: "#F4F1EA",
    ctaInk: "#2C3138",
    floats: [
      {
        src: "/charcoal-rocks.webp",
        className: "left-[-1%] top-[6%] w-[min(28vw,260px)]",
        layer: "back",
        depth: 10,
        delay: 0.12,
      },
      {
        src: "/charcoal-rocks.webp",
        className: "right-[-2%] top-[8%] w-[min(24vw,230px)] -scale-x-100",
        layer: "back",
        depth: 12,
        delay: 0.35,
      },
    ],
  },
  {
    id: "toilet",
    src: "/product-toilet.webp",
    name: "Toilet",
    line: "Powerful Toilet Cleaner",
    word: "POWER",
    slogan: "10X The Clean.",
    description: "Removes tough stains with a fresh fragrance. Deep cleaning that holds.",
    bg: "#1A3F7A",
    ink: "#F4F7FC",
    cta: "#F4F7FC",
    ctaInk: "#1A3F7A",
    floats: [
      {
        src: "/mint-toilet.webp",
        className: "left-[-1%] top-[10%] w-[min(26vw,240px)]",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/mint-toilet.webp",
        className: "right-[-2%] top-[12%] w-[min(22vw,210px)] -scale-x-100 rotate-6",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
  {
    id: "bathroom",
    src: "/product-bathroom.webp",
    name: "Bathroom",
    line: "Disinfectant Bathroom Cleaner",
    word: "FRESH",
    slogan: "Tiles That Gleam.",
    description: "10X better cleaning for sinks, tiles and fittings. 99.9% germs gone.",
    bg: "#6E1010",
    ink: "#FFF5F5",
    cta: "#FFF5F5",
    ctaInk: "#6E1010",
    floats: [
      {
        src: "/bathroom-flower.webp",
        className: "left-[-2%] top-[8%] w-[min(28vw,260px)]",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/bathroom-flower.webp",
        className: "right-[-2%] top-[10%] w-[min(26vw,240px)] -scale-x-100 rotate-6",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
  {
    id: "laundry",
    src: "/product-laundry.webp?v=7",
    name: "Laundry",
    line: "Laundry Detergent Liquid",
    word: "CLEAN",
    slogan: "Clothes That Care.",
    description: "Deep clean for everyday loads with a fresh fragrance that stays gentle on fabric.",
    bg: "#1E4F9C",
    ink: "#F4F7FC",
    cta: "#F4F7FC",
    ctaInk: "#1E4F9C",
    floats: [
      {
        src: "/laundry-flower.webp?v=2",
        className: "left-[-1%] top-[10%] w-[min(24vw,220px)] opacity-90",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/laundry-flower.webp?v=2",
        className: "right-[-1%] top-[12%] w-[min(22vw,200px)] -scale-x-100 rotate-6 opacity-85",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
  {
    id: "floor",
    src: "/product-floor-lavender.webp?v=1",
    name: "Floor",
    line: "Premium Floor Cleaner, Lavender",
    word: "SHINE",
    slogan: "Floors That Glow.",
    description: "Plant-extract powered clean for lasting shine, freshness, and 10X stronger litter & bacteria clean.",
    bg: "#2A1848",
    ink: "#F4F1EA",
    cta: "#F4F1EA",
    ctaInk: "#2A1848",
    floats: [
      {
        src: "/floor-floral.webp?v=1",
        className: "left-[-1%] top-[10%] w-[min(22vw,200px)] opacity-90",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/floor-floral.webp?v=1",
        className: "right-[-1%] top-[14%] w-[min(20vw,180px)] -scale-x-100 rotate-6 opacity-85",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
  {
    id: "dish",
    src: "/product-dish.webp",
    name: "Dish",
    line: "Dish Wash Liquid",
    word: "LEMON",
    slogan: "Grease, Gone.",
    description: "Tough on grease, gentle on hands, with a fresh lemon fragrance.",
    bg: "#C4A000",
    ink: "#1C1408",
    cta: "#1C1408",
    ctaInk: "#F5C400",
    floats: [
      {
        src: "/lemon-dish.webp",
        className: "left-[-1%] top-[10%] w-[min(26vw,240px)]",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/lemon-dish.webp",
        className: "right-[-2%] top-[14%] w-[min(22vw,210px)] -scale-x-100 rotate-6",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
] as const;

/** Split product word so sides stay readable around the bottle (e.g. POWER → PO | WER). */
function splitHeroWord(word: string) {
  const mid = Math.floor(word.length / 2);
  return {
    left: word.slice(0, mid),
    right: word.slice(mid),
  };
}

function HeroWordBack({
  word,
  ink,
  reduce,
}: {
  word: string;
  ink: string;
  reduce: boolean | null;
}) {
  const { left } = splitHeroWord(word);
  const inkVar = { ["--hero-word-ink" as string]: ink };

  return (
    <>
      <motion.p
        aria-hidden="true"
        className="hero-word hero-word-left"
        style={inkVar}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.04 }}
      >
        {left}
      </motion.p>
      <motion.p
        aria-hidden="true"
        className="hero-word hero-word-full"
        style={inkVar}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.92 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.04 }}
      >
        {word}
      </motion.p>
    </>
  );
}

function HeroWordFront({
  word,
  ink,
  reduce,
}: {
  word: string;
  ink: string;
  reduce: boolean | null;
}) {
  const { right } = splitHeroWord(word);

  return (
    <motion.p
      aria-hidden="true"
      className="hero-word hero-word-right"
      style={{ ["--hero-word-ink" as string]: ink }}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 0.96 }}
      transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
    >
      {right}
    </motion.p>
  );
}

function StageFloat({
  item,
  index,
  px,
  py,
  reduce,
}: {
  item: Floater;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduce: boolean | null;
}) {
  const x = useTransform(px, [-0.5, 0.5], [-item.depth, item.depth]);
  const y = useTransform(py, [-0.5, 0.5], [-item.depth * 0.55, item.depth * 0.55]);

  return (
    <motion.div
      className={`absolute ${item.className}`}
      style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.08 * index, duration: 0.5, ease: EASE }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, item.layer === "front" ? -14 : -8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 5.2 + index * 0.35, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <img
          src={item.src}
          alt=""
          width={220}
          height={220}
          className="h-auto w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.28)]"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slide = VARIANTS[index];
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.hero = slide.id;
    return () => {
      delete document.documentElement.dataset.hero;
    };
  }, [slide.id]);

  useEffect(() => {
    if (reduce || isMobile) return;
    const onMove = (event: PointerEvent) => {
      px.set(event.clientX / window.innerWidth - 0.5);
      py.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce, isMobile]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % VARIANTS.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [index, reduce]);

  const back = slide.floats.filter(
    (item) => (item.layer as Floater["layer"]) === "back",
  );
  const front = slide.floats.filter(
    (item) => (item.layer as Floater["layer"]) === "front",
  );
  const calm = Boolean(reduce || isMobile);

  return (
    <motion.section
      className="hero-stage relative isolate h-dvh min-h-[640px] w-full max-w-full overflow-hidden"
      animate={{ backgroundColor: slide.bg }}
      transition={{ duration: reduce ? 0 : 0.75, ease: EASE }}
      aria-label="Aura Clean collection"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: calm ? 0.28 : 0.55, ease: EASE }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 18% 8%, rgba(255,255,255,0.2), transparent 58%), radial-gradient(ellipse 70% 50% at 50% 108%, rgba(0,0,0,0.22), transparent 60%)",
            }}
          />

          <HeroWordBack word={slide.word} ink={slide.ink} reduce={calm} />

          <div className="pointer-events-none absolute inset-0 z-[12] hidden md:block">
            {back.map((item, i) => (
              <StageFloat key={`${slide.id}-b-${i}`} item={item} index={i} px={px} py={py} reduce={reduce} />
            ))}
          </div>

          <div className="absolute inset-0 z-20 grid place-items-center px-[clamp(1rem,4vw,3rem)] py-[clamp(3.5rem,8vh,6rem)] max-md:items-start max-md:pt-[18vh]">
            <motion.img
              src={slide.src}
              alt={slide.line}
              width={480}
              height={960}
              className="hero-bottle"
              style={{ filter: "drop-shadow(0 32px 36px rgba(0,0,0,0.38))" }}
              animate={calm ? undefined : { y: [0, -8, 0] }}
              transition={calm ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <HeroWordFront word={slide.word} ink={slide.ink} reduce={calm} />

          <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
            {front.map((item, i) => (
              <StageFloat key={`${slide.id}-f-${i}`} item={item} index={i + 3} px={px} py={py} reduce={reduce} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-copy-panel absolute bottom-[7.4rem] left-0 right-auto z-40 w-full max-w-[34rem] px-[clamp(1rem,4.5vw,4.5rem)] max-md:right-0 max-md:max-w-none max-md:px-0 lg:bottom-[5.6rem]">
        <div className="hero-copy-inner relative min-h-[13.8rem] max-md:min-h-0">
          <AnimatePresence initial={false} mode={isMobile ? "wait" : undefined}>
            <motion.div
              key={slide.id}
              className="hero-copy absolute inset-0 max-md:relative max-md:inset-auto"
              initial={calm ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={calm ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: calm ? 0.25 : 0.45, ease: EASE }}
              style={{ color: slide.ink }}
            >
              <p className="hero-kicker m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.28em] opacity-55">
                {slide.line}
              </p>
              <h1 className="hero-slogan mt-2 max-w-[14ch] font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-black leading-[0.92] tracking-[-0.04em] max-md:mx-auto max-md:max-w-[16ch]">
                {slide.slogan}
              </h1>
              <p className="hero-desc mt-3 m-0 max-w-[36ch] text-[0.98rem] leading-relaxed opacity-75 max-md:mx-auto">
                {slide.description}
              </p>
              <Link
                to="/product"
                className="hero-cta mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-full px-7 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 max-md:mt-4 max-md:w-full"
                style={{ background: slide.cta, color: slide.ctaInk }}
              >
                Shop Now
                <span
                  className="grid size-7 place-items-center rounded-full"
                  style={{ background: "color-mix(in srgb, currentColor 16%, transparent)" }}
                  aria-hidden="true"
                >
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hero-tabs absolute inset-x-0 bottom-0 z-40 flex justify-end px-[clamp(1rem,4.5vw,4.5rem)] pb-[max(1.1rem,env(safe-area-inset-bottom))] max-md:px-0">
        <div
          className="hero-tabs-rail flex max-w-[min(100%,48rem)] flex-wrap justify-end gap-1.5"
          role="tablist"
          aria-label="Aura Clean products"
        >
          {VARIANTS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={item.line}
              onClick={() => setIndex(i)}
              className="hero-tab h-10 min-w-10 cursor-pointer rounded-full px-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3"
              style={{
                color: slide.ink,
                background: i === index ? "color-mix(in srgb, currentColor 14%, transparent)" : "transparent",
                boxShadow:
                  i === index
                    ? `inset 0 0 0 2px ${slide.ink}`
                    : `inset 0 0 0 1px color-mix(in srgb, ${slide.ink} 35%, transparent)`,
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={index}
        className="absolute bottom-0 left-0 z-50 h-[3px] w-full origin-left"
        style={{ background: slide.ink }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: reduce ? 0 : 1 }}
        transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
      />
    </motion.section>
  );
}
