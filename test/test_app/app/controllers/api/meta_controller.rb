module Api
  class MetaController < ::ApplicationController
    def resources
      class_names = []
      filenames = Dir.glob(Rails.root.join('app/models/**/*.rb'))
      filenames.each do |filename|
        class_names += File.read(filename).scan(/class ([\w\d_\-:]+)/).flatten
      end

      result = class_names.map do |class_name|
        {
            :text => class_name.tableize.titleize,
            :model => class_name,
            :leaf => true,
            :uri => class_name.tableize
        }
      end

      render(:json => result)
    end

    def reflection
      model_class_name = params[:name].classify
      model_class = model_class_name.constantize
      result = {
          :fields => model_class.columns.map do |field|
            {
                :text => field.name.titleize,
                :name => field.name,
                :type => field.type,
                :scale => field.scale,
                :precision => field.precision
            }
          end,
          :validations => [
              {
                  :field => 'name',
                  :type => 'presence'
              }
          ],
          :belongs_to => model_class.reflect_on_all_associations(:belongs_to).map do |association|
            {
                :model => association.class_name,
                :name => association.name,
                :foreign_key => association.association_foreign_key
            }
          end,
          :has_many => model_class.reflect_on_all_associations(:has_many).map do |association|
            {
                :model => association.class_name,
                :name => association.name,
                :foreign_key => model_class_name.foreign_key
            }
          end
      }
      render(:json => result)
    end
  end
end