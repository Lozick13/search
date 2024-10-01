import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { debounce, put, retry, spawn, takeLatest } from 'redux-saga/effects';
import { searchSkills } from '../../api';
import { ACTION_TYPES } from '../../models/action';
import { Skill } from '../../models/skills';
import {
	searchSkillsFailure,
	searchSkillsRequest,
	searchSkillsSuccess,
} from '../slices/skillsSlice';

function filterChangeSearchAction(action: PayloadAction<string>) {
	return (
		action.type === ACTION_TYPES.CHANGE_SEARCH_FIELD &&
		action.payload.trim() !== ''
	);
}

function* handleChangeSearchSaga(action: PayloadAction<string>) {
	yield put(searchSkillsSuccess(null));
	if (filterChangeSearchAction(action)) {
		yield put(searchSkillsRequest());
		yield put(getSkills(action.payload));
	}
}

function* handleSearchSkillsSaga(action: PayloadAction<string>) {
	try {
		const retryCount = 2;
		const retryDelay = 500;

		const data: Skill[] = yield retry(
			retryCount,
			retryDelay,
			searchSkills,
			action.payload
		);
		yield put(searchSkillsSuccess(data));
	} catch (error: unknown) {
		let errorMessage: string;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Unknown error';
		}

		yield put(searchSkillsFailure(errorMessage));
	}
}

function* watchChangeSearchSaga() {
	yield debounce(300, ACTION_TYPES.CHANGE_SEARCH_FIELD, handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
	yield takeLatest(ACTION_TYPES.SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

export function* saga() {
	yield spawn(watchChangeSearchSaga);
	yield spawn(watchSearchSkillsSaga);
}

export const getSkills = createAction<string>(
	ACTION_TYPES.SEARCH_SKILLS_REQUEST
);
