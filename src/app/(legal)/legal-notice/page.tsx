export default function LegalNoticePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-playfair font-bold text-garden-primary mb-8">
        Mentions Légales
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            Informations légales
          </h2>
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie numérique, dite L.C.E.N.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            Propriétaire du site
          </h2>
          <p>Cobbers Garden</p>
          <p>25 rue de lommeries</p>
          <p>59249 Fromelles</p>
          <p>France</p>
          <p>Email: cobbersgarden@gmail.com</p>
          <p>Téléphone: +33660335399</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            Représentant légal
          </h2>
          <p>Directeur de la publication : Timothée Bels</p>
          <p>SIRET : [Numéro SIRET]</p>
          <p>TVA Intracommunautaire : [Numéro TVA]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            Hébergement
          </h2> 
          <p>Ce site est hébergé par :</p>
          <p>Vercel Inc.</p>
          <p>440 N Barranca Ave #4133</p>
          <p>Covina, CA 91723</p>
          <p>États-Unis</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble de ce site relève de la législation française et internationale 
            sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de 
            reproduction sont réservés, y compris pour les documents téléchargeables 
            et les représentations iconographiques et photographiques.
          </p>
        </section>
      </div>
    </div>
  );
} 