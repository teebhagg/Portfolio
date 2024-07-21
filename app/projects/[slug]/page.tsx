import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllPages, getPage, type ProjectMetadata } from '@/lib/mdx';
import Header from './header';
import ReactMarkdown from 'react-markdown';

type ProjectPageProps = {
  params: {
    slug: string;
  };
  searchParams: Record<string, never>;
};

export const generateStaticParams = (): Array<ProjectPageProps['params']> => {
  return getAllPages<ProjectMetadata>('projects').map((project) => ({
    slug: project.slug
  }));
};

export const generateMetadata = async (
  props: ProjectPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { params } = props;

  const project = getPage<ProjectMetadata>(`projects/${params.slug}`);

  if (!project) {
    return {};
  }

  const {
    metadata: { name, description }
  } = project;
  const previousTwitter = (await parent)?.twitter ?? {};
  const previousOpenGraph = (await parent)?.openGraph ?? {};

  return {
    title: name,
    description: description,
    alternates: {
      canonical: `/projects/${params.slug}`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `/projects/${params.slug}`,
      title: name,
      description: description,
      images: [
        {
          url: `/images/projects/${params.slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: name,
      description: description,
      images: [
        {
          url: `/images/projects/${params.slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description
        }
      ]
    }
  };
};

const ProjectPage = (props: ProjectPageProps) => {
  const {
    params: { slug }
  } = props;

  const project = getPage<ProjectMetadata>(`projects/${slug}`);

  if (!project) {
    notFound();
  }

  const { metadata, content } = project;

  return (
    <div className="container mx-auto">
      <Header metadata={metadata} />
      <Image
        src={`/images/projects/${slug}/cover.jpg`}
        width={1280}
        height={832}
        alt={metadata.name}
        className="my-12 rounded-lg"
      />
      <p className="text-xl lg:text-3xl">Tech Stack</p>
      <div className="mb-8">
        <ul className="list-inside list-disc">
          {metadata.techstack.map((tech) => (
            <li key={tech.label}>{tech.label}</li>
          ))}
        </ul>
      </div>
      {content}
    </div>
  );
};

export default ProjectPage;
