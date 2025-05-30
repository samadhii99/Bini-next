'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

 const [selectedLocation, setSelectedLocation] = useState("Choose Location");
 const [selectedArea, setSelectedArea] = useState("Entire Area");
 const [selectedCategory, setSelectedCategory] = useState("All Categories");
 const [openDropdown, setOpenDropdown] = useState<"location" | "area" | "category" | null>(null);


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

  return (
    <div className="min-h-screen bg-peach">
      {/* Header */}
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
                }}
                >
                 English
               </div>
                <div className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                 onClick={() => {
                 setSelectedLanguage('Sinhala');
                 setShowLanguageDropdown(false);
                }}
                 >
               Sinhala
               </div>
             <div className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
               onClick={() => {
              setSelectedLanguage('Tamil');
              setShowLanguageDropdown(false);
              }}
               >
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-13 ">
          <h1 className="hero-title">
            Redefining product discovery
          </h1>

          {/* Shop Icons */}
          <div className="flex justify-center items-center mb-14">
            <img src="/img/Shop-removebg-preview.png" alt="Antique shop" className="object-contain shop-image" />
          </div>

          {/* Search Section */}
          <div className="max-w-2x1 mx-auto">
            <div className="relative mb-10 search-container ">
              <input
                type="text"
                placeholder="I'm looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Filter Options */}
            <div className="flex justify-center space-x-8 text-gray-700 mb-10 relative z-20">
  
             {/* Location Filter */}
<div className="relative">
  <button
     className={`filter-button ${openDropdown === 'location' ? 'active' : ''}`}
    onClick={() =>setOpenDropdown(openDropdown === 'location' ? null : 'location')}
  >
    <img src="/img/weui_location-filled.png" alt="location" className="filter-icon" />
    <span>{selectedLocation}</span>
    <div className="filter-divider"></div>
    <img src="/img/fe_arrow-down.png" alt="dropdown" className="filter-arrow" />
  </button>

  {openDropdown === 'location' && (
    <div className="dropdown-menu">
      {['Bandarawela', 'Badulla', 'Balangoda'].map((loc) => (
  <div
    key={loc}
    className={`dropdown-item ${selectedLocation === loc ? 'dropdown-item-selected' : ''}`}
    onClick={() => {
      setSelectedLocation(loc);
      setOpenDropdown(null);
    }}
  >
    <img src="/img/location-drop.png" alt="icon" className="dropdown-icon" />
    <span>{loc}</span>
  </div>
))}

    </div>
  )}
</div>

{/* Area Filter */}
<div className="relative">
  <button
    className={`filter-button ${openDropdown === 'area' ? 'active' : ''}`}
    onClick={() =>setOpenDropdown(openDropdown === 'area' ? null : 'area')}
  >
    <img src="/img/bxs_area.png" alt="area" className="filter-icon" />
    <span>{selectedArea}</span>
    <div className="filter-divider"></div>
    <img src="/img/fe_arrow-down.png" alt="dropdown" className="filter-arrow" />
  </button>

  {openDropdown === 'area' && (
    <div className="dropdown-menu">
      {['+10 mi', '+20 mi', '+100 mi'].map((area) => (
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
    onClick={() =>setOpenDropdown(openDropdown === 'category' ? null : 'category')}
  >
    <img src="/img/bxs_category.png" alt="category" className="filter-icon" />
    <span>{selectedCategory}</span>
    <div className="filter-divider"></div>
    <img src="/img/fe_arrow-down.png" alt="dropdown" className="filter-arrow" />
  </button>

  {openDropdown === 'category' && (
    <div className="dropdown-menu">
      {['Tech', 'Fashion', 'Beauty'].map((cat) => (
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


            {/* Quick Links */}
            <div className="mt-6 flex justify-center items-center space-x-3 text-sm text-gray-600 ">
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
    </div>
  );
};

export default HomePage;
