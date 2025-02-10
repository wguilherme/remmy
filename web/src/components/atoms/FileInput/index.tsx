import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'
import { forwardRef, InputHTMLAttributes } from 'react'

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (file: File | null) => void
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null
      onValueChange?.(file)
      onChange?.(e)
    }

    return (
      <div
        className={cn(
          'group relative flex min-h-[80px] items-center justify-center rounded-md border border-dashed border-input bg-background px-4 py-4 text-sm hover:border-accent hover:bg-accent/5',
          className
        )}
      >
        <input
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-accent">
          <Upload className="h-4 w-4" />
          <span>
            Choose a file or drag & drop here
          </span>
        </div>
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'

export { FileInput }
