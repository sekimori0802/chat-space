Rails.application.routes.draw do
  get 'messages' =>'messages#index'
  get 'guroups' => 'guroups#new'
end
