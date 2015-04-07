json.extract! page, :name, :ord
json.elements do
  json.partial! 'element', collection: page.elements, as: :element
end
