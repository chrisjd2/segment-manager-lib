/* eslint-disable */
import {
    fetchAppConfig,
    fetchSegments,
    fetchSegmentSettings,
    fetchInsights,
  } from '@/api/segmentManager'

 
export default {
    async fetch_appSettings() {
        try {
          const appSettings = await fetchAppConfig()
          this.set_appSettings(appSettings)
        } catch (apiError) {
          this.set_ApiError(apiError)
          throw apiError
        }
      },
      set_appSettings(appSettings) {
        this.appSettings = appSettings
      },
      set_applicationType(applicationType) {
        this.applicationType = applicationType;
    },
    async fetch_insights() {
        try {
            const response = await fetchInsights(this.brandId, this.tenantId);
            return response;
        } catch (error) {
            const apiError = {
              error: error,
              headline: 'Error',
              message:
                error.response ||
                'Sorry, an error occurred while getting insights your data.'
            }
            this.set_ApiError(apiError)
        }},    
    async fetch_segments() {
        try {
            // Standalone version uses the profile to get the demographics
            if(Object.keys(this.profile).length > 0 && this.profile.market.length > 0 && this.applicationType === "standalone"){
               this.set_demographics(this.profile);
            } else if(this.brief.region && this.brief.market && this.brief.language && this.brief.channel) {
             // The embedded version uses the brief to get the demographics
                const demographics = {
                    region: this.brief.region,
                    market: this.brief.market,
                    language: this.brief.language,
                    channel: this.brief.channel,
                }
                this.set_demographics(demographics);
            }
                const selectedPlatform = this.platform || 1;
                this.currentPage = 1;
                const queryParams = {
                    ...this.query,
                    page: 1,
                };
               
                const segments = await fetchSegments(queryParams, selectedPlatform);
                let mappedSegments
                        if(segments?.data) {
                            mappedSegments = segments.data.map((segment) => {
                                const mappedSegment = {
                                    ...segment,
                                    status: {
                                        type: segment.status,
                                        value: segment.status ? segment.status : 'active',
                                        color: this.stateColors[segment.status],
                                    },
                                };
                                return mappedSegment;
                            });
                        }
                        this.set_numberOfPages(segments.totalPages);
                        this.set_segments(mappedSegments);
            } catch (error) {
            const apiError = {
              error: error,
              headline: 'Error',
              message:
                error.response ||
                'Sorry, an error occurred while getting your data.'
            }
            this.set_ApiError(apiError)
    } },
    async fetch_nextSegmentPage() {
        const platform  = this.platform;

        const queryParams = {
            ...this.query,
            page: this.currentPage + 1,
        };
        try {
            const segments = await fetchSegments(queryParams, platform);
            const mappedSegments = segments.data.map((segment) => {
                const mappedSegment = {
                    ...segment,
                    status: {
                        type: segment.status,
                        value: segment.status ? segment.status : 'active',
                        color: this.stateColors[segment.status],
                    },
                };
                return mappedSegment;
            });
            this.set_numberOfPages(segments.totalPages);
            this.add_segments(mappedSegments);
        } catch (error) {
            const apiError = {
              error: error,
              headline: 'Error',
              message:
                error.response?.data ||
                'Sorry, an error occurred while getting your data.'
            }
            this.set_ApiError(apiError)
    }},
    async fetch_segment_settings(brandId) {
        try {
            const segmentSettings = await fetchSegmentSettings(brandId);
            this.set_segment_settings(segmentSettings.data);
        } catch (error) {
            const apiError = {
              error: error,
              headline: 'Error',
              message:
                error.response?.data ||
                'Sorry, an error occurred while getting your data.'
            }
            this.set_ApiError(apiError)
    }
    },
    set_ApiError(apiError) {
        this.apiError = apiError
      },
    set_tenantId(tenantId) {
        this.tenantId = tenantId;
    },
    set_brandId(brandId) {
        this.brandId = brandId;
    },
    set_baseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    },
    set_token(token) {
        this.token = token;
    },
    set_brief(selectedBrief) {
        this.brief = selectedBrief; 
        },
    set_profile(selectedProfile) {
        this.profile = selectedProfile; 
        },
    set_demographics(demographics) {
        this.query = {
            ...this.query,
            demographics: demographics,
        }
    },
    set_segments(segments) {
        if (segments) {
            this.segments = segments;
        } else {
            this.segments = null;
        }
    },
    set_numberOfPages(totalPages) {
        this.numberOfPages = totalPages;
    },
    set_platform(platform) {
        this.platform = platform;
    },
    set_query(query) {
        this.query = query;
    },
    set_searchTerm(searchTerm) {
        if(!searchTerm) {
            delete this.query.searchTerm
        }
        this.query.searchTerm = searchTerm;
    },
    set_filterQuery(filterQuery) {
        this.query = {
            ...this.query,
            ...filterQuery.value,
        };
    },
    reset_filterQuery() {
        this.query.page = 1;
        this.query = {
            ...this.query,
            name: null,
            description: null,
            count: null,
            status: null,
        };
    },
    set_sortQuery(sortQuery) {
        this.query.sortDirection = sortQuery.sortOrder === 1 ? 'asc' : 'desc';
        this.query.sortField = sortQuery.sortColumn;
        this.query = {
            ...this.query,
        };
    },
    set_categoryQuery( category) {
        this.query.category = category;
    },
    set_locationQuery( location) {
        this.query.location = location;
    },
    add_segments(items) {
        this.segments.push(...items);
        this.currentPage += 1;
    },
    set_loadingItems(loadingItems) {
        this.loadingItems = loadingItems;
    },
    remove_SortQuery(state) {
        this.sortQuery = null;
    },
    set_segment_settings(settings) {
        this.settings = settings;
    },
    set_market( market) {
        this.market = market;
    },
    set_selectedSegment( selectedSegment) {
        this.selectedSegment = selectedSegment;
    },
    set_selectedSegmentType( selectedSegmentType) {
        this.selectedSegmentType = selectedSegmentType;
    },
    set_activeTab( tab) {
        this.activeTab = tab;
    },
    set_audienceType( audienceType) {
        this.audienceType = audienceType;
    },
};
