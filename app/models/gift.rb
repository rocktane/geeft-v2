class Gift < ApplicationRecord
  belongs_to :user
  belongs_to :event, optional: true

  validates :budget, :age, :genre, :occasion, :relationship, presence: true
  validates :budget, numericality: { greater_than: 0 }
  validates :relationship, presence: true

  OCCASIONS = %w[Noël Anniversaire Saint-Valentin Fêtes\ des\ parents Fête\ des\ grands-mères Pot\ de\ départ
              Crémaillère Baptème Mariage Aïd\ el\ Fitr Bar-Mitzvah Bat-Mitzvah Baby\ shower
              EVJF EVG Remise\ de\ diplôme Juste\ comme\ ça]
  INTERESTS = %w[Musique Sport Nature Art Voyage Lecture Cuisine Technologie Mode Bien-être Cosmétique Humour Cinéma
              Jardinage Jeux-vidéo Langues\ étrangères Astronomie Bricolage Danse Théatre Spectacle Histoire
              Psychologie Développement\ personnel Sptiritualité Astrologie Design]
  RELATIONSHIPS = %w[Parent Petit·e-ami·e Frère Soeur Enfant Collègue Grand-parent Cousin·e Oncle Tante Beau-parent
          Beau-frère Belle-soeur Neveu Nièce Petit-enfant BFF Ami·e Conjoint·e Connaissance Patron·ne
          Parrain Marraine Filleul·e Professeur·e Moi-même]

  def gen_gifts(client, budget, age, genre, occasion, interests, relationship)

    list_of_interests = interests.compact_blank.join(", ")

    response = client.chat(
      parameters: {
        model: ENV["MODEL"],
        messages: [{
          role: "user",
          content:
          "Je veux une liste de trente cadeaux pour #{relationship}. Cette personne est de sexe #{genre}, elle est âgée de #{age} ans et aime #{list_of_interests}. Le cadeau sera offert à l'occasion de #{occasion}. Mon budget est de #{budget} euros.

          Veuillez suivre ces précisions :
          - Ne proposez pas de mugs, de porte-clés, de cartes cadeaux, d'abonnements, de supports de livres, de lampes de lecture, de jeux de société de type escape room ou de produits avec des motifs spécifiques.
          - Si vous proposez des marque-pages, assurez-vous qu'ils soient en matériaux spécifiques et de qualité (par exemple en bois, en argent ou en or).
          - Ne proposez pas de vaisselle ou de produits similaires (ex. ensemble de verres) sauf pour les crémaillères.
          - Évitez les descriptions comportant des adjectifs comme tendance, 'élégant', 'pratique', 'stylé' ou 'confortable'.
          - Les propositions doivent être précises et bien adaptées aux intérêts mentionnés. Par exemple, si l'intérêt est la photographie, proposez des équipements ou accessoires photographiques pertinents (ex : trépied de voyage, sac à dos avec compartiment pour appareil photo).
          - Soyez concis, je veux juste les cadeaux sans explications.

          Exemple :
          Je veux une liste de trente cadeaux pour mon père. Cette personne est de sexe masculin, elle est âgée de 55 ans et aime la photographie, la randonnée et le jardinage. Le cadeau sera offert à l'occasion de Noël. Mon budget est de 100 euros. Liste des cadeaux : Trépied de voyage compact, Sac à dos de randonnée avec compartiment pour appareil photo, Ensemble d'outils de jardinage ergonomiques, Carte mémoire haute capacité pour appareil photo, Gants de jardinage en cuir, Gourde isotherme en acier inoxydable, Étui de protection pour appareil photo, Paire de jumelles étanches, Lampe frontale rechargeable, Housse de protection pour appareil photo, Couteau de poche multifonction, Livre de randonnée avec itinéraires, Paire de sécateurs professionnels, Lunettes de soleil polarisées, Album photo en cuir, Plante d'intérieur facile d'entretien, Écouteurs sans fil avec réduction de bruit, Boîte de rangement pour cartes mémoire, Mini-enceinte Bluetooth étanche, Boussole de randonnée de qualité, Kit de nettoyage pour appareil photo, Tapis de sol ultraléger pour randonnée, Paire de bottes de jardinage imperméables, Poster de paysage encadré, Casquette de randonnée respirante, Moulins à sel et poivre en bois, Album photo de voyage personnalisé, Écharpe en laine mérinos, Livre de techniques avancées de photographie, Batterie externe solaire."
        }]
      })
    response["choices"].first["message"]["content"]
  end

  def update_gifts(client, comment, interests)

    list_of_interests = interests.compact_blank.join(", ")

    response = client.chat(
      parameters: {
        model: ENV["MODEL"],
        messages: [{
          role: "user",
          content:
          "À partir de la liste générée (#{generated_list}), je t'avais demandé une liste de trente cadeaux pour #{relationship} âgé(e) de #{age} ans et de sexe #{genre}. Ce cadeau sera offert à l'occasion de #{occasion}, et je t'avais précisé que cette personne aime #{list_of_interests}. Prends en compte ce commentaire : #{comment} et donne-moi une nouvelle liste numérotée de trente cadeaux. Respecte les précisions suivantes :
          - Pas de mugs, porte-clés, cartes cadeaux, abonnements, supports de livres, lampes de lecture, jeux de société de type 'escape room' ou produits avec des motifs spécifiques.
          - Si tu proposes des marque-pages, qu'ils soient en bois, argent ou or.
          - Pas de vaisselle ou produits similaires (ex. ensemble de verres) sauf pour les crémaillères.
          - Évite les adjectifs comme 'tendance', 'élégant', 'pratique', 'stylé' ou 'confortable'.
          - Les propositions doivent être précises et bien adaptées aux intérêts mentionnés.
          - Sois concis, je veux juste les cadeaux sans explications."
        }]
      })
    response["choices"].first["message"]["content"]
  end
end
