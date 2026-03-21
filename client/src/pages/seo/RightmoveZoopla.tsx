import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Link2,
  Image,
  FileCheck,
  Monitor,
} from "lucide-react";

export default function RightmoveZoopla() {
  const faqs = [
    {
      question: "Can I import a floor plan directly from a Rightmove listing?",
      answer:
        "Yes. Paste the full Rightmove listing URL into IsoRender. The tool automatically identifies and extracts the 2D floor plan image from the listing page, then converts it into an isometric 3D render. You do not need to download the image separately.",
    },
    {
      question: "Does IsoRender work with Zoopla listings too?",
      answer:
        "Yes. IsoRender supports both Rightmove and Zoopla listing URLs. Paste either URL into the generator and the floor plan will be extracted and rendered automatically. OnTheMarket support is planned for a future release.",
    },
    {
      question:
        "What image size does Rightmove recommend for floor plan uploads?",
      answer:
        "Rightmove recommends floor plan images of at least 800 pixels on the shortest side. IsoRender outputs at 900×900px — comfortably within spec. The square format displays well in Rightmove's floor plan gallery slot without cropping or distortion.",
    },
    {
      question:
        "Will the 3D floor plan replace my existing listing floor plan?",
      answer:
        "That is up to you. Many agents upload the 3D isometric render alongside the original 2D plan, giving buyers both a spatial visualisation and precise dimensions. Others replace the 2D plan entirely. Both approaches are supported by Rightmove and Zoopla.",
    },
    {
      question:
        "Are there any compliance issues with uploading 3D renders to portals?",
      answer:
        "No. Rightmove and Zoopla both accept floor plan images in standard formats (JPG, PNG) uploaded through your estate agent software. IsoRender produces standard PNG files that comply with all portal image requirements. The renders are clearly identifiable as floor plan visualisations, not photographs.",
    },
  ];

  const relatedPages = [
    {
      title: "3D Floor Plans for Estate Agents",
      href: "/3d-floor-plans-for-estate-agents",
      description:
        "Complete guide to using 3D floor plans in your estate agency marketing.",
    },
    {
      title: "Isometric Floor Plan Generator",
      href: "/isometric-floor-plan-generator",
      description:
        "Step-by-step guide to using the IsoRender generator tool.",
    },
    {
      title: "3D Floor Plans for Letting Agents",
      href: "/3d-floor-plans-letting-agents",
      description:
        "How letting agents use isometric renders for rental listings on portals.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Full pricing and service details for the UK market.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create 3D Floor Plans for Rightmove and Zoopla",
    description:
      "Step-by-step guide to creating isometric 3D floor plans from Rightmove and Zoopla listings using IsoRender's AI-powered generator.",
    url: "https://isorender.com/3d-floor-plans-rightmove-zoopla",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy listing URL",
        text: "Copy the full listing URL from Rightmove or Zoopla.",
      },
      {
        "@type": "HowToStep",
        name: "Paste into IsoRender",
        text: "Paste the URL into the IsoRender generator. The floor plan is extracted automatically.",
      },
      {
        "@type": "HowToStep",
        name: "Choose style",
        text: "Select a rendering style preset (modern, Scandi, traditional, or unfurnished).",
      },
      {
        "@type": "HowToStep",
        name: "Download render",
        text: "Download the 900×900px PNG and upload it to your listing.",
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
      title="3D Floor Plans for Rightmove & Zoopla — Portal Integration Guide"
      metaDescription="Create 3D floor plans from Rightmove and Zoopla listing URLs. Paste a link, get a portal-ready isometric render in seconds. 900×900px output, fully compliant."
      breadcrumbs={[{ label: "Rightmove & Zoopla" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          3D Floor Plans for Rightmove & Zoopla
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          IsoRender integrates directly with Rightmove and Zoopla — the two
          dominant property portals in the UK. Paste a listing URL, and
          IsoRender extracts the 2D floor plan and converts it into an isometric
          3D render, sized at 900×900px and ready to upload back to the listing.
          No downloading, no cropping, no resizing. The 3D floor plan for
          Rightmove or Zoopla is ready in under 60 seconds.
        </p>

        {/* URL Paste Workflow */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          The URL Paste Workflow
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This is the fastest way to create 3D floor plans for properties
          already listed on UK property portals.
        </p>

        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                1. Copy the listing URL
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Navigate to the property listing on Rightmove or Zoopla. Copy
                the full URL from your browser's address bar. Both desktop and
                mobile URLs are supported.
              </p>
              <div className="mt-2 bg-muted/40 border border-border rounded px-3 py-2 text-xs font-mono text-muted-foreground break-all">
                https://www.rightmove.co.uk/properties/12345678
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Image className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                2. Paste into IsoRender
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Open the IsoRender generator and paste the URL into the input
                field. IsoRender fetches the listing page, identifies the floor
                plan image, and extracts it automatically. If the listing
                contains multiple floor plans (e.g., ground floor and first
                floor), each is detected and available for rendering.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                3. Render and download
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose a rendering style, wait for the AI to process the layout,
                and download your 900×900px PNG. The entire sequence — from
                pasting the URL to having a finished render — typically takes
                under 60 seconds.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                4. Upload to the listing
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload the rendered PNG to the listing through your estate agent
                software (Reapit, Dezrez, Vebra, Expert Agent, etc.). The image
                appears in the floor plan gallery alongside or instead of the
                original 2D plan.
              </p>
            </div>
          </div>
        </div>

        {/* Image Specifications */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Image Specifications for Property Portals
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Different portals have different image requirements. IsoRender's
          output is designed to meet or exceed all of them.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Specification</th>
                <th className="text-left p-3 font-semibold">
                  Rightmove
                </th>
                <th className="text-left p-3 font-semibold">Zoopla</th>
                <th className="text-left p-3 font-semibold">
                  IsoRender output
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Minimum size</td>
                <td className="p-3 text-muted-foreground">800px shortest side</td>
                <td className="p-3 text-muted-foreground">600px shortest side</td>
                <td className="p-3 text-primary font-medium">900×900px</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Format</td>
                <td className="p-3 text-muted-foreground">JPG or PNG</td>
                <td className="p-3 text-muted-foreground">JPG or PNG</td>
                <td className="p-3 text-primary font-medium">PNG</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Max file size</td>
                <td className="p-3 text-muted-foreground">10MB</td>
                <td className="p-3 text-muted-foreground">10MB</td>
                <td className="p-3 text-primary font-medium">Typically 200–600KB</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Aspect ratio</td>
                <td className="p-3 text-muted-foreground">Flexible</td>
                <td className="p-3 text-muted-foreground">Flexible</td>
                <td className="p-3 text-primary font-medium">1:1 (square)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compliance */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Portal Compliance
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Both Rightmove and Zoopla accept rendered floor plan images alongside
          standard photography. There are no restrictions on using AI-generated
          or digitally rendered floor plans in property listings.
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Floor plan category
              </strong>{" "}
              — Upload to the dedicated floor plan image slot in your listing
              software. This ensures the image displays in the correct section
              of the listing, not amongst the property photographs.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Accuracy obligation
              </strong>{" "}
              — As with any marketing material, floor plans should reasonably
              represent the property layout. IsoRender's AI works from the
              existing 2D plan, so the room positions and relative sizes are
              preserved from the original.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Consumer Protection Regulations 2008
              </strong>{" "}
              — The CPRs require that property marketing is not misleading. 3D
              renders based on accurate floor plans are compliant. It is good
              practice to include a disclaimer noting that furniture is
              indicative.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Material Information guidance
              </strong>{" "}
              — National Trading Standards now requires specific material
              information in listings. Floor plans complement this by providing
              visual context alongside the required data fields.
            </span>
          </li>
        </ul>

        {/* Use Alongside Existing Plans */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Use Alongside or Instead of 2D Plans
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Estate agents approach this differently depending on the property and
          their agency's marketing standards:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Both 2D and 3D</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upload the original 2D plan (which shows precise dimensions) and
              the 3D isometric render (which shows spatial relationships). This
              gives buyers the complete picture — exact measurements plus an
              intuitive visual layout.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">3D only</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Replace the 2D plan entirely with the isometric render. This
              approach works well for properties where the layout is more
              important than exact dimensions — such as flats, open-plan living
              spaces, and converted properties.
            </p>
          </div>
        </div>

        {/* Supported Portals */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Supported Property Portals
        </h2>
        <div className="space-y-3 mb-8">
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Rightmove</span>
              <span className="text-muted-foreground">
                {" "}
                — Full URL import support. Floor plan extraction from standard
                and premium listings.
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Zoopla</span>
              <span className="text-muted-foreground">
                {" "}
                — Full URL import support. Works with both Zoopla and
                PrimeLocation listings (same backend).
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>
            <div>
              <span className="font-semibold">OnTheMarket</span>
              <span className="text-muted-foreground">
                {" "}
                — URL import coming soon. You can still upload floor plan images
                manually.
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Create a 3D floor plan from a listing URL
          </h2>
          <p className="text-muted-foreground mb-4">
            Paste a Rightmove or Zoopla URL and see the isometric render in
            under a minute. Free to try.
          </p>
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              Try It Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </article>
    </SEOLayout>
  );
}
