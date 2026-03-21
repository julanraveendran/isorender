import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Upload,
  Wand2,
  Download,
  Settings2,
} from "lucide-react";

export default function GeneratorSEO() {
  const faqs = [
    {
      question: "How does the isometric floor plan generator work?",
      answer:
        "Upload a 2D floor plan image (JPG, PNG, or PDF) or paste a Rightmove/Zoopla listing URL. IsoRender's AI analyses the layout — identifying walls, doorways, windows, and room types — then generates a fully rendered isometric 3D visualisation in under 60 seconds. No manual tracing, no 3D modelling software required.",
    },
    {
      question:
        "What quality of 2D floor plan do I need to upload?",
      answer:
        "IsoRender works with most standard floor plans — including those from estate agent listing software (Metropix, Planup, etc.), hand-drawn sketches that have been scanned, and floor plans extracted from property portal listings. The clearer the original, the more accurate the render, but the AI is designed to handle real-world quality rather than perfect technical drawings.",
    },
    {
      question:
        "Can I create isometric floor plans from a Rightmove listing?",
      answer:
        "Yes. Paste any Rightmove or Zoopla listing URL into IsoRender. The tool automatically extracts the floor plan image from the listing page and converts it into an isometric 3D render. This is the fastest way to create 3D plans for properties already listed on portals.",
    },
    {
      question:
        "How does IsoRender compare to manual isometric drawing?",
      answer:
        "Manual isometric drawing in CAD or illustration software requires specialist skills and typically takes 2–4 hours per floor plan. IsoRender automates the entire process in under 60 seconds. The trade-off is that manual methods offer pixel-level control, while IsoRender provides consistent, high-quality output optimised for property marketing.",
    },
    {
      question: "Is there a free version of the generator?",
      answer:
        "Yes. The free tier includes one render per month with full quality output at 900×900px. No credit card is required to sign up. This lets you test the tool with a real floor plan before deciding whether to upgrade to Pro (£7/render) or Agency (£49/month unlimited).",
    },
  ];

  const relatedPages = [
    {
      title: "Isometric 3D Floor Plans",
      href: "/isometric-3d-floor-plans",
      description:
        "Everything you need to know about isometric 3D floor plans and how they improve property marketing.",
    },
    {
      title: "Isometric Floorplan Rendering",
      href: "/isometric-floorplan-rendering",
      description:
        "Technical deep-dive on how IsoRender's AI rendering pipeline works.",
    },
    {
      title: "Free Floor Plan Tool",
      href: "/free-floor-plan-tool",
      description:
        "Start with one free render per month — no credit card required.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Full pricing breakdown and UK-specific service details.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IsoRender — Isometric Floor Plan Generator",
    description:
      "AI-powered isometric floor plan generator. Upload a 2D floor plan or paste a Rightmove/Zoopla URL to create stunning 3D renders in seconds.",
    url: "https://isorender.com/#/isometric-floor-plan-generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      description: "Free tier — 1 render per month",
    },
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
      title="Isometric Floor Plan Generator — Create 3D Renders in Seconds"
      metaDescription="Free isometric floor plan generator. Upload a 2D plan or paste a Rightmove URL to create isometric 3D renders instantly. AI-powered, no design skills required."
      breadcrumbs={[{ label: "Isometric Floor Plan Generator" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          Isometric Floor Plan Generator
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          The IsoRender isometric floor plan generator converts any 2D floor
          plan into a polished isometric 3D render — automatically. Upload an
          image, paste a Rightmove or Zoopla URL, and get a professional-quality
          isometric floor plan creator output in under 60 seconds. No CAD
          software, no design training, no freelancer delays.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold mb-1">Try it now — your first render is free</p>
            <p className="text-sm text-muted-foreground">
              No credit card. No signup friction. Upload a floor plan and see
              the result immediately.
            </p>
          </div>
          <Link href="/generate">
            <Button className="gap-2 whitespace-nowrap">
              Open Generator <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* How It Works */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          How the Generator Works
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          IsoRender's generator is built around a simple four-step workflow
          designed for property professionals who need results quickly and
          reliably.
        </p>

        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                Step 1: Upload your floor plan
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Drag and drop a 2D floor plan image (JPG, PNG, or PDF) into the
                generator. Alternatively, paste a Rightmove or Zoopla listing
                URL — IsoRender extracts the floor plan from the listing
                automatically. The tool accepts plans from all common estate
                agent software including Metropix, Planup, Floorplanner, and
                scanned hand-drawn sketches.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                Step 2: AI analysis and room detection
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The AI analyses your floor plan to identify structural elements:
                walls, doorways, windows, staircases. It then detects room types
                from labels (kitchen, bedroom, lounge, bathroom, en-suite,
                utility) and assigns contextually appropriate furniture and
                fixtures. A kitchen gets worktops and appliances. A bedroom gets
                a bed and wardrobe. A bathroom gets sanitaryware.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                Step 3: Choose your style
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Select from multiple rendering presets: modern minimalist (clean
                lines, neutral palette), Scandi (light woods, soft tones),
                traditional (warmer colours, classic furniture), or unfurnished
                (empty rooms showing spatial proportions). Pro and Agency users
                can also adjust colour palettes and toggle specific elements.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                Step 4: Download your render
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your isometric 3D floor plan is rendered within 60 seconds and
                delivered as a high-resolution 900×900px PNG file. This is the
                optimal resolution for Rightmove, Zoopla, and OnTheMarket
                listings. Pro and Agency plans also include SVG vector export for
                print-quality brochures and marketing materials.
              </p>
            </div>
          </div>
        </div>

        {/* Manual Methods Comparison */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          IsoRender vs Manual Methods
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          There are several ways to create isometric floor plans. Here is how
          they compare:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Method</th>
                <th className="text-left p-3 font-semibold">Time</th>
                <th className="text-left p-3 font-semibold">Cost</th>
                <th className="text-left p-3 font-semibold">Skill needed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">IsoRender (AI)</td>
                <td className="p-3 text-muted-foreground">&lt;60 seconds</td>
                <td className="p-3 text-muted-foreground">
                  Free – £7/render
                </td>
                <td className="p-3 text-muted-foreground">None</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Freelance designer</td>
                <td className="p-3 text-muted-foreground">2–5 days</td>
                <td className="p-3 text-muted-foreground">£50–£150/plan</td>
                <td className="p-3 text-muted-foreground">N/A (outsourced)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">SketchUp / Blender</td>
                <td className="p-3 text-muted-foreground">2–4 hours</td>
                <td className="p-3 text-muted-foreground">
                  Free (software) + time
                </td>
                <td className="p-3 text-muted-foreground">Advanced</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Adobe Illustrator</td>
                <td className="p-3 text-muted-foreground">1–3 hours</td>
                <td className="p-3 text-muted-foreground">
                  £20/month + time
                </td>
                <td className="p-3 text-muted-foreground">Intermediate</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          For property professionals who need consistent, fast output without
          hiring designers or learning complex software, an AI-powered isometric
          floor plan creator offers the best balance of quality, speed, and
          cost.
        </p>

        {/* What Makes IsoRender Different */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          What Makes This Generator Different
        </h2>
        <ul className="space-y-3 mb-6">
          {[
            {
              title: "UK property portal integration",
              desc: "Paste Rightmove or Zoopla URLs directly. No other isometric generator offers this.",
            },
            {
              title: "GBP pricing",
              desc: "Priced in pounds sterling from £7/render. No dollar conversions, no exchange rate surprises.",
            },
            {
              title: "UK room recognition",
              desc: "Trained on British floor plan conventions — utility rooms, en-suites, box rooms, airing cupboards, WCs.",
            },
            {
              title: "Portal-ready output",
              desc: "900×900px PNG files sized specifically for Rightmove, Zoopla, and OnTheMarket image slots.",
            },
            {
              title: "No software installation",
              desc: "Entirely browser-based. Works on desktop, laptop, or tablet. Nothing to download or configure.",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">{item.title}</span>
                <span className="text-muted-foreground"> — {item.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Use Cases */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Listing enhancement</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add isometric 3D floor plans to Rightmove and Zoopla listings
              alongside standard photography. Buyers get a clearer sense of
              layout, leading to more qualified enquiries.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Market appraisal pitches</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Generate a sample 3D floor plan during the valuation visit to show
              vendors the quality of marketing they can expect from your agency.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Property brochures</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Export SVG vectors for print-quality brochures. Isometric renders
              complement professional photography in sales particulars and
              window cards.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Social media content</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              3D floor plans perform well on Instagram and Facebook property
              pages. The visual format stands out in feeds compared to standard
              listing photos.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Generate your first isometric floor plan
          </h2>
          <p className="text-muted-foreground mb-4">
            Upload any 2D floor plan or paste a property portal URL. Free to
            try — no account needed.
          </p>
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              Open the Generator <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </article>
    </SEOLayout>
  );
}
