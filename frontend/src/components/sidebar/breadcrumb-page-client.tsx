"use client"

import { usePathname } from 'next/navigation'
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { BreadcrumbPage } from '@/components/ui/breadcrumb'
import React from 'react'

export default function BreadcrumbPageClient() {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/create":
        return "Create";
      case "/dashboard/edit":
        return "Edit";
      case "/dashboard/projets":
        return "Projects";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
      <BreadcrumbPage>{getPageTitle(pathname)}</BreadcrumbPage>
  )
}
