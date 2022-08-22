import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
import Match from '../database/models/match';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  
  before(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves([
        { id: 0, teamName: 'Barcelona' },
        { id: 1, teamName: 'Brasil' },
        { id: 2, teamName: 'Flamengo' }
      ] as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('should return leaderboard', async () => {
    const response = await chai.request(app)
      .get('/leaderboard')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(3);
  });

  it('should return leaderboard home', async () => {
    const response = await chai.request(app)
      .get('/leaderboard/home')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(3);
  });

  it('should return leaderboard', async () => {
    const response = await chai.request(app)
      .get('/leaderboard/away')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(3);
  });

});
