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

Security based on OAuth2 credentials

* Log management



Starting QLog
-------------

# First time:

<pre><code>node qlog/main -env=pro -port=80 -defusr=admin -defpwd=[YOUR_PASSWORD]</code></pre>


# Following times:

<pre><code>node qlog/main -env=pro -port=80</code></pre>



