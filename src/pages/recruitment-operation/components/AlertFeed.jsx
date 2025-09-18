import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'overdue',
      priority: 'high',
      title: 'Review Overdue',
      message: 'Senior Frontend Developer application from Alex Johnson has been pending review for 3 days',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      recruiter: 'Sarah Chen',
      actionRequired: true,
      actions: ['Review Now', 'Reassign']
    },
    {
      id: 2,
      type: 'conflict',
      priority: 'critical',
      title: 'Interview Conflict',
      message: 'Double booking detected: Marcus Rodriguez has 2 interviews scheduled at 2:00 PM today',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      recruiter: 'Marcus Rodriguez',
      actionRequired: true,
      actions: ['Reschedule', 'View Calendar']
    },
    {
      id: 3,
      type: 'followup',
      priority: 'medium',
      title: 'Candidate Follow-up',
      message: 'Emily Watson - Product Manager candidate hasn\'t responded to offer for 5 days',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      recruiter: 'Emily Watson',
      actionRequired: true,
      actions: ['Send Reminder', 'Call Candidate']
    },
    {
      id: 4,
      type: 'urgent',
      priority: 'high',
      title: 'Urgent Position',
      message: 'VP of Engineering position has only 2 days left to fill before deadline',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      recruiter: 'David Kim',
      actionRequired: true,
      actions: ['View Pipeline', 'Expedite Process']
    },
    {
      id: 5,
      type: 'system',
      priority: 'low',
      title: 'System Update',
      message: 'ATS integration completed successfully. All candidate data synchronized',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      recruiter: 'System',
      actionRequired: false,
      actions: []
    },
    {
      id: 6,
      type: 'milestone',
      priority: 'medium',
      title: 'Hiring Goal Achieved',
      message: 'Q3 engineering hiring target reached: 15/15 positions filled',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      recruiter: 'Team Achievement',
      actionRequired: false,
      actions: []
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-destructive';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-primary';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-destructive/10 border-destructive/20';
      case 'high':
        return 'bg-warning/10 border-warning/20';
      case 'medium':
        return 'bg-primary/10 border-primary/20';
      case 'low':
        return 'bg-muted/10 border-border';
      default:
        return 'bg-muted/10 border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'overdue':
        return 'Clock';
      case 'conflict':
        return 'AlertTriangle';
      case 'followup':
        return 'MessageCircle';
      case 'urgent':
        return 'Zap';
      case 'system':
        return 'Settings';
      case 'milestone':
        return 'Trophy';
      default:
        return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleAction = (alertId, action) => {
    console.log(`Action: ${action} for alert: ${alertId}`);
    // Handle action logic here
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  return (
    <div className="analytics-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alert Feed</h3>
          <p className="text-sm text-muted-foreground">Urgent actions and notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Icon name="Filter" size={16} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 rounded-lg border-2 ${getPriorityBg(alert?.priority)} transition-analytics hover:shadow-analytics`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityBg(alert?.priority)}`}>
                  <Icon name={getTypeIcon(alert?.type)} size={16} className={getPriorityColor(alert?.priority)} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{alert?.title}</h4>
                  <p className="text-xs text-muted-foreground">{alert?.recruiter} • {formatTimeAgo(alert?.timestamp)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dismissAlert(alert?.id)}
                className="h-6 w-6"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>

            <p className="text-sm text-foreground mb-4 leading-relaxed">
              {alert?.message}
            </p>

            {alert?.actionRequired && alert?.actions?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {alert?.actions?.map((action, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAction(alert?.id, action)}
                    className="text-xs"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          <Icon name="Eye" size={16} className="mr-2" />
          View All Alerts
        </Button>
      </div>
    </div>
  );
};

export default AlertFeed;