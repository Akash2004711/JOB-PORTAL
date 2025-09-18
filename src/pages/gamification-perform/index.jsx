import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportControls from '../../components/ui/ExportControls';
import FilterControls from './components/FilterControls';
import EngagementMetrics from './components/EngagementMetrics';
import CandidateLeaderboard from './components/CandidateLeaderboard';
import BadgeDistribution from './components/BadgeDistribution';
import StrikePointsTrends from './components/StrikePointsTrends';
import EngagementTimeline from './components/EngagementTimeline';

const GamificationPerformanceDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [filters, setFilters] = useState({});

  // Mock data for engagement metrics
  const engagementMetrics = {
    activeParticipants: 1247,
    activeParticipantsChange: 12.5,
    avgCredibilityScore: 78.4,
    credibilityChange: 5.2,
    totalBadges: 3456,
    badgesChange: 18.7,
    engagementRate: 84.2,
    engagementChange: -2.1
  };

  // Mock data for candidate leaderboard
  const candidateLeaderboard = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Software Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      credibilityScore: 94,
      strikePoints: 2847,
      badges: [
        { name: "Code Master", icon: "Code" },
        { name: "Team Player", icon: "Users" },
        { name: "Innovation Leader", icon: "Lightbulb" },
        { name: "Problem Solver", icon: "Puzzle" }
      ],
      skills: ["React", "Node.js", "Python"],
      lastActivity: new Date(Date.now() - 1800000),
      isOnline: true,
      trendDirection: "up"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      position: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      credibilityScore: 91,
      strikePoints: 2634,
      badges: [
        { name: "Strategy Expert", icon: "Target" },
        { name: "Customer Focus", icon: "Heart" },
        { name: "Data Driven", icon: "BarChart" }
      ],
      skills: ["Product Strategy", "Analytics", "UX Design"],
      lastActivity: new Date(Date.now() - 3600000),
      isOnline: false,
      trendDirection: "up"
    },
    {
      id: 3,
      name: "Emily Watson",
      position: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      credibilityScore: 89,
      strikePoints: 2521,
      badges: [
        { name: "Design Guru", icon: "Palette" },
        { name: "User Advocate", icon: "Users" },
        { name: "Creative Thinker", icon: "Lightbulb" }
      ],
      skills: ["UI/UX Design", "Figma", "User Research"],
      lastActivity: new Date(Date.now() - 7200000),
      isOnline: true,
      trendDirection: "stable"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Data Scientist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      credibilityScore: 87,
      strikePoints: 2398,
      badges: [
        { name: "ML Expert", icon: "Brain" },
        { name: "Analytics Pro", icon: "TrendingUp" },
        { name: "Research Leader", icon: "Search" }
      ],
      skills: ["Machine Learning", "Python", "SQL"],
      lastActivity: new Date(Date.now() - 10800000),
      isOnline: false,
      trendDirection: "up"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      credibilityScore: 85,
      strikePoints: 2287,
      badges: [
        { name: "Infrastructure Master", icon: "Server" },
        { name: "Automation Expert", icon: "Zap" },
        { name: "Security Champion", icon: "Shield" }
      ],
      skills: ["AWS", "Docker", "Kubernetes"],
      lastActivity: new Date(Date.now() - 14400000),
      isOnline: true,
      trendDirection: "down"
    }
  ];

  // Mock data for badge distribution
  const badgeDistribution = [
    { name: "Technical Excellence", count: 456, icon: "Code" },
    { name: "Leadership", count: 324, icon: "Crown" },
    { name: "Innovation", count: 287, icon: "Lightbulb" },
    { name: "Collaboration", count: 234, icon: "Users" },
    { name: "Problem Solving", count: 198, icon: "Puzzle" },
    { name: "Communication", count: 167, icon: "MessageCircle" }
  ];

  // Mock data for strike points trends
  const strikePointsTrends = {
    "7d": [
      { date: "Sep 12", totalPoints: 45230, averagePoints: 78, activeUsers: 580 },
      { date: "Sep 13", totalPoints: 46780, averagePoints: 81, activeUsers: 577 },
      { date: "Sep 14", totalPoints: 48120, averagePoints: 83, activeUsers: 579 },
      { date: "Sep 15", totalPoints: 47890, averagePoints: 82, activeUsers: 584 },
      { date: "Sep 16", totalPoints: 49340, averagePoints: 85, activeUsers: 581 },
      { date: "Sep 17", totalPoints: 50670, averagePoints: 87, activeUsers: 583 },
      { date: "Sep 18", totalPoints: 52180, averagePoints: 89, activeUsers: 586 }
    ],
    "30d": [
      { date: "Aug 19", totalPoints: 38450, averagePoints: 65, activeUsers: 591 },
      { date: "Aug 26", totalPoints: 41230, averagePoints: 70, activeUsers: 589 },
      { date: "Sep 2", totalPoints: 43890, averagePoints: 74, activeUsers: 593 },
      { date: "Sep 9", totalPoints: 46780, averagePoints: 79, activeUsers: 592 },
      { date: "Sep 16", totalPoints: 49340, averagePoints: 83, activeUsers: 595 },
      { date: "Sep 18", totalPoints: 52180, averagePoints: 89, activeUsers: 586 }
    ],
    "90d": [
      { date: "Jun 18", totalPoints: 28450, averagePoints: 48, activeUsers: 592 },
      { date: "Jul 18", totalPoints: 33230, averagePoints: 56, activeUsers: 588 },
      { date: "Aug 18", totalPoints: 38890, averagePoints: 66, activeUsers: 590 },
      { date: "Sep 18", totalPoints: 52180, averagePoints: 89, activeUsers: 586 }
    ]
  };

  const thresholds = {
    totalPoints: 50000,
    averagePoints: 85,
    activeUsers: 600
  };

  // Mock data for engagement timeline
  const engagementTimeline = {
    today: [
      {
        id: 1,
        type: "badge",
        title: "New Badge Earned",
        description: "Sarah Chen earned the \'Code Master\' badge for exceptional programming skills",
        candidateName: "Sarah Chen",
        candidateId: 1,
        timestamp: new Date(Date.now() - 3600000),
        points: 150,
        impact: "high"
      },
      {
        id: 2,
        type: "milestone",
        title: "Credibility Milestone",
        description: "Marcus Rodriguez reached 90+ credibility score milestone",
        candidateName: "Marcus Rodriguez",
        candidateId: 2,
        timestamp: new Date(Date.now() - 7200000),
        points: 200,
        impact: "high"
      },
      {
        id: 3,
        type: "achievement",
        title: "Weekly Goal Achieved",
        description: "Emily Watson completed all weekly engagement activities",
        candidateName: "Emily Watson",
        candidateId: 3,
        timestamp: new Date(Date.now() - 10800000),
        points: 100,
        impact: "medium"
      },
      {
        id: 4,
        type: "level_up",
        title: "Level Up",
        description: "David Kim advanced to Expert level in Machine Learning",
        candidateName: "David Kim",
        candidateId: 4,
        timestamp: new Date(Date.now() - 14400000),
        points: 300,
        impact: "high"
      }
    ],
    week: [
      {
        id: 5,
        type: "badge",
        title: "Team Collaboration Badge",
        description: "Lisa Thompson earned recognition for outstanding team collaboration",
        candidateName: "Lisa Thompson",
        candidateId: 5,
        timestamp: new Date(Date.now() - 86400000),
        points: 120,
        impact: "medium"
      },
      {
        id: 6,
        type: "milestone",
        title: "Strike Points Milestone",
        description: "Sarah Chen reached 2500 strike points milestone",
        candidateName: "Sarah Chen",
        candidateId: 1,
        timestamp: new Date(Date.now() - 172800000),
        points: 250,
        impact: "high"
      }
    ],
    month: [
      {
        id: 7,
        type: "achievement",
        title: "Monthly Top Performer",
        description: "Marcus Rodriguez recognized as top performer for August",
        candidateName: "Marcus Rodriguez",
        candidateId: 2,
        timestamp: new Date(Date.now() - 2592000000),
        points: 500,
        impact: "high"
      }
    ]
  };

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
  };

  const handleExport = async (exportConfig) => {
    // Simulate export functionality
    console.log('Exporting gamification data:', exportConfig);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleCandidateClick = (candidate) => {
    console.log('Candidate clicked:', candidate);
    // Navigate to candidate detail page or show modal
  };

  const handleActivityClick = (activity) => {
    console.log('Activity clicked:', activity);
    // Show activity details or navigate to related page
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
    // Apply filters to data
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`transition-all duration-300 pt-16 pb-20 lg:pb-8 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Gamification Performance Dashboard
              </h1>
              <p className="text-muted-foreground">
                Track candidate engagement metrics, strike points, and badge achievements to optimize recruitment gamification effectiveness.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <DataRefreshIndicator
                lastUpdated={lastUpdated}
                onRefresh={handleRefresh}
                isLive={true}
              />
              <ExportControls
                currentView="engagement"
                onExport={handleExport}
              />
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls onFiltersChange={handleFiltersChange} />

          {/* Engagement Metrics */}
          <EngagementMetrics metrics={engagementMetrics} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Candidate Leaderboard - 8 columns on desktop */}
            <div className="lg:col-span-8">
              <CandidateLeaderboard 
                candidates={candidateLeaderboard}
                onCandidateClick={handleCandidateClick}
              />
            </div>

            {/* Right Panel - 4 columns on desktop */}
            <div className="lg:col-span-4 space-y-6">
              <BadgeDistribution badgeData={badgeDistribution} />
              <StrikePointsTrends 
                trendsData={strikePointsTrends}
                thresholds={thresholds}
              />
            </div>
          </div>

          {/* Full-width Timeline */}
          <EngagementTimeline 
            timelineData={engagementTimeline}
            onActivityClick={handleActivityClick}
          />
        </div>
      </main>
    </div>
  );
};

export default GamificationPerformanceDashboard;