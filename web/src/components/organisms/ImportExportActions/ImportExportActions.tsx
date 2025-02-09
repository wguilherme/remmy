'use client'

import { Button } from "@/components/atoms/Button/Button"
import { FileDropzone } from "@/components/molecules/FileDropzone/FileDropzone"
import { Typography } from "@/components/atoms/Typography/Typography"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/Dialog/Dialog"
import { Deck } from "@/types/card"
import { validateDeckImport, prepareDeckExport } from "@/lib/utils/deck-import"
import { Download, Upload } from "lucide-react"
import { useState } from "react"

interface ImportExportActionsProps {
  onImport: (deck: Deck) => void
  deck?: Deck
  className?: string
}

export function ImportExportActions({
  onImport,
  deck,
  className,
}: ImportExportActionsProps) {
  const [importError, setImportError] = useState<string>()
  const [open, setOpen] = useState(false)

  const handleImport = async (file: File) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      const importData = validateDeckImport(data)
      onImport(importData.deck)
      setImportError(undefined)
      setOpen(false)
    } catch (error) {
      console.error('Error importing deck:', error)
      setImportError(error instanceof Error ? error.message : "Invalid file format")
    }
  }

  const handleExport = () => {
    if (!deck) return

    try {
      const exportData = prepareDeckExport(deck)
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${deck.name.toLowerCase().replace(/\s+/g, '-')}.deck.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting deck:', error)
    }
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Deck</DialogTitle>
              <DialogDescription>
                Upload a deck file to import. Only .json files are supported.
              </DialogDescription>
            </DialogHeader>
            <FileDropzone onFileSelect={handleImport} />
            {importError && (
              <Typography className="text-destructive text-sm">
                {importError}
              </Typography>
            )}
          </DialogContent>
        </Dialog>

        {deck && (
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
      </div>
    </div>
  )
}
