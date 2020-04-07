class BakesController < ApplicationController

  def index
    bakes = Bake.all
    render json: bakes
  end

  def show
    bake = Bake.find(params[:id])
    if bake
      render json: bake
    else
      render json: { error: "Not found!" }, status: 404
    end
  end

  def create
    bake = Bake.create(create_bake_params)
    if bake.valid?
      render json: bake
    else
      render json: { errors: bake.errors.full_messages }, status: 403
    end
  end

  def update
    bake = Bake.find(params[:id])
    bake.update(params[:score])
    render json: {}
  end

  def winner
    bake = Bake.winner
    render json: bake
  end

  def destroy
    bake = Bake.find(params[:id])
    bake.destroy
    render json: {}
  end

  private

  def create_bake_params
    params.permit(:name, :image_url, :description)
  end
end