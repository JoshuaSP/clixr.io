json.extract! @site,
  :title,
  :published_address,
  :thumbnail_url,
  :background_url,
  :body_class,
  :body_css,
  :transition
json.elements do
  json.partial! 'element', collection: @site.elements, as: :element
end
json.pages do
  json.partial! 'page', collection: @site.pages, as: :page
end
