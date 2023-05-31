import React from 'react'
import bookImg from '../images/book.png'
import { Backdrop, Box, CardMedia, Grid, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '52%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#b4bfff',
  borderRadius: '1rem',
  p: 2,
}

const Modal = ({ open, close, item }) => {
  const cutDescription = (str) => {
    return str.slice(0, 500) + '...'
  }

  let thumbnail = item.volumeInfo.imageLinks
  let authors =
    item.volumeInfo.authors !== undefined && item.volumeInfo.authors.length > 1
      ? item.volumeInfo.authors.join(', ')
      : item.volumeInfo.authors

  return (
    <Backdrop
      open={open}
      onClick={close}
      sx={{
        bgcolor: 'rgba(0,0,0,0)',
        zIndex: 'drawer',
        p: 2,
      }}
    >
      <Grid container spacing={2} item sx={style} xs={10} md={8}>
        <Grid sx={{ p: 1 }}>
          {thumbnail !== undefined ? (
            <CardMedia
              component="img"
              image={thumbnail.thumbnail}
              alt={item.volumeInfo.title}
              sx={{
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
                overflow: 'hidden',
              }}
            />
          ) : (
            <img
              src={bookImg}
              alt={item.volumeInfo.title}
              sx={{ height: 300, width: 200, overflow: 'hidden' }}
            />
          )}
        </Grid>

        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography
              sx={{
                fontSize: 13,
                textDecoration: 'underline',
              }}
              variant="caption"
              color="text.secondary"
              gutterBottom
            >
              {item.volumeInfo.categories !== undefined
                ? item.volumeInfo.categories
                : ''}
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
              {item.volumeInfo.title}
            </Typography>

            <Typography
              sx={{ textDecoration: 'underline' }}
              variant="body2"
              gutterBottom
            >
              {authors !== undefined ? authors : ''}
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="caption" display="block" gutterBottom>
                {item.volumeInfo.description !== undefined
                  ? cutDescription(item.volumeInfo.description)
                  : ''}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  )
}

export default Modal
