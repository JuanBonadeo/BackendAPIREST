import chai from 'chai';
import supertest from 'supertest';
const expect = chai.expect;
const requester = supertest('http://localhost:8080');


describe('test usuarios' , () => {
    let cookie
    let currentUser
    it(" POST /sessions/register crear un usuario", async () => {
        const MockUser = {
            email: "tetsingUser@gmial.com",
            password: "1234"
        }
        const {_body} = await requester.post('/sessions/register').send(MockUser)
    }).timeout(10000)
    it("POST /sessions/login loguear a un usuario", async () => { 
        const MockUser = {
            email: "juancruzbonadeo04@gmail.com",
            password: "1234"
        }
        const res = await requester.post('/sessions/login').send(MockUser)
        const cookieResult = res.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
          };
    }).timeout(10000)
    it("GET sessions/current obtiene datos del usuario logueado", async () => {
        const result = await requester
          .get("/sessions/current")
          .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        currentUser=result.body;
       
        expect(result.body).to.have.all.keys('email','cart','role');
        
        expect(result.body).to.be.ok;
      }).timeout(10000);

    it("POST /sessions/logout desloguear a un usuario", async () => {
        const res = await requester.post('/sessions/logout').set("Cookie", [`${cookie.name}=${cookie.value}`])
        expect(res.status).to.be.equal(200)
    }).timeout(10000)

  
}); 

describe("test products", async () => {
    it("GET /products/ obtiene todos los productos", async () => {
        const res = await requester.get('/products/')
        expect(res.status).to.be.equal(200)
    }).timeout(10000)
    
    it("GET /products/:id obtiene un producto por id", async () => {
        const id = '64ff1059bd6317b3e3d3d493'
        const res = await requester.get('/products/'+ id)
        expect(res.status).to.be.equal(200)
    }).timeout(10000)

});

