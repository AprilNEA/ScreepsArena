import {Creep, Source, StructureSpawn} from "game/prototypes";
import {findClosestByPath, getObjectsByPrototype} from "game/utils";
import { constants } from "game";

import {spawn_miner} from "./economy";
import {spawn_soldier} from "./conflict";

let miners:Creep[] = [];
let soldiers: Creep[] = [];


// let energyNumber: number = 500;

let stage:number = 1;
let mySpawn: StructureSpawn | undefined,enemySpawn: StructureSpawn | undefined;

export function loop(): void {
  if(!mySpawn){
    mySpawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);
  }
  if(!enemySpawn){
    enemySpawn = getObjectsByPrototype(StructureSpawn).find(i => !i.my);
  }

  // calculate total energy
  // energyNumber = energyNumber + 10;

  const sourceAll = getObjectsByPrototype(Source);

  // not attack just make resource

  switch (stage) {
    case 1: //
      // @ts-ignore
      if (spawn_miner(mySpawn, miners)) {
        stage++;
      }
    // exist worker
    case 2:
      // attack mode
      // @ts-ignore
      if (spawn_soldier(mySpawn, soldiers)) {
        stage++;
      }
  }
  if (miners.length > 0) {
    for (let worker of miners) {
      // free in backpack
      if (worker.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
        let closestSource = findClosestByPath(worker, sourceAll);
        // collect source
        if (worker.harvest(closestSource) == constants.ERR_NOT_IN_RANGE) {
          worker.moveTo(closestSource);
        }
      } else {
        // @ts-ignore
        if (worker.transfer(mySpawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
          // @ts-ignore
          worker.moveTo(mySpawn);
        }
      }
    }
  }
  if (soldiers.length > 0) {
    for (let attacker of soldiers) {
      if (enemySpawn) {
        // @ts-ignore
        if (attacker.attack(enemySpawn) == constants.ERR_NOT_IN_RANGE) {
          // @ts-ignore
          attacker.moveTo(enemySpawn);
        }
      }
    }
  }
}
