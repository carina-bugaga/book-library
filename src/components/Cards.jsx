import React, { useState } from 'react'
import bookImg from '../images/book.png'
import Modal from './Modal'
import {
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material'

const Cards = ({ book }) => {
  const [open, setOpen] = useState(false)
  const [bookItem, setBookItem] = useState()

  const handleClose = () => setOpen(!open)

  const capitalize = (str) => {
    return (
      String(str).toUpperCase().slice(0, 1) + String(str).toLowerCase().slice(1)
    )
  }

  return (
    <Grid container spacing={4} sx={{ mt: '1.5rem' }}>
      {book.map((item, index) => {
        let categories = item.volumeInfo.categories
        let title = item.volumeInfo.title
        let thumbnail = item.volumeInfo.imageLinks
        let authors =
          item.volumeInfo.authors !== undefined &&
          item.volumeInfo.authors.length > 1
            ? item.volumeInfo.authors.join(', ')
            : item.volumeInfo.authors

        return (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <Grid container justifyContent="center">
                <ButtonBase
                  sx={{
                    width: 200,
                    height: 300,
                    mt: '5px',
                  }}
                  onClick={() => {
                    setBookItem(item)
                    setOpen(true)
                  }}
                >
                  {thumbnail !== undefined ? (
                    <CardMedia
                      component="img"
                      image={thumbnail.thumbnail}
                      alt={title}
                      sx={{
                        width: 200,
                        height: '95%',
                        overflow: 'hidden',
                      }}
                    />
                  ) : (
                    <img
                      src={bookImg}
                      alt={title}
                      sx={{
                        width: 200,
                        height: '95%',
                        overflow: 'hidden',
                      }}
                    />
                  )}
                </ButtonBase>
              </Grid>

              <CardContent>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {authors !== undefined ? authors : <br />}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    textDecoration: 'underline',
                  }}
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                >
                  {categories !== undefined ? capitalize(categories) : <br />}
                </Typography>
              </CardContent>
            </Card>
            {open ? (
              <Modal open={open} close={handleClose} item={bookItem} />
            ) : (
              ''
            )}
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Cards
