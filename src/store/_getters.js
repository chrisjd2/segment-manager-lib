export default {
    get_market(state) {
        return state.market;
    },
    get_brief(state) {
        return state.brief;
    },
    get_profiles(state) {
        return state.profiles;
    },
    get_segments(state) {
        return state.segments;
    },
    get_isLastPage(state) {
        return state.currentPage < state.numberOfPages;
    },
    get_loadingItems(state) {
        return state.loadingItems;
    },
    get_query(state) {
        return state.query;
    },
    get_segment_settings(state) {
        return state.settings;
    },
    get_selectedSegment(state) {
        return state.selectedSegment;
    },
    get_segmentModel(state) {
        return state.segmentModel;
    },
    get_selectedSegmentType(state) {
        return state.selectedSegmentType;
    },
    get_activeTab(state) {
        return state.activeTab;
    },
    get_audienceType(state) {
        return state.audienceType;
    },
    get_aiQuery(state) {
        return state.aiQuery;
    },
};