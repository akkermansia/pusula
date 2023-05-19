import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import {FabricJSCanvas, useFabricJSEditor} from "fabricjs-react";
import Box from "@mui/material/Box";
import {backgrounds, ballots, stamps} from "../assets";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

const Canvas = forwardRef(({ballot}, ref) => {
    const {
        backgroundImage,
        backgroundAngle,
        ballot1Image,
        ballot1Angle,
        stamp1Image,
        stamp1Angle,
        ballot2Image,
        ballot2Angle,
        stamp2Image,
        stamp2Angle,
        ballot3Image,
        ballot3Angle,
        stamp3Image,
        stamp3Angle,
        stamp4Image,
        stamp4Angle,
        ballot4Image,
        ballot4Angle,
        stamp5Image,
        stamp5Angle,
        envelopeImage,
        envelopeAngle,
        idCardImage,
        customImage,
        hasShadows,
        hasFilter,
        filterImage,
        filterAngle,
        hasEnvelope,
        topBallot,
        showPresident,
        showDeputy,
        showCustom,
        showSecondRound,
        showStamp4
    } = ballot;

    const navigate = useNavigate();

    const {editor, onReady} = useFabricJSEditor();
    const fabricRef = useRef(null);
    const [background, setBackground] = useState(null);
    const [envelope, setEnvelope] = useState(null);
    const [filter, setFilter] = useState(null);

    const [ballot1, setBallot1] = useState(null);
    const [ballot2, setBallot2] = useState(null);
    const [ballot3, setBallot3] = useState(null);
    const [ballot4, setBallot4] = useState(null);

    const [stamp1, setStamp1] = useState(null);
    const [stamp2, setStamp2] = useState(null);
    const [stamp3, setStamp3] = useState(null);
    const [stamp4, setStamp4] = useState(null);
    const [stamp5, setStamp5] = useState(null);

    let shadow = new fabric.Shadow({
        color: "rgba(50, 50, 70, 0.2)",
        blur: 15,
        offsetX: 2,
        offsetY: 7,
    });

    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `pusula.png`;
        link.href = editor.canvas.toDataURL();
        link.click();
    };

    useImperativeHandle(ref, () => ({
        saveImage(e) {
            onDownload();
        },
    }));

    /**
     * Load an image from a given URL
     * @param {String} src The URL of the image resource
     * @returns {Promise<Image>} The loaded image
     */
    function loadImagePromise(src) {
        /*
         * We are going to return a Promise which, when we .then
         * will give us an Image that should be fully loaded
         */
        return new Promise((resolve) => {
            /*
             * Create the image that we are going to use to
             * to hold the resource
             */
            const image = new Image();
            /*
             * The Image API deals in even listeners and callbacks
             * we attach a listener for the "load" event which fires
             * when the Image has finished the network request and
             * populated the Image with data
             */
            image.addEventListener("load", () => {
                /*
                 * You have to manually tell the Promise that you are
                 * done dealing with asynchronous stuff and you are ready
                 * for it to give anything that attached a callback
                 * through .then a realized value.  We do that by calling
                 * resolve and passing it the realized value
                 */
                resolve(image);
            });
            /*
             * Setting the Image.src is what starts the networking process
             * to populate an image.  After you set it, the browser fires
             * a request to get the resource.  We attached a load listener
             * which will be called once the request finishes and we have
             * image data
             */
            image.src = src;
        });
    }

    const loadImage = (src, angle, left, top, onLoad, opacity = 1) => {
        let image = new Image();
        image.src = src;
        image.onload = () => {
            let imageInstance = new fabric.Image(image, {
                left: left,
                top: top,
                angle: angle,
                opacity: opacity,
            });
            onLoad(imageInstance);
        };
    };

    useEffect(() => {
        if (!editor || !fabric) return;
        let backgroundImageObject = new Image();

        backgroundImageObject.src = backgroundImage;
        fabric.Image.fromObject(backgroundImageObject, (image) => {
            editor.canvas.setBackgroundImage(
                image,
                editor.canvas.renderAll.bind(editor.canvas),
                {
                    left: 0, top: editor.canvas.height * -0.1, angle: ballot.backgroundAngle,
                    scaleX: (editor.canvas.height / image.height) * 1.3,
                    scaleY: (editor.canvas.height / image.height) * 1.3
                }
            );
        });
    }, [fabricRef, editor?.canvas, backgroundImage]);

    useEffect(() => {
        if (!editor || !fabric) return;
        if (!ballot1 && !stamp1) {
            loadImagePromise(ballot1Image)
                .then((image) => {
                    let ballot1Instance = new fabric.Image(image, {
                        left: 50,
                        top: 50,
                        angle: ballot1Angle,
                    });
                    if (showPresident) editor.canvas.add(ballot1Instance);
                    setBallot1(ballot1Instance);
                    return loadImagePromise(stamp1Image);
                })
                .then((stampImage) => {
                    let stamp1Instance = new fabric.Image(stampImage, {
                        left: fabricRef.current.offsetWidth / 2,
                        top: fabricRef.current.offsetHeight / 2,
                        angle: stamp1Angle,
                    });
                    stamp1Instance.scale(0.45);
                    if (showPresident) editor.canvas.add(stamp1Instance);
                    setStamp1(stamp1Instance);
                });
        }
    }, [fabricRef, editor?.canvas, showPresident]);

    useEffect(() => {
        if (!editor || !fabric) return;
        if (!ballot2 && !stamp2) {
            loadImagePromise(ballot2Image)
                .then((image) => {
                    let ballot2Instance = new fabric.Image(image, {
                        left: 100,
                        top: 100,
                        angle: ballot2Angle,
                    });
                    if (showDeputy) editor.canvas.add(ballot2Instance);
                    setBallot2(ballot2Instance);
                    return loadImagePromise(stamp2Image);
                })
                .then((stampImage) => {
                    let stamp2Instance = new fabric.Image(stampImage, {
                        left: fabricRef.current.offsetWidth / 2 + 50,
                        top: fabricRef.current.offsetHeight / 2 + 50,
                        angle: stamp2Angle,
                    });
                    stamp2Instance.scale(0.45);
                    if (showDeputy) editor.canvas.add(stamp2Instance);
                    setStamp2(stamp2Instance);
                });
        }
    }, [fabricRef, editor?.canvas, showDeputy]);

    useEffect(() => {
        if (!editor || !fabric) return;
        if (!ballot4 && !stamp5) {
            loadImagePromise(ballot4Image)
                .then((image) => {
                    let ballot4Instance = new fabric.Image(image, {
                        left: editor.canvas.width * 0.1,
                        top: editor.canvas.height * 0.1,
                        scaleX:  0.55,
                        scaleY:  0.55,
                        angle: ballot4Angle,
                    });
                    if (showSecondRound) editor.canvas.add(ballot4Instance);
                    setBallot4(ballot4Instance);
                    return loadImagePromise(stamp5Image);
                })
                .then((stampImage) => {
                    let stamp5Instance = new fabric.Image(stampImage, {
                        left: fabricRef.current.offsetWidth / 2 + 50,
                        top: fabricRef.current.offsetHeight / 2 + 50,
                        angle: stamp5Angle,
                    });
                    stamp5Instance.scale(0.45);
                    if (showSecondRound) editor.canvas.add(stamp5Instance);
                    setStamp5(stamp5Instance);
                });
        }
    }, [fabricRef, editor?.canvas, showSecondRound]);

    useEffect(() => {
        if (!editor || !fabric) return;
        if (!ballot3 && !stamp3 && !stamp4 && ballot3Image !== '') {
            loadImagePromise(ballot3Image)
                .then((image) => {
                    let ballot3Instance = new fabric.Image(image, {
                        left: editor.canvas.width * 0.1,
                        top: editor.canvas.height * 0.1,
                        angle: ballot3Angle,
                        scaleX: (editor.canvas.width / image.width) * 1.2,
                        scaleY: (editor.canvas.height / image.height) * 1.2
                    });
                    if (showCustom) editor.canvas.add(ballot3Instance);
                    setBallot3(ballot3Instance);
                    return loadImagePromise(stamp3Image);
                })
                .then((stampImage) => {
                    let stamp3Instance = new fabric.Image(stampImage, {
                        left: fabricRef.current.offsetWidth / 2 + 50,
                        top: fabricRef.current.offsetHeight / 2 + 50,
                        angle: stamp3Angle,
                    });
                    stamp3Instance.scale(0.45);
                    if (showCustom) editor.canvas.add(stamp3Instance);
                    setStamp3(stamp3Instance);
                    return loadImagePromise(stamp4Image);
                }).then((stampImage) => {
                let stamp4Instance = new fabric.Image(stampImage, {
                    left: fabricRef.current.offsetWidth / 2 + 100,
                    top: fabricRef.current.offsetHeight / 2 + 100,
                    angle: stamp4Angle,
                });
                stamp4Instance.scale(0.45);
                if (showCustom) editor.canvas.add(stamp4Instance);
                setStamp4(stamp4Instance);
            })
        }
    }, [fabricRef, editor?.canvas, ballot3Image, showCustom]);

    useEffect(() => {
        if (!editor || !fabric || !envelope) return;
        if (!hasEnvelope) {
            editor.canvas.remove(envelope);
        } else {
            editor.canvas.add(envelope);
        }
        envelope.sendToBack();
    }, [fabricRef, editor?.canvas, hasEnvelope]);

    useEffect(() => {
        if (!editor || !fabric || !filter) return;
        if (!hasFilter) {
            editor.canvas.remove(filter);
        } else {
            editor.canvas.add(filter);
        }
        filter.bringToFront();
    }, [fabricRef, editor?.canvas, hasFilter]);

    useEffect(() => {
        if (!editor || !fabric) return;
        if (!envelope) {
            loadImagePromise(envelopeImage).then((image) => {
                let envelopeInstance = new fabric.Image(image, {
                    left: editor.canvas.width * 0.1,
                    top: editor.canvas.height * 0.1,
                    angle: envelopeAngle,
                });
                if (hasEnvelope) editor.canvas.add(envelopeInstance);
                envelopeInstance.sendToBack();
                setEnvelope(envelopeInstance);
            });
        }
    }, [fabricRef, editor?.canvas]);

    useEffect(() => {
        if (!editor || !fabric) return;
        if (!filter) {
            loadImagePromise(filterImage).then((image) => {
                let filterInstance = new fabric.Image(image, {
                    left: 0,
                    top:0,
                    scaleX: (editor.canvas.height / image.height) * 1.1,
                    scaleY: (editor.canvas.height / image.height) * 1.1,
                    opacity: 0.25,
                    angle: filterAngle,
                });

                if (hasFilter) editor.canvas.add(filterInstance);
                filterInstance.bringToFront();
                setFilter(filterInstance);
            });
        }
    }, [fabricRef, editor?.canvas]);

    useEffect(() => {
        if (!editor || !fabric || !ballot1 || !stamp1 || !ballot2 || !stamp2
            || !ballot4 || !stamp5
        )
            return;


        if (showPresident) {
            editor.canvas.add(ballot1);
            editor.canvas.add(stamp1);
        }

        if (!showPresident) {
            editor.canvas.remove(stamp1);
            editor.canvas.remove(ballot1);
            editor.canvas.requestRenderAll();
        }

        if (showSecondRound) {
            editor.canvas.add(ballot4);
            editor.canvas.add(stamp5);
        }

        if (!showSecondRound) {
            editor.canvas.remove(stamp5);
            editor.canvas.remove(ballot4);
            editor.canvas.requestRenderAll();
        }

        if (ballot3 && stamp3 && stamp4 && ballot3Image !== '') {
            if (showCustom) {
                editor.canvas.add(ballot3);
                editor.canvas.add(stamp3);
                editor.canvas.requestRenderAll();

            }

            if (!showCustom) {
                editor.canvas.remove(stamp3);
                editor.canvas.remove(ballot3);
                editor.canvas.requestRenderAll();
            }


        }

        if (showDeputy) {
            editor.canvas.add(ballot2);
            editor.canvas.add(stamp2);
        }
        if (!showDeputy) {
            editor.canvas.remove(stamp2);
            editor.canvas.remove(ballot2);
            editor.canvas.requestRenderAll();
        }

        if (topBallot === 1) {
            ballot2.bringToFront();
            stamp2.bringToFront();
        }

        if (topBallot === 0) {
            ballot1.bringToFront();
            stamp1.bringToFront();
        }

        if (topBallot === 2) {
            ballot4.bringToFront();
            stamp5.bringToFront();
        }
        editor.canvas.requestRenderAll();
    }, [fabricRef, editor?.canvas, topBallot, showPresident, showDeputy, showCustom, ballot3Image, showSecondRound]);

    useEffect(() => {
        console.log('shadow')
        console.log(!!ballot4)
        if (!editor || !fabric || !ballot1 || !ballot2 || !ballot4  ) return;
        console.log('shadow')

        if (hasShadows) {
            ballot1.shadow = shadow;
            ballot2.shadow = shadow;
            ballot4.shadow = shadow;
            envelope.shadow = shadow;
            editor.canvas.requestRenderAll();
        } else {
            ballot1.shadow = null;
            ballot2.shadow = null;
            ballot4.shadow = null;
            envelope.shadow = null;
        }
    }, [fabricRef, editor?.canvas, hasShadows]);

    useEffect(() => {
        if (!editor || !fabric || !stamp1) return;

        stamp1.setSrc(stamp1Image, () => {
            editor.canvas.renderAll();
        });
    }, [fabricRef, editor?.canvas, stamp1Image]);

    useEffect(() => {
        if (!editor || !fabric || !stamp2) return;

        stamp2.setSrc(stamp2Image, () => {
            editor.canvas.renderAll();
        });
    }, [fabricRef, editor?.canvas, stamp2Image]);

    useEffect(() => {
        if (!editor || !fabric || !stamp3) return;

        stamp3.setSrc(stamp3Image, () => {
            editor.canvas.renderAll();
        });
    }, [fabricRef, editor?.canvas, stamp3Image]);

    useEffect(() => {
        if (!editor || !fabric || !stamp4) return;

        stamp4.setSrc(stamp4Image, () => {
            editor.canvas.renderAll();
        });
    }, [fabricRef, editor?.canvas, stamp4Image]);

    useEffect(() => {
        if (!editor || !fabric || !stamp5) return;

        stamp1.setSrc(stamp5Image, () => {
            editor.canvas.renderAll();
        });
    }, [fabricRef, editor?.canvas, stamp5Image]);

    useEffect(() => {
        if (!editor || !fabric || !stamp4) return;

        if (showStamp4) {
            editor.canvas.add(stamp4);
        }
        if (!showStamp4) {
            editor.canvas.remove(stamp4);
        }
        editor.canvas.renderAll();


    }, [fabricRef, editor?.canvas, showStamp4]);


    useEffect(() => {
        if (!editor || !fabric) return;
        editor.canvas.preserveObjectStacking = true;
        if (fabricRef.current) {
            editor.canvas.setHeight(fabricRef.current.offsetHeight);
            editor.canvas.setWidth(fabricRef.current.offsetWidth);
        }

        editor.canvas.requestRenderAll();
    }, [fabricRef, editor?.canvas, ballot]);
    return (
        <Box sx={{height: "100%"}} ref={fabricRef}>
            <FabricJSCanvas className="canvas" onReady={onReady}/>
        </Box>
    );
});

export default Canvas;
