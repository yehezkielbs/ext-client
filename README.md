How to play
===========

Required: Ruby 1.9, Rubygems, git

If you don't have Ruby & Rubygems installed, the easiest way to install using rvm. Please have a look http://beginrescueend.com/rvm/install/

Assuming you have all the requirements ready, then you can prepare the project:

* git clone git@bitbucket.org:yehezkielbs/ext-client.git
* cd ext-client/test
* sudo gem install bundler
* bundle install
* bundle exec rake jshint # to run JSHint check
* cd ext-client/test/test_app
* bundle exec rails s # to start the test web server

You can then go to http://localhost:3000 to play with the app.
