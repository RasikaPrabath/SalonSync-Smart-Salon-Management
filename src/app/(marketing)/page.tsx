import Link from 'next/link'
import {
  Scissors,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Package,
  CheckCircle2,
  ArrowRight,
  Shield,
  Smartphone,
  Globe,
  MessageSquare,
  Sparkles,
  Zap,
  Star,
  Layers,
  ChevronRight,
  Clock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SalonSync — Smart Salon & Barbershop Management for Sri Lanka',
  description:
    'The modern operating system for Sri Lankan salons and barbershops. Track daily sales, expenses, appointments, staff commissions, and real-time net profit in LKR. Full Sinhala and English support.',
}

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Profit & Loss Tracking',
    sinhala: 'දවසේ සැබෑ ශුද්ධ ලාභය තත්පරයෙන්',
    description:
      'Instantly know your daily, weekly, and monthly net profit. Automatically deduct expenses and staff payouts from sales.',
    badge: 'Finance',
  },
  {
    icon: Calendar,
    title: 'Smart Appointment Scheduling',
    sinhala: 'පහසු හමුවීම් වෙන්කරගැනීම',
    description:
      'Manage client bookings, avoid double-scheduling, and keep your stylist chairs running at full capacity.',
    badge: 'Booking',
  },
  {
    icon: Users,
    title: 'Stylist & Staff Commissions',
    sinhala: 'කාර්ය මණ්ඩල කොමිස් ගණනය',
    description:
      'Set individual commission percentages for each staff member. Transparent daily summaries eliminate disputes.',
    badge: 'Team',
  },
  {
    icon: Package,
    title: 'Inventory & Stock Alerts',
    sinhala: 'තොග කළමනාකරණය හා දැනුම්දීම්',
    description:
      'Keep track of hair colors, shampoos, and beauty products. Get notified before critical salon supplies run out.',
    badge: 'Inventory',
  },
  {
    icon: Globe,
    title: 'Full Sinhala & English Support',
    sinhala: 'සිංහල හා ඉංග්‍රීසි භාෂා දෙකෙන්ම',
    description:
      'Designed for Sri Lankan salon teams. Switch between English and Sinhala with one click so everyone can use it effortlessly.',
    badge: 'Localization',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Client Reminders',
    sinhala: 'WhatsApp පණිවිඩ මගින් මතක් කිරීම්',
    description:
      'Reduce expensive no-shows with instant booking confirmations and reminders sent directly to clients on WhatsApp.',
    badge: 'Smart Tools',
  },
]

const steps = [
  {
    step: '01',
    title: 'Create Your Salon in 2 Minutes',
    desc: 'Sign up for free, add your salon name, stylists, and the list of services you offer (haircuts, styling, spa, etc.).',
  },
  {
    step: '02',
    title: 'Log Daily Sales & Appointments',
    desc: 'Record client visits in two taps on your mobile phone or tablet at the reception desk.',
  },
  {
    step: '03',
    title: 'Watch Your Profit Grow with Clarity',
    desc: 'See daily revenue, exact expenses, staff commission balances, and insights into your most profitable services.',
  },
]

const testimonials = [
  {
    name: 'Kasun Rajapaksha',
    role: 'Owner, Vintage Barbershop — Colombo 03',
    quote:
      'Before SalonSync, we recorded everything in a notebook and calculated commissions by hand late at night. Now, everything takes 5 seconds on the phone and staff trust the numbers.',
    rating: 5,
  },
  {
    name: 'Dilini Senanayake',
    role: 'Founder, Glamour Hair & Beauty Lounge — Kandy',
    quote:
      'The Sinhala language support is a game changer for our staff. We never double-book appointments anymore, and tracking product stock is completely automated.',
    rating: 5,
  },
  {
    name: 'Nadeem Farook',
    role: 'Manager, Urban Cut Studio — Galle',
    quote:
      'Seeing real-time daily profit after subtracting hair product costs and electricity bills helped us boost our net profit by 28% in our first two months.',
    rating: 5,
  },
]

const faqs = [
  {
    q: 'Can I use SalonSync on my phone or tablet?',
    a: 'Yes! SalonSync is fully responsive and designed mobile-first. You and your staff can use it on any Android, iPhone, iPad, laptop, or desktop computer without installing anything.',
  },
  {
    q: 'Does it support Sri Lankan Rupees (LKR) and Sinhala language?',
    a: 'Absolutely. SalonSync was built specifically for Sri Lanka. All pricing and reports are in Rs. (LKR), and the entire system can be used in 100% Sinhala (සිංහල) or English.',
  },
  {
    q: 'Is SalonSync really free to use?',
    a: 'Yes, our Free Beta Plan is completely free with no credit card required. You get unlimited access to core salon management, profit tracking, appointments, and staff features.',
  },
  {
    q: 'Can multiple stylists and receptionists log in simultaneously?',
    a: 'Yes. You can invite multiple team members with individual roles (Owner or Staff) to manage appointments and log services simultaneously.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 lg:gap-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[hsl(var(--primary-muted))] border border-[hsl(var(--primary)/0.25)] text-xs font-semibold text-[hsl(var(--primary))] mb-6 shadow-xs animate-fade-in backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Salon Management for Sri Lanka • සිංහල & English</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[hsl(var(--foreground))] max-w-4xl mx-auto leading-[1.12]">
          Run Your Salon & Barbershop with{' '}
          <span className="text-[hsl(var(--primary))] bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(16_80%_55%)] bg-clip-text text-transparent">
            Total Profit Clarity
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-[hsl(var(--foreground-muted))] max-w-2xl mx-auto leading-relaxed">
          Say goodbye to messy paper notebooks. Track daily sales, expenses, stylist commissions, and client appointments in one effortless app.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/signup"
            className="w-full sm:w-auto h-12 px-7 rounded-xl bg-[hsl(var(--primary))] text-white font-bold text-base hover:bg-[hsl(var(--primary-hover))] transition-all shadow-md shadow-[hsl(var(--primary)/0.25)] flex items-center justify-center gap-2"
          >
            Start Free Today <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto h-12 px-7 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] font-semibold text-base hover:bg-[hsl(var(--background-3))] transition-all flex items-center justify-center gap-2"
          >
            Explore Features <ChevronRight className="w-4 h-4 text-[hsl(var(--foreground-muted))]" />
          </a>
        </div>

        {/* Trust tags */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[hsl(var(--foreground-subtle))] flex-wrap">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success-foreground))]" />
            <span>100% Free during Beta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success-foreground))]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success-foreground))]" />
            <span>Works on any mobile or PC</span>
          </div>
        </div>

        {/* 2. APP PREVIEW / MOCKUP */}
        <div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 sm:p-5 shadow-2xl shadow-[hsl(var(--foreground)/0.06)]">
          {/* Browser header dots */}
          <div className="flex items-center justify-between pb-3 border-b border-[hsl(var(--border-subtle))] mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="px-4 py-1 rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[11px] text-[hsl(var(--foreground-muted))] font-mono">
              salonsync.lk/dashboard
            </div>
            <div className="w-12" />
          </div>

          {/* Interactive UI Mockup Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Main Metric Spotlight */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-5 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider text-[hsl(var(--foreground-muted))]">
                      Today&apos;s Net Profit
                    </p>
                    <p className="text-3xl font-extrabold text-[hsl(var(--foreground))] mt-1 font-tabular">
                      Rs. 18,450
                    </p>
                  </div>
                  <Badge variant="primary" className="text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" /> +24% vs yesterday
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[hsl(var(--border-subtle))]">
                  <div>
                    <p className="text-[10px] text-[hsl(var(--foreground-muted))] uppercase">Revenue</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))] font-tabular">Rs. 26,000</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[hsl(var(--foreground-muted))] uppercase">Expenses</p>
                    <p className="text-sm font-bold text-[hsl(var(--danger-foreground))] font-tabular">Rs. 7,550</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[hsl(var(--foreground-muted))] uppercase">Bookings</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))] font-tabular">12 Clients</p>
                  </div>
                </div>
              </div>

              {/* Today's appointments preview */}
              <div className="p-4 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] space-y-2.5">
                <p className="text-xs font-bold text-[hsl(var(--foreground))] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[hsl(var(--primary))]" /> Upcoming Appointments
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[hsl(var(--card))] text-xs border border-[hsl(var(--border-subtle))]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-bold text-[11px]">
                        R
                      </div>
                      <div>
                        <p className="font-semibold text-[hsl(var(--foreground))]">Ruwan Perera</p>
                        <p className="text-[10px] text-[hsl(var(--foreground-muted))]">Fade Haircut & Beard Grooming • Stylist: Kasun</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[hsl(var(--primary))]">10:30 AM</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[hsl(var(--card))] text-xs border border-[hsl(var(--border-subtle))]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-[11px]">
                        N
                      </div>
                      <div>
                        <p className="font-semibold text-[hsl(var(--foreground))]">Nadeesha Fernando</p>
                        <p className="text-[10px] text-[hsl(var(--foreground-muted))]">Keratin Treatment & Blowdry • Stylist: Dilini</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[hsl(var(--primary))]">11:45 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar quick actions & staff summary */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] space-y-3">
                <p className="text-xs font-bold text-[hsl(var(--foreground))]">Stylist Commissions</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[hsl(var(--foreground-muted))]">Kasun (40%)</span>
                    <span className="font-bold text-[hsl(var(--foreground))] font-tabular">Rs. 4,800</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[hsl(var(--foreground-muted))]">Dilini (35%)</span>
                    <span className="font-bold text-[hsl(var(--foreground))] font-tabular">Rs. 5,250</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[hsl(var(--foreground-muted))]">Saman (30%)</span>
                    <span className="font-bold text-[hsl(var(--foreground))] font-tabular">Rs. 2,900</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[hsl(var(--primary-muted))] border border-[hsl(var(--primary)/0.2)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="w-4 h-4 text-[hsl(var(--primary))]" />
                  <p className="text-xs font-bold text-[hsl(var(--primary))]">Instant Mobile Logging</p>
                </div>
                <p className="text-[11px] text-[hsl(var(--foreground-muted))] leading-relaxed">
                  Add cash sales and split payment invoices from any phone in under 5 seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION */}
      <section className="px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--foreground))] tracking-tight">
            Stop Losing Money in Paper Notebooks
          </h2>
          <p className="text-sm sm:text-base text-[hsl(var(--foreground-muted))] mt-2">
            Why leading salons in Sri Lanka are switching to SalonSync.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Old Way */}
          <div className="p-6 rounded-2xl bg-[hsl(var(--danger-bg))] border border-[hsl(var(--danger)/0.2)] space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[hsl(var(--danger))] text-white flex items-center justify-center text-xs font-bold">✕</span>
              <h3 className="font-bold text-base text-[hsl(var(--danger-foreground))]">The Old Paper Way</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[hsl(var(--foreground))]">
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--danger-foreground))] font-bold">•</span>
                <span>Calculating daily profit by hand at midnight after an exhausting day.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--danger-foreground))] font-bold">•</span>
                <span>Lost notebooks, smudged ink, and missing client phone numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--danger-foreground))] font-bold">•</span>
                <span>Staff commission confusion and arguments over service revenue.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--danger-foreground))] font-bold">•</span>
                <span>Running out of hair color and shampoo unexpectedly on busy weekends.</span>
              </li>
            </ul>
          </div>

          {/* The SalonSync Way */}
          <div className="p-6 rounded-2xl bg-[hsl(var(--success-bg))] border border-[hsl(var(--success)/0.2)] space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[hsl(var(--success))] text-white flex items-center justify-center text-xs font-bold">✓</span>
              <h3 className="font-bold text-base text-[hsl(var(--success-foreground))]">The SalonSync Way</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[hsl(var(--foreground))]">
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--success-foreground))] font-bold">•</span>
                <span>Instant, automated profit calculation in Sri Lankan Rupees (Rs.).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--success-foreground))] font-bold">•</span>
                <span>Secure cloud backups — customer records and sales never get lost.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--success-foreground))] font-bold">•</span>
                <span>Automated commission calculations with full transparency for staff.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--success-foreground))] font-bold">•</span>
                <span>Smart low-stock warnings before products run out.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES GRID */}
      <section id="features" className="px-6 max-w-6xl mx-auto w-full scroll-mt-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--primary-muted))] text-xs font-bold text-[hsl(var(--primary))] mb-3">
            Features & Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[hsl(var(--foreground))] tracking-tight">
            Everything Your Salon Needs to Thrive
          </h2>
          <p className="text-base text-[hsl(var(--foreground-muted))] mt-2 max-w-xl mx-auto">
            Packed with essential tools specifically crafted for salon owners, stylists, and barbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, sinhala, description, badge }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[hsl(var(--primary-muted))] flex items-center justify-center text-[hsl(var(--primary))] group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))]">
                    {badge}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-[hsl(var(--foreground))]">{title}</h3>
                <p className="text-xs font-medium text-[hsl(var(--primary))] mt-0.5">{sinhala}</p>
                <p className="text-sm text-[hsl(var(--foreground-muted))] mt-2.5 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="px-6 max-w-5xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--foreground))] tracking-tight">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-sm text-[hsl(var(--foreground-muted))] mt-2">
              No complicated training. Start managing your salon today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary))] text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-[hsl(var(--primary)/0.25)] mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-base text-[hsl(var(--foreground))] mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-[hsl(var(--foreground-muted))] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[hsl(var(--primary))] text-white font-semibold text-sm hover:bg-[hsl(var(--primary-hover))] transition-all shadow-md shadow-[hsl(var(--primary)/0.2)]"
            >
              Set Up Your Salon Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--foreground))] tracking-tight">
            Loved by Salon Owners Across Sri Lanka
          </h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-1">
            Real feedback from modern barbershops and beauty salons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, quote, rating }) => (
            <div
              key={name}
              className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed italic">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[hsl(var(--border-subtle))]">
                <p className="font-bold text-sm text-[hsl(var(--foreground))]">{name}</p>
                <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--foreground))] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-1">
            Got questions? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <h3 className="font-bold text-base text-[hsl(var(--foreground))] mb-1.5">{q}</h3>
              <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="px-6 max-w-5xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--card))] border-2 border-[hsl(var(--primary)/0.3)] p-8 sm:p-12 text-center shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--primary)/0.1)] rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[hsl(var(--foreground))] tracking-tight">
            Ready to Upgrade Your Salon Management?
          </h2>
          <p className="text-base text-[hsl(var(--foreground-muted))] mt-3 max-w-xl mx-auto">
            Join hundreds of Sri Lankan salons switching to digital profit tracking, appointments, and staff management today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[hsl(var(--primary))] text-white font-bold text-base hover:bg-[hsl(var(--primary-hover))] transition-all shadow-lg shadow-[hsl(var(--primary)/0.25)] flex items-center justify-center gap-2"
            >
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto h-12 px-6 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-semibold text-sm hover:bg-[hsl(var(--background-3))] transition-all flex items-center justify-center"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
