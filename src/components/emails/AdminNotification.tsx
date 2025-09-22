import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Heading,
  Section,
  Hr,
} from '@react-email/components';

interface AdminNotificationEmailProps {
  name: string;
  category: string;
  email: string;
  phone?: string;
  message: string;
}

export const AdminNotificationEmail = ({
  name,
  category,
  email,
  phone,
  message,
}: AdminNotificationEmailProps) => {
  return (
    <Html>
      <Preview>Nouvelle demande de {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nouvelle demande de réservation</Heading>
          
          <Text style={text}>
            Une nouvelle demande de réservation a été reçue
          </Text>
          
          <Section style={details}>
            <Text style={detailItem}>
              <strong>Service:</strong> {category}
            </Text>
            <Text style={detailItem}>
              <strong>Nom:</strong> {name}
            </Text>
            <Text style={detailItem}>
              <strong>E-Mail:</strong> {email}
            </Text>
            {phone && (
              <Text style={detailItem}>
                <strong>numero de téléphone:</strong> {phone}
              </Text>
            )}
            <Text style={detailItem}>
              <strong>message:</strong> {message}
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={text}>
            Veuillez contacter le client dans les prochaines 24 heures
          </Text>

          <Text style={footer}>
Ce courrier a été généré automatiquement
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

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  margin: '32px 0 0',
};

export default AdminNotificationEmail; 