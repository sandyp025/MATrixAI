import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "@/components/ui/chart"

export function ModelPerformance() {
  // Confusion matrix data
  const confusionMatrixData = [
    { name: "Low (Actual)", "Low (Predicted)": 30, "Medium (Predicted)": 4, "High (Predicted)": 1 },
    { name: "Medium (Actual)", "Low (Predicted)": 5, "Medium (Predicted)": 40, "High (Predicted)": 3 },
    { name: "High (Actual)", "Low (Predicted)": 2, "Medium (Predicted)": 6, "High (Predicted)": 50 },
  ]

  // Per-class metrics data
  const classMetricsData = [
    { name: "High", Precision: 0.93, Recall: 0.92, "F1-Score": 0.93 },
    { name: "Medium", Precision: 0.82, Recall: 0.8, "F1-Score": 0.81 },
    { name: "Low", Precision: 0.86, Recall: 0.85, "F1-Score": 0.86 },
  ]

  // ROC curve data (simplified)
  const rocCurveData = [
    { name: "0%", "High Class": 0, "Medium Class": 0, "Low Class": 0 },
    { name: "20%", "High Class": 0.35, "Medium Class": 0.28, "Low Class": 0.3 },
    { name: "40%", "High Class": 0.62, "Medium Class": 0.55, "Low Class": 0.58 },
    { name: "60%", "High Class": 0.78, "Medium Class": 0.7, "Low Class": 0.74 },
    { name: "80%", "High Class": 0.9, "Medium Class": 0.82, "Low Class": 0.85 },
    { name: "100%", "High Class": 1, "Medium Class": 1, "Low Class": 1 },
  ]

  // Overall metrics data
  const overallMetricsData = [
    { name: "Accuracy", value: 0.9 },
    { name: "Macro Precision", value: 0.87 },
    { name: "Macro Recall", value: 0.86 },
    { name: "Macro F1", value: 0.86 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Model Performance Overview</CardTitle>
          <CardDescription>Random Forest classifier performance metrics on the test set (30 prints)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overallMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Value"]} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>Actual vs. predicted viability categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={confusionMatrixData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Low (Predicted)" stackId="a" fill="#ff8042" />
                <Bar dataKey="Medium (Predicted)" stackId="a" fill="#ffbb28" />
                <Bar dataKey="High (Predicted)" stackId="a" fill="#00c49f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Per-Class Metrics</CardTitle>
          <CardDescription>Precision, recall, and F1-score by viability class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Value"]} />
                <Legend />
                <Bar dataKey="Precision" fill="#8884d8" />
                <Bar dataKey="Recall" fill="#82ca9d" />
                <Bar dataKey="F1-Score" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>ROC Curves</CardTitle>
          <CardDescription>Receiver Operating Characteristic curves for each class (one-vs-rest)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rocCurveData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="High Class" stroke="#00c49f" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Medium Class" stroke="#ffbb28" />
                <Line type="monotone" dataKey="Low Class" stroke="#ff8042" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
