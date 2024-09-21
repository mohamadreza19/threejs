import { World } from '@dimforge/rapier3d'
import { Engine } from './Engine'
import { GameEntity } from './GameEntity'

type RAPIER =
  typeof import('/home/mrzar/work/threejs/strucured/node_modules/@dimforge/rapier3d/rapier')

export default class Physics implements GameEntity {
  public world!: World
  public RapierInstance!: RAPIER
  constructor(private engine: Engine, private onReadyCallback?: () => void) {
    import('@dimforge/rapier3d').then((RAPIER) => {
      // Use the RAPIER module here.
      let gravity = { x: 0.0, y: -9.81, z: 0.0 }
      this.world = new RAPIER.World(gravity)
      this.RapierInstance = RAPIER

      if (this.onReadyCallback) {
        this.onReadyCallback()
      }
    })
  }

  resize(): void {}
  update(delta: number): void {
    if (!this.RapierInstance) return

    this.world.step()
  }
}
