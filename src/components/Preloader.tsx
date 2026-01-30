"use client";

import { motion } from "framer-motion";

interface PreloaderProps {
    progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00735C]"
        >
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden relative">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                />
            </div>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 font-sans text-white/70 text-sm tracking-widest uppercase"
            >
                Preparing the Journey... {Math.round(progress)}%
            </motion.p>
        </motion.div>
    );
}
