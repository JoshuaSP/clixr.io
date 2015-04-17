json.extract! page, :id, :title, :address, :ord, :site_id
json.elements do
  json.partial! 'element', collection: page.elements, as: :element
end
