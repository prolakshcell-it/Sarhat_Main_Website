import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudiesData";
import CaseStudyDetailClient from "./CaseStudyDetailClient";

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return {
      title: "Case Study Not Found | Sarhat Energy",
      description: "The requested project case study could not be found.",
    };
  }

  return {
    title: `${study.title} | Sarhat Energy Case Studies`,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      images: [study.image],
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    notFound();
  }

  const related = caseStudies
    .filter((c) => c.slug !== slug)
    .slice(0, 3);

  return <CaseStudyDetailClient study={study} relatedStudies={related} />;
}

