import React, { useState } from 'react';
import { Nav } from '../components';

const useNav = () => {
  const [showContent, setShowContent] = useState(false);
  return (
    <Nav showContent={showContent} setShowContent={setShowContent} />
  );
};

export default useNav;
