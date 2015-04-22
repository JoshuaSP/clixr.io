class Site < ActiveRecord::Base
  has_many :pages
  has_many :elements, as: :placeable
  validates_presence_of :title
  validates :published_address, uniqueness: true, allow_nil: true

  # after_initialize :check_hash_id_and_transition
  before_save :check_hash_id_and_transition

  attr_duplicatable :title,
    :background_url,
    :image_cover_css,
    :transition,
    :background_css,
    :pages,
    :elements

  def check_hash_id_and_transition
    self.hash_id = SecureRandom::urlsafe_base64(6) unless hash_id
    self.transition = "None" unless transition
  end
end
