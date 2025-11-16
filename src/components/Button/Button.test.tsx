import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  describe('렌더링', () => {
    it('children을 올바르게 렌더링해야 함', () => {
      render(<Button>클릭하세요</Button>);
      expect(screen.getByRole('button', { name: '클릭하세요' })).toBeInTheDocument();
    });

    it('ref를 올바르게 전달해야 함', () => {
      const ref = { current: null };
      render(<Button ref={ref}>버튼</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('variant 속성', () => {
    it('기본값은 primary여야 함', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-brand-primary');
      expect(button).toHaveClass('text-text-inverse');
    });

    it('variant="outline"일 때 outline 스타일이 적용되어야 함', () => {
      render(<Button variant='outline'>Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-1');
      expect(button).toHaveClass('border-brand-primary');
      expect(button).toHaveClass('text-brand-primary');
    });

    it('variant="danger"일 때 danger 스타일이 적용되어야 함', () => {
      render(<Button variant='danger'>Danger</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-status-danger');
      expect(button).toHaveClass('text-text-inverse');
    });
  });

  describe('size 속성', () => {
    it('기본값은 lg여야 함', () => {
      render(<Button>Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-3x');
      expect(button).toHaveClass('text-lg-semibold');
      expect(button).toHaveClass('w-[332px]');
    });

    it('size="sm"일 때 작은 크기 스타일이 적용되어야 함', () => {
      render(<Button size='sm'>Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-2x');
      expect(button).toHaveClass('text-md-semibold');
      expect(button).toHaveClass('px-3');
      expect(button).toHaveClass('py-2');
    });

    it('size="md"일 때 중간 크기 스타일이 적용되어야 함', () => {
      render(<Button size='md'>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
      expect(button).toHaveClass('text-md-semibold');
      expect(button).toHaveClass('px-5');
    });
  });

  describe('disabled 상태', () => {
    it('disabled일 때 비활성화 스타일이 적용되어야 함', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:cursor-not-allowed');
      expect(button).toHaveClass('disabled:bg-interaction-inactive');
    });

    it('disabled일 때 클릭 이벤트가 발생하지 않아야 함', async () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('이벤트 핸들링', () => {
    it('onClick 이벤트가 올바르게 동작해야 함', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('여러 번 클릭 시 onClick이 여러 번 호출되어야 함', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 올바르게 병합되어야 함', () => {
      render(<Button className='custom-class'>Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('bg-brand-primary'); // 기본 스타일도 유지
    });
  });

  describe('HTML 속성', () => {
    it('type 속성이 올바르게 전달되어야 함', () => {
      render(<Button type='submit'>Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('aria-label이 올바르게 전달되어야 함', () => {
      render(<Button aria-label='Close'>X</Button>);
      const button = screen.getByRole('button', { name: 'Close' });
      expect(button).toBeInTheDocument();
    });

    it('data 속성이 올바르게 전달되어야 함', () => {
      render(<Button data-testid='custom-button'>Button</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });

  describe('복합 케이스', () => {
    it('variant와 size를 함께 사용할 수 있어야 함', () => {
      render(
        <Button size='sm' variant='outline'>
          Outline Small
        </Button>,
      );
      const button = screen.getByRole('button');

      // outline variant
      expect(button).toHaveClass('border-1');
      expect(button).toHaveClass('text-brand-primary');

      // sm size
      expect(button).toHaveClass('rounded-2x');
      expect(button).toHaveClass('px-3');
    });
  });

  describe('공통 스타일', () => {
    it('모든 버튼에 공통 스타일이 적용되어야 함', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('cursor-pointer');
      expect(button).toHaveClass('smooth-color');
      expect(button).toHaveClass('layout-center');
    });
  });
});
