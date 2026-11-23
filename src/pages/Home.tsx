import { Link } from 'react-router-dom';

import { AppWindow, Backdrop, Block, Page, Section, SectionTitle } from '@/components/brand';
import { PROJECT_GROUPS, useProjects, type Project } from '@/data/projects';
import { useLang, usePageMeta, type StringKey } from '@/i18n';

// Home, laid out like the Cursor-look homepage (Smm/app/page.tsx): a short
// left-aligned statement and two pills, one product picture on the painted
// backdrop, the "delivered for" tile strip, alternating feature blocks (one
// per project group), the stat blocks, what I do, and a closing call to action.

const CLIENTS = ['Allianz France', 'Havas Group', 'KHOME', 'Sopra Steria'];

const STATS: { value: string; labelKey: StringKey }[] = [
  { value: '5+', labelKey: 'meStatsAI' },
  { value: '4', labelKey: 'meStatsClients' },
  { value: '100+', labelKey: 'meStatsProjects' },
  { value: '1,000+', labelKey: 'meStatsThemes' },
];

/** The grey sentence under each group's heading. */
export const GROUP_INTRO: Record<string, StringKey> = {
  agents: 'projectsIntroVoice',
  automations: 'projectsIntroLead',
  websites: 'projectsIntroApps',
  shopify: 'projectsIntro',
};

/** A project's first picture in an app window, titled with its name. */
export function ProjectShot({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <AppWindow title={project.title}>
      <img
        src={project.image}
        alt={project.title}
        loading={eager ? 'eager' : 'lazy'}
        draggable={false}
        className={`block aspect-[16/10] w-full select-none ${
          project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
        }`}
      />
    </AppWindow>
  );
}

function Home() {
  const { t } = useLang();
  const projects = useProjects();

  usePageMeta(
    'AI Engineer — Agents, Automations & SaaS | Ahmad Touqeer',
    'Freelance AI engineer in Paris. AI agents and agentic workflows with LangChain and LangGraph, automation with n8n, Make and Zapier, SaaS products, CRM automation and AI-powered websites.'
  );

  const groups = PROJECT_GROUPS.map((g) => ({
    group: g,
    items: projects.filter((p) => g.kinds.includes(p.kind)),
  })).filter((g) => g.items.length > 0);
  // The hero shows a finished website, so it doesn't repeat the first
  // feature block's picture.
  const featured =
    projects.find((p) => p.kind === 'apps') ?? groups[0]?.items[0];

  return (
    <Page>
      {/* hero */}
      <Section className='pt-16 sm:pt-24'>
        <div className='max-w-[720px]'>
          <p className='eyebrow'>{t('heroEyebrow')}</p>
          <h1 className='mt-4'>
            <span className='block text-[32px] leading-[1.15] sm:text-[44px]'>{t('heroTitle')}</span>
          </h1>
          <p className='mt-5 max-w-[58ch] text-[18px] leading-[1.45] text-ink-dim sm:text-[20px]'>{t('heroSub')}</p>

          <div className='mt-8 flex flex-wrap gap-3'>
            <Link to='/projects' className='btn btn-primary'>
              {t('meViewProjects')}
            </Link>
            <Link to='/contact' className='btn btn-ghost'>
              {t('contactLabel')}
            </Link>
          </div>
        </div>

        {featured && (
          <Link to={`/projects/${featured.id}`} aria-label={featured.title} className='mt-14 block'>
            <Backdrop>
              <ProjectShot project={featured} eager />
            </Backdrop>
          </Link>
        )}
      </Section>

      {/* "delivered for" tile strip */}
      <Section className='pt-20'>
        <p className='text-center text-[14px] text-ink-dim'>{t('deliveredFor')}</p>
        <ul className='mt-5 grid grid-cols-2 gap-1.5 lg:grid-cols-4'>
          {CLIENTS.map((c) => (
            <li key={c} className='flex h-16 items-center justify-center rounded-[4px] bg-surface text-[15px] text-ink'>
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* one feature block per project group, picture side alternating */}
      <Section className='space-y-6 pt-24'>
        <h2 className='sr-only'>{t('projectsTitle')}</h2>
        {groups.map(({ group, items }, i) => (
          <article
            key={group.slug}
            className='grid items-center gap-8 rounded-[4px] bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]'
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <p className='num text-[14px] text-signal'>{String(items.length).padStart(2, '0')}</p>
              <h3 className='mt-3 text-[20px] text-ink'>{t(group.labelKey)}</h3>
              <p className='mt-1 text-[18px] leading-[1.45] text-ink-dim'>{t(GROUP_INTRO[group.slug])}</p>
              <Link to={`/projects/${group.slug}`} className='link-accent mt-5 inline-flex text-[15px]'>
                {t('seeProjects')} →
              </Link>
            </div>
            <Link
              to={`/projects/${items[0].id}`}
              aria-label={items[0].title}
              className={i % 2 === 1 ? 'lg:order-1' : ''}
            >
              <Backdrop>
                <ProjectShot project={items[0]} />
              </Backdrop>
            </Link>
          </article>
        ))}
      </Section>

      {/* stats */}
      <Section className='pt-24'>
        <div className='grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4'>
          {STATS.map((s) => (
            <Block key={s.labelKey}>
              <p className='num text-[32px] leading-none text-ink'>{s.value}</p>
              <p className='mt-2 text-[14px] text-ink-dim'>{t(s.labelKey)}</p>
            </Block>
          ))}
        </div>
      </Section>

      {/* what I do */}
      <Section className='pt-24'>
        <SectionTitle title={t('meWhatIDo')} />
        <ol className='mt-10 grid gap-1.5 sm:grid-cols-2'>
          {(
            [
              ['meShopTitle', 'meShopText'],
              ['meWebTitle', 'meWebText'],
              ['meAiTitle', 'meAiText'],
              ['meContentTitle', 'meContentText'],
            ] as const
          ).map(([title, text], i) => (
            <li key={title} className='rounded-[4px] bg-surface p-6'>
              <span className='num text-[14px] text-signal'>{String(i + 1).padStart(2, '0')}</span>
              <h3 className='mt-3 text-[18px] text-ink'>{t(title)}</h3>
              <p className='mt-2 text-[15px] leading-[1.6] text-ink-dim'>{t(text)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* closing CTA */}
      <Section className='pt-28 text-center'>
        <h2 className='text-[32px] sm:text-[44px]'>{t('ctaTitle')}</h2>
        <div className='mt-6 flex flex-wrap justify-center gap-3'>
          <Link to='/contact' className='btn btn-primary'>
            {t('contactLabel')}
          </Link>
          <Link to='/projects' className='btn btn-ghost'>
            {t('meViewProjects')}
          </Link>
        </div>
      </Section>
    </Page>
  );
}

export default Home;
