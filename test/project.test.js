var studio = require("../index");
var should = require("should");

describe("GM:Studio Project", function() {
	describe("File reading", function() {
		it("should not find a missing file", function(done) {
			var project = new studio.Project('missingfile.gmx');
			project.reload().then(function() {
				done(new Error('Project reloading should fail, file does not exist'));
			}).fail(function(err){
				done();
			});
		});

		it("should load from the project file", function(done) {
			var project = new studio.Project('test/fixtures/Flox.gmx/Flox.project.gmx');
			project.reload().then(function(project){ 
				var scripts = project.scripts();
				scripts.length.should.be.exactly(2);
				scripts[0].assets().length.should.be.exactly(0);
				scripts[0].groups().length.should.be.exactly(7);
				done(); 
			}).fail(done);
		});

		it("should load from the project file", function(done) {
			var project = new studio.Project('test/fixtures/Flox.gmx');
			project.reload().then(function(project){ done(); }).fail(done);
		});
	});
});