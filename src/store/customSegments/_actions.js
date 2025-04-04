/* eslint-disable */
import {
    fetchDataBaseModel,
    fetchCustomSegmentSettings,
    generateAiQuery,
    runQuery,
  } from '@/api/segmentManager'



export default {
  async fetch_database_model(platform, location) {
    try {
      const databaseModel = await fetchDataBaseModel(platform, location);
      this.set_custom_database_model(databaseModel.data);
    } catch (error) {
      const apiError = {
        error: error,
        headline: 'Error',
        message:
          error.response.data ||
          'Sorry, an error occurred while getting your data.'
      };
      this.set_ApiError(apiError);
    }
  },
  async fetch_custom_segment_settings(brandId) {
    try {
        const segmentSettings = await fetchCustomSegmentSettings(brandId);
        this.set_custom_segment_settings(segmentSettings.data);
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
  async generate_ai_query(query, platform) {
    try {
      const aiGeneratedQuery = await generateAiQuery(query, platform);
      return aiGeneratedQuery.data;
    } catch (error) {
      const apiError = {
        error: error,
        headline: 'Error',
        message:
          error?.response?.data ||
          'Sorry, an error occurred while generating your query.'
      };
      this.set_ApiError(apiError);
    }
  },
  async validate_query(query) {
    try {
      const isQueryValid = await validateQuery(query);
    } catch (error) {
      const apiError = {
        error: error,
        headline: 'Error',
        message:
          error?.response?.data ||
          'Sorry, an error occurred while validating your query.'
      };
      this.set_ApiError(apiError);
    }
  },
  async run_query(query, platform) {
    try {
      const segmentCount = await runQuery(query, platform);
      return segmentCount.count;
    } catch (error) {
      const apiError = {
        error: error,
        headline: 'Error',
        message:
          error?.response?.data ||
          'Sorry, an error occurred while validating your query.'
      };
      this.set_ApiError(apiError);
    }
  },
  set_ApiError(apiError) {
    this.apiError = apiError;
  },
  set_custom_segment_settings(settings) {
    this.settings = settings;
  },
  set_customSegmentUrl(customSegmentUrl) {
    this.customSegmentUrl = customSegmentUrl;
  },
  set_custom_database_model(databaseModel) {
    this.databaseModel = databaseModel;
  },
  set_ai_generated_message(aiGeneratedMessage) {
    this.aiGeneratedInfoMessage = aiGeneratedMessage;
  },
  set_ai_generated_query(aiGeneratedQuery) {
    this.aiGeneratedQuery = aiGeneratedQuery;
  },
  set_free_form_query(freeFormQuery) {
    this.freeFormQuery = freeFormQuery;
  },
};