class Api::SitesController < ApplicationController
  def show
    @site = Site.includes(:elements, pages: {:elements}).find(id)
  end
end
