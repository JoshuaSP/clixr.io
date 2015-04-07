class Site < ActiveRecord::Base
  has_many :pages
  validates_presence_of :title
  validates :published_addres, uniqueness: true  
end
