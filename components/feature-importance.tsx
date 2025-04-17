import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "@/components/ui/chart"

export function FeatureImportance() {
  // Feature importance data
  const featureImportanceData = [
    { name: "Cell Density", value: 28 },
    { name: "Nozzle Temperature", value: 22 },
    { name: "Layer Height", value: 18 },
    { name: "Print Speed", value: 15 },
    { name: "Crosslink Time", value: 12 },
    { name: "Viscosity", value: 5 },
  ]

  // Cell density impact data
  const cellDensityData = [
    { density: 5, viability: 0.92 },
    { density: 6, viability: 0.9 },
    { density: 7, viability: 0.88 },
    { density: 8, viability: 0.85 },
    { density: 9, viability: 0.8 },
    { density: 10, viability: 0.75 },
    { density: 11, viability: 0.65 },
    { density: 12, viability: 0.55 },
    { density: 13, viability: 0.45 },
    { density: 14, viability: 0.35 },
    { density: 15, viability: 0.25 },
  ]

  // Temperature impact data
  const temperatureData = [
    { temp: 180, viability: 0.75 },
    { temp: 185, viability: 0.82 },
    { temp: 190, viability: 0.88 },
    { temp: 195, viability: 0.85 },
    { temp: 200, viability: 0.78 },
    { temp: 205, viability: 0.65 },
    { temp: 210, viability: 0.5 },
  ]

  // Parameter interaction data
  const parameterInteractionData = [
    { name: "Low Density + Low Temp", value: 0.82 },
    { name: "Low Density + High Temp", value: 0.65 },
    { name: "High Density + Low Temp", value: 0.55 },
    { name: "High Density + High Temp", value: 0.3 },
    { name: "Low Density + Low Speed", value: 0.85 },
    { name: "Low Density + High Speed", value: 0.75 },
    { name: "High Density + Low Speed", value: 0.6 },
    { name: "High Density + High Speed", value: 0.25 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Feature Importance</CardTitle>
          <CardDescription>Relative contribution of each parameter to model accuracy</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureImportanceData.sort((a, b) => b.value - a.value)}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 30]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value}%`, "Importance"]} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={featureImportanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {featureImportanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Importance"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cell Density Impact</CardTitle>
          <CardDescription>Effect of cell density on viability (most important parameter)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cellDensityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="density"
                  label={{ value: "Cell Density (10⁶ cells/mL)", position: "insideBottom", offset: -5 }}
                />
                <YAxis domain={[0, 1]} label={{ value: "Viability", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Viability"]} />
                <Line type="monotone" dataKey="viability" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Temperature Impact</CardTitle>
          <CardDescription>Effect of nozzle temperature on viability (second most important parameter)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="temp"
                  label={{ value: "Nozzle Temperature (°C)", position: "insideBottom", offset: -5 }}
                />
                <YAxis domain={[0, 1]} label={{ value: "Viability", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Viability"]} />
                <Line type="monotone" dataKey="viability" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Parameter Interactions</CardTitle>
          <CardDescription>Combined effects of key parameters on viability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={parameterInteractionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Viability"]} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
