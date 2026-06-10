import Contact from "@/components/Contact";
import FallingBackground from "@/components/FallingBackground";
import Hero from "@/components/Hero";
import RSVPForm from "@/components/RSVPForm";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <FallingBackground />
      <Hero />
      <RSVPForm />
      <Contact />
    </main>
  );
}
