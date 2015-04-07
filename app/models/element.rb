class Element < ActiveRecord::Base
  belongs_to :placeable, polymorphic: true
end
