"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
  parameterPredictionSchema,
  polymerTypes,
  type ParameterPredictionInput,
  type PredictionResult,
} from "@/lib/schemas/parameter-prediction"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RefreshCw } from "lucide-react"

interface ParameterPredictionFormProps {
  onPredictionResult: (result: PredictionResult) => void
}

export function ParameterPredictionForm({ onPredictionResult }: ParameterPredictionFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<ParameterPredictionInput>({
    resolver: zodResolver(parameterPredictionSchema),
    defaultValues: {
      polymerType: "PLA-Gelatin",
      layerThickness: 0.2,
      printSpeed: 30,
      temperature: 190,
    },
  })

  // Handle form submission
  const onSubmit = async (data: ParameterPredictionInput) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/predict-parameters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        onPredictionResult(result.result)
      } else {
        console.error("Prediction error:", result.error)
        // Handle error
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const formFields = [
    {
      name: "polymerType",
      label: "Polymer Type",
      description: "Select the type of polymer blend for your bioprinting",
    },
    {
      name: "layerThickness",
      label: "Layer Thickness (mm)",
      description: "The thickness of each printed layer (0.05mm - 0.5mm)",
    },
    {
      name: "printSpeed",
      label: "Print Speed (mm/s)",
      description: "The speed at which the print head moves (5mm/s - 100mm/s)",
    },
    {
      name: "temperature",
      label: "Temperature (°C)",
      description: "The nozzle temperature for printing (100°C - 250°C)",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <CardHeader>
          <CardTitle>Parameter Prediction</CardTitle>
          <CardDescription>Enter your biomaterial parameters to predict print quality</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {field.name === "polymerType" ? (
                    <FormField
                      control={form.control}
                      name="polymerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{formFields[0].label}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                                <SelectValue placeholder="Select polymer type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {polymerTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>{formFields[0].description}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name={field.name as "layerThickness" | "printSpeed" | "temperature"}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>{field.label}</FormLabel>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <FormControl>
                                <Input
                                  type="number"
                                  step={field.name === "layerThickness" ? "0.01" : "1"}
                                  min={
                                    field.name === "layerThickness" ? "0.05" : field.name === "printSpeed" ? "5" : "100"
                                  }
                                  max={
                                    field.name === "layerThickness"
                                      ? "0.5"
                                      : field.name === "printSpeed"
                                        ? "100"
                                        : "250"
                                  }
                                  {...formField}
                                  disabled={isLoading}
                                  className="transition-all duration-300 hover:border-primary focus:border-primary"
                                />
                              </FormControl>
                              <span className="w-16 text-sm text-muted-foreground text-right">
                                {formField.value}{" "}
                                {field.name === "layerThickness" ? "mm" : field.name === "printSpeed" ? "mm/s" : "°C"}
                              </span>
                            </div>
                            <Slider
                              value={[formField.value]}
                              min={field.name === "layerThickness" ? 0.05 : field.name === "printSpeed" ? 5 : 100}
                              max={field.name === "layerThickness" ? 0.5 : field.name === "printSpeed" ? 100 : 250}
                              step={field.name === "layerThickness" ? 0.01 : 1}
                              onValueChange={(value) => formField.onChange(value[0])}
                              disabled={isLoading}
                              className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                            />
                          </div>
                          <FormDescription>{field.description}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                  <span className="relative z-10">
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Predicting...
                      </>
                    ) : (
                      "Predict Print Quality"
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
