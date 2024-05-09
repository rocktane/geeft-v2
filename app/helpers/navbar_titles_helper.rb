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
      when "users"
        users_titles
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
      "> Tableau de bord"
    when "new"
      "> Créer mon événement"
    when "show"
      "> Mon événement"
    when "edit"
      "> Modifier mon événement"
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

def users_titles
  case controller_name
  when "registrations"
    case action_name
    when "edit"
      "> Modifier mon compte"
    when "new"
      "> Créer un compte"
    when "update"
      "> Mise à jour du compte"
    end
  when "sessions"
    case action_name
    when "new"
      "> Connexion"
    end
  when "passwords"
    case action_name
    when "new"
      "> Réinitialiser le mot de passe"
    when "edit"
      "> Modifier le mot de passe"
    end
  end
end
