'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs, generateBreadcrumbs } from './Breadcrumbs';

export function BreadcrumbsClient() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null;
  }

  const breadcrumbs = generateBreadcrumbs(pathname);
  
  return <Breadcrumbs items={breadcrumbs} />;
}