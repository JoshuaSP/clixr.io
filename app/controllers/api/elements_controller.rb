class Api::ElementsController < ApplicationController
  def update
    @element = Element.find(params[:id])
    @element.update(element_params)
    render json: true
  end

  def create
    @element = Element.create(element_params)
    render :show
  end

  def destroy
    @element = Element.find(params[:id])
    @element.destroy
    render :show
  end

  private

  def element_params
    params.require(:element).permit(
      :placeable_id,
      :placeable_type,
      :element_type,
      :element_class,
      :css,
      :url,
      :content
    )
  end
end
