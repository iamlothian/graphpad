
export default {
  "nodes": [
    {"id": 0, "group": 0, r:10},
    {"id": 1, "group": 1, r:10},
    {"id": 2, "group": 1, r:10},
    {"id": 3, "group": 1, r:10},
    {"id": 4, "group": 1, r:10},
    {"id": 5, "group": 1, r:10},
    {"id": 6, "group": 1, r:10},
    {"id": 7, "group": 2, r:10},
    {"id": 8, "group": 2, r:10},
    {"id": 9, "group": 2, r:10},
  ],
  "links": [
    {"source": 1, "target": 2, "strength": 1},
    {"source": 2, "target": 3, "strength": 1},
    {"source": 3, "target": 1, "strength": 1},
    {"source": 4, "target": 1, "strength": 1},
    {"source": 5, "target": 2, "strength": 1},
    {"source": 6, "target": 3, "strength": 1},
    {"source": 7, "target": 8, "strength": 1},
    {"source": 8, "target": 9, "strength": 1},
    {"source": 9, "target": 7, "strength": 1},
    {"source": 9, "target": 1, "strength": 1},
  ]
};