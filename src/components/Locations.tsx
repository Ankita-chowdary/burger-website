"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

const LOCATIONS = [
    {
        city: "Downtown Hub",
        address: "123 Emerald Street, Suite 400",
        hours: "Mon - Sun: 11am - 11pm",
        phone: "(555) 123-4567",
        tag: "Original"
    },
    {
        city: "Brooklyn Yards",
        address: "456 Industrial Way, Dock 7",
        hours: "Mon - Sun: 12pm - 12am",
        phone: "(555) 987-6543",
        tag: "New Opening"
    }
];

export default function Locations() {
    return (
        <section id="locations" className="py-32 bg-[#004d3e] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white/40 font-sans font-bold uppercase tracking-[0.3em] text-xs"
                        >
                            Visit the Homies
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-serif text-white mt-4 mb-12"
                        >
                            Our Flagships
                        </motion.h2>

                        <div className="space-y-8">
                            {LOCATIONS.map((loc, i) => (
                                <motion.div
                                    key={loc.city}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="bg-[#00735C]/30 p-8 rounded-2xl border border-white/5 group hover:border-white/20 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-emerald-400 font-sans text-[10px] font-bold uppercase tracking-widest">{loc.tag}</span>
                                            <h3 className="text-3xl font-serif text-white mt-1">{loc.city}</h3>
                                        </div>
                                        <button className="p-3 bg-white/10 rounded-full text-white hover:bg-white hover:text-[#00735C] transition-all">
                                            <Navigation size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 text-white/60">
                                            <MapPin size={20} className="shrink-0 text-emerald-400" />
                                            <p className="font-sans text-sm">{loc.address}</p>
                                        </div>
                                        <div className="flex items-start gap-4 text-white/60">
                                            <Clock size={20} className="shrink-0 text-emerald-400" />
                                            <p className="font-sans text-sm">{loc.hours}</p>
                                        </div>
                                        <div className="flex items-start gap-4 text-white/60">
                                            <Phone size={20} className="shrink-0 text-emerald-400" />
                                            <p className="font-sans text-sm">{loc.phone}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square md:aspect-video lg:aspect-square bg-[#00735C]/20 rounded-[3rem] border border-white/10 overflow-hidden flex items-center justify-center backdrop-blur-3xl shadow-2xl"
                    >
                        {/* Stylized Grid Map Placeholder */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}
                        />

                        <div className="text-center relative z-10 px-12">
                            <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto mb-8 animate-pulse flex items-center justify-center">
                                <MapPin size={40} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-serif text-white mb-4">Interactive Map Coming Soon</h4>
                            <p className="text-white/50 font-sans text-sm max-w-xs mx-auto mb-8">
                                We're currently fine-tuning our localized experience. In the meantime, find our spots above.
                            </p>
                            <button className="px-8 py-3 bg-white/5 border border-white/20 text-white rounded-full font-sans font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#00735C] transition-all">
                                Open Google Maps
                            </button>
                        </div>

                        {/* Pulsing Dots for Locations */}
                        <div className="absolute top-[30%] left-[45%] w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                        <div className="absolute top-[30%] left-[45%] w-3 h-3 bg-emerald-400 rounded-full" />

                        <div className="absolute top-[60%] left-[25%] w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                        <div className="absolute top-[60%] left-[25%] w-3 h-3 bg-emerald-400 rounded-full" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
