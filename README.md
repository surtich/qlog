qlog
====

Log system deferred driven by amqp written in NodeJS


Roles:
------

# Administrator:

Security based on user/pass

* Users management
* Apps management


# User:

Security based on user/pass

* Apps management
* Log management


#App:

Security based on uri+credentials access

* Log management


Installing QLog
----------------

* Install NodeJS [http://nodejs.org]
* Install NPM [https://npmjs.org]
* Install Redis [http://redis.io/download]
* Install MongoDB [http://www.mongodb.org/downloads]
* Download, fork or clone qlog github repository [https://github.com/jdacruz/qlog.git]


Starting QLog
-------------

# First time or rewrite admin credentials:

<pre><code>node qlog/main --env=pro --port=3001 --user_email=admin@domain.com --user_pwd=[YOUR_ADMIN_PASSWORD]</code></pre>


# Following times:

<pre><code>node qlog/main --env=pro --port=3001</code></pre>


Setting up QLog
---------------

All instructions are using localhost:3001 by default, you would have to change it if you start the server in other host or port.

* Go to: http://localhost:3001
* Enter the Administration credentials (the same that you used when started the app)
* Create an user and save the password in any comfortable place but secure
* Create an user app to bring read and write access credentials for logs
* Now you can sign out


First Steps
-----------

* Enter the recently created user and password
* You must see the app list with your application
* Select your application to show the log stack
* Now you can send your first message to QLog

# Basic Test:

<pre><code>node qlog/test --env=pro --port=3001 --appId=[QLOG_APP_ID] --message=[TEST_MESSAGE]</code></pre>


# Integrated Test:

## Using NodeJS

* You have a NodeJS QLog client in the following folder of repository [/clients/nodejs/]


## Using Java

* You have a NodeJS QLog client in the following folder of repository [/clients/java/]





