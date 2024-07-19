class ChangeRecurrentDefaultInEvents < ActiveRecord::Migration[7.1]
  def change
    change_column_default :events, :recurrent, from: nil, to: false
  end
end
