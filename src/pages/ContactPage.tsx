import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, ChevronDown, ChevronUp, Compass, Clock, ShieldCheck } from 'lucide-react';
import { SiteConfig, BookingLead } from '../types/retreat';
import { saveBookingLead } from '../services/supabase';
import { TurnstileWidget } from '../components/TurnstileWidget';

interface ContactPageProps {
  config: SiteConfig;
  onLeadSubmitted: (lead: BookingLead) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ config, onLeadSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '4 Days / 3 Nights Retreat',
    roomType: 'Twin Sharing',
    datePreference: 'Upcoming Cohort (Next Month)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      setCaptchaError(true);
      return;
    }
    const newLead = saveBookingLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      package: formData.package,
      roomType: formData.roomType,
      datePreference: formData.datePreference,
      message: formData.message
    });
    onLeadSubmitted(newLead);
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello ${config.brandName}! I am reaching out from your Contact Page.%0A%0A*Name:* ${encodeURIComponent(
      formData.name || 'Inquirer'
    )}%0A*Package:* ${encodeURIComponent(formData.package)}%0A*Room:* ${encodeURIComponent(
      formData.roomType
    )}%0A*Phone:* ${encodeURIComponent(formData.phone || 'N/A')}%0A*Question:* ${encodeURIComponent(
      formData.message || 'I would like to inquire about retreat details.'
    )}`;
    return `https://wa.me/${config.contact.whatsappNumber}?text=${text}`;
  };

  const faqs = [
    {
      q: 'Do I need prior experience in yoga or meditation?',
      a: 'Not at all. Shunya Sync is purposefully beginner friendly. Every session is taught with mindful variations so whether you have never practiced or have years of experience, you will feel completely supported.'
    },
    {
      q: 'Can I travel solo to the retreat?',
      a: 'Absolutely! Over 60% of our attendees join solo. Shunya Sync is designed to foster a safe, warm, and welcoming community where you quickly form genuine connections.'
    },
    {
      q: 'What kind of food is served?',
      a: 'All meals are 100% vegetarian, sattvic, and prepared fresh using organic produce. The meals are designed to cleanse the digestive system, revitalize energy levels, and support deep sleep.'
    },
    {
      q: 'How do I reach the retreat destination in India?',
      a: 'Our nature retreat destination is located in a serene mountain setting in India. Upon confirmation, our team provides complete travel coordination, including recommended train/flight details and trusted cab transfers directly to the property.'
    },
    {
      q: 'What should I pack for the retreat?',
      a: 'Comfortable cotton or linen clothing for yoga and movement, light layers for cool evenings, walking shoes for forest trails, a personal journal, and an open heart. We provide yoga mats, props, and organic toiletries.'
    },
    {
      q: 'What is the Twin Sharing room setup?',
      a: 'In Twin Sharing, you will be paired with a fellow retreat attendee of the same gender in a spacious nature room with two individual beds. If you come with a friend or partner, you will be roomed together.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-20 animate-section-flip">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7EFE9] text-[#C67856] text-xs font-semibold uppercase tracking-[0.2em] border border-[#E9D9CF]">
          <Compass className="w-3.5 h-3.5" />
          <span>We Are Here for You</span>
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          Connect with Shunya Sync
        </h1>
        <p className="text-base sm:text-lg text-[#556057] font-light">
          Have questions about dates, travel arrangements, dietary requirements, or pricing? Reach out to founders Anmol &amp; Komal.
        </p>
      </div>

      {/* Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-[#DFD7CA] shadow-sm space-y-6 card-3d-tilt">
            <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23]">
              Direct Retreat Channels
            </h2>

            <div className="space-y-4 text-sm text-[#3E4A40]">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5]">
                <Phone className="w-5 h-5 text-[#C67856] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Phone &amp; WhatsApp</p>
                  <p className="font-medium text-base text-[#1F2E23] mt-0.5">{config.contact.phone}</p>
                  <p className="text-xs text-stone-500">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5]">
                <Mail className="w-5 h-5 text-[#C67856] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Direct Email</p>
                  <a href={`mailto:${config.contact.email}`} className="font-medium text-base text-[#1F2E23] hover:text-[#C67856]">
                    {config.contact.email}
                  </a>
                  <p className="text-xs text-stone-500">Responses usually within 12 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5]">
                <MapPin className="w-5 h-5 text-[#C67856] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Retreat Location</p>
                  <p className="font-medium text-base text-[#1F2E23]">{config.contact.location}</p>
                  <p className="text-xs text-stone-500">Peaceful Foothills &amp; Forest Setting</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${config.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-semibold transition shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Facilitators Quick Card */}
          <div className="p-6 rounded-3xl bg-[#1F2E23] text-white space-y-3 border border-[#3E5242]">
            <p className="text-xs uppercase tracking-widest text-[#E3A387] font-semibold">Your Hosts &amp; Guides</p>
            <p className="font-serif-display text-xl text-stone-100">
              {config.founder1.name} &amp; {config.founder2.name}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              &ldquo;We personally answer retreat inquiries so you enter our circle knowing exactly who will be holding space for you.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DFD7CA] shadow-xl card-3d-tilt">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mb-2">
              Send a Retreat Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#5B665D] mb-6">
              Fill in your details below to receive full cohort dates, accommodation photos, and payment information.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23]">
                  Namaste {formData.name || 'Friend'}!
                </h3>
                <p className="text-sm text-[#5B665D] max-w-md mx-auto">
                  Your inquiry has been lovingly received. Anmol &amp; Komal will review your preferences and get in touch with you shortly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full bg-stone-100 text-stone-700 text-xs uppercase tracking-wider font-semibold hover:bg-stone-200"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm text-[#1F2E23] focus:outline-none focus:ring-2 focus:ring-[#C67856]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91..."
                      className="w-full px-4 py-3 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm text-[#1F2E23] focus:outline-none focus:ring-2 focus:ring-[#C67856]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@domain.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm text-[#1F2E23] focus:outline-none focus:ring-2 focus:ring-[#C67856]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                      Select Retreat Package
                    </label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm text-[#1F2E23] focus:outline-none focus:ring-2 focus:ring-[#C67856]"
                    >
                      <option value="4 Days / 3 Nights Retreat">4 Days / 3 Nights Retreat</option>
                      <option value="5 Days / 4 Nights Retreat (Premium Experience)">5 Days / 4 Nights Retreat (Premium)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                      Room Preference
                    </label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm text-[#1F2E23] focus:outline-none focus:ring-2 focus:ring-[#C67856]"
                    >
                      <option value="Twin Sharing">Twin Sharing (Social &amp; Cost-Effective)</option>
                      <option value="Solo">Solo Private Room</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                    Your Questions or Intention
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what draws you to Shunya Sync, any dietary needs, or dates you prefer..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm text-[#1F2E23] focus:outline-none focus:ring-2 focus:ring-[#C67856]"
                  />
                </div>

                {/* Cloudflare Turnstile Anti-Bot Security */}
                <div className="pt-1">
                  <TurnstileWidget
                    theme="light"
                    action="contact-inquiry"
                    onVerify={() => {
                      setCaptchaVerified(true);
                      setCaptchaError(false);
                    }}
                  />
                  {captchaError && (
                    <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Please verify the anti-bot security check above before submitting.</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#1F2E23] hover:bg-[#152218] text-white shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Submit Retreat Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:w-auto px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold border border-[#25D366] text-[#25D366] hover:bg-[#E8F8EE] flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6 pt-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C67856] font-semibold">Common Queries</span>
          <h2 className="font-serif-display text-3xl font-normal text-[#1F2E23]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#DFD7CA] bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-[#1F2E23] font-serif-display text-lg font-bold hover:text-[#C67856] transition"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-[#C67856]" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-sm text-[#5B665D] leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
