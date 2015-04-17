class Api::PagesController < ApplicationController
  def update
    @page = Page.find(params[:id])
    @page.update(params.require(:page).permit(
      :title,
      :site_id,
      :ord,
      :address
    ))
  end
end
