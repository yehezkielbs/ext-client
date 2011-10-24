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
          :title => 'Foo Column',
          :name => 'foo_column',
          :type => 'string'
      },
      {
          :title => 'Bar Column',
          :name => 'bar_column',
          :type => 'string'
      },
      {
          :title => 'Baz Column',
          :name => 'baz_column',
          :type => 'string'
      }
  ].to_json
end

get '/api/:name.json' do
  {
      :success => true,
      :foos => [
          {
              :foo_column => 'foo 1',
              :bar_column => 'bar 1',
              :baz_column => 'baz 1',
          },
          {
              :foo_column => 'foo 2',
              :bar_column => 'bar 2',
              :baz_column => 'baz 2',
          },
          {
              :foo_column => 'foo 3',
              :bar_column => 'bar 3',
              :baz_column => 'baz 3',
          }
      ]
  }.to_json
end