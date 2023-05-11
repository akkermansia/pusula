import React, { useRef, useState, useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
/* x, y: coords. w, h: width, height.
 * angle: rotation around origin. drag: can we drag this? loadedImage: Image, drawFunc: update function */
function CanvasImage(x, y, w, h, angle, drag, src, onLoad) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.angle = angle;
  this.drag = drag;
  this.loadedImage = new Image(src);
  this.drawFunc = function () {
    console.log("no drawFunc set", this);
  };
}

export default function Canvas() {
  const canvasElementRef = useRef(null);
  const contextRef = useRef(null);
  const [canvas, setCanvas] = useState("");

  const [background, setBackground] = useState(null);

  const [ballot1, setBallot1] = useState(null);
  const [ballot2, setBallot2] = useState(null);

  const [idCard, setIdCard] = useState(null);
  const [customPicture, setCustomPicture] = useState(null);

  const [stamp, setStamp] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [counter, setCounter] = useState(1);

  const initCanvas = (width, height) =>
    new fabric.Canvas("canvas", {
      height: height,
      width: width,
    });

  useEffect(() => {
    const canvasElement = canvasElementRef.current;
    const context = canvasElement.getContext("2d");
    const image = new Image();

    canvasElement.style.width = "100%";
    canvasElement.style.height = "100%";
    canvasElement.width = canvasElement.offsetWidth;
    canvasElement.height = canvasElement.offsetHeight;

    setCanvas(
      initCanvas(canvasElement.offsetWidth, canvasElement.offsetHeight)
    );

    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "yellow",
    });
    canvas.add(rect);
    canvas.renderAll();

    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);
      console.log(counter);
      if (event.key === "Enter") {
        event.preventDefault();
        setCounter((counter) => counter + 1);
        image.src = "/backgrounds/wood" + (counter % 9) + ".jpg";
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [counter]);

  return (
    <canvas
      onClick={() => addRect(canvas)}
      id="canvas"
      ref={canvasElementRef}
    ></canvas>
  );
}
