export default {
    get_segment_settings(state) {
        return state.settings;
    },
    get_databaseModel(state) {
        return state.databaseModel;
    },
    get_aiGeneratedQuery(state) {
        return state.aiGeneratedQuery;
    },
    get_aiGeneratedMessage(state) {
        return state.aiGeneratedInfoMessage;
    }
};