'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import MotionWrap from '@/components/motion-wrap';

import { toast } from '@/components/ui/use-toast';

import {
  YoutubeIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon
} from 'lucide-react';
import ContactForm from './contact-form';
import ScrollWordReveal from '@/components/scroll-word-reveal';

import { contact } from '@/components/sections/contact/config';

import { contactSubmit } from '@/app/actions';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';

interface ValidationErrors {
  success: boolean;
  message: string;
  errors?: {
    name?: string[] | undefined;
  };
}

const initialState: ValidationErrors = {
  success: false,
  errors: {},
  message: ''
};

function Contact() {
  // const [state, formAction] = useFormState(contactSubmit, initialState);

  // useEffect(() => {
  //   if (state?.message === '') return;

  //   toast({
  //     title: state?.message
  //   });
  // }, [state]);

  return (
    <MotionWrap className="w-full py-16 lg:py-24" id="contact" tone="aqua">
      {/* TODO: Redesign for horizontal */}
      <div className=" px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            <h2 className="section-heading-line font-bold tracking-tighter">
              <ScrollWordReveal>Contact Me</ScrollWordReveal>
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <ScrollWordReveal>
                Have a question or want to work together? Send me a message
                using the form.
              </ScrollWordReveal>
            </p>
            <p className="text-muted-foreground">
              <ScrollWordReveal>Email: </ScrollWordReveal>
              <a className="hover:underline" href={`mailto:${contact.email}`}>
                <ScrollWordReveal>{contact.email}</ScrollWordReveal>
              </a>
            </p>
            <div className="flex space-x-1">
              {contact.socials?.github && (
                <Button variant="outline" size="icon" asChild>
                  <a target="_blank" href={contact.socials.github}>
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {contact.socials?.linkedin && (
                <Button variant="outline" size="icon" asChild>
                  <a target="_blank" href={contact.socials.linkedin}>
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </MotionWrap>
  );
}

export default Contact;
