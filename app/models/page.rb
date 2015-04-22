class Page < ActiveRecord::Base
  belongs_to :site
  has_many :elements, as: :placeable

  attr_duplicatable :site_id, :title, :ord, :address, :elements

  validates_presence_of :title, :ord
end
