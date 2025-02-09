'use client'

import { Button } from "@/components/atoms/Button/Button"
import { cn } from "@/lib/utils"
import { Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  accept?: Record<string, string[]>
  className?: string
}

export function FileDropzone({
  onFileSelect,
  accept = {
    "application/json": [".json"],
  },
  className,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25",
        className
      )}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={() => setIsDragging(false)}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "p-4 rounded-full bg-primary/10",
            isDragging && "bg-primary/20"
          )}
        >
          <Upload
            className={cn(
              "w-8 h-8 text-primary/50",
              isDragging && "text-primary"
            )}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {isDragging ? "Drop your file here" : "Drag and drop your file here"}
          </p>
          <p className="text-sm text-muted-foreground">or</p>
          <Button type="button" variant="outline" onClick={open}>
            Browse files
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Only .json files are supported
        </p>
      </div>
    </div>
  )
}
