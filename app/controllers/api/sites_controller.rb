class Api::SitesController < ApplicationController
  def show
    @site = Site.includes(:elements, pages: [:elements]).find(params[:id])
  end

  def update
    @site = Site.find(params[:id])
    @site.update(params.require(:site).permit(
      :title,
      :published_address,
      :thumbnail_url,
      :background_url,
      :transition
    ))
  end
end
