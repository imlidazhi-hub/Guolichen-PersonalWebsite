import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NPCDialog from '@/components/ui/NPCDialog'

describe('NPCDialog', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <NPCDialog isOpen={false} text="Hello" npcName="Test" onClose={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('shows NPC name when open', () => {
    render(
      <NPCDialog isOpen={true} text="Hello there" npcName="铃布" onClose={vi.fn()} />
    )
    expect(screen.getByText('铃布')).toBeInTheDocument()
  })
})
