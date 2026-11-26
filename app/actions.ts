'use server';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/contact-template';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.'
    }),
  email: z
    .string({
      required_error: 'Please enter a valid email.'
    })
    .email(),
  message: z.string().max(380).min(4)
});

const quoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  goal: z.string().trim().min(10).max(2000),
  projectType: z.string().min(1).max(80),
  features: z.array(z.string().max(100)).max(20),
  details: z.record(z.string().max(500)).optional(),
  currency: z.enum(['USD', 'GHS']),
  estimate: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
  references: z
    .array(
      z.object({ url: z.string().url().max(500), note: z.string().max(300) })
    )
    .max(5)
});

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;

export async function contactSubmit(prevState: any, formData: FormData) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please check your entries and try again.'
      };
    }

    const { name, email, message } = validatedFields.data;

    if (!EMAIL_FROM || !EMAIL_TO) {
      return {
        success: false,
        message: 'Oops! There went wrong. Please try again later.'
      };
    }

    const { data: res, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `Message from ${name} on Portfolio`,
      react: ContactEmail({ name, email, message })
    });

    if (error) {
      return {
        success: false,
        message: 'Oops! Something went wrong. Please try again later.'
      };
    }

    return {
      success: true,
      message: 'Thank you for reaching out! Your message has been sent.'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Oops! Something went wrong. Please try again later.'
    };
  }
}

export async function quoteRequestSubmit(payload: unknown) {
  const parsed = quoteRequestSchema.safeParse(payload);
  if (!parsed.success)
    return {
      success: false,
      message: 'Check the project brief fields and try again.'
    };
  if (!EMAIL_FROM || !EMAIL_TO || !process.env.RESEND_API_KEY)
    return {
      success: false,
      message:
        'Email delivery is not configured. Copy the brief and email it directly.'
    };

  const {
    name,
    email,
    goal,
    projectType,
    features,
    details,
    currency,
    estimate,
    budget,
    timeline,
    references
  } = parsed.data;
  const body = [
    `Name: ${name}`,
    `Reply email: ${email}`,
    `Project type: ${projectType}`,
    `Features: ${features.join(', ') || 'None selected'}`,
    `Feature details: ${JSON.stringify(details ?? {})}`,
    `Currency: ${currency}`,
    `Estimate: ${estimate || 'Pending'}`,
    `Budget: ${budget || 'Not provided'}`,
    `Target launch: ${timeline || 'Not provided'}`,
    `Goal: ${goal}`,
    'Design references:',
    ...references.map(
      (reference) =>
        `- ${reference.url}${reference.note ? ` (${reference.note})` : ''}`
    )
  ].join('\n');

  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      reply_to: email,
      subject: `Quote request from ${name}: ${projectType}`,
      text: body
    });
    if (error)
      return {
        success: false,
        message: 'The email could not be sent. Copy the brief and try again.'
      };
    return {
      success: true,
      message:
        'Your project brief has been sent. Joshua can reply directly to your email.'
    };
  } catch {
    return {
      success: false,
      message: 'The email could not be sent. Copy the brief and try again.'
    };
  }
}
