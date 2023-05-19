import React, {useRef, useState, useEffect} from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useSearchParams} from "react-router-dom";
import Canvas from "../components/Canvas";
import {ballots, backgrounds, stamps, filters} from "../assets";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import {useFabricJSEditor} from "fabricjs-react";
import UploadIcon from '@mui/icons-material/Upload';

export default function Create() {
    const {editor, onReady} = useFabricJSEditor();
    const [searchParams] = useSearchParams();
    let currentStep = searchParams.get("step");
    if (currentStep === "") currentStep = "zemin";
    const canvasRef = useRef();

    const [ballot, setBallot] = useState({
        backgroundImage: backgrounds[7],
        backgroundAngle: Math.floor(Math.random() * 4),
        ballot1Image: ballots[0],
        ballot1Angle: Math.floor(Math.random() * 4),
        stamp1Image: stamps[0],
        stamp1Angle: Math.floor(Math.random() * 360),
        ballot2Image: ballots[1],
        ballot2Angle: Math.floor(Math.random() * 4),
        ballot3Image: '',
        ballot3Angle: Math.floor(Math.random() * 4),
        ballot4Image: ballots[2],
        ballot4Angle: Math.floor(Math.random() * 4),
        stamp2Image: stamps[0],
        stamp2Angle: Math.floor(Math.random() * 360),
        stamp3Image: stamps[0],
        stamp3Angle: Math.floor(Math.random() * 360),
        stamp4Image: stamps[0],
        stamp4Angle: Math.floor(Math.random() * 360),
        stamp5Image: stamps[0],
        stamp5Angle: Math.floor(Math.random() * 360),
        envelopeImage: "./zarf.png",
        envelopeAngle: Math.floor(Math.random() * 4),
        filterImage: filters[0],
        filterpeAngle: Math.floor(Math.random() * 4),
        idCardImage: "",
        customImage: "",
        hasShadows: true,
        hasFilter: false,
        hasEnvelope: false,
        ballotType: 0,
        topBallot: 0,
        showPresident: false,
        showDeputy: false,
        showCustom: false,
        showStamp4: false,
        showSecondRound: true,
        onSave: () => {
        },
    });

    let donate = `
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick">
              <input type="hidden" name="hosted_button_id" value="7N3QMNGG26ZYC">
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit"
                       alt="PayPal - The safer, easier way to pay online!">
                  <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
          </form>
         `;

    const handleScroll = (event) => {
        const container = event.target;
        const scrollAmount = event.deltaY;
        container.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
            left: container.scrollLeft + scrollAmount,
        });
    };

    const addCustomBackground = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function (event) {
            setBallot({...ballot, backgroundImage: event.target.result});
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const addCustomBallot = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function (event) {
            setBallot({
                ...ballot,
                ballot3Image: event.target.result,
                showCustom: true,
                showStamp4: true,
                showPresident: false,
                showDeputy: false
            });
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const getCurrentStepTitle = (currentStep) => {
        const titles = {
            zemin: "Zemin Seçiniz",
            zarf: "Zarf Gözüksün",
            "pusula-turu": "Pusula Türü",
            golge: "Kağıt Gölgesi",
            muhur: "Mühür Seçin",
            ozel: "Özel Resim",
            filter: "Telefon Gölgesi",
            indir: "İşlem tamam!",
        };

        return titles[currentStep];
    };

    const backgroundButtons = (
        backgrounds.map((backgroundImage, index) => (
            <Avatar
                variant="rounded"
                alt={"background-" + index}
                key={"background-" + index}
                src={backgroundImage}
                onClick={(e) => {
                    setBallot({...ballot, backgroundImage: backgroundImage});
                }}
                sx={{
                    cursor: "pointer",
                    mr: 1,
                    width: 80,
                    height: 80,
                    border: "1px solid lightgray",
                }}
            />
        )));

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    maxHeight: "70vh",
                }}
                direction="column"
            >
                <Canvas ref={canvasRef} ballot={ballot}/>
            </Box>
            <Stack
                sx={{overflow: "auto", px: 3, mb: 2, flexShrink: 0, height: 150}}
                alignItems="center"
                direction="column"
            >
                <Box
                    sx={{
                        my: 1,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        width: "100%",
                    }}
                >
                    <Typography sx={{flex: 2}} variant="h5" component="h2">
                        {getCurrentStepTitle(currentStep)}
                    </Typography>
                    <Typography sx={{flex: 4}} variant="body2">
                        Öğeleri hareket ettirebilir, döndürüp büyütebilirsiniz
                    </Typography>
                </Box>
                <Box
                    onWheel={handleScroll}
                    sx={{
                        display: "flex",
                        flexShrink: 0,
                        overflowX: "scroll",
                        width: "100%",
                        flex: 1,
                        height: 200,
                        pb: 1,
                        flexDirection: "row",
                        flexWrap: "nowrap",
                    }}
                >
                    {currentStep === "zemin" && (
                        <Button
                            component='label'
                            onChange={addCustomBackground}
                            size="large" sx={{
                            cursor: "pointer",
                            flexShrink: 0,
                            mr: 1,
                            width: 100,
                            height: 80,
                            border: "1px solid lightgray",
                        }} variant="outlined" startIcon={<UploadIcon/>}>
                            Yükle
                            <input
                                type="file"
                                hidden
                            />
                        </Button>)}
                    {currentStep === "zemin" && backgroundButtons}

                    {currentStep === "zarf" && (
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.hasEnvelope}
                                            onChange={(e) => {
                                                setBallot({...ballot, hasEnvelope: e.target.checked});
                                            }}
                                            name="envelope"
                                        />
                                    }
                                    label="Zarf Göster"
                                />
                            </FormGroup>
                        </FormControl>
                    )}
                    {currentStep === "filter" && (
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.hasFilter}
                                            onChange={(e) => {
                                                setBallot({...ballot, hasFilter: e.target.checked});
                                            }}
                                            name="filter"
                                        />
                                    }
                                    label="Telefon Gölgesi Göster"
                                />
                            </FormGroup>
                        </FormControl>
                    )}
                    {currentStep === "golge" && (
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.hasShadows}
                                            onChange={(e) => {
                                                setBallot({...ballot, hasShadows: e.target.checked});
                                            }}
                                            name="shadow"
                                        />
                                    }
                                    label="Kağıt Gölgesi var"
                                />
                            </FormGroup>
                        </FormControl>
                    )}
                    {currentStep === "pusula-turu" && (
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend">Pusula Türü</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={
                                                ballot.showSecondRound
                                            }
                                            onChange={(e) => {
                                                setBallot({
                                                    ...ballot,
                                                    showSecondRound: e.target.checked,
                                                });
                                            }}
                                            name="ballotType4"
                                        />
                                    }
                                    label="İkinci Tur"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={
                                                ballot.showPresident
                                            }
                                            onChange={(e) => {
                                                setBallot({
                                                    ...ballot,
                                                    showPresident: e.target.checked,
                                                });
                                            }}
                                            name="ballotType1"
                                        />
                                    }
                                    label="Cumhurbaşkanı"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={
                                                ballot.showDeputy
                                            }
                                            onChange={(e) => {
                                                setBallot({
                                                    ...ballot,
                                                    showDeputy: e.target.checked,
                                                });
                                            }}
                                            name="ballotType2"
                                        />
                                    }
                                    label="Milletvekili"
                                />
                            </FormGroup>
                        </FormControl>
                    )}
                    {currentStep === "pusula-turu" && ballot.ballotType === 2 ? (
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend">Üstteki Pusula</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.topBallot === 2}
                                            onChange={(e) => {
                                                setBallot({
                                                    ...ballot,
                                                    topBallot: 2,
                                                });
                                            }}
                                            name="ballotType4"
                                        />
                                    }
                                    label="2. Tur"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.topBallot === 0}
                                            onChange={(e) => {
                                                setBallot({
                                                    ...ballot,
                                                    topBallot: 0,
                                                });
                                            }}
                                            name="ballotType1"
                                        />
                                    }
                                    label="Cumhurbaşkanı"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.topBallot === 1}
                                            onChange={(e) => {
                                                setBallot({
                                                    ...ballot,
                                                    topBallot: 1,
                                                });
                                            }}
                                            name="ballotType2"
                                        />
                                    }
                                    label="Milletvekili"
                                />
                            </FormGroup>
                        </FormControl>
                    ) : (
                        ""
                    )}

                    {currentStep === "ozel" && (
                        <Button
                            component='label'
                            onChange={addCustomBallot}
                            size="large" sx={{
                            cursor: "pointer",
                            flexShrink: 0,
                            mr: 1,
                            width: 100,
                            height: 80,
                            border: "1px solid lightgray",
                        }} variant="outlined" startIcon={<UploadIcon/>}>
                            Yükle
                            <input
                                type="file"
                                hidden
                            />
                        </Button>)}
                    {currentStep === "ozel" && ballot.ballot3Image !== '' && (
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.showCustom}
                                            onChange={(e) => {
                                                setBallot({
                                                    ...ballot, showCustom: e.target.checked,
                                                    showStamp4: e.target.checked
                                                });
                                            }}
                                            name="customBallot"
                                        />
                                    }
                                    label="Özel Pusula Göster"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={ballot.showStamp4}
                                            onChange={(e) => {
                                                setBallot({...ballot, showStamp4: e.target.checked});
                                            }}
                                            name="customStamp"
                                        />
                                    }
                                    label="2. Mührü Göster"
                                />
                            </FormGroup>
                        </FormControl>
                    )}
                    {currentStep === "ozel" && ballot.showCustom && (
                        <FormControl
                            sx={{
                                mr: "16px",
                            }}
                        >
                            <FormLabel id="demo-radio-buttons-group-label">
                                Özel Mühür 1
                            </FormLabel>

                            <FormControlLabel
                                value={stamps[0]}
                                checked={ballot.stamp3Image === stamps[0]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp3Image: e.target.value,
                                    });
                                }}
                                label="Evet"
                            />
                            <FormControlLabel
                                checked={ballot.stamp3Image === stamps[1]}
                                value={stamps[1]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp3Image: e.target.value,
                                    });
                                }}
                                label="Tercih"
                            />
                        </FormControl>
                    )}

                    {currentStep === "ozel" && ballot.showCustom && (
                        <FormControl
                            sx={{
                                mr: "16px",
                            }}
                        >
                            <FormLabel id="demo-radio-buttons-group-label">
                                Özel Mühür 2
                            </FormLabel>

                            <FormControlLabel
                                value={stamps[0]}
                                checked={ballot.stamp4Image === stamps[0]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp4Image: e.target.value,
                                    });
                                }}
                                label="Evet"
                            />
                            <FormControlLabel
                                checked={ballot.stamp4Image === stamps[1]}
                                value={stamps[1]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp4Image: e.target.value,
                                    });
                                }}
                                label="Tercih"
                            />
                        </FormControl>
                    )}
                    {currentStep === "muhur" && ballot.showSecondRound && (
                        <FormControl
                            sx={{
                                mr: "16px",
                            }}
                        >
                            <FormLabel id="demo-radio-buttons-group-label">
                                2. Tur Mührü
                            </FormLabel>

                            <FormControlLabel
                                value={stamps[0]}
                                checked={ballot.stamp5Image === stamps[0]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp5Image: e.target.value,
                                    });
                                }}
                                label="Evet"
                            />
                            <FormControlLabel
                                checked={ballot.stamp5Image === stamps[1]}
                                value={stamps[1]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp5Image: e.target.value,
                                    });
                                }}
                                label="Tercih"
                            />
                        </FormControl>
                    )}
                    {currentStep === "muhur" && ballot.showPresident && (
                        <FormControl
                            sx={{
                                mr: "16px",
                            }}
                        >
                            <FormLabel id="demo-radio-buttons-group-label">
                                Cumhurbaşkanı Mührü
                            </FormLabel>

                            <FormControlLabel
                                value={stamps[0]}
                                checked={ballot.stamp1Image === stamps[0]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp1Image: e.target.value,
                                    });
                                }}
                                label="Evet"
                            />
                            <FormControlLabel
                                checked={ballot.stamp1Image === stamps[1]}
                                value={stamps[1]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp1Image: e.target.value,
                                    });
                                }}
                                label="Tercih"
                            />
                        </FormControl>
                    )}

                    {currentStep === "muhur" && ballot.showDeputy && (
                        <FormControl
                            sx={{
                                mr: "16px",
                            }}
                        >
                            <FormLabel id="demo-radio-buttons-group-label">
                                Milletvekili Mührü
                            </FormLabel>

                            <FormControlLabel
                                value={stamps[0]}
                                checked={ballot.stamp2Image === stamps[0]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp2Image: e.target.value,
                                    });
                                }}
                                label="Evet"
                            />
                            <FormControlLabel
                                checked={ballot.stamp2Image === stamps[1]}
                                value={stamps[1]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp2Image: e.target.value,
                                    });
                                }}
                                label="Tercih"
                            />
                        </FormControl>
                    )}

                    {currentStep === "muhur" && ballot.showCustom && (
                        <FormControl
                            sx={{
                                mr: "16px",
                            }}
                        >
                            <FormLabel id="demo-radio-buttons-group-label">
                                Özel Resim Mührü 1
                            </FormLabel>

                            <FormControlLabel
                                value={stamps[0]}
                                checked={ballot.stamp3Image === stamps[0]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp3Image: e.target.value,
                                    });
                                }}
                                label="Evet"
                            />
                            <FormControlLabel
                                checked={ballot.stamp3Image === stamps[1]}
                                value={stamps[1]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp3Image: e.target.value,
                                    });
                                }}
                                label="Tercih"
                            />
                        </FormControl>
                    )}
                    {currentStep === "muhur" && ballot.showCustom && (
                        <FormControl
                            sx={{
                                mr: "16px",
                            }}
                        >
                            <FormLabel id="demo-radio-buttons-group-label">
                                Özel Resim Mührü 2
                            </FormLabel>

                            <FormControlLabel
                                value={stamps[0]}
                                checked={ballot.stamp4Image === stamps[0]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp4Image: e.target.value,
                                    });
                                }}
                                label="Evet"
                            />
                            <FormControlLabel
                                checked={ballot.stamp4Image === stamps[1]}
                                value={stamps[1]}
                                control={<Radio/>}
                                onChange={(e) => {
                                    setBallot({
                                        ...ballot,
                                        stamp4Image: e.target.value,
                                    });
                                }}
                                label="Tercih"
                            />
                        </FormControl>
                    )}
                    {currentStep === "indir" && (
                        <Box
                            sx={{
                                display: "flex",
                                flexShrink: 0,
                                flex: 1,
                                pb: 1,
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Stack
                                spacing={2}
                                direction="column"
                                justify={"space-between"}
                                alignItems={"flex-start"}
                            >
                                <Button
                                    sx={{mt: 2}}
                                    variant="contained"
                                    onClick={(e) => {
                                        canvasRef.current.saveImage(e);
                                    }}
                                >
                                    İndir
                                </Button>
                                <Typography sx={{flex: 4}} variant="body2">
                                    İndirmek için tıklayın
                                </Typography>
                            </Stack>
                            <Stack
                                spacing={2}
                                direction="column"
                                justify={"space-between"}
                                alignItems={"flex-start"}
                            ></Stack>
                            <Box>
                                <Typography variant="body2" gutterBottom>
                                    <a href="https://www.twitter.com/midorikocak">Midori Kocak</a>{" "}
                                    tarafından HTML5 ve Javascript kullanılarak yazılmıştır.{" "}
                                    <br/>
                                    <a href="https://www.instagram.com/wthbetul">wthbetul</a>{" "}
                                    tarafından figma kullanarak tasarlanmıştır
                                </Typography>
                            </Box>
                            {<div dangerouslySetInnerHTML={{__html: donate}}/>}
                        </Box>
                    )}
                </Box>
            </Stack>
        </>
    );
}
