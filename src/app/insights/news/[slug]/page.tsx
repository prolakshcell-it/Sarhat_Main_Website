import { notFound } from "next/navigation";
import { newsArticles } from "@/data/newsData";
import NewsDetailClient from "./NewsDetailClient";

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "News Article Not Found | Sarhat Energy",
      description: "The requested news update could not be found.",
    };
  }

  return {
    title: `${article.title} | Sarhat Energy News`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.image],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = newsArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return <NewsDetailClient article={article} relatedArticles={related} />;
}

