# Nota Finance - Digitales Inkasso

Eine moderne, hochwertige Website für Nota Finance - Inkasso der neusten Generation.

## 🎨 Design System

- **Vibe**: McKinsey trifft modernes Fintech - autoritär, aber digital
- **Farben**: 
  - Deep Navy: `#0B1120`
  - Signal Blue: `#0050FF`
  - Silver/Platinum: `#E2E8F0` bis `#94A3B8`
- **Typography**: Plus Jakarta Sans
- **Features**: Glassmorphismus, subtile Gradients, Micro-Interactions

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Backend**: Supabase (File Storage)
- **Utils**: clsx, tailwind-merge
- **Language**: TypeScript

## 📁 Projektstruktur

```
nota-finance/
├── app/                      # Next.js App Router Pages
│   ├── page.tsx             # Landing Page
│   ├── produkt/page.tsx     # Produktseite
│   ├── branchen/page.tsx    # Branchenseite
│   ├── preise/page.tsx      # Preisseite
│   ├── unternehmen/page.tsx # Unternehmensseite
│   ├── faq/page.tsx         # FAQ-Seite
│   ├── kontakt/page.tsx     # Kontaktseite
│   ├── einreichen/page.tsx  # Upload-Seite
│   └── impressum/page.tsx   # Impressum
├── components/              # React Components
│   ├── Navbar.tsx          # Sticky Navigation
│   ├── Footer.tsx          # Footer
│   ├── CTASection.tsx      # Call-to-Action Component
│   └── UploadForm.tsx      # File Upload Form
└── lib/                    # Utilities
    ├── utils.ts            # cn() helper
    └── supabase.ts         # Supabase client
```

## 🛠️ Setup & Installation

### 1. Dependencies installieren

```bash
npm install
```

### 2. Supabase konfigurieren

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Supabase Storage Bucket erstellen

In deinem Supabase Projekt:

1. Gehe zu **Storage**
2. Erstelle einen neuen Bucket namens `invoices`
3. Setze die Permissions (öffentlich oder privat, je nach Anforderung)

### 4. Development Server starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 📄 Seiten-Übersicht

| Route | Beschreibung |
|-------|-------------|
| `/` | Landing Page mit Hero, Features, Versprechen |
| `/produkt` | Detaillierte Produktbeschreibung |
| `/branchen` | Branchenspezifische Lösungen (8 Industrien) |
| `/preise` | Preismodell und Beispielrechnung |
| `/unternehmen` | Über uns, Timeline, Mission, Werte |
| `/faq` | Häufig gestellte Fragen |
| `/kontakt` | Kontaktformular |
| `/einreichen` | Upload-Tool für Rechnungen |
| `/impressum` | Impressum |

## 🎯 Key Features

### Upload-Funktionalität (`/einreichen`)
- ✅ Drag & Drop Interface
- ✅ Unterstützt PDF, XML (XRechnung, ZUGFeRD)
- ✅ Max 10MB pro Datei
- ✅ E-Mail Validierung (required)
- ✅ Supabase Storage Integration
- ✅ AGB-Checkbox mit Verlinkung
- ✅ Multi-File Upload
- ✅ Upload-Status Anzeige

### Navigation
- ✅ Sticky Navbar mit Glassmorphismus
- ✅ Active Route Highlighting
- ✅ Prominent "Fall einreichen" CTA Button

### Design
- ✅ High-End Corporate Aesthetics
- ✅ Smooth Animations & Transitions
- ✅ Hover States mit scale & shadow effects
- ✅ Responsive Design (Mobile-First)
- ✅ Accessibility-optimiert

## 🔧 Anpassungen

### Farben ändern
Bearbeite `app/globals.css`:

```css
:root {
  --deep-navy: #0B1120;
  --signal-blue: #0050FF;
  /* ... weitere Farben */
}
```

### Schriftart ändern
Bearbeite `app/layout.tsx`:

```typescript
import { Plus_Jakarta_Sans } from "next/font/google";
// oder eine andere Google Font
```

### Supabase Bucket Name ändern
Bearbeite `components/UploadForm.tsx`:

```typescript
await supabase.storage.from("invoices") // <-- Hier anpassen
```

## 📦 Build & Deployment

### Production Build

```bash
npm run build
npm run start
```

### Deploy to Vercel

1. Push code to GitHub
2. Import in Vercel
3. Füge Environment Variables hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📝 Offene Aufgaben

- [ ] Supabase Credentials hinzufügen (`.env.local`)
- [ ] PDF-Dokumente bereitstellen (`public/agb.pdf`, `public/datenschutz.pdf`)
- [ ] Impressum-Daten anpassen
- [ ] Trust-Partner Logos ersetzen (BDIU, SCHUFA, etc.)
- [ ] Email-Integration testen
- [ ] Supabase Storage Policies konfigurieren

## 🤝 Support

Bei Fragen oder Problemen:
- Email: service@notafinance.de
- Website: [notafinance.de](https://notafinance.de)

---

**Built with ❤️ using Next.js 14 & Tailwind CSS v4**
