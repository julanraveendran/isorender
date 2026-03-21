import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  ArrowRight,
  Upload,
  Link as LinkIcon,
  Zap,
  Eye,
  Download,
  Building2,
  LayoutGrid,
  Layers,
  ChevronRight,
  Check,
  Star,
  Globe,
  Timer,
  ImageIcon,
  Sparkles,
} from "lucide-react";

// Smooth scroll helper
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Section wrapper with fade-in animation
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

// Animated counter
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Isometric cube SVG animation for hero
function IsometricAnimation() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        {/* Base grid */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`h-${i}`}
              x1={50 + i * 50}
              y1={200 - i * 25}
              x2={50 + i * 50 + 200}
              y2={200 - i * 25 + 100}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`v-${i}`}
              x1={50 + i * 50 + 200}
              y1={100 + i * 25}
              x2={50 + i * 50}
              y2={100 + i * 25 + 100}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          ))}
        </motion.g>

        {/* Animated isometric rooms */}
        {[
          { x: 120, y: 160, w: 80, h: 50, delay: 0.5, color: "hsl(var(--primary))" },
          { x: 200, y: 200, w: 60, h: 40, delay: 0.7, color: "hsl(var(--accent))" },
          { x: 140, y: 220, w: 70, h: 45, delay: 0.9, color: "hsl(var(--primary))" },
          { x: 220, y: 170, w: 50, h: 35, delay: 1.1, color: "hsl(var(--accent))" },
        ].map((room, i) => (
          <motion.g key={i}>
            {/* Floor */}
            <motion.path
              d={`M${room.x},${room.y} L${room.x + room.w},${room.y - room.h / 2} L${room.x + room.w * 2},${room.y} L${room.x + room.w},${room.y + room.h / 2} Z`}
              fill={room.color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 0.8, delay: room.delay, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Walls */}
            <motion.path
              d={`M${room.x},${room.y} L${room.x},${room.y - 30} L${room.x + room.w},${room.y - room.h / 2 - 30} L${room.x + room.w},${room.y - room.h / 2} Z`}
              fill={room.color}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 0.6, delay: room.delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d={`M${room.x + room.w},${room.y - room.h / 2} L${room.x + room.w},${room.y - room.h / 2 - 30} L${room.x + room.w * 2},${room.y - 30} L${room.x + room.w * 2},${room.y} Z`}
              fill={room.color}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.15, y: 0 }}
              transition={{ duration: 0.6, delay: room.delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.g>
        ))}

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`p-${i}`}
            cx={100 + Math.random() * 200}
            cy={100 + Math.random() * 200}
            r={2}
            fill="hsl(var(--accent))"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Landing() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleBuyPlan = async (planId: string) => {
    try {
      const apiBase = "__PORT_5000__".startsWith("__") ? "" : "__PORT_5000__";
      const currentUrl = window.location.href.split('#')[0];
      const res = await fetch(`${apiBase}/api/stripe/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          successUrl: `${currentUrl}#/generate?purchased=true`,
          cancelUrl: `${currentUrl}#/pricing`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({ title: "Error", description: data.error || "Failed to create checkout", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Payment system unavailable", variant: "destructive" });
    }
  };

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/waitlist", { email });
      setSubmitted(true);
      toast({ title: "You're on the list", description: "We'll notify you when IsoRender launches." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-lg tracking-tight" data-testid="text-brand">IsoRender</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors" data-testid="link-features">Features</button>
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-foreground transition-colors" data-testid="link-how-it-works">How it works</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-foreground transition-colors" data-testid="link-pricing">Pricing</button>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/generate">
              <Button size="sm" data-testid="button-try-now">
                Try it free
                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge variant="secondary" className="mb-6 text-xs font-medium px-3 py-1" data-testid="badge-beta">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Now in beta
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-testid="text-hero-title"
            >
              Turn flat floor plans into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]">
                stunning 3D
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              data-testid="text-hero-subtitle"
            >
              Upload any 2D floor plan or paste a Rightmove or Zoopla link. Get a photorealistic isometric 3D render in seconds. Built for estate agents, architects, and property developers.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/generate">
                <Button size="lg" className="text-base px-6 gap-2" data-testid="button-generate-hero">
                  <Upload className="w-4 h-4" />
                  Generate 3D render
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-6 gap-2"
                onClick={() => scrollTo("how-it-works")}
                data-testid="button-see-how"
              >
                See how it works
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>Under 30 seconds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>4K output</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>UK property sites</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <IsometricAnimation />
          </motion.div>
        </div>
      </header>

      {/* Social proof */}
      <Section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 2400, suffix: "+", label: "Renders generated" },
              { value: 580, suffix: "+", label: "Active users" },
              { value: 28, suffix: "s", label: "Avg render time" },
              { value: 4, suffix: "K", label: "Output resolution" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-[hsl(var(--accent))] mb-3 tracking-wide uppercase">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4" data-testid="text-how-title">Three steps to a professional 3D visualisation</h2>
            <p className="text-muted-foreground text-lg">No design experience needed. Our AI handles the complex rendering while you focus on selling properties.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Upload,
                title: "Upload or paste a link",
                description: "Upload a floor plan image, or paste a Rightmove or Zoopla property URL. We'll extract the floor plan automatically.",
              },
              {
                step: "02",
                icon: Zap,
                title: "AI generates the 3D render",
                description: "Our AI analyses the spatial layout, room dimensions, and features, then generates a photorealistic isometric 3D visualisation.",
              },
              {
                step: "03",
                icon: Download,
                title: "Download and share",
                description: "Get your 4K isometric render in seconds. Use it in listings, brochures, presentations, or social media posts.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group relative p-8 rounded-xl bg-card border border-card-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-5xl font-bold text-muted/60 mb-6 tabular-nums">{item.step}</div>
                <item.icon className="w-5 h-5 text-[hsl(var(--accent))] mb-4" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features" className="py-24 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-[hsl(var(--accent))] mb-3 tracking-wide uppercase">Capabilities</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to visualise property</h2>
            <p className="text-muted-foreground text-lg">From floor plans to full building exteriors, generate professional architectural visualisations without a design team.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: LayoutGrid,
                title: "Floor plan to 3D",
                description: "Convert any 2D floor plan into a detailed isometric 3D cutaway. See every room with realistic furniture, materials, and lighting.",
                tag: "Most popular",
              },
              {
                icon: Building2,
                title: "Building exteriors",
                description: "Generate aerial isometric views of entire buildings. Perfect for development brochures and marketing materials.",
                tag: null,
              },
              {
                icon: Eye,
                title: "Interior room views",
                description: "Create miniature diorama-style views of individual rooms. Ideal for showcasing key spaces like kitchens and living areas.",
                tag: null,
              },
              {
                icon: Layers,
                title: "Multi-floor layouts",
                description: "Automatically detect and render multi-storey properties with each floor visible in a single isometric composition.",
                tag: "Coming soon",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="relative p-8 rounded-xl bg-card border border-card-border"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {feature.tag && (
                  <Badge variant="secondary" className="absolute top-6 right-6 text-xs">
                    {feature.tag}
                  </Badge>
                )}
                <feature.icon className="w-6 h-6 text-foreground mb-4" strokeWidth={1.5} />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Property site integration */}
      <Section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-[hsl(var(--accent))] mb-3 tracking-wide uppercase">Integrations</p>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Paste a link, get a render</h2>
              <p className="text-muted-foreground text-lg mb-8">Works directly with UK property listing sites. Just paste the URL and we'll extract the floor plan, analyse it, and generate a 3D render automatically.</p>

              <div className="space-y-4">
                {[
                  { name: "Rightmove", desc: "UK's largest property portal" },
                  { name: "Zoopla", desc: "Comprehensive property listings" },
                ].map((site, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border/50">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <LinkIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{site.name}</div>
                      <div className="text-xs text-muted-foreground">{site.desc}</div>
                    </div>
                    <Badge variant="outline" className="ml-auto text-xs">Supported</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-6">
              <div className="bg-background rounded-lg p-4 border border-border mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="ml-2">isorender.com/generate</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted rounded-md px-3 py-2 text-sm text-muted-foreground truncate">
                    https://www.rightmove.co.uk/properties/167890421
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm font-medium">
                    Generate
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <motion.div
                  className="w-5 h-5 border-2 border-[hsl(var(--accent))] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Extracting floor plan and generating 3D render...</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Before / After comparison */}
      <Section className="py-24 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-medium text-[hsl(var(--accent))] mb-3 tracking-wide uppercase">Transformation</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">See the difference</h2>
            <p className="text-muted-foreground text-lg">From a standard 2D floor plan to a professional 3D isometric visualisation.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -top-3 left-4 bg-background px-3 py-1 rounded-full text-xs font-medium border border-border z-10">
                2D Input
              </div>
              <div className="bg-card border border-card-border rounded-xl p-8 aspect-[4/3] flex items-center justify-center">
                {/* Stylized floor plan SVG */}
                <svg viewBox="0 0 300 220" className="w-full max-w-xs opacity-70" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="20" y="20" width="120" height="80" rx="1" />
                  <rect x="140" y="20" width="80" height="80" rx="1" />
                  <rect x="20" y="100" width="80" height="100" rx="1" />
                  <rect x="100" y="100" width="120" height="100" rx="1" />
                  <rect x="220" y="20" width="60" height="180" rx="1" />
                  {/* Room labels */}
                  <text x="55" y="65" fontSize="8" fill="currentColor" strokeWidth="0" className="text-muted-foreground">Living</text>
                  <text x="160" y="65" fontSize="8" fill="currentColor" strokeWidth="0" className="text-muted-foreground">Kitchen</text>
                  <text x="40" y="155" fontSize="8" fill="currentColor" strokeWidth="0" className="text-muted-foreground">Bed 1</text>
                  <text x="135" y="155" fontSize="8" fill="currentColor" strokeWidth="0" className="text-muted-foreground">Bed 2</text>
                  <text x="232" y="115" fontSize="8" fill="currentColor" strokeWidth="0" className="text-muted-foreground">Bath</text>
                  {/* Doors */}
                  <path d="M120 55 Q130 55 130 65" strokeDasharray="3 2" />
                  <path d="M100 100 Q100 110 110 110" strokeDasharray="3 2" />
                  <path d="M220 90 Q220 100 230 100" strokeDasharray="3 2" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-3 left-4 bg-[hsl(var(--accent))] text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                3D Output
              </div>
              <div className="bg-card border border-card-border rounded-xl p-8 aspect-[4/3] flex items-center justify-center overflow-hidden">
                {/* Isometric 3D preview */}
                <svg viewBox="0 0 400 300" className="w-full" fill="none">
                  {/* Isometric floor */}
                  <motion.path
                    d="M200,240 L340,170 L200,100 L60,170 Z"
                    fill="hsl(var(--primary))"
                    opacity="0.08"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.08 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Room 1 - Living */}
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <path d="M80,190 L160,150 L200,170 L120,210 Z" fill="hsl(36, 50%, 75%)" opacity="0.6" />
                    <path d="M80,190 L80,150 L160,110 L160,150 Z" fill="hsl(var(--primary))" opacity="0.2" />
                    <path d="M160,110 L200,130 L200,170 L160,150 Z" fill="hsl(var(--primary))" opacity="0.12" />
                    {/* Furniture hint */}
                    <rect x="100" y="168" width="30" height="15" rx="2" fill="hsl(var(--accent))" opacity="0.3" transform="skewX(-30) skewY(15)" />
                  </motion.g>

                  {/* Room 2 - Kitchen */}
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <path d="M200,170 L280,130 L320,150 L240,190 Z" fill="hsl(0, 0%, 90%)" opacity="0.5" />
                    <path d="M200,170 L200,130 L280,90 L280,130 Z" fill="hsl(var(--primary))" opacity="0.18" />
                    <path d="M280,90 L320,110 L320,150 L280,130 Z" fill="hsl(var(--primary))" opacity="0.1" />
                  </motion.g>

                  {/* Room 3 - Bedroom */}
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <path d="M120,210 L200,170 L240,190 L160,230 Z" fill="hsl(220, 20%, 85%)" opacity="0.5" />
                    <path d="M120,210 L120,170 L200,130 L200,170 Z" fill="hsl(var(--primary))" opacity="0.22" />
                    <path d="M200,130 L240,150 L240,190 L200,170 Z" fill="hsl(var(--primary))" opacity="0.14" />
                  </motion.g>

                  {/* Light rays */}
                  <motion.line
                    x1="300" y1="40" x2="220" y2="120"
                    stroke="hsl(45, 80%, 70%)"
                    strokeWidth="0.5"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <motion.line
                    x1="320" y1="50" x2="240" y2="130"
                    stroke="hsl(45, 80%, 70%)"
                    strokeWidth="0.5"
                    opacity="0.2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-medium text-[hsl(var(--accent))] mb-3 tracking-wide uppercase">Pricing</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Pay once, render forever</h2>
            <p className="text-muted-foreground text-lg">Credits never expire. No subscriptions, no hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Starter",
                planId: "starter",
                price: "£7",
                credits: "10",
                features: ["10 render credits", "Standard resolution", "Floor plan upload", "PNG & JPG export"],
                popular: false,
              },
              {
                name: "Professional",
                planId: "professional",
                price: "£19",
                credits: "50",
                features: ["50 render credits", "4K resolution", "URL extraction", "Priority processing", "All export formats"],
                popular: true,
              },
              {
                name: "Studio",
                planId: "agency",
                price: "£49",
                credits: "150",
                features: ["150 render credits", "4K resolution", "URL extraction", "Priority processing", "Batch rendering", "API access"],
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-xl border ${
                  plan.popular
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-card-border"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[hsl(var(--accent))] text-white border-0 text-xs">Most popular</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      one-time
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.credits} credits
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-[hsl(var(--accent))]"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "secondary" : "default"}
                  data-testid={`button-plan-${plan.name.toLowerCase()}`}
                  onClick={() => handleBuyPlan(plan.planId)}
                >
                  Buy {plan.name} — {plan.price}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA / Waitlist */}
      <Section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to transform your listings?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8">
            Join hundreds of estate agents and architects already using IsoRender to create stunning 3D property visualisations.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-lg"
              >
                <Check className="w-5 h-5" />
                <span>You're on the list. We'll be in touch.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleWaitlist}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-11"
                  required
                  data-testid="input-email-waitlist"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={isSubmitting}
                  className="shrink-0"
                  data-testid="button-join-waitlist"
                >
                  {isSubmitting ? "Joining..." : "Join waitlist"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold tracking-tight">IsoRender</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors">Features</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-foreground transition-colors">Pricing</button>
            <a href="mailto:hello@isorender.com" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="text-xs text-muted-foreground flex flex-col items-center md:items-end gap-1">
            <span>© {new Date().getFullYear()} IsoRender</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// SVG Logo
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="IsoRender logo">
      {/* Isometric cube mark */}
      <path d="M16 4L28 11V21L16 28L4 21V11L16 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 4L16 14L28 21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 14L4 21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 11L16 18L28 11" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
