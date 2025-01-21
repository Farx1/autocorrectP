import * as React from "react";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { LogoComponent } from "./_components/logo";

interface VerifyEmailTemplateProps {
    otp: string;
    host: string;
}

export function VerifyEmailTemplate({ otp, host }: VerifyEmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Your verification code for {host}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <LogoComponent />
                    <Heading style={heading}>
                        Verify your email for {host}
                    </Heading>
                    <Section style={body}>
                        <Text style={paragraph}>
                            Please use the following code to verify your email
                            address:
                        </Text>
                        <Section style={codeContainer}>
                            <Text style={code}>{otp}</Text>
                        </Section>
                        <Text style={paragraph}>
                            If you didn&apos;t request this code, you can safely
                            ignore this email.
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

const hr = {
    borderColor: "#dddddd",
    marginTop: "48px",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    marginTop: "12px",
};

const codeContainer = {
    background: "rgba(0,0,0,.05)",
    borderRadius: "4px",
    margin: "16px auto 14px",
    verticalAlign: "middle",
    width: "280px",
};

const code = {
    color: "#000",
    display: "inline-block",
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "6px",
    lineHeight: "40px",
    paddingBottom: "8px",
    paddingTop: "8px",
    margin: "0 auto",
    width: "100%",
    textAlign: "center" as const,
};

export default VerifyEmailTemplate;
