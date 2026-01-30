"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Journey", href: "#journey" },
        { name: "Menu", href: "#menu" },
        { name: "About", href: "#about" },
        { name: "Find Us", href: "#locations" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#00735C]/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-serif font-bold text-white tracking-widest"
                    >
                        HOMIE
                    </motion.div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-sans font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="bg-white text-[#00735C] px-6 py-2 rounded-full font-sans font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all">
                            Order Now
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button className="text-white">
                            <ShoppingBag size={24} />
                        </button>
                        <button onClick={() => setIsOpen(true)} className="text-white">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar / Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#00735C] z-[70] p-10 flex flex-col shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-16">
                                <span className="text-xl font-serif font-bold text-white tracking-widest">HOMIE</span>
                                <button onClick={() => setIsOpen(false)} className="text-white">
                                    <X size={32} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-8">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-serif text-white hover:text-white/60 transition-colors"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <button className="w-full bg-white text-[#00735C] py-5 font-sans font-bold uppercase tracking-widest">
                                    Start Your Order
                                </button>
                                <div className="mt-8 flex gap-6 text-white/50">
                                    <span className="text-xs uppercase tracking-widest">Instagram</span>
                                    <span className="text-xs uppercase tracking-widest">Twitter</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
