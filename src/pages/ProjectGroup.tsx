import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { Page, Section } from '@/components/brand';
import { PROJECT_GROUPS, useProjects } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';
import { GROUP_INTRO, ProjectShot } from '@/pages/Home';

// One group's board (opened from /projects): the group's heading and grey
// sentence, then every project as a surface card — its picture in an app
// window, the title, the industry, the live address. Click → case study.

function ProjectGroup({ slug }: { slug: string }) {
  const { t } = useLang();
  const group = PROJECT_GROUPS.find((g) => g.slug === slug)!;
  const projects = useProjects().filter((p) => group.kinds.includes(p.kind));

  usePageMeta(
    `${t(group.labelKey)} — Projects | Ahmad Touqeer`,
    `${t(group.labelKey)} by Ahmad Touqeer: ${projects.map((p) => p.title).join(', ')}.`
  );

  return (
    <Page>
      <Section className='pt-16 sm:pt-24'>
        <Link to='/projects' className='eyebrow transition-colors hover:text-ink'>
          ← {t('projectsTitle')}
        </Link>
        <h1 className='mt-4 text-[32px] leading-[1.15] sm:text-[44px]'>{t(group.labelKey)}</h1>
        <p className='mt-3 max-w-[62ch] text-[18px] leading-[1.45] text-ink-dim'>{t(GROUP_INTRO[group.slug])}</p>
      </Section>

      <Section className='pt-12'>
        <ul className='grid gap-1.5 md:grid-cols-2'>
          {projects.map((p, i) => (
            <li key={p.id} className='flex flex-col rounded-[4px] bg-surface p-4 sm:p-5'>
              <Link to={`/projects/${p.id}`} aria-label={p.title} className='block'>
                <ProjectShot project={p} eager={i < 2} />
              </Link>
              <div className='mt-5 flex items-start justify-between gap-4'>
                <div className='min-w-0'>
                  <Link to={`/projects/${p.id}`} className='block text-[18px] text-ink transition-colors hover:text-signal'>
                    {p.title}
                  </Link>
                  <p className='mt-1 truncate text-[14px] text-ink-faint'>
                    {p.industry}
                    {p.date && <span className='num'> · {p.date}</span>}
                  </p>
                </div>
                <span className='num shrink-0 text-[13px] text-ink-faint'>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className='mt-4 flex flex-wrap items-center gap-x-5 gap-y-2'>
                <Link to={`/projects/${p.id}`} className='link-accent text-[15px]'>
                  {t('readCase')} →
                </Link>
                {p.url && (
                  <a
                    href={p.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1 text-[14px] text-ink-dim transition-colors hover:text-ink'
                  >
                    {new URL(p.url).hostname}
                    <ArrowUpRight className='size-3.5' />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}

export default ProjectGroup;
