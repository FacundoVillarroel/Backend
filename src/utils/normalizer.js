// asi me viene el objeto para normalizar, no se cambiar ese _id para que no me tire error en normalizr
const messagesList = {
  id:1,
  messages:
  [
  {
    _id: new ObjectId("62c347d9ba4b3408ec1df326"),
    author: {
      email: 'facu.villarroel96@gmail.com',
      name: 'Facundo',
      surname: 'Villarroel',
      age: 25,
      alias: 'Fakuvilla',
      avatar: 'https://i.pinimg.com/originals/e9/57/2a/e9572a70726980ed5445c02e1058760b.png'
    },
    text: 'Probando Mensajes',
    timeStamp: '05/06/2022 20:52:51',
    __v: 0
  },
  {
    _id: new ObjectId("62c34817ba4b3408ec1df32b"),
    author: {
      email: 'emailFalso123@gmail.com',
      name: 'Emanuel',
      surname: 'Bressan',
      age: 31,
      alias: 'EmaBressan',
      avatar: 'https://i.pinimg.com/564x/64/3e/fe/643efe51394d635cbf544a25088ee269.jpg'
    },
    text: 'Otro mensaje !',
    timeStamp: '05/06/2022 20:54:27',
    __v: 0
  },
  {
    _id: new ObjectId("62c343df0b7a497a53790a36"),
    author: {
      email: 'facu.villarroel96@gmail.com',
      name: 'Facundo',
      surname: 'Villarroel',
      age: 25,
      alias: 'Fakuvilla',
      avatar: 'https://i.pinimg.com/originals/e9/57/2a/e9572a70726980ed5445c02e1058760b.png'
    },
    text: 'Va queriendo funcionar!',
    timeStamp: '05/06/2022 21:47:43',
    __v: 0
  },
  {
    _id: new ObjectId("62c344240b7a497a53790a38"),
    author: {
      email: 'email@gmail.com',
      name: 'Victoria',
      surname: 'Palma',
      age: 28,
      alias: 'Vicky',
      avatar: 'https://i.pinimg.com/564x/ed/be/19/edbe19b1fd4866b2d458aaabf8c02073.jpg'
    },
    text: 'Vamoooo',
    timeStamp: '05/06/2022 21:48:52',
    __v: 0
  },
  {
    _id: new ObjectId("62c3443b0b7a497a53790a3a"),
    author: {
      email: 'email@gmail.com',
      name: 'Victoria',
      surname: 'Palma',
      age: 28,
      alias: 'Vicky',
      avatar: 'https://i.pinimg.com/564x/ed/be/19/edbe19b1fd4866b2d458aaabf8c02073.jpg'
    },
    text: 'esta funcionando',
    timeStamp: '05/06/2022 21:49:15',
    __v: 0
  }
]
} 
const util = require('util');
function print(objeto) {console.log(util.inspect(objeto,false,12,true))}
const norm = require ("normalizr");

const authorSchema = new norm.schema.Entity("authors",{},{idAttribute:"email"})
const messageSchema = new norm.schema.Entity("messages",{
  author:authorSchema
})
const messagesListSchema = new norm.schema.Entity("messagesList",{
  messages: [messageSchema]
})

const normalizado = norm.normalize(messagesList, messagesListSchema)
const desnormalizado = norm.denormalize(normalizado, messagesListSchema, normalizado.entities)

//console.log(JSON.stringify(normalizado).length);
//console.log(JSON.stringify(mensajes).length);

print(normalizado)
print(desnormalizado)
