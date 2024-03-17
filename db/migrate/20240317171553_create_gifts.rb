class CreateGifts < ActiveRecord::Migration[7.1]
  def change
    create_table :gifts do |t|
      t.integer :budget, default: 100
      t.integer :age, default: 30
      t.string :genre, default: "neutral"
      t.string :occasion
      t.string :relationship
      t.text :interests, array: true, default: []
      t.text :generated_list, array: true, default: []
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
