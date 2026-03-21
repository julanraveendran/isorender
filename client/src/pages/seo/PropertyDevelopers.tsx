import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  FileText,
  Presentation,
  Users,
} from "lucide-react";

export default function PropertyDevelopers() {
  const faqs = [
    {
      question:
        "Can IsoRender create 3D floor plans for properties that haven't been built yet?",
      answer:
        "Yes. IsoRender works from 2D floor plan drawings — whether those are for existing properties or off-plan developments. Upload the architect's floor plan for a unit that exists only on paper, and IsoRender will produce an isometric 3D render. This is how most developers use the tool: creating marketing visuals before construction begins.",
    },
    {
      question: "Is there bulk pricing for large developments?",
      answer:
        "The Agency plan at £49/month includes unlimited renders, making it cost-effective for developments with dozens or hundreds of unit types. For developments exceeding 200 unit types or requiring API integration with marketing platforms, contact us for a custom enterprise agreement.",
    },
    {
      question:
        "Can I use IsoRender renders in printed brochures and marketing suites?",
      answer:
        "Yes. Pro and Agency plans include SVG vector export, which scales to any print size without quality loss. The renders are suitable for A4 brochures, A3 display boards, and large-format marketing suite panels. Many developers use them as hero visuals in sales particulars.",
    },
    {
      question: "How does IsoRender handle different unit types in a development?",
      answer:
        "Upload a separate floor plan for each unit type (e.g., Type A one-bed, Type B two-bed, Type C three-bed). Each renders independently. For a typical new-build scheme with 5–10 unit types, the entire set of renders can be completed in under 10 minutes.",
    },
    {
      question:
        "Do you support commercial property floor plans?",
      answer:
        "IsoRender is optimised for residential property, which is where the furniture library and room recognition are focused. Commercial floor plans (offices, retail units) can be rendered using the unfurnished style, which shows spatial proportions without residential furniture. Full commercial property support is on our roadmap.",
    },
  ];

  const relatedPages = [
    {
      title: "3D Floor Plans for Architects",
      href: "/3d-floor-plans-architects",
      description:
        "How architects use IsoRender for client presentations and design communication.",
    },
    {
      title: "3D Floor Plans for Estate Agents",
      href: "/3d-floor-plans-for-estate-agents",
      description:
        "Estate agent use cases — portal listings, market appraisals, and ROI.",
    },
    {
      title: "Isometric Floorplan Rendering",
      href: "/isometric-floorplan-rendering",
      description:
        "Technical deep-dive on the rendering process, styles, and customisation.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Full UK pricing breakdown including bulk and enterprise options.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "3D Floor Plans for Property Developers — Off-Plan Marketing | IsoRender",
    description:
      "Create 3D floor plans for off-plan property developments. Brochure-ready isometric renders from architect drawings. Bulk pricing from £49/month unlimited.",
    url: "https://isorender.com/#/3d-floor-plans-property-developers",
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
      title="3D Floor Plans for Property Developers — Off-Plan Marketing"
      metaDescription="Create 3D floor plans for off-plan developments. Brochure-ready isometric renders from architect drawings. Unlimited renders from £49/month. UK-focused."
      breadcrumbs={[{ label: "For Property Developers" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          3D Floor Plans for Property Developers
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Selling off-plan requires buyers to visualise a property that does not
          yet exist. A 3D floor plan for property developers bridges this gap —
          transforming architect's drawings into vivid isometric renders that
          communicate layout, scale, and livability. IsoRender generates these
          off-plan 3D floor plans from any 2D floor plan in under a minute,
          with output ready for brochures, marketing suites, and investor
          presentations.
        </p>

        <div className="bg-muted/40 border border-border rounded-lg p-6 mb-10">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">The off-plan challenge:</strong>{" "}
            Research from the Home Builders Federation indicates that buyer
            confidence in off-plan purchases correlates directly with the
            quality of marketing materials. Properties marketed with clear,
            professional floor plan visualisations achieve higher reservation
            rates and fewer post-reservation withdrawals.
          </p>
        </div>

        {/* Off-Plan Sales */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Off-Plan Sales and Marketing
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          For new-build developments — whether a 10-unit infill scheme or a
          500-home estate — the marketing challenge is consistent: how do you
          sell something a buyer cannot walk through? Traditional approaches
          rely on CGI visualisations, show homes, and specification sheets.
          These are effective but expensive and slow to produce.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Isometric 3D floor plans fill a specific gap in this marketing
          toolkit. They are not a replacement for full CGI interior renders or
          show home dressing, but they provide a spatial understanding that
          photography cannot (because the property does not exist yet) and that
          2D plans fail to communicate to non-technical buyers.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          At £49/month for unlimited renders, IsoRender is a fraction of the
          cost of commissioning individual CGI visualisations. A typical CGI
          studio charges £500–£1,500 per room render. IsoRender produces a
          complete isometric floor plan visualisation for every unit type in
          your scheme within minutes.
        </p>

        {/* Key Use Cases */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Key Use Cases for Developers
        </h2>

        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Sales brochures</h3>
              <p className="text-muted-foreground leading-relaxed">
                Isometric renders are the centrepiece of effective sales
                particulars. Include them alongside specification details, site
                plans, and pricing schedules. The SVG export (Pro and Agency
                plans) ensures print-quality output for A4 brochures, A3 fold-
                outs, and large-format display boards. Each unit type gets its
                own render — show buyers exactly what their specific plot
                looks like.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Presentation className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Marketing suites</h3>
              <p className="text-muted-foreground leading-relaxed">
                Display large-format isometric renders on walls and digital
                screens in the marketing suite. When a buyer sits down with your
                sales team, the floor plan render anchors the conversation about
                layout, room sizes, and lifestyle. It is more immediate than a
                site plan and more spatially informative than a CGI room render
                that shows only one angle.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Investor presentations</h3>
              <p className="text-muted-foreground leading-relaxed">
                For build-to-rent schemes and investor-facing developments,
                isometric renders communicate unit layout efficiency quickly.
                Show investors how a two-bedroom flat maximises lettable area or
                how a development's mix of unit types caters to different
                tenant demographics. The consistent visual style across all
                unit types makes comparative assessment straightforward.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Portal pre-marketing</h3>
              <p className="text-muted-foreground leading-relaxed">
                List your development on Rightmove New Homes and Zoopla New
                Homes with polished floor plan renders before the show home is
                ready. Early enquiries build a reservation list and generate
                momentum. IsoRender's 900×900px PNG output meets all portal
                specifications.
              </p>
            </div>
          </div>
        </div>

        {/* Development Workflow */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Workflow for Development Schemes
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A typical new-build development has 3–12 distinct unit types. Here is
          how IsoRender fits into the marketing production process:
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              step: "1",
              title: "Collect architect floor plans",
              desc: "Gather the 2D floor plan for each unit type from your architect. These can be in any format — PDF, DWG exported as image, or scanned drawing.",
            },
            {
              step: "2",
              title: "Upload to IsoRender",
              desc: "Upload each floor plan to the generator. For a scheme with 8 unit types, this takes approximately 8 minutes total.",
            },
            {
              step: "3",
              title: "Select consistent styling",
              desc: "Choose a single style preset for the entire development to maintain visual consistency across all marketing materials.",
            },
            {
              step: "4",
              title: "Export for print and digital",
              desc: "Download PNG files for portal listings and digital marketing. Export SVG vectors for brochures, marketing suite displays, and printed materials.",
            },
            {
              step: "5",
              title: "Integrate with marketing collateral",
              desc: "Send renders to your design agency for inclusion in brochures, or upload directly to portals and website. The files are ready to use without additional editing.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing for Developers */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Pricing for Developers
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Most developers choose the Agency plan for its unlimited render
          allowance. Here is how the plans compare for typical development
          marketing needs:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Scenario</th>
                <th className="text-left p-3 font-semibold">Pro (£7/render)</th>
                <th className="text-left p-3 font-semibold">Agency (£49/month)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">5 unit types</td>
                <td className="p-3 text-muted-foreground">£35</td>
                <td className="p-3 text-muted-foreground">£49 (unlimited revisions)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">12 unit types</td>
                <td className="p-3 text-muted-foreground">£84</td>
                <td className="p-3 text-muted-foreground">£49 (unlimited revisions)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Multiple schemes per month</td>
                <td className="p-3 text-muted-foreground">Variable</td>
                <td className="p-3 text-primary font-medium">£49 (always unlimited)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Includes SVG for print</td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">API access</td>
                <td className="p-3 text-muted-foreground">—</td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Property Types */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Works for All Development Types
        </h2>
        <ul className="space-y-2 mb-8">
          {[
            "Apartment blocks and flatted developments",
            "Housing estates — detached, semi-detached, and terraced",
            "Barn and warehouse conversions",
            "Build-to-rent schemes",
            "Retirement living and assisted living developments",
            "Mixed-use developments (residential units)",
            "Student accommodation",
            "Luxury and bespoke housing",
          ].map((type, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
              <span>{type}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Create renders for your next development
          </h2>
          <p className="text-muted-foreground mb-4">
            Upload an architect's floor plan and see the isometric render in
            under a minute. Your first render is free.
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
