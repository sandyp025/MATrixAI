import { z } from "zod"

// Define the polymer types available in our system
export const polymerTypes = ["PLA-Gelatin", "PCL-Alginate", "PLGA-Collagen", "PEG-Fibrin", "PHA-Chitosan"] as const

// Input schema for parameter prediction
export const parameterPredictionSchema = z.object({
  polymerType: z.enum(polymerTypes, {
    required_error: "Please select a polymer type",
  }),
  layerThickness: z.coerce
    .number({
      required_error: "Layer thickness is required",
      invalid_type_error: "Layer thickness must be a number",
    })
    .min(0.05, { message: "Layer thickness must be at least 0.05mm" })
    .max(0.5, { message: "Layer thickness must be at most 0.5mm" }),
  printSpeed: z.coerce
    .number({
      required_error: "Print speed is required",
      invalid_type_error: "Print speed must be a number",
    })
    .min(5, { message: "Print speed must be at least 5mm/s" })
    .max(100, { message: "Print speed must be at most 100mm/s" }),
  temperature: z.coerce
    .number({
      required_error: "Temperature is required",
      invalid_type_error: "Temperature must be a number",
    })
    .min(100, { message: "Temperature must be at least 100°C" })
    .max(250, { message: "Temperature must be at most 250°C" }),
})

// Define the type from our schema
export type ParameterPredictionInput = z.infer<typeof parameterPredictionSchema>

// Helper function to create a schema that accepts both number and string (converting to number)
const numberOrString = () => z.union([z.number(), z.string().transform((val) => Number(val))])

// Define the structured output schema from Gemini AI
export const predictionResultSchema = z.object({
  printQuality: z.enum(["Good", "Medium", "Bad"]),
  confidenceScore: z.number().min(0).max(100),
  insights: z.array(z.string()),
  recommendations: z.object({
    polymerType: z.string().optional(),
    layerThickness: numberOrString().optional(),
    printSpeed: numberOrString().optional(),
    temperature: numberOrString().optional(),
  }),
  parameterImpact: z.object({
    polymerType: z.number(),
    layerThickness: z.number(),
    printSpeed: z.number(),
    temperature: z.number(),
  }),
  qualityDistribution: z.object({
    good: z.number(),
    medium: z.number(),
    bad: z.number(),
  }),
  polymerType: z.enum(polymerTypes),
  layerThickness: z.number(),
  printSpeed: z.number(),
  temperature: z.number(),
})

export type PredictionResult = z.infer<typeof predictionResultSchema>
