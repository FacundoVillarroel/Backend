const FirebaseContainer = require("../../containers/FirebaseContainer.js");
const normalizr = require ("normalizr");
const messagesListSchema = require("../../utils/normalizrSchemas") 

class DaoFirebaseMessages extends FirebaseContainer {
  constructor() {
    super("messages");
  }


  async save(item) {
    let idCounter = 7;
    item.id = idCounter;
    const messageToAdd = this.query.doc(`${idCounter}`);
    await messageToAdd.create(item)
  }

  async getAll(){
    let allMessages = [];
    const snapshot = (await this.query.get());
    snapshot.forEach( doc => {
      allMessages.push(doc.data());
    }
    )
    return allMessages;
  }

  async normalize(){
    const messages = await this.getAll();
    const messagesToNormalize = {
      id:1,
      messages:messages
    }

    const normalized = normalizr.normalize(messagesToNormalize, messagesListSchema)

    return normalized
  }

}


  module.exports = DaoFirebaseMessages;