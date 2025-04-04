import { defineStore } from 'pinia';
import actions from './_actions';
import getters from './_getters';

export const useCustomSegmentStore = defineStore('customSegmentStore', {
    state: () => ({
        customSegmentUrl: '',
        databaseModel: [],
        settings: null,
        aiGeneratedInfo: null,
        aiGeneratedQuery: null,
        aiGeneratedInfoMessage: null,
        freeFormQuery: null,
    }),
    actions,
    getters,
});
