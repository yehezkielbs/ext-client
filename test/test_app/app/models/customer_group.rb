class CustomerGroup < ActiveRecord::Base
  has_many :customers
end