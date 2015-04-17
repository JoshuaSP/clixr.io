class Api::ElementsController < ApplicationController
  def update
    @element = Element.find(params[:id])
    @element.update(params.require(:element).permit(
      :placeable_id,
      :placeable_type,
      :type,
      :class,
      :css,
      :url,
      :content
    ))
  end
end
