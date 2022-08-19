import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  
  before(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves([
        { id: 0, teamName: 'Barcelona' },
        { id: 1, teamName: 'Brasil' },
        { id: 2, teamName: 'Flamengo' }
      ] as Team[]);
    sinon
      .stub(Team, 'findByPk')
      .resolves({ id: 1, teamName: 'Brasil' } as Team);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('should return teams', async () => {
    const response = await chai.request(app)
      .get('/teams')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(3);
  });

  it('should return teams by id', async () => {
    const response = await chai.request(app)
    .get('/teams/1')

    expect(response.status).to.equal(200);   
    expect(response.body).to.haveOwnProperty('teamName').include('Brasil');
  });
});
