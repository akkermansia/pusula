import { useState } from "react";

/* x, y: coords. w, h: width, height.
 * angle: rotation around origin. drag: can we drag this? loadedImage: Image, drawFunc: update function */
function Img(x, y, w, h, angle, drag, loadedImage, imgs) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.angle = angle;
  this.drag = drag;
  this.loadedImage = loadedImage;
  this.drawFunc = function () {
    console.log("no drawFunc set", this);
  };
  imgs.push(this);
}

function drawPlain(img, ctx) {
  ctx.save();
  ctx.translate(img.x, img.y);
  ctx.rotate(img.angle);
  ctx.drawImage(img.loadedImage, 0, 0, img.w, img.h);
  ctx.restore();
}

function drawFilter(img, ctx) {
  ctx.save();
  ctx.translate(img.x, img.y);
  ctx.rotate(img.angle);
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(img.loadedImage, 0, 0, img.w, img.h);
  ctx.restore();
}

function rotatePoint(x, y, theta) {
  let out = {};
  out.x = Math.cos(theta) * x - Math.sin(theta) * y;
  out.y = Math.sin(theta) * x + Math.cos(theta) * y;
  return out;
}

function loadImage(src, onload) {
  // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
  let img = new Image();

  img.onload = onload;
  img.src = src;

  return img;
}

function drawShadow(
  img,
  ctx,
  shadowColor,
  shadowBlur,
  shadowOffsetX,
  shadowOffsetY
) {
  ctx.save();
  ctx.translate(img.x, img.y);
  ctx.rotate(img.angle);
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;
  ctx.drawImage(img.loadedImage, 0, 0, img.w, img.h);
  ctx.restore();
}

function handleImage(e) {
  let reader = new FileReader();
  let img = new Image();
  reader.onload = function (event) {
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
  return img;
}

function changeBallot(isPM) {
  if (isPM === true) {
    console.log("changed");
    img2 = mv;
  } else {
    img2 = cb;
  }
  redraw();
}

// Business logic. Pure, testable, atomic functions
const increase = (prevValue, max) => {
  return {
    value: prevValue < max ? prevValue + 1 : prevValue,
    message: prevValue < max ? "" : "Max!",
  };
};

const decrease = (prevValue, min) => {
  return {
    value: prevValue > min ? prevValue - 1 : prevValue,
    message: prevValue > min ? "" : "Min!",
  };
};

// Implementation/framework logic. Encapsulating state and effects here
const usePusula = (canvas, ctx, images) => {
  const [canvas, setCanvas] = useState(canvas);
  const [state, setState] = useState({
    canvas: canvas,
    ctx: ctx,
    images: images,
  });

  const onClickPlus = () => {
    setState(increase(state.value, 10));
  };

  const onClickMinus = () => {
    setState(decrease(state.value, 0));
  };

  return { onClickPlus, onClickMinus, state };
};
