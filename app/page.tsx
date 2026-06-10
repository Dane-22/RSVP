import About from "@/components/About";
import Contact from "@/components/Contact";
import DressCode from "@/components/DressCode";
import FallingBackground from "@/components/FallingBackground";
import Hero from "@/components/Hero";
import RSVPForm from "@/components/RSVPForm";
import Story from "@/components/Story";
import Venue from "@/components/Venue";
import WeddingReminders from "@/components/WeddingReminders";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <FallingBackground />
      <Hero />
      <About />
      <Story />
      <Venue />
      <DressCode />
      <WeddingReminders />
      <RSVPForm />
      <Contact />
    </main>
  );
}
