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
                  - Ne proposez pas de vaisselle ou de produits similaires (ex. ensemble de verres).
                  - Évitez les descriptions comportant des adjectifs comme tendance, 'élégant', 'pratique', 'stylé' ou 'confortable'.
                  - Les propositions doivent être précises et bien adaptées aux intérêts mentionnés. Par exemple, si l'intérêt est la photographie, proposez des équipements ou accessoires photographiques pertinents (ex : trépied de voyage, sac à dos avec compartiment pour appareil photo).
                  - Tu me donnes une nouvelle liste numérotée de trente cadeaux. Ta réponse ne doit inclure rien d'autre que cette nouvelle liste numérotée."
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
          content: "À partir de la liste générée(#{generated_list}), je t'avais demandé une liste de trente cadeaux pour #{relationship} qui est âgée de #{age} ans et est de sexe #{genre}. Ce cadeau sera offert à l'occasion de #{occasion}, je t'avais précisé que cette personne aime #{list_of_interests}. Je veux que tu prennes en compte ce commentaire: #{comment} et que tu me donnes une nouvelle liste numérotée de trente cadeaux. Ta réponse ne doit inclure rien d'autre que cette nouvelle liste numérotée."
        }]
      })
    response["choices"].first["message"]["content"]
  end
end
