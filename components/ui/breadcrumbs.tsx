import Link from 'next/link';
import React from 'react';

import PageLogo from './page-logo';

const Breadcrumbs = () => {
  return (
    <Link
      href={'/'}
      className="flex items-center h-8 w-8 md:h-12 md:w-12 cursor-pointer"
    >
      <div className="flex items-center active cursor-pointer">
        <PageLogo />
        <span className="md:flex hidden ml-2 cursor-pointer ">Comforte</span>
      </div>
    </Link>
  );
};

export default Breadcrumbs;
