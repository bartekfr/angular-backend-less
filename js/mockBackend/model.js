angular.module('mockBackend').service('Model', function () {
	//service mocks backend model and database
	this.data = [
		{
			id: 0,
			name: "Bartek",
			surname: "Kowalski1",
			birthDate: 133999200000,
			mobile: '1234567',
			address: {
				city: "poznań",
				street: "warszawska",
				number: 33
			}
		},
		{
			id: 1,
			name: "Anna",
			surname: "Nowak",
			birthDate: 454975200000,
			mobile: '445698',
			address: {
				city: "Gdansk",
				street: "warszawska",
				number: 11
			}
		},
		{
			id: 2,
			name: "Jonasz",
			surname: "Kura",
			birthDate: 55116000000,
			mobile: 1234568,
			address: {
				city: "Kraków",
				street: "warszawska",
				number: 33
			}
		},
		{
			id: 3,
			name: "Anabela",
			surname: "Wodzinska",
			birthDate: 193116000000,
			mobile: 1454568,
			address: {
				city: "Szczecin",
				street: "Pomorska",
				number: 123
			}
		}
	];

	this.getData = function() {
		return this.data;
	};

	this.findAll = function(ids) {
		if (typeof ids === "undefined") {
			return this.getData();
		}
		var idsLength = ids.length;
		var list = this.getData().filter(function(element, index) {
			for(var i = 0; i < idsLength; i++) {
				if (element.id == ids[i]) {
					return true;
				}
			}
		});
		return list;
	};

	this.find = function(id) {
		var ids = [id];
		var list = this.findAll(ids);
		// even if list contains multiple items, just return first one
		return list[0];
	};

	this.edit = function(id, data) {
		var items = this.getData();
		var match = null;
		for (var  i = 0; i < items.length; i++) {
			if (items[i].id == id) {
				match = items[i];
				break;
			}
		}
		updated = angular.extend(match, JSON.parse(data));
		return updated;
	};

	this.remove = function(id) {
		var items = this.getData();
		var match = false;
		for (var i = 0; i < items.length; i++) {
			if(items[i].id == id) {
				match = items.splice(i, 1);
				break;
			}
		}
		return match[0];
	};
});