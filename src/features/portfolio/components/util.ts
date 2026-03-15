import * as THREE from 'three'
import { extend, type ThreeElements } from '@react-three/fiber'

export class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(radius: number, width: number, height: number, widthSegments: number, heightSegments: number) {
    super(width, height, widthSegments, heightSegments)
    const p = this.attributes.position.array
    for (let i = 0; i < p.length; i += 3) {
      const x = p[i]
      const s = x / radius
      p[i] = Math.sin(s) * radius
      p[i + 2] = (Math.cos(s) - 1) * radius
    }
    this.computeVertexNormals()
  }
}

export class MeshSineMaterial extends THREE.MeshBasicMaterial {
  constructor(parameters: any) {
    super(parameters)
    this.setValues(parameters)
    this.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 }
      shader.vertexShader = `
        uniform float time;
        ${shader.vertexShader}
      `
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        vec3 transformed = vec3(position);
        transformed.x += sin(transformed.y * 10.0 + time) * 0.1;
        #include <begin_vertex>
        `
      )
      this.userData.shader = shader
    }
  }
  get time() {
    return this.userData.shader?.uniforms.time
  }
}

extend({ BentPlaneGeometry, MeshSineMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      bentPlaneGeometry: Omit<ThreeElements['planeGeometry'], 'args'> & { args: [number, number, number, number, number] }
      meshSineMaterial: Omit<ThreeElements['meshBasicMaterial'], 'args'> & { time?: any }
    }
  }
}

// Support for React 19 JSX namespace
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      bentPlaneGeometry: Omit<ThreeElements['planeGeometry'], 'args'> & { args: [number, number, number, number, number] }
      meshSineMaterial: Omit<ThreeElements['meshBasicMaterial'], 'args'> & { time?: any }
    }
  }
}
