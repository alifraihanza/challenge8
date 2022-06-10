module.exports = {
    index: (req, res) => {
      // res..render("login");
      res.render("index");
    },
    greet: (req, res) => {
      const name = req.query.name;
      res.render("home/greet", { name });
    },
  };
  
  