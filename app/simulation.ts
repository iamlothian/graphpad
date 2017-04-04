//import * as _ from 'lodash';
import * as d3force from 'd3-force';
import * as d3selection from 'd3-selection';
import { GraphNode, GraphNodeSelection } from 'graphNode';
import { GraphLink, GraphLinkSelection } from 'graphLink';

//###############################################
// simulations
//###############################################

export class GraphSimulationManager {

  private width:number;
  private height:number;
  private _simulation:d3force.Simulation<{}, undefined>;

  constructor(width:number, height:number){

    this.width = width;
    this.height = height;
    this._simulation = d3force.forceSimulation();  

    this.linkForce();
    this.chargeForce();
    this.collideForce();
    this.centerForce();

    this._simulation.alphaTarget(0);
  } 

  //get simulation() { return this._simulation; }

  private ticked(node:GraphNodeSelection, link:GraphLinkSelection) {

    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
      .style("transform", (d:GraphNode) => `translate3d(${d.x}px,${d.y}px, 0px)`)
    
  }

  public linkForce(links:GraphLink[] = []){

      this._simulation.force("link", d3force.forceLink()
        .id(function(d:GraphNode, i, nodes) { return d.id.toString(); })
        .distance(40)
        .strength(1)
        .links(links)
      )
  }

  public chargeForce(charge:number = -50){

      // magnetic repel
      this._simulation.force("charge", d3force.forceManyBody()
        .strength(function(d:GraphNode) { 
          return d.charge || charge; })
      )
  }
      
  public collideForce(strength:number = 1){
      // touch repel
      this._simulation.force("collide", d3force.forceCollide()
        .radius((d:GraphNode) => d.r)
        .strength(strength)
      )
  }
      
  public centerForce(strength:number = 0.05){
      // center gravity
      this._simulation
        .force("centerX", d3force.forceX(this.width / 2).strength(strength))
        .force("centerY", d3force.forceY(this.height / 2).strength(strength));
  }

  /**
   * apply changes to the data and selection of the graph, and restart the simulation
   * @param nodes 
   * @param nodeSelection 
   * @param links 
   * @param linkSelection 
   */
  public apply(
      nodes:GraphNode[], 
      nodeSelection:GraphNodeSelection,
      links:GraphLink[],
      linkSelection:GraphLinkSelection
  ){
    // update nodes and links
    this._simulation
      .nodes(nodes)
      .on("tick", () => this.ticked(nodeSelection,linkSelection));

    this.linkForce(links);

    this._simulation.alpha(1).restart();
  }

  public slowSimTime(){
    this._simulation.alpha(0.01);
	  this._simulation.alphaTarget(0.1).restart();
  }
  public normalSimTime(){
    this._simulation.alpha(1);
	  this._simulation.alphaTarget(0).restart();
  }

}