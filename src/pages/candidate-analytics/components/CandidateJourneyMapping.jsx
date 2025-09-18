import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const CandidateJourneyMapping = () => {
  const [selectedJourney, setSelectedJourney] = useState('overall');
  const [viewMode, setViewMode] = useState('funnel'); // funnel, touchpoints, conversion

  // Mock journey data
  const journeyStages = [
    { 
      stage: 'Discovery', 
      candidates: 10000, 
      conversionRate: 100, 
      avgTime: '2 days',
      touchpoints: ['Job Board', 'Company Website', 'Social Media'],
      dropoffReasons: ['Job Requirements Too High', 'Salary Not Disclosed', 'Company Unknown']
    },
    { 
      stage: 'Application', 
      candidates: 7500, 
      conversionRate: 75, 
      avgTime: '1 day',
      touchpoints: ['Application Form', 'Resume Upload', 'Cover Letter'],
      dropoffReasons: ['Complex Application', 'Technical Issues', 'Time Constraints']
    },
    { 
      stage: 'Screening', 
      candidates: 5250, 
      conversionRate: 70, 
      avgTime: '3 days',
      touchpoints: ['Phone Screen', 'Video Call', 'Skills Assessment'],
      dropoffReasons: ['Skills Mismatch', 'Salary Expectations', 'Location Issues']
    },
    { 
      stage: 'Interview', 
      candidates: 2625, 
      conversionRate: 50, 
      avgTime: '5 days',
      touchpoints: ['Technical Interview', 'Cultural Fit', 'Panel Interview'],
      dropoffReasons: ['Technical Skills Gap', 'Cultural Misalignment', 'Better Offer Elsewhere']
    },
    { 
      stage: 'Offer', 
      candidates: 1050, 
      conversionRate: 40, 
      avgTime: '2 days',
      touchpoints: ['Offer Letter', 'Negotiation', 'Background Check'],
      dropoffReasons: ['Salary Below Expectations', 'Benefits Package', 'Competing Offers']
    },
    { 
      stage: 'Hired', 
      candidates: 735, 
      conversionRate: 70, 
      avgTime: '1 day',
      touchpoints: ['Contract Signing', 'Onboarding', 'First Day'],
      dropoffReasons: ['Last Minute Withdrawal', 'Failed Background Check', 'Personal Reasons']
    }
  ];

  const touchpointEffectiveness = [
    { touchpoint: 'Job Board Posting', effectiveness: 85, engagement: 92, conversion: 78 },
    { touchpoint: 'Company Website', effectiveness: 78, engagement: 85, conversion: 71 },
    { touchpoint: 'Social Media', effectiveness: 65, engagement: 88, conversion: 42 },
    { touchpoint: 'Employee Referral', effectiveness: 95, engagement: 98, conversion: 92 },
    { touchpoint: 'Recruiter Outreach', effectiveness: 88, engagement: 85, conversion: 91 },
    { touchpoint: 'Career Fair', effectiveness: 72, engagement: 90, conversion: 54 },
    { touchpoint: 'University Partnership', effectiveness: 82, engagement: 87, conversion: 77 },
    { touchpoint: 'Professional Network', effectiveness: 90, engagement: 94, conversion: 86 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const renderFunnelChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <FunnelChart>
        <Tooltip 
          formatter={(value, name) => [
            `${value?.toLocaleString()} candidates`,
            name
          ]}
        />
        <Funnel
          dataKey="candidates"
          data={journeyStages}
          isAnimationActive
        >
          {journeyStages?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
          ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );

  const renderTouchpointChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={touchpointEffectiveness} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="touchpoint" 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}
          axisLine={{ stroke: 'var(--color-border)' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <Tooltip />
        <Bar dataKey="effectiveness" fill="var(--color-primary)" />
        <Bar dataKey="conversion" fill="var(--color-success)" />
      </BarChart>
    </ResponsiveContainer>
  );

  const getStageColor = (conversionRate) => {
    if (conversionRate >= 80) return 'text-success';
    if (conversionRate >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="analytics-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Candidate Journey Mapping</h3>
          <p className="text-sm text-muted-foreground">Touchpoint effectiveness and conversion analysis</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'funnel' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('funnel')}
          >
            Funnel
          </Button>
          <Button
            variant={viewMode === 'touchpoints' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('touchpoints')}
          >
            Touchpoints
          </Button>
        </div>
      </div>
      {/* Chart */}
      <div className="mb-6">
        {viewMode === 'funnel' ? renderFunnelChart() : renderTouchpointChart()}
      </div>
      {/* Journey Stages Details */}
      {viewMode === 'funnel' && (
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-semibold text-foreground">Stage-by-Stage Analysis</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {journeyStages?.map((stage, index) => (
              <div key={stage?.stage} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                    ></div>
                    <h5 className="font-medium text-foreground">{stage?.stage}</h5>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {stage?.candidates?.toLocaleString()}
                    </div>
                    <div className={`text-xs ${getStageColor(stage?.conversionRate)}`}>
                      {stage?.conversionRate}% conversion
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Time:</span>
                    <span className="text-foreground">{stage?.avgTime}</span>
                  </div>
                  
                  <div>
                    <div className="text-muted-foreground mb-1">Key Touchpoints:</div>
                    <div className="flex flex-wrap gap-1">
                      {stage?.touchpoints?.map((touchpoint, idx) => (
                        <span key={idx} className="px-2 py-1 bg-background rounded text-xs">
                          {touchpoint}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-muted-foreground mb-1">Top Dropoff Reasons:</div>
                    <ul className="space-y-1">
                      {stage?.dropoffReasons?.slice(0, 2)?.map((reason, idx) => (
                        <li key={idx} className="text-foreground">• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Touchpoint Effectiveness */}
      {viewMode === 'touchpoints' && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Touchpoint Performance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {touchpointEffectiveness?.map((touchpoint, index) => (
              <div key={touchpoint?.touchpoint} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-foreground">{touchpoint?.touchpoint}</h5>
                  <div className="text-sm font-medium text-foreground">
                    {touchpoint?.effectiveness}%
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Engagement</span>
                    <span className="text-foreground">{touchpoint?.engagement}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${touchpoint?.engagement}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Conversion</span>
                    <span className="text-foreground">{touchpoint?.conversion}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-success rounded-full" 
                      style={{ width: `${touchpoint?.conversion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Journey Insights */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-foreground">Overall Conversion</div>
            <div className="text-success">7.35% (735/10,000)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Biggest Bottleneck</div>
            <div className="text-destructive">Interview Stage (50%)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Best Touchpoint</div>
            <div className="text-success">Employee Referral (95%)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Avg Journey Time</div>
            <div className="text-foreground">14 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateJourneyMapping;