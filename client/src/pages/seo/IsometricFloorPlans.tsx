import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Eye, Palette, Zap } from "lucide-react";

export default function IsometricFloorPlans() {
  const faqs = [
    {
      question: "What is an isometric 3D floor plan?",
      answer:
        "An isometric 3D floor plan is a visual representation of a property layout rendered at a fixed 30-degree angle, giving a bird's-eye three-dimensional view without perspective distortion. Unlike standard 2D plans, isometric renders show walls, furniture, and spatial relationships in a way that buyers and tenants can immediately understand.",
    },
    {
      question: "How long does IsoRender take to produce an isometric floor plan?",
      answer:
        "Most renders are completed in under 60 seconds. Upload your 2D floor plan or paste a Rightmove/Zoopla listing URL, and our AI processes the layout, identifies rooms, and generates a fully styled isometric 3D render automatically.",
    },
    {
      question: "Can I customise the style of my isometric render?",
      answer:
        "Yes. IsoRender offers multiple style presets including modern minimalist, Scandi, traditional, and unfurnished layouts. You can also adjust colour palettes and toggle furniture on or off to suit your marketing needs.",
    },
    {
      question: "What file formats do I get?",
      answer:
        "All renders are delivered as high-resolution PNG files at 900×900px — the optimal size for Rightmove and Zoopla listings. Pro and Agency plans also include SVG vector exports for print-quality brochures.",
    },
    {
      question: "Do I need design skills to use IsoRender?",
      answer:
        "Not at all. IsoRender is built for property professionals, not designers. The entire process is automated — upload a floor plan, choose a style, and download your render. No CAD software, no design training, no waiting for freelancers.",
    },
  ];

  const relatedPages = [
    {
      title: "3D Floor Plans for Estate Agents",
      href: "/3d-floor-plans-for-estate-agents",
      description:
        "How UK estate agents use isometric renders to win instructions and sell properties faster.",
    },
    {
      title: "Isometric Floor Plan Generator",
      href: "/isometric-floor-plan-generator",
      description:
        "Step-by-step guide to creating isometric 3D floor plans with our AI-powered tool.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "UK-focused rendering service with GBP pricing and portal-ready output.",
    },
    {
      title: "Free Floor Plan Tool",
      href: "/free-floor-plan-tool",
      description:
        "Try IsoRender free — one render per month, no credit card required.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Isometric 3D Floor Plans — AI-Powered Rendering | IsoRender",
    description:
      "Create stunning isometric 3D floor plans from any 2D floor plan. AI-powered rendering for UK estate agents, architects, and property developers. From £7 per render.",
    url: "https://isorender.com/#/isometric-3d-floor-plans",
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  };

  return (
    <SEOLayout
      title="Isometric 3D Floor Plans — AI-Powered Rendering"
      metaDescription="Create stunning isometric 3D floor plans from any 2D floor plan. AI-powered rendering for UK estate agents, architects, and property developers. From £7 per render."
      breadcrumbs={[{ label: "Isometric 3D Floor Plans" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          Isometric 3D Floor Plans
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Isometric 3D floor plans transform flat, technical drawings into vivid
          three-dimensional visualisations that buyers actually understand. With
          IsoRender, you can convert any 2D floor plan — or a Rightmove/Zoopla
          listing URL — into a polished isometric render in under a minute. No
          design skills required, no expensive software, and no waiting days for
          a freelancer to deliver.
        </p>

        <div className="bg-muted/40 border border-border rounded-lg p-6 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-primary" />
            <span className="font-semibold">Why this matters</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Rightmove data shows listings with floor plans receive 30% more
            engagement than those without. Isometric 3D renders take this
            further — giving prospective buyers and tenants a spatial
            understanding that flat plans simply cannot provide.
          </p>
        </div>

        {/* What Are Isometric Floor Plans */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          What Are Isometric Floor Plans?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A standard 2D floor plan is a top-down technical drawing. It
          communicates dimensions and room positions, but it requires the viewer
          to mentally reconstruct the space. Most buyers — particularly those
          searching online through Rightmove, Zoopla, or OnTheMarket — lack the
          spatial imagination to do this accurately.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Isometric floor plans solve this by projecting the layout at a
          consistent 30-degree angle. This creates a three-dimensional view
          where walls have height, furniture has volume, and rooms have
          recognisable proportions. Unlike perspective renders (which distort
          objects further from the camera), isometric projection maintains
          parallel lines and consistent scale throughout the image. The result is
          a clean, professional visualisation that communicates space clearly.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This projection style is widely used in architecture, gaming, and
          technical illustration precisely because it is both visually appealing
          and dimensionally honest. For property marketing, it strikes the ideal
          balance between realism and clarity.
        </p>

        {/* How IsoRender Creates Them */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          How IsoRender Creates Isometric 3D Floor Plans
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Traditional isometric rendering requires CAD software, 3D modelling
          expertise, and hours of manual work. A freelance designer typically
          charges £50–£150 per floor plan and takes 2–5 working days. IsoRender
          replaces this entire workflow with AI.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Upload or paste a URL</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Upload a 2D floor plan image (JPG, PNG, or PDF) or paste a
                Rightmove/Zoopla listing URL. IsoRender extracts the floor plan
                automatically from property portal listings.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">AI analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our AI identifies walls, doorways, windows, and room labels. It
                recognises standard room types — kitchen, lounge, bedroom,
                bathroom, en-suite, utility — and assigns appropriate furniture
                and fixtures.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Isometric rendering</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The floor plan is projected into isometric space. Walls are
                extruded, furniture is placed, and the scene is rendered with
                soft ambient lighting. The entire process takes under 60 seconds.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">Download and use</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Download your render as a high-resolution 900×900px PNG — ready
                for Rightmove, Zoopla, OnTheMarket, property brochures, or
                social media marketing.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits for Property Marketing */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Benefits for Property Marketing
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Isometric 3D floor plans are not a novelty — they are a proven
          marketing tool used by leading estate agents across the UK to
          differentiate listings and attract more enquiries.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: Eye,
              title: "Higher engagement",
              desc: "Listings with visual floor plans receive significantly more clicks, saves, and enquiries on property portals. Isometric renders amplify this effect by making layouts instantly comprehensible.",
            },
            {
              icon: Zap,
              title: "Faster turnaround",
              desc: "Generate renders in seconds rather than waiting days for a designer. List properties faster, respond to new instructions immediately, and maintain momentum through the sales process.",
            },
            {
              icon: Palette,
              title: "Consistent branding",
              desc: "Every render uses the same clean, professional style. Whether you are marketing a studio flat in Clapham or a five-bedroom detached house in Surrey, the quality is uniform.",
            },
            {
              icon: CheckCircle2,
              title: "Cost-effective at scale",
              desc: "At £7 per render (or from £49/month for agency plans), IsoRender costs a fraction of traditional 3D visualisation. High street agents can afford to include renders with every listing.",
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="border border-border rounded-lg p-5"
            >
              <benefit.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Who Uses Isometric Floor Plans */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Who Uses Isometric Floor Plans?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Isometric 3D floor plans serve a wide range of property professionals
          across the UK market:
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Estate agents</strong> use
              them to enhance Rightmove and Zoopla listings, win market
              appraisals, and reduce viewing-to-offer timelines.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Letting agents</strong>{" "}
              include them in rental listings to attract higher-quality tenant
              enquiries and reduce unnecessary viewings.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Architects</strong> present
              them to clients during design consultations and planning
              discussions, making spatial concepts accessible to non-technical
              stakeholders.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Property developers</strong>{" "}
              use them for off-plan sales brochures, marketing suites, and
              investor presentations — particularly for new-build schemes where
              the physical property does not yet exist.
            </span>
          </li>
        </ul>

        {/* Pricing */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Pricing
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          IsoRender is priced for UK property professionals who need regular,
          affordable access to high-quality isometric renders. All prices are in
          GBP with no hidden fees.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-1">Free</h3>
            <p className="text-2xl font-bold mb-2">
              £0<span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              1 render per month. Perfect for trying the service before
              committing.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 900×900px PNG output</li>
              <li>• Portal URL import</li>
              <li>• Standard styles</li>
            </ul>
          </div>
          <div className="border-2 border-primary rounded-lg p-5">
            <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
              Most popular
            </div>
            <h3 className="font-semibold mb-1">Pro</h3>
            <p className="text-2xl font-bold mb-2">
              £7<span className="text-sm font-normal text-muted-foreground">/render</span>
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Pay-as-you-go. Ideal for independent agents and small practices.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All free features</li>
              <li>• Priority processing</li>
              <li>• Multiple style presets</li>
              <li>• SVG export</li>
            </ul>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-1">Agency</h3>
            <p className="text-2xl font-bold mb-2">
              £49<span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Unlimited renders. Built for multi-branch agencies and property
              companies.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All pro features</li>
              <li>• Unlimited renders</li>
              <li>• Brand customisation</li>
              <li>• API access</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Create your first isometric 3D floor plan
          </h2>
          <p className="text-muted-foreground mb-4">
            Upload a floor plan or paste a Rightmove URL. Your first render is
            free — no credit card required.
          </p>
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              Try IsoRender Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </article>
    </SEOLayout>
  );
}
