#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'json'

set :public_folder, File.expand_path('../../', __FILE__)

get '/' do
  redirect '/index.html'
end

get '/api/_meta/resources.json' do
  [
      {
          :text => 'Foo',
          :leaf => true,
          :uri => 'foos'
      },
      {
          :text => 'Bar',
          :leaf => true,
          :uri => 'bars'
      },
      {
          :text => 'Baz',
          :leaf => true,
          :uri => 'bazes'
      }
  ].to_json
end

get '/api/_meta/resources/:name/fields.json' do
  [
      {
          :title => "Foo Column of #{params[:name]}",
          :name => 'foo_column',
          :type => 'string'
      },
      {
          :title => "Bar Column of #{params[:name]}",
          :name => 'bar_column',
          :type => 'string'
      },
      {
          :title => "Baz Column of #{params[:name]}",
          :name => 'baz_column',
          :type => 'string'
      }
  ].to_json
end

get '/api/:name.json' do
  {
      :success => true,
      params[:name] => [
          {
              :foo_column => "foo 1 of #{params[:name]}",
              :bar_column => "bar 1 of #{params[:name]}",
              :baz_column => "baz 1 of #{params[:name]}",
          },
          {
              :foo_column => "foo 2 of #{params[:name]}",
              :bar_column => "bar 2 of #{params[:name]}",
              :baz_column => "baz 2 of #{params[:name]}",
          },
          {
              :foo_column => "foo 3 of #{params[:name]}",
              :bar_column => "bar 3 of #{params[:name]}",
              :baz_column => "baz 3 of #{params[:name]}",
          }
      ]
  }.to_json
end