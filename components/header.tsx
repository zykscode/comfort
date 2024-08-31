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
      <Link
        href="/profile"
        className="md:hidden justify-center flex self-center items-center h-8 w-8 rounded-full"
      >
        {isSignedIn ? (
          <UserButton
            appearance={{
              elements: {
                avatarImage: 'h-full w-full',
              },
            }}
          />
        ) : (
          <Avatar className="h-full w-full">
            <AvatarImage
              src="https://img.freepik.com/premium-photo/female-user-icon-silhouette-circle-isolated-light-gray-background_1241564-208.jpg?w=826"
              alt="Generic Avatar"
            />
            <AvatarFallback className="h-full w-full">GA</AvatarFallback>
          </Avatar>
        )}
      </Link>

      <Breadcrumbs />

      <Navs />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.header>
  );
};

export default Header;
