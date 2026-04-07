import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PersonaButton from '@/components/ui/PersonaButton'

describe('PersonaButton', () => {
  it('renders as button by default', () => {
    render(<PersonaButton>Click Me</PersonaButton>)
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<PersonaButton onClick={onClick}>Click</PersonaButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders as anchor when href provided', () => {
    render(<PersonaButton href="https://example.com">Link</PersonaButton>)
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument()
  })
})
