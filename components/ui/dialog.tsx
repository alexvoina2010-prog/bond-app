'use client';
import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

// shadcn Dialog, restyled as the crisis sheet. Enter/exit motion lives in globals.css (data-state).
const Dialog = DialogPrimitive.Root;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="sheet-scrim fixed inset-0 z-50" />
      <div className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none">
        <DialogPrimitive.Content
          className={cn('sheet pointer-events-auto grid max-h-[calc(100dvh-32px)] w-full max-w-[440px] gap-3.5 overflow-y-auto rounded-[var(--radius-sheet)] bg-background px-5 pb-5 pt-6 text-foreground', className)}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  );
}

export { Dialog, DialogContent, DialogTitle, DialogDescription };
