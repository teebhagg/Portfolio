'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollWordReveal from '@/components/scroll-word-reveal';

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(false);

  return (
    <form
      className="space-y-7 rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setPreview(true);
      }}
    >
      <fieldset>
        <legend className="mb-3 text-sm font-medium">
          <ScrollWordReveal>How was your visit?</ScrollWordReveal>
        </legend>
        <div className="flex gap-2" role="group" aria-label="Choose a rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} out of 5 stars`}
              aria-pressed={rating === value}
              onClick={() => {
                setRating(value);
                setPreview(false);
              }}
              className="rounded-full p-2 text-muted-foreground transition-[color,transform] duration-200 hover:scale-110 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
            >
              <Star
                aria-hidden="true"
                className={`h-6 w-6 ${rating >= value ? 'fill-current text-amber-500' : ''}`}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="feedback-message" className="text-sm font-medium">
          <ScrollWordReveal>Your feedback</ScrollWordReveal>
        </label>
        <textarea
          id="feedback-message"
          name="message"
          required
          minLength={8}
          maxLength={1200}
          rows={6}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setPreview(false);
          }}
          placeholder="What stood out to you?"
          className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-base leading-relaxed outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <p className="text-xs text-muted-foreground">
          <ScrollWordReveal>Up to 1,200 characters.</ScrollWordReveal>
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={message.trim().length < 8}>
          <ScrollWordReveal>Preview feedback</ScrollWordReveal>
        </Button>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          <ScrollWordReveal>
            {preview
              ? `Preview ready${rating ? ` · ${rating}/5 stars` : ''}. Nothing was sent or saved.`
              : 'Preview only. This form is not connected to a backend.'}
          </ScrollWordReveal>
        </p>
      </div>

      {preview && (
        <div
          className="rounded-xl border bg-muted/40 p-4"
          aria-label="Feedback preview"
        >
          <p className="mb-2 text-sm font-medium">
            <ScrollWordReveal>Your preview</ScrollWordReveal>
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
            {message.trim()}
          </p>
        </div>
      )}
    </form>
  );
}
