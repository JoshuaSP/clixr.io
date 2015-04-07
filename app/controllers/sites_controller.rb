class SitesController < ApplicationController
  def edit(id)
    @site = Site.find(id)
  end
end
