import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const CandidateLeaderboard = ({ candidates, onCandidateClick }) => {
  const [sortBy, setSortBy] = useState('credibilityScore');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = candidates?.filter(candidate => 
      candidate?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      candidate?.skills?.some(skill => skill?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
    )?.sort((a, b) => {
      switch (sortBy) {
        case 'credibilityScore':
          return b?.credibilityScore - a?.credibilityScore;
        case 'strikePoints':
          return b?.strikePoints - a?.strikePoints;
        case 'badges':
          return b?.badges?.length - a?.badges?.length;
        case 'recentActivity':
          return new Date(b.lastActivity) - new Date(a.lastActivity);
        default:
          return 0;
      }
    });

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return "Crown";
      case 1: return "Medal";
      case 2: return "Award";
      default: return null;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return "text-yellow-500";
      case 1: return "text-gray-400";
      case 2: return "text-amber-600";
      default: return "text-muted-foreground";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const formatLastActivity = (date) => {
    const now = new Date();
    const activity = new Date(date);
    const diff = now - activity;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="analytics-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Trophy" size={24} className="text-analytics-orange" />
          <h2 className="text-xl font-semibold text-foreground">Candidate Leaderboard</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="credibilityScore">Credibility Score</option>
            <option value="strikePoints">Strike Points</option>
            <option value="badges">Badge Count</option>
            <option value="recentActivity">Recent Activity</option>
          </select>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredCandidates?.map((candidate, index) => (
          <div
            key={candidate?.id}
            className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border hover:shadow-analytics transition-all cursor-pointer"
            onClick={() => onCandidateClick(candidate)}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(index) ? (
                  <Icon name={getRankIcon(index)} size={20} className={getRankColor(index)} />
                ) : (
                  <span className="text-sm font-semibold text-muted-foreground">#{index + 1}</span>
                )}
              </div>
              
              <div className="relative">
                <Image
                  src={candidate?.avatar}
                  alt={candidate?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {candidate?.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-foreground">{candidate?.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className={`text-sm font-semibold ${getScoreColor(candidate?.credibilityScore)}`}>
                    {candidate?.credibilityScore}/100
                  </div>
                  <Icon name="Star" size={16} className={getScoreColor(candidate?.credibilityScore)} />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>{candidate?.position}</span>
                  <span>•</span>
                  <span>{candidate?.strikePoints} points</span>
                  <span>•</span>
                  <span>{candidate?.badges?.length} badges</span>
                </div>
                <span>{formatLastActivity(candidate?.lastActivity)}</span>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                {candidate?.badges?.slice(0, 3)?.map((badge, badgeIndex) => (
                  <div
                    key={badgeIndex}
                    className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    title={badge?.name}
                  >
                    <Icon name={badge?.icon} size={12} color="white" />
                  </div>
                ))}
                {candidate?.badges?.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{candidate?.badges?.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${candidate?.trendDirection === 'up' ? 'bg-success' : candidate?.trendDirection === 'down' ? 'bg-destructive' : 'bg-warning'}`}></div>
              <Icon 
                name={candidate?.trendDirection === 'up' ? 'TrendingUp' : candidate?.trendDirection === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                className={candidate?.trendDirection === 'up' ? 'text-success' : candidate?.trendDirection === 'down' ? 'text-destructive' : 'text-warning'}
              />
            </div>
          </div>
        ))}
      </div>
      {filteredCandidates?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No candidates found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateLeaderboard;