json.extract! page, :title, :ord
json.elements do
  json.partial! 'element', collection: page.elements, as: :element
end
