import Image from 'next/image';
import React from 'react';

import Me from '@/public/64.png';

function PageLogo() {
  return (
    <div className="size-9 md:size-12 rounded-full bg-green-200 cursor-pointer ">
      <Image
        alt="page logo logo"
        src={Me}
        className="size-full rounded-full "
      />
    </div>
  );
}

export default PageLogo;
