import React from 'react';

const Header = () => {
  const brandPink = "#D10043";

  const navItems = [
    {
      label: 'Dashboard',
      sublabel: 'Analytics & Overview',
      active: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      label: 'Screening',
      sublabel: 'Review Applications',
      badge: 89,
      active: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      label: 'Jobs',
      sublabel: 'Manage Positions',
      active: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-10 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Brand Section */}
      <div className="flex items-center space-x-3">
        <img src="src/assets/logo.png" alt="Mariwasa Logo" className="h-8 w-8 object-contain" />
        <div>
          <h1 className="text-sm font-bold leading-tight text-gray-900">HR Portal</h1>
          <p className="text-[10px] text-gray-400">Resume Analysis System</p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex items-center space-x-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            style={item.active ? { backgroundColor: brandPink } : {}}
            className={`px-6 py-2 rounded-xl transition-all flex flex-col items-center justify-center min-w-[140px] hover:shadow-sm ${
              item.active ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              {item.icon}
              <span className="text-xs font-bold">{item.label}</span>
              {item.badge && (
                <span 
                  className="text-[10px] px-1.5 py-0.5 rounded ml-1 font-bold"
                  style={item.active ? { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' } : { backgroundColor: '#F3F4F6', color: '#4B5563' }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[9px] ${item.active ? 'opacity-80' : 'text-gray-400'}`}>
              {item.sublabel}
            </span>
          </button>
        ))}
      </nav>

      {/* Admin Section */}
      <div className="flex items-center space-x-2 border border-gray-200 px-3 py-1.5 rounded-xl hover:shadow-sm transition-all cursor-pointer group">
        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center group-hover:bg-pink-50 transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-gray-400 group-hover:text-brand-pink" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = brandPink}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <span className="text-xs font-bold text-gray-700">HR Admin</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
};

export default Header;