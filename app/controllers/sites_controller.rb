class SitesController < ApplicationController
  def edit
    @site = Site.find(params[:id])
  end
end
