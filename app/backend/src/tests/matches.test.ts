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
      ] as Match[]);
    sinon
      .stub(Match, 'create')
      .resolves(
        { id: 3,
          homeTeam: 2,
          homeTeamGoals: 7,
          awayTeam: 1,
          awayTeamGoals: 1,
          inProgress: true
        } as Match); 
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
  })

  it('should return matches', async () => {
    const response = await chai.request(app)
      .get('/matches')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(2);
  });


  // it('create a match', async () => {
  //   const response = await chai.request(app)
  //     .post('/matches')
  //     .set(
  //       { 
  //         authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjYwODI5OTkyLCJleHAiOjE2NjE0MzQ3OTJ9.iw46m3Z5y8bHKOSL50Qwan6g4djFRYNSODtkvNAdb9E'
  //       }
  //     )
  //     .send({
  //       homeTeam: 2,
  //       homeTeamGoals: 7,
  //       awayTeam: 1,
  //       awayTeamGoals: 1,
  //     })
    
  //   expect(response.status).to.equal(201);
  //   expect(response.body).to.haveOwnProperty('id').include(3);
  // });
});
