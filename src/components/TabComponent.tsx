import React, { useState } from 'react';

interface TabComponentProps {}

const TabComponent: React.FC<TabComponentProps> = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="max-w-md mx-5 my-4">
      <div className="flex justify-start">
        <button
          className={`py-2 px-4 text-sm font-sans font-medium border border-gray-200 rounded-l-lg ${
            activeTab === 0 ? 'bg-gray-200' : 'bg-white-100'
          }`}
          onClick={() => handleTabClick(0)}
        >
          General
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border border-gray-200 ${
            activeTab === 1 ? 'bg-gray-200' : 'bg-white-100'
          }`}
          onClick={() => handleTabClick(1)}
        >
          Users
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border border-gray-200 ${
            activeTab === 2 ? 'bg-gray-200' : 'bg-white-100'
          }`}
          onClick={() => handleTabClick(2)}
        >
          Plan
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border border-gray-200 ${
            activeTab === 3 ? 'bg-gray-200' : 'bg-white-100'
          }`}
          onClick={() => handleTabClick(3)}
        >
          Billing
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border border-gray-200 rounded-r-lg ${
            activeTab === 4 ? 'bg-gray-200' : 'bg-white-100'
          }`}
          onClick={() => handleTabClick(4)}
        >
          Integration
        </button>
      </div>
    </div>
  );
};

export default TabComponent;
