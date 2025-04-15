import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents, fetchEventById } from '../services/api';

export const getEvents = createAsyncThunk('events/getEvents', fetchEvents);
export const getEventDetails = createAsyncThunk('events/getEventDetails', async (id) => {
  const res = await fetchEventById(id);
  return res.data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: { list: [], event: {}, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => { state.loading = true; })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getEventDetails.fulfilled, (state, action) => {
        state.event = action.payload;
        state.loading = false;
      });
  },
});

export default eventsSlice.reducer;
