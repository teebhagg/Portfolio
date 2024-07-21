'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormControl
} from '@/components/ui/form';
import { useState } from 'react';

interface ValidationErrors {
  success: boolean;
  message: string;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    message?: string[] | undefined;
  };
}

interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
  state: ValidationErrors;
}

const formSchema = z.object({
  fullName: z.string().min(1, {
    message: 'Please enter your full name.'
  }),
  email: z.string().min(1, { message: 'Please enter your email.' }).email({
    message: 'Please enter a valid email.'
  }),
  message: z.string().min(1, {
    message: 'Please enter a message.'
  })
});

export default function ContactForm({ state }: ContactFormProps) {
  // const { pending } = useFormStatus();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    fullName: '',
    email: '',
    message: ''
  };

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema)
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <Label> Name </Label>
                  <FormControl>
                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label> Email </Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="jane@example.com"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Label> Subject </Label>
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder={
                        'Hello!\n\nThis is Jane Doe, from Example. Just wanted to say hi!'
                      }
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" disabled={loading}>
              {loading && (
                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
