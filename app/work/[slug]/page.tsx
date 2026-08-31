import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EntryDetail } from "@/components/entry-detail";
import { getWorkEntry, workEntries } from "@/content/work";

export function generateStaticParams() { return workEntries.map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const entry = getWorkEntry((await params).slug); if (!entry) return {}; return { title: entry.title, description: entry.summary, openGraph: { title: `${entry.title} | Alen P. Jose`, description: entry.summary, type: "article" } }; }
export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) { const entry = getWorkEntry((await params).slug); if (!entry) notFound(); return <article className="detail-page page-section"><Link className="back-link" href="/work">← All work</Link><EntryDetail entry={entry} /></article>; }
