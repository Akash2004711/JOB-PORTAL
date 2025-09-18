import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

import Button from '../../../components/ui/Button';

const PredictiveModelingPanel = () => {
  const [selectedModel, setSelectedModel] = useState('hiring_success');
  const [isModelActive, setIsModelActive] = useState(true);

  // Mock predictive models data
  const models = {
    hiring_success: {
      name: 'Hiring Success Prediction',
      accuracy: 87.3,
      confidence: 92.1,
      description: 'Predicts likelihood of successful hire based on candidate profile and historical data',
      features: ['Experience Level', 'Skills Match', 'Cultural Fit Score', 'Interview Performance', 'Reference Quality'],
      predictions: [
        { candidate: 'Sarah Johnson', probability: 94, confidence: 96, risk: 'Low' },
        { candidate: 'Michael Chen', probability: 78, confidence: 85, risk: 'Medium' },
        { candidate: 'Emily Rodriguez', probability: 91, confidence: 93, risk: 'Low' },
        { candidate: 'David Kim', probability: 65, confidence: 72, risk: 'High' },
        { candidate: 'Lisa Wang', probability: 88, confidence: 90, risk: 'Low' }
      ]
    },
    retention: {
      name: 'Employee Retention Prediction',
      accuracy: 82.7,
      confidence: 88.4,
      description: 'Forecasts employee retention probability for first 2 years',
      features: ['Salary Satisfaction', 'Career Growth Path', 'Team Dynamics', 'Work-Life Balance', 'Manager Quality'],
      predictions: [
        { candidate: 'Sarah Johnson', probability: 89, confidence: 91, risk: 'Low' },
        { candidate: 'Michael Chen', probability: 72, confidence: 78, risk: 'Medium' },
        { candidate: 'Emily Rodriguez', probability: 85, confidence: 87, risk: 'Low' },
        { candidate: 'David Kim', probability: 58, confidence: 65, risk: 'High' },
        { candidate: 'Lisa Wang', probability: 92, confidence: 94, risk: 'Low' }
      ]
    },
    performance: {
      name: 'Performance Prediction',
      accuracy: 79.8,
      confidence: 84.2,
      description: 'Estimates expected job performance rating in first year',
      features: ['Technical Skills', 'Problem Solving', 'Communication', 'Leadership Potential', 'Learning Agility'],
      predictions: [
        { candidate: 'Sarah Johnson', probability: 92, confidence: 89, risk: 'Low' },
        { candidate: 'Michael Chen', probability: 76, confidence: 81, risk: 'Medium' },
        { candidate: 'Emily Rodriguez', probability: 88, confidence: 85, risk: 'Low' },
        { candidate: 'David Kim', probability: 68, confidence: 74, risk: 'Medium' },
        { candidate: 'Lisa Wang', probability: 90, confidence: 87, risk: 'Low' }
      ]
    }
  };

  // Mock model performance over time
  const modelPerformance = [
    { month: 'Jan', accuracy: 84.2, precision: 82.1, recall: 86.3 },
    { month: 'Feb', accuracy: 85.1, precision: 83.4, recall: 86.8 },
    { month: 'Mar', accuracy: 86.3, precision: 84.7, recall: 87.9 },
    { month: 'Apr', accuracy: 87.1, precision: 85.2, recall: 89.0 },
    { month: 'May', accuracy: 87.8, precision: 86.1, recall: 89.5 },
    { month: 'Jun', accuracy: 87.3, precision: 85.8, recall: 88.8 }
  ];

  // Mock feature importance radar data
  const featureImportance = [
    { feature: 'Experience', importance: 85, fullMark: 100 },
    { feature: 'Skills Match', importance: 92, fullMark: 100 },
    { feature: 'Cultural Fit', importance: 78, fullMark: 100 },
    { feature: 'Interview Score', importance: 88, fullMark: 100 },
    { feature: 'References', importance: 72, fullMark: 100 },
    { feature: 'Education', importance: 65, fullMark: 100 }
  ];

  const currentModel = models?.[selectedModel];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBgColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-success/10';
      case 'Medium': return 'bg-warning/10';
      case 'High': return 'bg-destructive/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="analytics-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Predictive Modeling & AI Insights</h3>
          <p className="text-sm text-muted-foreground">AI-driven candidate success predictions and risk analysis</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isModelActive ? 'bg-success status-pulse' : 'bg-muted-foreground'}`}></div>
            <span className="text-xs text-muted-foreground">
              {isModelActive ? 'Model Active' : 'Model Inactive'}
            </span>
          </div>
          
          <Button
            variant={isModelActive ? "destructive" : "default"}
            size="sm"
            onClick={() => setIsModelActive(!isModelActive)}
            iconName={isModelActive ? "Pause" : "Play"}
            iconPosition="left"
          >
            {isModelActive ? 'Pause' : 'Activate'}
          </Button>
        </div>
      </div>
      {/* Model Selector */}
      <div className="flex space-x-2 mb-6">
        {Object.keys(models)?.map(modelKey => (
          <Button
            key={modelKey}
            variant={selectedModel === modelKey ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedModel(modelKey)}
          >
            {models?.[modelKey]?.name?.split(' ')?.[0]}
          </Button>
        ))}
      </div>
      {/* Model Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Model Info */}
        <div className="lg:col-span-1">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">{currentModel?.name}</h4>
            <p className="text-sm text-muted-foreground mb-4">{currentModel?.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Accuracy</span>
                <span className="text-sm font-medium text-success">{currentModel?.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <span className="text-sm font-medium text-primary">{currentModel?.confidence}%</span>
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">Key Features:</div>
                <div className="flex flex-wrap gap-1">
                  {currentModel?.features?.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-background rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Performance Chart */}
        <div className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={modelPerformance} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  domain={[75, 95]}
                  tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="precision" stroke="var(--color-success)" strokeWidth={2} />
                <Line type="monotone" dataKey="recall" stroke="var(--color-warning)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Predictions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Predictions */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Current Predictions</h4>
          <div className="space-y-3">
            {currentModel?.predictions?.map((prediction, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getRiskBgColor(prediction?.risk)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{prediction?.candidate}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{prediction?.probability}%</span>
                    <span className={`text-xs px-2 py-1 rounded ${getRiskColor(prediction?.risk)} bg-background`}>
                      {prediction?.risk}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence: {prediction?.confidence}%</span>
                  <div className="w-16 h-1.5 bg-muted rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${prediction?.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Importance Radar */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Feature Importance</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={featureImportance}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis 
                  dataKey="feature" 
                  tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}
                />
                <Radar
                  name="Importance"
                  dataKey="importance"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Model Insights */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-foreground">Top Predictor</div>
            <div className="text-primary">Skills Match (92%)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Model Trend</div>
            <div className="text-success">Improving (+3.1%)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">High Risk Candidates</div>
            <div className="text-destructive">1 of 5 (20%)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Next Retrain</div>
            <div className="text-foreground">In 7 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveModelingPanel;