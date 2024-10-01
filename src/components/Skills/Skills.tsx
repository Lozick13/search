import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSearchField } from '../../redux/slices/skillsSlice';
import classes from './skills.module.css';

const Skills = () => {
	const dispatch = useAppDispatch();
	const { items, loading, error, search } = useAppSelector(
		state => state.skills
	);

	const hasQuery = search.trim() !== '';
	const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(changeSearchField(evt.target.value));
	};

	return (
		<main className={classes['search']}>
			<input
				className={classes['search__input']}
				type='search'
				value={search}
				onChange={handleSearch}
				aria-label='Search skills'
			/>

			<span className={classes['search__status']}>
				{!hasQuery && 'Type something to search'}
				{hasQuery && loading && 'Searching...'}
				{error && `Error occurred: ${error}`}
			</span>

			<ul className={classes['search__items']}>
				{!error &&
					items &&
					items.map(skill => <li key={skill.id}>{skill.name}</li>)}
			</ul>
		</main>
	);
};

export default Skills;
