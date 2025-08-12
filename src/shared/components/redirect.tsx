'use client';

import { useRouter } from 'waku';
import { useEffect } from 'react';

interface RedirectProps {
  to: "/about" | "/" | "/dashboard/counter" | "/dashboard" | "/shadcn-demo";
  replace?: boolean;
}

export const Redirect = ({ to, replace = false }: RedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, router]);

  return null;
};
