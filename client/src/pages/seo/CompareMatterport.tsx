import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

export default function CompareMatterport() {
  const faqs = [
    {
      question: "Is IsoRender a replacement for Matterport?",
      answer:
        "No — they serve different purposes. Matterport produces photorealistic 3D virtual tours by scanning a physical property with a camera. IsoRender produces isometric 3D floor plan renders from a 2D drawing. Many agents use both: Matterport for immersive virtual walkthroughs and IsoRender for clear, quick-to-produce floor plan visualisations.",
    },
    {
      question: "Why would I use IsoRender instead of Matterport?",
      answer:
        "IsoRender is faster (under 60 seconds vs 2-3 hours for Matterport capture and processing), cheaper (from £7 vs Matterport subscriptions starting at $11.99/month plus camera costs), and works for off-plan properties (which cannot be scanned because they do not physically exist yet). Choose IsoRender when you need a floor plan visualisation, not a virtual tour.",
    },
    {
      question: "Does Matterport produce floor plans?",
      answer:
        "Matterport generates a basic 2D floor plan (schematic view) from its 3D scan data. This is a useful byproduct of the scan but is not an isometric 3D render. The Matterport floor plan is functional but visually plain — IsoRender produces a stylised, furnishing-aware isometric visualisation designed for marketing purposes.",
    },
    {
      question: "Can I use a Matterport floor plan as input for IsoRender?",
      answer:
        "Yes. Export the Matterport-generated 2D floor plan as an image and upload it to IsoRender. This gives you both a virtual tour (from Matterport) and a polished isometric floor plan render (from IsoRender) — combining the strengths of both tools.",
    },
    {
      question: "Which is better for property marketing?",
      answer:
        "It depends on your budget and goals. For comprehensive property marketing, use both: Matterport for immersive virtual tours and IsoRender for clear floor plan visualisations. If budget is a constraint, IsoRender provides the higher-impact single addition to your listing at a fraction of the cost.",
    },
  ];

  const relatedPages = [
    {
      title: "IsoRender vs iso3d",
      href: "/compare/isorender-vs-iso3d",
      description:
        "Compare IsoRender with another isometric floor plan tool.",
    },
    {
      title: "Isometric 3D Floor Plans",
      href: "/isometric-3d-floor-plans",
      description:
        "What isometric 3D floor plans are and how they benefit property marketing.",
    },
    {
      title: "3D Floor Plans for Estate Agents",
      href: "/3d-floor-plans-for-estate-agents",
      description:
        "How estate agents use floor plan renders to enhance listings.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Full pricing and service details for IsoRender.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "IsoRender vs Matterport — Different Approaches to Property Visualisation",
    description:
      "Comparing IsoRender (AI-powered isometric floor plan rendering) with Matterport (3D camera scanning). Cost, speed, use cases, and when to use each tool.",
    url: "https://isorender.com/compare/isorender-vs-matterport",
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
      title="IsoRender vs Matterport — Different Approaches to Property Visualisation"
      metaDescription="Comparing IsoRender and Matterport for property marketing. AI-powered floor plan rendering vs 3D camera scanning — cost, speed, use cases, and which to choose."
      breadcrumbs={[
        { label: "Compare", href: "/compare/isorender-vs-matterport" },
        { label: "IsoRender vs Matterport" },
      ]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          IsoRender vs Matterport
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Searching for a Matterport alternative for floor plan visualisation?
          IsoRender and Matterport solve different problems in property
          marketing. Matterport creates photorealistic 3D virtual tours using
          physical camera scans. IsoRender creates isometric 3D floor plan
          renders from 2D drawings using AI. This comparison helps you
          understand when to use each tool — and when to use both.
        </p>

        {/* Different Approaches */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Two Fundamentally Different Approaches
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border-2 border-primary rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3">IsoRender</h3>
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              AI-powered isometric floor plan rendering
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Works from 2D floor plan images
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                No physical property visit needed
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Works for off-plan properties
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Completed in under 60 seconds
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                From £7 per render
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                No hardware required
              </li>
            </ul>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3">Matterport</h3>
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              3D camera scanning and virtual tours
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Captures existing physical spaces
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Photorealistic virtual walkthrough
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Immersive dollhouse view
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                2–3 hours per property (capture + processing)
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                From $11.99/month + camera (~£3,000)
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Requires Matterport camera or compatible device
              </li>
            </ul>
          </div>
        </div>

        {/* Cost Comparison */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Cost Comparison
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The cost difference between these tools is substantial, particularly
          when you factor in hardware, time, and subscription fees.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Cost item</th>
                <th className="text-left p-3 font-semibold">IsoRender</th>
                <th className="text-left p-3 font-semibold">Matterport</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Hardware</td>
                <td className="p-3 text-primary font-medium">£0</td>
                <td className="p-3 text-muted-foreground">
                  £2,500–£3,500 (Pro2 camera)
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Monthly subscription</td>
                <td className="p-3 text-primary font-medium">
                  £0–£49/month
                </td>
                <td className="p-3 text-muted-foreground">
                  From ~£10/month (Starter)
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Per property cost</td>
                <td className="p-3 text-primary font-medium">
                  £0–£7
                </td>
                <td className="p-3 text-muted-foreground">
                  £0 (included in sub) + time cost
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Time per property</td>
                <td className="p-3 text-primary font-medium">
                  Under 60 seconds
                </td>
                <td className="p-3 text-muted-foreground">
                  2–3 hours (travel + scan + upload)
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Works for off-plan</td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
                <td className="p-3">
                  <X className="w-4 h-4 text-muted-foreground/40" />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">
                  Year 1 cost (20 properties/month)
                </td>
                <td className="p-3 text-primary font-medium">
                  £588 (Agency plan)
                </td>
                <td className="p-3 text-muted-foreground">
                  ~£3,500+ (camera + subscription + time)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Use Cases */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          When to Use Each Tool
        </h2>

        <div className="space-y-6 mb-8">
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2 text-primary">
              Use IsoRender when you need…
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                A floor plan visualisation — not a virtual tour
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Speed — renders in seconds rather than hours
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Off-plan marketing for properties not yet built
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Low-cost per-property output with no hardware investment
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Integration with Rightmove and Zoopla listing URLs
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Consistent style across a portfolio or development scheme
              </li>
            </ul>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">
              Use Matterport when you need…
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                A full 3D virtual tour of an existing property
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Photorealistic room-by-room walkthroughs
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Accurate measurement data from the scan
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Premium listings where immersive content justifies the investment
              </li>
            </ul>
          </div>
          <div className="border-2 border-primary/30 rounded-lg p-5 bg-primary/5">
            <h3 className="font-semibold mb-2">
              Use both for the best results
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The most effective property marketing combines both tools: a
              Matterport virtual tour for immersive exploration and an IsoRender
              isometric floor plan for clear layout understanding. The floor plan
              helps buyers navigate the virtual tour and provides a summary view
              they can refer back to. Together, they create the most
              comprehensive online property experience possible.
            </p>
          </div>
        </div>

        {/* Matterport Floor Plans vs IsoRender */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Matterport's Built-In Floor Plans vs IsoRender
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Matterport does generate a basic 2D floor plan (schematic view) as
          part of its scan processing. This is a useful feature, but it is
          fundamentally different from an isometric 3D render:
        </p>
        <ul className="space-y-3 mb-8">
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              Matterport's floor plan is a <strong className="text-foreground">flat, functional schematic</strong> — black
              lines showing room outlines and dimensions. It is informative but
              visually plain.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              IsoRender produces a <strong className="text-foreground">styled, three-dimensional visualisation</strong>{" "}
              with walls, furniture, textures, and lighting. It is designed for
              marketing impact.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              You can <strong className="text-foreground">export the Matterport floor plan and upload it to IsoRender</strong>{" "}
              to get the best of both worlds — Matterport's spatial accuracy
              combined with IsoRender's visual quality.
            </span>
          </li>
        </ul>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Add isometric floor plans to your marketing
          </h2>
          <p className="text-muted-foreground mb-4">
            Whether you use Matterport or not, isometric floor plans enhance
            every listing. Try your first render free.
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
