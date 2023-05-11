import React, { useRef, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function Canvas(props) {
  const canvasRef = useRef(null);
  function draw(ctx) {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "salmon";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px sans-serif";
    ctx.fillText("Resize Me!", canvas.width / 2 - 100, canvas.height / 2, 200);

    requestAnimationFrame(() => draw(ctx));
  }
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    requestAnimationFrame(() => draw(ctx));

    const handleResize = (e) => {
      ctx.canvas.height = props.height;
      ctx.canvas.width = props.width;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = props.width - 200;
    canvas.height = props.height;
    const context = canvas.getContext("2d");
    //Our first draw
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  return (
      <>
        {props.height}
        <canvas id="canvas" ref={canvasRef} {...props} />
        <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
          Hasan
        </Typography>
        {props.width}
      </>
  );
}
