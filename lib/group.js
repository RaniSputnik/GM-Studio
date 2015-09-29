var assert = require('assert');

var Group = function(project, assetType, name){
	assert(project, "Group must be provided a project");
	assert(assetType, "Group must be given a type");
	this.project = project;
	this.type = assetType;
	this.name = name;// || project.autoName();
	this._assets = [];
};

Group.prototype.addAsset = function(asset){
	assert(asset instanceof this.type, "Asset type does not match the type of this group");
	if (this._assets.indexOf(asset) < 0) {
		this._assets.push(asset);
	}
};

Group.prototype.addAssets = function(assets){
	if (!Array.isArray(assets)) assets = [assets];
	for (var i = 0, n = assets.length; i < assets.length; i++) {
		this.addAsset(assets[i]);
	}
};

Group.prototype.addGroup = function(group){
	assert(group instanceof Group, "Not a valid group");
	assert(group.type == this.type, "Can not add a group of a different type");
	if (this._assets.indexOf(group) < 0) {
		this._assets.push(group);
	}
};

Group.prototype.assets = function(){
	var that = this;
	return that._assets.filter(function(asset){
		return asset instanceof that.type;
	})
};

Group.prototype.groups = function(){
	var that = this;
	return that._assets.filter(function(group){
		return group instanceof Group;
	});
};

module.exports = Group;