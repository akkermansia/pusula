import * as React from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import {
    Link as RouterLink,
} from 'react-router-dom';


import Avatar from "@mui/material/Avatar";

export default function Landing() {
    let donate = `
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick">
              <input type="hidden" name="hosted_button_id" value="7N3QMNGG26ZYC">
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit"
                       alt="PayPal - The safer, easier way to pay online!">
                  <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
          </form>
         `;
    return (
        <Container
            sx={{minWidth: "320px", display: "flex", py: 4, height: "100vh"}}
            maxWidth="sm"
        >
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    textAlign: "center",
                    flexDirection: "column",
                }}
            >
                <Stack
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        flex: 1,
                    }}
                    direction="column"
                >
                    <Typography sx={{mt: 8}} variant="h4" component="h1" gutterBottom>
                        Oy pusulası fotoğrafı yapıcı <br/> 2. Tur
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Oy pusulası fotoğrafı isteyen işyerleri için, oy pusulası fotoğrafı
                        yapıcı
                    </Typography>
                    <Button component={RouterLink} to="/create?step=zemin" size="large" variant="contained">
                        Oy Pusulanı Hazırla
                    </Button>
                </Stack>
                <Stack alignItems="center" spacing={2} direction="column">
                    <Typography variant="body2" gutterBottom>
                        <a href="https://www.twitter.com/midorikocak">Midori Kocak</a>{" "}
                        tarafından HTML5 ve Javascript kullanılarak yazılmıştır. <br/>
                        <a href="https://www.instagram.com/wthbetul">wthbetul</a> tarafından
                        figma kullanarak tasarlanmıştır
                    </Typography>
                    {<div dangerouslySetInnerHTML={{__html: donate}}/>}
                    <Typography variant="body1" gutterBottom>
                        1 oy Kemal'e, 1 oy TİP'e
                    </Typography>
                </Stack>
            </Box>
        </Container>
    );
}
