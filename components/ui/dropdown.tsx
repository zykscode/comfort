'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { navs } from '@/data/headerNavLinks';

import { Footer } from '../footer';
import { useMenu } from '../MenuContext';

const DropdownMenu = () => {
  const { isOpen } = useMenu();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const containerVariants = {
    open: {
      height: 'calc(100vh - 72px)',
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: 'easeInOut',
        delayChildren: 0.3,
      },
    },
    closed: {
      height: '0',
      y: 'calc(-100%)',
      opacity: 0,
      transition: {
        duration: 0.75,
        delay: 0.01,
        ease: 'easeOut',
      },
    },
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.75,
        ease: 'easeInOut',
        staggerChildren: 0.02,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: 'spring', stiffness: 300, damping: 24 },
        opacity: { duration: 0.3, delay: 0.2 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { type: 'spring', stiffness: 300, damping: 24 },
        opacity: { duration: 0.2 },
        delay: 0.5, // Delay closing to allow underline to animate first
      },
    },
  };

  const underlineVariants = {
    open: {
      width: '100%',
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
    closed: {
      width: '0%', // Changed from 50% to 0% for full close effect
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const toRoman = (num: number) => {
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return roman[num - 1] || num;
  };

  return (
    <motion.div
      className="bg-[#121011] text-slate-100 text-4xl md:text-7xl capitalize flex-grow overflow-hidden"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={containerVariants}
    >
      <motion.div
        variants={dropdownVariants}
        className="flex flex-col h-full px-[3rem] md:flex-row justify-between"
      >
        <motion.div className="flex flex-col justify-evenly w-full h-full">
          {navs.map((nav, i) => (
            <motion.div key={nav} className="relative">
              <motion.div
                className="absolute bg-[rgba(213,208,202,0.2)] h-[2px] bottom-0 left-0 right-0"
                variants={underlineVariants}
              />
              <motion.div variants={navItemVariants}>
                <Link
                  className="button menu-title flex items-center"
                  href={`/${nav}`}
                >
                  <span>{nav}</span>
                  <span className=" text-[rgba(213,208,202,0.2)] menu-index ml-3 ">
                    {toRoman(i + 1)}
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="md:flex w-full hidden flex-col">
          <h1 className="">flex data here</h1>
          <Footer />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DropdownMenu;
