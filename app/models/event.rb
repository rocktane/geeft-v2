class Event < ApplicationRecord
  belongs_to :user
  has_one :gift

  validates :name, :date, presence: true
  validates :url, format: { with: URI::DEFAULT_PARSER.make_regexp }, allow_blank: true
end
