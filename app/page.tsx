'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './mobile.css';
import './mobile-search-modal.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Desktop filters
  const [selectedLocation, setSelectedLocation] = useState("Choose Location");
  const [selectedArea, setSelectedArea] = useState("Entire Area");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [openDropdown, setOpenDropdown] = useState<"location" | "area" | "category" | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  // Modal states
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [modalSelectedLocation, setModalSelectedLocation] = useState("Choose Location");
  const [modalSelectedArea, setModalSelectedArea] = useState("Entire Area");
  const [modalSelectedCategory, setModalSelectedCategory] = useState("All Categories");
  const [modalOpenDropdown, setModalOpenDropdown] = useState<"location" | "area" | "category" | null>(null);
  const [modalLocationSearch, setModalLocationSearch] = useState('');
  const [modalShowLocationSearch, setModalShowLocationSearch] = useState(false);

  // Refs
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Add this locations array (you can expand this list)
  const locations = ['Bandarawela', 'Badulla', 'Balangoda'];

  // Filter locations based on search
  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const modalFilteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(modalLocationSearch.toLowerCase())
  );

  const areas = ['+10 mi', '+20 mi', '+100 mi'];
  const categoryOptions = ['Tech', 'Fashion', 'Beauty'];

  const categories = [
    { image: '/img/tec.png' },
    { image: '/img/home.png' },
    { image: '/img/Beauty.png' },
    { image: '/img/Fashion.png' },
    { image: '/img/Stationery.png' },
    { image: '/img/Kids.png' },
    { image: '/img/Health.png' },
    { image: '/img/Grocery.png' }
  ];

  const quickLinks = ['Tech', 'Home', 'Kids', 'Fashion'];

  // Check if mobile view
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle search input click on mobile
  const handleSearchInputClick = () => {
    if (isMobile) {
      setShowMobileModal(true);
      // Sync current values to modal
      setModalSearchQuery(searchQuery);
      setModalSelectedLocation(selectedLocation);
      setModalSelectedArea(selectedArea);
      setModalSelectedCategory(selectedCategory);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowMobileModal(false);
    setModalOpenDropdown(null);
    setModalShowLocationSearch(false);
    setModalLocationSearch('');
  };

  // Handle form submission
  const handleModalSubmit = () => {
    // Sync modal values back to main state
    setSearchQuery(modalSearchQuery);
    setSelectedLocation(modalSelectedLocation);
    setSelectedArea(modalSelectedArea);
    setSelectedCategory(modalSelectedCategory);
    
    // Close modal
    handleModalClose();
    
    // Here you can add your search logic
    console.log('Search submitted:', {
      query: modalSearchQuery,
      location: modalSelectedLocation,
      area: modalSelectedArea,
      category: modalSelectedCategory
    });
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        // Check if click is on the backdrop
        if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
          handleModalClose();
        }
      }
    };

    if (showMobileModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showMobileModal]);

  // Handle location dropdown in modal
  const handleModalLocationClick = () => {
    if (!modalShowLocationSearch) {
      setModalShowLocationSearch(true);
      setModalOpenDropdown('location');
      setModalLocationSearch('');
    }
  };

  const handleModalLocationSelect = (location: string) => {
    setModalSelectedLocation(location);
    setModalOpenDropdown(null);
    setModalShowLocationSearch(false);
    setModalLocationSearch('');
  };

  return (
    <div className="min-h-screen bg-peach">
      {/* Header */}
      <div className="fixed-header-container">
        <div className="page-container"></div>
        <header className="bg-red-500 text-white px-6 py-4 header-offset">
          <div className="max-w-7xl mx-2 flex items-center justify-between">
            <div className="custom-title">
              BINI'S
            </div>

            <div className="flex items-center space-x-4">
              {/*Language Dropdown*/}
              <div className="relative">
                <div className="flex items-center space-x-2 language-selector cursor-pointer" onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
                  <span>{selectedLanguage.slice(0, 3)}</span>
                  <img src="/img/eva_arrow-down-fill.png" alt="dropdown" className="w-4 h-4" />
                </div>

                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-lg z-10">
                    <div className="language-dropdown">
                      <div className="py-2 text-center text-black">
                        <div className="px-4 py-2 hover:bg-orange-100 cursor-pointer" onClick={() => {
                          setSelectedLanguage('English');
                          setShowLanguageDropdown(false);
                        }}>
                          English
                        </div>
                        <div className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                          onClick={() => {
                            setSelectedLanguage('Sinhala');
                            setShowLanguageDropdown(false);
                          }}>
                          Sinhala
                        </div>
                        <div className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                          onClick={() => {
                            setSelectedLanguage('Tamil');
                            setShowLanguageDropdown(false);
                          }}>
                          Tamil
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-org-500 hover:bg-red-300 transition-colors login-button">
                Login
              </button>

              <button className="hover:bg-red-700 transition-colors signup-button">
                Sign up
              </button>

              <div className="rounded-full flex items-center justify-center profile-avatar">
                <img src="/img/Ellipse 1.png" alt="user profile" className="rounded-full" />
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-13">
          <h1 className="hero-title">
            Redefining product discovery
          </h1>

          {/* Shop Icons */}
          <div className="flex justify-center items-center mb-14">
            <img src="/img/Shop-removebg-preview.png" alt="Antique shop" className="object-contain shop-image" />
          </div>

          {/* Search Section */}
          <div className="max-w-2x1 mx-auto">
            <div className="relative mb-10 search-container">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="I'm looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={handleSearchInputClick}
                readOnly={isMobile}
                className="focus:outline-none bg-transparent border-none search-input"
              />

              <button className="custom-button-size absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors">
                <img
                  src="/img/majesticons_search-line.png"
                  alt="search"
                  className="w-[32px] h-[32px]"
                />
              </button>
            </div>

            {/* Filter Options - Desktop Only */}
            {!isMobile && (
              <div className="flex justify-center space-x-8 text-gray-700 mb-10 relative z-20">
                {/* Location Filter */}
                <div className="relative">
                  {!showLocationSearch ? (
                    <button
                      className={`filter-button ${openDropdown === 'location' ? 'active' : ''}`}
                      onClick={() => {
                        setShowLocationSearch(true);
                        setOpenDropdown('location');
                        setLocationSearch('');
                      }}
                    >
                      <img src="/img/weui_location-filled.png" alt="location" className="filter-icon" />
                      <span>{selectedLocation}</span>
                      <div className="filter-divider"></div>
                      <img src="/img/fe_arrow-down.png" alt="dropdown" className="filter-arrow" />
                    </button>
                  ) : (
                    <div className="filter-button active">
                      <img src="/img/weui_location-filled.png" alt="location" className="filter-icon" />
                      <input
                        type="text"
                        placeholder="Search location..."
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        className="search-input"
                        autoFocus
                        onBlur={() => {
                          setTimeout(() => {
                            if (!locationSearch && selectedLocation === "Choose Location") {
                              setShowLocationSearch(false);
                              setOpenDropdown(null);
                            }
                          }, 200);
                        }}
                      />
                      <div className="filter-divider"></div>
                      <button
                        onClick={() => {
                          setShowLocationSearch(false);
                          setOpenDropdown(null);
                          setLocationSearch('');
                        }}
                        className="search-close-button"
                      >
                        <img src="/img/fe_arrow-down.png" alt="close" className="filter-arrow rotate-180" />
                      </button>
                    </div>
                  )}

                  {openDropdown === 'location' && showLocationSearch && (
                    <div className="dropdown-menu">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((loc) => (
                          <div
                            key={loc}
                            className={`dropdown-item ${selectedLocation === loc ? 'dropdown-item-selected' : ''}`}
                            onClick={() => {
                              setSelectedLocation(loc);
                              setOpenDropdown(null);
                              setShowLocationSearch(false);
                              setLocationSearch('');
                            }}
                          >
                            <img src="/img/location-drop.png" alt="icon" className="dropdown-icon" />
                            <span>{loc}</span>
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-item text-gray-500">
                          No locations found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Area Filter */}
                <div className="relative">
                  <button
                    className={`filter-button ${openDropdown === 'area' ? 'active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === 'area' ? null : 'area')}
                  >
                    <img src="/img/bxs_area.png" alt="area" className="filter-icon" />
                    <span>{selectedArea}</span>
                    <div className="filter-divider"></div>
                    <img src="/img/fe_arrow-down.png" alt="dropdown" className="filter-arrow" />
                  </button>

                  {openDropdown === 'area' && (
                    <div className="dropdown-menu">
                      {areas.map((area) => (
                        <div
                          key={area}
                          className={`dropdown-item ${selectedArea === area ? 'dropdown-item-selected' : ''}`}
                          onClick={() => {
                            setSelectedArea(area);
                            setOpenDropdown(null);
                          }}
                        >
                          <img src="/img/bxs_area-drop.png" alt="icon" className="dropdown-icon" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <button
                    className={`filter-button ${openDropdown === 'category' ? 'active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                  >
                    <img src="/img/bxs_category.png" alt="category" className="filter-icon" />
                    <span>{selectedCategory}</span>
                    <div className="filter-divider"></div>
                    <img src="/img/fe_arrow-down.png" alt="dropdown" className="filter-arrow" />
                  </button>

                  {openDropdown === 'category' && (
                    <div className="dropdown-menu">
                      {categoryOptions.map((cat) => (
                        <div
                          key={cat}
                          className={`dropdown-item ${selectedCategory === cat ? 'dropdown-item-selected' : ''}`}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setOpenDropdown(null);
                          }}
                        >
                          <img src="/img/bxs_category-drop.png" alt="icon" className="dropdown-icon" />
                          <span>{cat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="mt-6 flex justify-center items-center space-x-3 text-sm text-gray-600">
              <span className="try-this-label">Try this:</span>
              {quickLinks.map((link, index) => (
                <button key={index} className="quick-link-button">
                  {link}
                </button>
              ))}
              <button className="custom-see-more-button">See more...</button>
            </div>
          </div>
        </div>

        {/* Shop by Category */}
        <section className="mt-22">
          <h2 className="shop-by-category-title">Shop by Category</h2>

          <div className="custom-category-container">
            <div className="grid grid-cols-4 gap-10">
              {categories.map((category, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer group">
                  <img
                    src={category.image}
                    className="w-200 h-200 object-cover rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Search Modal */}
      {showMobileModal && (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center">
          <div 
            ref={modalRef}
            className="mobile-search-modal bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{ marginTop: '10vh' }}
          >
            {/* Modal Header */}
            <div className="modal-header p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
              </div>
            </div>

            {/* Modal Content */}
            <div className="modal-content p-6 space-y-6">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="I'm looking for..."
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  autoFocus
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src="/img/majesticons_search-line.png" alt="search" className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Filters */}
              <div className="space-y-4">
                {/* Location Filter */}
                <div className="relative">
                  
                  
                  {!modalShowLocationSearch ? (
                    <button
                      onClick={handleModalLocationClick}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img src="/img/weui_location-filled.png" alt="location" className="w-5 h-5" />
                        <span className="text-gray-900">{modalSelectedLocation}</span>
                      </div>
                      <img src="/img/fe_arrow-down.png" alt="dropdown" className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-between px-4 py-3 border-2 border-red-500 rounded-xl bg-red-50">
                      <div className="flex items-center space-x-3 flex-1">
                        <img src="/img/weui_location-filled.png" alt="location" className="w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search location..."
                          value={modalLocationSearch}
                          onChange={(e) => setModalLocationSearch(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-gray-900"
                          autoFocus
                        />
                      </div>
                      <button
                        onClick={() => {
                          setModalShowLocationSearch(false);
                          setModalOpenDropdown(null);
                          setModalLocationSearch('');
                        }}
                        className="ml-2"
                      >
                        <img src="/img/fe_arrow-down.png" alt="close" className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  )}

                  {modalOpenDropdown === 'location' && modalShowLocationSearch && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                      {modalFilteredLocations.length > 0 ? (
                        modalFilteredLocations.map((loc) => (
                          <div
                            key={loc}
                            className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                              modalSelectedLocation === loc ? 'bg-red-50 text-red-600' : 'text-gray-900'
                            }`}
                            onClick={() => handleModalLocationSelect(loc)}
                          >
                            <img src="/img/location-drop.png" alt="icon" className="w-4 h-4" />
                            <span>{loc}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-3 px-4 py-3 text-gray-500">
                          <span>No locations found</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Area Filter */}
                <div className="relative">
                  
                  <button
                    onClick={() => setModalOpenDropdown(modalOpenDropdown === 'area' ? null : 'area')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src="/img/bxs_area.png" alt="area" className="w-5 h-5" />
                      <span className="text-gray-900">{modalSelectedArea}</span>
                    </div>
                    <img src="/img/fe_arrow-down.png" alt="dropdown" className="w-4 h-4" />
                  </button>

                  {modalOpenDropdown === 'area' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      {areas.map((area) => (
                        <div
                          key={area}
                          className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                            modalSelectedArea === area ? 'bg-red-50 text-red-600' : 'text-gray-900'
                          }`}
                          onClick={() => {
                            setModalSelectedArea(area);
                            setModalOpenDropdown(null);
                          }}
                        >
                          <img src="/img/bxs_area-drop.png" alt="icon" className="w-4 h-4" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Filter */}
                <div className="relative">
                  
                  <button
                    onClick={() => setModalOpenDropdown(modalOpenDropdown === 'category' ? null : 'category')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src="/img/bxs_category.png" alt="category" className="w-5 h-5" />
                      <span className="text-gray-900">{modalSelectedCategory}</span>
                    </div>
                    <img src="/img/fe_arrow-down.png" alt="dropdown" className="w-4 h-4" />
                  </button>

                  {modalOpenDropdown === 'category' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      {categoryOptions.map((cat) => (
                        <div
                          key={cat}
                          className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                            modalSelectedCategory === cat ? 'bg-red-50 text-red-600' : 'text-gray-900'
                          }`}
                          onClick={() => {
                            setModalSelectedCategory(cat);
                            setModalOpenDropdown(null);
                          }}
                        >
                          <img src="/img/bxs_category-drop.png" alt="icon" className="w-4 h-4" />
                          <span>{cat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleModalSubmit}
                className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;