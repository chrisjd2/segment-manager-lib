import { ref as H, computed as $e, watch as on, createElementBlock as y, openBlock as h, normalizeClass as Ue, createElementVNode as f, createCommentVNode as F, normalizeStyle as _n, createBlock as me, unref as w, Fragment as xe, renderList as we, createTextVNode as tt, toDisplayString as ie, withKeys as $a, renderSlot as ji, createVNode as Z, onMounted as Sn, onUnmounted as nh, resolveComponent as h0, withCtx as Bt, withModifiers as ih, nextTick as c0 } from "vue";
import { CataUiInputCheckbox as bn, CataUiIcon as Ft, CataUiStatusLabel as rh, CataUiInputDate as m0, CataUiInputSelect as It, CataUiInput as Lt, CataUiButton as nt, CataUiTooltip as d0, CataUiModal as g0, CataUiTabs as Ia, CataUiSpinner as Wn, CataUiTabSwitch as ah } from "@catalyst/ui-library";
import { defineStore as x0 } from "pinia";
import li from "axios";
import En from "dayjs";
import { CataCoreUiChart as La } from "@catalyst-core/ui-library";
import { v4 as Ca } from "uuid";
import { Container as Ba, Draggable as sh } from "vue3-smooth-dnd";
import { LottieAnimation as lh } from "lottie-web-vue";
import { useIntersectionObserver as oh, promiseTimeout as uh } from "@vueuse/core";
const ch = {
  async fetch_database_model(o, D) {
    try {
      const a = await mh(o, D);
      this.set_custom_database_model(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: a.response.data || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(b);
    }
  },
  async fetch_custom_segment_settings(o) {
    var D;
    try {
      const a = await gh(o);
      this.set_custom_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((D = a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(b);
    }
  },
  async generate_ai_query(o, D) {
    var a;
    try {
      return (await yh(o, D)).data;
    } catch (b) {
      const g = {
        error: b,
        headline: "Error",
        message: ((a = b == null ? void 0 : b.response) == null ? void 0 : a.data) || "Sorry, an error occurred while generating your query."
      };
      this.set_ApiError(g);
    }
  },
  async validate_query(o) {
    var D;
    try {
      const a = await validateQuery(o);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((D = a == null ? void 0 : a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(b);
    }
  },
  async run_query(o, D) {
    var a;
    try {
      return (await xh(o, D)).count;
    } catch (b) {
      const g = {
        error: b,
        headline: "Error",
        message: ((a = b == null ? void 0 : b.response) == null ? void 0 : a.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(g);
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
}, dh = {
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
}, tr = x0("customSegmentStore", {
  state: () => ({
    customSegmentUrl: "",
    databaseModel: [],
    settings: null,
    aiGeneratedInfo: null,
    aiGeneratedQuery: null,
    aiGeneratedInfoMessage: null,
    freeFormQuery: null
  }),
  actions: ch,
  getters: dh
}), wn = "", nr = li.create(), oi = li.create();
li.create();
nr.interceptors.request.use(
  (o) => {
    const D = un();
    return o.baseURL = D.baseUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", y0(o), o;
  },
  (o) => Promise.reject(o)
);
oi.interceptors.request.use(
  (o) => {
    const D = un(), a = tr();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, y0(o), o;
  },
  (o) => Promise.reject(o)
);
const fh = () => li.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), y0 = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, f0 = (o, D) => nr.get(`${wn}/api/v1/segments/${D ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), ph = (o) => nr.get(`${wn}/api/v1/insights/${o}`, { params: queryParams }).then((D) => D.data).catch((D) => {
  throw D;
}), hh = () => nr.get(`${wn}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), mh = (o, D) => oi.get(`${wn}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), gh = () => oi.get(`${wn}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), xh = (o, D) => oi.post(`${wn}/api/v1/query/${D}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), yh = (o, D) => oi.post(`${wn}/api/v1/query/gen/${D}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), kh = {
  async fetch_appSettings() {
    try {
      const o = await fh();
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
      return await ph(this.brandId, this.tenantId);
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
        const g = {
          region: this.brief.region,
          market: this.brief.market,
          language: this.brief.language,
          channel: this.brief.channel
        };
        this.set_demographics(g);
      }
      const o = this.platform || 1;
      this.currentPage = 1;
      const D = {
        ...this.query,
        page: 1
      }, a = await f0(D, o);
      let b;
      a != null && a.data && (b = a.data.map((g) => ({
        ...g,
        status: {
          type: g.status,
          value: g.status ? g.status : "active",
          color: this.stateColors[g.status]
        }
      }))), this.set_numberOfPages(a.totalPages), this.set_segments(b);
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
      const b = await f0(D, o), g = b.data.map((M) => ({
        ...M,
        status: {
          type: M.status,
          value: M.status ? M.status : "active",
          color: this.stateColors[M.status]
        }
      }));
      this.set_numberOfPages(b.totalPages), this.add_segments(g);
    } catch (b) {
      const g = {
        error: b,
        headline: "Error",
        message: ((a = b.response) == null ? void 0 : a.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(g);
    }
  },
  async fetch_segment_settings(o) {
    var D;
    try {
      const a = await hh(o);
      this.set_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((D = a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(b);
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
}, vh = {
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
}, un = x0("segmentManagerStore", {
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
  actions: kh,
  getters: vh
}), si = Object.freeze({
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
}), Qe = (o, D) => {
  const a = o.__vccOpts || o;
  for (const [b, g] of D)
    a[b] = g;
  return a;
}, _h = ["onClick"], bh = { key: 0 }, Eh = ["onClick"], Sh = { class: "text-center" }, wh = ["title"], Ah = ["title"], Ch = ["onClick"], Th = {
  key: 0,
  class: "checkbox-container"
}, Dh = ["onKeydown", "onClick"], Ih = ["src"], Lh = {
  key: 4,
  class: "d-flex justify-content-end pr-45"
}, Bh = ["title"], Fh = {
  key: 0,
  class: "no-matches"
}, $h = {
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
    const a = D, b = o, g = H(null), M = H(!1), L = H(1), I = H([]), P = H(null), $ = H(!1), V = H({}), Y = $e(
      {
        get() {
          return b.checkedRows;
        },
        set(Q) {
          I.value = Q;
        }
      }
    ), S = $e(() => b.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${b.stickyHeader}px;` : "");
    function R() {
      b.expandable && b.rows.length > 0 && ($.value = !$.value, $.value === !1 && (V.value = {}));
    }
    function A(Q) {
      return b.expandable && Q.details.length === 1;
    }
    function q(Q) {
      V[Q] ? V[Q] = !V[Q] : this.$set(V, Q, !0);
    }
    function X(Q) {
      P.value = Q;
    }
    function Ee(Q, B, T) {
      T.key !== "actions" && T.type !== "link" && B.showInAction !== !1 && a("rowClicked", { event: Q, row: B });
    }
    function re(Q) {
      b.sortable && Q.key !== "actions" && Q.type !== "link" && (g.value === Q.key ? L.value *= -1 : (g.value = Q.key, L.value = 1), a("columnSorted", { sortColumn: g.value, sortOrder: L }));
    }
    function de(Q, B) {
      let T = "";
      if (typeof Q == "object" ? T = Q.value : T = Q, B === "datetime") {
        const W = En(new Date(T));
        return En(W).format("DD MMM YYYY");
      }
      if (B === "datetimehour") {
        const W = En(new Date(T));
        return En(W).format("DD MMM YYYY, HH:mm");
      }
      return B === "number" || (typeof T == "number" || typeof T == "string" && !Number.isNaN(Number(T))) && String(T).trim() !== "" ? (typeof T == "string" ? Number(T) : T).toLocaleString() : T;
    }
    function fe(Q) {
      return Q == null ? "" : (typeof Q == "string" ? parseInt(Q, 10) : Q).toLocaleString();
    }
    return on(M, (Q) => {
      Q === "true" || Q === !0 ? b.rows.forEach((B) => {
        !I.value.includes(B.id) && B.showInAction !== !1 && I.value.push(B.id);
      }) : I.value = [], a("rowChecked", I.value);
    }), (Q, B) => (h(), y("div", {
      class: Ue(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      f("table", {
        class: Ue(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        f("thead", null, [
          f("tr", {
            onClick: B[1] || (B[1] = (T) => R())
          }, [
            !o.collapseControls && !o.expandable ? (h(), y("th", {
              key: 0,
              class: "checkbox-container",
              style: _n(S.value)
            }, [
              o.selectable ? (h(), me(w(bn), {
                key: 0,
                modelValue: M.value,
                "onUpdate:modelValue": B[0] || (B[0] = (T) => M.value = T)
              }, null, 8, ["modelValue"])) : F("", !0)
            ], 4)) : F("", !0),
            o.expandable ? (h(), y("th", {
              key: 1,
              class: Ue(["text-center", {
                expandable: o.expandable
              }]),
              style: _n(S.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), me(w(Ft), {
                key: 0,
                class: "expand-icon",
                icon: $.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: $.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : F("", !0)
            ], 6)) : F("", !0),
            (h(!0), y(xe, null, we(o.columns, (T) => (h(), y("th", {
              style: _n(S.value),
              key: T.id,
              onClick: (W) => re(T),
              class: Ue({
                actions: T.key === "actions",
                active: g.value === T.key,
                sortable: o.sortable && T.key !== "actions" && T.type != "link",
                expandable: o.expandable
              })
            }, [
              T.key !== "actions" && T.type != "link" ? (h(), y(xe, { key: 0 }, [
                tt(ie(T.value) + " ", 1),
                o.sortable ? (h(), me(w(Ft), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : F("", !0)
              ], 64)) : F("", !0)
            ], 14, _h))), 128))
          ])
        ]),
        o.rows ? (h(), y("tbody", bh, [
          (h(!0), y(xe, null, we(o.rows, (T) => (h(), y(xe, null, [
            (h(!0), y(xe, null, we(T.details, (W) => (h(), y(xe, null, [
              o.expandable & $.value || A(T) ? (h(), y("tr", {
                class: Ue({ expandable: o.expandable && W.details.length === 1 }),
                key: W.id,
                onClick: (ke) => q(W.id)
              }, [
                f("td", Sh, [
                  W.details.length > 1 ? (h(), me(w(Ft), {
                    key: 0,
                    class: "expand-icon",
                    icon: V.value[W.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: V.value[W.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : F("", !0)
                ]),
                (h(!0), y(xe, null, we(o.columns, (ke) => (h(), y("td", {
                  style: _n({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[ke.key] ? `${o.minWidthCell[ke.key]}px` : "0px"
                  }),
                  key: ke.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: de(W[ke.key].value || W[ke.key], ke.type)
                    }, ie(de(W[ke.key], ke.type)), 9, wh)
                  ])
                ], 4))), 128))
              ], 10, Eh)) : F("", !0),
              W.details.length > 1 && V.value[W.id] ? (h(!0), y(xe, { key: 1 }, we(W.details, (ke) => (h(), y("tr", {
                class: "subrow-details",
                key: ke.id
              }, [
                B[4] || (B[4] = f("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), y(xe, null, we(o.columns, (Oe) => (h(), y("td", {
                  style: _n({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Oe.key] ? `${o.minWidthCell[Oe.key]}px` : "0px"
                  }),
                  key: Oe.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: de(ke[Oe.key], Oe.type)
                    }, ie(de(ke[Oe.key], Oe.type)), 9, Ah)
                  ])
                ], 4))), 128))
              ]))), 128)) : F("", !0)
            ], 64))), 256)),
            (o.expandable && T.details.length) > 1 || o.expandable && T.details[0].details.length > 1 || !o.expandable ? (h(), y("tr", {
              class: Ue({
                active: Y.value.includes(T.id),
                static: T.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: P.value === T._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: T.id,
              onClick: (W) => X(T._id)
            }, [
              o.collapseControls ? F("", !0) : (h(), y("td", Th, [
                o.selectable && T.showInAction !== !1 ? (h(), me(w(bn), {
                  key: 0,
                  modelValue: Y.value,
                  "onUpdate:modelValue": B[2] || (B[2] = (W) => Y.value = W),
                  val: T.id,
                  onInput: B[3] || (B[3] = (W) => Q.$emit(w(si).ROW_CHECKED, I.value))
                }, null, 8, ["modelValue", "val"])) : F("", !0)
              ])),
              (h(!0), y(xe, null, we(o.columns, (W) => (h(), y("td", {
                class: Ue({
                  actions: W.key === "actions",
                  fixedActions: o.fixedActions && W.key === "actions"
                }),
                style: _n({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[W.key] ? `${o.minWidthCell[W.key]}px` : "0px"
                }),
                key: W.key,
                onKeydown: $a((ke) => Ee(ke, T, W), ["enter"]),
                onClick: (ke) => Ee(ke, T, W)
              }, [
                T[W.key] !== void 0 && T[W.key] !== null && W.key !== "actions" ? (h(), y(xe, { key: 0 }, [
                  T[W.key].icon ? (h(), y("img", {
                    key: 0,
                    alt: "",
                    src: T[W.key].icon,
                    class: Ue(W.key)
                  }, null, 10, Ih)) : T[W.key].biicon ? (h(), y("span", {
                    key: 1,
                    class: Ue(["table-bi-icon", T[W.key].biicon]),
                    style: _n({ color: T[W.key].color })
                  }, null, 6)) : F("", !0),
                  T[W.key].type ? (h(), me(w(rh), {
                    key: 2,
                    "font-size": 12,
                    label: T[W.key].value,
                    color: T[W.key].color
                  }, null, 8, ["label", "color"])) : W.type === "link" ? ji(Q.$slots, "linkHandler", {
                    key: 3,
                    link: { row: T, columnKey: W.key }
                  }, void 0, !0) : W.type === "number" ? (h(), y("span", Lh, ie(fe(T[W.key])), 1)) : (h(), y("span", {
                    key: 5,
                    title: de(T[W.key].value || T[W.key], W.type)
                  }, ie(de(T[W.key], W.type)), 9, Bh))
                ], 64)) : F("", !0),
                W.key === "actions" ? ji(Q.$slots, "actionButton", {
                  key: 1,
                  row: T
                }, void 0, !0) : F("", !0)
              ], 46, Dh))), 128))
            ], 10, Ch)) : F("", !0)
          ], 64))), 256))
        ])) : F("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), y("p", Fh, " No matches found ")) : F("", !0)
    ], 2));
  }
}, Vh = /* @__PURE__ */ Qe($h, [["__scopeId", "data-v-bdd2a344"]]);
var ai = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, er = { exports: {} };
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
    var a, b = "4.17.21", g = 200, M = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", L = "Expected a function", I = "Invalid `variable` option passed into `_.template`", P = "__lodash_hash_undefined__", $ = 500, V = "__lodash_placeholder__", Y = 1, S = 2, R = 4, A = 1, q = 2, X = 1, Ee = 2, re = 4, de = 8, fe = 16, Q = 32, B = 64, T = 128, W = 256, ke = 512, Oe = 30, Ae = "...", it = 800, zt = 16, Ht = 1, cn = 2, dn = 3, Qt = 1 / 0, qe = 9007199254740991, ne = 17976931348623157e292, z = NaN, C = 4294967295, le = C - 1, kt = C >>> 1, At = [
      ["ary", T],
      ["bind", X],
      ["bindKey", Ee],
      ["curry", de],
      ["curryRight", fe],
      ["flip", ke],
      ["partial", Q],
      ["partialRight", B],
      ["rearg", W]
    ], vt = "[object Arguments]", $t = "[object Array]", Ie = "[object AsyncFunction]", Kt = "[object Boolean]", Yt = "[object Date]", ir = "[object DOMException]", An = "[object Error]", Vt = "[object Function]", ui = "[object GeneratorFunction]", rt = "[object Map]", Zt = "[object Number]", rr = "[object Null]", _t = "[object Object]", ci = "[object Promise]", ar = "[object Proxy]", j = "[object RegExp]", E = "[object Set]", U = "[object String]", Ce = "[object Symbol]", G = "[object Undefined]", oe = "[object WeakMap]", Xt = "[object WeakSet]", Nn = "[object ArrayBuffer]", Cn = "[object DataView]", sr = "[object Float32Array]", lr = "[object Float64Array]", or = "[object Int8Array]", ur = "[object Int16Array]", cr = "[object Int32Array]", dr = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", pr = "[object Uint16Array]", hr = "[object Uint32Array]", _0 = /\b__p \+= '';/g, b0 = /\b(__p \+=) '' \+/g, E0 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Va = /&(?:amp|lt|gt|quot|#39);/g, Pa = /[&<>"']/g, S0 = RegExp(Va.source), w0 = RegExp(Pa.source), A0 = /<%-([\s\S]+?)%>/g, C0 = /<%([\s\S]+?)%>/g, Oa = /<%=([\s\S]+?)%>/g, T0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, D0 = /^\w*$/, I0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, L0 = RegExp(mr.source), gr = /^\s+/, B0 = /\s/, F0 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, $0 = /\{\n\/\* \[wrapped with (.+)\] \*/, V0 = /,? & /, P0 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, O0 = /[()=,{}\[\]\/\s]/, R0 = /\\(\\)?/g, G0 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ra = /\w*$/, M0 = /^[-+]0x[0-9a-f]+$/i, U0 = /^0b[01]+$/i, W0 = /^\[object .+?Constructor\]$/, N0 = /^0o[0-7]+$/i, q0 = /^(?:0|[1-9]\d*)$/, z0 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, di = /($^)/, H0 = /['\n\r\u2028\u2029\\]/g, fi = "\\ud800-\\udfff", Q0 = "\\u0300-\\u036f", K0 = "\\ufe20-\\ufe2f", Y0 = "\\u20d0-\\u20ff", Ga = Q0 + K0 + Y0, Ma = "\\u2700-\\u27bf", Ua = "a-z\\xdf-\\xf6\\xf8-\\xff", Z0 = "\\xac\\xb1\\xd7\\xf7", X0 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", J0 = "\\u2000-\\u206f", j0 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Wa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Na = "\\ufe0e\\ufe0f", qa = Z0 + X0 + J0 + j0, xr = "['’]", eo = "[" + fi + "]", za = "[" + qa + "]", pi = "[" + Ga + "]", Ha = "\\d+", to = "[" + Ma + "]", Qa = "[" + Ua + "]", Ka = "[^" + fi + qa + Ha + Ma + Ua + Wa + "]", yr = "\\ud83c[\\udffb-\\udfff]", no = "(?:" + pi + "|" + yr + ")", Ya = "[^" + fi + "]", kr = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Tn = "[" + Wa + "]", Za = "\\u200d", Xa = "(?:" + Qa + "|" + Ka + ")", io = "(?:" + Tn + "|" + Ka + ")", Ja = "(?:" + xr + "(?:d|ll|m|re|s|t|ve))?", ja = "(?:" + xr + "(?:D|LL|M|RE|S|T|VE))?", es = no + "?", ts = "[" + Na + "]?", ro = "(?:" + Za + "(?:" + [Ya, kr, vr].join("|") + ")" + ts + es + ")*", ao = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", so = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ns = ts + es + ro, lo = "(?:" + [to, kr, vr].join("|") + ")" + ns, oo = "(?:" + [Ya + pi + "?", pi, kr, vr, eo].join("|") + ")", uo = RegExp(xr, "g"), co = RegExp(pi, "g"), _r = RegExp(yr + "(?=" + yr + ")|" + oo + ns, "g"), fo = RegExp([
      Tn + "?" + Qa + "+" + Ja + "(?=" + [za, Tn, "$"].join("|") + ")",
      io + "+" + ja + "(?=" + [za, Tn + Xa, "$"].join("|") + ")",
      Tn + "?" + Xa + "+" + Ja,
      Tn + "+" + ja,
      so,
      ao,
      Ha,
      lo
    ].join("|"), "g"), po = RegExp("[" + Za + fi + Ga + Na + "]"), ho = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, mo = [
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
    ], go = -1, De = {};
    De[sr] = De[lr] = De[or] = De[ur] = De[cr] = De[dr] = De[fr] = De[pr] = De[hr] = !0, De[vt] = De[$t] = De[Nn] = De[Kt] = De[Cn] = De[Yt] = De[An] = De[Vt] = De[rt] = De[Zt] = De[_t] = De[j] = De[E] = De[U] = De[oe] = !1;
    var Te = {};
    Te[vt] = Te[$t] = Te[Nn] = Te[Cn] = Te[Kt] = Te[Yt] = Te[sr] = Te[lr] = Te[or] = Te[ur] = Te[cr] = Te[rt] = Te[Zt] = Te[_t] = Te[j] = Te[E] = Te[U] = Te[Ce] = Te[dr] = Te[fr] = Te[pr] = Te[hr] = !0, Te[An] = Te[Vt] = Te[oe] = !1;
    var xo = {
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
    }, yo = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, ko = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, vo = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, _o = parseFloat, bo = parseInt, is = typeof ai == "object" && ai && ai.Object === Object && ai, Eo = typeof self == "object" && self && self.Object === Object && self, We = is || Eo || Function("return this")(), br = D && !D.nodeType && D, fn = br && !0 && o && !o.nodeType && o, rs = fn && fn.exports === br, Er = rs && is.process, dt = function() {
      try {
        var d = fn && fn.require && fn.require("util").types;
        return d || Er && Er.binding && Er.binding("util");
      } catch {
      }
    }(), as = dt && dt.isArrayBuffer, ss = dt && dt.isDate, ls = dt && dt.isMap, os = dt && dt.isRegExp, us = dt && dt.isSet, cs = dt && dt.isTypedArray;
    function at(d, x, m) {
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
    function So(d, x, m, N) {
      for (var ae = -1, ve = d == null ? 0 : d.length; ++ae < ve; ) {
        var Re = d[ae];
        x(N, Re, m(Re), d);
      }
      return N;
    }
    function ft(d, x) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N && x(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function wo(d, x) {
      for (var m = d == null ? 0 : d.length; m-- && x(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function ds(d, x) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N; )
        if (!x(d[m], m, d))
          return !1;
      return !0;
    }
    function Jt(d, x) {
      for (var m = -1, N = d == null ? 0 : d.length, ae = 0, ve = []; ++m < N; ) {
        var Re = d[m];
        x(Re, m, d) && (ve[ae++] = Re);
      }
      return ve;
    }
    function hi(d, x) {
      var m = d == null ? 0 : d.length;
      return !!m && Dn(d, x, 0) > -1;
    }
    function Sr(d, x, m) {
      for (var N = -1, ae = d == null ? 0 : d.length; ++N < ae; )
        if (m(x, d[N]))
          return !0;
      return !1;
    }
    function Le(d, x) {
      for (var m = -1, N = d == null ? 0 : d.length, ae = Array(N); ++m < N; )
        ae[m] = x(d[m], m, d);
      return ae;
    }
    function jt(d, x) {
      for (var m = -1, N = x.length, ae = d.length; ++m < N; )
        d[ae + m] = x[m];
      return d;
    }
    function wr(d, x, m, N) {
      var ae = -1, ve = d == null ? 0 : d.length;
      for (N && ve && (m = d[++ae]); ++ae < ve; )
        m = x(m, d[ae], ae, d);
      return m;
    }
    function Ao(d, x, m, N) {
      var ae = d == null ? 0 : d.length;
      for (N && ae && (m = d[--ae]); ae--; )
        m = x(m, d[ae], ae, d);
      return m;
    }
    function Ar(d, x) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N; )
        if (x(d[m], m, d))
          return !0;
      return !1;
    }
    var Co = Cr("length");
    function To(d) {
      return d.split("");
    }
    function Do(d) {
      return d.match(P0) || [];
    }
    function fs(d, x, m) {
      var N;
      return m(d, function(ae, ve, Re) {
        if (x(ae, ve, Re))
          return N = ve, !1;
      }), N;
    }
    function mi(d, x, m, N) {
      for (var ae = d.length, ve = m + (N ? 1 : -1); N ? ve-- : ++ve < ae; )
        if (x(d[ve], ve, d))
          return ve;
      return -1;
    }
    function Dn(d, x, m) {
      return x === x ? Uo(d, x, m) : mi(d, ps, m);
    }
    function Io(d, x, m, N) {
      for (var ae = m - 1, ve = d.length; ++ae < ve; )
        if (N(d[ae], x))
          return ae;
      return -1;
    }
    function ps(d) {
      return d !== d;
    }
    function hs(d, x) {
      var m = d == null ? 0 : d.length;
      return m ? Dr(d, x) / m : z;
    }
    function Cr(d) {
      return function(x) {
        return x == null ? a : x[d];
      };
    }
    function Tr(d) {
      return function(x) {
        return d == null ? a : d[x];
      };
    }
    function ms(d, x, m, N, ae) {
      return ae(d, function(ve, Re, Se) {
        m = N ? (N = !1, ve) : x(m, ve, Re, Se);
      }), m;
    }
    function Lo(d, x) {
      var m = d.length;
      for (d.sort(x); m--; )
        d[m] = d[m].value;
      return d;
    }
    function Dr(d, x) {
      for (var m, N = -1, ae = d.length; ++N < ae; ) {
        var ve = x(d[N]);
        ve !== a && (m = m === a ? ve : m + ve);
      }
      return m;
    }
    function Ir(d, x) {
      for (var m = -1, N = Array(d); ++m < d; )
        N[m] = x(m);
      return N;
    }
    function Bo(d, x) {
      return Le(x, function(m) {
        return [m, d[m]];
      });
    }
    function gs(d) {
      return d && d.slice(0, vs(d) + 1).replace(gr, "");
    }
    function st(d) {
      return function(x) {
        return d(x);
      };
    }
    function Lr(d, x) {
      return Le(x, function(m) {
        return d[m];
      });
    }
    function qn(d, x) {
      return d.has(x);
    }
    function xs(d, x) {
      for (var m = -1, N = d.length; ++m < N && Dn(x, d[m], 0) > -1; )
        ;
      return m;
    }
    function ys(d, x) {
      for (var m = d.length; m-- && Dn(x, d[m], 0) > -1; )
        ;
      return m;
    }
    function Fo(d, x) {
      for (var m = d.length, N = 0; m--; )
        d[m] === x && ++N;
      return N;
    }
    var $o = Tr(xo), Vo = Tr(yo);
    function Po(d) {
      return "\\" + vo[d];
    }
    function Oo(d, x) {
      return d == null ? a : d[x];
    }
    function In(d) {
      return po.test(d);
    }
    function Ro(d) {
      return ho.test(d);
    }
    function Go(d) {
      for (var x, m = []; !(x = d.next()).done; )
        m.push(x.value);
      return m;
    }
    function Br(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(N, ae) {
        m[++x] = [ae, N];
      }), m;
    }
    function ks(d, x) {
      return function(m) {
        return d(x(m));
      };
    }
    function en(d, x) {
      for (var m = -1, N = d.length, ae = 0, ve = []; ++m < N; ) {
        var Re = d[m];
        (Re === x || Re === V) && (d[m] = V, ve[ae++] = m);
      }
      return ve;
    }
    function gi(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(N) {
        m[++x] = N;
      }), m;
    }
    function Mo(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(N) {
        m[++x] = [N, N];
      }), m;
    }
    function Uo(d, x, m) {
      for (var N = m - 1, ae = d.length; ++N < ae; )
        if (d[N] === x)
          return N;
      return -1;
    }
    function Wo(d, x, m) {
      for (var N = m + 1; N--; )
        if (d[N] === x)
          return N;
      return N;
    }
    function Ln(d) {
      return In(d) ? qo(d) : Co(d);
    }
    function bt(d) {
      return In(d) ? zo(d) : To(d);
    }
    function vs(d) {
      for (var x = d.length; x-- && B0.test(d.charAt(x)); )
        ;
      return x;
    }
    var No = Tr(ko);
    function qo(d) {
      for (var x = _r.lastIndex = 0; _r.test(d); )
        ++x;
      return x;
    }
    function zo(d) {
      return d.match(_r) || [];
    }
    function Ho(d) {
      return d.match(fo) || [];
    }
    var Qo = function d(x) {
      x = x == null ? We : Bn.defaults(We.Object(), x, Bn.pick(We, mo));
      var m = x.Array, N = x.Date, ae = x.Error, ve = x.Function, Re = x.Math, Se = x.Object, Fr = x.RegExp, Ko = x.String, pt = x.TypeError, xi = m.prototype, Yo = ve.prototype, Fn = Se.prototype, yi = x["__core-js_shared__"], ki = Yo.toString, be = Fn.hasOwnProperty, Zo = 0, _s = function() {
        var e = /[^.]+$/.exec(yi && yi.keys && yi.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), vi = Fn.toString, Xo = ki.call(Se), Jo = We._, jo = Fr(
        "^" + ki.call(be).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), _i = rs ? x.Buffer : a, tn = x.Symbol, bi = x.Uint8Array, bs = _i ? _i.allocUnsafe : a, Ei = ks(Se.getPrototypeOf, Se), Es = Se.create, Ss = Fn.propertyIsEnumerable, Si = xi.splice, ws = tn ? tn.isConcatSpreadable : a, zn = tn ? tn.iterator : a, pn = tn ? tn.toStringTag : a, wi = function() {
        try {
          var e = yn(Se, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), eu = x.clearTimeout !== We.clearTimeout && x.clearTimeout, tu = N && N.now !== We.Date.now && N.now, nu = x.setTimeout !== We.setTimeout && x.setTimeout, Ai = Re.ceil, Ci = Re.floor, $r = Se.getOwnPropertySymbols, iu = _i ? _i.isBuffer : a, As = x.isFinite, ru = xi.join, au = ks(Se.keys, Se), Ge = Re.max, ze = Re.min, su = N.now, lu = x.parseInt, Cs = Re.random, ou = xi.reverse, Vr = yn(x, "DataView"), Hn = yn(x, "Map"), Pr = yn(x, "Promise"), $n = yn(x, "Set"), Qn = yn(x, "WeakMap"), Kn = yn(Se, "create"), Ti = Qn && new Qn(), Vn = {}, uu = kn(Vr), cu = kn(Hn), du = kn(Pr), fu = kn($n), pu = kn(Qn), Di = tn ? tn.prototype : a, Yn = Di ? Di.valueOf : a, Ts = Di ? Di.toString : a;
      function s(e) {
        if (Fe(e) && !se(e) && !(e instanceof ge)) {
          if (e instanceof ht)
            return e;
          if (be.call(e, "__wrapped__"))
            return Dl(e);
        }
        return new ht(e);
      }
      var Pn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!Be(t))
            return {};
          if (Es)
            return Es(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = a, n;
        };
      }();
      function Ii() {
      }
      function ht(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = a;
      }
      s.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: A0,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: C0,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Oa,
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
      }, s.prototype = Ii.prototype, s.prototype.constructor = s, ht.prototype = Pn(Ii.prototype), ht.prototype.constructor = ht;
      function ge(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = C, this.__views__ = [];
      }
      function hu() {
        var e = new ge(this.__wrapped__);
        return e.__actions__ = Xe(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Xe(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Xe(this.__views__), e;
      }
      function mu() {
        if (this.__filtered__) {
          var e = new ge(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function gu() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = se(e), i = t < 0, r = n ? e.length : 0, l = T1(0, r, this.__views__), u = l.start, c = l.end, p = c - u, k = i ? c : u - 1, v = this.__iteratees__, _ = v.length, O = 0, K = ze(p, this.__takeCount__);
        if (!n || !i && r == p && K == p)
          return Js(e, this.__actions__);
        var ee = [];
        e:
          for (; p-- && O < K; ) {
            k += t;
            for (var ce = -1, te = e[k]; ++ce < _; ) {
              var he = v[ce], ye = he.iteratee, ut = he.type, Ze = ye(te);
              if (ut == cn)
                te = Ze;
              else if (!Ze) {
                if (ut == Ht)
                  continue e;
                break e;
              }
            }
            ee[O++] = te;
          }
        return ee;
      }
      ge.prototype = Pn(Ii.prototype), ge.prototype.constructor = ge;
      function hn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function xu() {
        this.__data__ = Kn ? Kn(null) : {}, this.size = 0;
      }
      function yu(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function ku(e) {
        var t = this.__data__;
        if (Kn) {
          var n = t[e];
          return n === P ? a : n;
        }
        return be.call(t, e) ? t[e] : a;
      }
      function vu(e) {
        var t = this.__data__;
        return Kn ? t[e] !== a : be.call(t, e);
      }
      function _u(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Kn && t === a ? P : t, this;
      }
      hn.prototype.clear = xu, hn.prototype.delete = yu, hn.prototype.get = ku, hn.prototype.has = vu, hn.prototype.set = _u;
      function Pt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function bu() {
        this.__data__ = [], this.size = 0;
      }
      function Eu(e) {
        var t = this.__data__, n = Li(t, e);
        if (n < 0)
          return !1;
        var i = t.length - 1;
        return n == i ? t.pop() : Si.call(t, n, 1), --this.size, !0;
      }
      function Su(e) {
        var t = this.__data__, n = Li(t, e);
        return n < 0 ? a : t[n][1];
      }
      function wu(e) {
        return Li(this.__data__, e) > -1;
      }
      function Au(e, t) {
        var n = this.__data__, i = Li(n, e);
        return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
      }
      Pt.prototype.clear = bu, Pt.prototype.delete = Eu, Pt.prototype.get = Su, Pt.prototype.has = wu, Pt.prototype.set = Au;
      function Ot(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Cu() {
        this.size = 0, this.__data__ = {
          hash: new hn(),
          map: new (Hn || Pt)(),
          string: new hn()
        };
      }
      function Tu(e) {
        var t = Ni(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Du(e) {
        return Ni(this, e).get(e);
      }
      function Iu(e) {
        return Ni(this, e).has(e);
      }
      function Lu(e, t) {
        var n = Ni(this, e), i = n.size;
        return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
      }
      Ot.prototype.clear = Cu, Ot.prototype.delete = Tu, Ot.prototype.get = Du, Ot.prototype.has = Iu, Ot.prototype.set = Lu;
      function mn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Ot(); ++t < n; )
          this.add(e[t]);
      }
      function Bu(e) {
        return this.__data__.set(e, P), this;
      }
      function Fu(e) {
        return this.__data__.has(e);
      }
      mn.prototype.add = mn.prototype.push = Bu, mn.prototype.has = Fu;
      function Et(e) {
        var t = this.__data__ = new Pt(e);
        this.size = t.size;
      }
      function $u() {
        this.__data__ = new Pt(), this.size = 0;
      }
      function Vu(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function Pu(e) {
        return this.__data__.get(e);
      }
      function Ou(e) {
        return this.__data__.has(e);
      }
      function Ru(e, t) {
        var n = this.__data__;
        if (n instanceof Pt) {
          var i = n.__data__;
          if (!Hn || i.length < g - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Ot(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      Et.prototype.clear = $u, Et.prototype.delete = Vu, Et.prototype.get = Pu, Et.prototype.has = Ou, Et.prototype.set = Ru;
      function Ds(e, t) {
        var n = se(e), i = !n && vn(e), r = !n && !i && ln(e), l = !n && !i && !r && Mn(e), u = n || i || r || l, c = u ? Ir(e.length, Ko) : [], p = c.length;
        for (var k in e)
          (t || be.call(e, k)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (k == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (k == "offset" || k == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (k == "buffer" || k == "byteLength" || k == "byteOffset") || // Skip index properties.
          Ut(k, p))) && c.push(k);
        return c;
      }
      function Is(e) {
        var t = e.length;
        return t ? e[Qr(0, t - 1)] : a;
      }
      function Gu(e, t) {
        return qi(Xe(e), gn(t, 0, e.length));
      }
      function Mu(e) {
        return qi(Xe(e));
      }
      function Or(e, t, n) {
        (n !== a && !St(e[t], n) || n === a && !(t in e)) && Rt(e, t, n);
      }
      function Zn(e, t, n) {
        var i = e[t];
        (!(be.call(e, t) && St(i, n)) || n === a && !(t in e)) && Rt(e, t, n);
      }
      function Li(e, t) {
        for (var n = e.length; n--; )
          if (St(e[n][0], t))
            return n;
        return -1;
      }
      function Uu(e, t, n, i) {
        return nn(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ls(e, t) {
        return e && Tt(t, Me(t), e);
      }
      function Wu(e, t) {
        return e && Tt(t, je(t), e);
      }
      function Rt(e, t, n) {
        t == "__proto__" && wi ? wi(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }
      function Rr(e, t) {
        for (var n = -1, i = t.length, r = m(i), l = e == null; ++n < i; )
          r[n] = l ? a : ya(e, t[n]);
        return r;
      }
      function gn(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function mt(e, t, n, i, r, l) {
        var u, c = t & Y, p = t & S, k = t & R;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!Be(e))
          return e;
        var v = se(e);
        if (v) {
          if (u = I1(e), !c)
            return Xe(e, u);
        } else {
          var _ = He(e), O = _ == Vt || _ == ui;
          if (ln(e))
            return tl(e, c);
          if (_ == _t || _ == vt || O && !r) {
            if (u = p || O ? {} : vl(e), !c)
              return p ? k1(e, Wu(u, e)) : y1(e, Ls(u, e));
          } else {
            if (!Te[_])
              return r ? e : {};
            u = L1(e, _, c);
          }
        }
        l || (l = new Et());
        var K = l.get(e);
        if (K)
          return K;
        l.set(e, u), Yl(e) ? e.forEach(function(te) {
          u.add(mt(te, t, n, te, e, l));
        }) : Ql(e) && e.forEach(function(te, he) {
          u.set(he, mt(te, t, n, he, e, l));
        });
        var ee = k ? p ? ra : ia : p ? je : Me, ce = v ? a : ee(e);
        return ft(ce || e, function(te, he) {
          ce && (he = te, te = e[he]), Zn(u, he, mt(te, t, n, he, e, l));
        }), u;
      }
      function Nu(e) {
        var t = Me(e);
        return function(n) {
          return Bs(n, e, t);
        };
      }
      function Bs(e, t, n) {
        var i = n.length;
        if (e == null)
          return !i;
        for (e = Se(e); i--; ) {
          var r = n[i], l = t[r], u = e[r];
          if (u === a && !(r in e) || !l(u))
            return !1;
        }
        return !0;
      }
      function Fs(e, t, n) {
        if (typeof e != "function")
          throw new pt(L);
        return ii(function() {
          e.apply(a, n);
        }, t);
      }
      function Xn(e, t, n, i) {
        var r = -1, l = hi, u = !0, c = e.length, p = [], k = t.length;
        if (!c)
          return p;
        n && (t = Le(t, st(n))), i ? (l = Sr, u = !1) : t.length >= g && (l = qn, u = !1, t = new mn(t));
        e:
          for (; ++r < c; ) {
            var v = e[r], _ = n == null ? v : n(v);
            if (v = i || v !== 0 ? v : 0, u && _ === _) {
              for (var O = k; O--; )
                if (t[O] === _)
                  continue e;
              p.push(v);
            } else
              l(t, _, i) || p.push(v);
          }
        return p;
      }
      var nn = sl(Ct), $s = sl(Mr, !0);
      function qu(e, t) {
        var n = !0;
        return nn(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Bi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !ot(u) : n(u, c)))
            var c = u, p = l;
        }
        return p;
      }
      function zu(e, t, n, i) {
        var r = e.length;
        for (n = ue(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : ue(i), i < 0 && (i += r), i = n > i ? 0 : Xl(i); n < i; )
          e[n++] = t;
        return e;
      }
      function Vs(e, t) {
        var n = [];
        return nn(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function Ne(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = F1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? Ne(c, t - 1, n, i, r) : jt(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Gr = ll(), Ps = ll(!0);
      function Ct(e, t) {
        return e && Gr(e, t, Me);
      }
      function Mr(e, t) {
        return e && Ps(e, t, Me);
      }
      function Fi(e, t) {
        return Jt(t, function(n) {
          return Wt(e[n]);
        });
      }
      function xn(e, t) {
        t = an(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[Dt(t[n++])];
        return n && n == i ? e : a;
      }
      function Os(e, t, n) {
        var i = t(e);
        return se(e) ? i : jt(i, n(e));
      }
      function Ke(e) {
        return e == null ? e === a ? G : rr : pn && pn in Se(e) ? C1(e) : M1(e);
      }
      function Ur(e, t) {
        return e > t;
      }
      function Hu(e, t) {
        return e != null && be.call(e, t);
      }
      function Qu(e, t) {
        return e != null && t in Se(e);
      }
      function Ku(e, t, n) {
        return e >= ze(t, n) && e < Ge(t, n);
      }
      function Wr(e, t, n) {
        for (var i = n ? Sr : hi, r = e[0].length, l = e.length, u = l, c = m(l), p = 1 / 0, k = []; u--; ) {
          var v = e[u];
          u && t && (v = Le(v, st(t))), p = ze(v.length, p), c[u] = !n && (t || r >= 120 && v.length >= 120) ? new mn(u && v) : a;
        }
        v = e[0];
        var _ = -1, O = c[0];
        e:
          for (; ++_ < r && k.length < p; ) {
            var K = v[_], ee = t ? t(K) : K;
            if (K = n || K !== 0 ? K : 0, !(O ? qn(O, ee) : i(k, ee, n))) {
              for (u = l; --u; ) {
                var ce = c[u];
                if (!(ce ? qn(ce, ee) : i(e[u], ee, n)))
                  continue e;
              }
              O && O.push(ee), k.push(K);
            }
          }
        return k;
      }
      function Yu(e, t, n, i) {
        return Ct(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function Jn(e, t, n) {
        t = an(t, e), e = Sl(e, t);
        var i = e == null ? e : e[Dt(xt(t))];
        return i == null ? a : at(i, e, n);
      }
      function Rs(e) {
        return Fe(e) && Ke(e) == vt;
      }
      function Zu(e) {
        return Fe(e) && Ke(e) == Nn;
      }
      function Xu(e) {
        return Fe(e) && Ke(e) == Yt;
      }
      function jn(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Fe(e) && !Fe(t) ? e !== e && t !== t : Ju(e, t, n, i, jn, r);
      }
      function Ju(e, t, n, i, r, l) {
        var u = se(e), c = se(t), p = u ? $t : He(e), k = c ? $t : He(t);
        p = p == vt ? _t : p, k = k == vt ? _t : k;
        var v = p == _t, _ = k == _t, O = p == k;
        if (O && ln(e)) {
          if (!ln(t))
            return !1;
          u = !0, v = !1;
        }
        if (O && !v)
          return l || (l = new Et()), u || Mn(e) ? xl(e, t, n, i, r, l) : w1(e, t, p, n, i, r, l);
        if (!(n & A)) {
          var K = v && be.call(e, "__wrapped__"), ee = _ && be.call(t, "__wrapped__");
          if (K || ee) {
            var ce = K ? e.value() : e, te = ee ? t.value() : t;
            return l || (l = new Et()), r(ce, te, n, i, l);
          }
        }
        return O ? (l || (l = new Et()), A1(e, t, n, i, r, l)) : !1;
      }
      function ju(e) {
        return Fe(e) && He(e) == rt;
      }
      function Nr(e, t, n, i) {
        var r = n.length, l = r, u = !i;
        if (e == null)
          return !l;
        for (e = Se(e); r--; ) {
          var c = n[r];
          if (u && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
            return !1;
        }
        for (; ++r < l; ) {
          c = n[r];
          var p = c[0], k = e[p], v = c[1];
          if (u && c[2]) {
            if (k === a && !(p in e))
              return !1;
          } else {
            var _ = new Et();
            if (i)
              var O = i(k, v, p, e, t, _);
            if (!(O === a ? jn(v, k, A | q, i, _) : O))
              return !1;
          }
        }
        return !0;
      }
      function Gs(e) {
        if (!Be(e) || V1(e))
          return !1;
        var t = Wt(e) ? jo : W0;
        return t.test(kn(e));
      }
      function e1(e) {
        return Fe(e) && Ke(e) == j;
      }
      function t1(e) {
        return Fe(e) && He(e) == E;
      }
      function n1(e) {
        return Fe(e) && Zi(e.length) && !!De[Ke(e)];
      }
      function Ms(e) {
        return typeof e == "function" ? e : e == null ? et : typeof e == "object" ? se(e) ? Ns(e[0], e[1]) : Ws(e) : o0(e);
      }
      function qr(e) {
        if (!ni(e))
          return au(e);
        var t = [];
        for (var n in Se(e))
          be.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function i1(e) {
        if (!Be(e))
          return G1(e);
        var t = ni(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !be.call(e, i)) || n.push(i);
        return n;
      }
      function zr(e, t) {
        return e < t;
      }
      function Us(e, t) {
        var n = -1, i = Je(e) ? m(e.length) : [];
        return nn(e, function(r, l, u) {
          i[++n] = t(r, l, u);
        }), i;
      }
      function Ws(e) {
        var t = sa(e);
        return t.length == 1 && t[0][2] ? bl(t[0][0], t[0][1]) : function(n) {
          return n === e || Nr(n, e, t);
        };
      }
      function Ns(e, t) {
        return oa(e) && _l(t) ? bl(Dt(e), t) : function(n) {
          var i = ya(n, e);
          return i === a && i === t ? ka(n, e) : jn(t, i, A | q);
        };
      }
      function $i(e, t, n, i, r) {
        e !== t && Gr(t, function(l, u) {
          if (r || (r = new Et()), Be(l))
            r1(e, t, u, n, $i, i, r);
          else {
            var c = i ? i(ca(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Or(e, u, c);
          }
        }, je);
      }
      function r1(e, t, n, i, r, l, u) {
        var c = ca(e, n), p = ca(t, n), k = u.get(p);
        if (k) {
          Or(e, n, k);
          return;
        }
        var v = l ? l(c, p, n + "", e, t, u) : a, _ = v === a;
        if (_) {
          var O = se(p), K = !O && ln(p), ee = !O && !K && Mn(p);
          v = p, O || K || ee ? se(c) ? v = c : Ve(c) ? v = Xe(c) : K ? (_ = !1, v = tl(p, !0)) : ee ? (_ = !1, v = nl(p, !0)) : v = [] : ri(p) || vn(p) ? (v = c, vn(c) ? v = Jl(c) : (!Be(c) || Wt(c)) && (v = vl(p))) : _ = !1;
        }
        _ && (u.set(p, v), r(v, p, i, l, u), u.delete(p)), Or(e, n, v);
      }
      function qs(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, Ut(t, n) ? e[t] : a;
      }
      function zs(e, t, n) {
        t.length ? t = Le(t, function(l) {
          return se(l) ? function(u) {
            return xn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [et];
        var i = -1;
        t = Le(t, st(J()));
        var r = Us(e, function(l, u, c) {
          var p = Le(t, function(k) {
            return k(l);
          });
          return { criteria: p, index: ++i, value: l };
        });
        return Lo(r, function(l, u) {
          return x1(l, u, n);
        });
      }
      function a1(e, t) {
        return Hs(e, t, function(n, i) {
          return ka(e, i);
        });
      }
      function Hs(e, t, n) {
        for (var i = -1, r = t.length, l = {}; ++i < r; ) {
          var u = t[i], c = xn(e, u);
          n(c, u) && ei(l, an(u, e), c);
        }
        return l;
      }
      function s1(e) {
        return function(t) {
          return xn(t, e);
        };
      }
      function Hr(e, t, n, i) {
        var r = i ? Io : Dn, l = -1, u = t.length, c = e;
        for (e === t && (t = Xe(t)), n && (c = Le(e, st(n))); ++l < u; )
          for (var p = 0, k = t[l], v = n ? n(k) : k; (p = r(c, v, p, i)) > -1; )
            c !== e && Si.call(c, p, 1), Si.call(e, p, 1);
        return e;
      }
      function Qs(e, t) {
        for (var n = e ? t.length : 0, i = n - 1; n--; ) {
          var r = t[n];
          if (n == i || r !== l) {
            var l = r;
            Ut(r) ? Si.call(e, r, 1) : Zr(e, r);
          }
        }
        return e;
      }
      function Qr(e, t) {
        return e + Ci(Cs() * (t - e + 1));
      }
      function l1(e, t, n, i) {
        for (var r = -1, l = Ge(Ai((t - e) / (n || 1)), 0), u = m(l); l--; )
          u[i ? l : ++r] = e, e += n;
        return u;
      }
      function Kr(e, t) {
        var n = "";
        if (!e || t < 1 || t > qe)
          return n;
        do
          t % 2 && (n += e), t = Ci(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function pe(e, t) {
        return da(El(e, t, et), e + "");
      }
      function o1(e) {
        return Is(Un(e));
      }
      function u1(e, t) {
        var n = Un(e);
        return qi(n, gn(t, 0, n.length));
      }
      function ei(e, t, n, i) {
        if (!Be(e))
          return e;
        t = an(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var p = Dt(t[r]), k = n;
          if (p === "__proto__" || p === "constructor" || p === "prototype")
            return e;
          if (r != u) {
            var v = c[p];
            k = i ? i(v, p, c) : a, k === a && (k = Be(v) ? v : Ut(t[r + 1]) ? [] : {});
          }
          Zn(c, p, k), c = c[p];
        }
        return e;
      }
      var Ks = Ti ? function(e, t) {
        return Ti.set(e, t), e;
      } : et, c1 = wi ? function(e, t) {
        return wi(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: _a(t),
          writable: !0
        });
      } : et;
      function d1(e) {
        return qi(Un(e));
      }
      function gt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = m(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function f1(e, t) {
        var n;
        return nn(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function Vi(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= kt) {
          for (; i < r; ) {
            var l = i + r >>> 1, u = e[l];
            u !== null && !ot(u) && (n ? u <= t : u < t) ? i = l + 1 : r = l;
          }
          return r;
        }
        return Yr(e, t, et, n);
      }
      function Yr(e, t, n, i) {
        var r = 0, l = e == null ? 0 : e.length;
        if (l === 0)
          return 0;
        t = n(t);
        for (var u = t !== t, c = t === null, p = ot(t), k = t === a; r < l; ) {
          var v = Ci((r + l) / 2), _ = n(e[v]), O = _ !== a, K = _ === null, ee = _ === _, ce = ot(_);
          if (u)
            var te = i || ee;
          else
            k ? te = ee && (i || O) : c ? te = ee && O && (i || !K) : p ? te = ee && O && !K && (i || !ce) : K || ce ? te = !1 : te = i ? _ <= t : _ < t;
          te ? r = v + 1 : l = v;
        }
        return ze(l, le);
      }
      function Ys(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !St(c, p)) {
            var p = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Zs(e) {
        return typeof e == "number" ? e : ot(e) ? z : +e;
      }
      function lt(e) {
        if (typeof e == "string")
          return e;
        if (se(e))
          return Le(e, lt) + "";
        if (ot(e))
          return Ts ? Ts.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function rn(e, t, n) {
        var i = -1, r = hi, l = e.length, u = !0, c = [], p = c;
        if (n)
          u = !1, r = Sr;
        else if (l >= g) {
          var k = t ? null : E1(e);
          if (k)
            return gi(k);
          u = !1, r = qn, p = new mn();
        } else
          p = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var v = e[i], _ = t ? t(v) : v;
            if (v = n || v !== 0 ? v : 0, u && _ === _) {
              for (var O = p.length; O--; )
                if (p[O] === _)
                  continue e;
              t && p.push(_), c.push(v);
            } else
              r(p, _, n) || (p !== c && p.push(_), c.push(v));
          }
        return c;
      }
      function Zr(e, t) {
        return t = an(t, e), e = Sl(e, t), e == null || delete e[Dt(xt(t))];
      }
      function Xs(e, t, n, i) {
        return ei(e, t, n(xn(e, t)), i);
      }
      function Pi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? gt(e, i ? 0 : l, i ? l + 1 : r) : gt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Js(e, t) {
        var n = e;
        return n instanceof ge && (n = n.value()), wr(t, function(i, r) {
          return r.func.apply(r.thisArg, jt([i], r.args));
        }, n);
      }
      function Xr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? rn(e[0]) : [];
        for (var r = -1, l = m(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = Xn(l[r] || u, e[c], t, n));
        return rn(Ne(l, 1), t, n);
      }
      function js(e, t, n) {
        for (var i = -1, r = e.length, l = t.length, u = {}; ++i < r; ) {
          var c = i < l ? t[i] : a;
          n(u, e[i], c);
        }
        return u;
      }
      function Jr(e) {
        return Ve(e) ? e : [];
      }
      function jr(e) {
        return typeof e == "function" ? e : et;
      }
      function an(e, t) {
        return se(e) ? e : oa(e, t) ? [e] : Tl(_e(e));
      }
      var p1 = pe;
      function sn(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : gt(e, t, n);
      }
      var el = eu || function(e) {
        return We.clearTimeout(e);
      };
      function tl(e, t) {
        if (t)
          return e.slice();
        var n = e.length, i = bs ? bs(n) : new e.constructor(n);
        return e.copy(i), i;
      }
      function ea(e) {
        var t = new e.constructor(e.byteLength);
        return new bi(t).set(new bi(e)), t;
      }
      function h1(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function m1(e) {
        var t = new e.constructor(e.source, Ra.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function g1(e) {
        return Yn ? Se(Yn.call(e)) : {};
      }
      function nl(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function il(e, t) {
        if (e !== t) {
          var n = e !== a, i = e === null, r = e === e, l = ot(e), u = t !== a, c = t === null, p = t === t, k = ot(t);
          if (!c && !k && !l && e > t || l && u && p && !c && !k || i && u && p || !n && p || !r)
            return 1;
          if (!i && !l && !k && e < t || k && n && r && !i && !l || c && n && r || !u && r || !p)
            return -1;
        }
        return 0;
      }
      function x1(e, t, n) {
        for (var i = -1, r = e.criteria, l = t.criteria, u = r.length, c = n.length; ++i < u; ) {
          var p = il(r[i], l[i]);
          if (p) {
            if (i >= c)
              return p;
            var k = n[i];
            return p * (k == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function rl(e, t, n, i) {
        for (var r = -1, l = e.length, u = n.length, c = -1, p = t.length, k = Ge(l - u, 0), v = m(p + k), _ = !i; ++c < p; )
          v[c] = t[c];
        for (; ++r < u; )
          (_ || r < l) && (v[n[r]] = e[r]);
        for (; k--; )
          v[c++] = e[r++];
        return v;
      }
      function al(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, p = -1, k = t.length, v = Ge(l - c, 0), _ = m(v + k), O = !i; ++r < v; )
          _[r] = e[r];
        for (var K = r; ++p < k; )
          _[K + p] = t[p];
        for (; ++u < c; )
          (O || r < l) && (_[K + n[u]] = e[r++]);
        return _;
      }
      function Xe(e, t) {
        var n = -1, i = e.length;
        for (t || (t = m(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function Tt(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], p = i ? i(n[c], e[c], c, n, e) : a;
          p === a && (p = e[c]), r ? Rt(n, c, p) : Zn(n, c, p);
        }
        return n;
      }
      function y1(e, t) {
        return Tt(e, la(e), t);
      }
      function k1(e, t) {
        return Tt(e, yl(e), t);
      }
      function Oi(e, t) {
        return function(n, i) {
          var r = se(n) ? So : Uu, l = t ? t() : {};
          return r(n, e, J(i, 2), l);
        };
      }
      function On(e) {
        return pe(function(t, n) {
          var i = -1, r = n.length, l = r > 1 ? n[r - 1] : a, u = r > 2 ? n[2] : a;
          for (l = e.length > 3 && typeof l == "function" ? (r--, l) : a, u && Ye(n[0], n[1], u) && (l = r < 3 ? a : l, r = 1), t = Se(t); ++i < r; ) {
            var c = n[i];
            c && e(t, c, i, l);
          }
          return t;
        });
      }
      function sl(e, t) {
        return function(n, i) {
          if (n == null)
            return n;
          if (!Je(n))
            return e(n, i);
          for (var r = n.length, l = t ? r : -1, u = Se(n); (t ? l-- : ++l < r) && i(u[l], l, u) !== !1; )
            ;
          return n;
        };
      }
      function ll(e) {
        return function(t, n, i) {
          for (var r = -1, l = Se(t), u = i(t), c = u.length; c--; ) {
            var p = u[e ? c : ++r];
            if (n(l[p], p, l) === !1)
              break;
          }
          return t;
        };
      }
      function v1(e, t, n) {
        var i = t & X, r = ti(e);
        function l() {
          var u = this && this !== We && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function ol(e) {
        return function(t) {
          t = _e(t);
          var n = In(t) ? bt(t) : a, i = n ? n[0] : t.charAt(0), r = n ? sn(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function Rn(e) {
        return function(t) {
          return wr(s0(a0(t).replace(uo, "")), e, "");
        };
      }
      function ti(e) {
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
          var n = Pn(e.prototype), i = e.apply(n, t);
          return Be(i) ? i : n;
        };
      }
      function _1(e, t, n) {
        var i = ti(e);
        function r() {
          for (var l = arguments.length, u = m(l), c = l, p = Gn(r); c--; )
            u[c] = arguments[c];
          var k = l < 3 && u[0] !== p && u[l - 1] !== p ? [] : en(u, p);
          if (l -= k.length, l < n)
            return pl(
              e,
              t,
              Ri,
              r.placeholder,
              a,
              u,
              k,
              a,
              a,
              n - l
            );
          var v = this && this !== We && this instanceof r ? i : e;
          return at(v, this, u);
        }
        return r;
      }
      function ul(e) {
        return function(t, n, i) {
          var r = Se(t);
          if (!Je(t)) {
            var l = J(n, 3);
            t = Me(t), n = function(c) {
              return l(r[c], c, r);
            };
          }
          var u = e(t, n, i);
          return u > -1 ? r[l ? t[u] : u] : a;
        };
      }
      function cl(e) {
        return Mt(function(t) {
          var n = t.length, i = n, r = ht.prototype.thru;
          for (e && t.reverse(); i--; ) {
            var l = t[i];
            if (typeof l != "function")
              throw new pt(L);
            if (r && !u && Wi(l) == "wrapper")
              var u = new ht([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Wi(l), p = c == "wrapper" ? aa(l) : a;
            p && ua(p[0]) && p[1] == (T | de | Q | W) && !p[4].length && p[9] == 1 ? u = u[Wi(p[0])].apply(u, p[3]) : u = l.length == 1 && ua(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var k = arguments, v = k[0];
            if (u && k.length == 1 && se(v))
              return u.plant(v).value();
            for (var _ = 0, O = n ? t[_].apply(this, k) : v; ++_ < n; )
              O = t[_].call(this, O);
            return O;
          };
        });
      }
      function Ri(e, t, n, i, r, l, u, c, p, k) {
        var v = t & T, _ = t & X, O = t & Ee, K = t & (de | fe), ee = t & ke, ce = O ? a : ti(e);
        function te() {
          for (var he = arguments.length, ye = m(he), ut = he; ut--; )
            ye[ut] = arguments[ut];
          if (K)
            var Ze = Gn(te), ct = Fo(ye, Ze);
          if (i && (ye = rl(ye, i, r, K)), l && (ye = al(ye, l, u, K)), he -= ct, K && he < k) {
            var Pe = en(ye, Ze);
            return pl(
              e,
              t,
              Ri,
              te.placeholder,
              n,
              ye,
              Pe,
              c,
              p,
              k - he
            );
          }
          var wt = _ ? n : this, qt = O ? wt[e] : e;
          return he = ye.length, c ? ye = U1(ye, c) : ee && he > 1 && ye.reverse(), v && p < he && (ye.length = p), this && this !== We && this instanceof te && (qt = ce || ti(qt)), qt.apply(wt, ye);
        }
        return te;
      }
      function dl(e, t) {
        return function(n, i) {
          return Yu(n, e, t(i), {});
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
            typeof n == "string" || typeof i == "string" ? (n = lt(n), i = lt(i)) : (n = Zs(n), i = Zs(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ta(e) {
        return Mt(function(t) {
          return t = Le(t, st(J())), pe(function(n) {
            var i = this;
            return e(t, function(r) {
              return at(r, i, n);
            });
          });
        });
      }
      function Mi(e, t) {
        t = t === a ? " " : lt(t);
        var n = t.length;
        if (n < 2)
          return n ? Kr(t, e) : t;
        var i = Kr(t, Ai(e / Ln(t)));
        return In(t) ? sn(bt(i), 0, e).join("") : i.slice(0, e);
      }
      function b1(e, t, n, i) {
        var r = t & X, l = ti(e);
        function u() {
          for (var c = -1, p = arguments.length, k = -1, v = i.length, _ = m(v + p), O = this && this !== We && this instanceof u ? l : e; ++k < v; )
            _[k] = i[k];
          for (; p--; )
            _[k++] = arguments[++c];
          return at(O, r ? n : this, _);
        }
        return u;
      }
      function fl(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && Ye(t, n, i) && (n = i = a), t = Nt(t), n === a ? (n = t, t = 0) : n = Nt(n), i = i === a ? t < n ? 1 : -1 : Nt(i), l1(t, n, i, e);
        };
      }
      function Ui(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = yt(t), n = yt(n)), e(t, n);
        };
      }
      function pl(e, t, n, i, r, l, u, c, p, k) {
        var v = t & de, _ = v ? u : a, O = v ? a : u, K = v ? l : a, ee = v ? a : l;
        t |= v ? Q : B, t &= ~(v ? B : Q), t & re || (t &= -4);
        var ce = [
          e,
          t,
          r,
          K,
          _,
          ee,
          O,
          c,
          p,
          k
        ], te = n.apply(a, ce);
        return ua(e) && wl(te, ce), te.placeholder = i, Al(te, e, t);
      }
      function na(e) {
        var t = Re[e];
        return function(n, i) {
          if (n = yt(n), i = i == null ? 0 : ze(ue(i), 292), i && As(n)) {
            var r = (_e(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (_e(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var E1 = $n && 1 / gi(new $n([, -0]))[1] == Qt ? function(e) {
        return new $n(e);
      } : Sa;
      function hl(e) {
        return function(t) {
          var n = He(t);
          return n == rt ? Br(t) : n == E ? Mo(t) : Bo(t, e(t));
        };
      }
      function Gt(e, t, n, i, r, l, u, c) {
        var p = t & Ee;
        if (!p && typeof e != "function")
          throw new pt(L);
        var k = i ? i.length : 0;
        if (k || (t &= -97, i = r = a), u = u === a ? u : Ge(ue(u), 0), c = c === a ? c : ue(c), k -= r ? r.length : 0, t & B) {
          var v = i, _ = r;
          i = r = a;
        }
        var O = p ? a : aa(e), K = [
          e,
          t,
          n,
          i,
          r,
          v,
          _,
          l,
          u,
          c
        ];
        if (O && R1(K, O), e = K[0], t = K[1], n = K[2], i = K[3], r = K[4], c = K[9] = K[9] === a ? p ? 0 : e.length : Ge(K[9] - k, 0), !c && t & (de | fe) && (t &= -25), !t || t == X)
          var ee = v1(e, t, n);
        else
          t == de || t == fe ? ee = _1(e, t, c) : (t == Q || t == (X | Q)) && !r.length ? ee = b1(e, t, n, i) : ee = Ri.apply(a, K);
        var ce = O ? Ks : wl;
        return Al(ce(ee, K), e, t);
      }
      function ml(e, t, n, i) {
        return e === a || St(e, Fn[n]) && !be.call(i, n) ? t : e;
      }
      function gl(e, t, n, i, r, l) {
        return Be(e) && Be(t) && (l.set(t, e), $i(e, t, a, gl, l), l.delete(t)), e;
      }
      function S1(e) {
        return ri(e) ? a : e;
      }
      function xl(e, t, n, i, r, l) {
        var u = n & A, c = e.length, p = t.length;
        if (c != p && !(u && p > c))
          return !1;
        var k = l.get(e), v = l.get(t);
        if (k && v)
          return k == t && v == e;
        var _ = -1, O = !0, K = n & q ? new mn() : a;
        for (l.set(e, t), l.set(t, e); ++_ < c; ) {
          var ee = e[_], ce = t[_];
          if (i)
            var te = u ? i(ce, ee, _, t, e, l) : i(ee, ce, _, e, t, l);
          if (te !== a) {
            if (te)
              continue;
            O = !1;
            break;
          }
          if (K) {
            if (!Ar(t, function(he, ye) {
              if (!qn(K, ye) && (ee === he || r(ee, he, n, i, l)))
                return K.push(ye);
            })) {
              O = !1;
              break;
            }
          } else if (!(ee === ce || r(ee, ce, n, i, l))) {
            O = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), O;
      }
      function w1(e, t, n, i, r, l, u) {
        switch (n) {
          case Cn:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case Nn:
            return !(e.byteLength != t.byteLength || !l(new bi(e), new bi(t)));
          case Kt:
          case Yt:
          case Zt:
            return St(+e, +t);
          case An:
            return e.name == t.name && e.message == t.message;
          case j:
          case U:
            return e == t + "";
          case rt:
            var c = Br;
          case E:
            var p = i & A;
            if (c || (c = gi), e.size != t.size && !p)
              return !1;
            var k = u.get(e);
            if (k)
              return k == t;
            i |= q, u.set(e, t);
            var v = xl(c(e), c(t), i, r, l, u);
            return u.delete(e), v;
          case Ce:
            if (Yn)
              return Yn.call(e) == Yn.call(t);
        }
        return !1;
      }
      function A1(e, t, n, i, r, l) {
        var u = n & A, c = ia(e), p = c.length, k = ia(t), v = k.length;
        if (p != v && !u)
          return !1;
        for (var _ = p; _--; ) {
          var O = c[_];
          if (!(u ? O in t : be.call(t, O)))
            return !1;
        }
        var K = l.get(e), ee = l.get(t);
        if (K && ee)
          return K == t && ee == e;
        var ce = !0;
        l.set(e, t), l.set(t, e);
        for (var te = u; ++_ < p; ) {
          O = c[_];
          var he = e[O], ye = t[O];
          if (i)
            var ut = u ? i(ye, he, O, t, e, l) : i(he, ye, O, e, t, l);
          if (!(ut === a ? he === ye || r(he, ye, n, i, l) : ut)) {
            ce = !1;
            break;
          }
          te || (te = O == "constructor");
        }
        if (ce && !te) {
          var Ze = e.constructor, ct = t.constructor;
          Ze != ct && "constructor" in e && "constructor" in t && !(typeof Ze == "function" && Ze instanceof Ze && typeof ct == "function" && ct instanceof ct) && (ce = !1);
        }
        return l.delete(e), l.delete(t), ce;
      }
      function Mt(e) {
        return da(El(e, a, Bl), e + "");
      }
      function ia(e) {
        return Os(e, Me, la);
      }
      function ra(e) {
        return Os(e, je, yl);
      }
      var aa = Ti ? function(e) {
        return Ti.get(e);
      } : Sa;
      function Wi(e) {
        for (var t = e.name + "", n = Vn[t], i = be.call(Vn, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function Gn(e) {
        var t = be.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function J() {
        var e = s.iteratee || ba;
        return e = e === ba ? Ms : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Ni(e, t) {
        var n = e.__data__;
        return $1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function sa(e) {
        for (var t = Me(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, _l(r)];
        }
        return t;
      }
      function yn(e, t) {
        var n = Oo(e, t);
        return Gs(n) ? n : a;
      }
      function C1(e) {
        var t = be.call(e, pn), n = e[pn];
        try {
          e[pn] = a;
          var i = !0;
        } catch {
        }
        var r = vi.call(e);
        return i && (t ? e[pn] = n : delete e[pn]), r;
      }
      var la = $r ? function(e) {
        return e == null ? [] : (e = Se(e), Jt($r(e), function(t) {
          return Ss.call(e, t);
        }));
      } : wa, yl = $r ? function(e) {
        for (var t = []; e; )
          jt(t, la(e)), e = Ei(e);
        return t;
      } : wa, He = Ke;
      (Vr && He(new Vr(new ArrayBuffer(1))) != Cn || Hn && He(new Hn()) != rt || Pr && He(Pr.resolve()) != ci || $n && He(new $n()) != E || Qn && He(new Qn()) != oe) && (He = function(e) {
        var t = Ke(e), n = t == _t ? e.constructor : a, i = n ? kn(n) : "";
        if (i)
          switch (i) {
            case uu:
              return Cn;
            case cu:
              return rt;
            case du:
              return ci;
            case fu:
              return E;
            case pu:
              return oe;
          }
        return t;
      });
      function T1(e, t, n) {
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
              t = ze(t, e + u);
              break;
            case "takeRight":
              e = Ge(e, t - u);
              break;
          }
        }
        return { start: e, end: t };
      }
      function D1(e) {
        var t = e.match($0);
        return t ? t[1].split(V0) : [];
      }
      function kl(e, t, n) {
        t = an(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = Dt(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && Zi(r) && Ut(u, r) && (se(e) || vn(e)));
      }
      function I1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && be.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function vl(e) {
        return typeof e.constructor == "function" && !ni(e) ? Pn(Ei(e)) : {};
      }
      function L1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case Nn:
            return ea(e);
          case Kt:
          case Yt:
            return new i(+e);
          case Cn:
            return h1(e, n);
          case sr:
          case lr:
          case or:
          case ur:
          case cr:
          case dr:
          case fr:
          case pr:
          case hr:
            return nl(e, n);
          case rt:
            return new i();
          case Zt:
          case U:
            return new i(e);
          case j:
            return m1(e);
          case E:
            return new i();
          case Ce:
            return g1(e);
        }
      }
      function B1(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var i = n - 1;
        return t[i] = (n > 1 ? "& " : "") + t[i], t = t.join(n > 2 ? ", " : " "), e.replace(F0, `{
/* [wrapped with ` + t + `] */
`);
      }
      function F1(e) {
        return se(e) || vn(e) || !!(ws && e && e[ws]);
      }
      function Ut(e, t) {
        var n = typeof e;
        return t = t ?? qe, !!t && (n == "number" || n != "symbol" && q0.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ye(e, t, n) {
        if (!Be(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? Je(n) && Ut(t, n.length) : i == "string" && t in n) ? St(n[t], e) : !1;
      }
      function oa(e, t) {
        if (se(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || ot(e) ? !0 : D0.test(e) || !T0.test(e) || t != null && e in Se(t);
      }
      function $1(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function ua(e) {
        var t = Wi(e), n = s[t];
        if (typeof n != "function" || !(t in ge.prototype))
          return !1;
        if (e === n)
          return !0;
        var i = aa(n);
        return !!i && e === i[0];
      }
      function V1(e) {
        return !!_s && _s in e;
      }
      var P1 = yi ? Wt : Aa;
      function ni(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Fn;
        return e === n;
      }
      function _l(e) {
        return e === e && !Be(e);
      }
      function bl(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in Se(n));
        };
      }
      function O1(e) {
        var t = Ki(e, function(i) {
          return n.size === $ && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function R1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (X | Ee | T), u = i == T && n == de || i == T && n == W && e[7].length <= t[8] || i == (T | W) && t[7].length <= t[8] && n == de;
        if (!(l || u))
          return e;
        i & X && (e[2] = t[2], r |= n & X ? 0 : re);
        var c = t[3];
        if (c) {
          var p = e[3];
          e[3] = p ? rl(p, c, t[4]) : c, e[4] = p ? en(e[3], V) : t[4];
        }
        return c = t[5], c && (p = e[5], e[5] = p ? al(p, c, t[6]) : c, e[6] = p ? en(e[5], V) : t[6]), c = t[7], c && (e[7] = c), i & T && (e[8] = e[8] == null ? t[8] : ze(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
      }
      function G1(e) {
        var t = [];
        if (e != null)
          for (var n in Se(e))
            t.push(n);
        return t;
      }
      function M1(e) {
        return vi.call(e);
      }
      function El(e, t, n) {
        return t = Ge(t === a ? e.length - 1 : t, 0), function() {
          for (var i = arguments, r = -1, l = Ge(i.length - t, 0), u = m(l); ++r < l; )
            u[r] = i[t + r];
          r = -1;
          for (var c = m(t + 1); ++r < t; )
            c[r] = i[r];
          return c[t] = n(u), at(e, this, c);
        };
      }
      function Sl(e, t) {
        return t.length < 2 ? e : xn(e, gt(t, 0, -1));
      }
      function U1(e, t) {
        for (var n = e.length, i = ze(t.length, n), r = Xe(e); i--; ) {
          var l = t[i];
          e[i] = Ut(l, n) ? r[l] : a;
        }
        return e;
      }
      function ca(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var wl = Cl(Ks), ii = nu || function(e, t) {
        return We.setTimeout(e, t);
      }, da = Cl(c1);
      function Al(e, t, n) {
        var i = t + "";
        return da(e, B1(i, W1(D1(i), n)));
      }
      function Cl(e) {
        var t = 0, n = 0;
        return function() {
          var i = su(), r = zt - (i - n);
          if (n = i, r > 0) {
            if (++t >= it)
              return arguments[0];
          } else
            t = 0;
          return e.apply(a, arguments);
        };
      }
      function qi(e, t) {
        var n = -1, i = e.length, r = i - 1;
        for (t = t === a ? i : t; ++n < t; ) {
          var l = Qr(n, r), u = e[l];
          e[l] = e[n], e[n] = u;
        }
        return e.length = t, e;
      }
      var Tl = O1(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(I0, function(n, i, r, l) {
          t.push(r ? l.replace(R0, "$1") : i || n);
        }), t;
      });
      function Dt(e) {
        if (typeof e == "string" || ot(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function kn(e) {
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
      function W1(e, t) {
        return ft(At, function(n) {
          var i = "_." + n[0];
          t & n[1] && !hi(e, i) && e.push(i);
        }), e.sort();
      }
      function Dl(e) {
        if (e instanceof ge)
          return e.clone();
        var t = new ht(e.__wrapped__, e.__chain__);
        return t.__actions__ = Xe(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function N1(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = Ge(ue(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = m(Ai(i / t)); r < i; )
          u[l++] = gt(e, r, r += t);
        return u;
      }
      function q1(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++t < n; ) {
          var l = e[t];
          l && (r[i++] = l);
        }
        return r;
      }
      function z1() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = m(e - 1), n = arguments[0], i = e; i--; )
          t[i - 1] = arguments[i];
        return jt(se(n) ? Xe(n) : [n], Ne(t, 1));
      }
      var H1 = pe(function(e, t) {
        return Ve(e) ? Xn(e, Ne(t, 1, Ve, !0)) : [];
      }), Q1 = pe(function(e, t) {
        var n = xt(t);
        return Ve(n) && (n = a), Ve(e) ? Xn(e, Ne(t, 1, Ve, !0), J(n, 2)) : [];
      }), K1 = pe(function(e, t) {
        var n = xt(t);
        return Ve(n) && (n = a), Ve(e) ? Xn(e, Ne(t, 1, Ve, !0), a, n) : [];
      });
      function Y1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : ue(t), gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Z1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : ue(t), t = i - t, gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function X1(e, t) {
        return e && e.length ? Pi(e, J(t, 3), !0, !0) : [];
      }
      function J1(e, t) {
        return e && e.length ? Pi(e, J(t, 3), !0) : [];
      }
      function j1(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && Ye(e, t, n) && (n = 0, i = r), zu(e, t, n, i)) : [];
      }
      function Il(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : ue(n);
        return r < 0 && (r = Ge(i + r, 0)), mi(e, J(t, 3), r);
      }
      function Ll(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = ue(n), r = n < 0 ? Ge(i + r, 0) : ze(r, i - 1)), mi(e, J(t, 3), r, !0);
      }
      function Bl(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ne(e, 1) : [];
      }
      function ec(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ne(e, Qt) : [];
      }
      function tc(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : ue(t), Ne(e, t)) : [];
      }
      function nc(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = {}; ++t < n; ) {
          var r = e[t];
          i[r[0]] = r[1];
        }
        return i;
      }
      function Fl(e) {
        return e && e.length ? e[0] : a;
      }
      function ic(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : ue(n);
        return r < 0 && (r = Ge(i + r, 0)), Dn(e, t, r);
      }
      function rc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 0, -1) : [];
      }
      var ac = pe(function(e) {
        var t = Le(e, Jr);
        return t.length && t[0] === e[0] ? Wr(t) : [];
      }), sc = pe(function(e) {
        var t = xt(e), n = Le(e, Jr);
        return t === xt(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Wr(n, J(t, 2)) : [];
      }), lc = pe(function(e) {
        var t = xt(e), n = Le(e, Jr);
        return t = typeof t == "function" ? t : a, t && n.pop(), n.length && n[0] === e[0] ? Wr(n, a, t) : [];
      });
      function oc(e, t) {
        return e == null ? "" : ru.call(e, t);
      }
      function xt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : a;
      }
      function uc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i;
        return n !== a && (r = ue(n), r = r < 0 ? Ge(i + r, 0) : ze(r, i - 1)), t === t ? Wo(e, t, r) : mi(e, ps, r, !0);
      }
      function cc(e, t) {
        return e && e.length ? qs(e, ue(t)) : a;
      }
      var dc = pe($l);
      function $l(e, t) {
        return e && e.length && t && t.length ? Hr(e, t) : e;
      }
      function fc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, J(n, 2)) : e;
      }
      function pc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, a, n) : e;
      }
      var hc = Mt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Rr(e, t);
        return Qs(e, Le(t, function(r) {
          return Ut(r, n) ? +r : r;
        }).sort(il)), i;
      });
      function mc(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var i = -1, r = [], l = e.length;
        for (t = J(t, 3); ++i < l; ) {
          var u = e[i];
          t(u, i, e) && (n.push(u), r.push(i));
        }
        return Qs(e, r), n;
      }
      function fa(e) {
        return e == null ? e : ou.call(e);
      }
      function gc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (n && typeof n != "number" && Ye(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : ue(t), n = n === a ? i : ue(n)), gt(e, t, n)) : [];
      }
      function xc(e, t) {
        return Vi(e, t);
      }
      function yc(e, t, n) {
        return Yr(e, t, J(n, 2));
      }
      function kc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Vi(e, t);
          if (i < n && St(e[i], t))
            return i;
        }
        return -1;
      }
      function vc(e, t) {
        return Vi(e, t, !0);
      }
      function _c(e, t, n) {
        return Yr(e, t, J(n, 2), !0);
      }
      function bc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Vi(e, t, !0) - 1;
          if (St(e[i], t))
            return i;
        }
        return -1;
      }
      function Ec(e) {
        return e && e.length ? Ys(e) : [];
      }
      function Sc(e, t) {
        return e && e.length ? Ys(e, J(t, 2)) : [];
      }
      function wc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 1, t) : [];
      }
      function Ac(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : ue(t), gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Cc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : ue(t), t = i - t, gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Tc(e, t) {
        return e && e.length ? Pi(e, J(t, 3), !1, !0) : [];
      }
      function Dc(e, t) {
        return e && e.length ? Pi(e, J(t, 3)) : [];
      }
      var Ic = pe(function(e) {
        return rn(Ne(e, 1, Ve, !0));
      }), Lc = pe(function(e) {
        var t = xt(e);
        return Ve(t) && (t = a), rn(Ne(e, 1, Ve, !0), J(t, 2));
      }), Bc = pe(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, rn(Ne(e, 1, Ve, !0), a, t);
      });
      function Fc(e) {
        return e && e.length ? rn(e) : [];
      }
      function $c(e, t) {
        return e && e.length ? rn(e, J(t, 2)) : [];
      }
      function Vc(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? rn(e, a, t) : [];
      }
      function pa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = Jt(e, function(n) {
          if (Ve(n))
            return t = Ge(n.length, t), !0;
        }), Ir(t, function(n) {
          return Le(e, Cr(n));
        });
      }
      function Vl(e, t) {
        if (!(e && e.length))
          return [];
        var n = pa(e);
        return t == null ? n : Le(n, function(i) {
          return at(t, a, i);
        });
      }
      var Pc = pe(function(e, t) {
        return Ve(e) ? Xn(e, t) : [];
      }), Oc = pe(function(e) {
        return Xr(Jt(e, Ve));
      }), Rc = pe(function(e) {
        var t = xt(e);
        return Ve(t) && (t = a), Xr(Jt(e, Ve), J(t, 2));
      }), Gc = pe(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, Xr(Jt(e, Ve), a, t);
      }), Mc = pe(pa);
      function Uc(e, t) {
        return js(e || [], t || [], Zn);
      }
      function Wc(e, t) {
        return js(e || [], t || [], ei);
      }
      var Nc = pe(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : a;
        return n = typeof n == "function" ? (e.pop(), n) : a, Vl(e, n);
      });
      function Pl(e) {
        var t = s(e);
        return t.__chain__ = !0, t;
      }
      function qc(e, t) {
        return t(e), e;
      }
      function zi(e, t) {
        return t(e);
      }
      var zc = Mt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Rr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof ge) || !Ut(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: zi,
          args: [r],
          thisArg: a
        }), new ht(i, this.__chain__).thru(function(l) {
          return t && !l.length && l.push(a), l;
        }));
      });
      function Hc() {
        return Pl(this);
      }
      function Qc() {
        return new ht(this.value(), this.__chain__);
      }
      function Kc() {
        this.__values__ === a && (this.__values__ = Zl(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? a : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Yc() {
        return this;
      }
      function Zc(e) {
        for (var t, n = this; n instanceof Ii; ) {
          var i = Dl(n);
          i.__index__ = 0, i.__values__ = a, t ? r.__wrapped__ = i : t = i;
          var r = i;
          n = n.__wrapped__;
        }
        return r.__wrapped__ = e, t;
      }
      function Xc() {
        var e = this.__wrapped__;
        if (e instanceof ge) {
          var t = e;
          return this.__actions__.length && (t = new ge(this)), t = t.reverse(), t.__actions__.push({
            func: zi,
            args: [fa],
            thisArg: a
          }), new ht(t, this.__chain__);
        }
        return this.thru(fa);
      }
      function Jc() {
        return Js(this.__wrapped__, this.__actions__);
      }
      var jc = Oi(function(e, t, n) {
        be.call(e, n) ? ++e[n] : Rt(e, n, 1);
      });
      function ed(e, t, n) {
        var i = se(e) ? ds : qu;
        return n && Ye(e, t, n) && (t = a), i(e, J(t, 3));
      }
      function td(e, t) {
        var n = se(e) ? Jt : Vs;
        return n(e, J(t, 3));
      }
      var nd = ul(Il), id = ul(Ll);
      function rd(e, t) {
        return Ne(Hi(e, t), 1);
      }
      function ad(e, t) {
        return Ne(Hi(e, t), Qt);
      }
      function sd(e, t, n) {
        return n = n === a ? 1 : ue(n), Ne(Hi(e, t), n);
      }
      function Ol(e, t) {
        var n = se(e) ? ft : nn;
        return n(e, J(t, 3));
      }
      function Rl(e, t) {
        var n = se(e) ? wo : $s;
        return n(e, J(t, 3));
      }
      var ld = Oi(function(e, t, n) {
        be.call(e, n) ? e[n].push(t) : Rt(e, n, [t]);
      });
      function od(e, t, n, i) {
        e = Je(e) ? e : Un(e), n = n && !i ? ue(n) : 0;
        var r = e.length;
        return n < 0 && (n = Ge(r + n, 0)), Xi(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && Dn(e, t, n) > -1;
      }
      var ud = pe(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = Je(e) ? m(e.length) : [];
        return nn(e, function(u) {
          l[++i] = r ? at(t, u, n) : Jn(u, t, n);
        }), l;
      }), cd = Oi(function(e, t, n) {
        Rt(e, n, t);
      });
      function Hi(e, t) {
        var n = se(e) ? Le : Us;
        return n(e, J(t, 3));
      }
      function dd(e, t, n, i) {
        return e == null ? [] : (se(t) || (t = t == null ? [] : [t]), n = i ? a : n, se(n) || (n = n == null ? [] : [n]), zs(e, t, n));
      }
      var fd = Oi(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function pd(e, t, n) {
        var i = se(e) ? wr : ms, r = arguments.length < 3;
        return i(e, J(t, 4), n, r, nn);
      }
      function hd(e, t, n) {
        var i = se(e) ? Ao : ms, r = arguments.length < 3;
        return i(e, J(t, 4), n, r, $s);
      }
      function md(e, t) {
        var n = se(e) ? Jt : Vs;
        return n(e, Yi(J(t, 3)));
      }
      function gd(e) {
        var t = se(e) ? Is : o1;
        return t(e);
      }
      function xd(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = ue(t);
        var i = se(e) ? Gu : u1;
        return i(e, t);
      }
      function yd(e) {
        var t = se(e) ? Mu : d1;
        return t(e);
      }
      function kd(e) {
        if (e == null)
          return 0;
        if (Je(e))
          return Xi(e) ? Ln(e) : e.length;
        var t = He(e);
        return t == rt || t == E ? e.size : qr(e).length;
      }
      function vd(e, t, n) {
        var i = se(e) ? Ar : f1;
        return n && Ye(e, t, n) && (t = a), i(e, J(t, 3));
      }
      var _d = pe(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Ye(e, t[0], t[1]) ? t = [] : n > 2 && Ye(t[0], t[1], t[2]) && (t = [t[0]]), zs(e, Ne(t, 1), []);
      }), Qi = tu || function() {
        return We.Date.now();
      };
      function bd(e, t) {
        if (typeof t != "function")
          throw new pt(L);
        return e = ue(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Gl(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, Gt(e, T, a, a, a, a, t);
      }
      function Ml(e, t) {
        var n;
        if (typeof t != "function")
          throw new pt(L);
        return e = ue(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var ha = pe(function(e, t, n) {
        var i = X;
        if (n.length) {
          var r = en(n, Gn(ha));
          i |= Q;
        }
        return Gt(e, i, t, n, r);
      }), Ul = pe(function(e, t, n) {
        var i = X | Ee;
        if (n.length) {
          var r = en(n, Gn(Ul));
          i |= Q;
        }
        return Gt(t, i, e, n, r);
      });
      function Wl(e, t, n) {
        t = n ? a : t;
        var i = Gt(e, de, a, a, a, a, a, t);
        return i.placeholder = Wl.placeholder, i;
      }
      function Nl(e, t, n) {
        t = n ? a : t;
        var i = Gt(e, fe, a, a, a, a, a, t);
        return i.placeholder = Nl.placeholder, i;
      }
      function ql(e, t, n) {
        var i, r, l, u, c, p, k = 0, v = !1, _ = !1, O = !0;
        if (typeof e != "function")
          throw new pt(L);
        t = yt(t) || 0, Be(n) && (v = !!n.leading, _ = "maxWait" in n, l = _ ? Ge(yt(n.maxWait) || 0, t) : l, O = "trailing" in n ? !!n.trailing : O);
        function K(Pe) {
          var wt = i, qt = r;
          return i = r = a, k = Pe, u = e.apply(qt, wt), u;
        }
        function ee(Pe) {
          return k = Pe, c = ii(he, t), v ? K(Pe) : u;
        }
        function ce(Pe) {
          var wt = Pe - p, qt = Pe - k, u0 = t - wt;
          return _ ? ze(u0, l - qt) : u0;
        }
        function te(Pe) {
          var wt = Pe - p, qt = Pe - k;
          return p === a || wt >= t || wt < 0 || _ && qt >= l;
        }
        function he() {
          var Pe = Qi();
          if (te(Pe))
            return ye(Pe);
          c = ii(he, ce(Pe));
        }
        function ye(Pe) {
          return c = a, O && i ? K(Pe) : (i = r = a, u);
        }
        function ut() {
          c !== a && el(c), k = 0, i = p = r = c = a;
        }
        function Ze() {
          return c === a ? u : ye(Qi());
        }
        function ct() {
          var Pe = Qi(), wt = te(Pe);
          if (i = arguments, r = this, p = Pe, wt) {
            if (c === a)
              return ee(p);
            if (_)
              return el(c), c = ii(he, t), K(p);
          }
          return c === a && (c = ii(he, t)), u;
        }
        return ct.cancel = ut, ct.flush = Ze, ct;
      }
      var Ed = pe(function(e, t) {
        return Fs(e, 1, t);
      }), Sd = pe(function(e, t, n) {
        return Fs(e, yt(t) || 0, n);
      });
      function wd(e) {
        return Gt(e, ke);
      }
      function Ki(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new pt(L);
        var n = function() {
          var i = arguments, r = t ? t.apply(this, i) : i[0], l = n.cache;
          if (l.has(r))
            return l.get(r);
          var u = e.apply(this, i);
          return n.cache = l.set(r, u) || l, u;
        };
        return n.cache = new (Ki.Cache || Ot)(), n;
      }
      Ki.Cache = Ot;
      function Yi(e) {
        if (typeof e != "function")
          throw new pt(L);
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
        return Ml(2, e);
      }
      var Cd = p1(function(e, t) {
        t = t.length == 1 && se(t[0]) ? Le(t[0], st(J())) : Le(Ne(t, 1), st(J()));
        var n = t.length;
        return pe(function(i) {
          for (var r = -1, l = ze(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return at(e, this, i);
        });
      }), ma = pe(function(e, t) {
        var n = en(t, Gn(ma));
        return Gt(e, Q, a, t, n);
      }), zl = pe(function(e, t) {
        var n = en(t, Gn(zl));
        return Gt(e, B, a, t, n);
      }), Td = Mt(function(e, t) {
        return Gt(e, W, a, a, a, t);
      });
      function Dd(e, t) {
        if (typeof e != "function")
          throw new pt(L);
        return t = t === a ? t : ue(t), pe(e, t);
      }
      function Id(e, t) {
        if (typeof e != "function")
          throw new pt(L);
        return t = t == null ? 0 : Ge(ue(t), 0), pe(function(n) {
          var i = n[t], r = sn(n, 0, t);
          return i && jt(r, i), at(e, this, r);
        });
      }
      function Ld(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new pt(L);
        return Be(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), ql(e, t, {
          leading: i,
          maxWait: t,
          trailing: r
        });
      }
      function Bd(e) {
        return Gl(e, 1);
      }
      function Fd(e, t) {
        return ma(jr(t), e);
      }
      function $d() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return se(e) ? e : [e];
      }
      function Vd(e) {
        return mt(e, R);
      }
      function Pd(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, R, t);
      }
      function Od(e) {
        return mt(e, Y | R);
      }
      function Rd(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, Y | R, t);
      }
      function Gd(e, t) {
        return t == null || Bs(e, t, Me(t));
      }
      function St(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Md = Ui(Ur), Ud = Ui(function(e, t) {
        return e >= t;
      }), vn = Rs(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Rs : function(e) {
        return Fe(e) && be.call(e, "callee") && !Ss.call(e, "callee");
      }, se = m.isArray, Wd = as ? st(as) : Zu;
      function Je(e) {
        return e != null && Zi(e.length) && !Wt(e);
      }
      function Ve(e) {
        return Fe(e) && Je(e);
      }
      function Nd(e) {
        return e === !0 || e === !1 || Fe(e) && Ke(e) == Kt;
      }
      var ln = iu || Aa, qd = ss ? st(ss) : Xu;
      function zd(e) {
        return Fe(e) && e.nodeType === 1 && !ri(e);
      }
      function Hd(e) {
        if (e == null)
          return !0;
        if (Je(e) && (se(e) || typeof e == "string" || typeof e.splice == "function" || ln(e) || Mn(e) || vn(e)))
          return !e.length;
        var t = He(e);
        if (t == rt || t == E)
          return !e.size;
        if (ni(e))
          return !qr(e).length;
        for (var n in e)
          if (be.call(e, n))
            return !1;
        return !0;
      }
      function Qd(e, t) {
        return jn(e, t);
      }
      function Kd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? jn(e, t, a, n) : !!i;
      }
      function ga(e) {
        if (!Fe(e))
          return !1;
        var t = Ke(e);
        return t == An || t == ir || typeof e.message == "string" && typeof e.name == "string" && !ri(e);
      }
      function Yd(e) {
        return typeof e == "number" && As(e);
      }
      function Wt(e) {
        if (!Be(e))
          return !1;
        var t = Ke(e);
        return t == Vt || t == ui || t == Ie || t == ar;
      }
      function Hl(e) {
        return typeof e == "number" && e == ue(e);
      }
      function Zi(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= qe;
      }
      function Be(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Fe(e) {
        return e != null && typeof e == "object";
      }
      var Ql = ls ? st(ls) : ju;
      function Zd(e, t) {
        return e === t || Nr(e, t, sa(t));
      }
      function Xd(e, t, n) {
        return n = typeof n == "function" ? n : a, Nr(e, t, sa(t), n);
      }
      function Jd(e) {
        return Kl(e) && e != +e;
      }
      function jd(e) {
        if (P1(e))
          throw new ae(M);
        return Gs(e);
      }
      function ef(e) {
        return e === null;
      }
      function tf(e) {
        return e == null;
      }
      function Kl(e) {
        return typeof e == "number" || Fe(e) && Ke(e) == Zt;
      }
      function ri(e) {
        if (!Fe(e) || Ke(e) != _t)
          return !1;
        var t = Ei(e);
        if (t === null)
          return !0;
        var n = be.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && ki.call(n) == Xo;
      }
      var xa = os ? st(os) : e1;
      function nf(e) {
        return Hl(e) && e >= -9007199254740991 && e <= qe;
      }
      var Yl = us ? st(us) : t1;
      function Xi(e) {
        return typeof e == "string" || !se(e) && Fe(e) && Ke(e) == U;
      }
      function ot(e) {
        return typeof e == "symbol" || Fe(e) && Ke(e) == Ce;
      }
      var Mn = cs ? st(cs) : n1;
      function rf(e) {
        return e === a;
      }
      function af(e) {
        return Fe(e) && He(e) == oe;
      }
      function sf(e) {
        return Fe(e) && Ke(e) == Xt;
      }
      var lf = Ui(zr), of = Ui(function(e, t) {
        return e <= t;
      });
      function Zl(e) {
        if (!e)
          return [];
        if (Je(e))
          return Xi(e) ? bt(e) : Xe(e);
        if (zn && e[zn])
          return Go(e[zn]());
        var t = He(e), n = t == rt ? Br : t == E ? gi : Un;
        return n(e);
      }
      function Nt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = yt(e), e === Qt || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * ne;
        }
        return e === e ? e : 0;
      }
      function ue(e) {
        var t = Nt(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Xl(e) {
        return e ? gn(ue(e), 0, C) : 0;
      }
      function yt(e) {
        if (typeof e == "number")
          return e;
        if (ot(e))
          return z;
        if (Be(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Be(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = gs(e);
        var n = U0.test(e);
        return n || N0.test(e) ? bo(e.slice(2), n ? 2 : 8) : M0.test(e) ? z : +e;
      }
      function Jl(e) {
        return Tt(e, je(e));
      }
      function uf(e) {
        return e ? gn(ue(e), -9007199254740991, qe) : e === 0 ? e : 0;
      }
      function _e(e) {
        return e == null ? "" : lt(e);
      }
      var cf = On(function(e, t) {
        if (ni(t) || Je(t)) {
          Tt(t, Me(t), e);
          return;
        }
        for (var n in t)
          be.call(t, n) && Zn(e, n, t[n]);
      }), jl = On(function(e, t) {
        Tt(t, je(t), e);
      }), Ji = On(function(e, t, n, i) {
        Tt(t, je(t), e, i);
      }), df = On(function(e, t, n, i) {
        Tt(t, Me(t), e, i);
      }), ff = Mt(Rr);
      function pf(e, t) {
        var n = Pn(e);
        return t == null ? n : Ls(n, t);
      }
      var hf = pe(function(e, t) {
        e = Se(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && Ye(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = je(l), c = -1, p = u.length; ++c < p; ) {
            var k = u[c], v = e[k];
            (v === a || St(v, Fn[k]) && !be.call(e, k)) && (e[k] = l[k]);
          }
        return e;
      }), mf = pe(function(e) {
        return e.push(a, gl), at(e0, a, e);
      });
      function gf(e, t) {
        return fs(e, J(t, 3), Ct);
      }
      function xf(e, t) {
        return fs(e, J(t, 3), Mr);
      }
      function yf(e, t) {
        return e == null ? e : Gr(e, J(t, 3), je);
      }
      function kf(e, t) {
        return e == null ? e : Ps(e, J(t, 3), je);
      }
      function vf(e, t) {
        return e && Ct(e, J(t, 3));
      }
      function _f(e, t) {
        return e && Mr(e, J(t, 3));
      }
      function bf(e) {
        return e == null ? [] : Fi(e, Me(e));
      }
      function Ef(e) {
        return e == null ? [] : Fi(e, je(e));
      }
      function ya(e, t, n) {
        var i = e == null ? a : xn(e, t);
        return i === a ? n : i;
      }
      function Sf(e, t) {
        return e != null && kl(e, t, Hu);
      }
      function ka(e, t) {
        return e != null && kl(e, t, Qu);
      }
      var wf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), e[t] = n;
      }, _a(et)), Af = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), be.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, J), Cf = pe(Jn);
      function Me(e) {
        return Je(e) ? Ds(e) : qr(e);
      }
      function je(e) {
        return Je(e) ? Ds(e, !0) : i1(e);
      }
      function Tf(e, t) {
        var n = {};
        return t = J(t, 3), Ct(e, function(i, r, l) {
          Rt(n, t(i, r, l), i);
        }), n;
      }
      function Df(e, t) {
        var n = {};
        return t = J(t, 3), Ct(e, function(i, r, l) {
          Rt(n, r, t(i, r, l));
        }), n;
      }
      var If = On(function(e, t, n) {
        $i(e, t, n);
      }), e0 = On(function(e, t, n, i) {
        $i(e, t, n, i);
      }), Lf = Mt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Le(t, function(l) {
          return l = an(l, e), i || (i = l.length > 1), l;
        }), Tt(e, ra(e), n), i && (n = mt(n, Y | S | R, S1));
        for (var r = t.length; r--; )
          Zr(n, t[r]);
        return n;
      });
      function Bf(e, t) {
        return t0(e, Yi(J(t)));
      }
      var Ff = Mt(function(e, t) {
        return e == null ? {} : a1(e, t);
      });
      function t0(e, t) {
        if (e == null)
          return {};
        var n = Le(ra(e), function(i) {
          return [i];
        });
        return t = J(t), Hs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function $f(e, t, n) {
        t = an(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[Dt(t[i])];
          l === a && (i = r, l = n), e = Wt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Vf(e, t, n) {
        return e == null ? e : ei(e, t, n);
      }
      function Pf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : ei(e, t, n, i);
      }
      var n0 = hl(Me), i0 = hl(je);
      function Of(e, t, n) {
        var i = se(e), r = i || ln(e) || Mn(e);
        if (t = J(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : Be(e) ? n = Wt(l) ? Pn(Ei(e)) : {} : n = {};
        }
        return (r ? ft : Ct)(e, function(u, c, p) {
          return t(n, u, c, p);
        }), n;
      }
      function Rf(e, t) {
        return e == null ? !0 : Zr(e, t);
      }
      function Gf(e, t, n) {
        return e == null ? e : Xs(e, t, jr(n));
      }
      function Mf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : Xs(e, t, jr(n), i);
      }
      function Un(e) {
        return e == null ? [] : Lr(e, Me(e));
      }
      function Uf(e) {
        return e == null ? [] : Lr(e, je(e));
      }
      function Wf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = yt(n), n = n === n ? n : 0), t !== a && (t = yt(t), t = t === t ? t : 0), gn(yt(e), t, n);
      }
      function Nf(e, t, n) {
        return t = Nt(t), n === a ? (n = t, t = 0) : n = Nt(n), e = yt(e), Ku(e, t, n);
      }
      function qf(e, t, n) {
        if (n && typeof n != "boolean" && Ye(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Nt(e), t === a ? (t = e, e = 0) : t = Nt(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = Cs();
          return ze(e + r * (t - e + _o("1e-" + ((r + "").length - 1))), t);
        }
        return Qr(e, t);
      }
      var zf = Rn(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? r0(t) : t);
      });
      function r0(e) {
        return va(_e(e).toLowerCase());
      }
      function a0(e) {
        return e = _e(e), e && e.replace(z0, $o).replace(co, "");
      }
      function Hf(e, t, n) {
        e = _e(e), t = lt(t);
        var i = e.length;
        n = n === a ? i : gn(ue(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Qf(e) {
        return e = _e(e), e && w0.test(e) ? e.replace(Pa, Vo) : e;
      }
      function Kf(e) {
        return e = _e(e), e && L0.test(e) ? e.replace(mr, "\\$&") : e;
      }
      var Yf = Rn(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), Zf = Rn(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), Xf = ol("toLowerCase");
      function Jf(e, t, n) {
        e = _e(e), t = ue(t);
        var i = t ? Ln(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return Mi(Ci(r), n) + e + Mi(Ai(r), n);
      }
      function jf(e, t, n) {
        e = _e(e), t = ue(t);
        var i = t ? Ln(e) : 0;
        return t && i < t ? e + Mi(t - i, n) : e;
      }
      function ep(e, t, n) {
        e = _e(e), t = ue(t);
        var i = t ? Ln(e) : 0;
        return t && i < t ? Mi(t - i, n) + e : e;
      }
      function tp(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), lu(_e(e).replace(gr, ""), t || 0);
      }
      function np(e, t, n) {
        return (n ? Ye(e, t, n) : t === a) ? t = 1 : t = ue(t), Kr(_e(e), t);
      }
      function ip() {
        var e = arguments, t = _e(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var rp = Rn(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function ap(e, t, n) {
        return n && typeof n != "number" && Ye(e, t, n) && (t = n = a), n = n === a ? C : n >>> 0, n ? (e = _e(e), e && (typeof t == "string" || t != null && !xa(t)) && (t = lt(t), !t && In(e)) ? sn(bt(e), 0, n) : e.split(t, n)) : [];
      }
      var sp = Rn(function(e, t, n) {
        return e + (n ? " " : "") + va(t);
      });
      function lp(e, t, n) {
        return e = _e(e), n = n == null ? 0 : gn(ue(n), 0, e.length), t = lt(t), e.slice(n, n + t.length) == t;
      }
      function op(e, t, n) {
        var i = s.templateSettings;
        n && Ye(e, t, n) && (t = a), e = _e(e), t = Ji({}, t, i, ml);
        var r = Ji({}, t.imports, i.imports, ml), l = Me(r), u = Lr(r, l), c, p, k = 0, v = t.interpolate || di, _ = "__p += '", O = Fr(
          (t.escape || di).source + "|" + v.source + "|" + (v === Oa ? G0 : di).source + "|" + (t.evaluate || di).source + "|$",
          "g"
        ), K = "//# sourceURL=" + (be.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++go + "]") + `
`;
        e.replace(O, function(te, he, ye, ut, Ze, ct) {
          return ye || (ye = ut), _ += e.slice(k, ct).replace(H0, Po), he && (c = !0, _ += `' +
__e(` + he + `) +
'`), Ze && (p = !0, _ += `';
` + Ze + `;
__p += '`), ye && (_ += `' +
((__t = (` + ye + `)) == null ? '' : __t) +
'`), k = ct + te.length, te;
        }), _ += `';
`;
        var ee = be.call(t, "variable") && t.variable;
        if (!ee)
          _ = `with (obj) {
` + _ + `
}
`;
        else if (O0.test(ee))
          throw new ae(I);
        _ = (p ? _.replace(_0, "") : _).replace(b0, "$1").replace(E0, "$1;"), _ = "function(" + (ee || "obj") + `) {
` + (ee ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (p ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + _ + `return __p
}`;
        var ce = l0(function() {
          return ve(l, K + "return " + _).apply(a, u);
        });
        if (ce.source = _, ga(ce))
          throw ce;
        return ce;
      }
      function up(e) {
        return _e(e).toLowerCase();
      }
      function cp(e) {
        return _e(e).toUpperCase();
      }
      function dp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return gs(e);
        if (!e || !(t = lt(t)))
          return e;
        var i = bt(e), r = bt(t), l = xs(i, r), u = ys(i, r) + 1;
        return sn(i, l, u).join("");
      }
      function fp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.slice(0, vs(e) + 1);
        if (!e || !(t = lt(t)))
          return e;
        var i = bt(e), r = ys(i, bt(t)) + 1;
        return sn(i, 0, r).join("");
      }
      function pp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.replace(gr, "");
        if (!e || !(t = lt(t)))
          return e;
        var i = bt(e), r = xs(i, bt(t));
        return sn(i, r).join("");
      }
      function hp(e, t) {
        var n = Oe, i = Ae;
        if (Be(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? ue(t.length) : n, i = "omission" in t ? lt(t.omission) : i;
        }
        e = _e(e);
        var l = e.length;
        if (In(e)) {
          var u = bt(e);
          l = u.length;
        }
        if (n >= l)
          return e;
        var c = n - Ln(i);
        if (c < 1)
          return i;
        var p = u ? sn(u, 0, c).join("") : e.slice(0, c);
        if (r === a)
          return p + i;
        if (u && (c += p.length - c), xa(r)) {
          if (e.slice(c).search(r)) {
            var k, v = p;
            for (r.global || (r = Fr(r.source, _e(Ra.exec(r)) + "g")), r.lastIndex = 0; k = r.exec(v); )
              var _ = k.index;
            p = p.slice(0, _ === a ? c : _);
          }
        } else if (e.indexOf(lt(r), c) != c) {
          var O = p.lastIndexOf(r);
          O > -1 && (p = p.slice(0, O));
        }
        return p + i;
      }
      function mp(e) {
        return e = _e(e), e && S0.test(e) ? e.replace(Va, No) : e;
      }
      var gp = Rn(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), va = ol("toUpperCase");
      function s0(e, t, n) {
        return e = _e(e), t = n ? a : t, t === a ? Ro(e) ? Ho(e) : Do(e) : e.match(t) || [];
      }
      var l0 = pe(function(e, t) {
        try {
          return at(e, a, t);
        } catch (n) {
          return ga(n) ? n : new ae(n);
        }
      }), xp = Mt(function(e, t) {
        return ft(t, function(n) {
          n = Dt(n), Rt(e, n, ha(e[n], e));
        }), e;
      });
      function yp(e) {
        var t = e == null ? 0 : e.length, n = J();
        return e = t ? Le(e, function(i) {
          if (typeof i[1] != "function")
            throw new pt(L);
          return [n(i[0]), i[1]];
        }) : [], pe(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (at(l[0], this, i))
              return at(l[1], this, i);
          }
        });
      }
      function kp(e) {
        return Nu(mt(e, Y));
      }
      function _a(e) {
        return function() {
          return e;
        };
      }
      function vp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var _p = cl(), bp = cl(!0);
      function et(e) {
        return e;
      }
      function ba(e) {
        return Ms(typeof e == "function" ? e : mt(e, Y));
      }
      function Ep(e) {
        return Ws(mt(e, Y));
      }
      function Sp(e, t) {
        return Ns(e, mt(t, Y));
      }
      var wp = pe(function(e, t) {
        return function(n) {
          return Jn(n, e, t);
        };
      }), Ap = pe(function(e, t) {
        return function(n) {
          return Jn(e, n, t);
        };
      });
      function Ea(e, t, n) {
        var i = Me(t), r = Fi(t, i);
        n == null && !(Be(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Fi(t, Me(t)));
        var l = !(Be(n) && "chain" in n) || !!n.chain, u = Wt(e);
        return ft(r, function(c) {
          var p = t[c];
          e[c] = p, u && (e.prototype[c] = function() {
            var k = this.__chain__;
            if (l || k) {
              var v = e(this.__wrapped__), _ = v.__actions__ = Xe(this.__actions__);
              return _.push({ func: p, args: arguments, thisArg: e }), v.__chain__ = k, v;
            }
            return p.apply(e, jt([this.value()], arguments));
          });
        }), e;
      }
      function Cp() {
        return We._ === this && (We._ = Jo), this;
      }
      function Sa() {
      }
      function Tp(e) {
        return e = ue(e), pe(function(t) {
          return qs(t, e);
        });
      }
      var Dp = ta(Le), Ip = ta(ds), Lp = ta(Ar);
      function o0(e) {
        return oa(e) ? Cr(Dt(e)) : s1(e);
      }
      function Bp(e) {
        return function(t) {
          return e == null ? a : xn(e, t);
        };
      }
      var Fp = fl(), $p = fl(!0);
      function wa() {
        return [];
      }
      function Aa() {
        return !1;
      }
      function Vp() {
        return {};
      }
      function Pp() {
        return "";
      }
      function Op() {
        return !0;
      }
      function Rp(e, t) {
        if (e = ue(e), e < 1 || e > qe)
          return [];
        var n = C, i = ze(e, C);
        t = J(t), e -= C;
        for (var r = Ir(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Gp(e) {
        return se(e) ? Le(e, Dt) : ot(e) ? [e] : Xe(Tl(_e(e)));
      }
      function Mp(e) {
        var t = ++Zo;
        return _e(e) + t;
      }
      var Up = Gi(function(e, t) {
        return e + t;
      }, 0), Wp = na("ceil"), Np = Gi(function(e, t) {
        return e / t;
      }, 1), qp = na("floor");
      function zp(e) {
        return e && e.length ? Bi(e, et, Ur) : a;
      }
      function Hp(e, t) {
        return e && e.length ? Bi(e, J(t, 2), Ur) : a;
      }
      function Qp(e) {
        return hs(e, et);
      }
      function Kp(e, t) {
        return hs(e, J(t, 2));
      }
      function Yp(e) {
        return e && e.length ? Bi(e, et, zr) : a;
      }
      function Zp(e, t) {
        return e && e.length ? Bi(e, J(t, 2), zr) : a;
      }
      var Xp = Gi(function(e, t) {
        return e * t;
      }, 1), Jp = na("round"), jp = Gi(function(e, t) {
        return e - t;
      }, 0);
      function eh(e) {
        return e && e.length ? Dr(e, et) : 0;
      }
      function th(e, t) {
        return e && e.length ? Dr(e, J(t, 2)) : 0;
      }
      return s.after = bd, s.ary = Gl, s.assign = cf, s.assignIn = jl, s.assignInWith = Ji, s.assignWith = df, s.at = ff, s.before = Ml, s.bind = ha, s.bindAll = xp, s.bindKey = Ul, s.castArray = $d, s.chain = Pl, s.chunk = N1, s.compact = q1, s.concat = z1, s.cond = yp, s.conforms = kp, s.constant = _a, s.countBy = jc, s.create = pf, s.curry = Wl, s.curryRight = Nl, s.debounce = ql, s.defaults = hf, s.defaultsDeep = mf, s.defer = Ed, s.delay = Sd, s.difference = H1, s.differenceBy = Q1, s.differenceWith = K1, s.drop = Y1, s.dropRight = Z1, s.dropRightWhile = X1, s.dropWhile = J1, s.fill = j1, s.filter = td, s.flatMap = rd, s.flatMapDeep = ad, s.flatMapDepth = sd, s.flatten = Bl, s.flattenDeep = ec, s.flattenDepth = tc, s.flip = wd, s.flow = _p, s.flowRight = bp, s.fromPairs = nc, s.functions = bf, s.functionsIn = Ef, s.groupBy = ld, s.initial = rc, s.intersection = ac, s.intersectionBy = sc, s.intersectionWith = lc, s.invert = wf, s.invertBy = Af, s.invokeMap = ud, s.iteratee = ba, s.keyBy = cd, s.keys = Me, s.keysIn = je, s.map = Hi, s.mapKeys = Tf, s.mapValues = Df, s.matches = Ep, s.matchesProperty = Sp, s.memoize = Ki, s.merge = If, s.mergeWith = e0, s.method = wp, s.methodOf = Ap, s.mixin = Ea, s.negate = Yi, s.nthArg = Tp, s.omit = Lf, s.omitBy = Bf, s.once = Ad, s.orderBy = dd, s.over = Dp, s.overArgs = Cd, s.overEvery = Ip, s.overSome = Lp, s.partial = ma, s.partialRight = zl, s.partition = fd, s.pick = Ff, s.pickBy = t0, s.property = o0, s.propertyOf = Bp, s.pull = dc, s.pullAll = $l, s.pullAllBy = fc, s.pullAllWith = pc, s.pullAt = hc, s.range = Fp, s.rangeRight = $p, s.rearg = Td, s.reject = md, s.remove = mc, s.rest = Dd, s.reverse = fa, s.sampleSize = xd, s.set = Vf, s.setWith = Pf, s.shuffle = yd, s.slice = gc, s.sortBy = _d, s.sortedUniq = Ec, s.sortedUniqBy = Sc, s.split = ap, s.spread = Id, s.tail = wc, s.take = Ac, s.takeRight = Cc, s.takeRightWhile = Tc, s.takeWhile = Dc, s.tap = qc, s.throttle = Ld, s.thru = zi, s.toArray = Zl, s.toPairs = n0, s.toPairsIn = i0, s.toPath = Gp, s.toPlainObject = Jl, s.transform = Of, s.unary = Bd, s.union = Ic, s.unionBy = Lc, s.unionWith = Bc, s.uniq = Fc, s.uniqBy = $c, s.uniqWith = Vc, s.unset = Rf, s.unzip = pa, s.unzipWith = Vl, s.update = Gf, s.updateWith = Mf, s.values = Un, s.valuesIn = Uf, s.without = Pc, s.words = s0, s.wrap = Fd, s.xor = Oc, s.xorBy = Rc, s.xorWith = Gc, s.zip = Mc, s.zipObject = Uc, s.zipObjectDeep = Wc, s.zipWith = Nc, s.entries = n0, s.entriesIn = i0, s.extend = jl, s.extendWith = Ji, Ea(s, s), s.add = Up, s.attempt = l0, s.camelCase = zf, s.capitalize = r0, s.ceil = Wp, s.clamp = Wf, s.clone = Vd, s.cloneDeep = Od, s.cloneDeepWith = Rd, s.cloneWith = Pd, s.conformsTo = Gd, s.deburr = a0, s.defaultTo = vp, s.divide = Np, s.endsWith = Hf, s.eq = St, s.escape = Qf, s.escapeRegExp = Kf, s.every = ed, s.find = nd, s.findIndex = Il, s.findKey = gf, s.findLast = id, s.findLastIndex = Ll, s.findLastKey = xf, s.floor = qp, s.forEach = Ol, s.forEachRight = Rl, s.forIn = yf, s.forInRight = kf, s.forOwn = vf, s.forOwnRight = _f, s.get = ya, s.gt = Md, s.gte = Ud, s.has = Sf, s.hasIn = ka, s.head = Fl, s.identity = et, s.includes = od, s.indexOf = ic, s.inRange = Nf, s.invoke = Cf, s.isArguments = vn, s.isArray = se, s.isArrayBuffer = Wd, s.isArrayLike = Je, s.isArrayLikeObject = Ve, s.isBoolean = Nd, s.isBuffer = ln, s.isDate = qd, s.isElement = zd, s.isEmpty = Hd, s.isEqual = Qd, s.isEqualWith = Kd, s.isError = ga, s.isFinite = Yd, s.isFunction = Wt, s.isInteger = Hl, s.isLength = Zi, s.isMap = Ql, s.isMatch = Zd, s.isMatchWith = Xd, s.isNaN = Jd, s.isNative = jd, s.isNil = tf, s.isNull = ef, s.isNumber = Kl, s.isObject = Be, s.isObjectLike = Fe, s.isPlainObject = ri, s.isRegExp = xa, s.isSafeInteger = nf, s.isSet = Yl, s.isString = Xi, s.isSymbol = ot, s.isTypedArray = Mn, s.isUndefined = rf, s.isWeakMap = af, s.isWeakSet = sf, s.join = oc, s.kebabCase = Yf, s.last = xt, s.lastIndexOf = uc, s.lowerCase = Zf, s.lowerFirst = Xf, s.lt = lf, s.lte = of, s.max = zp, s.maxBy = Hp, s.mean = Qp, s.meanBy = Kp, s.min = Yp, s.minBy = Zp, s.stubArray = wa, s.stubFalse = Aa, s.stubObject = Vp, s.stubString = Pp, s.stubTrue = Op, s.multiply = Xp, s.nth = cc, s.noConflict = Cp, s.noop = Sa, s.now = Qi, s.pad = Jf, s.padEnd = jf, s.padStart = ep, s.parseInt = tp, s.random = qf, s.reduce = pd, s.reduceRight = hd, s.repeat = np, s.replace = ip, s.result = $f, s.round = Jp, s.runInContext = d, s.sample = gd, s.size = kd, s.snakeCase = rp, s.some = vd, s.sortedIndex = xc, s.sortedIndexBy = yc, s.sortedIndexOf = kc, s.sortedLastIndex = vc, s.sortedLastIndexBy = _c, s.sortedLastIndexOf = bc, s.startCase = sp, s.startsWith = lp, s.subtract = jp, s.sum = eh, s.sumBy = th, s.template = op, s.times = Rp, s.toFinite = Nt, s.toInteger = ue, s.toLength = Xl, s.toLower = up, s.toNumber = yt, s.toSafeInteger = uf, s.toString = _e, s.toUpper = cp, s.trim = dp, s.trimEnd = fp, s.trimStart = pp, s.truncate = hp, s.unescape = mp, s.uniqueId = Mp, s.upperCase = gp, s.upperFirst = va, s.each = Ol, s.eachRight = Rl, s.first = Fl, Ea(s, function() {
        var e = {};
        return Ct(s, function(t, n) {
          be.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = b, ft(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), ft(["drop", "take"], function(e, t) {
        ge.prototype[e] = function(n) {
          n = n === a ? 1 : Ge(ue(n), 0);
          var i = this.__filtered__ && !t ? new ge(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = ze(n, i.__takeCount__) : i.__views__.push({
            size: ze(n, C),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, ge.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), ft(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == Ht || n == dn;
        ge.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: J(r, 3),
            type: n
          }), l.__filtered__ = l.__filtered__ || i, l;
        };
      }), ft(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        ge.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), ft(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        ge.prototype[e] = function() {
          return this.__filtered__ ? new ge(this) : this[n](1);
        };
      }), ge.prototype.compact = function() {
        return this.filter(et);
      }, ge.prototype.find = function(e) {
        return this.filter(e).head();
      }, ge.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, ge.prototype.invokeMap = pe(function(e, t) {
        return typeof e == "function" ? new ge(this) : this.map(function(n) {
          return Jn(n, e, t);
        });
      }), ge.prototype.reject = function(e) {
        return this.filter(Yi(J(e)));
      }, ge.prototype.slice = function(e, t) {
        e = ue(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new ge(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = ue(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, ge.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, ge.prototype.toArray = function() {
        return this.take(C);
      }, Ct(ge.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, p = u instanceof ge, k = c[0], v = p || se(u), _ = function(he) {
            var ye = r.apply(s, jt([he], c));
            return i && O ? ye[0] : ye;
          };
          v && n && typeof k == "function" && k.length != 1 && (p = v = !1);
          var O = this.__chain__, K = !!this.__actions__.length, ee = l && !O, ce = p && !K;
          if (!l && v) {
            u = ce ? u : new ge(this);
            var te = e.apply(u, c);
            return te.__actions__.push({ func: zi, args: [_], thisArg: a }), new ht(te, O);
          }
          return ee && ce ? e.apply(this, c) : (te = this.thru(_), ee ? i ? te.value()[0] : te.value() : te);
        });
      }), ft(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = xi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
        s.prototype[e] = function() {
          var r = arguments;
          if (i && !this.__chain__) {
            var l = this.value();
            return t.apply(se(l) ? l : [], r);
          }
          return this[n](function(u) {
            return t.apply(se(u) ? u : [], r);
          });
        };
      }), Ct(ge.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          be.call(Vn, i) || (Vn[i] = []), Vn[i].push({ name: t, func: n });
        }
      }), Vn[Ri(a, Ee).name] = [{
        name: "wrapper",
        func: a
      }], ge.prototype.clone = hu, ge.prototype.reverse = mu, ge.prototype.value = gu, s.prototype.at = zc, s.prototype.chain = Hc, s.prototype.commit = Qc, s.prototype.next = Kc, s.prototype.plant = Zc, s.prototype.reverse = Xc, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = Jc, s.prototype.first = s.prototype.head, zn && (s.prototype[zn] = Yc), s;
    }, Bn = Qo();
    fn ? ((fn.exports = Bn)._ = Bn, br._ = Bn) : We._ = Bn;
  }).call(ai);
})(er, er.exports);
var Ph = er.exports;
const Oh = { class: "d-flex align-items-center mb-30" }, Rh = {
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
    si.FILTER_CHANGE,
    si.CLEAR_FILTERS
  ],
  setup(o, { emit: D }) {
    const a = D, b = o, g = $e(() => b.filters ? b.filters.filter((P) => P.model) : []), M = $e(() => {
      const P = {};
      return g.value.forEach(($) => {
        P[$.key] = $.model;
      }), P;
    }), L = Ph.debounce(() => {
      a(si.FILTER_CHANGE, M);
    }, 800);
    function I() {
      a(si.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (P, $) => (h(), y("div", {
      class: Ue(["base-table-filters", { inactive: o.inactive }])
    }, [
      f("h6", Oh, [
        Z(w(Ft), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        $[1] || ($[1] = tt(" Filters "))
      ]),
      ji(P.$slots, "customFields", {}, void 0, !0),
      (h(!0), y(xe, null, we(o.filters, (V, Y) => (h(), y(xe, null, [
        V.type === "datetime" || V.type === "datetimehour" ? (h(), me(w(m0), {
          class: "filter-elm",
          key: `${o.prefix}${V.key}`,
          label: V.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (S) => o.filters[Y].model = S,
          onInput: w(L)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : V.dataSource ? (h(), me(w(It), {
          class: "filter-elm",
          key: `${o.prefix}${V.key}`,
          options: V.key === "campaign" ? P.campaignlist : V.dataSource,
          label: V.value,
          disabled: o.filters[Y].disabled,
          singleSelect: !1,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (S) => o.filters[Y].model = S,
          onClick: (S) => P.filterClicked(V.key),
          onInput: w(L)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), me(w(Lt), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${V.key}`,
          label: V.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (S) => o.filters[Y].model = S,
          onInput: w(L)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      Z(w(nt), {
        type: "tertiary",
        label: "Clear filters",
        onClick: $[0] || ($[0] = (V) => I())
      })
    ], 2));
  }
}, Gh = /* @__PURE__ */ Qe(Rh, [["__scopeId", "data-v-4191254b"]]), Mh = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: D }) {
    const a = D, g = o.options || {}, M = new IntersectionObserver(([I]) => {
      a("intersecting", I.isIntersecting);
    }, g), L = H(null);
    return Sn(() => {
      L.value && M.observe(L.value);
    }), nh(() => {
      M.disconnect();
    }), (I, P) => (h(), y("div", {
      ref_key: "targetELement",
      ref: L,
      class: "observer",
      style: { height: "3px" }
    }, [
      ji(I.$slots, "default")
    ], 512));
  }
}, k0 = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", Uh = { class: "query-builder" }, Wh = { class: "query-conditions" }, Nh = { class: "condition" }, qh = { class: "cell field" }, zh = { class: "cell operator" }, Hh = { class: "cell value" }, Qh = {
  key: 0,
  class: "query-operator-outer"
}, Kh = {
  __name: "StandardQueryDisplay",
  props: {
    query: {
      type: Array,
      required: !0
    }
  },
  setup(o) {
    const D = o, a = $e(() => D.query || []), b = (M) => {
      try {
        return new Date(M).toISOString().split("T")[0];
      } catch {
        return "-";
      }
    }, g = (M) => {
      const L = M == null ? void 0 : M.value;
      return L ? M.type === "date" ? b(L) : Array.isArray(L) ? L.join(", ") : typeof L == "boolean" ? L ? "True" : "False" : L : "-";
    };
    return (M, L) => (h(), y("div", Uh, [
      f("div", Wh, [
        L[1] || (L[1] = f("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), y(xe, null, we(a.value, (I, P) => (h(), y("div", { key: P }, [
          f("div", Nh, [
            f("div", qh, ie(I.field), 1),
            f("div", zh, ie(I.operator), 1),
            f("div", Hh, ie(g(I)), 1),
            Z(w(nt), {
              type: "tertiary",
              icon: "bi-arrows-expand"
            })
          ]),
          a.value.length > 1 && P !== a.value.length - 1 ? (h(), y("div", Qh, L[0] || (L[0] = [
            f("div", { class: "query-operator" }, " And", -1)
          ]))) : F("", !0)
        ]))), 128))
      ])
    ]));
  }
}, Yh = /* @__PURE__ */ Qe(Kh, [["__scopeId", "data-v-ffb4ba57"]]), Zh = { class: "info-card" }, Xh = { class: "segments" }, Jh = { class: "segment-img-wrapper" }, jh = ["src", "title"], e2 = { class: "segment-info" }, t2 = {
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
    const D = o, a = {
      "Sports Enthusiasts": [
        "High affinity for both mainstream (Football, Basketball, Baseball) and niche sports (Formula 1, MMA, Equestrian, Triathlon)",
        "Likely to follow live sports, post about games/events, and participate in fantasy leagues or brackets"
      ],
      "Gaming & E-Sports Fans": [
        "Deeply immersed in online games and streaming culture",
        "Active on Twitch, Discord, Reddit, and gaming Twitter/X",
        "Passionate about competitions and influencers in the gaming ecosystem"
      ],
      "Social Shoppers & Brand Followers": [
        "Use social media to discover, evaluate, and shop products",
        "Follow brands and creators for inspiration",
        "Tend to amplify content related to lifestyle, fashion, and tech drops"
      ],
      "Fitness & Wellness Advocates": [
        "Fitness-focused, often engage in running, gym workouts, challenges",
        "Highly engaged in motivational and self-improvement content",
        "Participate in online fitness communities and track progress socially"
      ],
      "Readers & Intellectual Hobbyists": [
        "Enjoy quiet hobbies like reading, puzzles, crosswords, and culture",
        "Likely to be highly engaged in niche or curated online spaces (e.g., Goodreads, BookTok)",
        "Share reviews, quotes, and thoughtful reflections"
      ],
      "Food & Home Lovers": [
        "Passionate about cooking, home décor, and gardening",
        "Follow food bloggers, recipe creators, and home improvement influencers",
        "Post about meals, recipes, seasonal décor, and DIY projects"
      ],
      "Streaming & Entertainment Seekers": [
        "Always up to date with new releases, binge culture, and celebrity news",
        "Engage heavily with fandoms (TV shows, music artists, pop culture)",
        "Create or share reaction memes, fan theories, and reviews"
      ],
      "Demographic-Based Communities": [
        "Segments shaped by age, race/ethnicity, gender, and geography",
        "Vary in cultural expression, social causes, and lifestyle choices",
        "Participate in demographic-focused celebrations or advocacy"
      ],
      "Pet & Animal Lovers": [
        "Deep emotional connection to pets, rescue stories, and animal rights",
        "Share pet milestones, funny pet content, and adoption campaigns",
        "Engage with animal shelters, wildlife orgs, and pet brands"
      ]
    };
    function b(M) {
      const L = a[M];
      return L ? L.map((I) => `• ${I}`).join(`
`) : "No information available";
    }
    const g = $e(() => !D.segmentData || !D.segmentData.segments ? [] : D.isThumbnail ? D.segmentData.segments.slice(0, 5) : D.segmentData.segments);
    return (M, L) => (h(), y("div", Zh, [
      L[2] || (L[2] = f("h5", null, "Top Interests", -1)),
      f("div", Xh, [
        (h(!0), y(xe, null, we(g.value, (I) => (h(), y("div", {
          class: "segment",
          key: I.name
        }, [
          f("div", Jh, [
            f("img", {
              src: I.image,
              alt: "segment",
              title: b("Unknown Segment Name")
            }, null, 8, jh)
          ]),
          f("div", e2, [
            f("h4", null, ie(I.name), 1),
            f("p", null, [
              L[0] || (L[0] = f("span", null, "Est. Reach:", -1)),
              tt(" " + ie(I.reach) + " ", 1),
              Z(w(d0), {
                class: "pl-1",
                label: "This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience."
              })
            ]),
            f("p", null, [
              L[1] || (L[1] = f("span", null, "Affinity Score: ", -1)),
              tt(" " + ie(I.impressions), 1),
              Z(w(d0), {
                class: "pl-1",
                label: "A score of 158 means this persona is 58% more likely than average to be interested in your brand. It reflects behavioral and interest similarity to your seeded 1PD audience."
              })
            ])
          ])
        ]))), 128))
      ])
    ]));
  }
}, n2 = /* @__PURE__ */ Qe(t2, [["__scopeId", "data-v-54b7a335"]]), i2 = { class: "segment-details-insigts mt-4" }, r2 = { class: "insights-title-wrapper" }, a2 = { class: "mt-3" }, s2 = { class: "query-result" }, l2 = {
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
    const a = o, b = un(), g = D;
    $e(() => {
      var I, P, $;
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
          categories: ((P = (I = a.selectedSegment.thumbnail) == null ? void 0 : I.graph) == null ? void 0 : P.labels) || []
        },
        colors: [
          "#0A2FFF",
          "#0068AD"
        ],
        title: {
          text: (($ = a.selectedSegment.thumbnail) == null ? void 0 : $.title) || "",
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
    }), $e(() => {
      var I, P, $;
      return (($ = (P = (I = a.selectedSegment.thumbnail) == null ? void 0 : I.graph) == null ? void 0 : P.seriesCombined) == null ? void 0 : $.map((V) => ({
        name: V.name,
        data: V.data.map(Number)
      }))) || [];
    });
    const M = $e(() => {
      var I, P, $, V;
      return ((V = ($ = (P = (I = a.selectedSegment.thumbnail) == null ? void 0 : I.segments) == null ? void 0 : P[0]) == null ? void 0 : $.segments) == null ? void 0 : V.slice(0, 2)) || [];
    });
    $e(() => M.value.map(($) => parseFloat($.affinityScore || "0")).reduce(($, V) => $ + V, 0).toFixed(2)), $e(() => M.value.map((P) => parseInt(P.reach || "0", 10)).reduce((P, $) => P + $, 0).toLocaleString());
    function L() {
      b.set_selectedSegmentType(a.location), b.set_activeTab("custom"), b.set_selectedSegment(a.selectedSegment), g("showInsightsExplorer", a.selectedSegment);
    }
    return (I, P) => {
      const $ = h0("CataUiTooltip");
      return h(), y("div", null, [
        f("div", i2, [
          f("div", r2, [
            P[2] || (P[2] = f("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            f("p", a2, [
              P[1] || (P[1] = tt("Find the segments that work best with ")),
              f("span", s2, ie(a.selectedSegment.name), 1)
            ]),
            Z($, { label: "The preview is for your external proofing tool." })
          ]),
          Z(w(nt), {
            type: "secondary",
            label: "Explore",
            onClick: P[0] || (P[0] = (V) => L())
          })
        ])
      ]);
    };
  }
}, o2 = /* @__PURE__ */ Qe(l2, [["__scopeId", "data-v-ba5f76ba"]]), u2 = { class: "modal-body" }, c2 = { class: "section" }, d2 = { class: "checkbox-group" }, f2 = { class: "checkbox-group" }, p2 = { class: "sections-wrapper" }, h2 = { class: "section" }, m2 = { class: "checkbox-group-catergory" }, g2 = { class: "section" }, x2 = { class: "ccheckbox-group-catergory" }, y2 = { class: "section" }, k2 = { class: "checkbox-group-category" }, v2 = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: D }) {
    const a = D, b = H([]), g = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], M = ["Build new campaign", "Update current campaign"], L = ["Display & Video 360", "The Trade Desk"], I = ["Infosum", "LiveRamp"], P = ["Open Media Studio", "Audience Builder"];
    function $() {
      a("close");
    }
    const V = () => {
      a("insertSegment"), $();
    };
    return (Y, S) => {
      const R = h0("hp");
      return h(), me(w(g0), {
        onClose: $,
        size: "medium"
      }, {
        header: Bt(() => S[5] || (S[5] = [
          f("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: Bt(() => [
          f("div", u2, [
            f("div", c2, [
              Z(R, null, {
                default: Bt(() => S[6] || (S[6] = [
                  tt("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              f("div", d2, [
                (h(), y(xe, null, we(g, (A) => Z(w(bn), {
                  key: A,
                  label: A,
                  modelValue: b.value,
                  "onUpdate:modelValue": S[0] || (S[0] = (q) => b.value = q),
                  value: A
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            S[10] || (S[10] = f("hr", null, null, -1)),
            f("div", f2, [
              (h(), y(xe, null, we(M, (A) => Z(w(bn), {
                key: A,
                label: A,
                modelValue: b.value,
                "onUpdate:modelValue": S[1] || (S[1] = (q) => b.value = q),
                value: A
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            f("div", p2, [
              f("div", h2, [
                S[7] || (S[7] = f("h3", null, "Cohort", -1)),
                f("div", m2, [
                  (h(), y(xe, null, we(L, (A) => Z(w(bn), {
                    key: A,
                    label: A,
                    modelValue: b.value,
                    "onUpdate:modelValue": S[2] || (S[2] = (q) => b.value = q),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", g2, [
                S[8] || (S[8] = f("h3", null, "Clean Room", -1)),
                f("div", x2, [
                  (h(), y(xe, null, we(I, (A) => Z(w(bn), {
                    key: A,
                    label: A,
                    modelValue: b.value,
                    "onUpdate:modelValue": S[3] || (S[3] = (q) => b.value = q),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", y2, [
                S[9] || (S[9] = f("h3", null, "WPP Open", -1)),
                f("div", k2, [
                  (h(), y(xe, null, we(P, (A) => Z(w(bn), {
                    key: A,
                    label: A,
                    modelValue: b.value,
                    "onUpdate:modelValue": S[4] || (S[4] = (q) => b.value = q),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ])
            ])
          ])
        ]),
        footer: Bt(() => [
          Z(w(nt), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: $
          }),
          Z(w(nt), {
            type: "primary",
            label: "Push",
            onClick: V
          })
        ]),
        _: 1
      });
    };
  }
}, _2 = /* @__PURE__ */ Qe(v2, [["__scopeId", "data-v-44c63bbf"]]), b2 = [
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
], E2 = {
  charts: b2
}, Ta = {
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
}, Da = {
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
}, Fa = {
  area: {
    ...Ta,
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
    ...Ta,
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
    ...Ta,
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
    ...Da,
    chart: {
      type: "donut",
      background: "#ffffff",
      toolbar: { show: !0 }
    },
    dataLabels: { enabled: !0 },
    tooltip: { theme: "light" }
  },
  pie: {
    ...Da,
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
    ...Da,
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
}, v0 = {
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
}, S2 = { class: "segment-details" }, w2 = { class: "wrapper-left" }, A2 = { class: "source-wrapper" }, C2 = { class: "source-container" }, T2 = { class: "sub-controls" }, D2 = { class: "sub-tab-container" }, I2 = { class: "sub-controls-tabs" }, L2 = { class: "sub-controls-tools" }, B2 = { class: "list" }, F2 = {
  key: 0,
  class: "d-flex justify-content-center pt-40 pb-40"
}, $2 = { class: "wrapper-right" }, V2 = {
  key: 0,
  class: "segment-details-wrapper"
}, P2 = {
  key: 0,
  class: "segment-details-title"
}, O2 = { class: "segment-details-content" }, R2 = {
  key: 0,
  class: "description-row"
}, G2 = { class: "description-detail" }, M2 = {
  key: 1,
  class: "description-row"
}, U2 = { class: "description-detail" }, W2 = {
  key: 2,
  class: "description-row"
}, N2 = { class: "description-detail" }, q2 = {
  key: 3,
  class: "description-row"
}, z2 = { class: "description-detail" }, H2 = {
  key: 4,
  class: "description-row"
}, Q2 = { class: "description-detail" }, K2 = {
  key: 5,
  class: "description-row"
}, Y2 = { class: "description-detail" }, Z2 = {
  key: 6,
  class: "description-row"
}, X2 = { class: "description-detail" }, J2 = {
  key: 7,
  class: "description-row"
}, j2 = { class: "description-detail" }, em = {
  key: 8,
  class: "description-row"
}, tm = { class: "description-detail-bold" }, nm = {
  key: 0,
  class: "description-detail"
}, im = { class: "description-row" }, rm = { class: "description-term" }, am = { class: "description-detail" }, sm = {
  key: 1,
  class: "standard-view"
}, lm = ["src"], om = {
  key: 0,
  class: "footer"
}, um = { class: "footer-text" }, cm = { class: "footer-description-detail" }, dm = {
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
    const a = o, b = D;
    H([]);
    const g = un(), M = H(null), L = H(null), I = H(!1), P = H([]), $ = H(""), V = H([]), Y = H(""), S = H(""), R = H(!1), A = [
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
    ], q = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], X = H(A[0]), Ee = H(q[0]), re = H(!1), de = H([
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
    ]), fe = [
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
    ], Q = H({}), B = H(""), T = H({
      sortColumn: "name",
      sortOrder: 1
    });
    function W() {
      g.set_selectedSegmentType("standard"), g.set_selectedSegment(B.value), b("showInsightsExplorer", B.value);
    }
    async function ke() {
      var C;
      if (!((C = B.value) != null && C.segmentId))
        return;
      const z = `${a.baseUrl}/api/v1/segments/${B.value.segmentId}`;
      try {
        const le = await fetch(z, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!le.ok) {
          const kt = await le.text();
          throw new Error(kt || "Failed to delete segment");
        }
        B.value = "", await g.fetch_segments(Y.value);
      } catch (le) {
        console.error("Error deleting segment:", le);
      }
    }
    function Oe(z) {
      return z.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (C) => C.toUpperCase());
    }
    function Ae(z) {
      return z == null ? "" : (typeof z == "string" ? parseInt(z, 10) : z).toLocaleString();
    }
    function it(z) {
      Q.value = z, g.set_filterQuery(z), g.fetch_segments(Y.value);
    }
    async function zt(z) {
      if (z && g.get_isLastPage && !re.value && g.get_segments && g.get_segments.length > 0) {
        re.value = !0;
        try {
          await g.fetch_nextSegmentPage(Y.value), re.value = !1;
        } catch {
          re.value = !1;
        }
      }
    }
    async function Ht() {
      de.value.map((z) => {
        z.key !== "market" && (z.model = "");
      }), g.reset_filterQuery(), await g.fetch_segments(Y.value);
    }
    function cn(z) {
      T.value = z;
    }
    function dn() {
      I.value = !I.value;
    }
    function Qt(z) {
      B.value = z.row;
    }
    function qe() {
      R.value = !0;
    }
    async function ne() {
      await g.set_token(a.token), await g.set_brandId(a.brandId), await g.set_tenantId(a.tenantId), await g.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? B.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && (B.value = a.selectedSegment), await g.fetch_segment_settings(a.brandId);
      try {
        const z = await g.get_segment_settings;
        z && (V.value = await z.platforms.map((C) => ({
          value: C.platform_id,
          label: C.platform,
          locations: C.locations.map((le) => ({
            value: le.value,
            label: le.display_name
          }))
        }))), Y.value = V.value[0].value;
      } catch (z) {
        console.log(z);
      }
    }
    return Sn(() => {
      L.value = M.value, ne();
    }), on(Y, async (z, C) => {
      z && C !== z && (P.value = V.value[z - 1].locations, $.value = P.value[0].value, re.value = !0, g.set_platform(z), await g.fetch_segments(z), X.value = A[0], re.value = !1);
    }), on(S, async (z) => {
      z && (z == null ? void 0 : z.length) < 3 || (g.set_searchTerm(z), g.fetch_segments(Y.value));
    }), on($, async (z) => {
      g.set_locationQuery(z), g.fetch_segments(Y.value);
    }), on(T, async (z) => {
      g.set_sortQuery(z), g.fetch_segments(Y.value);
    }), on(X, async (z) => {
      const C = z.id;
      g.set_categoryQuery(C), g.fetch_segments();
    }), $e(() => E2.charts.map((z) => {
      var vt, $t;
      const C = v0[z.type] || ((vt = z.type) == null ? void 0 : vt.toLowerCase()), le = Fa[C] || {};
      console.log("type", C), console.log("baseOptions", le);
      let kt = {}, At = [];
      return C === "line" || C === "area" ? (kt = {
        xaxis: {
          categories: z.data.map((Ie) => Ie.key),
          labels: { style: { fontSize: "12px", colors: "#777" } },
          axisBorder: { show: !1 },
          axisTicks: { show: !1 }
        },
        yaxis: {
          labels: {
            style: { fontSize: "12px", colors: "#777" },
            formatter: (Ie) => Ie > 1e3 ? `${(Ie / 1e3).toFixed(1)}K` : Ie
          }
        }
      }, At = [{
        name: (($t = z.data[0]) == null ? void 0 : $t.valueType) || "Value",
        data: z.data.map((Ie) => Number(Ie.value))
      }]) : C === "bar" ? (kt = {
        xaxis: {
          categories: z.data.map((Ie) => Ie.key)
        }
      }, At = [{
        name: z.title,
        data: z.data.map((Ie) => Number(Ie.value))
      }]) : C === "donut" || C === "pie" ? (kt = {
        labels: z.data.map((Ie) => Ie.key)
      }, At = z.data.map((Ie) => Number(Ie.value))) : C === "bubble" && (At = [{
        name: z.title,
        data: z.data.map((Ie) => ({
          x: Number(Ie.x),
          y: Number(Ie.y),
          z: Number(Ie.z)
        }))
      }]), console.log("series", At), console.log("dynamicOptions", kt), {
        series: At,
        options: {
          ...le,
          ...kt,
          title: {
            ...le.title,
            text: z.title
          },
          chart: {
            // ...baseOptions.chart,
            type: C
          }
        },
        chartType: C
      };
    })), (z, C) => (h(), y(xe, null, [
      f("div", S2, [
        f("div", w2, [
          f("div", A2, [
            f("div", C2, [
              Z(w(It), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: V.value,
                modelValue: Y.value,
                "onUpdate:modelValue": C[0] || (C[0] = (le) => Y.value = le),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              Z(w(It), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: P.value,
                modelValue: $.value,
                "onUpdate:modelValue": C[1] || (C[1] = (le) => $.value = le),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            Z(w(Lt), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: S.value,
              "onUpdate:modelValue": C[2] || (C[2] = (le) => S.value = le)
            }, null, 8, ["modelValue"])
          ]),
          f("div", T2, [
            f("div", D2, [
              f("div", I2, [
                Z(w(Ia), {
                  tabs: A,
                  modelValue: X.value,
                  "onUpdate:modelValue": C[3] || (C[3] = (le) => X.value = le),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              f("div", L2, [
                Z(w(Ft), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: C[4] || (C[4] = (le) => dn())
                })
              ])
            ])
          ]),
          f("div", B2, [
            f("div", {
              class: "list-list",
              ref_key: "list",
              ref: M
            }, [
              Z(Vh, {
                stickyHeader: 0,
                columns: fe,
                rows: w(g).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: C[5] || (C[5] = (le) => Qt(le)),
                onColumnSorted: C[6] || (C[6] = (le) => cn(le)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              re.value ? (h(), y("div", F2, [
                Z(w(Wn), { size: "xlarge" })
              ])) : F("", !0),
              Z(Mh, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: C[7] || (C[7] = (le) => zt(le))
              })
            ], 512),
            I.value ? (h(), me(Gh, {
              key: 0,
              filters: de.value,
              onClearFilters: C[8] || (C[8] = (le) => Ht()),
              onFilterChange: C[9] || (C[9] = (le) => it(le))
            }, null, 8, ["filters"])) : F("", !0)
          ])
        ]),
        f("div", $2, [
          f("div", {
            class: Ue(["outer-wrapper-segment-details", { "standard-empty": !B.value }])
          }, [
            B.value ? (h(), y("div", V2, [
              B.value ? (h(), y("div", P2, ie(B.value.name), 1)) : F("", !0),
              C[24] || (C[24] = f("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              f("div", O2, [
                B.value.name ? (h(), y("div", R2, [
                  C[15] || (C[15] = f("div", { class: "description-term" }, "Name", -1)),
                  f("div", G2, ie(B.value.name), 1)
                ])) : F("", !0),
                B.value.description ? (h(), y("div", M2, [
                  C[16] || (C[16] = f("div", { class: "description-term" }, "Description", -1)),
                  f("div", U2, ie(B.value.description), 1)
                ])) : F("", !0),
                B.value.sourceCreatedDate ? (h(), y("div", W2, [
                  C[17] || (C[17] = f("div", { class: "description-term" }, "Created", -1)),
                  f("div", N2, ie(w(En)(B.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : F("", !0),
                B.value.sourceUpdatedDate ? (h(), y("div", q2, [
                  C[18] || (C[18] = f("div", { class: "description-term" }, "Updated", -1)),
                  f("div", z2, ie(w(En)(B.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : F("", !0),
                B.value.status ? (h(), y("div", H2, [
                  C[19] || (C[19] = f("div", { class: "description-term" }, "Status", -1)),
                  f("div", Q2, ie(B.value.status.value), 1)
                ])) : F("", !0),
                B.value.expiration_date ? (h(), y("div", K2, [
                  C[20] || (C[20] = f("div", { class: "description-term" }, "Expiration", -1)),
                  f("div", Y2, ie(B.value.expiration_date), 1)
                ])) : F("", !0),
                B.value.id ? (h(), y("div", Z2, [
                  C[21] || (C[21] = f("div", { class: "description-term" }, "Segmnent ID", -1)),
                  f("div", X2, ie(B.value.id), 1)
                ])) : F("", !0),
                B.value.audience_id ? (h(), y("div", J2, [
                  C[22] || (C[22] = f("div", { class: "description-term" }, "Audience ID", -1)),
                  f("div", j2, ie(B.value.audience_id), 1)
                ])) : F("", !0),
                B.value.count ? (h(), y("div", em, [
                  C[23] || (C[23] = f("div", { class: "description-term" }, "Last count", -1)),
                  f("div", tm, ie(Ae(B.value.count)), 1),
                  B.value.refreshCountDate ? (h(), y("span", nm, " (" + ie(w(En)(B.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : F("", !0)
                ])) : F("", !0),
                B.value.platform_specific ? (h(!0), y(xe, { key: 9 }, we(B.value.platform_specific, (le) => (h(), y("div", im, [
                  f("div", rm, ie(Oe(le.label)), 1),
                  f("div", am, ie(le.value), 1)
                ]))), 256)) : F("", !0)
              ]),
              f("div", null, [
                Z(w(Ia), {
                  tabs: q,
                  modelValue: Ee.value,
                  "onUpdate:modelValue": C[10] || (C[10] = (le) => Ee.value = le),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                Ee.value.id === 2 ? (h(), me(Yh, {
                  key: 0,
                  query: B.value.query
                }, null, 8, ["query"])) : F("", !0)
              ])
            ])) : F("", !0),
            B.value ? F("", !0) : (h(), y("div", sm, [
              f("div", null, [
                f("img", {
                  class: "",
                  alt: "standardIcon",
                  src: w(k0)
                }, null, 8, lm)
              ]),
              C[25] || (C[25] = f("div", { class: "standard-view-title" }, [
                f("div", null, "Select a standard segment from the list"),
                f("div", null, "or"),
                f("div", null, [
                  f("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          B.value.name ? (h(), y("div", om, [
            f("div", um, [
              C[26] || (C[26] = f("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              f("div", cm, [
                f("span", null, ie(B.value.name ? `${`${B.value.name} - `}` : "none"), 1),
                f("span", null, ie(Ae(B.value.count)), 1)
              ])
            ]),
            f("div", null, [
              Z(w(nt), {
                type: "secondary",
                label: "Explore",
                onClick: C[11] || (C[11] = (le) => W()),
                class: "mr-2"
              }),
              Z(w(nt), {
                type: "delete",
                label: "Delete",
                onClick: C[12] || (C[12] = (le) => ke()),
                class: "mr-2 redButton"
              }),
              Z(w(nt), {
                type: "primary",
                label: "Push to destination",
                onClick: C[13] || (C[13] = (le) => qe())
              })
            ])
          ])) : F("", !0)
        ])
      ]),
      R.value ? (h(), me(_2, {
        key: 0,
        onClose: C[14] || (C[14] = (le) => R.value = !1)
      })) : F("", !0)
    ], 64));
  }
}, fm = /* @__PURE__ */ Qe(dm, [["__scopeId", "data-v-e027e21a"]]), pm = { class: "feedback-title-wrapper" }, hm = { class: "title" }, mm = { class: "feedback-text" }, gm = {
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
    return (a, b) => {
      var g, M, L;
      return o.feedback ? (h(), y("div", {
        key: 0,
        class: Ue(["ai-query-feedback", [o.feedback.type]])
      }, [
        f("div", pm, [
          Z(w(Ft), {
            class: "pr-2",
            size: "16px",
            icon: D[(g = o.feedback) == null ? void 0 : g.type],
            color: D[`icon-color-${(M = o.feedback) == null ? void 0 : M.type}`]
          }, null, 8, ["icon", "color"]),
          f("div", hm, ie(o.feedback.title), 1)
        ]),
        f("p", mm, ie((L = o.feedback) == null ? void 0 : L.text), 1)
      ], 2)) : F("", !0);
    };
  }
}, p0 = /* @__PURE__ */ Qe(gm, [["__scopeId", "data-v-db7f7814"]]), xm = { key: 0 }, ym = { class: "d-flex justify-content-between" }, km = { class: "query-results" }, vm = { class: "query-result" }, _m = { class: "query-result-count" }, bm = {
  key: 0,
  class: "segment-insights"
}, Em = {
  key: 1,
  class: "loading"
}, Sm = {
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
    const a = D, b = o;
    H(!1);
    const g = H(!1), M = {
      chart: {
        type: "bar",
        height: 700,
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
          dataLabels: {
            position: "center"
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
            fontFamily: "Inter, sans-serif",
            colors: "#333"
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
    }, L = [
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
    function I() {
      a("explore-insights");
    }
    function P($) {
      return $ == null ? "" : (typeof $ == "string" ? parseInt($, 10) : $).toLocaleString();
    }
    return ($, V) => (h(), y("div", null, [
      o.savingDraft ? F("", !0) : (h(), y("div", xm, [
        f("div", ym, [
          V[1] || (V[1] = f("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          g.value ? (h(), me(w(nt), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: V[0] || (V[0] = (Y) => I())
          })) : F("", !0)
        ]),
        f("div", km, [
          f("div", vm, [
            V[2] || (V[2] = tt(" Segment size ")),
            f("span", _m, ie(P(b.segmentCount)), 1),
            V[3] || (V[3] = tt(" records. "))
          ])
        ]),
        g.value ? (h(), y("div", bm, [
          Z(w(La), {
            options: M,
            series: L
          })
        ])) : F("", !0)
      ])),
      o.savingDraft ? (h(), y("div", Em, [
        Z(w(Wn), { size: "xlarge" }),
        V[4] || (V[4] = f("p", null, "Connecting to Open Intelligence...", -1))
      ])) : F("", !0)
    ]));
  }
}, wm = /* @__PURE__ */ Qe(Sm, [["__scopeId", "data-v-3a77bed4"]]), Am = { class: "query-attributes" }, Cm = ["onClick", "onKeydown"], Tm = {
  key: 0,
  class: "query-attributes-group-items"
}, Dm = ["onClick"], Im = { class: "attribute-type" }, Lm = { class: "attribute-name" }, Bm = {
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
    function b(M) {
      a("toggle-group", M);
    }
    function g(M, L) {
      return L[M];
    }
    return (M, L) => (h(), y("div", Am, [
      o.fetching ? (h(), me(w(Wn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : F("", !0),
      (h(!0), y(xe, null, we(o.tables, (I) => (h(), y("div", {
        class: Ue(["query-attributes-group", { closed: o.collapsed.includes(I.display_name) }]),
        key: I.display_name
      }, [
        f("div", {
          class: "query-attributes-group-toggle",
          onClick: (P) => b(I.display_name),
          onKeydown: $a((P) => b(I.display_name), ["enter"])
        }, [
          L[3] || (L[3] = f("span", { class: "arrow" }, null, -1)),
          tt(" " + ie(I.display_name), 1)
        ], 40, Cm),
        o.collapsed.includes(I.display_name) ? F("", !0) : (h(), y("div", Tm, [
          Z(w(Ba), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (P) => g(P, I.columns),
            onDragEnd: L[2] || (L[2] = (P) => M.$emit("drag-end"))
          }, {
            default: Bt(() => [
              (h(!0), y(xe, null, we(I.columns, (P) => (h(), me(w(sh), {
                key: P.display_name
              }, {
                default: Bt(() => [
                  f("div", {
                    class: "attribute",
                    onMousedown: L[0] || (L[0] = ($) => M.$emit("drag-start")),
                    onMouseup: L[1] || (L[1] = ($) => M.$emit("drag-end"))
                  }, [
                    Z(w(Ft), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    f("div", {
                      class: "attribute-content",
                      onClick: ih(($) => M.$emit("click-attribute", P), ["stop"])
                    }, [
                      f("span", Im, ie(P.type), 1),
                      f("span", Lm, ie(P.display_name), 1)
                    ], 8, Dm)
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
}, Fm = /* @__PURE__ */ Qe(Bm, [["__scopeId", "data-v-4e61c8b0"]]), $m = { class: "freeform-tab" }, Vm = {
  __name: "FreeForm",
  setup(o) {
    tr();
    const D = H("");
    return (a, b) => (h(), y("div", $m, [
      Z(w(Lt), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: D.value,
        "onUpdate:modelValue": b[0] || (b[0] = (g) => D.value = g)
      }, null, 8, ["modelValue"])
    ]));
  }
}, Pm = /* @__PURE__ */ Qe(Vm, [["__scopeId", "data-v-f29f192b"]]), Om = { class: "query-builder" }, Rm = { class: "query-builder-left" }, Gm = { class: "query-tabs" }, Mm = { class: "source" }, Um = {
  key: 1,
  class: "ai-query-tab"
}, Wm = {
  key: 2,
  class: ""
}, Nm = { class: "query-builder-right" }, qm = { class: "query-content-scrollable" }, zm = { class: "query-editor-wrapper" }, Hm = { class: "query-runner-button-wrapper" }, Qm = {
  key: 0,
  class: "query-editor"
}, Km = { class: "queries" }, Ym = {
  key: 0,
  class: "query"
}, Zm = ["onClick", "onKeydown"], Xm = { class: "w-100 pr-10" }, Jm = {
  key: 0,
  class: "sub-query-outer"
}, jm = { class: "sub-queries" }, eg = {
  key: 0,
  class: "query-operator-inner",
  style: { width: "fit-content" }
}, tg = {
  key: 1,
  class: "pt-3 pb-2"
}, ng = { key: 0 }, ig = {
  key: 1,
  class: "px-2"
}, rg = {
  key: 1,
  class: "query-operator-outer"
}, ag = {
  key: 0,
  class: "inital-view"
}, sg = ["src"], lg = { key: 0 }, og = {
  key: 0,
  class: "query-results-wrapper"
}, ug = {
  key: 1,
  class: "loading-query-run"
}, cg = {
  key: 2,
  class: "loading-query-run"
}, dg = {
  key: 0,
  class: "mt-3"
}, fg = {
  key: 1,
  class: "mt-3"
}, pg = { class: "query-builder-footer" }, hg = { class: "query-builder-footer-fields" }, mg = {
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
    const a = o, b = un(), g = tr(), M = D;
    H();
    const L = [
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
    ], I = H(L[0]), P = H([]), $ = H(P.value[0]), V = H([]), Y = H(V.value[0]), S = H(""), R = H(null), A = H(!1), q = H(null), X = H(!0), Ee = H(!1), re = H([]), de = H([]), fe = H(!1), Q = H(!1), B = H(""), T = H(""), W = H(!1), ke = H(!1), Oe = H(!1), Ae = H(""), it = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], zt = [
      { value: "$eq", label: "equal" }
    ], Ht = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$in", label: "in" },
      { value: "$nin", label: "not in" }
    ], cn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$bw", label: "begins with" },
      { value: "$nbw", label: "not begins with" },
      { value: "$ew", label: "ends with" },
      { value: "$new", label: "not ends with" }
    ], dn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$bt", label: "between" },
      { value: "$nbt", label: "not between" }
    ], Qt = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], qe = H(0), ne = H({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), z = () => {
      b.set_selectedSegmentType("custom"), b.set_activeTab("custom"), b.set_selectedSegment(R.value), M("showInsightsExplorer", R.value);
    };
    function C(j) {
      const E = {
        $eq: "is equal to",
        $neq: "is not equal to",
        $lt: "is less than",
        $lte: "is less than or equal to",
        $gt: "is greater than",
        $gte: "is greater than or equal to",
        $in: "is in",
        $nin: "is not in",
        $bw: "begins with",
        $nbw: "does not begin with",
        $ew: "ends with",
        $new: "does not end with",
        $bt: "is between",
        $nbt: "is not between"
      };
      return j.filter((U) => U.statement).map(({ statement: U, input_type: Ce }) => {
        const [G, oe, Xt] = U;
        return {
          field: G,
          operator: E[oe] || oe,
          value: Xt,
          type: Ce
        };
      });
    }
    async function le(j) {
      const E = {
        brandName: a.brandName,
        name: j.name,
        description: j.description,
        count: j.count || S.value
      }, U = `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${j.segmentId}`, Ce = await fetch(U, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(E)
      });
      if (!Ce.ok) {
        const G = await Ce.json();
        throw new Error(G.message || "Failed to generate insights");
      }
      await Ce.json();
    }
    async function kt() {
      Ae.value = "saving", Oe.value = !0;
      const j = {
        platformId: Y.value,
        count: S.value,
        region: b.query.demographics.region,
        market: b.query.demographics.market,
        description: ne.value.description,
        name: ne.value.name,
        query: C(ne.value.conditions[0].group)
      };
      try {
        const E = await fetch("https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          },
          body: JSON.stringify(j)
        }), U = await E.json();
        if (!E.ok)
          throw new Error(U.message || "Failed to save segment");
        ke.value = !0, Q.value = !0, Ae.value = "generating", R.value = U.data[0], await le(U.data[0]), Ae.value = "done";
      } catch (E) {
        console.error("Error saving segment or generating insights:", E), Ae.value = "";
      } finally {
        Oe.value = !1;
      }
    }
    async function At() {
      W.value = !0;
      const j = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: T.value
      };
      ne.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const E = await g.generate_ai_query(j, Y.value, $.value), U = {
        text: E.message,
        type: E.query ? "info" : "warning",
        title: "AI Assumption"
      }, Ce = {
        text: E.query,
        type: "query",
        title: "Query Gen"
      };
      g.set_ai_generated_message(U), g.set_ai_generated_query(Ce), E.attrs.forEach((G, oe) => {
        oe === 0 ? q.value = "queryGroupDrop" : q.value = ne.value.conditions[0].id;
        const Xt = {
          payload: {
            display_name: G.field,
            input_type: G.input_type,
            operators: G.operator,
            selectors: []
          }
        };
        Xt.payload.selectors.push(G.value), Vt(Xt), c0();
      }), W.value = !1;
    }
    async function vt() {
      ne.value.conditions.forEach((j) => {
        j.group.forEach((E) => {
          E.input_type === "select" && E.statement[2].length > 1 && E.statement[1] === "$eq" && (E.statement[1] = "$in"), E.input_type === "select" && E.statement[2].length > 1 && E.statement[1] === "$neq" && (E.statement[1] = "$nin");
        });
      });
    }
    async function $t() {
      fe.value = !0, I.value.id === 1 && await vt(), S.value = await g.run_query(ne.value, Y.value, $.value), S.value && (Q.value = !0), fe.value = !1, ke.value = !1;
    }
    function Ie(j, E) {
      var Ce, G;
      return j === "operatorsQueries" ? (Ce = it.find((oe) => oe.value === E)) == null ? void 0 : Ce.label : (G = Kt(j).find((oe) => oe.value === E)) == null ? void 0 : G.label;
    }
    function Kt(j) {
      switch (j) {
        case "select":
          return Ht;
        case "boolean":
          return zt;
        case "string":
          return cn;
        case "date":
          return dn;
        case "int":
          return Qt;
        default:
          return [];
      }
    }
    function Yt(j) {
      A.value = j;
    }
    async function ir() {
      Ee.value = !0, await g.fetch_database_model(Y.value, $.value), Ee.value = !1;
    }
    async function An() {
      X.value = !0, await g.fetch_custom_segment_settings();
      const j = await g.get_segment_settings;
      j && (V.value = await j.platforms.map((E) => ({
        value: E.platform_id,
        label: E.platform,
        locations: E.locations.map((U) => ({
          value: U.value,
          label: U.display_name
        }))
      })), Y.value = V.value[0].value), X.value = !1;
    }
    function Vt(j) {
      const E = j.payload ? j.payload : j;
      if (qe.value < g.settings.maxSubQuery) {
        const U = E.selectors.map((oe) => ({
          value: oe,
          label: oe
        }));
        let Ce = [];
        U.length > 2 ? Ce[0] = U[0].value : U.length > 0 ? Ce = U[0].value : Ce = null;
        const G = U.length > 0 && E.input_type !== "boolean" ? "select" : E.input_type;
        if (q.value === "queryGroupDrop") {
          qe.value += 1, ne.value.conditions.length > 0 && ne.value.conditions.push({ logic: "$or" });
          const oe = {
            id: Ca(),
            group: [
              {
                id: Ca(),
                statement: [E.display_name, "$eq", Ce],
                selectors: U,
                input_type: G
              }
            ]
          };
          ne.value.conditions.push(oe);
        } else if (q.value !== null) {
          qe.value += 1;
          const oe = ne.value.conditions.findIndex(
            (Xt) => Xt.id === q.value
          );
          oe !== -1 && (ne.value.conditions[oe].group.push({ logic: "$and" }), ne.value.conditions[oe].group.push({
            id: Ca(),
            statement: [E.display_name, "$eq", Ce],
            selectors: U,
            input_type: G
          }));
        }
        q.value = null;
      }
    }
    function ui(j) {
      var E;
      (E = ne.value.conditions[0]) != null && E.id ? q.value = ne.value.conditions[0].id : q.value = "queryGroupDrop", Vt(j), c0();
    }
    function rt(j, E, U) {
      if (ne.value.conditions[E].group.length === 1)
        ne.value.conditions.length > E + 1 ? ne.value.conditions.splice(E, 2) : ne.value.conditions.splice(E, 1), qe.value -= 1;
      else {
        const Ce = ne.value.conditions[E].group.findIndex(
          (G) => G.id === U
        );
        ne.value.conditions[E].group.splice(Ce - 1, 2), qe.value -= 1;
      }
    }
    function Zt(j) {
      const E = re.value.indexOf(j);
      E >= 0 ? re.value.splice(E, 1) : re.value.push(j);
    }
    function rr(j) {
      const E = de.value.indexOf(j);
      E >= 0 ? de.value.splice(E, 1) : de.value.push(j);
    }
    function _t() {
      S.value = "", ne.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function ci() {
      ne.value = { ...ne.value, count: S.value }, I.value.id === 3 && (ne.value = {
        ...ne.value,
        freeForm: g.freeFormQuery
      }), M("insertSegment", ne.value);
    }
    async function ar() {
      await b.set_token(a.token), await b.set_brandId(a.brandId), await b.set_tenantId(a.tenantId), await g.set_customSegmentUrl(a.customSegmentUrl), await g.fetch_custom_segment_settings(), await An();
    }
    return Sn(() => {
      ar();
    }), on(Y, async (j, E) => {
      j && E !== j && (P.value = V.value.find((U) => U.value == j).locations, $.value = P.value[0].value, await _t(), await ir());
    }), on(I, async (j, E) => {
      j && E !== j && j.id === 2 && (T.value = "", g.set_ai_generated_message(null), g.set_ai_generated_query(null));
    }), (j, E) => (h(), y("div", Om, [
      f("div", Rm, [
        X.value ? (h(), me(w(Wn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), y(xe, { key: 1 }, [
          f("div", Gm, [
            Z(w(Ia), {
              tabs: L,
              modelValue: I.value,
              "onUpdate:modelValue": E[0] || (E[0] = (U) => I.value = U),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          f("div", Mm, [
            Z(w(It), {
              style: { width: "45%" },
              class: "source w-100",
              options: V.value,
              modelValue: Y.value,
              "onUpdate:modelValue": E[1] || (E[1] = (U) => Y.value = U),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            Z(w(It), {
              style: { width: "45%" },
              class: "source w-100",
              options: P.value,
              modelValue: $.value,
              "onUpdate:modelValue": E[2] || (E[2] = (U) => $.value = U),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            w(b).brief.market ? (h(), me(w(Lt), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: w(b).brief.market,
              "onUpdate:modelValue": E[3] || (E[3] = (U) => w(b).brief.market = U),
              label: "Market"
            }, null, 8, ["modelValue"])) : F("", !0)
          ]),
          Y.value && $.value ? (h(), y(xe, { key: 0 }, [
            I.value.id === 1 ? (h(), me(Fm, {
              key: 0,
              tables: w(g).get_databaseModel.tables,
              collapsed: de.value,
              fetching: Ee.value,
              onClickAttribute: ui,
              onDragStart: E[4] || (E[4] = (U) => Yt(!0)),
              onDragEnd: E[5] || (E[5] = (U) => Yt(!1)),
              onToggleGroup: rr
            }, null, 8, ["tables", "collapsed", "fetching"])) : F("", !0),
            I.value.id === 2 ? (h(), y("div", Um, [
              Z(w(Lt), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: T.value,
                "onUpdate:modelValue": E[6] || (E[6] = (U) => T.value = U)
              }, null, 8, ["modelValue"]),
              Z(w(nt), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !T.value,
                loading: W.value,
                onClick: E[7] || (E[7] = (U) => At())
              }, null, 8, ["disabled", "loading"]),
              w(g).get_aiGeneratedMessage ? (h(), me(p0, {
                key: 0,
                feedback: w(g).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : F("", !0),
              w(g).get_aiGeneratedQuery ? (h(), me(p0, {
                key: 1,
                feedback: w(g).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : F("", !0)
            ])) : F("", !0),
            I.value.id === 3 ? (h(), y("div", Wm, [
              Z(Pm)
            ])) : F("", !0)
          ], 64)) : F("", !0)
        ], 64))
      ]),
      f("div", Nm, [
        f("div", qm, [
          f("div", zm, [
            f("div", null, [
              E[14] || (E[14] = f("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              f("div", Hm, [
                Z(w(nt), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !Y.value || !$.value,
                  loading: fe.value,
                  onClick: E[8] || (E[8] = (U) => $t())
                }, null, 8, ["disabled", "loading"]),
                Z(w(nt), {
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !ne.value.name || !ne.value.description || !S.value || ke.value,
                  loading: Oe.value,
                  onClick: E[9] || (E[9] = (U) => kt())
                }, null, 8, ["disabled", "loading"])
              ])
            ]),
            I.value.id !== 3 ? (h(), y("div", Qm, [
              f("div", Km, [
                (h(!0), y(xe, null, we(ne.value.conditions, (U, Ce) => (h(), y("div", {
                  class: "query-outer",
                  key: U.id
                }, [
                  U.group ? (h(), y("div", Ym, [
                    f("div", {
                      class: "collapse-subQuery",
                      onClick: (G) => Zt(U.id),
                      onKeydown: $a((G) => Zt(U.id), ["enter"])
                    }, [
                      Z(w(Ft), {
                        icon: re.value.indexOf(U.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, Zm),
                    f("div", Xm, [
                      re.value.indexOf(U.id) === -1 ? (h(), y("div", Jm, [
                        (h(!0), y(xe, null, we(U.group, (G) => (h(), y("div", jm, [
                          G.logic && re.value.indexOf(U.id) === -1 ? (h(), y("div", eg, [
                            Z(w(It), {
                              class: "query-operator",
                              modelValue: G.logic,
                              "onUpdate:modelValue": (oe) => G.logic = oe,
                              singleSelect: !0,
                              options: it,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : F("", !0),
                          G.statement ? (h(), y("div", {
                            key: 1,
                            class: Ue(["sub-query", { "single-subquery": U.group.length === 1 }])
                          }, [
                            Z(w(Lt), {
                              readonly: "",
                              modelValue: G.statement[0],
                              "onUpdate:modelValue": (oe) => G.statement[0] = oe
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            Z(w(It), {
                              modelValue: G.statement[1],
                              "onUpdate:modelValue": (oe) => G.statement[1] = oe,
                              singleSelect: !0,
                              options: Kt(G.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            G.selectors.length < 3 && G.selectors.length > 0 ? (h(), me(w(It), {
                              key: 0,
                              modelValue: G.statement[2],
                              "onUpdate:modelValue": (oe) => G.statement[2] = oe,
                              options: G.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : F("", !0),
                            G.selectors.length > 2 && G.input_type !== "boolean" ? (h(), me(w(It), {
                              key: 1,
                              modelValue: G.statement[2],
                              "onUpdate:modelValue": (oe) => G.statement[2] = oe,
                              options: G.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : F("", !0),
                            G.input_type === "int" ? (h(), me(w(Lt), {
                              key: 2,
                              modelValue: G.statement[2],
                              "onUpdate:modelValue": (oe) => G.statement[2] = oe,
                              error: G.statement[2] ? "" : B.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : F("", !0),
                            G.input_type === "string" ? (h(), me(w(Lt), {
                              key: 3,
                              modelValue: G.statement[2],
                              "onUpdate:modelValue": (oe) => G.statement[2] = oe,
                              error: G.statement[2] ? "" : B.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : G.input_type === "date" ? (h(), me(w(m0), {
                              key: 4,
                              modelValue: G.statement[2],
                              "onUpdate:modelValue": (oe) => G.statement[2] = oe,
                              range: G.statement[1] === "$bt" || G.statement[1] === "$nbt",
                              error: G.statement[2] ? "" : B.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : F("", !0),
                            Z(w(Ft), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (oe) => rt(U.id, Ce, G.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : F("", !0)
                        ]))), 256))
                      ])) : (h(), y("p", tg, [
                        (h(!0), y(xe, null, we(U.group, (G, oe) => (h(), y("span", {
                          key: G.id
                        }, [
                          G.statement ? (h(), y("span", ng, [
                            f("b", null, ie(G == null ? void 0 : G.statement[0]), 1),
                            tt(" " + ie(Ie(G.input_type, G == null ? void 0 : G.statement[1])) + " ", 1),
                            f("b", null, ie((G == null ? void 0 : G.statement[2]) || "?"), 1)
                          ])) : (h(), y("span", ig, ie(Ie("operatorsQueries", G.logic)), 1))
                        ]))), 128))
                      ])),
                      A.value && qe.value < w(g).settings.maxSubQuery ? (h(), me(w(Ba), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (G) => q.value = U.id,
                        onDrop: Vt
                      }, {
                        default: Bt(() => E[15] || (E[15] = [
                          f("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : F("", !0)
                    ])
                  ])) : F("", !0),
                  ne.value.conditions.length > 1 && Ce < ne.value.conditions.length - 1 && U.logic ? (h(), y("div", rg, [
                    Z(w(It), {
                      class: "query-operator",
                      modelValue: U.logic,
                      "onUpdate:modelValue": (G) => U.logic = G,
                      singleSelect: !0,
                      options: it,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : F("", !0)
                ]))), 128))
              ]),
              ne.value.conditions.length === 0 ? (h(), y("div", ag, [
                f("span", null, [
                  f("img", {
                    class: "",
                    alt: "standardIcon",
                    src: w(k0)
                  }, null, 8, sg)
                ])
              ])) : F("", !0),
              A.value && qe.value < w(g).settings.maxSubQuery || ne.value.conditions.length === 0 ? (h(), me(w(Ba), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: E[10] || (E[10] = (U) => q.value = "queryGroupDrop"),
                onDrop: Vt
              }, {
                default: Bt(() => [
                  f("div", {
                    class: Ue(["drop-indicator", {
                      "mt-25": ne.value.conditions.length > 0,
                      "p-5": ne.value.conditions.length === 0
                    }])
                  }, [
                    ne.value.conditions.length <= 0 ? (h(), y("span", lg, " Drag and drop attributes or AI generated rules ")) : F("", !0)
                  ], 2)
                ]),
                _: 1
              })) : F("", !0)
            ])) : F("", !0)
          ]),
          fe.value || Q.value ? (h(), y("div", og, [
            !fe.value && Q.value ? (h(), me(wm, {
              key: 0,
              segmentData: S.value,
              segmentCount: S.value
            }, null, 8, ["segmentData", "segmentCount"])) : F("", !0),
            fe.value ? (h(), y("div", ug, [
              Z(w(Wn), {
                size: "xlarge",
                class: "mt-3"
              }),
              E[16] || (E[16] = f("p", { class: "mt-3" }, "Running query...", -1))
            ])) : F("", !0),
            Ae.value === "saving" || Ae.value === "generating" ? (h(), y("div", cg, [
              Z(w(Wn), {
                size: "xlarge",
                class: "mt-3"
              }),
              Ae.value === "saving" ? (h(), y("p", dg, "Saving segment...")) : (h(), y("p", fg, "Generating insights..."))
            ])) : F("", !0),
            Ae.value === "done" && R.value ? (h(), me(o2, {
              key: 3,
              selectedSegment: R.value,
              location: "custom",
              onShowInsightsExplorer: z
            }, null, 8, ["selectedSegment"])) : F("", !0)
          ])) : F("", !0)
        ]),
        f("div", pg, [
          f("div", hg, [
            Z(w(Lt), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: ne.value.name,
              "onUpdate:modelValue": E[11] || (E[11] = (U) => ne.value.name = U),
              type: "text"
            }, null, 8, ["modelValue"]),
            Z(w(Lt), {
              class: "segment-name",
              label: "Segment description",
              modelValue: ne.value.description,
              "onUpdate:modelValue": E[12] || (E[12] = (U) => ne.value.description = U),
              type: "text"
            }, null, 8, ["modelValue"]),
            Z(w(nt), {
              size: "small",
              label: "Push to destination",
              disabled: !S.value || !ne.value.name && I.value.id === 1 || !ne.value.name && I.value.id === 2 || ne.value.conditions.length <= 0 && I.value.id !== 3,
              onClick: E[13] || (E[13] = (U) => ci())
            }, null, 8, ["disabled"])
          ])
        ])
      ])
    ]));
  }
}, gg = /* @__PURE__ */ Qe(mg, [["__scopeId", "data-v-9186b8d4"]]), xg = { class: "tag-section" }, yg = { class: "rating-card" }, kg = { class: "header" }, vg = { class: "title" }, _g = { class: "pb-2" }, bg = { class: "content-wrapper" }, Eg = { class: "content" }, Sg = { class: "publishers" }, wg = { class: "publisher-item" }, Ag = { class: "ratings" }, Cg = { class: "rating" }, Tg = {
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
    const D = H([]), a = o, b = $e(() => a.charts.filter((M) => M.type === "bubble")), g = $e(() => a.tags);
    return Sn(() => {
      D.value = new Array(b.value.length).fill(!1);
    }), (M, L) => (h(), y("div", xg, [
      (h(!0), y(xe, null, we(g.value, (I, P) => (h(), y("div", {
        class: Ue(["card-wrapper", { "full-width": !0 }]),
        key: I.title + P
      }, [
        f("div", yg, [
          f("div", kg, [
            f("h2", vg, [
              f("span", _g, ie(I.title), 1)
            ])
          ]),
          f("div", bg, [
            f("div", Eg, [
              f("div", Sg, [
                (h(!0), y(xe, null, we(I.data[0].label, ($, V) => (h(), y("div", { key: $ }, [
                  f("div", wg, ie($), 1),
                  f("div", Ag, [
                    f("div", Cg, [
                      (h(!0), y(xe, null, we(Math.floor(parseFloat(I.data[0].score[V])), (Y, S) => (h(), y("span", {
                        key: `filled-${S}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), y(xe, null, we(5 - Math.floor(parseFloat(I.data[0].score[V])), (Y, S) => (h(), y("span", {
                        key: `empty-${S}`,
                        class: "dot"
                      }))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            L[0] || (L[0] = f("div", { class: "logo-wrapper" }, [
              f("img", {
                src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                alt: "logo",
                width: "100"
              })
            ], -1))
          ])
        ])
      ]))), 128))
    ]));
  }
}, Dg = /* @__PURE__ */ Qe(Tg, [["__scopeId", "data-v-43045d69"]]), Ig = { class: "chart-section-title my-3" }, Lg = { class: "chart-section" }, Bg = { key: 0 }, Fg = { class: "chart-title" }, $g = { key: 0 }, Vg = { class: "chart-title" }, Pg = {
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
    const D = o, a = H([]), b = H([]), g = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], M = (S, R) => {
      var ke, Oe;
      const A = "area", q = Fa[A] || {}, X = ((ke = S.data[0]) == null ? void 0 : ke.label) || [], re = (((Oe = S.data[0]) == null ? void 0 : Oe.score) || []).map((Ae) => Number.isNaN(Number(Ae)) ? Ae : Number(Ae)), de = [{ name: S.title, data: re }], fe = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Q = X.map((Ae, it) => fe[Math.floor(it / (52 / 12))]), B = [], T = /* @__PURE__ */ new Set();
      Q.forEach((Ae) => {
        T.has(Ae) ? B.push("") : (B.push(Ae), T.add(Ae));
      });
      const W = {
        xaxis: {
          categories: B,
          title: {
            text: "Month",
            style: {
              fontSize: "14px",
              fontWeight: 500,
              color: "#666"
            }
          },
          tickPlacement: "on",
          labels: {
            style: {
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
              colors: "#777"
            },
            rotate: 0,
            trim: !1
          }
        },
        yaxis: {
          title: {
            text: "Indexed Consumption",
            style: {
              fontSize: "14px",
              fontWeight: 500,
              color: "#666"
            }
          }
        },
        colors: [g[R % g.length]],
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
        },
        markers: {
          size: 0
        },
        tooltip: {
          enabled: !0,
          shared: !0,
          intersect: !1,
          custom: ({ series: Ae, seriesIndex: it, dataPointIndex: zt, w: Ht }) => {
            const cn = Ht.globals.labels[zt], dn = Ae[it][zt];
            return `
                    <div style="
                        border-radius: 6px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        font-family: Inter, sans-serif;
                        font-size: 14px;
                    ">
                        <div style="
                            background-color: #f1f1f1;
                            padding: 8px 12px;
                            font-weight: 600;
                        ">
                            Week ${cn}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption (Annual): </span>
                            <span style="font-weight: 600;">${dn}</span>
                        </div>
                    </div>
                `;
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
        section: S.section,
        chartType: A,
        title: S.title,
        series: de,
        options: {
          ...q,
          ...W,
          chart: {
            type: A,
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
    }, L = (S) => {
      if (!S)
        return "bar";
      const R = S.toString().toLowerCase().trim();
      return (R.includes("vertical") || R.includes("verical")) && (R.includes("bar") || R.includes("bars") || R.includes("chart")) || R === "horizontal" ? "bar" : R === "donut" ? "donut" : R === "pie" ? "pie" : R === "radar" ? "radar" : R === "line" ? "line" : R === "area" ? "area" : R;
    }, I = $e(() => D.charts.filter((S) => S.data && S.data.length > 0).map((S, R) => {
      var Q, B;
      const A = L(v0[S.type] || S.type), q = Fa[A] || {}, X = ((Q = S.data[0]) == null ? void 0 : Q.label) || [], re = (((B = S.data[0]) == null ? void 0 : B.score) || []).map((T) => Number.isNaN(Number(T)) ? T : Number(T));
      let de = [], fe = {};
      if (A === "horizontal")
        de = [{ name: S.title, data: re }], fe = {
          labels: X,
          colors: [g[R % g.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (A === "bar" || A === "vertical bar" || A === "vertical bars" || A === "Vertical bars" || A === "vertical chart")
        S.title === "Average View of Digital consumption (Daily)" ? (de = [{ name: "Indexed Consumption", data: re }], fe = {
          xaxis: {
            categories: X,
            title: {
              text: "Hour of the Day",
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#666"
              }
            },
            labels: {
              style: {
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                colors: "#777"
              },
              formatter: (T) => `${T}:00`
              // Optional: show "1:00", "2:00", etc.
            }
          },
          yaxis: {
            title: {
              text: "Indexed Consumption",
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#666"
              }
            },
            labels: {
              style: {
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                colors: "#777"
              }
            }
          },
          colors: [g[R % g.length]],
          plotOptions: {
            bar: {
              horizontal: !1,
              distributed: !1,
              borderRadius: 4,
              columnWidth: "50%"
            }
          },
          tooltip: {
            enabled: !0,
            shared: !1,
            intersect: !0,
            custom: ({ series: T, seriesIndex: W, dataPointIndex: ke, w: Oe }) => {
              const Ae = Oe.globals.labels[ke], it = T[W][ke];
              return `
                    <div style="
                        border-radius: 6px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        font-family: Inter, sans-serif;
                        font-size: 14px;
                    ">
                        <div style="
                            background-color: #f1f1f1;
                            padding: 8px 12px;
                            font-weight: 600;
                        ">
                            Hour ${Ae}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption: </span>
                            <span style="font-weight: 600;">${it}</span>
                        </div>
                    </div>
                `;
            }
          },
          dataLabels: {
            enabled: !1
          },
          grid: {
            borderColor: "#f1f1f1",
            row: {
              colors: ["transparent", "transparent"],
              opacity: 0.5
            }
          }
        }) : (S.title === "Personality archetype" && console.log(re), de = [{ name: S.title, data: re }], fe = {
          labels: X,
          colors: [g[R % g.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (A === "line" || A === "area")
          return M(S, R);
        A === "radar" ? (de = [{ name: S.title, data: re }], fe = { labels: X }) : (A === "donut" || A === "pie") && (de = re, fe = { labels: X });
      }
      return {
        section: S.section,
        chartType: A,
        title: S.title,
        series: de,
        options: {
          ...q,
          ...fe,
          chart: { type: A }
        }
      };
    }));
    Sn(() => {
      a.value = new Array(I.value.length).fill(!1);
    });
    const P = (S, R) => {
      if (!S || a.value[R])
        return;
      b.value[R] = S;
      const { stop: A } = oh(
        S,
        ([q]) => {
          q.isIntersecting && (a.value[R] = !0, A());
        },
        { threshold: 0.1 }
      );
    }, $ = () => {
      const S = I.value.length;
      return S === 1 ? "full-width" : S === 2 ? "half-width" : "third-width";
    }, V = {
      title: "Top types of social media behaviour",
      section: "Digital Consumption",
      description: "Top types of social media consumption for audiences of Banfield versus Population",
      data: [
        {
          name: "Career Builders",
          x: "65",
          y: "50"
        },
        {
          name: "Social Shoppers",
          x: "85",
          y: "60"
        },
        {
          name: "Social Fashonistas",
          x: "45",
          y: "35"
        },
        {
          name: "Social Gamers",
          x: "30",
          y: "40"
        },
        {
          name: "Scrollers",
          x: "70",
          y: "75"
        },
        {
          name: "Brand Followers",
          x: "90",
          y: "55"
        },
        {
          name: "Lifestyle Followers",
          x: "75",
          y: "65"
        },
        {
          name: "Content Creators",
          x: "40",
          y: "30"
        },
        {
          name: "Influencer Followers",
          x: "60",
          y: "50"
        },
        {
          name: "Celebrity Followers",
          x: "35",
          y: "45"
        },
        {
          name: "Social Sports Fan",
          x: "25",
          y: "30"
        }
      ]
    }, Y = $e(() => ({
      chartType: "bar",
      title: V.title,
      section: V.section,
      description: V.description,
      series: [
        {
          name: "Audience",
          data: V.data.map((S) => ({
            x: S.name,
            // e.g. 'Career Builders'
            y: Number(S.x),
            // e.g. 65 (Audience value)
            goals: [
              {
                name: "Population",
                value: Number(S.y),
                // e.g. 50
                strokeWidth: 28,
                strokeHeight: 10,
                strokeColor: "#775DD0"
              }
            ]
          }))
        }
      ],
      options: {
        chart: {
          type: "bar",
          height: 400
        },
        plotOptions: {
          bar: {
            horizontal: !1,
            barHeight: "70%"
          }
        },
        dataLabels: {
          enabled: !0,
          formatter(S, R) {
            const { goals: A } = R.w.config.series[R.seriesIndex].data[R.dataPointIndex];
            return A && A.length ? `${S} / ${A[0].value}` : S;
          },
          style: {
            fontSize: "12px",
            colors: ["#333"]
          }
        },
        legend: {
          show: !0,
          showForSingleSeries: !0,
          customLegendItems: ["Audience", "Population"],
          markers: {
            fillColors: ["#008FFB", "#775DD0"]
          }
        },
        tooltip: {
          shared: !0,
          intersect: !1
        },
        grid: {
          borderColor: "#E4E4E7",
          strokeDashArray: 4
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "12px",
              fontFamily: "Inter",
              colors: "#777"
            }
          }
        }
      }
    }));
    return (S, R) => (h(), y("div", null, [
      f("h5", Ig, ie(I.value[0].section.charAt(0).toUpperCase() + I.value[0].section.slice(1)), 1),
      f("div", Lg, [
        (h(!0), y(xe, null, we(I.value, (A, q) => (h(), y("div", {
          key: A.title + q,
          ref_for: !0,
          ref: (X) => P(X, q),
          class: Ue(["chart-wrapper", $()])
        }, [
          a.value[q] ? (h(), y("div", Bg, [
            f("div", Fg, ie(A.title), 1),
            Z(w(La), {
              options: A.options,
              series: A.series,
              type: A.chartType,
              width: "100%",
              height: A.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : F("", !0)
        ], 2))), 128)),
        I.value.length === 2 ? (h(), me(Dg, {
          key: 0,
          tags: o.tags || [],
          charts: o.charts || []
        }, null, 8, ["tags", "charts"])) : F("", !0)
      ]),
      I.value[0].section === "Digital Consumption" ? (h(), y("div", $g, [
        f("div", {
          class: Ue(["chart-wrapper", { "full-width": !0 }])
        }, [
          f("div", Vg, ie(V.title), 1),
          Z(w(La), {
            options: Y.value.options,
            series: Y.value.series,
            type: "bar",
            width: "100%",
            height: "500"
          }, null, 8, ["options", "series"])
        ])
      ])) : F("", !0)
    ]));
  }
}, Og = /* @__PURE__ */ Qe(Pg, [["__scopeId", "data-v-1536d93e"]]), Rg = "5.12.1", Gg = 25, Mg = 0, Ug = 100, Wg = 450, Ng = 450, qg = "*Final5", zg = 0, Hg = [], Qg = [
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
], Kg = [], Yg = {}, Zg = {
  v: Rg,
  fr: Gg,
  ip: Mg,
  op: Ug,
  w: Wg,
  h: Ng,
  nm: qg,
  ddd: zg,
  assets: Hg,
  layers: Qg,
  markers: Kg,
  props: Yg
}, Xg = {
  key: 0,
  class: "explore-insights-loader"
}, Jg = {
  key: 1,
  class: "explore-insights-wrapper"
}, jg = { class: "explore-insights" }, ex = { class: "explore-insights-subtitle" }, tx = { class: "d-flex flex-column" }, nx = { class: "mb-2" }, ix = { class: "pd-segment-title-details" }, rx = { class: "pd-segment-title-details" }, ax = { key: 0 }, sx = { class: "thumbnail-card" }, lx = { class: "thumbnail-segment-cards" }, ox = { class: "segment-card-row" }, ux = {
  __name: "ExploreInsights",
  emits: ["apiError"],
  setup(o, { emit: D }) {
    const a = D, b = un(), g = b.get_selectedSegment, M = H(null), L = $e(() => M.value || {}), I = H(), P = H([]), $ = H(!0), V = H([]);
    Sn(async () => {
      var R, A, q, X, Ee;
      if (g != null && g.segmentId)
        try {
          $.value = !0;
          const re = await li.get(
            `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${g != null && g.segmentId ? g == null ? void 0 : g.segmentId : (R = un.get_selectedSegment) == null ? void 0 : R.segmentId}`,
            {
              headers: {
                Authorization: `Bearer ${b.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-tenant": b.tenantId,
                "brand-id": b.brandId
              }
            }
          );
          (A = re == null ? void 0 : re.data) != null && A.data || a("apiError", {
            error: "Empty response",
            headline: "Error",
            message: "Sorry, an error occurred while getting your insights."
          }), M.value = (X = (q = re.data) == null ? void 0 : q.data) == null ? void 0 : X[0];
          const de = M.value.charts.reduce((fe, Q, B, T) => (B < 2 ? (fe[0] || (fe[0] = []), fe[0].push(Q)) : B < 5 ? (fe[1] || (fe[1] = []), fe[1].push(Q)) : (fe[2] || (fe[2] = []), fe[2].push(Q)), fe), []);
          P.value = M.value.segments[0], V.value = Object.values(de), await uh(5e3), $.value = !1;
        } catch (re) {
          $.value = !1;
          const de = {
            error: re,
            headline: "Error",
            message: ((Ee = re == null ? void 0 : re.response) == null ? void 0 : Ee.data) || "Sorry, an error occurred while getting your insights."
          };
          a(de);
        }
    }), $e(() => {
      var R, A, q;
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
          categories: ((A = (R = g.thumbnail) == null ? void 0 : R.graph) == null ? void 0 : A.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((q = g.thumbnail) == null ? void 0 : q.title) || "",
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
    }), $e(() => {
      var R, A, q;
      return ((q = (A = (R = g.thumbnail) == null ? void 0 : R.graph) == null ? void 0 : A.seriesCombined) == null ? void 0 : q.map((X) => ({
        name: X.name,
        data: X.data.map(Number)
      }))) || [];
    });
    const Y = $e(() => {
      var R, A, q, X;
      return ((X = (q = (A = (R = g.thumbnail) == null ? void 0 : R.segments) == null ? void 0 : A[0]) == null ? void 0 : q.segments) == null ? void 0 : X.slice(0, 4)) || [];
    });
    $e(() => Y.value.map((q) => parseFloat(q.affinityScore || "0")).reduce((q, X) => q + X, 0).toFixed(2)), $e(() => Y.value.map((A) => parseInt(A.reach || "0", 10)).reduce((A, q) => A + q, 0).toLocaleString());
    function S(R) {
      return R == null ? "" : (typeof R == "string" ? parseInt(R, 10) : R).toLocaleString();
    }
    return (R, A) => {
      var q, X, Ee;
      return h(), y(xe, null, [
        $.value ? (h(), y("div", Xg, [
          Z(w(lh), {
            height: "40vh",
            ref_key: "anim",
            ref: I,
            "animation-data": w(Zg),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          A[0] || (A[0] = f("h6", null, [
            tt("Generating Open Intelligence Insights"),
            f("span", { class: "dot-animate" }, [
              f("span", null, "."),
              f("span", null, "."),
              f("span", null, ".")
            ])
          ], -1))
        ])) : F("", !0),
        $.value ? F("", !0) : (h(), y("div", Jg, [
          f("div", jg, [
            f("h6", ex, [
              f("div", tx, [
                f("div", nx, [
                  A[1] || (A[1] = f("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  tt(ie(((q = w(g)) == null ? void 0 : q.name) || "Segment Overview"), 1)
                ]),
                f("div", ix, [
                  A[2] || (A[2] = f("strong", null, "Count:", -1)),
                  tt(" " + ie(S((X = w(g)) == null ? void 0 : X.count)), 1)
                ]),
                f("div", rx, [
                  A[3] || (A[3] = f("strong", null, "Description:", -1)),
                  tt(" " + ie((Ee = w(g)) == null ? void 0 : Ee.description), 1)
                ])
              ]),
              A[4] || (A[4] = f("span", { class: "logo-wrapper" }, [
                f("span", null, "Enrichment Source:"),
                f("img", {
                  src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                  alt: "logo",
                  width: "120"
                })
              ], -1))
            ]),
            M.value ? (h(), y("div", ax, [
              f("div", sx, [
                f("div", lx, [
                  f("div", ox, [
                    (h(), me(n2, {
                      key: R.index,
                      "segment-data": P.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ])) : F("", !0),
            M.value ? (h(!0), y(xe, { key: 1 }, we(V.value, (re, de) => {
              var fe;
              return h(), y("div", {
                key: ((fe = re == null ? void 0 : re[0]) == null ? void 0 : fe.section) + de
              }, [
                re ? (h(), me(Og, {
                  key: 0,
                  charts: re || [],
                  tags: L.value.tags || []
                }, null, 8, ["charts", "tags"])) : F("", !0)
              ]);
            }), 128)) : F("", !0)
          ])
        ]))
      ], 64);
    };
  }
}, cx = /* @__PURE__ */ Qe(ux, [["__scopeId", "data-v-b75353c6"]]), dx = { key: 0 }, fx = { key: 1 }, px = { class: "discovery-header" }, hx = {
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
    const a = D, b = un(), g = tr(), M = o, L = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], I = H("standard"), P = H(L[0]), $ = H(!1), V = H(null);
    function Y(q) {
      V.value = q, $.value = !0;
    }
    function S() {
      a("close");
    }
    function R(q) {
      a("insertSegment", q);
    }
    function A() {
      $.value = !1;
    }
    return Sn(() => {
      b.set_brandId(M.brandId), b.set_token(M.token), b.set_tenantId(M.tenantId), b.set_baseUrl(M.baseUrl), g.set_customSegmentUrl(M.customSegmentUrl), I.value = b.get_activeTab;
    }), (q, X) => (h(), me(w(g0), {
      onClose: S,
      size: "large"
    }, {
      header: Bt(() => [
        $.value ? F("", !0) : (h(), y("div", dx, [
          X[1] || (X[1] = f("div", { class: "header" }, [
            f("h4", null, "Segment Manager")
          ], -1)),
          Z(w(ah), {
            tabs: L,
            modelValue: P.value,
            "onUpdate:modelValue": X[0] || (X[0] = (Ee) => P.value = Ee),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        $.value ? (h(), y("div", fx, [
          f("div", {
            onClick: A,
            class: "navigation"
          }, [
            Z(w(Ft), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            X[2] || (X[2] = f("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          f("div", px, [
            X[3] || (X[3] = f("div", { class: "discovery-header-title" }, [
              f("h6", null, "Segment Manager"),
              f("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ], -1)),
            Z(w(nt), { label: "Go to activation" })
          ])
        ])) : F("", !0)
      ]),
      body: Bt(() => [
        P.value.id === 1 && !$.value ? (h(), me(fm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: R,
          onShowInsightsExplorer: Y,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: V.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : F("", !0),
        P.value.id === 2 && !$.value ? (h(), me(gg, {
          key: 1,
          onInsertSegment: R,
          onShowInsightsExplorer: Y,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : F("", !0),
        $.value ? (h(), me(cx, { key: 2 })) : F("", !0)
      ]),
      _: 1
    }));
  }
}, wx = /* @__PURE__ */ Qe(hx, [["__scopeId", "data-v-087600d9"]]);
export {
  wx as BetaSegmentManagerModal,
  gg as CustomSegments,
  cx as ExploreInsights,
  fm as StandardSegments,
  tr as useCustomSegmentStore,
  un as useSegmentManagerStore
};
