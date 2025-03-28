import { useState, useEffect } from 'react';

export const AffiliateLink = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents mismatched server & client rendering

  return (
    <iframe
      src="https://coupa.ng/chFqOC"
      height="75"
      className="w-full mx-auto dark:bg-[#1f1f1f]"
      frameBorder="0"
      scrolling="no"
      referrerPolicy="unsafe-url"
    />
  );
};
