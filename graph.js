// Code goes here

var graph = {
  "nodes": [
    {"id": "0", "group": 0},
    {"id": "1", "group": 1},
    {"id": "2", "group": 1},
    {"id": "3", "group": 1},
    {"id": "4", "group": 1},
    {"id": "5", "group": 1},
    {"id": "6", "group": 1},
    {"id": "7", "group": 2},
    {"id": "8", "group": 2},
    {"id": "9", "group": 2},
  ],
  "links": [
    {"source": "1", "target": "2", "value": 1},
    {"source": "2", "target": "3", "value": 1},
    {"source": "3", "target": "1", "value": 1},
    {"source": "4", "target": "1", "value": 1},
    {"source": "5", "target": "2", "value": 1},
    {"source": "6", "target": "3", "value": 1},
    {"source": "7", "target": "8", "value": 1},
    {"source": "8", "target": "9", "value": 1},
    {"source": "9", "target": "7", "value": 1},
    {"source": "9", "target": "1", "value": 1},
  ]
};

var color = d3.scaleOrdinal(d3.schemeCategory20);

window.onload = () => {

  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  //###############################################
  // Render
  //###############################################
  
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
  
  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
            .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
  
  //###############################################
  // simulations
  //###############################################
    
  var simulation = d3.forceSimulation();
  
  // bind / hold together
  simulation.force("link", d3.forceLink()
    .id(function(d) { return d.id; })
    .distance(25)
    .strength(1)
  )
  
  // magnetic repel
  simulation.force("charge", d3.forceManyBody()
    .strength(function(d) { return d.charge || -50; })
  )
  
  // touch repel
  simulation.force("colide", d3.forceCollide()
    .radius(10)
    .strength(1)
  )
  
  // center gravit
  simulation
    .force("centerX", d3.forceX(width / 2).strength(0.05))
    .force("centerY", d3.forceY(height / 2).strength(0.05));

  simulation.nodes(graph.nodes).on("tick", ticked);
  simulation.force("link").links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    
  }
  
  
  //###############################################
  // Interactions
  //###############################################
  
  
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

}

