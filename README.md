How to play
===========

Required: Ruby 1.9, Rubygems, git

If you don't have Ruby & Rubygems installed, the easiest way to install using rvm. Please have a look http://beginrescueend.com/rvm/install/

Assuming you have all the requirements ready, then you can prepare the project:

* git clone git://github.com/yehezkielbs/ext-client.git # OR # git clone git@bitbucket.org:yehezkielbs/ext-client.git
* cd ext-client/test
* sudo gem install bundler
* bundle install
* bundle exec rake jshint # to run JSHint check
* cd test_app
* bundle exec rake db:create # to create the db
* bundle exec rake db:migrate # to create the tables
* bundle exec rails s # to start the test web server

You can then go to http://localhost:3000 to play with the app.
