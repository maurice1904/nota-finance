import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  buttons: Array<{
    text: string;
    href: string;
    primary?: boolean;
  }>;
}

export default function CTASection({ title, subtitle, buttons }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700/10 via-surface-100/40 to-white" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-base sm:text-lg text-text-900/70 mb-8 sm:mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {buttons.map((button) => (
            <Link
              key={button.href}
              href={button.href}
              className={
                button.primary
                  ? "group bg-brand-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-brand-900 hover:bg-brand-700 hover:border-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring flex-1 sm:flex-initial sm:min-w-[240px]"
                  : "group bg-white text-text-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-border-subtle hover:border-brand-700/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring flex-1 sm:flex-initial sm:min-w-[240px]"
              }
            >
              {button.text}
              <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-all duration-300 ${button.primary ? "" : "text-neutral-500 group-hover:text-brand-700"}`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
