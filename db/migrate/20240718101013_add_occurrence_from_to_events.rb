class AddOccurrenceFromToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :occurrence_from, :integer
  end
end
