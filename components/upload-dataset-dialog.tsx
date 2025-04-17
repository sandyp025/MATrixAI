"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, FileSpreadsheet, Upload, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface UploadDatasetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete?: (data: any) => void
}

export function UploadDatasetDialog({ open, onOpenChange, onUploadComplete }: UploadDatasetDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{
    success?: boolean
    message?: string
    filename?: string
    size?: number
    rowCount?: number
    error?: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (file: File) => {
    // Check if file is CSV or Excel
    if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      setUploadResult({
        success: false,
        error: "Only CSV and Excel files are supported",
      })
      return
    }

    setFile(file)
    setUploadResult(null)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadProgress(0)
    setUploadResult(null)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return newProgress
        })
      }, 300)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/data/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload file")
      }

      setUploadResult({
        success: true,
        message: result.message,
        filename: result.filename,
        size: result.size,
        rowCount: result.rowCount,
      })

      if (onUploadComplete) {
        onUploadComplete(result)
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadResult({
        success: false,
        error: (error as Error).message || "An error occurred during upload",
      })
    } finally {
      setUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setUploadResult(null)
    setUploadProgress(0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Custom Dataset</DialogTitle>
          <DialogDescription>Upload a CSV or Excel file containing your bioprinting dataset.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!file && !uploadResult?.success && (
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <div className="flex flex-col items-center justify-center space-y-2 text-center cursor-pointer">
                <div
                  className={`p-3 rounded-full transition-colors duration-200 ${
                    dragActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Upload className="h-6 w-6" />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Drag & drop your file here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports CSV and Excel files</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              />
            </div>
          )}

          {file && !uploadResult?.success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 text-primary rounded">
                    <FileSpreadsheet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetUpload()
                  }}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {uploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-1" />
                </div>
              )}
            </motion.div>
          )}

          {uploadResult?.success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20"
            >
              <div className="flex items-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-300">Upload Successful</h3>
                  <div className="mt-1 text-sm text-green-700 dark:text-green-400">
                    <p>{uploadResult.filename} was uploaded successfully.</p>
                    <p className="mt-1">
                      {uploadResult.rowCount} rows detected • {formatFileSize(uploadResult.size || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {uploadResult?.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{uploadResult.error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {!uploadResult?.success ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={uploading}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!file || uploading} className={uploading ? "opacity-80" : ""}>
                {uploading ? "Uploading..." : "Upload Dataset"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={resetUpload}>
                Upload Another
              </Button>
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
