export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-playfair font-bold text-garden-primary mb-8">
        Conditions Générales de Vente
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            1. Objet
          </h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations entre 
            Cobbers Garden et ses clients pour tous les services de jardinage et d'entretien 
            d'espaces verts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            2. Services
          </h2>
          <p>
            Cobbers Garden propose les services suivants :
          </p>
          <ul>
            <li>Entretien de jardins</li>
            <li>Taille de haies et arbustes</li>
            <li>Tonte de pelouse</li>
            <li>Aménagement paysager</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            3. Prix et Paiement
          </h2>
          <p>
            Les prix sont indiqués en euros TTC. Un devis détaillé sera fourni avant 
            toute intervention. Le paiement est dû à réception de la facture.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            4. Droit de rétractation
          </h2>
          <p>
            Conformément à l'article L221-18 du Code de la consommation, vous disposez 
            d'un délai de 14 jours pour exercer votre droit de rétractation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            5. Responsabilité
          </h2>
          <p>
            Cobbers Garden s'engage à réaliser les prestations conformément aux règles 
            de l'art et de la meilleure manière.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
            6. Litiges
          </h2>
          <p>
            En cas de litige, une solution amiable sera recherchée avant toute action 
            judiciaire. En cas d'échec, les tribunaux de Paris seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
} 