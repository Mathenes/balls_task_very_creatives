Rails.application.routes.draw do
  root to: 'balls_core#index'

  # post 'send_sum', to: 'balls_core#send_sum', :defaults => { :format => :json }

  resources :balls_core, only: :index do
    post 'send_sum', :defaults => { :format => :json }, on: :collection
  end
end
