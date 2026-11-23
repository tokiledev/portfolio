import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Languages, Menu, X } from 'lucide-react';

import { LANGUAGES, useLang } from '@/i18n';
import { cn } from '@/lib/utils';

// The brand kit, in components: the Cursor look exactly as the Social Fame
// site wears it (Smm/app/globals.css, html[data-look="cursor"]; Smm/app/
// page.tsx, site-header.tsx, site-footer.tsx, logo.tsx). Every page is built
// from these pieces and the classes in index.css — nothing else.

/* --------------------------------------------------------------- the lockup */

/** A 26px ink tile with the initial, then the name in plain Geist (logo.tsx). */
export function Logo() {
  return (
    <Link to='/' className='flex min-h-[44px] shrink-0 items-center gap-2.5' aria-label='Ahmad Touqeer'>
      <span
        aria-hidden='true'
        className='grid size-[26px] place-items-center rounded-[6px] bg-ink font-mono text-[14px] leading-none text-canvas'
      >
        T
      </span>
      <span className='text-[18px] leading-none tracking-[-0.02em] text-ink'>ahmad touqeer</span>
    </Link>
  );
}

/* --------------------------------------------------------------- the header */

const NAV = [
  { to: '/me', key: 'navAbout' },
  { to: '/projects', key: 'projectsTitle' },
  { to: '/skills', key: 'skillsTitle' },
] as const;

function LanguageMenu({ wide = false }: { wide?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('relative', wide && 'w-full')}>
      <button
        type='button'
        aria-label='Choose language'
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn('btn btn-outline', wide && 'w-full')}
      >
        <Languages />
        {lang.toUpperCase()}
      </button>
      {open && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
          <div className='absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-[8px] border border-hairline bg-surface py-1'>
            {LANGUAGES.map((option) => (
              <button
                key={option.code}
                type='button'
                onClick={() => {
                  setLang(option.code);
                  setOpen(false);
                }}
                className={cn(
                  'flex min-h-[40px] w-full items-center justify-between px-4 text-left text-[14px] transition-colors hover:bg-hover',
                  option.code === lang ? 'text-ink' : 'text-ink-dim'
                )}
              >
                {option.label}
                <span className={cn('num text-[12px] uppercase', option.code === lang ? 'text-signal' : 'text-ink-faint')}>
                  {option.code}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Slim bar: lockup left, links centred, small pills right (site-header.tsx). */
export function SiteHeader() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-canvas/90 backdrop-blur-md'>
      <div className='relative mx-auto flex h-14 max-w-[1180px] items-center gap-4 px-5'>
        <Logo />

        <nav aria-label='Main' className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex'>
          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => cn('nav-link', isActive && 'text-signal')}
            >
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className='ml-auto hidden items-center gap-3 lg:flex'>
          <LanguageMenu />
          <Link to='/contact' className='btn btn-primary btn-xs'>
            {t('navContact')}
          </Link>
        </div>

        <button
          type='button'
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls='mobile-nav'
          onClick={() => setOpen((v) => !v)}
          className='ml-auto inline-flex size-11 items-center justify-center rounded-[8px] border border-hairline text-ink-dim lg:hidden'
        >
          {open ? <X className='size-5' /> : <Menu className='size-5' />}
        </button>
      </div>

      {open && (
        <div id='mobile-nav' className='border-t border-hairline bg-surface px-5 py-2 lg:hidden'>
          <nav aria-label='Main' className='flex flex-col'>
            {NAV.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-[48px] items-center border-b border-hairline text-[16px] last:border-b-0',
                    isActive ? 'text-signal' : 'text-ink'
                  )
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
          </nav>
          <div className='my-4 flex flex-col gap-3'>
            <Link to='/contact' className='btn btn-primary w-full' onClick={() => setOpen(false)}>
              {t('navContact')}
            </Link>
            <LanguageMenu wide />
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------------------------------------- the footer */

const ELSEWHERE = [
  { href: 'https://www.linkedin.com/in/touqeer-ahmad-a788353a2', label: 'LinkedIn' },
  { href: 'https://github.com/tokiledev', label: 'GitHub' },
  { href: 'https://wa.me/33651964771', label: 'WhatsApp' },
  { href: 'mailto:ahmadtouqeer1995@gmail.com', label: 'Email' },
];

/** Plain text columns, then the copyright line (site-footer.tsx, CursorFooter). */
export function SiteFooter() {
  const { t } = useLang();
  const linkClass = 'inline-flex min-h-[36px] items-center text-[14px] text-ink-dim transition-colors hover:text-ink';
  return (
    <footer className='mt-24 border-t border-hairline'>
      <div className='mx-auto max-w-[1180px] px-5 py-14'>
        <div className='grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4'>
          <nav aria-label={t('footerSite')}>
            <p className='mb-3 text-[14px] text-ink-faint'>{t('footerSite')}</p>
            <ul className='flex flex-col'>
              <li>
                <Link to='/' className={linkClass}>
                  {t('home')}
                </Link>
              </li>
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {t(l.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to='/contact' className={linkClass}>
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label={t('footerElsewhere')}>
            <p className='mb-3 text-[14px] text-ink-faint'>{t('footerElsewhere')}</p>
            <ul className='flex flex-col'>
              {ELSEWHERE.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target='_blank' rel='noopener noreferrer' className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='mt-12 flex flex-wrap items-center justify-between gap-4'>
          <p className='text-[14px] text-ink-faint'>© {new Date().getFullYear()} Ahmad Touqeer · Paris</p>
          <a
            href={`${import.meta.env.BASE_URL}Ahmad-Touqeer-CV.pdf`}
            target='_blank'
            rel='noopener noreferrer'
            className='link-accent text-[14px]'
          >
            {t('downloadCv')}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------- page shell */

/** The page frame: one scroller with the header on top and the footer below. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full w-full overflow-x-hidden overflow-y-auto bg-canvas'>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

/** A 1180px column with the site's side gutter. */
export function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn('mx-auto max-w-[1180px] px-5', className)}>{children}</section>;
}

/** A section title: 28–36px, weight 400, optional grey sentence under it. */
export function SectionTitle({ title, intro }: { title: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <div>
      <h2 className='text-[28px] sm:text-[36px]'>{title}</h2>
      {intro && <p className='mt-2 max-w-[62ch] text-[18px] leading-[1.45] text-ink-dim'>{intro}</p>}
    </div>
  );
}

/** A content block: surface fill, 4px corners, no border (Cursor's blocks). */
export function Block({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-[4px] bg-surface p-6', className)}>{children}</div>;
}

/* --------------------------------------------------------- product pictures */

/** The soft painted ground cursor.com puts behind every product picture. */
export function Backdrop({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn('overflow-hidden rounded-[4px] p-4 sm:p-8 lg:p-10', className)}
      style={{
        background:
          'radial-gradient(120% 80% at 20% 10%, #8a8476 0%, transparent 60%), radial-gradient(90% 70% at 85% 90%, #4f5a5c 0%, transparent 65%), linear-gradient(160deg, #6f6a5e 0%, #3d3a33 55%, #2a2924 100%)',
      }}
    >
      {children}
    </div>
  );
}

/** A dark app window with traffic-light dots, like cursor.com's screenshots. */
export function AppWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('overflow-hidden rounded-[8px] border border-black/40 text-left shadow-2xl', className)}
      style={{ background: '#181610', color: '#edecec' }}
    >
      <div className='flex items-center gap-1.5 border-b border-white/10 px-3 py-2'>
        <span className='size-2.5 rounded-full bg-white/20' />
        <span className='size-2.5 rounded-full bg-white/20' />
        <span className='size-2.5 rounded-full bg-white/20' />
        <span className='ml-2 truncate text-[12px] text-white/50'>{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- brand logos */

export type TechLogo = { label: string; src: string; fit?: string };

/** A tool's logo flattened to ink on a surface tile, its name underneath
 *  (Cursor's "trusted by" tiles). A logo that fails shows initials. */
export function LogoTile({ label, src, fit = 'h-7 w-auto max-w-[72%]' }: TechLogo) {
  const [failed, setFailed] = useState(false);
  const url = src.startsWith('http') || src.startsWith('/') ? src : `https://cdn.simpleicons.org/${src}`;
  const initials = label
    .split(/[\s.+-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
  return (
    <li className='flex h-24 flex-col items-center justify-center gap-2.5 rounded-[4px] bg-surface px-2'>
      <span className='flex h-8 w-full items-center justify-center'>
        {failed ? (
          <span className='num text-[14px] text-ink'>{initials}</span>
        ) : (
          <img
            src={url}
            alt=''
            draggable={false}
            onError={() => setFailed(true)}
            className={cn('logo-mono max-h-8 object-contain', fit)}
          />
        )}
      </span>
      <span className='text-center text-[13px] leading-tight text-ink-dim'>{label}</span>
    </li>
  );
}
