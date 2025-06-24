"use client"

import { memo, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export const Globe = memo(({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      35,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 8
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setClearColor(0x000000, 0) // Set clear color to transparent
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.3
    controls.minDistance = 4
    controls.maxDistance = 12
    controlsRef.current = controls

    // Create sphere
    const geometry = new THREE.SphereGeometry(2, 64, 64)
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
      bumpMap: new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-topology.png'),
      bumpScale: 0.1,
      specularMap: new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png'),
      specular: new THREE.Color(0x333333),
      shininess: 15,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0.3
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Add point light for better highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(-5, -3, -5)
    scene.add(pointLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={cn("w-full h-full", className)}
    />
  )
}) 