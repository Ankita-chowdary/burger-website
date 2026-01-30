"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAME_PREFIX = "/burger-frames/ezgif-frame-";
const FRAME_SUFFIX = ".jpg";

export default function BurgerScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

    // Narrative overlays based on scroll progress
    const activeSection = useTransform(scrollYProgress, (pos) => {
        if (pos <= 0.15) return 0;
        if (pos >= 0.25 && pos <= 0.45) return 1;
        if (pos >= 0.55 && pos <= 0.75) return 2;
        if (pos >= 0.85) return 3;
        return -1;
    });

    const sidebarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const scrollPercentage = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`);

    const [currentSection, setCurrentSection] = useState(0);

    useMotionValueEvent(activeSection, "change", (latest) => {
        setCurrentSection(latest);
    });

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loaded = 0;

        const handleLoad = () => {
            loaded++;
            setLoadedCount(loaded);
            if (loaded === TOTAL_FRAMES) {
                setIsReady(true);
            }
        };

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `${FRAME_PREFIX}${frameNum}${FRAME_SUFFIX}`;
            img.onload = handleLoad;
            img.onerror = handleLoad; // Count errors as loaded to avoid hanging preloader
            loadedImages[i] = img;
        }
        setImages(loadedImages);
    }, []);

    // Draw current frame to canvas
    useEffect(() => {
        if (!isReady || !canvasRef.current) return;

        const render = () => {
            if (!canvasRef.current) return;
            const ctx = canvasRef.current.getContext("2d");
            if (!ctx) return;

            const currentFrame = Math.round(frameIndex.get());
            const safeFrame = Math.max(1, Math.min(TOTAL_FRAMES, currentFrame));
            const img = images[safeFrame];

            if (img && img.complete && img.naturalWidth > 0) {
                const canvas = canvasRef.current;
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [isReady, images, frameIndex]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-[#00735C]">
            {/* Preloader overlay */}
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00735C]"
                    >
                        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-300"
                                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                            />
                        </div>
                        <p className="mt-4 text-white/70 tracking-widest uppercase text-sm font-sans">
                            Preparing the Feast... {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Scrollytelling Content */}
            {mounted && (
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        className="h-full w-full object-contain"
                    />

                    {/* Sidebar Decorative Content (Filling the "Side Bars") */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Left Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isReady ? 1 : 0, x: 0 }}
                            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 h-1/2 flex flex-col items-center justify-between"
                        >
                            <div className="w-[1px] h-full bg-white/20 relative">
                                <motion.div
                                    className="absolute top-0 w-full bg-white"
                                    style={{ height: sidebarHeight }}
                                />
                            </div>
                            <div className="rotate-[-90deg] whitespace-nowrap text-white/30 font-sans font-bold text-[10px] tracking-[0.5em] mt-12 mb-12 uppercase">
                                Crafted in Small Batches • Est. 2024
                            </div>
                            <div className="w-2 h-2 rounded-full border border-white/40" />
                        </motion.div>

                        {/* Right Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: isReady ? 1 : 0, x: 0 }}
                            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 h-1/2 flex flex-col items-center justify-between"
                        >
                            <div className="w-2 h-2 rounded-full border border-white/40" />
                            <div className="rotate-[90deg] whitespace-nowrap text-white/30 font-sans font-bold text-[10px] tracking-[0.5em] mt-12 mb-12 uppercase">
                                Pure Quality • No Compromise
                            </div>
                            <div className="relative flex flex-col items-center">
                                <span className="text-white/40 font-mono text-[10px] mb-2 uppercase tracking-widest">Progress</span>
                                <motion.span className="text-white/60 font-mono text-xs tabular-nums">
                                    {scrollPercentage}
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Narrative Overlays */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-10">
                        <AnimatePresence mode="wait">
                            {isReady && currentSection === 0 && (
                                <motion.div
                                    key="sec0"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="text-center"
                                >
                                    <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight">HOMIE BURGER</h1>
                                    <p className="text-xl md:text-2xl text-white/70 font-sans mt-4 uppercase tracking-[0.2em]">Pure Craft. Local Roots.</p>
                                </motion.div>
                            )}

                            {isReady && currentSection === 1 && (
                                <motion.div
                                    key="sec1"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="max-w-xl mr-auto"
                                >
                                    <h2 className="text-4xl md:text-6xl font-serif text-white">The journey begins with the base.</h2>
                                    <p className="text-lg text-white/70 mt-4 leading-relaxed">Artisan buns, toasted to perfection. The foundation of every masterpiece starts here.</p>
                                </motion.div>
                            )}

                            {isReady && currentSection === 2 && (
                                <motion.div
                                    key="sec2"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="max-w-xl ml-auto text-right"
                                >
                                    <h2 className="text-4xl md:text-6xl font-serif text-white">Stacked for Flavor. Grilled for Depth.</h2>
                                    <p className="text-lg text-white/70 mt-4 leading-relaxed">Premium cuts, seared at high heat to lock in every drop of flavor. Science meets soul.</p>
                                </motion.div>
                            )}

                            {isReady && currentSection === 3 && (
                                <motion.div
                                    key="sec3"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    className="flex flex-col items-center"
                                >
                                    <h2 className="text-5xl md:text-7xl font-serif text-white text-center">Made for the Homies.</h2>
                                    <button className="mt-12 px-12 py-5 bg-white text-[#00735C] font-sans font-bold uppercase tracking-widest hover:bg-white/90 transition-colors pointer-events-auto">
                                        Order Now
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
}
