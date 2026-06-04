/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles as s } from './_brand.ts'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({ siteUrl, recipient, confirmationUrl }: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email to activate your {brand.name} account</Preview>
    <Body style={s.main}>
      <Container style={s.container}>
        <div style={s.header}>
          <Text style={s.wordmark}>{brand.name}</Text>
          <hr style={s.accentLine} />
        </div>
        <Heading style={s.h1}>Welcome to the future of finance</Heading>
        <Text style={s.text}>
          Thanks for joining <strong style={{ color: '#F5F5F7' }}>{brand.name}</strong>.
          Confirm <Link href={`mailto:${recipient}`} style={s.link}>{recipient}</Link> to
          activate your account and continue.
        </Text>
        <div style={{ textAlign: 'center', margin: '8px 0 28px' }}>
          <Button style={s.button} href={confirmationUrl}>Confirm email</Button>
        </div>
        <Text style={{ ...s.text, fontSize: '13px' }}>
          Or paste this link into your browser:<br />
          <Link href={confirmationUrl} style={s.link}>{confirmationUrl}</Link>
        </Text>
        <hr style={s.divider} />
        <Text style={s.footer}>
          If you didn't create an account, you can safely ignore this email.<br />
          © {brand.name} · <Link href={siteUrl} style={s.link}>{siteUrl.replace(/^https?:\/\//, '')}</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
