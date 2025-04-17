"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react"

export function ParameterExplorer() {
  const [cellDensity, setCellDensity] = useState(8)
  const [temperature, setTemperature] = useState(190)
  const [printSpeed, setPrintSpeed] = useState(30)
  const [layerHeight, setLayerHeight] = useState(0.3)
  const [viscosity, setViscosity] = useState(3)
  const [crosslinkTime, setCrosslinkTime] = useState(45)
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Fetch prediction from API when parameters change
  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/model/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parameters: {
              cellDensity,
              temperature,
              printSpeed,
              layerHeight,
              viscosity,
              crosslinkTime,
            },
          }),
        })

        const data = await response.json()
        if (data.success) {
          setPrediction(data.prediction)
        }
      } catch (error) {
        console.error("Error fetching prediction:", error)
      } finally {
        setLoading(false)
      }
    }

    // Use debounce to avoid too many API calls
    const timer = setTimeout(() => {
      fetchPrediction()
    }, 500)

    return () => clearTimeout(timer)
  }, [cellDensity, temperature, printSpeed, layerHeight, viscosity, crosslinkTime])

  // Simple prediction function based on the paper's findings
  const predictViability = () => {
    // This is a simplified model based on the paper's findings
    // In a real application, this would use the actual trained model

    let score = 0

    // Cell density (most important - 28%)
    if (cellDensity <= 7) score += 0.28
    else if (cellDensity <= 10) score += 0.28 * 0.7
    else if (cellDensity <= 12) score += 0.28 * 0.4
    else score += 0.28 * 0.2

    // Temperature (22%)
    const tempOptimal = Math.abs(temperature - 190) <= 5
    const tempAcceptable = Math.abs(temperature - 190) <= 10
    if (tempOptimal) score += 0.22
    else if (tempAcceptable) score += 0.22 * 0.7
    else score += 0.22 * 0.3

    // Layer height (18%)
    const layerOptimal = Math.abs(layerHeight - 0.3) <= 0.05
    if (layerOptimal) score += 0.18
    else score += 0.18 * 0.5

    // Print speed (15%)
    if (printSpeed <= 35) score += 0.15
    else score += 0.15 * 0.5

    // Crosslink time (12%)
    if (crosslinkTime >= 45) score += 0.12
    else if (crosslinkTime >= 35) score += 0.12 * 0.7
    else score += 0.12 * 0.3

    // Viscosity (5%)
    if (viscosity >= 2.5 && viscosity <= 3.5) score += 0.05
    else score += 0.05 * 0.5

    // Calculate probabilities based on score
    let highProb, mediumProb, lowProb

    if (score >= 0.8) {
      highProb = 0.7 + (score - 0.8) * 1.5
      mediumProb = 1 - highProb - 0.05
      lowProb = 0.05
    } else if (score >= 0.6) {
      mediumProb = 0.6 + (score - 0.6)
      highProb = (score - 0.6) * 2
      lowProb = 1 - highProb - mediumProb
    } else {
      lowProb = 0.7 + (0.6 - score) * 0.5
      mediumProb = 1 - lowProb - 0.05
      highProb = 0.05
    }

    return [
      { name: "Low", value: lowProb },
      { name: "Medium", value: mediumProb },
      { name: "High", value: highProb },
    ]
  }

  const predictionData = prediction
    ? [
        { name: "Low", value: prediction.low },
        { name: "Medium", value: prediction.medium },
        { name: "High", value: prediction.high },
      ]
    : predictViability()

  // Determine the most likely outcome
  const mostLikelyOutcome = predictionData.reduce((prev, current) => (prev.value > current.value ? prev : current))

  const resetParameters = () => {
    setCellDensity(8)
    setTemperature(190)
    setPrintSpeed(30)
    setLayerHeight(0.3)
    setViscosity(3)
    setCrosslinkTime(45)
  }

  const COLORS = ["#FF8042", "#FFBB28", "#00C49F"]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Parameter Explorer</CardTitle>
          <CardDescription>Adjust bioprinting parameters to see predicted viability outcomes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Cell Density (×10⁶ cells/mL)</span>
              <span className="text-sm text-muted-foreground">{cellDensity}</span>
            </div>
            <Slider
              value={[cellDensity]}
              min={5}
              max={15}
              step={1}
              onValueChange={(value) => setCellDensity(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Nozzle Temperature (°C)</span>
              <span className="text-sm text-muted-foreground">{temperature}</span>
            </div>
            <Slider
              value={[temperature]}
              min={180}
              max={210}
              step={1}
              onValueChange={(value) => setTemperature(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Print Speed (mm/s)</span>
              <span className="text-sm text-muted-foreground">{printSpeed}</span>
            </div>
            <Slider
              value={[printSpeed]}
              min={20}
              max={40}
              step={1}
              onValueChange={(value) => setPrintSpeed(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Layer Height (mm)</span>
              <span className="text-sm text-muted-foreground">{layerHeight.toFixed(2)}</span>
            </div>
            <Slider
              value={[layerHeight * 100]}
              min={20}
              max={40}
              step={1}
              onValueChange={(value) => setLayerHeight(value[0] / 100)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Viscosity (Pa·s)</span>
              <span className="text-sm text-muted-foreground">{viscosity.toFixed(1)}</span>
            </div>
            <Slider
              value={[viscosity * 10]}
              min={20}
              max={40}
              step={1}
              onValueChange={(value) => setViscosity(value[0] / 10)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Crosslink Time (s)</span>
              <span className="text-sm text-muted-foreground">{crosslinkTime}</span>
            </div>
            <Slider
              value={[crosslinkTime]}
              min={30}
              max={60}
              step={1}
              onValueChange={(value) => setCrosslinkTime(value[0])}
            />
          </div>

          <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={resetParameters}>
            <RefreshCw className="h-4 w-4" /> Reset Parameters
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Viability Prediction</CardTitle>
          <CardDescription>Predicted outcome based on selected parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={predictionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {predictionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Probability"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {mostLikelyOutcome.name === "High" ? (
              <Badge className="bg-green-500 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Likely High Viability
              </Badge>
            ) : mostLikelyOutcome.name === "Medium" ? (
              <Badge className="bg-yellow-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Likely Medium Viability
              </Badge>
            ) : (
              <Badge className="bg-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Likely Low Viability
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
          {cellDensity > 10 && (
            <p className="text-xs text-muted-foreground">• Reduce cell density below 10 ×10⁶ cells/mL</p>
          )}
          {Math.abs(temperature - 190) > 5 && (
            <p className="text-xs text-muted-foreground">• Adjust temperature closer to 190°C</p>
          )}
          {printSpeed > 35 && <p className="text-xs text-muted-foreground">• Reduce print speed below 35 mm/s</p>}
          {Math.abs(layerHeight - 0.3) > 0.05 && (
            <p className="text-xs text-muted-foreground">• Set layer height closer to 0.3 mm</p>
          )}
          {crosslinkTime < 45 && (
            <p className="text-xs text-muted-foreground">• Increase crosslink time to at least 45s</p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
