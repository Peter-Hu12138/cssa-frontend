"use client";

import { motion } from "framer-motion";

export const MapleLeaf = ({ className }: { className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M12.0002 21.8182C12.0002 21.8182 13.0911 20.7273 13.0911 18.5455C13.0911 16.3636 12.0002 15.2727 12.0002 15.2727C12.0002 15.2727 10.9093 16.3636 10.9093 18.5455C10.9093 20.7273 12.0002 21.8182 12.0002 21.8182ZM12.0002 2.18182L14.182 6.54545L18.5457 5.45455L17.4548 9.81818L21.8184 10.9091L17.4548 13.0909L18.5457 17.4545L14.182 15.2727L12.0002 19.6364L9.81841 15.2727L5.45477 17.4545L6.54568 13.0909L2.18204 10.9091L6.54568 9.81818L5.45477 5.45455L9.81841 6.54545L12.0002 2.18182Z" />
    </motion.svg>
  );
};
