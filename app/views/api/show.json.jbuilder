json.extract! @site
json.elements do
  json.partial! 'element', collection: @site.elements, as: :element
end
json.pages do
  json.partial! 'page', collection: @site.pages, as: :page
end
