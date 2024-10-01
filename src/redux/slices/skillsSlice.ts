import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Skill, SkillsState } from '../../models/skills';

const initialState: SkillsState = {
	items: null,
	loading: false,
	error: null,
	search: '',
};

export const skillsSlice = createSlice({
	name: 'skills',
	initialState,
	reducers: {
		searchSkillsRequest: state => {
			state.loading = true;
			state.error = null;
		},
		searchSkillsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		searchSkillsSuccess: (state, action: PayloadAction<Skill[] | null>) => {
			state.items = action.payload;
			state.loading = false;
			state.error = null;
		},
		changeSearchField: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
});

export const {
	searchSkillsRequest,
	searchSkillsFailure,
	searchSkillsSuccess,
	changeSearchField,
} = skillsSlice.actions;

const skillsReducer = skillsSlice.reducer;
export default skillsReducer;
