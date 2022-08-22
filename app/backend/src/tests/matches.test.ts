import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  
  before(async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves([
        { id: 0,
          homeTeam: 0,
          homeTeamGoals: 3,
          awayTeam: 1,
          awayTeamGoals: 2,
          inProgress: false
        },
        { id: 1,
          homeTeam: 1,
          homeTeamGoals: 7,
          awayTeam: 2,
          awayTeamGoals: 1,
          inProgress: false
        },
        { id: 3,
          homeTeam: 2,
          homeTeamGoals: 7,
          awayTeam: 1,
          awayTeamGoals: 1,
          inProgress: true
        }, 
      ] as Match[]);
    sinon
      .stub(Match, 'update')
      .resolves();
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
  })

  it('should return matches', async () => {
    const response = await chai.request(app)
      .get('/matches')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(3);
  });

  it('update a match', async () => {
    const response = await chai.request(app)
      .patch('/matches/3')
      .send(
        {
          "homeTeamGoals": 7,
          "awayTeamGoals": 7
        }
      )
    
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('message').include('GOOOOOOOOL');
  });

  it('finish a match', async () => {
    const response = await chai.request(app)
      .patch('/matches/3/finish')
    
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('message').include('Finished');
  });
});

describe('Matches by term', () => {
  before(async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves([
        { id: 3,
          homeTeam: 2,
          homeTeamGoals: 7,
          awayTeam: 1,
          awayTeamGoals: 1,
          inProgress: true
        }, 
      ] as Match[]);
  });
  
  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })
  
  it('should return matches by term', async () => {
    const response = await chai.request(app)
      .get('/matches?inProgress=true')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(1);
    expect(response.body[0]).to.haveOwnProperty('id').equal(3);
  });
});

