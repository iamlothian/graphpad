//import * as _ from 'lodash';
import * as d3force from 'd3-force';
import * as d3selection from 'd3-selection';
import { Node } from './node';
import { FlatLink } from './link';

//###############################################
// simulations
//###############################################

export class Manager {

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

  // private ticked(node:D3NodeSelection, link:D3LinkSelection) {

  //   this.onUpdate(node, link);

  //   link
  //       .attr("x1", function(d) { return d.source.x; })
  //       .attr("y1", function(d) { return d.source.y; })
  //       .attr("x2", function(d) { return d.target.x; })
  //       .attr("y2", function(d) { return d.target.y; });

  //   node
  //     .style("transform", (d:Node) => `translate3d(${d.x}px,${d.y}px, 0px)`)
    
  // }

  /** Called by tick function */
  public onUpdate(nodes:Node[], links:FlatLink[]) {}

  public linkForce(links:FlatLink[] = []){

      this._simulation.force("link", d3force.forceLink()
        .id(function(d:Node, i, nodes) { return d.id.toString(); })
        .distance(40)
        .strength(1)
        .links(links)
      )
  }

  public chargeForce(charge:number = -50){

      // magnetic repel
      this._simulation.force("charge", d3force.forceManyBody()
        .strength(function(d:Node) { 
          return d.charge || charge; })
      )
  }
      
  public collideForce(strength:number = 1){
      // touch repel
      this._simulation.force("collide", d3force.forceCollide()
        .radius((d:Node) => d.r)
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
   * Set the links and nodes data of the graph, and restart the simulation
   * @param nodes 
   * @param links 
   */
  public data(nodes:Node[], links:FlatLink[]){
    // update nodes and links
    this._simulation
      .nodes(nodes)
      .on("tick", () => this.onUpdate(nodes,links));

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