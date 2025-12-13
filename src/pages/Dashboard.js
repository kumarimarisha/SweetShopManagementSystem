import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { setSweets, setSearchQuery, setSelectedCategory } from '../redux/slices/sweetsSlice';
import {
  Container,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import SweetCard from '../components/SweetCard';

function Dashboard() {
  const dispatch = useDispatch();
  const { filteredItems, searchQuery, selectedCategory } = useSelector(state => state.sweets);
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    // Fetch sweets from Firestore
    const unsubscribe = onSnapshot(collection(db, 'sweets'), (snapshot) => {
      const sweets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setSweets(sweets));

      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(sweets.map(sweet => sweet.category))];
      setCategories(uniqueCategories);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        🍬 Welcome to SweetShop
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search sweets by name or description..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          variant="outlined"
          size="small"
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
            label="Category"
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Sweets Grid */}
      {filteredItems.length > 0 ? (
        <Grid container spacing={3}>
          {filteredItems.map(sweet => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sweet.id}>
              <SweetCard sweet={sweet} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No sweets found. Try adjusting your search or filters.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Dashboard;
