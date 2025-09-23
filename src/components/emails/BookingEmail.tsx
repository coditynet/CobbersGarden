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
} from '@react-email/components';

interface BookingEmailProps {
  name: string;
  service: string;
  category: string;
  email: string;
  phone?: string | null;
  message: string;
  imageUrls?: string[];
  submittedAt: string;
  isCustomer: boolean;
}

export const BookingEmail = ({
  name,
  service,
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
              src="https://cobbersgarden.fr/logo.png"
              width="200"
              height="auto"
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

            {isCustomer ? (
              <Text style={text}>
                Nous avons bien reçu votre demande pour nos services. Notre équipe l'examinera dans les plus brefs délais.
              </Text>
            ) : (
              <Text style={text}>
                Une nouvelle demande de réservation a été soumise par {name}. Voici les détails pour traitement.
              </Text>
            )}

            {/* Service Type Section */}
            <Section style={serviceCard}>
              <Text style={serviceBadge}>{service} - {category}</Text>
              <Text style={serviceDescription}>
                Demande envoyée le {date}
              </Text>
            </Section>
            
            {/* Contact Details Card */}
            <Section style={infoCard}>
              <Text style={cardTitle}>Informations de contact</Text>
              <Text style={infoLabel}>Nom: <strong style={infoValue}>{name}</strong></Text>
              <Hr style={infoSeparator} />
              <Text style={infoLabel}>Email: <strong style={infoValue}>{email}</strong></Text>
              {phone && (
                <>
                  <Hr style={infoSeparator} />
                  <Text style={infoLabel}>Téléphone: <strong style={infoValue}>{phone}</strong></Text>
                </>
              )}
            </Section>

            {/* Message Section */}
            <Section style={infoCard}>
              <Text style={cardTitle}>Message</Text>
              <Text>{message}</Text>
            </Section>

            {/* Images Section */}
            {imageUrls && imageUrls.length > 0 && (
              <Section style={infoCard}>
                <Text style={cardTitle}>Photos jointes ({imageUrls.length})</Text>
                <Section style={imageGrid}>
                  {imageUrls.slice(0, 4).map((url, index) => (  // Limit to 4 images for email layout
                    <Img
                      key={index}
                      src={url}
                      alt={`Image ${index + 1}`}
                      width="120"
                      height="120"
                      style={imageStyle}
                    />
                  ))}
                  {imageUrls.length > 4 && (
                    <Text style={text}>Et {imageUrls.length - 4} image(s) supplémentaire(s)</Text>
                  )}
                </Section>
              </Section>
            )}

            <Hr style={hr} />

            {/* CTA and Footer Section (Customer Only) */}
            {isCustomer ? (
              <Section style={ctaSection}>
                <Text style={text}>
                  Notre équipe vous contactera dans les 24 heures pour discuter des détails et planifier une intervention.
                </Text>
                <Section style={contactCard}>
                  <Text style={contactTitle}>Besoin d'aide ?</Text>
                  <Link href="tel:+33123456789" style={contactLink}>
                    +33 66 03 35 399
                  </Link>
                  <Text style={text}>ou</Text>
                  <Link href="mailto:contact@cobbersgarden.fr" style={contactLink}>
                    contact@cobbersgarden.fr
                  </Link>
                </Section>
                <Text style={signatureText}>
                  Cordialement,<br />
                  Votre équipe Cobbers Garden
                </Text>
              </Section>
            ) : (
              // Admin CTA
              <Section style={ctaSection}>
                <Text style={text}>
                  Contactez le client au plus vite pour confirmer le rendez-vous et discuter des détails.
                </Text>
                <Section style={contactCard}>
                  <Text style={contactTitle}>Actions rapides</Text>
                  <Link href={`mailto:${email}`} style={contactLink}>
                    Répondre par email
                  </Link>
                  {phone && (
                    <>
                      <Text style={text}>ou</Text>
                      <Link href={`tel:${phone}`} style={contactLink}>
                        Appeler le client
                      </Link>
                    </>
                  )}
                </Section>
                <Text style={signatureText}>
                  Système de réservation Cobbers Garden
                </Text>
              </Section>
            )}
          </Section>

          {/* Global Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Cobbers Garden. Tous droits réservés.<br />
              <Link href="https://cobbersgarden.fr" style={footerLink}>
              https://cobbersgarden.fr
              </Link>
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
  padding: '24px',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
};

const header = {
  padding: '24px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  height: 'auto' as const,
  maxWidth: '200px',
};

const content = {
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const h1 = {
  color: '#1a4d2e',
  fontSize: '24px',
  fontWeight: '600' as const,
  textAlign: 'center' as const,
  margin: '0 0 32px 0',
};

const greeting = {
  fontSize: '18px',
  color: '#333',
  marginBottom: '24px',
  textAlign: 'left' as const,
  fontWeight: '600' as const,
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
  backgroundColor: '#f9fafb',
};

const serviceBadge = {
  backgroundColor: '#1a4d2e',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '20px',
  display: 'inline-block' as const,
  fontSize: '16px',
  fontWeight: '500' as const,
  marginBottom: '12px',
};

const serviceDescription = {
  fontSize: '14px',
  color: '#4b5563',
  margin: '0',
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
  fontWeight: '600' as const,
  color: '#1a4d2e',
  marginBottom: '20px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const infoLabel = {
  fontSize: '15px',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  marginBottom: '2px',
};

const infoValue = {
  color: '#111827',
  fontWeight: '500' as const,
};

const infoSeparator = {
  borderColor: '#e5e7eb',
  margin: '8px 0',
  opacity: 0.5,
};

const messageText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  padding: '12px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  // Removed borderLeft to eliminate the side border
  border: 'none',
};

const imageGrid = {
  display: 'flex' as const,
  flexWrap: 'wrap' as const,
  gap: '16px',
  justifyContent: 'center' as const,
  margin: '16px 0',
};

const imageStyle = {
  width: '120px',
  height: '120px',
  objectFit: 'cover' as const,
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
  fontWeight: '600' as const,
  color: '#1a4d2e',
  marginBottom: '16px',
};

const contactLink = {
  color: '#1a4d2e',
  textDecoration: 'underline',
  display: 'inline-block' as const,
  margin: '8px 0',
  fontSize: '16px',
  fontWeight: '500' as const,
};

const signatureText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '24px 0 0',
  textAlign: 'center' as const,
};

const footer = {
  textAlign: 'center' as const,
  margin: '32px 0 0',
  paddingTop: '32px',
  borderTop: '1px solid #e5e7eb',
};

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  lineHeight: '1.4',
};

const footerLink = {
  color: '#1a4d2e',
  textDecoration: 'underline',
};

BookingEmail.PreviewProps = {
  name: 'John Doe',
  service: 'Jardinage',
  category: 'Entretien',
  email: 'john@example.com',
  phone: '+33 1 23 45 67 89',
  message: 'Je souhaite un rendez-vous pour tondre la pelouse.',
  imageUrls: [],
  submittedAt: new Date().toISOString(),
  isCustomer: true,
} as BookingEmailProps;

export default BookingEmail;