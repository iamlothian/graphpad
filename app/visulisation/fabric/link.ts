import * as Simulation from '../../simulation'
import { Renderable } from '../renderable';
import { Manager } from './manager';
import * as Fabric from 'fabric';

interface Selection extends d3.Selection<d3.BaseType, {}, HTMLElement, undefined> {}

export class LinkRenderer implements Renderable {

    private canvas:Fabric.Canvas
    private manger:Manager;

    constructor(manager:Manager, canvas:Fabric.Canvas ){
        this.manger = manager;
        this.canvas = canvas;
    }

    public draw(links:Simulation.FlatLink[], simulationManager:Simulation.Manager):void {
        
    }

    public update(links:Simulation.FlatLink[], simulationManager:Simulation.Manager):void {
        
    }

}