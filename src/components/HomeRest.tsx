import { Link } from "react-router-dom";
import { CATALOG_ORDER, PRODUCTS } from "../data/products";
import { ProductOptionCard } from "./ProductOptionCard";
import {
  ArrowIcon,
  FamilyIcon,
  LeafIcon,
  LifeIcon,
  ShieldIcon,
} from "./icons";

const WHY = [
  { n: "01", title: "Trusted Protection", body: "99.9% germ care you can count on, quietly, every wash." },
  { n: "02", title: "Advanced Formula", body: "A thorough cleanse that still leaves hands soft and composed." },
  { n: "03", title: "Gentle & Safe", body: "pH balanced, dermatologically considered, kind to everyday skin." },
  { n: "04", title: "Everyday Ritual", body: "Made for the family basin - not a laboratory counter." },
] as const;

const INGS = [
  { name: "Activated Charcoal", note: "Deep cleanse and a purifying finish.", src: "/charcoal-float.webp", tone: "coal" },
  { name: "Lemon Extract", note: "Natural freshness with a lasting clean.", src: "/lemon-float.webp", tone: "lemon" },
  { name: "Rose Essence", note: "A soft floral finish with the same everyday care.", src: "/rose-float.webp", tone: "rose" },
] as const;

const STEPS = [
  { n: "01", title: "Apply", body: "Dispense a small amount onto wet hands." },
  { n: "02", title: "Lather", body: "Work into a rich foam between fingers and wrists." },
  { n: "03", title: "Rinse", body: "Rinse well and dry - protection that stays with you." },
] as const;

const TOUCH = [
  { icon: FamilyIcon, label: "For Your Family" },
  { icon: LifeIcon, label: "For Your Home" },
  { icon: ShieldIcon, label: "For Everyday" },
  { icon: LeafIcon, label: "For Better Life" },
] as const;

const REVIEWS = [
  { quote: "Soft hands, a proper clean - it stays on our basin now.", name: "Ananya M." },
  { quote: "The lemon one smells honest, not like a laboratory.", name: "Rahul K." },
  { quote: "Finally a hand wash that feels considered.", name: "Meera S." },
  { quote: "The kids actually like washing their hands.", name: "Vikram P." },
] as const;

const COLLECTION = CATALOG_ORDER.map((id) => PRODUCTS.find((item) => item.id === id)!);

export function HomeRest() {
  return (
    <>
      <section className="band range-band" id="range">
        <header className="band-head lux-head">
          <p className="lux-kicker">The collection</p>
          <h2>Our complete cleaning range</h2>
          <p>Six product lines. Flavours and sizes you can pick, from the basin to the floor.</p>
        </header>
        <ul className="range-grid">
          {COLLECTION.map((item) => (
            <ProductOptionCard key={item.id} product={item} layout="range" />
          ))}
        </ul>
      </section>

      <section className="band why-band">
        <header className="band-head lux-head">
          <p className="lux-kicker">The standard</p>
          <h2>Why choose Aura Clean</h2>
          <p>Protection with poise. Formulas that work hard, and look at home.</p>
        </header>
        <div className="why-visuals">
          <figure className="why-visual">
            <img
              src="/why-choose-aura.png"
              alt="Aura Clean Premium Floor Cleaner used while mopping a bright living room"
              width={1200}
              height={900}
            />
          </figure>
          <figure className="why-visual">
            <img
              src="/why-choose-dish.png"
              alt="Aura Clean Dish Wash Liquid on a kitchen counter while washing dishes"
              width={1200}
              height={900}
            />
          </figure>
        </div>
        <ol className="lux-why">
          {WHY.map((item) => (
            <li key={item.n}>
              <span>{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band ing-band">
        <header className="band-head lux-head">
          <p className="lux-kicker">The actives</p>
          <h2>Key ingredients. Real benefits.</h2>
        </header>
        <ul className="ing-bubbles">
          {INGS.map((item) => (
            <li key={item.name} data-tone={item.tone}>
              <img src={item.src} alt="" width={256} height={256} />
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band how-band">
        <header className="band-head lux-head">
          <p className="lux-kicker">The ritual</p>
          <h2>How it works</h2>
        </header>
        <ol className="how-row">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band touch-band">
        <img
          src="/family-hands.webp"
          alt="Hands held together - care that belongs at home."
          width={1400}
          height={788}
        />
        <div>
          <p className="lux-kicker">Atelier note</p>
          <h2>
            Because every touch <em>matters.</em>
          </h2>
          <p>Care that protects. Purity that shows - in the hands, and through the home.</p>
          <ul>
            {TOUCH.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <header className="band-head lux-head">
          <p className="lux-kicker">Voices</p>
          <h2>What families say</h2>
        </header>
        <ul className="review-grid">
          {REVIEWS.map((item) => (
            <li key={item.name}>
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>
              <p>{item.quote}</p>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="final-cta">
        <div className="final-cta-copy">
          <p className="lux-kicker lux-kicker-light">The house</p>
          <h2 className="final-cta-title">
            <span className="final-line">Clean hands.</span>
            <span className="final-line">Healthy life.</span>
            <span className="final-line is-accent">Better home.</span>
          </h2>
          <p className="final-cta-note">Care that protects, from the basin to the floor.</p>
          <Link className="cta cta-lime" to="/product">
            Explore the collection
            <span className="cta-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
