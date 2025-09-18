import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [dataFreshness, setDataFreshness] = useState('live');

  useEffect(() => {
    // Simulate connection status updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'reconnecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-success';
      case 'reconnecting':
        return 'bg-warning';
      case 'disconnected':
        return 'bg-destructive';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'reconnecting':
        return 'Reconnecting';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = now - lastUpdate;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  return (
    <div className="flex items-center space-x-4 px-4 py-2 bg-muted/30 rounded-lg">
      {/* WebSocket Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusBg()} ${connectionStatus === 'connected' ? 'status-pulse' : ''}`}></div>
        <span className={`text-xs font-medium ${getStatusColor()}`}>
          WebSocket {getStatusText()}
        </span>
      </div>

      {/* Data Freshness */}
      <div className="flex items-center space-x-2">
        <Icon name="Database" size={12} color="var(--color-muted-foreground)" />
        <span className="text-xs text-muted-foreground">
          {dataFreshness === 'live' ? 'Live Data' : 'Cached Data'}
        </span>
      </div>

      {/* Last Update */}
      <div className="flex items-center space-x-2">
        <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
        <span className="text-xs text-muted-foreground">
          Updated {formatLastUpdate()}
        </span>
      </div>

      {/* System Health */}
      <div className="flex items-center space-x-2">
        <Icon name="Activity" size={12} color="var(--color-success)" />
        <span className="text-xs text-success">
          All Systems Operational
        </span>
      </div>
    </div>
  );
};

export default ConnectionStatus;