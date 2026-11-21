'use client';
import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn('relative inline-flex h-[26px] w-[44px] shrink-0 cursor-pointer items-center rounded-full bg-input transition-colors duration-[var(--dur)] ease-[var(--ease-out)] data-[state=checked]:bg-accent', className)} {...props}>
      <SwitchPrimitive.Thumb className="pointer-events-none block size-5 translate-x-[3px] rounded-full bg-background transition-transform duration-[var(--dur)] ease-[var(--ease-out)] data-[state=checked]:translate-x-[21px]" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
