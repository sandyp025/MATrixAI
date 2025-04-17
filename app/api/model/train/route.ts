import { NextResponse } from "next/server"
import { trainModel, type ModelConfig } from "@/lib/model-training"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const config: ModelConfig = body.config

    if (!config) {
      return NextResponse.json({ error: "Model configuration is required" }, { status: 400 })
    }

    // Train the model
    const result = await trainModel(config)

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Error training model:", error)
    return NextResponse.json({ error: "Failed to train model", details: (error as Error).message }, { status: 500 })
  }
}
