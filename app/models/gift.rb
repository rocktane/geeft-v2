class Gift < ApplicationRecord
  belongs_to :user
  belongs_to :event, optional: true, dependent: :destroy
end
