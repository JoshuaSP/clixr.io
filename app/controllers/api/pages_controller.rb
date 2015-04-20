class Api::PagesController < ApplicationController
  def update
    @page = Page.find(params[:id])
    @page.update(page_params)
    render :show
  end

  def create
    @page = Page.create(page_params)
    render :show
  end

  private

  def page_params
    params.require(:page).permit(:title, :site_id, :ord, :address)
  end
end
