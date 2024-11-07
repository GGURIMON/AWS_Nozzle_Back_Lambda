// import React, { useState, useEffect, useRef } from 'react';
// import { Stage, Layer, Line, Circle, Group, Image as KonvaImage } from 'react-konva';

// const PolygonMask = () => {
//   const [image, setImage] = useState(null);
//   const [points, setPoints] = useState([]);
//   const [isComplete, setIsComplete] = useState(false);
//   const imageRef = useRef(new window.Image());
//   const stageRef = useRef();

//   useEffect(() => {
//     const img = imageRef.current;
//     img.src = 'https://picsum.photos/800/600';
//     img.onload = () => setImage(img);
//   }, []);

//   const distance = (x1, y1, x2, y2) => {
//     return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
//   };

//   const handleClick = (e) => {
//     if (isComplete) return;

//     const { x, y } = e.target.getStage().getPointerPosition();

//     if (points.length >= 4 && distance(x, y, points[0], points[1]) < 10) {
//       setPoints((prev) => [...prev, points[0], points[1]]);
//       setIsComplete(true);
//     } else {
//       setPoints((prev) => [...prev, x, y]);
//     }
//   };

//   const handleDragMove = (index, newPos) => {
//     const updatedPoints = points.slice();
//     updatedPoints[index] = newPos.x;
//     updatedPoints[index + 1] = newPos.y;
//     setPoints(updatedPoints);
//   };

//   const handleUndo = () => {
//     if (points.length > 2) {
//       setPoints(points.slice(0, -2));
//       setIsComplete(false);
//     }
//   };

//   const handleReset = () => {
//     setPoints([]);
//     setIsComplete(false);
//   };

//   return (
//     <div>
//       <Stage width={800} height={600} onClick={handleClick} ref={stageRef}>
//         <Layer>
//           {image && <KonvaImage x={0} y={0} width={800} height={600} image={image} />}
//           <Group>
//             <Line points={points} stroke="red" strokeWidth={2} closed={isComplete} fill="rgba(255, 0, 0, 0.5)" />
//             {points.map((_, index) =>
//               index % 2 === 0 ? (
//                 <Circle
//                   key={index}
//                   x={points[index]}
//                   y={points[index + 1]}
//                   radius={5}
//                   fill="blue"
//                   draggable
//                   onDragMove={(e) => handleDragMove(index, e.target.position())}
//                 />
//               ) : null
//             )}
//           </Group>
//         </Layer>
//       </Stage>
//       <button onClick={handleUndo} style={{ marginTop: 10, marginRight: 10 }}>
//         Undo
//       </button>
//       <button onClick={handleReset} style={{ marginTop: 10 }}>
//         Reset
//       </button>
//     </div>
//   );
// };

// export default PolygonMask;
