import { TreePine, Axe, Flower2, HelpCircle, MoreHorizontal } from "lucide-react";

type CategoryOption = {
  category: string;
  icon: React.ElementType;
  description: string;
};

const categories: CategoryOption[] = [
  {
    category: "Élagage",
    icon: TreePine,
    description: "Taille et entretien des arbres",
  },
  {
    category: "Abattage",
    icon: Axe,
    description: "Abattage d'arbres et dessouchage",
  },
  {
    category: "Entretien du jardin",
    icon: Flower2,
    description: "Entretien régulier et aménagement",
  },
  {
    category: "Conseil",
    icon: HelpCircle,
    description: "Expertise et recommandations",
  },
  {
    category: "Autres",
    icon: MoreHorizontal,
    description: "Autres services sur demande",
  },
];

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.category}
            onClick={() => onSelectCategory(cat.category)}
            className={`group p-6 rounded-xl transition-all duration-300 ${
              selectedCategory === cat.category
                ? "bg-garden-primary text-white"
                : "bg-garden-background hover:bg-garden-primary/10"
            }`}>
            <div className="flex flex-col items-center text-center space-y-3">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  selectedCategory === cat.category
                    ? "bg-white"
                    : "bg-white group-hover:bg-garden-primary/5"
                }`}>
                <Icon
                  className={`w-8 h-8 transition-colors ${
                    selectedCategory === cat.category
                      ? "text-garden-primary"
                      : "text-garden-primary group-hover:text-garden-primary"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`font-playfair font-bold text-lg ${
                    selectedCategory === cat.category
                      ? "text-white"
                      : "text-garden-primary"
                  }`}>
                  {cat.category}
                </h3>
                <p
                  className={`text-sm mt-1 transition-colors ${
                    selectedCategory === cat.category
                      ? "text-white/90"
                      : "text-garden-secondary"
                  }`}>
                  {cat.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CategorySelector; 