// Shared brand styles for Shoho Pay auth emails.
export const brand = {
  name: 'SHOHO PAY',
  tagline: 'The future of money in the UAE',
}

const font =
  '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'

export const styles = {
  main: {
    backgroundColor: '#ffffff',
    fontFamily: font,
    margin: 0,
    padding: '40px 16px',
  },
  container: {
    maxWidth: '520px',
    margin: '0 auto',
    backgroundColor: '#0A0A0B',
    borderRadius: '20px',
    border: '1px solid rgba(201,168,76,0.18)',
    padding: '40px 36px',
    color: '#F5F5F7',
  },
  header: {
    textAlign: 'center' as const,
    margin: '0 0 28px',
  },
  wordmark: {
    fontFamily: font,
    fontSize: '20px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    color: '#F5F5F7',
    margin: 0,
  },
  accentLine: {
    width: '40px',
    height: '2px',
    background: 'linear-gradient(90deg,#F5E09A,#C9A84C,#8a6a2e)',
    border: 'none',
    margin: '14px auto 0',
  },
  h1: {
    fontFamily: font,
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: '#F5F5F7',
    margin: '0 0 18px',
  },
  text: {
    fontSize: '15px',
    color: '#A1A1AA',
    lineHeight: '1.6',
    margin: '0 0 22px',
  },
  button: {
    display: 'inline-block',
    background: 'linear-gradient(135deg,#F5E09A,#C9A84C 55%,#8a6a2e)',
    color: '#0A0A0B',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    borderRadius: '999px',
    padding: '14px 28px',
    textDecoration: 'none',
  },
  link: { color: '#C9A84C', textDecoration: 'none' },
  code: {
    display: 'inline-block',
    fontFamily: '"SF Mono", Menlo, Consolas, monospace',
    fontSize: '26px',
    fontWeight: 700,
    letterSpacing: '0.4em',
    color: '#F5E09A',
    background: 'rgba(201,168,76,0.10)',
    border: '1px solid rgba(201,168,76,0.25)',
    borderRadius: '12px',
    padding: '14px 22px',
    margin: '0 0 24px',
  },
  divider: {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    border: 'none',
    margin: '32px 0 20px',
  },
  footer: {
    fontSize: '12px',
    color: '#52525B',
    lineHeight: '1.6',
    margin: 0,
    textAlign: 'center' as const,
  },
}
