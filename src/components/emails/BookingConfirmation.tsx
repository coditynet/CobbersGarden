import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface BookingConfirmationEmailProps {
  name: string;
  service: string;
  email: string;
  phone?: string;
  message: string;
}

export const BookingConfirmationEmail = ({
  name,
  service,
  email,
  phone,
  message,
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#f6f9fc] px-2 font-sans">
          <Preview>Votre demande de réservation à Cobbers Garden a été reçue</Preview>
          <Container className="mx-auto my-[40px] max-w-[600px] rounded border border-[#e6ebf1] border-solid bg-white p-[40px]">
            <Heading className="mx-0 my-[20px] p-0 text-left font-bold text-[32px] text-[#1a4d2e]">
              Confirmation de réservation
            </Heading>
            <Text className="text-[16px] text-[#333] leading-[24px]">
              Bonjour {name},
            </Text>
            <Text className="text-[16px] text-[#333] leading-[24px]">
              Merci de votre demande auprès de Cobbers Garden. Nous avons reçu les informations suivantes.
            </Text>
            
            <Section className="mt-[20px] rounded-[5px] bg-[#f8f9fa] p-[20px]">
              <Text className="mb-[8px] text-[16px] text-[#333] leading-[24px]">
                <strong>Service:</strong> {service}
              </Text>
              <Text className="mb-[8px] text-[16px] text-[#333] leading-[24px]">
                <strong>Nom:</strong> {name}
              </Text>
              <Text className="mb-[8px] text-[16px] text-[#333] leading-[24px]">
                <strong>Adresse mail:</strong> {email}
              </Text>
              {phone && (
                <Text className="mb-[8px] text-[16px] text-[#333] leading-[24px]">
                  <strong>Numéro de téléphone:</strong> {phone}
                </Text>
              )}
              <Text className="text-[16px] text-[#333] leading-[24px]">
                <strong>Message:</strong> {message}
              </Text>
            </Section>

            <Hr className="mx-0 my-[20px] w-full border border-[#e6ebf1] border-solid" />
            
            <Text className="text-[16px] text-[#333] leading-[24px]">
              Nous vous contacterons dans les prochaines 24 heures pour convenir d'un rendez-vous approprié.
            </Text>
            
            <Text className="text-[16px] text-[#333] leading-[24px]">
              Si vous avez des questions, veuillez nous contacter à{' '}
              <Link href="tel:+33660335399" className="text-[#1a4d2e] underline">
                +33 66 03 35 399
              </Link>{' '}
              ou par mail{' '}
              <Link href="mailto:info@cobbers-garden.de" className="text-[#1a4d2e] underline">
                contact@cobbersgarden.fr
              </Link>
              .
            </Text>

            <Text className="mt-[32px] text-[14px] text-[#666] leading-[24px]">
              Cordialement<br />
              Votre équipe Cobbers Garden
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

BookingConfirmationEmail.PreviewProps = {
  name: 'John Doe',
  service: 'Jardinage',
  email: 'john@example.com',
  phone: '+49 987 654321',
  message: 'Je souhaite un rendez-vous pour tondre la pelouse.',
} as BookingConfirmationEmailProps;

export default BookingConfirmationEmail;