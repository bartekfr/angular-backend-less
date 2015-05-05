describe('mockBackend Model', function() {

	var mockModel;
	var data;

	beforeEach(module('mockBackend'));

	beforeEach(inject(function(Model) {
		mockModel = Model;
		data = mockModel.getData();
	}));

	it('findAll return all items', function() {
		var res = mockModel.findAll();
		expect(res).toEqual(data);
	});

	it('findAll with params return only some items', function() {
		var res = mockModel.findAll([1]);
		expect(res.length).toEqual(1);
	});

	it('find returns specific item', function() {
		var res = mockModel.find(2);
		expect(res.id).toEqual(2);
		expect(res).toEqual(data[2]);
		res = mockModel.find(0);
		expect(res.id).toEqual(0);
		expect(res).toEqual(data[0]);
	});

	it('edit updates item', function() {
		var res = mockModel.edit(1, JSON.stringify({
			name: 'Anna Nowa',
			surname: 'Nowak Nowa'
		}));
		var res = mockModel.find(1);
		expect(res.name).toEqual('Anna Nowa');
		expect(res.surname).toEqual('Nowak Nowa');
	});

	it('remove removes item', function() {
		mockModel.remove(0);
		mockModel.remove(1);
		var res = mockModel.findAll();
		expect(res.length).toEqual(2);
		expect(res[0].id).toEqual(2);
	});
});





