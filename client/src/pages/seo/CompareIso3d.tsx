import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X, Minus } from "lucide-react";

export default function CompareIso3d() {
  const faqs = [
    {
      question: "Is IsoRender a direct alternative to iso3d?",
      answer:
        "Yes. Both tools convert 2D floor plans into isometric 3D renders using AI. IsoRender is the UK-focused alternative — with GBP pricing, Rightmove/Zoopla URL import, and AI trained on British floor plan conventions. If you are a UK property professional, IsoRender is built specifically for your market.",
    },
    {
      question: "Why is IsoRender cheaper than iso3d?",
      answer:
        "IsoRender's Pro plan is £7 per render (approximately $9), which is broadly comparable to iso3d's per-render pricing. However, IsoRender's Agency plan at £49/month for unlimited renders offers significantly better value for agents and developers who need regular output. iso3d does not offer an equivalent unlimited tier.",
    },
    {
      question: "Can IsoRender import from Rightmove and Zoopla?",
      answer:
        "Yes. This is IsoRender's signature feature. Paste a Rightmove or Zoopla listing URL and the floor plan is extracted and rendered automatically. iso3d does not support UK property portal integration — you need to download and upload the floor plan image manually.",
    },
    {
      question: "Which tool produces better quality renders?",
      answer:
        "Both tools produce professional-quality isometric renders suitable for property marketing. The visual style differs slightly — IsoRender favours a clean, architectural aesthetic while iso3d uses a more illustrative style. Quality is comparable; the choice depends on your preferred visual style and whether you need UK-specific features.",
    },
    {
      question: "Can I switch from iso3d to IsoRender?",
      answer:
        "Yes. There is no data migration needed — simply start uploading your floor plans to IsoRender instead. Your first render is free, so you can compare the output quality before committing. The workflow is very similar: upload a 2D plan, choose a style, download the render.",
    },
  ];

  const relatedPages = [
    {
      title: "IsoRender vs Matterport",
      href: "/compare/isorender-vs-matterport",
      description:
        "How AI-powered rendering compares with 3D camera scanning.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Full UK pricing details for all IsoRender plans.",
    },
    {
      title: "Isometric Floor Plan Generator",
      href: "/isometric-floor-plan-generator",
      description:
        "Step-by-step guide to using the IsoRender generator.",
    },
    {
      title: "Free Floor Plan Tool",
      href: "/free-floor-plan-tool",
      description:
        "Try IsoRender free — compare the output with iso3d before committing.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "IsoRender vs iso3d — Feature Comparison | IsoRender",
    description:
      "Detailed comparison of IsoRender and iso3d. Feature-by-feature analysis including pricing, UK portal integration, rendering styles, and output specifications.",
    url: "https://isorender.com/#/compare/isorender-vs-iso3d",
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
      title="IsoRender vs iso3d — Feature Comparison"
      metaDescription="Comparing IsoRender and iso3d: pricing, features, UK portal integration, and rendering quality. Find out which isometric floor plan tool is right for UK property professionals."
      breadcrumbs={[
        { label: "Compare", href: "/compare/isorender-vs-iso3d" },
        { label: "IsoRender vs iso3d" },
      ]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          IsoRender vs iso3d
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          If you are searching for an iso3d alternative, you have likely already
          discovered iso3d.com — a well-known tool for converting floor plans
          into isometric 3D renders. IsoRender offers a comparable service with
          one critical difference: it is built for the UK property market. This
          page provides a transparent iso3d vs IsoRender comparison so you can
          make an informed decision.
        </p>

        {/* Feature Comparison Table */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Feature-by-Feature Comparison
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-left p-3 font-semibold">IsoRender</th>
                <th className="text-left p-3 font-semibold">iso3d</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "AI floor plan analysis",
                  iso: true,
                  comp: true,
                },
                {
                  feature: "Isometric 3D rendering",
                  iso: true,
                  comp: true,
                },
                {
                  feature: "Rightmove URL import",
                  iso: true,
                  comp: false,
                },
                {
                  feature: "Zoopla URL import",
                  iso: true,
                  comp: false,
                },
                {
                  feature: "GBP pricing",
                  iso: true,
                  comp: false,
                },
                {
                  feature: "UK room type recognition",
                  iso: true,
                  comp: "partial",
                },
                {
                  feature: "VAT invoices",
                  iso: true,
                  comp: false,
                },
                {
                  feature: "Multiple style presets",
                  iso: true,
                  comp: true,
                },
                {
                  feature: "SVG vector export",
                  iso: true,
                  comp: false,
                },
                {
                  feature: "Unlimited plan (monthly)",
                  iso: true,
                  comp: false,
                },
                {
                  feature: "API access",
                  iso: true,
                  comp: "partial",
                },
                {
                  feature: "Free tier",
                  iso: true,
                  comp: true,
                },
                {
                  feature: "Brand customisation",
                  iso: true,
                  comp: false,
                },
                {
                  feature: "900×900px portal-optimised output",
                  iso: true,
                  comp: false,
                },
              ].map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium">{row.feature}</td>
                  <td className="p-3">
                    {row.iso === true ? (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    ) : row.iso === false ? (
                      <X className="w-4 h-4 text-muted-foreground/40" />
                    ) : (
                      <Minus className="w-4 h-4 text-amber-500" />
                    )}
                  </td>
                  <td className="p-3">
                    {row.comp === true ? (
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    ) : row.comp === false ? (
                      <X className="w-4 h-4 text-muted-foreground/40" />
                    ) : (
                      <Minus className="w-4 h-4 text-amber-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Comparison */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Pricing Comparison
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Plan</th>
                <th className="text-left p-3 font-semibold">IsoRender</th>
                <th className="text-left p-3 font-semibold">iso3d</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Free</td>
                <td className="p-3 text-muted-foreground">
                  1 render/month, £0
                </td>
                <td className="p-3 text-muted-foreground">
                  Limited free trial
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Per render</td>
                <td className="p-3 text-primary font-medium">£7</td>
                <td className="p-3 text-muted-foreground">$9 (~£7.20)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Unlimited monthly</td>
                <td className="p-3 text-primary font-medium">
                  £49/month
                </td>
                <td className="p-3 text-muted-foreground">
                  Not available
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Currency</td>
                <td className="p-3 text-primary font-medium">GBP (£)</td>
                <td className="p-3 text-muted-foreground">USD ($)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* UK Focus Advantage */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Why the UK Focus Matters
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          iso3d is a good tool. It produces quality isometric renders and has an
          established user base internationally. But it is not designed for the
          UK market, and this shows in several practical ways:
        </p>
        <ul className="space-y-3 mb-8">
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                No portal integration
              </strong>{" "}
              — With iso3d, you must download the floor plan image from
              Rightmove or Zoopla manually, then upload it to the tool. With
              IsoRender, you paste the listing URL and the floor plan is
              extracted automatically. This saves 2–3 minutes per listing.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                USD pricing
              </strong>{" "}
              — iso3d charges in US dollars. For UK agents, this means
              unpredictable costs due to exchange rate fluctuations, PayPal
              conversion fees, and accounting complications. IsoRender charges in
              GBP with proper UK VAT invoices.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Room recognition
              </strong>{" "}
              — iso3d's AI is trained on international floor plans. It may not
              recognise British room labels like "lounge", "utility", "airing
              cupboard", or "WC". IsoRender's AI is specifically trained on UK
              floor plan conventions and room naming.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Portal-sized output
              </strong>{" "}
              — IsoRender outputs at 900×900px, specifically sized for Rightmove
              and Zoopla floor plan image slots. iso3d's output may need
              resizing or cropping to fit UK portal requirements.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Unlimited plan
              </strong>{" "}
              — IsoRender offers an Agency plan at £49/month for unlimited
              renders. iso3d charges per render with no unlimited option. For
              agencies processing more than 7 renders per month, IsoRender's
              Agency plan is more cost-effective.
            </span>
          </li>
        </ul>

        {/* When to Choose iso3d */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          When iso3d Might Be a Better Fit
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To be fair, there are scenarios where iso3d may suit your needs:
        </p>
        <ul className="space-y-2 mb-8">
          <li className="flex gap-3 text-muted-foreground">
            <Minus className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>
              You operate outside the UK and do not need Rightmove/Zoopla
              integration or GBP pricing.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <Minus className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>
              You prefer iso3d's specific visual style over IsoRender's
              architectural aesthetic.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <Minus className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>
              You have an existing iso3d workflow integrated into your process
              and the switching cost is a concern.
            </span>
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For UK-based estate agents, letting agents, architects, and property
          developers, IsoRender is the purpose-built choice. The portal
          integration alone saves meaningful time on every listing.
        </p>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Try IsoRender free — compare for yourself
          </h2>
          <p className="text-muted-foreground mb-4">
            Your first render is free. Upload the same floor plan you have used
            with iso3d and compare the output side by side.
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
