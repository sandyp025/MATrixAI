// This file contains the core ML model training functionality

import * as tf from "@tensorflow/tfjs"

// Define the types for our bioprinting data
export interface BioprintingDataPoint {
  cellDensity: number
  temperature: number
  printSpeed: number
  layerHeight: number
  viscosity: number
  crosslinkTime: number
  viability: "Low" | "Medium" | "High"
}

export interface ModelConfig {
  modelType: "randomForest" | "svm" | "neuralNetwork"
  trainTestSplit: number
  randomSeed: number
  hyperparameters: {
    randomForest: {
      nEstimators: number
      maxDepth: number
      minSamplesLeaf: number
      bootstrap: boolean
    }
    svm: {
      kernel: string
      C: number
      gamma: string
    }
    neuralNetwork: {
      hiddenLayers: number[]
      learningRate: number
      epochs: number
      batchSize: number
    }
  }
}

export interface TrainingResult {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  confusionMatrix: number[][]
  featureImportance: { feature: string; importance: number }[]
  history?: any
}

// Sample bioprinting dataset
const sampleData: BioprintingDataPoint[] = [
  {
    cellDensity: 5,
    temperature: 180,
    printSpeed: 30,
    layerHeight: 0.3,
    viscosity: 3.5,
    crosslinkTime: 30,
    viability: "High",
  },
  {
    cellDensity: 10,
    temperature: 200,
    printSpeed: 25,
    layerHeight: 0.2,
    viscosity: 2.8,
    crosslinkTime: 45,
    viability: "Medium",
  },
  {
    cellDensity: 5,
    temperature: 190,
    printSpeed: 40,
    layerHeight: 0.3,
    viscosity: 4.0,
    crosslinkTime: 30,
    viability: "High",
  },
  {
    cellDensity: 15,
    temperature: 210,
    printSpeed: 20,
    layerHeight: 0.4,
    viscosity: 2.0,
    crosslinkTime: 60,
    viability: "Low",
  },
  {
    cellDensity: 10,
    temperature: 195,
    printSpeed: 35,
    layerHeight: 0.25,
    viscosity: 3.2,
    crosslinkTime: 50,
    viability: "Medium",
  },
  // In a real implementation, this would include all 150 data points
]

// Preprocess the data
function preprocessData(data: BioprintingDataPoint[]) {
  // Extract features and labels
  const features = data.map((d) => [
    d.cellDensity,
    d.temperature,
    d.printSpeed,
    d.layerHeight,
    d.viscosity,
    d.crosslinkTime,
  ])

  // Convert categorical labels to numeric
  const labels = data.map((d) => {
    if (d.viability === "Low") return 0
    if (d.viability === "Medium") return 1
    return 2 // High
  })

  // Normalize features (min-max scaling)
  const featuresTensor = tf.tensor2d(features)
  const min = featuresTensor.min(0)
  const max = featuresTensor.max(0)
  const normalizedFeatures = featuresTensor.sub(min).div(max.sub(min))

  // One-hot encode labels
  const labelsTensor = tf.tensor1d(labels, "int32")
  const oneHotLabels = tf.oneHot(labelsTensor, 3)

  return {
    features: normalizedFeatures,
    labels: oneHotLabels,
    min,
    max,
  }
}

// Split data into training and testing sets
function splitData(features: tf.Tensor2D, labels: tf.Tensor2D, trainRatio: number) {
  const numExamples = features.shape[0]
  const numTrainExamples = Math.round(numExamples * trainRatio)

  const trainFeatures = features.slice([0, 0], [numTrainExamples, features.shape[1]])
  const testFeatures = features.slice([numTrainExamples, 0], [numExamples - numTrainExamples, features.shape[1]])

  const trainLabels = labels.slice([0, 0], [numTrainExamples, labels.shape[1]])
  const testLabels = labels.slice([numTrainExamples, 0], [numExamples - numTrainExamples, labels.shape[1]])

  return {
    trainFeatures,
    trainLabels,
    testFeatures,
    testLabels,
  }
}

// Create a neural network model
function createNeuralNetworkModel(config: ModelConfig) {
  const { hiddenLayers, learningRate } = config.hyperparameters.neuralNetwork

  const model = tf.sequential()

  // Input layer
  model.add(
    tf.layers.dense({
      units: hiddenLayers[0],
      activation: "relu",
      inputShape: [6], // 6 features
    }),
  )

  // Hidden layers
  for (let i = 1; i < hiddenLayers.length; i++) {
    model.add(
      tf.layers.dense({
        units: hiddenLayers[i],
        activation: "relu",
      }),
    )
  }

  // Output layer (3 classes: Low, Medium, High)
  model.add(
    tf.layers.dense({
      units: 3,
      activation: "softmax",
    }),
  )

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(learningRate),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  })

  return model
}

// Train the model
export async function trainModel(config: ModelConfig): Promise<TrainingResult> {
  // In a real implementation, we would load the actual dataset
  // For this example, we'll use the sample data
  const data = sampleData

  // Preprocess the data
  const { features, labels } = preprocessData(data)

  // Split the data
  const { trainFeatures, trainLabels, testFeatures, testLabels } = splitData(features, labels, config.trainTestSplit)

  let model
  let history

  if (config.modelType === "neuralNetwork") {
    // Create and train neural network model
    model = createNeuralNetworkModel(config)

    // Train the model
    history = await model.fit(trainFeatures, trainLabels, {
      epochs: config.hyperparameters.neuralNetwork.epochs,
      batchSize: config.hyperparameters.neuralNetwork.batchSize,
      validationData: [testFeatures, testLabels],
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs?.loss}, accuracy = ${logs?.acc}`)
        },
      },
    })
  } else {
    // For RandomForest and SVM, we would use a different approach
    // In a real implementation, we might use TensorFlow Decision Forests or another library
    // For this example, we'll simulate the results
    console.log(`Training ${config.modelType} model with config:`, config)

    // Simulate training delay
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }

  // For demonstration purposes, return simulated results
  // In a real implementation, we would calculate these from the model's predictions
  return {
    accuracy: 0.9,
    precision: 0.87,
    recall: 0.86,
    f1Score: 0.86,
    confusionMatrix: [
      [30, 4, 1], // Predicted Low
      [5, 40, 3], // Predicted Medium
      [2, 6, 50], // Predicted High
    ],
    featureImportance: [
      { feature: "Cell Density", importance: 28 },
      { feature: "Nozzle Temperature", importance: 22 },
      { feature: "Layer Height", importance: 18 },
      { feature: "Print Speed", importance: 15 },
      { feature: "Crosslink Time", importance: 12 },
      { feature: "Viscosity", importance: 5 },
    ],
    history,
  }
}

// Predict viability for new bioprinting parameters
export function predictViability(
  model: tf.LayersModel,
  parameters: Omit<BioprintingDataPoint, "viability">,
  min: tf.Tensor1D,
  max: tf.Tensor1D,
): { low: number; medium: number; high: number } {
  // Extract features
  const features = [
    parameters.cellDensity,
    parameters.temperature,
    parameters.printSpeed,
    parameters.layerHeight,
    parameters.viscosity,
    parameters.crosslinkTime,
  ]

  // Normalize features
  const featuresTensor = tf.tensor2d([features])
  const normalizedFeatures = featuresTensor.sub(min).div(max.sub(min))

  // Make prediction
  const prediction = model.predict(normalizedFeatures) as tf.Tensor

  // Convert to probabilities
  const probabilities = prediction.dataSync()

  return {
    low: probabilities[0],
    medium: probabilities[1],
    high: probabilities[2],
  }
}
