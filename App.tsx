
import React, { useState, useMemo } from 'react';
import { 
  Role, 
  Event, 
  Achievement, 
  BlogPost, 
  GalleryImage, 
  AdmissionSubmission, 
  Staff, 
  HeroConfig 
} from './types';
import { 
  MOCK_EVENTS, 
  MOCK_ACHIEVEMENTS, 
  MOCK_BLOGS, 
  MOCK_ADMISSIONS, 
  MOCK_HERO,
  MOCK_GALLERY,
  MENU_ITEMS
} from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Achievements from './pages/Achievements';
import Blogs from './pages/Blogs';
import Gallery from './pages/Gallery';
import Admissions from './pages/Admissions';
import StaffList from './pages/StaffList';
import Hero from './pages/Hero';
import LoginPage from './pages/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>(Role.SYSTEM_ADMIN);
  const [activeTab, setActiveTab] = useState('dashboard');

  // State Management (Mock)
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [achievements, setAchievements] = useState<Achievement[]>(MOCK_ACHIEVEMENTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [admissions, setAdmissions] = useState<AdmissionSubmission[]>(MOCK_ADMISSIONS);
  const [hero, setHero] = useState<HeroConfig>(MOCK_HERO);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>(MOCK_GALLERY);

  const handleLogin = (role: Role) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Filter menu items by role
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => item.roles.includes(currentRole));
  }, [currentRole]);

  // Role names for display
  const roleDisplay = {
    [Role.SYSTEM_ADMIN]: 'System Admin',
    [Role.CONTENT_EDITOR]: 'Content Editor',
    [Role.ADMISSIONS_VIEWER]: 'Admissions Viewer',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            events={events} 
            achievements={achievements} 
            blogs={blogs} 
            gallery={gallery} 
            admissions={admissions}
            role={currentRole}
          />
        );
      case 'events':
        return <Events events={events} setEvents={setEvents} role={currentRole} />;
      case 'achievements':
        return <Achievements achievements={achievements} setAchievements={setAchievements} role={currentRole} />;
      case 'blogs':
        return <Blogs blogs={blogs} setBlogs={setBlogs} role={currentRole} />;
      case 'gallery':
        return <Gallery gallery={gallery} setGallery={setGallery} role={currentRole} />;
      case 'admissions':
        return <Admissions admissions={admissions} role={currentRole} />;
      case 'staff':
        return <StaffList staff={staff} setStaff={setStaff} role={currentRole} />;
      case 'hero':
        return <Hero hero={hero} setHero={setHero} role={currentRole} />;
      default:
        return <div className="p-8">Section under development</div>;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#F7F9FC] text-[#0F172A] font-sans selection:bg-blue-100">
      {/* Sidebar */}
      <Sidebar 
        menuItems={filteredMenuItems} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={currentRole}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          currentRole={currentRole} 
          roleDisplay={roleDisplay}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
