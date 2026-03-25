import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOLayoutProps {
  title: string;
  metaDescription: string;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
  faqs?: FAQItem[];
  relatedPages?: { title: string; href: string; description: string }[];
  schemaMarkup?: object;
}

export default function SEOLayout({
  title,
  metaDescription,
  breadcrumbs,
  children,
  faqs,
  relatedPages,
  schemaMarkup,
}: SEOLayoutProps) {
  useEffect(() => {
    document.title = `${title} | IsoRender`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", metaDescription);

    // Inject schema markup
    if (schemaMarkup) {
      const existing = document.getElementById("seo-schema");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = "seo-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schemaMarkup);
      document.head.appendChild(script);
      return () => { script.remove(); };
    }
  }, [title, metaDescription, schemaMarkup]);

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
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
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

      {/* Breadcrumbs */}
      <div className="pt-20 pb-2 max-w-4xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          {breadcrumbs?.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-16">
        {children}
      </main>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="bg-muted/30 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Pages */}
      {relatedPages && relatedPages.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold tracking-tight mb-6">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedPages.map((page, i) => (
                <Link key={i} href={page.href}>
                  <div className="border border-border rounded-lg p-5 hover:bg-muted/30 transition-colors cursor-pointer group">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{page.title}</h3>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

// Blog-specific layout variant
export function BlogLayout({
  title,
  metaDescription,
  publishDate,
  readTime,
  category,
  children,
  faqs,
  relatedPages,
  schemaMarkup,
}: SEOLayoutProps & { publishDate: string; readTime: string; category: string }) {
  return (
    <SEOLayout
      title={title}
      metaDescription={metaDescription}
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: title },
      ]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">{category}</span>
          <span>{publishDate}</span>
          <span>&middot;</span>
          <span>{readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">{title}</h1>
        <div className="prose prose-lg max-w-none [&>h2]:text-xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:text-muted-foreground [&>ul]:mb-4 [&>ul]:space-y-2 [&>ol]:text-muted-foreground [&>ol]:mb-4 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary/30 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground">
          {children}
        </div>
      </article>
    </SEOLayout>
  );
}
