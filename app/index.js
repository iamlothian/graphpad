import * as d3 from 'd3';
import graph from './data.js';
import {GraphSimulationManager} from "!ts-loader!./simulation.ts";
import {fabric} from 'fabric';
// Code goes here

let color = d3.scaleOrdinal(d3.schemeCategory20);

var Render = function(data, svg, simulationManager, tick){
  
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
        .attr("stroke-width", 2)
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
	// node.on("mouseenter", (d, idx, nodes) => enter.call(nodes[idx],d,simulation ))
	// node.on("mouseleave", (d, idx, nodes) => leave.call(nodes[idx],d,simulation ))	
	
	// node
  //       .call(d3.drag()
  //         .on("start", (d) => dragstarted(d,simulation))
  //         .on("drag", (d) => dragged(d,simulation))
  //         .on("end", (d) => dragended(d,simulation)))
      
      
    simulationManager.apply(data.nodes, node, data.links, link);

    // simulation.nodes(data.nodes).on("tick", () => tick(link,node));
    // simulation.force("link").links(data.links);
    // simulation.alpha(1).restart();
    
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
  
  initCanvas();
  initSVG();

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
	
	if (!d3.event.active){ 
	  simulation.alpha(0.1);
	  simulation.alphaTarget(0.01).restart();
	}
	
}
function leave(d,simulation) {
	d.r = d.r/1.5; 	
	renderer.update();

	if (!d3.event.active) {
	  simulation.alpha(1);
	  simulation.alphaTarget(0).restart();
	}
	
}

let initSVG = function(){

  let svg = d3.select("svg"); 
  let width = +svg.attr("width"),
      height = +svg.attr("height");
  //let simulation = Simulation(svg);
  let simulationManager = new GraphSimulationManager(width,height);

  renderer = Render(graph, svg, simulationManager);
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

let initCanvas =  function() {

  var canvas = new fabric.Canvas('c', {backgroundColor : '#EEE'});


  var rect = new fabric.Rect({
      top : 0,
      left : 0,
      width : 100,
      height : 100,
      fill : '#F00',
      selectable: false
  });

  canvas.add(rect);
  canvas.renderAll();

}