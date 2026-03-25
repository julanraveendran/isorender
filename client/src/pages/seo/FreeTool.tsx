import SEOLayout from "@/components/SEOLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  CreditCard,
  Clock,
  Sparkles,
} from "lucide-react";

export default function FreeTool() {
  const faqs = [
    {
      question: "Is the free floor plan tool really free?",
      answer:
        "Yes. The free tier gives you one render per month at full quality — 900×900px PNG, the same output resolution as the paid plans. There is no credit card required to sign up. No trial period. No watermarks. The free render is genuinely free.",
    },
    {
      question: "What is included in the free tier?",
      answer:
        "One render per month, 900×900px PNG output, Rightmove/Zoopla URL import, and access to the standard style preset. The free render is processed through the same AI pipeline as paid renders — the output quality is identical.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "You can use IsoRender without creating an account for your first render. To track your monthly free allowance and access previous renders, creating an account is recommended but not mandatory for trying the tool.",
    },
    {
      question: "What happens after I use my free render for the month?",
      answer:
        "You can wait for your free render to reset at the start of the next calendar month, or upgrade to Pro (£7/render) or Agency (£49/month unlimited) for immediate access to additional renders. There is no pressure to upgrade — the free tier remains available indefinitely.",
    },
    {
      question: "Can I use the free render for a commercial listing?",
      answer:
        "Yes. There are no restrictions on how you use your free render. You can upload it to Rightmove, include it in a property brochure, or use it in any other commercial context. The output is yours to use as you wish.",
    },
  ];

  const relatedPages = [
    {
      title: "Isometric Floor Plan Generator",
      href: "/isometric-floor-plan-generator",
      description:
        "Full guide to the IsoRender generator — how it works and what to expect.",
    },
    {
      title: "Floor Plan Rendering UK",
      href: "/floor-plan-rendering-uk",
      description:
        "Complete pricing details for Free, Pro, and Agency plans.",
    },
    {
      title: "3D Floor Plans for Estate Agents",
      href: "/3d-floor-plans-for-estate-agents",
      description:
        "How estate agents use IsoRender to improve their listing marketing.",
    },
    {
      title: "3D Floor Plans for Rightmove & Zoopla",
      href: "/3d-floor-plans-rightmove-zoopla",
      description:
        "Portal integration — paste a listing URL and get a 3D render.",
    },
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IsoRender — Free Floor Plan Tool",
    description:
      "Free isometric 3D floor plan generator. One render per month, no credit card required. Upload a 2D floor plan or paste a Rightmove/Zoopla URL.",
    url: "https://isorender.com/free-floor-plan-tool",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      description: "Free tier — 1 render per month, no credit card required",
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
      title="Free Floor Plan Tool — Isometric 3D Renders at No Cost"
      metaDescription="Free property floor plan generator. Create one isometric 3D floor plan per month at no cost. No credit card, no watermarks, full quality output. Try IsoRender today."
      breadcrumbs={[{ label: "Free Floor Plan Tool" }]}
      faqs={faqs}
      relatedPages={relatedPages}
      schemaMarkup={schemaMarkup}
    >
      <article className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
          Free Floor Plan Tool
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          IsoRender's free property floor plan generator gives you one isometric
          3D render per month — at full quality, with no credit card required
          and no watermarks. Upload a 2D floor plan or paste a Rightmove/Zoopla
          listing URL. The free floor plan tool uses the same AI pipeline as
          the paid plans. There is no catch, no trial period, and no degraded
          output.
        </p>

        {/* What You Get Free */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">What you get for free</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Sparkles,
                title: "1 render per month",
                desc: "Full-quality isometric 3D floor plan render. Resets on the 1st of each month.",
              },
              {
                icon: CreditCard,
                title: "No credit card",
                desc: "No payment information required. Sign up with an email address and start immediately.",
              },
              {
                icon: Clock,
                title: "Same speed",
                desc: "Free renders are processed by the same AI as paid renders. Typical turnaround: 30–90 seconds.",
              },
              {
                icon: CheckCircle2,
                title: "Full resolution",
                desc: "900×900px PNG output — identical to Pro and Agency renders. Portal-ready for Rightmove and Zoopla.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          How to Use the Free Tool
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The free floor plan tool works exactly like the paid version. There is
          no separate "lite" interface or reduced feature set.
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              step: "1",
              title: "Go to the generator",
              desc: "Open the IsoRender generator page. No account needed for your first render.",
            },
            {
              step: "2",
              title: "Upload a floor plan or paste a URL",
              desc: "Drag and drop a 2D floor plan image (JPG, PNG, PDF) or paste a Rightmove/Zoopla listing URL. Both input methods work on the free tier.",
            },
            {
              step: "3",
              title: "Wait for the AI to process",
              desc: "The AI analyses the floor plan, identifies rooms, and generates an isometric 3D render. This takes 30–90 seconds on the free tier.",
            },
            {
              step: "4",
              title: "Download your render",
              desc: "Download the 900×900px PNG file. Use it in Rightmove and Zoopla listings, property brochures, social media, or presentations.",
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

        {/* Free vs Pro vs Agency */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Free vs Pro vs Agency
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The free tier is a genuine, usable product — not a crippled demo.
          Here is how it compares with the paid plans:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-left p-3 font-semibold">Free</th>
                <th className="text-left p-3 font-semibold">Pro (£7)</th>
                <th className="text-left p-3 font-semibold">Agency (£49)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Renders per month</td>
                <td className="p-3 text-muted-foreground">1</td>
                <td className="p-3 text-muted-foreground">Pay-as-you-go</td>
                <td className="p-3 text-muted-foreground">Unlimited</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Output quality</td>
                <td className="p-3 text-muted-foreground">900×900px PNG</td>
                <td className="p-3 text-muted-foreground">900×900px PNG + SVG</td>
                <td className="p-3 text-muted-foreground">900×900px PNG + SVG</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Portal URL import</td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Style presets</td>
                <td className="p-3 text-muted-foreground">1 (Modern)</td>
                <td className="p-3 text-muted-foreground">4 styles</td>
                <td className="p-3 text-muted-foreground">4 styles + custom</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Processing speed</td>
                <td className="p-3 text-muted-foreground">Standard queue</td>
                <td className="p-3 text-muted-foreground">Priority queue</td>
                <td className="p-3 text-muted-foreground">Priority queue</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">SVG vector export</td>
                <td className="p-3 text-muted-foreground">—</td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Brand customisation</td>
                <td className="p-3 text-muted-foreground">—</td>
                <td className="p-3 text-muted-foreground">—</td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">API access</td>
                <td className="p-3 text-muted-foreground">—</td>
                <td className="p-3 text-muted-foreground">—</td>
                <td className="p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Who Is the Free Tier For */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Who Is the Free Tier For?
        </h2>
        <div className="space-y-4 mb-8">
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">
              Estate agents evaluating the tool
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Try IsoRender with a real floor plan from your current listings.
              See the output quality and decide whether it fits your marketing
              workflow before spending anything. Most agents upgrade after their
              first render — but there is no pressure to do so.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">
              Independent agents with low volume
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you list one property per month, the free tier may be all you
              need. You get one full-quality render per month at no cost. When
              your volume increases, upgrading is straightforward.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">
              Architects and developers testing the concept
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upload one of your floor plans and see how it looks as an
              isometric 3D render. Evaluate whether the output quality meets your
              standards for client presentations or marketing materials before
              committing to a paid plan.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-2">
              Homeowners selling privately
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you are selling your home privately through Rightmove or Zoopla
              (via an online-only agent), a single free 3D floor plan render can
              enhance your listing at no cost. Upload the floor plan provided
              by your measurement service or paste your listing URL.
            </p>
          </div>
        </div>

        {/* The Upgrade Path */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          The Upgrade Path
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When you are ready for more renders, upgrading is instant:
        </p>
        <ul className="space-y-3 mb-8">
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Pro at £7/render</strong> —
              Pay-as-you-go. No subscription. Buy individual renders when you
              need them. Ideal for agents handling 2–6 listings per month.
            </span>
          </li>
          <li className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Agency at £49/month
              </strong>{" "}
              — Unlimited renders, unlimited styles, brand customisation, and
              API access. Cancel any time. Best value for agents handling 7+
              listings per month or developers with multiple unit types.
            </span>
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-6">
          There is no lock-in at any level. Downgrade from Agency to Pro, or
          return to the free tier, whenever you choose. Your existing renders
          remain accessible regardless of plan changes.
        </p>

        {/* No Risk */}
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
          Zero Risk to Try
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The free tier exists because we are confident in the quality of
          IsoRender's output. We believe that once you see your first isometric
          render, you will understand the value it adds to property marketing.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          No credit card on file. No automatic upgrades. No "free trial" that
          quietly converts to a paid subscription. Just one free render per
          month, for as long as you want it.
        </p>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Create your free floor plan render
          </h2>
          <p className="text-muted-foreground mb-4">
            Upload a 2D floor plan or paste a Rightmove/Zoopla URL. No credit
            card, no strings attached.
          </p>
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              Start Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </article>
    </SEOLayout>
  );
}
