import d3 from 'd3'

// Code goes here

var graph = {
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
    {"source": 1, "target": 2, "value": 1},
    {"source": 2, "target": 3, "value": 1},
    {"source": 3, "target": 1, "value": 1},
    {"source": 4, "target": 1, "value": 1},
    {"source": 5, "target": 2, "value": 1},
    {"source": 6, "target": 3, "value": 1},
    {"source": 7, "target": 8, "value": 1},
    {"source": 8, "target": 9, "value": 1},
    {"source": 9, "target": 7, "value": 1},
    {"source": 9, "target": 1, "value": 1},
  ]
};



let color = d3.scaleOrdinal(d3.schemeCategory20);

//###############################################
// simulations
//###############################################
var Simulation = function(svg) {
  
  let width = +svg.attr("width"),
      height = +svg.attr("height");
  
  let simulation = d3.forceSimulation();
  
  // bind / hold together
  simulation.force("link", d3.forceLink()
    .id(function(d) { return d.id; })
    .distance(40)
    .strength(1)
  )
  
  // magnetic repel
  simulation.force("charge", d3.forceManyBody()
    .strength(function(d) { return d.charge || -50; })
  )
  
  // touch repel
  simulation.force("collide", d3.forceCollide()
    .radius((d) => d.r)
    .strength(1)
  )
  
  // center gravity
  simulation
    .force("centerX", d3.forceX(width / 2).strength(0.05))
    .force("centerY", d3.forceY(height / 2).strength(0.05));
  
  simulation.alphaTarget(0);
  
  return simulation
  
}

function ticked(link, node) {
  
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
	  .style("transform", (d) => `translate3d(${d.x}px,${d.y}px, 0px)`)
  
}

var Render = function(data, svg, simulation, tick){
  
let t = d3.transition().duration(1).delay(1);
  
  // links
  svg.append("g").attr("id","links");
      
  // Nodes
  svg.append("g").attr("id","nodes");
  
  //###############################################
  // Render
  //###############################################
  let update = function() {
  
    // Link
    let link = svg.selectAll("#links")
      .selectAll("line")
      .data(data.links);
       
    link.exit()
      .attr("class", "exit")
      .style("opacity", 0)
        .remove();
    
    link.attr("class", "update")
		.style("opacity", 1);
    
    let link_enter = link.enter()
      .append("line")
        .attr("class", "enter")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
		.style("stroke-opacity", 0.6)
    
    link = link_enter.merge(link);
    
        
    // Node
    let node = svg.selectAll("#nodes")
      .selectAll("circle")
      .data(data.nodes, (d) => d.id)
    
    node.exit()
      .attr("class", "exit")
      .style("opacity", 0)
        .remove();
    
    node.attr("class", "update")
      .style("r", (d) => d.r)
    
    let node_enter = node.enter()
      .append("circle")
        .attr("class", "enter")
        .attr("fill", (d) => color(d.group));
	
	// 
	setTimeout(((n) => {
		n.style("r", (d) => d.r).style("opacity", 1);
	})(node_enter),1);
		
	node = node_enter.merge(node);
	
	// events
	node.on("mouseenter", (d, idx, nodes) => enter.call(nodes[idx],d,simulation ))
	node.on("mouseleave", (d, idx, nodes) => leave.call(nodes[idx],d,simulation ))	
	
	node
        .call(d3.drag()
          .on("start", (d) => dragstarted(d,simulation))
          .on("drag", (d) => dragged(d,simulation))
          .on("end", (d) => dragended(d,simulation)))
      
      
           
    simulation.nodes(data.nodes).on("tick", () => tick(link,node));
    simulation.force("link").links(data.links);
    simulation.alpha(1).restart();
    
  }
  
  let id_seq = data.nodes.length;
  
  return {
    update: update,
    add: (coords) => {
      let id = id_seq ++; coords = coords || [0,0];
      data.nodes.push({"id": id, "group": 4, r:10, x:coords[0],y:coords[1] });
      update();
      return id;
    },
    remove: (id) => {
      var idx = _.findIndex(data.nodes, function(n) { return n.id === id; });
      let node = data.nodes.splice(idx,1);
      update();
      return node;
    }
  }

}



//###############################################
// Interactions
//###############################################

var renderer;
window.onload = () => {
  
  let svg = d3.select("svg"); 
  let simulation = Simulation(svg);

  renderer = Render(graph, svg, simulation, ticked);
  renderer.update();
  
  svg.on("click", function(e){
	  var coords = d3.mouse(this);
	  renderer.add(coords);
  });
  
  // setInterval(() => {
      // let id = renderer.add();
      // console.log("add", id);
      
      // setTimeout(() => {
        // let myid=id;
        // console.log(
          // myid,
          // renderer.remove(myid)
        // )
      // }, 2500);
      
  // }, 2000);

}

function dragstarted(d,simulation) {
  if (!d3.event.active){ 
	  simulation.alpha(0.01);
	  simulation.alphaTarget(0.1).restart();
  }
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d,simulation) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d,simulation) {
  if (!d3.event.active) {
	  simulation.alpha(1);
	  simulation.alphaTarget(0).restart();
  }
  d.fx = null;
  d.fy = null;
}

function enter(d,simulation) {
	d.r = d.r*1.5;
	renderer.update();
	
// 	d3.select(this).style("r", (d) => d.r)
  
// 	simulation.force("collide", 
// 	  d3.forcecollide()
// 		.radius((d) => d.r)
// 		.strength(1)
// 	)
	
	if (!d3.event.active){ 
	  simulation.alpha(0.1);
	  simulation.alphatarget(0.01).restart();
	}
	
}
function leave(d,simulation) {
	d.r = d.r/1.5; 	
	renderer.update();
	
// 	d3.select(this).style("r", (d) => d.r)
	
// 	simulation.force("collide", 
// 	  d3.forceCollide()
// 		.radius((d) => d.r)
// 		.strength(1)
// 	)
	  
	if (!d3.event.active) {
	  simulation.alpha(1);
	  simulation.alphaTarget(0).restart();
	}
	
}