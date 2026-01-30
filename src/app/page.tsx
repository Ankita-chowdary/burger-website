import BurgerScroll from "@/components/BurgerScroll";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import OrderNow from "@/components/OrderNow";
import Locations from "@/components/Locations";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#00735C]">
      <Navbar />

      <section id="journey">
        <BurgerScroll />
      </section>

      <Menu />

      <Locations />

      <section id="about" className="relative h-[80vh] flex items-center justify-center bg-white text-[#00735C]">
        <div className="max-w-4xl text-center px-6">
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Join the Revolution.</h2>
          <p className="text-xl md:text-2xl font-sans leading-relaxed text-[#00735C]/80">
            HOMIE Burger isn't just a place to eat. It's a sanctuary for those who crave more than just a quick bite.
            We source every ingredient from local farms, ensuring that every bite tells a story of quality and passion.
          </p>
          <div className="mt-12 flex gap-8 justify-center font-sans font-bold text-xs tracking-[0.3em] uppercase">
            <a href="#locations" className="border-b-2 border-[#00735C] pb-2 hover:opacity-50 transition-opacity">Find Us</a>
            <a href="#menu" className="border-b-2 border-[#00735C] pb-2 hover:opacity-50 transition-opacity">Our Menu</a>
            <a href="#" className="border-b-2 border-[#00735C] pb-2 hover:opacity-50 transition-opacity">Socials</a>
          </div>
        </div>
      </section>

      <OrderNow />

      <footer className="py-20 bg-[#003d31] text-white/30 text-center font-sans text-xs tracking-[0.4em] uppercase">
        <div className="max-w-7xl mx-auto px-6">
          <p>© 2026 HOMIE BURGER CO. ALL RIGHTS RESERVED. CRAFTED FOR THE HOMIES.</p>
        </div>
      </footer>
    </main>
  );
}
