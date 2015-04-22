class SitesController < ApplicationController
  def edit
    @site = Site.find_by_hash_id(params[:id])
  end

  def show
    @site = Site.find_by_published_address(params[:sitename])
  end

  def new
    # @site = Site.new(
    #   title: "untitled",
    #   background_css: "{\"background-color\":\"rgb(256, 256, 256)\"}",
    #   image_cover_css: "{\"background-color\":\"rgb(256, 256, 256)\", \"opacity\":0}"
    # )

    @site = Site.find(7).duplicate
    @site.save
    redirect_to "/sites/#{@site.hash_id}/edit"
  end
end
