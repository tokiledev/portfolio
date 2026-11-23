import { FileDown, Mail } from 'lucide-react';
import QRCode from 'react-qr-code';

import { Page, Section } from '@/components/brand';
import { useLang, usePageMeta } from '@/i18n';

// Contact, laid out like the Cursor-look account block (Smm/app/page.tsx):
// heading and grey sentence on the left, one hairline panel on the right
// with the email and CV pills and the WhatsApp code.

// WhatsApp: +33 6 51 96 47 71
const WHATSAPP_URL = 'https://wa.me/33651964771';

function Contact() {
  const { t } = useLang();
  usePageMeta(
    'Hire an AI Engineer in Paris — Ahmad Touqeer',
    'Email or WhatsApp me about your AI agent, automation, SaaS or website project. Based in Paris, working in English and French.'
  );

  return (
    <Page>
      <Section className='pt-16 sm:pt-24'>
        <div className='grid items-start gap-10 lg:grid-cols-2'>
          <div>
            <p className='eyebrow'>{t('contactLabel')}</p>
            <h1 className='mt-4 text-[32px] leading-[1.15] sm:text-[44px]'>
              {t('contactHeading')} {t('contactHeadingItalic')}
            </h1>
            <p className='mt-5 max-w-[44ch] text-[18px] leading-[1.45] text-ink-dim'>{t('contactText')}</p>
          </div>

          <div className='w-full max-w-[520px] lg:justify-self-end'>
            <div className='panel p-5'>
              <div className='space-y-2'>
                <a href='mailto:ahmadtouqeer1995@gmail.com' className='btn btn-primary w-full'>
                  <Mail />
                  <span className='truncate'>ahmadtouqeer1995@gmail.com</span>
                </a>
                {/* CV lives in /public so it is served straight from the deploy */}
                <a
                  href={`${import.meta.env.BASE_URL}Ahmad-Touqeer-CV.pdf`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-ghost w-full'
                >
                  <FileDown />
                  {t('downloadCv')}
                </a>
              </div>

              <div className='mt-5 flex items-center gap-5 border-t border-hairline pt-5'>
                <a
                  href={WHATSAPP_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Chat on WhatsApp'
                  className='shrink-0 rounded-[4px] bg-ink p-2.5'
                >
                  <QRCode value={WHATSAPP_URL} size={112} bgColor='#edecec' fgColor='#14120b' />
                </a>
                <div>
                  <p className='text-[15px] text-ink'>{t('scanWhatsapp')}</p>
                  <a
                    href={WHATSAPP_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='num link-accent mt-1 inline-flex text-[14px]'
                  >
                    +33 6 51 96 47 71
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}

export default Contact;
