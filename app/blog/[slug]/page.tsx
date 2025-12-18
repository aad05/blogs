import { docs, meta } from "@/.source";
import { DocsBody } from "fumadocs-ui/page";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { TableOfContents } from "@/components/table-of-contents";
import { MobileTableOfContents } from "@/components/mobile-toc";
import { AuthorCard } from "@/components/author-card";
import { ReadMoreSection } from "@/components/read-more-section";
import { PromoContent } from "@/components/promo-content";
import { getAuthor, isValidAuthor } from "@/lib/authors";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { CommentType} from "@/components/comment";
import { siteConfig } from "@/lib/site";

// Sample data for the discussion thread
const sampleComments: CommentType[] = [
  {
    id: 1,
    author: "techguru42",
    content: "This is a really interesting discussion about React components. I've been working with similar patterns and found that proper state management is crucial for nested structures like this.",
    timestamp: "2h",
    upvotes: 24,
    downvotes: 2,
    replies: [
      {
        id: 2,
        author: "devninja",
        content: "Absolutely agree! What state management solution do you recommend for deeply nested components?",
        timestamp: "1h",
        upvotes: 8,
        downvotes: 0,
        replies: [
          {
            id: 3,
            author: "techguru42",
            content: "I usually go with Zustand for simpler cases, but Redux Toolkit for more complex applications. The key is avoiding prop drilling.",
            timestamp: "45m",
            upvotes: 12,
            downvotes: 1,
            replies: []
          }
        ]
      },
      {
        id: 4,
        author: "reactfan",
        content: "Have you tried using React Context for this? I find it works well for theme management in nested components.",
        timestamp: "30m",
        upvotes: 5,
        downvotes: 0,
        replies: []
      }
    ]
  },
  {
    id: 5,
    author: "designerdev",
    content: "The UI looks great! Really clean design. How did you handle the responsive behavior on mobile?",
    timestamp: "3h",
    upvotes: 15,
    downvotes: 0,
    replies: []
  }
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;

  if (!slug || slug.length === 0) {
    return {};
  }

  const page = blogSource.getPage([slug]);

  if (!page) {
    return {};
  }

  const { title, description, date, thumbnail, tags } = page.data as {
    title?: string;
    description?: string;
    date?: string;
    thumbnail?: string;
    tags?: string[];
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const url = baseUrl ? `${baseUrl}/blog/${slug}` : undefined;
  const metaTitle = title ?? siteConfig.name;
  const metaDescription = description ?? siteConfig.description;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: tags && tags.length > 0 ? tags : undefined,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "article",
      images: thumbnail
        ? [
            {
              url: thumbnail,
              alt: metaTitle,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      publishedTime: date,
    },
    twitter: {
      card: thumbnail ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      images: thumbnail ? [thumbnail] : undefined,
    },
    category: "Blog",
    applicationName: siteConfig.name,
    publisher: siteConfig.name,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const page = blogSource.getPage([slug]);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const date = new Date(page.data.date);
  const formattedDate = formatDate(date);

  return (
    <div className="min-h-screen bg-background relative">
      <HashScrollHandler />
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <div className="space-y-4 border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6">
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>
            {page.data.tags && page.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {page.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <time className="font-medium text-muted-foreground">
              {formattedDate}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {page.data.title}
          </h1>

          {page.data.description && (
            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              {page.data.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          {page.data.thumbnail && (
            <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
              <Image
                src={page.data.thumbnail}
                alt={page.data.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
              <DocsBody>
                <MDX />
              </DocsBody>
            </div>
          </div>
          <div className="mt-10">
            <ReadMoreSection
              currentSlug={[slug]}
              currentTags={page.data.tags}
            />
          </div>
          <div>
            {/* <CommentThread initialComments={sampleComments} /> */}
          </div>
        </main>

        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {page.data.author && isValidAuthor(page.data.author) && (
              <AuthorCard author={getAuthor(page.data.author)} />
            )}
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents />
            </div>
            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>

      <MobileTableOfContents />
    </div>
  );
}
