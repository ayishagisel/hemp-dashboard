import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DemographicChartsProps {
  stats: {
    demographics: {
      ageGroups: Record<string, number>;
      genderDistribution: Record<string, number>;
      incomeDistribution: Record<string, number>;
      educationDistribution: Record<string, number>;
      productPreferences: Record<string, number>;
      primaryReasons: Record<string, number>;
      discoveryMethods: Record<string, number>;
    };
  };
}

const COLORS = ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#064E3B', '#065F46', '#047857', '#059669', '#10B981'];

const defaultDemographics = {
  ageGroups: {
    '18-24': 0,
    '25-34': 0,
    '35-44': 0,
    '45-54': 0,
    '55+': 0
  },
  genderDistribution: {
    'Male': 0,
    'Female': 0,
    'Other': 0
  },
  incomeDistribution: {
    'Under $25,000': 0,
    '$25,000 - $50,000': 0,
    '$50,000 - $75,000': 0,
    '$75,000 - $100,000': 0,
    'Over $100,000': 0
  },
  educationDistribution: {
    'High School': 0,
    'Some College': 0,
    "Bachelor's Degree": 0,
    "Master's Degree": 0,
    'Doctorate': 0
  },
  productPreferences: {
    'CBD Oil': 0,
    'Hemp-infused Edibles': 0,
    'Topical Creams': 0,
    'Hemp Flower': 0,
    'Hemp Clothing/Textiles': 0,
    'Hemp-based Supplements': 0
  },
  primaryReasons: {
    'Pain Relief': 0,
    'Anxiety/Stress Management': 0,
    'Sleep Aid': 0,
    'General Wellness': 0,
    'Skin Care': 0,
    'Other': 0
  },
  discoveryMethods: {
    'Social Media': 0,
    'Friend/Family': 0,
    'Search Engine': 0,
    'Advertisement': 0,
    'Other': 0
  }
};

export default function DemographicCharts({ stats }: DemographicChartsProps) {
  const demographics = stats?.demographics || defaultDemographics;

  const formatData = (data: Record<string, number> | undefined) => {
    if (!data) return [];
    return Object.entries(data).map(([name, value]) => ({
      name,
      value
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Age Groups */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Age Distribution</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatData(demographics.ageGroups)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Gender Distribution</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formatData(demographics.genderDistribution)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {formatData(demographics.genderDistribution).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Income Distribution</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatData(demographics.incomeDistribution)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Education Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Education Distribution</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatData(demographics.educationDistribution)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#047857" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Product Preferences</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatData(demographics.productPreferences)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#065F46" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Primary Reasons */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Primary Reasons for Use</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formatData(demographics.primaryReasons)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {formatData(demographics.primaryReasons).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Discovery Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Discovery Methods</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatData(demographics.discoveryMethods)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#064E3B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 