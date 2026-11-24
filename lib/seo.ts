import { contact } from '@/components/sections/contact/config';
import { skills } from '@/components/sections/skills/config';
import { metadata } from '@/app/config';

export const siteUrl = metadata.site.url.replace(/\/$/, '');
export const personId = `${siteUrl}/#person`;

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function getSiteStructuredData() {
  const knowsAbout = skills.flatMap((skill) =>
    (skill.description ?? '')
      .split('\n')
      .map((line) => line.match(/^\s*-\s+(.+)$/)?.[1]?.trim())
      .filter((value): value is string => Boolean(value))
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: metadata.author.name,
        url: siteUrl,
        jobTitle: metadata.author.label,
        description: metadata.site.description,
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero-memoji.png`,
          width: 1254,
          height: 1254
        },
        email: `mailto:${contact.email}`,
        sameAs: Object.values(contact.socials),
        knowsAbout
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: metadata.site.title,
        description: metadata.site.description,
        inLanguage: 'en-GH',
        publisher: { '@id': personId }
      }
    ]
  };
}
