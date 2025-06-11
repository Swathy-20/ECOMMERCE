import { useState } from 'react';
import {UserProfileSidebar} from '../../components/user/UserProfileSidebar';
import {UserHeader} from '../../components/user/UserHeader';

export const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const renderSection = () => {
    switch(activeSection) {
      case 'personal':
        return <div className="p-4">Personal Information </div>;
      case 'orders':
        return <div className="p-4">Orders History </div>;
    
      case 'settings':
        return <div className="p-4">Account Settings </div>;
      default:
        return <div className="p-4">Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <div className="flex">
        <UserProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 p-4">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};


