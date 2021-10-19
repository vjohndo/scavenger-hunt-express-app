// Middleware if you put it before app.use(express)
// No matter which route you hit, this code will run (depeneding on where you have it in the code)
// Useful for securing the login 

const middleware = (req, res, next) => {
    // I want to log things
    console.log('Middleware is working!');
    
    // Checks query and if exit is true, return  
    if (req.query?.exit === "true") {
      res.json({ exitEarly: true })
      return;
    }
  
    // Runs the appropriate "next line"
    next();
};

module.exports = middleware;