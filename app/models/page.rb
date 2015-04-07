class Page < ActiveRecord::Base
  belongs_to :site
  has_many :elements, as: :placeable

  validates_presence_of :name, :ord
end
