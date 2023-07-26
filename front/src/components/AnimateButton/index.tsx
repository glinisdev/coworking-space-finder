import React from 'react';
import { motion } from 'framer-motion';

const AnimateButton: React.FC<{ children: React.ReactNode, type: 'rotate' | 'slide' | 'scale' }> = ({ children, type }) => {
    switch (type) {
        case 'rotate':
        case 'slide':
        case 'scale':
        default:
            return (
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                    {children}
                </motion.div>
            );
    }
}

export default AnimateButton;
