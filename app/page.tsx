
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProgramsSection } from '@/components/sections/programs-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TeamSection } from '@/components/sections/team-section';
import { BlogSection } from '@/components/sections/blog-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <StatsSection />
      <TeamSection />
      <GallerySection />
      <BlogSection />
      <CtaSection />
    </>
  );
}