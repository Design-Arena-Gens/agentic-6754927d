import { ChatAgent } from "@/components/ChatAgent";

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-content">
          <span className="hero-badge">Ahmed Optical • Lahore</span>
          <h1>Experience clear vision with Aidant, your optical concierge</h1>
          <p className="hero-lead">
            Get expert recommendations on frames, prescription lenses, and eyewear care.
            Aidant is ready 24/7 to guide you, book fittings, and connect you directly with
            Ahmed.
          </p>
          <div className="hero-actions">
            <a className="cta primary" href="tel:03230093163">
              Call 0323 009 3163
            </a>
            <a
              className="cta secondary"
              href="https://wa.me/923281451038"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 0328 145 1038
            </a>
            <a className="cta ghost" href="mailto:ahmadoptical.pk@gmail.com">
              Email ahmadoptical.pk@gmail.com
            </a>
          </div>
        </div>
        <div className="hero-card">
          <p className="hero-card-title">Why customers trust Ahmed Optical</p>
          <ul>
            <li>Curated designer & everyday frames for every face shape</li>
            <li>Premium prescription lenses, ready same-day for most orders</li>
            <li>On-site adjustments, aftercare, and warranty support</li>
          </ul>
        </div>
      </header>

      <main className="content">
        <section className="section">
          <div className="section-heading">
            <h2>Everything you need under one roof</h2>
            <p>
              Aidant keeps track of the Ahmed Optical catalog so you can explore services,
              promotions, and aftercare before stepping into the store.
            </p>
          </div>
          <div className="grid">
            <article className="card">
              <h3>Frame Styling Lab</h3>
              <p>
                Discover seasonal drops, titanium comfort collections, and budget-friendly
                picks filtered by face shape, lifestyle, and color palette.
              </p>
            </article>
            <article className="card">
              <h3>Prescription Lens Center</h3>
              <p>
                Single vision, bifocal, and progressive designs fitted with anti-glare, blue
                shield, transitions, and polarized coatings from trusted labs.
              </p>
            </article>
            <article className="card">
              <h3>Sunglass & Outdoor Bar</h3>
              <p>
                Polarized and prescription-ready sunglasses with UV400 protection and exclusive
                Aidant bundle pricing.
              </p>
            </article>
            <article className="card">
              <h3>On-Site Care & Repairs</h3>
              <p>
                Complimentary adjustments, nose-pad swaps, and express repairs for all Ahmed
                Optical customers, 7 days a week.
              </p>
            </article>
          </div>
        </section>

        <section className="section chat-section" aria-label="Chat with Aidant AI">
          <div className="section-heading">
            <h2>Chat with Aidant</h2>
            <p>
              Ask anything about availability, book appointments, or request a quote. Aidant
              answers instantly and offers direct contact with Ahmed when you’re ready.
            </p>
          </div>
          <ChatAgent />
        </section>

        <section className="section info-section" aria-label="Ahmed Optical quick facts">
          <div className="info-card">
            <h3>Visit Ahmed Optical</h3>
            <p>
              Gulberg Galleria, Main Boulevard Gulberg, Lahore. Valet parking and elevator
              access available.
            </p>
            <div className="info-badges">
              <span>Open daily 10:00 AM – 9:00 PM</span>
              <span>Late nights Fri–Sat until 11:00 PM</span>
            </div>
          </div>
          <div className="info-card">
            <h3>Express Services</h3>
            <ul>
              <li>45-minute single vision lens express lane</li>
              <li>Pre-booked optometrist for full eye exams</li>
              <li>Nationwide insured courier delivery</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Priority support</h3>
            <p>
              Need human help? Call <strong>0323 009 3163</strong>, WhatsApp{" "}
              <strong>0328 145 1038</strong>, or email{" "}
              <strong>ahmadoptical.pk@gmail.com</strong>.
            </p>
            <div className="info-buttons">
              <a className="cta small" href="tel:03230093163">
                Call Ahmed
              </a>
              <a
                className="cta small secondary"
                href="https://wa.me/923281451038"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a className="cta small ghost" href="mailto:ahmadoptical.pk@gmail.com">
                Email
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Ahmed Optical. Crafted with Aidant AI support.</p>
      </footer>
    </div>
  );
}
