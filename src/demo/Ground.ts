import * as THREE from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'

export class Ground extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(10, 1, 10)
    const material = new THREE.MeshBasicMaterial({
      color: 'white',
    })

    super(geometry, material)
  }
}
