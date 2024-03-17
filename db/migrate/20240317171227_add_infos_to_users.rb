class AddInfosToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :birthday, :date
    add_column :users, :username, :string
  end
end
