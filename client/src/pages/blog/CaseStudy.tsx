import { BlogLayout } from "@/components/SEOLayout";
import { Link } from "wouter";

export default function CaseStudy() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How One Estate Agency Reduced Days on Market Using 3D Floor Plans",
    "description": "A detailed case study examining how a mid-sized UK estate agency cut average days on market by 18% after introducing isometric 3D floor plans.",
    "author": { "@type": "Organization", "name": "IsoRender" },
    "publisher": { "@type": "Organization", "name": "IsoRender", "url": "https://isorender.com" },
    "datePublished": "2026-03-07",
    "dateModified": "2026-03-07",
    "mainEntityOfPage": "https://isorender.com/blog/case-study-3d-floor-plans"
  };

  return (
    <BlogLayout
      title="How One Estate Agency Reduced Days on Market Using 3D Floor Plans"
      metaDescription="A detailed case study examining how a mid-sized UK estate agency cut average days on market by 18% after introducing isometric 3D floor plans."
      publishDate="7 March 2026"
      readTime="6 min read"
      category="Case Study"
      schemaMarkup={schemaMarkup}
      faqs={[
        {
          question: "How long does it take to see results from using 3D floor plans?",
          answer: "Most agencies notice a measurable increase in enquiry rates within the first month. The impact on days-on-market takes longer to measure — typically 2–3 months of consistent use — but the early indicators (more clicks, more viewings booked) are visible almost immediately."
        },
        {
          question: "Are these results typical for agencies adopting 3D floor plans?",
          answer: "Results vary depending on market conditions, property types, and how consistently the plans are used. However, the 15–25% increase in enquiry rates and 10–20% reduction in days-on-market is broadly consistent with what we hear from agencies across the UK."
        },
        {
          question: "What was the total cost to this agency of adding 3D floor plans?",
          answer: "On the Agency plan at £49/month for unlimited renders, the total annual cost was £588. Against their average commission income, this represented a payback period of less than one additional sale per year — a threshold they exceeded in the first month."
        }
      ]}
      relatedPages={[
        { title: "The ROI of 3D Floor Plans", href: "/blog/roi-3d-floor-plans", description: "Data from 50 UK agencies on the financial return of 3D floor plans." },
        { title: "3D Floor Plans for Estate Agents", href: "/3d-floor-plans-for-estate-agents", description: "How IsoRender helps estate agents win more instructions." },
        { title: "3D vs 2D Floor Plans", href: "/blog/3d-vs-2d-floor-plan", description: "Which floor plan type converts better?" },
        { title: "How to Get More Rightmove Enquiries", href: "/blog/rightmove-more-enquiries-guide", description: "The complete guide to maximising Rightmove performance." }
      ]}
    >
      <p>
        In September 2025, a three-branch estate agency in the Home Counties began adding isometric 3D floor plans to every sales listing. Six months later, their average days-on-market had dropped by 18%, enquiry volume was up 23%, and their instruction win rate had improved measurably. This is how they did it.
      </p>

      <h2>The Agency</h2>

      <p>
        The agency — which we'll call "Hartwell & Co" at their request — operates three branches across Buckinghamshire. They handle approximately 35 new sales instructions per month, with an average selling price of £475,000. Their market is competitive, with four to five rival agencies in each branch territory.
      </p>
      <p>
        Before September 2025, Hartwell & Co produced standard 2D floor plans using a combination of laser measurement and Metropix software. The plans were professional and accurate but visually unremarkable — identical in style to those produced by every competing agency in their area.
      </p>

      <h2>The Problem</h2>

      <p>
        Hartwell & Co's managing director identified two specific challenges:
      </p>
      <ul>
        <li><strong>Listing differentiation.</strong> On Rightmove and Zoopla, their listings looked indistinguishable from competitors. The photography was professional, but the overall presentation didn't stand out in search results.</li>
        <li><strong>Instruction competition.</strong> At market appraisals, vendors struggled to see why Hartwell & Co's marketing was worth more than the 0.75% fee offered by online agents. The marketing pack needed a visible quality upgrade.</li>
      </ul>

      <h2>The Decision</h2>

      <p>
        After evaluating several options — including outsourced CGI (rejected on cost and turnaround time) and video tours (already in use for premium listings) — the agency trialled <Link href="/isometric-floor-plan-generator" className="text-primary hover:underline">IsoRender's AI-powered floor plan generator</Link>. The appeal was straightforward: upload their existing 2D plans, receive furnished <Link href="/isometric-3d-floor-plans" className="text-primary hover:underline">isometric 3D renders</Link> in seconds, at a cost that made it viable for every listing rather than just premium stock.
      </p>
      <p>
        They started on the Pro plan (£7/render) for the first month, testing on 15 listings. By month two, they'd moved to the Agency plan (£49/month, unlimited renders) and made 3D floor plans standard across all three branches.
      </p>

      <h2>The Implementation</h2>

      <p>
        The workflow change was minimal. Their existing process — measure on-site, draw in Metropix, upload to CRM — gained one additional step: upload the Metropix export to IsoRender and download the 3D version. This added approximately 90 seconds per listing.
      </p>
      <p>
        The 3D floor plan was uploaded to Rightmove and Zoopla as an additional floor plan image (alongside the original dimensioned 2D plan), and also embedded in the PDF property brochure that agents left at viewings.
      </p>

      <h2>The Results (6 Months)</h2>

      <p>
        The agency tracked performance across 210 listings (September 2025 to February 2026) and compared with the same period the previous year:
      </p>
      <ul>
        <li><strong>Rightmove enquiries:</strong> Up 23% year-on-year. The increase was consistent across all three branches and all property types.</li>
        <li><strong>Average days on market:</strong> Down from 47 days to 38.5 days — an 18% reduction. This was the most commercially significant metric, as faster sales mean faster commission income and higher vendor satisfaction.</li>
        <li><strong>Viewing conversion:</strong> The ratio of enquiries to viewings booked improved by 11%. The agency attributed this to buyers having a better understanding of the property layout before requesting a viewing, meaning fewer "tyre-kicker" enquiries.</li>
        <li><strong>Instruction win rate:</strong> At market appraisals, the inclusion of a sample 3D floor plan in the pitch pack was cited by vendors as a differentiating factor. The agency's instruction win rate improved from approximately 35% to 42% of appraisals conducted.</li>
      </ul>

      <h2>The Financial Impact</h2>

      <p>
        The numbers make a compelling case. At £49/month (£588/year) for the <Link href="/floor-plan-rendering-uk" className="text-primary hover:underline">Agency plan</Link>, the cost was negligible against the agency's annual turnover. The faster sales alone — assuming a conservative estimate of two additional completions per month attributable to the reduced days-on-market — represented approximately £11,400 in additional annual commission income per branch.
      </p>

      <h2>What They Learned</h2>

      <p>
        Three practical insights emerged from Hartwell & Co's experience:
      </p>
      <ol>
        <li><strong>Consistency matters more than perfection.</strong> Using 3D floor plans on every listing (not just premium stock) created a brand-level association with quality. Buyers began to recognise Hartwell & Co listings by their visual standard.</li>
        <li><strong>The vendor impact was unexpected.</strong> The team initially introduced 3D floor plans for buyer engagement, but the biggest commercial impact was at the instruction stage. Vendors consistently mentioned the 3D plans when explaining why they chose Hartwell & Co over competitors.</li>
        <li><strong>Staff buy-in was instant.</strong> Because the <Link href="/blog/convert-2d-floor-plan-to-3d" className="text-primary hover:underline">conversion process</Link> took under two minutes and required no new skills, every negotiator adopted the tool without resistance. There was no training cost or productivity dip.</li>
      </ol>

      <h2>Applicability</h2>

      <p>
        Hartwell & Co's results are specific to their market, price bracket, and competitive environment. However, the underlying dynamics — differentiation on portals, vendor perception of marketing quality, and buyer engagement with visual content — apply to <Link href="/3d-floor-plans-for-estate-agents" className="text-primary hover:underline">estate agents</Link> across the UK. The cost structure of AI-generated floor plans makes the risk of trialling them negligible.
      </p>
    </BlogLayout>
  );
}
