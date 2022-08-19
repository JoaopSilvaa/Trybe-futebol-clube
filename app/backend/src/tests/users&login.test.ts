import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users & Login', () => {
  
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 0,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('should returns token', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
    
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('token')
  });

  it('should returns role ', async () => {
    const response = await chai.request(app)
      .get('/login/validate')
      .set( 
      { 
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjYwODI5OTkyLCJleHAiOjE2NjE0MzQ3OTJ9.iw46m3Z5y8bHKOSL50Qwan6g4djFRYNSODtkvNAdb9E'
      }
      )

    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('role').include('admin');
  });
});
