import * as React from 'react';
import { cn } from '@/lib/utils';

const field = 'block w-full min-h-[var(--target)] rounded-[var(--radius-sm)] border border-input bg-background px-3.5 py-3 text-[length:var(--text-body)] text-foreground placeholder:text-muted-foreground aria-invalid:border-destructive disabled:opacity-50';

function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <input data-slot="input" className={cn(field, className)} {...props} />;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} data-slot="textarea" className={cn(field, 'resize-y leading-normal', className)} {...props} />;
});

/** shadcn "native select": a real <select>, so phones get their own picker. */
function NativeSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return <select data-slot="native-select" className={cn(field, 'native-select appearance-none pr-10', className)} {...props} />;
}

export { Input, Textarea, NativeSelect };
