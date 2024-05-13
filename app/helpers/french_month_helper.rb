# Helper pour afficher les mois en français
module FrenchMonthHelper
  def french_month(date)
    months = {
      'January' => 'Janvier', 'February' => 'Février', 'March' => 'Mars',
      'April' => 'Avril', 'May' => 'Mai', 'June' => 'Juin',
      'July' => 'Juillet', 'August' => 'Août', 'September' => 'Septembre',
      'October' => 'Octobre', 'November' => 'Novembre', 'December' => 'Décembre'
    }
    month = date.strftime("%B")
    months[month]
  end
end
