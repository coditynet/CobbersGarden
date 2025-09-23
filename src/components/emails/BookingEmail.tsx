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
              width="140"
              height="60"
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
                Nous avons bien reçu votre demande pour nos services. Notre équipe l'examinera dans les plus brefs délais.
              </Text>
            )}

            {/* Updated Service Type Section */}
            <Section style={serviceCard}>
              <div style={serviceBadge}>{category}</div>
              <Text style={serviceDescription}>
                Demande envoyée le {date}
              </Text>
            </Section>
            
            {/* Updated Contact Details Card */}
            <Section style={infoCard}>
              <Text style={cardTitle}>Informations de contact</Text>
              <div style={infoList}>
                <div style={infoItem}>
                  <Text style={infoLabel}>Nom: <strong>{name}</strong></Text>
                </div>
                <Hr style={infoSeparator} />
                <div style={infoItem}>
                  <Text style={infoLabel}>Email: <strong>{email}</strong></Text>
                </div>
                {phone && (
                  <>
                    <Hr style={infoSeparator} />
                    <div style={infoItem}>
                      <Text style={infoLabel}>Téléphone: <strong>{phone}</strong></Text>
                    </div>
                  </>
                )}
              </div>
            </Section>

            {/* Message Section */}
            <Section style={infoCard}>
              <Text style={cardTitle}>Message</Text>
              <Text style={messageText}>{message}</Text>
            </Section>

            {/* Images Section */}
            {imageUrls && imageUrls.length > 0 && (
              <Section style={infoCard}>
                <Text style={cardTitle}>Photos jointes ({imageUrls.length})</Text>
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

            {/* Updated Footer Section */}
            {isCustomer ? (

              <Section style={ctaSection}>
              <Text style={text}>
                Notre équipe vous contactera dans les 24 heures pour discuter des détails et planifier une intervention.
              </Text>
              <Section style={contactCard}>
                <Text style={contactTitle}>Besoin d'aide ?</Text>
                <Link href="tel:+33123456789" style={contactLink}>
                  +33 1 23 45 67 89
                </Link>
                <Link href="mailto:contact@cobbers-garden.fr" style={contactLink}>
                  contact@cobbers-garden.fr
                </Link>
              </Section>
              <Text style={signatureText}>
                Cordialement,<br />
                votre équipe Cobbers Garden
              </Text>
            </Section>
        ): null}
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

// Updated styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '24px',
  maxWidth: '600px',
};

const header = {
  padding: '24px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const h1 = {
  color: '#1a4d2e',
  fontSize: '24px',
  fontWeight: '600',
  textAlign: 'center' as const,
  margin: '0 0 32px',
};

const greeting = {
  fontSize: '18px',
  color: '#333',
  marginBottom: '24px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const serviceCard = {
  padding: '20px',
  borderRadius: '12px',
  margin: '24px 0',
  border: '1px solid #e5e7eb',
  textAlign: 'center' as const,
};

const serviceBadge = {
  backgroundColor: '#1a4d2e',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '20px',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '500',
  marginBottom: '12px',
};

const serviceDescription = {
  fontSize: '14px',
  color: '#4b5563',
};

const infoCard = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  margin: '24px 0',
  border: '1px solid #e5e7eb',
  borderLeft: '4px solid #1a4d2e',
};

const cardTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1a4d2e',
  marginBottom: '20px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const infoList = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '4px',
};

const infoItem = {
  padding: '8px 0',
};

const infoLabel = {
  fontSize: '13px',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  marginBottom: '2px',
};

const infoValue = {
  fontSize: '15px',
  color: '#111827',
  fontWeight: '500',
};

const infoSeparator = {
  borderColor: '#e5e7eb',
  margin: '0',
  opacity: 0.5,
};

const messageText = {
  color: '#374151',
  fontSize: '16px',
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
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const contactCard = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  borderRadius: '12px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const contactTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1a4d2e',
  marginBottom: '16px',
};

const contactLink = {
  color: '#1a4d2e',
  textDecoration: 'none',
  display: 'block',
  margin: '8px 0',
  fontSize: '16px',
  fontWeight: '500',
};

const button = {
  backgroundColor: '#1a4d2e',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  display: 'inline-block',
};

const footer = {
  textAlign: 'center' as const,
  margin: '32px 0 0',
};

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
};

const signatureText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '24px 0 0',
  textAlign: 'center' as const,
};

export default BookingEmail; 