import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Arrow, RegularPolygon, Shape } from 'react-konva';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPenNib, faShapes } from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import './Whiteboard.css'
import socket from '../../../Pages/Socket Connection/Socket'

const Whiteboard = () => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [text, setText] = useState('');
  const [shapes, setShapes] = useState([]);
  const [eraserPoints, setEraserPoints] = useState([]);

  useEffect(() => {

    socket.on('drawing', (data) => {
      if (data.tool === 'eraser') {
        erase(data.points);
      } else {
        setLines([...lines, data]);
      }
    });

    socket.on('text', (data) => {
      setText(data);
    });

    socket.on('shape', (data) => {
      setShapes([...shapes, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [lines, shapes]);

  const erase = (points) => {
    const ctx = layerRef.current.getContext();
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    ctx.lineWidth = 20;
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (tool === 'pen' || tool === 'eraser') {
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      lines.splice(lines.length - 1, 1, lastLine);
      setLines([...lines]);

      if (tool === 'eraser') {
        setEraserPoints([...eraserPoints, point]);
      }
    }
  };

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);

    if (tool === 'pen' || tool === 'eraser') {
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    } else if (tool === 'text') {
      const input = window.prompt('Enter text:');
      if (input) {
        setText(input);
        socket.emit('text', input);
      }
    }
  };



  const handleMouseUp = () => {
    setIsDrawing(false);

    if (tool === 'pen' || tool === 'eraser') {
      const lastLine = lines[lines.length - 1];
      console.log("LastLine Points: " + lastLine)
      socket.emit('drawing', lastLine);
    } else if (tool === 'eraser') {
      socket.emit('drawing', { tool: 'eraser', points: eraserPoints });
      setEraserPoints([]); // Clear eraser points after emitting
    }
  };

  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
  };

  const handleShapeClick = (shape) => {
    setTool(shape);
  };

  
  return (
    <div>
      <div id="whiteboard">
        <div id='tools'>
          <button onClick={() => handleToolChange('pen')}>
            <FontAwesomeIcon icon={faPenNib} />
          </button>
          <button onClick={() => handleToolChange('eraser')}>
            <FontAwesomeIcon icon={faEraser} />
          </button>
          <button onClick={() => handleToolChange('shape')}>
            <FontAwesomeIcon icon={faShapes} />
          </button>
          <button onClick={() => handleToolChange('text')}>Text</button>
        </div>

        <div id="board">
          <Stage
            width={1140}
            height={595}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer ref={layerRef}>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.tool === 'eraser' ? 'rgba(0, 0, 0, 0)' : 'black'}
                  strokeWidth={line.tool === 'eraser' ? 20 : 5}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                />
              ))}
              {text && <Text text={text} x={50} y={50} fontSize={20} />}
              {shapes.map((shape, i) => {
                switch (shape.type) {
                  case 'rectangle':
                    return (
                      <Rect
                        key={i}
                        x={shape.x}
                        y={shape.y}
                        width={shape.width}
                        height={shape.height}
                        fill={shape.fill}
                        draggable
                      />
                    );
                  case 'circle':
                    return (
                      <Circle
                        key={i}
                        x={shape.x}
                        y={shape.y}
                        radius={shape.radius}
                        fill={shape.fill}
                        draggable
                      />
                    );
                  case 'line':
                    return (
                      <Line
                        key={i}
                        points={shape.points}
                        stroke={shape.stroke}
                        strokeWidth={shape.strokeWidth}
                        tension={shape.tension}
                        lineCap={shape.lineCap}
                        globalCompositeOperation={shape.globalCompositeOperation}
                      />
                    );
                  case 'arrow':
                    return (
                      <Arrow
                        key={i}
                        points={shape.points}
                        stroke={shape.stroke}
                        strokeWidth={shape.strokeWidth}
                        tension={shape.tension}
                        lineCap={shape.lineCap}
                        globalCompositeOperation={shape.globalCompositeOperation}
                      />
                    );
                  case 'triangle':
                    return (
                      <RegularPolygon
                        key={i}
                        x={shape.x}
                        y={shape.y}
                        sides={3}
                        radius={shape.radius}
                        fill={shape.fill}
                        draggable
                      />
                    );
                  default:
                    return null;
                }
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
