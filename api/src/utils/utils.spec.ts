import { Item } from './interfaces/collection.interface';
import { getCollection, getItem, paginate } from './utils';

type Clients = Array<Client>;
interface Client extends Item {
  name?: string;
}

describe('Utils:', () => {
  let clients: Clients;

  beforeEach(() => {
    clients = [
      { id: '1', name: 'Alvaro' },
      { id: '2', name: 'Mario' },
      { id: '3', name: 'Gabriel' },
      { id: '4', name: 'Gabriel Pato' },
      { id: '5', name: 'Gabriel Cachorro' },
    ];
  });

  describe('function paginate:', () => {
    it('should return the same item if pageSize is empty', () => {
      expect(paginate(clients)).toEqual(clients);
    });

    it('should paginate the item', () => {
      expect(paginate(clients, 2, 2)).toEqual([
        { id: '3', name: 'Gabriel' },
        { id: '4', name: 'Gabriel Pato' },
      ]);
    });
  });

  it('getItem should find a item', () => {
    expect(getItem('2', clients)).toEqual({ id: '2', name: 'Mario' });
  });

  describe('function getCollection:', () => {
    it('should return a collection with filter', () => {
      const result = {
        hasNext: true,
        items: [
          { id: '3', name: 'Gabriel' },
          { id: '4', name: 'Gabriel Pato' },
        ],
      };
      expect(getCollection(clients, 'Gabriel', '1', '2')).toEqual(result);
    });

    it('should return a collection without filter', () => {
      const result = {
        hasNext: true,
        items: [
          { id: '1', name: 'Alvaro' },
          { id: '2', name: 'Mario' },
        ],
      };
      expect(getCollection(clients, undefined, '1', '2')).toEqual(result);
    });
  });
});
