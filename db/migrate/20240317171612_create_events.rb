class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :name
      t.date :date
      t.text :description
      t.string :url
      t.text :gift_list, array: true, default: []
      t.references :user, null: false, foreign_key: true
      t.references :gift, foreign_key: true

      t.timestamps
    end
  end
end
