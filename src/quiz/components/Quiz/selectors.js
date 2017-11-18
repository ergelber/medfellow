// import { createSelector } from 'reselect';

export const getIdx = (state) => state.currentQuiz.idx;

export const getQuestions = (state) => state.currentQuiz.questions;

export const getIsLoadingQuestions = (state) => state.currentQuiz.isLoadingQuestions;