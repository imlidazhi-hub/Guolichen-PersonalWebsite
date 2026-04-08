import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ClipCard from '@/components/ui/ClipCard'

describe('ClipCard', () => {
  it('renders children', () => {
    render(<ClipCard>Hello Card</ClipCard>)
    expect(screen.getByText('Hello Card')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ClipCard onClick={onClick}>Click Me</ClipCard>)
    fireEvent.click(screen.getByText('Click Me'))
    expect(onClick).toHaveBeenCalled()
  })
})
