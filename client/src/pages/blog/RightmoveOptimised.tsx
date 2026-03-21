import { BlogLayout } from "@/components/SEOLayout";
import { Link } from "wouter";

export default function RightmoveOptimised() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Create a Rightmove-Optimised Floor Plan in Under 5 Minutes",
    "description": "A quick tutorial showing estate agents how to create floor plans optimised for Rightmove's listing format using IsoRender's AI tool.",
    "author": { "@type": "Organization", "name": "IsoRender" },
    "publisher": { "@type": "Organization", "name": "IsoRender", "url": "https://isorender.com" },
    "datePublished": "2026-03-20",
    "dateModified": "2026-03-20",
    "mainEntityOfPage": "https://isorender.com/blog/rightmove-optimised-floor-plan"
  };

  return (
    <BlogLayout
      title="How to Create a Rightmove-Optimised Floor Plan in Under 5 Minutes"
      metaDescription="A quick tutorial showing estate agents how to create floor plans optimised for Rightmove's listing format using IsoRender's AI tool."
      publishDate="20 March 2026"
      readTime="5 min read"
      category="Tutorials"
      schemaMarkup={schemaMarkup}
      faqs={[
        {
          question: "What resolution should a Rightmove floor plan be?",
          answer: "Rightmove recommends a minimum of 800px on the longest edge, but for optimal display across all devices, export at 2048px or higher. IsoRender's output is automatically sized for portal display."
        },
        {
          question: "Can I paste a Rightmove link to extract the existing floor plan?",
          answer: "Yes. IsoRender's generator accepts Rightmove and Zoopla listing URLs. It extracts the existing 2D floor plan from the listing and converts it to a 3D isometric render automatically."
        },
        {
          question: "How should I position the 3D floor plan in my Rightmove image gallery?",
          answer: "Place the 3D isometric render at position 3–5 in the image gallery, after the key exterior and interior photographs. This is the point where engaged buyers start exploring beyond the hero images, and a 3D floor plan reinforces their interest and encourages an enquiry."
        }
      ]}
      relatedPages={[
        { title: "Rightmove Floor Plan Requirements", href: "/blog/rightmove-floor-plan-requirements", description: "Full technical specifications for Rightmove floor plans." },
        { title: "Convert 2D to 3D Floor Plans", href: "/blog/convert-2d-floor-plan-to-3d", description: "Detailed tutorial for converting any 2D plan to 3D." },
        { title: "3D Floor Plans for Rightmove & Zoopla", href: "/3d-floor-plans-rightmove-zoopla", description: "Optimise your portal listings with 3D floor plans." },
        { title: "Floor Plan Generator", href: "/isometric-floor-plan-generator", description: "IsoRender's AI-powered generator." }
      ]}
    >
      <p>
        This is a quick-start guide for estate agents who want to create a 3D isometric floor plan optimised for Rightmove in the shortest time possible. No design skills. No expensive software. Five minutes, start to finish.
      </p>

      <h2>What You'll Get</h2>

      <p>
        A furnished, colour-rendered <Link href="/isometric-3d-floor-plans" className="text-primary hover:underline">isometric 3D floor plan</Link> ready for immediate upload to Rightmove, Zoopla, and OnTheMarket. The output is automatically sized for optimal display on both desktop and mobile portal views.
      </p>

      <h2>Method 1: From an Existing 2D Floor Plan (3 Minutes)</h2>

      <p>
        If you already have a 2D floor plan for the property — from Metropix, magicplan, Spec, or any other source — this is the fastest route:
      </p>
      <ol>
        <li><strong>Open IsoRender.</strong> Navigate to the <Link href="/isometric-floor-plan-generator" className="text-primary hover:underline">floor plan generator</Link>.</li>
        <li><strong>Upload your 2D plan.</strong> Drag and drop the file (JPEG, PNG, or PDF accepted). The image should be at least 800px on the longest edge.</li>
        <li><strong>Wait for processing.</strong> The AI analyses your floor plan and generates the 3D isometric render. This typically takes 30–60 seconds.</li>
        <li><strong>Download.</strong> Save the high-resolution output file.</li>
        <li><strong>Upload to Rightmove.</strong> Add the 3D render to your listing's floor plan section, alongside the original 2D plan.</li>
      </ol>
      <p>
        Total time: approximately 3 minutes including upload and download.
      </p>

      <h2>Method 2: From a Rightmove or Zoopla URL (2 Minutes)</h2>

      <p>
        If the property is already listed on a portal and has a 2D floor plan, you can skip the file upload entirely:
      </p>
      <ol>
        <li><strong>Copy the listing URL.</strong> Navigate to the property on Rightmove or Zoopla and copy the URL from your browser's address bar.</li>
        <li><strong>Paste into IsoRender.</strong> The <Link href="/isometric-floor-plan-generator" className="text-primary hover:underline">generator</Link> accepts portal URLs directly. It extracts the existing floor plan image automatically.</li>
        <li><strong>Wait for processing.</strong> Same 30–60 second generation time.</li>
        <li><strong>Download and re-upload.</strong> Save the 3D render and add it to the listing.</li>
      </ol>
      <p>
        This method is particularly useful for <Link href="/3d-floor-plans-letting-agents" className="text-primary hover:underline">letting agents</Link> managing relisted properties that already have floor plans on portals, or for upgrading existing listings that are underperforming.
      </p>

      <h2>Optimising for Rightmove Display</h2>

      <p>
        Rightmove displays floor plans in a dedicated tab, but they also appear in the main image gallery if uploaded there. To maximise impact:
      </p>

      <h3>Gallery Positioning</h3>
      <p>
        Upload the 3D floor plan as a regular listing image in addition to the dedicated floor plan section. Position it at image 3–5 in the gallery — after the key photography but before secondary room shots. This ensures engaged buyers see it during their initial browse, not only if they navigate to the floor plan tab.
      </p>

      <h3>Both Plans, Not Just One</h3>
      <p>
        Upload both the dimensioned 2D plan and the 3D isometric render. The 2D plan serves buyers who want exact measurements; the 3D plan serves buyers who want to visualise the space. Different buyer types use different plan types, and Rightmove supports multiple floor plan images per listing.
      </p>

      <h3>Resolution</h3>
      <p>
        IsoRender outputs at a resolution optimised for portal display. If you're exporting from another tool for the 2D version, ensure it's at least 2048px on the longest edge. Low-resolution plans look blurry when buyers pinch-to-zoom on mobile — which they always do.
      </p>

      <h3>File Format</h3>
      <p>
        Use PNG for floor plans with text and flat colours (crisper edges). Use JPEG for photographically-rendered 3D plans (smaller file size). IsoRender exports in the optimal format automatically.
      </p>

      <h2>Batch Processing for Multiple Listings</h2>

      <p>
        On the Agency plan (£49/month, unlimited renders), agents can process their entire active portfolio in a single session. A typical workflow for upgrading 30 existing listings:
      </p>
      <ol>
        <li>Export all 2D floor plans from your CRM or floor plan software.</li>
        <li>Upload each to IsoRender sequentially (or use the URL paste method for listings already on portals).</li>
        <li>Download all 3D renders.</li>
        <li>Batch upload to <Link href="/3d-floor-plans-rightmove-zoopla" className="text-primary hover:underline">Rightmove and Zoopla</Link> via your CRM's portal feed.</li>
      </ol>
      <p>
        Processing 30 floor plans takes approximately 45 minutes — an afternoon task that upgrades your entire portfolio's visual presentation.
      </p>

      <h2>Measuring the Impact</h2>

      <p>
        After adding 3D floor plans, monitor your Rightmove Plus analytics. Key metrics to track:
      </p>
      <ul>
        <li><strong>Detail views per listing.</strong> Expect a 15–30% increase within the first week.</li>
        <li><strong>Email and phone enquiries.</strong> The uplift here typically takes 2–3 weeks to become statistically meaningful.</li>
        <li><strong>Time on listing.</strong> 3D floor plans increase dwell time, which is a positive signal to Rightmove's algorithm.</li>
      </ul>
      <p>
        For a detailed analysis of expected returns, see our article on <Link href="/blog/roi-3d-floor-plans" className="text-primary hover:underline">the ROI of 3D floor plans</Link>.
      </p>
    </BlogLayout>
  );
}
