import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { getFeaturedImage, getAuthorName, calculateReadingTime, createExcerpt } from '@/lib/wordpress';

export default function ArticleCard({ post }) {
  const featuredImage = getFeaturedImage(post);
  const authorName = getAuthorName(post);
  const readingTime = calculateReadingTime(post.content?.rendered || '');
  const excerpt = post.excerpt?.rendered 
    ? createExcerpt(post.excerpt.rendered) 
    : createExcerpt(post.content?.rendered || '');

  return (
    <article className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/article/${post.slug}`}>
        <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
          <Image
            src={featuredImage}
            alt={post.title?.rendered || 'Article image'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={featuredImage.includes('demo.wp-api.org')}
          />
        </div>
        <div className="p-6">
          <h2 
            className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }}
          />
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}