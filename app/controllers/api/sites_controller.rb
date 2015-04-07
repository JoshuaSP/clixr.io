class Api::SitesController < ApplicationController
  def show
    @site = Site.include(:pages, :entries).find(id)
  end
end
