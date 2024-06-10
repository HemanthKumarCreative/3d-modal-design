import React from "react";

function UpdateDrawer1({
  length,
  thickness,
  RoundedBox,
  drawerWidth,
  drawerHeight,
  material,
  drawer1Open,
  drawerSlideLength,
  handleDrawer1Click,
  handleWidth,
  handleDepth,
  handleHeight,
  handleMaterial,
  legProjectionHeight,
  legProjectionWidth,
}) {
  return (
    <group
      position={[length / 4, -thickness / 2, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      {/* Drawer Back */}
      <RoundedBox
        args={[drawerWidth + 0.1, drawerHeight + 0.1, 0.6]}
        material={material}
        radius={0}
        position={[0, -0.09, 0]}
      />
      {/* Drawer Front (Clickable) */}
      <RoundedBox
        args={[drawerWidth, 0.0005, 0.6]}
        material={material}
        position={[0, -0.16, drawer1Open ? drawerSlideLength : 0]}
        radius={0}
      />
      {/* Drawer Sides (adjusted for lengthwise placement) */}
      <RoundedBox
        args={[drawerWidth / 2, drawerHeight, 0.02]}
        material={material}
        position={[0.6, -0.09, drawer1Open ? drawerSlideLength : 0]}
        radius={0}
        rotation={[0, Math.PI / 2, 0]}
      />
      <RoundedBox
        args={[drawerWidth / 2, drawerHeight, 0.02]}
        material={material}
        position={[-0.6, -0.09, drawer1Open ? drawerSlideLength : 0]}
        rotation={[0, Math.PI / 2, 0]}
        radius={0}
      />
      <group onClick={handleDrawer1Click}>
        <RoundedBox
          args={[drawerWidth, drawerHeight, 0.05]}
          material={material}
          position={[0, -0.09, drawer1Open ? drawerSlideLength + 0.27 : 0.3]}
          rotation={[0, 0, 0]}
          radius={0}
          onClick={handleDrawer1Click}
        />
        {/* Drawer Handle */}
        {/* Drawer Front (Clickable) with Handle */}

        {/* Handle Base */}
        <RoundedBox
          args={[handleWidth, handleHeight, handleDepth]}
          radius={0.002}
          material={handleMaterial}
          position={[0, -0.09, drawer1Open ? drawerSlideLength + 0.35 : 0.38]}
        />

        {/* Handle Leg Projection 2 */}
        <RoundedBox
          args={[legProjectionWidth, legProjectionHeight, handleDepth]}
          radius={0.002}
          material={handleMaterial}
          position={[0, -0.09, drawer1Open ? drawerSlideLength + 0.31 : 0.34]}
        />
      </group>
    </group>
  );
}

export default UpdateDrawer1;
