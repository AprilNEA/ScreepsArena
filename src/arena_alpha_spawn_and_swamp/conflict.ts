import {ATTACK, BodyPartConstant, CARRY, MOVE, WORK,ERR_NOT_IN_RANGE} from "game/constants";
import {Creep, Source, StructureSpawn} from "game/prototypes";
import {findClosestByPath, getObjectsByPrototype, getTicks} from "game/utils";
import {constants} from "game";

const num: number = 5;
const base_body: BodyPartConstant[] = [ATTACK,ATTACK,MOVE,MOVE,ATTACK,ATTACK,MOVE,MOVE];

export function spawn_soldier(mySpawn: StructureSpawn, list: Creep[]): boolean {
  if (list.length < num) {
    let creep = mySpawn.spawnCreep(base_body).object;
    if (creep) {
      list.push(creep);
    }
    return false;
  } else {
    return true;
  }
}

// function basic_attack(creep:Creep, target): void{
//   if(creep.attack(target) == ERR_NOT_IN_RANGE){
//     creep.moveTo(target);
//   }
// }
