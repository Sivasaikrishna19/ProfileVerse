// src/hooks/useSelectedKey.ts
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/app/routes/routes';

const useSelectedKey = () => {

  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const matchedRoute = routes.find((route) => pathname === route.route);
      if (matchedRoute) {
        setSelectedKey(matchedRoute.key);
      }
    }
  }, [pathname]);

  return selectedKey;
};

export default useSelectedKey;
