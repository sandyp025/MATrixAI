import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "@/components/ui/chart"
import Image from "next/image"

export function CaseStudies() {
  // Case study 1 data
  const case1Data = [
    { name: "Low", value: 0.85 },
    { name: "Medium", value: 0.12 },
    { name: "High", value: 0.03 },
  ]

  // Case study 2 data
  const case2Data = [
    { name: "Low", value: 0.78 },
    { name: "Medium", value: 0.18 },
    { name: "High", value: 0.04 },
  ]

  // Case study 3 data
  const case3Data = [
    { name: "Low", value: 0.03 },
    { name: "Medium", value: 0.25 },
    { name: "High", value: 0.72 },
  ]

  // Radar chart data for parameter comparison
  const radarData = [
    {
      subject: "Cell Density",
      "High-Stress Failure": 1.0,
      "Under-Crosslink Defect": 0.5,
      'Optimal "Sweet Spot"': 0.3,
      fullMark: 1,
    },
    {
      subject: "Temperature",
      "High-Stress Failure": 0.8,
      "Under-Crosslink Defect": 0.3,
      'Optimal "Sweet Spot"': 0.6,
      fullMark: 1,
    },
    {
      subject: "Print Speed",
      "High-Stress Failure": 1.0,
      "Under-Crosslink Defect": 0.7,
      'Optimal "Sweet Spot"': 0.7,
      fullMark: 1,
    },
    {
      subject: "Layer Height",
      "High-Stress Failure": 0.7,
      "Under-Crosslink Defect": 0.9,
      'Optimal "Sweet Spot"': 0.7,
      fullMark: 1,
    },
    {
      subject: "Crosslink Time",
      "High-Stress Failure": 0.6,
      "Under-Crosslink Defect": 0.2,
      'Optimal "Sweet Spot"': 0.6,
      fullMark: 1,
    },
    {
      subject: "Viscosity",
      "High-Stress Failure": 0.7,
      "Under-Crosslink Defect": 0.4,
      'Optimal "Sweet Spot"': 0.8,
      fullMark: 1,
    },
  ]

  const COLORS = ["#FF8042", "#FFBB28", "#00C49F"]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Case Studies Overview</CardTitle>
          <CardDescription>Representative scenarios demonstrating model predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 1]} />
                <Radar
                  name="High-Stress Failure"
                  dataKey="High-Stress Failure"
                  stroke="#FF8042"
                  fill="#FF8042"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Under-Crosslink Defect"
                  dataKey="Under-Crosslink Defect"
                  stroke="#FFBB28"
                  fill="#FFBB28"
                  fillOpacity={0.6}
                />
                <Radar
                  name='Optimal "Sweet Spot"'
                  dataKey='Optimal "Sweet Spot"'
                  stroke="#00C49F"
                  fill="#00C49F"
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case 1: High-Stress Failure</CardTitle>
          <CardDescription>Excessive cell density and print speed induced shear damage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2">
              <Image
                src="/bioprinting-cell-damage.png"
                width={200}
                height={150}
                alt="High-stress failure case"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={case1Data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {case1Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Probability"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Parameters:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Cell density: 15 ×10⁶ cells/mL</Badge>
              <Badge variant="outline">Speed: 40 mm/s</Badge>
              <Badge variant="outline">Temp: 200 °C</Badge>
              <Badge variant="outline">Layer: 0.3 mm</Badge>
              <Badge variant="outline">Viscosity: 3.0 Pa·s</Badge>
              <Badge variant="outline">Crosslink: 45 s</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              The combination of maximum cell density and high print speed induced excessive shear stress and poor
              nutrient diffusion, resulting in low cell viability.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Badge className="bg-red-500">Actual Viability: Low</Badge>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case 2: Under-Crosslink Defect</CardTitle>
          <CardDescription>Insufficient crosslinking time led to weak mechanical integrity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2">
              <Image
                src="/fragile-scaffold.png"
                width={200}
                height={150}
                alt="Under-crosslink defect case"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={case2Data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {case2Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Probability"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Parameters:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Cell density: 8 ×10⁶ cells/mL</Badge>
              <Badge variant="outline">Speed: 30 mm/s</Badge>
              <Badge variant="outline">Temp: 185 °C</Badge>
              <Badge variant="outline">Layer: 0.35 mm</Badge>
              <Badge variant="outline">Viscosity: 2.5 Pa·s</Badge>
              <Badge variant="outline">Crosslink: 30 s</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Microscopy revealed filament spreading and weak mechanical integrity due to insufficient crosslinking
              time, despite moderate cell density and print speed.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Badge className="bg-red-500">Actual Viability: Low</Badge>
        </CardFooter>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Case 3: Optimal "Sweet Spot"</CardTitle>
          <CardDescription>Balanced parameters yielded high viability and structural integrity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/3">
              <Image
                src="/cellular-scaffold.png"
                width={300}
                height={200}
                alt="Optimal sweet spot case"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full md:w-1/3 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={case3Data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {case3Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Probability"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/3 space-y-2">
              <h4 className="text-sm font-medium">Parameters:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Cell density: 6 ×10⁶ cells/mL</Badge>
                <Badge variant="outline">Speed: 30 mm/s</Badge>
                <Badge variant="outline">Temp: 190 °C</Badge>
                <Badge variant="outline">Layer: 0.30 mm</Badge>
                <Badge variant="outline">Viscosity: 3.2 Pa·s</Badge>
                <Badge variant="outline">Crosslink: 45 s</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Prints exhibited uniform strands, minimal shear damage, and &gt;90% live cells. This "sweet spot"
                balances all parameters for optimal outcomes.
              </p>
              <Badge className="bg-green-500 mt-2">Actual Viability: High</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
