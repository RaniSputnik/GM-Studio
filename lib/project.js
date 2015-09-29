var xml2js = require('xml2js');
var path = require('path');
var fs = require('fs');
var q = require('q');

var Script = require('./script');
var Group = require('./group');

var Project = function(filePath){
	this.filePath = filePath;
};

Project.prototype.reload = function(){
	var that = this;
	var deferred = q.defer();
	that.filePath = path.resolve(that.filePath);
	if (that.filePath.indexOf('.project.gmx') < 0) {
		// If the file path is a directory then we want to
		// find the project file, so search for it then attempt
		// reload again
		fs.readdir(that.filePath, function(err, files){
			if (err) return deferred.reject(err);
			var found = false;
			for (var i = 0; i < files.length; i++){
				var file = files[i];
				if (file.indexOf('.project.gmx') > -1){
					that.filePath = path.join(that.filePath, file);
					found = true;
					break;
				}
			}
			if (!found) {
				deferred.reject(new Error("Directory "+this.filePath+" does not contain a *.project.gmx file"));
			} else {
				statFilePath();
			}
		});
	} else {
		statFilePath();
	}

	function statFilePath(){
		// If the file path contains a .project.gmx
		fs.readFile(that.filePath, function (err, xml) {
			if (err) return deferred.reject(err);
			xml2js.parseString(xml, function (err, doc) {
			    if (err) return deferred.reject(err);
			    that.document = doc;
			    deferred.resolve(that);
			});
		});
	}
	return deferred.promise;
}

Project.prototype.scripts = function(){
	var that = this;
	var scripts = this.document.assets.scripts[0];
	var allScripts = [];
	function readScriptGroup(outerGroupXML, outerGroup){
		outerGroupXML.forEach(function(innerGroup){
			var groupName = innerGroup.$.name;
			var group = new Group(that, Script, groupName);
			outerGroup? outerGroup.addGroup(group) : allScripts.push(group);
			
			if (innerGroup.script) {
				innerGroup.script.forEach(function(script){
					group.addAsset(new Script(script));
				});
			}
			if (innerGroup.scripts) {
				readScriptGroup(innerGroup.scripts, group);
			}
		});
	}
	readScriptGroup(scripts.scripts);
	
	return allScripts;
}

module.exports = Project;