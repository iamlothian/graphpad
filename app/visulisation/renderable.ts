import {SimulationNodeDatum} from 'd3-force';

export interface Renderable {

    /**
     * stage a simulation datum. Shoulde be called when data changes.
     */
    update(nodes:SimulationNodeDatum):void;

    /**
     * render a simulation datum. Should be called for every tick of the simulation.
     */
    draw(sprite:SimulationNodeDatum): void;

}