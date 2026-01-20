import { getPostBySlug } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { getFeaturedImage, getAuthorName, calculateReadingTime } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const title = post.title?.rendered || 'Untitled';
  const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '';
  const featuredImage = getFeaturedImage(post);

  return {
    title: `${title} - Newspaper Now`,
    description: excerpt.substring(0, 160),
    openGraph: {
      title,
      description: excerpt.substring(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [getAuthorName(post)],
      images: [{
        url: featuredImage,
        alt: title,
      }],
    },
  };
}

export default async function ArticlePage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = getFeaturedImage(post);
  const authorName = getAuthorName(post);
  const readingTime = calculateReadingTime(post.content?.rendered || '');

  return (
    <article className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }}
          />
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM dd, yyyy')}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-muted">
          <Image
            src={featuredImage}
            alt={post.title?.rendered || 'Article image'}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            unoptimized={featuredImage.includes('demo.wp-api.org')}
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:text-foreground prose-ol:text-foreground
            prose-li:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-img:rounded-lg prose-img:shadow-md
            prose-pre:bg-muted prose-pre:text-foreground
            prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
        />
      </div>
    </article>
  );
}