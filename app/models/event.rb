class Event < ApplicationRecord
  # before_validation :ensure_url_valid
  belongs_to :user
  has_one :gift, dependent: :destroy

  validates :name, :date, presence: true
  validate :ensure_url_valid
  validates :url, format: { with: URI::DEFAULT_PARSER.make_regexp }, allow_blank: true
  validates :recurrent, inclusion: { in: [true, false] }

  private

  def ensure_url_valid
    return if url.blank? # skip validation if url is blank or white space

    url_with_http = %r{^(http(s)?://[a-zA-Z0-9\-_]+\.[a-zA-Z]+(.)+)+}
    url_without_http = /^([a-zA-Z0-9\-_]+\.[a-zA-Z]+(.)+)+/

    if url.match?(url_with_http) # check if url is valid with http or https
      self.url = url
    elsif url.match?(url_without_http) # check if url is valid witout http or https
      self.url = "https://#{url}"
    elsif url.match?(/^\s*$/)
      self.url = ''
    else
      errors.add(:url, "n'est pas valide.")
    end
  end
end
