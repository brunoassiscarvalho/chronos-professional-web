import { Grid } from '@mui/material';
import TileContent from '../../components/atoms/TileContent';
import Content from '../../components/organisms/Content';

export default function Home() {
  return (
    <Content title="Início" withoutGoBack>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <a
            target="_blank"
            href="https://whatsa.me/5561998320282/?t=ola!"
            rel="noreferrer"
          >
            <TileContent color="secondary.light" minHeight={320}>
              <></>
            </TileContent>
          </a>
        </Grid>
        <Grid item xs={3}>
          <TileContent>
            <></>
          </TileContent>
        </Grid>
        <Grid item xs={3}>
          <TileContent>
            <></>
          </TileContent>
        </Grid>
        <Grid item xs={3}>
          <TileContent>
            <></>
          </TileContent>
        </Grid>
        <Grid item xs={3}>
          <TileContent>
            <></>
          </TileContent>
        </Grid>
      </Grid>
    </Content>
  );
}
