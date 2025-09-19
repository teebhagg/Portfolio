import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { MemoizedReactMarkdown } from '@/components/markdown';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getAllPages, getPage, type ProjectMetadata } from '@/lib/mdx';
import Header from './header';

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
    <div className="container mx-auto px-4 pb-20 md:px-6">
      <Header metadata={metadata} />

      <div className="relative mt-10 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
        <Image
          src={`/images/projects/${slug}/cover.jpg`}
          width={1280}
          height={832}
          alt={metadata.name}
          className="w-full object-cover shadow-xl"
        />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <h2 className="mb-6 text-3xl font-bold">Project Overview</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MemoizedReactMarkdown>{content}</MemoizedReactMarkdown>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Card className="overflow-hidden border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Technology Stack</h3>
            <Separator className="mb-4" />

            <div className="space-y-4">
              {metadata.techstack && metadata.techstack.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {metadata.techstack.map((tech) => (
                    <span
                      key={tech.label}
                      className="rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {tech.label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No technologies specified
                </p>
              )}

              {metadata.date && (
                <>
                  <Separator />
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                      Completed
                    </h4>
                    <p>{metadata.date}</p>
                  </div>
                </>
              )}

              {metadata.category && (
                <>
                  <Separator />
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                      Category
                    </h4>
                    <p>{metadata.category}</p>
                  </div>
                </>
              )}

              {metadata.client && (
                <>
                  <Separator />
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                      Client
                    </h4>
                    <p>{metadata.client}</p>
                  </div>
                </>
              )}
            </div>
          </Card>

          {metadata.gallery && metadata.gallery.length > 0 && (
            <Card className="mt-6 overflow-hidden border p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Project Gallery</h3>
              <Separator className="mb-4" />

              <div className="grid grid-cols-2 gap-3">
                {metadata.gallery.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-md">
                    <Image
                      src={`/images/projects/${slug}/${image}`}
                      width={300}
                      height={200}
                      alt={`${metadata.name} gallery image ${index + 1}`}
                      className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
