import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DashboardPreview from "@/components/DashboardPreview";
import HowItWorks from "@/components/HowItWorks";
import SeeItInAction from "@/components/SeeItInAction";
import Features from "@/components/Features";
import StatsMarquee from "@/components/StatsMarquee";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DashboardPreview />
      <HowItWorks />
      <SeeItInAction />
      <Features />
      <StatsMarquee />
      <CTASection />
      <Footer />
    </div>
  );
}
