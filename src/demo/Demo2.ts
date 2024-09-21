import { RigidBody } from '@dimforge/rapier3d'
import { Engine } from '../engine/Engine'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'
import { assetToLoad } from '../utils/AssetStore'
import { Box } from './Box'
import { Quaternion, Vector3 } from 'three'
import { Ground } from './Ground'
import CuboidRighid from './CuboidRighid'
import { Bridge } from './Bridge'
import { DynamicRighdBodyAndMesh } from './DynamicRighdBodyAndMesh'

export class Demo2 implements Experience {
  resources: Resource[] = assetToLoad
  gameEntities: Map<number, DynamicRighdBodyAndMesh> = new Map()
  //
  groundRigidBody: RigidBody
  groundMesh: THREE.Mesh

  constructor(private engine: Engine) {
    const RapierInstance = engine.physics.RapierInstance
    const world = this.engine.physics.world

    // Box

    Array.from({ length: 10 }).forEach((_, index) => {
      const gameEntity = new DynamicRighdBodyAndMesh(engine)

      this.gameEntities.set(index, gameEntity)
    })

    // Ground
    this.groundMesh = new Ground()
    engine.scene.add(this.groundMesh)

    // create Ground rigidBody
    this.groundRigidBody = new CuboidRighid(
      engine,
      'fixed',
      5,
      0.5,
      5
    ).rigidBody
    new Bridge(this.groundRigidBody, this.groundMesh)
    //
  }
  init(): void {
    // const box = new Box()
    // this.engine.scene.add(box)
  }

  update(delta: number): void {
    this.gameEntities.forEach((entity) => entity.update())
    // throw new Error('Method not implemented.')
  }
  resize?(): void {
    // throw new Error('Method not implemented.')
  }
}
