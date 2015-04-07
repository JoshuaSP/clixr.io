json.extract! page
json.elements do
  json.partial! 'element', collection: page.elements, as: :element
end
