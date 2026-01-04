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
      <div className="absolute inset-0 bg-gradient-to-br from-white via-surface-100/50 to-surface-100/30 opacity-50" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-text-900 mb-6">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-lg text-text-900/70 mb-10 max-w-2xl mx-auto">
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
                  ? "group bg-brand-900 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  : "group bg-white text-text-900 px-8 py-4 rounded-lg font-semibold text-base border-2 border-border-subtle hover:border-brand-900 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
              }
            >
              {button.text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
