import {SimulationNodeDatum} from 'd3-force';
import {Manager} from '../simulation'

export interface Renderable {

    /**
     * stage a simulation datum. Shoulde be called when data changes.
     */
    update(nodes:SimulationNodeDatum, simulationManager:Manager):void;

    /**
     * render a simulation datum. Should be called for every tick of the simulation.
     */
    draw(sprite:SimulationNodeDatum, simulationManager:Manager): void;

    //onUpdated(): void;

}