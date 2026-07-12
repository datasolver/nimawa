import React, { useState } from 'react';
import { UserCheck, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Member, Volunteer } from '../types';

export default function Register() {
  const [activeTab, setActiveTab] = useState<'membership' | 'volunteer'>('membership');
  const [membershipStep, setMembershipStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successMember, setSuccessMember] = useState<Member | null>(null);
  const [successVolunteer, setSuccessVolunteer] = useState<Volunteer | null>(null);

  // --- Membership State ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<'Single' | 'Married' | 'Divorced' | 'Widowed'>('Single');
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('WA');

  const [occupation, setOccupation] = useState('');
  const [profession, setProfession] = useState('');
  const [stateOfOrigin, setStateOfOrigin] = useState('');

  const [isRevert, setIsRevert] = useState(false);
  const [mosqueAttended, setMosqueAttended] = useState('');
  const [quranClassInterest, setQuranClassInterest] = useState(false);

  const [spouseName, setSpouseName] = useState('');
  const [childrenDetails, setChildrenDetails] = useState('');

  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [agreement, setAgreement] = useState(false);

  // --- Volunteer State ---
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volSkills, setVolSkills] = useState('');
  const [volAvailability, setVolAvailability] = useState('');
  const [volInterests, setVolInterests] = useState('');
  const [volExperience, setVolExperience] = useState('');
  const [volConsent, setVolConsent] = useState(false);

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreement) return;

    setLoading(true);
    const payload = {
      firstName,
      lastName,
      gender,
      dob,
      maritalStatus,
      email,
      phone,
      address,
      city,
      state,
      occupation,
      profession,
      stateOfOrigin,
      isRevert,
      mosqueAttended,
      quranClassInterest,
      spouseName,
      childrenDetails,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone
    };

    fetch('/api/members/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessMember(data.member);
          // reset form
          setFirstName('');
          setLastName('');
          setDob('');
          setEmail('');
          setPhone('');
          setAddress('');
          setCity('');
          setOccupation('');
          setProfession('');
          setStateOfOrigin('');
          setMosqueAttended('');
          setSpouseName('');
          setChildrenDetails('');
          setEmergencyContactName('');
          setEmergencyContactRelation('');
          setEmergencyContactPhone('');
          setAgreement(false);
          setMembershipStep(1);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volConsent) return;

    setLoading(true);
    const skillsArray = volSkills.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      fullName: volName,
      email: volEmail,
      phone: volPhone,
      skills: skillsArray,
      availability: volAvailability,
      interests: volInterests,
      experience: volExperience,
      backgroundConsent: volConsent
    };

    fetch('/api/volunteers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessVolunteer(data.volunteer);
          // reset form
          setVolName('');
          setVolEmail('');
          setVolPhone('');
          setVolSkills('');
          setVolAvailability('');
          setVolInterests('');
          setVolExperience('');
          setVolConsent(false);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="register-page">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Community Portals
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            NiMAWA Registrations
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Register as an official association member or sign up to join our volunteer network for upcoming events.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Toggle navigation Tab bar */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-2 justify-center mb-8 max-w-md mx-auto">
          <button
            onClick={() => {
              setActiveTab('membership');
              setSuccessMember(null);
              setSuccessVolunteer(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'membership'
                ? 'bg-emerald-900 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            id="tab-membership-btn"
          >
            <UserCheck className="w-4 h-4" />
            Join Association
          </button>
          <button
            onClick={() => {
              setActiveTab('volunteer');
              setSuccessMember(null);
              setSuccessVolunteer(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'volunteer'
                ? 'bg-emerald-900 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            id="tab-volunteer-btn"
          >
            <HeartHandshake className="w-4 h-4" />
            Volunteer Network
          </button>
        </div>

        {/* 1. MEMBERSHIP REGISTRATION FORM */}
        {activeTab === 'membership' && (
          <div className="space-y-6">
            {successMember ? (
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 text-center space-y-6" id="member-success-panel">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">Registration Successful!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Alhamdulillah! Your membership application has been received. Your generated Member ID is: <code className="bg-slate-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded">{successMember.id}</code>
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    A confirmation welcome letter has been sent to your email address: <strong>{successMember.email}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setSuccessMember(null)}
                  className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all"
                  id="register-another-member-btn"
                >
                  Register Another Family Member
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6" id="member-wizard-container">
                {/* Steps indicator bar */}
                <div className="flex items-center justify-between border-b pb-4 text-xs font-semibold text-slate-400">
                  <span className={membershipStep === 1 ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-4 -mb-4.5' : ''}>1. Personal Info</span>
                  <span className={membershipStep === 2 ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-4 -mb-4.5' : ''}>2. Background & Islamic Info</span>
                  <span className={membershipStep === 3 ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-4 -mb-4.5' : ''}>3. Family & Emergency</span>
                  <span className={membershipStep === 4 ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-4 -mb-4.5' : ''}>4. Review & Consent</span>
                </div>

                <form onSubmit={handleMemberSubmit} className="space-y-6 pt-4">
                  {/* STEP 1: Personal and Contact */}
                  {membershipStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">First Name *</label>
                          <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Abdul-Hameed" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Last Name *</label>
                          <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Olayinka" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gender *</label>
                          <select value={gender} onChange={(e) => setGender(e.target.value as 'Male' | 'Female')} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date of Birth *</label>
                          <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Marital Status *</label>
                          <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors">
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
                          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. hameed@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number *</label>
                          <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +61 412 345 678" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-span-6">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Residential Address *</label>
                          <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 15 Islamic Center Way" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">City / Suburb *</label>
                          <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Perth" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">State *</label>
                          <select value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors">
                            <option value="WA">WA</option>
                            <option value="NSW">NSW</option>
                            <option value="VIC">VIC</option>
                            <option value="QLD">QLD</option>
                            <option value="SA">SA</option>
                            <option value="TAS">TAS</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button type="button" onClick={() => setMembershipStep(2)} className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5" id="wizard-step1-next">
                          Next Section
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Background and Islamic Info */}
                  {membershipStep === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Occupation *</label>
                          <input type="text" required value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="e.g. Software Developer" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Profession *</label>
                          <input type="text" required value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="e.g. Information Technology" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nigerian State of Origin *</label>
                          <input type="text" required value={stateOfOrigin} onChange={(e) => setStateOfOrigin(e.target.value)} placeholder="e.g. Lagos State" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                        <h4 className="font-bold text-[10px] text-emerald-950 uppercase tracking-wider">Islamic Preferences</h4>
                        
                        <div className="flex items-center gap-2 pt-1">
                          <input type="checkbox" checked={isRevert} onChange={(e) => setIsRevert(e.target.checked)} className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-850" id="isRevert-checkbox" />
                          <label htmlFor="isRevert-checkbox" className="text-xs text-slate-600 font-semibold select-none">Are you a Revert (New Muslim)?</label>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Local Mosque / Prayer Venue Attended *</label>
                          <input type="text" required value={mosqueAttended} onChange={(e) => setMosqueAttended(e.target.value)} placeholder="e.g. Perth Mosque / Cannington Prayer Hall" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <input type="checkbox" checked={quranClassInterest} onChange={(e) => setQuranClassInterest(e.target.checked)} className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-850" id="quran-interest-checkbox" />
                          <label htmlFor="quran-interest-checkbox" className="text-xs text-slate-600 font-semibold select-none">Are you or your children interested in Online Quran Academy classes?</label>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button type="button" onClick={() => setMembershipStep(1)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <button type="button" onClick={() => setMembershipStep(3)} className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5" id="wizard-step2-next">
                          Next Section
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Family and Emergency Contact */}
                  {membershipStep === 3 && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                        <h4 className="font-bold text-[10px] text-emerald-950 uppercase tracking-wider">Family Details (Optional)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Spouse's Name (If Married)</label>
                            <input type="text" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} placeholder="e.g. Mariam Olayinka" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Children Names & Ages</label>
                            <input type="text" value={childrenDetails} onChange={(e) => setChildrenDetails(e.target.value)} placeholder="e.g. Aishah (4), Ibrahim (2)" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                        <h4 className="font-bold text-[10px] text-emerald-950 uppercase tracking-wider">Emergency Contact Person *</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Name *</label>
                            <input type="text" required value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} placeholder="e.g. Yusuf Olayinka" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Relationship *</label>
                            <input type="text" required value={emergencyContactRelation} onChange={(e) => setEmergencyContactRelation(e.target.value)} placeholder="e.g. Brother" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Phone *</label>
                            <input type="text" required value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} placeholder="e.g. +61 498 765 432" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button type="button" onClick={() => setMembershipStep(2)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <button type="button" onClick={() => setMembershipStep(4)} className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5" id="wizard-step3-next">
                          Review Application
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Review and Consent */}
                  {membershipStep === 4 && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 rounded-xl p-5 border text-xs text-slate-600 space-y-3">
                        <h4 className="font-serif font-bold text-slate-900 text-sm border-b pb-2 mb-2">Review Form Summary</h4>
                        <div className="grid grid-cols-2 gap-y-1.5">
                          <span><strong>Full Name:</strong></span> <span className="text-right text-slate-900">{firstName} {lastName} ({gender})</span>
                          <span><strong>Date of Birth:</strong></span> <span className="text-right text-slate-900">{dob}</span>
                          <span><strong>Email:</strong></span> <span className="text-right text-slate-900">{email}</span>
                          <span><strong>Phone:</strong></span> <span className="text-right text-slate-900">{phone}</span>
                          <span><strong>Address:</strong></span> <span className="text-right text-slate-900 truncate">{address}, {city}</span>
                          <span><strong>State of Origin:</strong></span> <span className="text-right text-slate-900">{stateOfOrigin}</span>
                          <span><strong>Quran academy Interest:</strong></span> <span className="text-right text-emerald-850 font-bold">{quranClassInterest ? 'Yes' : 'No'}</span>
                        </div>
                      </div>

                      {/* Consent check */}
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3 text-xs">
                        <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-emerald-950 mb-1">NiMAWA Constitutional Pledge</p>
                          <p className="leading-relaxed text-slate-700">
                            I hereby pledge to abide by the constitution, values, and local WA laws as a recognized member of NiMAWA. I consent to receive official community bulletins and event announcements.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input type="checkbox" required checked={agreement} onChange={(e) => setAgreement(e.target.checked)} className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-850" id="agree-check" />
                        <label htmlFor="agree-check" className="text-xs text-slate-600 font-semibold select-none">I agree to the constitution pledge and verify the details listed above are accurate *</label>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button type="button" onClick={() => setMembershipStep(3)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <button type="submit" disabled={!agreement || loading} className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5" id="submit-member-btn">
                          {loading ? 'Submitting Form...' : 'Complete Registration'}
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            )}
          </div>
        )}

        {/* 2. VOLUNTEER REGISTRATION FORM */}
        {activeTab === 'volunteer' && (
          <div className="space-y-6">
            {successVolunteer ? (
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 text-center space-y-6" id="volunteer-success-panel">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">Volunteer Application Logged!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Jazakallah Khair, <strong>{successVolunteer.fullName}</strong>! Your details are stored in our Volunteer Coordination Registry.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    A welcoming mail has been sent to your inbox: <strong>{successVolunteer.email}</strong>. Our Event Coordinator will contact you shortly!
                  </p>
                </div>
                <button
                  onClick={() => setSuccessVolunteer(null)}
                  className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all"
                  id="reset-volunteer-btn"
                >
                  Join Volunteer Network
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Volunteer Coordination Signup</h3>
                  <p className="text-xs text-slate-500 mt-1">Join hands in organizing community joint Iftars, Eid bouncy castles, and welfare aid setups.</p>
                </div>

                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name *</label>
                      <input type="text" required value={volName} onChange={(e) => setVolName(e.target.value)} placeholder="e.g. Suleiman Adesina" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
                      <input type="email" required value={volEmail} onChange={(e) => setVolEmail(e.target.value)} placeholder="e.g. suleiman@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number *</label>
                      <input type="text" required value={volPhone} onChange={(e) => setVolPhone(e.target.value)} placeholder="e.g. +61 455 667 788" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Skills * <span className="text-[9px] font-normal text-slate-400">(Comma separated)</span></label>
                    <input type="text" required value={volSkills} onChange={(e) => setVolSkills(e.target.value)} placeholder="e.g. Logistics, Event Planning, Teaching, Audio-Visual, Catering" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Availability *</label>
                      <input type="text" required value={volAvailability} onChange={(e) => setVolAvailability(e.target.value)} placeholder="e.g. Weekends, Friday evening, flexible" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Main Event Interests *</label>
                      <input type="text" required value={volInterests} onChange={(e) => setVolInterests(e.target.value)} placeholder="e.g. Ramadan joint Iftar setup, Eid welfare kit distribution" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Previous Experience (Optional)</label>
                    <textarea rows={3} value={volExperience} onChange={(e) => setVolExperience(e.target.value)} placeholder="Describe any previous humanitarian, mosque volunteer, or catering setups you have joined..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"></textarea>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" required checked={volConsent} onChange={(e) => setVolConsent(e.target.checked)} className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-850" id="vol-consent" />
                    <label htmlFor="vol-consent" className="text-xs text-slate-600 font-semibold select-none">I consent to a basic community background check and verify the details provided are accurate *</label>
                  </div>

                  <div className="pt-4">
                    <button type="submit" disabled={!volConsent || loading} className="w-full py-3 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center justify-center gap-1.5" id="submit-volunteer-btn">
                      <HeartHandshake className="w-4 h-4 text-amber-400" />
                      {loading ? 'Submitting Form...' : 'Join NiMAWA Volunteers'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
