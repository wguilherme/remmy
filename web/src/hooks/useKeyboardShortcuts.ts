'use client'

import { useEffect } from 'react'

type ShortcutAction = {
  key: string
  action: () => void
  description: string
  altKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
}

export function useKeyboardShortcuts(shortcuts: ShortcutAction[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const shortcut = shortcuts.find(
        (s) =>
          s.key.toLowerCase() === event.key.toLowerCase() &&
          !!s.altKey === event.altKey &&
          !!s.ctrlKey === event.ctrlKey &&
          !!s.shiftKey === event.shiftKey
      )

      if (shortcut) {
        event.preventDefault()
        shortcut.action()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}
