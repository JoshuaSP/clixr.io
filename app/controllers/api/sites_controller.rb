class Api::SitesController < ApplicationController
  BAD_ADDRESSES = ["api", "keep_alive", "sites", "edit"]
  DISALLOWED_REGEX = RegExp.new ("[^A-Za-z]" + BAD_ADDRESSES.map do |bad_address|
    "|^#{bad_address}$|"
  end.join("") + "^$")

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
    disallowed = params[:address].match(DISALLOWED_REGEX)
    if (found_site && !(found_site == @site)) || disallowed
      head :conflict
    else
      head :ok
    end
  end
end
