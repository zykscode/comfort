'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import { useMenu } from './MenuContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
      className="flex justify-between items-center h-18 md:h-20 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 py-2 backdrop-blur-sm"
    >
      <div className="md:hidden flex bg-yellow-400 self-center items-center h-8 w-8 rounded-full">
        <Link href="/profile">
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarImage: 'h-full w-full',
                },
              }}
            />
          ) : (
            <Avatar>
              <AvatarImage
                src="/images/generic-avatar.png"
                alt="Generic Avatar"
              />
              <AvatarFallback>GA</AvatarFallback>
            </Avatar>
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
