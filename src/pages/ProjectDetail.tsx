import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { AppWindow, Backdrop, LogoTile, Page, Section } from '@/components/brand';
import { techLogos } from '@/data/tech-logos';
import { groupOf, useProjects } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';

// Case study in the Cursor look: a left-aligned header (category, title, live
// address, facts row), the stack as logo tiles, then two columns on wide
// screens — every picture and the video in app windows on the left, the
// write-up as plain sections on the right. Phones stack the two.

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-[4px] bg-surface p-4'>
      <p className='text-[13px] text-ink-faint'>{label}</p>
      <p className='mt-1 text-[15px] leading-snug text-ink'>{value}</p>
    </div>
  );
}

function TextSection({ title, paragraphs, children }: { title: string; paragraphs: string[]; children?: React.ReactNode }) {
  return (
    <section className='border-t border-hairline pt-6'>
      <h2 className='text-[22px] text-ink'>{title}</h2>
      {paragraphs.map((text, i) => (
        <p key={i} className='mt-3 text-[15px] leading-[1.65] text-ink-dim'>
          {text}
        </p>
      ))}
      {children}
    </section>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const projects = useProjects();
  const project = projects.find((p) => p.id === id);

  const label = project?.kind === 'apps' ? 'Web App' : project?.stack ? 'AI' : 'E-commerce';
  usePageMeta(
    project ? `${project.title} — ${label} Case Study | Ahmad Touqeer` : 'Projects & Case Studies — Ahmad Touqeer',
    project
      ? project.stack
        ? `${project.title} (${project.industry}) — how it works, the stack and the results, with ${project.video ? 'video and ' : ''}screenshots.`
        : `${project.title}, an e-commerce build in ${project.industry.toLowerCase()} — the challenge, the build and the results, with video and screenshots.`
      : undefined
  );

  if (!project) {
    return (
      <Page>
        <Section className='pt-24'>
          <p className='text-[18px] text-ink-dim'>{t('notFound')}</p>
          <Link to='/projects' className='link-accent mt-4 inline-flex text-[15px]'>
            {t('backToProjectsLink')}
          </Link>
        </Section>
      </Page>
    );
  }

  const group = groupOf(project.kind);
  const logos = techLogos(project);

  return (
    <Page>
      {/* header */}
      <Section className='pt-16 sm:pt-24'>
        <Link to={`/projects/${group.slug}`} className='eyebrow transition-colors hover:text-ink'>
          ← {t(group.labelKey)}
        </Link>
        <h1 className='mt-4 max-w-[20ch] text-[32px] leading-[1.15] sm:text-[44px]'>{project.title}</h1>
        <p className='mt-3 text-[18px] text-ink-dim'>{project.category}</p>
        {project.url && (
          <a
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='link-accent mt-4 inline-flex items-center gap-1 text-[15px]'
          >
            {new URL(project.url).hostname}
            <ArrowUpRight className='size-4' />
          </a>
        )}

        <div className='mt-10 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4'>
          {project.published && <Fact label={t('published')} value={project.published} />}
          <Fact label={t('services')} value={project.services} />
          <Fact label={t('client')} value={project.client} />
          <Fact label={t('industry')} value={project.industry} />
        </div>
      </Section>

      {/* stack */}
      {logos.length > 0 && (
        <Section className='pt-10'>
          <p className='text-[14px] text-ink-dim'>{t('stack')}</p>
          <ul className='mt-4 grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-8'>
            {logos.map((l) => (
              <LogoTile key={l.label} {...l} />
            ))}
          </ul>
        </Section>
      )}

      {/* media + write-up */}
      <Section className='pt-16'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16'>
          <div className='flex flex-col gap-6'>
            {project.video && (
              <Backdrop>
                <AppWindow title={`${project.title} · video`}>
                  <video src={project.video} controls autoPlay muted loop playsInline preload='auto' className='block w-full' />
                </AppWindow>
              </Backdrop>
            )}
            {project.images.map((url, i) => (
              <AppWindow key={url} title={`${project.title} · ${i + 1}/${project.images.length}`}>
                <img
                  src={url}
                  alt={`${project.title} — ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                  className='block h-auto w-full select-none'
                />
              </AppWindow>
            ))}
          </div>

          <aside className='flex flex-col gap-10'>
            <TextSection title={t('description')} paragraphs={project.description} />
            <TextSection title={t('challenges')} paragraphs={project.challenges} />
            <TextSection title={t('solutions')} paragraphs={project.solutions} />
            {project.stack && (
              <TextSection title={t('stack')} paragraphs={[]}>
                <dl className='mt-3 divide-y divide-hairline'>
                  {project.stack.map((row) => (
                    <div key={row.layer} className='grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3'>
                      <dt className='text-[14px] text-ink-faint'>{row.layer}</dt>
                      <dd className='text-[14px] leading-[1.55] text-ink-dim'>{row.tools}</dd>
                    </div>
                  ))}
                </dl>
              </TextSection>
            )}
            <TextSection title={t('results')} paragraphs={project.results} />
            <Link to='/contact' className='btn btn-primary self-start'>
              {t('contactLabel')}
            </Link>
          </aside>
        </div>
      </Section>
    </Page>
  );
}

export default ProjectDetail;
