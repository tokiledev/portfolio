import { Link } from 'react-router-dom';

import { Backdrop, Page, Section } from '@/components/brand';
import { PROJECT_GROUPS, useProjects } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';
import { GROUP_INTRO, ProjectShot } from '@/pages/Home';

// Projects: one feature block per group (AI agents, automations, websites;
// Shopify is hidden), Cursor's alternating layout. Each block opens that
// group's board at /projects/<group>. See the rule in data/projects.ts.

function Projects() {
  const { t } = useLang();
  const projects = useProjects();

  usePageMeta(
    'Projects & Case Studies — Ahmad Touqeer',
    'n8n + LLM automations for Telegram lead capture, fact-checked LinkedIn posts, Hacker News video content, CV screening and a local RAG chatbot, and full-stack websites for Synthflow, ServiceNow, Bland AI, Clay, Durable, Framer, Harvey and Speculo, with screenshots, challenges, solutions and results.'
  );

  const groups = PROJECT_GROUPS.map((g) => ({
    group: g,
    items: projects.filter((p) => g.kinds.includes(p.kind)),
  })).filter((g) => g.items.length > 0);

  return (
    <Page>
      <Section className='pt-16 sm:pt-24'>
        <div className='max-w-[720px]'>
          <p className='eyebrow'>{t('heroEyebrow')}</p>
          <h1 className='mt-4 text-[32px] leading-[1.15] sm:text-[44px]'>{t('projectsTitle')}</h1>
          <p className='mt-5 max-w-[58ch] text-[18px] leading-[1.45] text-ink-dim'>{t('heroSub')}</p>
        </div>
      </Section>

      <Section className='space-y-6 pt-14'>
        {groups.map(({ group, items }, i) => (
          <article
            key={group.slug}
            className='grid items-center gap-8 rounded-[4px] bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]'
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <p className='num text-[14px] text-signal'>
                {String(items.length).padStart(2, '0')} {items.length === 1 ? t('projectOne') : t('projectMany')}
              </p>
              <h2 className='mt-3 text-[24px] text-ink sm:text-[28px]'>{t(group.labelKey)}</h2>
              <p className='mt-2 text-[18px] leading-[1.45] text-ink-dim'>{t(GROUP_INTRO[group.slug])}</p>
              <Link to={`/projects/${group.slug}`} className='btn btn-primary mt-6'>
                {t('seeProjects')}
              </Link>
            </div>
            <Link
              to={`/projects/${group.slug}`}
              aria-label={t(group.labelKey)}
              className={i % 2 === 1 ? 'lg:order-1' : ''}
            >
              <Backdrop>
                <ProjectShot project={items[0]} eager={i === 0} />
              </Backdrop>
            </Link>
          </article>
        ))}
      </Section>
    </Page>
  );
}

export default Projects;
