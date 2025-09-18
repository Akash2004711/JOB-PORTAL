import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobPerformanceGrid = () => {
  const [viewMode, setViewMode] = useState('grid');

  const jobData = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      posted: new Date('2024-09-01'),
      applications: 234,
      shortlisted: 28,
      interviewed: 12,
      offers: 3,
      conversionRate: 12.0,
      status: 'active',
      urgency: 'high',
      recruiter: 'Sarah Chen',
      daysOpen: 17
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      posted: new Date('2024-08-28'),
      applications: 189,
      shortlisted: 31,
      interviewed: 15,
      offers: 2,
      conversionRate: 16.4,
      status: 'active',
      urgency: 'medium',
      recruiter: 'Marcus Rodriguez',
      daysOpen: 21
    },
    {
      id: 3,
      title: 'Sales Director',
      department: 'Sales',
      location: 'Chicago, IL',
      posted: new Date('2024-09-05'),
      applications: 156,
      shortlisted: 19,
      interviewed: 8,
      offers: 1,
      conversionRate: 12.2,
      status: 'active',
      urgency: 'critical',
      recruiter: 'Emily Watson',
      daysOpen: 13
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      posted: new Date('2024-08-25'),
      applications: 198,
      shortlisted: 24,
      interviewed: 10,
      offers: 4,
      conversionRate: 12.1,
      status: 'active',
      urgency: 'medium',
      recruiter: 'David Kim',
      daysOpen: 24
    },
    {
      id: 5,
      title: 'UX Designer',
      department: 'Design',
      location: 'Seattle, WA',
      posted: new Date('2024-09-08'),
      applications: 267,
      shortlisted: 35,
      interviewed: 18,
      offers: 2,
      conversionRate: 13.1,
      status: 'active',
      urgency: 'low',
      recruiter: 'Lisa Thompson',
      daysOpen: 10
    },
    {
      id: 6,
      title: 'Data Scientist',
      department: 'Analytics',
      location: 'Boston, MA',
      posted: new Date('2024-08-30'),
      applications: 145,
      shortlisted: 22,
      interviewed: 9,
      offers: 1,
      conversionRate: 15.2,
      status: 'paused',
      urgency: 'low',
      recruiter: 'Sarah Chen',
      daysOpen: 19
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'text-destructive';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-primary';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getUrgencyBg = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'bg-destructive/10';
      case 'high':
        return 'bg-warning/10';
      case 'medium':
        return 'bg-primary/10';
      case 'low':
        return 'bg-success/10';
      default:
        return 'bg-muted/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'paused':
        return 'text-warning';
      case 'closed':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleQuickAction = (jobId, action) => {
    console.log(`Action: ${action} for job: ${jobId}`);
    // Handle quick action logic here
  };

  return (
    <div className="analytics-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Job Performance</h3>
          <p className="text-sm text-muted-foreground">Application-to-shortlist conversion tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Icon name="List" size={16} />
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} />
          </Button>
        </div>
      </div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobData?.map((job) => (
            <div key={job?.id} className="border border-border rounded-lg p-4 hover:shadow-analytics transition-analytics">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{job?.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{job?.department}</span>
                    <span>•</span>
                    <span>{job?.location}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBg(job?.urgency)} ${getUrgencyColor(job?.urgency)}`}>
                  {job?.urgency}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="font-mono text-lg font-semibold text-foreground">{job?.applications}</div>
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg font-semibold text-foreground">{job?.shortlisted}</div>
                  <div className="text-xs text-muted-foreground">Shortlisted</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg font-semibold text-foreground">{job?.interviewed}</div>
                  <div className="text-xs text-muted-foreground">Interviewed</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg font-semibold text-foreground">{job?.offers}</div>
                  <div className="text-xs text-muted-foreground">Offers</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Conversion Rate</div>
                  <div className="font-mono text-lg font-semibold text-primary">{job?.conversionRate}%</div>
                </div>
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(job?.conversionRate * 5, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>Posted {formatDate(job?.posted)}</span>
                <span>{job?.daysOpen} days open</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${job?.status === 'active' ? 'bg-success' : 'bg-warning'}`}></div>
                  <span className={`text-xs font-medium ${getStatusColor(job?.status)}`}>
                    {job?.status?.charAt(0)?.toUpperCase() + job?.status?.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuickAction(job?.id, 'view')}
                    className="h-6 w-6"
                  >
                    <Icon name="Eye" size={12} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuickAction(job?.id, 'edit')}
                    className="h-6 w-6"
                  >
                    <Icon name="Edit" size={12} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuickAction(job?.id, 'share')}
                    className="h-6 w-6"
                  >
                    <Icon name="Share" size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Position</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Applications</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Shortlisted</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Conversion</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobData?.map((job) => (
                <tr key={job?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-2">
                    <div>
                      <div className="font-medium text-foreground">{job?.title}</div>
                      <div className="text-xs text-muted-foreground">{job?.department} • {job?.location}</div>
                      <div className="text-xs text-muted-foreground">{job?.daysOpen} days open</div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="font-mono text-sm font-semibold text-foreground">{job?.applications}</span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="font-mono text-sm font-semibold text-foreground">{job?.shortlisted}</span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="font-mono text-sm font-semibold text-primary">{job?.conversionRate}%</span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBg(job?.urgency)} ${getUrgencyColor(job?.urgency)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${job?.status === 'active' ? 'bg-success' : 'bg-warning'}`}></div>
                      <span>{job?.urgency}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuickAction(job?.id, 'view')}
                        className="h-6 w-6"
                      >
                        <Icon name="Eye" size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuickAction(job?.id, 'edit')}
                        className="h-6 w-6"
                      >
                        <Icon name="Edit" size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuickAction(job?.id, 'share')}
                        className="h-6 w-6"
                      >
                        <Icon name="Share" size={12} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobPerformanceGrid;