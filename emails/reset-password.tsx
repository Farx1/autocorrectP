import * as React from "react";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { LogoComponent } from "./_components/logo";

interface ResetPasswordTemplateProps {
    fullName: string;
    url: string;
    host: string;
}

export function ResetPasswordTemplate({
    fullName,
    url,
    host,
}: ResetPasswordTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Reset your password for {host}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <LogoComponent />
                    <Heading style={heading}>Reset your password</Heading>
                    <Section style={body}>
                        <Text style={paragraph}>Hello {fullName},</Text>
                        <Text style={paragraph}>
                            We received a request to reset your password. Click
                            the button below to choose a new password:
                        </Text>
                        <Link style={button} href={url}>
                            Reset password
                        </Link>
                        <Text style={paragraph}>
                            If you didn&apos;t request this password reset, you
                            can safely ignore this email. Your password will
                            remain unchanged.
                        </Text>
                    </Section>
                    <Text style={paragraph}>
                        Best,
                        <br />
                        The {host} Team
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>{host}</Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 25px 48px",
    maxWidth: "580px",
};

const heading = {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "32px",
};

const body = {
    margin: "24px 0",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const button = {
    backgroundColor: "#b060ff",
    borderRadius: "5px",
    color: "#fff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "50px",
    textAlign: "center" as const,
    textDecoration: "none",
    width: "200px",
    marginTop: "16px",
    marginBottom: "16px",
};

const hr = {
    borderColor: "#dddddd",
    marginTop: "48px",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    marginTop: "12px",
};

export default ResetPasswordTemplate;
