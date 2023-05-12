import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  let step = searchParams.get("step");

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
  return (
    <Container
      sx={{
        minWidth: "320px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "scroll",
      }}
      maxWidth="md"
      disableGutters
    >
      <Outlet />
      {location.pathname !== "/pusula/" && (
        <List
          dense
          onWheel={handleScroll}
          sx={{
            flexShrink: 0,
            height: "max-content",
            display: "flex",
            overflowX: "scroll",
            width: "100%",
            flexDirection: "row",
            flexWrap: "nowrap",
            "& .MuiListItemButton-root": {
              flexShrink: 0,
              fontWeight: "regular",
            },
            "& a": {
              textDecoration: "none",
              flexShrink: 0,
              color: "rgba(0, 0, 0, 0.87)",
            },
          }}
        >
          <ListItemButton>
            <Link
              sx={{ fontWeight: step === "zemin" ? "bold" : "regular" }}
              component={RouterLink}
              to="/pusula/create?step=zemin"
            >
              Zemin
            </Link>
          </ListItemButton>
            <ListItemButton>
                <Link
                    sx={{ fontWeight: step === "zemin" ? "bold" : "regular" }}
                    component={RouterLink}
                    to="/pusula/create?step=ozel"
                >
                    Özel Resim
                </Link>
            </ListItemButton>
          <ListItemButton>
            <Link
              sx={{ fontWeight: step === "zarf" ? "bold" : "regular" }}
              component={RouterLink}
              to="/pusula/create?step=zarf"
            >
              Zarf
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Link
              sx={{ fontWeight: step === "pusula-turu" ? "bold" : "regular" }}
              component={RouterLink}
              to="/pusula/create?step=pusula-turu"
            >
              Pusula Türü
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Link
              sx={{ fontWeight: step === "muhur" ? "bold" : "regular" }}
              component={RouterLink}
              to="/pusula/create?step=muhur"
            >
              Mühür
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Link
              sx={{ fontWeight: step === "golge" ? "bold" : "regular" }}
              component={RouterLink}
              to="/pusula/create?step=golge"
            >
              Gölge
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Link
              sx={{ fontWeight: step === "indir" ? "bold" : "regular" }}
              component={RouterLink}
              to="/pusula/create?step=indir"
            >
              İndir
            </Link>
          </ListItemButton>
        </List>
      )}
    </Container>
  );
};

export default Layout;
