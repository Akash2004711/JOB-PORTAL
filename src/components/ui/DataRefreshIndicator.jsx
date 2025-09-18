import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const DataRefreshIndicator = ({ 
  lastUpdated = new Date(),
  isLive = true,
  onRefresh,
  className = ""
}) => {
  const [timeAgo, setTimeAgo] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date();
      const diff = now - new Date(lastUpdated);
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) {
        setTimeAgo('Just now');
      } else if (minutes < 60) {
        setTimeAgo(`${minutes}m ago`);
      } else if (hours < 24) {
        setTimeAgo(`${hours}h ago`);
      } else {
        setTimeAgo(`${days}d ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lastUpdated]);

  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
        setConnectionStatus('error');
        setTimeout(() => setConnectionStatus('connected'), 3000);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return isLive ? 'bg-success' : 'bg-warning';
      case 'disconnected':
        return 'bg-muted-foreground';
      case 'error':
        return 'bg-destructive';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return isLive ? 'Live' : 'Cached';
      case 'disconnected':
        return 'Offline';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Status Indicator */}
      <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${isLive && connectionStatus === 'connected' ? 'status-pulse' : ''}`}></div>
        <span className="text-xs font-medium text-foreground">{getStatusText()}</span>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </div>

      {/* Refresh Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="h-8 w-8"
      >
        <Icon 
          name="RefreshCw" 
          size={14} 
          className={isRefreshing ? 'animate-spin' : ''} 
        />
      </Button>

      {/* Connection Details (Desktop Only) */}
      <div className="hidden lg:flex items-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Wifi" size={12} />
        <span>WebSocket</span>
        {connectionStatus === 'connected' && (
          <>
            <span>•</span>
            <span className="text-success">Connected</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DataRefreshIndicator;