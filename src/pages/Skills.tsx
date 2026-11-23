import { LogoTile, Page, Section, type TechLogo } from '@/components/brand';
import { useLang, usePageMeta, type Lang } from '@/i18n';

// Skills, in the Cursor look: one section per category, each a grid of
// logo tiles (logos flattened to ink, the tool's name underneath). Logos
// come from cdn.simpleicons.org by slug; pass a full URL (or a /public path
// via BASE_URL) for anything simple-icons lacks.

function logo(label: string, src: string): TechLogo {
  return { label, src };
}

type CategoryId =
  | 'ai'
  | 'automation'
  | 'languages'
  | 'frontend'
  | 'styling'
  | 'backend'
  | 'database'
  | 'cloud';

const CATEGORIES: { id: CategoryId; items: TechLogo[] }[] = [
  {
    id: 'ai',
    items: [
      logo('LangChain', 'langchain'),
      logo('LangGraph', 'https://cdn.simpleicons.org/langgraph/1C3C3C'),
      logo('CrewAI', 'crewai'),
      logo('MCP', 'modelcontextprotocol'),
      logo('Hugging Face', 'huggingface'),
      logo('Claude Code', 'claude'),
      logo('OpenAI', 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openai.svg'),
      logo('Gemini', 'googlegemini'),
    ],
  },
  {
    id: 'automation',
    items: [
      logo('n8n', 'n8n'),
      logo('Make', 'make'),
      logo('Zapier', 'zapier'),
      // no simple-icons entry — served from /public (BASE_URL covers the /portfolio/ prefix)
      logo('Lovable', `${import.meta.env.BASE_URL}lovable-color.svg`),
      logo('Shopify', 'shopify'),
    ],
  },
  {
    id: 'languages',
    items: [
      logo('Python', 'python'),
      logo('TypeScript', 'typescript'),
      logo('JavaScript', 'javascript'),
    ],
  },
  {
    id: 'frontend',
    items: [
      logo('React', 'react'),
      logo('Next.js', 'nextdotjs'),
      logo('Vue.js', 'vuedotjs'),
    ],
  },
  {
    id: 'styling',
    items: [
      logo('HTML5', 'html5'),
      logo('CSS', 'css'),
      logo('Tailwind CSS', 'tailwindcss'),
    ],
  },
  {
    id: 'backend',
    items: [
      logo('FastAPI', 'fastapi'),
      logo('Node.js', 'nodedotjs'),
      logo('REST APIs', 'postman'),
      logo('Stripe', 'stripe'),
    ],
  },
  {
    id: 'database',
    items: [
      logo('PostgreSQL', 'postgresql'),
      logo('Supabase', 'supabase'),
      logo('Airtable', 'airtable'),
    ],
  },
  {
    id: 'cloud',
    items: [
      logo('Docker', 'docker'),
      logo('Git', 'git'),
      logo('GitHub', 'github'),
      logo('AWS', 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'),
      logo('Azure', 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/azure/azure-original.svg'),
      logo('Google Cloud', 'googlecloud'),
      logo('Vercel', 'vercel'),
      logo('Cloudflare', 'cloudflare'),
    ],
  },
];

const HEADINGS: Record<Lang, Record<CategoryId, string>> = {
  en: {
    ai: 'AI & Agents',
    automation: 'Automation & No-code',
    languages: 'Languages',
    frontend: 'Frontend',
    styling: 'Styling',
    backend: 'Backend & APIs',
    database: 'Databases',
    cloud: 'Cloud & DevOps',
  },
  fr: {
    ai: 'IA & Agents',
    automation: 'Automatisation & No-code',
    languages: 'Langages',
    frontend: 'Frontend',
    styling: 'Style',
    backend: 'Backend & API',
    database: 'Bases de données',
    cloud: 'Cloud & DevOps',
  },
  es: {
    ai: 'IA y agentes',
    automation: 'Automatización y no-code',
    languages: 'Lenguajes',
    frontend: 'Frontend',
    styling: 'Estilos',
    backend: 'Backend y APIs',
    database: 'Bases de datos',
    cloud: 'Cloud y DevOps',
  },
  it: {
    ai: 'IA e agenti',
    automation: 'Automazione e no-code',
    languages: 'Linguaggi',
    frontend: 'Frontend',
    styling: 'Stile',
    backend: 'Backend e API',
    database: 'Database',
    cloud: 'Cloud e DevOps',
  },
  de: {
    ai: 'KI & Agenten',
    automation: 'Automatisierung & No-Code',
    languages: 'Sprachen',
    frontend: 'Frontend',
    styling: 'Styling',
    backend: 'Backend & APIs',
    database: 'Datenbanken',
    cloud: 'Cloud & DevOps',
  },
};

// Section order, top to bottom.
const ORDER: CategoryId[] = [
  'ai',
  'cloud',
  'automation',
  'backend',
  'languages',
  'frontend',
  'styling',
  'database',
];
CATEGORIES.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

function Skills() {
  const { t, lang } = useLang();
  usePageMeta(
    'AI Engineering Skills & Stack — Ahmad Touqeer',
    'LangChain, LangGraph, CrewAI, MCP, Hugging Face, n8n, Make and Zapier, on top of Python, TypeScript, React, Next.js, FastAPI, PostgreSQL, Docker, Azure and Google Cloud.'
  );

  return (
    <Page>
      <Section className='pt-16 sm:pt-24'>
        <div className='max-w-[720px]'>
          <p className='eyebrow'>{t('heroEyebrow')}</p>
          <h1 className='mt-4 text-[32px] leading-[1.15] sm:text-[44px]'>{t('skillsTitle')}</h1>
          <p className='mt-5 max-w-[58ch] text-[18px] leading-[1.45] text-ink-dim'>{t('skillsIntro')}</p>
        </div>
      </Section>

      <Section className='space-y-14 pt-16'>
        {CATEGORIES.map((category) => (
          <div key={category.id}>
            <div className='flex items-baseline justify-between gap-4'>
              <h2 className='text-[22px] text-ink'>{HEADINGS[lang][category.id]}</h2>
              <span className='num text-[13px] text-ink-faint'>{String(category.items.length).padStart(2, '0')}</span>
            </div>
            <ul className='mt-5 grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-8'>
              {category.items.map((item) => (
                <LogoTile key={item.label} {...item} />
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </Page>
  );
}

export default Skills;