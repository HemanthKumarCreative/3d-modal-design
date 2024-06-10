import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Cylinder, Box } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";
import UpdateDrawer1 from "./UpdateDrawer1";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { Color, Material, TextureLoader, RepeatWrapping } from "three";
import Table from "./models/table.glb";
import { TableModal } from "./UpdateTable1.jsx";
import DarkWood from "./tableTextures/DarkWood.jpg";
import FloorWood from "./tableTextures/FloorWood.png";
import LeafPattern from "./tableTextures/LeafPattern.jpg";
import OakWood from "./tableTextures/OakWood.jpg";
import RingPattern from "./tableTextures/RingPattern.jpg";
import RoseWood from "./tableTextures/RoseWood.jpg";
import WornWood from "./tableTextures/WornWood.jpg";
import TableDrawer from "./NewDrawer";
import Drawer from "./Drawer";
import { useThree } from "@react-three/fiber";

export function Model(props) {
  const tableTopRef = useRef();
  const { nodes, materials } = useGLTF(Table);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame(() => {
    // (Optional animation)
  });

  // Load textures
  const textureLoader = new TextureLoader();
  const texturePaths = [
    { path: OakWood, title: "Oak Wood" },
    { path: RoseWood, title: "Rose Wood" },
    { path: LeafPattern, title: "Leaf Pattern" },
    { path: RingPattern, title: "Strip Pattern" },
    { path: DarkWood, title: "Dark Wood" },
    { path: WornWood, title: "Worn Wood" },
    { path: FloorWood, title: "Floor Wood" },
  ];
  const textures = texturePaths.map((texture) =>
    textureLoader.load(texture.path)
  );
  const textureOptions = texturePaths.map((texture) => texture.title);

  // Function to apply the texture to the materials
  const applyTexture = (materialName, texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    const uvScale = 1.01; // Slightly increase UV scale
    texture.repeat.set(uvScale, uvScale);
    if (materials[materialName]) {
      materials[materialName].map = texture;
      materials[materialName].needsUpdate = true;
    }
  };

  useControls("Table Texture", () => {
    const texturePickers = {};
    Object.keys(materials).forEach((m) => {
      texturePickers[m] = {
        options: textureOptions,
        value: textureOptions[0],
        onChange: (path) => {
          console.log("Change Triggered", path);
          const selectedTexture = textures[textureOptions.indexOf(path)];
          applyTexture(m, selectedTexture);
        },
      };
    });
    return texturePickers;
  });

  useControls("Table Color", () => {
    const colorPickers = {};
    Object.keys(materials).forEach((m) => {
      colorPickers[m] = {
        value: "#deb887",
        onChange: (v) => {
          materials[m].color = new Color(v);
        },
      };
    });
    return colorPickers;
  });

  // Controls for table dimensions
  const { length, width, height } = useControls("Table Dimensions", {
    length: { value: 1, min: 1, max: 5, step: 0.1 },
    width: { value: 1, min: 1, max: 5, step: 0.1 },
    height: { value: 1, min: 1, max: 5, step: 0.1 },
  });

  const renderDrawers = (horizontalCount, verticalCount) => {
    const fullDrawers = [];
    for (let j = 0; j < verticalCount; j++) {
      const drawers = [];
      for (let i = 0; i < horizontalCount; i++) {
        const drawer = (
          <group key="table-drawer-section">
            <TableDrawer
              key="table-drawer"
              referenceNode={nodes.Cube002.geometry}
              material={materials.Material}
              open={open}
              setOpen={setOpen}
              scale={[length, height, width]}
              i={i}
              count={horizontalCount}
              verticalCount={verticalCount}
              j={j}
            />
            <Drawer
              key="table-draw-holder"
              scale={[length, height, width]}
              material={materials.Material}
              i={i}
              count={horizontalCount}
              verticalCount={verticalCount}
              j={j}
            />
          </group>
        );
        drawers.push(drawer);
      }
      fullDrawers.push(...drawers);
    }
    console.log({ fullDrawers });
    return fullDrawers;
  };

  const { camera } = useThree(); // Access camera

  const [zoom, setZoom] = useState(1); // Initial zoom level

  const bushMaterial = new MeshPhysicalMaterial({
    color: "#0C2D1B", // Use prop or default value
    roughness: 0.8, // Rougher surface for the plastic bushes
    metalness: 0,
    clearcoat: 0.2,
  });

  const thickness = 0.1;
  const cornerRadius = 0.01;

  // Leg dimensions
  const legWidth = 0.08;
  const legThickness = 0.08;
  const legLength = height;

  // Bush dimensions (adjust as needed)
  const bushHeight = 0.05;
  const bushRadius = legWidth / 2 + 0.01; // Slightly larger than leg radius

  // Calculate half the table's ACTUAL length and width for leg placement
  const halfLength = length / 2 + 0.0005;
  const halfWidth = width / 2 + 0.0005;

  // Adjusted leg positions to align with table corners
  const legPositions = [
    [-halfLength + legWidth / 2, -legLength / 2, -halfWidth + legThickness / 2],
    [halfLength - legWidth / 2, -legLength / 2, -halfWidth + legThickness / 2],
    [-halfLength + legWidth / 2, -legLength / 2, halfWidth - legThickness / 2],
    [halfLength - legWidth / 2, -legLength / 2, halfWidth - legThickness / 2],
  ];

  // Drawer dimensions (adjusted for length-wise placement)
  const drawerWidth = length - 0.01;
  const drawerHeight = legLength - 0.3;
  const drawerDepth = drawerHeight - 0.1; // Adjusted to table width
  const drawerSlideLength = 0.5;
  const grillThickness = 0.01;

  // Track drawer open state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle drawer click
  const handleDrawerClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Ground position adjusted to be below the table
  const groundPosition = [0, -legLength - thickness / 2, 0];

  // Ground dimensions
  const groundWidth = 7;
  const groundLength = 7;

  // Track drawer open states individually
  const [drawer1Open, setDrawer1Open] = useState(false);
  const [drawer2Open, setDrawer2Open] = useState(false);

  // Handle drawer clicks individually
  const handleDrawer1Click = () => {
    setDrawer1Open(!drawer1Open);
  };

  const handleDrawer2Click = () => {
    setDrawer2Open(!drawer2Open);
  };

  // Handle dimensions and material
  const handleWidth = 0.12;
  const handleHeight = 0.03;
  const handleDepth = 0.04;
  const legProjectionWidth = 0.02; // Width of each leg projection
  const legProjectionHeight = 0.03; // Height of each leg projection
  const handleMaterial = new MeshPhysicalMaterial({
    color: 0x999999,
    roughness: 0.5,
    metalness: 0.8,
  });

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        document
          .getElementById("Table Color." + e.object.material.name)
          ?.focus();
      }}
      position={[1 - width / 4, 1 - height / 4, 1 - length / 4]}
      rotation={[-Math.PI / 90, Math.PI / 2, -Math.PI / 90]}
      key="table-group"
    >
      {/* Rounded Table Top */}
      <RoundedBox
        args={[length, thickness, width]}
        radius={cornerRadius}
        smoothness={4}
        material={materials.Material}
      />
      {/* Legs (Attached to Table Top) */}
      {legPositions.map((pos, index) => (
        <group key={index}>
          {/* Leg */}
          <RoundedBox
            args={[legWidth, legLength, legThickness]}
            radius={cornerRadius}
            smoothness={4}
            position={pos}
            material={materials.Material}
            castShadow
          />
          {/* Bush (Positioned precisely at the Bottom of the Leg) */}
          <RoundedBox
            args={[legWidth + 0.005, bushHeight, legThickness + 0.005]}
            radius={cornerRadius / 2}
            smoothness={4}
            position={[
              pos[0],
              pos[1] - legLength / 2, // Aligned perfectly with the bottom of the leg
              pos[2],
            ]}
            material={bushMaterial}
            castShadow
          />
        </group>
      ))}
      {renderDrawers(width, height)}
      <RoundedBox
        args={[groundWidth, 0.1, groundLength]}
        radius={0}
        position={groundPosition}
        material={materials.Material}
        receiveShadow
        rotation={[0, -Math.PI / 2, -Math.PI]}
      />
      {/* Ground Surface */}
    </group>
  );
}
