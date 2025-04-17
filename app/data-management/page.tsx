"use client"

import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "@/components/ui/chart"
import { ArrowUpDown, Download, Filter, Plus, Search, Upload } from "lucide-react"

export default function DataManagementPage() {
  const [activeTab, setActiveTab] = useState("datasets")

  // Sample bioprinting dataset
  const bioprinterData = [
    {
      id: 1,
      date: "2023-10-15",
      cellDensity: 5,
      temperature: 180,
      printSpeed: 30,
      layerHeight: 0.3,
      viscosity: 3.5,
      crosslinkTime: 30,
      viability: "High",
    },
    {
      id: 2,
      date: "2023-10-16",
      cellDensity: 10,
      temperature: 200,
      printSpeed: 25,
      layerHeight: 0.2,
      viscosity: 2.8,
      crosslinkTime: 45,
      viability: "Medium",
    },
    {
      id: 3,
      date: "2023-10-17",
      cellDensity: 5,
      temperature: 190,
      printSpeed: 40,
      layerHeight: 0.3,
      viscosity: 4.0,
      crosslinkTime: 30,
      viability: "High",
    },
    {
      id: 4,
      date: "2023-10-18",
      cellDensity: 15,
      temperature: 210,
      printSpeed: 20,
      layerHeight: 0.4,
      viscosity: 2.0,
      crosslinkTime: 60,
      viability: "Low",
    },
    {
      id: 5,
      date: "2023-10-19",
      cellDensity: 10,
      temperature: 195,
      printSpeed: 35,
      layerHeight: 0.25,
      viscosity: 3.2,
      crosslinkTime: 50,
      viability: "Medium",
    },
    {
      id: 6,
      date: "2023-10-20",
      cellDensity: 8,
      temperature: 185,
      printSpeed: 30,
      layerHeight: 0.35,
      viscosity: 2.5,
      crosslinkTime: 30,
      viability: "Low",
    },
    {
      id: 7,
      date: "2023-10-21",
      cellDensity: 6,
      temperature: 190,
      printSpeed: 30,
      layerHeight: 0.3,
      viscosity: 3.2,
      crosslinkTime: 45,
      viability: "High",
    },
    {
      id: 8,
      date: "2023-10-22",
      cellDensity: 12,
      temperature: 205,
      printSpeed: 25,
      layerHeight: 0.25,
      viscosity: 3.0,
      crosslinkTime: 40,
      viability: "Medium",
    },
    {
      id: 9,
      date: "2023-10-23",
      cellDensity: 7,
      temperature: 195,
      printSpeed: 35,
      layerHeight: 0.3,
      viscosity: 3.5,
      crosslinkTime: 50,
      viability: "High",
    },
    {
      id: 10,
      date: "2023-10-24",
      cellDensity: 14,
      temperature: 200,
      printSpeed: 40,
      layerHeight: 0.35,
      viscosity: 2.8,
      crosslinkTime: 35,
      viability: "Low",
    },
  ]

  // Dataset distribution data
  const datasetDistributionData = [
    { name: "High Viability", value: 54 },
    { name: "Medium Viability", value: 50 },
    { name: "Low Viability", value: 37 },
  ]

  // Parameter correlation data
  const parameterCorrelationData = [
    { cellDensity: 5, temperature: 180, viability: "High", size: 30 },
    { cellDensity: 10, temperature: 200, viability: "Medium", size: 30 },
    { cellDensity: 5, temperature: 190, viability: "High", size: 30 },
    { cellDensity: 15, temperature: 210, viability: "Low", size: 30 },
    { cellDensity: 10, temperature: 195, viability: "Medium", size: 30 },
    { cellDensity: 8, temperature: 185, viability: "Low", size: 30 },
    { cellDensity: 6, temperature: 190, viability: "High", size: 30 },
    { cellDensity: 12, temperature: 205, viability: "Medium", size: 30 },
    { cellDensity: 7, temperature: 195, viability: "High", size: 30 },
    { cellDensity: 14, temperature: 200, viability: "Low", size: 30 },
    { cellDensity: 9, temperature: 190, viability: "Medium", size: 30 },
    { cellDensity: 11, temperature: 205, viability: "Low", size: 30 },
    { cellDensity: 6, temperature: 185, viability: "High", size: 30 },
    { cellDensity: 13, temperature: 200, viability: "Low", size: 30 },
    { cellDensity: 8, temperature: 190, viability: "Medium", size: 30 },
  ]

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight relative inline-block">
          Data Management
          <motion.span
            className="absolute -inset-1 -z-10 rounded-lg bg-primary/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </h1>
        <p className="mt-2 text-muted-foreground">Manage, explore, and analyze bioprinting datasets</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background/80 backdrop-blur-sm">
          <TabsTrigger
            value="datasets"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Datasets
          </TabsTrigger>
          <TabsTrigger
            value="exploration"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Data Exploration
          </TabsTrigger>
          <TabsTrigger
            value="preprocessing"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Preprocessing
          </TabsTrigger>
          <TabsTrigger
            value="augmentation"
            className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
          >
            Augmentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="datasets" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search datasets..."
                  className="w-[300px] pl-8 transition-all duration-300 hover:border-primary focus:border-primary"
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="group">
                  <Filter className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Filter
                </Button>
              </motion.div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="group">
                  <Upload className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Import
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    <Plus className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    New Dataset
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>Bioprinting Datasets</CardTitle>
                <CardDescription>Manage your bioprinting experimental data</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Samples</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="hover:bg-muted/50 transition-colors duration-200"
                    >
                      <TableCell>1</TableCell>
                      <TableCell className="font-medium">Default Bioprinting Dataset</TableCell>
                      <TableCell>150</TableCell>
                      <TableCell>2023-10-15</TableCell>
                      <TableCell>2023-10-24</TableCell>
                      <TableCell>
                        <Badge className="shadow-glow-sm">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200">
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="hover:bg-muted/50 transition-colors duration-200"
                    >
                      <TableCell>2</TableCell>
                      <TableCell className="font-medium">Extended Dataset</TableCell>
                      <TableCell>250</TableCell>
                      <TableCell>2023-09-05</TableCell>
                      <TableCell>2023-10-20</TableCell>
                      <TableCell>
                        <Badge className="shadow-glow-sm">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200">
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="hover:bg-muted/50 transition-colors duration-200"
                    >
                      <TableCell>3</TableCell>
                      <TableCell className="font-medium">GelMA Bioink Dataset</TableCell>
                      <TableCell>85</TableCell>
                      <TableCell>2023-08-12</TableCell>
                      <TableCell>2023-09-30</TableCell>
                      <TableCell>
                        <Badge variant="outline">Archived</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200">
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>Default Bioprinting Dataset</CardTitle>
                <CardDescription>Alginate-gelatin hydrogel bioprinting trials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Cell Density
                            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                              <ArrowUpDown className="ml-1 h-4 w-4" />
                            </motion.div>
                          </div>
                        </TableHead>
                        <TableHead>Temperature</TableHead>
                        <TableHead>Print Speed</TableHead>
                        <TableHead>Layer Height</TableHead>
                        <TableHead>Viscosity</TableHead>
                        <TableHead>Crosslink Time</TableHead>
                        <TableHead>Viability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bioprinterData.map((row, index) => (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="hover:bg-muted/50 transition-colors duration-200"
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.cellDensity} ×10⁶</TableCell>
                          <TableCell>{row.temperature} °C</TableCell>
                          <TableCell>{row.printSpeed} mm/s</TableCell>
                          <TableCell>{row.layerHeight} mm</TableCell>
                          <TableCell>{row.viscosity} Pa·s</TableCell>
                          <TableCell>{row.crosslinkTime} s</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                row.viability === "High"
                                  ? "bg-green-500 shadow-glow-sm"
                                  : row.viability === "Medium"
                                    ? "bg-yellow-500 shadow-glow-sm"
                                    : "bg-red-500 shadow-glow-sm"
                              }
                            >
                              {row.viability}
                            </Badge>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 10 of 150 entries</div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="group">
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Export CSV
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="exploration" className="space-y-4">
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2">
            <motion.div variants={item}>
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Dataset Distribution</CardTitle>
                  <CardDescription>Distribution of viability classes in the dataset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={datasetDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          animationBegin={300}
                          animationDuration={1500}
                        >
                          {datasetDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, "Samples"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Parameter Distributions</CardTitle>
                  <CardDescription>Distribution of key parameters across the dataset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { parameter: "Cell Density", min: 5, avg: 9.5, max: 15 },
                          { parameter: "Temperature", min: 180, avg: 195, max: 210 },
                          { parameter: "Print Speed", min: 20, avg: 30, max: 40 },
                          { parameter: "Layer Height", min: 0.2, avg: 0.3, max: 0.4 },
                          { parameter: "Viscosity", min: 2, avg: 3, max: 4 },
                          { parameter: "Crosslink Time", min: 30, avg: 45, max: 60 },
                        ]}
                        animationBegin={300}
                        animationDuration={1500}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="parameter" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="min" fill="#8884d8" name="Minimum" />
                        <Bar dataKey="avg" fill="#82ca9d" name="Average" />
                        <Bar dataKey="max" fill="#ffc658" name="Maximum" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="md:col-span-2">
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Parameter Correlations</CardTitle>
                  <CardDescription>Relationship between cell density, temperature, and viability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis
                          type="number"
                          dataKey="cellDensity"
                          name="Cell Density"
                          unit=" ×10⁶"
                          domain={[4, 16]}
                          label={{ value: "Cell Density (×10⁶ cells/mL)", position: "bottom", offset: 5 }}
                        />
                        <YAxis
                          type="number"
                          dataKey="temperature"
                          name="Temperature"
                          unit=" °C"
                          domain={[175, 215]}
                          label={{ value: "Temperature (°C)", angle: -90, position: "left" }}
                        />
                        <ZAxis type="number" dataKey="size" range={[100, 100]} />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Legend />
                        <Scatter
                          name="High Viability"
                          data={parameterCorrelationData.filter((d) => d.viability === "High")}
                          fill="#00C49F"
                          animationBegin={300}
                          animationDuration={1500}
                        />
                        <Scatter
                          name="Medium Viability"
                          data={parameterCorrelationData.filter((d) => d.viability === "Medium")}
                          fill="#FFBB28"
                          animationBegin={300}
                          animationDuration={1500}
                        />
                        <Scatter
                          name="Low Viability"
                          data={parameterCorrelationData.filter((d) => d.viability === "Low")}
                          fill="#FF8042"
                          animationBegin={300}
                          animationDuration={1500}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                    <Button variant="outline" className="w-full group">
                      <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" /> Export
                      Correlation Analysis
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="preprocessing" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>Data Preprocessing</CardTitle>
                <CardDescription>Clean and prepare your data for model training</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label>Normalization</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="min-max" name="normalization" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="min-max" className="flex flex-col space-y-1">
                          <span>Min-Max Scaling</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Scale features to range [0,1]
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="standard" name="normalization" className="h-4 w-4" />
                        <Label htmlFor="standard" className="flex flex-col space-y-1">
                          <span>Standard Scaling</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Scale to zero mean and unit variance
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label>Missing Value Handling</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="mean" name="missing" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="mean" className="flex flex-col space-y-1">
                          <span>Mean Imputation</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Replace missing values with mean
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="drop" name="missing" className="h-4 w-4" />
                        <Label htmlFor="drop" className="flex flex-col space-y-1">
                          <span>Drop Rows</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Remove rows with missing values
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label>Outlier Detection</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="iqr" name="outliers" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="iqr" className="flex flex-col space-y-1">
                          <span>IQR Method</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Detect using interquartile range
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="zscore" name="outliers" className="h-4 w-4" />
                        <Label htmlFor="zscore" className="flex flex-col space-y-1">
                          <span>Z-Score Method</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Detect using standard deviations
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label>Feature Selection</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "cell-density", label: "Cell Density" },
                      { id: "temperature", label: "Temperature" },
                      { id: "print-speed", label: "Print Speed" },
                      { id: "layer-height", label: "Layer Height" },
                      { id: "viscosity", label: "Viscosity" },
                      { id: "crosslink-time", label: "Crosslink Time" },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.id}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                          <input type="checkbox" id={feature.id} className="h-4 w-4" defaultChecked />
                          <Label htmlFor={feature.id}>{feature.label}</Label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline">Reset to Defaults</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="relative overflow-hidden group">
                    <span className="relative z-10">Apply Preprocessing</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="augmentation" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>Data Augmentation</CardTitle>
                <CardDescription>Generate synthetic data to enhance model training</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label>Augmentation Methods</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        id: "gaussian-noise",
                        title: "Gaussian Noise",
                        desc: "Add random noise to numeric features",
                        defaultChecked: true,
                      },
                      {
                        id: "smote",
                        title: "SMOTE",
                        desc: "Synthetic Minority Over-sampling Technique",
                        defaultChecked: true,
                      },
                      {
                        id: "random-over",
                        title: "Random Oversampling",
                        desc: "Duplicate minority class samples",
                        defaultChecked: false,
                      },
                      {
                        id: "parameter-mix",
                        title: "Parameter Mixing",
                        desc: "Generate new samples by mixing parameters",
                        defaultChecked: false,
                      },
                    ].map((method, index) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                          <input
                            type="checkbox"
                            id={method.id}
                            className="h-4 w-4"
                            defaultChecked={method.defaultChecked}
                          />
                          <Label htmlFor={method.id} className="flex flex-col space-y-1">
                            <span>{method.title}</span>
                            <span className="font-normal text-sm text-muted-foreground">{method.desc}</span>
                          </Label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="augmentation-factor">Augmentation Factor</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="augmentation-factor"
                      defaultValue={[2]}
                      max={5}
                      min={1}
                      step={0.5}
                      className="[&>span]:bg-primary [&>span]:hover:bg-primary/80"
                    />
                    <span className="w-12 text-sm">2.0x</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Multiply dataset size by this factor (1.0 = no augmentation, 5.0 = 5x more samples)
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label>Class Balancing</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="balance-none" name="balance" className="h-4 w-4" />
                        <Label htmlFor="balance-none" className="flex flex-col space-y-1">
                          <span>No Balancing</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Keep original class distribution
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <div className="flex items-center space-x-2 rounded-md border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
                        <input type="radio" id="balance-equal" name="balance" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="balance-equal" className="flex flex-col space-y-1">
                          <span>Equal Distribution</span>
                          <span className="font-normal text-sm text-muted-foreground">
                            Generate samples to equalize classes
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-md border p-4 bg-muted/50 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <h4 className="font-medium mb-2">Augmentation Preview</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="font-medium">Original Dataset</p>
                      <p className="text-muted-foreground">150 samples</p>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• High: 54 samples (36%)</li>
                        <li>• Medium: 50 samples (33%)</li>
                        <li>• Low: 46 samples (31%)</li>
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="font-medium">After Augmentation</p>
                      <p className="text-muted-foreground">300 samples</p>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• High: 100 samples (33%)</li>
                        <li>• Medium: 100 samples (33%)</li>
                        <li>• Low: 100 samples (33%)</li>
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <p className="font-medium">New Samples</p>
                      <p className="text-muted-foreground">150 synthetic samples</p>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• High: 46 new samples</li>
                        <li>• Medium: 50 new samples</li>
                        <li>• Low: 54 new samples</li>
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline">Preview Augmented Data</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="relative overflow-hidden group">
                    <span className="relative z-10">Generate Augmented Dataset</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
