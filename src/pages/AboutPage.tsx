import { Link } from "react-router-dom";
import { CATALOG_ORDER, PRODUCTS } from "../data/products";
import { ArrowIcon } from "../components/icons";

const SIGNATURES = [
  {
    id: "charcoal",
    src: "/product-handwash-charcoal.webp?v=11",
    word: "Detox",
    name: "Hand Wash - Charcoal",
    line: "Activated charcoal for a deep, unapologetic cleanse. 99.9% protection.",
  },
  {
    id: "lemon",
    src: "/product-handwash-lemon.webp",
    word: "Citrus",
    name: "Hand Wash - Lemon",
    line: "A burst of liquid sunshine. 3X faster germs kill, as on the pack.",
  },
  {
    id: "rose",
    src: "/product-handwash-rose.webp",
    word: "Bloom",
    name: "Hand Wash - Rose",
    line: "Soft rose fragrance. Same pack care - 3X faster germs kill.",
  },
] as const;

const STORIES = [
  {
    src: "/why-family.webp",
    alt: "A family washing hands together with Aura Clean Hand Wash.",
    kicker: "Hand wash",
    punch: "Clean hands. A healthier home.",
    line: "99.9% germ protection, gentle enough for every age at the sink, the first promise of a better day.",
  },
  {
    src: "/why-laundry.webp",
    alt: "Fresh laundry with Aura Clean Laundry Detergent Liquid.",
    kicker: "Laundry",
    punch: "Every load, genuinely fresh.",
    line: "Deep clean, soft fabric, and a fragrance that lasts past the fold, clothes that feel as clean as they look.",
  },
  {
    src: "/why-bathroom.webp",
    alt: "A bright bathroom cleaned with Aura Clean Disinfectant Bathroom Cleaner.",
    kicker: "Bathroom",
    punch: "Shine that actually lasts.",
    line: "10X cleaner. 99.9% germs gone. A bathroom that looks finished, not just wiped.",
  },
  {
    src: "/why-choose-aura.png",
    alt: "Aura Clean Premium Floor Cleaner used while mopping a bright living room.",
    kicker: "Floor",
    punch: "Floors that stay shining.",
    line: "10X better germ protection for everyday mopping, a clean that looks finished, and feels safe underfoot.",
  },
  {
    src: "/why-choose-dish.png",
    alt: "Aura Clean Dish Wash Liquid on a kitchen counter while washing dishes.",
    kicker: "Dish wash",
    punch: "Tough on grease. Easy on hands.",
    line: "Lemon-fresh dish wash that cuts through kitchen grease while staying gentle enough for daily dishwashing.",
  },
] as const;

const REASONS = [
  {
    n: "01",
    title: "99.9% germ protection",
    body: "A thorough cleanse formulated to protect, without stripping the skin’s comfort.",
  },
  {
    n: "02",
    title: "Natural actives",
    body: "Botanical notes, lemon, rose and charcoal, chosen for clarity, not noise.",
  },
  {
    n: "03",
    title: "Gentle, every day",
    body: "pH balanced, paraben free and dermatologically tested for family use.",
  },
  {
    n: "04",
    title: "A finish you feel",
    body: "Soft hands, a fresh close, and a ritual that stays quiet on the counter.",
  },
] as const;

const PILLARS = [
  { n: "01", title: "Honest actives", body: "Lemon, rose and charcoal, chosen for clarity, not noise." },
  { n: "02", title: "Whole-home care", body: "Hands, laundry, floors, dishes and bath, one complete clean." },
  { n: "03", title: "Quiet design", body: "Packaging that belongs beside a basin, not a laboratory." },
] as const;

const ordered = CATALOG_ORDER.map((id) => PRODUCTS.find((item) => item.id === id)!);

export function AboutPage() {
  return (
    <main id="main" className="lux-page why-page">
      <header className="lux-hero">
        <p className="lux-kicker">About Aura Clean</p>
        <h1>Care that belongs in every home.</h1>
        <p>
          Aura Clean is a complete hygiene house, six product lines, honest actives, and protection
          that feels gentle. From the first lather at the basin to the last wipe on the floor.
        </p>
      </header>

      <ul className="lux-stats">
        <li>
          <strong>99.9%</strong>
          <span>Germ protection</span>
        </li>
        <li>
          <strong>6</strong>
          <span>Product lines</span>
        </li>
        <li>
          <strong>3</strong>
          <span>Hand wash flavours</span>
        </li>
        <li>
          <strong>pH</strong>
          <span>Balanced, every day</span>
        </li>
      </ul>

      <section className="lux-essay">
        <p className="lux-kicker">Our brief</p>
        <h2>Protection that does not feel harsh.</h2>
        <div className="lux-essay-copy">
          <p>
            We started with a simple brief: a clean you can trust, and packaging that looks at home
            beside a basin. Each formula is built around honest actives, a considered pH, and a
            finish that lasts through the day.
          </p>
          <p>
            Hand wash is the signature. The range carries the same promise through laundry,
            bathroom, floors, dishes and toilet care, no clutter, no theatre, just work done with
            restraint.
          </p>
        </div>
      </section>

      <section className="why-stories" aria-label="Why Aura Clean">
        <header className="lux-head about-why-head">
          <p className="lux-kicker">Why Aura Clean</p>
          <h2>
            <span>Real rooms.</span>
            <span>Real bottles.</span>
            <span>Care you feel every day.</span>
          </h2>
        </header>
        {STORIES.map((item, index) => (
          <article
            key={item.punch}
            className={`why-story${index % 2 ? " is-flip" : ""}`}
            data-shot={item.kicker.toLowerCase().replace(/\s+/g, "-")}
          >
            <img src={item.src} alt={item.alt} width={1024} height={700} />
            <div>
              <p className="lux-kicker">{item.kicker}</p>
              <h2>{item.punch}</h2>
              <p>{item.line}</p>
            </div>
          </article>
        ))}
      </section>

      <ol className="lux-why why-grid-lux">
        {REASONS.map((item) => (
          <li key={item.title}>
            <span>{item.n}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>

      <section className="about-bands">
        {SIGNATURES.map((item) => (
          <article key={item.id} className="about-band" data-tone={item.id}>
            <span className="about-band-word" aria-hidden="true">
              {item.word}
            </span>
            <img src={item.src} alt={item.name} width={280} height={560} />
            <div>
              <p className="lux-kicker">{item.word}</p>
              <h2>{item.name}</h2>
              <p>{item.line}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="about-range">
        <header className="lux-head">
          <p className="lux-kicker">The collection</p>
          <h2>Every product, equally ours.</h2>
        </header>
        <ul className="about-range-grid">
          {ordered.map((item) => (
            <li key={item.id} data-sku={item.id}>
              <img src={item.src} alt={item.name} width={240} height={480} />
              <h3>{item.name}</h3>
              <span>{item.spec}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="lux-split">
        <img
          src="/family-hands.webp"
          alt="Hands held together, the Aura Clean ritual at home."
          width={1200}
          height={800}
        />
        <div>
          <p className="lux-kicker">The ritual</p>
          <h2>Because every touch matters.</h2>
          <p>
            From the first lather to the last rinse, Aura Clean is designed for the rhythm of family
            life, thorough enough to protect, gentle enough to repeat.
          </p>
          <ol className="lux-pillars">
            {PILLARS.map((item) => (
              <li key={item.n}>
                <span>{item.n}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lux-close">
        <h2>Bring Aura Clean home.</h2>
        <p>Six product lines. One complete clean, from hands to floors.</p>
        <Link className="cta cta-lime" to="/product">
          Explore the collection
          <span className="cta-arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </section>
    </main>
  );
}
