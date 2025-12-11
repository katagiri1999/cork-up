import LaunchIcon from '@mui/icons-material/Launch';
import { Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';

function Links() {

  return (
    <>
      <List sx={{ mt: 3 }}>
        <ListItem>
          <Button
            component={Link}
            to="/information"
            target="_blank"
          >
            Information
            <LaunchIcon sx={{ ml: 1, fontSize: 15 }} />
          </Button>
        </ListItem>
        <ListItem>
          <Button
            component={Link}
            to="https://github.com/katagiri1999/cork-up"
            target="_blank"
          >
            Github
            <LaunchIcon sx={{ ml: 1, fontSize: 15 }} />
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default Links;