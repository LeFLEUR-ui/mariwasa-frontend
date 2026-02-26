import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 antialiased font-['Inter',_sans-serif]">
      <header className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-8 w-8 object-contain" />
          <div>
            <h1 className="text-sm font-bold leading-tight">Resume Analysis System</h1>
            <p className="text-xs text-gray-500">AI-Powered Recruitment Platform</p>
          </div>
        </div>
        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-[#D10043] transition-colors">About</a>
          <a href="/careers" className="hover:text-[#D10043] transition-colors">Careers</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="mb-12">
          <div className="inline-block p-3 rounded-full border-transparent-200 mb-6 bg-transparent shadow-sm">
            <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-8 w-8 object-contain" />
          </div>
          <h2 className="text-5xl font-extrabold mb-4">
            Join <span className="text-[#D10043]">Mariwasa Siam Ceramics</span>
          </h2>
          <p className="text-gray-500 text-lg">Choose how you'd like to apply and start your career journey with us</p>
        </div>


        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto text-center">

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="text-[#D10043] mb-6 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Apply for Specific Job</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Browse our open positions and apply for a role that matches your skills and interests</p>
            <a href="/careers" className="w-full bg-[#D10043] hover:bg-[#b00038] text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
              <span>View Open Positions</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="text-[#D10043] mb-6 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">General Application</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Upload your resume and let our HR team match you with suitable positions</p>
            <button className="w-full bg-[#D10043] hover:bg-[#b00038] text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
              <span>Upload Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

 
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24 text-center">
          {[
            { title: "Professional Review", desc: "Our experienced HR team carefully reviews each application", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            { title: "Perfect Match", desc: "We match your skills and experience with suitable positions", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Status Updates", desc: "Track your application status and receive timely updates", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-[#D10043] mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                </svg>
              </div>
              <h4 className="font-bold mb-2">{feature.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed px-4">{feature.desc}</p>
            </div>
          ))}
        </div>

        <hr className="border-gray-100 mb-20" />

   
        <section className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-10 w-10 object-contain" />
          </div>
          <h2 className="text-3xl font-bold mb-4">About Mariwasa Siam Ceramics</h2>
          <p className="text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            Leading ceramic manufacturer committed to innovation, quality, and sustainable growth. 
            Join our team of professionals dedicated to excellence in ceramic technology.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-[#D10043] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-500 text-sm leading-relaxed">To revolutionize the ceramic industry through innovative products, sustainable practices, and exceptional talent acquisition.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-[#D10043] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                {['Competitive compensation packages', 'Professional development opportunities', 'Innovative work environment'].map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 text-[#D10043] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm">© 2025 Mariwasa Siam Ceramics Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;