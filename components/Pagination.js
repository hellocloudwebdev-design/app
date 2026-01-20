'use client'

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage < showPages - 1) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)}>
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      )}

      {/* First Page */}
      {startPage > 1 && (
        <>
          <Link href={createPageURL(1)}>
            <Button variant="outline" size="sm">
              1
            </Button>
          </Link>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link key={page} href={createPageURL(page)}>
          <Button 
            variant={page === currentPage ? "default" : "outline"} 
            size="sm"
          >
            {page}
          </Button>
        </Link>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-muted-foreground">...</span>}
          <Link href={createPageURL(totalPages)}>
            <Button variant="outline" size="sm">
              {totalPages}
            </Button>
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)}>
          <Button variant="outline" size="sm" className="gap-1">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled className="gap-1">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}