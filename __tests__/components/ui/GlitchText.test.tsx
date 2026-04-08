import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GlitchText from '@/components/ui/GlitchText'

describe('GlitchText', () => {
  it('renders text content', () => {
    render(<GlitchText text="HELLO WORLD" />)
    const elements = screen.getAllByText('HELLO WORLD')
    expect(elements.length).toBeGreaterThanOrEqual(1)
  })

  it('applies custom className', () => {
    const { container } = render(<GlitchText text="TEST" className="text-4xl" />)
    expect(container.firstChild).toHaveClass('text-4xl')
  })
})
