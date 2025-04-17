"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { motion } from "framer-motion"
import { UploadDatasetDialog } from "@/components/upload-dataset-dialog"
import { useToast } from "@/components/ui/use-toast"

interface DatasetUploadButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  className?: string
  onUploadComplete?: (data: any) => void
}

export function DatasetUploadButton({
  variant = "outline",
  className = "",
  onUploadComplete,
}: DatasetUploadButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleUploadComplete = (data: any) => {
    toast({
      title: "Dataset Uploaded",
      description: `${data.filename} with ${data.rowCount} rows has been uploaded successfully.`,
    })

    if (onUploadComplete) {
      onUploadComplete(data)
    }
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={className}>
        <Button variant={variant} className="w-full group" onClick={() => setDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Upload Custom Dataset
        </Button>
      </motion.div>

      <UploadDatasetDialog open={dialogOpen} onOpenChange={setDialogOpen} onUploadComplete={handleUploadComplete} />
    </>
  )
}
