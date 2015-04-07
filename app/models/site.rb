class Site < ActiveRecord::Base
  has_many :pages
  has_many :elements, as: :placeable
  validates_presence_of :title
  validates :published_addres, uniqueness: true
end
