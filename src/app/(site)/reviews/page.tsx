import type { Metadata } from "next";
import { CtaBand, PageHeader, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import { ReviewCard } from "@/components/review-card";
import { reviews, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Patient Reviews: Home Healthcare in Kolkata",
  description:
    "Reviews from Kolkata families who used HealthHands for home blood tests, physiotherapy, nursing, vaccination and medical equipment. Shared with consent.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Reviews"
        title="What families say"
        intro="Every review here is shared with the patient's or family's permission. We use initials to protect their privacy."
      >
        <a
          href={site.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4 hover:no-underline"
        >
          Read and leave reviews on Google
        </a>
      </PageHeader>
      <Section>
        <ul className="columns-1 gap-4 md:columns-2">
          {reviews.map((r) => (
            <li key={r.name} className="mb-4 break-inside-avoid">
              <ReviewCard review={r} size="lg" />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </PageTransition>
  );
}
