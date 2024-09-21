import { Engine } from '../engine/Engine'
import { GameEntity } from '../engine/GameEntity'
import { Box } from './Box'
import { Bridge } from './Bridge'
import CuboidRighid from './CuboidRighid'
import * as THREE from 'three'

export class DynamicRighdBodyAndMesh implements GameEntity {
  cubeMesh
  rigidBody
  constructor(engine: Engine) {
    // Mesh
    this.cubeMesh = new Box()
    const size = this.computedCuboidDimension()
    engine.scene.add(this.cubeMesh)

    // righid
    this.rigidBody = new CuboidRighid(
      engine,
      'dynamic',
      size.x / 2,
      size.y / 2,
      size.z / 2
    ).rigidBody
    new Bridge(this.rigidBody, this.cubeMesh)
  }
  private computedCuboidDimension(): THREE.Vector3 {
    this.cubeMesh.position.y = 15
    // this.cubeMesh.scale.setScalar(2)

    const wordScale = this.cubeMesh.getWorldScale(new THREE.Vector3())

    this.cubeMesh.geometry.computeBoundingBox()
    const size = (this.cubeMesh.geometry.boundingBox as THREE.Box3).getSize(
      new THREE.Vector3()
    )
    size.multiply(wordScale)
    return size
  }

  update(): void {
    const position = this.rigidBody.translation() as THREE.Vector3
    const rotation = this.rigidBody.rotation() as THREE.Quaternion

    this.cubeMesh.position.copy(position)
    this.cubeMesh.quaternion.copy(rotation)
  }
  resize(): void {}
}
