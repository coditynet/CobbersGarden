import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Heading,
  Section,
  Hr,
} from '@react-email/components';

interface BookingConfirmationEmailProps {
  name: string;
  service: string;
  category: string;
  email: string;
  phone?: string;
  message: string;
}

export const CustomerConfirmationEmail = ({
  name,
  service,
  category,
  email,
  phone,
  message,
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Preview>Votre demande de réservation chez Cobbers Garden</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Confirmation de réservation</Heading>
          <Text style={text}>Hallo {name},</Text>
          <Text style={text}>
            Merci pour votre demande d'information auprès de Cobbers Garden. Nous avons reçu les informations suivantes:
          </Text>
          
          <Section style={details}>
            <Text style={detailItem}>
              <strong>Service:</strong> {category}
            </Text>
            <Text style={detailItem}>
              <strong>Nom:</strong> {name}
            </Text>
            <Text style={detailItem}>
              <strong>adresse mail:</strong> {email}
            </Text>
            {phone && (
              <Text style={detailItem}>
                <strong>Telefon:</strong> {phone}
              </Text>
            )}
            <Text style={detailItem}>
              <strong>message:</strong> {message}
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={text}>
           Nous vous contacterons dans les prochaines 24 heures pour convenir d'un rendez-vous approprié.
          </Text>
          
          <Text style={text}>
            Si vous avez des questions, n'hésitez pas à nous contacter par téléphone au{' '}
            <Link href="tel:+49123456789" style={link}>
              +49 123 456789
            </Link>{' '}
            ou par e-mail à{' '}
            <Link href="mailto:info@cobbers-garden.de" style={link}>
              info@cobbers-garden.de
            </Link>
          </Text>

          <Text style={footer}>
            Cordialement,<br />
            votre équipe Cobbers Garden
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  borderRadius: '10px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a4d2e',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 20px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const details = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '5px',
  margin: '20px 0',
};

const detailItem = {
  margin: '8px 0',
};

const link = {
  color: '#1a4d2e',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  margin: '32px 0 0',
};

export default CustomerConfirmationEmail; 