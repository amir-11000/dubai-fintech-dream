/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles as s } from './_brand.ts'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You're invited to {brand.name}</Preview>
    <Body style={s.main}>
      <Container style={s.container}>
        <div style={s.header}>
          <Text style={s.wordmark}>{brand.name}</Text>
          <hr style={s.accentLine} />
        </div>
        <Heading style={s.h1}>You're invited</Heading>
        <Text style={s.text}>
          You've been invited to join{' '}
          <Link href={siteUrl} style={s.link}><strong>{brand.name}</strong></Link>{' '}
          — {brand.tagline}. Accept the invitation to set up your account.
        </Text>
        <div style={{ textAlign: 'center', margin: '8px 0 28px' }}>
          <Button style={s.button} href={confirmationUrl}>Accept invitation</Button>
        </div>
        <Text style={{ ...s.text, fontSize: '13px' }}>
          Or paste this link into your browser:<br />
          <Link href={confirmationUrl} style={s.link}>{confirmationUrl}</Link>
        </Text>
        <hr style={s.divider} />
        <Text style={s.footer}>
          Not expecting this? You can safely ignore this email.<br />
          © {brand.name}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
