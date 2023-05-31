import React from 'react'
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Grid container justifyContent="center">
              <Typography variant="h6" component="span">
                Search for books
              </Typography>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
export default Header
