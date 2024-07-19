class AddRecurrentFromToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :recurrent, :boolean, default: false
  end
end
