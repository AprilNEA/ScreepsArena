import {ATTACK, BodyPartConstant, CARRY, MOVE, WORK} from "game/constants";
import {Creep, Source, StructureSpawn} from "game/prototypes";
import {findClosestByPath, getObjectsByPrototype, getTicks} from "game/utils";
import {constants} from "game";

const miner_num: number = 2;
const miner_body: BodyPartConstant[] = [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE];

export function spawn_miner(mySpawn: StructureSpawn, list: Creep[]): boolean {
  if (list.length < miner_num) {
    let creep = mySpawn.spawnCreep(miner_body).object;
    if (creep) {
      list.push(creep);
    }
    return false;
  } else {
    return true;
  }
}
