import * as Simulation from '../simulation'

export interface Manager {

    /**
     * stage graph based on Node and Link link data. Shoulde be called when data changes
     */
    data(nodes:Simulation.Node[], links:Simulation.FlatLink[]):void;

    /**
     * render graph based on Node and Link link data. Should be called for every tick of the simulation 
     */
    render(nodes:Simulation.Node[], links:Simulation.FlatLink[], simulationManager:Simulation.Manager):void;

}