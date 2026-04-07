import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import TypewriterText from '@/components/ui/TypewriterText'

describe('TypewriterText', () => {
  it('renders without crashing', () => {
    const { container } = render(<TypewriterText text="Hello" />)
    expect(container.firstChild).toBeDefined()
  })
})
