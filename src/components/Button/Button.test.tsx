// src/components/Button/Button.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with primary variant by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-brand-primary');
  });

  it('renders with outline variant', () => {
    render(<Button variant='outline'>Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-brand-primary');
  });

  it('renders with danger variant', () => {
    render(<Button variant='danger'>Danger</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-status-danger');
  });

  it('renders with small size', () => {
    render(<Button size='sm'>Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-md-semibold');
  });

  it('applies custom className', () => {
    render(<Button className='custom-class'>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  // medium size와 large size 테스트는 의도적으로 제외
  // forwardRef 테스트는 의도적으로 제외
});
