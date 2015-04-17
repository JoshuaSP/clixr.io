class SitesController < ApplicationController
  def edit
    @site = Site.find(params[:id])
  end

  def show
    @site = Site.find_by_published_address(params[:sitename])
  end
end
