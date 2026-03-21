import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  PoundSterling,
  Users,
} from "lucide-react";

export default function EstateAgents() {
  const faqs = [
    {
      question:
        "How do 3D floor plans help estate agents win more instructions?",
      answer:
        "During market appraisals, showing vendors a sample 3D floor plan demonstrates a higher level of marketing commitment. Vendors choose agents who present their property in the best light. A polished isometric render signals professionalism and gives you a tangible advantage over competitors using basic 2D plans or no plans at all.",
    },
    {
      question: "Can I import floor plans directly from Rightmove or Zoopla?",
      answer:
        "Yes. Paste the full listing URL from Rightmove or Zoopla into IsoRender. Our system automatically extracts the floor plan image from the listing page and converts it into an isometric 3D render. There is no need to download or screenshot the image first.",
    },
    {
      question: "What size are the output images for portal listings?",
      answer:
        "All renders are 900×900px PNG files, which is the recommended image size for Rightmove, Zoopla, and OnTheMarket. The images are optimised for fast loading on property portals without sacrificing visual quality.",
    },
    {
      question:
        "How much does IsoRender cost compared to hiring a floor plan designer?",
      answer:
        "A freelance floor plan designer typically charges £50–£150 per plan with a 2–5 day turnaround. IsoRender costs £7 per render on the Pro plan or £49/month for unlimited renders on the Agency plan. Your first render is free.",
    },
    {
      question:
        "Is IsoRender suitable for a multi-branch estate agency?",
      answer:
        "Yes. The Agency plan at £49/month includes unlimited renders, making it ideal for multi-branch operations. All branches can access the tool, and the consistent output style ensures brand uniformity across every listing.",
    },
  ];

  const relatedPages = [
    {
      title: "3D Floor Plans for Rightmove & Zoopla",
      href: "/3d-floor-plans-rightmove-zoopla",
      description:
        "Portal integration guide — image specs, URL import, and compliance requirements.",
    },
    {
      title: "3D Floor Plans for Letting Agents",
      href: "/3d-floor-plans-letting-agents",
      description:
        "How letting agents use isometric renders for rental property marketing.",
    },
    {
      title: "IsoRender vs iso3d",
      href: "/compare/isorender-vs-iso3d",
      description:
        "Feature-by-feature comparison with the main international competitor.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Full UK pricing breakdown and service details.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "3D Floor Plans for Estate Agents — Rightmove & Zoopla Ready | IsoRender",
    description:
      "AI-powered 3D floor plans designed for UK estate agents. Import directly from Rightmove and Zoopla. Boost listing engagement by up to 30%. From £7 per render.",
    url: "https://isorender.com/#/3d-floor-plans-for-estate-agents",
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
      title="3D Floor Plans for Estate Agents — Rightmove & Zoopla Ready"
      metaDescription="AI-powered 3D floor plans designed for UK estate agents. Import directly from Rightmove and Zoopla. Boost listing engagement by up to 30%. From £7 per render."
      breadcrumbs={[{ label: "For Estate Agents" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          3D Floor Plans for Estate Agents
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Estate agents across the UK are under pressure to differentiate
          listings in an increasingly competitive market. A 3D floor plan for
          estate agents is no longer a premium add-on — it is a baseline
          expectation from vendors who want their property marketed properly.
          IsoRender gives you isometric 3D renders in seconds, directly
          compatible with Rightmove and Zoopla, starting from just £7 per
          render.
        </p>

        <div className="bg-muted/40 border border-border rounded-lg p-6 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">30%</div>
              <div className="text-xs text-muted-foreground mt-1">
                More engagement with floor plans
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">&lt;60s</div>
              <div className="text-xs text-muted-foreground mt-1">
                Average render time
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">£7</div>
              <div className="text-xs text-muted-foreground mt-1">
                Per render, pay-as-you-go
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">900px</div>
              <div className="text-xs text-muted-foreground mt-1">
                Portal-optimised output
              </div>
            </div>
          </div>
        </div>

        {/* Why Estate Agents Need 3D Plans */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Why Estate Agents Need 3D Floor Plans
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The UK property market has shifted decisively online. Over 90% of
          buyers begin their search on Rightmove or Zoopla before contacting an
          agent. In that environment, the quality of your listing imagery
          directly determines whether a buyer clicks through or scrolls past.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Rightmove's own research confirms that listings with floor plans
          receive 30% more engagement than those without. But standard 2D floor
          plans — black lines on white backgrounds — only communicate dimensions.
          They do not convey the feel of a space. A prospective buyer looking at
          a 2D plan of a two-bedroom Victorian terrace cannot easily visualise
          the kitchen-diner layout or understand how the bedrooms relate to the
          bathroom.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Isometric 3D floor plans bridge this gap. They show rooms with depth,
          furniture with scale, and layouts with spatial logic. The result: more
          informed enquiries, fewer wasted viewings, and faster sales.
        </p>

        {/* Key Benefits */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Key Benefits for Your Agency
        </h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Win more instructions</h3>
              <p className="text-muted-foreground leading-relaxed">
                During market appraisals, show vendors exactly how their
                property will be presented. A 3D floor plan in your pitch deck
                signals that you invest in premium marketing — the kind of
                detail that convinces vendors to choose your agency over the
                competition down the high street.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Reduce time on market
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Better-quality listing imagery generates more relevant enquiries.
                When buyers understand the layout before they visit, viewings
                become confirmation rather than exploration. This reduces the
                number of viewings needed to secure an offer and shortens the
                overall sales timeline.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <PoundSterling className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Affordable at any scale
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                At £7 per render, adding a 3D floor plan to every listing is
                commercially viable even for independent agents handling 10–20
                instructions per month. For larger agencies, the £49/month Agency
                plan provides unlimited renders across all branches.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Stand out from online-only agents
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Online agents like Purplebricks and Strike have compressed fees
                but also compressed service. As a high street agent, your
                advantage is marketing quality. 3D floor plans are a visible,
                tangible upgrade that justifies your fee and reinforces the value
                of full-service agency.
              </p>
            </div>
          </div>
        </div>

        {/* Rightmove and Zoopla Integration */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Rightmove & Zoopla Integration
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          IsoRender is built specifically for the UK property portal ecosystem.
          The workflow is designed around how estate agents actually work:
        </p>
        <ol className="space-y-3 mb-6 list-decimal list-inside text-muted-foreground">
          <li className="leading-relaxed">
            <strong className="text-foreground">
              Paste a Rightmove or Zoopla URL
            </strong>{" "}
            — IsoRender extracts the existing 2D floor plan from the listing
            automatically. No downloading, no cropping.
          </li>
          <li className="leading-relaxed">
            <strong className="text-foreground">Choose a style</strong> —
            Select from modern, Scandi, traditional, or unfurnished presets to
            match the property's character.
          </li>
          <li className="leading-relaxed">
            <strong className="text-foreground">Download the render</strong> —
            The output is a 900×900px PNG optimised for property portal display.
            Upload it alongside your existing listing photos.
          </li>
        </ol>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The entire process takes under 60 seconds. You can generate a 3D
          floor plan between viewings, during a market appraisal, or while
          preparing listing particulars — no specialist training needed.
        </p>

        {/* ROI for Listings */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          The ROI of 3D Floor Plans
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Consider the numbers for a typical UK estate agency:
        </p>
        <div className="bg-muted/40 border border-border rounded-lg p-6 mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Average commission per sale (1.2% on £285,000)
              </span>
              <span className="font-semibold">£3,420</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Cost of 3D floor plan per listing
              </span>
              <span className="font-semibold">£7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Break-even: additional sales needed per year
              </span>
              <span className="font-semibold">
                Less than 1
              </span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-muted-foreground font-medium">
                If 3D plans help you sell just one extra property per year
              </span>
              <span className="font-bold text-primary">
                3,380% ROI
              </span>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Even modest improvements in listing engagement translate to meaningful
          revenue gains. With the average UK house price sitting around £285,000
          (ONS data, 2024), a single additional sale comfortably covers years
          of IsoRender costs.
        </p>

        {/* Types of Property */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Works for Every Property Type
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          IsoRender handles the full range of UK residential property:
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "Studio and one-bedroom flats",
            "Purpose-built apartment blocks",
            "Victorian and Edwardian terraced houses",
            "Semi-detached and detached houses",
            "New-build developments",
            "Bungalows",
            "Converted properties (warehouses, churches, barns)",
            "HMOs and multi-let properties",
          ].map((type, i) => (
            <li
              key={i}
              className="flex gap-3 text-muted-foreground"
            >
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
              <span>{type}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Start adding 3D floor plans to your listings
          </h2>
          <p className="text-muted-foreground mb-4">
            Your first render is free. Paste a Rightmove or Zoopla URL and see
            the result in under a minute.
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
