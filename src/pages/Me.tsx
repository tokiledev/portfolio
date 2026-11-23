import { Link } from 'react-router-dom';

import { Block, Page, Section, SectionTitle } from '@/components/brand';
import { useExperience } from '@/data/experience';
import { useLang, usePageMeta, type StringKey } from '@/i18n';

// About, in the Cursor look: a left-aligned intro beside the photo, the stat
// blocks, what I do as numbered blocks, the work history as one block per
// role, and the journey.

const PILLARS: { titleKey: StringKey; textKey: StringKey }[] = [
  { titleKey: 'meShopTitle', textKey: 'meShopText' },
  { titleKey: 'meWebTitle', textKey: 'meWebText' },
  { titleKey: 'meAiTitle', textKey: 'meAiText' },
  { titleKey: 'meContentTitle', textKey: 'meContentText' },
];

const STATS: { value: string; labelKey: StringKey }[] = [
  { value: '5+', labelKey: 'meStatsAI' },
  { value: '4', labelKey: 'meStatsClients' },
  { value: '100+', labelKey: 'meStatsProjects' },
  { value: '1,000+', labelKey: 'meStatsThemes' },
];

function Me() {
  const { t } = useLang();
  const experience = useExperience();
  usePageMeta(
    'About — AI Engineer in Paris | Ahmad Touqeer',
    'Agentic AI, RAG and automation delivered for Allianz France, Havas Group, KHOME and Sopra Steria. MSc Machine Learning, Université Paris Cité.'
  );

  return (
    <Page>
      {/* intro */}
      <Section className='pt-16 sm:pt-24'>
        <div className='grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]'>
          <div className='max-w-[720px]'>
            <p className='eyebrow'>{t('meRole')}</p>
            <h1 className='mt-4 text-[32px] leading-[1.15] sm:text-[44px]'>Ahmad Touqeer</h1>
            <p className='mt-5 max-w-[62ch] text-[18px] leading-[1.55] text-ink-dim'>{t('meIntro')}</p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <Link to='/projects' className='btn btn-primary'>
                {t('meViewProjects')}
              </Link>
              <Link to='/contact' className='btn btn-ghost'>
                {t('contactLabel')}
              </Link>
            </div>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}ahmad-touqeer.jpg`}
            alt='Ahmad Touqeer'
            width={800}
            height={800}
            className='aspect-square w-full max-w-[320px] rounded-[4px] object-cover'
          />
        </div>
      </Section>

      {/* stats */}
      <Section className='pt-20'>
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
          {PILLARS.map((p, i) => (
            <li key={p.titleKey} className='rounded-[4px] bg-surface p-6'>
              <span className='num text-[14px] text-signal'>{String(i + 1).padStart(2, '0')}</span>
              <h3 className='mt-3 text-[18px] text-ink'>{t(p.titleKey)}</h3>
              <p className='mt-2 text-[15px] leading-[1.6] text-ink-dim'>{t(p.textKey)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* work history, newest first */}
      <Section className='pt-24'>
        <SectionTitle title={t('meTimelineTitle')} />
        <ol className='mt-10 grid gap-1.5'>
          {experience.map((entry) => (
            <li key={entry.id} className='rounded-[4px] bg-surface p-6'>
              <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
                <h3 className='text-[18px] text-ink'>
                  {entry.title}
                  <span className='text-ink-faint'> · {entry.org}</span>
                </h3>
                <p className='num shrink-0 text-[13px] whitespace-nowrap text-ink-faint'>{entry.period}</p>
              </div>
              <p className='mt-1 text-[13px] text-ink-faint'>{entry.location}</p>
              <p className='mt-3 text-[15px] leading-[1.6] text-ink-dim'>{entry.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* journey */}
      <Section className='pt-24'>
        <SectionTitle title={t('meJourneyTitle')} />
        <p className='mt-6 max-w-[72ch] text-[18px] leading-[1.6] text-ink-dim'>{t('meJourneyText')}</p>
      </Section>
    </Page>
  );
}

export default Me;
