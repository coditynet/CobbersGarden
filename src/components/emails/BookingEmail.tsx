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
  Img,
  Row,
  Column,
} from '@react-email/components';

interface BookingEmailProps {
  name: string;
  category: string;
  service: string;
  email: string;
  phone?: string;
  message: string;
  imageUrls?: string[];
  submittedAt: string;
  isCustomer: boolean;
}

export const BookingEmail = ({
  name,
  category,
  service,
  email,
  phone,
  message,
  imageUrls,
  submittedAt,
  isCustomer,
}: BookingEmailProps) => {
  const date = new Date(submittedAt).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Html>
      <Preview>
        {isCustomer
          ? "Confirmation de votre demande - Cobbers Garden"
          : `Nouvelle demande de ${name} - ${category}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://cobbers-garden.de/logo.png"
              width="120"
              height="50"
              alt="Cobbers Garden"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>
              {isCustomer ? "Confirmation de votre demande" : "Nouvelle demande de service"}
            </Heading>
            
            {isCustomer ? (
              <Text style={greeting}>Bonjour {name},</Text>
            ) : (
              <Text style={greeting}>Une nouvelle demande a été reçue.</Text>
            )}

            {isCustomer && (
              <Text style={text}>
                Nous avons bien reçu votre demande pour nos services. Voici un récapitulatif des détails :
              </Text>
            )}

            {/* Service Details Card */}
            <Section style={card}>
              <Row>
                <Column>
                  <Text style={cardTitle}>Détails de la demande</Text>
                  <Text style={detailItem}>
                    <strong>📁 Catégorie:</strong> {category}
                  </Text>
                  <Text style={detailItem}>
                    <strong>🔧 Service:</strong> {service}
                  </Text>
                  <Text style={detailItem}>
                    <strong>👤 Nom:</strong> {name}
                  </Text>
                  <Text style={detailItem}>
                    <strong>📧 Email:</strong> {email}
                  </Text>
                  {phone && (
                    <Text style={detailItem}>
                      <strong>📞 Téléphone:</strong> {phone}
                    </Text>
                  )}
                  <Text style={detailItem}>
                    <strong>📅 Date:</strong> {date}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Message Section */}
            <Section style={messageCard}>
              <Text style={cardTitle}>Message</Text>
              <Text style={messageText}>{message}</Text>
            </Section>

            {/* Images Section */}
            {imageUrls && imageUrls.length > 0 && (
              <Section style={card}>
                <Text style={cardTitle}>Images jointes ({imageUrls.length})</Text>
                <Section style={imageGrid}>
                  {imageUrls.map((url, index) => (
                    <Img
                      key={index}
                      src={url}
                      alt={`Image ${index + 1}`}
                      style={imageStyle}
                    />
                  ))}
                </Section>
              </Section>
            )}

            <Hr style={hr} />

            {/* Call to Action */}
            {isCustomer ? (
              <Section style={ctaSection}>
                <Text style={text}>
                  Notre équipe examinera votre demande et vous contactera dans les 24 heures pour discuter des détails et planifier une intervention.
                </Text>
                <Text style={text}>
                  Pour toute question, n'hésitez pas à nous contacter :
                </Text>
                <Section style={contactInfo}>
                  <Text style={contactItem}>
                    📞 <Link href="tel:+33123456789" style={link}>+33 1 23 45 67 89</Link>
                  </Text>
                  <Text style={contactItem}>
                    📧 <Link href="mailto:contact@cobbers-garden.fr" style={link}>contact@cobbers-garden.fr</Link>
                  </Text>
                </Section>
              </Section>
            ) : (
              <Section style={ctaSection}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/bookings`}
                  style={button}
                >
                  Voir dans le dashboard →
                </Link>
              </Section>
            )}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Cobbers Garden. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const h1 = {
  color: '#1a4d2e',
  fontSize: '24px',
  fontWeight: '600',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const greeting = {
  fontSize: '18px',
  color: '#333',
  marginBottom: '24px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const card = {
  backgroundColor: '#f8f9fa',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
};

const messageCard = {
  backgroundColor: '#f8f9fa',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
  borderLeft: '4px solid #1a4d2e',
};

const cardTitle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1a4d2e',
  marginBottom: '16px',
};

const detailItem = {
  margin: '12px 0',
  color: '#333',
  fontSize: '15px',
};

const messageText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
};

const imageGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  margin: '16px 0',
};

const imageStyle = {
  width: '100%',
  maxWidth: '250px',
  height: 'auto',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const contactInfo = {
  backgroundColor: '#f8f9fa',
  padding: '16px',
  borderRadius: '8px',
  margin: '16px 0',
};

const contactItem = {
  margin: '8px 0',
  fontSize: '15px',
};

const button = {
  backgroundColor: '#1a4d2e',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
};

const link = {
  color: '#1a4d2e',
  textDecoration: 'underline',
};

const footer = {
  textAlign: 'center' as const,
  margin: '32px 0 0',
};

const footerText = {
  fontSize: '14px',
  color: '#666',
};

export default BookingEmail; 