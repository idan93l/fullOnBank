const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/userRouter')

//
// const cors = require('cors');
// const path = require('path');
//

const app = express();

// const port = process.env.PORT || 8080;
const port = 8080;

// const publicPath = path.join(__dirname, 'build');
// app.use(cors());
// app.use(express.static(publicPath));

app.use(express.json());

app.use('/users',userRouter)

//
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });
//

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});