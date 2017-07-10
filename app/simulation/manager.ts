//import * as _ from 'lodash';
import * as d3force from 'd3-force';
import * as d3selection from 'd3-selection';
import { Node } from './node';
import { FlatLink } from './link';
import * as Event from '../event';


class UpdateListener implements Event.Listener {

  Name: string;

  trigger: () => void;
  addHandler(handle:(nodes:Node[], links:FlatLink[], simulationManager:Manager)=>any) : number {
    
    return 1;

  }
  removeHandler(handle: number): void {
    
  }

}

//###############################################
// simulations
//###############################################

export class Manager implements Event.Listenable {

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

  addEventListener(){

  }

  removeEventListener(){

  }

  /** Called by tick function */
  public onUpdate(nodes:Node[], links:FlatLink[], simulationManager:Manager) {}

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
      .on("tick", () => this.onUpdate(nodes,links,this));

    this.linkForce(links);

    this._simulation.alpha(1).restart();
  } 

  /** slowly progress sim but never settle */
  public warmSimTime(){
    this._simulation.alpha(0.01);
	  this._simulation.alphaTarget(0.1).restart();
  }

  /** reheat sim and settle */
  public heatSimTime(){
    this._simulation.alpha(1);
	  this._simulation.alphaTarget(0).restart();
  }

}