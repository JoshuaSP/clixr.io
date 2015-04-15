json.extract! page, :title, :address, :ord
json.elements do
  json.partial! 'element', collection: page.elements, as: :element
end
