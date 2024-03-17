class RemoveGiftFromEvents < ActiveRecord::Migration[7.1]
  def change
    remove_reference :events, :gift, foreign_key: true
  end
end
