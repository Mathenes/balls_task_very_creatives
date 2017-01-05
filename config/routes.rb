Rails.application.routes.draw do
  root to: 'balls_core#index'

  post 'send_sum', to: 'balls_core#send_sum', :defaults => { :format => :json }
end
