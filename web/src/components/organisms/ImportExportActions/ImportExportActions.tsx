import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { FileInput } from '@/components/atoms/FileInput'
import { Label } from '@/components/atoms/Label'
import { useToast } from '@/components/atoms/Toast/useToast'
import { parseDeckImport, validateDeckImport } from '@/lib/utils/deck-import'
import { Download, Loader2 } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

interface ImportExportActionsProps {
  onImportSuccess: () => void
}

export function ImportExportActions({ onImportSuccess }: ImportExportActionsProps) {
  const { toast } = useToast()
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      // Mostrar toast de início
      toast({
        title: 'Importing deck...',
        description: `Reading file: ${file.name}`,
      })

      const text = await file.text()
      const data = JSON.parse(text)

      if (!validateDeckImport(data)) {
        throw new Error('Invalid deck file')
      }

      const deck = parseDeckImport(data)
      
      // Criar o deck via API
      const response = await fetch('/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: deck.name,
          description: deck.description,
          tags: deck.tags,
          cards: deck.cards,
          stats: {
            totalCards: deck.cards.length,
            newCards: deck.cards.length,
            cardsToReview: 0,
            lastStudied: null,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to import deck')
      }

      const importedDeck = await response.json()

      toast({
        title: 'Success',
        description: `Deck "${importedDeck.name}" imported with ${importedDeck.cards.length} cards`,
      })

      onImportSuccess()
    } catch (error) {
      console.error('Import error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to import deck',
        variant: 'destructive',
      })
    } finally {
      setIsImporting(false)
      // Limpar o input
      event.target.value = ''
    }
  }

  const handleExport = async () => {
    if (isExporting) return
    setIsExporting(true)

    try {
      toast({
        title: 'Exporting deck...',
        description: 'Preparing file for download',
      })

      const response = await fetch('/api/decks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to export deck')
      }

      const decks = await response.json()
      if (!decks.length) {
        throw new Error('No decks available to export')
      }

      const deck = decks[0]
      const json = JSON.stringify(deck, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${deck.name}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: 'Success',
        description: `Deck "${deck.name}" exported successfully`,
      })
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to export deck',
        variant: 'destructive',
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="import-file" className="mb-2 block">Import Deck</Label>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <FileInput
                id="import-file"
                accept=".json"
                onChange={handleImport}
                disabled={isImporting}
              />
              {isImporting && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Importing deck...
                </div>
              )}
            </div>
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
