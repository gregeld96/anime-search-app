import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TabType = 'episodes' | 'characters' | 'details';

interface TabState {
    activeTab: TabType;
}

const initialState: TabState = {
    activeTab: 'episodes',
};

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<TabType>) => {
            state.activeTab = action.payload;
        },
    },
});

export const { setActiveTab } = tabSlice.actions;
export const selectActiveTab = (state: { tab: TabState }) => state.tab.activeTab;
export default tabSlice.reducer;