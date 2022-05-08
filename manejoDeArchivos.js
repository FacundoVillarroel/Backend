let Contenedor = require ("./classConstructor")


const products = new Contenedor ("products.txt");

// PRODUCTS
const ConjuntoAlternativoBlanco = {
    title: 'Conjunto alternativo blanco',                                                                                                                                 
    price: 1400,                                                                                                                                     
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/projectofinalreactjs.appspot.com/o/conjuntoVarianteBlanco.jpeg?alt=media&token=e6a95478-f400-414f-b039-0dd987a32247'                                                                                                                                           
}
const PelotaKappaOriginal = {
    title:"Pelota de fútbol kappa original",
    price:800,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/projectofinalreactjs.appspot.com/o/ball4.png?alt=media&token=422ec7cd-83a9-4720-ba3c-b50bd178c505"
}
const buzo = {
    title: "Buzo",
    price: 1000,
    thumbnail:"https://firebasestorage.googleapis.com/v0/b/projectofinalreactjs.appspot.com/o/buzo.jpeg?alt=media&token=5703fe18-b50b-459f-9a51-98fe4cbb471c"
}

async function runProgram (){
    await products.prevContent()
    products.save(ConjuntoAlternativoBlanco)
    products.save(PelotaKappaOriginal)
    products.save(buzo)
    //products.getById(4)
    //products.getAll() 
    //products.deleteById(1)
    //products.deleteAll()
}
runProgram()