import React, { useState } from 'react'
import axios from 'axios'
import Cards from './Cards'
import Image from '../images/books.jpg'
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

let startIndex = 0

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    borderRadius: 0,
    boxShadow: 'none',
    height: 340,
  },
}

const Search = () => {
  const [search, setSearch] = useState('')
  const [bookData, setBookData] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('relevance')

  const searchBook = () => {
    if (search.length > 0) {
      setIsLoading(true)
      let categories = category !== 'all' ? '+subject:' + category : ''
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=+intitle:' +
            search +
            categories +
            '&orderBy=' +
            sort +
            '&printType=books' +
            '&maxResults=28' +
            '&startIndex=' +
            startIndex +
            '&key=AIzaSyAGUuS0vkMEH6QSKUhCA3kBBldTnBbORPs'
        )

        .then((response) => {
          if (response.data.totalItems > 0) {
            startIndex === 0
              ? setBookData(response.data.items)
              : setBookData([...bookData, ...response.data.items])
          }
          setTotalItems(response.data.totalItems)
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false))
    }
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleChangeSort = (e) => {
    setSort(e.target.value)
  }

  return (
    <>
      <Paper style={styles.paperContainer}>
        <Container>
          <Grid container justifyContent="center">
            <TextField
              sx={{ mt: 2, mb: 1, width: 300 }}
              type="search"
              label="Enter Your Book Name"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  startIndex = 0
                  searchBook()
                }
              }}
            />
          </Grid>

          <Grid container justifyContent="center">
            <TextField
              label="Categories"
              select
              value={category}
              onChange={handleChangeCategory}
              size="medium"
              sx={{ m: 1, width: 300 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="art">Art</MenuItem>
              <MenuItem value="biography">Biography</MenuItem>
              <MenuItem value="computers">Computers</MenuItem>
              <MenuItem value="history">History</MenuItem>
              <MenuItem value="medical">Medical</MenuItem>
              <MenuItem value="poetsy">Poetsy</MenuItem>
            </TextField>
          </Grid>

          <Grid container justifyContent="center">
            <TextField
              label="Sorting by"
              select
              value={sort}
              onChange={handleChangeSort}
              size="medium"
              sx={{ m: 1, width: 300 }}
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </TextField>
          </Grid>

          <Grid container justifyContent="center">
            <Button
              sx={{ m: 1 }}
              variant="contained"
              onClick={() => {
                startIndex = 0
                searchBook()
              }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>

          <Grid
            container
            justifyContent="space-around"
            sx={{ display: 'flex' }}
          >
            {isLoading ? (
              <CircularProgress sx={{ m: 1.5 }} />
            ) : (
              <Typography
                sx={{ mt: 1.5 }}
                gutterBottom
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Found {totalItems} results
              </Typography>
            )}
          </Grid>
        </Container>
      </Paper>
      <Container sx={{ mt: '1rem' }}>
        {totalItems > 0 ? <Cards book={bookData} /> : ''}

        {totalItems > 0 && totalItems - startIndex > 28 ? (
          <Grid container justifyContent="space-around">
            <Button
              variant="contained"
              sx={{ mt: '2rem', mb: '2rem' }}
              onClick={() => {
                startIndex += 28
                searchBook()
              }}
            >
              LOAD MORE
            </Button>
          </Grid>
        ) : (
          ''
        )}

        <Container sx={{ mt: '3rem' }} />
      </Container>
    </>
  )
}

export default Search
