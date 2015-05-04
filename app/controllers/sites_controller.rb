class SitesController < ApplicationController
  def edit
    @site = Site.find_by_hash_id(params[:id])
  end

  def show
    @site = Site.find_by_published_address(params[:sitename])
  end

  def new
    @site = Site.find(30).duplicate
    @site.save
    redirect_to "/sites/#{@site.hash_id}/edit"
  end
end
