"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import cssaLogo from "../../../img/cssa logo.avif";

export const MapleLeaf = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`relative block ${className}`}
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image src={cssaLogo} alt="UTCSSA logo" fill className="object-contain" priority={false} />
    </motion.div>
  );
};
