import * as Simulation from '../../simulation'
import * as Visulisation  from '../manager';
import {NodeRenderer}  from './node';
import {LinkRenderer}  from './link';
import {Canvas} from 'fabric';
var fabric = (<any>window)['fabric'];

export class Manager implements Visulisation.Manager {

    private nodeRenderer:NodeRenderer;
    private linkRenderer:LinkRenderer;

    private canvas:Canvas;

    private simulationManager:Simulation.Manager

    constructor(canvassSelector:string, simulationManager:Simulation.Manager){

        this.canvas = new Canvas(canvassSelector, {backgroundColor : '#EEE'});

        this.nodeRenderer = new NodeRenderer(this, this.canvas);
        this.linkRenderer = new LinkRenderer(this, this.canvas);

        this.simulationManager = simulationManager;

    }

    public data(nodes:Simulation.Node[], links:Simulation.FlatLink[]){
        
        this.nodeRenderer.update(nodes, this.simulationManager);
        this.linkRenderer.update(links, this.simulationManager);
        
    }

    public render(nodes:Simulation.Node[], links:Simulation.FlatLink[]){

        this.nodeRenderer.draw(nodes, this.simulationManager);
        this.linkRenderer.draw(links, this.simulationManager);
        
    }

    public nodeDragstarted(d:Simulation.Node) {

    }

    public nodeDragged(d:Simulation.Node) {

    }

    public nodeDragended(d:Simulation.Node) {

    }

    public nodeEnter(d:Simulation.Node) {

    }
    public nodeLeave(d:Simulation.Node) {

    }

}