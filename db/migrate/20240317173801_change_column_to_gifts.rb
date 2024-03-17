class ChangeColumnToGifts < ActiveRecord::Migration[7.1]
  def change
    add_reference :gifts, :event, foreign_key: true
  end
end
