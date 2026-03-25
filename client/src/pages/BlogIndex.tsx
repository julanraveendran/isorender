import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const categories = [
  "All",
  "Education",
  "Estate Agents",
  "Tutorials",
  "Architecture",
  "Industry",
  "Comparison",
  "Guides",
  "Property Marketing",
  "Property Development",
  "Letting Agents",
  "Tools",
  "Case Study",
  "SEO",
  "Data & Insights",
  "Interior Design",
  "AI & Technology",
] as const;

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "what-is-isometric-floor-plan",
    title: "What Is an Isometric Floor Plan? (And Why Estate Agents Need One in 2026)",
    excerpt: "Isometric floor plans are transforming property marketing. Learn what they are, how they differ from traditional 2D plans, and why leading UK estate agents are adopting them.",
    category: "Education",
    publishDate: "1 March 2026",
    readTime: "8 min read",
  },
  {
    slug: "rightmove-more-enquiries-guide",
    title: "How to Get More Enquiries on Rightmove: The Complete 2026 Guide",
    excerpt: "A data-driven guide to increasing your Rightmove listing enquiries — from photography standards to floor plan presentation and portal algorithm insights.",
    category: "Estate Agents",
    publishDate: "2 March 2026",
    readTime: "10 min read",
  },
  {
    slug: "3d-vs-2d-floor-plan",
    title: "Isometric 3D Floor Plan vs Traditional 2D Floor Plan: Which Converts Better?",
    excerpt: "We compare conversion rates, buyer engagement, and marketing effectiveness of 3D isometric versus 2D floor plans across UK property portals.",
    category: "Education",
    publishDate: "3 March 2026",
    readTime: "7 min read",
  },
  {
    slug: "best-floor-plan-tools-uk",
    title: "The Best Floor Plan Tools for UK Estate Agents (2026 Comparison)",
    excerpt: "An honest comparison of floor plan tools available to UK agents — from laser measurers to AI-powered 3D rendering platforms.",
    category: "Tools",
    publishDate: "4 March 2026",
    readTime: "12 min read",
  },
  {
    slug: "case-study-3d-floor-plans",
    title: "How One Estate Agency Reduced Days on Market Using 3D Floor Plans",
    excerpt: "A detailed case study examining how a mid-sized UK estate agency cut average days on market by 18% after introducing isometric 3D floor plans.",
    category: "Case Study",
    publishDate: "7 March 2026",
    readTime: "6 min read",
  },
  {
    slug: "rightmove-floor-plan-requirements",
    title: "Rightmove Floor Plan Requirements: Everything Estate Agents Need to Know (2026)",
    excerpt: "Stay compliant and competitive. This guide covers Rightmove's floor plan specifications, best practices, and how to maximise your listing's visual impact.",
    category: "Guides",
    publishDate: "8 March 2026",
    readTime: "8 min read",
  },
  {
    slug: "cgi-3d-visualisation-uk-property",
    title: "The Complete Guide to CGI and 3D Visualisation for UK Property Marketing",
    excerpt: "From CGI renders to virtual staging, explore the full spectrum of 3D visualisation tools transforming how UK properties are marketed and sold.",
    category: "Property Marketing",
    publishDate: "9 March 2026",
    readTime: "10 min read",
  },
  {
    slug: "ai-changing-property-marketing",
    title: "How AI Is Changing Property Marketing in the UK",
    excerpt: "Artificial intelligence is reshaping property marketing across the UK — from automated listing descriptions to AI-generated 3D floor plans and virtual staging.",
    category: "Industry",
    publishDate: "10 March 2026",
    readTime: "8 min read",
  },
  {
    slug: "isometric-architecture-drawing-guide",
    title: "Isometric Architecture Drawing: A Guide for Architects and Interior Designers",
    excerpt: "Master isometric drawing techniques for architectural presentation. Learn the principles, tools, and modern AI-assisted workflows.",
    category: "Architecture",
    publishDate: "12 March 2026",
    readTime: "9 min read",
  },
  {
    slug: "convert-2d-floor-plan-to-3d",
    title: "How to Convert a 2D Floor Plan to a 3D Isometric Render (Without a Designer)",
    excerpt: "A step-by-step tutorial for converting your existing 2D floor plans into professional 3D isometric renders using AI tools — no design experience required.",
    category: "Tutorials",
    publishDate: "13 March 2026",
    readTime: "7 min read",
  },
  {
    slug: "property-listing-mistakes-uk",
    title: "10 Property Listing Mistakes UK Estate Agents Make (And How to Fix Them)",
    excerpt: "From poor photography to missing floor plans, these common listing errors cost agents enquiries and instructions. Here's how to fix each one.",
    category: "Estate Agents",
    publishDate: "14 March 2026",
    readTime: "9 min read",
  },
  {
    slug: "new-build-property-marketing",
    title: "New Build Property Marketing: How Developers Win Off-Plan Sales with 3D Floor Plans",
    excerpt: "For property developers selling off-plan, 3D floor plans are essential marketing assets. Learn how leading UK developers use them to drive reservations.",
    category: "Property Development",
    publishDate: "15 March 2026",
    readTime: "8 min read",
  },
  {
    slug: "property-visualisation-tools-architects",
    title: "The Ultimate Guide to Property Visualisation Tools for UK Architects",
    excerpt: "A comprehensive overview of visualisation tools available to UK architects — from traditional rendering software to AI-powered alternatives.",
    category: "Architecture",
    publishDate: "17 March 2026",
    readTime: "10 min read",
  },
  {
    slug: "letting-agents-3d-floor-plans",
    title: "How Letting Agents Can Use 3D Floor Plans to Win More Landlord Instructions",
    excerpt: "Lettings is competitive. See how 3D floor plans can differentiate your agency, justify higher fees, and win more landlord instructions.",
    category: "Letting Agents",
    publishDate: "18 March 2026",
    readTime: "7 min read",
  },
  {
    slug: "isorender-vs-competitors",
    title: "IsoRender vs Competitors: An Honest Comparison (Updated 2026)",
    excerpt: "A transparent comparison of IsoRender against alternative 3D floor plan tools. We cover pricing, quality, speed, and feature sets.",
    category: "Comparison",
    publishDate: "19 March 2026",
    readTime: "8 min read",
  },
  {
    slug: "rightmove-optimised-floor-plan",
    title: "How to Create a Rightmove-Optimised Floor Plan in Under 5 Minutes",
    excerpt: "A quick tutorial showing estate agents how to create floor plans optimised for Rightmove's listing format using IsoRender's AI tool.",
    category: "Tutorials",
    publishDate: "20 March 2026",
    readTime: "5 min read",
  },
  {
    slug: "property-portal-seo-floor-plans",
    title: "UK Property Portal SEO: Why Your Listings Need Better Floor Plans",
    excerpt: "Floor plans affect your listing's visibility and click-through rate on Rightmove, Zoopla, and OnTheMarket. Here's what the data says.",
    category: "SEO",
    publishDate: "21 March 2026",
    readTime: "7 min read",
  },
  {
    slug: "roi-3d-floor-plans",
    title: "The ROI of 3D Floor Plans: Data from 50 UK Agencies",
    excerpt: "We analysed data from 50 UK estate agencies to quantify the return on investment of adding 3D isometric floor plans to property listings.",
    category: "Data & Insights",
    publishDate: "22 March 2026",
    readTime: "8 min read",
  },
  {
    slug: "interior-design-visualisation-tools",
    title: "Interior Design Visualisation: The Tools Designers Are Using in 2026",
    excerpt: "Interior designers are embracing new visualisation tools to present concepts to clients. From mood boards to AI-rendered floor plans, here's the 2026 landscape.",
    category: "Interior Design",
    publishDate: "23 March 2026",
    readTime: "7 min read",
  },
  {
    slug: "chatgpt-estate-agents",
    title: "ChatGPT for Estate Agents: How AI Tools Are Changing Property Marketing",
    excerpt: "Estate agents are using ChatGPT and AI tools for listing descriptions, client communications, and marketing. A practical guide to getting started.",
    category: "AI & Technology",
    publishDate: "24 March 2026",
    readTime: "8 min read",
  },
];

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    document.title = "Blog | IsoRender — 3D Floor Plan Insights for Property Professionals";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Expert insights on 3D floor plans, property marketing, and AI visualisation tools for UK estate agents, architects, and property developers.");
  }, []);

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  const activeCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="IsoRender logo">
                <path d="M16 4L28 11V21L16 28L4 21V11L16 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M16 4L16 14L28 21" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 14L4 21" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-semibold text-lg tracking-tight">IsoRender</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/blog" className="text-foreground font-medium">Blog</Link>
            <Link href="/isometric-floor-plan-generator" className="hover:text-foreground transition-colors">Generator</Link>
            <Link href="/floor-plan-rendering-uk" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <Link href="/generate">
            <Button size="sm" className="gap-1.5">
              Try Free <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Blog</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">IsoRender Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Insights on 3D floor plans, property marketing, and AI visualisation tools for UK estate agents, architects, and developers.
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 pb-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {activeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
                data-testid={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors cursor-pointer group h-full flex flex-col"
                  data-testid={`card-blog-${post.slug}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>No articles found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Transform your floor plans today</h2>
          <p className="text-primary-foreground/70 mb-6">
            Upload a 2D floor plan or paste a Rightmove/Zoopla link. Get a stunning isometric 3D render in seconds.
          </p>
          <Link href="/generate">
            <Button size="lg" variant="secondary" className="gap-2">
              Try IsoRender Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="IsoRender logo">
                  <path d="M16 4L28 11V21L16 28L4 21V11L16 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M16 4L16 14L28 21" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 14L4 21" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="font-semibold tracking-tight">IsoRender</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered isometric 3D floor plan rendering for UK property professionals.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/isometric-3d-floor-plans" className="block hover:text-foreground transition-colors">Isometric 3D Floor Plans</Link>
                <Link href="/isometric-floor-plan-generator" className="block hover:text-foreground transition-colors">Floor Plan Generator</Link>
                <Link href="/floor-plan-rendering-uk" className="block hover:text-foreground transition-colors">UK Rendering Service</Link>
                <Link href="/free-floor-plan-tool" className="block hover:text-foreground transition-colors">Free Tool</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Solutions</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/3d-floor-plans-for-estate-agents" className="block hover:text-foreground transition-colors">For Estate Agents</Link>
                <Link href="/3d-floor-plans-architects" className="block hover:text-foreground transition-colors">For Architects</Link>
                <Link href="/3d-floor-plans-property-developers" className="block hover:text-foreground transition-colors">For Developers</Link>
                <Link href="/3d-floor-plans-letting-agents" className="block hover:text-foreground transition-colors">For Letting Agents</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/blog" className="block hover:text-foreground transition-colors">Blog</Link>
                <Link href="/3d-floor-plans-rightmove-zoopla" className="block hover:text-foreground transition-colors">Rightmove & Zoopla</Link>
                <Link href="/compare/isorender-vs-iso3d" className="block hover:text-foreground transition-colors">IsoRender vs iso3d</Link>
                <a href="mailto:hello@isorender.com" className="block hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} IsoRender. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
