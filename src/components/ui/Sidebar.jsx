import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      label: 'Executive Overview',
      path: '/executive-talent-acquisition-overview',
      icon: 'TrendingUp',
      tooltip: 'Strategic talent acquisition insights and ROI analytics',
      description: 'C-suite dashboard with key performance indicators'
    },
    {
      label: 'Operations Center',
      path: '/recruitment-operations-command-center',
      icon: 'Command',
      tooltip: 'Real-time recruitment monitoring and team performance',
      description: 'Live operational metrics and team coordination'
    },
    {
      label: 'Candidate Intelligence',
      path: '/candidate-analytics-intelligence-hub',
      icon: 'Users',
      tooltip: 'Comprehensive candidate analytics and AI-driven insights',
      description: 'Deep candidate analysis and predictive modeling'
    },
    {
      label: 'Engagement Analytics',
      path: '/gamification-performance-dashboard',
      icon: 'Trophy',
      tooltip: 'Gamification performance tracking and engagement optimization',
      description: 'Performance gamification and engagement metrics'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-100 bg-card border-r border-border transition-all duration-300 ease-out ${
        isCollapsed ? 'w-16' : 'w-60'
      } hidden lg:block`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
                <p className="text-xs text-muted-foreground mt-1">Analytics Dashboard</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="ml-auto"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems?.map((item, index) => (
            <div
              key={item?.path}
              className="relative"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-analytics'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <div className={`flex-shrink-0 ${isActive(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  <Icon name={item?.icon} size={20} />
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{item?.label}</div>
                    <div className={`text-xs mt-0.5 ${
                      isActive(item?.path) 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground group-hover:text-foreground/80'
                    }`}>
                      {item?.description}
                    </div>
                  </div>
                )}

                {isActive(item?.path) && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-l-full"></div>
                )}
              </button>

              {/* Tooltip for collapsed state */}
              {isCollapsed && hoveredItem === index && (
                <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-analytics-lg z-200 min-w-max">
                  <div className="text-sm font-medium text-popover-foreground">{item?.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item?.description}</div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground">System Status</div>
                <div className="text-xs text-muted-foreground">All systems operational</div>
              </div>
            </div>
          </div>
        )}
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label?.split(' ')?.[0]}</span>
              {isActive(item?.path) && (
                <div className="w-1 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;