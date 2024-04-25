Event.destroy_all
Gift.destroy_all

# User.create(email: "toto@gmail.com", password: "123456", username: "toto", birthday: "1990-01-01")
Gift.create(budget: 100, age: 30, genre: "neutral", occasion: "Birthday", relationship: "Friend", interests: ["Sport", "Music"], generated_list: ["Livre sur l'astrologie",
   "Carte du ciel personnalisée",
   "Pendule astrologique",
   "Bougies parfumées en fonction des signes astrologiques",
   "Pierres précieuses associées aux signes du zodiaque",
   "Carnet de notes avec motifs astrologiques",
   "Tasse avec constellation du signe astrologique",
   "Planche de jeu de société astrologique",
   "Collier avec pendentif en forme d'astre",
   "Ensemble de cartes de tarot",
   "Trousse de maquillage inspirée des étoiles",
   "Masque de sommeil avec motifs de constellations",
   "Poster mural des planètes",
   "Chaussettes avec motifs astrologiques",
   "Dvd de documentaires sur l'astrologie",
   "Tatouage éphémère de symboles astrologiques",
   "Mug isotherme avec signe du zodiaque",
   "Coussin avec motif de signe astrologique",
   "Lampe d'ambiance en forme d'étoile",
   "Journal de gratitude avec illustrations d'astres",
   "Pendaison de crémaillère en forme de lune",
   "Bracelet avec nature morte astrologique",
   "Ensemble de boules de bain en forme de planètes",
   "Bouteille d'eau écologique avec symboles zodiacaux",
   "Boîte à bijoux avec motifs astronomiques",
   "Tablier de cuisine avec motifs de galaxies",
   "Puzzle 3D du système solaire",
   "Parapluie pliable avec constellations",
   "Boucles d'oreilles en forme de croissant de lune",
   "Carnet d'adresse avec symboles astrologiques"], user_id: User.first.id)

Event.create(name: "Birthday", date: "2024-04-17", description: "My birthday", url: "https://www.google.com", user_id: User.first.id, gift: Gift.first)
