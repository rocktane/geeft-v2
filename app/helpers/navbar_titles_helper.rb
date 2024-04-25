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
