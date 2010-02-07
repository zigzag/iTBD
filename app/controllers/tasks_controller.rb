class TasksController < ApplicationController

  # protect_from_forgery :except => [:create, :reorder]
  skip_before_filter :verify_authenticity_token
  
  # GET /tasks
  def index
    @tasks = Task.todos
    render :json => @tasks.to_json
  end

  # GET /tasks/1
  def show
    @task = Task.find(params[:id])
    render :json => @task.to_json
  end

  # POST /tasks
  def create
    @task = Task.new(params[:task])
    if @task.save
      render :json => Task.todos.to_json
    else
      render :json => @task.errors, :status => :unprocessable_entity
    end
  end

  # PUT /tasks/1
  def update
    @task = Task.find(params[:id])
    if @task.update_attributes(params[:task])
      render :json => Task.todos.to_json
    else
      render :json => @task.errors, :status => :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    render :json => Task.todos.to_json
  end
  
  # POST /tasks/reorder
  def reorder
    Task.reorder(params[:ids])
    render :json => Task.todos.to_json
  end
  
  # POST /tasks/1/toggle
  def toggle
    @task = Task.find(params[:id])
    Task.todos.each { |task| task.stop if task != @task}
    @task.toggle
    render :json => @task.to_json
  end
  
end
