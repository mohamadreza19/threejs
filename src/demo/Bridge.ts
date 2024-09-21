import { RigidBody } from '@dimforge/rapier3d'
import * as THREE from 'three'

export class Bridge {
  constructor(private rigidBody: RigidBody, private mesh: THREE.Mesh) {
    const meshPosition = this.mesh.position
    const meshQuaternion = this.mesh.quaternion

    this.rigidBody.setTranslation(meshPosition, true)
    this.rigidBody.setRotation(meshQuaternion, true)
  }
}
