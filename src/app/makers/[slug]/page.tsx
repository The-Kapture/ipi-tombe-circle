import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { makers } from "@/data/makers";
import { absoluteUrl, circleId, mapsUrl, shortAddress, siteName, siteUrl, stallAddress } from "@/lib/seo";

export function generateStaticParams() {
  return makers.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const maker = makers.find(({ id }) => id === slug);
  if (!maker) return {};
  const title = `${maker.brand}: ${maker.craft} in Borrowdale, Harare`;
  return {
    title,
    description: `${maker.description} Find ${maker.brand} at Stall ${maker.stall}, ${siteName}, ${shortAddress}.`,
    alternates: { canonical: `/makers/${maker.id}` },
    openGraph: { title, description: maker.description, url: `/makers/${maker.id}`, images: maker.images[0] ? [maker.images[0]] : ["/opengraph-image"] },
  };
}

export default async function MakerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const maker = makers.find(({ id }) => id === slug);
  if (!maker) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/makers/${maker.id}#maker`,
    name: maker.brand,
    description: maker.description,
    url: absoluteUrl(`/makers/${maker.id}`),
    image: maker.images.map(absoluteUrl),
    founder: maker.makers.map((name) => ({ "@type": "Person", name })),
    location: { "@type": "Place", name: `Stall ${maker.stall}, ${siteName}`, address: stallAddress(maker.stall), containedInPlace: { "@id": circleId } },
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: siteUrl },
      { "@type": "ListItem", position: 2, name: maker.brand, item: absoluteUrl(`/makers/${maker.id}`) },
    ],
  };
  return (
    <main className="maker-profile-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]).replace(/</g, "\\u003c") }} />
      <Link className="text-link" href="/#discover">← All makers</Link>
      <div className="maker-profile-page__grid">
        <div className="maker-profile-page__gallery">
          {maker.images.length ? maker.images.slice(0, 3).map((src, index) => <Image key={src} src={src} alt={`${maker.brand} ${maker.craft}${index ? `, image ${index + 1}` : ""}`} width={900} height={900} priority={index === 0} />) : <div className="maker-profile-page__placeholder">Photography coming soon.</div>}
        </div>
        <article>
          <span className="maker-card__stall">Stall {maker.stall} · {maker.category}</span>
          <h1>{maker.brand}</h1>
          <h2>{maker.craft}</h2>
          <p>{maker.description}</p>
          <p><strong>Made by</strong><br />{maker.makers.join(" · ")}</p>
          <p className="maker-profile-page__where"><strong>Where to find {maker.brand}</strong><br />Stall {maker.stall}, {siteName}<br />{shortAddress}</p>
          <a className="button button--primary" href={mapsUrl} target="_blank" rel="noreferrer">Find the Circle</a>
        </article>
      </div>
    </main>
  );
}
