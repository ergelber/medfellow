// import { createSelector } from 'reselect';

export const getQuizType = (state) => state.currentQuiz.quizType;

export const getIdx = (state) => state.currentQuiz.idx;

export const getQuestions = (state) => state.currentQuiz.questions;

export const hasPassages = (state) => !!state.currentQuiz.passage;
export const getPassages = (state) => state.currentQuiz.passage;

export const getIsLoading = (state) => state.currentQuiz.isLoading;