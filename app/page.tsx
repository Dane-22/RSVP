import About from "@/components/About";
import Contact from "@/components/Contact";
import DressCode from "@/components/DressCode";
import FallingBackground from "@/components/FallingBackground";
import Hero from "@/components/Hero";
import Program from "@/components/Program";
import RSVPForm from "@/components/RSVPForm";
import Story from "@/components/Story";
import Venue from "@/components/Venue";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <FallingBackground />
      <Hero />
      <About />
      <Story />
      <Venue />
      <Program />
      <DressCode />
      <RSVPForm />
      <Contact />
    </main>
  );
}
