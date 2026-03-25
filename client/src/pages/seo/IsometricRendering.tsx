import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Palette,
  SlidersHorizontal,
  Box,
} from "lucide-react";

export default function IsometricRendering() {
  const faqs = [
    {
      question: "What is the difference between isometric and perspective rendering?",
      answer:
        "Isometric rendering uses a fixed 30-degree projection angle with parallel lines — objects do not get smaller with distance. Perspective rendering simulates how the human eye sees, with vanishing points and foreshortening. Isometric is preferred for floor plans because it maintains consistent scale across the entire image, making room sizes directly comparable.",
    },
    {
      question: "Can I control the angle of the isometric view?",
      answer:
        "IsoRender uses a standard isometric projection (approximately 30 degrees) which is the industry convention for architectural and property visualisations. This angle provides the clearest view of room layouts while showing wall height and furniture placement. Custom angles are available on the Agency plan for specific use cases.",
    },
    {
      question: "What rendering styles are available?",
      answer:
        "IsoRender offers four core style presets: Modern Minimalist (clean lines, neutral colours, contemporary furniture), Scandi (light oak, soft pastels, hygge aesthetic), Traditional (warmer tones, classic furniture pieces), and Unfurnished (empty rooms showing spatial proportions and natural light). Pro and Agency plans unlock all styles plus colour palette adjustments.",
    },
    {
      question: "How detailed is the furniture in the renders?",
      answer:
        "Furniture is rendered at a level appropriate for property marketing — recognisable and proportionally accurate without being photorealistic. A kitchen shows worktops, appliances, and cabinetry. A bedroom shows a bed, wardrobe, and bedside tables. The goal is spatial communication, not interior design specification.",
    },
    {
      question: "Can I render multi-storey properties?",
      answer:
        "Yes. If your floor plan includes multiple levels (ground floor, first floor, etc.), each storey is rendered individually. For listings, you can upload separate renders for each floor. The Agency plan includes an option to render a stacked multi-storey view showing all levels in a single image.",
    },
  ];

  const relatedPages = [
    {
      title: "Isometric 3D Floor Plans",
      href: "/isometric-3d-floor-plans",
      description:
        "Overview of isometric 3D floor plans — what they are and why they matter for property marketing.",
    },
    {
      title: "Isometric Floor Plan Generator",
      href: "/isometric-floor-plan-generator",
      description:
        "Step-by-step guide to using IsoRender's generator tool.",
    },
    {
      title: "3D Floor Plans for Architects",
      href: "/3d-floor-plans-architects",
      description:
        "How architects use isometric renders for client presentations and design communication.",
    },
    {
      title: "IsoRender vs Matterport",
      href: "/compare/isorender-vs-matterport",
      description:
        "Comparing AI-powered isometric rendering with 3D scanning approaches.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Isometric Floorplan Rendering — Process, Styles & Customisation",
    description:
      "Technical guide to isometric floor plan rendering. Covers the AI rendering process, available styles, customisation options, and output specifications.",
    url: "https://isorender.com/isometric-floorplan-rendering",
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
      title="Isometric Floorplan Rendering — Process, Styles & Customisation"
      metaDescription="Technical deep-dive into isometric floorplan rendering. Learn how IsoRender's AI converts 2D plans into 3D isometric renders, with multiple styles and customisation options."
      breadcrumbs={[{ label: "Isometric Floorplan Rendering" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          Isometric Floorplan Rendering
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Isometric floorplan rendering converts two-dimensional architectural
          plans into three-dimensional visualisations using a fixed-angle
          projection. IsoRender automates this process with AI — analysing wall
          positions, room types, and spatial relationships to produce an
          isometric floor plan render in under 60 seconds. This page covers the
          technical process, available rendering styles, and customisation
          options.
        </p>

        {/* The Rendering Process */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          The Rendering Process
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          IsoRender's rendering pipeline has four stages, each handled
          automatically by specialised AI models.
        </p>

        <div className="space-y-6 mb-8">
          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Stage 1: Image analysis</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The input image — whether uploaded directly or extracted from a
              Rightmove/Zoopla listing — is analysed to identify structural
              elements. The AI detects wall segments, door openings, window
              positions, and staircase locations. It also reads room labels to
              determine room types. This analysis is robust enough to handle
              varying floor plan styles: from the minimal black-and-white output
              of Metropix to the more detailed colour plans from architectural
              practices.
            </p>
          </div>

          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Box className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Stage 2: 3D model generation</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Detected walls are extruded to a standard ceiling height (2.4m at
              scale). Doorways and windows are cut into the wall geometry.
              Internal walls, external walls, and party walls are differentiated
              by thickness. The result is a volumetric 3D model of the property
              layout, accurate to the proportions shown in the original floor
              plan.
            </p>
          </div>

          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Stage 3: Furnishing and texturing</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Based on the identified room types, contextually appropriate
              furniture and fixtures are placed. A kitchen receives worktops, a
              hob, sink, and refrigerator. A bedroom receives a bed, wardrobe,
              and bedside tables. A bathroom receives a bath or shower, basin,
              and WC. Textures and materials are applied according to the
              selected style preset — for example, the Scandi style uses light
              oak flooring and soft textiles, while the modern style uses
              polished concrete and clean whites.
            </p>
          </div>

          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Palette className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Stage 4: Isometric projection and output</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The furnished 3D model is projected at a standard isometric angle
              (approximately 30 degrees from horizontal). Soft ambient occlusion
              lighting is applied to give depth and clarity without harsh
              shadows. The final image is rendered at 900×900px and exported as
              a PNG file. Pro and Agency plans also generate an SVG vector
              version for print-quality output.
            </p>
          </div>
        </div>

        {/* Rendering Styles */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Rendering Styles
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          IsoRender offers four core style presets. Each is designed for a
          different marketing context and property character.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Modern Minimalist</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Clean lines, neutral colour palette, contemporary furniture. Best
              suited for new-build flats, refurbished properties, and
              modern-styled homes. Uses white walls, light grey flooring, and
              minimal accessories.
            </p>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded bg-white border border-border" title="White" />
              <div className="w-6 h-6 rounded bg-gray-200" title="Light grey" />
              <div className="w-6 h-6 rounded bg-gray-400" title="Mid grey" />
              <div className="w-6 h-6 rounded bg-slate-700" title="Charcoal" />
            </div>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Scandi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Light woods, soft pastels, textured textiles. Ideal for family
              homes, conversions, and properties marketed to younger buyers.
              Uses pale oak flooring, warm whites, and subtle green accents.
            </p>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded bg-amber-100" title="Cream" />
              <div className="w-6 h-6 rounded bg-amber-200" title="Pale oak" />
              <div className="w-6 h-6 rounded bg-emerald-200" title="Sage green" />
              <div className="w-6 h-6 rounded bg-stone-300" title="Stone" />
            </div>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Traditional</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Warmer tones, classic furniture pieces, rich wood finishes. Suited
              to period properties — Victorian terraces, Edwardian semis, and
              Georgian townhouses. Uses darker wood flooring and warm wall
              colours.
            </p>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded bg-amber-50" title="Warm white" />
              <div className="w-6 h-6 rounded bg-amber-700" title="Dark oak" />
              <div className="w-6 h-6 rounded bg-red-900" title="Burgundy" />
              <div className="w-6 h-6 rounded bg-emerald-800" title="Forest green" />
            </div>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Unfurnished</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Empty rooms showing spatial proportions and natural light. No
              furniture, minimal texturing. Best for architects, developers
              selling to buyers who will furnish themselves, and properties
              requiring renovation.
            </p>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded bg-gray-50 border border-border" title="Off-white" />
              <div className="w-6 h-6 rounded bg-gray-100" title="Light grey" />
              <div className="w-6 h-6 rounded bg-amber-100" title="Warm cream" />
              <div className="w-6 h-6 rounded bg-gray-300" title="Concrete" />
            </div>
          </div>
        </div>

        {/* Customisation Options */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Customisation Options
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Beyond the four core presets, Pro and Agency users have additional
          control over the rendering output.
        </p>

        <ul className="space-y-3 mb-8">
          {[
            {
              title: "Colour palette adjustment",
              desc: "Modify wall colours, flooring tones, and accent colours to match brand guidelines or specific interior themes.",
              plan: "Pro & Agency",
            },
            {
              title: "Furniture toggle",
              desc: "Switch furniture on or off for individual rooms. Show the living area furnished but the bedrooms empty, for example.",
              plan: "Pro & Agency",
            },
            {
              title: "Wall visibility",
              desc: "Remove specific walls to create cutaway views that reveal room interiors more clearly. Particularly useful for complex layouts.",
              plan: "Agency",
            },
            {
              title: "Brand watermark",
              desc: "Add your agency or practice logo as a subtle watermark on the rendered image. Consistent branding across all renders.",
              plan: "Agency",
            },
            {
              title: "Custom camera angle",
              desc: "Adjust the isometric projection angle for non-standard viewing requirements. Most users find the default 30-degree angle optimal.",
              plan: "Agency",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">{item.title}</span>
                <span className="text-xs text-primary ml-2 bg-primary/10 px-2 py-0.5 rounded">
                  {item.plan}
                </span>
                <p className="text-muted-foreground text-sm mt-1">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Output Specifications */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Output Specifications
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Property</th>
                <th className="text-left p-3 font-semibold">PNG (all plans)</th>
                <th className="text-left p-3 font-semibold">SVG (Pro & Agency)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Resolution</td>
                <td className="p-3 text-muted-foreground">900×900px</td>
                <td className="p-3 text-muted-foreground">Vector (scalable)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">File size</td>
                <td className="p-3 text-muted-foreground">200–600KB typical</td>
                <td className="p-3 text-muted-foreground">50–200KB typical</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Colour space</td>
                <td className="p-3 text-muted-foreground">sRGB</td>
                <td className="p-3 text-muted-foreground">sRGB</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Transparency</td>
                <td className="p-3 text-muted-foreground">Optional (white or transparent bg)</td>
                <td className="p-3 text-muted-foreground">Transparent background</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Best for</td>
                <td className="p-3 text-muted-foreground">Web, portals, social</td>
                <td className="p-3 text-muted-foreground">Print, brochures, large format</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Isometric vs Perspective */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Why Isometric Over Perspective?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Perspective renders look more "realistic" — objects shrink with
          distance, creating a natural visual depth. So why choose isometric for
          floor plans?
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The answer is clarity. In a perspective render, a room at the back of
          the property appears smaller than an identically-sized room at the
          front. This creates a misleading impression of relative room sizes.
          Isometric projection maintains consistent scale throughout the image:
          every square metre of floor space occupies the same visual area
          regardless of its position.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For property marketing, where buyers need to accurately compare room
          sizes and understand spatial relationships, isometric projection is
          the more honest and more useful choice. It is also the standard used
          in architectural illustration, technical documentation, and
          professional floor plan rendering worldwide.
        </p>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            See isometric rendering in action
          </h2>
          <p className="text-muted-foreground mb-4">
            Upload any 2D floor plan and watch IsoRender generate a styled
            isometric render in seconds. Free to try.
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
