import { useEffect } from 'react';
import { useLocation } from 'wouter';
// attribution @xav-ie : wouter issues #132
export default function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
