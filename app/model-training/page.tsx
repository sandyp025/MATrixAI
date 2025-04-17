"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "@/components/ui/chart"
import { AlertCircle, CheckCircle2, Download, Play, RefreshCw } from "lucide-react"
import { DatasetUploadButton } from "@/components/dataset-upload-button"
import { Toaster } from "@/components/ui/toaster"

export default function ModelTrainingPage() {
  const [activeTab, setActiveTab] = useState("configuration")
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [trainingStatus, setTrainingStatus] = useState<"idle" | "training" | "completed" | "error">("idle")
  const [trainingMetrics, setTrainingMetrics] = useState<any[]>([])
  const [modelConfig, setModelConfig] = useState({
    modelType: "randomForest",
    trainTestSplit: 0.8,
    randomSeed: 42,
    hyperparameters: {
      randomForest: {
        nEstimators: 100,
        maxDepth: 10,
        minSamplesLeaf: 1,
        bootstrap: true,
      },
      svm: {
        kernel: "rbf",
        C: 1.0,
        gamma: "scale",
      },
      neuralNetwork: {
        hiddenLayers: [64, 32],
        learningRate: 0.001,
        epochs: 100,
        batchSize: 32,
      },
    },
  })
  const [customDataset, setCustomDataset] = useState<{
    filename: string
    rowCount: number
  } | null>(null)

  // Training history data
  const trainingHistoryData = [
    { epoch: 1, accuracy: 0.65, loss: 0.75, valAccuracy: 0.62, valLoss: 0.78 },
    { epoch: 2, accuracy: 0.72, loss: 0.65, valAccuracy: 0.68, valLoss: 0.7 },
    { epoch: 3, accuracy: 0.78, loss: 0.55, valAccuracy: 0.73, valLoss: 0.62 },
    { epoch: 4, accuracy: 0.82, loss: 0.48, valAccuracy: 0.76, valLoss: 0.56 },
    { epoch: 5, accuracy: 0.85, loss: 0.42, valAccuracy: 0.79, valLoss: 0.51 },
    { epoch: 6, accuracy: 0.87, loss: 0.38, valAccuracy: 0.81, valLoss: 0.47 },
    { epoch: 7, accuracy: 0.89, loss: 0.35, valAccuracy: 0.83, valLoss: 0.44 },
    { epoch: 8, accuracy: 0.9, loss: 0.32, valAccuracy: 0.84, valLoss: 0.42 },
    { epoch: 9, accuracy: 0.91, loss: 0.3, valAccuracy: 0.85, valLoss: 0.4 },
    { epoch: 10, accuracy: 0.92, loss: 0.28, valAccuracy: 0.86, valLoss: 0.38 },
  ]

  // Feature importance data after training
  const featureImportanceData = [
    { feature: "Cell Density", importance: 28 },
    { feature: "Nozzle Temperature", importance: 22 },
    { feature: "Layer Height", importance: 18 },
    { feature: "Print Speed", importance: 15 },
    { feature: "Crosslink Time", importance: 12 },
    { feature: "Viscosity", importance: 5 },
  ]

  // Confusion matrix data
  const confusionMatrixData = {
    labels: ["Low", "Medium", "High"],
    matrix: [
      [30, 4, 1], // Predicted Low
      [5, 40, 3], // Predicted Medium
      [2, 6, 50], // Predicted High
    ],
  }

  const handleStartTraining = async () => {
    setTrainingStatus("training")
    setTrainingProgress(0)
    setActiveTab("training")

    try {
      // Simulate training progress
      for (let i = 1; i <= 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTrainingProgress(i * 10)
        setTrainingMetrics(trainingHistoryData.slice(0, i))
      }

      // Call the actual training function (in a real app)
      // const result = await trainModel(modelConfig)

      setTrainingStatus("completed")
    } catch (error) {
      console.error("Training error:", error)
      setTrainingStatus("error")
    }
  }

  const handleResetTraining = () => {
    setTrainingStatus("idle")
    setTrainingProgress(0)
    setTrainingMetrics([])
  }

  const updateHyperparameter = (model: string, param: string, value: any) => {
    setModelConfig({
      ...modelConfig,
      hyperparameters: {
        ...modelConfig.hyperparameters,
        [model]: {
          ...modelConfig.hyperparameters[model as keyof typeof modelConfig.hyperparameters],
          [param]: value,
        },
      },
    })
  }

  const handleUploadComplete = (data: any) => {
    setCustomDataset({
      filename: data.filename,
      rowCount: data.rowCount,
    })
  }

  return (
    <div className="container py-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight relative inline-block">
          Model Training
          <motion.span
            className="absolute -inset-1 -z-10 rounded-lg bg-primary/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </h1>
        <p className="mt-2 text-muted-foreground">
          Train and evaluate machine learning models for bioprinting parameter optimization
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background/80 backdrop-blur-sm">
          <TabsTrigger
            value="configuration"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Configuration
          </TabsTrigger>
          <TabsTrigger
            value="training"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Training
          </TabsTrigger>
          <TabsTrigger
            value="evaluation"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Evaluation
          </TabsTrigger>
          <TabsTrigger
            value="deployment"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Deployment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 md:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Dataset Configuration</CardTitle>
                  <CardDescription>Configure the dataset for model training</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataset">Dataset Source</Label>
                    <Select defaultValue={customDataset ? "custom" : "default"}>
                      <SelectTrigger
                        id="dataset"
                        className="transition-all duration-300 hover:border-primary focus:border-primary"
                      >
                        <SelectValue placeholder="Select dataset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Bioprinting Dataset (150 samples)</SelectItem>
                        <SelectItem value="extended">Extended Dataset (250 samples)</SelectItem>
                        <SelectItem value="custom" disabled={!customDataset}>
                          {customDataset
                            ? `${customDataset.filename} (${customDataset.rowCount} samples)`
                            : "Custom Uploaded Dataset"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="split">Train/Test Split</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="split"
                        defaultValue={[80]}
                        max={90}
                        min={50}
                        step={5}
                        onValueChange={(value) => setModelConfig({ ...modelConfig, trainTestSplit: value[0] / 100 })}
                        className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                      />
                      <span className="w-12 text-sm">{modelConfig.trainTestSplit * 100}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seed">Random Seed</Label>
                    <Input
                      id="seed"
                      type="number"
                      defaultValue={modelConfig.randomSeed}
                      onChange={(e) => setModelConfig({ ...modelConfig, randomSeed: Number.parseInt(e.target.value) })}
                      className="transition-all duration-300 hover:border-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="preprocessing" defaultChecked />
                    <Label htmlFor="preprocessing">Apply data preprocessing</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="augmentation" />
                    <Label htmlFor="augmentation">Use data augmentation</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <DatasetUploadButton className="w-full" onUploadComplete={handleUploadComplete} />
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Model Configuration</CardTitle>
                  <CardDescription>Select model type and configure hyperparameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model-type">Model Type</Label>
                    <Select
                      defaultValue={modelConfig.modelType}
                      onValueChange={(value) => setModelConfig({ ...modelConfig, modelType: value })}
                    >
                      <SelectTrigger
                        id="model-type"
                        className="transition-all duration-300 hover:border-primary focus:border-primary"
                      >
                        <SelectValue placeholder="Select model type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="randomForest">Random Forest</SelectItem>
                        <SelectItem value="svm">Support Vector Machine</SelectItem>
                        <SelectItem value="neuralNetwork">Neural Network</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {modelConfig.modelType === "randomForest" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 border rounded-md p-4"
                    >
                      <h4 className="font-medium">Random Forest Hyperparameters</h4>

                      <div className="space-y-2">
                        <Label htmlFor="n-estimators">Number of Trees</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="n-estimators"
                            defaultValue={[modelConfig.hyperparameters.randomForest.nEstimators]}
                            max={500}
                            min={10}
                            step={10}
                            onValueChange={(value) => updateHyperparameter("randomForest", "nEstimators", value[0])}
                            className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                          />
                          <span className="w-12 text-sm">{modelConfig.hyperparameters.randomForest.nEstimators}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max-depth">Max Depth</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="max-depth"
                            defaultValue={[modelConfig.hyperparameters.randomForest.maxDepth]}
                            max={30}
                            min={1}
                            step={1}
                            onValueChange={(value) => updateHyperparameter("randomForest", "maxDepth", value[0])}
                            className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                          />
                          <span className="w-12 text-sm">{modelConfig.hyperparameters.randomForest.maxDepth}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="min-samples-leaf">Min Samples per Leaf</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="min-samples-leaf"
                            defaultValue={[modelConfig.hyperparameters.randomForest.minSamplesLeaf]}
                            max={10}
                            min={1}
                            step={1}
                            onValueChange={(value) => updateHyperparameter("randomForest", "minSamplesLeaf", value[0])}
                            className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                          />
                          <span className="w-12 text-sm">
                            {modelConfig.hyperparameters.randomForest.minSamplesLeaf}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="bootstrap"
                          checked={modelConfig.hyperparameters.randomForest.bootstrap}
                          onCheckedChange={(checked) => updateHyperparameter("randomForest", "bootstrap", checked)}
                        />
                        <Label htmlFor="bootstrap">Use bootstrap sampling</Label>
                      </div>
                    </motion.div>
                  )}

                  {modelConfig.modelType === "svm" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 border rounded-md p-4"
                    >
                      <h4 className="font-medium">SVM Hyperparameters</h4>

                      <div className="space-y-2">
                        <Label htmlFor="kernel">Kernel</Label>
                        <Select
                          defaultValue={modelConfig.hyperparameters.svm.kernel}
                          onValueChange={(value) => updateHyperparameter("svm", "kernel", value)}
                        >
                          <SelectTrigger
                            id="kernel"
                            className="transition-all duration-300 hover:border-primary focus:border-primary"
                          >
                            <SelectValue placeholder="Select kernel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="poly">Polynomial</SelectItem>
                            <SelectItem value="rbf">RBF</SelectItem>
                            <SelectItem value="sigmoid">Sigmoid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="c-value">C (Regularization)</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="c-value"
                            defaultValue={[modelConfig.hyperparameters.svm.C]}
                            max={10}
                            min={0.1}
                            step={0.1}
                            onValueChange={(value) => updateHyperparameter("svm", "C", value[0])}
                            className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                          />
                          <span className="w-12 text-sm">{modelConfig.hyperparameters.svm.C.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gamma">Gamma</Label>
                        <Select
                          defaultValue={modelConfig.hyperparameters.svm.gamma}
                          onValueChange={(value) => updateHyperparameter("svm", "gamma", value)}
                        >
                          <SelectTrigger
                            id="gamma"
                            className="transition-all duration-300 hover:border-primary focus:border-primary"
                          >
                            <SelectValue placeholder="Select gamma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scale">Scale</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {modelConfig.modelType === "neuralNetwork" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 border rounded-md p-4"
                    >
                      <h4 className="font-medium">Neural Network Hyperparameters</h4>

                      <div className="space-y-2">
                        <Label htmlFor="hidden-layers">Hidden Layers</Label>
                        <Input
                          id="hidden-layers"
                          value={modelConfig.hyperparameters.neuralNetwork.hiddenLayers.join(", ")}
                          onChange={(e) => {
                            const layers = e.target.value
                              .split(",")
                              .map((n) => Number.parseInt(n.trim()))
                              .filter((n) => !isNaN(n))
                            updateHyperparameter("neuralNetwork", "hiddenLayers", layers)
                          }}
                          className="transition-all duration-300 hover:border-primary focus:border-primary"
                        />
                        <p className="text-xs text-muted-foreground">Comma-separated list of neurons per layer</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="learning-rate">Learning Rate</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="learning-rate"
                            defaultValue={[modelConfig.hyperparameters.neuralNetwork.learningRate * 1000]}
                            max={10}
                            min={0.1}
                            step={0.1}
                            onValueChange={(value) =>
                              updateHyperparameter("neuralNetwork", "learningRate", value[0] / 1000)
                            }
                            className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                          />
                          <span className="w-16 text-sm">
                            {modelConfig.hyperparameters.neuralNetwork.learningRate.toFixed(4)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="epochs">Epochs</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="epochs"
                            defaultValue={[modelConfig.hyperparameters.neuralNetwork.epochs]}
                            max={500}
                            min={10}
                            step={10}
                            onValueChange={(value) => updateHyperparameter("neuralNetwork", "epochs", value[0])}
                            className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                          />
                          <span className="w-12 text-sm">{modelConfig.hyperparameters.neuralNetwork.epochs}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="batch-size">Batch Size</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="batch-size"
                            defaultValue={[modelConfig.hyperparameters.neuralNetwork.batchSize]}
                            max={128}
                            min={8}
                            step={8}
                            onValueChange={(value) => updateHyperparameter("neuralNetwork", "batchSize", value[0])}
                            className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                          />
                          <span className="w-12 text-sm">{modelConfig.hyperparameters.neuralNetwork.batchSize}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button className="w-full relative overflow-hidden group" onClick={handleStartTraining}>
                      <span className="relative z-10 flex items-center">
                        <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" /> Start Training
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>
                  {trainingStatus === "idle" && "Configure and start model training"}
                  {trainingStatus === "training" && "Model training in progress..."}
                  {trainingStatus === "completed" && "Model training completed successfully"}
                  {trainingStatus === "error" && "Error occurred during model training"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trainingStatus === "idle" && (
                  <div className="flex justify-center py-8">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleStartTraining} className="relative overflow-hidden group">
                        <span className="relative z-10 flex items-center">
                          <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" /> Start Training
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                      </Button>
                    </motion.div>
                  </div>
                )}

                {trainingStatus === "training" && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{trainingProgress}%</span>
                      </div>
                      <Progress value={trainingProgress} className="h-2 [&>div]:bg-primary" />
                    </div>

                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trainingMetrics}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="epoch" label={{ value: "Epoch", position: "insideBottom", offset: -5 }} />
                          <YAxis
                            yAxisId="left"
                            domain={[0, 1]}
                            label={{ value: "Accuracy", angle: -90, position: "insideLeft" }}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 1]}
                            label={{ value: "Loss", angle: 90, position: "insideRight" }}
                          />
                          <Tooltip />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                          <Line yAxisId="left" type="monotone" dataKey="valAccuracy" stroke="#82ca9d" />
                          <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#ff7300" />
                          <Line yAxisId="right" type="monotone" dataKey="valLoss" stroke="#ff0000" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}

                {trainingStatus === "completed" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute -inset-1 -z-10 rounded-lg bg-green-500/10 blur-sm"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(34, 197, 94, 0)",
                            "0 0 15px rgba(34, 197, 94, 0.3)",
                            "0 0 5px rgba(34, 197, 94, 0.2)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      />
                      <Alert className="bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800/50">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertTitle className="text-green-800 dark:text-green-300">Training Complete</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-400">
                          Model training completed successfully with 90% accuracy on the test set.
                        </AlertDescription>
                      </Alert>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trainingHistoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="epoch" label={{ value: "Epoch", position: "insideBottom", offset: -5 }} />
                          <YAxis
                            yAxisId="left"
                            domain={[0, 1]}
                            label={{ value: "Accuracy", angle: -90, position: "insideLeft" }}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 1]}
                            label={{ value: "Loss", angle: 90, position: "insideRight" }}
                          />
                          <Tooltip />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                          <Line yAxisId="left" type="monotone" dataKey="valAccuracy" stroke="#82ca9d" />
                          <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#ff7300" />
                          <Line yAxisId="right" type="monotone" dataKey="valLoss" stroke="#ff0000" />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </>
                )}

                {trainingStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -inset-1 -z-10 rounded-lg bg-red-500/10 blur-sm"
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(239, 68, 68, 0)",
                          "0 0 15px rgba(239, 68, 68, 0.3)",
                          "0 0 5px rgba(239, 68, 68, 0.2)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        An error occurred during model training. Please check the logs and try again.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {trainingStatus === "training" && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button variant="outline" className="w-full" onClick={handleResetTraining}>
                      Cancel Training
                    </Button>
                  </motion.div>
                )}

                {trainingStatus === "completed" && (
                  <>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" onClick={handleResetTraining} className="group">
                        <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" /> Train New
                        Model
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button onClick={() => setActiveTab("evaluation")} className="relative overflow-hidden group">
                        <span className="relative z-10">Continue to Evaluation</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                      </Button>
                    </motion.div>
                  </>
                )}

                {trainingStatus === "error" && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button variant="outline" className="w-full group" onClick={handleResetTraining}>
                      <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" /> Reset and Try
                      Again
                    </Button>
                  </motion.div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 md:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                  <CardDescription>Evaluation metrics on the test set</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="space-y-2 border rounded-md p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <p className="text-sm font-medium">Accuracy</p>
                        <p className="text-2xl font-bold">90%</p>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="space-y-2 border rounded-md p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <p className="text-sm font-medium">F1 Score</p>
                        <p className="text-2xl font-bold">0.86</p>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="space-y-2 border rounded-md p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <p className="text-sm font-medium">Precision</p>
                        <p className="text-2xl font-bold">0.87</p>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="space-y-2 border rounded-md p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <p className="text-sm font-medium">Recall</p>
                        <p className="text-2xl font-bold">0.86</p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { class: "High", precision: 0.93, recall: 0.92, f1: 0.93 },
                          { class: "Medium", precision: 0.82, recall: 0.8, f1: 0.81 },
                          { class: "Low", precision: 0.86, recall: 0.85, f1: 0.86 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="class" />
                        <YAxis domain={[0, 1]} />
                        <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Value"]} />
                        <Legend />
                        <Bar dataKey="precision" fill="#8884d8" name="Precision" />
                        <Bar dataKey="recall" fill="#82ca9d" name="Recall" />
                        <Bar dataKey="f1" fill="#ffc658" name="F1 Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Feature Importance</CardTitle>
                  <CardDescription>Relative contribution of each parameter to model predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={featureImportanceData.sort((a, b) => b.importance - a.importance)}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 30]} />
                        <YAxis dataKey="feature" type="category" />
                        <Tooltip formatter={(value) => [`${value}%`, "Importance"]} />
                        <Bar dataKey="importance" fill="#8884d8" animationBegin={300} animationDuration={1500} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2"
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Confusion Matrix</CardTitle>
                  <CardDescription>Actual vs. predicted viability categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border p-2"></th>
                          <th className="border p-2 text-center" colSpan={3}>
                            Predicted
                          </th>
                        </tr>
                        <tr>
                          <th className="border p-2"></th>
                          <th className="border p-2 text-center">Low</th>
                          <th className="border p-2 text-center">Medium</th>
                          <th className="border p-2 text-center">High</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="border p-2 text-right">Low</th>
                          <td className="border p-2 text-center bg-green-100 dark:bg-green-900/30">
                            {confusionMatrixData.matrix[0][0]}
                          </td>
                          <td className="border p-2 text-center bg-red-50 dark:bg-red-900/20">
                            {confusionMatrixData.matrix[0][1]}
                          </td>
                          <td className="border p-2 text-center bg-red-50 dark:bg-red-900/20">
                            {confusionMatrixData.matrix[0][2]}
                          </td>
                        </tr>
                        <tr>
                          <th className="border p-2 text-right">Medium</th>
                          <td className="border p-2 text-center bg-red-50 dark:bg-red-900/20">
                            {confusionMatrixData.matrix[1][0]}
                          </td>
                          <td className="border p-2 text-center bg-green-100 dark:bg-green-900/30">
                            {confusionMatrixData.matrix[1][1]}
                          </td>
                          <td className="border p-2 text-center bg-red-50 dark:bg-red-900/20">
                            {confusionMatrixData.matrix[1][2]}
                          </td>
                        </tr>
                        <tr>
                          <th className="border p-2 text-right">High</th>
                          <td className="border p-2 text-center bg-red-50 dark:bg-red-900/20">
                            {confusionMatrixData.matrix[2][0]}
                          </td>
                          <td className="border p-2 text-center bg-red-50 dark:bg-red-900/20">
                            {confusionMatrixData.matrix[2][1]}
                          </td>
                          <td className="border p-2 text-center bg-green-100 dark:bg-green-900/30">
                            {confusionMatrixData.matrix[2][2]}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button variant="outline" className="w-full group">
                      <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" /> Export Evaluation
                      Report
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>Model Deployment</CardTitle>
                <CardDescription>Deploy your trained model for production use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model-name">Model Name</Label>
                  <Input
                    id="model-name"
                    placeholder="e.g., bioprinting-rf-v1"
                    className="transition-all duration-300 hover:border-primary focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-description">Description</Label>
                  <Input
                    id="model-description"
                    placeholder="Brief description of the model"
                    className="transition-all duration-300 hover:border-primary focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deployment-target">Deployment Target</Label>
                  <Select defaultValue="api">
                    <SelectTrigger
                      id="deployment-target"
                      className="transition-all duration-300 hover:border-primary focus:border-primary"
                    >
                      <SelectValue placeholder="Select deployment target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">REST API Endpoint</SelectItem>
                      <SelectItem value="edge">Edge Device</SelectItem>
                      <SelectItem value="browser">Browser (TensorFlow.js)</SelectItem>
                      <SelectItem value="download">Download Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="versioning" defaultChecked />
                    <Label htmlFor="versioning">Enable versioning</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="monitoring" defaultChecked />
                    <Label htmlFor="monitoring">Enable performance monitoring</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <Button className="w-full relative overflow-hidden group">
                    <span className="relative z-10">Deploy Model</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>Deployed Models</CardTitle>
                <CardDescription>Currently deployed models and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="rounded-md border transition-all duration-300 hover:border-primary/50 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="font-medium">bioprinting-rf-v1</h4>
                      <p className="text-sm text-muted-foreground">Random Forest | Deployed 3 days ago</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-500 shadow-glow-sm"></span>
                      <span className="text-sm">Active</span>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Endpoint</p>
                        <p className="text-muted-foreground">/api/predict/bioprinting-rf-v1</p>
                      </div>
                      <div>
                        <p className="font-medium">Requests</p>
                        <p className="text-muted-foreground">1,245</p>
                      </div>
                      <div>
                        <p className="font-medium">Avg. Latency</p>
                        <p className="text-muted-foreground">124ms</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
