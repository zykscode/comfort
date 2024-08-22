import { motion } from 'framer-motion';
import Link from 'next/link';

const variants = {
  open: (i: number) => ({
    x: '100%',
    opacity: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
  closed: {
    x: '0',
    opacity: 0.8,
    transition: {
      duration: 0.7,
    },
  },
};

const NavLink = ({ text, i }: { text: string; i: number }) => {
  return (
    <motion.div
      custom={i}
      variants={variants}
      className="relative hidden lg:inline-block py-6 group"
      key={text}
    >
      <Link href={`/${text.toLowerCase()}`} className="relative">
        <span className="relative mb-3  z-10 nav-link">{text}</span>
        <span className="absolute w-full h-px bg-[#151515] left-0 scale-x-0 origin-right transition-transform duration-350 ease-out group-hover:scale-x-100 group-hover:origin-left mt-4 top-3"></span>
      </Link>
    </motion.div>
  );
};

export default NavLink;
