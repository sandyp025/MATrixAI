"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ParameterPredictionForm } from "@/components/parameter-prediction-form"
import { PredictionResults } from "@/components/prediction-results"
import type { PredictionResult } from "@/lib/schemas/parameter-prediction"

export default function ParameterPredictionPage() {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)

  return (
    <div className="container py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight relative inline-block">
          AI Parameter Prediction
          <motion.span
            className="absolute -inset-1 -z-10 rounded-lg bg-primary/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </h1>
        <p className="mt-2 text-muted-foreground">
          Use machine learning to predict optimal 3D printing parameters for biomaterials
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <ParameterPredictionForm onPredictionResult={setPredictionResult} />
        </div>

        <div>
          {predictionResult ? (
            <PredictionResults result={predictionResult} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center p-8 border rounded-lg bg-muted/20 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <motion.div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                  <h3 className="text-lg font-medium mb-2">No Prediction Yet</h3>
                  <p className="text-muted-foreground">
                    Enter your parameters and click "Predict Print Quality" to get AI-powered recommendations.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
