import { NextResponse } from "next/server"
import { parameterPredictionSchema, predictionResultSchema } from "@/lib/schemas/parameter-prediction"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI client
// In production, you would use an environment variable for the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the input using Zod
    const validationResult = parameterPredictionSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input parameters", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    const { polymerType, layerThickness, printSpeed, temperature } = validationResult.data
    const input = validationResult.data

    // In a production environment, you would call the Gemini API here
    // For this example, we'll simulate the response

    if (process.env.GEMINI_API_KEY) {
      // If we have an API key, call Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const prompt = `
You are an expert in 3D bioprinting. Analyze the following parameters for a 3D print:
- Polymer Type: ${polymerType}
- Layer Thickness: ${layerThickness}mm
- Print Speed: ${printSpeed}mm/s
- Temperature: ${temperature}°C

Provide a structured analysis of the expected print quality based on these parameters.
Return your response as a JSON object with the following structure:
{
  "printQuality": "Good" | "Medium" | "Bad",
  "confidenceScore": number between 0-100,
  "insights": [array of string insights about the parameters],
  "recommendations": {
    "polymerType": optional string recommendation,
    "layerThickness": optional number recommendation (must be a number, not a string),
    "printSpeed": optional number recommendation (must be a number, not a string),
    "temperature": optional number recommendation (must be a number, not a string)
  },
  "parameterImpact": {
    "polymerType": number between 0-100,
    "layerThickness": number between 0-100,
    "printSpeed": number between 0-100,
    "temperature": number between 0-100
  },
  "qualityDistribution": {
    "good": probability as number between 0-100,
    "medium": probability as number between 0-100,
    "bad": probability as number between 0-100
  }
}

IMPORTANT: All numeric values must be numbers, not strings. Do not wrap numbers in quotes.
`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        // Extract JSON from the response
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/({[\s\S]*})/)
        const jsonString = jsonMatch ? jsonMatch[1] : text
        const parsedResult = JSON.parse(jsonString)

        // Add the input parameters to the response object before validation
        parsedResult.polymerType = input.polymerType
        parsedResult.layerThickness = input.layerThickness
        parsedResult.printSpeed = input.printSpeed
        parsedResult.temperature = input.temperature

        // Convert string values to numbers in recommendations
        if (parsedResult.recommendations) {
          if (parsedResult.recommendations.layerThickness !== undefined) {
            parsedResult.recommendations.layerThickness = Number(parsedResult.recommendations.layerThickness)
          }
          if (parsedResult.recommendations.printSpeed !== undefined) {
            parsedResult.recommendations.printSpeed = Number(parsedResult.recommendations.printSpeed)
          }
          if (parsedResult.recommendations.temperature !== undefined) {
            parsedResult.recommendations.temperature = Number(parsedResult.recommendations.temperature)
          }
        }

        // Validate the response using Zod
        const validatedResult = predictionResultSchema.parse(parsedResult)

        return NextResponse.json({ success: true, result: validatedResult })
      } catch (error) {
        console.error("Error parsing Gemini response:", error)
        // Fall back to simulated response
        return NextResponse.json({ success: true, result: simulatePrediction(validationResult.data) })
      }
    }

    // Simulate a prediction result
    const result = simulatePrediction(validationResult.data)

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Error predicting parameters:", error)
    return NextResponse.json(
      { error: "Failed to predict parameters", details: (error as Error).message },
      { status: 500 },
    )
  }
}

// Function to simulate a prediction result
function simulatePrediction(params: any) {
  const { polymerType, layerThickness, printSpeed, temperature } = params

  // Calculate a quality score based on the parameters
  let qualityScore = 0

  // Polymer type impact
  switch (polymerType) {
    case "PLA-Gelatin":
      qualityScore += 80
      break
    case "PCL-Alginate":
      qualityScore += 75
      break
    case "PLGA-Collagen":
      qualityScore += 85
      break
    case "PEG-Fibrin":
      qualityScore += 70
      break
    case "PHA-Chitosan":
      qualityScore += 65
      break
  }

  // Layer thickness impact (thinner is generally better for detail)
  const thicknessScore = 100 - ((layerThickness - 0.05) / (0.5 - 0.05)) * 100
  qualityScore += thicknessScore * 0.3

  // Print speed impact (slower is generally better for quality)
  const speedScore = 100 - ((printSpeed - 5) / (100 - 5)) * 100
  qualityScore += speedScore * 0.2

  // Temperature impact (depends on polymer type)
  let optimalTemp = 0
  switch (polymerType) {
    case "PLA-Gelatin":
      optimalTemp = 140
      break
    case "PCL-Alginate":
      optimalTemp = 140
      break
    case "PLGA-Collagen":
      optimalTemp = 160
      break
    case "PEG-Fibrin":
      optimalTemp = 130
      break
    case "PHA-Chitosan":
      optimalTemp = 150
      break
  }

  const tempDiff = Math.abs(temperature - optimalTemp)
  const tempScore = 100 - (tempDiff / 30) * 100
  qualityScore += tempScore * 0.3

  // Normalize the quality score
  qualityScore = Math.min(100, Math.max(0, qualityScore / 1.8))

  // Determine print quality
  let printQuality: "Good" | "Medium" | "Bad"
  if (qualityScore >= 75) {
    printQuality = "Good"
  } else if (qualityScore >= 50) {
    printQuality = "Medium"
  } else {
    printQuality = "Bad"
  }

  // Generate insights
  const insights = []

  if (layerThickness > 0.3) {
    insights.push("Layer thickness is relatively high, which may reduce print detail.")
  } else if (layerThickness < 0.1) {
    insights.push("Very thin layers may increase print time and risk of print failures.")
  }

  if (printSpeed > 60) {
    insights.push("High print speed may reduce print quality, especially for complex structures.")
  } else if (printSpeed < 15) {
    insights.push("Very slow print speed will result in longer print times.")
  }

  if (tempDiff > 20) {
    insights.push(`Temperature is significantly different from the optimal temperature for ${polymerType}.`)
  }

  // Add polymer-specific insights
  switch (polymerType) {
    case "PLA-Gelatin":
      insights.push("PLA-Gelatin blends offer good biocompatibility and moderate mechanical properties.")
      insights.push("Optimal printing temperature is around 140°C for this blend.")
      break
    case "PCL-Alginate":
      insights.push("PCL-Alginate composites provide excellent flexibility and controlled degradation.")
      insights.push("Lower temperatures (130-140°C) are recommended for this blend.")
      break
    case "PLGA-Collagen":
      insights.push("PLGA-Collagen scaffolds offer superior cell adhesion and controlled degradation.")
      break
    case "PEG-Fibrin":
      insights.push(
        "PEG-Fibrin hydrogels are excellent for soft tissue applications but have lower mechanical strength.",
      )
      insights.push("Lower printing temperatures (120-130°C) help preserve bioactivity.")
      break
    case "PHA-Chitosan":
      insights.push("PHA-Chitosan blends provide good antimicrobial properties but can be challenging to print.")
      break
  }

  // Generate recommendations
  const recommendations: any = {}

  if (tempDiff > 10) {
    recommendations.temperature = optimalTemp
  }

  if (layerThickness > 0.3 && printQuality !== "Good") {
    recommendations.layerThickness = 0.2
  }

  if (printSpeed > 60 && printQuality !== "Good") {
    recommendations.printSpeed = 30
  }

  if (printQuality === "Bad" && polymerType === "PHA-Chitosan") {
    recommendations.polymerType = "PLGA-Collagen"
    insights.push("Consider switching to PLGA-Collagen for better printability.")
  }

  // Calculate parameter impact
  const parameterImpact = {
    polymerType: 35,
    layerThickness: 25,
    printSpeed: 15,
    temperature: 25,
  }

  // Calculate quality distribution
  let good = 0,
    medium = 0,
    bad = 0

  if (printQuality === "Good") {
    good = qualityScore
    medium = 100 - qualityScore
    bad = 0
  } else if (printQuality === "Medium") {
    good = qualityScore - 50
    medium = 100 - good - (100 - qualityScore)
    bad = 100 - qualityScore
  } else {
    good = 0
    medium = qualityScore
    bad = 100 - qualityScore
  }

  return {
    printQuality,
    confidenceScore: Math.round(qualityScore),
    insights,
    recommendations,
    parameterImpact,
    qualityDistribution: {
      good,
      medium,
      bad,
    },
  }
}
