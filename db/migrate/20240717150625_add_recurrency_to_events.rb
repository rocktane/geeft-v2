class AddRecurrencyToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :recurrency, :string
  end
end
