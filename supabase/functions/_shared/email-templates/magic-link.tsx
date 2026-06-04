/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles as s } from './_brand.ts'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your secure sign-in link for {brand.name}</Preview>
    <Body style={s.main}>
      <Container style={s.container}>
        <div style={s.header}>
          <Text style={s.wordmark}>{brand.name}</Text>
          <hr style={s.accentLine} />
        </div>
        <Heading style={s.h1}>Your sign-in link</Heading>
        <Text style={s.text}>
          Tap the button below to sign in to {brand.name}. For your security,
          this link expires shortly and can only be used once.
        </Text>
        <div style={{ textAlign: 'center', margin: '8px 0 28px' }}>
          <Button style={s.button} href={confirmationUrl}>Sign in</Button>
        </div>
        <Text style={{ ...s.text, fontSize: '13px' }}>
          Or paste this link into your browser:<br />
          <Link href={confirmationUrl} style={s.link}>{confirmationUrl}</Link>
        </Text>
        <hr style={s.divider} />
        <Text style={s.footer}>
          Didn't request this? You can safely ignore this email.<br />
          © {brand.name}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
