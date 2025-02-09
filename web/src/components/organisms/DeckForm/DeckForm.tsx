'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Input } from "@/components/atoms/Input/Input"
import { Label } from "@/components/atoms/Label/Label"
import { Textarea } from "@/components/atoms/Textarea/Textarea"
import { Card } from "@/types/card"
import { PlusCircle, X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

interface DeckFormData {
  name: string
  description: string
  category?: string
  tags: string[]
  language: {
    from: string
    to: string
  }
  cards: Card[]
}

interface DeckFormProps {
  initialData?: Partial<DeckFormData>
  onSubmit: (data: DeckFormData) => void
  isLoading?: boolean
}

export function DeckForm({ initialData, onSubmit, isLoading }: DeckFormProps) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<DeckFormData>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      language: initialData?.language || { from: "", to: "" },
      cards: initialData?.cards || [{ id: "1", front: "", back: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Deck Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="e.g., Spanish Basics"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            placeholder="Describe your deck..."
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            {...register("category")}
            placeholder="e.g., Language Learning"
          />
        </div>

        <div className="grid gap-2">
          <Label>Language</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                {...register("language.from", { required: "From language is required" })}
                placeholder="From (e.g., en)"
              />
            </div>
            <div>
              <Input
                {...register("language.to", { required: "To language is required" })}
                placeholder="To (e.g., es)"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Tags</Label>
          <Input
            {...register("tags")}
            placeholder="Enter tags separated by commas"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Cards</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ id: Date.now().toString(), front: "", back: "" })}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <div className="flex-1 space-y-4">
                <Input
                  {...register(`cards.${index}.front` as const, {
                    required: "Front side is required",
                  })}
                  placeholder="Front side"
                />
                <Input
                  {...register(`cards.${index}.back` as const, {
                    required: "Back side is required",
                  })}
                  placeholder="Back side"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="mt-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Deck"}
      </Button>
    </form>
  )
}
