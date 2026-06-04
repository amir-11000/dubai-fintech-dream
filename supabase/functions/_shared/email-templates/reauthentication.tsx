/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import { brand, styles as s } from './_brand.ts'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {brand.name} verification code</Preview>
    <Body style={s.main}>
      <Container style={s.container}>
        <div style={s.header}>
          <Text style={s.wordmark}>{brand.name}</Text>
          <hr style={s.accentLine} />
        </div>
        <Heading style={s.h1}>Confirm it's you</Heading>
        <Text style={s.text}>Use the verification code below to confirm your identity:</Text>
        <div style={{ textAlign: 'center', margin: '8px 0 24px' }}>
          <Text style={s.code}>{token}</Text>
        </div>
        <hr style={s.divider} />
        <Text style={s.footer}>
          This code expires shortly. If you didn't request it, you can safely ignore this email.<br />
          © {brand.name}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
