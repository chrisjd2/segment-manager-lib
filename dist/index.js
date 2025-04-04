import { ref as G, computed as Fe, watch as Xt, createElementBlock as y, openBlock as h, normalizeClass as Me, createElementVNode as p, createCommentVNode as L, normalizeStyle as hn, createBlock as ue, unref as C, Fragment as me, renderList as Ae, createTextVNode as je, toDisplayString as j, withKeys as Ba, renderSlot as ji, createVNode as H, onMounted as xn, onUnmounted as t2, resolveComponent as dl, withCtx as Tt, withModifiers as n2, nextTick as ol } from "vue";
import { CataUiInputCheckbox as mn, CataUiIcon as Dt, CataUiStatusLabel as i2, CataUiInputDate as fl, CataUiInputSelect as wt, CataUiInput as Ct, CataUiButton as st, CataUiModal as pl, CataUiTabs as Da, CataUiSpinner as Rn, CataUiTabSwitch as r2 } from "@catalyst/ui-library";
import { defineStore as hl } from "pinia";
import si from "axios";
import gn from "dayjs";
import { CataCoreUiChart as ml } from "@catalyst-core/ui-library";
import { v4 as wa } from "uuid";
import { Container as Ia, Draggable as a2 } from "vue3-smooth-dnd";
import { LottieAnimation as s2 } from "lottie-web-vue";
import { useIntersectionObserver as l2, promiseTimeout as o2 } from "@vueuse/core";
const u2 = {
  async fetch_database_model(o, D) {
    try {
      const a = await h2(o, D);
      this.set_custom_database_model(a.data);
    } catch (a) {
      const A = {
        error: a,
        headline: "Error",
        message: a.response.data || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(A);
    }
  },
  async fetch_custom_segment_settings(o) {
    var D;
    try {
      const a = await m2(o);
      this.set_custom_segment_settings(a.data);
    } catch (a) {
      const A = {
        error: a,
        headline: "Error",
        message: ((D = a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(A);
    }
  },
  async generate_ai_query(o, D) {
    var a;
    try {
      return (await x2(o, D)).data;
    } catch (A) {
      const k = {
        error: A,
        headline: "Error",
        message: ((a = A == null ? void 0 : A.response) == null ? void 0 : a.data) || "Sorry, an error occurred while generating your query."
      };
      this.set_ApiError(k);
    }
  },
  async validate_query(o) {
    var D;
    try {
      const a = await validateQuery(o);
    } catch (a) {
      const A = {
        error: a,
        headline: "Error",
        message: ((D = a == null ? void 0 : a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(A);
    }
  },
  async run_query(o, D) {
    var a;
    try {
      return (await g2(o, D)).count;
    } catch (A) {
      const k = {
        error: A,
        headline: "Error",
        message: ((a = A == null ? void 0 : A.response) == null ? void 0 : a.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(k);
    }
  },
  set_ApiError(o) {
    this.apiError = o;
  },
  set_custom_segment_settings(o) {
    this.settings = o;
  },
  set_customSegmentUrl(o) {
    this.customSegmentUrl = o;
  },
  set_custom_database_model(o) {
    this.databaseModel = o;
  },
  set_ai_generated_message(o) {
    this.aiGeneratedInfoMessage = o;
  },
  set_ai_generated_query(o) {
    this.aiGeneratedQuery = o;
  },
  set_free_form_query(o) {
    this.freeFormQuery = o;
  }
}, c2 = {
  get_segment_settings(o) {
    return o.settings;
  },
  get_databaseModel(o) {
    return o.databaseModel;
  },
  get_aiGeneratedQuery(o) {
    return o.aiGeneratedQuery;
  },
  get_aiGeneratedMessage(o) {
    return o.aiGeneratedInfoMessage;
  }
}, tr = hl("customSegmentStore", {
  state: () => ({
    customSegmentUrl: "",
    databaseModel: [],
    settings: null,
    aiGeneratedInfo: null,
    aiGeneratedQuery: null,
    aiGeneratedInfoMessage: null,
    freeFormQuery: null
  }),
  actions: u2,
  getters: c2
}), yn = "", nr = si.create(), li = si.create();
si.create();
nr.interceptors.request.use(
  (o) => {
    const D = Jt();
    return o.baseURL = D.baseUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", gl(o), o;
  },
  (o) => Promise.reject(o)
);
li.interceptors.request.use(
  (o) => {
    const D = Jt(), a = tr();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, gl(o), o;
  },
  (o) => Promise.reject(o)
);
const d2 = () => si.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), gl = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, ul = (o, D) => nr.get(`${yn}/api/v1/segments/${D ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), f2 = (o) => nr.get(`${yn}/api/v1/insights/${o}`, { params: queryParams }).then((D) => D.data).catch((D) => {
  throw D;
}), p2 = () => nr.get(`${yn}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), h2 = (o, D) => li.get(`${yn}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), m2 = () => li.get(`${yn}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), g2 = (o, D) => li.post(`${yn}/api/v1/query/${D}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), x2 = (o, D) => li.post(`${yn}/api/v1/query/gen/${D}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), y2 = {
  async fetch_appSettings() {
    try {
      const o = await d2();
      this.set_appSettings(o);
    } catch (o) {
      throw this.set_ApiError(o), o;
    }
  },
  set_appSettings(o) {
    this.appSettings = o;
  },
  set_applicationType(o) {
    this.applicationType = o;
  },
  async fetch_insights() {
    try {
      return await f2(this.brandId, this.tenantId);
    } catch (o) {
      const D = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting insights your data."
      };
      this.set_ApiError(D);
    }
  },
  async fetch_segments() {
    try {
      if (Object.keys(this.profile).length > 0 && this.profile.market.length > 0 && this.applicationType === "standalone")
        this.set_demographics(this.profile);
      else if (this.brief.region && this.brief.market && this.brief.language && this.brief.channel) {
        const k = {
          region: this.brief.region,
          market: this.brief.market,
          language: this.brief.language,
          channel: this.brief.channel
        };
        this.set_demographics(k);
      }
      const o = this.platform || 1;
      this.currentPage = 1;
      const D = {
        ...this.query,
        page: 1
      }, a = await ul(D, o);
      let A;
      a != null && a.data && (A = a.data.map((k) => ({
        ...k,
        status: {
          type: k.status,
          value: k.status ? k.status : "active",
          color: this.stateColors[k.status]
        }
      }))), this.set_numberOfPages(a.totalPages), this.set_segments(A);
    } catch (o) {
      const D = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(D);
    }
  },
  async fetch_nextSegmentPage() {
    var a;
    const o = this.platform, D = {
      ...this.query,
      page: this.currentPage + 1
    };
    try {
      const A = await ul(D, o), k = A.data.map((M) => ({
        ...M,
        status: {
          type: M.status,
          value: M.status ? M.status : "active",
          color: this.stateColors[M.status]
        }
      }));
      this.set_numberOfPages(A.totalPages), this.add_segments(k);
    } catch (A) {
      const k = {
        error: A,
        headline: "Error",
        message: ((a = A.response) == null ? void 0 : a.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(k);
    }
  },
  async fetch_segment_settings(o) {
    var D;
    try {
      const a = await p2(o);
      this.set_segment_settings(a.data);
    } catch (a) {
      const A = {
        error: a,
        headline: "Error",
        message: ((D = a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(A);
    }
  },
  set_ApiError(o) {
    this.apiError = o;
  },
  set_tenantId(o) {
    this.tenantId = o;
  },
  set_brandId(o) {
    this.brandId = o;
  },
  set_baseUrl(o) {
    this.baseUrl = o;
  },
  set_token(o) {
    this.token = o;
  },
  set_brief(o) {
    this.brief = o;
  },
  set_profile(o) {
    this.profile = o;
  },
  set_demographics(o) {
    this.query = {
      ...this.query,
      demographics: o
    };
  },
  set_segments(o) {
    o ? this.segments = o : this.segments = null;
  },
  set_numberOfPages(o) {
    this.numberOfPages = o;
  },
  set_platform(o) {
    this.platform = o;
  },
  set_query(o) {
    this.query = o;
  },
  set_searchTerm(o) {
    o || delete this.query.searchTerm, this.query.searchTerm = o;
  },
  set_filterQuery(o) {
    this.query = {
      ...this.query,
      ...o.value
    };
  },
  reset_filterQuery() {
    this.query.page = 1, this.query = {
      ...this.query,
      name: null,
      description: null,
      count: null,
      status: null
    };
  },
  set_sortQuery(o) {
    this.query.sortDirection = o.sortOrder === 1 ? "asc" : "desc", this.query.sortField = o.sortColumn, this.query = {
      ...this.query
    };
  },
  set_categoryQuery(o) {
    this.query.category = o;
  },
  set_locationQuery(o) {
    this.query.location = o;
  },
  add_segments(o) {
    this.segments.push(...o), this.currentPage += 1;
  },
  set_loadingItems(o) {
    this.loadingItems = o;
  },
  remove_SortQuery(o) {
    this.sortQuery = null;
  },
  set_segment_settings(o) {
    this.settings = o;
  },
  set_market(o) {
    this.market = o;
  },
  set_selectedSegment(o) {
    this.selectedSegment = o;
  },
  set_selectedSegmentType(o) {
    this.selectedSegmentType = o;
  },
  set_activeTab(o) {
    this.activeTab = o;
  },
  set_audienceType(o) {
    this.audienceType = o;
  }
}, k2 = {
  get_market(o) {
    return o.market;
  },
  get_brief(o) {
    return o.brief;
  },
  get_profiles(o) {
    return o.profiles;
  },
  get_segments(o) {
    return o.segments;
  },
  get_isLastPage(o) {
    return o.currentPage < o.numberOfPages;
  },
  get_loadingItems(o) {
    return o.loadingItems;
  },
  get_query(o) {
    return o.query;
  },
  get_segment_settings(o) {
    return o.settings;
  },
  get_selectedSegment(o) {
    return o.selectedSegment;
  },
  get_segmentModel(o) {
    return o.segmentModel;
  },
  get_selectedSegmentType(o) {
    return o.selectedSegmentType;
  },
  get_activeTab(o) {
    return o.activeTab;
  },
  get_audienceType(o) {
    return o.audienceType;
  },
  get_aiQuery(o) {
    return o.aiQuery;
  }
}, Jt = hl("segmentManagerStore", {
  state: () => ({
    baseUrl: "https://sm-standard-segments-838902823068.europe-west2.run.app",
    applicationType: "",
    tenantId: "",
    brandId: "3",
    token: "",
    brief: {},
    profiles: [],
    profile: {},
    selectedProfile: null,
    stateColors: {
      active: "#28a745",
      inactive: "#999999",
      pending: "#ffc107"
    },
    isFetchingSegments: !1,
    activeTab: "standard",
    segments: [],
    platform: 1,
    currentPage: 1,
    numberOfPages: null,
    segmentDatabaseModel: [],
    query: {
      page: 1,
      pageSize: 15,
      category: 1,
      sortField: null,
      sortDirection: "desc",
      location: null,
      name: null,
      description: null,
      count: null,
      status: null,
      searchTerm: null,
      demographics: {
        region: "",
        market: "",
        language: "",
        channel: ""
      }
    },
    selectedFilters: {
      name: "",
      description: "",
      count: "",
      status: ""
    },
    settings: null,
    selectedSegment: null,
    selectedSegmentType: "standard",
    audienceType: "attr",
    market: null,
    fetchBriefsAbortController: null,
    fetchCalBriefsAbortController: null,
    apiError: null,
    appAlerts: [],
    appSettings: null
  }),
  actions: y2,
  getters: k2
}), ai = Object.freeze({
  ACCESS_DENIED: "accessDenied",
  ADD_CLICKED: "addClicked",
  ADD: "add",
  BRIEF_ADDED: "briefAdded",
  BRIEF_DELETED: "briefDeleted",
  CHANGE_OPTION: "changeOption",
  CHANGE_STATE: "changeState",
  CHANGE_VIEW: "changeView",
  CLEAR_FILTERS: "clearFilters",
  CLICK: "click",
  CLOSE: "close",
  COLUMN_SORTED: "columnSorted",
  CONTENT_PIECE_CHECKED: "contentPieceChecked",
  CONTENT_PIECE_INSERT: "contentPieceInsert",
  COPY: "copy",
  DELETE_CLICKED: "deleteClicked",
  ERROR: "error",
  EXIT_CONFIRM: "exitConfirm",
  EXPAND_CLICKED: "expandClicked",
  FIELD_MESSAGE: "fieldMessage",
  FILTER_CHANGE: "filterChange",
  GRID_RESIZE: "gridResize",
  HEADER_STEP_CLICKED: "headerStepClicked",
  IFRAME_LOADED: "iframeLoaded",
  IMAGE_CLICKED: "imageClicked",
  IMAGE_ERROR: "imageError",
  IMAGE_LOADED: "imageLoaded",
  IMPORT_ACTION_CLICK: "importActionClick",
  INPUT: "input",
  INSERT_CLICKED: "insertClicked",
  INTERSECTING: "intersecting",
  ITEMS_DELETED: "itemsDeleted",
  ITEMS_MOVED: "itemsMoved",
  LABEL_STATE_CHANGED: "labelStateChanged",
  LINK_STATE_CHANGED: "linkStateChanged",
  LOAD: "load",
  MESSAGE: "message",
  MOUSEDOWN: "mousedown",
  MOUSELEAVE: "mouseleave",
  MOUSEMOVE: "mousemove",
  MOUSEUP: "mouseup",
  ON_ACTION_CLICK: "onActionClick",
  PAGE_CHANGED: "pageChanged",
  PREVIEW_CONTROLLS_COLLAPSE: "previewControllsCollapse",
  PREVIEW_HEIGHT_UPDATE: "previewHeightUpdate",
  PREVIEW_TYPE_CHANGED: "previewTypeChanged",
  RELOAD_GRID: "reloadGrid",
  REMOVE_CLICKED: "removeClicked",
  REMOVE: "remove",
  REQUEST_ERROR: "requestError",
  RESET_COLUMNS: "resetColumns",
  RESIZE: "resize",
  ROW_CHECKED: "rowChecked",
  ROW_CLICKED: "rowClicked",
  SAVE_AND_DOWNLOAD: "saveAndDownload",
  SCROLL_TO_ELEMENT: "scrollToElement",
  SENDER_STATE_CHANGED: "senderStateChanged",
  SET_CONTENT_SOURCE: "setContentSource",
  SET_METADATA: "setMetadata",
  SET_SUBJECT_LINE: "setSubjectLine",
  SET_STATUS: "setStatus",
  SPACING_STATE_CHANGED: "spacingStateChanged",
  SUBMIT: "submit",
  SUCCESS: "success",
  TOGGLE: "toggle",
  TYPE_CLICKED: "typeClicked",
  UPDATE_VIEW: "updateView",
  UPLOADING: "uploading",
  VALUE_CHANGE: "valueChange",
  VIEW_STATE_CHANGED: "viewStateChanged"
}), qe = (o, D) => {
  const a = o.__vccOpts || o;
  for (const [A, k] of D)
    a[A] = k;
  return a;
}, v2 = ["onClick"], _2 = { key: 0 }, b2 = ["onClick"], E2 = { class: "text-center" }, S2 = ["title"], A2 = ["title"], w2 = ["onClick"], C2 = {
  key: 0,
  class: "checkbox-container"
}, T2 = ["onKeydown", "onClick"], D2 = ["src"], I2 = {
  key: 4,
  class: "d-flex justify-content-end pr-45"
}, L2 = ["title"], B2 = {
  key: 0,
  class: "no-matches"
}, F2 = {
  __name: "BaseTable",
  props: {
    rows: Array,
    columns: Array,
    stickyHeader: Number,
    showNoMatchLabel: {
      type: Boolean,
      default: !0
    },
    inactive: {
      type: Boolean,
      default: !1
    },
    selectable: {
      type: Boolean,
      default: !0
    },
    sortable: {
      type: Boolean,
      default: !0
    },
    collapseControls: {
      type: Boolean,
      default: !1
    },
    small: {
      type: Boolean,
      default: !1
    },
    trRelative: {
      type: Boolean,
      default: !1
    },
    checkedRows: {
      type: Array,
      default: () => []
    },
    fixedActions: {
      type: Boolean,
      default: !0
    },
    enableHover: {
      type: Boolean,
      default: !0
    },
    maxWidthCell: {
      type: String,
      default: "400"
    },
    minWidthCell: {
      type: Object
    },
    enableSingleSelect: {
      type: Boolean,
      default: !1
    },
    expandable: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["rowChecked", "rowClicked", "columnSorted"],
  setup(o, { emit: D }) {
    const a = D, A = o, k = G(null), M = G(!1), N = G(1), F = G([]), $ = G(null), B = G(!1), E = G({}), g = Fe(
      {
        get() {
          return A.checkedRows;
        },
        set(Z) {
          F.value = Z;
        }
      }
    ), I = Fe(() => A.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${A.stickyHeader}px;` : "");
    function q() {
      A.expandable && A.rows.length > 0 && (B.value = !B.value, B.value === !1 && (E.value = {}));
    }
    function ie(Z) {
      return A.expandable && Z.details.length === 1;
    }
    function ae(Z) {
      E[Z] ? E[Z] = !E[Z] : this.$set(E, Z, !0);
    }
    function J(Z) {
      $.value = Z;
    }
    function pe(Z, X, w) {
      w.key !== "actions" && w.type !== "link" && X.showInAction !== !1 && a("rowClicked", { event: Z, row: X });
    }
    function ye(Z) {
      A.sortable && Z.key !== "actions" && Z.type !== "link" && (k.value === Z.key ? N.value *= -1 : (k.value = Z.key, N.value = 1), a("columnSorted", { sortColumn: k.value, sortOrder: N }));
    }
    function ge(Z, X) {
      let w = "";
      if (typeof Z == "object" ? w = Z.value : w = Z, X === "datetime") {
        const R = gn(new Date(w));
        return gn(R).format("DD MMM YYYY");
      }
      if (X === "datetimehour") {
        const R = gn(new Date(w));
        return gn(R).format("DD MMM YYYY, HH:mm");
      }
      return w;
    }
    return Xt(M, (Z) => {
      Z === "true" || Z === !0 ? A.rows.forEach((X) => {
        !F.value.includes(X.id) && X.showInAction !== !1 && F.value.push(X.id);
      }) : F.value = [], a("rowChecked", F.value);
    }), (Z, X) => (h(), y("div", {
      class: Me(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      p("table", {
        class: Me(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        p("thead", null, [
          p("tr", {
            onClick: X[1] || (X[1] = (w) => q())
          }, [
            !o.collapseControls && !o.expandable ? (h(), y("th", {
              key: 0,
              class: "checkbox-container",
              style: hn(I.value)
            }, [
              o.selectable ? (h(), ue(C(mn), {
                key: 0,
                modelValue: M.value,
                "onUpdate:modelValue": X[0] || (X[0] = (w) => M.value = w)
              }, null, 8, ["modelValue"])) : L("", !0)
            ], 4)) : L("", !0),
            o.expandable ? (h(), y("th", {
              key: 1,
              class: Me(["text-center", {
                expandable: o.expandable
              }]),
              style: hn(I.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), ue(C(Dt), {
                key: 0,
                class: "expand-icon",
                icon: B.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: B.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : L("", !0)
            ], 6)) : L("", !0),
            (h(!0), y(me, null, Ae(o.columns, (w) => (h(), y("th", {
              style: hn(I.value),
              key: w.id,
              onClick: (R) => ye(w),
              class: Me({
                actions: w.key === "actions",
                active: k.value === w.key,
                sortable: o.sortable && w.key !== "actions" && w.type != "link",
                expandable: o.expandable
              })
            }, [
              w.key !== "actions" && w.type != "link" ? (h(), y(me, { key: 0 }, [
                je(j(w.value) + " ", 1),
                o.sortable ? (h(), ue(C(Dt), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : L("", !0)
              ], 64)) : L("", !0)
            ], 14, v2))), 128))
          ])
        ]),
        o.rows ? (h(), y("tbody", _2, [
          (h(!0), y(me, null, Ae(o.rows, (w) => (h(), y(me, null, [
            (h(!0), y(me, null, Ae(w.details, (R) => (h(), y(me, null, [
              o.expandable & B.value || ie(w) ? (h(), y("tr", {
                class: Me({ expandable: o.expandable && R.details.length === 1 }),
                key: R.id,
                onClick: (ve) => ae(R.id)
              }, [
                p("td", E2, [
                  R.details.length > 1 ? (h(), ue(C(Dt), {
                    key: 0,
                    class: "expand-icon",
                    icon: E.value[R.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: E.value[R.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : L("", !0)
                ]),
                (h(!0), y(me, null, Ae(o.columns, (ve) => (h(), y("td", {
                  style: hn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[ve.key] ? `${o.minWidthCell[ve.key]}px` : "0px"
                  }),
                  key: ve.key
                }, [
                  p("template", null, [
                    p("span", {
                      title: ge(R[ve.key].value || R[ve.key], ve.type)
                    }, j(ge(R[ve.key], ve.type)), 9, S2)
                  ])
                ], 4))), 128))
              ], 10, b2)) : L("", !0),
              R.details.length > 1 && E.value[R.id] ? (h(!0), y(me, { key: 1 }, Ae(R.details, (ve) => (h(), y("tr", {
                class: "subrow-details",
                key: ve.id
              }, [
                X[4] || (X[4] = p("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), y(me, null, Ae(o.columns, (Ue) => (h(), y("td", {
                  style: hn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Ue.key] ? `${o.minWidthCell[Ue.key]}px` : "0px"
                  }),
                  key: Ue.key
                }, [
                  p("template", null, [
                    p("span", {
                      title: ge(ve[Ue.key], Ue.type)
                    }, j(ge(ve[Ue.key], Ue.type)), 9, A2)
                  ])
                ], 4))), 128))
              ]))), 128)) : L("", !0)
            ], 64))), 256)),
            (o.expandable && w.details.length) > 1 || o.expandable && w.details[0].details.length > 1 || !o.expandable ? (h(), y("tr", {
              class: Me({
                active: g.value.includes(w.id),
                static: w.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: $.value === w._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: w.id,
              onClick: (R) => J(w._id)
            }, [
              o.collapseControls ? L("", !0) : (h(), y("td", C2, [
                o.selectable && w.showInAction !== !1 ? (h(), ue(C(mn), {
                  key: 0,
                  modelValue: g.value,
                  "onUpdate:modelValue": X[2] || (X[2] = (R) => g.value = R),
                  val: w.id,
                  onInput: X[3] || (X[3] = (R) => Z.$emit(C(ai).ROW_CHECKED, F.value))
                }, null, 8, ["modelValue", "val"])) : L("", !0)
              ])),
              (h(!0), y(me, null, Ae(o.columns, (R) => (h(), y("td", {
                class: Me({
                  actions: R.key === "actions",
                  fixedActions: o.fixedActions && R.key === "actions"
                }),
                style: hn({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[R.key] ? `${o.minWidthCell[R.key]}px` : "0px"
                }),
                key: R.key,
                onKeydown: Ba((ve) => pe(ve, w, R), ["enter"]),
                onClick: (ve) => pe(ve, w, R)
              }, [
                w[R.key] !== void 0 && w[R.key] !== null && R.key !== "actions" ? (h(), y(me, { key: 0 }, [
                  w[R.key].icon ? (h(), y("img", {
                    key: 0,
                    alt: "",
                    src: w[R.key].icon,
                    class: Me(R.key)
                  }, null, 10, D2)) : w[R.key].biicon ? (h(), y("span", {
                    key: 1,
                    class: Me(["table-bi-icon", w[R.key].biicon]),
                    style: hn({ color: w[R.key].color })
                  }, null, 6)) : L("", !0),
                  w[R.key].type ? (h(), ue(C(i2), {
                    key: 2,
                    "font-size": 12,
                    label: w[R.key].value,
                    color: w[R.key].color
                  }, null, 8, ["label", "color"])) : R.type === "link" ? ji(Z.$slots, "linkHandler", {
                    key: 3,
                    link: { row: w, columnKey: R.key }
                  }, void 0, !0) : R.type === "number" ? (h(), y("span", I2, j(w[R.key]), 1)) : (h(), y("span", {
                    key: 5,
                    title: ge(w[R.key].value || w[R.key], R.type)
                  }, j(ge(w[R.key], R.type)), 9, L2))
                ], 64)) : L("", !0),
                R.key === "actions" ? ji(Z.$slots, "actionButton", {
                  key: 1,
                  row: w
                }, void 0, !0) : L("", !0)
              ], 46, T2))), 128))
            ], 10, w2)) : L("", !0)
          ], 64))), 256))
        ])) : L("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), y("p", B2, " No matches found ")) : L("", !0)
    ], 2));
  }
}, V2 = /* @__PURE__ */ qe(F2, [["__scopeId", "data-v-b29dae8a"]]);
var ri = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, er = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
er.exports;
(function(o, D) {
  (function() {
    var a, A = "4.17.21", k = 200, M = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", N = "Expected a function", F = "Invalid `variable` option passed into `_.template`", $ = "__lodash_hash_undefined__", B = 500, E = "__lodash_placeholder__", g = 1, I = 2, q = 4, ie = 1, ae = 2, J = 1, pe = 2, ye = 4, ge = 8, Z = 16, X = 32, w = 64, R = 128, ve = 256, Ue = 512, jt = 30, lt = "...", en = 800, Gn = 16, kn = 1, Mn = 2, Un = 3, Mt = 1 / 0, W = 9007199254740991, v = 17976931348623157e292, le = NaN, Oe = 4294967295, _t = Oe - 1, vn = Oe >>> 1, _n = [
      ["ary", R],
      ["bind", J],
      ["bindKey", pe],
      ["curry", ge],
      ["curryRight", Z],
      ["flip", Ue],
      ["partial", X],
      ["partialRight", w],
      ["rearg", ve]
    ], be = "[object Arguments]", tn = "[object Array]", oi = "[object AsyncFunction]", Ut = "[object Boolean]", nn = "[object Date]", ir = "[object DOMException]", It = "[object Error]", bn = "[object Function]", ui = "[object GeneratorFunction]", Ke = "[object Map]", rn = "[object Number]", rr = "[object Null]", gt = "[object Object]", ci = "[object Promise]", ee = "[object Proxy]", T = "[object RegExp]", P = "[object Set]", we = "[object String]", O = "[object Symbol]", de = "[object Undefined]", bt = "[object WeakMap]", kl = "[object WeakSet]", Wn = "[object ArrayBuffer]", En = "[object DataView]", ar = "[object Float32Array]", sr = "[object Float64Array]", lr = "[object Int8Array]", or = "[object Int16Array]", ur = "[object Int32Array]", cr = "[object Uint8Array]", dr = "[object Uint8ClampedArray]", fr = "[object Uint16Array]", pr = "[object Uint32Array]", vl = /\b__p \+= '';/g, _l = /\b(__p \+=) '' \+/g, bl = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Fa = /&(?:amp|lt|gt|quot|#39);/g, Va = /[&<>"']/g, El = RegExp(Fa.source), Sl = RegExp(Va.source), Al = /<%-([\s\S]+?)%>/g, wl = /<%([\s\S]+?)%>/g, $a = /<%=([\s\S]+?)%>/g, Cl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Tl = /^\w*$/, Dl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, hr = /[\\^$.*+?()[\]{}|]/g, Il = RegExp(hr.source), mr = /^\s+/, Ll = /\s/, Bl = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Fl = /\{\n\/\* \[wrapped with (.+)\] \*/, Vl = /,? & /, $l = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ol = /[()=,{}\[\]\/\s]/, Pl = /\\(\\)?/g, Rl = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Oa = /\w*$/, Gl = /^[-+]0x[0-9a-f]+$/i, Ml = /^0b[01]+$/i, Ul = /^\[object .+?Constructor\]$/, Wl = /^0o[0-7]+$/i, Nl = /^(?:0|[1-9]\d*)$/, ql = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, di = /($^)/, zl = /['\n\r\u2028\u2029\\]/g, fi = "\\ud800-\\udfff", Hl = "\\u0300-\\u036f", Ql = "\\ufe20-\\ufe2f", Kl = "\\u20d0-\\u20ff", Pa = Hl + Ql + Kl, Ra = "\\u2700-\\u27bf", Ga = "a-z\\xdf-\\xf6\\xf8-\\xff", Yl = "\\xac\\xb1\\xd7\\xf7", Zl = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Xl = "\\u2000-\\u206f", Jl = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ma = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ua = "\\ufe0e\\ufe0f", Wa = Yl + Zl + Xl + Jl, gr = "['’]", jl = "[" + fi + "]", Na = "[" + Wa + "]", pi = "[" + Pa + "]", qa = "\\d+", eo = "[" + Ra + "]", za = "[" + Ga + "]", Ha = "[^" + fi + Wa + qa + Ra + Ga + Ma + "]", xr = "\\ud83c[\\udffb-\\udfff]", to = "(?:" + pi + "|" + xr + ")", Qa = "[^" + fi + "]", yr = "(?:\\ud83c[\\udde6-\\uddff]){2}", kr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Sn = "[" + Ma + "]", Ka = "\\u200d", Ya = "(?:" + za + "|" + Ha + ")", no = "(?:" + Sn + "|" + Ha + ")", Za = "(?:" + gr + "(?:d|ll|m|re|s|t|ve))?", Xa = "(?:" + gr + "(?:D|LL|M|RE|S|T|VE))?", Ja = to + "?", ja = "[" + Ua + "]?", io = "(?:" + Ka + "(?:" + [Qa, yr, kr].join("|") + ")" + ja + Ja + ")*", ro = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", ao = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", es = ja + Ja + io, so = "(?:" + [eo, yr, kr].join("|") + ")" + es, lo = "(?:" + [Qa + pi + "?", pi, yr, kr, jl].join("|") + ")", oo = RegExp(gr, "g"), uo = RegExp(pi, "g"), vr = RegExp(xr + "(?=" + xr + ")|" + lo + es, "g"), co = RegExp([
      Sn + "?" + za + "+" + Za + "(?=" + [Na, Sn, "$"].join("|") + ")",
      no + "+" + Xa + "(?=" + [Na, Sn + Ya, "$"].join("|") + ")",
      Sn + "?" + Ya + "+" + Za,
      Sn + "+" + Xa,
      ao,
      ro,
      qa,
      so
    ].join("|"), "g"), fo = RegExp("[" + Ka + fi + Pa + Ua + "]"), po = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ho = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], mo = -1, Ce = {};
    Ce[ar] = Ce[sr] = Ce[lr] = Ce[or] = Ce[ur] = Ce[cr] = Ce[dr] = Ce[fr] = Ce[pr] = !0, Ce[be] = Ce[tn] = Ce[Wn] = Ce[Ut] = Ce[En] = Ce[nn] = Ce[It] = Ce[bn] = Ce[Ke] = Ce[rn] = Ce[gt] = Ce[T] = Ce[P] = Ce[we] = Ce[bt] = !1;
    var Se = {};
    Se[be] = Se[tn] = Se[Wn] = Se[En] = Se[Ut] = Se[nn] = Se[ar] = Se[sr] = Se[lr] = Se[or] = Se[ur] = Se[Ke] = Se[rn] = Se[gt] = Se[T] = Se[P] = Se[we] = Se[O] = Se[cr] = Se[dr] = Se[fr] = Se[pr] = !0, Se[It] = Se[bn] = Se[bt] = !1;
    var go = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, xo = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, yo = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, ko = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, vo = parseFloat, _o = parseInt, ts = typeof ri == "object" && ri && ri.Object === Object && ri, bo = typeof self == "object" && self && self.Object === Object && self, Re = ts || bo || Function("return this")(), _r = D && !D.nodeType && D, an = _r && !0 && o && !o.nodeType && o, ns = an && an.exports === _r, br = ns && ts.process, ot = function() {
      try {
        var d = an && an.require && an.require("util").types;
        return d || br && br.binding && br.binding("util");
      } catch {
      }
    }(), is = ot && ot.isArrayBuffer, rs = ot && ot.isDate, as = ot && ot.isMap, ss = ot && ot.isRegExp, ls = ot && ot.isSet, os = ot && ot.isTypedArray;
    function et(d, x, m) {
      switch (m.length) {
        case 0:
          return d.call(x);
        case 1:
          return d.call(x, m[0]);
        case 2:
          return d.call(x, m[0], m[1]);
        case 3:
          return d.call(x, m[0], m[1], m[2]);
      }
      return d.apply(x, m);
    }
    function Eo(d, x, m, U) {
      for (var te = -1, xe = d == null ? 0 : d.length; ++te < xe; ) {
        var Ve = d[te];
        x(U, Ve, m(Ve), d);
      }
      return U;
    }
    function ut(d, x) {
      for (var m = -1, U = d == null ? 0 : d.length; ++m < U && x(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function So(d, x) {
      for (var m = d == null ? 0 : d.length; m-- && x(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function us(d, x) {
      for (var m = -1, U = d == null ? 0 : d.length; ++m < U; )
        if (!x(d[m], m, d))
          return !1;
      return !0;
    }
    function Wt(d, x) {
      for (var m = -1, U = d == null ? 0 : d.length, te = 0, xe = []; ++m < U; ) {
        var Ve = d[m];
        x(Ve, m, d) && (xe[te++] = Ve);
      }
      return xe;
    }
    function hi(d, x) {
      var m = d == null ? 0 : d.length;
      return !!m && An(d, x, 0) > -1;
    }
    function Er(d, x, m) {
      for (var U = -1, te = d == null ? 0 : d.length; ++U < te; )
        if (m(x, d[U]))
          return !0;
      return !1;
    }
    function Te(d, x) {
      for (var m = -1, U = d == null ? 0 : d.length, te = Array(U); ++m < U; )
        te[m] = x(d[m], m, d);
      return te;
    }
    function Nt(d, x) {
      for (var m = -1, U = x.length, te = d.length; ++m < U; )
        d[te + m] = x[m];
      return d;
    }
    function Sr(d, x, m, U) {
      var te = -1, xe = d == null ? 0 : d.length;
      for (U && xe && (m = d[++te]); ++te < xe; )
        m = x(m, d[te], te, d);
      return m;
    }
    function Ao(d, x, m, U) {
      var te = d == null ? 0 : d.length;
      for (U && te && (m = d[--te]); te--; )
        m = x(m, d[te], te, d);
      return m;
    }
    function Ar(d, x) {
      for (var m = -1, U = d == null ? 0 : d.length; ++m < U; )
        if (x(d[m], m, d))
          return !0;
      return !1;
    }
    var wo = wr("length");
    function Co(d) {
      return d.split("");
    }
    function To(d) {
      return d.match($l) || [];
    }
    function cs(d, x, m) {
      var U;
      return m(d, function(te, xe, Ve) {
        if (x(te, xe, Ve))
          return U = xe, !1;
      }), U;
    }
    function mi(d, x, m, U) {
      for (var te = d.length, xe = m + (U ? 1 : -1); U ? xe-- : ++xe < te; )
        if (x(d[xe], xe, d))
          return xe;
      return -1;
    }
    function An(d, x, m) {
      return x === x ? Mo(d, x, m) : mi(d, ds, m);
    }
    function Do(d, x, m, U) {
      for (var te = m - 1, xe = d.length; ++te < xe; )
        if (U(d[te], x))
          return te;
      return -1;
    }
    function ds(d) {
      return d !== d;
    }
    function fs(d, x) {
      var m = d == null ? 0 : d.length;
      return m ? Tr(d, x) / m : le;
    }
    function wr(d) {
      return function(x) {
        return x == null ? a : x[d];
      };
    }
    function Cr(d) {
      return function(x) {
        return d == null ? a : d[x];
      };
    }
    function ps(d, x, m, U, te) {
      return te(d, function(xe, Ve, Ee) {
        m = U ? (U = !1, xe) : x(m, xe, Ve, Ee);
      }), m;
    }
    function Io(d, x) {
      var m = d.length;
      for (d.sort(x); m--; )
        d[m] = d[m].value;
      return d;
    }
    function Tr(d, x) {
      for (var m, U = -1, te = d.length; ++U < te; ) {
        var xe = x(d[U]);
        xe !== a && (m = m === a ? xe : m + xe);
      }
      return m;
    }
    function Dr(d, x) {
      for (var m = -1, U = Array(d); ++m < d; )
        U[m] = x(m);
      return U;
    }
    function Lo(d, x) {
      return Te(x, function(m) {
        return [m, d[m]];
      });
    }
    function hs(d) {
      return d && d.slice(0, ys(d) + 1).replace(mr, "");
    }
    function tt(d) {
      return function(x) {
        return d(x);
      };
    }
    function Ir(d, x) {
      return Te(x, function(m) {
        return d[m];
      });
    }
    function Nn(d, x) {
      return d.has(x);
    }
    function ms(d, x) {
      for (var m = -1, U = d.length; ++m < U && An(x, d[m], 0) > -1; )
        ;
      return m;
    }
    function gs(d, x) {
      for (var m = d.length; m-- && An(x, d[m], 0) > -1; )
        ;
      return m;
    }
    function Bo(d, x) {
      for (var m = d.length, U = 0; m--; )
        d[m] === x && ++U;
      return U;
    }
    var Fo = Cr(go), Vo = Cr(xo);
    function $o(d) {
      return "\\" + ko[d];
    }
    function Oo(d, x) {
      return d == null ? a : d[x];
    }
    function wn(d) {
      return fo.test(d);
    }
    function Po(d) {
      return po.test(d);
    }
    function Ro(d) {
      for (var x, m = []; !(x = d.next()).done; )
        m.push(x.value);
      return m;
    }
    function Lr(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(U, te) {
        m[++x] = [te, U];
      }), m;
    }
    function xs(d, x) {
      return function(m) {
        return d(x(m));
      };
    }
    function qt(d, x) {
      for (var m = -1, U = d.length, te = 0, xe = []; ++m < U; ) {
        var Ve = d[m];
        (Ve === x || Ve === E) && (d[m] = E, xe[te++] = m);
      }
      return xe;
    }
    function gi(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(U) {
        m[++x] = U;
      }), m;
    }
    function Go(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(U) {
        m[++x] = [U, U];
      }), m;
    }
    function Mo(d, x, m) {
      for (var U = m - 1, te = d.length; ++U < te; )
        if (d[U] === x)
          return U;
      return -1;
    }
    function Uo(d, x, m) {
      for (var U = m + 1; U--; )
        if (d[U] === x)
          return U;
      return U;
    }
    function Cn(d) {
      return wn(d) ? No(d) : wo(d);
    }
    function xt(d) {
      return wn(d) ? qo(d) : Co(d);
    }
    function ys(d) {
      for (var x = d.length; x-- && Ll.test(d.charAt(x)); )
        ;
      return x;
    }
    var Wo = Cr(yo);
    function No(d) {
      for (var x = vr.lastIndex = 0; vr.test(d); )
        ++x;
      return x;
    }
    function qo(d) {
      return d.match(vr) || [];
    }
    function zo(d) {
      return d.match(co) || [];
    }
    var Ho = function d(x) {
      x = x == null ? Re : Tn.defaults(Re.Object(), x, Tn.pick(Re, ho));
      var m = x.Array, U = x.Date, te = x.Error, xe = x.Function, Ve = x.Math, Ee = x.Object, Br = x.RegExp, Qo = x.String, ct = x.TypeError, xi = m.prototype, Ko = xe.prototype, Dn = Ee.prototype, yi = x["__core-js_shared__"], ki = Ko.toString, _e = Dn.hasOwnProperty, Yo = 0, ks = function() {
        var e = /[^.]+$/.exec(yi && yi.keys && yi.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), vi = Dn.toString, Zo = ki.call(Ee), Xo = Re._, Jo = Br(
        "^" + ki.call(_e).replace(hr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), _i = ns ? x.Buffer : a, zt = x.Symbol, bi = x.Uint8Array, vs = _i ? _i.allocUnsafe : a, Ei = xs(Ee.getPrototypeOf, Ee), _s = Ee.create, bs = Dn.propertyIsEnumerable, Si = xi.splice, Es = zt ? zt.isConcatSpreadable : a, qn = zt ? zt.iterator : a, sn = zt ? zt.toStringTag : a, Ai = function() {
        try {
          var e = dn(Ee, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), jo = x.clearTimeout !== Re.clearTimeout && x.clearTimeout, eu = U && U.now !== Re.Date.now && U.now, tu = x.setTimeout !== Re.setTimeout && x.setTimeout, wi = Ve.ceil, Ci = Ve.floor, Fr = Ee.getOwnPropertySymbols, nu = _i ? _i.isBuffer : a, Ss = x.isFinite, iu = xi.join, ru = xs(Ee.keys, Ee), $e = Ve.max, We = Ve.min, au = U.now, su = x.parseInt, As = Ve.random, lu = xi.reverse, Vr = dn(x, "DataView"), zn = dn(x, "Map"), $r = dn(x, "Promise"), In = dn(x, "Set"), Hn = dn(x, "WeakMap"), Qn = dn(Ee, "create"), Ti = Hn && new Hn(), Ln = {}, ou = fn(Vr), uu = fn(zn), cu = fn($r), du = fn(In), fu = fn(Hn), Di = zt ? zt.prototype : a, Kn = Di ? Di.valueOf : a, ws = Di ? Di.toString : a;
      function s(e) {
        if (Ie(e) && !ne(e) && !(e instanceof fe)) {
          if (e instanceof dt)
            return e;
          if (_e.call(e, "__wrapped__"))
            return C0(e);
        }
        return new dt(e);
      }
      var Bn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!De(t))
            return {};
          if (_s)
            return _s(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = a, n;
        };
      }();
      function Ii() {
      }
      function dt(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = a;
      }
      s.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: Al,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: wl,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: $a,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: s
        }
      }, s.prototype = Ii.prototype, s.prototype.constructor = s, dt.prototype = Bn(Ii.prototype), dt.prototype.constructor = dt;
      function fe(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Oe, this.__views__ = [];
      }
      function pu() {
        var e = new fe(this.__wrapped__);
        return e.__actions__ = Ye(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Ye(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Ye(this.__views__), e;
      }
      function hu() {
        if (this.__filtered__) {
          var e = new fe(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function mu() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = ne(e), i = t < 0, r = n ? e.length : 0, l = C1(0, r, this.__views__), u = l.start, c = l.end, f = c - u, _ = i ? c : u - 1, b = this.__iteratees__, S = b.length, V = 0, z = We(f, this.__takeCount__);
        if (!n || !i && r == f && z == f)
          return Zs(e, this.__actions__);
        var K = [];
        e:
          for (; f-- && V < z; ) {
            _ += t;
            for (var se = -1, Y = e[_]; ++se < S; ) {
              var ce = b[se], he = ce.iteratee, rt = ce.type, Qe = he(Y);
              if (rt == Mn)
                Y = Qe;
              else if (!Qe) {
                if (rt == kn)
                  continue e;
                break e;
              }
            }
            K[V++] = Y;
          }
        return K;
      }
      fe.prototype = Bn(Ii.prototype), fe.prototype.constructor = fe;
      function ln(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function gu() {
        this.__data__ = Qn ? Qn(null) : {}, this.size = 0;
      }
      function xu(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function yu(e) {
        var t = this.__data__;
        if (Qn) {
          var n = t[e];
          return n === $ ? a : n;
        }
        return _e.call(t, e) ? t[e] : a;
      }
      function ku(e) {
        var t = this.__data__;
        return Qn ? t[e] !== a : _e.call(t, e);
      }
      function vu(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Qn && t === a ? $ : t, this;
      }
      ln.prototype.clear = gu, ln.prototype.delete = xu, ln.prototype.get = yu, ln.prototype.has = ku, ln.prototype.set = vu;
      function Lt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function _u() {
        this.__data__ = [], this.size = 0;
      }
      function bu(e) {
        var t = this.__data__, n = Li(t, e);
        if (n < 0)
          return !1;
        var i = t.length - 1;
        return n == i ? t.pop() : Si.call(t, n, 1), --this.size, !0;
      }
      function Eu(e) {
        var t = this.__data__, n = Li(t, e);
        return n < 0 ? a : t[n][1];
      }
      function Su(e) {
        return Li(this.__data__, e) > -1;
      }
      function Au(e, t) {
        var n = this.__data__, i = Li(n, e);
        return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
      }
      Lt.prototype.clear = _u, Lt.prototype.delete = bu, Lt.prototype.get = Eu, Lt.prototype.has = Su, Lt.prototype.set = Au;
      function Bt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function wu() {
        this.size = 0, this.__data__ = {
          hash: new ln(),
          map: new (zn || Lt)(),
          string: new ln()
        };
      }
      function Cu(e) {
        var t = Ni(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Tu(e) {
        return Ni(this, e).get(e);
      }
      function Du(e) {
        return Ni(this, e).has(e);
      }
      function Iu(e, t) {
        var n = Ni(this, e), i = n.size;
        return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
      }
      Bt.prototype.clear = wu, Bt.prototype.delete = Cu, Bt.prototype.get = Tu, Bt.prototype.has = Du, Bt.prototype.set = Iu;
      function on(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Bt(); ++t < n; )
          this.add(e[t]);
      }
      function Lu(e) {
        return this.__data__.set(e, $), this;
      }
      function Bu(e) {
        return this.__data__.has(e);
      }
      on.prototype.add = on.prototype.push = Lu, on.prototype.has = Bu;
      function yt(e) {
        var t = this.__data__ = new Lt(e);
        this.size = t.size;
      }
      function Fu() {
        this.__data__ = new Lt(), this.size = 0;
      }
      function Vu(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function $u(e) {
        return this.__data__.get(e);
      }
      function Ou(e) {
        return this.__data__.has(e);
      }
      function Pu(e, t) {
        var n = this.__data__;
        if (n instanceof Lt) {
          var i = n.__data__;
          if (!zn || i.length < k - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Bt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      yt.prototype.clear = Fu, yt.prototype.delete = Vu, yt.prototype.get = $u, yt.prototype.has = Ou, yt.prototype.set = Pu;
      function Cs(e, t) {
        var n = ne(e), i = !n && pn(e), r = !n && !i && Zt(e), l = !n && !i && !r && On(e), u = n || i || r || l, c = u ? Dr(e.length, Qo) : [], f = c.length;
        for (var _ in e)
          (t || _e.call(e, _)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (_ == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (_ == "offset" || _ == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (_ == "buffer" || _ == "byteLength" || _ == "byteOffset") || // Skip index properties.
          Ot(_, f))) && c.push(_);
        return c;
      }
      function Ts(e) {
        var t = e.length;
        return t ? e[Hr(0, t - 1)] : a;
      }
      function Ru(e, t) {
        return qi(Ye(e), un(t, 0, e.length));
      }
      function Gu(e) {
        return qi(Ye(e));
      }
      function Or(e, t, n) {
        (n !== a && !kt(e[t], n) || n === a && !(t in e)) && Ft(e, t, n);
      }
      function Yn(e, t, n) {
        var i = e[t];
        (!(_e.call(e, t) && kt(i, n)) || n === a && !(t in e)) && Ft(e, t, n);
      }
      function Li(e, t) {
        for (var n = e.length; n--; )
          if (kt(e[n][0], t))
            return n;
        return -1;
      }
      function Mu(e, t, n, i) {
        return Ht(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ds(e, t) {
        return e && St(t, Pe(t), e);
      }
      function Uu(e, t) {
        return e && St(t, Xe(t), e);
      }
      function Ft(e, t, n) {
        t == "__proto__" && Ai ? Ai(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }
      function Pr(e, t) {
        for (var n = -1, i = t.length, r = m(i), l = e == null; ++n < i; )
          r[n] = l ? a : xa(e, t[n]);
        return r;
      }
      function un(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function ft(e, t, n, i, r, l) {
        var u, c = t & g, f = t & I, _ = t & q;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!De(e))
          return e;
        var b = ne(e);
        if (b) {
          if (u = D1(e), !c)
            return Ye(e, u);
        } else {
          var S = Ne(e), V = S == bn || S == ui;
          if (Zt(e))
            return js(e, c);
          if (S == gt || S == be || V && !r) {
            if (u = f || V ? {} : y0(e), !c)
              return f ? y1(e, Uu(u, e)) : x1(e, Ds(u, e));
          } else {
            if (!Se[S])
              return r ? e : {};
            u = I1(e, S, c);
          }
        }
        l || (l = new yt());
        var z = l.get(e);
        if (z)
          return z;
        l.set(e, u), Q0(e) ? e.forEach(function(Y) {
          u.add(ft(Y, t, n, Y, e, l));
        }) : z0(e) && e.forEach(function(Y, ce) {
          u.set(ce, ft(Y, t, n, ce, e, l));
        });
        var K = _ ? f ? ia : na : f ? Xe : Pe, se = b ? a : K(e);
        return ut(se || e, function(Y, ce) {
          se && (ce = Y, Y = e[ce]), Yn(u, ce, ft(Y, t, n, ce, e, l));
        }), u;
      }
      function Wu(e) {
        var t = Pe(e);
        return function(n) {
          return Is(n, e, t);
        };
      }
      function Is(e, t, n) {
        var i = n.length;
        if (e == null)
          return !i;
        for (e = Ee(e); i--; ) {
          var r = n[i], l = t[r], u = e[r];
          if (u === a && !(r in e) || !l(u))
            return !1;
        }
        return !0;
      }
      function Ls(e, t, n) {
        if (typeof e != "function")
          throw new ct(N);
        return ni(function() {
          e.apply(a, n);
        }, t);
      }
      function Zn(e, t, n, i) {
        var r = -1, l = hi, u = !0, c = e.length, f = [], _ = t.length;
        if (!c)
          return f;
        n && (t = Te(t, tt(n))), i ? (l = Er, u = !1) : t.length >= k && (l = Nn, u = !1, t = new on(t));
        e:
          for (; ++r < c; ) {
            var b = e[r], S = n == null ? b : n(b);
            if (b = i || b !== 0 ? b : 0, u && S === S) {
              for (var V = _; V--; )
                if (t[V] === S)
                  continue e;
              f.push(b);
            } else
              l(t, S, i) || f.push(b);
          }
        return f;
      }
      var Ht = r0(Et), Bs = r0(Gr, !0);
      function Nu(e, t) {
        var n = !0;
        return Ht(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Bi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !it(u) : n(u, c)))
            var c = u, f = l;
        }
        return f;
      }
      function qu(e, t, n, i) {
        var r = e.length;
        for (n = re(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : re(i), i < 0 && (i += r), i = n > i ? 0 : Y0(i); n < i; )
          e[n++] = t;
        return e;
      }
      function Fs(e, t) {
        var n = [];
        return Ht(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function Ge(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = B1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? Ge(c, t - 1, n, i, r) : Nt(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Rr = a0(), Vs = a0(!0);
      function Et(e, t) {
        return e && Rr(e, t, Pe);
      }
      function Gr(e, t) {
        return e && Vs(e, t, Pe);
      }
      function Fi(e, t) {
        return Wt(t, function(n) {
          return Pt(e[n]);
        });
      }
      function cn(e, t) {
        t = Kt(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[At(t[n++])];
        return n && n == i ? e : a;
      }
      function $s(e, t, n) {
        var i = t(e);
        return ne(e) ? i : Nt(i, n(e));
      }
      function ze(e) {
        return e == null ? e === a ? de : rr : sn && sn in Ee(e) ? w1(e) : G1(e);
      }
      function Mr(e, t) {
        return e > t;
      }
      function zu(e, t) {
        return e != null && _e.call(e, t);
      }
      function Hu(e, t) {
        return e != null && t in Ee(e);
      }
      function Qu(e, t, n) {
        return e >= We(t, n) && e < $e(t, n);
      }
      function Ur(e, t, n) {
        for (var i = n ? Er : hi, r = e[0].length, l = e.length, u = l, c = m(l), f = 1 / 0, _ = []; u--; ) {
          var b = e[u];
          u && t && (b = Te(b, tt(t))), f = We(b.length, f), c[u] = !n && (t || r >= 120 && b.length >= 120) ? new on(u && b) : a;
        }
        b = e[0];
        var S = -1, V = c[0];
        e:
          for (; ++S < r && _.length < f; ) {
            var z = b[S], K = t ? t(z) : z;
            if (z = n || z !== 0 ? z : 0, !(V ? Nn(V, K) : i(_, K, n))) {
              for (u = l; --u; ) {
                var se = c[u];
                if (!(se ? Nn(se, K) : i(e[u], K, n)))
                  continue e;
              }
              V && V.push(K), _.push(z);
            }
          }
        return _;
      }
      function Ku(e, t, n, i) {
        return Et(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function Xn(e, t, n) {
        t = Kt(t, e), e = b0(e, t);
        var i = e == null ? e : e[At(ht(t))];
        return i == null ? a : et(i, e, n);
      }
      function Os(e) {
        return Ie(e) && ze(e) == be;
      }
      function Yu(e) {
        return Ie(e) && ze(e) == Wn;
      }
      function Zu(e) {
        return Ie(e) && ze(e) == nn;
      }
      function Jn(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Ie(e) && !Ie(t) ? e !== e && t !== t : Xu(e, t, n, i, Jn, r);
      }
      function Xu(e, t, n, i, r, l) {
        var u = ne(e), c = ne(t), f = u ? tn : Ne(e), _ = c ? tn : Ne(t);
        f = f == be ? gt : f, _ = _ == be ? gt : _;
        var b = f == gt, S = _ == gt, V = f == _;
        if (V && Zt(e)) {
          if (!Zt(t))
            return !1;
          u = !0, b = !1;
        }
        if (V && !b)
          return l || (l = new yt()), u || On(e) ? m0(e, t, n, i, r, l) : S1(e, t, f, n, i, r, l);
        if (!(n & ie)) {
          var z = b && _e.call(e, "__wrapped__"), K = S && _e.call(t, "__wrapped__");
          if (z || K) {
            var se = z ? e.value() : e, Y = K ? t.value() : t;
            return l || (l = new yt()), r(se, Y, n, i, l);
          }
        }
        return V ? (l || (l = new yt()), A1(e, t, n, i, r, l)) : !1;
      }
      function Ju(e) {
        return Ie(e) && Ne(e) == Ke;
      }
      function Wr(e, t, n, i) {
        var r = n.length, l = r, u = !i;
        if (e == null)
          return !l;
        for (e = Ee(e); r--; ) {
          var c = n[r];
          if (u && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
            return !1;
        }
        for (; ++r < l; ) {
          c = n[r];
          var f = c[0], _ = e[f], b = c[1];
          if (u && c[2]) {
            if (_ === a && !(f in e))
              return !1;
          } else {
            var S = new yt();
            if (i)
              var V = i(_, b, f, e, t, S);
            if (!(V === a ? Jn(b, _, ie | ae, i, S) : V))
              return !1;
          }
        }
        return !0;
      }
      function Ps(e) {
        if (!De(e) || V1(e))
          return !1;
        var t = Pt(e) ? Jo : Ul;
        return t.test(fn(e));
      }
      function ju(e) {
        return Ie(e) && ze(e) == T;
      }
      function e1(e) {
        return Ie(e) && Ne(e) == P;
      }
      function t1(e) {
        return Ie(e) && Zi(e.length) && !!Ce[ze(e)];
      }
      function Rs(e) {
        return typeof e == "function" ? e : e == null ? Je : typeof e == "object" ? ne(e) ? Us(e[0], e[1]) : Ms(e) : sl(e);
      }
      function Nr(e) {
        if (!ti(e))
          return ru(e);
        var t = [];
        for (var n in Ee(e))
          _e.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function n1(e) {
        if (!De(e))
          return R1(e);
        var t = ti(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !_e.call(e, i)) || n.push(i);
        return n;
      }
      function qr(e, t) {
        return e < t;
      }
      function Gs(e, t) {
        var n = -1, i = Ze(e) ? m(e.length) : [];
        return Ht(e, function(r, l, u) {
          i[++n] = t(r, l, u);
        }), i;
      }
      function Ms(e) {
        var t = aa(e);
        return t.length == 1 && t[0][2] ? v0(t[0][0], t[0][1]) : function(n) {
          return n === e || Wr(n, e, t);
        };
      }
      function Us(e, t) {
        return la(e) && k0(t) ? v0(At(e), t) : function(n) {
          var i = xa(n, e);
          return i === a && i === t ? ya(n, e) : Jn(t, i, ie | ae);
        };
      }
      function Vi(e, t, n, i, r) {
        e !== t && Rr(t, function(l, u) {
          if (r || (r = new yt()), De(l))
            i1(e, t, u, n, Vi, i, r);
          else {
            var c = i ? i(ua(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Or(e, u, c);
          }
        }, Xe);
      }
      function i1(e, t, n, i, r, l, u) {
        var c = ua(e, n), f = ua(t, n), _ = u.get(f);
        if (_) {
          Or(e, n, _);
          return;
        }
        var b = l ? l(c, f, n + "", e, t, u) : a, S = b === a;
        if (S) {
          var V = ne(f), z = !V && Zt(f), K = !V && !z && On(f);
          b = f, V || z || K ? ne(c) ? b = c : Le(c) ? b = Ye(c) : z ? (S = !1, b = js(f, !0)) : K ? (S = !1, b = e0(f, !0)) : b = [] : ii(f) || pn(f) ? (b = c, pn(c) ? b = Z0(c) : (!De(c) || Pt(c)) && (b = y0(f))) : S = !1;
        }
        S && (u.set(f, b), r(b, f, i, l, u), u.delete(f)), Or(e, n, b);
      }
      function Ws(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, Ot(t, n) ? e[t] : a;
      }
      function Ns(e, t, n) {
        t.length ? t = Te(t, function(l) {
          return ne(l) ? function(u) {
            return cn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [Je];
        var i = -1;
        t = Te(t, tt(Q()));
        var r = Gs(e, function(l, u, c) {
          var f = Te(t, function(_) {
            return _(l);
          });
          return { criteria: f, index: ++i, value: l };
        });
        return Io(r, function(l, u) {
          return g1(l, u, n);
        });
      }
      function r1(e, t) {
        return qs(e, t, function(n, i) {
          return ya(e, i);
        });
      }
      function qs(e, t, n) {
        for (var i = -1, r = t.length, l = {}; ++i < r; ) {
          var u = t[i], c = cn(e, u);
          n(c, u) && jn(l, Kt(u, e), c);
        }
        return l;
      }
      function a1(e) {
        return function(t) {
          return cn(t, e);
        };
      }
      function zr(e, t, n, i) {
        var r = i ? Do : An, l = -1, u = t.length, c = e;
        for (e === t && (t = Ye(t)), n && (c = Te(e, tt(n))); ++l < u; )
          for (var f = 0, _ = t[l], b = n ? n(_) : _; (f = r(c, b, f, i)) > -1; )
            c !== e && Si.call(c, f, 1), Si.call(e, f, 1);
        return e;
      }
      function zs(e, t) {
        for (var n = e ? t.length : 0, i = n - 1; n--; ) {
          var r = t[n];
          if (n == i || r !== l) {
            var l = r;
            Ot(r) ? Si.call(e, r, 1) : Yr(e, r);
          }
        }
        return e;
      }
      function Hr(e, t) {
        return e + Ci(As() * (t - e + 1));
      }
      function s1(e, t, n, i) {
        for (var r = -1, l = $e(wi((t - e) / (n || 1)), 0), u = m(l); l--; )
          u[i ? l : ++r] = e, e += n;
        return u;
      }
      function Qr(e, t) {
        var n = "";
        if (!e || t < 1 || t > W)
          return n;
        do
          t % 2 && (n += e), t = Ci(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function oe(e, t) {
        return ca(_0(e, t, Je), e + "");
      }
      function l1(e) {
        return Ts(Pn(e));
      }
      function o1(e, t) {
        var n = Pn(e);
        return qi(n, un(t, 0, n.length));
      }
      function jn(e, t, n, i) {
        if (!De(e))
          return e;
        t = Kt(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var f = At(t[r]), _ = n;
          if (f === "__proto__" || f === "constructor" || f === "prototype")
            return e;
          if (r != u) {
            var b = c[f];
            _ = i ? i(b, f, c) : a, _ === a && (_ = De(b) ? b : Ot(t[r + 1]) ? [] : {});
          }
          Yn(c, f, _), c = c[f];
        }
        return e;
      }
      var Hs = Ti ? function(e, t) {
        return Ti.set(e, t), e;
      } : Je, u1 = Ai ? function(e, t) {
        return Ai(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: va(t),
          writable: !0
        });
      } : Je;
      function c1(e) {
        return qi(Pn(e));
      }
      function pt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = m(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function d1(e, t) {
        var n;
        return Ht(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function $i(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= vn) {
          for (; i < r; ) {
            var l = i + r >>> 1, u = e[l];
            u !== null && !it(u) && (n ? u <= t : u < t) ? i = l + 1 : r = l;
          }
          return r;
        }
        return Kr(e, t, Je, n);
      }
      function Kr(e, t, n, i) {
        var r = 0, l = e == null ? 0 : e.length;
        if (l === 0)
          return 0;
        t = n(t);
        for (var u = t !== t, c = t === null, f = it(t), _ = t === a; r < l; ) {
          var b = Ci((r + l) / 2), S = n(e[b]), V = S !== a, z = S === null, K = S === S, se = it(S);
          if (u)
            var Y = i || K;
          else
            _ ? Y = K && (i || V) : c ? Y = K && V && (i || !z) : f ? Y = K && V && !z && (i || !se) : z || se ? Y = !1 : Y = i ? S <= t : S < t;
          Y ? r = b + 1 : l = b;
        }
        return We(l, _t);
      }
      function Qs(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !kt(c, f)) {
            var f = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Ks(e) {
        return typeof e == "number" ? e : it(e) ? le : +e;
      }
      function nt(e) {
        if (typeof e == "string")
          return e;
        if (ne(e))
          return Te(e, nt) + "";
        if (it(e))
          return ws ? ws.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function Qt(e, t, n) {
        var i = -1, r = hi, l = e.length, u = !0, c = [], f = c;
        if (n)
          u = !1, r = Er;
        else if (l >= k) {
          var _ = t ? null : b1(e);
          if (_)
            return gi(_);
          u = !1, r = Nn, f = new on();
        } else
          f = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var b = e[i], S = t ? t(b) : b;
            if (b = n || b !== 0 ? b : 0, u && S === S) {
              for (var V = f.length; V--; )
                if (f[V] === S)
                  continue e;
              t && f.push(S), c.push(b);
            } else
              r(f, S, n) || (f !== c && f.push(S), c.push(b));
          }
        return c;
      }
      function Yr(e, t) {
        return t = Kt(t, e), e = b0(e, t), e == null || delete e[At(ht(t))];
      }
      function Ys(e, t, n, i) {
        return jn(e, t, n(cn(e, t)), i);
      }
      function Oi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? pt(e, i ? 0 : l, i ? l + 1 : r) : pt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Zs(e, t) {
        var n = e;
        return n instanceof fe && (n = n.value()), Sr(t, function(i, r) {
          return r.func.apply(r.thisArg, Nt([i], r.args));
        }, n);
      }
      function Zr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? Qt(e[0]) : [];
        for (var r = -1, l = m(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = Zn(l[r] || u, e[c], t, n));
        return Qt(Ge(l, 1), t, n);
      }
      function Xs(e, t, n) {
        for (var i = -1, r = e.length, l = t.length, u = {}; ++i < r; ) {
          var c = i < l ? t[i] : a;
          n(u, e[i], c);
        }
        return u;
      }
      function Xr(e) {
        return Le(e) ? e : [];
      }
      function Jr(e) {
        return typeof e == "function" ? e : Je;
      }
      function Kt(e, t) {
        return ne(e) ? e : la(e, t) ? [e] : w0(ke(e));
      }
      var f1 = oe;
      function Yt(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : pt(e, t, n);
      }
      var Js = jo || function(e) {
        return Re.clearTimeout(e);
      };
      function js(e, t) {
        if (t)
          return e.slice();
        var n = e.length, i = vs ? vs(n) : new e.constructor(n);
        return e.copy(i), i;
      }
      function jr(e) {
        var t = new e.constructor(e.byteLength);
        return new bi(t).set(new bi(e)), t;
      }
      function p1(e, t) {
        var n = t ? jr(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function h1(e) {
        var t = new e.constructor(e.source, Oa.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function m1(e) {
        return Kn ? Ee(Kn.call(e)) : {};
      }
      function e0(e, t) {
        var n = t ? jr(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function t0(e, t) {
        if (e !== t) {
          var n = e !== a, i = e === null, r = e === e, l = it(e), u = t !== a, c = t === null, f = t === t, _ = it(t);
          if (!c && !_ && !l && e > t || l && u && f && !c && !_ || i && u && f || !n && f || !r)
            return 1;
          if (!i && !l && !_ && e < t || _ && n && r && !i && !l || c && n && r || !u && r || !f)
            return -1;
        }
        return 0;
      }
      function g1(e, t, n) {
        for (var i = -1, r = e.criteria, l = t.criteria, u = r.length, c = n.length; ++i < u; ) {
          var f = t0(r[i], l[i]);
          if (f) {
            if (i >= c)
              return f;
            var _ = n[i];
            return f * (_ == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function n0(e, t, n, i) {
        for (var r = -1, l = e.length, u = n.length, c = -1, f = t.length, _ = $e(l - u, 0), b = m(f + _), S = !i; ++c < f; )
          b[c] = t[c];
        for (; ++r < u; )
          (S || r < l) && (b[n[r]] = e[r]);
        for (; _--; )
          b[c++] = e[r++];
        return b;
      }
      function i0(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, f = -1, _ = t.length, b = $e(l - c, 0), S = m(b + _), V = !i; ++r < b; )
          S[r] = e[r];
        for (var z = r; ++f < _; )
          S[z + f] = t[f];
        for (; ++u < c; )
          (V || r < l) && (S[z + n[u]] = e[r++]);
        return S;
      }
      function Ye(e, t) {
        var n = -1, i = e.length;
        for (t || (t = m(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function St(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], f = i ? i(n[c], e[c], c, n, e) : a;
          f === a && (f = e[c]), r ? Ft(n, c, f) : Yn(n, c, f);
        }
        return n;
      }
      function x1(e, t) {
        return St(e, sa(e), t);
      }
      function y1(e, t) {
        return St(e, g0(e), t);
      }
      function Pi(e, t) {
        return function(n, i) {
          var r = ne(n) ? Eo : Mu, l = t ? t() : {};
          return r(n, e, Q(i, 2), l);
        };
      }
      function Fn(e) {
        return oe(function(t, n) {
          var i = -1, r = n.length, l = r > 1 ? n[r - 1] : a, u = r > 2 ? n[2] : a;
          for (l = e.length > 3 && typeof l == "function" ? (r--, l) : a, u && He(n[0], n[1], u) && (l = r < 3 ? a : l, r = 1), t = Ee(t); ++i < r; ) {
            var c = n[i];
            c && e(t, c, i, l);
          }
          return t;
        });
      }
      function r0(e, t) {
        return function(n, i) {
          if (n == null)
            return n;
          if (!Ze(n))
            return e(n, i);
          for (var r = n.length, l = t ? r : -1, u = Ee(n); (t ? l-- : ++l < r) && i(u[l], l, u) !== !1; )
            ;
          return n;
        };
      }
      function a0(e) {
        return function(t, n, i) {
          for (var r = -1, l = Ee(t), u = i(t), c = u.length; c--; ) {
            var f = u[e ? c : ++r];
            if (n(l[f], f, l) === !1)
              break;
          }
          return t;
        };
      }
      function k1(e, t, n) {
        var i = t & J, r = ei(e);
        function l() {
          var u = this && this !== Re && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function s0(e) {
        return function(t) {
          t = ke(t);
          var n = wn(t) ? xt(t) : a, i = n ? n[0] : t.charAt(0), r = n ? Yt(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function Vn(e) {
        return function(t) {
          return Sr(rl(il(t).replace(oo, "")), e, "");
        };
      }
      function ei(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var n = Bn(e.prototype), i = e.apply(n, t);
          return De(i) ? i : n;
        };
      }
      function v1(e, t, n) {
        var i = ei(e);
        function r() {
          for (var l = arguments.length, u = m(l), c = l, f = $n(r); c--; )
            u[c] = arguments[c];
          var _ = l < 3 && u[0] !== f && u[l - 1] !== f ? [] : qt(u, f);
          if (l -= _.length, l < n)
            return d0(
              e,
              t,
              Ri,
              r.placeholder,
              a,
              u,
              _,
              a,
              a,
              n - l
            );
          var b = this && this !== Re && this instanceof r ? i : e;
          return et(b, this, u);
        }
        return r;
      }
      function l0(e) {
        return function(t, n, i) {
          var r = Ee(t);
          if (!Ze(t)) {
            var l = Q(n, 3);
            t = Pe(t), n = function(c) {
              return l(r[c], c, r);
            };
          }
          var u = e(t, n, i);
          return u > -1 ? r[l ? t[u] : u] : a;
        };
      }
      function o0(e) {
        return $t(function(t) {
          var n = t.length, i = n, r = dt.prototype.thru;
          for (e && t.reverse(); i--; ) {
            var l = t[i];
            if (typeof l != "function")
              throw new ct(N);
            if (r && !u && Wi(l) == "wrapper")
              var u = new dt([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Wi(l), f = c == "wrapper" ? ra(l) : a;
            f && oa(f[0]) && f[1] == (R | ge | X | ve) && !f[4].length && f[9] == 1 ? u = u[Wi(f[0])].apply(u, f[3]) : u = l.length == 1 && oa(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var _ = arguments, b = _[0];
            if (u && _.length == 1 && ne(b))
              return u.plant(b).value();
            for (var S = 0, V = n ? t[S].apply(this, _) : b; ++S < n; )
              V = t[S].call(this, V);
            return V;
          };
        });
      }
      function Ri(e, t, n, i, r, l, u, c, f, _) {
        var b = t & R, S = t & J, V = t & pe, z = t & (ge | Z), K = t & Ue, se = V ? a : ei(e);
        function Y() {
          for (var ce = arguments.length, he = m(ce), rt = ce; rt--; )
            he[rt] = arguments[rt];
          if (z)
            var Qe = $n(Y), at = Bo(he, Qe);
          if (i && (he = n0(he, i, r, z)), l && (he = i0(he, l, u, z)), ce -= at, z && ce < _) {
            var Be = qt(he, Qe);
            return d0(
              e,
              t,
              Ri,
              Y.placeholder,
              n,
              he,
              Be,
              c,
              f,
              _ - ce
            );
          }
          var vt = S ? n : this, Gt = V ? vt[e] : e;
          return ce = he.length, c ? he = M1(he, c) : K && ce > 1 && he.reverse(), b && f < ce && (he.length = f), this && this !== Re && this instanceof Y && (Gt = se || ei(Gt)), Gt.apply(vt, he);
        }
        return Y;
      }
      function u0(e, t) {
        return function(n, i) {
          return Ku(n, e, t(i), {});
        };
      }
      function Gi(e, t) {
        return function(n, i) {
          var r;
          if (n === a && i === a)
            return t;
          if (n !== a && (r = n), i !== a) {
            if (r === a)
              return i;
            typeof n == "string" || typeof i == "string" ? (n = nt(n), i = nt(i)) : (n = Ks(n), i = Ks(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ea(e) {
        return $t(function(t) {
          return t = Te(t, tt(Q())), oe(function(n) {
            var i = this;
            return e(t, function(r) {
              return et(r, i, n);
            });
          });
        });
      }
      function Mi(e, t) {
        t = t === a ? " " : nt(t);
        var n = t.length;
        if (n < 2)
          return n ? Qr(t, e) : t;
        var i = Qr(t, wi(e / Cn(t)));
        return wn(t) ? Yt(xt(i), 0, e).join("") : i.slice(0, e);
      }
      function _1(e, t, n, i) {
        var r = t & J, l = ei(e);
        function u() {
          for (var c = -1, f = arguments.length, _ = -1, b = i.length, S = m(b + f), V = this && this !== Re && this instanceof u ? l : e; ++_ < b; )
            S[_] = i[_];
          for (; f--; )
            S[_++] = arguments[++c];
          return et(V, r ? n : this, S);
        }
        return u;
      }
      function c0(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && He(t, n, i) && (n = i = a), t = Rt(t), n === a ? (n = t, t = 0) : n = Rt(n), i = i === a ? t < n ? 1 : -1 : Rt(i), s1(t, n, i, e);
        };
      }
      function Ui(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = mt(t), n = mt(n)), e(t, n);
        };
      }
      function d0(e, t, n, i, r, l, u, c, f, _) {
        var b = t & ge, S = b ? u : a, V = b ? a : u, z = b ? l : a, K = b ? a : l;
        t |= b ? X : w, t &= ~(b ? w : X), t & ye || (t &= -4);
        var se = [
          e,
          t,
          r,
          z,
          S,
          K,
          V,
          c,
          f,
          _
        ], Y = n.apply(a, se);
        return oa(e) && E0(Y, se), Y.placeholder = i, S0(Y, e, t);
      }
      function ta(e) {
        var t = Ve[e];
        return function(n, i) {
          if (n = mt(n), i = i == null ? 0 : We(re(i), 292), i && Ss(n)) {
            var r = (ke(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (ke(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var b1 = In && 1 / gi(new In([, -0]))[1] == Mt ? function(e) {
        return new In(e);
      } : Ea;
      function f0(e) {
        return function(t) {
          var n = Ne(t);
          return n == Ke ? Lr(t) : n == P ? Go(t) : Lo(t, e(t));
        };
      }
      function Vt(e, t, n, i, r, l, u, c) {
        var f = t & pe;
        if (!f && typeof e != "function")
          throw new ct(N);
        var _ = i ? i.length : 0;
        if (_ || (t &= -97, i = r = a), u = u === a ? u : $e(re(u), 0), c = c === a ? c : re(c), _ -= r ? r.length : 0, t & w) {
          var b = i, S = r;
          i = r = a;
        }
        var V = f ? a : ra(e), z = [
          e,
          t,
          n,
          i,
          r,
          b,
          S,
          l,
          u,
          c
        ];
        if (V && P1(z, V), e = z[0], t = z[1], n = z[2], i = z[3], r = z[4], c = z[9] = z[9] === a ? f ? 0 : e.length : $e(z[9] - _, 0), !c && t & (ge | Z) && (t &= -25), !t || t == J)
          var K = k1(e, t, n);
        else
          t == ge || t == Z ? K = v1(e, t, c) : (t == X || t == (J | X)) && !r.length ? K = _1(e, t, n, i) : K = Ri.apply(a, z);
        var se = V ? Hs : E0;
        return S0(se(K, z), e, t);
      }
      function p0(e, t, n, i) {
        return e === a || kt(e, Dn[n]) && !_e.call(i, n) ? t : e;
      }
      function h0(e, t, n, i, r, l) {
        return De(e) && De(t) && (l.set(t, e), Vi(e, t, a, h0, l), l.delete(t)), e;
      }
      function E1(e) {
        return ii(e) ? a : e;
      }
      function m0(e, t, n, i, r, l) {
        var u = n & ie, c = e.length, f = t.length;
        if (c != f && !(u && f > c))
          return !1;
        var _ = l.get(e), b = l.get(t);
        if (_ && b)
          return _ == t && b == e;
        var S = -1, V = !0, z = n & ae ? new on() : a;
        for (l.set(e, t), l.set(t, e); ++S < c; ) {
          var K = e[S], se = t[S];
          if (i)
            var Y = u ? i(se, K, S, t, e, l) : i(K, se, S, e, t, l);
          if (Y !== a) {
            if (Y)
              continue;
            V = !1;
            break;
          }
          if (z) {
            if (!Ar(t, function(ce, he) {
              if (!Nn(z, he) && (K === ce || r(K, ce, n, i, l)))
                return z.push(he);
            })) {
              V = !1;
              break;
            }
          } else if (!(K === se || r(K, se, n, i, l))) {
            V = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), V;
      }
      function S1(e, t, n, i, r, l, u) {
        switch (n) {
          case En:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case Wn:
            return !(e.byteLength != t.byteLength || !l(new bi(e), new bi(t)));
          case Ut:
          case nn:
          case rn:
            return kt(+e, +t);
          case It:
            return e.name == t.name && e.message == t.message;
          case T:
          case we:
            return e == t + "";
          case Ke:
            var c = Lr;
          case P:
            var f = i & ie;
            if (c || (c = gi), e.size != t.size && !f)
              return !1;
            var _ = u.get(e);
            if (_)
              return _ == t;
            i |= ae, u.set(e, t);
            var b = m0(c(e), c(t), i, r, l, u);
            return u.delete(e), b;
          case O:
            if (Kn)
              return Kn.call(e) == Kn.call(t);
        }
        return !1;
      }
      function A1(e, t, n, i, r, l) {
        var u = n & ie, c = na(e), f = c.length, _ = na(t), b = _.length;
        if (f != b && !u)
          return !1;
        for (var S = f; S--; ) {
          var V = c[S];
          if (!(u ? V in t : _e.call(t, V)))
            return !1;
        }
        var z = l.get(e), K = l.get(t);
        if (z && K)
          return z == t && K == e;
        var se = !0;
        l.set(e, t), l.set(t, e);
        for (var Y = u; ++S < f; ) {
          V = c[S];
          var ce = e[V], he = t[V];
          if (i)
            var rt = u ? i(he, ce, V, t, e, l) : i(ce, he, V, e, t, l);
          if (!(rt === a ? ce === he || r(ce, he, n, i, l) : rt)) {
            se = !1;
            break;
          }
          Y || (Y = V == "constructor");
        }
        if (se && !Y) {
          var Qe = e.constructor, at = t.constructor;
          Qe != at && "constructor" in e && "constructor" in t && !(typeof Qe == "function" && Qe instanceof Qe && typeof at == "function" && at instanceof at) && (se = !1);
        }
        return l.delete(e), l.delete(t), se;
      }
      function $t(e) {
        return ca(_0(e, a, I0), e + "");
      }
      function na(e) {
        return $s(e, Pe, sa);
      }
      function ia(e) {
        return $s(e, Xe, g0);
      }
      var ra = Ti ? function(e) {
        return Ti.get(e);
      } : Ea;
      function Wi(e) {
        for (var t = e.name + "", n = Ln[t], i = _e.call(Ln, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function $n(e) {
        var t = _e.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function Q() {
        var e = s.iteratee || _a;
        return e = e === _a ? Rs : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Ni(e, t) {
        var n = e.__data__;
        return F1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function aa(e) {
        for (var t = Pe(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, k0(r)];
        }
        return t;
      }
      function dn(e, t) {
        var n = Oo(e, t);
        return Ps(n) ? n : a;
      }
      function w1(e) {
        var t = _e.call(e, sn), n = e[sn];
        try {
          e[sn] = a;
          var i = !0;
        } catch {
        }
        var r = vi.call(e);
        return i && (t ? e[sn] = n : delete e[sn]), r;
      }
      var sa = Fr ? function(e) {
        return e == null ? [] : (e = Ee(e), Wt(Fr(e), function(t) {
          return bs.call(e, t);
        }));
      } : Sa, g0 = Fr ? function(e) {
        for (var t = []; e; )
          Nt(t, sa(e)), e = Ei(e);
        return t;
      } : Sa, Ne = ze;
      (Vr && Ne(new Vr(new ArrayBuffer(1))) != En || zn && Ne(new zn()) != Ke || $r && Ne($r.resolve()) != ci || In && Ne(new In()) != P || Hn && Ne(new Hn()) != bt) && (Ne = function(e) {
        var t = ze(e), n = t == gt ? e.constructor : a, i = n ? fn(n) : "";
        if (i)
          switch (i) {
            case ou:
              return En;
            case uu:
              return Ke;
            case cu:
              return ci;
            case du:
              return P;
            case fu:
              return bt;
          }
        return t;
      });
      function C1(e, t, n) {
        for (var i = -1, r = n.length; ++i < r; ) {
          var l = n[i], u = l.size;
          switch (l.type) {
            case "drop":
              e += u;
              break;
            case "dropRight":
              t -= u;
              break;
            case "take":
              t = We(t, e + u);
              break;
            case "takeRight":
              e = $e(e, t - u);
              break;
          }
        }
        return { start: e, end: t };
      }
      function T1(e) {
        var t = e.match(Fl);
        return t ? t[1].split(Vl) : [];
      }
      function x0(e, t, n) {
        t = Kt(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = At(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && Zi(r) && Ot(u, r) && (ne(e) || pn(e)));
      }
      function D1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && _e.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function y0(e) {
        return typeof e.constructor == "function" && !ti(e) ? Bn(Ei(e)) : {};
      }
      function I1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case Wn:
            return jr(e);
          case Ut:
          case nn:
            return new i(+e);
          case En:
            return p1(e, n);
          case ar:
          case sr:
          case lr:
          case or:
          case ur:
          case cr:
          case dr:
          case fr:
          case pr:
            return e0(e, n);
          case Ke:
            return new i();
          case rn:
          case we:
            return new i(e);
          case T:
            return h1(e);
          case P:
            return new i();
          case O:
            return m1(e);
        }
      }
      function L1(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var i = n - 1;
        return t[i] = (n > 1 ? "& " : "") + t[i], t = t.join(n > 2 ? ", " : " "), e.replace(Bl, `{
/* [wrapped with ` + t + `] */
`);
      }
      function B1(e) {
        return ne(e) || pn(e) || !!(Es && e && e[Es]);
      }
      function Ot(e, t) {
        var n = typeof e;
        return t = t ?? W, !!t && (n == "number" || n != "symbol" && Nl.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function He(e, t, n) {
        if (!De(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? Ze(n) && Ot(t, n.length) : i == "string" && t in n) ? kt(n[t], e) : !1;
      }
      function la(e, t) {
        if (ne(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || it(e) ? !0 : Tl.test(e) || !Cl.test(e) || t != null && e in Ee(t);
      }
      function F1(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function oa(e) {
        var t = Wi(e), n = s[t];
        if (typeof n != "function" || !(t in fe.prototype))
          return !1;
        if (e === n)
          return !0;
        var i = ra(n);
        return !!i && e === i[0];
      }
      function V1(e) {
        return !!ks && ks in e;
      }
      var $1 = yi ? Pt : Aa;
      function ti(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Dn;
        return e === n;
      }
      function k0(e) {
        return e === e && !De(e);
      }
      function v0(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in Ee(n));
        };
      }
      function O1(e) {
        var t = Ki(e, function(i) {
          return n.size === B && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function P1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (J | pe | R), u = i == R && n == ge || i == R && n == ve && e[7].length <= t[8] || i == (R | ve) && t[7].length <= t[8] && n == ge;
        if (!(l || u))
          return e;
        i & J && (e[2] = t[2], r |= n & J ? 0 : ye);
        var c = t[3];
        if (c) {
          var f = e[3];
          e[3] = f ? n0(f, c, t[4]) : c, e[4] = f ? qt(e[3], E) : t[4];
        }
        return c = t[5], c && (f = e[5], e[5] = f ? i0(f, c, t[6]) : c, e[6] = f ? qt(e[5], E) : t[6]), c = t[7], c && (e[7] = c), i & R && (e[8] = e[8] == null ? t[8] : We(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
      }
      function R1(e) {
        var t = [];
        if (e != null)
          for (var n in Ee(e))
            t.push(n);
        return t;
      }
      function G1(e) {
        return vi.call(e);
      }
      function _0(e, t, n) {
        return t = $e(t === a ? e.length - 1 : t, 0), function() {
          for (var i = arguments, r = -1, l = $e(i.length - t, 0), u = m(l); ++r < l; )
            u[r] = i[t + r];
          r = -1;
          for (var c = m(t + 1); ++r < t; )
            c[r] = i[r];
          return c[t] = n(u), et(e, this, c);
        };
      }
      function b0(e, t) {
        return t.length < 2 ? e : cn(e, pt(t, 0, -1));
      }
      function M1(e, t) {
        for (var n = e.length, i = We(t.length, n), r = Ye(e); i--; ) {
          var l = t[i];
          e[i] = Ot(l, n) ? r[l] : a;
        }
        return e;
      }
      function ua(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var E0 = A0(Hs), ni = tu || function(e, t) {
        return Re.setTimeout(e, t);
      }, ca = A0(u1);
      function S0(e, t, n) {
        var i = t + "";
        return ca(e, L1(i, U1(T1(i), n)));
      }
      function A0(e) {
        var t = 0, n = 0;
        return function() {
          var i = au(), r = Gn - (i - n);
          if (n = i, r > 0) {
            if (++t >= en)
              return arguments[0];
          } else
            t = 0;
          return e.apply(a, arguments);
        };
      }
      function qi(e, t) {
        var n = -1, i = e.length, r = i - 1;
        for (t = t === a ? i : t; ++n < t; ) {
          var l = Hr(n, r), u = e[l];
          e[l] = e[n], e[n] = u;
        }
        return e.length = t, e;
      }
      var w0 = O1(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(Dl, function(n, i, r, l) {
          t.push(r ? l.replace(Pl, "$1") : i || n);
        }), t;
      });
      function At(e) {
        if (typeof e == "string" || it(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function fn(e) {
        if (e != null) {
          try {
            return ki.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function U1(e, t) {
        return ut(_n, function(n) {
          var i = "_." + n[0];
          t & n[1] && !hi(e, i) && e.push(i);
        }), e.sort();
      }
      function C0(e) {
        if (e instanceof fe)
          return e.clone();
        var t = new dt(e.__wrapped__, e.__chain__);
        return t.__actions__ = Ye(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function W1(e, t, n) {
        (n ? He(e, t, n) : t === a) ? t = 1 : t = $e(re(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = m(wi(i / t)); r < i; )
          u[l++] = pt(e, r, r += t);
        return u;
      }
      function N1(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++t < n; ) {
          var l = e[t];
          l && (r[i++] = l);
        }
        return r;
      }
      function q1() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = m(e - 1), n = arguments[0], i = e; i--; )
          t[i - 1] = arguments[i];
        return Nt(ne(n) ? Ye(n) : [n], Ge(t, 1));
      }
      var z1 = oe(function(e, t) {
        return Le(e) ? Zn(e, Ge(t, 1, Le, !0)) : [];
      }), H1 = oe(function(e, t) {
        var n = ht(t);
        return Le(n) && (n = a), Le(e) ? Zn(e, Ge(t, 1, Le, !0), Q(n, 2)) : [];
      }), Q1 = oe(function(e, t) {
        var n = ht(t);
        return Le(n) && (n = a), Le(e) ? Zn(e, Ge(t, 1, Le, !0), a, n) : [];
      });
      function K1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : re(t), pt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Y1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : re(t), t = i - t, pt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Z1(e, t) {
        return e && e.length ? Oi(e, Q(t, 3), !0, !0) : [];
      }
      function X1(e, t) {
        return e && e.length ? Oi(e, Q(t, 3), !0) : [];
      }
      function J1(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && He(e, t, n) && (n = 0, i = r), qu(e, t, n, i)) : [];
      }
      function T0(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : re(n);
        return r < 0 && (r = $e(i + r, 0)), mi(e, Q(t, 3), r);
      }
      function D0(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = re(n), r = n < 0 ? $e(i + r, 0) : We(r, i - 1)), mi(e, Q(t, 3), r, !0);
      }
      function I0(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ge(e, 1) : [];
      }
      function j1(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ge(e, Mt) : [];
      }
      function ec(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : re(t), Ge(e, t)) : [];
      }
      function tc(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = {}; ++t < n; ) {
          var r = e[t];
          i[r[0]] = r[1];
        }
        return i;
      }
      function L0(e) {
        return e && e.length ? e[0] : a;
      }
      function nc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : re(n);
        return r < 0 && (r = $e(i + r, 0)), An(e, t, r);
      }
      function ic(e) {
        var t = e == null ? 0 : e.length;
        return t ? pt(e, 0, -1) : [];
      }
      var rc = oe(function(e) {
        var t = Te(e, Xr);
        return t.length && t[0] === e[0] ? Ur(t) : [];
      }), ac = oe(function(e) {
        var t = ht(e), n = Te(e, Xr);
        return t === ht(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Ur(n, Q(t, 2)) : [];
      }), sc = oe(function(e) {
        var t = ht(e), n = Te(e, Xr);
        return t = typeof t == "function" ? t : a, t && n.pop(), n.length && n[0] === e[0] ? Ur(n, a, t) : [];
      });
      function lc(e, t) {
        return e == null ? "" : iu.call(e, t);
      }
      function ht(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : a;
      }
      function oc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i;
        return n !== a && (r = re(n), r = r < 0 ? $e(i + r, 0) : We(r, i - 1)), t === t ? Uo(e, t, r) : mi(e, ds, r, !0);
      }
      function uc(e, t) {
        return e && e.length ? Ws(e, re(t)) : a;
      }
      var cc = oe(B0);
      function B0(e, t) {
        return e && e.length && t && t.length ? zr(e, t) : e;
      }
      function dc(e, t, n) {
        return e && e.length && t && t.length ? zr(e, t, Q(n, 2)) : e;
      }
      function fc(e, t, n) {
        return e && e.length && t && t.length ? zr(e, t, a, n) : e;
      }
      var pc = $t(function(e, t) {
        var n = e == null ? 0 : e.length, i = Pr(e, t);
        return zs(e, Te(t, function(r) {
          return Ot(r, n) ? +r : r;
        }).sort(t0)), i;
      });
      function hc(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var i = -1, r = [], l = e.length;
        for (t = Q(t, 3); ++i < l; ) {
          var u = e[i];
          t(u, i, e) && (n.push(u), r.push(i));
        }
        return zs(e, r), n;
      }
      function da(e) {
        return e == null ? e : lu.call(e);
      }
      function mc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (n && typeof n != "number" && He(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : re(t), n = n === a ? i : re(n)), pt(e, t, n)) : [];
      }
      function gc(e, t) {
        return $i(e, t);
      }
      function xc(e, t, n) {
        return Kr(e, t, Q(n, 2));
      }
      function yc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = $i(e, t);
          if (i < n && kt(e[i], t))
            return i;
        }
        return -1;
      }
      function kc(e, t) {
        return $i(e, t, !0);
      }
      function vc(e, t, n) {
        return Kr(e, t, Q(n, 2), !0);
      }
      function _c(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = $i(e, t, !0) - 1;
          if (kt(e[i], t))
            return i;
        }
        return -1;
      }
      function bc(e) {
        return e && e.length ? Qs(e) : [];
      }
      function Ec(e, t) {
        return e && e.length ? Qs(e, Q(t, 2)) : [];
      }
      function Sc(e) {
        var t = e == null ? 0 : e.length;
        return t ? pt(e, 1, t) : [];
      }
      function Ac(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : re(t), pt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function wc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : re(t), t = i - t, pt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Cc(e, t) {
        return e && e.length ? Oi(e, Q(t, 3), !1, !0) : [];
      }
      function Tc(e, t) {
        return e && e.length ? Oi(e, Q(t, 3)) : [];
      }
      var Dc = oe(function(e) {
        return Qt(Ge(e, 1, Le, !0));
      }), Ic = oe(function(e) {
        var t = ht(e);
        return Le(t) && (t = a), Qt(Ge(e, 1, Le, !0), Q(t, 2));
      }), Lc = oe(function(e) {
        var t = ht(e);
        return t = typeof t == "function" ? t : a, Qt(Ge(e, 1, Le, !0), a, t);
      });
      function Bc(e) {
        return e && e.length ? Qt(e) : [];
      }
      function Fc(e, t) {
        return e && e.length ? Qt(e, Q(t, 2)) : [];
      }
      function Vc(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? Qt(e, a, t) : [];
      }
      function fa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = Wt(e, function(n) {
          if (Le(n))
            return t = $e(n.length, t), !0;
        }), Dr(t, function(n) {
          return Te(e, wr(n));
        });
      }
      function F0(e, t) {
        if (!(e && e.length))
          return [];
        var n = fa(e);
        return t == null ? n : Te(n, function(i) {
          return et(t, a, i);
        });
      }
      var $c = oe(function(e, t) {
        return Le(e) ? Zn(e, t) : [];
      }), Oc = oe(function(e) {
        return Zr(Wt(e, Le));
      }), Pc = oe(function(e) {
        var t = ht(e);
        return Le(t) && (t = a), Zr(Wt(e, Le), Q(t, 2));
      }), Rc = oe(function(e) {
        var t = ht(e);
        return t = typeof t == "function" ? t : a, Zr(Wt(e, Le), a, t);
      }), Gc = oe(fa);
      function Mc(e, t) {
        return Xs(e || [], t || [], Yn);
      }
      function Uc(e, t) {
        return Xs(e || [], t || [], jn);
      }
      var Wc = oe(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : a;
        return n = typeof n == "function" ? (e.pop(), n) : a, F0(e, n);
      });
      function V0(e) {
        var t = s(e);
        return t.__chain__ = !0, t;
      }
      function Nc(e, t) {
        return t(e), e;
      }
      function zi(e, t) {
        return t(e);
      }
      var qc = $t(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Pr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof fe) || !Ot(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: zi,
          args: [r],
          thisArg: a
        }), new dt(i, this.__chain__).thru(function(l) {
          return t && !l.length && l.push(a), l;
        }));
      });
      function zc() {
        return V0(this);
      }
      function Hc() {
        return new dt(this.value(), this.__chain__);
      }
      function Qc() {
        this.__values__ === a && (this.__values__ = K0(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? a : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Kc() {
        return this;
      }
      function Yc(e) {
        for (var t, n = this; n instanceof Ii; ) {
          var i = C0(n);
          i.__index__ = 0, i.__values__ = a, t ? r.__wrapped__ = i : t = i;
          var r = i;
          n = n.__wrapped__;
        }
        return r.__wrapped__ = e, t;
      }
      function Zc() {
        var e = this.__wrapped__;
        if (e instanceof fe) {
          var t = e;
          return this.__actions__.length && (t = new fe(this)), t = t.reverse(), t.__actions__.push({
            func: zi,
            args: [da],
            thisArg: a
          }), new dt(t, this.__chain__);
        }
        return this.thru(da);
      }
      function Xc() {
        return Zs(this.__wrapped__, this.__actions__);
      }
      var Jc = Pi(function(e, t, n) {
        _e.call(e, n) ? ++e[n] : Ft(e, n, 1);
      });
      function jc(e, t, n) {
        var i = ne(e) ? us : Nu;
        return n && He(e, t, n) && (t = a), i(e, Q(t, 3));
      }
      function ed(e, t) {
        var n = ne(e) ? Wt : Fs;
        return n(e, Q(t, 3));
      }
      var td = l0(T0), nd = l0(D0);
      function id(e, t) {
        return Ge(Hi(e, t), 1);
      }
      function rd(e, t) {
        return Ge(Hi(e, t), Mt);
      }
      function ad(e, t, n) {
        return n = n === a ? 1 : re(n), Ge(Hi(e, t), n);
      }
      function $0(e, t) {
        var n = ne(e) ? ut : Ht;
        return n(e, Q(t, 3));
      }
      function O0(e, t) {
        var n = ne(e) ? So : Bs;
        return n(e, Q(t, 3));
      }
      var sd = Pi(function(e, t, n) {
        _e.call(e, n) ? e[n].push(t) : Ft(e, n, [t]);
      });
      function ld(e, t, n, i) {
        e = Ze(e) ? e : Pn(e), n = n && !i ? re(n) : 0;
        var r = e.length;
        return n < 0 && (n = $e(r + n, 0)), Xi(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && An(e, t, n) > -1;
      }
      var od = oe(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = Ze(e) ? m(e.length) : [];
        return Ht(e, function(u) {
          l[++i] = r ? et(t, u, n) : Xn(u, t, n);
        }), l;
      }), ud = Pi(function(e, t, n) {
        Ft(e, n, t);
      });
      function Hi(e, t) {
        var n = ne(e) ? Te : Gs;
        return n(e, Q(t, 3));
      }
      function cd(e, t, n, i) {
        return e == null ? [] : (ne(t) || (t = t == null ? [] : [t]), n = i ? a : n, ne(n) || (n = n == null ? [] : [n]), Ns(e, t, n));
      }
      var dd = Pi(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function fd(e, t, n) {
        var i = ne(e) ? Sr : ps, r = arguments.length < 3;
        return i(e, Q(t, 4), n, r, Ht);
      }
      function pd(e, t, n) {
        var i = ne(e) ? Ao : ps, r = arguments.length < 3;
        return i(e, Q(t, 4), n, r, Bs);
      }
      function hd(e, t) {
        var n = ne(e) ? Wt : Fs;
        return n(e, Yi(Q(t, 3)));
      }
      function md(e) {
        var t = ne(e) ? Ts : l1;
        return t(e);
      }
      function gd(e, t, n) {
        (n ? He(e, t, n) : t === a) ? t = 1 : t = re(t);
        var i = ne(e) ? Ru : o1;
        return i(e, t);
      }
      function xd(e) {
        var t = ne(e) ? Gu : c1;
        return t(e);
      }
      function yd(e) {
        if (e == null)
          return 0;
        if (Ze(e))
          return Xi(e) ? Cn(e) : e.length;
        var t = Ne(e);
        return t == Ke || t == P ? e.size : Nr(e).length;
      }
      function kd(e, t, n) {
        var i = ne(e) ? Ar : d1;
        return n && He(e, t, n) && (t = a), i(e, Q(t, 3));
      }
      var vd = oe(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && He(e, t[0], t[1]) ? t = [] : n > 2 && He(t[0], t[1], t[2]) && (t = [t[0]]), Ns(e, Ge(t, 1), []);
      }), Qi = eu || function() {
        return Re.Date.now();
      };
      function _d(e, t) {
        if (typeof t != "function")
          throw new ct(N);
        return e = re(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function P0(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, Vt(e, R, a, a, a, a, t);
      }
      function R0(e, t) {
        var n;
        if (typeof t != "function")
          throw new ct(N);
        return e = re(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var pa = oe(function(e, t, n) {
        var i = J;
        if (n.length) {
          var r = qt(n, $n(pa));
          i |= X;
        }
        return Vt(e, i, t, n, r);
      }), G0 = oe(function(e, t, n) {
        var i = J | pe;
        if (n.length) {
          var r = qt(n, $n(G0));
          i |= X;
        }
        return Vt(t, i, e, n, r);
      });
      function M0(e, t, n) {
        t = n ? a : t;
        var i = Vt(e, ge, a, a, a, a, a, t);
        return i.placeholder = M0.placeholder, i;
      }
      function U0(e, t, n) {
        t = n ? a : t;
        var i = Vt(e, Z, a, a, a, a, a, t);
        return i.placeholder = U0.placeholder, i;
      }
      function W0(e, t, n) {
        var i, r, l, u, c, f, _ = 0, b = !1, S = !1, V = !0;
        if (typeof e != "function")
          throw new ct(N);
        t = mt(t) || 0, De(n) && (b = !!n.leading, S = "maxWait" in n, l = S ? $e(mt(n.maxWait) || 0, t) : l, V = "trailing" in n ? !!n.trailing : V);
        function z(Be) {
          var vt = i, Gt = r;
          return i = r = a, _ = Be, u = e.apply(Gt, vt), u;
        }
        function K(Be) {
          return _ = Be, c = ni(ce, t), b ? z(Be) : u;
        }
        function se(Be) {
          var vt = Be - f, Gt = Be - _, ll = t - vt;
          return S ? We(ll, l - Gt) : ll;
        }
        function Y(Be) {
          var vt = Be - f, Gt = Be - _;
          return f === a || vt >= t || vt < 0 || S && Gt >= l;
        }
        function ce() {
          var Be = Qi();
          if (Y(Be))
            return he(Be);
          c = ni(ce, se(Be));
        }
        function he(Be) {
          return c = a, V && i ? z(Be) : (i = r = a, u);
        }
        function rt() {
          c !== a && Js(c), _ = 0, i = f = r = c = a;
        }
        function Qe() {
          return c === a ? u : he(Qi());
        }
        function at() {
          var Be = Qi(), vt = Y(Be);
          if (i = arguments, r = this, f = Be, vt) {
            if (c === a)
              return K(f);
            if (S)
              return Js(c), c = ni(ce, t), z(f);
          }
          return c === a && (c = ni(ce, t)), u;
        }
        return at.cancel = rt, at.flush = Qe, at;
      }
      var bd = oe(function(e, t) {
        return Ls(e, 1, t);
      }), Ed = oe(function(e, t, n) {
        return Ls(e, mt(t) || 0, n);
      });
      function Sd(e) {
        return Vt(e, Ue);
      }
      function Ki(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new ct(N);
        var n = function() {
          var i = arguments, r = t ? t.apply(this, i) : i[0], l = n.cache;
          if (l.has(r))
            return l.get(r);
          var u = e.apply(this, i);
          return n.cache = l.set(r, u) || l, u;
        };
        return n.cache = new (Ki.Cache || Bt)(), n;
      }
      Ki.Cache = Bt;
      function Yi(e) {
        if (typeof e != "function")
          throw new ct(N);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function Ad(e) {
        return R0(2, e);
      }
      var wd = f1(function(e, t) {
        t = t.length == 1 && ne(t[0]) ? Te(t[0], tt(Q())) : Te(Ge(t, 1), tt(Q()));
        var n = t.length;
        return oe(function(i) {
          for (var r = -1, l = We(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return et(e, this, i);
        });
      }), ha = oe(function(e, t) {
        var n = qt(t, $n(ha));
        return Vt(e, X, a, t, n);
      }), N0 = oe(function(e, t) {
        var n = qt(t, $n(N0));
        return Vt(e, w, a, t, n);
      }), Cd = $t(function(e, t) {
        return Vt(e, ve, a, a, a, t);
      });
      function Td(e, t) {
        if (typeof e != "function")
          throw new ct(N);
        return t = t === a ? t : re(t), oe(e, t);
      }
      function Dd(e, t) {
        if (typeof e != "function")
          throw new ct(N);
        return t = t == null ? 0 : $e(re(t), 0), oe(function(n) {
          var i = n[t], r = Yt(n, 0, t);
          return i && Nt(r, i), et(e, this, r);
        });
      }
      function Id(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new ct(N);
        return De(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), W0(e, t, {
          leading: i,
          maxWait: t,
          trailing: r
        });
      }
      function Ld(e) {
        return P0(e, 1);
      }
      function Bd(e, t) {
        return ha(Jr(t), e);
      }
      function Fd() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return ne(e) ? e : [e];
      }
      function Vd(e) {
        return ft(e, q);
      }
      function $d(e, t) {
        return t = typeof t == "function" ? t : a, ft(e, q, t);
      }
      function Od(e) {
        return ft(e, g | q);
      }
      function Pd(e, t) {
        return t = typeof t == "function" ? t : a, ft(e, g | q, t);
      }
      function Rd(e, t) {
        return t == null || Is(e, t, Pe(t));
      }
      function kt(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Gd = Ui(Mr), Md = Ui(function(e, t) {
        return e >= t;
      }), pn = Os(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Os : function(e) {
        return Ie(e) && _e.call(e, "callee") && !bs.call(e, "callee");
      }, ne = m.isArray, Ud = is ? tt(is) : Yu;
      function Ze(e) {
        return e != null && Zi(e.length) && !Pt(e);
      }
      function Le(e) {
        return Ie(e) && Ze(e);
      }
      function Wd(e) {
        return e === !0 || e === !1 || Ie(e) && ze(e) == Ut;
      }
      var Zt = nu || Aa, Nd = rs ? tt(rs) : Zu;
      function qd(e) {
        return Ie(e) && e.nodeType === 1 && !ii(e);
      }
      function zd(e) {
        if (e == null)
          return !0;
        if (Ze(e) && (ne(e) || typeof e == "string" || typeof e.splice == "function" || Zt(e) || On(e) || pn(e)))
          return !e.length;
        var t = Ne(e);
        if (t == Ke || t == P)
          return !e.size;
        if (ti(e))
          return !Nr(e).length;
        for (var n in e)
          if (_e.call(e, n))
            return !1;
        return !0;
      }
      function Hd(e, t) {
        return Jn(e, t);
      }
      function Qd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? Jn(e, t, a, n) : !!i;
      }
      function ma(e) {
        if (!Ie(e))
          return !1;
        var t = ze(e);
        return t == It || t == ir || typeof e.message == "string" && typeof e.name == "string" && !ii(e);
      }
      function Kd(e) {
        return typeof e == "number" && Ss(e);
      }
      function Pt(e) {
        if (!De(e))
          return !1;
        var t = ze(e);
        return t == bn || t == ui || t == oi || t == ee;
      }
      function q0(e) {
        return typeof e == "number" && e == re(e);
      }
      function Zi(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= W;
      }
      function De(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Ie(e) {
        return e != null && typeof e == "object";
      }
      var z0 = as ? tt(as) : Ju;
      function Yd(e, t) {
        return e === t || Wr(e, t, aa(t));
      }
      function Zd(e, t, n) {
        return n = typeof n == "function" ? n : a, Wr(e, t, aa(t), n);
      }
      function Xd(e) {
        return H0(e) && e != +e;
      }
      function Jd(e) {
        if ($1(e))
          throw new te(M);
        return Ps(e);
      }
      function jd(e) {
        return e === null;
      }
      function ef(e) {
        return e == null;
      }
      function H0(e) {
        return typeof e == "number" || Ie(e) && ze(e) == rn;
      }
      function ii(e) {
        if (!Ie(e) || ze(e) != gt)
          return !1;
        var t = Ei(e);
        if (t === null)
          return !0;
        var n = _e.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && ki.call(n) == Zo;
      }
      var ga = ss ? tt(ss) : ju;
      function tf(e) {
        return q0(e) && e >= -9007199254740991 && e <= W;
      }
      var Q0 = ls ? tt(ls) : e1;
      function Xi(e) {
        return typeof e == "string" || !ne(e) && Ie(e) && ze(e) == we;
      }
      function it(e) {
        return typeof e == "symbol" || Ie(e) && ze(e) == O;
      }
      var On = os ? tt(os) : t1;
      function nf(e) {
        return e === a;
      }
      function rf(e) {
        return Ie(e) && Ne(e) == bt;
      }
      function af(e) {
        return Ie(e) && ze(e) == kl;
      }
      var sf = Ui(qr), lf = Ui(function(e, t) {
        return e <= t;
      });
      function K0(e) {
        if (!e)
          return [];
        if (Ze(e))
          return Xi(e) ? xt(e) : Ye(e);
        if (qn && e[qn])
          return Ro(e[qn]());
        var t = Ne(e), n = t == Ke ? Lr : t == P ? gi : Pn;
        return n(e);
      }
      function Rt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = mt(e), e === Mt || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * v;
        }
        return e === e ? e : 0;
      }
      function re(e) {
        var t = Rt(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Y0(e) {
        return e ? un(re(e), 0, Oe) : 0;
      }
      function mt(e) {
        if (typeof e == "number")
          return e;
        if (it(e))
          return le;
        if (De(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = De(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = hs(e);
        var n = Ml.test(e);
        return n || Wl.test(e) ? _o(e.slice(2), n ? 2 : 8) : Gl.test(e) ? le : +e;
      }
      function Z0(e) {
        return St(e, Xe(e));
      }
      function of(e) {
        return e ? un(re(e), -9007199254740991, W) : e === 0 ? e : 0;
      }
      function ke(e) {
        return e == null ? "" : nt(e);
      }
      var uf = Fn(function(e, t) {
        if (ti(t) || Ze(t)) {
          St(t, Pe(t), e);
          return;
        }
        for (var n in t)
          _e.call(t, n) && Yn(e, n, t[n]);
      }), X0 = Fn(function(e, t) {
        St(t, Xe(t), e);
      }), Ji = Fn(function(e, t, n, i) {
        St(t, Xe(t), e, i);
      }), cf = Fn(function(e, t, n, i) {
        St(t, Pe(t), e, i);
      }), df = $t(Pr);
      function ff(e, t) {
        var n = Bn(e);
        return t == null ? n : Ds(n, t);
      }
      var pf = oe(function(e, t) {
        e = Ee(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && He(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = Xe(l), c = -1, f = u.length; ++c < f; ) {
            var _ = u[c], b = e[_];
            (b === a || kt(b, Dn[_]) && !_e.call(e, _)) && (e[_] = l[_]);
          }
        return e;
      }), hf = oe(function(e) {
        return e.push(a, h0), et(J0, a, e);
      });
      function mf(e, t) {
        return cs(e, Q(t, 3), Et);
      }
      function gf(e, t) {
        return cs(e, Q(t, 3), Gr);
      }
      function xf(e, t) {
        return e == null ? e : Rr(e, Q(t, 3), Xe);
      }
      function yf(e, t) {
        return e == null ? e : Vs(e, Q(t, 3), Xe);
      }
      function kf(e, t) {
        return e && Et(e, Q(t, 3));
      }
      function vf(e, t) {
        return e && Gr(e, Q(t, 3));
      }
      function _f(e) {
        return e == null ? [] : Fi(e, Pe(e));
      }
      function bf(e) {
        return e == null ? [] : Fi(e, Xe(e));
      }
      function xa(e, t, n) {
        var i = e == null ? a : cn(e, t);
        return i === a ? n : i;
      }
      function Ef(e, t) {
        return e != null && x0(e, t, zu);
      }
      function ya(e, t) {
        return e != null && x0(e, t, Hu);
      }
      var Sf = u0(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), e[t] = n;
      }, va(Je)), Af = u0(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), _e.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, Q), wf = oe(Xn);
      function Pe(e) {
        return Ze(e) ? Cs(e) : Nr(e);
      }
      function Xe(e) {
        return Ze(e) ? Cs(e, !0) : n1(e);
      }
      function Cf(e, t) {
        var n = {};
        return t = Q(t, 3), Et(e, function(i, r, l) {
          Ft(n, t(i, r, l), i);
        }), n;
      }
      function Tf(e, t) {
        var n = {};
        return t = Q(t, 3), Et(e, function(i, r, l) {
          Ft(n, r, t(i, r, l));
        }), n;
      }
      var Df = Fn(function(e, t, n) {
        Vi(e, t, n);
      }), J0 = Fn(function(e, t, n, i) {
        Vi(e, t, n, i);
      }), If = $t(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Te(t, function(l) {
          return l = Kt(l, e), i || (i = l.length > 1), l;
        }), St(e, ia(e), n), i && (n = ft(n, g | I | q, E1));
        for (var r = t.length; r--; )
          Yr(n, t[r]);
        return n;
      });
      function Lf(e, t) {
        return j0(e, Yi(Q(t)));
      }
      var Bf = $t(function(e, t) {
        return e == null ? {} : r1(e, t);
      });
      function j0(e, t) {
        if (e == null)
          return {};
        var n = Te(ia(e), function(i) {
          return [i];
        });
        return t = Q(t), qs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function Ff(e, t, n) {
        t = Kt(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[At(t[i])];
          l === a && (i = r, l = n), e = Pt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Vf(e, t, n) {
        return e == null ? e : jn(e, t, n);
      }
      function $f(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : jn(e, t, n, i);
      }
      var el = f0(Pe), tl = f0(Xe);
      function Of(e, t, n) {
        var i = ne(e), r = i || Zt(e) || On(e);
        if (t = Q(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : De(e) ? n = Pt(l) ? Bn(Ei(e)) : {} : n = {};
        }
        return (r ? ut : Et)(e, function(u, c, f) {
          return t(n, u, c, f);
        }), n;
      }
      function Pf(e, t) {
        return e == null ? !0 : Yr(e, t);
      }
      function Rf(e, t, n) {
        return e == null ? e : Ys(e, t, Jr(n));
      }
      function Gf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : Ys(e, t, Jr(n), i);
      }
      function Pn(e) {
        return e == null ? [] : Ir(e, Pe(e));
      }
      function Mf(e) {
        return e == null ? [] : Ir(e, Xe(e));
      }
      function Uf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = mt(n), n = n === n ? n : 0), t !== a && (t = mt(t), t = t === t ? t : 0), un(mt(e), t, n);
      }
      function Wf(e, t, n) {
        return t = Rt(t), n === a ? (n = t, t = 0) : n = Rt(n), e = mt(e), Qu(e, t, n);
      }
      function Nf(e, t, n) {
        if (n && typeof n != "boolean" && He(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Rt(e), t === a ? (t = e, e = 0) : t = Rt(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = As();
          return We(e + r * (t - e + vo("1e-" + ((r + "").length - 1))), t);
        }
        return Hr(e, t);
      }
      var qf = Vn(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? nl(t) : t);
      });
      function nl(e) {
        return ka(ke(e).toLowerCase());
      }
      function il(e) {
        return e = ke(e), e && e.replace(ql, Fo).replace(uo, "");
      }
      function zf(e, t, n) {
        e = ke(e), t = nt(t);
        var i = e.length;
        n = n === a ? i : un(re(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Hf(e) {
        return e = ke(e), e && Sl.test(e) ? e.replace(Va, Vo) : e;
      }
      function Qf(e) {
        return e = ke(e), e && Il.test(e) ? e.replace(hr, "\\$&") : e;
      }
      var Kf = Vn(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), Yf = Vn(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), Zf = s0("toLowerCase");
      function Xf(e, t, n) {
        e = ke(e), t = re(t);
        var i = t ? Cn(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return Mi(Ci(r), n) + e + Mi(wi(r), n);
      }
      function Jf(e, t, n) {
        e = ke(e), t = re(t);
        var i = t ? Cn(e) : 0;
        return t && i < t ? e + Mi(t - i, n) : e;
      }
      function jf(e, t, n) {
        e = ke(e), t = re(t);
        var i = t ? Cn(e) : 0;
        return t && i < t ? Mi(t - i, n) + e : e;
      }
      function ep(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), su(ke(e).replace(mr, ""), t || 0);
      }
      function tp(e, t, n) {
        return (n ? He(e, t, n) : t === a) ? t = 1 : t = re(t), Qr(ke(e), t);
      }
      function np() {
        var e = arguments, t = ke(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var ip = Vn(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function rp(e, t, n) {
        return n && typeof n != "number" && He(e, t, n) && (t = n = a), n = n === a ? Oe : n >>> 0, n ? (e = ke(e), e && (typeof t == "string" || t != null && !ga(t)) && (t = nt(t), !t && wn(e)) ? Yt(xt(e), 0, n) : e.split(t, n)) : [];
      }
      var ap = Vn(function(e, t, n) {
        return e + (n ? " " : "") + ka(t);
      });
      function sp(e, t, n) {
        return e = ke(e), n = n == null ? 0 : un(re(n), 0, e.length), t = nt(t), e.slice(n, n + t.length) == t;
      }
      function lp(e, t, n) {
        var i = s.templateSettings;
        n && He(e, t, n) && (t = a), e = ke(e), t = Ji({}, t, i, p0);
        var r = Ji({}, t.imports, i.imports, p0), l = Pe(r), u = Ir(r, l), c, f, _ = 0, b = t.interpolate || di, S = "__p += '", V = Br(
          (t.escape || di).source + "|" + b.source + "|" + (b === $a ? Rl : di).source + "|" + (t.evaluate || di).source + "|$",
          "g"
        ), z = "//# sourceURL=" + (_e.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++mo + "]") + `
`;
        e.replace(V, function(Y, ce, he, rt, Qe, at) {
          return he || (he = rt), S += e.slice(_, at).replace(zl, $o), ce && (c = !0, S += `' +
__e(` + ce + `) +
'`), Qe && (f = !0, S += `';
` + Qe + `;
__p += '`), he && (S += `' +
((__t = (` + he + `)) == null ? '' : __t) +
'`), _ = at + Y.length, Y;
        }), S += `';
`;
        var K = _e.call(t, "variable") && t.variable;
        if (!K)
          S = `with (obj) {
` + S + `
}
`;
        else if (Ol.test(K))
          throw new te(F);
        S = (f ? S.replace(vl, "") : S).replace(_l, "$1").replace(bl, "$1;"), S = "function(" + (K || "obj") + `) {
` + (K ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (f ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + S + `return __p
}`;
        var se = al(function() {
          return xe(l, z + "return " + S).apply(a, u);
        });
        if (se.source = S, ma(se))
          throw se;
        return se;
      }
      function op(e) {
        return ke(e).toLowerCase();
      }
      function up(e) {
        return ke(e).toUpperCase();
      }
      function cp(e, t, n) {
        if (e = ke(e), e && (n || t === a))
          return hs(e);
        if (!e || !(t = nt(t)))
          return e;
        var i = xt(e), r = xt(t), l = ms(i, r), u = gs(i, r) + 1;
        return Yt(i, l, u).join("");
      }
      function dp(e, t, n) {
        if (e = ke(e), e && (n || t === a))
          return e.slice(0, ys(e) + 1);
        if (!e || !(t = nt(t)))
          return e;
        var i = xt(e), r = gs(i, xt(t)) + 1;
        return Yt(i, 0, r).join("");
      }
      function fp(e, t, n) {
        if (e = ke(e), e && (n || t === a))
          return e.replace(mr, "");
        if (!e || !(t = nt(t)))
          return e;
        var i = xt(e), r = ms(i, xt(t));
        return Yt(i, r).join("");
      }
      function pp(e, t) {
        var n = jt, i = lt;
        if (De(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? re(t.length) : n, i = "omission" in t ? nt(t.omission) : i;
        }
        e = ke(e);
        var l = e.length;
        if (wn(e)) {
          var u = xt(e);
          l = u.length;
        }
        if (n >= l)
          return e;
        var c = n - Cn(i);
        if (c < 1)
          return i;
        var f = u ? Yt(u, 0, c).join("") : e.slice(0, c);
        if (r === a)
          return f + i;
        if (u && (c += f.length - c), ga(r)) {
          if (e.slice(c).search(r)) {
            var _, b = f;
            for (r.global || (r = Br(r.source, ke(Oa.exec(r)) + "g")), r.lastIndex = 0; _ = r.exec(b); )
              var S = _.index;
            f = f.slice(0, S === a ? c : S);
          }
        } else if (e.indexOf(nt(r), c) != c) {
          var V = f.lastIndexOf(r);
          V > -1 && (f = f.slice(0, V));
        }
        return f + i;
      }
      function hp(e) {
        return e = ke(e), e && El.test(e) ? e.replace(Fa, Wo) : e;
      }
      var mp = Vn(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), ka = s0("toUpperCase");
      function rl(e, t, n) {
        return e = ke(e), t = n ? a : t, t === a ? Po(e) ? zo(e) : To(e) : e.match(t) || [];
      }
      var al = oe(function(e, t) {
        try {
          return et(e, a, t);
        } catch (n) {
          return ma(n) ? n : new te(n);
        }
      }), gp = $t(function(e, t) {
        return ut(t, function(n) {
          n = At(n), Ft(e, n, pa(e[n], e));
        }), e;
      });
      function xp(e) {
        var t = e == null ? 0 : e.length, n = Q();
        return e = t ? Te(e, function(i) {
          if (typeof i[1] != "function")
            throw new ct(N);
          return [n(i[0]), i[1]];
        }) : [], oe(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (et(l[0], this, i))
              return et(l[1], this, i);
          }
        });
      }
      function yp(e) {
        return Wu(ft(e, g));
      }
      function va(e) {
        return function() {
          return e;
        };
      }
      function kp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var vp = o0(), _p = o0(!0);
      function Je(e) {
        return e;
      }
      function _a(e) {
        return Rs(typeof e == "function" ? e : ft(e, g));
      }
      function bp(e) {
        return Ms(ft(e, g));
      }
      function Ep(e, t) {
        return Us(e, ft(t, g));
      }
      var Sp = oe(function(e, t) {
        return function(n) {
          return Xn(n, e, t);
        };
      }), Ap = oe(function(e, t) {
        return function(n) {
          return Xn(e, n, t);
        };
      });
      function ba(e, t, n) {
        var i = Pe(t), r = Fi(t, i);
        n == null && !(De(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Fi(t, Pe(t)));
        var l = !(De(n) && "chain" in n) || !!n.chain, u = Pt(e);
        return ut(r, function(c) {
          var f = t[c];
          e[c] = f, u && (e.prototype[c] = function() {
            var _ = this.__chain__;
            if (l || _) {
              var b = e(this.__wrapped__), S = b.__actions__ = Ye(this.__actions__);
              return S.push({ func: f, args: arguments, thisArg: e }), b.__chain__ = _, b;
            }
            return f.apply(e, Nt([this.value()], arguments));
          });
        }), e;
      }
      function wp() {
        return Re._ === this && (Re._ = Xo), this;
      }
      function Ea() {
      }
      function Cp(e) {
        return e = re(e), oe(function(t) {
          return Ws(t, e);
        });
      }
      var Tp = ea(Te), Dp = ea(us), Ip = ea(Ar);
      function sl(e) {
        return la(e) ? wr(At(e)) : a1(e);
      }
      function Lp(e) {
        return function(t) {
          return e == null ? a : cn(e, t);
        };
      }
      var Bp = c0(), Fp = c0(!0);
      function Sa() {
        return [];
      }
      function Aa() {
        return !1;
      }
      function Vp() {
        return {};
      }
      function $p() {
        return "";
      }
      function Op() {
        return !0;
      }
      function Pp(e, t) {
        if (e = re(e), e < 1 || e > W)
          return [];
        var n = Oe, i = We(e, Oe);
        t = Q(t), e -= Oe;
        for (var r = Dr(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Rp(e) {
        return ne(e) ? Te(e, At) : it(e) ? [e] : Ye(w0(ke(e)));
      }
      function Gp(e) {
        var t = ++Yo;
        return ke(e) + t;
      }
      var Mp = Gi(function(e, t) {
        return e + t;
      }, 0), Up = ta("ceil"), Wp = Gi(function(e, t) {
        return e / t;
      }, 1), Np = ta("floor");
      function qp(e) {
        return e && e.length ? Bi(e, Je, Mr) : a;
      }
      function zp(e, t) {
        return e && e.length ? Bi(e, Q(t, 2), Mr) : a;
      }
      function Hp(e) {
        return fs(e, Je);
      }
      function Qp(e, t) {
        return fs(e, Q(t, 2));
      }
      function Kp(e) {
        return e && e.length ? Bi(e, Je, qr) : a;
      }
      function Yp(e, t) {
        return e && e.length ? Bi(e, Q(t, 2), qr) : a;
      }
      var Zp = Gi(function(e, t) {
        return e * t;
      }, 1), Xp = ta("round"), Jp = Gi(function(e, t) {
        return e - t;
      }, 0);
      function jp(e) {
        return e && e.length ? Tr(e, Je) : 0;
      }
      function e2(e, t) {
        return e && e.length ? Tr(e, Q(t, 2)) : 0;
      }
      return s.after = _d, s.ary = P0, s.assign = uf, s.assignIn = X0, s.assignInWith = Ji, s.assignWith = cf, s.at = df, s.before = R0, s.bind = pa, s.bindAll = gp, s.bindKey = G0, s.castArray = Fd, s.chain = V0, s.chunk = W1, s.compact = N1, s.concat = q1, s.cond = xp, s.conforms = yp, s.constant = va, s.countBy = Jc, s.create = ff, s.curry = M0, s.curryRight = U0, s.debounce = W0, s.defaults = pf, s.defaultsDeep = hf, s.defer = bd, s.delay = Ed, s.difference = z1, s.differenceBy = H1, s.differenceWith = Q1, s.drop = K1, s.dropRight = Y1, s.dropRightWhile = Z1, s.dropWhile = X1, s.fill = J1, s.filter = ed, s.flatMap = id, s.flatMapDeep = rd, s.flatMapDepth = ad, s.flatten = I0, s.flattenDeep = j1, s.flattenDepth = ec, s.flip = Sd, s.flow = vp, s.flowRight = _p, s.fromPairs = tc, s.functions = _f, s.functionsIn = bf, s.groupBy = sd, s.initial = ic, s.intersection = rc, s.intersectionBy = ac, s.intersectionWith = sc, s.invert = Sf, s.invertBy = Af, s.invokeMap = od, s.iteratee = _a, s.keyBy = ud, s.keys = Pe, s.keysIn = Xe, s.map = Hi, s.mapKeys = Cf, s.mapValues = Tf, s.matches = bp, s.matchesProperty = Ep, s.memoize = Ki, s.merge = Df, s.mergeWith = J0, s.method = Sp, s.methodOf = Ap, s.mixin = ba, s.negate = Yi, s.nthArg = Cp, s.omit = If, s.omitBy = Lf, s.once = Ad, s.orderBy = cd, s.over = Tp, s.overArgs = wd, s.overEvery = Dp, s.overSome = Ip, s.partial = ha, s.partialRight = N0, s.partition = dd, s.pick = Bf, s.pickBy = j0, s.property = sl, s.propertyOf = Lp, s.pull = cc, s.pullAll = B0, s.pullAllBy = dc, s.pullAllWith = fc, s.pullAt = pc, s.range = Bp, s.rangeRight = Fp, s.rearg = Cd, s.reject = hd, s.remove = hc, s.rest = Td, s.reverse = da, s.sampleSize = gd, s.set = Vf, s.setWith = $f, s.shuffle = xd, s.slice = mc, s.sortBy = vd, s.sortedUniq = bc, s.sortedUniqBy = Ec, s.split = rp, s.spread = Dd, s.tail = Sc, s.take = Ac, s.takeRight = wc, s.takeRightWhile = Cc, s.takeWhile = Tc, s.tap = Nc, s.throttle = Id, s.thru = zi, s.toArray = K0, s.toPairs = el, s.toPairsIn = tl, s.toPath = Rp, s.toPlainObject = Z0, s.transform = Of, s.unary = Ld, s.union = Dc, s.unionBy = Ic, s.unionWith = Lc, s.uniq = Bc, s.uniqBy = Fc, s.uniqWith = Vc, s.unset = Pf, s.unzip = fa, s.unzipWith = F0, s.update = Rf, s.updateWith = Gf, s.values = Pn, s.valuesIn = Mf, s.without = $c, s.words = rl, s.wrap = Bd, s.xor = Oc, s.xorBy = Pc, s.xorWith = Rc, s.zip = Gc, s.zipObject = Mc, s.zipObjectDeep = Uc, s.zipWith = Wc, s.entries = el, s.entriesIn = tl, s.extend = X0, s.extendWith = Ji, ba(s, s), s.add = Mp, s.attempt = al, s.camelCase = qf, s.capitalize = nl, s.ceil = Up, s.clamp = Uf, s.clone = Vd, s.cloneDeep = Od, s.cloneDeepWith = Pd, s.cloneWith = $d, s.conformsTo = Rd, s.deburr = il, s.defaultTo = kp, s.divide = Wp, s.endsWith = zf, s.eq = kt, s.escape = Hf, s.escapeRegExp = Qf, s.every = jc, s.find = td, s.findIndex = T0, s.findKey = mf, s.findLast = nd, s.findLastIndex = D0, s.findLastKey = gf, s.floor = Np, s.forEach = $0, s.forEachRight = O0, s.forIn = xf, s.forInRight = yf, s.forOwn = kf, s.forOwnRight = vf, s.get = xa, s.gt = Gd, s.gte = Md, s.has = Ef, s.hasIn = ya, s.head = L0, s.identity = Je, s.includes = ld, s.indexOf = nc, s.inRange = Wf, s.invoke = wf, s.isArguments = pn, s.isArray = ne, s.isArrayBuffer = Ud, s.isArrayLike = Ze, s.isArrayLikeObject = Le, s.isBoolean = Wd, s.isBuffer = Zt, s.isDate = Nd, s.isElement = qd, s.isEmpty = zd, s.isEqual = Hd, s.isEqualWith = Qd, s.isError = ma, s.isFinite = Kd, s.isFunction = Pt, s.isInteger = q0, s.isLength = Zi, s.isMap = z0, s.isMatch = Yd, s.isMatchWith = Zd, s.isNaN = Xd, s.isNative = Jd, s.isNil = ef, s.isNull = jd, s.isNumber = H0, s.isObject = De, s.isObjectLike = Ie, s.isPlainObject = ii, s.isRegExp = ga, s.isSafeInteger = tf, s.isSet = Q0, s.isString = Xi, s.isSymbol = it, s.isTypedArray = On, s.isUndefined = nf, s.isWeakMap = rf, s.isWeakSet = af, s.join = lc, s.kebabCase = Kf, s.last = ht, s.lastIndexOf = oc, s.lowerCase = Yf, s.lowerFirst = Zf, s.lt = sf, s.lte = lf, s.max = qp, s.maxBy = zp, s.mean = Hp, s.meanBy = Qp, s.min = Kp, s.minBy = Yp, s.stubArray = Sa, s.stubFalse = Aa, s.stubObject = Vp, s.stubString = $p, s.stubTrue = Op, s.multiply = Zp, s.nth = uc, s.noConflict = wp, s.noop = Ea, s.now = Qi, s.pad = Xf, s.padEnd = Jf, s.padStart = jf, s.parseInt = ep, s.random = Nf, s.reduce = fd, s.reduceRight = pd, s.repeat = tp, s.replace = np, s.result = Ff, s.round = Xp, s.runInContext = d, s.sample = md, s.size = yd, s.snakeCase = ip, s.some = kd, s.sortedIndex = gc, s.sortedIndexBy = xc, s.sortedIndexOf = yc, s.sortedLastIndex = kc, s.sortedLastIndexBy = vc, s.sortedLastIndexOf = _c, s.startCase = ap, s.startsWith = sp, s.subtract = Jp, s.sum = jp, s.sumBy = e2, s.template = lp, s.times = Pp, s.toFinite = Rt, s.toInteger = re, s.toLength = Y0, s.toLower = op, s.toNumber = mt, s.toSafeInteger = of, s.toString = ke, s.toUpper = up, s.trim = cp, s.trimEnd = dp, s.trimStart = fp, s.truncate = pp, s.unescape = hp, s.uniqueId = Gp, s.upperCase = mp, s.upperFirst = ka, s.each = $0, s.eachRight = O0, s.first = L0, ba(s, function() {
        var e = {};
        return Et(s, function(t, n) {
          _e.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = A, ut(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), ut(["drop", "take"], function(e, t) {
        fe.prototype[e] = function(n) {
          n = n === a ? 1 : $e(re(n), 0);
          var i = this.__filtered__ && !t ? new fe(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = We(n, i.__takeCount__) : i.__views__.push({
            size: We(n, Oe),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, fe.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), ut(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == kn || n == Un;
        fe.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: Q(r, 3),
            type: n
          }), l.__filtered__ = l.__filtered__ || i, l;
        };
      }), ut(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        fe.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), ut(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        fe.prototype[e] = function() {
          return this.__filtered__ ? new fe(this) : this[n](1);
        };
      }), fe.prototype.compact = function() {
        return this.filter(Je);
      }, fe.prototype.find = function(e) {
        return this.filter(e).head();
      }, fe.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, fe.prototype.invokeMap = oe(function(e, t) {
        return typeof e == "function" ? new fe(this) : this.map(function(n) {
          return Xn(n, e, t);
        });
      }), fe.prototype.reject = function(e) {
        return this.filter(Yi(Q(e)));
      }, fe.prototype.slice = function(e, t) {
        e = re(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new fe(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = re(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, fe.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, fe.prototype.toArray = function() {
        return this.take(Oe);
      }, Et(fe.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, f = u instanceof fe, _ = c[0], b = f || ne(u), S = function(ce) {
            var he = r.apply(s, Nt([ce], c));
            return i && V ? he[0] : he;
          };
          b && n && typeof _ == "function" && _.length != 1 && (f = b = !1);
          var V = this.__chain__, z = !!this.__actions__.length, K = l && !V, se = f && !z;
          if (!l && b) {
            u = se ? u : new fe(this);
            var Y = e.apply(u, c);
            return Y.__actions__.push({ func: zi, args: [S], thisArg: a }), new dt(Y, V);
          }
          return K && se ? e.apply(this, c) : (Y = this.thru(S), K ? i ? Y.value()[0] : Y.value() : Y);
        });
      }), ut(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = xi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
        s.prototype[e] = function() {
          var r = arguments;
          if (i && !this.__chain__) {
            var l = this.value();
            return t.apply(ne(l) ? l : [], r);
          }
          return this[n](function(u) {
            return t.apply(ne(u) ? u : [], r);
          });
        };
      }), Et(fe.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          _e.call(Ln, i) || (Ln[i] = []), Ln[i].push({ name: t, func: n });
        }
      }), Ln[Ri(a, pe).name] = [{
        name: "wrapper",
        func: a
      }], fe.prototype.clone = pu, fe.prototype.reverse = hu, fe.prototype.value = mu, s.prototype.at = qc, s.prototype.chain = zc, s.prototype.commit = Hc, s.prototype.next = Qc, s.prototype.plant = Yc, s.prototype.reverse = Zc, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = Xc, s.prototype.first = s.prototype.head, qn && (s.prototype[qn] = Kc), s;
    }, Tn = Ho();
    an ? ((an.exports = Tn)._ = Tn, _r._ = Tn) : Re._ = Tn;
  }).call(ri);
})(er, er.exports);
var $2 = er.exports;
const O2 = { class: "d-flex align-items-center mb-30" }, P2 = {
  __name: "BaseTableFilters",
  props: {
    filters: Array,
    prefix: {
      type: String,
      default: ""
    },
    inactive: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    ai.FILTER_CHANGE,
    ai.CLEAR_FILTERS
  ],
  setup(o, { emit: D }) {
    const a = D, A = o, k = Fe(() => A.filters ? A.filters.filter(($) => $.model) : []), M = Fe(() => {
      const $ = {};
      return k.value.forEach((B) => {
        $[B.key] = B.model;
      }), $;
    }), N = $2.debounce(() => {
      a(ai.FILTER_CHANGE, M);
    }, 800);
    function F() {
      a(ai.CLEAR_FILTERS), document.activeElement.blur();
    }
    return ($, B) => (h(), y("div", {
      class: Me(["base-table-filters", { inactive: o.inactive }])
    }, [
      p("h6", O2, [
        H(C(Dt), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        B[1] || (B[1] = je(" Filters "))
      ]),
      ji($.$slots, "customFields", {}, void 0, !0),
      (h(!0), y(me, null, Ae(o.filters, (E, g) => (h(), y(me, null, [
        E.type === "datetime" || E.type === "datetimehour" ? (h(), ue(C(fl), {
          class: "filter-elm",
          key: `${o.prefix}${E.key}`,
          label: E.value,
          disabled: o.filters[g].disabled,
          modelValue: o.filters[g].model,
          "onUpdate:modelValue": (I) => o.filters[g].model = I,
          onInput: C(N)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : E.dataSource ? (h(), ue(C(wt), {
          class: "filter-elm",
          key: `${o.prefix}${E.key}`,
          options: E.key === "campaign" ? $.campaignlist : E.dataSource,
          label: E.value,
          disabled: o.filters[g].disabled,
          singleSelect: !1,
          modelValue: o.filters[g].model,
          "onUpdate:modelValue": (I) => o.filters[g].model = I,
          onClick: (I) => $.filterClicked(E.key),
          onInput: C(N)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), ue(C(Ct), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${E.key}`,
          label: E.value,
          disabled: o.filters[g].disabled,
          modelValue: o.filters[g].model,
          "onUpdate:modelValue": (I) => o.filters[g].model = I,
          onInput: C(N)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      H(C(st), {
        type: "tertiary",
        label: "Clear filters",
        onClick: B[0] || (B[0] = (E) => F())
      })
    ], 2));
  }
}, R2 = /* @__PURE__ */ qe(P2, [["__scopeId", "data-v-0bc5c036"]]), G2 = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: D }) {
    const a = D, k = o.options || {}, M = new IntersectionObserver(([F]) => {
      a("intersecting", F.isIntersecting);
    }, k), N = G(null);
    return xn(() => {
      N.value && M.observe(N.value);
    }), t2(() => {
      M.disconnect();
    }), (F, $) => (h(), y("div", {
      ref_key: "targetELement",
      ref: N,
      class: "observer",
      style: { height: "3px" }
    }, [
      ji(F.$slots, "default")
    ], 512));
  }
}, xl = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", M2 = { class: "query-builder" }, U2 = { class: "query-conditions" }, W2 = { class: "condition" }, N2 = { key: 0 }, q2 = { key: 1 }, z2 = {
  key: 0,
  class: "query-operator-outer"
}, H2 = {
  __name: "StandardQueryDisplay",
  setup(o) {
    G({
      gender: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Non-Binary", value: "Non-Binary" },
        { label: "Other", value: "Other" }
      ],
      productCategory: [
        { label: "Electronics", value: "Electronics" },
        { label: "Clothing", value: "Clothing" },
        { label: "Furniture", value: "Furniture" },
        { label: "Automobile", value: "Automobile" }
      ]
    }), G({
      gender: null,
      productCategory: null
    });
    const D = G([
      {
        field: "Last Purchase",
        operator: "is greater than",
        value: "2025-04-19",
        type: "date"
      },
      {
        field: "Total Spend",
        operator: "is greater than",
        value: "2,500 DKK",
        type: "currency"
      }
    ]), a = (A) => new Date(A).toISOString().split("T")[0];
    return (A, k) => (h(), y("div", M2, [
      p("div", U2, [
        k[1] || (k[1] = p("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), y(me, null, Ae(D.value, (M, N) => (h(), y("div", { key: N }, [
          p("div", W2, [
            p("strong", null, j(M.field), 1),
            p("span", null, j(M.operator), 1),
            M.type === "date" ? (h(), y("span", N2, j(a(M.value)), 1)) : (h(), y("span", q2, j(M.value), 1)),
            H(C(st), {
              type: "tertiary",
              icon: "bi-arrows-expand"
            })
          ]),
          D.value.length > 1 && N !== D.value.length - 1 ? (h(), y("div", z2, k[0] || (k[0] = [
            p("div", { class: "query-operator" }, " And", -1)
          ]))) : L("", !0)
        ]))), 128))
      ])
    ]));
  }
}, Q2 = /* @__PURE__ */ qe(H2, [["__scopeId", "data-v-ce712a4d"]]), K2 = { class: "info-card" }, Y2 = { class: "segments" }, Z2 = { class: "segment-img-wrapper" }, X2 = ["src"], J2 = { class: "segment-info" }, j2 = {
  __name: "MainInfoCard",
  props: {
    segmentData: {
      type: Object,
      required: !0
    },
    isThumbnail: {
      type: Boolean,
      default: !1
    }
  },
  setup(o) {
    const D = o, a = Fe(() => !D.segmentData || !D.segmentData.segments ? [] : D.isThumbnail ? D.segmentData.segments.slice(0, 4) : D.segmentData.segments);
    return (A, k) => (h(), y("div", K2, [
      k[2] || (k[2] = p("h5", null, "Top Interests", -1)),
      p("div", Y2, [
        (h(!0), y(me, null, Ae(a.value, (M) => (h(), y("div", {
          class: "segment",
          key: M.name
        }, [
          p("div", Z2, [
            p("img", {
              src: M.image,
              alt: "segment"
            }, null, 8, X2)
          ]),
          p("div", J2, [
            p("h4", null, j(M.name), 1),
            p("p", null, [
              k[0] || (k[0] = p("span", null, "Reach:", -1)),
              je(" " + j(M.reach), 1)
            ]),
            p("p", null, [
              k[1] || (k[1] = p("span", null, "Share:", -1)),
              je(" " + j(M.impressions), 1)
            ])
          ])
        ]))), 128))
      ])
    ]));
  }
}, eh = /* @__PURE__ */ qe(j2, [["__scopeId", "data-v-31828828"]]), th = { class: "segment-details-insigts mt-4" }, nh = { class: "insights-title-wrapper" }, ih = { class: "mt-3" }, rh = { class: "query-result" }, ah = {
  __name: "ThumbnailCard",
  props: {
    location: {
      type: String,
      required: !0
    },
    selectedSegment: {
      type: Object,
      required: !0
    }
  },
  emits: ["showInsightsExplorer"],
  setup(o, { emit: D }) {
    const a = o, A = Jt(), k = D;
    Fe(() => {
      var F, $, B;
      return {
        chart: {
          type: "bar",
          height: 550,
          stacked: !0,
          toolbar: { show: !1 }
        },
        plotOptions: {
          bar: { horizontal: !0 }
        },
        xaxis: {
          categories: (($ = (F = a.selectedSegment.thumbnail) == null ? void 0 : F.graph) == null ? void 0 : $.labels) || []
        },
        colors: [
          "#0A2FFF",
          "#0068AD"
        ],
        title: {
          text: ((B = a.selectedSegment.thumbnail) == null ? void 0 : B.title) || "",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold"
          }
        },
        legend: {
          position: "bottom"
        }
      };
    }), Fe(() => {
      var F, $, B;
      return ((B = ($ = (F = a.selectedSegment.thumbnail) == null ? void 0 : F.graph) == null ? void 0 : $.seriesCombined) == null ? void 0 : B.map((E) => ({
        name: E.name,
        data: E.data.map(Number)
      }))) || [];
    });
    const M = Fe(() => {
      var F, $, B, E;
      return ((E = (B = ($ = (F = a.selectedSegment.thumbnail) == null ? void 0 : F.segments) == null ? void 0 : $[0]) == null ? void 0 : B.segments) == null ? void 0 : E.slice(0, 2)) || [];
    });
    Fe(() => M.value.map((B) => parseFloat(B.affinityScore || "0")).reduce((B, E) => B + E, 0).toFixed(2)), Fe(() => M.value.map(($) => parseInt($.reach || "0", 10)).reduce(($, B) => $ + B, 0).toLocaleString());
    function N() {
      A.set_selectedSegmentType(a.location), A.set_activeTab("custom"), A.set_selectedSegment(a.selectedSegment), k("showInsightsExplorer", a.selectedSegment);
    }
    return (F, $) => {
      const B = dl("CataUiTooltip");
      return h(), y("div", null, [
        p("div", th, [
          p("div", nh, [
            $[2] || ($[2] = p("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            p("p", ih, [
              $[1] || ($[1] = je("Find the segments that work best with ")),
              p("span", rh, j(a.selectedSegment.name), 1)
            ]),
            H(B, { label: "The preview is for your external proofing tool." })
          ]),
          H(C(st), {
            type: "secondary",
            label: "Explore",
            onClick: $[0] || ($[0] = (E) => N())
          })
        ])
      ]);
    };
  }
}, sh = /* @__PURE__ */ qe(ah, [["__scopeId", "data-v-5b4c0a39"]]), lh = { class: "modal-body" }, oh = { class: "section" }, uh = { class: "checkbox-group" }, ch = { class: "checkbox-group" }, dh = { class: "sections-wrapper" }, fh = { class: "section" }, ph = { class: "checkbox-group-catergory" }, hh = { class: "section" }, mh = { class: "ccheckbox-group-catergory" }, gh = { class: "section" }, xh = { class: "checkbox-group-category" }, yh = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: D }) {
    const a = D, A = G([]), k = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], M = ["Build new campaign", "Update current campaign"], N = ["Display & Video 360", "The Trade Desk"], F = ["Infosum", "LiveRamp"];
    function $() {
      a("close");
    }
    const B = () => {
      a("insertSegment"), $();
    };
    return (E, g) => {
      const I = dl("hp");
      return h(), ue(C(pl), {
        onClose: $,
        size: "medium"
      }, {
        header: Tt(() => g[5] || (g[5] = [
          p("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: Tt(() => [
          p("div", lh, [
            p("div", oh, [
              H(I, null, {
                default: Tt(() => g[6] || (g[6] = [
                  je("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              p("div", uh, [
                (h(), y(me, null, Ae(k, (q) => H(C(mn), {
                  key: q,
                  label: q,
                  modelValue: A.value,
                  "onUpdate:modelValue": g[0] || (g[0] = (ie) => A.value = ie),
                  value: q
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            g[10] || (g[10] = p("hr", null, null, -1)),
            p("div", ch, [
              (h(), y(me, null, Ae(M, (q) => H(C(mn), {
                key: q,
                label: q,
                modelValue: A.value,
                "onUpdate:modelValue": g[1] || (g[1] = (ie) => A.value = ie),
                value: q
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            p("div", dh, [
              p("div", fh, [
                g[7] || (g[7] = p("h3", null, "Cohort", -1)),
                p("div", ph, [
                  (h(), y(me, null, Ae(N, (q) => H(C(mn), {
                    key: q,
                    label: q,
                    modelValue: A.value,
                    "onUpdate:modelValue": g[2] || (g[2] = (ie) => A.value = ie),
                    value: q
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              p("div", hh, [
                g[8] || (g[8] = p("h3", null, "Clean Room", -1)),
                p("div", mh, [
                  (h(), y(me, null, Ae(F, (q) => H(C(mn), {
                    key: q,
                    label: q,
                    modelValue: A.value,
                    "onUpdate:modelValue": g[3] || (g[3] = (ie) => A.value = ie),
                    value: q
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              p("div", gh, [
                g[9] || (g[9] = p("h3", null, "WPP Open", -1)),
                p("div", xh, [
                  H(C(mn), {
                    label: "Open Media Studio",
                    modelValue: A.value,
                    "onUpdate:modelValue": g[4] || (g[4] = (q) => A.value = q),
                    value: "Open Media Studio"
                  }, null, 8, ["modelValue"])
                ])
              ])
            ])
          ])
        ]),
        footer: Tt(() => [
          H(C(st), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: $
          }),
          H(C(st), {
            type: "primary",
            label: "Push",
            onClick: B
          })
        ]),
        _: 1
      });
    };
  }
}, kh = /* @__PURE__ */ qe(yh, [["__scopeId", "data-v-258e10c9"]]), vh = [
  {
    title: "Dynamics of Royal Canin Maxi Adult Wet Food in Recent Days",
    section: "dynamics",
    description: "Daily interaction patterns with Royal Canin Maxi Adult Wet Food over the past 18 days",
    type: "area",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "2025-03-01",
        keyType: "date",
        value: 150,
        valueType: "purchases"
      },
      {
        key: "2025-03-02",
        keyType: "date",
        value: 170,
        valueType: "purchases"
      }
    ]
  },
  {
    title: "Day-parting for Royal Canin Maxi Adult Wet Food",
    section: "dayparting",
    description: "Purchasing behavior segmented by time of day",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "00:00",
        keyType: "hour",
        value: 20,
        valueType: "purchases"
      },
      {
        key: "01:00",
        keyType: "hour",
        value: 40,
        valueType: "purchases"
      }
    ]
  },
  {
    title: "Age Distribution",
    section: "audience",
    description: "Percentage of purchases across age ranges",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "18-24",
        keyType: "range",
        value: 12,
        valueType: "percentage"
      },
      {
        key: "25-34",
        keyType: "range",
        value: 24,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Gender Distribution",
    section: "audience",
    description: "Share of male and female audiences",
    type: "donut",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Male",
        keyType: "gender",
        value: 60,
        valueType: "percentage"
      },
      {
        key: "Female",
        keyType: "gender",
        value: 40,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Preferred Purchase Channels",
    section: "consumer_preferences",
    description: "Breakdown of where consumers prefer to purchase pet products",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Supermarkets",
        keyType: "channel",
        value: 40,
        valueType: "percentage"
      },
      {
        key: "Online Pet Stores",
        keyType: "channel",
        value: 25,
        valueType: "percentage"
      },
      {
        key: "Vet Clinics",
        keyType: "channel",
        value: 15,
        valueType: "percentage"
      },
      {
        key: "Specialty Pet Stores",
        keyType: "channel",
        value: 20,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Lifestyle Agreement Statements",
    section: "psychographics",
    description: "Agreement levels with lifestyle and pet care statements",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Pets are part of my family",
        keyType: "statement",
        value: 90,
        valueType: "agreement"
      },
      {
        key: "I prefer premium pet food",
        keyType: "statement",
        value: 65,
        valueType: "agreement"
      },
      {
        key: "I shop eco-consciously",
        keyType: "statement",
        value: 55,
        valueType: "agreement"
      }
    ]
  },
  {
    title: "Generation Breakdown",
    section: "audience",
    description: "Generational segmentation of the target audience",
    type: "donut",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Gen Z",
        keyType: "generation",
        value: 20,
        valueType: "percentage"
      },
      {
        key: "Millennials",
        keyType: "generation",
        value: 45,
        valueType: "percentage"
      },
      {
        key: "Gen X",
        keyType: "generation",
        value: 25,
        valueType: "percentage"
      },
      {
        key: "Boomers",
        keyType: "generation",
        value: 10,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Education Level Distribution",
    section: "education",
    description: "Audience educational attainment levels",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "High School",
        keyType: "education",
        value: 25,
        valueType: "percentage"
      },
      {
        key: "Bachelor's Degree",
        keyType: "education",
        value: 45,
        valueType: "percentage"
      },
      {
        key: "Master's Degree",
        keyType: "education",
        value: 20,
        valueType: "percentage"
      },
      {
        key: "PhD",
        keyType: "education",
        value: 10,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Life Events in the Last 12 Months",
    section: "life_events",
    description: "Significant life changes experienced in the past year",
    type: "pie",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Moved Home",
        keyType: "event",
        value: 20,
        valueType: "percentage"
      },
      {
        key: "Changed Jobs",
        keyType: "event",
        value: 30,
        valueType: "percentage"
      },
      {
        key: "Got a Pet",
        keyType: "event",
        value: 50,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Working Status",
    section: "work",
    description: "Employment situation of audience members",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Employed Full-time",
        keyType: "work",
        value: 60,
        valueType: "percentage"
      },
      {
        key: "Self-employed",
        keyType: "work",
        value: 15,
        valueType: "percentage"
      },
      {
        key: "Unemployed",
        keyType: "work",
        value: 10,
        valueType: "percentage"
      },
      {
        key: "Retired",
        keyType: "work",
        value: 15,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Personality Archetypes",
    section: "personality",
    description: "Dominant personality traits across audience",
    type: "pie",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Explorer",
        keyType: "archetype",
        value: 35,
        valueType: "percentage"
      },
      {
        key: "Caregiver",
        keyType: "archetype",
        value: 40,
        valueType: "percentage"
      },
      {
        key: "Achiever",
        keyType: "archetype",
        value: 25,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Regional Breakdown",
    section: "region",
    description: "Regional distribution of purchases",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "North America",
        keyType: "region",
        value: 45,
        valueType: "percentage"
      },
      {
        key: "Europe",
        keyType: "region",
        value: 30,
        valueType: "percentage"
      },
      {
        key: "Asia",
        keyType: "region",
        value: 25,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Keyword Map for Pet Owners",
    section: "keywords",
    description: "Keyword performance visualized by impressions and reach",
    type: "bubble",
    source: "WPP Open Intelligence",
    data: [
      {
        x: 10,
        y: 200,
        z: 5
      },
      {
        x: 20,
        y: 400,
        z: 8
      },
      {
        x: 30,
        y: 600,
        z: 10
      },
      {
        x: 40,
        y: 800,
        z: 12
      },
      {
        x: 50,
        y: 1200,
        z: 18
      },
      {
        x: 60,
        y: 1600,
        z: 25
      },
      {
        x: 70,
        y: 1700,
        z: 28
      },
      {
        x: 80,
        y: 1800,
        z: 30
      },
      {
        x: 90,
        y: 200,
        z: 35
      },
      {
        x: 100,
        y: 250,
        z: 40
      },
      {
        x: 110,
        y: 2700,
        z: 45
      },
      {
        x: 120,
        y: 290,
        z: 50
      },
      {
        x: 130,
        y: 3200,
        z: 55
      },
      {
        x: 140,
        y: 350,
        z: 60
      },
      {
        x: 150,
        y: 3700,
        z: 65
      }
    ]
  }
], _h = {
  charts: vh
}, Ca = {
  colors: [
    "#0A2FFF",
    // cat-1-dark (vivid blue)
    "#0068AD",
    // cat-2-dark (deep blue)
    "#0E8677",
    // cat-3-dark (teal)
    "#12871C",
    // cat-4-dark (green)
    "#A36F05",
    // cat-5-dark (mustard/golden brown)
    "#CC4B00",
    // cat-6-dark (orange-red)
    "#D11534",
    // cat-7-dark (strong red)
    "#B41880",
    // cat-8-dark (magenta)
    "#832EEA",
    // cat-9-dark (purple)
    "#646C72"
    // cat-10-dark (slate gray)
  ],
  theme: {
    mode: "light",
    monochrome: { enabled: !1 }
    // default to off
  },
  tooltip: {
    theme: "light"
  },
  grid: {
    borderColor: "#E4E4E7",
    strokeDashArray: 4
  },
  dataLabels: {
    enabled: !0,
    style: {
      fontFamily: "Inter, sans-serif"
    }
  }
}, Ta = {
  colors: [
    "#85A3FF",
    // light blue-violet
    "#7AB6FF",
    // blue
    "#45E4B6",
    // turquoise
    "#6CE07B",
    // light green
    "#ECC706",
    // yellow
    "#FF9E66",
    // orange
    "#FF7A94",
    // coral pink
    "#ED78C6",
    // magenta-pink
    "#B482F3",
    // lavender-purple
    "#ABB1B5"
    // soft gray
  ],
  theme: {
    mode: "light",
    monochrome: { enabled: !1 }
    // default to off
  },
  tooltip: {
    theme: "light"
  },
  grid: {
    borderColor: "#E4E4E7",
    strokeDashArray: 4
  },
  dataLabels: {
    enabled: !0,
    style: {
      fontFamily: "Inter, sans-serif"
    }
  }
}, La = {
  area: {
    ...Ca,
    chart: {
      type: "area",
      background: "#ffffff",
      height: 350,
      zoom: { enabled: !0, type: "x", autoScaleYaxis: !0 },
      toolbar: { show: !0, tools: { zoom: !0, zoomin: !0, zoomout: !0, reset: !0 } }
    },
    stroke: { curve: "smooth", width: 2, colors: ["#1E40AF"] },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#60A5FA"]
      }
    },
    grid: {
      borderColor: "#E4E4E7",
      strokeDashArray: 4,
      xaxis: { lines: { show: !0 } },
      yaxis: { lines: { show: !0 } }
    },
    tooltip: { theme: "light", shared: !0, intersect: !1 },
    dataLabels: { enabled: !0 }
  },
  vertical: {
    ...Ca,
    chart: {
      type: "bar",
      background: "#ffffff",
      zoom: { enabled: !0 },
      toolbar: { show: !0 },
      scrollable: !0
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        distributed: !0
        // dataLabels: { position: 'top' },
      }
    },
    xaxis: {
      labels: { show: !0 }
    },
    dataLabels: { enabled: !1 },
    grid: {
      borderColor: "#E4E4E7",
      strokeDashArray: 4
    },
    tooltip: { theme: "light" }
  },
  bar: {
    ...Ca,
    chart: {
      type: "bar",
      background: "#ffffff",
      zoom: { enabled: !0 },
      toolbar: { show: !0 },
      scrollable: !0
    },
    plotOptions: {
      bar: {
        horizontal: !0,
        distributed: !0
        // dataLabels: { position: 'top' },
      }
    },
    xaxis: {
      labels: { show: !0 }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
          colors: "#6B7280"
        }
      }
    },
    dataLabels: { enabled: !1 },
    grid: {
      borderColor: "#E4E4E7",
      strokeDashArray: 4
    },
    colors: [
      "#1E40AF",
      "#3B82F6",
      "#60A5FA",
      "#A5B4FC",
      "#CBD5E1",
      "#64748B",
      "#94A3B8",
      "#E2E8F0",
      "#D1D5DB"
    ],
    tooltip: { theme: "light" }
  },
  donut: {
    ...Ta,
    chart: {
      type: "donut",
      background: "#ffffff",
      toolbar: { show: !0 }
    },
    dataLabels: { enabled: !0 },
    tooltip: { theme: "light" }
  },
  pie: {
    ...Ta,
    chart: {
      type: "pie",
      background: "#ffffff",
      toolbar: { show: !0 }
    },
    stroke: {
      show: !1,
      // ✅ removes white gaps
      width: 0,
      colors: "transparent"
    },
    tooltip: { theme: "light" },
    dataLabels: {
      enabled: !0,
      dropShadow: {
        enabled: !1
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: !0
      }
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9
        }
      }
    }
  },
  bubble: {
    ...Ta,
    chart: {
      type: "bubble",
      background: "#ffffff",
      zoom: { enabled: !0 },
      toolbar: { show: !0 }
    },
    fill: {
      type: "solid"
    },
    markers: { strokeWidth: 0 },
    dataLabels: { enabled: !0 },
    tooltip: { theme: "light" },
    xaxis: {
      title: { text: "Impressions" },
      crosshairs: { show: !0 }
    },
    yaxis: {
      title: { text: "Reach" },
      crosshairs: { show: !0 }
    }
  }
}, yl = {
  "Vertical bars": "bar",
  // Rendered as vertical bars
  "Horizontal bars": "bar",
  // ApexCharts uses same 'bar', direction set via options
  Pie: "pie",
  // Pie chart
  Donut: "donut",
  // (not in your current data but optional support)
  Area: "area",
  // (if needed in the future)
  Line: "line",
  // (if needed in the future)
  Bubble: "bubble"
  // (if needed in the future)
}, bh = { class: "segment-details" }, Eh = { class: "wrapper-left" }, Sh = { class: "source-wrapper" }, Ah = { class: "source-container" }, wh = { class: "sub-controls" }, Ch = { class: "sub-tab-container" }, Th = { class: "sub-controls-tabs" }, Dh = { class: "sub-controls-tools" }, Ih = { class: "list" }, Lh = {
  key: 0,
  class: "d-flex justify-content-center pt-40 pb-40"
}, Bh = { class: "wrapper-right" }, Fh = {
  key: 0,
  class: "segment-details-wrapper"
}, Vh = {
  key: 0,
  class: "segment-details-title"
}, $h = { class: "pb-15 segment-details-content" }, Oh = {
  key: 0,
  class: "description-row"
}, Ph = { class: "description-detail" }, Rh = {
  key: 1,
  class: "description-row"
}, Gh = { class: "description-detail" }, Mh = {
  key: 2,
  class: "description-row"
}, Uh = { class: "description-detail" }, Wh = {
  key: 3,
  class: "description-row"
}, Nh = { class: "description-detail" }, qh = {
  key: 4,
  class: "description-row"
}, zh = { class: "description-detail" }, Hh = {
  key: 5,
  class: "description-row"
}, Qh = { class: "description-detail" }, Kh = {
  key: 6,
  class: "description-row"
}, Yh = { class: "description-detail" }, Zh = {
  key: 7,
  class: "description-row"
}, Xh = { class: "description-detail" }, Jh = {
  key: 8,
  class: "description-row"
}, jh = { class: "description-detail-bold" }, em = {
  key: 0,
  class: "description-detail"
}, tm = { class: "description-row" }, nm = { class: "description-term" }, im = { class: "description-detail" }, rm = {
  key: 1,
  class: "standard-view"
}, am = ["src"], sm = {
  key: 0,
  class: "footer"
}, lm = { class: "footer-text" }, om = { class: "footer-description-detail" }, um = {
  __name: "StandardSegments",
  props: {
    baseUrl: {
      default: "https://sm-standard-segments-838902823068.europe-west2.run.app",
      type: String,
      required: !0
    },
    tenantId: {
      default: "",
      type: String,
      required: !0
    },
    brandId: {
      default: "1",
      type: String,
      required: !0
    },
    token: {
      default: "",
      type: String,
      required: !0
    },
    selectedSegment: {
      default: null,
      type: Object,
      required: !1
    },
    currentlySelectedSegment: {
      default: null,
      type: Object,
      required: !1
    }
  },
  emits: ["insertSegment", "showInsightsExplorer"],
  setup(o, { emit: D }) {
    const a = o, A = D;
    G([]);
    const k = Jt(), M = G(null), N = G(null), F = G(!1), $ = G([]), B = G(""), E = G([]), g = G(""), I = G(""), q = G(!1), ie = [
      {
        id: 1,
        label: "All"
      },
      {
        id: 4,
        label: "Popular"
      },
      {
        id: 3,
        label: "Recently Used"
      },
      {
        id: 2,
        label: "New"
      }
    ], ae = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], J = G(ie[0]), pe = G(ae[0]), ye = G(!1), ge = G([
      {
        key: "name",
        model: "",
        type: "string",
        value: "Segment Name"
      },
      {
        key: "description",
        model: "",
        type: "string",
        value: "Description"
      },
      {
        key: "count",
        model: "",
        type: "string",
        value: "Last Count"
      },
      {
        key: "status",
        model: "",
        type: "string",
        value: "Status"
      },
      {
        key: "market",
        model: "",
        type: "string",
        value: "Market",
        disabled: !0
      }
    ]), Z = [
      {
        key: "name",
        type: "string",
        value: "Label"
      },
      {
        key: "description",
        type: "description",
        value: "Description"
      },
      {
        key: "count",
        type: "number",
        value: "Last Count"
      },
      {
        key: "status",
        type: "status",
        value: "Status"
      },
      {
        key: "type",
        type: "string",
        value: "Type"
      }
    ], X = G({}), w = G(""), R = G({
      sortColumn: "name",
      sortOrder: 1
    });
    function ve() {
      k.set_selectedSegmentType("standard"), k.set_selectedSegment(w.value), A("showInsightsExplorer", w.value);
    }
    function Ue(W) {
      return W.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (v) => v.toUpperCase());
    }
    function jt(W) {
      X.value = W, k.set_filterQuery(W), k.fetch_segments(g.value);
    }
    async function lt(W) {
      if (W && k.get_isLastPage && !ye.value && k.get_segments && k.get_segments.length > 0) {
        ye.value = !0;
        try {
          await k.fetch_nextSegmentPage(g.value), ye.value = !1;
        } catch {
          ye.value = !1;
        }
      }
    }
    async function en() {
      ge.value.map((W) => {
        W.key !== "market" && (W.model = "");
      }), k.reset_filterQuery(), await k.fetch_segments(g.value);
    }
    function Gn(W) {
      R.value = W;
    }
    function kn() {
      F.value = !F.value;
    }
    function Mn(W) {
      w.value = W.row;
    }
    function Un() {
      q.value = !0;
    }
    async function Mt() {
      await k.set_token(a.token), await k.set_brandId(a.brandId), await k.set_tenantId(a.tenantId), await k.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? w.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && (w.value = a.selectedSegment), await k.fetch_segment_settings(a.brandId);
      try {
        const W = await k.get_segment_settings;
        W && (E.value = await W.platforms.map((v) => ({
          value: v.platform_id,
          label: v.platform,
          locations: v.locations.map((le) => ({
            value: le.value,
            label: le.display_name
          }))
        }))), g.value = E.value[0].value;
      } catch (W) {
        console.log(W);
      }
    }
    return xn(() => {
      N.value = M.value, Mt();
    }), Xt(g, async (W, v) => {
      W && v !== W && ($.value = E.value[W - 1].locations, B.value = $.value[0].value, ye.value = !0, k.set_platform(W), await k.fetch_segments(W), J.value = ie[0], ye.value = !1);
    }), Xt(I, async (W) => {
      W && (W == null ? void 0 : W.length) < 3 || (k.set_searchTerm(W), k.fetch_segments(g.value));
    }), Xt(B, async (W) => {
      k.set_locationQuery(W), k.fetch_segments(g.value);
    }), Xt(R, async (W) => {
      k.set_sortQuery(W), k.fetch_segments(g.value);
    }), Xt(J, async (W) => {
      const v = W.id;
      k.set_categoryQuery(v), k.fetch_segments();
    }), Fe(() => _h.charts.map((W) => {
      var vn, _n;
      const v = yl[W.type] || ((vn = W.type) == null ? void 0 : vn.toLowerCase()), le = La[v] || {};
      console.log("type", v), console.log("baseOptions", le);
      let Oe = {}, _t = [];
      return v === "line" || v === "area" ? (Oe = {
        xaxis: {
          categories: W.data.map((be) => be.key),
          labels: { style: { fontSize: "12px", colors: "#777" } },
          axisBorder: { show: !1 },
          axisTicks: { show: !1 }
        },
        yaxis: {
          labels: {
            style: { fontSize: "12px", colors: "#777" },
            formatter: (be) => be > 1e3 ? `${(be / 1e3).toFixed(1)}K` : be
          }
        }
      }, _t = [{
        name: ((_n = W.data[0]) == null ? void 0 : _n.valueType) || "Value",
        data: W.data.map((be) => Number(be.value))
      }]) : v === "bar" ? (Oe = {
        xaxis: {
          categories: W.data.map((be) => be.key)
        }
      }, _t = [{
        name: W.title,
        data: W.data.map((be) => Number(be.value))
      }]) : v === "donut" || v === "pie" ? (Oe = {
        labels: W.data.map((be) => be.key)
      }, _t = W.data.map((be) => Number(be.value))) : v === "bubble" && (_t = [{
        name: W.title,
        data: W.data.map((be) => ({
          x: Number(be.x),
          y: Number(be.y),
          z: Number(be.z)
        }))
      }]), console.log("series", _t), console.log("dynamicOptions", Oe), {
        series: _t,
        options: {
          ...le,
          ...Oe,
          title: {
            ...le.title,
            text: W.title
          },
          chart: {
            // ...baseOptions.chart,
            type: v
          }
        },
        chartType: v
      };
    })), (W, v) => (h(), y(me, null, [
      p("div", bh, [
        p("div", Eh, [
          p("div", Sh, [
            p("div", Ah, [
              H(C(wt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: E.value,
                modelValue: g.value,
                "onUpdate:modelValue": v[0] || (v[0] = (le) => g.value = le),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              H(C(wt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: $.value,
                modelValue: B.value,
                "onUpdate:modelValue": v[1] || (v[1] = (le) => B.value = le),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            H(C(Ct), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: I.value,
              "onUpdate:modelValue": v[2] || (v[2] = (le) => I.value = le)
            }, null, 8, ["modelValue"])
          ]),
          p("div", wh, [
            p("div", Ch, [
              p("div", Th, [
                H(C(Da), {
                  tabs: ie,
                  modelValue: J.value,
                  "onUpdate:modelValue": v[3] || (v[3] = (le) => J.value = le),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              p("div", Dh, [
                H(C(Dt), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: v[4] || (v[4] = (le) => kn())
                })
              ])
            ])
          ]),
          p("div", Ih, [
            p("div", {
              class: "list-list",
              ref_key: "list",
              ref: M
            }, [
              H(V2, {
                stickyHeader: 0,
                columns: Z,
                rows: C(k).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: v[5] || (v[5] = (le) => Mn(le)),
                onColumnSorted: v[6] || (v[6] = (le) => Gn(le)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              ye.value ? (h(), y("div", Lh, [
                H(C(Rn), { size: "xlarge" })
              ])) : L("", !0),
              H(G2, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: v[7] || (v[7] = (le) => lt(le))
              })
            ], 512),
            F.value ? (h(), ue(R2, {
              key: 0,
              filters: ge.value,
              onClearFilters: v[8] || (v[8] = (le) => en()),
              onFilterChange: v[9] || (v[9] = (le) => jt(le))
            }, null, 8, ["filters"])) : L("", !0)
          ])
        ]),
        p("div", Bh, [
          p("div", {
            class: Me(["outer-wrapper-segment-details", { "standard-empty": !w.value }])
          }, [
            w.value ? (h(), y("div", Fh, [
              w.value ? (h(), y("div", Vh, j(w.value.name), 1)) : L("", !0),
              v[23] || (v[23] = p("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              p("div", $h, [
                w.value.name ? (h(), y("div", Oh, [
                  v[14] || (v[14] = p("div", { class: "description-term" }, "Name", -1)),
                  p("div", Ph, j(w.value.name), 1)
                ])) : L("", !0),
                w.value.description ? (h(), y("div", Rh, [
                  v[15] || (v[15] = p("div", { class: "description-term" }, "Description", -1)),
                  p("div", Gh, j(w.value.description), 1)
                ])) : L("", !0),
                w.value.sourceCreatedDate ? (h(), y("div", Mh, [
                  v[16] || (v[16] = p("div", { class: "description-term" }, "Created", -1)),
                  p("div", Uh, j(C(gn)(w.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : L("", !0),
                w.value.sourceUpdatedDate ? (h(), y("div", Wh, [
                  v[17] || (v[17] = p("div", { class: "description-term" }, "Updated", -1)),
                  p("div", Nh, j(C(gn)(w.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : L("", !0),
                w.value.status ? (h(), y("div", qh, [
                  v[18] || (v[18] = p("div", { class: "description-term" }, "Status", -1)),
                  p("div", zh, j(w.value.status.value), 1)
                ])) : L("", !0),
                w.value.expiration_date ? (h(), y("div", Hh, [
                  v[19] || (v[19] = p("div", { class: "description-term" }, "Expiration", -1)),
                  p("div", Qh, j(w.value.expiration_date), 1)
                ])) : L("", !0),
                w.value.id ? (h(), y("div", Kh, [
                  v[20] || (v[20] = p("div", { class: "description-term" }, "Segmnent ID", -1)),
                  p("div", Yh, j(w.value.id), 1)
                ])) : L("", !0),
                w.value.audience_id ? (h(), y("div", Zh, [
                  v[21] || (v[21] = p("div", { class: "description-term" }, "Audience ID", -1)),
                  p("div", Xh, j(w.value.audience_id), 1)
                ])) : L("", !0),
                w.value.count ? (h(), y("div", Jh, [
                  v[22] || (v[22] = p("div", { class: "description-term" }, "Last count", -1)),
                  p("div", jh, j(w.value.count), 1),
                  w.value.refreshCountDate ? (h(), y("span", em, " (" + j(C(gn)(w.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : L("", !0)
                ])) : L("", !0),
                w.value.platform_specific ? (h(!0), y(me, { key: 9 }, Ae(w.value.platform_specific, (le) => (h(), y("div", tm, [
                  p("div", nm, j(Ue(le.label)), 1),
                  p("div", im, j(le.value), 1)
                ]))), 256)) : L("", !0)
              ]),
              p("div", null, [
                H(C(Da), {
                  tabs: ae,
                  modelValue: pe.value,
                  "onUpdate:modelValue": v[10] || (v[10] = (le) => pe.value = le),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                pe.value.id === 2 ? (h(), ue(Q2, { key: 0 })) : L("", !0)
              ])
            ])) : L("", !0),
            w.value ? L("", !0) : (h(), y("div", rm, [
              p("div", null, [
                p("img", {
                  class: "",
                  alt: "standardIcon",
                  src: C(xl)
                }, null, 8, am)
              ]),
              v[24] || (v[24] = p("div", { class: "standard-view-title" }, [
                p("div", null, "Select a standard segment from the list"),
                p("div", null, "or"),
                p("div", null, [
                  p("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          w.value.name ? (h(), y("div", sm, [
            p("div", lm, [
              v[25] || (v[25] = p("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              p("div", om, [
                p("span", null, j(w.value.name ? `${`${w.value.name} - `}` : "none"), 1),
                p("span", null, j(w.value.count), 1)
              ])
            ]),
            p("div", null, [
              H(C(st), {
                type: "secondary",
                label: "Explore",
                onClick: v[11] || (v[11] = (le) => ve()),
                class: "mr-2"
              }),
              H(C(st), {
                type: "primary",
                label: "Push to destination",
                onClick: v[12] || (v[12] = (le) => Un())
              })
            ])
          ])) : L("", !0)
        ])
      ]),
      q.value ? (h(), ue(kh, {
        key: 0,
        onClose: v[13] || (v[13] = (le) => q.value = !1)
      })) : L("", !0)
    ], 64));
  }
}, cm = /* @__PURE__ */ qe(um, [["__scopeId", "data-v-c81f03df"]]), dm = { class: "feedback-title-wrapper" }, fm = { class: "title" }, pm = { class: "feedback-text" }, hm = {
  __name: "AiQueryFeedback",
  props: {
    feedback: {
      type: Object,
      default: () => ({
        title: "Ai Assumption",
        text: "",
        type: "info"
      })
    }
  },
  setup(o) {
    const D = {
      warning: "bi-exclamation-triangle-fill",
      info: "bi-info-circle-fill",
      query: "bi-magic",
      "icon-color-warning": "#FA5D05",
      "icon-color-info": "#8B919A",
      "icon-color-query": "#528233"
    };
    return (a, A) => {
      var k, M, N;
      return o.feedback ? (h(), y("div", {
        key: 0,
        class: Me(["ai-query-feedback", [o.feedback.type]])
      }, [
        p("div", dm, [
          H(C(Dt), {
            class: "pr-2",
            size: "16px",
            icon: D[(k = o.feedback) == null ? void 0 : k.type],
            color: D[`icon-color-${(M = o.feedback) == null ? void 0 : M.type}`]
          }, null, 8, ["icon", "color"]),
          p("div", fm, j(o.feedback.title), 1)
        ]),
        p("p", pm, j((N = o.feedback) == null ? void 0 : N.text), 1)
      ], 2)) : L("", !0);
    };
  }
}, cl = /* @__PURE__ */ qe(hm, [["__scopeId", "data-v-8b6b4205"]]), mm = { class: "freeform-tab" }, gm = {
  __name: "FreeForm",
  setup(o) {
    tr();
    const D = G("");
    return (a, A) => (h(), y("div", mm, [
      H(C(Ct), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: D.value,
        "onUpdate:modelValue": A[0] || (A[0] = (k) => D.value = k)
      }, null, 8, ["modelValue"])
    ]));
  }
}, xm = /* @__PURE__ */ qe(gm, [["__scopeId", "data-v-87b28c22"]]), ym = { key: 0 }, km = { class: "d-flex justify-content-between" }, vm = { class: "query-results" }, _m = { class: "query-result" }, bm = { class: "query-result-count" }, Em = {
  key: 0,
  class: "segment-insights"
}, Sm = {
  key: 1,
  class: "loading"
}, Am = {
  __name: "ExploreThumbnail",
  props: {
    segmentData: {
      type: Array,
      required: !0
    },
    segmentCount: {
      type: Number,
      default: 0
    },
    savingDraft: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["explore-insights"],
  setup(o, { emit: D }) {
    const a = D, A = o;
    G(!1);
    const k = G(!1), M = {
      chart: {
        type: "bar",
        height: 700,
        // ✅ Increased height for spacing
        stacked: !0,
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        }
      },
      plotOptions: {
        bar: {
          horizontal: !0,
          // ✅ Keeps it horizontal
          dataLabels: {
            position: "center"
            // Keeps labels inside the bars
          }
        }
      },
      xaxis: {
        categories: [
          "Travel",
          "Music",
          "Food/Gastronomy",
          "Fashion",
          "Health",
          "Animals/Wildlife",
          "Wellbeing",
          "Sports",
          "Technology/Science",
          "Family/Relationships",
          "Young Single",
          "Child-Free Couples",
          "Parent with Young Children",
          "Parent with Older Children",
          "Any Parent",
          "Empty Nest",
          "Midlife Singles",
          "Senior Singles",
          "Hotel Parents"
        ],
        labels: {
          style: {
            fontSize: "14px",
            // ✅ Increased font size for readability
            fontFamily: "Inter, sans-serif",
            colors: "#777"
          }
        },
        axisBorder: {
          show: !1
        },
        axisTicks: {
          show: !1
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            // ✅ More readable category labels
            fontFamily: "Inter, sans-serif",
            colors: "#333"
            // Darker for contrast
          }
        }
      },
      grid: {
        borderColor: "#E4E4E7",
        strokeDashArray: 4,
        xaxis: {
          lines: { show: !0 }
        },
        yaxis: {
          lines: { show: !1 }
        }
      },
      colors: ["#4A90E2", "#A7C7F2"],
      // ✅ Semi-transparent colors
      dataLabels: {
        enabled: !1
      },
      tooltip: {
        theme: "light"
      },
      title: {
        text: "Audience Groups & Life Stages Ratio",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#263238"
        }
      },
      legend: {
        position: "bottom"
      }
    }, N = [
      {
        name: "Audience Groups",
        data: [15, 12, 18, 10, 14, 25, 10, 16, 20, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // ✅ Increased Animals/Wildlife to the highest value
      },
      {
        name: "Life Stages",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 15, 18, 12, 10, 8, 10, 7, 10]
        // ✅ Increased Young Single to the highest value
      }
    ];
    function F() {
      a("explore-insights");
    }
    return ($, B) => (h(), y("div", null, [
      o.savingDraft ? L("", !0) : (h(), y("div", ym, [
        p("div", km, [
          B[1] || (B[1] = p("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          k.value ? (h(), ue(C(st), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: B[0] || (B[0] = (E) => F())
          })) : L("", !0)
        ]),
        p("div", vm, [
          p("div", _m, [
            B[2] || (B[2] = je(" Segment size ")),
            p("span", bm, j(A.segmentCount), 1),
            B[3] || (B[3] = je(" records. "))
          ])
        ]),
        k.value ? (h(), y("div", Em, [
          H(C(ml), {
            options: M,
            series: N
          })
        ])) : L("", !0)
      ])),
      o.savingDraft ? (h(), y("div", Sm, [
        H(C(Rn), { size: "xlarge" }),
        B[4] || (B[4] = p("p", null, "Connecting to Open Intelligence...", -1))
      ])) : L("", !0)
    ]));
  }
}, wm = /* @__PURE__ */ qe(Am, [["__scopeId", "data-v-6b38de76"]]), Cm = { class: "query-attributes" }, Tm = ["onClick", "onKeydown"], Dm = {
  key: 0,
  class: "query-attributes-group-items"
}, Im = ["onClick"], Lm = { class: "attribute-type" }, Bm = { class: "attribute-name" }, Fm = {
  __name: "QueryAttributesList",
  props: {
    tables: {
      type: Array,
      required: !0
    },
    collapsed: {
      type: Array,
      required: !0
    },
    fetching: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click-attribute", "drag-start", "drag-end", "toggle-group"],
  setup(o, { emit: D }) {
    const a = D;
    function A(M) {
      a("toggle-group", M);
    }
    function k(M, N) {
      return N[M];
    }
    return (M, N) => (h(), y("div", Cm, [
      o.fetching ? (h(), ue(C(Rn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : L("", !0),
      (h(!0), y(me, null, Ae(o.tables, (F) => (h(), y("div", {
        class: Me(["query-attributes-group", { closed: o.collapsed.includes(F.display_name) }]),
        key: F.display_name
      }, [
        p("div", {
          class: "query-attributes-group-toggle",
          onClick: ($) => A(F.display_name),
          onKeydown: Ba(($) => A(F.display_name), ["enter"])
        }, [
          N[3] || (N[3] = p("span", { class: "arrow" }, null, -1)),
          je(" " + j(F.display_name), 1)
        ], 40, Tm),
        o.collapsed.includes(F.display_name) ? L("", !0) : (h(), y("div", Dm, [
          H(C(Ia), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": ($) => k($, F.columns),
            onDragEnd: N[2] || (N[2] = ($) => M.$emit("drag-end"))
          }, {
            default: Tt(() => [
              (h(!0), y(me, null, Ae(F.columns, ($) => (h(), ue(C(a2), {
                key: $.display_name
              }, {
                default: Tt(() => [
                  p("div", {
                    class: "attribute",
                    onMousedown: N[0] || (N[0] = (B) => M.$emit("drag-start")),
                    onMouseup: N[1] || (N[1] = (B) => M.$emit("drag-end"))
                  }, [
                    H(C(Dt), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    p("div", {
                      class: "attribute-content",
                      onClick: n2((B) => M.$emit("click-attribute", $), ["stop"])
                    }, [
                      p("span", Lm, j($.type), 1),
                      p("span", Bm, j($.display_name), 1)
                    ], 8, Im)
                  ], 32)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 2
          }, 1032, ["get-child-payload"])
        ]))
      ], 2))), 128))
    ]));
  }
}, Vm = /* @__PURE__ */ qe(Fm, [["__scopeId", "data-v-d9536002"]]), $m = { class: "query-builder" }, Om = { class: "query-builder-left" }, Pm = { class: "query-tabs" }, Rm = { class: "source" }, Gm = {
  key: 1,
  class: "ai-query-tab"
}, Mm = {
  key: 2,
  class: ""
}, Um = { class: "query-builder-right" }, Wm = { class: "query-content-scrollable" }, Nm = { class: "query-editor-wrapper" }, qm = { class: "query-runner-button-wrapper" }, zm = {
  key: 0,
  class: "query-editor"
}, Hm = { class: "queries" }, Qm = {
  key: 0,
  class: "query"
}, Km = ["onClick", "onKeydown"], Ym = { class: "w-100 pr-10" }, Zm = {
  key: 0,
  class: "sub-query-outer"
}, Xm = { class: "sub-queries" }, Jm = {
  key: 0,
  class: "query-operator-inner",
  style: { width: "fit-content" }
}, jm = {
  key: 1,
  class: "pt-3 pb-2"
}, e3 = { key: 0 }, t3 = {
  key: 1,
  class: "px-2"
}, n3 = {
  key: 1,
  class: "query-operator-outer"
}, i3 = {
  key: 0,
  class: "inital-view"
}, r3 = ["src"], a3 = { key: 0 }, s3 = {
  key: 0,
  class: "query-results-wrapper"
}, l3 = {
  key: 1,
  class: "loading-query-run"
}, o3 = {
  key: 2,
  class: "loading-query-run"
}, u3 = {
  key: 0,
  class: "mt-3"
}, c3 = {
  key: 1,
  class: "mt-3"
}, d3 = { class: "query-builder-footer" }, f3 = { class: "query-builder-footer-fields" }, p3 = { class: "ml-auto mb-2" }, h3 = {
  __name: "CustomSegments",
  props: {
    segment: Object,
    customSegmentUrl: {
      default: "https://sm-standard-segments-838902823068.europe-west2.run.app",
      type: String,
      required: !0
    },
    tenantId: {
      default: "",
      type: String,
      required: !0
    },
    brandName: {
      default: "",
      type: String,
      required: !0
    },
    brandId: {
      default: "1",
      type: String,
      required: !0
    },
    token: {
      default: "",
      type: String,
      required: !0
    }
  },
  emits: ["insertSegment", "showInsightsExplorer"],
  setup(o, { emit: D }) {
    const a = o, A = Jt(), k = tr(), M = D;
    G();
    const N = [
      {
        id: 1,
        label: "Query Builder"
      },
      {
        id: 2,
        label: "Ai Assisted Query"
      },
      {
        id: 3,
        label: "Free Form"
      }
    ], F = G(N[0]), $ = G([]), B = G($.value[0]), E = G([]), g = G(E.value[0]), I = G(""), q = G(null), ie = G(!1), ae = G(null), J = G(!0), pe = G(!1), ye = G([]), ge = G([]), Z = G(!1), X = G(!1), w = G(""), R = G(""), ve = G(!1), Ue = G(!1), jt = G(!1), lt = G(""), en = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], Gn = [
      { value: "$eq", label: "equal" }
    ], kn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$in", label: "in" },
      { value: "$nin", label: "not in" }
    ], Mn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$bw", label: "begins with" },
      { value: "$nbw", label: "not begins with" },
      { value: "$ew", label: "ends with" },
      { value: "$new", label: "not ends with" }
    ], Un = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$bt", label: "between" },
      { value: "$nbt", label: "not between" }
    ], Mt = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], W = G(0), v = G({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), le = () => {
      A.set_selectedSegmentType("custom"), A.set_activeTab("custom"), A.set_selectedSegment(q.value), M("showInsightsExplorer", q.value);
    };
    async function Oe(ee) {
      const T = {
        brandName: a.brandName,
        name: ee.name,
        description: ee.description,
        count: ee.count || I.value
      }, P = `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${ee.segmentId}`, we = await fetch(P, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(T)
      });
      if (!we.ok) {
        const de = await we.json();
        throw new Error(de.message || "Failed to generate insights");
      }
      const O = await we.json();
      console.log("Insights generated:", O);
    }
    async function _t() {
      lt.value = "saving", jt.value = !0;
      const ee = {
        platformId: g.value,
        count: I.value,
        region: A.query.demographics.region,
        market: A.query.demographics.market,
        description: v.value.description,
        name: v.value.name,
        query: "SELECT * FROM CUSTOMER"
      };
      try {
        const T = await fetch("https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          },
          body: JSON.stringify(ee)
        }), P = await T.json();
        if (!T.ok)
          throw new Error(P.message || "Failed to save segment");
        Ue.value = !0, X.value = !0, lt.value = "generating", q.value = P.data[0], await Oe(P.data[0]), lt.value = "done";
      } catch (T) {
        console.error("Error saving segment or generating insights:", T), lt.value = "";
      } finally {
        jt.value = !1;
      }
    }
    async function vn() {
      ve.value = !0;
      const ee = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: R.value
      };
      v.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const T = await k.generate_ai_query(ee, g.value, B.value), P = {
        text: T.message,
        type: T.query ? "info" : "warning",
        title: "AI Assumption"
      }, we = {
        text: T.query,
        type: "query",
        title: "Query Gen"
      };
      k.set_ai_generated_message(P), k.set_ai_generated_query(we), T.attrs.forEach((O, de) => {
        de === 0 ? ae.value = "queryGroupDrop" : ae.value = v.value.conditions[0].id;
        const bt = {
          payload: {
            display_name: O.field,
            input_type: O.input_type,
            operators: O.operator,
            selectors: []
          }
        };
        bt.payload.selectors.push(O.value), It(bt), ol();
      }), ve.value = !1;
    }
    async function _n() {
      v.value.conditions.forEach((ee) => {
        ee.group.forEach((T) => {
          T.input_type === "select" && T.statement[2].length > 1 && T.statement[1] === "$eq" && (T.statement[1] = "$in"), T.input_type === "select" && T.statement[2].length > 1 && T.statement[1] === "$neq" && (T.statement[1] = "$nin");
        });
      });
    }
    async function be() {
      Z.value = !0, F.value.id === 1 && await _n(), I.value = await k.run_query(v.value, g.value, B.value), I.value && (X.value = !0), Z.value = !1;
    }
    function tn(ee, T) {
      var we, O;
      return ee === "operatorsQueries" ? (we = en.find((de) => de.value === T)) == null ? void 0 : we.label : (O = oi(ee).find((de) => de.value === T)) == null ? void 0 : O.label;
    }
    function oi(ee) {
      switch (ee) {
        case "select":
          return kn;
        case "boolean":
          return Gn;
        case "string":
          return Mn;
        case "date":
          return Un;
        case "int":
          return Mt;
        default:
          return [];
      }
    }
    function Ut(ee) {
      ie.value = ee;
    }
    async function nn() {
      pe.value = !0, await k.fetch_database_model(g.value, B.value), pe.value = !1;
    }
    async function ir() {
      J.value = !0, await k.fetch_custom_segment_settings();
      const ee = await k.get_segment_settings;
      ee && (E.value = await ee.platforms.map((T) => ({
        value: T.platform_id,
        label: T.platform,
        locations: T.locations.map((P) => ({
          value: P.value,
          label: P.display_name
        }))
      })), g.value = E.value[0].value), J.value = !1;
    }
    function It(ee) {
      const T = ee.payload ? ee.payload : ee;
      if (W.value < k.settings.maxSubQuery) {
        const P = T.selectors.map((de) => ({
          value: de,
          label: de
        }));
        let we = [];
        P.length > 2 ? we[0] = P[0].value : P.length > 0 ? we = P[0].value : we = null;
        const O = P.length > 0 && T.input_type !== "boolean" ? "select" : T.input_type;
        if (ae.value === "queryGroupDrop") {
          W.value += 1, v.value.conditions.length > 0 && v.value.conditions.push({ logic: "$or" });
          const de = {
            id: wa(),
            group: [
              {
                id: wa(),
                statement: [T.display_name, "$eq", we],
                selectors: P,
                input_type: O
              }
            ]
          };
          v.value.conditions.push(de);
        } else if (ae.value !== null) {
          W.value += 1;
          const de = v.value.conditions.findIndex(
            (bt) => bt.id === ae.value
          );
          de !== -1 && (v.value.conditions[de].group.push({ logic: "$and" }), v.value.conditions[de].group.push({
            id: wa(),
            statement: [T.display_name, "$eq", we],
            selectors: P,
            input_type: O
          }));
        }
        ae.value = null;
      }
    }
    function bn(ee) {
      var T;
      (T = v.value.conditions[0]) != null && T.id ? ae.value = v.value.conditions[0].id : ae.value = "queryGroupDrop", It(ee), ol();
    }
    function ui(ee, T, P) {
      if (v.value.conditions[T].group.length === 1)
        v.value.conditions.length > T + 1 ? v.value.conditions.splice(T, 2) : v.value.conditions.splice(T, 1), W.value -= 1;
      else {
        const we = v.value.conditions[T].group.findIndex(
          (O) => O.id === P
        );
        v.value.conditions[T].group.splice(we - 1, 2), W.value -= 1;
      }
    }
    function Ke(ee) {
      const T = ye.value.indexOf(ee);
      T >= 0 ? ye.value.splice(T, 1) : ye.value.push(ee);
    }
    function rn(ee) {
      const T = ge.value.indexOf(ee);
      T >= 0 ? ge.value.splice(T, 1) : ge.value.push(ee);
    }
    function rr() {
      I.value = "", v.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function gt() {
      v.value = { ...v.value, count: I.value }, F.value.id === 3 && (v.value = {
        ...v.value,
        freeForm: k.freeFormQuery
      }), M("insertSegment", v.value);
    }
    async function ci() {
      await A.set_token(a.token), await A.set_brandId(a.brandId), await A.set_tenantId(a.tenantId), await k.set_customSegmentUrl(a.customSegmentUrl), await k.fetch_custom_segment_settings(), await ir();
    }
    return xn(() => {
      ci();
    }), Xt(g, async (ee, T) => {
      ee && T !== ee && ($.value = E.value.find((P) => P.value == ee).locations, B.value = $.value[0].value, await rr(), await nn());
    }), Xt(F, async (ee, T) => {
      ee && T !== ee && ee.id === 2 && (R.value = "", k.set_ai_generated_message(null), k.set_ai_generated_query(null));
    }), (ee, T) => (h(), y("div", $m, [
      p("div", Om, [
        J.value ? (h(), ue(C(Rn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), y(me, { key: 1 }, [
          p("div", Pm, [
            H(C(Da), {
              tabs: N,
              modelValue: F.value,
              "onUpdate:modelValue": T[0] || (T[0] = (P) => F.value = P),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          p("div", Rm, [
            H(C(wt), {
              style: { width: "45%" },
              class: "source w-100",
              options: E.value,
              modelValue: g.value,
              "onUpdate:modelValue": T[1] || (T[1] = (P) => g.value = P),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            H(C(wt), {
              style: { width: "45%" },
              class: "source w-100",
              options: $.value,
              modelValue: B.value,
              "onUpdate:modelValue": T[2] || (T[2] = (P) => B.value = P),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            C(A).brief.market ? (h(), ue(C(Ct), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: C(A).brief.market,
              "onUpdate:modelValue": T[3] || (T[3] = (P) => C(A).brief.market = P),
              label: "Market"
            }, null, 8, ["modelValue"])) : L("", !0)
          ]),
          g.value && B.value ? (h(), y(me, { key: 0 }, [
            F.value.id === 1 ? (h(), ue(Vm, {
              key: 0,
              tables: C(k).get_databaseModel.tables,
              collapsed: ge.value,
              fetching: pe.value,
              onClickAttribute: bn,
              onDragStart: T[4] || (T[4] = (P) => Ut(!0)),
              onDragEnd: T[5] || (T[5] = (P) => Ut(!1)),
              onToggleGroup: rn
            }, null, 8, ["tables", "collapsed", "fetching"])) : L("", !0),
            F.value.id === 2 ? (h(), y("div", Gm, [
              H(C(Ct), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: R.value,
                "onUpdate:modelValue": T[6] || (T[6] = (P) => R.value = P)
              }, null, 8, ["modelValue"]),
              H(C(st), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !R.value,
                loading: ve.value,
                onClick: T[7] || (T[7] = (P) => vn())
              }, null, 8, ["disabled", "loading"]),
              C(k).get_aiGeneratedMessage ? (h(), ue(cl, {
                key: 0,
                feedback: C(k).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : L("", !0),
              C(k).get_aiGeneratedQuery ? (h(), ue(cl, {
                key: 1,
                feedback: C(k).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : L("", !0)
            ])) : L("", !0),
            F.value.id === 3 ? (h(), y("div", Mm, [
              H(xm)
            ])) : L("", !0)
          ], 64)) : L("", !0)
        ], 64))
      ]),
      p("div", Um, [
        p("div", Wm, [
          p("div", Nm, [
            p("div", null, [
              T[14] || (T[14] = p("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              p("div", qm, [
                H(C(st), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !g.value || !B.value,
                  loading: Z.value,
                  onClick: T[8] || (T[8] = (P) => be())
                }, null, 8, ["disabled", "loading"]),
                Ue.value ? L("", !0) : (h(), ue(C(st), {
                  key: 0,
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !v.value.name || !v.value.description || !I.value,
                  loading: jt.value,
                  onClick: T[9] || (T[9] = (P) => _t())
                }, null, 8, ["disabled", "loading"]))
              ])
            ]),
            F.value.id !== 3 ? (h(), y("div", zm, [
              p("div", Hm, [
                (h(!0), y(me, null, Ae(v.value.conditions, (P, we) => (h(), y("div", {
                  class: "query-outer",
                  key: P.id
                }, [
                  P.group ? (h(), y("div", Qm, [
                    p("div", {
                      class: "collapse-subQuery",
                      onClick: (O) => Ke(P.id),
                      onKeydown: Ba((O) => Ke(P.id), ["enter"])
                    }, [
                      H(C(Dt), {
                        icon: ye.value.indexOf(P.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, Km),
                    p("div", Ym, [
                      ye.value.indexOf(P.id) === -1 ? (h(), y("div", Zm, [
                        (h(!0), y(me, null, Ae(P.group, (O) => (h(), y("div", Xm, [
                          O.logic && ye.value.indexOf(P.id) === -1 ? (h(), y("div", Jm, [
                            H(C(wt), {
                              class: "query-operator",
                              modelValue: O.logic,
                              "onUpdate:modelValue": (de) => O.logic = de,
                              singleSelect: !0,
                              options: en,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : L("", !0),
                          O.statement ? (h(), y("div", {
                            key: 1,
                            class: Me(["sub-query", { "single-subquery": P.group.length === 1 }])
                          }, [
                            H(C(Ct), {
                              readonly: "",
                              modelValue: O.statement[0],
                              "onUpdate:modelValue": (de) => O.statement[0] = de
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            H(C(wt), {
                              modelValue: O.statement[1],
                              "onUpdate:modelValue": (de) => O.statement[1] = de,
                              singleSelect: !0,
                              options: oi(O.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            O.selectors.length < 3 && O.selectors.length > 0 ? (h(), ue(C(wt), {
                              key: 0,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (de) => O.statement[2] = de,
                              options: O.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : L("", !0),
                            O.selectors.length > 2 && O.input_type !== "boolean" ? (h(), ue(C(wt), {
                              key: 1,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (de) => O.statement[2] = de,
                              options: O.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : L("", !0),
                            O.input_type === "int" ? (h(), ue(C(Ct), {
                              key: 2,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (de) => O.statement[2] = de,
                              error: O.statement[2] ? "" : w.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : L("", !0),
                            O.input_type === "string" ? (h(), ue(C(Ct), {
                              key: 3,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (de) => O.statement[2] = de,
                              error: O.statement[2] ? "" : w.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : O.input_type === "date" ? (h(), ue(C(fl), {
                              key: 4,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (de) => O.statement[2] = de,
                              range: O.statement[1] === "$bt" || O.statement[1] === "$nbt",
                              error: O.statement[2] ? "" : w.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : L("", !0),
                            H(C(Dt), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (de) => ui(P.id, we, O.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : L("", !0)
                        ]))), 256))
                      ])) : (h(), y("p", jm, [
                        (h(!0), y(me, null, Ae(P.group, (O, de) => (h(), y("span", {
                          key: O.id
                        }, [
                          O.statement ? (h(), y("span", e3, [
                            p("b", null, j(O == null ? void 0 : O.statement[0]), 1),
                            je(" " + j(tn(O.input_type, O == null ? void 0 : O.statement[1])) + " ", 1),
                            p("b", null, j((O == null ? void 0 : O.statement[2]) || "?"), 1)
                          ])) : (h(), y("span", t3, j(tn("operatorsQueries", O.logic)), 1))
                        ]))), 128))
                      ])),
                      ie.value && W.value < C(k).settings.maxSubQuery ? (h(), ue(C(Ia), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (O) => ae.value = P.id,
                        onDrop: It
                      }, {
                        default: Tt(() => T[15] || (T[15] = [
                          p("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : L("", !0)
                    ])
                  ])) : L("", !0),
                  v.value.conditions.length > 1 && we < v.value.conditions.length - 1 && P.logic ? (h(), y("div", n3, [
                    H(C(wt), {
                      class: "query-operator",
                      modelValue: P.logic,
                      "onUpdate:modelValue": (O) => P.logic = O,
                      singleSelect: !0,
                      options: en,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : L("", !0)
                ]))), 128))
              ]),
              v.value.conditions.length === 0 ? (h(), y("div", i3, [
                p("span", null, [
                  p("img", {
                    class: "",
                    alt: "standardIcon",
                    src: C(xl)
                  }, null, 8, r3)
                ])
              ])) : L("", !0),
              ie.value && W.value < C(k).settings.maxSubQuery || v.value.conditions.length === 0 ? (h(), ue(C(Ia), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: T[10] || (T[10] = (P) => ae.value = "queryGroupDrop"),
                onDrop: It
              }, {
                default: Tt(() => [
                  p("div", {
                    class: Me(["drop-indicator", {
                      "mt-25": v.value.conditions.length > 0,
                      "p-5": v.value.conditions.length === 0
                    }])
                  }, [
                    v.value.conditions.length <= 0 ? (h(), y("span", a3, " Drag and drop attributes or AI generated rules ")) : L("", !0)
                  ], 2)
                ]),
                _: 1
              })) : L("", !0)
            ])) : L("", !0)
          ]),
          Z.value || X.value ? (h(), y("div", s3, [
            !Z.value && X.value ? (h(), ue(wm, {
              key: 0,
              segmentData: I.value,
              segmentCount: I.value
            }, null, 8, ["segmentData", "segmentCount"])) : L("", !0),
            Z.value ? (h(), y("div", l3, [
              H(C(Rn), {
                size: "xlarge",
                class: "mt-3"
              }),
              T[16] || (T[16] = p("p", { class: "mt-3" }, "Running query...", -1))
            ])) : L("", !0),
            lt.value === "saving" || lt.value === "generating" ? (h(), y("div", o3, [
              H(C(Rn), {
                size: "xlarge",
                class: "mt-3"
              }),
              lt.value === "saving" ? (h(), y("p", u3, "Saving segment...")) : (h(), y("p", c3, "Generating insights..."))
            ])) : L("", !0),
            lt.value === "done" && q.value ? (h(), ue(sh, {
              key: 3,
              selectedSegment: q.value,
              location: "custom",
              onShowInsightsExplorer: le
            }, null, 8, ["selectedSegment"])) : L("", !0)
          ])) : L("", !0)
        ]),
        p("div", d3, [
          p("div", f3, [
            H(C(Ct), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: v.value.name,
              "onUpdate:modelValue": T[11] || (T[11] = (P) => v.value.name = P),
              type: "text"
            }, null, 8, ["modelValue"]),
            H(C(Ct), {
              class: "segment-name",
              label: "Segment description",
              modelValue: v.value.description,
              "onUpdate:modelValue": T[12] || (T[12] = (P) => v.value.description = P),
              type: "text"
            }, null, 8, ["modelValue"])
          ]),
          p("div", p3, [
            H(C(st), {
              size: "small",
              label: "Push to destination",
              disabled: !I.value || !v.value.name && F.value.id === 1 || !v.value.name && F.value.id === 2 || v.value.conditions.length <= 0 && F.value.id !== 3,
              onClick: T[13] || (T[13] = (P) => gt())
            }, null, 8, ["disabled"])
          ])
        ])
      ])
    ]));
  }
}, m3 = /* @__PURE__ */ qe(h3, [["__scopeId", "data-v-b11807f7"]]), g3 = { class: "tag-section" }, x3 = { class: "rating-card" }, y3 = { class: "header" }, k3 = { class: "title" }, v3 = { class: "pb-2" }, _3 = { class: "content-wrapper" }, b3 = { class: "content" }, E3 = { class: "publishers" }, S3 = { class: "publisher-item" }, A3 = { class: "ratings" }, w3 = { class: "rating" }, C3 = {
  __name: "TagCard",
  props: {
    tags: {
      type: Array,
      required: !0
    },
    charts: {
      type: Array,
      default: () => []
    }
  },
  setup(o) {
    const D = G([]), a = o, A = Fe(() => a.charts.filter((M) => M.type === "bubble")), k = Fe(() => a.tags);
    return xn(() => {
      D.value = new Array(A.value.length).fill(!1);
    }), (M, N) => (h(), y("div", g3, [
      (h(!0), y(me, null, Ae(k.value, (F, $) => (h(), y("div", {
        class: Me(["card-wrapper", { "full-width": F.title.includes("Publishers") }]),
        key: F.title + $
      }, [
        p("div", x3, [
          p("div", y3, [
            p("h2", k3, [
              p("span", v3, j(F.title), 1)
            ])
          ]),
          p("div", _3, [
            p("div", b3, [
              p("div", E3, [
                (h(!0), y(me, null, Ae(F.data[0].label, (B, E) => (h(), y("div", { key: B }, [
                  p("div", S3, j(B), 1),
                  p("div", A3, [
                    p("div", w3, [
                      (h(!0), y(me, null, Ae(Math.floor(parseFloat(F.data[0].score[E])), (g, I) => (h(), y("span", {
                        key: `filled-${I}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), y(me, null, Ae(5 - Math.floor(parseFloat(F.data[0].score[E])), (g, I) => (h(), y("span", {
                        key: `empty-${I}`,
                        class: "dot"
                      }))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            N[0] || (N[0] = p("div", { class: "logo-wrapper" }, [
              p("img", {
                src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                alt: "logo",
                width: "100"
              })
            ], -1))
          ])
        ])
      ], 2))), 128))
    ]));
  }
}, T3 = /* @__PURE__ */ qe(C3, [["__scopeId", "data-v-132e8d7a"]]), D3 = { class: "chart-section-title my-3" }, I3 = { class: "chart-section" }, L3 = { key: 0 }, B3 = { class: "chart-title" }, F3 = {
  __name: "ChartCard",
  props: {
    charts: {
      type: Array,
      required: !0
    },
    tags: {
      type: Array,
      required: !0
    }
  },
  setup(o) {
    const D = o, a = G([]), A = G([]), k = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], M = (E, g) => {
      var ge, Z;
      const I = "area", q = La[I] || {}, ie = ((ge = E.data[0]) == null ? void 0 : ge.label) || [], J = (((Z = E.data[0]) == null ? void 0 : Z.score) || []).map((X) => Number.isNaN(Number(X)) ? X : Number(X)), pe = [{ name: E.title, data: J }], ye = {
        labels: ie,
        colors: [k[g % k.length]],
        stroke: {
          curve: "smooth",
          width: 3
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100]
          }
        },
        dataLabels: {
          enabled: !1
          // Remove the black boxes with numbers
        },
        markers: {
          size: 0
          // Remove data point markers for smoother appearance
        },
        tooltip: {
          enabled: !0,
          shared: !0,
          intersect: !1,
          // Show data values in tooltip instead of on chart
          y: {
            formatter(X) {
              return X;
            }
          }
        },
        grid: {
          borderColor: "#f1f1f1",
          row: {
            colors: ["transparent", "transparent"],
            opacity: 0.5
          }
        }
      };
      return {
        section: E.section,
        chartType: I,
        title: E.title,
        series: pe,
        options: {
          ...q,
          ...ye,
          chart: {
            type: I,
            toolbar: {
              show: !0,
              tools: {
                download: !0,
                selection: !0,
                zoom: !0,
                zoomin: !0,
                zoomout: !0,
                pan: !0
              }
            }
          }
        }
      };
    }, N = (E) => {
      if (!E)
        return "bar";
      const g = E.toString().toLowerCase().trim();
      return (g.includes("vertical") || g.includes("verical")) && (g.includes("bar") || g.includes("bars") || g.includes("chart")) || g === "horizontal" ? "bar" : g === "donut" ? "donut" : g === "pie" ? "pie" : g === "radar" ? "radar" : g === "line" ? "line" : g === "area" ? "area" : g;
    }, F = Fe(() => D.charts.filter((E) => E.data && E.data.length > 0).map((E, g) => {
      var ge, Z;
      const I = N(yl[E.type] || E.type), q = La[I] || {}, ie = ((ge = E.data[0]) == null ? void 0 : ge.label) || [], J = (((Z = E.data[0]) == null ? void 0 : Z.score) || []).map((X) => Number.isNaN(Number(X)) ? X : Number(X));
      let pe = [], ye = {};
      if (I === "horizontal")
        pe = [{ name: E.title, data: J }], ye = {
          labels: ie,
          colors: [k[g % k.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (I === "bar" || I === "vertical bar" || I === "vertical bars" || I === "Vertical bars" || I === "vertical chart")
        E.title === "Average View of Digital consumption (Daily)" ? (pe = [{ name: E.title, data: J }], ye = {
          labels: ie,
          colors: [k[g % k.length]],
          plotOptions: { bar: { horizontal: !1, distributed: !1 } }
        }) : (E.title === "Personality archetype" && console.log(J), pe = [{ name: E.title, data: J }], ye = {
          labels: ie,
          colors: [k[g % k.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (I === "line" || I === "area")
          return M(E, g);
        I === "radar" ? (pe = [{ name: E.title, data: J }], ye = { labels: ie }) : (I === "donut" || I === "pie") && (pe = J, ye = { labels: ie });
      }
      return {
        section: E.section,
        chartType: I,
        title: E.title,
        series: pe,
        options: {
          ...q,
          ...ye,
          chart: { type: I }
        }
      };
    }));
    xn(() => {
      a.value = new Array(F.value.length).fill(!1);
    });
    const $ = (E, g) => {
      if (!E || a.value[g])
        return;
      A.value[g] = E;
      const { stop: I } = l2(
        E,
        ([q]) => {
          q.isIntersecting && (a.value[g] = !0, I());
        },
        { threshold: 0.1 }
      );
    }, B = () => {
      const E = F.value.length;
      return E === 1 ? "full-width" : E === 2 ? "half-width" : "third-width";
    };
    return (E, g) => (h(), y("div", null, [
      p("h5", D3, j(F.value[0].section), 1),
      p("div", I3, [
        (h(!0), y(me, null, Ae(F.value, (I, q) => (h(), y("div", {
          key: I.title + q,
          ref_for: !0,
          ref: (ie) => $(ie, q),
          class: Me(["chart-wrapper", B()])
        }, [
          a.value[q] ? (h(), y("div", L3, [
            p("div", B3, j(I.title), 1),
            H(C(ml), {
              options: I.options,
              series: I.series,
              type: I.chartType,
              width: "100%",
              height: I.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : L("", !0)
        ], 2))), 128)),
        F.value.length === 2 ? (h(), ue(T3, {
          key: 0,
          tags: o.tags || [],
          charts: o.charts || []
        }, null, 8, ["tags", "charts"])) : L("", !0)
      ])
    ]));
  }
}, V3 = /* @__PURE__ */ qe(F3, [["__scopeId", "data-v-e1ad6154"]]), $3 = "5.12.1", O3 = 25, P3 = 0, R3 = 100, G3 = 450, M3 = 450, U3 = "*Final5", W3 = 0, N3 = [], q3 = [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "mask2",
    td: 1,
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          35,
          4,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.632,
                0.632,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 38,
            s: [
              63.668,
              63.668,
              100
            ]
          },
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.201,
                0.201,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 49.233,
            s: [
              101.888,
              101.888,
              100
            ]
          },
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.8,
                0.8,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 62.42,
            s: [
              93.768,
              93.768,
              100
            ]
          },
          {
            t: 77.9996744791667,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [
            0,
            0,
            0,
            1
          ],
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: !1
      }
    ],
    ip: 38,
    op: 100,
    st: -28.8333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 2,
    ty: 3,
    nm: "Null Collect  1",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 0,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225.339,
          224.589,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          50,
          50,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                0.833,
                0.833,
                0.833
              ]
            },
            o: {
              x: [
                0.167,
                0.167,
                0.167
              ],
              y: [
                0.167,
                0.167,
                0.167
              ]
            },
            t: 14,
            s: [
              147,
              147,
              100
            ]
          },
          {
            t: 17,
            s: [
              100,
              100,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    ip: 14,
    op: 81,
    st: 0,
    bm: 0
  },
  {
    ddd: 0,
    ind: 3,
    ty: 4,
    nm: "Shape Layer 39",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 4,
    ty: 4,
    nm: "Shape Layer 38",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 5,
    ty: 4,
    nm: "Shape Layer 37",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 6,
    ty: 4,
    nm: "Shape Layer 36",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 7,
    ty: 4,
    nm: "Shape Layer 51",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 8,
    ty: 4,
    nm: "Shape Layer 30",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 9,
    ty: 4,
    nm: "Shape Layer 29",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 10,
    ty: 4,
    nm: "Shape Layer 23",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 11,
    ty: 4,
    nm: "Shape Layer 48",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 12,
    ty: 4,
    nm: "Shape Layer 22",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 13,
    ty: 4,
    nm: "Shape Layer 50",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 14,
    ty: 4,
    nm: "Shape Layer 43",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 15,
    ty: 4,
    nm: "Shape Layer 42",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 16,
    ty: 4,
    nm: "Shape Layer 41",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 17,
    ty: 4,
    nm: "Shape Layer 49",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 18,
    ty: 4,
    nm: "Shape Layer 40",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 19,
    ty: 4,
    nm: "Shape Layer 47",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 20,
    ty: 4,
    nm: "Shape Layer 46",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 21,
    ty: 4,
    nm: "Shape Layer 45",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 22,
    ty: 4,
    nm: "Shape Layer 44",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 23,
    ty: 4,
    nm: "mask1",
    td: 1,
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -0.013,
          -0.115,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          70,
          70,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0,
                      0
                    ],
                    y: [
                      1,
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.13,
                      0.13
                    ],
                    y: [
                      0,
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    10,
                    10
                  ]
                },
                {
                  t: 26.3326822916667,
                  s: [
                    560,
                    560
                  ]
                }
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                1,
                0.235294117647,
                0.101960784314,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.833
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.167
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 0.834,
                  s: [
                    0
                  ]
                },
                {
                  i: {
                    x: [
                      0
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.374
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    6
                  ]
                },
                {
                  t: 17.9996744791667,
                  s: [
                    0
                  ]
                }
              ],
              ix: 5
            },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -0.013,
                -0.115
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 27,
    st: -148.333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 24,
    ty: 3,
    nm: "Null Collect  2",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 0,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225.339,
          224.589,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          50,
          50,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                0.833,
                0.833,
                0.833
              ]
            },
            o: {
              x: [
                0.167,
                0.167,
                0.167
              ],
              y: [
                0.167,
                0.167,
                0.167
              ]
            },
            t: 0,
            s: [
              147,
              147,
              100
            ]
          },
          {
            t: 3,
            s: [
              100,
              100,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    ip: 0,
    op: 67,
    st: -14,
    bm: 0
  },
  {
    ddd: 0,
    ind: 25,
    ty: 4,
    nm: "Shape Layer 72",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 26,
    ty: 4,
    nm: "Shape Layer 71",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 27,
    ty: 4,
    nm: "Shape Layer 70",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 28,
    ty: 4,
    nm: "Shape Layer 69",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 29,
    ty: 4,
    nm: "Shape Layer 68",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 30,
    ty: 4,
    nm: "Shape Layer 67",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 31,
    ty: 4,
    nm: "Shape Layer 66",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 32,
    ty: 4,
    nm: "Shape Layer 65",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 33,
    ty: 4,
    nm: "Shape Layer 64",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 34,
    ty: 4,
    nm: "Shape Layer 63",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 35,
    ty: 4,
    nm: "Shape Layer 62",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 36,
    ty: 4,
    nm: "Shape Layer 61",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 37,
    ty: 4,
    nm: "Shape Layer 60",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 38,
    ty: 4,
    nm: "Shape Layer 59",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 39,
    ty: 4,
    nm: "Shape Layer 58",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 40,
    ty: 4,
    nm: "Shape Layer 57",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 41,
    ty: 4,
    nm: "Shape Layer 56",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 42,
    ty: 4,
    nm: "Shape Layer 55",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 43,
    ty: 4,
    nm: "Shape Layer 54",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 44,
    ty: 4,
    nm: "Shape Layer 53",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 45,
    ty: 4,
    nm: "dot blue 4",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              14.583,
              0,
              0
            ],
            ti: [
              -14.583,
              0,
              0
            ]
          },
          {
            t: 97,
            s: [
              312.5,
              225,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 46,
    ty: 4,
    nm: "dot blue 3",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              -14.333,
              0,
              0
            ],
            ti: [
              14.333,
              0,
              0
            ]
          },
          {
            t: 97,
            s: [
              139,
              225,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 47,
    ty: 4,
    nm: "dot blue 2",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              0,
              -14.333,
              0
            ],
            ti: [
              0,
              14.333,
              0
            ]
          },
          {
            t: 97,
            s: [
              225,
              139,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 48,
    ty: 4,
    nm: "dot blue",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              0,
              14.417,
              0
            ],
            ti: [
              0,
              -14.417,
              0
            ]
          },
          {
            t: 97,
            s: [
              225,
              311.5,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 49,
    ty: 4,
    nm: "Shape Layer 18",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -0.013,
          -0.115,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          70,
          70,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0,
                      0
                    ],
                    y: [
                      1,
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.13,
                      0.13
                    ],
                    y: [
                      0,
                      0
                    ]
                  },
                  t: 78,
                  s: [
                    10,
                    10
                  ]
                },
                {
                  t: 106,
                  s: [
                    560,
                    560
                  ]
                }
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0.101960784314,
                0.101960784314,
                0.101960784314,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.374
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 78,
                  s: [
                    6
                  ]
                },
                {
                  t: 96.8330078125,
                  s: [
                    0
                  ]
                }
              ],
              ix: 5
            },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -0.013,
                -0.115
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 77.8333333333333,
    op: 100,
    st: -70.5,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 50,
    ty: 4,
    nm: "Shape Layer 15",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          35,
          4,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.632,
                0.632,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 38.333,
            s: [
              63.668,
              63.668,
              100
            ]
          },
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.201,
                0.201,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 49.476,
            s: [
              73.188,
              73.188,
              100
            ]
          },
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.8,
                0.8,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 62.558,
            s: [
              88.868,
              88.868,
              100
            ]
          },
          {
            t: 77.9996744791667,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                1,
                1,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [
            1,
            1,
            1,
            1
          ],
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: !1
      }
    ],
    ip: 38,
    op: 78,
    st: -28.8333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 51,
    ty: 4,
    nm: "Shape Layer 14",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          35,
          4,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.632,
                0.632,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 38,
            s: [
              63.668,
              63.668,
              100
            ]
          },
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.201,
                0.201,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 49.233,
            s: [
              101.888,
              101.888,
              100
            ]
          },
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.8,
                0.8,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 62.42,
            s: [
              93.768,
              93.768,
              100
            ]
          },
          {
            t: 77.9996744791667,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [
            0,
            0,
            0,
            1
          ],
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: !1
      }
    ],
    ip: 38,
    op: 100,
    st: -28.8333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 52,
    ty: 4,
    nm: "Shape Layer 11",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          202.962,
          222.481,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          62.965,
          62.965,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 2,
              ix: 5
            },
            lc: 2,
            lj: 2,
            bm: 0,
            d: [
              {
                n: "d",
                nm: "dash",
                v: {
                  a: 0,
                  k: 10,
                  ix: 1
                }
              },
              {
                n: "o",
                nm: "offset",
                v: {
                  a: 0,
                  k: 0,
                  ix: 7
                }
              }
            ],
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.215
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.217
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.637
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      1
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 85,
              ix: 3
            },
            m: 1,
            ix: 4,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 4,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 2,
              ix: 5
            },
            lc: 2,
            lj: 2,
            bm: 0,
            d: [
              {
                n: "d",
                nm: "dash",
                v: {
                  a: 0,
                  k: 10,
                  ix: 1
                }
              },
              {
                n: "o",
                nm: "offset",
                v: {
                  a: 0,
                  k: 0,
                  ix: 7
                }
              }
            ],
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.215
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.217
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.637
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      1
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 85,
              ix: 3
            },
            m: 1,
            ix: 4,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 4,
        cix: 2,
        bm: 0,
        ix: 2,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 19,
    op: 41,
    st: -38,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 53,
    ty: 4,
    nm: "Shape Layer 34",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                1,
                1
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 0,
              k: 0,
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.17
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.333
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 23,
                  s: [
                    0
                  ]
                },
                {
                  t: 46,
                  s: [
                    100
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 0,
              ix: 3
            },
            m: 1,
            ix: 2,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 235,
              ix: 5
            },
            lc: 1,
            lj: 2,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 20,
    op: 41,
    st: -7,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 54,
    ty: 4,
    nm: "Shape Layer 35",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.17,
                0.17,
                0.17
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 19,
            s: [
              0,
              0,
              100
            ]
          },
          {
            t: 34,
            s: [
              121,
              121,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                1,
                1
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 0,
              k: 0,
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.17
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.333
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 21,
                  s: [
                    0
                  ]
                },
                {
                  t: 35,
                  s: [
                    100
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 0,
              ix: 3
            },
            m: 1,
            ix: 2,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 193,
              ix: 5
            },
            lc: 1,
            lj: 2,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 19,
    op: 40,
    st: -8,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 55,
    ty: 4,
    nm: "Shape Layer 19",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -0.013,
          -0.115,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          70,
          70,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0,
                      0
                    ],
                    y: [
                      1,
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.13,
                      0.13
                    ],
                    y: [
                      0,
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    10,
                    10
                  ]
                },
                {
                  t: 26.3326822916667,
                  s: [
                    560,
                    560
                  ]
                }
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.833
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.167
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 0.834,
                  s: [
                    0
                  ]
                },
                {
                  i: {
                    x: [
                      0
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.374
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    6
                  ]
                },
                {
                  t: 17.9996744791667,
                  s: [
                    0
                  ]
                }
              ],
              ix: 5
            },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -0.013,
                -0.115
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 27,
    st: -148.333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 56,
    ty: 1,
    nm: "White Solid 9",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          960,
          540,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    sw: 1920,
    sh: 1080,
    sc: "#ffffff",
    ip: 0,
    op: 100,
    st: 0,
    bm: 0
  }
], z3 = [], H3 = {}, Q3 = {
  v: $3,
  fr: O3,
  ip: P3,
  op: R3,
  w: G3,
  h: M3,
  nm: U3,
  ddd: W3,
  assets: N3,
  layers: q3,
  markers: z3,
  props: H3
}, K3 = {
  key: 0,
  class: "explore-insights-loader"
}, Y3 = {
  key: 1,
  class: "explore-insights-wrapper"
}, Z3 = { class: "explore-insights" }, X3 = { class: "explore-insights-subtitle" }, J3 = { class: "d-flex flex-column" }, j3 = { class: "mb-2" }, eg = { class: "pd-segment-title-details" }, tg = { class: "pd-segment-title-details" }, ng = { class: "thumbnail-card" }, ig = { class: "thumbnail-segment-cards" }, rg = { class: "segment-card-row" }, ag = {
  __name: "ExploreInsights",
  setup(o) {
    const D = Jt(), a = D.get_selectedSegment, A = G(null), k = Fe(() => A.value || {}), M = G(), N = G([]), F = G(!0), $ = G([]);
    xn(async () => {
      var E, g, I;
      if (a != null && a.segmentId)
        try {
          F.value = !0;
          const q = await si.get(
            `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${a != null && a.segmentId ? a == null ? void 0 : a.segmentId : (E = Jt.get_selectedSegment) == null ? void 0 : E.segmentId}`,
            {
              headers: {
                Authorization: `Bearer ${D.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-tenant": D.tenantId,
                "brand-id": D.brandId
              }
            }
          );
          A.value = (I = (g = q.data) == null ? void 0 : g.data) == null ? void 0 : I[0];
          const ie = A.value.charts.reduce((ae, J, pe) => {
            if (pe < 2)
              pe === 0 ? ae.push([J]) : ae[0].push(J);
            else {
              const ye = pe - 2, ge = Math.floor(ye / 3) + 1;
              ae[ge] || (ae[ge] = []), ae[ge].push(J);
            }
            return ae;
          }, []);
          N.value = A.value.segments[0], $.value = Object.values(ie), await o2(5e3), F.value = !1;
        } catch (q) {
          F.value = !1, console.error("Failed to fetch insights:", q);
        }
    }), Fe(() => {
      var E, g, I;
      return {
        chart: {
          type: "bar",
          height: 550,
          stacked: !0,
          toolbar: { show: !1 }
        },
        plotOptions: {
          bar: { horizontal: !0 }
        },
        xaxis: {
          categories: ((g = (E = a.thumbnail) == null ? void 0 : E.graph) == null ? void 0 : g.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((I = a.thumbnail) == null ? void 0 : I.title) || "",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold"
          }
        },
        legend: {
          position: "bottom"
        }
      };
    }), Fe(() => {
      var E, g, I;
      return ((I = (g = (E = a.thumbnail) == null ? void 0 : E.graph) == null ? void 0 : g.seriesCombined) == null ? void 0 : I.map((q) => ({
        name: q.name,
        data: q.data.map(Number)
      }))) || [];
    });
    const B = Fe(() => {
      var E, g, I, q;
      return ((q = (I = (g = (E = a.thumbnail) == null ? void 0 : E.segments) == null ? void 0 : g[0]) == null ? void 0 : I.segments) == null ? void 0 : q.slice(0, 4)) || [];
    });
    return Fe(() => B.value.map((I) => parseFloat(I.affinityScore || "0")).reduce((I, q) => I + q, 0).toFixed(2)), Fe(() => B.value.map((g) => parseInt(g.reach || "0", 10)).reduce((g, I) => g + I, 0).toLocaleString()), (E, g) => {
      var I, q, ie;
      return h(), y(me, null, [
        F.value ? (h(), y("div", K3, [
          H(C(s2), {
            height: "40vh",
            ref_key: "anim",
            ref: M,
            "animation-data": C(Q3),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          g[0] || (g[0] = p("h6", null, [
            je("Generating Open Intelligence Insights"),
            p("span", { class: "dot-animate" }, [
              p("span", null, "."),
              p("span", null, "."),
              p("span", null, ".")
            ])
          ], -1))
        ])) : L("", !0),
        F.value ? L("", !0) : (h(), y("div", Y3, [
          p("div", Z3, [
            p("h6", X3, [
              p("div", J3, [
                p("div", j3, [
                  g[1] || (g[1] = p("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  je(j(((I = C(a)) == null ? void 0 : I.name) || "Segment Overview"), 1)
                ]),
                p("div", eg, [
                  g[2] || (g[2] = p("strong", null, "Count:", -1)),
                  je(" " + j((q = C(a)) == null ? void 0 : q.count), 1)
                ]),
                p("div", tg, [
                  g[3] || (g[3] = p("strong", null, "Description:", -1)),
                  je(" " + j((ie = C(a)) == null ? void 0 : ie.description), 1)
                ])
              ]),
              g[4] || (g[4] = p("span", { class: "logo-wrapper" }, [
                p("span", null, "Enrichment Source:"),
                p("img", {
                  src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                  alt: "logo",
                  width: "120"
                })
              ], -1))
            ]),
            p("div", null, [
              p("div", ng, [
                p("div", ig, [
                  p("div", rg, [
                    (h(), ue(eh, {
                      key: E.index,
                      "segment-data": N.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ]),
            (h(!0), y(me, null, Ae($.value, (ae, J) => {
              var pe;
              return h(), y("div", {
                key: ((pe = ae == null ? void 0 : ae[0]) == null ? void 0 : pe.section) + J
              }, [
                ae ? (h(), ue(V3, {
                  key: 0,
                  charts: ae || [],
                  tags: k.value.tags || []
                }, null, 8, ["charts", "tags"])) : L("", !0)
              ]);
            }), 128))
          ])
        ]))
      ], 64);
    };
  }
}, sg = /* @__PURE__ */ qe(ag, [["__scopeId", "data-v-3ac815d6"]]), lg = { key: 0 }, og = { key: 1 }, ug = { class: "discovery-header" }, cg = {
  __name: "SegmentManagerModal",
  props: {
    baseUrl: {
      type: String,
      default: "https://sm-standard-segments-838902823068.europe-west2.run.app"
    },
    customSegmentUrl: {
      type: String
    },
    token: {
      type: String,
      required: !0
    },
    tenantId: {
      type: String,
      required: !0
    },
    brandId: {
      type: String,
      default: 1
    },
    selectedSegment: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "insertSegment"],
  setup(o, { emit: D }) {
    const a = D, A = Jt(), k = tr(), M = o, N = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], F = G("standard"), $ = G(N[0]), B = G(!1), E = G(null);
    function g(ae) {
      E.value = ae, B.value = !0;
    }
    function I() {
      a("close");
    }
    function q(ae) {
      a("insertSegment", ae);
    }
    function ie() {
      B.value = !1;
    }
    return xn(() => {
      A.set_brandId(M.brandId), A.set_token(M.token), A.set_tenantId(M.tenantId), A.set_baseUrl(M.baseUrl), k.set_customSegmentUrl(M.customSegmentUrl), F.value = A.get_activeTab;
    }), (ae, J) => (h(), ue(C(pl), {
      onClose: I,
      size: "large"
    }, {
      header: Tt(() => [
        B.value ? L("", !0) : (h(), y("div", lg, [
          J[1] || (J[1] = p("div", { class: "header" }, [
            p("h4", null, "Segment Manager")
          ], -1)),
          H(C(r2), {
            tabs: N,
            modelValue: $.value,
            "onUpdate:modelValue": J[0] || (J[0] = (pe) => $.value = pe),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        B.value ? (h(), y("div", og, [
          p("div", {
            onClick: ie,
            class: "navigation"
          }, [
            H(C(Dt), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            J[2] || (J[2] = p("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          p("div", ug, [
            J[3] || (J[3] = p("div", { class: "discovery-header-title" }, [
              p("h6", null, "Segment Manager:"),
              p("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ], -1)),
            H(C(st), { label: "Go to activation" })
          ])
        ])) : L("", !0)
      ]),
      body: Tt(() => [
        $.value.id === 1 && !B.value ? (h(), ue(cm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: q,
          onShowInsightsExplorer: g,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: E.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : L("", !0),
        $.value.id === 2 && !B.value ? (h(), ue(m3, {
          key: 1,
          onInsertSegment: q,
          onShowInsightsExplorer: g,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : L("", !0),
        B.value ? (h(), ue(sg, { key: 2 })) : L("", !0)
      ]),
      _: 1
    }));
  }
}, _g = /* @__PURE__ */ qe(cg, [["__scopeId", "data-v-ea1e278c"]]);
export {
  _g as BetaSegmentManagerModal,
  m3 as CustomSegments,
  sg as ExploreInsights,
  cm as StandardSegments,
  tr as useCustomSegmentStore,
  Jt as useSegmentManagerStore
};
