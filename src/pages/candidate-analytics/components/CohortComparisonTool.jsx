import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CohortComparisonTool = () => {
  const [selectedCohorts, setSelectedCohorts] = useState(['q1_2024', 'q2_2024']);
  const [comparisonMetric, setComparisonMetric] = useState('hiring_success');
  const [viewMode, setViewMode] = useState('comparison'); // comparison, trends

  // Mock cohort data
  const cohorts = {
    q1_2024: {
      name: 'Q1 2024 Hires',
      totalCandidates: 1250,
      hired: 89,
      avgCredibilityScore: 84.2,
      avgTimeToHire: 18,
      retentionRate: 92,
      performanceRating: 4.2,
      diversityScore: 78,
      costPerHire: 4200
    },
    q2_2024: {
      name: 'Q2 2024 Hires',
      totalCandidates: 1420,
      hired: 102,
      avgCredibilityScore: 86.7,
      avgTimeToHire: 16,
      retentionRate: 94,
      performanceRating: 4.4,
      diversityScore: 82,
      costPerHire: 3950
    },
    q3_2024: {
      name: 'Q3 2024 Hires',
      totalCandidates: 1380,
      hired: 95,
      avgCredibilityScore: 85.9,
      avgTimeToHire: 17,
      retentionRate: 91,
      performanceRating: 4.3,
      diversityScore: 80,
      costPerHire: 4100
    },
    q4_2023: {
      name: 'Q4 2023 Hires',
      totalCandidates: 1180,
      hired: 78,
      avgCredibilityScore: 82.1,
      avgTimeToHire: 21,
      retentionRate: 88,
      performanceRating: 4.0,
      diversityScore: 75,
      costPerHire: 4500
    }
  };

  const cohortOptions = Object.keys(cohorts)?.map(key => ({
    value: key,
    label: cohorts?.[key]?.name
  }));

  const metricOptions = [
    { value: 'hiring_success', label: 'Hiring Success Rate' },
    { value: 'credibility_score', label: 'Avg Credibility Score' },
    { value: 'time_to_hire', label: 'Time to Hire' },
    { value: 'retention_rate', label: 'Retention Rate' },
    { value: 'performance_rating', label: 'Performance Rating' },
    { value: 'diversity_score', label: 'Diversity Score' },
    { value: 'cost_per_hire', label: 'Cost per Hire' }
  ];

  // Mock trend data
  const trendData = [
    { week: 'Week 1', q1_2024: 82, q2_2024: 85, q3_2024: 84 },
    { week: 'Week 2', q1_2024: 83, q2_2024: 86, q3_2024: 85 },
    { week: 'Week 3', q1_2024: 84, q2_2024: 87, q3_2024: 86 },
    { week: 'Week 4', q1_2024: 85, q2_2024: 88, q3_2024: 87 },
    { week: 'Week 5', q1_2024: 84, q2_2024: 87, q3_2024: 86 },
    { week: 'Week 6', q1_2024: 86, q2_2024: 89, q3_2024: 88 }
  ];

  const getComparisonData = () => {
    return selectedCohorts?.map(cohortKey => {
      const cohort = cohorts?.[cohortKey];
      let value;
      
      switch (comparisonMetric) {
        case 'hiring_success':
          value = ((cohort?.hired / cohort?.totalCandidates) * 100)?.toFixed(1);
          break;
        case 'credibility_score':
          value = cohort?.avgCredibilityScore;
          break;
        case 'time_to_hire':
          value = cohort?.avgTimeToHire;
          break;
        case 'retention_rate':
          value = cohort?.retentionRate;
          break;
        case 'performance_rating':
          value = cohort?.performanceRating;
          break;
        case 'diversity_score':
          value = cohort?.diversityScore;
          break;
        case 'cost_per_hire':
          value = cohort?.costPerHire;
          break;
        default:
          value = 0;
      }
      
      return {
        name: cohort?.name,
        value: parseFloat(value),
        cohortKey
      };
    });
  };

  const getMetricUnit = () => {
    switch (comparisonMetric) {
      case 'hiring_success': case'retention_rate': case'diversity_score':
        return '%';
      case 'time_to_hire':
        return ' days';
      case 'performance_rating':
        return '/5';
      case 'cost_per_hire':
        return '$';
      default:
        return '';
    }
  };

  const handleCohortChange = (cohortKey) => {
    if (selectedCohorts?.includes(cohortKey)) {
      if (selectedCohorts?.length > 1) {
        setSelectedCohorts(selectedCohorts?.filter(c => c !== cohortKey));
      }
    } else {
      if (selectedCohorts?.length < 4) {
        setSelectedCohorts([...selectedCohorts, cohortKey]);
      }
    }
  };

  const getCohortColor = (index) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    return colors?.[index % colors?.length];
  };

  const renderComparisonChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={getComparisonData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <Tooltip 
          formatter={(value) => [`${value}${getMetricUnit()}`, 'Value']}
        />
        <Bar 
          dataKey="value" 
          fill="var(--color-primary)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="week" 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <Tooltip />
        {selectedCohorts?.map((cohortKey, index) => (
          <Line
            key={cohortKey}
            type="monotone"
            dataKey={cohortKey}
            stroke={getCohortColor(index)}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="analytics-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cohort Comparison Analysis</h3>
          <p className="text-sm text-muted-foreground">Compare performance across different hiring cohorts</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'comparison' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('comparison')}
          >
            Compare
          </Button>
          <Button
            variant={viewMode === 'trends' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('trends')}
          >
            Trends
          </Button>
        </div>
      </div>
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Select
            label="Comparison Metric"
            options={metricOptions}
            value={comparisonMetric}
            onChange={setComparisonMetric}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Selected Cohorts ({selectedCohorts?.length}/4)
          </label>
          <div className="flex flex-wrap gap-2">
            {cohortOptions?.map((option, index) => (
              <Button
                key={option?.value}
                variant={selectedCohorts?.includes(option?.value) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCohortChange(option?.value)}
                disabled={!selectedCohorts?.includes(option?.value) && selectedCohorts?.length >= 4}
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="mb-6">
        {viewMode === 'comparison' ? renderComparisonChart() : renderTrendChart()}
      </div>
      {/* Detailed Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">Cohort</th>
              <th className="text-right py-2 text-muted-foreground">Total Candidates</th>
              <th className="text-right py-2 text-muted-foreground">Hired</th>
              <th className="text-right py-2 text-muted-foreground">Success Rate</th>
              <th className="text-right py-2 text-muted-foreground">Avg Credibility</th>
              <th className="text-right py-2 text-muted-foreground">Time to Hire</th>
              <th className="text-right py-2 text-muted-foreground">Retention</th>
              <th className="text-right py-2 text-muted-foreground">Cost per Hire</th>
            </tr>
          </thead>
          <tbody>
            {selectedCohorts?.map((cohortKey, index) => {
              const cohort = cohorts?.[cohortKey];
              const successRate = ((cohort?.hired / cohort?.totalCandidates) * 100)?.toFixed(1);
              
              return (
                <tr key={cohortKey} className="border-b border-border/50">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getCohortColor(index) }}
                      ></div>
                      <span className="font-medium text-foreground">{cohort?.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 text-foreground">{cohort?.totalCandidates?.toLocaleString()}</td>
                  <td className="text-right py-3 text-foreground">{cohort?.hired}</td>
                  <td className="text-right py-3 text-foreground">{successRate}%</td>
                  <td className="text-right py-3 text-foreground">{cohort?.avgCredibilityScore}</td>
                  <td className="text-right py-3 text-foreground">{cohort?.avgTimeToHire} days</td>
                  <td className="text-right py-3 text-foreground">{cohort?.retentionRate}%</td>
                  <td className="text-right py-3 text-foreground">${cohort?.costPerHire?.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Insights */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-foreground">Best Performing Cohort</div>
            <div className="text-success">Q2 2024 (94% retention)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Biggest Improvement</div>
            <div className="text-primary">Time to Hire (-5 days)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Cost Optimization</div>
            <div className="text-success">-$550 per hire (Q2 vs Q4)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortComparisonTool;