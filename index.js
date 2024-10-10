const express = require('express');

const server = express();

const recipesRouter = require('./api/recipes-router');


server.use(express.json());
server.use('/api/recipes', recipesRouter); // 

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
