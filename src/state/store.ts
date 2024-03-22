import { configureStore } from "@reduxjs/toolkit";

import fruitsSlice from "./fruits/fruitsSlice";

export const store = configureStore({
  reducer: {
    fruitsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
