import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

const Header = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, userProfile, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <Link to="/" className="text-xl font-bold text-foreground">
              TalentStrike
            </Link>
          </div>
        </div>

        {/* Center Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/executive-talent-acquisition-overview" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Executive Overview
          </Link>
          <Link 
            to="/recruitment-operations-command-center" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Operations Center
          </Link>
          <Link 
            to="/candidate-analytics-intelligence-hub" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Analytics Hub
          </Link>
          <Link 
            to="/gamification-performance-dashboard" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Performance
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium">New candidate application</p>
                    <p className="text-xs text-muted-foreground">Senior Software Engineer position</p>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium">Interview scheduled</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 2:00 PM</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Section */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {userProfile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">
                    {userProfile?.full_name || user?.email?.split('@')?.[0]}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {userProfile?.role?.replace('_', ' ') || 'User'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-semibold">{userProfile?.full_name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      <Settings className="w-4 h-4" />
                      <span>Preferences</span>
                    </button>
                  </div>
                  
                  <div className="p-2 border-t border-gray-200">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest User Section */
            (<div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>)
          )}

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Preview Mode Banner (for development) */}
      {!isAuthenticated && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-amber-800">
              🚀 Preview Mode - 
              <Link to="/login" className="font-semibold hover:underline ml-1">
                Login to access full features
              </Link>
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;