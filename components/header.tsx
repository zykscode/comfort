'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useMenu } from './MenuContext';
import Breadcrumbs from './ui/breadcrumbs';
import { MenuToggle } from './ui/menuToggle';
import Navs from './ui/navs';

const Header = () => {
  const { isOpen, toggleOpen } = useMenu();
  const { isSignedIn } = useUser();
  return (
    <motion.header
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="flex justify-between items-center h-18 md:h-20 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    >
      <div className="md:hidden">
        <Link href="/profile">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Image
              src="/images/generic-avatar.png"
              alt="Generic Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
        </Link>
      </div>
      <Breadcrumbs />

      <Navs />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.header>
  );
};

export default Header;
