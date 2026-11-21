'use client';
import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive, Checkbox as CheckboxPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

// shadcn RadioGroup + Checkbox, set as full-width rows so the whole row is the 48 px target.
const row = 'choice flex min-h-[var(--target)] w-full cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border border-input px-3 py-2.5 has-[[data-state=checked]]:border-foreground has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50';

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-2', className)} {...props} />;
}

function RadioRow({ value, disabled, children, id }: { value: string; disabled?: boolean; children: React.ReactNode; id: string }) {
  return (
    <label htmlFor={id} className={row}>
      <RadioGroupPrimitive.Item id={id} value={value} disabled={disabled} className="grid size-5 shrink-0 place-items-center rounded-full border border-input data-[state=checked]:border-accent">
        <RadioGroupPrimitive.Indicator className="block size-2.5 rounded-full bg-accent" />
      </RadioGroupPrimitive.Item>
      <span>{children}</span>
    </label>
  );
}

function CheckRow({ id, name, defaultChecked, children }: { id: string; name: string; defaultChecked?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className={row}>
      <CheckboxPrimitive.Root id={id} name={name} defaultChecked={defaultChecked} className="grid size-5 shrink-0 place-items-center rounded-[5px] border border-input data-[state=checked]:border-accent data-[state=checked]:bg-accent">
        <CheckboxPrimitive.Indicator>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="var(--background)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{children}</span>
    </label>
  );
}

export { RadioGroup, RadioRow, CheckRow };
