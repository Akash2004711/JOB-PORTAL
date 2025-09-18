import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredibilityScatterPlot = ({ onCandidateClick }) => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [showTrendLine, setShowTrendLine] = useState(true);

  // Mock data for scatter plot
  const candidateData = [
    { id: 1, name: 'Sarah Johnson', credibilityScore: 92, hiringSuccessRate: 85, experience: 'senior', skills: 'React, Node.js', applications: 12 },
    { id: 2, name: 'Michael Chen', credibilityScore: 88, hiringSuccessRate: 78, experience: 'mid', skills: 'Python, Django', applications: 8 },
    { id: 3, name: 'Emily Rodriguez', credibilityScore: 95, hiringSuccessRate: 92, experience: 'senior', skills: 'Java, Spring', applications: 15 },
    { id: 4, name: 'David Kim', credibilityScore: 76, hiringSuccessRate: 65, experience: 'entry', skills: 'JavaScript, Vue', applications: 5 },
    { id: 5, name: 'Lisa Wang', credibilityScore: 89, hiringSuccessRate: 82, experience: 'senior', skills: 'Angular, TypeScript', applications: 11 },
    { id: 6, name: 'James Wilson', credibilityScore: 82, hiringSuccessRate: 71, experience: 'mid', skills: 'PHP, Laravel', applications: 7 },
    { id: 7, name: 'Maria Garcia', credibilityScore: 91, hiringSuccessRate: 88, experience: 'senior', skills: 'React Native, Flutter', applications: 13 },
    { id: 8, name: 'Robert Taylor', credibilityScore: 79, hiringSuccessRate: 68, experience: 'mid', skills: 'C#, .NET', applications: 6 },
    { id: 9, name: 'Jennifer Lee', credibilityScore: 93, hiringSuccessRate: 89, experience: 'lead', skills: 'AWS, DevOps', applications: 14 },
    { id: 10, name: 'Thomas Brown', credibilityScore: 85, hiringSuccessRate: 75, experience: 'mid', skills: 'Go, Kubernetes', applications: 9 },
    { id: 11, name: 'Amanda Davis', credibilityScore: 87, hiringSuccessRate: 79, experience: 'senior', skills: 'Data Science, ML', applications: 10 },
    { id: 12, name: 'Kevin Martinez', credibilityScore: 74, hiringSuccessRate: 62, experience: 'entry', skills: 'HTML, CSS, JS', applications: 4 },
    { id: 13, name: 'Rachel Green', credibilityScore: 90, hiringSuccessRate: 84, experience: 'senior', skills: 'UI/UX Design', applications: 12 },
    { id: 14, name: 'Daniel White', credibilityScore: 83, hiringSuccessRate: 73, experience: 'mid', skills: 'Mobile Development', applications: 8 },
    { id: 15, name: 'Sophie Anderson', credibilityScore: 96, hiringSuccessRate: 94, experience: 'lead', skills: 'Product Management', applications: 16 }
  ];

  const segmentOptions = [
    { value: 'all', label: 'All Candidates', color: '#3B82F6' },
    { value: 'entry', label: 'Entry Level', color: '#10B981' },
    { value: 'mid', label: 'Mid Level', color: '#F59E0B' },
    { value: 'senior', label: 'Senior Level', color: '#EF4444' },
    { value: 'lead', label: 'Lead Level', color: '#8B5CF6' }
  ];

  const getFilteredData = () => {
    if (selectedSegment === 'all') return candidateData;
    return candidateData?.filter(candidate => candidate?.experience === selectedSegment);
  };

  const getSegmentColor = (experience) => {
    const segment = segmentOptions?.find(s => s?.value === experience);
    return segment ? segment?.color : '#3B82F6';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-analytics-lg">
          <div className="font-semibold text-foreground mb-2">{data?.name}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Credibility Score:</span>
              <span className="font-medium text-foreground">{data?.credibilityScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="font-medium text-foreground">{data?.hiringSuccessRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Applications:</span>
              <span className="font-medium text-foreground">{data?.applications}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground">Skills: {data?.skills}</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleScatterClick = (data) => {
    if (onCandidateClick) {
      onCandidateClick(data);
    }
  };

  return (
    <div className="analytics-card p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Credibility vs Hiring Success</h3>
          <p className="text-sm text-muted-foreground">Interactive correlation analysis with candidate drill-down</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant={showTrendLine ? "default" : "outline"}
            size="sm"
            onClick={() => setShowTrendLine(!showTrendLine)}
            iconName="TrendingUp"
            iconPosition="left"
          >
            Trend Line
          </Button>
          
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
          >
            {segmentOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={getFilteredData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number" 
              dataKey="credibilityScore" 
              name="Credibility Score"
              domain={[60, 100]}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              type="number" 
              dataKey="hiringSuccessRate" 
              name="Hiring Success Rate"
              domain={[50, 100]}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference Lines */}
            <ReferenceLine x={80} stroke="var(--color-warning)" strokeDasharray="5 5" />
            <ReferenceLine y={75} stroke="var(--color-warning)" strokeDasharray="5 5" />
            
            {/* Scatter Points */}
            <Scatter 
              dataKey="hiringSuccessRate" 
              fill={selectedSegment === 'all' ? '#3B82F6' : segmentOptions?.find(s => s?.value === selectedSegment)?.color}
              onClick={handleScatterClick}
              cursor="pointer"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">Benchmark Thresholds</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Credibility: 80+ | Success Rate: 75%+
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="MousePointer" size={12} />
          <span>Click points for candidate details</span>
        </div>
      </div>
      {/* Insights Panel */}
      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-foreground">High Performers</div>
            <div className="text-muted-foreground">
              {candidateData?.filter(c => c?.credibilityScore >= 90 && c?.hiringSuccessRate >= 85)?.length} candidates
            </div>
          </div>
          <div>
            <div className="font-medium text-foreground">Correlation</div>
            <div className="text-success">Strong positive (r = 0.87)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Outliers</div>
            <div className="text-warning">2 candidates need review</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredibilityScatterPlot;