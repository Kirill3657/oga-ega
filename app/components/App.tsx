import { ClientProviders } from "./ClientProviders";
import { ScrollAnimator } from "./ScrollAnimator";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Mission } from "./Mission";
import { Advantages } from "./Advantages";
import { Format } from "./Format";
import { WhyUs } from "./WhyUs";
import { Hackathon } from "./Hackathon";
import { Teachers } from "./Teachers";
import { Pricing } from "./Pricing";
import { Contacts } from "./Contacts";

export function App() {
  return (
    <ClientProviders>
      <Header />
      <ScrollAnimator />
      <main className="main">
        <Hero />
        <Mission />
        <Advantages />
        <Format />
        <WhyUs />
        <Hackathon />
        <Teachers />
        <Pricing />
        <Contacts />
      </main>
    </ClientProviders>
  );
}