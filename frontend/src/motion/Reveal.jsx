import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 20, as = 'div', className }) {
    const reduce = useReducedMotion();
    const Component = motion[as] || motion.div;

    if (reduce) {
        const Plain = as;
        return <Plain className={className}>{children}</Plain>;
    }

    return (
        <Component
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Component>
    );
}