Rails.application.routes.draw do
  root to: 'balls_core#index'

  resources :balls_core, only: :index do
    post 'send_sum', :defaults => { :format => :json }, on: :collection
    get 'get_colors_and_scores', :defaults => { :format => :json }, on: :collection
  end
end
