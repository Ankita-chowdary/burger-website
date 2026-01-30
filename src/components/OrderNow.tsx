"use client";

import { motion } from "framer-motion";

export default function OrderNow() {
    return (
        <section id="order" className="py-40 bg-[#004d3e] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white p-12 md:p-24 rounded-[3rem] shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />

                    <h2 className="text-5xl md:text-7xl font-serif text-[#00735C] mb-8">Ready to Feast?</h2>
                    <p className="text-xl font-sans text-[#00735C]/70 mb-12 leading-relaxed">
                        Order directly from us for the freshest experience, or find us on your favorite delivery app.
                        The journey from our kitchen to your hands is just a click away.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-[#00735C] text-white px-10 py-5 rounded-full font-sans font-bold uppercase tracking-widest hover:bg-[#005c4a] transition-all shadow-lg hover:shadow-emerald-900/40">
                            Start Pickup Order
                        </button>
                        <button className="border-2 border-[#00735C] text-[#00735C] px-10 py-5 rounded-full font-sans font-bold uppercase tracking-widest hover:bg-[#00735C] hover:text-white transition-all">
                            DoorDash Delivery
                        </button>
                    </div>

                    <div className="mt-16 pt-16 border-t border-[#00735C]/10 flex flex-wrap justify-center gap-12 grayscale opacity-50">
                        <span className="font-serif italic text-2xl text-[#00735C]">Uber Eats</span>
                        <span className="font-serif italic text-2xl text-[#00735C]">Deliveroo</span>
                        <span className="font-serif italic text-2xl text-[#00735C]">Zomato</span>
                    </div>
                </motion.div>
            </div>

            {/* Decorative blurred circles */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2" />
        </section>
    );
}
