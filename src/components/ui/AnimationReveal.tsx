"use client";

import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    delay?: number;
}

export default function FreesetsReveal({ children, delay = 0 }: Props) {
    return (
        <motion.div
            // 1. Initial: Keadaan saat "Keluar" atau belum masuk layar
            initial={{
                opacity: 0,
                scale: 0.8, // Sedikit mengecil
                y: 20        // Sedikit di bawah
            }}

            // 2. WhileInView: Keadaan saat "Masuk" layar
            whileInView={{
                opacity: 1,
                scale: 1,
                y: 0
            }}

            // 3. Viewport Config
            viewport={{
                once: false,      // Biar bisa in & out berulang kali
                amount: 0.40      // Trigger jalan saat 15% elemen masuk layar
            }}

            // 4. Transition: Rahasia kehalusan Freesets
            transition={{
                duration: 0.3,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Custom cubic-bezier untuk efek "snappy" tapi smooth
            }}
        >
            {children}
        </motion.div>
    );
}