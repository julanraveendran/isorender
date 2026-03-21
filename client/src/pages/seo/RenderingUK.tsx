import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Clock, Zap } from "lucide-react";

export default function RenderingUK() {
  const faqs = [
    {
      question: "Is IsoRender a UK-based service?",
      answer:
        "Yes. IsoRender is built for the UK property market. All pricing is in GBP, output is optimised for UK property portals (Rightmove, Zoopla, OnTheMarket), and the AI is trained on British floor plan conventions including UK room types and layout styles.",
    },
    {
      question: "What are the pricing tiers?",
      answer:
        "Free: 1 render per month at no cost. Pro: £7 per render, pay-as-you-go. Agency: £49 per month for unlimited renders. All plans include 900×900px PNG output and Rightmove/Zoopla URL import. Pro and Agency add priority processing, multiple styles, and SVG export.",
    },
    {
      question: "How fast is the rendering turnaround?",
      answer:
        "Most renders complete in under 60 seconds. Free tier renders may take slightly longer during peak times. Pro and Agency plans include priority queue access for consistently fast delivery.",
    },
    {
      question: "Do you offer VAT invoices?",
      answer:
        "Yes. All paid plans include proper VAT invoices. Agency plans receive monthly invoices automatically. Pro pay-as-you-go purchases receive a VAT receipt for each transaction. IsoRender is VAT registered in the UK.",
    },
    {
      question: "Can I cancel the Agency plan at any time?",
      answer:
        "Yes. The Agency plan is a rolling monthly subscription with no minimum term. Cancel at any time from your account settings. You retain access until the end of your current billing period.",
    },
  ];

  const relatedPages = [
    {
      title: "Isometric 3D Floor Plans",
      href: "/isometric-3d-floor-plans",
      description:
        "Complete guide to isometric 3D floor plans — what they are and how they work.",
    },
    {
      title: "3D Floor Plans for Estate Agents",
      href: "/3d-floor-plans-for-estate-agents",
      description:
        "How UK estate agents use IsoRender to enhance listings and win instructions.",
    },
    {
      title: "Free Floor Plan Tool",
      href: "/free-floor-plan-tool",
      description:
        "Try IsoRender free — one render per month, no credit card required.",
    },
    {
      title: "IsoRender vs iso3d",
      href: "/compare/isorender-vs-iso3d",
      description:
        "Feature and pricing comparison with the leading international alternative.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IsoRender — Floor Plan Rendering Service UK",
    description:
      "UK-based floor plan rendering service. AI-powered isometric 3D renders from £7. GBP pricing, portal-ready output, sub-60-second turnaround.",
    url: "https://isorender.com/#/floor-plan-rendering-uk",
    provider: {
      "@type": "Organization",
      name: "IsoRender",
      url: "https://isorender.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "GBP",
        description: "1 render per month",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "7",
        priceCurrency: "GBP",
        description: "Pay-as-you-go, per render",
      },
      {
        "@type": "Offer",
        name: "Agency",
        price: "49",
        priceCurrency: "GBP",
        description: "Unlimited renders, monthly subscription",
      },
    ],
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
      title="Floor Plan Rendering UK — GBP Pricing, Portal-Ready Output"
      metaDescription="UK floor plan rendering service. AI-powered isometric 3D renders from £7. GBP pricing, Rightmove and Zoopla integration, sub-60-second turnaround. Free tier available."
      breadcrumbs={[{ label: "Floor Plan Rendering UK" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          Floor Plan Rendering UK
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          IsoRender is a floor plan rendering service built specifically for the
          UK property market. Unlike international tools that price in dollars
          and target American real estate, IsoRender uses GBP pricing, produces
          portal-ready output for Rightmove and Zoopla, and understands British
          floor plan conventions. Floor plan rendering in the UK has never been
          this accessible.
        </p>

        {/* UK-Specific Advantages */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Built for the UK Property Market
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Most rendering tools are designed for the American market. Room labels
          say "closet" instead of "wardrobe", "bathroom" instead of "WC", and
          pricing is in US dollars with VAT complications. IsoRender is
          different.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                GBP pricing — no currency conversions
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All pricing is in pounds sterling. £7 per render on Pro, £49 per
                month on Agency. Proper VAT invoices included. No exchange rate
                surprises, no PayPal conversion fees, no dollar-to-pound mental
                arithmetic during budget planning.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Rightmove & Zoopla URL import
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Paste a listing URL from Rightmove or Zoopla and IsoRender
                extracts the floor plan automatically. No other rendering
                service offers this level of integration with UK property
                portals. It is the fastest way to create 3D renders for
                properties already on the market.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                UK room type recognition
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The AI recognises British room labels: lounge, reception,
                utility, en-suite, box room, airing cupboard, WC, cloakroom,
                conservatory, and more. Furniture placement is contextually
                appropriate for UK property types — from Victorian terraces to
                new-build flats.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                Portal-optimised image specs
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Output images are 900×900px PNG files — the recommended
                specification for Rightmove and Zoopla floor plan image slots.
                No resizing, no cropping. Upload directly to your listing.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Pricing
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Three transparent pricing tiers. No hidden fees. No long-term
          contracts. All prices exclude VAT.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Free */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-1">Free</h3>
            <div className="text-3xl font-bold mb-1">
              £0
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Try before you buy. No credit card required.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                1 render per month
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                900×900px PNG output
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Rightmove/Zoopla URL import
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                1 style preset
              </li>
            </ul>
            <Link href="/generate">
              <Button variant="outline" className="w-full gap-2">
                Start Free
              </Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="border-2 border-primary rounded-lg p-6 relative">
            <div className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              Most popular
            </div>
            <h3 className="font-semibold text-lg mb-1">Pro</h3>
            <div className="text-3xl font-bold mb-1">
              £7
              <span className="text-base font-normal text-muted-foreground">
                /render
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Pay-as-you-go. No monthly commitment.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Unlimited pay-per-render
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Priority processing queue
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Multiple style presets
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                SVG vector export
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Colour palette adjustment
              </li>
            </ul>
            <Link href="/generate">
              <Button className="w-full gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Agency */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-1">Agency</h3>
            <div className="text-3xl font-bold mb-1">
              £49
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Unlimited renders. Cancel any time.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Unlimited renders
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                All Pro features included
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Brand colour customisation
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                API access
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Multi-user team access
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Priority support
              </li>
            </ul>
            <Link href="/generate">
              <Button variant="outline" className="w-full gap-2">
                Start Agency Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Turnaround Times */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Turnaround Times
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          IsoRender processes renders on-demand. There is no queue, no batch
          processing, and no waiting for a human designer.
        </p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Plan</th>
                <th className="text-left p-3 font-semibold">
                  Typical render time
                </th>
                <th className="text-left p-3 font-semibold">Peak time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Free</td>
                <td className="p-3 text-muted-foreground">30–90 seconds</td>
                <td className="p-3 text-muted-foreground">Up to 3 minutes</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Pro</td>
                <td className="p-3 text-muted-foreground">15–45 seconds</td>
                <td className="p-3 text-muted-foreground">Under 60 seconds</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Agency</td>
                <td className="p-3 text-muted-foreground">15–45 seconds</td>
                <td className="p-3 text-muted-foreground">Under 60 seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For context, a traditional freelance designer takes 2–5 working days.
          A 3D rendering studio typically quotes 5–10 working days. IsoRender
          delivers in seconds, not days.
        </p>

        {/* Who We Serve */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Who Uses Our UK Rendering Service
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">High street estate agents</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Independent and franchise agents across England, Scotland, and
              Wales use IsoRender to enhance their Rightmove and Zoopla
              listings. The Pro plan suits agents handling 5–20 listings per
              month.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Corporate agencies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Multi-branch agencies on the Agency plan generate consistent
              renders across all locations. Savills, Knight Frank, and Foxtons
              are the kind of operations that benefit from unlimited, branded
              output.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Letting agents</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              With the rise of build-to-rent and HMO conversions, letting agents
              need visual tools to market complex layouts. IsoRender handles
              multi-room properties and shared accommodation floor plans.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Property developers</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Developers selling off-plan use IsoRender for marketing suites,
              brochures, and investor presentations. The Agency plan with API
              access supports bulk generation for large schemes.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Start rendering floor plans in the UK today
          </h2>
          <p className="text-muted-foreground mb-4">
            Your first render is free. No credit card, no commitment. See the
            quality for yourself.
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
