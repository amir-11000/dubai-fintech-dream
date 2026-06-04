/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles as s } from './_brand.ts'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({ oldEmail, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email change for {brand.name}</Preview>
    <Body style={s.main}>
      <Container style={s.container}>
        <div style={s.header}>
          <Text style={s.wordmark}>{brand.name}</Text>
          <hr style={s.accentLine} />
        </div>
        <Heading style={s.h1}>Confirm your email change</Heading>
        <Text style={s.text}>
          You requested to change the email on your {brand.name} account from{' '}
          <Link href={`mailto:${oldEmail}`} style={s.link}>{oldEmail}</Link>{' '}
          to <Link href={`mailto:${newEmail}`} style={s.link}>{newEmail}</Link>.
        </Text>
        <div style={{ textAlign: 'center', margin: '8px 0 28px' }}>
          <Button style={s.button} href={confirmationUrl}>Confirm change</Button>
        </div>
        <Text style={{ ...s.text, fontSize: '13px' }}>
          Or paste this link into your browser:<br />
          <Link href={confirmationUrl} style={s.link}>{confirmationUrl}</Link>
        </Text>
        <hr style={s.divider} />
        <Text style={s.footer}>
          Didn't request this? Please secure your account immediately.<br />
          © {brand.name}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
