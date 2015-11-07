var express = require('express');
var hbs = require('hbs');
var path = require('path');
var logger = require('morgan');

// Routes
var index = require('./routes/index');

// Create the express instance
var app = express();

// Add Handlebars templating engine
app.engine('hbs', hbs.__express);
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

// Routing
app.use('/', index);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : null
  });
});

var port = process.env.PORT || 8080;
app.listen(port);
