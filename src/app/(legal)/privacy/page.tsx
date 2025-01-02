export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-playfair font-bold text-garden-primary mb-8">
        Politique de Confidentialité
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            1. Collecte des informations
          </h2>
          <p>
            Nous collectons les informations suivantes :
          </p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Informations de navigation (via PostHog Analytics)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            2. Utilisation des cookies
          </h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience de navigation. 
            Les cookies sont de petits fichiers texte stockés sur votre ordinateur qui nous 
            aident à fournir une meilleure expérience utilisateur.
          </p>
          <p>
            Nous utilisons PostHog Analytics pour analyser l'utilisation de notre site. 
            Ces données sont collectées de manière anonyme et nous aident à améliorer nos services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            3. Vos droits RGPD
          </h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), 
            vous disposez des droits suivants :
          </p>
          <ul>
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            4. Conservation des données
          </h2>
          <p>
            Nous conservons vos données personnelles pendant une durée maximale de 3 ans 
            à compter de votre dernière interaction avec nos services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            5. Contact
          </h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour 
            exercer vos droits, vous pouvez nous contacter à :
          </p>
          <p>Email: privacy@cobbersgarden.fr</p>
        </section>
      </div>
    </div>
  );
} 