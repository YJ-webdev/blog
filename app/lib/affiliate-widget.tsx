import { useEffect, useState } from 'react';

const AffiliateWidget = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <iframe
      src="https://coupa.ng/chFqOC"
      width="100%"
      height="75"
      frameBorder="0"
      scrolling="no"
      referrerPolicy="unsafe-url"
    />
  );
};

export default AffiliateWidget;
