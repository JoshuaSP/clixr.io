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
      :image_cover_css,
      :background_css,
      :transition
    ))
  end

  def check_address
    @site = Site.find(params[:id]);
    found_site = Site.find_by_published_address(params[:address])
    disallowed = params[:address].match(/[^A-za-z]|^api$|^sites$|^edit$|^$/)
    if (found_site && !(found_site == @site)) || disallowed
      head :conflict
    else
      head :ok
    end
  end
end
