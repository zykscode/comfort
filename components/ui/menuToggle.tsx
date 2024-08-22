import { motion, SVGMotionProps } from 'framer-motion';

const Path = (
  props: React.JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>,
) => (
  <motion.path
    fill="transparent"
    strokeWidth="1.175"
    stroke="hsl(var(--foreground))"
    strokeLinecap="round"
    transition={{ duration: '0.6' }}
    {...props}
  />
);

const scrollToTopAndToggle = (toggle: () => void) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toggle();
};

export const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    onClick={() => scrollToTopAndToggle(toggle)}
    className="w-16 md:w-20 flex justify-center items-center bg-transparent rounded-full focus:outline-none"
  >
    <span className="sr-only "> menu toggle button </span>
    <svg className="w-full" viewBox="0 0 48 48">
      <Path
        className="foreground"
        variants={{
          closed: { d: 'M 10 21 L 46 21' },
          open: { d: 'M 24 10 L 24 38' },
        }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 27 L 40 27' },
          open: { d: 'M 10 24 L 38 24' },
        }}
      />
    </svg>
  </button>
);
