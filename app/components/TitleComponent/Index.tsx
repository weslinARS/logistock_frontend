import type { ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const titleStyle = tv({
  base: 'font-black capitalize inline-flex items-center',
  variants: {
    size: {
      main: 'text-6xl',
      sub: 'text-4xl',
      medium: 'text-3xl',
      small: 'text-2xl',
      mini: 'text-xl',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
    },
  },
  defaultVariants: {
    size: 'main',
    color: 'primary',
  },
});

type Props = VariantProps<typeof titleStyle> & {
  children: ReactNode;
};

export default function TitleComponent({ children, color, size }: Props) {
  return (
    <span className={`inline-flex  gap-4 ${titleStyle({ color, size })}`}>
      {children}
    </span>
  );
}
