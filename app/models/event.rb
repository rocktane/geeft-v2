class Event < ApplicationRecord
  belongs_to :user
  has_one :gift, dependent: :destroy

  validates :name, :date, presence: true
  validates :url, format: { with: URI::DEFAULT_PARSER.make_regexp }, allow_blank: true
end
