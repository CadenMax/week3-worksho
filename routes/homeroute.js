// routes/homeroute.js
module.exports.route = (app, path) => {
    const users = [
      { username: 'frodo@lotr.com', password: '123' , name: 'Frodo Baggins' },
      { username: 'gandalf@lotr.com', password: '123', name: 'Gandalf the Grey' },
      { username: 'legolas@lotr.com', password: '123', name: 'Legolas Greenleaf' }
    ];
  
    app.get('/', function(req, res) {
        let filepath = path.resolve('./www/index.html');
        res.sendFile(filepath);
      });

    app.get('/get-user', isAuthenticated, function(req, res) {
        if (req.session.user) {
            res.json({ user: req.session.user });
        } else {
            res.status(401).json({ error: 'User not authenticated' });
        }
    });
    
      app.post('/login', function(req, res) {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);
    
        if (user) {
          req.session.user = user; // Save user to session, including name
          res.json({ valid: true });
        } else {
          res.json({ valid: false });
        }
      });
    
      // Middleware to check if user is authenticated
      function isAuthenticated(req, res, next) {
        if (req.session.user) {
          return next();
        } else {
          res.redirect('/');
        }
      }
    
      // Account page route, accessible only if logged in
      app.get('/account', isAuthenticated, function(req, res) {
        let filepath = path.resolve('./www/account.html');
        res.sendFile(filepath);
      });
    
      // Logout route
      app.get('/logout', function(req, res) {
        req.session.destroy(err => {
          if (err) {
            return res.redirect('/account');
          }
          res.clearCookie('connect.sid');
          res.redirect('/');
        });
      });
    };
  