var chai = require('chai');
var expect = chai.expect;
const DBManager = require('../index.js');
const ProjectTrx = DBManager.ProjectTrx;
const psqlConfig = {
  hostname: 'wacloud',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'wisepaas'
}

DBManager.init(psqlConfig);


describe('Project models', function () {
  describe('Create Project', function () {
    let project = {
      projectId: 'd1b1f072-692d-eb61-4957',
      description: 'seafood'
		};
    it('get Project', function (done) {
			ProjectTrx.getProject(project.projectId).then((res) => {
				expect(res).to.be.a('null');
				done();
			});
		});
		it('create Project', function(done) {
			ProjectTrx.insertProject(project).then((res) => {
				expect(res.dataValues).to.deep.equal(project);
				done();
			});
		});
	});
});