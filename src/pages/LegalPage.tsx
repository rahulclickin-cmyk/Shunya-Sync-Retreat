import React, { useState } from 'react';
import { ShieldCheck, FileText, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { SiteConfig } from '../types/retreat';

export type LegalTab = 'privacy-policy' | 'terms-conditions' | 'cancellation-refund' | 'health-waiver';

interface LegalPageProps {
  initialTab?: LegalTab;
  config: SiteConfig;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy-policy', config }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  const tabs: { id: LegalTab; label: string; icon: React.ReactNode }[] = [
    { id: 'privacy-policy', label: 'Privacy Policy', icon: <Lock className="w-4 h-4" /> },
    { id: 'terms-conditions', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> },
    { id: 'cancellation-refund', label: 'Cancellation & Refund', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'health-waiver', label: 'Health & Medical Waiver', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-12 animate-section-flip">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7EFE9] text-[#C67856] text-xs font-semibold uppercase tracking-[0.2em] border border-[#E9D9CF]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency & Care</span>
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl font-normal text-[#1F2E23]">
          Legal Policies &amp; Guest Protections
        </h1>
        <p className="text-sm sm:text-base text-[#556057] font-light">
          We maintain absolute clarity and sacred respect for all guests participating in Shunya Sync Retreats.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-[#EFEAE1] rounded-2xl max-w-3xl mx-auto border border-[#DFD7CA]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              window.location.hash = `#${tab.id}`;
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-[#1F2E23] text-white shadow-md'
                : 'text-[#4A574C] hover:text-[#1F2E23] hover:bg-white/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area in 3D Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#DFD7CA] shadow-xl max-w-4xl mx-auto card-3d-tilt">
        {/* 1. PRIVACY POLICY */}
        {activeTab === 'privacy-policy' && (
          <div className="space-y-6 text-[#3E4A40] animate-fade-in">
            <div className="border-b border-[#EBE5DA] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#C67856] font-semibold">Legal Document</span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mt-1">
                Privacy Policy
              </h2>
              <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026 • Valid for {config.brandName}</p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">1. Information We Collect</h3>
              <p>
                When inquiring about or booking a retreat at <strong>{config.brandName}</strong>, we collect personal information including your full name, email address, WhatsApp telephone number, emergency contact details, dietary preferences (e.g. Sattvic, vegan, allergen alerts), and health-related disclosures necessary for safe yoga and sound therapy practice.
              </p>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">2. How We Use Your Information</h3>
              <p>Your confidential data is utilized solely for:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>Facilitating seamless retreat bookings and accommodation logistics in India.</li>
                <li>Direct communication regarding cohort itineraries, packing guides, and travel transfers.</li>
                <li>Ensuring facilitators Anmol Khatti and Komal Makhetra adapt sessions safely to your bodily requirements.</li>
                <li>Processing transactions and generating official reservation receipts.</li>
              </ul>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">3. Third-Party Sharing &amp; Data Security</h3>
              <p>
                We honor your privacy as sacred. We never sell, rent, or trade your personal data with third-party advertisers. Information is only shared with verified transport providers or catering facilitators directly involved in your stay.
              </p>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">4. Contact Our Data Compliance Team</h3>
              <p>
                For questions regarding your data or to request data erasure, contact us at{' '}
                <a href={`mailto:${config.contact.email}`} className="text-[#C67856] underline font-medium">
                  {config.contact.email}
                </a>{' '}
                or WhatsApp{' '}
                <span className="font-semibold text-[#1F2E23]">{config.contact.phone}</span>.
              </p>
            </div>
          </div>
        )}

        {/* 2. TERMS & CONDITIONS */}
        {activeTab === 'terms-conditions' && (
          <div className="space-y-6 text-[#3E4A40] animate-fade-in">
            <div className="border-b border-[#EBE5DA] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#C67856] font-semibold">Guest Agreement</span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mt-1">
                Terms &amp; Conditions
              </h2>
              <p className="text-xs text-stone-500 mt-1">Effective Date: October 2026</p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">1. Sacred Space &amp; Community Conduct</h3>
              <p>
                {config.brandName} is a sanctuary for inner peace, healing, and mindfulness. We operate an alcohol-free, non-smoking, and non-recreational drug policy throughout our property. All attendees agree to interact with fellow guests and instructors with empathy, dignity, and compassion.
              </p>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">2. Reservation &amp; Room Allocations</h3>
              <p>
                Bookings are secured upon payment of the reservation deposit. For Double Sharing packages (₹{(config?.pricing?.pkg2n3d?.twinPrice ?? 22000).toLocaleString()} for 2N/3D, ₹{(config?.pricing?.pkg3n4d?.twinPrice ?? 26000).toLocaleString()} for 3N/4D, or ₹{(config?.pricing?.pkg4n5d?.twinPrice ?? 44000).toLocaleString()} for 4N/5D), guests will be paired with an attendee of the same gender or designated roommate. Private accommodations are allocated on a first-confirmed basis.
              </p>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">3. Facilitator Schedule &amp; Changes</h3>
              <p>
                While our master schedule is carefully crafted, instructors Anmol Khatti and Komal Makhetra reserve the right to gently alter session timings due to mountain weather, seasonal conditions, or energy dynamics of the circle.
              </p>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">4. Photography &amp; Discretion</h3>
              <p>
                To preserve deep immersion and digital detox, photography during meditation and sound healing is restricted. Official gentle retreat photos taken by our retreat photographer will be shared with attendees with respectful consent.
              </p>
            </div>
          </div>
        )}

        {/* 3. CANCELLATION & REFUND */}
        {activeTab === 'cancellation-refund' && (
          <div className="space-y-6 text-[#3E4A40] animate-fade-in">
            <div className="border-b border-[#EBE5DA] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#C67856] font-semibold">Booking Flexibility</span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mt-1">
                Cancellation &amp; Refund Policy
              </h2>
              <p className="text-xs text-stone-500 mt-1">Clear &amp; Transparent Terms</p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Because our retreat cohort sizes are strictly capped at 10–14 participants to guarantee intimate, personalized care, cancellations directly impact the sanctuary logistics and kitchen preparation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0]">
                  <p className="text-xs uppercase font-bold text-emerald-800">30+ Days Prior</p>
                  <p className="text-2xl font-serif-display font-bold text-emerald-900 mt-1">80% Refund</p>
                  <p className="text-xs text-emerald-700 mt-1">Or 100% credit transfer to future cohort within 12 months.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A]">
                  <p className="text-xs uppercase font-bold text-amber-800">15–29 Days Prior</p>
                  <p className="text-2xl font-serif-display font-bold text-amber-900 mt-1">50% Refund</p>
                  <p className="text-xs text-amber-700 mt-1">Or transfer spot to a nominated friend or family member.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA]">
                  <p className="text-xs uppercase font-bold text-rose-800">Under 14 Days</p>
                  <p className="text-2xl font-serif-display font-bold text-rose-900 mt-1">Non-Refundable</p>
                  <p className="text-xs text-rose-700 mt-1">Due to upfront room, chef, and facilitator lock-ins.</p>
                </div>
              </div>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">Emergency Transfers</h3>
              <p>
                In cases of unforeseen medical emergencies or force majeure, guests may request a cohort date rollover by submitting documentation to{' '}
                <a href={`mailto:${config.contact.email}`} className="text-[#C67856] underline font-medium">
                  {config.contact.email}
                </a>.
              </p>
            </div>
          </div>
        )}

        {/* 4. HEALTH & MEDICAL WAIVER */}
        {activeTab === 'health-waiver' && (
          <div className="space-y-6 text-[#3E4A40] animate-fade-in">
            <div className="border-b border-[#EBE5DA] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#C67856] font-semibold">Participant Safety</span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mt-1">
                Health, Medical &amp; Liability Waiver
              </h2>
              <p className="text-xs text-stone-500 mt-1">Safety First for Every Participant</p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#C67856] shrink-0 mt-0.5" />
                <p className="text-xs text-[#9A3412] leading-relaxed">
                  <strong>Important Notice:</strong> Sound healing therapy utilizes powerful acoustic vibrations, and deep breathwork stimulates autonomic nervous system shifts. Please disclose any cardiovascular issues, recent surgeries, pregnancy, or epilepsy prior to sessions.
                </p>
              </div>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">1. Physical Fitness &amp; Voluntary Participation</h3>
              <p>
                I acknowledge that participation in physical yoga asanas, outdoor trail walks, breathwork, and dance movement is completely voluntary. I agree to listen to my body and rest or opt out of any practice whenever necessary.
              </p>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">2. Sound Healing &amp; Vibrational Precautions</h3>
              <p>
                I understand that acoustic singing bowls and gongs emit intense physical sonic waves. If I have a pacemaker, metal implants, or severe tinnitus, I will inform Anmol Khatti and Komal Makhetra so suitable distances and frequencies can be maintained.
              </p>

              <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">3. Release of Liability</h3>
              <p>
                By enrolling in {config.brandName}, I confirm that I am medically capable of attending, and I release the organizers, instructors, venue owners, and staff from liability for any personal injury or loss incurred during the retreat.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
