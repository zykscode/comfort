'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { useMenu } from './MenuContext';
import Breadcrumbs from './ui/breadcrumbs';
import Navs from './ui/navs';

const Header = () => {
  const { isOpen, toggleOpen } = useMenu();
  return (
    <motion.header
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="flex justify-between items-center h-18 md:h-20"
    >
      <Breadcrumbs />

      <Navs toggle={() => toggleOpen()} />
    </motion.header>
  );
};

export default Header;
