"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MENU_ITEMS = [
    {
        id: 1,
        name: "Classic Homie",
        description: "The original masterpiece. Juicy beef, melted cheddar, and our secret sauce.",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop", // Placeholder since generate_image failed
    },
    {
        id: 2,
        name: "Truffle Bliss",
        description: "Sauteed wild mushrooms, swiss cheese, and luxury truffle aioli.",
        price: "$15.99",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Spicy Jalapeño",
        description: "For the brave. Fresh jalapeños, pepper jack, and habanero honey.",
        price: "$13.99",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "BBQ Smokehouse",
        description: "Double bacon, crispy onions, and hickory smoked BBQ sauce.",
        price: "$14.99",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "Garden Power",
        description: "House-made plant patty, avocado, and toasted sprouts.",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 6,
        name: "Truffle Fries",
        description: "Hand-cut Idaho potatoes, parmesan, and sea salt.",
        price: "$6.99",
        image: "https://images.unsplash.com/photo-1573016608244-7d5cf16538a2?q=80&w=1000&auto=format&fit=crop",
    }
];

export default function Menu() {
    return (
        <section id="menu" className="py-32 bg-[#005c4a] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white/50 font-sans font-bold uppercase tracking-[0.3em] text-xs"
                    >
                        Curated Selection
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white mt-4"
                    >
                        Signature Burgers
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {MENU_ITEMS.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-[#00735C]/30 p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500"
                        >
                            <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-1000"
                                />
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-serif text-white">{item.name}</h3>
                                <span className="text-white font-sans font-bold tracking-tight">{item.price}</span>
                            </div>
                            <p className="text-white/60 font-sans text-sm leading-relaxed mb-8">
                                {item.description}
                            </p>
                            <button className="w-full py-4 rounded-xl border border-white/10 text-white font-sans font-bold uppercase text-xs tracking-widest group-hover:bg-white group-hover:text-[#00735C] transition-all">
                                Add to Cart
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-[120px] -ml-48 -mb-48" />
        </section>
    );
}
