import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  PenTool,
  MessageSquare,
  FileText,
  Ruler,
} from "lucide-react";

export default function Architects() {
  const faqs = [
    {
      question:
        "Is IsoRender accurate enough for architectural presentations?",
      answer:
        "IsoRender produces proportionally accurate isometric renders based on the input floor plan. Room sizes, wall positions, and spatial relationships are preserved from the original drawing. However, it is a visualisation tool for communication, not a measured survey output. Architects typically use it alongside scaled technical drawings.",
    },
    {
      question: "Can I upload floor plans from AutoCAD or Revit?",
      answer:
        "IsoRender accepts image files (JPG, PNG) and PDF. Export your CAD drawing as a high-resolution image or PDF and upload it to the generator. The AI analyses the exported image rather than the CAD file directly, so any drawing style is supported.",
    },
    {
      question:
        "How do isometric renders help with planning applications?",
      answer:
        "While isometric renders are not a statutory requirement for planning applications, they can significantly improve how lay planners and committee members understand your proposal. Including an isometric visualisation alongside standard plans and elevations helps non-technical stakeholders visualise the finished space.",
    },
    {
      question:
        "Can I use the renders for client-facing design proposals?",
      answer:
        "Yes. This is one of the most common use cases for architects. Include isometric renders in design proposals, feasibility studies, and concept presentations. They communicate spatial concepts to clients who may struggle to interpret standard plan and section drawings.",
    },
    {
      question:
        "Does IsoRender handle non-standard room shapes?",
      answer:
        "IsoRender handles most residential floor plan configurations including L-shaped rooms, open-plan kitchen-diners, bay windows, angled walls, and curved elements. Highly complex commercial or industrial layouts may require manual adjustment, but standard residential and small commercial plans are well supported.",
    },
  ];

  const relatedPages = [
    {
      title: "3D Floor Plans for Property Developers",
      href: "/3d-floor-plans-property-developers",
      description:
        "How developers use IsoRender for off-plan sales and marketing suites.",
    },
    {
      title: "Isometric Floorplan Rendering",
      href: "/isometric-floorplan-rendering",
      description:
        "Technical deep-dive on rendering styles, customisation, and output specifications.",
    },
    {
      title: "Isometric 3D Floor Plans",
      href: "/isometric-3d-floor-plans",
      description:
        "Complete guide to isometric 3D floor plans and their role in property marketing.",
    },
    {
      title: "IsoRender vs Matterport",
      href: "/compare/isorender-vs-matterport",
      description:
        "How AI-powered rendering compares with 3D scanning for architectural visualisation.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "3D Floor Plans for Architects — Client Presentations & Design Communication | IsoRender",
    description:
      "AI-powered isometric 3D floor plans for architects. Improve client presentations, support planning applications, and communicate design intent clearly. From £7 per render.",
    url: "https://isorender.com/3d-floor-plans-architects",
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
      title="3D Floor Plans for Architects — Client Presentations & Design Communication"
      metaDescription="Isometric 3D floor plans for architects. Improve client presentations, communicate design intent, and support planning discussions. AI-powered, from £7 per render."
      breadcrumbs={[{ label: "For Architects" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          3D Floor Plans for Architects
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Architects spend years learning to read floor plans, sections, and
          elevations. Clients have not. The gap between architectural drawing
          conventions and client spatial understanding is the source of
          countless misunderstandings during design development. A 3D floor plan
          for architects bridges this gap — translating technical isometric
          architecture drawings into visualisations that clients, planners, and
          contractors can immediately comprehend.
        </p>

        {/* The Communication Problem */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          The Communication Problem
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Every architect has experienced the moment: you present a carefully
          developed floor plan to a client, and they nod along — only to
          express surprise when they see the built result. "I didn't realise the
          kitchen was that small." "I thought the hallway was wider." "I
          imagined the staircase being somewhere else."
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This is not a client problem. It is a communication format problem.
          Plan and section drawings encode spatial information in a way that
          requires training to decode. Clients — whether they are homeowners
          commissioning an extension, developers reviewing scheme layouts, or
          local planning committee members assessing an application — process
          visual information differently.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Isometric 3D floor plans present the same spatial information in a
          format that any viewer can interpret: rooms with visible walls,
          doorways with clear connections, and proportions that read correctly
          at a glance.
        </p>

        {/* Client Presentations */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Client Presentations
        </h2>
        <div className="flex gap-4 mb-6">
          <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Include isometric renders alongside your technical drawings in
              client presentations. The floor plan communicates precise
              dimensions and regulatory compliance. The isometric render
              communicates spatial experience and livability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This dual-format approach reduces design revision cycles. When
              clients can genuinely understand the proposed layout at the concept
              stage, they provide more meaningful feedback earlier in the
              process. Fewer surprises at RIBA Stage 4 means fewer costly
              changes during construction.
            </p>
          </div>
        </div>

        <div className="bg-muted/40 border border-border rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-3">
            Where isometric renders add value in the design process
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                stage: "RIBA Stage 2 — Concept Design",
                desc: "Present spatial concepts to clients before committing to detailed design. Show how rooms relate to each other and to external spaces.",
              },
              {
                stage: "RIBA Stage 3 — Spatial Coordination",
                desc: "Communicate refined layouts to clients and consultants. Use renders to discuss furniture placement and circulation routes.",
              },
              {
                stage: "Feasibility studies",
                desc: "Show clients or developers how a site could be configured before investing in full design work. Quick renders support go/no-go decisions.",
              },
              {
                stage: "Design options comparison",
                desc: "Present two or three layout options as isometric renders. Clients can compare them side by side without interpreting technical drawings.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h4 className="font-semibold text-sm mb-1">{item.stage}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Applications */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Planning Applications
        </h2>
        <div className="flex gap-4 mb-6">
          <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Planning committees are composed of elected councillors, most of
              whom have no architectural training. They review proposals based
              on written reports and the drawings submitted with the
              application. Standard floor plans and elevations are often
              insufficient for these decision-makers to grasp the spatial
              implications of a proposal.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Including isometric renders as supplementary material — in the
              Design and Access Statement or as additional visualisation
              documents — helps committee members understand what you are
              proposing. This is particularly valuable for:
            </p>
          </div>
        </div>

        <ul className="space-y-2 mb-8 ml-10">
          {[
            "Extensions and loft conversions where internal layout is affected",
            "Change of use applications where spatial configuration matters",
            "New-build proposals on sensitive sites where massing is a concern",
            "Basement developments where the below-ground layout is hard to visualise from plans alone",
            "Conversions of listed buildings where understanding the internal spatial impact is critical",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Design Communication */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Design Communication with Contractors
        </h2>
        <div className="flex gap-4 mb-6">
          <Ruler className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Isometric renders are not a substitute for construction drawings.
              But they serve a useful role in pre-construction communication —
              helping contractors, quantity surveyors, and project managers
              quickly understand the design intent before diving into the
              technical documentation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is especially helpful for smaller practices working with
              builders who may not routinely work from full RIBA work stage
              documentation. A quick isometric render of the proposed layout
              anchors the conversation and reduces ambiguity.
            </p>
          </div>
        </div>

        {/* Practical Integration */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          How Architects Use IsoRender
        </h2>
        <div className="space-y-4 mb-8">
          {[
            {
              icon: PenTool,
              title: "Export from CAD as image",
              desc: "Save your floor plan from AutoCAD, Revit, ArchiCAD, or Vectorworks as a high-resolution PNG or PDF. Clean backgrounds and clear line weights produce the best results.",
            },
            {
              icon: MessageSquare,
              title: "Upload and render",
              desc: "Upload the exported image to IsoRender. The AI analyses the layout and produces an isometric render in under 60 seconds. Choose the unfurnished style for architectural presentations or a furnished style for client-facing materials.",
            },
            {
              icon: FileText,
              title: "Include in deliverables",
              desc: "Add the render to your InDesign presentation layout, design report, or planning submission. SVG export (Pro and Agency) integrates cleanly with professional publishing workflows.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Note */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Pricing for Architectural Practices
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Most architectural practices find the Pro plan (£7/render) sufficient.
          For practices handling multiple projects simultaneously or producing
          renders regularly for ongoing developer clients, the Agency plan
          (£49/month unlimited) offers better value.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Compare this with commissioning 3D visualisations from a rendering
          studio (typically £300–£800 per view) or spending 2–4 hours producing
          isometric drawings manually in SketchUp or Illustrator. IsoRender
          recovers its cost in time savings alone within the first use.
        </p>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Create an isometric render from your floor plan
          </h2>
          <p className="text-muted-foreground mb-4">
            Export a floor plan from your CAD software and upload it. Your first
            render is free — see the quality before committing.
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
