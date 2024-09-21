import { RigidBody, RigidBodyDesc } from '@dimforge/rapier3d'
import { Engine } from '../engine/Engine'

export default class CuboidRighid {
  rigidBody: RigidBody
  constructor(
    private engine: Engine,
    type: 'dynamic' | 'fixed',
    hx: number,
    hy: number,
    hz: number
  ) {
    const RapierInstance = engine.physics.RapierInstance
    const world = this.engine.physics.world
    let rigidBodyType: RigidBodyDesc
    //...

    switch (type) {
      case 'dynamic':
        rigidBodyType = RapierInstance.RigidBodyDesc.dynamic()
        break
      case 'fixed':
        rigidBodyType = RapierInstance.RigidBodyDesc.fixed()
        break
    }

    this.rigidBody = world.createRigidBody(rigidBodyType)
    const colliderType = RapierInstance.ColliderDesc.cuboid(hx, hy, hz)
    world.createCollider(colliderType, this.rigidBody)
  }
}
