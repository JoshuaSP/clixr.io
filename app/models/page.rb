class Page < ActiveRecord::Base
  belongs_to :site

  validates_presence_of :name, :ord
end
