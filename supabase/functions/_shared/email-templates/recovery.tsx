/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles as s } from './_brand.ts'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your {brand.name} password</Preview>
    <Body style={s.main}>
      <Container style={s.container}>
        <div style={s.header}>
          <Text style={s.wordmark}>{brand.name}</Text>
          <hr style={s.accentLine} />
        </div>
        <Heading style={s.h1}>Reset your password</Heading>
        <Text style={s.text}>
          We received a request to reset the password for your {brand.name} account.
          Choose a new password by tapping the button below.
        </Text>
        <div style={{ textAlign: 'center', margin: '8px 0 28px' }}>
          <Button style={s.button} href={confirmationUrl}>Reset password</Button>
        </div>
        <Text style={{ ...s.text, fontSize: '13px' }}>
          Or paste this link into your browser:<br />
          <Link href={confirmationUrl} style={s.link}>{confirmationUrl}</Link>
        </Text>
        <hr style={s.divider} />
        <Text style={s.footer}>
          Didn't request a reset? You can safely ignore this email — your password won't change.<br />
          © {brand.name}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
