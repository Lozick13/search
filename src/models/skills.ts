export interface Skill {
	id: number;
	name: string;
}

export interface SkillsState {
	items: Skill[] | null;
	loading: boolean;
	error: string | null;
	search: string;
}