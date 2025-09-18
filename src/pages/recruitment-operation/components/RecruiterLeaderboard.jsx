import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecruiterLeaderboard = () => {
  const [sortBy, setSortBy] = useState('applications');
  const [sortOrder, setSortOrder] = useState('desc');

  const recruiterData = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      role: 'Senior Technical Recruiter',
      applications: 89,
      interviews: 34,
      offers: 12,
      hireRate: 85,
      status: 'online',
      lastActive: '2 min ago'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Sales Recruiter',
      applications: 76,
      interviews: 28,
      offers: 9,
      hireRate: 78,
      status: 'online',
      lastActive: '5 min ago'
    },
    {
      id: 3,
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      role: 'Product Recruiter',
      applications: 67,
      interviews: 25,
      offers: 8,
      hireRate: 82,
      status: 'away',
      lastActive: '15 min ago'
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      role: 'Engineering Recruiter',
      applications: 92,
      interviews: 31,
      offers: 11,
      hireRate: 88,
      status: 'online',
      lastActive: '1 min ago'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      role: 'Operations Recruiter',
      applications: 54,
      interviews: 19,
      offers: 6,
      hireRate: 75,
      status: 'offline',
      lastActive: '2 hours ago'
    }
  ];

  const sortedData = [...recruiterData]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'offline':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'desc' ? 'ArrowDown' : 'ArrowUp';
  };

  return (
    <div className="analytics-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recruiter Performance</h3>
          <p className="text-sm text-muted-foreground">Real-time team activity and metrics</p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Export
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">Recruiter</span>
              </th>
              <th className="text-right py-3 px-2 cursor-pointer hover:bg-muted/50 rounded" onClick={() => handleSort('applications')}>
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">Applications</span>
                  <Icon name={getSortIcon('applications')} size={14} />
                </div>
              </th>
              <th className="text-right py-3 px-2 cursor-pointer hover:bg-muted/50 rounded" onClick={() => handleSort('interviews')}>
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">Interviews</span>
                  <Icon name={getSortIcon('interviews')} size={14} />
                </div>
              </th>
              <th className="text-right py-3 px-2 cursor-pointer hover:bg-muted/50 rounded" onClick={() => handleSort('offers')}>
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">Offers</span>
                  <Icon name={getSortIcon('offers')} size={14} />
                </div>
              </th>
              <th className="text-right py-3 px-2 cursor-pointer hover:bg-muted/50 rounded" onClick={() => handleSort('hireRate')}>
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">Hire Rate</span>
                  <Icon name={getSortIcon('hireRate')} size={14} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((recruiter, index) => (
              <tr key={recruiter?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <img 
                          src={recruiter?.avatar} 
                          alt={recruiter?.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(recruiter?.status)}`}></div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{recruiter?.name}</div>
                      <div className="text-xs text-muted-foreground">{recruiter?.role}</div>
                      <div className="text-xs text-muted-foreground">{recruiter?.lastActive}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="font-mono text-sm font-semibold text-foreground">{recruiter?.applications}</span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="font-mono text-sm font-semibold text-foreground">{recruiter?.interviews}</span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="font-mono text-sm font-semibold text-foreground">{recruiter?.offers}</span>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span className="font-mono text-sm font-semibold text-foreground">{recruiter?.hireRate}%</span>
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success rounded-full transition-all duration-300"
                        style={{ width: `${recruiter?.hireRate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterLeaderboard;