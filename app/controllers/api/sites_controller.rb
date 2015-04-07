class Api::SitesController < ApplicationController
  def show
    @site = Site.includes(:elements, pages: [:elements]).find(params[:id])
  end
end
