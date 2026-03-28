import { HeroSection } from "./_components/sections/hero";
import dynamic from "next/dynamic";

const RevealSection = dynamic(() => import("./_components/sections/reveal").then((mod) => mod.RevealSection))
const LearnMoreSection = dynamic(() => import("./_components/sections/learn-more").then((mod) => mod.LearnMoreSection))

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <HeroSection />
      <RevealSection />
      <LearnMoreSection />
    </main>
  );
}