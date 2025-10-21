import { cn } from './cn';

describe('커스텀 tailwind class 충돌 처리', () => {
  it('여러 종류의 커스텀 폰트들은 마지막 것만 적용되어야 함', () => {
    expect(cn('text-lg-bold text-2lg-bold text-lg-semibold')).toBe('text-lg-semibold');
    expect(cn('text-xl-regular text-xl-bold')).toBe('text-xl-bold');
  });
  it('커스텀 폰트, 색상 간 충돌이 없어야 함', () => {
    expect(cn('text-2lg-semibold text-2lg-bold text-point-cyan')).toBe(
      'text-2lg-bold text-point-cyan',
    );
    expect(cn('text-point-cyan text-2lg-semibold text-2lg-bold')).toBe(
      'text-point-cyan text-2lg-bold',
    );
  });
});
