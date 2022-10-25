import React from 'react';
import { Stage, Layer, Line} from 'react-konva';

const App = () => {
  const [li, setLi] = React.useState([]);
  const isDraw = React.useRef(false);

  const handleMouseDown = (e) => {
    isDraw.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLi([...li, { points: [pos.x, pos.y] }]);
  };
  const handleMouseMove = (e) => {
    if (!isDraw.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = li[li.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    li.splice(li.length - 1, 1, lastLine);
    setLi(li.concat());
  };

  const handleMouseUp = () => {
    isDraw.current = false;
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {li.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;