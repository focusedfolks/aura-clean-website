import { Hero } from "../components/Hero";
import { HomeRest } from "../components/HomeRest";
import { OfferPosterPopup } from "../components/OfferPosterPopup";

export function HomePage() {
  return (
    <main id="main">
      <OfferPosterPopup />
      <Hero />
      <HomeRest />
    </main>
  );
}
