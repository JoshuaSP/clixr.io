class Element < ActiveRecord::Base
  attr_duplicatable :placeable,
    :element_type,
    :element_class,
    :css,
    :url,
    :content

  belongs_to :placeable, polymorphic: true
end
