json.extract! @site,
  :title,
  :published_address,
  :thumbnail_url,
  :background_url,
  :background_css,
  :image_cover_css,
  :transition
json.elements do
  json.partial! 'element', collection: @site.elements, as: :element
end
json.pages do
  json.partial! 'page', collection: @site.pages, as: :page
end
