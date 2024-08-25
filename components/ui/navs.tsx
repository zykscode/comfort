'use client';

import React from 'react';

import { navs } from '@/data/headerNavLinks';

import NavLink from './nav-links';

const Navs = () => {
  return (
    <nav className="text-md hidden md:flex uppercase w-1/2 justify-between">
      <div className="flex w-full justify-evenly">
        {navs.map((nav, i) => {
          return <NavLink text={nav} i={i} key={nav} />;
        })}
      </div>
    </nav>
  );
};

export default Navs;
