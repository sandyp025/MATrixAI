"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { FeatureImportance } from "@/components/feature-importance"
import { ModelPerformance } from "@/components/model-performance"
import { CaseStudies } from "@/components/case-studies"
import { ParameterExplorer } from "@/components/parameter-explorer"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Database, FlaskRoundIcon as Flask, LineChart } from "lucide-react"

export default function DashboardPage() {
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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight relative inline-block">
              AI-Assisted Customization of 3D-Printed Biomaterials
              <motion.span
                className="absolute -inset-1 -z-10 rounded-lg bg-primary/10 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
            </h1>
            <p className="mt-2 text-muted-foreground">
              Interactive platform for ML-driven bioprinting parameter optimization
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={item}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">90%</div>
                  <p className="text-xs text-muted-foreground">Overall classification accuracy on test set</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dataset Size</CardTitle>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">150</div>
                  <p className="text-xs text-muted-foreground">Total bioprinting trials in dataset</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Parameter</CardTitle>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Flask className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Cell Density</div>
                  <p className="text-xs text-muted-foreground">28% relative importance in model</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Publications</CardTitle>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Referenced research papers</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs defaultValue="overview" className="mt-6 space-y-4">
              <TabsList className="bg-background/80 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="model"
                  className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
                >
                  Model Performance
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
                >
                  Feature Importance
                </TabsTrigger>
                <TabsTrigger
                  value="cases"
                  className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
                >
                  Case Studies
                </TabsTrigger>
                <TabsTrigger
                  value="explorer"
                  className="relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:animate-in data-[state=active]:after:fade-in-0 data-[state=active]:after:slide-in-from-left-5"
                >
                  Parameter Explorer
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Overview />
              </TabsContent>
              <TabsContent value="model" className="space-y-4">
                <ModelPerformance />
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <FeatureImportance />
              </TabsContent>
              <TabsContent value="cases" className="space-y-4">
                <CaseStudies />
              </TabsContent>
              <TabsContent value="explorer" className="space-y-4">
                <ParameterExplorer />
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 rounded-lg border bg-card p-6 shadow-sm relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <h3 className="text-lg font-medium">Future Directions</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 border-primary/10">
                  <CardHeader>
                    <CardTitle>Closed-Loop Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Equip bioprinters with real-time sensors and integrate defect-detection algorithms for automatic
                      parameter adjustment.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 border-primary/10">
                  <CardHeader>
                    <CardTitle>In-Silico Exploration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Build hybrid simulators coupling fluid dynamics with ML surrogate models for virtual parameter
                      testing.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 border-primary/10">
                  <CardHeader>
                    <CardTitle>Community Data Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Develop an open repository for labs to upload print settings and outcomes, enabling robust
                      cross-material meta-models.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <div className="mt-4 flex justify-end">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="gap-1 group"
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/document/d/17S0t8ddQXnzrhteYjvUzJmV5thH0-ckwGyvt-aHKEOM/edit?usp=sharing",
                      "_blank",
                    )
                  }
                >
                  Go to Documentation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BioAI Research Lab. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
