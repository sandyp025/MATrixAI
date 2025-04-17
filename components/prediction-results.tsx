"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "@/components/ui/chart"
import type { PredictionResult } from "@/lib/schemas/parameter-prediction"

interface PredictionResultsProps {
  result: PredictionResult
}

function normalizeValue(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100
}

export function PredictionResults({ result }: PredictionResultsProps) {
  const { printQuality, confidenceScore, insights, recommendations, parameterImpact, qualityDistribution } = result

  // Colors for the quality badge
  const qualityColors = {
    Good: "bg-green-500",
    Medium: "bg-yellow-500",
    Bad: "bg-red-500",
  }

  // Colors for the pie chart
  const COLORS = ["#10b981", "#eab308", "#ef4444"]

  // Prepare data for the parameter impact chart
  const parameterImpactData = [
    { name: "Polymer Type", value: parameterImpact.polymerType },
    { name: "Layer Thickness", value: parameterImpact.layerThickness },
    { name: "Print Speed", value: parameterImpact.printSpeed },
    { name: "Temperature", value: parameterImpact.temperature },
  ]

  // Prepare data for the parameter comparison chart
  const currentValues = {
    polymerType: result.parameterImpact.polymerType, // Using impact as a proxy for current value
    layerThickness: normalizeValue(Number(result.recommendations.layerThickness) || 0, 0.05, 0.5),
    printSpeed: normalizeValue(Number(result.recommendations.printSpeed) || 0, 5, 100),
    temperature: normalizeValue(Number(result.recommendations.temperature) || 0, 160, 250),
  }

  // Create comparison data for radar chart
  const comparisonData = [
    {
      subject: "Polymer Type",
      current: result.parameterImpact.polymerType,
      optimal: 100,
      fullMark: 100,
    },
    {
      subject: "Layer Thickness",
      current: result.parameterImpact.layerThickness,
      optimal: recommendations.layerThickness ? 100 : 0,
      fullMark: 100,
    },
    {
      subject: "Print Speed",
      current: result.parameterImpact.printSpeed,
      optimal: recommendations.printSpeed ? 100 : 0,
      fullMark: 100,
    },
    {
      subject: "Temperature",
      current: result.parameterImpact.temperature,
      optimal: recommendations.temperature ? 100 : 0,
      fullMark: 100,
    },
  ]

  // Prepare data for the quality distribution pie chart
  const qualityDistributionData = [
    { name: "Good", value: qualityDistribution.good },
    { name: "Medium", value: qualityDistribution.medium },
    { name: "Bad", value: qualityDistribution.bad },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Print Quality Prediction</CardTitle>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.3 }}
              >
                <Badge className={`${qualityColors[printQuality]} shadow-glow-sm`}>{printQuality}</Badge>
              </motion.div>
            </div>
            <CardDescription>Prediction confidence: {confidenceScore}%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualityDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    animationBegin={300}
                    animationDuration={1500}
                  >
                    {qualityDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, "Probability"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-medium mb-2">Insights</h3>
              <ul className="list-disc pl-5 space-y-1">
                {insights.map((insight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="text-sm text-muted-foreground"
                  >
                    {insight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <CardHeader>
            <CardTitle>Parameter Impact Analysis</CardTitle>
            <CardDescription>Relative importance of each parameter on print quality</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={parameterImpactData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`${value}%`, "Impact"]} />
                  <Bar dataKey="value" fill="#8884d8" animationBegin={300} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={item}>
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-tl from-primary/5 via-transparent to-primary/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <CardHeader>
            <CardTitle>Parameter Optimization</CardTitle>
            <CardDescription>Comparison between current and optimal parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={comparisonData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Current Parameters"
                    dataKey="current"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Optimal Parameters"
                    dataKey="optimal"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-lg font-medium mb-2 mt-4">Parameter Comparison</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Parameter
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Current Value
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Recommended Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recommendations.polymerType && (
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">Polymer Type</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{result.polymerType}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          {recommendations.polymerType}
                        </td>
                      </tr>
                    )}
                    {recommendations.layerThickness && (
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">Layer Thickness</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{result.layerThickness}mm</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          {recommendations.layerThickness}mm
                        </td>
                      </tr>
                    )}
                    {recommendations.printSpeed && (
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">Print Speed</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{result.printSpeed}mm/s</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          {recommendations.printSpeed}mm/s
                        </td>
                      </tr>
                    )}
                    {recommendations.temperature && (
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">Temperature</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{result.temperature}°C</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          {recommendations.temperature}°C
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
