import { ref as W, computed as Ve, watch as ln, createElementBlock as x, openBlock as h, normalizeClass as Ue, createElementVNode as f, createCommentVNode as F, normalizeStyle as En, createBlock as de, unref as S, Fragment as he, renderList as Ee, createTextVNode as tt, toDisplayString as ne, withKeys as $a, renderSlot as ir, createVNode as Z, onMounted as wn, onUnmounted as rh, resolveComponent as g0, withCtx as Vt, withModifiers as ah, nextTick as c0 } from "vue";
import { CataUiInputCheckbox as Sn, CataUiIcon as Ot, CataUiStatusLabel as sh, CataUiInputDate as x0, CataUiInputSelect as Ft, CataUiInput as $t, CataUiButton as ct, CataUiTooltip as d0, CataUiModal as y0, CataUiTabs as Ia, CataUiSpinner as zn, CataUiTabSwitch as lh } from "@catalyst/ui-library";
import { defineStore as k0 } from "pinia";
import ci from "axios";
import An from "dayjs";
import { CataCoreUiChart as La } from "@catalyst-core/ui-library";
import { v4 as Ca } from "uuid";
import { Container as Ba, Draggable as oh } from "vue3-smooth-dnd";
import { LottieAnimation as uh } from "lottie-web-vue";
import { useIntersectionObserver as f0, promiseTimeout as ch } from "@vueuse/core";
const dh = {
  async fetch_database_model(o, L) {
    try {
      const a = await gh(o, L);
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
    var L;
    try {
      const a = await xh(o);
      this.set_custom_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((L = a.response) == null ? void 0 : L.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(b);
    }
  },
  async generate_ai_query(o, L) {
    var a;
    try {
      return (await kh(o, L)).data;
    } catch (b) {
      const m = {
        error: b,
        headline: "Error",
        message: ((a = b == null ? void 0 : b.response) == null ? void 0 : a.data) || "Sorry, an error occurred while generating your query."
      };
      this.set_ApiError(m);
    }
  },
  async validate_query(o) {
    var L;
    try {
      const a = await validateQuery(o);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((L = a == null ? void 0 : a.response) == null ? void 0 : L.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(b);
    }
  },
  async run_query(o, L) {
    var a;
    try {
      return (await yh(o, L)).count;
    } catch (b) {
      const m = {
        error: b,
        headline: "Error",
        message: ((a = b == null ? void 0 : b.response) == null ? void 0 : a.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(m);
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
}, fh = {
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
}, ar = k0("customSegmentStore", {
  state: () => ({
    customSegmentUrl: "",
    databaseModel: [],
    settings: null,
    aiGeneratedInfo: null,
    aiGeneratedQuery: null,
    aiGeneratedInfoMessage: null,
    freeFormQuery: null
  }),
  actions: dh,
  getters: fh
}), Cn = "", sr = ci.create(), di = ci.create();
ci.create();
sr.interceptors.request.use(
  (o) => {
    const L = on();
    return o.baseURL = L.baseUrl, o.headers.Authorization = `Bearer ${L.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = L.tenantId, o.headers["brand-id"] = L.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", v0(o), o;
  },
  (o) => Promise.reject(o)
);
di.interceptors.request.use(
  (o) => {
    const L = on(), a = ar();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${L.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = L.tenantId, o.headers["brand-id"] = L.brandId, v0(o), o;
  },
  (o) => Promise.reject(o)
);
const ph = () => ci.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), v0 = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, p0 = (o, L) => sr.get(`${Cn}/api/v1/segments/${L ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), hh = (o) => sr.get(`${Cn}/api/v1/insights/${o}`, { params: queryParams }).then((L) => L.data).catch((L) => {
  throw L;
}), mh = () => sr.get(`${Cn}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), gh = (o, L) => di.get(`${Cn}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), xh = () => di.get(`${Cn}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), yh = (o, L) => di.post(`${Cn}/api/v1/query/${L}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), kh = (o, L) => di.post(`${Cn}/api/v1/query/gen/${L}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), vh = {
  async fetch_appSettings() {
    try {
      const o = await ph();
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
      return await hh(this.brandId, this.tenantId);
    } catch (o) {
      const L = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting insights your data."
      };
      this.set_ApiError(L);
    }
  },
  async fetch_segments() {
    try {
      if (Object.keys(this.profile).length > 0 && this.profile.market.length > 0 && this.applicationType === "standalone")
        this.set_demographics(this.profile);
      else if (this.brief.region && this.brief.market && this.brief.language && this.brief.channel) {
        const m = {
          region: this.brief.region,
          market: this.brief.market,
          language: this.brief.language,
          channel: this.brief.channel
        };
        this.set_demographics(m);
      }
      const o = this.platform || 1;
      this.currentPage = 1;
      const L = {
        ...this.query,
        page: 1
      }, a = await p0(L, o);
      let b;
      a != null && a.data && (b = a.data.map((m) => ({
        ...m,
        status: {
          type: m.status,
          value: m.status ? m.status : "active",
          color: this.stateColors[m.status]
        }
      }))), this.set_numberOfPages(a.totalPages), this.set_segments(b);
    } catch (o) {
      const L = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(L);
    }
  },
  async fetch_nextSegmentPage() {
    var a;
    const o = this.platform, L = {
      ...this.query,
      page: this.currentPage + 1
    };
    try {
      const b = await p0(L, o), m = b.data.map((C) => ({
        ...C,
        status: {
          type: C.status,
          value: C.status ? C.status : "active",
          color: this.stateColors[C.status]
        }
      }));
      this.set_numberOfPages(b.totalPages), this.add_segments(m);
    } catch (b) {
      const m = {
        error: b,
        headline: "Error",
        message: ((a = b.response) == null ? void 0 : a.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(m);
    }
  },
  async fetch_segment_settings(o) {
    var L;
    try {
      const a = await mh(o);
      this.set_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((L = a.response) == null ? void 0 : L.data) || "Sorry, an error occurred while getting your data."
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
}, _h = {
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
}, on = k0("segmentManagerStore", {
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
  actions: vh,
  getters: _h
}), ui = Object.freeze({
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
}), He = (o, L) => {
  const a = o.__vccOpts || o;
  for (const [b, m] of L)
    a[b] = m;
  return a;
}, bh = ["onClick"], Eh = { key: 0 }, Sh = ["onClick"], Ah = { class: "text-center" }, wh = ["title"], Ch = ["title"], Th = ["onClick"], Dh = {
  key: 0,
  class: "checkbox-container"
}, Ih = ["onKeydown", "onClick"], Lh = ["src"], Bh = {
  key: 4,
  class: "d-flex justify-content-end pr-45"
}, Fh = ["title"], $h = {
  key: 0,
  class: "no-matches"
}, Vh = {
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
  setup(o, { emit: L }) {
    const a = L, b = o, m = W(null), C = W(!1), D = W(1), G = W([]), X = W(null), M = W(!1), z = W({}), Y = Ve(
      {
        get() {
          return b.checkedRows;
        },
        set(q) {
          G.value = q;
        }
      }
    ), H = Ve(() => b.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${b.stickyHeader}px;` : "");
    function B() {
      b.expandable && b.rows.length > 0 && (M.value = !M.value, M.value === !1 && (z.value = {}));
    }
    function w(q) {
      return b.expandable && q.details.length === 1;
    }
    function I(q) {
      z[q] ? z[q] = !z[q] : this.$set(z, q, !0);
    }
    function J(q) {
      X.value = q;
    }
    function xe(q, V, $) {
      $.key !== "actions" && $.type !== "link" && V.showInAction !== !1 && a("rowClicked", { event: q, row: V });
    }
    function fe(q) {
      b.sortable && q.key !== "actions" && q.type !== "link" && (m.value === q.key ? D.value *= -1 : (m.value = q.key, D.value = 1), a("columnSorted", { sortColumn: m.value, sortOrder: D }));
    }
    function oe(q, V) {
      let $ = "";
      if (typeof q == "object" ? $ = q.value : $ = q, V === "datetime") {
        const P = An(new Date($));
        return An(P).format("DD MMM YYYY");
      }
      if (V === "datetimehour") {
        const P = An(new Date($));
        return An(P).format("DD MMM YYYY, HH:mm");
      }
      return V === "number" || (typeof $ == "number" || typeof $ == "string" && !Number.isNaN(Number($))) && String($).trim() !== "" ? (typeof $ == "string" ? Number($) : $).toLocaleString() : $;
    }
    function ue(q) {
      return q == null ? "" : (typeof q == "string" ? parseInt(q, 10) : q).toLocaleString();
    }
    return ln(C, (q) => {
      q === "true" || q === !0 ? b.rows.forEach((V) => {
        !G.value.includes(V.id) && V.showInAction !== !1 && G.value.push(V.id);
      }) : G.value = [], a("rowChecked", G.value);
    }), (q, V) => (h(), x("div", {
      class: Ue(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      f("table", {
        class: Ue(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        f("thead", null, [
          f("tr", {
            onClick: V[1] || (V[1] = ($) => B())
          }, [
            !o.collapseControls && !o.expandable ? (h(), x("th", {
              key: 0,
              class: "checkbox-container",
              style: En(H.value)
            }, [
              o.selectable ? (h(), de(S(Sn), {
                key: 0,
                modelValue: C.value,
                "onUpdate:modelValue": V[0] || (V[0] = ($) => C.value = $)
              }, null, 8, ["modelValue"])) : F("", !0)
            ], 4)) : F("", !0),
            o.expandable ? (h(), x("th", {
              key: 1,
              class: Ue(["text-center", {
                expandable: o.expandable
              }]),
              style: En(H.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), de(S(Ot), {
                key: 0,
                class: "expand-icon",
                icon: M.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: M.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : F("", !0)
            ], 6)) : F("", !0),
            (h(!0), x(he, null, Ee(o.columns, ($) => (h(), x("th", {
              style: En(H.value),
              key: $.id,
              onClick: (P) => fe($),
              class: Ue({
                actions: $.key === "actions",
                active: m.value === $.key,
                sortable: o.sortable && $.key !== "actions" && $.type != "link",
                expandable: o.expandable
              })
            }, [
              $.key !== "actions" && $.type != "link" ? (h(), x(he, { key: 0 }, [
                tt(ne($.value) + " ", 1),
                o.sortable ? (h(), de(S(Ot), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : F("", !0)
              ], 64)) : F("", !0)
            ], 14, bh))), 128))
          ])
        ]),
        o.rows ? (h(), x("tbody", Eh, [
          (h(!0), x(he, null, Ee(o.rows, ($) => (h(), x(he, null, [
            (h(!0), x(he, null, Ee($.details, (P) => (h(), x(he, null, [
              o.expandable & M.value || w($) ? (h(), x("tr", {
                class: Ue({ expandable: o.expandable && P.details.length === 1 }),
                key: P.id,
                onClick: (ke) => I(P.id)
              }, [
                f("td", Ah, [
                  P.details.length > 1 ? (h(), de(S(Ot), {
                    key: 0,
                    class: "expand-icon",
                    icon: z.value[P.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: z.value[P.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : F("", !0)
                ]),
                (h(!0), x(he, null, Ee(o.columns, (ke) => (h(), x("td", {
                  style: En({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[ke.key] ? `${o.minWidthCell[ke.key]}px` : "0px"
                  }),
                  key: ke.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: oe(P[ke.key].value || P[ke.key], ke.type)
                    }, ne(oe(P[ke.key], ke.type)), 9, wh)
                  ])
                ], 4))), 128))
              ], 10, Sh)) : F("", !0),
              P.details.length > 1 && z.value[P.id] ? (h(!0), x(he, { key: 1 }, Ee(P.details, (ke) => (h(), x("tr", {
                class: "subrow-details",
                key: ke.id
              }, [
                V[4] || (V[4] = f("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), x(he, null, Ee(o.columns, (Be) => (h(), x("td", {
                  style: En({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Be.key] ? `${o.minWidthCell[Be.key]}px` : "0px"
                  }),
                  key: Be.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: oe(ke[Be.key], Be.type)
                    }, ne(oe(ke[Be.key], Be.type)), 9, Ch)
                  ])
                ], 4))), 128))
              ]))), 128)) : F("", !0)
            ], 64))), 256)),
            (o.expandable && $.details.length) > 1 || o.expandable && $.details[0].details.length > 1 || !o.expandable ? (h(), x("tr", {
              class: Ue({
                active: Y.value.includes($.id),
                static: $.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: X.value === $._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: $.id,
              onClick: (P) => J($._id)
            }, [
              o.collapseControls ? F("", !0) : (h(), x("td", Dh, [
                o.selectable && $.showInAction !== !1 ? (h(), de(S(Sn), {
                  key: 0,
                  modelValue: Y.value,
                  "onUpdate:modelValue": V[2] || (V[2] = (P) => Y.value = P),
                  val: $.id,
                  onInput: V[3] || (V[3] = (P) => q.$emit(S(ui).ROW_CHECKED, G.value))
                }, null, 8, ["modelValue", "val"])) : F("", !0)
              ])),
              (h(!0), x(he, null, Ee(o.columns, (P) => (h(), x("td", {
                class: Ue({
                  actions: P.key === "actions",
                  fixedActions: o.fixedActions && P.key === "actions"
                }),
                style: En({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[P.key] ? `${o.minWidthCell[P.key]}px` : "0px"
                }),
                key: P.key,
                onKeydown: $a((ke) => xe(ke, $, P), ["enter"]),
                onClick: (ke) => xe(ke, $, P)
              }, [
                $[P.key] !== void 0 && $[P.key] !== null && P.key !== "actions" ? (h(), x(he, { key: 0 }, [
                  $[P.key].icon ? (h(), x("img", {
                    key: 0,
                    alt: "",
                    src: $[P.key].icon,
                    class: Ue(P.key)
                  }, null, 10, Lh)) : $[P.key].biicon ? (h(), x("span", {
                    key: 1,
                    class: Ue(["table-bi-icon", $[P.key].biicon]),
                    style: En({ color: $[P.key].color })
                  }, null, 6)) : F("", !0),
                  $[P.key].type ? (h(), de(S(sh), {
                    key: 2,
                    "font-size": 12,
                    label: $[P.key].value,
                    color: $[P.key].color
                  }, null, 8, ["label", "color"])) : P.type === "link" ? ir(q.$slots, "linkHandler", {
                    key: 3,
                    link: { row: $, columnKey: P.key }
                  }, void 0, !0) : P.type === "number" ? (h(), x("span", Bh, ne(ue($[P.key])), 1)) : (h(), x("span", {
                    key: 5,
                    title: oe($[P.key].value || $[P.key], P.type)
                  }, ne(oe($[P.key], P.type)), 9, Fh))
                ], 64)) : F("", !0),
                P.key === "actions" ? ir(q.$slots, "actionButton", {
                  key: 1,
                  row: $
                }, void 0, !0) : F("", !0)
              ], 46, Ih))), 128))
            ], 10, Th)) : F("", !0)
          ], 64))), 256))
        ])) : F("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), x("p", $h, " No matches found ")) : F("", !0)
    ], 2));
  }
}, Oh = /* @__PURE__ */ He(Vh, [["__scopeId", "data-v-bdd2a344"]]);
var oi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, rr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
rr.exports;
(function(o, L) {
  (function() {
    var a, b = "4.17.21", m = 200, C = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", D = "Expected a function", G = "Invalid `variable` option passed into `_.template`", X = "__lodash_hash_undefined__", M = 500, z = "__lodash_placeholder__", Y = 1, H = 2, B = 4, w = 1, I = 2, J = 1, xe = 2, fe = 4, oe = 8, ue = 16, q = 32, V = 64, $ = 128, P = 256, ke = 512, Be = 30, Ge = "...", Oe = 800, nt = 16, Pt = 1, un = 2, cn = 3, Ct = 1 / 0, Tt = 9007199254740991, kt = 17976931348623157e292, _ = NaN, T = 4294967295, ae = T - 1, vt = T >>> 1, Dt = [
      ["ary", $],
      ["bind", J],
      ["bindKey", xe],
      ["curry", oe],
      ["curryRight", ue],
      ["flip", ke],
      ["partial", q],
      ["partialRight", V],
      ["rearg", P]
    ], _t = "[object Arguments]", Rt = "[object Array]", De = "[object AsyncFunction]", Kt = "[object Boolean]", Yt = "[object Date]", fi = "[object DOMException]", Tn = "[object Error]", Dn = "[object Function]", dn = "[object GeneratorFunction]", it = "[object Map]", fn = "[object Number]", pi = "[object Null]", bt = "[object Object]", hi = "[object Promise]", lr = "[object Proxy]", pn = "[object RegExp]", K = "[object Set]", A = "[object String]", U = "[object Symbol]", we = "[object Undefined]", O = "[object WeakMap]", me = "[object WeakSet]", Qe = "[object ArrayBuffer]", Zt = "[object DataView]", In = "[object Float32Array]", Hn = "[object Float64Array]", or = "[object Int8Array]", ur = "[object Int16Array]", cr = "[object Int32Array]", dr = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", pr = "[object Uint16Array]", hr = "[object Uint32Array]", E0 = /\b__p \+= '';/g, S0 = /\b(__p \+=) '' \+/g, A0 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Va = /&(?:amp|lt|gt|quot|#39);/g, Oa = /[&<>"']/g, w0 = RegExp(Va.source), C0 = RegExp(Oa.source), T0 = /<%-([\s\S]+?)%>/g, D0 = /<%([\s\S]+?)%>/g, Pa = /<%=([\s\S]+?)%>/g, I0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, L0 = /^\w*$/, B0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, F0 = RegExp(mr.source), gr = /^\s+/, $0 = /\s/, V0 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, O0 = /\{\n\/\* \[wrapped with (.+)\] \*/, P0 = /,? & /, R0 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, G0 = /[()=,{}\[\]\/\s]/, M0 = /\\(\\)?/g, U0 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ra = /\w*$/, W0 = /^[-+]0x[0-9a-f]+$/i, N0 = /^0b[01]+$/i, q0 = /^\[object .+?Constructor\]$/, z0 = /^0o[0-7]+$/i, H0 = /^(?:0|[1-9]\d*)$/, Q0 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, mi = /($^)/, K0 = /['\n\r\u2028\u2029\\]/g, gi = "\\ud800-\\udfff", Y0 = "\\u0300-\\u036f", Z0 = "\\ufe20-\\ufe2f", J0 = "\\u20d0-\\u20ff", Ga = Y0 + Z0 + J0, Ma = "\\u2700-\\u27bf", Ua = "a-z\\xdf-\\xf6\\xf8-\\xff", X0 = "\\xac\\xb1\\xd7\\xf7", j0 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", eo = "\\u2000-\\u206f", to = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Wa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Na = "\\ufe0e\\ufe0f", qa = X0 + j0 + eo + to, xr = "['’]", no = "[" + gi + "]", za = "[" + qa + "]", xi = "[" + Ga + "]", Ha = "\\d+", io = "[" + Ma + "]", Qa = "[" + Ua + "]", Ka = "[^" + gi + qa + Ha + Ma + Ua + Wa + "]", yr = "\\ud83c[\\udffb-\\udfff]", ro = "(?:" + xi + "|" + yr + ")", Ya = "[^" + gi + "]", kr = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ln = "[" + Wa + "]", Za = "\\u200d", Ja = "(?:" + Qa + "|" + Ka + ")", ao = "(?:" + Ln + "|" + Ka + ")", Xa = "(?:" + xr + "(?:d|ll|m|re|s|t|ve))?", ja = "(?:" + xr + "(?:D|LL|M|RE|S|T|VE))?", es = ro + "?", ts = "[" + Na + "]?", so = "(?:" + Za + "(?:" + [Ya, kr, vr].join("|") + ")" + ts + es + ")*", lo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", oo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ns = ts + es + so, uo = "(?:" + [io, kr, vr].join("|") + ")" + ns, co = "(?:" + [Ya + xi + "?", xi, kr, vr, no].join("|") + ")", fo = RegExp(xr, "g"), po = RegExp(xi, "g"), _r = RegExp(yr + "(?=" + yr + ")|" + co + ns, "g"), ho = RegExp([
      Ln + "?" + Qa + "+" + Xa + "(?=" + [za, Ln, "$"].join("|") + ")",
      ao + "+" + ja + "(?=" + [za, Ln + Ja, "$"].join("|") + ")",
      Ln + "?" + Ja + "+" + Xa,
      Ln + "+" + ja,
      oo,
      lo,
      Ha,
      uo
    ].join("|"), "g"), mo = RegExp("[" + Za + gi + Ga + Na + "]"), go = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, xo = [
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
    ], yo = -1, Ce = {};
    Ce[In] = Ce[Hn] = Ce[or] = Ce[ur] = Ce[cr] = Ce[dr] = Ce[fr] = Ce[pr] = Ce[hr] = !0, Ce[_t] = Ce[Rt] = Ce[Qe] = Ce[Kt] = Ce[Zt] = Ce[Yt] = Ce[Tn] = Ce[Dn] = Ce[it] = Ce[fn] = Ce[bt] = Ce[pn] = Ce[K] = Ce[A] = Ce[O] = !1;
    var Ae = {};
    Ae[_t] = Ae[Rt] = Ae[Qe] = Ae[Zt] = Ae[Kt] = Ae[Yt] = Ae[In] = Ae[Hn] = Ae[or] = Ae[ur] = Ae[cr] = Ae[it] = Ae[fn] = Ae[bt] = Ae[pn] = Ae[K] = Ae[A] = Ae[U] = Ae[dr] = Ae[fr] = Ae[pr] = Ae[hr] = !0, Ae[Tn] = Ae[Dn] = Ae[O] = !1;
    var ko = {
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
    }, vo = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, _o = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, bo = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Eo = parseFloat, So = parseInt, is = typeof oi == "object" && oi && oi.Object === Object && oi, Ao = typeof self == "object" && self && self.Object === Object && self, We = is || Ao || Function("return this")(), br = L && !L.nodeType && L, hn = br && !0 && o && !o.nodeType && o, rs = hn && hn.exports === br, Er = rs && is.process, dt = function() {
      try {
        var d = hn && hn.require && hn.require("util").types;
        return d || Er && Er.binding && Er.binding("util");
      } catch {
      }
    }(), as = dt && dt.isArrayBuffer, ss = dt && dt.isDate, ls = dt && dt.isMap, os = dt && dt.isRegExp, us = dt && dt.isSet, cs = dt && dt.isTypedArray;
    function rt(d, y, g) {
      switch (g.length) {
        case 0:
          return d.call(y);
        case 1:
          return d.call(y, g[0]);
        case 2:
          return d.call(y, g[0], g[1]);
        case 3:
          return d.call(y, g[0], g[1], g[2]);
      }
      return d.apply(y, g);
    }
    function wo(d, y, g, N) {
      for (var ie = -1, ve = d == null ? 0 : d.length; ++ie < ve; ) {
        var Pe = d[ie];
        y(N, Pe, g(Pe), d);
      }
      return N;
    }
    function ft(d, y) {
      for (var g = -1, N = d == null ? 0 : d.length; ++g < N && y(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function Co(d, y) {
      for (var g = d == null ? 0 : d.length; g-- && y(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function ds(d, y) {
      for (var g = -1, N = d == null ? 0 : d.length; ++g < N; )
        if (!y(d[g], g, d))
          return !1;
      return !0;
    }
    function Jt(d, y) {
      for (var g = -1, N = d == null ? 0 : d.length, ie = 0, ve = []; ++g < N; ) {
        var Pe = d[g];
        y(Pe, g, d) && (ve[ie++] = Pe);
      }
      return ve;
    }
    function yi(d, y) {
      var g = d == null ? 0 : d.length;
      return !!g && Bn(d, y, 0) > -1;
    }
    function Sr(d, y, g) {
      for (var N = -1, ie = d == null ? 0 : d.length; ++N < ie; )
        if (g(y, d[N]))
          return !0;
      return !1;
    }
    function Te(d, y) {
      for (var g = -1, N = d == null ? 0 : d.length, ie = Array(N); ++g < N; )
        ie[g] = y(d[g], g, d);
      return ie;
    }
    function Xt(d, y) {
      for (var g = -1, N = y.length, ie = d.length; ++g < N; )
        d[ie + g] = y[g];
      return d;
    }
    function Ar(d, y, g, N) {
      var ie = -1, ve = d == null ? 0 : d.length;
      for (N && ve && (g = d[++ie]); ++ie < ve; )
        g = y(g, d[ie], ie, d);
      return g;
    }
    function To(d, y, g, N) {
      var ie = d == null ? 0 : d.length;
      for (N && ie && (g = d[--ie]); ie--; )
        g = y(g, d[ie], ie, d);
      return g;
    }
    function wr(d, y) {
      for (var g = -1, N = d == null ? 0 : d.length; ++g < N; )
        if (y(d[g], g, d))
          return !0;
      return !1;
    }
    var Do = Cr("length");
    function Io(d) {
      return d.split("");
    }
    function Lo(d) {
      return d.match(R0) || [];
    }
    function fs(d, y, g) {
      var N;
      return g(d, function(ie, ve, Pe) {
        if (y(ie, ve, Pe))
          return N = ve, !1;
      }), N;
    }
    function ki(d, y, g, N) {
      for (var ie = d.length, ve = g + (N ? 1 : -1); N ? ve-- : ++ve < ie; )
        if (y(d[ve], ve, d))
          return ve;
      return -1;
    }
    function Bn(d, y, g) {
      return y === y ? No(d, y, g) : ki(d, ps, g);
    }
    function Bo(d, y, g, N) {
      for (var ie = g - 1, ve = d.length; ++ie < ve; )
        if (N(d[ie], y))
          return ie;
      return -1;
    }
    function ps(d) {
      return d !== d;
    }
    function hs(d, y) {
      var g = d == null ? 0 : d.length;
      return g ? Dr(d, y) / g : _;
    }
    function Cr(d) {
      return function(y) {
        return y == null ? a : y[d];
      };
    }
    function Tr(d) {
      return function(y) {
        return d == null ? a : d[y];
      };
    }
    function ms(d, y, g, N, ie) {
      return ie(d, function(ve, Pe, Se) {
        g = N ? (N = !1, ve) : y(g, ve, Pe, Se);
      }), g;
    }
    function Fo(d, y) {
      var g = d.length;
      for (d.sort(y); g--; )
        d[g] = d[g].value;
      return d;
    }
    function Dr(d, y) {
      for (var g, N = -1, ie = d.length; ++N < ie; ) {
        var ve = y(d[N]);
        ve !== a && (g = g === a ? ve : g + ve);
      }
      return g;
    }
    function Ir(d, y) {
      for (var g = -1, N = Array(d); ++g < d; )
        N[g] = y(g);
      return N;
    }
    function $o(d, y) {
      return Te(y, function(g) {
        return [g, d[g]];
      });
    }
    function gs(d) {
      return d && d.slice(0, vs(d) + 1).replace(gr, "");
    }
    function at(d) {
      return function(y) {
        return d(y);
      };
    }
    function Lr(d, y) {
      return Te(y, function(g) {
        return d[g];
      });
    }
    function Qn(d, y) {
      return d.has(y);
    }
    function xs(d, y) {
      for (var g = -1, N = d.length; ++g < N && Bn(y, d[g], 0) > -1; )
        ;
      return g;
    }
    function ys(d, y) {
      for (var g = d.length; g-- && Bn(y, d[g], 0) > -1; )
        ;
      return g;
    }
    function Vo(d, y) {
      for (var g = d.length, N = 0; g--; )
        d[g] === y && ++N;
      return N;
    }
    var Oo = Tr(ko), Po = Tr(vo);
    function Ro(d) {
      return "\\" + bo[d];
    }
    function Go(d, y) {
      return d == null ? a : d[y];
    }
    function Fn(d) {
      return mo.test(d);
    }
    function Mo(d) {
      return go.test(d);
    }
    function Uo(d) {
      for (var y, g = []; !(y = d.next()).done; )
        g.push(y.value);
      return g;
    }
    function Br(d) {
      var y = -1, g = Array(d.size);
      return d.forEach(function(N, ie) {
        g[++y] = [ie, N];
      }), g;
    }
    function ks(d, y) {
      return function(g) {
        return d(y(g));
      };
    }
    function jt(d, y) {
      for (var g = -1, N = d.length, ie = 0, ve = []; ++g < N; ) {
        var Pe = d[g];
        (Pe === y || Pe === z) && (d[g] = z, ve[ie++] = g);
      }
      return ve;
    }
    function vi(d) {
      var y = -1, g = Array(d.size);
      return d.forEach(function(N) {
        g[++y] = N;
      }), g;
    }
    function Wo(d) {
      var y = -1, g = Array(d.size);
      return d.forEach(function(N) {
        g[++y] = [N, N];
      }), g;
    }
    function No(d, y, g) {
      for (var N = g - 1, ie = d.length; ++N < ie; )
        if (d[N] === y)
          return N;
      return -1;
    }
    function qo(d, y, g) {
      for (var N = g + 1; N--; )
        if (d[N] === y)
          return N;
      return N;
    }
    function $n(d) {
      return Fn(d) ? Ho(d) : Do(d);
    }
    function Et(d) {
      return Fn(d) ? Qo(d) : Io(d);
    }
    function vs(d) {
      for (var y = d.length; y-- && $0.test(d.charAt(y)); )
        ;
      return y;
    }
    var zo = Tr(_o);
    function Ho(d) {
      for (var y = _r.lastIndex = 0; _r.test(d); )
        ++y;
      return y;
    }
    function Qo(d) {
      return d.match(_r) || [];
    }
    function Ko(d) {
      return d.match(ho) || [];
    }
    var Yo = function d(y) {
      y = y == null ? We : Vn.defaults(We.Object(), y, Vn.pick(We, xo));
      var g = y.Array, N = y.Date, ie = y.Error, ve = y.Function, Pe = y.Math, Se = y.Object, Fr = y.RegExp, Zo = y.String, pt = y.TypeError, _i = g.prototype, Jo = ve.prototype, On = Se.prototype, bi = y["__core-js_shared__"], Ei = Jo.toString, be = On.hasOwnProperty, Xo = 0, _s = function() {
        var e = /[^.]+$/.exec(bi && bi.keys && bi.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), Si = On.toString, jo = Ei.call(Se), eu = We._, tu = Fr(
        "^" + Ei.call(be).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ai = rs ? y.Buffer : a, en = y.Symbol, wi = y.Uint8Array, bs = Ai ? Ai.allocUnsafe : a, Ci = ks(Se.getPrototypeOf, Se), Es = Se.create, Ss = On.propertyIsEnumerable, Ti = _i.splice, As = en ? en.isConcatSpreadable : a, Kn = en ? en.iterator : a, mn = en ? en.toStringTag : a, Di = function() {
        try {
          var e = vn(Se, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), nu = y.clearTimeout !== We.clearTimeout && y.clearTimeout, iu = N && N.now !== We.Date.now && N.now, ru = y.setTimeout !== We.setTimeout && y.setTimeout, Ii = Pe.ceil, Li = Pe.floor, $r = Se.getOwnPropertySymbols, au = Ai ? Ai.isBuffer : a, ws = y.isFinite, su = _i.join, lu = ks(Se.keys, Se), Re = Pe.max, qe = Pe.min, ou = N.now, uu = y.parseInt, Cs = Pe.random, cu = _i.reverse, Vr = vn(y, "DataView"), Yn = vn(y, "Map"), Or = vn(y, "Promise"), Pn = vn(y, "Set"), Zn = vn(y, "WeakMap"), Jn = vn(Se, "create"), Bi = Zn && new Zn(), Rn = {}, du = _n(Vr), fu = _n(Yn), pu = _n(Or), hu = _n(Pn), mu = _n(Zn), Fi = en ? en.prototype : a, Xn = Fi ? Fi.valueOf : a, Ts = Fi ? Fi.toString : a;
      function s(e) {
        if (Le(e) && !re(e) && !(e instanceof ge)) {
          if (e instanceof ht)
            return e;
          if (be.call(e, "__wrapped__"))
            return Dl(e);
        }
        return new ht(e);
      }
      var Gn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!Ie(t))
            return {};
          if (Es)
            return Es(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = a, n;
        };
      }();
      function $i() {
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
        escape: T0,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: D0,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Pa,
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
      }, s.prototype = $i.prototype, s.prototype.constructor = s, ht.prototype = Gn($i.prototype), ht.prototype.constructor = ht;
      function ge(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = T, this.__views__ = [];
      }
      function gu() {
        var e = new ge(this.__wrapped__);
        return e.__actions__ = Je(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Je(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Je(this.__views__), e;
      }
      function xu() {
        if (this.__filtered__) {
          var e = new ge(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function yu() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = re(e), i = t < 0, r = n ? e.length : 0, l = I1(0, r, this.__views__), u = l.start, c = l.end, p = c - u, k = i ? c : u - 1, v = this.__iteratees__, E = v.length, R = 0, Q = qe(p, this.__takeCount__);
        if (!n || !i && r == p && Q == p)
          return Xs(e, this.__actions__);
        var ee = [];
        e:
          for (; p-- && R < Q; ) {
            k += t;
            for (var le = -1, te = e[k]; ++le < E; ) {
              var pe = v[le], ye = pe.iteratee, ot = pe.type, Ze = ye(te);
              if (ot == un)
                te = Ze;
              else if (!Ze) {
                if (ot == Pt)
                  continue e;
                break e;
              }
            }
            ee[R++] = te;
          }
        return ee;
      }
      ge.prototype = Gn($i.prototype), ge.prototype.constructor = ge;
      function gn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function ku() {
        this.__data__ = Jn ? Jn(null) : {}, this.size = 0;
      }
      function vu(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function _u(e) {
        var t = this.__data__;
        if (Jn) {
          var n = t[e];
          return n === X ? a : n;
        }
        return be.call(t, e) ? t[e] : a;
      }
      function bu(e) {
        var t = this.__data__;
        return Jn ? t[e] !== a : be.call(t, e);
      }
      function Eu(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Jn && t === a ? X : t, this;
      }
      gn.prototype.clear = ku, gn.prototype.delete = vu, gn.prototype.get = _u, gn.prototype.has = bu, gn.prototype.set = Eu;
      function Gt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Su() {
        this.__data__ = [], this.size = 0;
      }
      function Au(e) {
        var t = this.__data__, n = Vi(t, e);
        if (n < 0)
          return !1;
        var i = t.length - 1;
        return n == i ? t.pop() : Ti.call(t, n, 1), --this.size, !0;
      }
      function wu(e) {
        var t = this.__data__, n = Vi(t, e);
        return n < 0 ? a : t[n][1];
      }
      function Cu(e) {
        return Vi(this.__data__, e) > -1;
      }
      function Tu(e, t) {
        var n = this.__data__, i = Vi(n, e);
        return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
      }
      Gt.prototype.clear = Su, Gt.prototype.delete = Au, Gt.prototype.get = wu, Gt.prototype.has = Cu, Gt.prototype.set = Tu;
      function Mt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Du() {
        this.size = 0, this.__data__ = {
          hash: new gn(),
          map: new (Yn || Gt)(),
          string: new gn()
        };
      }
      function Iu(e) {
        var t = Qi(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Lu(e) {
        return Qi(this, e).get(e);
      }
      function Bu(e) {
        return Qi(this, e).has(e);
      }
      function Fu(e, t) {
        var n = Qi(this, e), i = n.size;
        return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
      }
      Mt.prototype.clear = Du, Mt.prototype.delete = Iu, Mt.prototype.get = Lu, Mt.prototype.has = Bu, Mt.prototype.set = Fu;
      function xn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Mt(); ++t < n; )
          this.add(e[t]);
      }
      function $u(e) {
        return this.__data__.set(e, X), this;
      }
      function Vu(e) {
        return this.__data__.has(e);
      }
      xn.prototype.add = xn.prototype.push = $u, xn.prototype.has = Vu;
      function St(e) {
        var t = this.__data__ = new Gt(e);
        this.size = t.size;
      }
      function Ou() {
        this.__data__ = new Gt(), this.size = 0;
      }
      function Pu(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function Ru(e) {
        return this.__data__.get(e);
      }
      function Gu(e) {
        return this.__data__.has(e);
      }
      function Mu(e, t) {
        var n = this.__data__;
        if (n instanceof Gt) {
          var i = n.__data__;
          if (!Yn || i.length < m - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Mt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      St.prototype.clear = Ou, St.prototype.delete = Pu, St.prototype.get = Ru, St.prototype.has = Gu, St.prototype.set = Mu;
      function Ds(e, t) {
        var n = re(e), i = !n && bn(e), r = !n && !i && sn(e), l = !n && !i && !r && Nn(e), u = n || i || r || l, c = u ? Ir(e.length, Zo) : [], p = c.length;
        for (var k in e)
          (t || be.call(e, k)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (k == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (k == "offset" || k == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (k == "buffer" || k == "byteLength" || k == "byteOffset") || // Skip index properties.
          qt(k, p))) && c.push(k);
        return c;
      }
      function Is(e) {
        var t = e.length;
        return t ? e[Qr(0, t - 1)] : a;
      }
      function Uu(e, t) {
        return Ki(Je(e), yn(t, 0, e.length));
      }
      function Wu(e) {
        return Ki(Je(e));
      }
      function Pr(e, t, n) {
        (n !== a && !At(e[t], n) || n === a && !(t in e)) && Ut(e, t, n);
      }
      function jn(e, t, n) {
        var i = e[t];
        (!(be.call(e, t) && At(i, n)) || n === a && !(t in e)) && Ut(e, t, n);
      }
      function Vi(e, t) {
        for (var n = e.length; n--; )
          if (At(e[n][0], t))
            return n;
        return -1;
      }
      function Nu(e, t, n, i) {
        return tn(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ls(e, t) {
        return e && Lt(t, Me(t), e);
      }
      function qu(e, t) {
        return e && Lt(t, je(t), e);
      }
      function Ut(e, t, n) {
        t == "__proto__" && Di ? Di(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }
      function Rr(e, t) {
        for (var n = -1, i = t.length, r = g(i), l = e == null; ++n < i; )
          r[n] = l ? a : ya(e, t[n]);
        return r;
      }
      function yn(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function mt(e, t, n, i, r, l) {
        var u, c = t & Y, p = t & H, k = t & B;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!Ie(e))
          return e;
        var v = re(e);
        if (v) {
          if (u = B1(e), !c)
            return Je(e, u);
        } else {
          var E = ze(e), R = E == Dn || E == dn;
          if (sn(e))
            return tl(e, c);
          if (E == bt || E == _t || R && !r) {
            if (u = p || R ? {} : vl(e), !c)
              return p ? _1(e, qu(u, e)) : v1(e, Ls(u, e));
          } else {
            if (!Ae[E])
              return r ? e : {};
            u = F1(e, E, c);
          }
        }
        l || (l = new St());
        var Q = l.get(e);
        if (Q)
          return Q;
        l.set(e, u), Yl(e) ? e.forEach(function(te) {
          u.add(mt(te, t, n, te, e, l));
        }) : Ql(e) && e.forEach(function(te, pe) {
          u.set(pe, mt(te, t, n, pe, e, l));
        });
        var ee = k ? p ? ra : ia : p ? je : Me, le = v ? a : ee(e);
        return ft(le || e, function(te, pe) {
          le && (pe = te, te = e[pe]), jn(u, pe, mt(te, t, n, pe, e, l));
        }), u;
      }
      function zu(e) {
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
          throw new pt(D);
        return si(function() {
          e.apply(a, n);
        }, t);
      }
      function ei(e, t, n, i) {
        var r = -1, l = yi, u = !0, c = e.length, p = [], k = t.length;
        if (!c)
          return p;
        n && (t = Te(t, at(n))), i ? (l = Sr, u = !1) : t.length >= m && (l = Qn, u = !1, t = new xn(t));
        e:
          for (; ++r < c; ) {
            var v = e[r], E = n == null ? v : n(v);
            if (v = i || v !== 0 ? v : 0, u && E === E) {
              for (var R = k; R--; )
                if (t[R] === E)
                  continue e;
              p.push(v);
            } else
              l(t, E, i) || p.push(v);
          }
        return p;
      }
      var tn = sl(It), $s = sl(Mr, !0);
      function Hu(e, t) {
        var n = !0;
        return tn(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Oi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !lt(u) : n(u, c)))
            var c = u, p = l;
        }
        return p;
      }
      function Qu(e, t, n, i) {
        var r = e.length;
        for (n = se(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : se(i), i < 0 && (i += r), i = n > i ? 0 : Jl(i); n < i; )
          e[n++] = t;
        return e;
      }
      function Vs(e, t) {
        var n = [];
        return tn(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function Ne(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = V1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? Ne(c, t - 1, n, i, r) : Xt(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Gr = ll(), Os = ll(!0);
      function It(e, t) {
        return e && Gr(e, t, Me);
      }
      function Mr(e, t) {
        return e && Os(e, t, Me);
      }
      function Pi(e, t) {
        return Jt(t, function(n) {
          return zt(e[n]);
        });
      }
      function kn(e, t) {
        t = rn(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[Bt(t[n++])];
        return n && n == i ? e : a;
      }
      function Ps(e, t, n) {
        var i = t(e);
        return re(e) ? i : Xt(i, n(e));
      }
      function Ke(e) {
        return e == null ? e === a ? we : pi : mn && mn in Se(e) ? D1(e) : W1(e);
      }
      function Ur(e, t) {
        return e > t;
      }
      function Ku(e, t) {
        return e != null && be.call(e, t);
      }
      function Yu(e, t) {
        return e != null && t in Se(e);
      }
      function Zu(e, t, n) {
        return e >= qe(t, n) && e < Re(t, n);
      }
      function Wr(e, t, n) {
        for (var i = n ? Sr : yi, r = e[0].length, l = e.length, u = l, c = g(l), p = 1 / 0, k = []; u--; ) {
          var v = e[u];
          u && t && (v = Te(v, at(t))), p = qe(v.length, p), c[u] = !n && (t || r >= 120 && v.length >= 120) ? new xn(u && v) : a;
        }
        v = e[0];
        var E = -1, R = c[0];
        e:
          for (; ++E < r && k.length < p; ) {
            var Q = v[E], ee = t ? t(Q) : Q;
            if (Q = n || Q !== 0 ? Q : 0, !(R ? Qn(R, ee) : i(k, ee, n))) {
              for (u = l; --u; ) {
                var le = c[u];
                if (!(le ? Qn(le, ee) : i(e[u], ee, n)))
                  continue e;
              }
              R && R.push(ee), k.push(Q);
            }
          }
        return k;
      }
      function Ju(e, t, n, i) {
        return It(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function ti(e, t, n) {
        t = rn(t, e), e = Sl(e, t);
        var i = e == null ? e : e[Bt(xt(t))];
        return i == null ? a : rt(i, e, n);
      }
      function Rs(e) {
        return Le(e) && Ke(e) == _t;
      }
      function Xu(e) {
        return Le(e) && Ke(e) == Qe;
      }
      function ju(e) {
        return Le(e) && Ke(e) == Yt;
      }
      function ni(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Le(e) && !Le(t) ? e !== e && t !== t : e1(e, t, n, i, ni, r);
      }
      function e1(e, t, n, i, r, l) {
        var u = re(e), c = re(t), p = u ? Rt : ze(e), k = c ? Rt : ze(t);
        p = p == _t ? bt : p, k = k == _t ? bt : k;
        var v = p == bt, E = k == bt, R = p == k;
        if (R && sn(e)) {
          if (!sn(t))
            return !1;
          u = !0, v = !1;
        }
        if (R && !v)
          return l || (l = new St()), u || Nn(e) ? xl(e, t, n, i, r, l) : C1(e, t, p, n, i, r, l);
        if (!(n & w)) {
          var Q = v && be.call(e, "__wrapped__"), ee = E && be.call(t, "__wrapped__");
          if (Q || ee) {
            var le = Q ? e.value() : e, te = ee ? t.value() : t;
            return l || (l = new St()), r(le, te, n, i, l);
          }
        }
        return R ? (l || (l = new St()), T1(e, t, n, i, r, l)) : !1;
      }
      function t1(e) {
        return Le(e) && ze(e) == it;
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
            var E = new St();
            if (i)
              var R = i(k, v, p, e, t, E);
            if (!(R === a ? ni(v, k, w | I, i, E) : R))
              return !1;
          }
        }
        return !0;
      }
      function Gs(e) {
        if (!Ie(e) || P1(e))
          return !1;
        var t = zt(e) ? tu : q0;
        return t.test(_n(e));
      }
      function n1(e) {
        return Le(e) && Ke(e) == pn;
      }
      function i1(e) {
        return Le(e) && ze(e) == K;
      }
      function r1(e) {
        return Le(e) && er(e.length) && !!Ce[Ke(e)];
      }
      function Ms(e) {
        return typeof e == "function" ? e : e == null ? et : typeof e == "object" ? re(e) ? Ns(e[0], e[1]) : Ws(e) : o0(e);
      }
      function qr(e) {
        if (!ai(e))
          return lu(e);
        var t = [];
        for (var n in Se(e))
          be.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function a1(e) {
        if (!Ie(e))
          return U1(e);
        var t = ai(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !be.call(e, i)) || n.push(i);
        return n;
      }
      function zr(e, t) {
        return e < t;
      }
      function Us(e, t) {
        var n = -1, i = Xe(e) ? g(e.length) : [];
        return tn(e, function(r, l, u) {
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
        return oa(e) && _l(t) ? bl(Bt(e), t) : function(n) {
          var i = ya(n, e);
          return i === a && i === t ? ka(n, e) : ni(t, i, w | I);
        };
      }
      function Ri(e, t, n, i, r) {
        e !== t && Gr(t, function(l, u) {
          if (r || (r = new St()), Ie(l))
            s1(e, t, u, n, Ri, i, r);
          else {
            var c = i ? i(ca(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Pr(e, u, c);
          }
        }, je);
      }
      function s1(e, t, n, i, r, l, u) {
        var c = ca(e, n), p = ca(t, n), k = u.get(p);
        if (k) {
          Pr(e, n, k);
          return;
        }
        var v = l ? l(c, p, n + "", e, t, u) : a, E = v === a;
        if (E) {
          var R = re(p), Q = !R && sn(p), ee = !R && !Q && Nn(p);
          v = p, R || Q || ee ? re(c) ? v = c : Fe(c) ? v = Je(c) : Q ? (E = !1, v = tl(p, !0)) : ee ? (E = !1, v = nl(p, !0)) : v = [] : li(p) || bn(p) ? (v = c, bn(c) ? v = Xl(c) : (!Ie(c) || zt(c)) && (v = vl(p))) : E = !1;
        }
        E && (u.set(p, v), r(v, p, i, l, u), u.delete(p)), Pr(e, n, v);
      }
      function qs(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, qt(t, n) ? e[t] : a;
      }
      function zs(e, t, n) {
        t.length ? t = Te(t, function(l) {
          return re(l) ? function(u) {
            return kn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [et];
        var i = -1;
        t = Te(t, at(j()));
        var r = Us(e, function(l, u, c) {
          var p = Te(t, function(k) {
            return k(l);
          });
          return { criteria: p, index: ++i, value: l };
        });
        return Fo(r, function(l, u) {
          return k1(l, u, n);
        });
      }
      function l1(e, t) {
        return Hs(e, t, function(n, i) {
          return ka(e, i);
        });
      }
      function Hs(e, t, n) {
        for (var i = -1, r = t.length, l = {}; ++i < r; ) {
          var u = t[i], c = kn(e, u);
          n(c, u) && ii(l, rn(u, e), c);
        }
        return l;
      }
      function o1(e) {
        return function(t) {
          return kn(t, e);
        };
      }
      function Hr(e, t, n, i) {
        var r = i ? Bo : Bn, l = -1, u = t.length, c = e;
        for (e === t && (t = Je(t)), n && (c = Te(e, at(n))); ++l < u; )
          for (var p = 0, k = t[l], v = n ? n(k) : k; (p = r(c, v, p, i)) > -1; )
            c !== e && Ti.call(c, p, 1), Ti.call(e, p, 1);
        return e;
      }
      function Qs(e, t) {
        for (var n = e ? t.length : 0, i = n - 1; n--; ) {
          var r = t[n];
          if (n == i || r !== l) {
            var l = r;
            qt(r) ? Ti.call(e, r, 1) : Zr(e, r);
          }
        }
        return e;
      }
      function Qr(e, t) {
        return e + Li(Cs() * (t - e + 1));
      }
      function u1(e, t, n, i) {
        for (var r = -1, l = Re(Ii((t - e) / (n || 1)), 0), u = g(l); l--; )
          u[i ? l : ++r] = e, e += n;
        return u;
      }
      function Kr(e, t) {
        var n = "";
        if (!e || t < 1 || t > Tt)
          return n;
        do
          t % 2 && (n += e), t = Li(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function ce(e, t) {
        return da(El(e, t, et), e + "");
      }
      function c1(e) {
        return Is(qn(e));
      }
      function d1(e, t) {
        var n = qn(e);
        return Ki(n, yn(t, 0, n.length));
      }
      function ii(e, t, n, i) {
        if (!Ie(e))
          return e;
        t = rn(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var p = Bt(t[r]), k = n;
          if (p === "__proto__" || p === "constructor" || p === "prototype")
            return e;
          if (r != u) {
            var v = c[p];
            k = i ? i(v, p, c) : a, k === a && (k = Ie(v) ? v : qt(t[r + 1]) ? [] : {});
          }
          jn(c, p, k), c = c[p];
        }
        return e;
      }
      var Ks = Bi ? function(e, t) {
        return Bi.set(e, t), e;
      } : et, f1 = Di ? function(e, t) {
        return Di(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: _a(t),
          writable: !0
        });
      } : et;
      function p1(e) {
        return Ki(qn(e));
      }
      function gt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = g(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function h1(e, t) {
        var n;
        return tn(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function Gi(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= vt) {
          for (; i < r; ) {
            var l = i + r >>> 1, u = e[l];
            u !== null && !lt(u) && (n ? u <= t : u < t) ? i = l + 1 : r = l;
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
        for (var u = t !== t, c = t === null, p = lt(t), k = t === a; r < l; ) {
          var v = Li((r + l) / 2), E = n(e[v]), R = E !== a, Q = E === null, ee = E === E, le = lt(E);
          if (u)
            var te = i || ee;
          else
            k ? te = ee && (i || R) : c ? te = ee && R && (i || !Q) : p ? te = ee && R && !Q && (i || !le) : Q || le ? te = !1 : te = i ? E <= t : E < t;
          te ? r = v + 1 : l = v;
        }
        return qe(l, ae);
      }
      function Ys(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !At(c, p)) {
            var p = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Zs(e) {
        return typeof e == "number" ? e : lt(e) ? _ : +e;
      }
      function st(e) {
        if (typeof e == "string")
          return e;
        if (re(e))
          return Te(e, st) + "";
        if (lt(e))
          return Ts ? Ts.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function nn(e, t, n) {
        var i = -1, r = yi, l = e.length, u = !0, c = [], p = c;
        if (n)
          u = !1, r = Sr;
        else if (l >= m) {
          var k = t ? null : A1(e);
          if (k)
            return vi(k);
          u = !1, r = Qn, p = new xn();
        } else
          p = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var v = e[i], E = t ? t(v) : v;
            if (v = n || v !== 0 ? v : 0, u && E === E) {
              for (var R = p.length; R--; )
                if (p[R] === E)
                  continue e;
              t && p.push(E), c.push(v);
            } else
              r(p, E, n) || (p !== c && p.push(E), c.push(v));
          }
        return c;
      }
      function Zr(e, t) {
        return t = rn(t, e), e = Sl(e, t), e == null || delete e[Bt(xt(t))];
      }
      function Js(e, t, n, i) {
        return ii(e, t, n(kn(e, t)), i);
      }
      function Mi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? gt(e, i ? 0 : l, i ? l + 1 : r) : gt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Xs(e, t) {
        var n = e;
        return n instanceof ge && (n = n.value()), Ar(t, function(i, r) {
          return r.func.apply(r.thisArg, Xt([i], r.args));
        }, n);
      }
      function Jr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? nn(e[0]) : [];
        for (var r = -1, l = g(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = ei(l[r] || u, e[c], t, n));
        return nn(Ne(l, 1), t, n);
      }
      function js(e, t, n) {
        for (var i = -1, r = e.length, l = t.length, u = {}; ++i < r; ) {
          var c = i < l ? t[i] : a;
          n(u, e[i], c);
        }
        return u;
      }
      function Xr(e) {
        return Fe(e) ? e : [];
      }
      function jr(e) {
        return typeof e == "function" ? e : et;
      }
      function rn(e, t) {
        return re(e) ? e : oa(e, t) ? [e] : Tl(_e(e));
      }
      var m1 = ce;
      function an(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : gt(e, t, n);
      }
      var el = nu || function(e) {
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
        return new wi(t).set(new wi(e)), t;
      }
      function g1(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function x1(e) {
        var t = new e.constructor(e.source, Ra.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function y1(e) {
        return Xn ? Se(Xn.call(e)) : {};
      }
      function nl(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function il(e, t) {
        if (e !== t) {
          var n = e !== a, i = e === null, r = e === e, l = lt(e), u = t !== a, c = t === null, p = t === t, k = lt(t);
          if (!c && !k && !l && e > t || l && u && p && !c && !k || i && u && p || !n && p || !r)
            return 1;
          if (!i && !l && !k && e < t || k && n && r && !i && !l || c && n && r || !u && r || !p)
            return -1;
        }
        return 0;
      }
      function k1(e, t, n) {
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
        for (var r = -1, l = e.length, u = n.length, c = -1, p = t.length, k = Re(l - u, 0), v = g(p + k), E = !i; ++c < p; )
          v[c] = t[c];
        for (; ++r < u; )
          (E || r < l) && (v[n[r]] = e[r]);
        for (; k--; )
          v[c++] = e[r++];
        return v;
      }
      function al(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, p = -1, k = t.length, v = Re(l - c, 0), E = g(v + k), R = !i; ++r < v; )
          E[r] = e[r];
        for (var Q = r; ++p < k; )
          E[Q + p] = t[p];
        for (; ++u < c; )
          (R || r < l) && (E[Q + n[u]] = e[r++]);
        return E;
      }
      function Je(e, t) {
        var n = -1, i = e.length;
        for (t || (t = g(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function Lt(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], p = i ? i(n[c], e[c], c, n, e) : a;
          p === a && (p = e[c]), r ? Ut(n, c, p) : jn(n, c, p);
        }
        return n;
      }
      function v1(e, t) {
        return Lt(e, la(e), t);
      }
      function _1(e, t) {
        return Lt(e, yl(e), t);
      }
      function Ui(e, t) {
        return function(n, i) {
          var r = re(n) ? wo : Nu, l = t ? t() : {};
          return r(n, e, j(i, 2), l);
        };
      }
      function Mn(e) {
        return ce(function(t, n) {
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
          if (!Xe(n))
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
      function b1(e, t, n) {
        var i = t & J, r = ri(e);
        function l() {
          var u = this && this !== We && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function ol(e) {
        return function(t) {
          t = _e(t);
          var n = Fn(t) ? Et(t) : a, i = n ? n[0] : t.charAt(0), r = n ? an(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function Un(e) {
        return function(t) {
          return Ar(s0(a0(t).replace(fo, "")), e, "");
        };
      }
      function ri(e) {
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
          var n = Gn(e.prototype), i = e.apply(n, t);
          return Ie(i) ? i : n;
        };
      }
      function E1(e, t, n) {
        var i = ri(e);
        function r() {
          for (var l = arguments.length, u = g(l), c = l, p = Wn(r); c--; )
            u[c] = arguments[c];
          var k = l < 3 && u[0] !== p && u[l - 1] !== p ? [] : jt(u, p);
          if (l -= k.length, l < n)
            return pl(
              e,
              t,
              Wi,
              r.placeholder,
              a,
              u,
              k,
              a,
              a,
              n - l
            );
          var v = this && this !== We && this instanceof r ? i : e;
          return rt(v, this, u);
        }
        return r;
      }
      function ul(e) {
        return function(t, n, i) {
          var r = Se(t);
          if (!Xe(t)) {
            var l = j(n, 3);
            t = Me(t), n = function(c) {
              return l(r[c], c, r);
            };
          }
          var u = e(t, n, i);
          return u > -1 ? r[l ? t[u] : u] : a;
        };
      }
      function cl(e) {
        return Nt(function(t) {
          var n = t.length, i = n, r = ht.prototype.thru;
          for (e && t.reverse(); i--; ) {
            var l = t[i];
            if (typeof l != "function")
              throw new pt(D);
            if (r && !u && Hi(l) == "wrapper")
              var u = new ht([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Hi(l), p = c == "wrapper" ? aa(l) : a;
            p && ua(p[0]) && p[1] == ($ | oe | q | P) && !p[4].length && p[9] == 1 ? u = u[Hi(p[0])].apply(u, p[3]) : u = l.length == 1 && ua(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var k = arguments, v = k[0];
            if (u && k.length == 1 && re(v))
              return u.plant(v).value();
            for (var E = 0, R = n ? t[E].apply(this, k) : v; ++E < n; )
              R = t[E].call(this, R);
            return R;
          };
        });
      }
      function Wi(e, t, n, i, r, l, u, c, p, k) {
        var v = t & $, E = t & J, R = t & xe, Q = t & (oe | ue), ee = t & ke, le = R ? a : ri(e);
        function te() {
          for (var pe = arguments.length, ye = g(pe), ot = pe; ot--; )
            ye[ot] = arguments[ot];
          if (Q)
            var Ze = Wn(te), ut = Vo(ye, Ze);
          if (i && (ye = rl(ye, i, r, Q)), l && (ye = al(ye, l, u, Q)), pe -= ut, Q && pe < k) {
            var $e = jt(ye, Ze);
            return pl(
              e,
              t,
              Wi,
              te.placeholder,
              n,
              ye,
              $e,
              c,
              p,
              k - pe
            );
          }
          var wt = E ? n : this, Qt = R ? wt[e] : e;
          return pe = ye.length, c ? ye = N1(ye, c) : ee && pe > 1 && ye.reverse(), v && p < pe && (ye.length = p), this && this !== We && this instanceof te && (Qt = le || ri(Qt)), Qt.apply(wt, ye);
        }
        return te;
      }
      function dl(e, t) {
        return function(n, i) {
          return Ju(n, e, t(i), {});
        };
      }
      function Ni(e, t) {
        return function(n, i) {
          var r;
          if (n === a && i === a)
            return t;
          if (n !== a && (r = n), i !== a) {
            if (r === a)
              return i;
            typeof n == "string" || typeof i == "string" ? (n = st(n), i = st(i)) : (n = Zs(n), i = Zs(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ta(e) {
        return Nt(function(t) {
          return t = Te(t, at(j())), ce(function(n) {
            var i = this;
            return e(t, function(r) {
              return rt(r, i, n);
            });
          });
        });
      }
      function qi(e, t) {
        t = t === a ? " " : st(t);
        var n = t.length;
        if (n < 2)
          return n ? Kr(t, e) : t;
        var i = Kr(t, Ii(e / $n(t)));
        return Fn(t) ? an(Et(i), 0, e).join("") : i.slice(0, e);
      }
      function S1(e, t, n, i) {
        var r = t & J, l = ri(e);
        function u() {
          for (var c = -1, p = arguments.length, k = -1, v = i.length, E = g(v + p), R = this && this !== We && this instanceof u ? l : e; ++k < v; )
            E[k] = i[k];
          for (; p--; )
            E[k++] = arguments[++c];
          return rt(R, r ? n : this, E);
        }
        return u;
      }
      function fl(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && Ye(t, n, i) && (n = i = a), t = Ht(t), n === a ? (n = t, t = 0) : n = Ht(n), i = i === a ? t < n ? 1 : -1 : Ht(i), u1(t, n, i, e);
        };
      }
      function zi(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = yt(t), n = yt(n)), e(t, n);
        };
      }
      function pl(e, t, n, i, r, l, u, c, p, k) {
        var v = t & oe, E = v ? u : a, R = v ? a : u, Q = v ? l : a, ee = v ? a : l;
        t |= v ? q : V, t &= ~(v ? V : q), t & fe || (t &= -4);
        var le = [
          e,
          t,
          r,
          Q,
          E,
          ee,
          R,
          c,
          p,
          k
        ], te = n.apply(a, le);
        return ua(e) && Al(te, le), te.placeholder = i, wl(te, e, t);
      }
      function na(e) {
        var t = Pe[e];
        return function(n, i) {
          if (n = yt(n), i = i == null ? 0 : qe(se(i), 292), i && ws(n)) {
            var r = (_e(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (_e(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var A1 = Pn && 1 / vi(new Pn([, -0]))[1] == Ct ? function(e) {
        return new Pn(e);
      } : Sa;
      function hl(e) {
        return function(t) {
          var n = ze(t);
          return n == it ? Br(t) : n == K ? Wo(t) : $o(t, e(t));
        };
      }
      function Wt(e, t, n, i, r, l, u, c) {
        var p = t & xe;
        if (!p && typeof e != "function")
          throw new pt(D);
        var k = i ? i.length : 0;
        if (k || (t &= -97, i = r = a), u = u === a ? u : Re(se(u), 0), c = c === a ? c : se(c), k -= r ? r.length : 0, t & V) {
          var v = i, E = r;
          i = r = a;
        }
        var R = p ? a : aa(e), Q = [
          e,
          t,
          n,
          i,
          r,
          v,
          E,
          l,
          u,
          c
        ];
        if (R && M1(Q, R), e = Q[0], t = Q[1], n = Q[2], i = Q[3], r = Q[4], c = Q[9] = Q[9] === a ? p ? 0 : e.length : Re(Q[9] - k, 0), !c && t & (oe | ue) && (t &= -25), !t || t == J)
          var ee = b1(e, t, n);
        else
          t == oe || t == ue ? ee = E1(e, t, c) : (t == q || t == (J | q)) && !r.length ? ee = S1(e, t, n, i) : ee = Wi.apply(a, Q);
        var le = R ? Ks : Al;
        return wl(le(ee, Q), e, t);
      }
      function ml(e, t, n, i) {
        return e === a || At(e, On[n]) && !be.call(i, n) ? t : e;
      }
      function gl(e, t, n, i, r, l) {
        return Ie(e) && Ie(t) && (l.set(t, e), Ri(e, t, a, gl, l), l.delete(t)), e;
      }
      function w1(e) {
        return li(e) ? a : e;
      }
      function xl(e, t, n, i, r, l) {
        var u = n & w, c = e.length, p = t.length;
        if (c != p && !(u && p > c))
          return !1;
        var k = l.get(e), v = l.get(t);
        if (k && v)
          return k == t && v == e;
        var E = -1, R = !0, Q = n & I ? new xn() : a;
        for (l.set(e, t), l.set(t, e); ++E < c; ) {
          var ee = e[E], le = t[E];
          if (i)
            var te = u ? i(le, ee, E, t, e, l) : i(ee, le, E, e, t, l);
          if (te !== a) {
            if (te)
              continue;
            R = !1;
            break;
          }
          if (Q) {
            if (!wr(t, function(pe, ye) {
              if (!Qn(Q, ye) && (ee === pe || r(ee, pe, n, i, l)))
                return Q.push(ye);
            })) {
              R = !1;
              break;
            }
          } else if (!(ee === le || r(ee, le, n, i, l))) {
            R = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), R;
      }
      function C1(e, t, n, i, r, l, u) {
        switch (n) {
          case Zt:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case Qe:
            return !(e.byteLength != t.byteLength || !l(new wi(e), new wi(t)));
          case Kt:
          case Yt:
          case fn:
            return At(+e, +t);
          case Tn:
            return e.name == t.name && e.message == t.message;
          case pn:
          case A:
            return e == t + "";
          case it:
            var c = Br;
          case K:
            var p = i & w;
            if (c || (c = vi), e.size != t.size && !p)
              return !1;
            var k = u.get(e);
            if (k)
              return k == t;
            i |= I, u.set(e, t);
            var v = xl(c(e), c(t), i, r, l, u);
            return u.delete(e), v;
          case U:
            if (Xn)
              return Xn.call(e) == Xn.call(t);
        }
        return !1;
      }
      function T1(e, t, n, i, r, l) {
        var u = n & w, c = ia(e), p = c.length, k = ia(t), v = k.length;
        if (p != v && !u)
          return !1;
        for (var E = p; E--; ) {
          var R = c[E];
          if (!(u ? R in t : be.call(t, R)))
            return !1;
        }
        var Q = l.get(e), ee = l.get(t);
        if (Q && ee)
          return Q == t && ee == e;
        var le = !0;
        l.set(e, t), l.set(t, e);
        for (var te = u; ++E < p; ) {
          R = c[E];
          var pe = e[R], ye = t[R];
          if (i)
            var ot = u ? i(ye, pe, R, t, e, l) : i(pe, ye, R, e, t, l);
          if (!(ot === a ? pe === ye || r(pe, ye, n, i, l) : ot)) {
            le = !1;
            break;
          }
          te || (te = R == "constructor");
        }
        if (le && !te) {
          var Ze = e.constructor, ut = t.constructor;
          Ze != ut && "constructor" in e && "constructor" in t && !(typeof Ze == "function" && Ze instanceof Ze && typeof ut == "function" && ut instanceof ut) && (le = !1);
        }
        return l.delete(e), l.delete(t), le;
      }
      function Nt(e) {
        return da(El(e, a, Bl), e + "");
      }
      function ia(e) {
        return Ps(e, Me, la);
      }
      function ra(e) {
        return Ps(e, je, yl);
      }
      var aa = Bi ? function(e) {
        return Bi.get(e);
      } : Sa;
      function Hi(e) {
        for (var t = e.name + "", n = Rn[t], i = be.call(Rn, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function Wn(e) {
        var t = be.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function j() {
        var e = s.iteratee || ba;
        return e = e === ba ? Ms : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Qi(e, t) {
        var n = e.__data__;
        return O1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function sa(e) {
        for (var t = Me(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, _l(r)];
        }
        return t;
      }
      function vn(e, t) {
        var n = Go(e, t);
        return Gs(n) ? n : a;
      }
      function D1(e) {
        var t = be.call(e, mn), n = e[mn];
        try {
          e[mn] = a;
          var i = !0;
        } catch {
        }
        var r = Si.call(e);
        return i && (t ? e[mn] = n : delete e[mn]), r;
      }
      var la = $r ? function(e) {
        return e == null ? [] : (e = Se(e), Jt($r(e), function(t) {
          return Ss.call(e, t);
        }));
      } : Aa, yl = $r ? function(e) {
        for (var t = []; e; )
          Xt(t, la(e)), e = Ci(e);
        return t;
      } : Aa, ze = Ke;
      (Vr && ze(new Vr(new ArrayBuffer(1))) != Zt || Yn && ze(new Yn()) != it || Or && ze(Or.resolve()) != hi || Pn && ze(new Pn()) != K || Zn && ze(new Zn()) != O) && (ze = function(e) {
        var t = Ke(e), n = t == bt ? e.constructor : a, i = n ? _n(n) : "";
        if (i)
          switch (i) {
            case du:
              return Zt;
            case fu:
              return it;
            case pu:
              return hi;
            case hu:
              return K;
            case mu:
              return O;
          }
        return t;
      });
      function I1(e, t, n) {
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
              t = qe(t, e + u);
              break;
            case "takeRight":
              e = Re(e, t - u);
              break;
          }
        }
        return { start: e, end: t };
      }
      function L1(e) {
        var t = e.match(O0);
        return t ? t[1].split(P0) : [];
      }
      function kl(e, t, n) {
        t = rn(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = Bt(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && er(r) && qt(u, r) && (re(e) || bn(e)));
      }
      function B1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && be.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function vl(e) {
        return typeof e.constructor == "function" && !ai(e) ? Gn(Ci(e)) : {};
      }
      function F1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case Qe:
            return ea(e);
          case Kt:
          case Yt:
            return new i(+e);
          case Zt:
            return g1(e, n);
          case In:
          case Hn:
          case or:
          case ur:
          case cr:
          case dr:
          case fr:
          case pr:
          case hr:
            return nl(e, n);
          case it:
            return new i();
          case fn:
          case A:
            return new i(e);
          case pn:
            return x1(e);
          case K:
            return new i();
          case U:
            return y1(e);
        }
      }
      function $1(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var i = n - 1;
        return t[i] = (n > 1 ? "& " : "") + t[i], t = t.join(n > 2 ? ", " : " "), e.replace(V0, `{
/* [wrapped with ` + t + `] */
`);
      }
      function V1(e) {
        return re(e) || bn(e) || !!(As && e && e[As]);
      }
      function qt(e, t) {
        var n = typeof e;
        return t = t ?? Tt, !!t && (n == "number" || n != "symbol" && H0.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ye(e, t, n) {
        if (!Ie(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? Xe(n) && qt(t, n.length) : i == "string" && t in n) ? At(n[t], e) : !1;
      }
      function oa(e, t) {
        if (re(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || lt(e) ? !0 : L0.test(e) || !I0.test(e) || t != null && e in Se(t);
      }
      function O1(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function ua(e) {
        var t = Hi(e), n = s[t];
        if (typeof n != "function" || !(t in ge.prototype))
          return !1;
        if (e === n)
          return !0;
        var i = aa(n);
        return !!i && e === i[0];
      }
      function P1(e) {
        return !!_s && _s in e;
      }
      var R1 = bi ? zt : wa;
      function ai(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || On;
        return e === n;
      }
      function _l(e) {
        return e === e && !Ie(e);
      }
      function bl(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in Se(n));
        };
      }
      function G1(e) {
        var t = Xi(e, function(i) {
          return n.size === M && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function M1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (J | xe | $), u = i == $ && n == oe || i == $ && n == P && e[7].length <= t[8] || i == ($ | P) && t[7].length <= t[8] && n == oe;
        if (!(l || u))
          return e;
        i & J && (e[2] = t[2], r |= n & J ? 0 : fe);
        var c = t[3];
        if (c) {
          var p = e[3];
          e[3] = p ? rl(p, c, t[4]) : c, e[4] = p ? jt(e[3], z) : t[4];
        }
        return c = t[5], c && (p = e[5], e[5] = p ? al(p, c, t[6]) : c, e[6] = p ? jt(e[5], z) : t[6]), c = t[7], c && (e[7] = c), i & $ && (e[8] = e[8] == null ? t[8] : qe(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
      }
      function U1(e) {
        var t = [];
        if (e != null)
          for (var n in Se(e))
            t.push(n);
        return t;
      }
      function W1(e) {
        return Si.call(e);
      }
      function El(e, t, n) {
        return t = Re(t === a ? e.length - 1 : t, 0), function() {
          for (var i = arguments, r = -1, l = Re(i.length - t, 0), u = g(l); ++r < l; )
            u[r] = i[t + r];
          r = -1;
          for (var c = g(t + 1); ++r < t; )
            c[r] = i[r];
          return c[t] = n(u), rt(e, this, c);
        };
      }
      function Sl(e, t) {
        return t.length < 2 ? e : kn(e, gt(t, 0, -1));
      }
      function N1(e, t) {
        for (var n = e.length, i = qe(t.length, n), r = Je(e); i--; ) {
          var l = t[i];
          e[i] = qt(l, n) ? r[l] : a;
        }
        return e;
      }
      function ca(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Al = Cl(Ks), si = ru || function(e, t) {
        return We.setTimeout(e, t);
      }, da = Cl(f1);
      function wl(e, t, n) {
        var i = t + "";
        return da(e, $1(i, q1(L1(i), n)));
      }
      function Cl(e) {
        var t = 0, n = 0;
        return function() {
          var i = ou(), r = nt - (i - n);
          if (n = i, r > 0) {
            if (++t >= Oe)
              return arguments[0];
          } else
            t = 0;
          return e.apply(a, arguments);
        };
      }
      function Ki(e, t) {
        var n = -1, i = e.length, r = i - 1;
        for (t = t === a ? i : t; ++n < t; ) {
          var l = Qr(n, r), u = e[l];
          e[l] = e[n], e[n] = u;
        }
        return e.length = t, e;
      }
      var Tl = G1(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(B0, function(n, i, r, l) {
          t.push(r ? l.replace(M0, "$1") : i || n);
        }), t;
      });
      function Bt(e) {
        if (typeof e == "string" || lt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function _n(e) {
        if (e != null) {
          try {
            return Ei.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function q1(e, t) {
        return ft(Dt, function(n) {
          var i = "_." + n[0];
          t & n[1] && !yi(e, i) && e.push(i);
        }), e.sort();
      }
      function Dl(e) {
        if (e instanceof ge)
          return e.clone();
        var t = new ht(e.__wrapped__, e.__chain__);
        return t.__actions__ = Je(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function z1(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = Re(se(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = g(Ii(i / t)); r < i; )
          u[l++] = gt(e, r, r += t);
        return u;
      }
      function H1(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++t < n; ) {
          var l = e[t];
          l && (r[i++] = l);
        }
        return r;
      }
      function Q1() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = g(e - 1), n = arguments[0], i = e; i--; )
          t[i - 1] = arguments[i];
        return Xt(re(n) ? Je(n) : [n], Ne(t, 1));
      }
      var K1 = ce(function(e, t) {
        return Fe(e) ? ei(e, Ne(t, 1, Fe, !0)) : [];
      }), Y1 = ce(function(e, t) {
        var n = xt(t);
        return Fe(n) && (n = a), Fe(e) ? ei(e, Ne(t, 1, Fe, !0), j(n, 2)) : [];
      }), Z1 = ce(function(e, t) {
        var n = xt(t);
        return Fe(n) && (n = a), Fe(e) ? ei(e, Ne(t, 1, Fe, !0), a, n) : [];
      });
      function J1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : se(t), gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function X1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : se(t), t = i - t, gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function j1(e, t) {
        return e && e.length ? Mi(e, j(t, 3), !0, !0) : [];
      }
      function ec(e, t) {
        return e && e.length ? Mi(e, j(t, 3), !0) : [];
      }
      function tc(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && Ye(e, t, n) && (n = 0, i = r), Qu(e, t, n, i)) : [];
      }
      function Il(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : se(n);
        return r < 0 && (r = Re(i + r, 0)), ki(e, j(t, 3), r);
      }
      function Ll(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = se(n), r = n < 0 ? Re(i + r, 0) : qe(r, i - 1)), ki(e, j(t, 3), r, !0);
      }
      function Bl(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ne(e, 1) : [];
      }
      function nc(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ne(e, Ct) : [];
      }
      function ic(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : se(t), Ne(e, t)) : [];
      }
      function rc(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = {}; ++t < n; ) {
          var r = e[t];
          i[r[0]] = r[1];
        }
        return i;
      }
      function Fl(e) {
        return e && e.length ? e[0] : a;
      }
      function ac(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : se(n);
        return r < 0 && (r = Re(i + r, 0)), Bn(e, t, r);
      }
      function sc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 0, -1) : [];
      }
      var lc = ce(function(e) {
        var t = Te(e, Xr);
        return t.length && t[0] === e[0] ? Wr(t) : [];
      }), oc = ce(function(e) {
        var t = xt(e), n = Te(e, Xr);
        return t === xt(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Wr(n, j(t, 2)) : [];
      }), uc = ce(function(e) {
        var t = xt(e), n = Te(e, Xr);
        return t = typeof t == "function" ? t : a, t && n.pop(), n.length && n[0] === e[0] ? Wr(n, a, t) : [];
      });
      function cc(e, t) {
        return e == null ? "" : su.call(e, t);
      }
      function xt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : a;
      }
      function dc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i;
        return n !== a && (r = se(n), r = r < 0 ? Re(i + r, 0) : qe(r, i - 1)), t === t ? qo(e, t, r) : ki(e, ps, r, !0);
      }
      function fc(e, t) {
        return e && e.length ? qs(e, se(t)) : a;
      }
      var pc = ce($l);
      function $l(e, t) {
        return e && e.length && t && t.length ? Hr(e, t) : e;
      }
      function hc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, j(n, 2)) : e;
      }
      function mc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, a, n) : e;
      }
      var gc = Nt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Rr(e, t);
        return Qs(e, Te(t, function(r) {
          return qt(r, n) ? +r : r;
        }).sort(il)), i;
      });
      function xc(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var i = -1, r = [], l = e.length;
        for (t = j(t, 3); ++i < l; ) {
          var u = e[i];
          t(u, i, e) && (n.push(u), r.push(i));
        }
        return Qs(e, r), n;
      }
      function fa(e) {
        return e == null ? e : cu.call(e);
      }
      function yc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (n && typeof n != "number" && Ye(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : se(t), n = n === a ? i : se(n)), gt(e, t, n)) : [];
      }
      function kc(e, t) {
        return Gi(e, t);
      }
      function vc(e, t, n) {
        return Yr(e, t, j(n, 2));
      }
      function _c(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Gi(e, t);
          if (i < n && At(e[i], t))
            return i;
        }
        return -1;
      }
      function bc(e, t) {
        return Gi(e, t, !0);
      }
      function Ec(e, t, n) {
        return Yr(e, t, j(n, 2), !0);
      }
      function Sc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Gi(e, t, !0) - 1;
          if (At(e[i], t))
            return i;
        }
        return -1;
      }
      function Ac(e) {
        return e && e.length ? Ys(e) : [];
      }
      function wc(e, t) {
        return e && e.length ? Ys(e, j(t, 2)) : [];
      }
      function Cc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 1, t) : [];
      }
      function Tc(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : se(t), gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Dc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : se(t), t = i - t, gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Ic(e, t) {
        return e && e.length ? Mi(e, j(t, 3), !1, !0) : [];
      }
      function Lc(e, t) {
        return e && e.length ? Mi(e, j(t, 3)) : [];
      }
      var Bc = ce(function(e) {
        return nn(Ne(e, 1, Fe, !0));
      }), Fc = ce(function(e) {
        var t = xt(e);
        return Fe(t) && (t = a), nn(Ne(e, 1, Fe, !0), j(t, 2));
      }), $c = ce(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, nn(Ne(e, 1, Fe, !0), a, t);
      });
      function Vc(e) {
        return e && e.length ? nn(e) : [];
      }
      function Oc(e, t) {
        return e && e.length ? nn(e, j(t, 2)) : [];
      }
      function Pc(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? nn(e, a, t) : [];
      }
      function pa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = Jt(e, function(n) {
          if (Fe(n))
            return t = Re(n.length, t), !0;
        }), Ir(t, function(n) {
          return Te(e, Cr(n));
        });
      }
      function Vl(e, t) {
        if (!(e && e.length))
          return [];
        var n = pa(e);
        return t == null ? n : Te(n, function(i) {
          return rt(t, a, i);
        });
      }
      var Rc = ce(function(e, t) {
        return Fe(e) ? ei(e, t) : [];
      }), Gc = ce(function(e) {
        return Jr(Jt(e, Fe));
      }), Mc = ce(function(e) {
        var t = xt(e);
        return Fe(t) && (t = a), Jr(Jt(e, Fe), j(t, 2));
      }), Uc = ce(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, Jr(Jt(e, Fe), a, t);
      }), Wc = ce(pa);
      function Nc(e, t) {
        return js(e || [], t || [], jn);
      }
      function qc(e, t) {
        return js(e || [], t || [], ii);
      }
      var zc = ce(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : a;
        return n = typeof n == "function" ? (e.pop(), n) : a, Vl(e, n);
      });
      function Ol(e) {
        var t = s(e);
        return t.__chain__ = !0, t;
      }
      function Hc(e, t) {
        return t(e), e;
      }
      function Yi(e, t) {
        return t(e);
      }
      var Qc = Nt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Rr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof ge) || !qt(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: Yi,
          args: [r],
          thisArg: a
        }), new ht(i, this.__chain__).thru(function(l) {
          return t && !l.length && l.push(a), l;
        }));
      });
      function Kc() {
        return Ol(this);
      }
      function Yc() {
        return new ht(this.value(), this.__chain__);
      }
      function Zc() {
        this.__values__ === a && (this.__values__ = Zl(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? a : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Jc() {
        return this;
      }
      function Xc(e) {
        for (var t, n = this; n instanceof $i; ) {
          var i = Dl(n);
          i.__index__ = 0, i.__values__ = a, t ? r.__wrapped__ = i : t = i;
          var r = i;
          n = n.__wrapped__;
        }
        return r.__wrapped__ = e, t;
      }
      function jc() {
        var e = this.__wrapped__;
        if (e instanceof ge) {
          var t = e;
          return this.__actions__.length && (t = new ge(this)), t = t.reverse(), t.__actions__.push({
            func: Yi,
            args: [fa],
            thisArg: a
          }), new ht(t, this.__chain__);
        }
        return this.thru(fa);
      }
      function ed() {
        return Xs(this.__wrapped__, this.__actions__);
      }
      var td = Ui(function(e, t, n) {
        be.call(e, n) ? ++e[n] : Ut(e, n, 1);
      });
      function nd(e, t, n) {
        var i = re(e) ? ds : Hu;
        return n && Ye(e, t, n) && (t = a), i(e, j(t, 3));
      }
      function id(e, t) {
        var n = re(e) ? Jt : Vs;
        return n(e, j(t, 3));
      }
      var rd = ul(Il), ad = ul(Ll);
      function sd(e, t) {
        return Ne(Zi(e, t), 1);
      }
      function ld(e, t) {
        return Ne(Zi(e, t), Ct);
      }
      function od(e, t, n) {
        return n = n === a ? 1 : se(n), Ne(Zi(e, t), n);
      }
      function Pl(e, t) {
        var n = re(e) ? ft : tn;
        return n(e, j(t, 3));
      }
      function Rl(e, t) {
        var n = re(e) ? Co : $s;
        return n(e, j(t, 3));
      }
      var ud = Ui(function(e, t, n) {
        be.call(e, n) ? e[n].push(t) : Ut(e, n, [t]);
      });
      function cd(e, t, n, i) {
        e = Xe(e) ? e : qn(e), n = n && !i ? se(n) : 0;
        var r = e.length;
        return n < 0 && (n = Re(r + n, 0)), tr(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && Bn(e, t, n) > -1;
      }
      var dd = ce(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = Xe(e) ? g(e.length) : [];
        return tn(e, function(u) {
          l[++i] = r ? rt(t, u, n) : ti(u, t, n);
        }), l;
      }), fd = Ui(function(e, t, n) {
        Ut(e, n, t);
      });
      function Zi(e, t) {
        var n = re(e) ? Te : Us;
        return n(e, j(t, 3));
      }
      function pd(e, t, n, i) {
        return e == null ? [] : (re(t) || (t = t == null ? [] : [t]), n = i ? a : n, re(n) || (n = n == null ? [] : [n]), zs(e, t, n));
      }
      var hd = Ui(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function md(e, t, n) {
        var i = re(e) ? Ar : ms, r = arguments.length < 3;
        return i(e, j(t, 4), n, r, tn);
      }
      function gd(e, t, n) {
        var i = re(e) ? To : ms, r = arguments.length < 3;
        return i(e, j(t, 4), n, r, $s);
      }
      function xd(e, t) {
        var n = re(e) ? Jt : Vs;
        return n(e, ji(j(t, 3)));
      }
      function yd(e) {
        var t = re(e) ? Is : c1;
        return t(e);
      }
      function kd(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = se(t);
        var i = re(e) ? Uu : d1;
        return i(e, t);
      }
      function vd(e) {
        var t = re(e) ? Wu : p1;
        return t(e);
      }
      function _d(e) {
        if (e == null)
          return 0;
        if (Xe(e))
          return tr(e) ? $n(e) : e.length;
        var t = ze(e);
        return t == it || t == K ? e.size : qr(e).length;
      }
      function bd(e, t, n) {
        var i = re(e) ? wr : h1;
        return n && Ye(e, t, n) && (t = a), i(e, j(t, 3));
      }
      var Ed = ce(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Ye(e, t[0], t[1]) ? t = [] : n > 2 && Ye(t[0], t[1], t[2]) && (t = [t[0]]), zs(e, Ne(t, 1), []);
      }), Ji = iu || function() {
        return We.Date.now();
      };
      function Sd(e, t) {
        if (typeof t != "function")
          throw new pt(D);
        return e = se(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Gl(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, Wt(e, $, a, a, a, a, t);
      }
      function Ml(e, t) {
        var n;
        if (typeof t != "function")
          throw new pt(D);
        return e = se(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var ha = ce(function(e, t, n) {
        var i = J;
        if (n.length) {
          var r = jt(n, Wn(ha));
          i |= q;
        }
        return Wt(e, i, t, n, r);
      }), Ul = ce(function(e, t, n) {
        var i = J | xe;
        if (n.length) {
          var r = jt(n, Wn(Ul));
          i |= q;
        }
        return Wt(t, i, e, n, r);
      });
      function Wl(e, t, n) {
        t = n ? a : t;
        var i = Wt(e, oe, a, a, a, a, a, t);
        return i.placeholder = Wl.placeholder, i;
      }
      function Nl(e, t, n) {
        t = n ? a : t;
        var i = Wt(e, ue, a, a, a, a, a, t);
        return i.placeholder = Nl.placeholder, i;
      }
      function ql(e, t, n) {
        var i, r, l, u, c, p, k = 0, v = !1, E = !1, R = !0;
        if (typeof e != "function")
          throw new pt(D);
        t = yt(t) || 0, Ie(n) && (v = !!n.leading, E = "maxWait" in n, l = E ? Re(yt(n.maxWait) || 0, t) : l, R = "trailing" in n ? !!n.trailing : R);
        function Q($e) {
          var wt = i, Qt = r;
          return i = r = a, k = $e, u = e.apply(Qt, wt), u;
        }
        function ee($e) {
          return k = $e, c = si(pe, t), v ? Q($e) : u;
        }
        function le($e) {
          var wt = $e - p, Qt = $e - k, u0 = t - wt;
          return E ? qe(u0, l - Qt) : u0;
        }
        function te($e) {
          var wt = $e - p, Qt = $e - k;
          return p === a || wt >= t || wt < 0 || E && Qt >= l;
        }
        function pe() {
          var $e = Ji();
          if (te($e))
            return ye($e);
          c = si(pe, le($e));
        }
        function ye($e) {
          return c = a, R && i ? Q($e) : (i = r = a, u);
        }
        function ot() {
          c !== a && el(c), k = 0, i = p = r = c = a;
        }
        function Ze() {
          return c === a ? u : ye(Ji());
        }
        function ut() {
          var $e = Ji(), wt = te($e);
          if (i = arguments, r = this, p = $e, wt) {
            if (c === a)
              return ee(p);
            if (E)
              return el(c), c = si(pe, t), Q(p);
          }
          return c === a && (c = si(pe, t)), u;
        }
        return ut.cancel = ot, ut.flush = Ze, ut;
      }
      var Ad = ce(function(e, t) {
        return Fs(e, 1, t);
      }), wd = ce(function(e, t, n) {
        return Fs(e, yt(t) || 0, n);
      });
      function Cd(e) {
        return Wt(e, ke);
      }
      function Xi(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new pt(D);
        var n = function() {
          var i = arguments, r = t ? t.apply(this, i) : i[0], l = n.cache;
          if (l.has(r))
            return l.get(r);
          var u = e.apply(this, i);
          return n.cache = l.set(r, u) || l, u;
        };
        return n.cache = new (Xi.Cache || Mt)(), n;
      }
      Xi.Cache = Mt;
      function ji(e) {
        if (typeof e != "function")
          throw new pt(D);
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
      function Td(e) {
        return Ml(2, e);
      }
      var Dd = m1(function(e, t) {
        t = t.length == 1 && re(t[0]) ? Te(t[0], at(j())) : Te(Ne(t, 1), at(j()));
        var n = t.length;
        return ce(function(i) {
          for (var r = -1, l = qe(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return rt(e, this, i);
        });
      }), ma = ce(function(e, t) {
        var n = jt(t, Wn(ma));
        return Wt(e, q, a, t, n);
      }), zl = ce(function(e, t) {
        var n = jt(t, Wn(zl));
        return Wt(e, V, a, t, n);
      }), Id = Nt(function(e, t) {
        return Wt(e, P, a, a, a, t);
      });
      function Ld(e, t) {
        if (typeof e != "function")
          throw new pt(D);
        return t = t === a ? t : se(t), ce(e, t);
      }
      function Bd(e, t) {
        if (typeof e != "function")
          throw new pt(D);
        return t = t == null ? 0 : Re(se(t), 0), ce(function(n) {
          var i = n[t], r = an(n, 0, t);
          return i && Xt(r, i), rt(e, this, r);
        });
      }
      function Fd(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new pt(D);
        return Ie(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), ql(e, t, {
          leading: i,
          maxWait: t,
          trailing: r
        });
      }
      function $d(e) {
        return Gl(e, 1);
      }
      function Vd(e, t) {
        return ma(jr(t), e);
      }
      function Od() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return re(e) ? e : [e];
      }
      function Pd(e) {
        return mt(e, B);
      }
      function Rd(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, B, t);
      }
      function Gd(e) {
        return mt(e, Y | B);
      }
      function Md(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, Y | B, t);
      }
      function Ud(e, t) {
        return t == null || Bs(e, t, Me(t));
      }
      function At(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Wd = zi(Ur), Nd = zi(function(e, t) {
        return e >= t;
      }), bn = Rs(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Rs : function(e) {
        return Le(e) && be.call(e, "callee") && !Ss.call(e, "callee");
      }, re = g.isArray, qd = as ? at(as) : Xu;
      function Xe(e) {
        return e != null && er(e.length) && !zt(e);
      }
      function Fe(e) {
        return Le(e) && Xe(e);
      }
      function zd(e) {
        return e === !0 || e === !1 || Le(e) && Ke(e) == Kt;
      }
      var sn = au || wa, Hd = ss ? at(ss) : ju;
      function Qd(e) {
        return Le(e) && e.nodeType === 1 && !li(e);
      }
      function Kd(e) {
        if (e == null)
          return !0;
        if (Xe(e) && (re(e) || typeof e == "string" || typeof e.splice == "function" || sn(e) || Nn(e) || bn(e)))
          return !e.length;
        var t = ze(e);
        if (t == it || t == K)
          return !e.size;
        if (ai(e))
          return !qr(e).length;
        for (var n in e)
          if (be.call(e, n))
            return !1;
        return !0;
      }
      function Yd(e, t) {
        return ni(e, t);
      }
      function Zd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? ni(e, t, a, n) : !!i;
      }
      function ga(e) {
        if (!Le(e))
          return !1;
        var t = Ke(e);
        return t == Tn || t == fi || typeof e.message == "string" && typeof e.name == "string" && !li(e);
      }
      function Jd(e) {
        return typeof e == "number" && ws(e);
      }
      function zt(e) {
        if (!Ie(e))
          return !1;
        var t = Ke(e);
        return t == Dn || t == dn || t == De || t == lr;
      }
      function Hl(e) {
        return typeof e == "number" && e == se(e);
      }
      function er(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Tt;
      }
      function Ie(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Le(e) {
        return e != null && typeof e == "object";
      }
      var Ql = ls ? at(ls) : t1;
      function Xd(e, t) {
        return e === t || Nr(e, t, sa(t));
      }
      function jd(e, t, n) {
        return n = typeof n == "function" ? n : a, Nr(e, t, sa(t), n);
      }
      function ef(e) {
        return Kl(e) && e != +e;
      }
      function tf(e) {
        if (R1(e))
          throw new ie(C);
        return Gs(e);
      }
      function nf(e) {
        return e === null;
      }
      function rf(e) {
        return e == null;
      }
      function Kl(e) {
        return typeof e == "number" || Le(e) && Ke(e) == fn;
      }
      function li(e) {
        if (!Le(e) || Ke(e) != bt)
          return !1;
        var t = Ci(e);
        if (t === null)
          return !0;
        var n = be.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && Ei.call(n) == jo;
      }
      var xa = os ? at(os) : n1;
      function af(e) {
        return Hl(e) && e >= -9007199254740991 && e <= Tt;
      }
      var Yl = us ? at(us) : i1;
      function tr(e) {
        return typeof e == "string" || !re(e) && Le(e) && Ke(e) == A;
      }
      function lt(e) {
        return typeof e == "symbol" || Le(e) && Ke(e) == U;
      }
      var Nn = cs ? at(cs) : r1;
      function sf(e) {
        return e === a;
      }
      function lf(e) {
        return Le(e) && ze(e) == O;
      }
      function of(e) {
        return Le(e) && Ke(e) == me;
      }
      var uf = zi(zr), cf = zi(function(e, t) {
        return e <= t;
      });
      function Zl(e) {
        if (!e)
          return [];
        if (Xe(e))
          return tr(e) ? Et(e) : Je(e);
        if (Kn && e[Kn])
          return Uo(e[Kn]());
        var t = ze(e), n = t == it ? Br : t == K ? vi : qn;
        return n(e);
      }
      function Ht(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = yt(e), e === Ct || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * kt;
        }
        return e === e ? e : 0;
      }
      function se(e) {
        var t = Ht(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Jl(e) {
        return e ? yn(se(e), 0, T) : 0;
      }
      function yt(e) {
        if (typeof e == "number")
          return e;
        if (lt(e))
          return _;
        if (Ie(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Ie(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = gs(e);
        var n = N0.test(e);
        return n || z0.test(e) ? So(e.slice(2), n ? 2 : 8) : W0.test(e) ? _ : +e;
      }
      function Xl(e) {
        return Lt(e, je(e));
      }
      function df(e) {
        return e ? yn(se(e), -9007199254740991, Tt) : e === 0 ? e : 0;
      }
      function _e(e) {
        return e == null ? "" : st(e);
      }
      var ff = Mn(function(e, t) {
        if (ai(t) || Xe(t)) {
          Lt(t, Me(t), e);
          return;
        }
        for (var n in t)
          be.call(t, n) && jn(e, n, t[n]);
      }), jl = Mn(function(e, t) {
        Lt(t, je(t), e);
      }), nr = Mn(function(e, t, n, i) {
        Lt(t, je(t), e, i);
      }), pf = Mn(function(e, t, n, i) {
        Lt(t, Me(t), e, i);
      }), hf = Nt(Rr);
      function mf(e, t) {
        var n = Gn(e);
        return t == null ? n : Ls(n, t);
      }
      var gf = ce(function(e, t) {
        e = Se(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && Ye(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = je(l), c = -1, p = u.length; ++c < p; ) {
            var k = u[c], v = e[k];
            (v === a || At(v, On[k]) && !be.call(e, k)) && (e[k] = l[k]);
          }
        return e;
      }), xf = ce(function(e) {
        return e.push(a, gl), rt(e0, a, e);
      });
      function yf(e, t) {
        return fs(e, j(t, 3), It);
      }
      function kf(e, t) {
        return fs(e, j(t, 3), Mr);
      }
      function vf(e, t) {
        return e == null ? e : Gr(e, j(t, 3), je);
      }
      function _f(e, t) {
        return e == null ? e : Os(e, j(t, 3), je);
      }
      function bf(e, t) {
        return e && It(e, j(t, 3));
      }
      function Ef(e, t) {
        return e && Mr(e, j(t, 3));
      }
      function Sf(e) {
        return e == null ? [] : Pi(e, Me(e));
      }
      function Af(e) {
        return e == null ? [] : Pi(e, je(e));
      }
      function ya(e, t, n) {
        var i = e == null ? a : kn(e, t);
        return i === a ? n : i;
      }
      function wf(e, t) {
        return e != null && kl(e, t, Ku);
      }
      function ka(e, t) {
        return e != null && kl(e, t, Yu);
      }
      var Cf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Si.call(t)), e[t] = n;
      }, _a(et)), Tf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Si.call(t)), be.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, j), Df = ce(ti);
      function Me(e) {
        return Xe(e) ? Ds(e) : qr(e);
      }
      function je(e) {
        return Xe(e) ? Ds(e, !0) : a1(e);
      }
      function If(e, t) {
        var n = {};
        return t = j(t, 3), It(e, function(i, r, l) {
          Ut(n, t(i, r, l), i);
        }), n;
      }
      function Lf(e, t) {
        var n = {};
        return t = j(t, 3), It(e, function(i, r, l) {
          Ut(n, r, t(i, r, l));
        }), n;
      }
      var Bf = Mn(function(e, t, n) {
        Ri(e, t, n);
      }), e0 = Mn(function(e, t, n, i) {
        Ri(e, t, n, i);
      }), Ff = Nt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Te(t, function(l) {
          return l = rn(l, e), i || (i = l.length > 1), l;
        }), Lt(e, ra(e), n), i && (n = mt(n, Y | H | B, w1));
        for (var r = t.length; r--; )
          Zr(n, t[r]);
        return n;
      });
      function $f(e, t) {
        return t0(e, ji(j(t)));
      }
      var Vf = Nt(function(e, t) {
        return e == null ? {} : l1(e, t);
      });
      function t0(e, t) {
        if (e == null)
          return {};
        var n = Te(ra(e), function(i) {
          return [i];
        });
        return t = j(t), Hs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function Of(e, t, n) {
        t = rn(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[Bt(t[i])];
          l === a && (i = r, l = n), e = zt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Pf(e, t, n) {
        return e == null ? e : ii(e, t, n);
      }
      function Rf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : ii(e, t, n, i);
      }
      var n0 = hl(Me), i0 = hl(je);
      function Gf(e, t, n) {
        var i = re(e), r = i || sn(e) || Nn(e);
        if (t = j(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : Ie(e) ? n = zt(l) ? Gn(Ci(e)) : {} : n = {};
        }
        return (r ? ft : It)(e, function(u, c, p) {
          return t(n, u, c, p);
        }), n;
      }
      function Mf(e, t) {
        return e == null ? !0 : Zr(e, t);
      }
      function Uf(e, t, n) {
        return e == null ? e : Js(e, t, jr(n));
      }
      function Wf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : Js(e, t, jr(n), i);
      }
      function qn(e) {
        return e == null ? [] : Lr(e, Me(e));
      }
      function Nf(e) {
        return e == null ? [] : Lr(e, je(e));
      }
      function qf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = yt(n), n = n === n ? n : 0), t !== a && (t = yt(t), t = t === t ? t : 0), yn(yt(e), t, n);
      }
      function zf(e, t, n) {
        return t = Ht(t), n === a ? (n = t, t = 0) : n = Ht(n), e = yt(e), Zu(e, t, n);
      }
      function Hf(e, t, n) {
        if (n && typeof n != "boolean" && Ye(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Ht(e), t === a ? (t = e, e = 0) : t = Ht(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = Cs();
          return qe(e + r * (t - e + Eo("1e-" + ((r + "").length - 1))), t);
        }
        return Qr(e, t);
      }
      var Qf = Un(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? r0(t) : t);
      });
      function r0(e) {
        return va(_e(e).toLowerCase());
      }
      function a0(e) {
        return e = _e(e), e && e.replace(Q0, Oo).replace(po, "");
      }
      function Kf(e, t, n) {
        e = _e(e), t = st(t);
        var i = e.length;
        n = n === a ? i : yn(se(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Yf(e) {
        return e = _e(e), e && C0.test(e) ? e.replace(Oa, Po) : e;
      }
      function Zf(e) {
        return e = _e(e), e && F0.test(e) ? e.replace(mr, "\\$&") : e;
      }
      var Jf = Un(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), Xf = Un(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), jf = ol("toLowerCase");
      function ep(e, t, n) {
        e = _e(e), t = se(t);
        var i = t ? $n(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return qi(Li(r), n) + e + qi(Ii(r), n);
      }
      function tp(e, t, n) {
        e = _e(e), t = se(t);
        var i = t ? $n(e) : 0;
        return t && i < t ? e + qi(t - i, n) : e;
      }
      function np(e, t, n) {
        e = _e(e), t = se(t);
        var i = t ? $n(e) : 0;
        return t && i < t ? qi(t - i, n) + e : e;
      }
      function ip(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), uu(_e(e).replace(gr, ""), t || 0);
      }
      function rp(e, t, n) {
        return (n ? Ye(e, t, n) : t === a) ? t = 1 : t = se(t), Kr(_e(e), t);
      }
      function ap() {
        var e = arguments, t = _e(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var sp = Un(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function lp(e, t, n) {
        return n && typeof n != "number" && Ye(e, t, n) && (t = n = a), n = n === a ? T : n >>> 0, n ? (e = _e(e), e && (typeof t == "string" || t != null && !xa(t)) && (t = st(t), !t && Fn(e)) ? an(Et(e), 0, n) : e.split(t, n)) : [];
      }
      var op = Un(function(e, t, n) {
        return e + (n ? " " : "") + va(t);
      });
      function up(e, t, n) {
        return e = _e(e), n = n == null ? 0 : yn(se(n), 0, e.length), t = st(t), e.slice(n, n + t.length) == t;
      }
      function cp(e, t, n) {
        var i = s.templateSettings;
        n && Ye(e, t, n) && (t = a), e = _e(e), t = nr({}, t, i, ml);
        var r = nr({}, t.imports, i.imports, ml), l = Me(r), u = Lr(r, l), c, p, k = 0, v = t.interpolate || mi, E = "__p += '", R = Fr(
          (t.escape || mi).source + "|" + v.source + "|" + (v === Pa ? U0 : mi).source + "|" + (t.evaluate || mi).source + "|$",
          "g"
        ), Q = "//# sourceURL=" + (be.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++yo + "]") + `
`;
        e.replace(R, function(te, pe, ye, ot, Ze, ut) {
          return ye || (ye = ot), E += e.slice(k, ut).replace(K0, Ro), pe && (c = !0, E += `' +
__e(` + pe + `) +
'`), Ze && (p = !0, E += `';
` + Ze + `;
__p += '`), ye && (E += `' +
((__t = (` + ye + `)) == null ? '' : __t) +
'`), k = ut + te.length, te;
        }), E += `';
`;
        var ee = be.call(t, "variable") && t.variable;
        if (!ee)
          E = `with (obj) {
` + E + `
}
`;
        else if (G0.test(ee))
          throw new ie(G);
        E = (p ? E.replace(E0, "") : E).replace(S0, "$1").replace(A0, "$1;"), E = "function(" + (ee || "obj") + `) {
` + (ee ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (p ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + E + `return __p
}`;
        var le = l0(function() {
          return ve(l, Q + "return " + E).apply(a, u);
        });
        if (le.source = E, ga(le))
          throw le;
        return le;
      }
      function dp(e) {
        return _e(e).toLowerCase();
      }
      function fp(e) {
        return _e(e).toUpperCase();
      }
      function pp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return gs(e);
        if (!e || !(t = st(t)))
          return e;
        var i = Et(e), r = Et(t), l = xs(i, r), u = ys(i, r) + 1;
        return an(i, l, u).join("");
      }
      function hp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.slice(0, vs(e) + 1);
        if (!e || !(t = st(t)))
          return e;
        var i = Et(e), r = ys(i, Et(t)) + 1;
        return an(i, 0, r).join("");
      }
      function mp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.replace(gr, "");
        if (!e || !(t = st(t)))
          return e;
        var i = Et(e), r = xs(i, Et(t));
        return an(i, r).join("");
      }
      function gp(e, t) {
        var n = Be, i = Ge;
        if (Ie(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? se(t.length) : n, i = "omission" in t ? st(t.omission) : i;
        }
        e = _e(e);
        var l = e.length;
        if (Fn(e)) {
          var u = Et(e);
          l = u.length;
        }
        if (n >= l)
          return e;
        var c = n - $n(i);
        if (c < 1)
          return i;
        var p = u ? an(u, 0, c).join("") : e.slice(0, c);
        if (r === a)
          return p + i;
        if (u && (c += p.length - c), xa(r)) {
          if (e.slice(c).search(r)) {
            var k, v = p;
            for (r.global || (r = Fr(r.source, _e(Ra.exec(r)) + "g")), r.lastIndex = 0; k = r.exec(v); )
              var E = k.index;
            p = p.slice(0, E === a ? c : E);
          }
        } else if (e.indexOf(st(r), c) != c) {
          var R = p.lastIndexOf(r);
          R > -1 && (p = p.slice(0, R));
        }
        return p + i;
      }
      function xp(e) {
        return e = _e(e), e && w0.test(e) ? e.replace(Va, zo) : e;
      }
      var yp = Un(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), va = ol("toUpperCase");
      function s0(e, t, n) {
        return e = _e(e), t = n ? a : t, t === a ? Mo(e) ? Ko(e) : Lo(e) : e.match(t) || [];
      }
      var l0 = ce(function(e, t) {
        try {
          return rt(e, a, t);
        } catch (n) {
          return ga(n) ? n : new ie(n);
        }
      }), kp = Nt(function(e, t) {
        return ft(t, function(n) {
          n = Bt(n), Ut(e, n, ha(e[n], e));
        }), e;
      });
      function vp(e) {
        var t = e == null ? 0 : e.length, n = j();
        return e = t ? Te(e, function(i) {
          if (typeof i[1] != "function")
            throw new pt(D);
          return [n(i[0]), i[1]];
        }) : [], ce(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (rt(l[0], this, i))
              return rt(l[1], this, i);
          }
        });
      }
      function _p(e) {
        return zu(mt(e, Y));
      }
      function _a(e) {
        return function() {
          return e;
        };
      }
      function bp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var Ep = cl(), Sp = cl(!0);
      function et(e) {
        return e;
      }
      function ba(e) {
        return Ms(typeof e == "function" ? e : mt(e, Y));
      }
      function Ap(e) {
        return Ws(mt(e, Y));
      }
      function wp(e, t) {
        return Ns(e, mt(t, Y));
      }
      var Cp = ce(function(e, t) {
        return function(n) {
          return ti(n, e, t);
        };
      }), Tp = ce(function(e, t) {
        return function(n) {
          return ti(e, n, t);
        };
      });
      function Ea(e, t, n) {
        var i = Me(t), r = Pi(t, i);
        n == null && !(Ie(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Pi(t, Me(t)));
        var l = !(Ie(n) && "chain" in n) || !!n.chain, u = zt(e);
        return ft(r, function(c) {
          var p = t[c];
          e[c] = p, u && (e.prototype[c] = function() {
            var k = this.__chain__;
            if (l || k) {
              var v = e(this.__wrapped__), E = v.__actions__ = Je(this.__actions__);
              return E.push({ func: p, args: arguments, thisArg: e }), v.__chain__ = k, v;
            }
            return p.apply(e, Xt([this.value()], arguments));
          });
        }), e;
      }
      function Dp() {
        return We._ === this && (We._ = eu), this;
      }
      function Sa() {
      }
      function Ip(e) {
        return e = se(e), ce(function(t) {
          return qs(t, e);
        });
      }
      var Lp = ta(Te), Bp = ta(ds), Fp = ta(wr);
      function o0(e) {
        return oa(e) ? Cr(Bt(e)) : o1(e);
      }
      function $p(e) {
        return function(t) {
          return e == null ? a : kn(e, t);
        };
      }
      var Vp = fl(), Op = fl(!0);
      function Aa() {
        return [];
      }
      function wa() {
        return !1;
      }
      function Pp() {
        return {};
      }
      function Rp() {
        return "";
      }
      function Gp() {
        return !0;
      }
      function Mp(e, t) {
        if (e = se(e), e < 1 || e > Tt)
          return [];
        var n = T, i = qe(e, T);
        t = j(t), e -= T;
        for (var r = Ir(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Up(e) {
        return re(e) ? Te(e, Bt) : lt(e) ? [e] : Je(Tl(_e(e)));
      }
      function Wp(e) {
        var t = ++Xo;
        return _e(e) + t;
      }
      var Np = Ni(function(e, t) {
        return e + t;
      }, 0), qp = na("ceil"), zp = Ni(function(e, t) {
        return e / t;
      }, 1), Hp = na("floor");
      function Qp(e) {
        return e && e.length ? Oi(e, et, Ur) : a;
      }
      function Kp(e, t) {
        return e && e.length ? Oi(e, j(t, 2), Ur) : a;
      }
      function Yp(e) {
        return hs(e, et);
      }
      function Zp(e, t) {
        return hs(e, j(t, 2));
      }
      function Jp(e) {
        return e && e.length ? Oi(e, et, zr) : a;
      }
      function Xp(e, t) {
        return e && e.length ? Oi(e, j(t, 2), zr) : a;
      }
      var jp = Ni(function(e, t) {
        return e * t;
      }, 1), eh = na("round"), th = Ni(function(e, t) {
        return e - t;
      }, 0);
      function nh(e) {
        return e && e.length ? Dr(e, et) : 0;
      }
      function ih(e, t) {
        return e && e.length ? Dr(e, j(t, 2)) : 0;
      }
      return s.after = Sd, s.ary = Gl, s.assign = ff, s.assignIn = jl, s.assignInWith = nr, s.assignWith = pf, s.at = hf, s.before = Ml, s.bind = ha, s.bindAll = kp, s.bindKey = Ul, s.castArray = Od, s.chain = Ol, s.chunk = z1, s.compact = H1, s.concat = Q1, s.cond = vp, s.conforms = _p, s.constant = _a, s.countBy = td, s.create = mf, s.curry = Wl, s.curryRight = Nl, s.debounce = ql, s.defaults = gf, s.defaultsDeep = xf, s.defer = Ad, s.delay = wd, s.difference = K1, s.differenceBy = Y1, s.differenceWith = Z1, s.drop = J1, s.dropRight = X1, s.dropRightWhile = j1, s.dropWhile = ec, s.fill = tc, s.filter = id, s.flatMap = sd, s.flatMapDeep = ld, s.flatMapDepth = od, s.flatten = Bl, s.flattenDeep = nc, s.flattenDepth = ic, s.flip = Cd, s.flow = Ep, s.flowRight = Sp, s.fromPairs = rc, s.functions = Sf, s.functionsIn = Af, s.groupBy = ud, s.initial = sc, s.intersection = lc, s.intersectionBy = oc, s.intersectionWith = uc, s.invert = Cf, s.invertBy = Tf, s.invokeMap = dd, s.iteratee = ba, s.keyBy = fd, s.keys = Me, s.keysIn = je, s.map = Zi, s.mapKeys = If, s.mapValues = Lf, s.matches = Ap, s.matchesProperty = wp, s.memoize = Xi, s.merge = Bf, s.mergeWith = e0, s.method = Cp, s.methodOf = Tp, s.mixin = Ea, s.negate = ji, s.nthArg = Ip, s.omit = Ff, s.omitBy = $f, s.once = Td, s.orderBy = pd, s.over = Lp, s.overArgs = Dd, s.overEvery = Bp, s.overSome = Fp, s.partial = ma, s.partialRight = zl, s.partition = hd, s.pick = Vf, s.pickBy = t0, s.property = o0, s.propertyOf = $p, s.pull = pc, s.pullAll = $l, s.pullAllBy = hc, s.pullAllWith = mc, s.pullAt = gc, s.range = Vp, s.rangeRight = Op, s.rearg = Id, s.reject = xd, s.remove = xc, s.rest = Ld, s.reverse = fa, s.sampleSize = kd, s.set = Pf, s.setWith = Rf, s.shuffle = vd, s.slice = yc, s.sortBy = Ed, s.sortedUniq = Ac, s.sortedUniqBy = wc, s.split = lp, s.spread = Bd, s.tail = Cc, s.take = Tc, s.takeRight = Dc, s.takeRightWhile = Ic, s.takeWhile = Lc, s.tap = Hc, s.throttle = Fd, s.thru = Yi, s.toArray = Zl, s.toPairs = n0, s.toPairsIn = i0, s.toPath = Up, s.toPlainObject = Xl, s.transform = Gf, s.unary = $d, s.union = Bc, s.unionBy = Fc, s.unionWith = $c, s.uniq = Vc, s.uniqBy = Oc, s.uniqWith = Pc, s.unset = Mf, s.unzip = pa, s.unzipWith = Vl, s.update = Uf, s.updateWith = Wf, s.values = qn, s.valuesIn = Nf, s.without = Rc, s.words = s0, s.wrap = Vd, s.xor = Gc, s.xorBy = Mc, s.xorWith = Uc, s.zip = Wc, s.zipObject = Nc, s.zipObjectDeep = qc, s.zipWith = zc, s.entries = n0, s.entriesIn = i0, s.extend = jl, s.extendWith = nr, Ea(s, s), s.add = Np, s.attempt = l0, s.camelCase = Qf, s.capitalize = r0, s.ceil = qp, s.clamp = qf, s.clone = Pd, s.cloneDeep = Gd, s.cloneDeepWith = Md, s.cloneWith = Rd, s.conformsTo = Ud, s.deburr = a0, s.defaultTo = bp, s.divide = zp, s.endsWith = Kf, s.eq = At, s.escape = Yf, s.escapeRegExp = Zf, s.every = nd, s.find = rd, s.findIndex = Il, s.findKey = yf, s.findLast = ad, s.findLastIndex = Ll, s.findLastKey = kf, s.floor = Hp, s.forEach = Pl, s.forEachRight = Rl, s.forIn = vf, s.forInRight = _f, s.forOwn = bf, s.forOwnRight = Ef, s.get = ya, s.gt = Wd, s.gte = Nd, s.has = wf, s.hasIn = ka, s.head = Fl, s.identity = et, s.includes = cd, s.indexOf = ac, s.inRange = zf, s.invoke = Df, s.isArguments = bn, s.isArray = re, s.isArrayBuffer = qd, s.isArrayLike = Xe, s.isArrayLikeObject = Fe, s.isBoolean = zd, s.isBuffer = sn, s.isDate = Hd, s.isElement = Qd, s.isEmpty = Kd, s.isEqual = Yd, s.isEqualWith = Zd, s.isError = ga, s.isFinite = Jd, s.isFunction = zt, s.isInteger = Hl, s.isLength = er, s.isMap = Ql, s.isMatch = Xd, s.isMatchWith = jd, s.isNaN = ef, s.isNative = tf, s.isNil = rf, s.isNull = nf, s.isNumber = Kl, s.isObject = Ie, s.isObjectLike = Le, s.isPlainObject = li, s.isRegExp = xa, s.isSafeInteger = af, s.isSet = Yl, s.isString = tr, s.isSymbol = lt, s.isTypedArray = Nn, s.isUndefined = sf, s.isWeakMap = lf, s.isWeakSet = of, s.join = cc, s.kebabCase = Jf, s.last = xt, s.lastIndexOf = dc, s.lowerCase = Xf, s.lowerFirst = jf, s.lt = uf, s.lte = cf, s.max = Qp, s.maxBy = Kp, s.mean = Yp, s.meanBy = Zp, s.min = Jp, s.minBy = Xp, s.stubArray = Aa, s.stubFalse = wa, s.stubObject = Pp, s.stubString = Rp, s.stubTrue = Gp, s.multiply = jp, s.nth = fc, s.noConflict = Dp, s.noop = Sa, s.now = Ji, s.pad = ep, s.padEnd = tp, s.padStart = np, s.parseInt = ip, s.random = Hf, s.reduce = md, s.reduceRight = gd, s.repeat = rp, s.replace = ap, s.result = Of, s.round = eh, s.runInContext = d, s.sample = yd, s.size = _d, s.snakeCase = sp, s.some = bd, s.sortedIndex = kc, s.sortedIndexBy = vc, s.sortedIndexOf = _c, s.sortedLastIndex = bc, s.sortedLastIndexBy = Ec, s.sortedLastIndexOf = Sc, s.startCase = op, s.startsWith = up, s.subtract = th, s.sum = nh, s.sumBy = ih, s.template = cp, s.times = Mp, s.toFinite = Ht, s.toInteger = se, s.toLength = Jl, s.toLower = dp, s.toNumber = yt, s.toSafeInteger = df, s.toString = _e, s.toUpper = fp, s.trim = pp, s.trimEnd = hp, s.trimStart = mp, s.truncate = gp, s.unescape = xp, s.uniqueId = Wp, s.upperCase = yp, s.upperFirst = va, s.each = Pl, s.eachRight = Rl, s.first = Fl, Ea(s, function() {
        var e = {};
        return It(s, function(t, n) {
          be.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = b, ft(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), ft(["drop", "take"], function(e, t) {
        ge.prototype[e] = function(n) {
          n = n === a ? 1 : Re(se(n), 0);
          var i = this.__filtered__ && !t ? new ge(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = qe(n, i.__takeCount__) : i.__views__.push({
            size: qe(n, T),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, ge.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), ft(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == Pt || n == cn;
        ge.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: j(r, 3),
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
      }, ge.prototype.invokeMap = ce(function(e, t) {
        return typeof e == "function" ? new ge(this) : this.map(function(n) {
          return ti(n, e, t);
        });
      }), ge.prototype.reject = function(e) {
        return this.filter(ji(j(e)));
      }, ge.prototype.slice = function(e, t) {
        e = se(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new ge(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = se(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, ge.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, ge.prototype.toArray = function() {
        return this.take(T);
      }, It(ge.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, p = u instanceof ge, k = c[0], v = p || re(u), E = function(pe) {
            var ye = r.apply(s, Xt([pe], c));
            return i && R ? ye[0] : ye;
          };
          v && n && typeof k == "function" && k.length != 1 && (p = v = !1);
          var R = this.__chain__, Q = !!this.__actions__.length, ee = l && !R, le = p && !Q;
          if (!l && v) {
            u = le ? u : new ge(this);
            var te = e.apply(u, c);
            return te.__actions__.push({ func: Yi, args: [E], thisArg: a }), new ht(te, R);
          }
          return ee && le ? e.apply(this, c) : (te = this.thru(E), ee ? i ? te.value()[0] : te.value() : te);
        });
      }), ft(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = _i[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
        s.prototype[e] = function() {
          var r = arguments;
          if (i && !this.__chain__) {
            var l = this.value();
            return t.apply(re(l) ? l : [], r);
          }
          return this[n](function(u) {
            return t.apply(re(u) ? u : [], r);
          });
        };
      }), It(ge.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          be.call(Rn, i) || (Rn[i] = []), Rn[i].push({ name: t, func: n });
        }
      }), Rn[Wi(a, xe).name] = [{
        name: "wrapper",
        func: a
      }], ge.prototype.clone = gu, ge.prototype.reverse = xu, ge.prototype.value = yu, s.prototype.at = Qc, s.prototype.chain = Kc, s.prototype.commit = Yc, s.prototype.next = Zc, s.prototype.plant = Xc, s.prototype.reverse = jc, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = ed, s.prototype.first = s.prototype.head, Kn && (s.prototype[Kn] = Jc), s;
    }, Vn = Yo();
    hn ? ((hn.exports = Vn)._ = Vn, br._ = Vn) : We._ = Vn;
  }).call(oi);
})(rr, rr.exports);
var Ph = rr.exports;
const Rh = { class: "d-flex align-items-center mb-30" }, Gh = {
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
    ui.FILTER_CHANGE,
    ui.CLEAR_FILTERS
  ],
  setup(o, { emit: L }) {
    const a = L, b = o, m = Ve(() => b.filters ? b.filters.filter((X) => X.model) : []), C = Ve(() => {
      const X = {};
      return m.value.forEach((M) => {
        X[M.key] = M.model;
      }), X;
    }), D = Ph.debounce(() => {
      a(ui.FILTER_CHANGE, C);
    }, 800);
    function G() {
      a(ui.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (X, M) => (h(), x("div", {
      class: Ue(["base-table-filters", { inactive: o.inactive }])
    }, [
      f("h6", Rh, [
        Z(S(Ot), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        M[1] || (M[1] = tt(" Filters "))
      ]),
      ir(X.$slots, "customFields", {}, void 0, !0),
      (h(!0), x(he, null, Ee(o.filters, (z, Y) => (h(), x(he, null, [
        z.type === "datetime" || z.type === "datetimehour" ? (h(), de(S(x0), {
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          label: z.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (H) => o.filters[Y].model = H,
          onInput: S(D)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : z.dataSource ? (h(), de(S(Ft), {
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          options: z.key === "campaign" ? X.campaignlist : z.dataSource,
          label: z.value,
          disabled: o.filters[Y].disabled,
          singleSelect: !1,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (H) => o.filters[Y].model = H,
          onClick: (H) => X.filterClicked(z.key),
          onInput: S(D)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), de(S($t), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          label: z.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (H) => o.filters[Y].model = H,
          onInput: S(D)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      Z(S(ct), {
        type: "tertiary",
        label: "Clear filters",
        onClick: M[0] || (M[0] = (z) => G())
      })
    ], 2));
  }
}, Mh = /* @__PURE__ */ He(Gh, [["__scopeId", "data-v-4191254b"]]), Uh = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: L }) {
    const a = L, m = o.options || {}, C = new IntersectionObserver(([G]) => {
      a("intersecting", G.isIntersecting);
    }, m), D = W(null);
    return wn(() => {
      D.value && C.observe(D.value);
    }), rh(() => {
      C.disconnect();
    }), (G, X) => (h(), x("div", {
      ref_key: "targetELement",
      ref: D,
      class: "observer",
      style: { height: "3px" }
    }, [
      ir(G.$slots, "default")
    ], 512));
  }
}, _0 = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", Wh = { class: "query-builder" }, Nh = { class: "query-conditions" }, qh = { class: "condition" }, zh = { class: "cell field" }, Hh = { class: "cell operator" }, Qh = { class: "cell value" }, Kh = {
  key: 0,
  class: "query-operator-outer"
}, Yh = { class: "query-operator" }, Zh = {
  key: 0,
  class: "query-operator-outer"
}, Jh = { class: "query-operator" }, Xh = {
  __name: "StandardQueryDisplay",
  props: {
    query: {
      type: Array,
      required: !0
    }
  },
  setup(o) {
    const L = (b) => {
      try {
        return new Date(b).toISOString().split("T")[0];
      } catch {
        return "-";
      }
    }, a = (b) => {
      const m = b == null ? void 0 : b.value;
      return m ? b.type === "date" ? L(m) : Array.isArray(m) ? m.join(", ") : typeof m == "boolean" ? m ? "True" : "False" : m : "-";
    };
    return (b, m) => (h(), x("div", Wh, [
      f("div", Nh, [
        m[0] || (m[0] = f("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), x(he, null, Ee(o.query, (C, D) => (h(), x("div", {
          key: `group-${D}`,
          class: "query-group"
        }, [
          (h(!0), x(he, null, Ee(C.conditions, (G, X) => (h(), x("div", {
            key: `condition-${X}`
          }, [
            f("div", qh, [
              f("div", zh, ne(G.field), 1),
              f("div", Hh, ne(G.operator), 1),
              f("div", Qh, ne(a(G)), 1),
              Z(S(ct), {
                type: "tertiary",
                icon: "bi-arrows-expand"
              })
            ]),
            X < C.conditions.length - 1 ? (h(), x("div", Kh, [
              f("div", Yh, ne(C.logic.replace("$", "").toUpperCase()), 1)
            ])) : F("", !0)
          ]))), 128)),
          D < o.query.length - 1 ? (h(), x("div", Zh, [
            f("div", Jh, ne(o.query[D + 1].logic.replace("$", "").toUpperCase()), 1)
          ])) : F("", !0)
        ]))), 128))
      ])
    ]));
  }
}, jh = /* @__PURE__ */ He(Xh, [["__scopeId", "data-v-a3525c2e"]]), e2 = { class: "info-card" }, t2 = { class: "segments" }, n2 = { class: "segment-img-wrapper" }, i2 = ["src", "title"], r2 = { class: "segment-info" }, a2 = {
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
    const L = o;
    function a(m) {
      const C = [];
      return m.coreEngagement && C.push(`Core Engagement: ${m.coreEngagement}`), m.coreFocus && C.push(`Core Focus: ${m.coreFocus}`), C.length > 0 ? C.join(`
`) : "No information available";
    }
    const b = Ve(() => !L.segmentData || !L.segmentData.segments ? [] : L.isThumbnail ? L.segmentData.segments.slice(0, 5) : L.segmentData.segments);
    return (m, C) => (h(), x("div", e2, [
      C[2] || (C[2] = f("h5", { class: "mb-3" }, "Top Interests", -1)),
      f("div", t2, [
        (h(!0), x(he, null, Ee(b.value, (D) => (h(), x("div", {
          class: "segment",
          key: D.name
        }, [
          f("div", n2, [
            f("img", {
              src: D.image,
              alt: "segment",
              title: a(D)
            }, null, 8, i2)
          ]),
          f("div", r2, [
            f("h4", null, ne(D.name), 1),
            f("p", null, [
              C[0] || (C[0] = f("span", null, "Est. Reach:", -1)),
              tt(" " + ne(D.reach) + " ", 1),
              Z(S(d0), {
                class: "pl-1",
                label: "This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience."
              })
            ]),
            f("p", null, [
              C[1] || (C[1] = f("span", null, "Affinity Score: ", -1)),
              tt(" " + ne(D.affinityScore), 1),
              Z(S(d0), {
                class: "pl-1",
                label: "A score of 158 means this persona is 58% more likely than average to be interested in your brand. It reflects behavioral and interest similarity to your seeded 1PD audience."
              })
            ])
          ])
        ]))), 128))
      ])
    ]));
  }
}, s2 = /* @__PURE__ */ He(a2, [["__scopeId", "data-v-9536e493"]]), l2 = { class: "segment-details-insigts mt-4" }, o2 = { class: "insights-title-wrapper" }, u2 = { class: "mt-3" }, c2 = { class: "query-result" }, d2 = {
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
  setup(o, { emit: L }) {
    const a = o;
    on(), Ve(() => {
      var m, C, D;
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
          categories: ((C = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.graph) == null ? void 0 : C.labels) || []
        },
        colors: [
          "#0A2FFF",
          "#0068AD"
        ],
        title: {
          text: ((D = a.selectedSegment.thumbnail) == null ? void 0 : D.title) || "",
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
    }), Ve(() => {
      var m, C, D;
      return ((D = (C = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.graph) == null ? void 0 : C.seriesCombined) == null ? void 0 : D.map((G) => ({
        name: G.name,
        data: G.data.map(Number)
      }))) || [];
    });
    const b = Ve(() => {
      var m, C, D, G;
      return ((G = (D = (C = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.segments) == null ? void 0 : C[0]) == null ? void 0 : D.segments) == null ? void 0 : G.slice(0, 2)) || [];
    });
    return Ve(() => b.value.map((D) => parseFloat(D.affinityScore || "0")).reduce((D, G) => D + G, 0).toFixed(2)), Ve(() => b.value.map((C) => parseInt(C.reach || "0", 10)).reduce((C, D) => C + D, 0).toLocaleString()), (m, C) => {
      const D = g0("CataUiTooltip");
      return h(), x("div", null, [
        f("div", l2, [
          f("div", o2, [
            C[1] || (C[1] = f("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            f("p", u2, [
              C[0] || (C[0] = tt("Find the segments that work best with ")),
              f("span", c2, ne(a.selectedSegment.name), 1)
            ]),
            Z(D, { label: "The preview is for your external proofing tool." })
          ])
        ])
      ]);
    };
  }
}, f2 = /* @__PURE__ */ He(d2, [["__scopeId", "data-v-54823e41"]]), p2 = { class: "modal-body" }, h2 = { class: "section" }, m2 = { class: "checkbox-group" }, g2 = { class: "checkbox-group" }, x2 = { class: "sections-wrapper" }, y2 = { class: "section" }, k2 = { class: "checkbox-group-catergory" }, v2 = { class: "section" }, _2 = { class: "ccheckbox-group-catergory" }, b2 = { class: "section" }, E2 = { class: "checkbox-group-category" }, S2 = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: L }) {
    const a = L, b = W([]), m = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], C = ["Build new campaign", "Update current campaign"], D = ["Display & Video 360", "The Trade Desk"], G = ["Infosum", "LiveRamp"], X = ["Open Media Studio", "Audience Builder"];
    function M() {
      a("close");
    }
    const z = () => {
      a("insertSegment"), M();
    };
    return (Y, H) => {
      const B = g0("hp");
      return h(), de(S(y0), {
        onClose: M,
        size: "medium"
      }, {
        header: Vt(() => H[5] || (H[5] = [
          f("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: Vt(() => [
          f("div", p2, [
            f("div", h2, [
              Z(B, null, {
                default: Vt(() => H[6] || (H[6] = [
                  tt("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              f("div", m2, [
                (h(), x(he, null, Ee(m, (w) => Z(S(Sn), {
                  key: w,
                  label: w,
                  modelValue: b.value,
                  "onUpdate:modelValue": H[0] || (H[0] = (I) => b.value = I),
                  value: w
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            H[10] || (H[10] = f("hr", null, null, -1)),
            f("div", g2, [
              (h(), x(he, null, Ee(C, (w) => Z(S(Sn), {
                key: w,
                label: w,
                modelValue: b.value,
                "onUpdate:modelValue": H[1] || (H[1] = (I) => b.value = I),
                value: w
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            f("div", x2, [
              f("div", y2, [
                H[7] || (H[7] = f("h3", null, "Cohort", -1)),
                f("div", k2, [
                  (h(), x(he, null, Ee(D, (w) => Z(S(Sn), {
                    key: w,
                    label: w,
                    modelValue: b.value,
                    "onUpdate:modelValue": H[2] || (H[2] = (I) => b.value = I),
                    value: w
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", v2, [
                H[8] || (H[8] = f("h3", null, "Clean Room", -1)),
                f("div", _2, [
                  (h(), x(he, null, Ee(G, (w) => Z(S(Sn), {
                    key: w,
                    label: w,
                    modelValue: b.value,
                    "onUpdate:modelValue": H[3] || (H[3] = (I) => b.value = I),
                    value: w
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", b2, [
                H[9] || (H[9] = f("h3", null, "WPP Open", -1)),
                f("div", E2, [
                  (h(), x(he, null, Ee(X, (w) => Z(S(Sn), {
                    key: w,
                    label: w,
                    modelValue: b.value,
                    "onUpdate:modelValue": H[4] || (H[4] = (I) => b.value = I),
                    value: w
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ])
            ])
          ])
        ]),
        footer: Vt(() => [
          Z(S(ct), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: M
          }),
          Z(S(ct), {
            type: "primary",
            label: "Push",
            onClick: z
          })
        ]),
        _: 1
      });
    };
  }
}, A2 = /* @__PURE__ */ He(S2, [["__scopeId", "data-v-44c63bbf"]]), w2 = [
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
], C2 = {
  charts: w2
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
}, b0 = {
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
}, T2 = { class: "segment-details" }, D2 = { class: "wrapper-left" }, I2 = { class: "source-wrapper" }, L2 = { class: "source-container" }, B2 = { class: "sub-controls" }, F2 = { class: "sub-tab-container" }, $2 = { class: "sub-controls-tabs" }, V2 = { class: "sub-controls-tools" }, O2 = { class: "list" }, P2 = {
  key: 0,
  class: "d-flex justify-content-center pt-40 pb-40"
}, R2 = { class: "wrapper-right" }, G2 = {
  key: 0,
  class: "segment-details-wrapper"
}, M2 = {
  key: 0,
  class: "segment-details-title"
}, U2 = { class: "segment-details-content" }, W2 = {
  key: 0,
  class: "description-row"
}, N2 = { class: "description-detail" }, q2 = {
  key: 1,
  class: "description-row"
}, z2 = { class: "description-detail" }, H2 = {
  key: 2,
  class: "description-row"
}, Q2 = { class: "description-detail" }, K2 = {
  key: 3,
  class: "description-row"
}, Y2 = { class: "description-detail" }, Z2 = {
  key: 4,
  class: "description-row"
}, J2 = { class: "description-detail" }, X2 = {
  key: 5,
  class: "description-row"
}, j2 = { class: "description-detail" }, em = {
  key: 6,
  class: "description-row"
}, tm = { class: "description-detail" }, nm = {
  key: 7,
  class: "description-row"
}, im = { class: "description-detail" }, rm = {
  key: 8,
  class: "description-row"
}, am = { class: "description-detail-bold" }, sm = {
  key: 0,
  class: "description-detail"
}, lm = { class: "description-row" }, om = { class: "description-term" }, um = { class: "description-detail" }, cm = {
  key: 1,
  class: "standard-view"
}, dm = ["src"], fm = {
  key: 0,
  class: "footer"
}, pm = { class: "footer-text" }, hm = { class: "footer-description-detail" }, mm = {
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
  setup(o, { emit: L }) {
    const a = o, b = L;
    W([]);
    const m = on(), C = W(null), D = W(null), G = W(!1), X = W([]), M = W(""), z = W([]), Y = W(""), H = W(""), B = W(!1), w = [
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
    ], I = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], J = W(w[0]), xe = W(I[0]), fe = W(!1), oe = W([
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
    ]), ue = [
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
    ], q = W({}), V = W(""), $ = W({
      sortColumn: "name",
      sortOrder: 1
    });
    function P() {
      m.set_selectedSegmentType("standard"), m.set_selectedSegment(V.value), b("showInsightsExplorer", V.value);
    }
    async function ke() {
      var T;
      if (!((T = V.value) != null && T.segmentId))
        return;
      const _ = `${a.baseUrl}/api/v1/segments/${V.value.segmentId}`;
      try {
        const ae = await fetch(_, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!ae.ok) {
          const vt = await ae.text();
          throw new Error(vt || "Failed to delete segment");
        }
        V.value = "", await m.fetch_segments(Y.value);
      } catch (ae) {
        console.error("Error deleting segment:", ae);
      }
    }
    function Be(_) {
      return _.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (T) => T.toUpperCase());
    }
    function Ge(_) {
      return _ == null ? "" : (typeof _ == "string" ? parseInt(_, 10) : _).toLocaleString();
    }
    function Oe(_) {
      q.value = _, m.set_filterQuery(_), m.fetch_segments(Y.value);
    }
    async function nt(_) {
      if (_ && m.get_isLastPage && !fe.value && m.get_segments && m.get_segments.length > 0) {
        fe.value = !0;
        try {
          await m.fetch_nextSegmentPage(Y.value), fe.value = !1;
        } catch {
          fe.value = !1;
        }
      }
    }
    async function Pt() {
      oe.value.map((_) => {
        _.key !== "market" && (_.model = "");
      }), m.reset_filterQuery(), await m.fetch_segments(Y.value);
    }
    function un(_) {
      $.value = _;
    }
    function cn() {
      G.value = !G.value;
    }
    function Ct(_) {
      V.value = _.row;
    }
    function Tt() {
      B.value = !0;
    }
    async function kt() {
      await m.set_token(a.token), await m.set_brandId(a.brandId), await m.set_tenantId(a.tenantId), await m.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? V.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && (V.value = a.selectedSegment), await m.fetch_segment_settings(a.brandId);
      try {
        const _ = await m.get_segment_settings;
        _ && (z.value = await _.platforms.map((T) => ({
          value: T.platform_id,
          label: T.platform,
          locations: T.locations.map((ae) => ({
            value: ae.value,
            label: ae.display_name
          }))
        }))), Y.value = z.value[0].value;
      } catch (_) {
        console.log(_);
      }
    }
    return wn(() => {
      D.value = C.value, kt();
    }), ln(Y, async (_, T) => {
      _ && T !== _ && (X.value = z.value[_ - 1].locations, M.value = X.value[0].value, fe.value = !0, m.set_platform(_), await m.fetch_segments(_), J.value = w[0], fe.value = !1);
    }), ln(H, async (_) => {
      _ && (_ == null ? void 0 : _.length) < 3 || (m.set_searchTerm(_), m.fetch_segments(Y.value));
    }), ln(M, async (_) => {
      m.set_locationQuery(_), m.fetch_segments(Y.value);
    }), ln($, async (_) => {
      m.set_sortQuery(_), m.fetch_segments(Y.value);
    }), ln(J, async (_) => {
      const T = _.id;
      m.set_categoryQuery(T), m.fetch_segments();
    }), Ve(() => C2.charts.map((_) => {
      var _t, Rt;
      const T = b0[_.type] || ((_t = _.type) == null ? void 0 : _t.toLowerCase()), ae = Fa[T] || {};
      console.log("type", T), console.log("baseOptions", ae);
      let vt = {}, Dt = [];
      return T === "line" || T === "area" ? (vt = {
        xaxis: {
          categories: _.data.map((De) => De.key),
          labels: { style: { fontSize: "12px", colors: "#777" } },
          axisBorder: { show: !1 },
          axisTicks: { show: !1 }
        },
        yaxis: {
          labels: {
            style: { fontSize: "12px", colors: "#777" },
            formatter: (De) => De > 1e3 ? `${(De / 1e3).toFixed(1)}K` : De
          }
        }
      }, Dt = [{
        name: ((Rt = _.data[0]) == null ? void 0 : Rt.valueType) || "Value",
        data: _.data.map((De) => Number(De.value))
      }]) : T === "bar" ? (vt = {
        xaxis: {
          categories: _.data.map((De) => De.key)
        }
      }, Dt = [{
        name: _.title,
        data: _.data.map((De) => Number(De.value))
      }]) : T === "donut" || T === "pie" ? (vt = {
        labels: _.data.map((De) => De.key)
      }, Dt = _.data.map((De) => Number(De.value))) : T === "bubble" && (Dt = [{
        name: _.title,
        data: _.data.map((De) => ({
          x: Number(De.x),
          y: Number(De.y),
          z: Number(De.z)
        }))
      }]), console.log("series", Dt), console.log("dynamicOptions", vt), {
        series: Dt,
        options: {
          ...ae,
          ...vt,
          title: {
            ...ae.title,
            text: _.title
          },
          chart: {
            // ...baseOptions.chart,
            type: T
          }
        },
        chartType: T
      };
    })), (_, T) => (h(), x(he, null, [
      f("div", T2, [
        f("div", D2, [
          f("div", I2, [
            f("div", L2, [
              Z(S(Ft), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: z.value,
                modelValue: Y.value,
                "onUpdate:modelValue": T[0] || (T[0] = (ae) => Y.value = ae),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              Z(S(Ft), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: X.value,
                modelValue: M.value,
                "onUpdate:modelValue": T[1] || (T[1] = (ae) => M.value = ae),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            Z(S($t), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: H.value,
              "onUpdate:modelValue": T[2] || (T[2] = (ae) => H.value = ae)
            }, null, 8, ["modelValue"])
          ]),
          f("div", B2, [
            f("div", F2, [
              f("div", $2, [
                Z(S(Ia), {
                  tabs: w,
                  modelValue: J.value,
                  "onUpdate:modelValue": T[3] || (T[3] = (ae) => J.value = ae),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              f("div", V2, [
                Z(S(Ot), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: T[4] || (T[4] = (ae) => cn())
                })
              ])
            ])
          ]),
          f("div", O2, [
            f("div", {
              class: "list-list",
              ref_key: "list",
              ref: C
            }, [
              Z(Oh, {
                stickyHeader: 0,
                columns: ue,
                rows: S(m).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: T[5] || (T[5] = (ae) => Ct(ae)),
                onColumnSorted: T[6] || (T[6] = (ae) => un(ae)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              fe.value ? (h(), x("div", P2, [
                Z(S(zn), { size: "xlarge" })
              ])) : F("", !0),
              Z(Uh, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: T[7] || (T[7] = (ae) => nt(ae))
              })
            ], 512),
            G.value ? (h(), de(Mh, {
              key: 0,
              filters: oe.value,
              onClearFilters: T[8] || (T[8] = (ae) => Pt()),
              onFilterChange: T[9] || (T[9] = (ae) => Oe(ae))
            }, null, 8, ["filters"])) : F("", !0)
          ])
        ]),
        f("div", R2, [
          f("div", {
            class: Ue(["outer-wrapper-segment-details", { "standard-empty": !V.value }])
          }, [
            V.value ? (h(), x("div", G2, [
              V.value ? (h(), x("div", M2, ne(V.value.name), 1)) : F("", !0),
              T[24] || (T[24] = f("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              f("div", U2, [
                V.value.name ? (h(), x("div", W2, [
                  T[15] || (T[15] = f("div", { class: "description-term" }, "Name", -1)),
                  f("div", N2, ne(V.value.name), 1)
                ])) : F("", !0),
                V.value.description ? (h(), x("div", q2, [
                  T[16] || (T[16] = f("div", { class: "description-term" }, "Description", -1)),
                  f("div", z2, ne(V.value.description), 1)
                ])) : F("", !0),
                V.value.sourceCreatedDate ? (h(), x("div", H2, [
                  T[17] || (T[17] = f("div", { class: "description-term" }, "Created", -1)),
                  f("div", Q2, ne(S(An)(V.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : F("", !0),
                V.value.sourceUpdatedDate ? (h(), x("div", K2, [
                  T[18] || (T[18] = f("div", { class: "description-term" }, "Updated", -1)),
                  f("div", Y2, ne(S(An)(V.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : F("", !0),
                V.value.status ? (h(), x("div", Z2, [
                  T[19] || (T[19] = f("div", { class: "description-term" }, "Status", -1)),
                  f("div", J2, ne(V.value.status.value), 1)
                ])) : F("", !0),
                V.value.expiration_date ? (h(), x("div", X2, [
                  T[20] || (T[20] = f("div", { class: "description-term" }, "Expiration", -1)),
                  f("div", j2, ne(V.value.expiration_date), 1)
                ])) : F("", !0),
                V.value.id ? (h(), x("div", em, [
                  T[21] || (T[21] = f("div", { class: "description-term" }, "Segmnent ID", -1)),
                  f("div", tm, ne(V.value.id), 1)
                ])) : F("", !0),
                V.value.audience_id ? (h(), x("div", nm, [
                  T[22] || (T[22] = f("div", { class: "description-term" }, "Audience ID", -1)),
                  f("div", im, ne(V.value.audience_id), 1)
                ])) : F("", !0),
                V.value.count ? (h(), x("div", rm, [
                  T[23] || (T[23] = f("div", { class: "description-term" }, "Last count", -1)),
                  f("div", am, ne(Ge(V.value.count)), 1),
                  V.value.refreshCountDate ? (h(), x("span", sm, " (" + ne(S(An)(V.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : F("", !0)
                ])) : F("", !0),
                V.value.platform_specific ? (h(!0), x(he, { key: 9 }, Ee(V.value.platform_specific, (ae) => (h(), x("div", lm, [
                  f("div", om, ne(Be(ae.label)), 1),
                  f("div", um, ne(ae.value), 1)
                ]))), 256)) : F("", !0)
              ]),
              f("div", null, [
                Z(S(Ia), {
                  tabs: I,
                  modelValue: xe.value,
                  "onUpdate:modelValue": T[10] || (T[10] = (ae) => xe.value = ae),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                xe.value.id === 2 ? (h(), de(jh, {
                  key: 0,
                  query: V.value.query
                }, null, 8, ["query"])) : F("", !0)
              ])
            ])) : F("", !0),
            V.value ? F("", !0) : (h(), x("div", cm, [
              f("div", null, [
                f("img", {
                  class: "",
                  alt: "standardIcon",
                  src: S(_0)
                }, null, 8, dm)
              ]),
              T[25] || (T[25] = f("div", { class: "standard-view-title" }, [
                f("div", null, "Select a standard segment from the list"),
                f("div", null, "or"),
                f("div", null, [
                  f("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          V.value.name ? (h(), x("div", fm, [
            f("div", pm, [
              T[26] || (T[26] = f("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              f("div", hm, [
                f("span", null, ne(V.value.name ? `${`${V.value.name} - `}` : "none"), 1),
                f("span", null, ne(Ge(V.value.count)), 1)
              ])
            ]),
            f("div", null, [
              Z(S(ct), {
                type: "secondary",
                label: "Explore",
                onClick: T[11] || (T[11] = (ae) => P()),
                class: "mr-2"
              }),
              Z(S(ct), {
                type: "delete",
                label: "Delete",
                onClick: T[12] || (T[12] = (ae) => ke()),
                class: "mr-2 redButton"
              }),
              Z(S(ct), {
                type: "primary",
                label: "Push to destination",
                onClick: T[13] || (T[13] = (ae) => Tt())
              })
            ])
          ])) : F("", !0)
        ])
      ]),
      B.value ? (h(), de(A2, {
        key: 0,
        onClose: T[14] || (T[14] = (ae) => B.value = !1)
      })) : F("", !0)
    ], 64));
  }
}, gm = /* @__PURE__ */ He(mm, [["__scopeId", "data-v-e027e21a"]]), xm = { class: "feedback-title-wrapper" }, ym = { class: "title" }, km = { class: "feedback-text" }, vm = {
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
    const L = {
      warning: "bi-exclamation-triangle-fill",
      info: "bi-info-circle-fill",
      query: "bi-magic",
      "icon-color-warning": "#FA5D05",
      "icon-color-info": "#8B919A",
      "icon-color-query": "#528233"
    };
    return (a, b) => {
      var m, C, D;
      return o.feedback ? (h(), x("div", {
        key: 0,
        class: Ue(["ai-query-feedback", [o.feedback.type]])
      }, [
        f("div", xm, [
          Z(S(Ot), {
            class: "pr-2",
            size: "16px",
            icon: L[(m = o.feedback) == null ? void 0 : m.type],
            color: L[`icon-color-${(C = o.feedback) == null ? void 0 : C.type}`]
          }, null, 8, ["icon", "color"]),
          f("div", ym, ne(o.feedback.title), 1)
        ]),
        f("p", km, ne((D = o.feedback) == null ? void 0 : D.text), 1)
      ], 2)) : F("", !0);
    };
  }
}, h0 = /* @__PURE__ */ He(vm, [["__scopeId", "data-v-db7f7814"]]), _m = { key: 0 }, bm = { class: "d-flex justify-content-between" }, Em = { class: "query-results" }, Sm = { class: "query-result" }, Am = { class: "query-result-count" }, wm = {
  key: 0,
  class: "segment-insights"
}, Cm = {
  key: 1,
  class: "loading"
}, Tm = {
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
  setup(o, { emit: L }) {
    const a = L, b = o;
    W(!1);
    const m = W(!1), C = {
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
    }, D = [
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
    function G() {
      a("explore-insights");
    }
    function X(M) {
      return M == null ? "" : (typeof M == "string" ? parseInt(M, 10) : M).toLocaleString();
    }
    return (M, z) => (h(), x("div", null, [
      o.savingDraft ? F("", !0) : (h(), x("div", _m, [
        f("div", bm, [
          z[1] || (z[1] = f("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          m.value ? (h(), de(S(ct), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: z[0] || (z[0] = (Y) => G())
          })) : F("", !0)
        ]),
        f("div", Em, [
          f("div", Sm, [
            z[2] || (z[2] = tt(" Segment size ")),
            f("span", Am, ne(X(b.segmentCount)), 1),
            z[3] || (z[3] = tt(" records. "))
          ])
        ]),
        m.value ? (h(), x("div", wm, [
          Z(S(La), {
            options: C,
            series: D
          })
        ])) : F("", !0)
      ])),
      o.savingDraft ? (h(), x("div", Cm, [
        Z(S(zn), { size: "xlarge" }),
        z[4] || (z[4] = f("p", null, "Connecting to Open Intelligence...", -1))
      ])) : F("", !0)
    ]));
  }
}, Dm = /* @__PURE__ */ He(Tm, [["__scopeId", "data-v-3a77bed4"]]), Im = { class: "query-attributes" }, Lm = ["onClick", "onKeydown"], Bm = {
  key: 0,
  class: "query-attributes-group-items"
}, Fm = ["onClick"], $m = { class: "attribute-type" }, Vm = { class: "attribute-name" }, Om = {
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
  setup(o, { emit: L }) {
    const a = L;
    function b(C) {
      a("toggle-group", C);
    }
    function m(C, D) {
      return D[C];
    }
    return (C, D) => (h(), x("div", Im, [
      o.fetching ? (h(), de(S(zn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : F("", !0),
      (h(!0), x(he, null, Ee(o.tables, (G) => (h(), x("div", {
        class: Ue(["query-attributes-group", { closed: o.collapsed.includes(G.display_name) }]),
        key: G.display_name
      }, [
        f("div", {
          class: "query-attributes-group-toggle",
          onClick: (X) => b(G.display_name),
          onKeydown: $a((X) => b(G.display_name), ["enter"])
        }, [
          D[3] || (D[3] = f("span", { class: "arrow" }, null, -1)),
          tt(" " + ne(G.display_name), 1)
        ], 40, Lm),
        o.collapsed.includes(G.display_name) ? F("", !0) : (h(), x("div", Bm, [
          Z(S(Ba), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (X) => m(X, G.columns),
            onDragEnd: D[2] || (D[2] = (X) => C.$emit("drag-end"))
          }, {
            default: Vt(() => [
              (h(!0), x(he, null, Ee(G.columns, (X) => (h(), de(S(oh), {
                key: X.display_name
              }, {
                default: Vt(() => [
                  f("div", {
                    class: "attribute",
                    onMousedown: D[0] || (D[0] = (M) => C.$emit("drag-start")),
                    onMouseup: D[1] || (D[1] = (M) => C.$emit("drag-end"))
                  }, [
                    Z(S(Ot), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    f("div", {
                      class: "attribute-content",
                      onClick: ah((M) => C.$emit("click-attribute", X), ["stop"])
                    }, [
                      f("span", $m, ne(X.type), 1),
                      f("span", Vm, ne(X.display_name), 1)
                    ], 8, Fm)
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
}, Pm = /* @__PURE__ */ He(Om, [["__scopeId", "data-v-4e61c8b0"]]), Rm = { class: "freeform-tab" }, Gm = {
  __name: "FreeForm",
  setup(o) {
    ar();
    const L = W("");
    return (a, b) => (h(), x("div", Rm, [
      Z(S($t), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: L.value,
        "onUpdate:modelValue": b[0] || (b[0] = (m) => L.value = m)
      }, null, 8, ["modelValue"])
    ]));
  }
}, Mm = /* @__PURE__ */ He(Gm, [["__scopeId", "data-v-f29f192b"]]), Um = { class: "query-builder" }, Wm = { class: "query-builder-left" }, Nm = { class: "query-tabs" }, qm = { class: "source" }, zm = {
  key: 1,
  class: "ai-query-tab"
}, Hm = {
  key: 2,
  class: ""
}, Qm = { class: "query-builder-right" }, Km = { class: "query-content-scrollable" }, Ym = { class: "query-editor-wrapper" }, Zm = { class: "query-runner-button-wrapper" }, Jm = {
  key: 0,
  class: "query-editor"
}, Xm = { class: "queries" }, jm = {
  key: 0,
  class: "query"
}, eg = ["onClick", "onKeydown"], tg = { class: "w-100 pr-10" }, ng = {
  key: 0,
  class: "sub-query-outer"
}, ig = { class: "sub-queries" }, rg = {
  key: 0,
  class: "query-operator-inner",
  style: { width: "fit-content" }
}, ag = {
  key: 1,
  class: "pt-3 pb-2"
}, sg = { key: 0 }, lg = {
  key: 1,
  class: "px-2"
}, og = {
  key: 1,
  class: "query-operator-outer"
}, ug = {
  key: 0,
  class: "inital-view"
}, cg = ["src"], dg = { key: 0 }, fg = {
  key: 0,
  class: "query-results-wrapper"
}, pg = {
  key: 1,
  class: "loading-query-run"
}, hg = {
  key: 2,
  class: "loading-query-run"
}, mg = {
  key: 0,
  class: "mt-3"
}, gg = {
  key: 1,
  class: "mt-3"
}, xg = { class: "query-builder-footer" }, yg = { class: "query-builder-footer-fields" }, kg = { class: "query-builder-footer-buttons" }, vg = {
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
  setup(o, { emit: L }) {
    const a = o, b = on(), m = ar(), C = L;
    W();
    const D = [
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
    ], G = W(D[0]), X = W([]), M = W(X.value[0]), z = W([]), Y = W(z.value[0]), H = W(""), B = W(null), w = W(!1), I = W(null), J = W(!0), xe = W(!1), fe = W([]), oe = W([]), ue = W(!1), q = W(!1), V = W(""), $ = W(""), P = W(!1), ke = W(!1), Be = W(!1), Ge = W(""), Oe = W(!1), nt = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], Pt = [
      { value: "$eq", label: "equal" }
    ], un = [
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
    ], Ct = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$bt", label: "between" },
      { value: "$nbt", label: "not between" }
    ], Tt = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], kt = W(0), _ = W({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), T = () => {
      b.set_selectedSegmentType("custom"), b.set_activeTab("custom"), b.set_selectedSegment(B.value), C("showInsightsExplorer", B.value);
    };
    function ae(K) {
      const A = {
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
      let U = "$and";
      return K.reduce((we, O) => {
        if (O.logic)
          return U = O.logic, we;
        if (Array.isArray(O.group)) {
          const me = O.group.filter((Qe) => Qe.statement).map((Qe) => {
            const [Zt, In, Hn] = Qe.statement;
            return {
              field: Zt,
              operator: A[In] || In,
              value: Hn,
              type: Qe.input_type
            };
          });
          return [
            ...we,
            {
              logic: U,
              conditions: me
            }
          ];
        }
        return we;
      }, []);
    }
    async function vt(K) {
      const A = {
        brandName: a.brandName,
        name: K.name,
        description: K.description,
        count: K.count || H.value,
        market: b.query.demographics.market
      }, U = `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${K.segmentId}`, we = await fetch(U, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(A)
      });
      if (!we.ok) {
        const O = await we.json();
        throw new Error(O.message || "Failed to generate insights");
      }
      await we.json();
    }
    async function Dt() {
      Ge.value = "saving", Oe.value = !1, Be.value = !0;
      const K = {
        platformId: Y.value,
        count: H.value,
        region: b.query.demographics.region,
        market: b.query.demographics.market,
        description: _.value.description,
        name: _.value.name,
        query: ae(_.value.conditions)
      };
      try {
        const A = await fetch("https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          },
          body: JSON.stringify(K)
        }), U = await A.json();
        if (!A.ok)
          throw new Error(U.message || "Failed to save segment");
        ke.value = !0, q.value = !0, Ge.value = "generating", B.value = U.data[0], await vt(U.data[0]), Ge.value = "done";
      } catch (A) {
        console.error("Error saving segment or generating insights:", A), Ge.value = "";
      } finally {
        Be.value = !1, Oe.value = !0;
      }
    }
    async function _t() {
      P.value = !0;
      const K = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: $.value
      };
      _.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const A = await m.generate_ai_query(K, Y.value, M.value), U = {
        text: A.message,
        type: A.query ? "info" : "warning",
        title: "AI Assumption"
      }, we = {
        text: A.query,
        type: "query",
        title: "Query Gen"
      };
      m.set_ai_generated_message(U), m.set_ai_generated_query(we), A.attrs.forEach((O, me) => {
        me === 0 ? I.value = "queryGroupDrop" : I.value = _.value.conditions[0].id;
        const Qe = {
          payload: {
            display_name: O.field,
            input_type: O.input_type,
            operators: O.operator,
            selectors: []
          }
        };
        Qe.payload.selectors.push(O.value), dn(Qe), c0();
      }), P.value = !1;
    }
    async function Rt() {
      _.value.conditions.forEach((K) => {
        Array.isArray(K.group) && (K == null || K.group.forEach((A) => {
          A.input_type === "select" && A.statement[2].length > 1 && A.statement[1] === "$eq" && (A.statement[1] = "$in"), A.input_type === "select" && A.statement[2].length > 1 && A.statement[1] === "$neq" && (A.statement[1] = "$nin");
        }));
      });
    }
    async function De() {
      ue.value = !0, G.value.id === 1 && await Rt(), H.value = await m.run_query(_.value, Y.value, M.value), H.value && (q.value = !0), ue.value = !1, ke.value = !1;
    }
    function Kt(K, A) {
      var we, O;
      return K === "operatorsQueries" ? (we = nt.find((me) => me.value === A)) == null ? void 0 : we.label : (O = Yt(K).find((me) => me.value === A)) == null ? void 0 : O.label;
    }
    function Yt(K) {
      switch (K) {
        case "select":
          return un;
        case "boolean":
          return Pt;
        case "string":
          return cn;
        case "date":
          return Ct;
        case "int":
          return Tt;
        default:
          return [];
      }
    }
    function fi(K) {
      w.value = K;
    }
    async function Tn() {
      xe.value = !0, await m.fetch_database_model(Y.value, M.value), xe.value = !1;
    }
    async function Dn() {
      J.value = !0, await m.fetch_custom_segment_settings();
      const K = await m.get_segment_settings;
      K && (z.value = await K.platforms.map((A) => ({
        value: A.platform_id,
        label: A.platform,
        locations: A.locations.map((U) => ({
          value: U.value,
          label: U.display_name
        }))
      })), Y.value = z.value[0].value), J.value = !1;
    }
    function dn(K) {
      const A = K.payload ? K.payload : K;
      if (kt.value < m.settings.maxSubQuery) {
        const U = A.selectors.map((me) => ({
          value: me,
          label: me
        }));
        let we = [];
        U.length > 2 ? we[0] = U[0].value : U.length > 0 ? we = U[0].value : we = null;
        const O = U.length > 0 && A.input_type !== "boolean" ? "select" : A.input_type;
        if (I.value === "queryGroupDrop") {
          kt.value += 1, _.value.conditions.length > 0 && _.value.conditions.push({ logic: "$or" });
          const me = {
            id: Ca(),
            group: [
              {
                id: Ca(),
                statement: [A.display_name, "$eq", we],
                selectors: U,
                input_type: O
              }
            ]
          };
          _.value.conditions.push(me);
        } else if (I.value !== null) {
          kt.value += 1;
          const me = _.value.conditions.findIndex(
            (Qe) => Qe.id === I.value
          );
          me !== -1 && (_.value.conditions[me].group.push({ logic: "$and" }), _.value.conditions[me].group.push({
            id: Ca(),
            statement: [A.display_name, "$eq", we],
            selectors: U,
            input_type: O
          }));
        }
        I.value = null;
      }
    }
    function it(K) {
      var A;
      (A = _.value.conditions[0]) != null && A.id ? I.value = _.value.conditions[0].id : I.value = "queryGroupDrop", dn(K), c0();
    }
    function fn(K, A, U) {
      if (_.value.conditions[A].group.length === 1)
        _.value.conditions.length > A + 1 ? _.value.conditions.splice(A, 2) : _.value.conditions.splice(A, 1), kt.value -= 1;
      else {
        const we = _.value.conditions[A].group.findIndex(
          (O) => O.id === U
        );
        _.value.conditions[A].group.splice(we - 1, 2), kt.value -= 1;
      }
    }
    function pi(K) {
      const A = fe.value.indexOf(K);
      A >= 0 ? fe.value.splice(A, 1) : fe.value.push(K);
    }
    function bt(K) {
      const A = oe.value.indexOf(K);
      A >= 0 ? oe.value.splice(A, 1) : oe.value.push(K);
    }
    function hi() {
      H.value = "", _.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function lr() {
      _.value = { ..._.value, count: H.value }, G.value.id === 3 && (_.value = {
        ..._.value,
        freeForm: m.freeFormQuery
      }), C("insertSegment", _.value);
    }
    async function pn() {
      await b.set_token(a.token), await b.set_brandId(a.brandId), await b.set_tenantId(a.tenantId), await m.set_customSegmentUrl(a.customSegmentUrl), await m.fetch_custom_segment_settings(), await Dn();
    }
    return wn(() => {
      pn();
    }), ln(Y, async (K, A) => {
      K && A !== K && (X.value = z.value.find((U) => U.value == K).locations, M.value = X.value[0].value, await hi(), await Tn());
    }), ln(G, async (K, A) => {
      K && A !== K && K.id === 2 && ($.value = "", m.set_ai_generated_message(null), m.set_ai_generated_query(null));
    }), (K, A) => (h(), x("div", Um, [
      f("div", Wm, [
        J.value ? (h(), de(S(zn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), x(he, { key: 1 }, [
          f("div", Nm, [
            Z(S(Ia), {
              tabs: D,
              modelValue: G.value,
              "onUpdate:modelValue": A[0] || (A[0] = (U) => G.value = U),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          f("div", qm, [
            Z(S(Ft), {
              style: { width: "45%" },
              class: "source w-100",
              options: z.value,
              modelValue: Y.value,
              "onUpdate:modelValue": A[1] || (A[1] = (U) => Y.value = U),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            Z(S(Ft), {
              style: { width: "45%" },
              class: "source w-100",
              options: X.value,
              modelValue: M.value,
              "onUpdate:modelValue": A[2] || (A[2] = (U) => M.value = U),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            S(b).brief.market ? (h(), de(S($t), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: S(b).brief.market,
              "onUpdate:modelValue": A[3] || (A[3] = (U) => S(b).brief.market = U),
              label: "Market"
            }, null, 8, ["modelValue"])) : F("", !0)
          ]),
          Y.value && M.value ? (h(), x(he, { key: 0 }, [
            G.value.id === 1 ? (h(), de(Pm, {
              key: 0,
              tables: S(m).get_databaseModel.tables,
              collapsed: oe.value,
              fetching: xe.value,
              onClickAttribute: it,
              onDragStart: A[4] || (A[4] = (U) => fi(!0)),
              onDragEnd: A[5] || (A[5] = (U) => fi(!1)),
              onToggleGroup: bt
            }, null, 8, ["tables", "collapsed", "fetching"])) : F("", !0),
            G.value.id === 2 ? (h(), x("div", zm, [
              Z(S($t), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: $.value,
                "onUpdate:modelValue": A[6] || (A[6] = (U) => $.value = U)
              }, null, 8, ["modelValue"]),
              Z(S(ct), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !$.value,
                loading: P.value,
                onClick: A[7] || (A[7] = (U) => _t())
              }, null, 8, ["disabled", "loading"]),
              S(m).get_aiGeneratedMessage ? (h(), de(h0, {
                key: 0,
                feedback: S(m).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : F("", !0),
              S(m).get_aiGeneratedQuery ? (h(), de(h0, {
                key: 1,
                feedback: S(m).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : F("", !0)
            ])) : F("", !0),
            G.value.id === 3 ? (h(), x("div", Hm, [
              Z(Mm)
            ])) : F("", !0)
          ], 64)) : F("", !0)
        ], 64))
      ]),
      f("div", Qm, [
        f("div", Km, [
          f("div", Ym, [
            f("div", null, [
              A[15] || (A[15] = f("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              f("div", Zm, [
                Z(S(ct), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !Y.value || !M.value,
                  loading: ue.value,
                  onClick: A[8] || (A[8] = (U) => De())
                }, null, 8, ["disabled", "loading"]),
                Z(S(ct), {
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !_.value.name || !_.value.description || !H.value || ke.value,
                  loading: Be.value,
                  onClick: A[9] || (A[9] = (U) => Dt())
                }, null, 8, ["disabled", "loading"])
              ])
            ]),
            G.value.id !== 3 ? (h(), x("div", Jm, [
              f("div", Xm, [
                (h(!0), x(he, null, Ee(_.value.conditions, (U, we) => (h(), x("div", {
                  class: "query-outer",
                  key: U.id
                }, [
                  U.group ? (h(), x("div", jm, [
                    f("div", {
                      class: "collapse-subQuery",
                      onClick: (O) => pi(U.id),
                      onKeydown: $a((O) => pi(U.id), ["enter"])
                    }, [
                      Z(S(Ot), {
                        icon: fe.value.indexOf(U.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, eg),
                    f("div", tg, [
                      fe.value.indexOf(U.id) === -1 ? (h(), x("div", ng, [
                        (h(!0), x(he, null, Ee(U.group, (O) => (h(), x("div", ig, [
                          O.logic && fe.value.indexOf(U.id) === -1 ? (h(), x("div", rg, [
                            Z(S(Ft), {
                              class: "query-operator",
                              modelValue: O.logic,
                              "onUpdate:modelValue": (me) => O.logic = me,
                              singleSelect: !0,
                              options: nt,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : F("", !0),
                          O.statement ? (h(), x("div", {
                            key: 1,
                            class: Ue(["sub-query", { "single-subquery": U.group.length === 1 }])
                          }, [
                            Z(S($t), {
                              readonly: "",
                              modelValue: O.statement[0],
                              "onUpdate:modelValue": (me) => O.statement[0] = me
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            Z(S(Ft), {
                              modelValue: O.statement[1],
                              "onUpdate:modelValue": (me) => O.statement[1] = me,
                              singleSelect: !0,
                              options: Yt(O.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            O.selectors.length < 3 && O.selectors.length > 0 ? (h(), de(S(Ft), {
                              key: 0,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (me) => O.statement[2] = me,
                              options: O.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : F("", !0),
                            O.selectors.length > 2 && O.input_type !== "boolean" ? (h(), de(S(Ft), {
                              key: 1,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (me) => O.statement[2] = me,
                              options: O.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : F("", !0),
                            O.input_type === "int" ? (h(), de(S($t), {
                              key: 2,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (me) => O.statement[2] = me,
                              error: O.statement[2] ? "" : V.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : F("", !0),
                            O.input_type === "string" ? (h(), de(S($t), {
                              key: 3,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (me) => O.statement[2] = me,
                              error: O.statement[2] ? "" : V.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : O.input_type === "date" ? (h(), de(S(x0), {
                              key: 4,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (me) => O.statement[2] = me,
                              range: O.statement[1] === "$bt" || O.statement[1] === "$nbt",
                              error: O.statement[2] ? "" : V.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : F("", !0),
                            Z(S(Ot), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (me) => fn(U.id, we, O.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : F("", !0)
                        ]))), 256))
                      ])) : (h(), x("p", ag, [
                        (h(!0), x(he, null, Ee(U.group, (O, me) => (h(), x("span", {
                          key: O.id
                        }, [
                          O.statement ? (h(), x("span", sg, [
                            f("b", null, ne(O == null ? void 0 : O.statement[0]), 1),
                            tt(" " + ne(Kt(O.input_type, O == null ? void 0 : O.statement[1])) + " ", 1),
                            f("b", null, ne((O == null ? void 0 : O.statement[2]) || "?"), 1)
                          ])) : (h(), x("span", lg, ne(Kt("operatorsQueries", O.logic)), 1))
                        ]))), 128))
                      ])),
                      w.value && kt.value < S(m).settings.maxSubQuery ? (h(), de(S(Ba), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (O) => I.value = U.id,
                        onDrop: dn
                      }, {
                        default: Vt(() => A[16] || (A[16] = [
                          f("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : F("", !0)
                    ])
                  ])) : F("", !0),
                  _.value.conditions.length > 1 && we < _.value.conditions.length - 1 && U.logic ? (h(), x("div", og, [
                    Z(S(Ft), {
                      class: "query-operator",
                      modelValue: U.logic,
                      "onUpdate:modelValue": (O) => U.logic = O,
                      singleSelect: !0,
                      options: nt,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : F("", !0)
                ]))), 128))
              ]),
              _.value.conditions.length === 0 ? (h(), x("div", ug, [
                f("span", null, [
                  f("img", {
                    class: "",
                    alt: "standardIcon",
                    src: S(_0)
                  }, null, 8, cg)
                ])
              ])) : F("", !0),
              w.value && kt.value < S(m).settings.maxSubQuery || _.value.conditions.length === 0 ? (h(), de(S(Ba), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: A[10] || (A[10] = (U) => I.value = "queryGroupDrop"),
                onDrop: dn
              }, {
                default: Vt(() => [
                  f("div", {
                    class: Ue(["drop-indicator", {
                      "mt-25": _.value.conditions.length > 0,
                      "p-5": _.value.conditions.length === 0
                    }])
                  }, [
                    _.value.conditions.length <= 0 ? (h(), x("span", dg, " Drag and drop attributes or AI generated rules ")) : F("", !0)
                  ], 2)
                ]),
                _: 1
              })) : F("", !0)
            ])) : F("", !0)
          ]),
          ue.value || q.value ? (h(), x("div", fg, [
            !ue.value && q.value ? (h(), de(Dm, {
              key: 0,
              segmentData: H.value,
              segmentCount: H.value
            }, null, 8, ["segmentData", "segmentCount"])) : F("", !0),
            ue.value ? (h(), x("div", pg, [
              Z(S(zn), {
                size: "xlarge",
                class: "mt-3"
              }),
              A[17] || (A[17] = f("p", { class: "mt-3" }, "Running query...", -1))
            ])) : F("", !0),
            Ge.value === "saving" || Ge.value === "generating" ? (h(), x("div", hg, [
              Z(S(zn), {
                size: "xlarge",
                class: "mt-3"
              }),
              Ge.value === "saving" ? (h(), x("p", mg, "Saving segment...")) : (h(), x("p", gg, "Generating insights..."))
            ])) : F("", !0),
            Ge.value === "done" && B.value ? (h(), de(f2, {
              key: 3,
              selectedSegment: B.value,
              location: "custom",
              onShowInsightsExplorer: T
            }, null, 8, ["selectedSegment"])) : F("", !0)
          ])) : F("", !0)
        ]),
        f("div", xg, [
          f("div", yg, [
            Z(S($t), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: _.value.name,
              "onUpdate:modelValue": A[11] || (A[11] = (U) => _.value.name = U),
              type: "text"
            }, null, 8, ["modelValue"]),
            Z(S($t), {
              class: "segment-name",
              label: "Segment description",
              modelValue: _.value.description,
              "onUpdate:modelValue": A[12] || (A[12] = (U) => _.value.description = U),
              type: "text"
            }, null, 8, ["modelValue"])
          ]),
          f("div", kg, [
            Z(S(ct), {
              type: "secondary",
              label: "Explore",
              size: "small",
              onClick: A[13] || (A[13] = (U) => T()),
              class: "mx-1",
              disabled: !H.value || !_.value.name && G.value.id === 1 || !_.value.name && G.value.id === 2 || _.value.conditions.length <= 0 && G.value.id !== 3 || !Oe.value
            }, null, 8, ["disabled"]),
            Z(S(ct), {
              size: "small",
              label: "Push to destination",
              disabled: !H.value || !_.value.name && G.value.id === 1 || !_.value.name && G.value.id === 2 || _.value.conditions.length <= 0 && G.value.id !== 3,
              onClick: A[14] || (A[14] = (U) => lr())
            }, null, 8, ["disabled"])
          ])
        ])
      ])
    ]));
  }
}, _g = /* @__PURE__ */ He(vg, [["__scopeId", "data-v-6e89a5d6"]]), bg = { class: "tag-section" }, Eg = { class: "rating-card" }, Sg = { class: "header" }, Ag = { class: "title" }, wg = { class: "pb-2" }, Cg = { class: "content-wrapper" }, Tg = { class: "content" }, Dg = { class: "publishers" }, Ig = { class: "publisher-item" }, Lg = { class: "ratings" }, Bg = { class: "rating" }, Fg = {
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
    const L = W([]), a = o, b = Ve(() => a.charts.filter((C) => C.type === "bubble")), m = Ve(() => a.tags);
    return wn(() => {
      L.value = new Array(b.value.length).fill(!1);
    }), (C, D) => (h(), x("div", bg, [
      (h(!0), x(he, null, Ee(m.value, (G, X) => (h(), x("div", {
        class: Ue(["card-wrapper", { "full-width": G.section === "Owned Intelligence" }]),
        key: G.title + X
      }, [
        f("div", Eg, [
          f("div", Sg, [
            f("h2", Ag, [
              f("span", wg, ne(G.title), 1)
            ])
          ]),
          f("div", Cg, [
            f("div", Tg, [
              f("div", Dg, [
                (h(!0), x(he, null, Ee(G.data[0].label, (M, z) => (h(), x("div", { key: M }, [
                  f("div", Ig, ne(M), 1),
                  f("div", Lg, [
                    f("div", Bg, [
                      (h(!0), x(he, null, Ee(Math.floor(parseFloat(G.data[0].score[z])), (Y, H) => (h(), x("span", {
                        key: `filled-${H}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), x(he, null, Ee(5 - Math.floor(parseFloat(G.data[0].score[z])), (Y, H) => (h(), x("span", {
                        key: `empty-${H}`,
                        class: "dot"
                      }))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            D[0] || (D[0] = f("div", { class: "logo-wrapper" }, [
              f("img", {
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
}, m0 = /* @__PURE__ */ He(Fg, [["__scopeId", "data-v-6d44fa3a"]]), $g = { class: "chart-section-title my-3" }, Vg = { class: "chart-section" }, Og = { key: 0 }, Pg = { class: "chart-title" }, Rg = {
  key: 1,
  class: "chart-section-title my-4"
}, Gg = {
  key: 2,
  class: "pb-4"
}, Mg = { class: "chart-title" }, Ug = {
  key: 3,
  class: "chart-section-title my-4"
}, Wg = {
  __name: "ChartCard",
  props: {
    charts: {
      type: Array,
      required: !0
    },
    tags: {
      type: Array,
      required: !0
    },
    paidSocial: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const L = o, a = W([]), b = W([]), m = W(null), C = W(!1), D = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], G = (B, w) => {
      var Be, Ge;
      const I = "area", J = Fa[I] || {}, xe = ((Be = B.data[0]) == null ? void 0 : Be.label) || [], oe = (((Ge = B.data[0]) == null ? void 0 : Ge.score) || []).map((Oe) => Number.isNaN(Number(Oe)) ? Oe : Number(Oe)), ue = [{ name: B.title, data: oe }], q = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], V = xe.map((Oe, nt) => q[Math.floor(nt / (52 / 12))]), $ = [], P = /* @__PURE__ */ new Set();
      V.forEach((Oe) => {
        P.has(Oe) ? $.push("") : ($.push(Oe), P.add(Oe));
      });
      const ke = {
        xaxis: {
          categories: $,
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
        colors: [D[w % D.length]],
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
          custom: ({ series: Oe, seriesIndex: nt, dataPointIndex: Pt, w: un }) => {
            const cn = un.globals.labels[Pt], Ct = Oe[nt][Pt];
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
                            <span style="font-weight: 600;">${Ct}</span>
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
        section: B.section,
        chartType: I,
        title: B.title,
        series: ue,
        options: {
          ...J,
          ...ke,
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
    }, X = (B) => {
      if (!B)
        return "bar";
      const w = B.toString().toLowerCase().trim();
      return (w.includes("vertical") || w.includes("verical")) && (w.includes("bar") || w.includes("bars") || w.includes("chart")) || w === "horizontal" ? "bar" : w === "donut" ? "donut" : w === "pie" ? "pie" : w === "radar" ? "radar" : w === "line" ? "line" : w === "area" ? "area" : w;
    }, M = Ve(() => L.charts.filter((B) => B.data && B.data.length > 0).map((B, w) => {
      var V, $;
      const I = X(b0[B.type] || B.type), J = Fa[I] || {}, xe = ((V = B.data[0]) == null ? void 0 : V.label) || [], oe = ((($ = B.data[0]) == null ? void 0 : $.score) || []).map((P) => Number.isNaN(Number(P)) ? P : Number(P));
      let ue = [], q = {};
      if (I === "horizontal")
        ue = [{ name: B.title, data: oe }], q = {
          labels: xe,
          colors: [D[w % D.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (I === "bar" || I === "vertical bar" || I === "vertical bars" || I === "Vertical bars" || I === "vertical chart")
        B.title === "Digital Media Consumption Index Hourly" ? (ue = [{ name: "Indexed Consumption", data: oe }], q = {
          xaxis: {
            categories: xe,
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
              formatter: (P) => `${P}:00`
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
          colors: [D[w % D.length]],
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
            custom: ({ series: P, seriesIndex: ke, dataPointIndex: Be, w: Ge }) => {
              const Oe = Ge.globals.labels[Be], nt = P[ke][Be];
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
                            Hour ${Oe}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption: </span>
                            <span style="font-weight: 600;">${nt}</span>
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
        }) : (B.title === "Personality archetype" && console.log(oe), ue = [{ name: B.title, data: oe }], q = {
          labels: xe,
          colors: [D[w % D.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (I === "line" || I === "area")
          return G(B, w);
        I === "radar" ? (ue = [{ name: B.title, data: oe }], q = { labels: xe }) : (I === "donut" || I === "pie") && (ue = oe, q = { labels: xe });
      }
      return {
        section: B.section,
        chartType: I,
        title: B.title,
        series: ue,
        options: {
          ...J,
          ...q,
          chart: { type: I }
        }
      };
    }));
    wn(() => {
      a.value = new Array(M.value.length).fill(!1), m.value && f0(
        m,
        ([B], w) => {
          B.isIntersecting && (C.value = !0, w.disconnect());
        },
        { threshold: 0.1 }
      );
    });
    const z = (B, w) => {
      if (!B || a.value[w])
        return;
      b.value[w] = B;
      const { stop: I } = f0(
        B,
        ([J]) => {
          J.isIntersecting && (a.value[w] = !0, I());
        },
        { threshold: 0.1 }
      );
    }, Y = () => {
      const B = M.value.length;
      return B === 1 ? "full-width" : B === 2 ? "half-width" : "third-width";
    }, H = Ve(() => {
      const { paidSocial: B } = L, w = B.data.map((I) => I.name);
      return {
        chartType: "bar",
        title: B.title,
        section: B.section,
        description: B.description,
        series: [
          {
            name: "Audience",
            data: B.data.map((I) => Number(I.x))
          },
          {
            name: "Population",
            data: B.data.map((I) => Number(I.y))
          }
        ],
        options: {
          chart: {
            type: "bar",
            height: 400,
            toolbar: {
              show: !1
            }
          },
          plotOptions: {
            bar: {
              horizontal: !1,
              columnWidth: "50%"
              // Adjust this for spacing
            }
          },
          dataLabels: {
            enabled: !0,
            style: {
              fontSize: "12px",
              colors: ["#333"]
            }
          },
          legend: {
            show: !0,
            position: "top",
            horizontalAlign: "left",
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
            categories: w,
            labels: {
              style: {
                fontSize: "12px",
                fontFamily: "Inter",
                colors: "#777"
              }
            }
          },
          yaxis: {
            title: {
              text: "%"
            }
          },
          colors: ["#0A2FFF", "#D9DCDE"]
        }
      };
    });
    return (B, w) => (h(), x("div", null, [
      f("h5", $g, ne(M.value[0].section.charAt(0).toUpperCase() + M.value[0].section.slice(1)), 1),
      f("div", Vg, [
        (h(!0), x(he, null, Ee(M.value, (I, J) => (h(), x("div", {
          key: I.title + J,
          ref_for: !0,
          ref: (xe) => z(xe, J),
          class: Ue(["chart-wrapper", Y()])
        }, [
          a.value[J] ? (h(), x("div", Og, [
            f("div", Pg, ne(I.title), 1),
            Z(S(La), {
              options: I.options,
              series: I.series,
              type: I.chartType,
              width: "100%",
              height: I.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : F("", !0)
        ], 2))), 128))
      ]),
      M.value[0].section === "Paid Intelligence" ? (h(), de(m0, {
        key: 0,
        tags: o.tags.slice(0, 2)
      }, null, 8, ["tags"])) : F("", !0),
      M.value[0].section === "Paid Intelligence" ? (h(), x("h5", Rg, ne(o.paidSocial.section), 1)) : F("", !0),
      M.value[0].section === "Paid Intelligence" ? (h(), x("div", Gg, [
        f("div", {
          ref_key: "paidSocialEl",
          ref: m,
          class: Ue(["chart-wrapper", { "full-width": !0 }])
        }, [
          f("div", Mg, ne(o.paidSocial.title), 1),
          C.value ? (h(), de(S(La), {
            key: 0,
            options: H.value.options,
            series: H.value.series,
            type: "bar",
            width: "100%",
            height: "500"
          }, null, 8, ["options", "series"])) : F("", !0)
        ], 512)
      ])) : F("", !0),
      o.tags[2].section === "Owned Intelligence" && M.value[0].section === "Paid Intelligence" ? (h(), x("h5", Ug, ne(o.tags[2].section), 1)) : F("", !0),
      o.tags[2].section === "Owned Intelligence" && M.value[0].section === "Paid Intelligence" ? (h(), de(m0, {
        key: 4,
        tags: o.tags.slice(2)
      }, null, 8, ["tags"])) : F("", !0)
    ]));
  }
}, Ng = /* @__PURE__ */ He(Wg, [["__scopeId", "data-v-c3b14e25"]]), qg = "5.12.1", zg = 25, Hg = 0, Qg = 100, Kg = 450, Yg = 450, Zg = "*Final5", Jg = 0, Xg = [], jg = [
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
], e3 = [], t3 = {}, n3 = {
  v: qg,
  fr: zg,
  ip: Hg,
  op: Qg,
  w: Kg,
  h: Yg,
  nm: Zg,
  ddd: Jg,
  assets: Xg,
  layers: jg,
  markers: e3,
  props: t3
}, i3 = {
  key: 0,
  class: "explore-insights-loader"
}, r3 = {
  key: 1,
  class: "explore-insights-wrapper"
}, a3 = { class: "explore-insights" }, s3 = { class: "explore-insights-subtitle" }, l3 = { class: "d-flex flex-column" }, o3 = { class: "mb-2" }, u3 = { class: "pd-segment-title-details" }, c3 = { class: "pd-segment-title-details" }, d3 = { key: 0 }, f3 = { class: "thumbnail-card" }, p3 = { class: "thumbnail-segment-cards" }, h3 = { class: "segment-card-row" }, m3 = {
  __name: "ExploreInsights",
  emits: ["apiError"],
  setup(o, { emit: L }) {
    const a = L, b = on(), m = b.get_selectedSegment, C = W(null), D = Ve(() => C.value || {}), G = W(), X = W([]), M = W(!0), z = W([]);
    wn(async () => {
      var B, w, I, J, xe;
      if (m != null && m.segmentId)
        try {
          M.value = !0;
          const fe = await ci.get(
            `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${m != null && m.segmentId ? m == null ? void 0 : m.segmentId : (B = on.get_selectedSegment) == null ? void 0 : B.segmentId}`,
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
          (w = fe == null ? void 0 : fe.data) != null && w.data || a("apiError", {
            error: "Empty response",
            headline: "Error",
            message: "Sorry, an error occurred while getting your insights."
          }), C.value = (J = (I = fe.data) == null ? void 0 : I.data) == null ? void 0 : J[0];
          const oe = C.value.charts.reduce((ue, q, V, $) => (V < 2 ? (ue[0] || (ue[0] = []), ue[0].push(q)) : V < 5 ? (ue[1] || (ue[1] = []), ue[1].push(q)) : (ue[2] || (ue[2] = []), ue[2].push(q)), ue), []);
          X.value = C.value.segments[0], z.value = Object.values(oe), await ch(3e3), M.value = !1;
        } catch (fe) {
          M.value = !1;
          const oe = {
            error: fe,
            headline: "Error",
            message: ((xe = fe == null ? void 0 : fe.response) == null ? void 0 : xe.data) || "Sorry, an error occurred while getting your insights."
          };
          a(oe);
        }
    }), Ve(() => {
      var B, w, I;
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
          categories: ((w = (B = m.thumbnail) == null ? void 0 : B.graph) == null ? void 0 : w.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((I = m.thumbnail) == null ? void 0 : I.title) || "",
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
    }), Ve(() => {
      var B, w, I;
      return ((I = (w = (B = m.thumbnail) == null ? void 0 : B.graph) == null ? void 0 : w.seriesCombined) == null ? void 0 : I.map((J) => ({
        name: J.name,
        data: J.data.map(Number)
      }))) || [];
    });
    const Y = Ve(() => {
      var B, w, I, J;
      return ((J = (I = (w = (B = m.thumbnail) == null ? void 0 : B.segments) == null ? void 0 : w[0]) == null ? void 0 : I.segments) == null ? void 0 : J.slice(0, 4)) || [];
    });
    Ve(() => Y.value.map((I) => parseFloat(I.affinityScore || "0")).reduce((I, J) => I + J, 0).toFixed(2)), Ve(() => Y.value.map((w) => parseInt(w.reach || "0", 10)).reduce((w, I) => w + I, 0).toLocaleString());
    function H(B) {
      return B == null ? "" : (typeof B == "string" ? parseInt(B, 10) : B).toLocaleString();
    }
    return (B, w) => {
      var I, J, xe;
      return h(), x(he, null, [
        M.value ? (h(), x("div", i3, [
          Z(S(uh), {
            height: "40vh",
            ref_key: "anim",
            ref: G,
            "animation-data": S(n3),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          w[0] || (w[0] = f("h6", null, [
            tt("Generating Open Intelligence Insights"),
            f("span", { class: "dot-animate" }, [
              f("span", null, "."),
              f("span", null, "."),
              f("span", null, ".")
            ])
          ], -1))
        ])) : F("", !0),
        M.value ? F("", !0) : (h(), x("div", r3, [
          f("div", a3, [
            f("h6", s3, [
              f("div", l3, [
                f("div", o3, [
                  w[1] || (w[1] = f("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  tt(ne(((I = S(m)) == null ? void 0 : I.name) || "Segment Overview"), 1)
                ]),
                f("div", u3, [
                  w[2] || (w[2] = f("strong", null, "Count:", -1)),
                  tt(" " + ne(H((J = S(m)) == null ? void 0 : J.count)), 1)
                ]),
                f("div", c3, [
                  w[3] || (w[3] = f("strong", null, "Description:", -1)),
                  tt(" " + ne((xe = S(m)) == null ? void 0 : xe.description), 1)
                ])
              ]),
              w[4] || (w[4] = f("span", { class: "logo-wrapper" }, [
                f("span", null, "Enrichment Source:"),
                f("img", {
                  src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                  alt: "logo",
                  width: "120"
                })
              ], -1))
            ]),
            C.value ? (h(), x("div", d3, [
              f("div", f3, [
                f("div", p3, [
                  f("div", h3, [
                    (h(), de(s2, {
                      key: B.index,
                      "segment-data": X.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ])) : F("", !0),
            C.value ? (h(!0), x(he, { key: 1 }, Ee(z.value, (fe, oe) => {
              var ue;
              return h(), x("div", {
                class: "charts-outer-wrapper",
                key: ((ue = fe == null ? void 0 : fe[0]) == null ? void 0 : ue.section) + oe
              }, [
                fe ? (h(), de(Ng, {
                  key: 0,
                  charts: fe || [],
                  tags: D.value.tags || [],
                  paidSocial: C.value.paidSocial
                }, null, 8, ["charts", "tags", "paidSocial"])) : F("", !0)
              ]);
            }), 128)) : F("", !0)
          ])
        ]))
      ], 64);
    };
  }
}, g3 = /* @__PURE__ */ He(m3, [["__scopeId", "data-v-048fede1"]]), x3 = { key: 0 }, y3 = { key: 1 }, k3 = {
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
  setup(o, { emit: L }) {
    const a = L, b = on(), m = ar(), C = o, D = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], G = W("standard"), X = W(D[0]), M = W(!1), z = W(null);
    function Y(I) {
      z.value = I, M.value = !0;
    }
    function H() {
      a("close");
    }
    function B(I) {
      a("insertSegment", I);
    }
    function w() {
      M.value = !1;
    }
    return wn(() => {
      b.set_brandId(C.brandId), b.set_token(C.token), b.set_tenantId(C.tenantId), b.set_baseUrl(C.baseUrl), m.set_customSegmentUrl(C.customSegmentUrl), G.value = b.get_activeTab;
    }), (I, J) => (h(), de(S(y0), {
      onClose: H,
      size: "large"
    }, {
      header: Vt(() => [
        M.value ? F("", !0) : (h(), x("div", x3, [
          J[1] || (J[1] = f("div", { class: "header" }, [
            f("h4", null, "Segment Manager")
          ], -1)),
          Z(S(lh), {
            tabs: D,
            modelValue: X.value,
            "onUpdate:modelValue": J[0] || (J[0] = (xe) => X.value = xe),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        M.value ? (h(), x("div", y3, [
          f("div", {
            onClick: w,
            class: "navigation"
          }, [
            Z(S(Ot), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            J[2] || (J[2] = f("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          J[3] || (J[3] = f("div", { class: "discovery-header" }, [
            f("div", { class: "discovery-header-title" }, [
              f("h6", null, "Segment Manager"),
              f("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ])
          ], -1))
        ])) : F("", !0)
      ]),
      body: Vt(() => [
        X.value.id === 1 && !M.value ? (h(), de(gm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: B,
          onShowInsightsExplorer: Y,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: z.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : F("", !0),
        X.value.id === 2 && !M.value ? (h(), de(_g, {
          key: 1,
          onInsertSegment: B,
          onShowInsightsExplorer: Y,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : F("", !0),
        M.value ? (h(), de(g3, { key: 2 })) : F("", !0)
      ]),
      _: 1
    }));
  }
}, I3 = /* @__PURE__ */ He(k3, [["__scopeId", "data-v-fbea26e6"]]);
export {
  I3 as BetaSegmentManagerModal,
  _g as CustomSegments,
  g3 as ExploreInsights,
  gm as StandardSegments,
  ar as useCustomSegmentStore,
  on as useSegmentManagerStore
};
