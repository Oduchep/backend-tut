import { MongoClient } from 'mongodb';

const localURL = 'mongodb://localhost:27017/bookstore';
const hostedURL =
  'mongodb+srv://oduchep:<password>@cluster0.qd5fpl3.mongodb.net/';

let dbConnection;

const Db = {
  connectToDb: (cb) => {
    MongoClient.connect(localURL)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};

export default Db;
