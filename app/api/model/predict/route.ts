import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { parameters } = body

    if (!parameters) {
      return NextResponse.json({ error: "Bioprinting parameters are required" }, { status: 400 })
    }

    // In a real implementation, we would load the trained model
    // and use it to make predictions
    // For this example, we'll simulate the prediction

    // Simple prediction function based on the paper's findings
    const predictViability = (params: any) => {
      // This is a simplified model based on the paper's findings
      let score = 0

      // Cell density (most important - 28%)
      if (params.cellDensity <= 7) score += 0.28
      else if (params.cellDensity <= 10) score += 0.28 * 0.7
      else if (params.cellDensity <= 12) score += 0.28 * 0.4
      else score += 0.28 * 0.2

      // Temperature (22%)
      const tempOptimal = Math.abs(params.temperature - 190) <= 5
      const tempAcceptable = Math.abs(params.temperature - 190) <= 10
      if (tempOptimal) score += 0.22
      else if (tempAcceptable) score += 0.22 * 0.7
      else score += 0.22 * 0.3

      // Layer height (18%)
      const layerOptimal = Math.abs(params.layerHeight - 0.3) <= 0.05
      if (layerOptimal) score += 0.18
      else score += 0.18 * 0.5

      // Print speed (15%)
      if (params.printSpeed <= 35) score += 0.15
      else score += 0.15 * 0.5

      // Crosslink time (12%)
      if (params.crosslinkTime >= 45) score += 0.12
      else if (params.crosslinkTime >= 35) score += 0.12 * 0.7
      else score += 0.12 * 0.3

      // Viscosity (5%)
      if (params.viscosity >= 2.5 && params.viscosity <= 3.5) score += 0.05
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

      return {
        low: lowProb,
        medium: mediumProb,
        high: highProb,
      }
    }

    const prediction = predictViability(parameters)

    return NextResponse.json({
      success: true,
      prediction,
      mostLikely: Object.entries(prediction).reduce((a, b) => (a[1] > b[1] ? a : b))[0],
    })
  } catch (error) {
    console.error("Error predicting viability:", error)
    return NextResponse.json(
      { error: "Failed to predict viability", details: (error as Error).message },
      { status: 500 },
    )
  }
}
