import { notFound } from "next/navigation";
import { editorialArticles } from "@/data/articlesData";
import ArticleDetailClient from "./ArticleDetailClient";

export function generateStaticParams() {
  return editorialArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = editorialArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Sarhat Energy",
      description: "The requested technical whitepaper could not be found.",
    };
  }

  return {
    title: `${article.title} | Sarhat Energy Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = editorialArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = editorialArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return <ArticleDetailClient article={article} relatedArticles={related} />;
}

