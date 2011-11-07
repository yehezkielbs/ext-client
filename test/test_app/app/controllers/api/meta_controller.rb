module Api
  class MetaController < ::ApplicationController
    def resources
      class_names = []
      filenames = Dir.glob(Rails.application.paths.app.models.collect { |path| File.join(path, "**/*.rb") })
      filenames.each do |filename|
        class_names += File.read(filename).scan(/class ([\w\d_\-:]+)/).flatten
      end

      result = class_names.map do |class_name|
        {
            :text => class_name.humanize,
            :leaf => true,
            :uri => class_name.tableize
        }
      end

      render(:json => result)
    end

    def fields
      class_name = params[:name].classify
      fields = class_name.constantize.columns
      result = fields.map do |field|
        {
            :title => field.name.humanize,
            :name => field.name,
            :type => field.type
        }
      end
      render(:json => result)
    end
  end
end