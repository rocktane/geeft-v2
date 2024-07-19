# Helper pour afficher le titre de la navbar en fonction de la page sur Desktop
module NavbarTitlesHelper
  def navbar_title
    case controller_name
      when "pages"
        pages_titles
      when "events"
        events_titles
      when "gifts"
        gifts_titles
      when "sessions"
        sessions_titles
      when "registrations"
        registrations_titles
      when "passwords"
        passwords_titles
    end
  end
end

private

def pages_titles
  case action_name
    when "home"
      "> Trouve le cadeau parfait"
  end
end

def events_titles
  case action_name
    when "dashboard"
      "> Calendrier"
    when "new"
      "> Créer mon èvènement"
    when "show"
      "> Mon évènement"
    when "edit"
      "> Modifier mon évènement"
  end
end

def gifts_titles
  case action_name
    when "new"
      "> Trouve le cadeau parfait"
    when "show"
      "> Idées cadeaux"
  end
end

def sessions_titles
  case action_name
    when "new"
      "> Connexion"
    when "destroy"
      "> Déconnexion"
  end
end

def registrations_titles
  case action_name
    when "new"
      "> Inscription"
    when "edit"
      "> Modifier mon profil"
  end
end

def passwords_titles
  case action_name
    when "new"
      "> Mot de passe oublié"
  end
end
