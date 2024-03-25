class Gift < ApplicationRecord
  belongs_to :user
  belongs_to :event, optional: true, dependent: :destroy

  validates :budget, :age, :genre, :occasion, :relationship, presence: true
  validates :budget, numericality: { greater_than: 0 }
  validates :relationship, presence: true
end
