import * as React from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn/ui Button, restyled to DESIGN.md: ink is the primary fill; one primary per screen.
const buttonVariants = cva(
  'press inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold text-[length:var(--text-body)] leading-tight min-h-[var(--target)] px-5 py-2.5 text-center no-underline cursor-pointer select-none disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border border-primary hover-fine:opacity-90',
        secondary: 'bg-transparent text-foreground border border-border hover-fine:bg-card',
        ghost: 'bg-transparent text-foreground border border-transparent hover-fine:bg-card',
        destructive: 'bg-destructive text-primary-foreground border border-destructive hover-fine:opacity-90',
        link: 'bg-transparent border-0 px-0 text-muted-foreground underline underline-offset-4 font-normal text-[length:var(--text-sm)] hover-fine:text-foreground',
      },
      size: {
        default: '',
        // 48 px on touch-width layouts, 40 px only in the wide laptop layout.
        sm: 'px-4 text-[length:var(--text-ui)] min-[860px]:min-h-[var(--target-sm)]',
        block: 'w-full',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';
  return <Comp data-slot="button" data-size={size ?? undefined} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
