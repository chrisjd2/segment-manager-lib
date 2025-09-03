import { ref as U, computed as Ve, watch as ln, createElementBlock as y, openBlock as h, normalizeClass as Ue, createElementVNode as f, createCommentVNode as B, normalizeStyle as An, createBlock as ue, unref as w, Fragment as me, renderList as Se, createTextVNode as nt, toDisplayString as ne, withKeys as $a, renderSlot as ir, createVNode as Y, onMounted as Tn, onUnmounted as ah, resolveComponent as g0, withCtx as Ot, withModifiers as sh, nextTick as c0 } from "vue";
import { CataUiInputCheckbox as wn, CataUiIcon as Pt, CataUiStatusLabel as lh, CataUiInputDate as x0, CataUiInputSelect as $t, CataUiInput as Vt, CataUiButton as dt, CataUiTooltip as d0, CataUiModal as y0, CataUiTabs as Ia, CataUiSpinner as zn, CataUiTabSwitch as oh } from "@catalyst/ui-library";
import { defineStore as k0 } from "pinia";
import ci from "axios";
import Cn from "dayjs";
import { CataCoreUiChart as La } from "@catalyst-core/ui-library";
import { v4 as Ca } from "uuid";
import { Container as Ba, Draggable as uh } from "vue3-smooth-dnd";
import { LottieAnimation as ch } from "lottie-web-vue";
import { useIntersectionObserver as f0, promiseTimeout as dh } from "@vueuse/core";
const fh = {
  async fetch_database_model(o, L) {
    try {
      const a = await xh(o, L);
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
      const a = await yh(o);
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
      return (await vh(o, L)).data;
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
      return (await kh(o, L)).count;
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
}, ph = {
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
  actions: fh,
  getters: ph
}), Dn = "", sr = ci.create(), di = ci.create();
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
const hh = () => ci.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), v0 = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, p0 = (o, L) => sr.get(`${Dn}/api/v1/segments/${L ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), mh = (o) => sr.get(`${Dn}/api/v1/insights/${o}`, { params: queryParams }).then((L) => L.data).catch((L) => {
  throw L;
}), gh = () => sr.get(`${Dn}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), xh = (o, L) => di.get(`${Dn}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), yh = () => di.get(`${Dn}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), kh = (o, L) => di.post(`${Dn}/api/v1/query/${L}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), vh = (o, L) => di.post(`${Dn}/api/v1/query/gen/${L}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), _h = {
  async fetch_appSettings() {
    try {
      const o = await hh();
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
      return await mh(this.brandId, this.tenantId);
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
      const a = await gh(o);
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
}, bh = {
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
    baseUrl: "https://sm-standard-segments-838902823068.europe-west1.run.app",
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
  actions: _h,
  getters: bh
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
}), Qe = (o, L) => {
  const a = o.__vccOpts || o;
  for (const [b, m] of L)
    a[b] = m;
  return a;
}, Eh = ["onClick"], Sh = { key: 0 }, Ah = ["onClick"], wh = { class: "text-center" }, Ch = ["title"], Th = ["title"], Dh = ["onClick"], Ih = {
  key: 0,
  class: "checkbox-container"
}, Lh = ["onKeydown", "onClick"], Bh = ["src"], Fh = {
  key: 4,
  class: "d-flex justify-content-end pr-45"
}, $h = ["title"], Vh = {
  key: 0,
  class: "no-matches"
}, Oh = {
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
    const a = L, b = o, m = U(null), C = U(!1), S = U(1), V = U([]), J = U(null), G = U(!1), z = U({}), K = Ve(
      {
        get() {
          return b.checkedRows;
        },
        set(q) {
          V.value = q;
        }
      }
    ), H = Ve(() => b.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${b.stickyHeader}px;` : "");
    function I() {
      b.expandable && b.rows.length > 0 && (G.value = !G.value, G.value === !1 && (z.value = {}));
    }
    function T(q) {
      return b.expandable && q.details.length === 1;
    }
    function D(q) {
      z[q] ? z[q] = !z[q] : this.$set(z, q, !0);
    }
    function Z(q) {
      J.value = q;
    }
    function xe(q, $, F) {
      F.key !== "actions" && F.type !== "link" && $.showInAction !== !1 && a("rowClicked", { event: q, row: $ });
    }
    function pe(q) {
      b.sortable && q.key !== "actions" && q.type !== "link" && (m.value === q.key ? S.value *= -1 : (m.value = q.key, S.value = 1), a("columnSorted", { sortColumn: m.value, sortOrder: S }));
    }
    function ce(q, $) {
      let F = "";
      if (typeof q == "object" ? F = q.value : F = q, $ === "datetime") {
        const P = Cn(new Date(F));
        return Cn(P).format("DD MMM YYYY");
      }
      if ($ === "datetimehour") {
        const P = Cn(new Date(F));
        return Cn(P).format("DD MMM YYYY, HH:mm");
      }
      return $ === "number" || (typeof F == "number" || typeof F == "string" && !Number.isNaN(Number(F))) && String(F).trim() !== "" ? (typeof F == "string" ? Number(F) : F).toLocaleString() : F;
    }
    function de(q) {
      return q == null ? "" : (typeof q == "string" ? parseInt(q, 10) : q).toLocaleString();
    }
    return ln(C, (q) => {
      q === "true" || q === !0 ? b.rows.forEach(($) => {
        !V.value.includes($.id) && $.showInAction !== !1 && V.value.push($.id);
      }) : V.value = [], a("rowChecked", V.value);
    }), (q, $) => (h(), y("div", {
      class: Ue(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      f("table", {
        class: Ue(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        f("thead", null, [
          f("tr", {
            onClick: $[1] || ($[1] = (F) => I())
          }, [
            !o.collapseControls && !o.expandable ? (h(), y("th", {
              key: 0,
              class: "checkbox-container",
              style: An(H.value)
            }, [
              o.selectable ? (h(), ue(w(wn), {
                key: 0,
                modelValue: C.value,
                "onUpdate:modelValue": $[0] || ($[0] = (F) => C.value = F)
              }, null, 8, ["modelValue"])) : B("", !0)
            ], 4)) : B("", !0),
            o.expandable ? (h(), y("th", {
              key: 1,
              class: Ue(["text-center", {
                expandable: o.expandable
              }]),
              style: An(H.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), ue(w(Pt), {
                key: 0,
                class: "expand-icon",
                icon: G.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: G.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : B("", !0)
            ], 6)) : B("", !0),
            (h(!0), y(me, null, Se(o.columns, (F) => (h(), y("th", {
              style: An(H.value),
              key: F.id,
              onClick: (P) => pe(F),
              class: Ue({
                actions: F.key === "actions",
                active: m.value === F.key,
                sortable: o.sortable && F.key !== "actions" && F.type != "link",
                expandable: o.expandable
              })
            }, [
              F.key !== "actions" && F.type != "link" ? (h(), y(me, { key: 0 }, [
                nt(ne(F.value) + " ", 1),
                o.sortable ? (h(), ue(w(Pt), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : B("", !0)
              ], 64)) : B("", !0)
            ], 14, Eh))), 128))
          ])
        ]),
        o.rows ? (h(), y("tbody", Sh, [
          (h(!0), y(me, null, Se(o.rows, (F) => (h(), y(me, null, [
            (h(!0), y(me, null, Se(F.details, (P) => (h(), y(me, null, [
              o.expandable & G.value || T(F) ? (h(), y("tr", {
                class: Ue({ expandable: o.expandable && P.details.length === 1 }),
                key: P.id,
                onClick: (ke) => D(P.id)
              }, [
                f("td", wh, [
                  P.details.length > 1 ? (h(), ue(w(Pt), {
                    key: 0,
                    class: "expand-icon",
                    icon: z.value[P.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: z.value[P.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : B("", !0)
                ]),
                (h(!0), y(me, null, Se(o.columns, (ke) => (h(), y("td", {
                  style: An({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[ke.key] ? `${o.minWidthCell[ke.key]}px` : "0px"
                  }),
                  key: ke.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ce(P[ke.key].value || P[ke.key], ke.type)
                    }, ne(ce(P[ke.key], ke.type)), 9, Ch)
                  ])
                ], 4))), 128))
              ], 10, Ah)) : B("", !0),
              P.details.length > 1 && z.value[P.id] ? (h(!0), y(me, { key: 1 }, Se(P.details, (ke) => (h(), y("tr", {
                class: "subrow-details",
                key: ke.id
              }, [
                $[4] || ($[4] = f("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), y(me, null, Se(o.columns, (Be) => (h(), y("td", {
                  style: An({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Be.key] ? `${o.minWidthCell[Be.key]}px` : "0px"
                  }),
                  key: Be.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ce(ke[Be.key], Be.type)
                    }, ne(ce(ke[Be.key], Be.type)), 9, Th)
                  ])
                ], 4))), 128))
              ]))), 128)) : B("", !0)
            ], 64))), 256)),
            (o.expandable && F.details.length) > 1 || o.expandable && F.details[0].details.length > 1 || !o.expandable ? (h(), y("tr", {
              class: Ue({
                active: K.value.includes(F.id),
                static: F.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: J.value === F._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: F.id,
              onClick: (P) => Z(F._id)
            }, [
              o.collapseControls ? B("", !0) : (h(), y("td", Ih, [
                o.selectable && F.showInAction !== !1 ? (h(), ue(w(wn), {
                  key: 0,
                  modelValue: K.value,
                  "onUpdate:modelValue": $[2] || ($[2] = (P) => K.value = P),
                  val: F.id,
                  onInput: $[3] || ($[3] = (P) => q.$emit(w(ui).ROW_CHECKED, V.value))
                }, null, 8, ["modelValue", "val"])) : B("", !0)
              ])),
              (h(!0), y(me, null, Se(o.columns, (P) => (h(), y("td", {
                class: Ue({
                  actions: P.key === "actions",
                  fixedActions: o.fixedActions && P.key === "actions"
                }),
                style: An({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[P.key] ? `${o.minWidthCell[P.key]}px` : "0px"
                }),
                key: P.key,
                onKeydown: $a((ke) => xe(ke, F, P), ["enter"]),
                onClick: (ke) => xe(ke, F, P)
              }, [
                F[P.key] !== void 0 && F[P.key] !== null && P.key !== "actions" ? (h(), y(me, { key: 0 }, [
                  F[P.key].icon ? (h(), y("img", {
                    key: 0,
                    alt: "",
                    src: F[P.key].icon,
                    class: Ue(P.key)
                  }, null, 10, Bh)) : F[P.key].biicon ? (h(), y("span", {
                    key: 1,
                    class: Ue(["table-bi-icon", F[P.key].biicon]),
                    style: An({ color: F[P.key].color })
                  }, null, 6)) : B("", !0),
                  F[P.key].type ? (h(), ue(w(lh), {
                    key: 2,
                    "font-size": 12,
                    label: F[P.key].value,
                    color: F[P.key].color
                  }, null, 8, ["label", "color"])) : P.type === "link" ? ir(q.$slots, "linkHandler", {
                    key: 3,
                    link: { row: F, columnKey: P.key }
                  }, void 0, !0) : P.type === "number" ? (h(), y("span", Fh, ne(de(F[P.key])), 1)) : (h(), y("span", {
                    key: 5,
                    title: ce(F[P.key].value || F[P.key], P.type)
                  }, ne(ce(F[P.key], P.type)), 9, $h))
                ], 64)) : B("", !0),
                P.key === "actions" ? ir(q.$slots, "actionButton", {
                  key: 1,
                  row: F
                }, void 0, !0) : B("", !0)
              ], 46, Lh))), 128))
            ], 10, Dh)) : B("", !0)
          ], 64))), 256))
        ])) : B("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), y("p", Vh, " No matches found ")) : B("", !0)
    ], 2));
  }
}, Ph = /* @__PURE__ */ Qe(Oh, [["__scopeId", "data-v-b2e5eec6"]]);
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
    var a, b = "4.17.21", m = 200, C = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", S = "Expected a function", V = "Invalid `variable` option passed into `_.template`", J = "__lodash_hash_undefined__", G = 500, z = "__lodash_placeholder__", K = 1, H = 2, I = 4, T = 1, D = 2, Z = 1, xe = 2, pe = 4, ce = 8, de = 16, q = 32, $ = 64, F = 128, P = 256, ke = 512, Be = 30, Ge = "...", Oe = 800, it = 16, _t = 1, un = 2, cn = 3, Tt = 1 / 0, Dt = 9007199254740991, Hn = 17976931348623157e292, M = NaN, x = 4294967295, re = x - 1, bt = x >>> 1, It = [
      ["ary", F],
      ["bind", Z],
      ["bindKey", xe],
      ["curry", ce],
      ["curryRight", de],
      ["flip", ke],
      ["partial", q],
      ["partialRight", $],
      ["rearg", P]
    ], Et = "[object Arguments]", Rt = "[object Array]", De = "[object AsyncFunction]", dn = "[object Boolean]", Kt = "[object Date]", fi = "[object DOMException]", fn = "[object Error]", In = "[object Function]", pi = "[object GeneratorFunction]", qe = "[object Map]", pn = "[object Number]", lr = "[object Null]", ft = "[object Object]", hi = "[object Promise]", or = "[object Proxy]", hn = "[object RegExp]", rt = "[object Set]", X = "[object String]", A = "[object Symbol]", W = "[object Undefined]", be = "[object WeakMap]", O = "[object WeakSet]", le = "[object ArrayBuffer]", Ke = "[object DataView]", Yt = "[object Float32Array]", Zt = "[object Float64Array]", mn = "[object Int8Array]", ur = "[object Int16Array]", cr = "[object Int32Array]", dr = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", pr = "[object Uint16Array]", hr = "[object Uint32Array]", S0 = /\b__p \+= '';/g, A0 = /\b(__p \+=) '' \+/g, w0 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Va = /&(?:amp|lt|gt|quot|#39);/g, Oa = /[&<>"']/g, C0 = RegExp(Va.source), T0 = RegExp(Oa.source), D0 = /<%-([\s\S]+?)%>/g, I0 = /<%([\s\S]+?)%>/g, Pa = /<%=([\s\S]+?)%>/g, L0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, B0 = /^\w*$/, F0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, $0 = RegExp(mr.source), gr = /^\s+/, V0 = /\s/, O0 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, P0 = /\{\n\/\* \[wrapped with (.+)\] \*/, R0 = /,? & /, G0 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, M0 = /[()=,{}\[\]\/\s]/, U0 = /\\(\\)?/g, W0 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ra = /\w*$/, N0 = /^[-+]0x[0-9a-f]+$/i, q0 = /^0b[01]+$/i, z0 = /^\[object .+?Constructor\]$/, H0 = /^0o[0-7]+$/i, Q0 = /^(?:0|[1-9]\d*)$/, K0 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, mi = /($^)/, Y0 = /['\n\r\u2028\u2029\\]/g, gi = "\\ud800-\\udfff", Z0 = "\\u0300-\\u036f", J0 = "\\ufe20-\\ufe2f", X0 = "\\u20d0-\\u20ff", Ga = Z0 + J0 + X0, Ma = "\\u2700-\\u27bf", Ua = "a-z\\xdf-\\xf6\\xf8-\\xff", j0 = "\\xac\\xb1\\xd7\\xf7", eo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", to = "\\u2000-\\u206f", no = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Wa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Na = "\\ufe0e\\ufe0f", qa = j0 + eo + to + no, xr = "['’]", io = "[" + gi + "]", za = "[" + qa + "]", xi = "[" + Ga + "]", Ha = "\\d+", ro = "[" + Ma + "]", Qa = "[" + Ua + "]", Ka = "[^" + gi + qa + Ha + Ma + Ua + Wa + "]", yr = "\\ud83c[\\udffb-\\udfff]", ao = "(?:" + xi + "|" + yr + ")", Ya = "[^" + gi + "]", kr = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ln = "[" + Wa + "]", Za = "\\u200d", Ja = "(?:" + Qa + "|" + Ka + ")", so = "(?:" + Ln + "|" + Ka + ")", Xa = "(?:" + xr + "(?:d|ll|m|re|s|t|ve))?", ja = "(?:" + xr + "(?:D|LL|M|RE|S|T|VE))?", es = ao + "?", ts = "[" + Na + "]?", lo = "(?:" + Za + "(?:" + [Ya, kr, vr].join("|") + ")" + ts + es + ")*", oo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", uo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ns = ts + es + lo, co = "(?:" + [ro, kr, vr].join("|") + ")" + ns, fo = "(?:" + [Ya + xi + "?", xi, kr, vr, io].join("|") + ")", po = RegExp(xr, "g"), ho = RegExp(xi, "g"), _r = RegExp(yr + "(?=" + yr + ")|" + fo + ns, "g"), mo = RegExp([
      Ln + "?" + Qa + "+" + Xa + "(?=" + [za, Ln, "$"].join("|") + ")",
      so + "+" + ja + "(?=" + [za, Ln + Ja, "$"].join("|") + ")",
      Ln + "?" + Ja + "+" + Xa,
      Ln + "+" + ja,
      uo,
      oo,
      Ha,
      co
    ].join("|"), "g"), go = RegExp("[" + Za + gi + Ga + Na + "]"), xo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, yo = [
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
    ], ko = -1, Ce = {};
    Ce[Yt] = Ce[Zt] = Ce[mn] = Ce[ur] = Ce[cr] = Ce[dr] = Ce[fr] = Ce[pr] = Ce[hr] = !0, Ce[Et] = Ce[Rt] = Ce[le] = Ce[dn] = Ce[Ke] = Ce[Kt] = Ce[fn] = Ce[In] = Ce[qe] = Ce[pn] = Ce[ft] = Ce[hn] = Ce[rt] = Ce[X] = Ce[be] = !1;
    var we = {};
    we[Et] = we[Rt] = we[le] = we[Ke] = we[dn] = we[Kt] = we[Yt] = we[Zt] = we[mn] = we[ur] = we[cr] = we[qe] = we[pn] = we[ft] = we[hn] = we[rt] = we[X] = we[A] = we[dr] = we[fr] = we[pr] = we[hr] = !0, we[fn] = we[In] = we[be] = !1;
    var vo = {
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
    }, _o = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, bo = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Eo = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, So = parseFloat, Ao = parseInt, is = typeof oi == "object" && oi && oi.Object === Object && oi, wo = typeof self == "object" && self && self.Object === Object && self, We = is || wo || Function("return this")(), br = L && !L.nodeType && L, gn = br && !0 && o && !o.nodeType && o, rs = gn && gn.exports === br, Er = rs && is.process, pt = function() {
      try {
        var d = gn && gn.require && gn.require("util").types;
        return d || Er && Er.binding && Er.binding("util");
      } catch {
      }
    }(), as = pt && pt.isArrayBuffer, ss = pt && pt.isDate, ls = pt && pt.isMap, os = pt && pt.isRegExp, us = pt && pt.isSet, cs = pt && pt.isTypedArray;
    function at(d, k, g) {
      switch (g.length) {
        case 0:
          return d.call(k);
        case 1:
          return d.call(k, g[0]);
        case 2:
          return d.call(k, g[0], g[1]);
        case 3:
          return d.call(k, g[0], g[1], g[2]);
      }
      return d.apply(k, g);
    }
    function Co(d, k, g, N) {
      for (var ie = -1, ve = d == null ? 0 : d.length; ++ie < ve; ) {
        var Pe = d[ie];
        k(N, Pe, g(Pe), d);
      }
      return N;
    }
    function ht(d, k) {
      for (var g = -1, N = d == null ? 0 : d.length; ++g < N && k(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function To(d, k) {
      for (var g = d == null ? 0 : d.length; g-- && k(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function ds(d, k) {
      for (var g = -1, N = d == null ? 0 : d.length; ++g < N; )
        if (!k(d[g], g, d))
          return !1;
      return !0;
    }
    function Jt(d, k) {
      for (var g = -1, N = d == null ? 0 : d.length, ie = 0, ve = []; ++g < N; ) {
        var Pe = d[g];
        k(Pe, g, d) && (ve[ie++] = Pe);
      }
      return ve;
    }
    function yi(d, k) {
      var g = d == null ? 0 : d.length;
      return !!g && Bn(d, k, 0) > -1;
    }
    function Sr(d, k, g) {
      for (var N = -1, ie = d == null ? 0 : d.length; ++N < ie; )
        if (g(k, d[N]))
          return !0;
      return !1;
    }
    function Te(d, k) {
      for (var g = -1, N = d == null ? 0 : d.length, ie = Array(N); ++g < N; )
        ie[g] = k(d[g], g, d);
      return ie;
    }
    function Xt(d, k) {
      for (var g = -1, N = k.length, ie = d.length; ++g < N; )
        d[ie + g] = k[g];
      return d;
    }
    function Ar(d, k, g, N) {
      var ie = -1, ve = d == null ? 0 : d.length;
      for (N && ve && (g = d[++ie]); ++ie < ve; )
        g = k(g, d[ie], ie, d);
      return g;
    }
    function Do(d, k, g, N) {
      var ie = d == null ? 0 : d.length;
      for (N && ie && (g = d[--ie]); ie--; )
        g = k(g, d[ie], ie, d);
      return g;
    }
    function wr(d, k) {
      for (var g = -1, N = d == null ? 0 : d.length; ++g < N; )
        if (k(d[g], g, d))
          return !0;
      return !1;
    }
    var Io = Cr("length");
    function Lo(d) {
      return d.split("");
    }
    function Bo(d) {
      return d.match(G0) || [];
    }
    function fs(d, k, g) {
      var N;
      return g(d, function(ie, ve, Pe) {
        if (k(ie, ve, Pe))
          return N = ve, !1;
      }), N;
    }
    function ki(d, k, g, N) {
      for (var ie = d.length, ve = g + (N ? 1 : -1); N ? ve-- : ++ve < ie; )
        if (k(d[ve], ve, d))
          return ve;
      return -1;
    }
    function Bn(d, k, g) {
      return k === k ? qo(d, k, g) : ki(d, ps, g);
    }
    function Fo(d, k, g, N) {
      for (var ie = g - 1, ve = d.length; ++ie < ve; )
        if (N(d[ie], k))
          return ie;
      return -1;
    }
    function ps(d) {
      return d !== d;
    }
    function hs(d, k) {
      var g = d == null ? 0 : d.length;
      return g ? Dr(d, k) / g : M;
    }
    function Cr(d) {
      return function(k) {
        return k == null ? a : k[d];
      };
    }
    function Tr(d) {
      return function(k) {
        return d == null ? a : d[k];
      };
    }
    function ms(d, k, g, N, ie) {
      return ie(d, function(ve, Pe, Ae) {
        g = N ? (N = !1, ve) : k(g, ve, Pe, Ae);
      }), g;
    }
    function $o(d, k) {
      var g = d.length;
      for (d.sort(k); g--; )
        d[g] = d[g].value;
      return d;
    }
    function Dr(d, k) {
      for (var g, N = -1, ie = d.length; ++N < ie; ) {
        var ve = k(d[N]);
        ve !== a && (g = g === a ? ve : g + ve);
      }
      return g;
    }
    function Ir(d, k) {
      for (var g = -1, N = Array(d); ++g < d; )
        N[g] = k(g);
      return N;
    }
    function Vo(d, k) {
      return Te(k, function(g) {
        return [g, d[g]];
      });
    }
    function gs(d) {
      return d && d.slice(0, vs(d) + 1).replace(gr, "");
    }
    function st(d) {
      return function(k) {
        return d(k);
      };
    }
    function Lr(d, k) {
      return Te(k, function(g) {
        return d[g];
      });
    }
    function Qn(d, k) {
      return d.has(k);
    }
    function xs(d, k) {
      for (var g = -1, N = d.length; ++g < N && Bn(k, d[g], 0) > -1; )
        ;
      return g;
    }
    function ys(d, k) {
      for (var g = d.length; g-- && Bn(k, d[g], 0) > -1; )
        ;
      return g;
    }
    function Oo(d, k) {
      for (var g = d.length, N = 0; g--; )
        d[g] === k && ++N;
      return N;
    }
    var Po = Tr(vo), Ro = Tr(_o);
    function Go(d) {
      return "\\" + Eo[d];
    }
    function Mo(d, k) {
      return d == null ? a : d[k];
    }
    function Fn(d) {
      return go.test(d);
    }
    function Uo(d) {
      return xo.test(d);
    }
    function Wo(d) {
      for (var k, g = []; !(k = d.next()).done; )
        g.push(k.value);
      return g;
    }
    function Br(d) {
      var k = -1, g = Array(d.size);
      return d.forEach(function(N, ie) {
        g[++k] = [ie, N];
      }), g;
    }
    function ks(d, k) {
      return function(g) {
        return d(k(g));
      };
    }
    function jt(d, k) {
      for (var g = -1, N = d.length, ie = 0, ve = []; ++g < N; ) {
        var Pe = d[g];
        (Pe === k || Pe === z) && (d[g] = z, ve[ie++] = g);
      }
      return ve;
    }
    function vi(d) {
      var k = -1, g = Array(d.size);
      return d.forEach(function(N) {
        g[++k] = N;
      }), g;
    }
    function No(d) {
      var k = -1, g = Array(d.size);
      return d.forEach(function(N) {
        g[++k] = [N, N];
      }), g;
    }
    function qo(d, k, g) {
      for (var N = g - 1, ie = d.length; ++N < ie; )
        if (d[N] === k)
          return N;
      return -1;
    }
    function zo(d, k, g) {
      for (var N = g + 1; N--; )
        if (d[N] === k)
          return N;
      return N;
    }
    function $n(d) {
      return Fn(d) ? Qo(d) : Io(d);
    }
    function St(d) {
      return Fn(d) ? Ko(d) : Lo(d);
    }
    function vs(d) {
      for (var k = d.length; k-- && V0.test(d.charAt(k)); )
        ;
      return k;
    }
    var Ho = Tr(bo);
    function Qo(d) {
      for (var k = _r.lastIndex = 0; _r.test(d); )
        ++k;
      return k;
    }
    function Ko(d) {
      return d.match(_r) || [];
    }
    function Yo(d) {
      return d.match(mo) || [];
    }
    var Zo = function d(k) {
      k = k == null ? We : Vn.defaults(We.Object(), k, Vn.pick(We, yo));
      var g = k.Array, N = k.Date, ie = k.Error, ve = k.Function, Pe = k.Math, Ae = k.Object, Fr = k.RegExp, Jo = k.String, mt = k.TypeError, _i = g.prototype, Xo = ve.prototype, On = Ae.prototype, bi = k["__core-js_shared__"], Ei = Xo.toString, Ee = On.hasOwnProperty, jo = 0, _s = function() {
        var e = /[^.]+$/.exec(bi && bi.keys && bi.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), Si = On.toString, eu = Ei.call(Ae), tu = We._, nu = Fr(
        "^" + Ei.call(Ee).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ai = rs ? k.Buffer : a, en = k.Symbol, wi = k.Uint8Array, bs = Ai ? Ai.allocUnsafe : a, Ci = ks(Ae.getPrototypeOf, Ae), Es = Ae.create, Ss = On.propertyIsEnumerable, Ti = _i.splice, As = en ? en.isConcatSpreadable : a, Kn = en ? en.iterator : a, xn = en ? en.toStringTag : a, Di = function() {
        try {
          var e = bn(Ae, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), iu = k.clearTimeout !== We.clearTimeout && k.clearTimeout, ru = N && N.now !== We.Date.now && N.now, au = k.setTimeout !== We.setTimeout && k.setTimeout, Ii = Pe.ceil, Li = Pe.floor, $r = Ae.getOwnPropertySymbols, su = Ai ? Ai.isBuffer : a, ws = k.isFinite, lu = _i.join, ou = ks(Ae.keys, Ae), Re = Pe.max, ze = Pe.min, uu = N.now, cu = k.parseInt, Cs = Pe.random, du = _i.reverse, Vr = bn(k, "DataView"), Yn = bn(k, "Map"), Or = bn(k, "Promise"), Pn = bn(k, "Set"), Zn = bn(k, "WeakMap"), Jn = bn(Ae, "create"), Bi = Zn && new Zn(), Rn = {}, fu = En(Vr), pu = En(Yn), hu = En(Or), mu = En(Pn), gu = En(Zn), Fi = en ? en.prototype : a, Xn = Fi ? Fi.valueOf : a, Ts = Fi ? Fi.toString : a;
      function s(e) {
        if (Le(e) && !ae(e) && !(e instanceof ge)) {
          if (e instanceof gt)
            return e;
          if (Ee.call(e, "__wrapped__"))
            return Dl(e);
        }
        return new gt(e);
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
      function gt(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = a;
      }
      s.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: D0,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: I0,
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
      }, s.prototype = $i.prototype, s.prototype.constructor = s, gt.prototype = Gn($i.prototype), gt.prototype.constructor = gt;
      function ge(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = x, this.__views__ = [];
      }
      function xu() {
        var e = new ge(this.__wrapped__);
        return e.__actions__ = Xe(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Xe(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Xe(this.__views__), e;
      }
      function yu() {
        if (this.__filtered__) {
          var e = new ge(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function ku() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = ae(e), i = t < 0, r = n ? e.length : 0, l = L1(0, r, this.__views__), u = l.start, c = l.end, p = c - u, v = i ? c : u - 1, _ = this.__iteratees__, E = _.length, R = 0, Q = ze(p, this.__takeCount__);
        if (!n || !i && r == p && Q == p)
          return Xs(e, this.__actions__);
        var ee = [];
        e:
          for (; p-- && R < Q; ) {
            v += t;
            for (var oe = -1, te = e[v]; ++oe < E; ) {
              var he = _[oe], ye = he.iteratee, ut = he.type, Je = ye(te);
              if (ut == un)
                te = Je;
              else if (!Je) {
                if (ut == _t)
                  continue e;
                break e;
              }
            }
            ee[R++] = te;
          }
        return ee;
      }
      ge.prototype = Gn($i.prototype), ge.prototype.constructor = ge;
      function yn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function vu() {
        this.__data__ = Jn ? Jn(null) : {}, this.size = 0;
      }
      function _u(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function bu(e) {
        var t = this.__data__;
        if (Jn) {
          var n = t[e];
          return n === J ? a : n;
        }
        return Ee.call(t, e) ? t[e] : a;
      }
      function Eu(e) {
        var t = this.__data__;
        return Jn ? t[e] !== a : Ee.call(t, e);
      }
      function Su(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Jn && t === a ? J : t, this;
      }
      yn.prototype.clear = vu, yn.prototype.delete = _u, yn.prototype.get = bu, yn.prototype.has = Eu, yn.prototype.set = Su;
      function Gt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Au() {
        this.__data__ = [], this.size = 0;
      }
      function wu(e) {
        var t = this.__data__, n = Vi(t, e);
        if (n < 0)
          return !1;
        var i = t.length - 1;
        return n == i ? t.pop() : Ti.call(t, n, 1), --this.size, !0;
      }
      function Cu(e) {
        var t = this.__data__, n = Vi(t, e);
        return n < 0 ? a : t[n][1];
      }
      function Tu(e) {
        return Vi(this.__data__, e) > -1;
      }
      function Du(e, t) {
        var n = this.__data__, i = Vi(n, e);
        return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
      }
      Gt.prototype.clear = Au, Gt.prototype.delete = wu, Gt.prototype.get = Cu, Gt.prototype.has = Tu, Gt.prototype.set = Du;
      function Mt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Iu() {
        this.size = 0, this.__data__ = {
          hash: new yn(),
          map: new (Yn || Gt)(),
          string: new yn()
        };
      }
      function Lu(e) {
        var t = Qi(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Bu(e) {
        return Qi(this, e).get(e);
      }
      function Fu(e) {
        return Qi(this, e).has(e);
      }
      function $u(e, t) {
        var n = Qi(this, e), i = n.size;
        return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
      }
      Mt.prototype.clear = Iu, Mt.prototype.delete = Lu, Mt.prototype.get = Bu, Mt.prototype.has = Fu, Mt.prototype.set = $u;
      function kn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Mt(); ++t < n; )
          this.add(e[t]);
      }
      function Vu(e) {
        return this.__data__.set(e, J), this;
      }
      function Ou(e) {
        return this.__data__.has(e);
      }
      kn.prototype.add = kn.prototype.push = Vu, kn.prototype.has = Ou;
      function At(e) {
        var t = this.__data__ = new Gt(e);
        this.size = t.size;
      }
      function Pu() {
        this.__data__ = new Gt(), this.size = 0;
      }
      function Ru(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function Gu(e) {
        return this.__data__.get(e);
      }
      function Mu(e) {
        return this.__data__.has(e);
      }
      function Uu(e, t) {
        var n = this.__data__;
        if (n instanceof Gt) {
          var i = n.__data__;
          if (!Yn || i.length < m - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Mt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      At.prototype.clear = Pu, At.prototype.delete = Ru, At.prototype.get = Gu, At.prototype.has = Mu, At.prototype.set = Uu;
      function Ds(e, t) {
        var n = ae(e), i = !n && Sn(e), r = !n && !i && sn(e), l = !n && !i && !r && Nn(e), u = n || i || r || l, c = u ? Ir(e.length, Jo) : [], p = c.length;
        for (var v in e)
          (t || Ee.call(e, v)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
          qt(v, p))) && c.push(v);
        return c;
      }
      function Is(e) {
        var t = e.length;
        return t ? e[Qr(0, t - 1)] : a;
      }
      function Wu(e, t) {
        return Ki(Xe(e), vn(t, 0, e.length));
      }
      function Nu(e) {
        return Ki(Xe(e));
      }
      function Pr(e, t, n) {
        (n !== a && !wt(e[t], n) || n === a && !(t in e)) && Ut(e, t, n);
      }
      function jn(e, t, n) {
        var i = e[t];
        (!(Ee.call(e, t) && wt(i, n)) || n === a && !(t in e)) && Ut(e, t, n);
      }
      function Vi(e, t) {
        for (var n = e.length; n--; )
          if (wt(e[n][0], t))
            return n;
        return -1;
      }
      function qu(e, t, n, i) {
        return tn(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ls(e, t) {
        return e && Bt(t, Me(t), e);
      }
      function zu(e, t) {
        return e && Bt(t, et(t), e);
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
      function vn(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function xt(e, t, n, i, r, l) {
        var u, c = t & K, p = t & H, v = t & I;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!Ie(e))
          return e;
        var _ = ae(e);
        if (_) {
          if (u = F1(e), !c)
            return Xe(e, u);
        } else {
          var E = He(e), R = E == In || E == pi;
          if (sn(e))
            return tl(e, c);
          if (E == ft || E == Et || R && !r) {
            if (u = p || R ? {} : vl(e), !c)
              return p ? b1(e, zu(u, e)) : _1(e, Ls(u, e));
          } else {
            if (!we[E])
              return r ? e : {};
            u = $1(e, E, c);
          }
        }
        l || (l = new At());
        var Q = l.get(e);
        if (Q)
          return Q;
        l.set(e, u), Yl(e) ? e.forEach(function(te) {
          u.add(xt(te, t, n, te, e, l));
        }) : Ql(e) && e.forEach(function(te, he) {
          u.set(he, xt(te, t, n, he, e, l));
        });
        var ee = v ? p ? ra : ia : p ? et : Me, oe = _ ? a : ee(e);
        return ht(oe || e, function(te, he) {
          oe && (he = te, te = e[he]), jn(u, he, xt(te, t, n, he, e, l));
        }), u;
      }
      function Hu(e) {
        var t = Me(e);
        return function(n) {
          return Bs(n, e, t);
        };
      }
      function Bs(e, t, n) {
        var i = n.length;
        if (e == null)
          return !i;
        for (e = Ae(e); i--; ) {
          var r = n[i], l = t[r], u = e[r];
          if (u === a && !(r in e) || !l(u))
            return !1;
        }
        return !0;
      }
      function Fs(e, t, n) {
        if (typeof e != "function")
          throw new mt(S);
        return si(function() {
          e.apply(a, n);
        }, t);
      }
      function ei(e, t, n, i) {
        var r = -1, l = yi, u = !0, c = e.length, p = [], v = t.length;
        if (!c)
          return p;
        n && (t = Te(t, st(n))), i ? (l = Sr, u = !1) : t.length >= m && (l = Qn, u = !1, t = new kn(t));
        e:
          for (; ++r < c; ) {
            var _ = e[r], E = n == null ? _ : n(_);
            if (_ = i || _ !== 0 ? _ : 0, u && E === E) {
              for (var R = v; R--; )
                if (t[R] === E)
                  continue e;
              p.push(_);
            } else
              l(t, E, i) || p.push(_);
          }
        return p;
      }
      var tn = sl(Lt), $s = sl(Mr, !0);
      function Qu(e, t) {
        var n = !0;
        return tn(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Oi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !ot(u) : n(u, c)))
            var c = u, p = l;
        }
        return p;
      }
      function Ku(e, t, n, i) {
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
        for (n || (n = O1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? Ne(c, t - 1, n, i, r) : Xt(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Gr = ll(), Os = ll(!0);
      function Lt(e, t) {
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
      function _n(e, t) {
        t = rn(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[Ft(t[n++])];
        return n && n == i ? e : a;
      }
      function Ps(e, t, n) {
        var i = t(e);
        return ae(e) ? i : Xt(i, n(e));
      }
      function Ye(e) {
        return e == null ? e === a ? W : lr : xn && xn in Ae(e) ? I1(e) : N1(e);
      }
      function Ur(e, t) {
        return e > t;
      }
      function Yu(e, t) {
        return e != null && Ee.call(e, t);
      }
      function Zu(e, t) {
        return e != null && t in Ae(e);
      }
      function Ju(e, t, n) {
        return e >= ze(t, n) && e < Re(t, n);
      }
      function Wr(e, t, n) {
        for (var i = n ? Sr : yi, r = e[0].length, l = e.length, u = l, c = g(l), p = 1 / 0, v = []; u--; ) {
          var _ = e[u];
          u && t && (_ = Te(_, st(t))), p = ze(_.length, p), c[u] = !n && (t || r >= 120 && _.length >= 120) ? new kn(u && _) : a;
        }
        _ = e[0];
        var E = -1, R = c[0];
        e:
          for (; ++E < r && v.length < p; ) {
            var Q = _[E], ee = t ? t(Q) : Q;
            if (Q = n || Q !== 0 ? Q : 0, !(R ? Qn(R, ee) : i(v, ee, n))) {
              for (u = l; --u; ) {
                var oe = c[u];
                if (!(oe ? Qn(oe, ee) : i(e[u], ee, n)))
                  continue e;
              }
              R && R.push(ee), v.push(Q);
            }
          }
        return v;
      }
      function Xu(e, t, n, i) {
        return Lt(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function ti(e, t, n) {
        t = rn(t, e), e = Sl(e, t);
        var i = e == null ? e : e[Ft(kt(t))];
        return i == null ? a : at(i, e, n);
      }
      function Rs(e) {
        return Le(e) && Ye(e) == Et;
      }
      function ju(e) {
        return Le(e) && Ye(e) == le;
      }
      function e1(e) {
        return Le(e) && Ye(e) == Kt;
      }
      function ni(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Le(e) && !Le(t) ? e !== e && t !== t : t1(e, t, n, i, ni, r);
      }
      function t1(e, t, n, i, r, l) {
        var u = ae(e), c = ae(t), p = u ? Rt : He(e), v = c ? Rt : He(t);
        p = p == Et ? ft : p, v = v == Et ? ft : v;
        var _ = p == ft, E = v == ft, R = p == v;
        if (R && sn(e)) {
          if (!sn(t))
            return !1;
          u = !0, _ = !1;
        }
        if (R && !_)
          return l || (l = new At()), u || Nn(e) ? xl(e, t, n, i, r, l) : T1(e, t, p, n, i, r, l);
        if (!(n & T)) {
          var Q = _ && Ee.call(e, "__wrapped__"), ee = E && Ee.call(t, "__wrapped__");
          if (Q || ee) {
            var oe = Q ? e.value() : e, te = ee ? t.value() : t;
            return l || (l = new At()), r(oe, te, n, i, l);
          }
        }
        return R ? (l || (l = new At()), D1(e, t, n, i, r, l)) : !1;
      }
      function n1(e) {
        return Le(e) && He(e) == qe;
      }
      function Nr(e, t, n, i) {
        var r = n.length, l = r, u = !i;
        if (e == null)
          return !l;
        for (e = Ae(e); r--; ) {
          var c = n[r];
          if (u && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
            return !1;
        }
        for (; ++r < l; ) {
          c = n[r];
          var p = c[0], v = e[p], _ = c[1];
          if (u && c[2]) {
            if (v === a && !(p in e))
              return !1;
          } else {
            var E = new At();
            if (i)
              var R = i(v, _, p, e, t, E);
            if (!(R === a ? ni(_, v, T | D, i, E) : R))
              return !1;
          }
        }
        return !0;
      }
      function Gs(e) {
        if (!Ie(e) || R1(e))
          return !1;
        var t = zt(e) ? nu : z0;
        return t.test(En(e));
      }
      function i1(e) {
        return Le(e) && Ye(e) == hn;
      }
      function r1(e) {
        return Le(e) && He(e) == rt;
      }
      function a1(e) {
        return Le(e) && er(e.length) && !!Ce[Ye(e)];
      }
      function Ms(e) {
        return typeof e == "function" ? e : e == null ? tt : typeof e == "object" ? ae(e) ? Ns(e[0], e[1]) : Ws(e) : o0(e);
      }
      function qr(e) {
        if (!ai(e))
          return ou(e);
        var t = [];
        for (var n in Ae(e))
          Ee.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function s1(e) {
        if (!Ie(e))
          return W1(e);
        var t = ai(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !Ee.call(e, i)) || n.push(i);
        return n;
      }
      function zr(e, t) {
        return e < t;
      }
      function Us(e, t) {
        var n = -1, i = je(e) ? g(e.length) : [];
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
        return oa(e) && _l(t) ? bl(Ft(e), t) : function(n) {
          var i = ya(n, e);
          return i === a && i === t ? ka(n, e) : ni(t, i, T | D);
        };
      }
      function Ri(e, t, n, i, r) {
        e !== t && Gr(t, function(l, u) {
          if (r || (r = new At()), Ie(l))
            l1(e, t, u, n, Ri, i, r);
          else {
            var c = i ? i(ca(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Pr(e, u, c);
          }
        }, et);
      }
      function l1(e, t, n, i, r, l, u) {
        var c = ca(e, n), p = ca(t, n), v = u.get(p);
        if (v) {
          Pr(e, n, v);
          return;
        }
        var _ = l ? l(c, p, n + "", e, t, u) : a, E = _ === a;
        if (E) {
          var R = ae(p), Q = !R && sn(p), ee = !R && !Q && Nn(p);
          _ = p, R || Q || ee ? ae(c) ? _ = c : Fe(c) ? _ = Xe(c) : Q ? (E = !1, _ = tl(p, !0)) : ee ? (E = !1, _ = nl(p, !0)) : _ = [] : li(p) || Sn(p) ? (_ = c, Sn(c) ? _ = Xl(c) : (!Ie(c) || zt(c)) && (_ = vl(p))) : E = !1;
        }
        E && (u.set(p, _), r(_, p, i, l, u), u.delete(p)), Pr(e, n, _);
      }
      function qs(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, qt(t, n) ? e[t] : a;
      }
      function zs(e, t, n) {
        t.length ? t = Te(t, function(l) {
          return ae(l) ? function(u) {
            return _n(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [tt];
        var i = -1;
        t = Te(t, st(j()));
        var r = Us(e, function(l, u, c) {
          var p = Te(t, function(v) {
            return v(l);
          });
          return { criteria: p, index: ++i, value: l };
        });
        return $o(r, function(l, u) {
          return v1(l, u, n);
        });
      }
      function o1(e, t) {
        return Hs(e, t, function(n, i) {
          return ka(e, i);
        });
      }
      function Hs(e, t, n) {
        for (var i = -1, r = t.length, l = {}; ++i < r; ) {
          var u = t[i], c = _n(e, u);
          n(c, u) && ii(l, rn(u, e), c);
        }
        return l;
      }
      function u1(e) {
        return function(t) {
          return _n(t, e);
        };
      }
      function Hr(e, t, n, i) {
        var r = i ? Fo : Bn, l = -1, u = t.length, c = e;
        for (e === t && (t = Xe(t)), n && (c = Te(e, st(n))); ++l < u; )
          for (var p = 0, v = t[l], _ = n ? n(v) : v; (p = r(c, _, p, i)) > -1; )
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
      function c1(e, t, n, i) {
        for (var r = -1, l = Re(Ii((t - e) / (n || 1)), 0), u = g(l); l--; )
          u[i ? l : ++r] = e, e += n;
        return u;
      }
      function Kr(e, t) {
        var n = "";
        if (!e || t < 1 || t > Dt)
          return n;
        do
          t % 2 && (n += e), t = Li(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function fe(e, t) {
        return da(El(e, t, tt), e + "");
      }
      function d1(e) {
        return Is(qn(e));
      }
      function f1(e, t) {
        var n = qn(e);
        return Ki(n, vn(t, 0, n.length));
      }
      function ii(e, t, n, i) {
        if (!Ie(e))
          return e;
        t = rn(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var p = Ft(t[r]), v = n;
          if (p === "__proto__" || p === "constructor" || p === "prototype")
            return e;
          if (r != u) {
            var _ = c[p];
            v = i ? i(_, p, c) : a, v === a && (v = Ie(_) ? _ : qt(t[r + 1]) ? [] : {});
          }
          jn(c, p, v), c = c[p];
        }
        return e;
      }
      var Ks = Bi ? function(e, t) {
        return Bi.set(e, t), e;
      } : tt, p1 = Di ? function(e, t) {
        return Di(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: _a(t),
          writable: !0
        });
      } : tt;
      function h1(e) {
        return Ki(qn(e));
      }
      function yt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = g(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function m1(e, t) {
        var n;
        return tn(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function Gi(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= bt) {
          for (; i < r; ) {
            var l = i + r >>> 1, u = e[l];
            u !== null && !ot(u) && (n ? u <= t : u < t) ? i = l + 1 : r = l;
          }
          return r;
        }
        return Yr(e, t, tt, n);
      }
      function Yr(e, t, n, i) {
        var r = 0, l = e == null ? 0 : e.length;
        if (l === 0)
          return 0;
        t = n(t);
        for (var u = t !== t, c = t === null, p = ot(t), v = t === a; r < l; ) {
          var _ = Li((r + l) / 2), E = n(e[_]), R = E !== a, Q = E === null, ee = E === E, oe = ot(E);
          if (u)
            var te = i || ee;
          else
            v ? te = ee && (i || R) : c ? te = ee && R && (i || !Q) : p ? te = ee && R && !Q && (i || !oe) : Q || oe ? te = !1 : te = i ? E <= t : E < t;
          te ? r = _ + 1 : l = _;
        }
        return ze(l, re);
      }
      function Ys(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !wt(c, p)) {
            var p = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Zs(e) {
        return typeof e == "number" ? e : ot(e) ? M : +e;
      }
      function lt(e) {
        if (typeof e == "string")
          return e;
        if (ae(e))
          return Te(e, lt) + "";
        if (ot(e))
          return Ts ? Ts.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function nn(e, t, n) {
        var i = -1, r = yi, l = e.length, u = !0, c = [], p = c;
        if (n)
          u = !1, r = Sr;
        else if (l >= m) {
          var v = t ? null : w1(e);
          if (v)
            return vi(v);
          u = !1, r = Qn, p = new kn();
        } else
          p = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var _ = e[i], E = t ? t(_) : _;
            if (_ = n || _ !== 0 ? _ : 0, u && E === E) {
              for (var R = p.length; R--; )
                if (p[R] === E)
                  continue e;
              t && p.push(E), c.push(_);
            } else
              r(p, E, n) || (p !== c && p.push(E), c.push(_));
          }
        return c;
      }
      function Zr(e, t) {
        return t = rn(t, e), e = Sl(e, t), e == null || delete e[Ft(kt(t))];
      }
      function Js(e, t, n, i) {
        return ii(e, t, n(_n(e, t)), i);
      }
      function Mi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? yt(e, i ? 0 : l, i ? l + 1 : r) : yt(e, i ? l + 1 : 0, i ? r : l);
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
        return typeof e == "function" ? e : tt;
      }
      function rn(e, t) {
        return ae(e) ? e : oa(e, t) ? [e] : Tl(_e(e));
      }
      var g1 = fe;
      function an(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : yt(e, t, n);
      }
      var el = iu || function(e) {
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
      function x1(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function y1(e) {
        var t = new e.constructor(e.source, Ra.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function k1(e) {
        return Xn ? Ae(Xn.call(e)) : {};
      }
      function nl(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function il(e, t) {
        if (e !== t) {
          var n = e !== a, i = e === null, r = e === e, l = ot(e), u = t !== a, c = t === null, p = t === t, v = ot(t);
          if (!c && !v && !l && e > t || l && u && p && !c && !v || i && u && p || !n && p || !r)
            return 1;
          if (!i && !l && !v && e < t || v && n && r && !i && !l || c && n && r || !u && r || !p)
            return -1;
        }
        return 0;
      }
      function v1(e, t, n) {
        for (var i = -1, r = e.criteria, l = t.criteria, u = r.length, c = n.length; ++i < u; ) {
          var p = il(r[i], l[i]);
          if (p) {
            if (i >= c)
              return p;
            var v = n[i];
            return p * (v == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function rl(e, t, n, i) {
        for (var r = -1, l = e.length, u = n.length, c = -1, p = t.length, v = Re(l - u, 0), _ = g(p + v), E = !i; ++c < p; )
          _[c] = t[c];
        for (; ++r < u; )
          (E || r < l) && (_[n[r]] = e[r]);
        for (; v--; )
          _[c++] = e[r++];
        return _;
      }
      function al(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, p = -1, v = t.length, _ = Re(l - c, 0), E = g(_ + v), R = !i; ++r < _; )
          E[r] = e[r];
        for (var Q = r; ++p < v; )
          E[Q + p] = t[p];
        for (; ++u < c; )
          (R || r < l) && (E[Q + n[u]] = e[r++]);
        return E;
      }
      function Xe(e, t) {
        var n = -1, i = e.length;
        for (t || (t = g(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function Bt(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], p = i ? i(n[c], e[c], c, n, e) : a;
          p === a && (p = e[c]), r ? Ut(n, c, p) : jn(n, c, p);
        }
        return n;
      }
      function _1(e, t) {
        return Bt(e, la(e), t);
      }
      function b1(e, t) {
        return Bt(e, yl(e), t);
      }
      function Ui(e, t) {
        return function(n, i) {
          var r = ae(n) ? Co : qu, l = t ? t() : {};
          return r(n, e, j(i, 2), l);
        };
      }
      function Mn(e) {
        return fe(function(t, n) {
          var i = -1, r = n.length, l = r > 1 ? n[r - 1] : a, u = r > 2 ? n[2] : a;
          for (l = e.length > 3 && typeof l == "function" ? (r--, l) : a, u && Ze(n[0], n[1], u) && (l = r < 3 ? a : l, r = 1), t = Ae(t); ++i < r; ) {
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
          if (!je(n))
            return e(n, i);
          for (var r = n.length, l = t ? r : -1, u = Ae(n); (t ? l-- : ++l < r) && i(u[l], l, u) !== !1; )
            ;
          return n;
        };
      }
      function ll(e) {
        return function(t, n, i) {
          for (var r = -1, l = Ae(t), u = i(t), c = u.length; c--; ) {
            var p = u[e ? c : ++r];
            if (n(l[p], p, l) === !1)
              break;
          }
          return t;
        };
      }
      function E1(e, t, n) {
        var i = t & Z, r = ri(e);
        function l() {
          var u = this && this !== We && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function ol(e) {
        return function(t) {
          t = _e(t);
          var n = Fn(t) ? St(t) : a, i = n ? n[0] : t.charAt(0), r = n ? an(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function Un(e) {
        return function(t) {
          return Ar(s0(a0(t).replace(po, "")), e, "");
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
      function S1(e, t, n) {
        var i = ri(e);
        function r() {
          for (var l = arguments.length, u = g(l), c = l, p = Wn(r); c--; )
            u[c] = arguments[c];
          var v = l < 3 && u[0] !== p && u[l - 1] !== p ? [] : jt(u, p);
          if (l -= v.length, l < n)
            return pl(
              e,
              t,
              Wi,
              r.placeholder,
              a,
              u,
              v,
              a,
              a,
              n - l
            );
          var _ = this && this !== We && this instanceof r ? i : e;
          return at(_, this, u);
        }
        return r;
      }
      function ul(e) {
        return function(t, n, i) {
          var r = Ae(t);
          if (!je(t)) {
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
          var n = t.length, i = n, r = gt.prototype.thru;
          for (e && t.reverse(); i--; ) {
            var l = t[i];
            if (typeof l != "function")
              throw new mt(S);
            if (r && !u && Hi(l) == "wrapper")
              var u = new gt([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Hi(l), p = c == "wrapper" ? aa(l) : a;
            p && ua(p[0]) && p[1] == (F | ce | q | P) && !p[4].length && p[9] == 1 ? u = u[Hi(p[0])].apply(u, p[3]) : u = l.length == 1 && ua(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var v = arguments, _ = v[0];
            if (u && v.length == 1 && ae(_))
              return u.plant(_).value();
            for (var E = 0, R = n ? t[E].apply(this, v) : _; ++E < n; )
              R = t[E].call(this, R);
            return R;
          };
        });
      }
      function Wi(e, t, n, i, r, l, u, c, p, v) {
        var _ = t & F, E = t & Z, R = t & xe, Q = t & (ce | de), ee = t & ke, oe = R ? a : ri(e);
        function te() {
          for (var he = arguments.length, ye = g(he), ut = he; ut--; )
            ye[ut] = arguments[ut];
          if (Q)
            var Je = Wn(te), ct = Oo(ye, Je);
          if (i && (ye = rl(ye, i, r, Q)), l && (ye = al(ye, l, u, Q)), he -= ct, Q && he < v) {
            var $e = jt(ye, Je);
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
              v - he
            );
          }
          var Ct = E ? n : this, Qt = R ? Ct[e] : e;
          return he = ye.length, c ? ye = q1(ye, c) : ee && he > 1 && ye.reverse(), _ && p < he && (ye.length = p), this && this !== We && this instanceof te && (Qt = oe || ri(Qt)), Qt.apply(Ct, ye);
        }
        return te;
      }
      function dl(e, t) {
        return function(n, i) {
          return Xu(n, e, t(i), {});
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
            typeof n == "string" || typeof i == "string" ? (n = lt(n), i = lt(i)) : (n = Zs(n), i = Zs(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ta(e) {
        return Nt(function(t) {
          return t = Te(t, st(j())), fe(function(n) {
            var i = this;
            return e(t, function(r) {
              return at(r, i, n);
            });
          });
        });
      }
      function qi(e, t) {
        t = t === a ? " " : lt(t);
        var n = t.length;
        if (n < 2)
          return n ? Kr(t, e) : t;
        var i = Kr(t, Ii(e / $n(t)));
        return Fn(t) ? an(St(i), 0, e).join("") : i.slice(0, e);
      }
      function A1(e, t, n, i) {
        var r = t & Z, l = ri(e);
        function u() {
          for (var c = -1, p = arguments.length, v = -1, _ = i.length, E = g(_ + p), R = this && this !== We && this instanceof u ? l : e; ++v < _; )
            E[v] = i[v];
          for (; p--; )
            E[v++] = arguments[++c];
          return at(R, r ? n : this, E);
        }
        return u;
      }
      function fl(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && Ze(t, n, i) && (n = i = a), t = Ht(t), n === a ? (n = t, t = 0) : n = Ht(n), i = i === a ? t < n ? 1 : -1 : Ht(i), c1(t, n, i, e);
        };
      }
      function zi(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = vt(t), n = vt(n)), e(t, n);
        };
      }
      function pl(e, t, n, i, r, l, u, c, p, v) {
        var _ = t & ce, E = _ ? u : a, R = _ ? a : u, Q = _ ? l : a, ee = _ ? a : l;
        t |= _ ? q : $, t &= ~(_ ? $ : q), t & pe || (t &= -4);
        var oe = [
          e,
          t,
          r,
          Q,
          E,
          ee,
          R,
          c,
          p,
          v
        ], te = n.apply(a, oe);
        return ua(e) && Al(te, oe), te.placeholder = i, wl(te, e, t);
      }
      function na(e) {
        var t = Pe[e];
        return function(n, i) {
          if (n = vt(n), i = i == null ? 0 : ze(se(i), 292), i && ws(n)) {
            var r = (_e(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (_e(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var w1 = Pn && 1 / vi(new Pn([, -0]))[1] == Tt ? function(e) {
        return new Pn(e);
      } : Sa;
      function hl(e) {
        return function(t) {
          var n = He(t);
          return n == qe ? Br(t) : n == rt ? No(t) : Vo(t, e(t));
        };
      }
      function Wt(e, t, n, i, r, l, u, c) {
        var p = t & xe;
        if (!p && typeof e != "function")
          throw new mt(S);
        var v = i ? i.length : 0;
        if (v || (t &= -97, i = r = a), u = u === a ? u : Re(se(u), 0), c = c === a ? c : se(c), v -= r ? r.length : 0, t & $) {
          var _ = i, E = r;
          i = r = a;
        }
        var R = p ? a : aa(e), Q = [
          e,
          t,
          n,
          i,
          r,
          _,
          E,
          l,
          u,
          c
        ];
        if (R && U1(Q, R), e = Q[0], t = Q[1], n = Q[2], i = Q[3], r = Q[4], c = Q[9] = Q[9] === a ? p ? 0 : e.length : Re(Q[9] - v, 0), !c && t & (ce | de) && (t &= -25), !t || t == Z)
          var ee = E1(e, t, n);
        else
          t == ce || t == de ? ee = S1(e, t, c) : (t == q || t == (Z | q)) && !r.length ? ee = A1(e, t, n, i) : ee = Wi.apply(a, Q);
        var oe = R ? Ks : Al;
        return wl(oe(ee, Q), e, t);
      }
      function ml(e, t, n, i) {
        return e === a || wt(e, On[n]) && !Ee.call(i, n) ? t : e;
      }
      function gl(e, t, n, i, r, l) {
        return Ie(e) && Ie(t) && (l.set(t, e), Ri(e, t, a, gl, l), l.delete(t)), e;
      }
      function C1(e) {
        return li(e) ? a : e;
      }
      function xl(e, t, n, i, r, l) {
        var u = n & T, c = e.length, p = t.length;
        if (c != p && !(u && p > c))
          return !1;
        var v = l.get(e), _ = l.get(t);
        if (v && _)
          return v == t && _ == e;
        var E = -1, R = !0, Q = n & D ? new kn() : a;
        for (l.set(e, t), l.set(t, e); ++E < c; ) {
          var ee = e[E], oe = t[E];
          if (i)
            var te = u ? i(oe, ee, E, t, e, l) : i(ee, oe, E, e, t, l);
          if (te !== a) {
            if (te)
              continue;
            R = !1;
            break;
          }
          if (Q) {
            if (!wr(t, function(he, ye) {
              if (!Qn(Q, ye) && (ee === he || r(ee, he, n, i, l)))
                return Q.push(ye);
            })) {
              R = !1;
              break;
            }
          } else if (!(ee === oe || r(ee, oe, n, i, l))) {
            R = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), R;
      }
      function T1(e, t, n, i, r, l, u) {
        switch (n) {
          case Ke:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case le:
            return !(e.byteLength != t.byteLength || !l(new wi(e), new wi(t)));
          case dn:
          case Kt:
          case pn:
            return wt(+e, +t);
          case fn:
            return e.name == t.name && e.message == t.message;
          case hn:
          case X:
            return e == t + "";
          case qe:
            var c = Br;
          case rt:
            var p = i & T;
            if (c || (c = vi), e.size != t.size && !p)
              return !1;
            var v = u.get(e);
            if (v)
              return v == t;
            i |= D, u.set(e, t);
            var _ = xl(c(e), c(t), i, r, l, u);
            return u.delete(e), _;
          case A:
            if (Xn)
              return Xn.call(e) == Xn.call(t);
        }
        return !1;
      }
      function D1(e, t, n, i, r, l) {
        var u = n & T, c = ia(e), p = c.length, v = ia(t), _ = v.length;
        if (p != _ && !u)
          return !1;
        for (var E = p; E--; ) {
          var R = c[E];
          if (!(u ? R in t : Ee.call(t, R)))
            return !1;
        }
        var Q = l.get(e), ee = l.get(t);
        if (Q && ee)
          return Q == t && ee == e;
        var oe = !0;
        l.set(e, t), l.set(t, e);
        for (var te = u; ++E < p; ) {
          R = c[E];
          var he = e[R], ye = t[R];
          if (i)
            var ut = u ? i(ye, he, R, t, e, l) : i(he, ye, R, e, t, l);
          if (!(ut === a ? he === ye || r(he, ye, n, i, l) : ut)) {
            oe = !1;
            break;
          }
          te || (te = R == "constructor");
        }
        if (oe && !te) {
          var Je = e.constructor, ct = t.constructor;
          Je != ct && "constructor" in e && "constructor" in t && !(typeof Je == "function" && Je instanceof Je && typeof ct == "function" && ct instanceof ct) && (oe = !1);
        }
        return l.delete(e), l.delete(t), oe;
      }
      function Nt(e) {
        return da(El(e, a, Bl), e + "");
      }
      function ia(e) {
        return Ps(e, Me, la);
      }
      function ra(e) {
        return Ps(e, et, yl);
      }
      var aa = Bi ? function(e) {
        return Bi.get(e);
      } : Sa;
      function Hi(e) {
        for (var t = e.name + "", n = Rn[t], i = Ee.call(Rn, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function Wn(e) {
        var t = Ee.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function j() {
        var e = s.iteratee || ba;
        return e = e === ba ? Ms : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Qi(e, t) {
        var n = e.__data__;
        return P1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function sa(e) {
        for (var t = Me(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, _l(r)];
        }
        return t;
      }
      function bn(e, t) {
        var n = Mo(e, t);
        return Gs(n) ? n : a;
      }
      function I1(e) {
        var t = Ee.call(e, xn), n = e[xn];
        try {
          e[xn] = a;
          var i = !0;
        } catch {
        }
        var r = Si.call(e);
        return i && (t ? e[xn] = n : delete e[xn]), r;
      }
      var la = $r ? function(e) {
        return e == null ? [] : (e = Ae(e), Jt($r(e), function(t) {
          return Ss.call(e, t);
        }));
      } : Aa, yl = $r ? function(e) {
        for (var t = []; e; )
          Xt(t, la(e)), e = Ci(e);
        return t;
      } : Aa, He = Ye;
      (Vr && He(new Vr(new ArrayBuffer(1))) != Ke || Yn && He(new Yn()) != qe || Or && He(Or.resolve()) != hi || Pn && He(new Pn()) != rt || Zn && He(new Zn()) != be) && (He = function(e) {
        var t = Ye(e), n = t == ft ? e.constructor : a, i = n ? En(n) : "";
        if (i)
          switch (i) {
            case fu:
              return Ke;
            case pu:
              return qe;
            case hu:
              return hi;
            case mu:
              return rt;
            case gu:
              return be;
          }
        return t;
      });
      function L1(e, t, n) {
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
              e = Re(e, t - u);
              break;
          }
        }
        return { start: e, end: t };
      }
      function B1(e) {
        var t = e.match(P0);
        return t ? t[1].split(R0) : [];
      }
      function kl(e, t, n) {
        t = rn(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = Ft(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && er(r) && qt(u, r) && (ae(e) || Sn(e)));
      }
      function F1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && Ee.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function vl(e) {
        return typeof e.constructor == "function" && !ai(e) ? Gn(Ci(e)) : {};
      }
      function $1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case le:
            return ea(e);
          case dn:
          case Kt:
            return new i(+e);
          case Ke:
            return x1(e, n);
          case Yt:
          case Zt:
          case mn:
          case ur:
          case cr:
          case dr:
          case fr:
          case pr:
          case hr:
            return nl(e, n);
          case qe:
            return new i();
          case pn:
          case X:
            return new i(e);
          case hn:
            return y1(e);
          case rt:
            return new i();
          case A:
            return k1(e);
        }
      }
      function V1(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var i = n - 1;
        return t[i] = (n > 1 ? "& " : "") + t[i], t = t.join(n > 2 ? ", " : " "), e.replace(O0, `{
/* [wrapped with ` + t + `] */
`);
      }
      function O1(e) {
        return ae(e) || Sn(e) || !!(As && e && e[As]);
      }
      function qt(e, t) {
        var n = typeof e;
        return t = t ?? Dt, !!t && (n == "number" || n != "symbol" && Q0.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ze(e, t, n) {
        if (!Ie(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? je(n) && qt(t, n.length) : i == "string" && t in n) ? wt(n[t], e) : !1;
      }
      function oa(e, t) {
        if (ae(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || ot(e) ? !0 : B0.test(e) || !L0.test(e) || t != null && e in Ae(t);
      }
      function P1(e) {
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
      function R1(e) {
        return !!_s && _s in e;
      }
      var G1 = bi ? zt : wa;
      function ai(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || On;
        return e === n;
      }
      function _l(e) {
        return e === e && !Ie(e);
      }
      function bl(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in Ae(n));
        };
      }
      function M1(e) {
        var t = Xi(e, function(i) {
          return n.size === G && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function U1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (Z | xe | F), u = i == F && n == ce || i == F && n == P && e[7].length <= t[8] || i == (F | P) && t[7].length <= t[8] && n == ce;
        if (!(l || u))
          return e;
        i & Z && (e[2] = t[2], r |= n & Z ? 0 : pe);
        var c = t[3];
        if (c) {
          var p = e[3];
          e[3] = p ? rl(p, c, t[4]) : c, e[4] = p ? jt(e[3], z) : t[4];
        }
        return c = t[5], c && (p = e[5], e[5] = p ? al(p, c, t[6]) : c, e[6] = p ? jt(e[5], z) : t[6]), c = t[7], c && (e[7] = c), i & F && (e[8] = e[8] == null ? t[8] : ze(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
      }
      function W1(e) {
        var t = [];
        if (e != null)
          for (var n in Ae(e))
            t.push(n);
        return t;
      }
      function N1(e) {
        return Si.call(e);
      }
      function El(e, t, n) {
        return t = Re(t === a ? e.length - 1 : t, 0), function() {
          for (var i = arguments, r = -1, l = Re(i.length - t, 0), u = g(l); ++r < l; )
            u[r] = i[t + r];
          r = -1;
          for (var c = g(t + 1); ++r < t; )
            c[r] = i[r];
          return c[t] = n(u), at(e, this, c);
        };
      }
      function Sl(e, t) {
        return t.length < 2 ? e : _n(e, yt(t, 0, -1));
      }
      function q1(e, t) {
        for (var n = e.length, i = ze(t.length, n), r = Xe(e); i--; ) {
          var l = t[i];
          e[i] = qt(l, n) ? r[l] : a;
        }
        return e;
      }
      function ca(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Al = Cl(Ks), si = au || function(e, t) {
        return We.setTimeout(e, t);
      }, da = Cl(p1);
      function wl(e, t, n) {
        var i = t + "";
        return da(e, V1(i, z1(B1(i), n)));
      }
      function Cl(e) {
        var t = 0, n = 0;
        return function() {
          var i = uu(), r = it - (i - n);
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
      var Tl = M1(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(F0, function(n, i, r, l) {
          t.push(r ? l.replace(U0, "$1") : i || n);
        }), t;
      });
      function Ft(e) {
        if (typeof e == "string" || ot(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function En(e) {
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
      function z1(e, t) {
        return ht(It, function(n) {
          var i = "_." + n[0];
          t & n[1] && !yi(e, i) && e.push(i);
        }), e.sort();
      }
      function Dl(e) {
        if (e instanceof ge)
          return e.clone();
        var t = new gt(e.__wrapped__, e.__chain__);
        return t.__actions__ = Xe(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function H1(e, t, n) {
        (n ? Ze(e, t, n) : t === a) ? t = 1 : t = Re(se(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = g(Ii(i / t)); r < i; )
          u[l++] = yt(e, r, r += t);
        return u;
      }
      function Q1(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++t < n; ) {
          var l = e[t];
          l && (r[i++] = l);
        }
        return r;
      }
      function K1() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = g(e - 1), n = arguments[0], i = e; i--; )
          t[i - 1] = arguments[i];
        return Xt(ae(n) ? Xe(n) : [n], Ne(t, 1));
      }
      var Y1 = fe(function(e, t) {
        return Fe(e) ? ei(e, Ne(t, 1, Fe, !0)) : [];
      }), Z1 = fe(function(e, t) {
        var n = kt(t);
        return Fe(n) && (n = a), Fe(e) ? ei(e, Ne(t, 1, Fe, !0), j(n, 2)) : [];
      }), J1 = fe(function(e, t) {
        var n = kt(t);
        return Fe(n) && (n = a), Fe(e) ? ei(e, Ne(t, 1, Fe, !0), a, n) : [];
      });
      function X1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : se(t), yt(e, t < 0 ? 0 : t, i)) : [];
      }
      function j1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : se(t), t = i - t, yt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function ec(e, t) {
        return e && e.length ? Mi(e, j(t, 3), !0, !0) : [];
      }
      function tc(e, t) {
        return e && e.length ? Mi(e, j(t, 3), !0) : [];
      }
      function nc(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && Ze(e, t, n) && (n = 0, i = r), Ku(e, t, n, i)) : [];
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
        return n !== a && (r = se(n), r = n < 0 ? Re(i + r, 0) : ze(r, i - 1)), ki(e, j(t, 3), r, !0);
      }
      function Bl(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ne(e, 1) : [];
      }
      function ic(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ne(e, Tt) : [];
      }
      function rc(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : se(t), Ne(e, t)) : [];
      }
      function ac(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = {}; ++t < n; ) {
          var r = e[t];
          i[r[0]] = r[1];
        }
        return i;
      }
      function Fl(e) {
        return e && e.length ? e[0] : a;
      }
      function sc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : se(n);
        return r < 0 && (r = Re(i + r, 0)), Bn(e, t, r);
      }
      function lc(e) {
        var t = e == null ? 0 : e.length;
        return t ? yt(e, 0, -1) : [];
      }
      var oc = fe(function(e) {
        var t = Te(e, Xr);
        return t.length && t[0] === e[0] ? Wr(t) : [];
      }), uc = fe(function(e) {
        var t = kt(e), n = Te(e, Xr);
        return t === kt(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Wr(n, j(t, 2)) : [];
      }), cc = fe(function(e) {
        var t = kt(e), n = Te(e, Xr);
        return t = typeof t == "function" ? t : a, t && n.pop(), n.length && n[0] === e[0] ? Wr(n, a, t) : [];
      });
      function dc(e, t) {
        return e == null ? "" : lu.call(e, t);
      }
      function kt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : a;
      }
      function fc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i;
        return n !== a && (r = se(n), r = r < 0 ? Re(i + r, 0) : ze(r, i - 1)), t === t ? zo(e, t, r) : ki(e, ps, r, !0);
      }
      function pc(e, t) {
        return e && e.length ? qs(e, se(t)) : a;
      }
      var hc = fe($l);
      function $l(e, t) {
        return e && e.length && t && t.length ? Hr(e, t) : e;
      }
      function mc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, j(n, 2)) : e;
      }
      function gc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, a, n) : e;
      }
      var xc = Nt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Rr(e, t);
        return Qs(e, Te(t, function(r) {
          return qt(r, n) ? +r : r;
        }).sort(il)), i;
      });
      function yc(e, t) {
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
        return e == null ? e : du.call(e);
      }
      function kc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (n && typeof n != "number" && Ze(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : se(t), n = n === a ? i : se(n)), yt(e, t, n)) : [];
      }
      function vc(e, t) {
        return Gi(e, t);
      }
      function _c(e, t, n) {
        return Yr(e, t, j(n, 2));
      }
      function bc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Gi(e, t);
          if (i < n && wt(e[i], t))
            return i;
        }
        return -1;
      }
      function Ec(e, t) {
        return Gi(e, t, !0);
      }
      function Sc(e, t, n) {
        return Yr(e, t, j(n, 2), !0);
      }
      function Ac(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Gi(e, t, !0) - 1;
          if (wt(e[i], t))
            return i;
        }
        return -1;
      }
      function wc(e) {
        return e && e.length ? Ys(e) : [];
      }
      function Cc(e, t) {
        return e && e.length ? Ys(e, j(t, 2)) : [];
      }
      function Tc(e) {
        var t = e == null ? 0 : e.length;
        return t ? yt(e, 1, t) : [];
      }
      function Dc(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : se(t), yt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Ic(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : se(t), t = i - t, yt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Lc(e, t) {
        return e && e.length ? Mi(e, j(t, 3), !1, !0) : [];
      }
      function Bc(e, t) {
        return e && e.length ? Mi(e, j(t, 3)) : [];
      }
      var Fc = fe(function(e) {
        return nn(Ne(e, 1, Fe, !0));
      }), $c = fe(function(e) {
        var t = kt(e);
        return Fe(t) && (t = a), nn(Ne(e, 1, Fe, !0), j(t, 2));
      }), Vc = fe(function(e) {
        var t = kt(e);
        return t = typeof t == "function" ? t : a, nn(Ne(e, 1, Fe, !0), a, t);
      });
      function Oc(e) {
        return e && e.length ? nn(e) : [];
      }
      function Pc(e, t) {
        return e && e.length ? nn(e, j(t, 2)) : [];
      }
      function Rc(e, t) {
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
          return at(t, a, i);
        });
      }
      var Gc = fe(function(e, t) {
        return Fe(e) ? ei(e, t) : [];
      }), Mc = fe(function(e) {
        return Jr(Jt(e, Fe));
      }), Uc = fe(function(e) {
        var t = kt(e);
        return Fe(t) && (t = a), Jr(Jt(e, Fe), j(t, 2));
      }), Wc = fe(function(e) {
        var t = kt(e);
        return t = typeof t == "function" ? t : a, Jr(Jt(e, Fe), a, t);
      }), Nc = fe(pa);
      function qc(e, t) {
        return js(e || [], t || [], jn);
      }
      function zc(e, t) {
        return js(e || [], t || [], ii);
      }
      var Hc = fe(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : a;
        return n = typeof n == "function" ? (e.pop(), n) : a, Vl(e, n);
      });
      function Ol(e) {
        var t = s(e);
        return t.__chain__ = !0, t;
      }
      function Qc(e, t) {
        return t(e), e;
      }
      function Yi(e, t) {
        return t(e);
      }
      var Kc = Nt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Rr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof ge) || !qt(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: Yi,
          args: [r],
          thisArg: a
        }), new gt(i, this.__chain__).thru(function(l) {
          return t && !l.length && l.push(a), l;
        }));
      });
      function Yc() {
        return Ol(this);
      }
      function Zc() {
        return new gt(this.value(), this.__chain__);
      }
      function Jc() {
        this.__values__ === a && (this.__values__ = Zl(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? a : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Xc() {
        return this;
      }
      function jc(e) {
        for (var t, n = this; n instanceof $i; ) {
          var i = Dl(n);
          i.__index__ = 0, i.__values__ = a, t ? r.__wrapped__ = i : t = i;
          var r = i;
          n = n.__wrapped__;
        }
        return r.__wrapped__ = e, t;
      }
      function ed() {
        var e = this.__wrapped__;
        if (e instanceof ge) {
          var t = e;
          return this.__actions__.length && (t = new ge(this)), t = t.reverse(), t.__actions__.push({
            func: Yi,
            args: [fa],
            thisArg: a
          }), new gt(t, this.__chain__);
        }
        return this.thru(fa);
      }
      function td() {
        return Xs(this.__wrapped__, this.__actions__);
      }
      var nd = Ui(function(e, t, n) {
        Ee.call(e, n) ? ++e[n] : Ut(e, n, 1);
      });
      function id(e, t, n) {
        var i = ae(e) ? ds : Qu;
        return n && Ze(e, t, n) && (t = a), i(e, j(t, 3));
      }
      function rd(e, t) {
        var n = ae(e) ? Jt : Vs;
        return n(e, j(t, 3));
      }
      var ad = ul(Il), sd = ul(Ll);
      function ld(e, t) {
        return Ne(Zi(e, t), 1);
      }
      function od(e, t) {
        return Ne(Zi(e, t), Tt);
      }
      function ud(e, t, n) {
        return n = n === a ? 1 : se(n), Ne(Zi(e, t), n);
      }
      function Pl(e, t) {
        var n = ae(e) ? ht : tn;
        return n(e, j(t, 3));
      }
      function Rl(e, t) {
        var n = ae(e) ? To : $s;
        return n(e, j(t, 3));
      }
      var cd = Ui(function(e, t, n) {
        Ee.call(e, n) ? e[n].push(t) : Ut(e, n, [t]);
      });
      function dd(e, t, n, i) {
        e = je(e) ? e : qn(e), n = n && !i ? se(n) : 0;
        var r = e.length;
        return n < 0 && (n = Re(r + n, 0)), tr(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && Bn(e, t, n) > -1;
      }
      var fd = fe(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = je(e) ? g(e.length) : [];
        return tn(e, function(u) {
          l[++i] = r ? at(t, u, n) : ti(u, t, n);
        }), l;
      }), pd = Ui(function(e, t, n) {
        Ut(e, n, t);
      });
      function Zi(e, t) {
        var n = ae(e) ? Te : Us;
        return n(e, j(t, 3));
      }
      function hd(e, t, n, i) {
        return e == null ? [] : (ae(t) || (t = t == null ? [] : [t]), n = i ? a : n, ae(n) || (n = n == null ? [] : [n]), zs(e, t, n));
      }
      var md = Ui(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function gd(e, t, n) {
        var i = ae(e) ? Ar : ms, r = arguments.length < 3;
        return i(e, j(t, 4), n, r, tn);
      }
      function xd(e, t, n) {
        var i = ae(e) ? Do : ms, r = arguments.length < 3;
        return i(e, j(t, 4), n, r, $s);
      }
      function yd(e, t) {
        var n = ae(e) ? Jt : Vs;
        return n(e, ji(j(t, 3)));
      }
      function kd(e) {
        var t = ae(e) ? Is : d1;
        return t(e);
      }
      function vd(e, t, n) {
        (n ? Ze(e, t, n) : t === a) ? t = 1 : t = se(t);
        var i = ae(e) ? Wu : f1;
        return i(e, t);
      }
      function _d(e) {
        var t = ae(e) ? Nu : h1;
        return t(e);
      }
      function bd(e) {
        if (e == null)
          return 0;
        if (je(e))
          return tr(e) ? $n(e) : e.length;
        var t = He(e);
        return t == qe || t == rt ? e.size : qr(e).length;
      }
      function Ed(e, t, n) {
        var i = ae(e) ? wr : m1;
        return n && Ze(e, t, n) && (t = a), i(e, j(t, 3));
      }
      var Sd = fe(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Ze(e, t[0], t[1]) ? t = [] : n > 2 && Ze(t[0], t[1], t[2]) && (t = [t[0]]), zs(e, Ne(t, 1), []);
      }), Ji = ru || function() {
        return We.Date.now();
      };
      function Ad(e, t) {
        if (typeof t != "function")
          throw new mt(S);
        return e = se(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Gl(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, Wt(e, F, a, a, a, a, t);
      }
      function Ml(e, t) {
        var n;
        if (typeof t != "function")
          throw new mt(S);
        return e = se(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var ha = fe(function(e, t, n) {
        var i = Z;
        if (n.length) {
          var r = jt(n, Wn(ha));
          i |= q;
        }
        return Wt(e, i, t, n, r);
      }), Ul = fe(function(e, t, n) {
        var i = Z | xe;
        if (n.length) {
          var r = jt(n, Wn(Ul));
          i |= q;
        }
        return Wt(t, i, e, n, r);
      });
      function Wl(e, t, n) {
        t = n ? a : t;
        var i = Wt(e, ce, a, a, a, a, a, t);
        return i.placeholder = Wl.placeholder, i;
      }
      function Nl(e, t, n) {
        t = n ? a : t;
        var i = Wt(e, de, a, a, a, a, a, t);
        return i.placeholder = Nl.placeholder, i;
      }
      function ql(e, t, n) {
        var i, r, l, u, c, p, v = 0, _ = !1, E = !1, R = !0;
        if (typeof e != "function")
          throw new mt(S);
        t = vt(t) || 0, Ie(n) && (_ = !!n.leading, E = "maxWait" in n, l = E ? Re(vt(n.maxWait) || 0, t) : l, R = "trailing" in n ? !!n.trailing : R);
        function Q($e) {
          var Ct = i, Qt = r;
          return i = r = a, v = $e, u = e.apply(Qt, Ct), u;
        }
        function ee($e) {
          return v = $e, c = si(he, t), _ ? Q($e) : u;
        }
        function oe($e) {
          var Ct = $e - p, Qt = $e - v, u0 = t - Ct;
          return E ? ze(u0, l - Qt) : u0;
        }
        function te($e) {
          var Ct = $e - p, Qt = $e - v;
          return p === a || Ct >= t || Ct < 0 || E && Qt >= l;
        }
        function he() {
          var $e = Ji();
          if (te($e))
            return ye($e);
          c = si(he, oe($e));
        }
        function ye($e) {
          return c = a, R && i ? Q($e) : (i = r = a, u);
        }
        function ut() {
          c !== a && el(c), v = 0, i = p = r = c = a;
        }
        function Je() {
          return c === a ? u : ye(Ji());
        }
        function ct() {
          var $e = Ji(), Ct = te($e);
          if (i = arguments, r = this, p = $e, Ct) {
            if (c === a)
              return ee(p);
            if (E)
              return el(c), c = si(he, t), Q(p);
          }
          return c === a && (c = si(he, t)), u;
        }
        return ct.cancel = ut, ct.flush = Je, ct;
      }
      var wd = fe(function(e, t) {
        return Fs(e, 1, t);
      }), Cd = fe(function(e, t, n) {
        return Fs(e, vt(t) || 0, n);
      });
      function Td(e) {
        return Wt(e, ke);
      }
      function Xi(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new mt(S);
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
          throw new mt(S);
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
      function Dd(e) {
        return Ml(2, e);
      }
      var Id = g1(function(e, t) {
        t = t.length == 1 && ae(t[0]) ? Te(t[0], st(j())) : Te(Ne(t, 1), st(j()));
        var n = t.length;
        return fe(function(i) {
          for (var r = -1, l = ze(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return at(e, this, i);
        });
      }), ma = fe(function(e, t) {
        var n = jt(t, Wn(ma));
        return Wt(e, q, a, t, n);
      }), zl = fe(function(e, t) {
        var n = jt(t, Wn(zl));
        return Wt(e, $, a, t, n);
      }), Ld = Nt(function(e, t) {
        return Wt(e, P, a, a, a, t);
      });
      function Bd(e, t) {
        if (typeof e != "function")
          throw new mt(S);
        return t = t === a ? t : se(t), fe(e, t);
      }
      function Fd(e, t) {
        if (typeof e != "function")
          throw new mt(S);
        return t = t == null ? 0 : Re(se(t), 0), fe(function(n) {
          var i = n[t], r = an(n, 0, t);
          return i && Xt(r, i), at(e, this, r);
        });
      }
      function $d(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new mt(S);
        return Ie(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), ql(e, t, {
          leading: i,
          maxWait: t,
          trailing: r
        });
      }
      function Vd(e) {
        return Gl(e, 1);
      }
      function Od(e, t) {
        return ma(jr(t), e);
      }
      function Pd() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return ae(e) ? e : [e];
      }
      function Rd(e) {
        return xt(e, I);
      }
      function Gd(e, t) {
        return t = typeof t == "function" ? t : a, xt(e, I, t);
      }
      function Md(e) {
        return xt(e, K | I);
      }
      function Ud(e, t) {
        return t = typeof t == "function" ? t : a, xt(e, K | I, t);
      }
      function Wd(e, t) {
        return t == null || Bs(e, t, Me(t));
      }
      function wt(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Nd = zi(Ur), qd = zi(function(e, t) {
        return e >= t;
      }), Sn = Rs(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Rs : function(e) {
        return Le(e) && Ee.call(e, "callee") && !Ss.call(e, "callee");
      }, ae = g.isArray, zd = as ? st(as) : ju;
      function je(e) {
        return e != null && er(e.length) && !zt(e);
      }
      function Fe(e) {
        return Le(e) && je(e);
      }
      function Hd(e) {
        return e === !0 || e === !1 || Le(e) && Ye(e) == dn;
      }
      var sn = su || wa, Qd = ss ? st(ss) : e1;
      function Kd(e) {
        return Le(e) && e.nodeType === 1 && !li(e);
      }
      function Yd(e) {
        if (e == null)
          return !0;
        if (je(e) && (ae(e) || typeof e == "string" || typeof e.splice == "function" || sn(e) || Nn(e) || Sn(e)))
          return !e.length;
        var t = He(e);
        if (t == qe || t == rt)
          return !e.size;
        if (ai(e))
          return !qr(e).length;
        for (var n in e)
          if (Ee.call(e, n))
            return !1;
        return !0;
      }
      function Zd(e, t) {
        return ni(e, t);
      }
      function Jd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? ni(e, t, a, n) : !!i;
      }
      function ga(e) {
        if (!Le(e))
          return !1;
        var t = Ye(e);
        return t == fn || t == fi || typeof e.message == "string" && typeof e.name == "string" && !li(e);
      }
      function Xd(e) {
        return typeof e == "number" && ws(e);
      }
      function zt(e) {
        if (!Ie(e))
          return !1;
        var t = Ye(e);
        return t == In || t == pi || t == De || t == or;
      }
      function Hl(e) {
        return typeof e == "number" && e == se(e);
      }
      function er(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Dt;
      }
      function Ie(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Le(e) {
        return e != null && typeof e == "object";
      }
      var Ql = ls ? st(ls) : n1;
      function jd(e, t) {
        return e === t || Nr(e, t, sa(t));
      }
      function ef(e, t, n) {
        return n = typeof n == "function" ? n : a, Nr(e, t, sa(t), n);
      }
      function tf(e) {
        return Kl(e) && e != +e;
      }
      function nf(e) {
        if (G1(e))
          throw new ie(C);
        return Gs(e);
      }
      function rf(e) {
        return e === null;
      }
      function af(e) {
        return e == null;
      }
      function Kl(e) {
        return typeof e == "number" || Le(e) && Ye(e) == pn;
      }
      function li(e) {
        if (!Le(e) || Ye(e) != ft)
          return !1;
        var t = Ci(e);
        if (t === null)
          return !0;
        var n = Ee.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && Ei.call(n) == eu;
      }
      var xa = os ? st(os) : i1;
      function sf(e) {
        return Hl(e) && e >= -9007199254740991 && e <= Dt;
      }
      var Yl = us ? st(us) : r1;
      function tr(e) {
        return typeof e == "string" || !ae(e) && Le(e) && Ye(e) == X;
      }
      function ot(e) {
        return typeof e == "symbol" || Le(e) && Ye(e) == A;
      }
      var Nn = cs ? st(cs) : a1;
      function lf(e) {
        return e === a;
      }
      function of(e) {
        return Le(e) && He(e) == be;
      }
      function uf(e) {
        return Le(e) && Ye(e) == O;
      }
      var cf = zi(zr), df = zi(function(e, t) {
        return e <= t;
      });
      function Zl(e) {
        if (!e)
          return [];
        if (je(e))
          return tr(e) ? St(e) : Xe(e);
        if (Kn && e[Kn])
          return Wo(e[Kn]());
        var t = He(e), n = t == qe ? Br : t == rt ? vi : qn;
        return n(e);
      }
      function Ht(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = vt(e), e === Tt || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * Hn;
        }
        return e === e ? e : 0;
      }
      function se(e) {
        var t = Ht(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Jl(e) {
        return e ? vn(se(e), 0, x) : 0;
      }
      function vt(e) {
        if (typeof e == "number")
          return e;
        if (ot(e))
          return M;
        if (Ie(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Ie(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = gs(e);
        var n = q0.test(e);
        return n || H0.test(e) ? Ao(e.slice(2), n ? 2 : 8) : N0.test(e) ? M : +e;
      }
      function Xl(e) {
        return Bt(e, et(e));
      }
      function ff(e) {
        return e ? vn(se(e), -9007199254740991, Dt) : e === 0 ? e : 0;
      }
      function _e(e) {
        return e == null ? "" : lt(e);
      }
      var pf = Mn(function(e, t) {
        if (ai(t) || je(t)) {
          Bt(t, Me(t), e);
          return;
        }
        for (var n in t)
          Ee.call(t, n) && jn(e, n, t[n]);
      }), jl = Mn(function(e, t) {
        Bt(t, et(t), e);
      }), nr = Mn(function(e, t, n, i) {
        Bt(t, et(t), e, i);
      }), hf = Mn(function(e, t, n, i) {
        Bt(t, Me(t), e, i);
      }), mf = Nt(Rr);
      function gf(e, t) {
        var n = Gn(e);
        return t == null ? n : Ls(n, t);
      }
      var xf = fe(function(e, t) {
        e = Ae(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && Ze(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = et(l), c = -1, p = u.length; ++c < p; ) {
            var v = u[c], _ = e[v];
            (_ === a || wt(_, On[v]) && !Ee.call(e, v)) && (e[v] = l[v]);
          }
        return e;
      }), yf = fe(function(e) {
        return e.push(a, gl), at(e0, a, e);
      });
      function kf(e, t) {
        return fs(e, j(t, 3), Lt);
      }
      function vf(e, t) {
        return fs(e, j(t, 3), Mr);
      }
      function _f(e, t) {
        return e == null ? e : Gr(e, j(t, 3), et);
      }
      function bf(e, t) {
        return e == null ? e : Os(e, j(t, 3), et);
      }
      function Ef(e, t) {
        return e && Lt(e, j(t, 3));
      }
      function Sf(e, t) {
        return e && Mr(e, j(t, 3));
      }
      function Af(e) {
        return e == null ? [] : Pi(e, Me(e));
      }
      function wf(e) {
        return e == null ? [] : Pi(e, et(e));
      }
      function ya(e, t, n) {
        var i = e == null ? a : _n(e, t);
        return i === a ? n : i;
      }
      function Cf(e, t) {
        return e != null && kl(e, t, Yu);
      }
      function ka(e, t) {
        return e != null && kl(e, t, Zu);
      }
      var Tf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Si.call(t)), e[t] = n;
      }, _a(tt)), Df = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Si.call(t)), Ee.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, j), If = fe(ti);
      function Me(e) {
        return je(e) ? Ds(e) : qr(e);
      }
      function et(e) {
        return je(e) ? Ds(e, !0) : s1(e);
      }
      function Lf(e, t) {
        var n = {};
        return t = j(t, 3), Lt(e, function(i, r, l) {
          Ut(n, t(i, r, l), i);
        }), n;
      }
      function Bf(e, t) {
        var n = {};
        return t = j(t, 3), Lt(e, function(i, r, l) {
          Ut(n, r, t(i, r, l));
        }), n;
      }
      var Ff = Mn(function(e, t, n) {
        Ri(e, t, n);
      }), e0 = Mn(function(e, t, n, i) {
        Ri(e, t, n, i);
      }), $f = Nt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Te(t, function(l) {
          return l = rn(l, e), i || (i = l.length > 1), l;
        }), Bt(e, ra(e), n), i && (n = xt(n, K | H | I, C1));
        for (var r = t.length; r--; )
          Zr(n, t[r]);
        return n;
      });
      function Vf(e, t) {
        return t0(e, ji(j(t)));
      }
      var Of = Nt(function(e, t) {
        return e == null ? {} : o1(e, t);
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
      function Pf(e, t, n) {
        t = rn(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[Ft(t[i])];
          l === a && (i = r, l = n), e = zt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Rf(e, t, n) {
        return e == null ? e : ii(e, t, n);
      }
      function Gf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : ii(e, t, n, i);
      }
      var n0 = hl(Me), i0 = hl(et);
      function Mf(e, t, n) {
        var i = ae(e), r = i || sn(e) || Nn(e);
        if (t = j(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : Ie(e) ? n = zt(l) ? Gn(Ci(e)) : {} : n = {};
        }
        return (r ? ht : Lt)(e, function(u, c, p) {
          return t(n, u, c, p);
        }), n;
      }
      function Uf(e, t) {
        return e == null ? !0 : Zr(e, t);
      }
      function Wf(e, t, n) {
        return e == null ? e : Js(e, t, jr(n));
      }
      function Nf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : Js(e, t, jr(n), i);
      }
      function qn(e) {
        return e == null ? [] : Lr(e, Me(e));
      }
      function qf(e) {
        return e == null ? [] : Lr(e, et(e));
      }
      function zf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = vt(n), n = n === n ? n : 0), t !== a && (t = vt(t), t = t === t ? t : 0), vn(vt(e), t, n);
      }
      function Hf(e, t, n) {
        return t = Ht(t), n === a ? (n = t, t = 0) : n = Ht(n), e = vt(e), Ju(e, t, n);
      }
      function Qf(e, t, n) {
        if (n && typeof n != "boolean" && Ze(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Ht(e), t === a ? (t = e, e = 0) : t = Ht(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = Cs();
          return ze(e + r * (t - e + So("1e-" + ((r + "").length - 1))), t);
        }
        return Qr(e, t);
      }
      var Kf = Un(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? r0(t) : t);
      });
      function r0(e) {
        return va(_e(e).toLowerCase());
      }
      function a0(e) {
        return e = _e(e), e && e.replace(K0, Po).replace(ho, "");
      }
      function Yf(e, t, n) {
        e = _e(e), t = lt(t);
        var i = e.length;
        n = n === a ? i : vn(se(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Zf(e) {
        return e = _e(e), e && T0.test(e) ? e.replace(Oa, Ro) : e;
      }
      function Jf(e) {
        return e = _e(e), e && $0.test(e) ? e.replace(mr, "\\$&") : e;
      }
      var Xf = Un(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), jf = Un(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), ep = ol("toLowerCase");
      function tp(e, t, n) {
        e = _e(e), t = se(t);
        var i = t ? $n(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return qi(Li(r), n) + e + qi(Ii(r), n);
      }
      function np(e, t, n) {
        e = _e(e), t = se(t);
        var i = t ? $n(e) : 0;
        return t && i < t ? e + qi(t - i, n) : e;
      }
      function ip(e, t, n) {
        e = _e(e), t = se(t);
        var i = t ? $n(e) : 0;
        return t && i < t ? qi(t - i, n) + e : e;
      }
      function rp(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), cu(_e(e).replace(gr, ""), t || 0);
      }
      function ap(e, t, n) {
        return (n ? Ze(e, t, n) : t === a) ? t = 1 : t = se(t), Kr(_e(e), t);
      }
      function sp() {
        var e = arguments, t = _e(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var lp = Un(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function op(e, t, n) {
        return n && typeof n != "number" && Ze(e, t, n) && (t = n = a), n = n === a ? x : n >>> 0, n ? (e = _e(e), e && (typeof t == "string" || t != null && !xa(t)) && (t = lt(t), !t && Fn(e)) ? an(St(e), 0, n) : e.split(t, n)) : [];
      }
      var up = Un(function(e, t, n) {
        return e + (n ? " " : "") + va(t);
      });
      function cp(e, t, n) {
        return e = _e(e), n = n == null ? 0 : vn(se(n), 0, e.length), t = lt(t), e.slice(n, n + t.length) == t;
      }
      function dp(e, t, n) {
        var i = s.templateSettings;
        n && Ze(e, t, n) && (t = a), e = _e(e), t = nr({}, t, i, ml);
        var r = nr({}, t.imports, i.imports, ml), l = Me(r), u = Lr(r, l), c, p, v = 0, _ = t.interpolate || mi, E = "__p += '", R = Fr(
          (t.escape || mi).source + "|" + _.source + "|" + (_ === Pa ? W0 : mi).source + "|" + (t.evaluate || mi).source + "|$",
          "g"
        ), Q = "//# sourceURL=" + (Ee.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ko + "]") + `
`;
        e.replace(R, function(te, he, ye, ut, Je, ct) {
          return ye || (ye = ut), E += e.slice(v, ct).replace(Y0, Go), he && (c = !0, E += `' +
__e(` + he + `) +
'`), Je && (p = !0, E += `';
` + Je + `;
__p += '`), ye && (E += `' +
((__t = (` + ye + `)) == null ? '' : __t) +
'`), v = ct + te.length, te;
        }), E += `';
`;
        var ee = Ee.call(t, "variable") && t.variable;
        if (!ee)
          E = `with (obj) {
` + E + `
}
`;
        else if (M0.test(ee))
          throw new ie(V);
        E = (p ? E.replace(S0, "") : E).replace(A0, "$1").replace(w0, "$1;"), E = "function(" + (ee || "obj") + `) {
` + (ee ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (p ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + E + `return __p
}`;
        var oe = l0(function() {
          return ve(l, Q + "return " + E).apply(a, u);
        });
        if (oe.source = E, ga(oe))
          throw oe;
        return oe;
      }
      function fp(e) {
        return _e(e).toLowerCase();
      }
      function pp(e) {
        return _e(e).toUpperCase();
      }
      function hp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return gs(e);
        if (!e || !(t = lt(t)))
          return e;
        var i = St(e), r = St(t), l = xs(i, r), u = ys(i, r) + 1;
        return an(i, l, u).join("");
      }
      function mp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.slice(0, vs(e) + 1);
        if (!e || !(t = lt(t)))
          return e;
        var i = St(e), r = ys(i, St(t)) + 1;
        return an(i, 0, r).join("");
      }
      function gp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.replace(gr, "");
        if (!e || !(t = lt(t)))
          return e;
        var i = St(e), r = xs(i, St(t));
        return an(i, r).join("");
      }
      function xp(e, t) {
        var n = Be, i = Ge;
        if (Ie(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? se(t.length) : n, i = "omission" in t ? lt(t.omission) : i;
        }
        e = _e(e);
        var l = e.length;
        if (Fn(e)) {
          var u = St(e);
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
            var v, _ = p;
            for (r.global || (r = Fr(r.source, _e(Ra.exec(r)) + "g")), r.lastIndex = 0; v = r.exec(_); )
              var E = v.index;
            p = p.slice(0, E === a ? c : E);
          }
        } else if (e.indexOf(lt(r), c) != c) {
          var R = p.lastIndexOf(r);
          R > -1 && (p = p.slice(0, R));
        }
        return p + i;
      }
      function yp(e) {
        return e = _e(e), e && C0.test(e) ? e.replace(Va, Ho) : e;
      }
      var kp = Un(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), va = ol("toUpperCase");
      function s0(e, t, n) {
        return e = _e(e), t = n ? a : t, t === a ? Uo(e) ? Yo(e) : Bo(e) : e.match(t) || [];
      }
      var l0 = fe(function(e, t) {
        try {
          return at(e, a, t);
        } catch (n) {
          return ga(n) ? n : new ie(n);
        }
      }), vp = Nt(function(e, t) {
        return ht(t, function(n) {
          n = Ft(n), Ut(e, n, ha(e[n], e));
        }), e;
      });
      function _p(e) {
        var t = e == null ? 0 : e.length, n = j();
        return e = t ? Te(e, function(i) {
          if (typeof i[1] != "function")
            throw new mt(S);
          return [n(i[0]), i[1]];
        }) : [], fe(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (at(l[0], this, i))
              return at(l[1], this, i);
          }
        });
      }
      function bp(e) {
        return Hu(xt(e, K));
      }
      function _a(e) {
        return function() {
          return e;
        };
      }
      function Ep(e, t) {
        return e == null || e !== e ? t : e;
      }
      var Sp = cl(), Ap = cl(!0);
      function tt(e) {
        return e;
      }
      function ba(e) {
        return Ms(typeof e == "function" ? e : xt(e, K));
      }
      function wp(e) {
        return Ws(xt(e, K));
      }
      function Cp(e, t) {
        return Ns(e, xt(t, K));
      }
      var Tp = fe(function(e, t) {
        return function(n) {
          return ti(n, e, t);
        };
      }), Dp = fe(function(e, t) {
        return function(n) {
          return ti(e, n, t);
        };
      });
      function Ea(e, t, n) {
        var i = Me(t), r = Pi(t, i);
        n == null && !(Ie(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Pi(t, Me(t)));
        var l = !(Ie(n) && "chain" in n) || !!n.chain, u = zt(e);
        return ht(r, function(c) {
          var p = t[c];
          e[c] = p, u && (e.prototype[c] = function() {
            var v = this.__chain__;
            if (l || v) {
              var _ = e(this.__wrapped__), E = _.__actions__ = Xe(this.__actions__);
              return E.push({ func: p, args: arguments, thisArg: e }), _.__chain__ = v, _;
            }
            return p.apply(e, Xt([this.value()], arguments));
          });
        }), e;
      }
      function Ip() {
        return We._ === this && (We._ = tu), this;
      }
      function Sa() {
      }
      function Lp(e) {
        return e = se(e), fe(function(t) {
          return qs(t, e);
        });
      }
      var Bp = ta(Te), Fp = ta(ds), $p = ta(wr);
      function o0(e) {
        return oa(e) ? Cr(Ft(e)) : u1(e);
      }
      function Vp(e) {
        return function(t) {
          return e == null ? a : _n(e, t);
        };
      }
      var Op = fl(), Pp = fl(!0);
      function Aa() {
        return [];
      }
      function wa() {
        return !1;
      }
      function Rp() {
        return {};
      }
      function Gp() {
        return "";
      }
      function Mp() {
        return !0;
      }
      function Up(e, t) {
        if (e = se(e), e < 1 || e > Dt)
          return [];
        var n = x, i = ze(e, x);
        t = j(t), e -= x;
        for (var r = Ir(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Wp(e) {
        return ae(e) ? Te(e, Ft) : ot(e) ? [e] : Xe(Tl(_e(e)));
      }
      function Np(e) {
        var t = ++jo;
        return _e(e) + t;
      }
      var qp = Ni(function(e, t) {
        return e + t;
      }, 0), zp = na("ceil"), Hp = Ni(function(e, t) {
        return e / t;
      }, 1), Qp = na("floor");
      function Kp(e) {
        return e && e.length ? Oi(e, tt, Ur) : a;
      }
      function Yp(e, t) {
        return e && e.length ? Oi(e, j(t, 2), Ur) : a;
      }
      function Zp(e) {
        return hs(e, tt);
      }
      function Jp(e, t) {
        return hs(e, j(t, 2));
      }
      function Xp(e) {
        return e && e.length ? Oi(e, tt, zr) : a;
      }
      function jp(e, t) {
        return e && e.length ? Oi(e, j(t, 2), zr) : a;
      }
      var eh = Ni(function(e, t) {
        return e * t;
      }, 1), th = na("round"), nh = Ni(function(e, t) {
        return e - t;
      }, 0);
      function ih(e) {
        return e && e.length ? Dr(e, tt) : 0;
      }
      function rh(e, t) {
        return e && e.length ? Dr(e, j(t, 2)) : 0;
      }
      return s.after = Ad, s.ary = Gl, s.assign = pf, s.assignIn = jl, s.assignInWith = nr, s.assignWith = hf, s.at = mf, s.before = Ml, s.bind = ha, s.bindAll = vp, s.bindKey = Ul, s.castArray = Pd, s.chain = Ol, s.chunk = H1, s.compact = Q1, s.concat = K1, s.cond = _p, s.conforms = bp, s.constant = _a, s.countBy = nd, s.create = gf, s.curry = Wl, s.curryRight = Nl, s.debounce = ql, s.defaults = xf, s.defaultsDeep = yf, s.defer = wd, s.delay = Cd, s.difference = Y1, s.differenceBy = Z1, s.differenceWith = J1, s.drop = X1, s.dropRight = j1, s.dropRightWhile = ec, s.dropWhile = tc, s.fill = nc, s.filter = rd, s.flatMap = ld, s.flatMapDeep = od, s.flatMapDepth = ud, s.flatten = Bl, s.flattenDeep = ic, s.flattenDepth = rc, s.flip = Td, s.flow = Sp, s.flowRight = Ap, s.fromPairs = ac, s.functions = Af, s.functionsIn = wf, s.groupBy = cd, s.initial = lc, s.intersection = oc, s.intersectionBy = uc, s.intersectionWith = cc, s.invert = Tf, s.invertBy = Df, s.invokeMap = fd, s.iteratee = ba, s.keyBy = pd, s.keys = Me, s.keysIn = et, s.map = Zi, s.mapKeys = Lf, s.mapValues = Bf, s.matches = wp, s.matchesProperty = Cp, s.memoize = Xi, s.merge = Ff, s.mergeWith = e0, s.method = Tp, s.methodOf = Dp, s.mixin = Ea, s.negate = ji, s.nthArg = Lp, s.omit = $f, s.omitBy = Vf, s.once = Dd, s.orderBy = hd, s.over = Bp, s.overArgs = Id, s.overEvery = Fp, s.overSome = $p, s.partial = ma, s.partialRight = zl, s.partition = md, s.pick = Of, s.pickBy = t0, s.property = o0, s.propertyOf = Vp, s.pull = hc, s.pullAll = $l, s.pullAllBy = mc, s.pullAllWith = gc, s.pullAt = xc, s.range = Op, s.rangeRight = Pp, s.rearg = Ld, s.reject = yd, s.remove = yc, s.rest = Bd, s.reverse = fa, s.sampleSize = vd, s.set = Rf, s.setWith = Gf, s.shuffle = _d, s.slice = kc, s.sortBy = Sd, s.sortedUniq = wc, s.sortedUniqBy = Cc, s.split = op, s.spread = Fd, s.tail = Tc, s.take = Dc, s.takeRight = Ic, s.takeRightWhile = Lc, s.takeWhile = Bc, s.tap = Qc, s.throttle = $d, s.thru = Yi, s.toArray = Zl, s.toPairs = n0, s.toPairsIn = i0, s.toPath = Wp, s.toPlainObject = Xl, s.transform = Mf, s.unary = Vd, s.union = Fc, s.unionBy = $c, s.unionWith = Vc, s.uniq = Oc, s.uniqBy = Pc, s.uniqWith = Rc, s.unset = Uf, s.unzip = pa, s.unzipWith = Vl, s.update = Wf, s.updateWith = Nf, s.values = qn, s.valuesIn = qf, s.without = Gc, s.words = s0, s.wrap = Od, s.xor = Mc, s.xorBy = Uc, s.xorWith = Wc, s.zip = Nc, s.zipObject = qc, s.zipObjectDeep = zc, s.zipWith = Hc, s.entries = n0, s.entriesIn = i0, s.extend = jl, s.extendWith = nr, Ea(s, s), s.add = qp, s.attempt = l0, s.camelCase = Kf, s.capitalize = r0, s.ceil = zp, s.clamp = zf, s.clone = Rd, s.cloneDeep = Md, s.cloneDeepWith = Ud, s.cloneWith = Gd, s.conformsTo = Wd, s.deburr = a0, s.defaultTo = Ep, s.divide = Hp, s.endsWith = Yf, s.eq = wt, s.escape = Zf, s.escapeRegExp = Jf, s.every = id, s.find = ad, s.findIndex = Il, s.findKey = kf, s.findLast = sd, s.findLastIndex = Ll, s.findLastKey = vf, s.floor = Qp, s.forEach = Pl, s.forEachRight = Rl, s.forIn = _f, s.forInRight = bf, s.forOwn = Ef, s.forOwnRight = Sf, s.get = ya, s.gt = Nd, s.gte = qd, s.has = Cf, s.hasIn = ka, s.head = Fl, s.identity = tt, s.includes = dd, s.indexOf = sc, s.inRange = Hf, s.invoke = If, s.isArguments = Sn, s.isArray = ae, s.isArrayBuffer = zd, s.isArrayLike = je, s.isArrayLikeObject = Fe, s.isBoolean = Hd, s.isBuffer = sn, s.isDate = Qd, s.isElement = Kd, s.isEmpty = Yd, s.isEqual = Zd, s.isEqualWith = Jd, s.isError = ga, s.isFinite = Xd, s.isFunction = zt, s.isInteger = Hl, s.isLength = er, s.isMap = Ql, s.isMatch = jd, s.isMatchWith = ef, s.isNaN = tf, s.isNative = nf, s.isNil = af, s.isNull = rf, s.isNumber = Kl, s.isObject = Ie, s.isObjectLike = Le, s.isPlainObject = li, s.isRegExp = xa, s.isSafeInteger = sf, s.isSet = Yl, s.isString = tr, s.isSymbol = ot, s.isTypedArray = Nn, s.isUndefined = lf, s.isWeakMap = of, s.isWeakSet = uf, s.join = dc, s.kebabCase = Xf, s.last = kt, s.lastIndexOf = fc, s.lowerCase = jf, s.lowerFirst = ep, s.lt = cf, s.lte = df, s.max = Kp, s.maxBy = Yp, s.mean = Zp, s.meanBy = Jp, s.min = Xp, s.minBy = jp, s.stubArray = Aa, s.stubFalse = wa, s.stubObject = Rp, s.stubString = Gp, s.stubTrue = Mp, s.multiply = eh, s.nth = pc, s.noConflict = Ip, s.noop = Sa, s.now = Ji, s.pad = tp, s.padEnd = np, s.padStart = ip, s.parseInt = rp, s.random = Qf, s.reduce = gd, s.reduceRight = xd, s.repeat = ap, s.replace = sp, s.result = Pf, s.round = th, s.runInContext = d, s.sample = kd, s.size = bd, s.snakeCase = lp, s.some = Ed, s.sortedIndex = vc, s.sortedIndexBy = _c, s.sortedIndexOf = bc, s.sortedLastIndex = Ec, s.sortedLastIndexBy = Sc, s.sortedLastIndexOf = Ac, s.startCase = up, s.startsWith = cp, s.subtract = nh, s.sum = ih, s.sumBy = rh, s.template = dp, s.times = Up, s.toFinite = Ht, s.toInteger = se, s.toLength = Jl, s.toLower = fp, s.toNumber = vt, s.toSafeInteger = ff, s.toString = _e, s.toUpper = pp, s.trim = hp, s.trimEnd = mp, s.trimStart = gp, s.truncate = xp, s.unescape = yp, s.uniqueId = Np, s.upperCase = kp, s.upperFirst = va, s.each = Pl, s.eachRight = Rl, s.first = Fl, Ea(s, function() {
        var e = {};
        return Lt(s, function(t, n) {
          Ee.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = b, ht(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), ht(["drop", "take"], function(e, t) {
        ge.prototype[e] = function(n) {
          n = n === a ? 1 : Re(se(n), 0);
          var i = this.__filtered__ && !t ? new ge(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = ze(n, i.__takeCount__) : i.__views__.push({
            size: ze(n, x),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, ge.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), ht(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == _t || n == cn;
        ge.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: j(r, 3),
            type: n
          }), l.__filtered__ = l.__filtered__ || i, l;
        };
      }), ht(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        ge.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), ht(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        ge.prototype[e] = function() {
          return this.__filtered__ ? new ge(this) : this[n](1);
        };
      }), ge.prototype.compact = function() {
        return this.filter(tt);
      }, ge.prototype.find = function(e) {
        return this.filter(e).head();
      }, ge.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, ge.prototype.invokeMap = fe(function(e, t) {
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
        return this.take(x);
      }, Lt(ge.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, p = u instanceof ge, v = c[0], _ = p || ae(u), E = function(he) {
            var ye = r.apply(s, Xt([he], c));
            return i && R ? ye[0] : ye;
          };
          _ && n && typeof v == "function" && v.length != 1 && (p = _ = !1);
          var R = this.__chain__, Q = !!this.__actions__.length, ee = l && !R, oe = p && !Q;
          if (!l && _) {
            u = oe ? u : new ge(this);
            var te = e.apply(u, c);
            return te.__actions__.push({ func: Yi, args: [E], thisArg: a }), new gt(te, R);
          }
          return ee && oe ? e.apply(this, c) : (te = this.thru(E), ee ? i ? te.value()[0] : te.value() : te);
        });
      }), ht(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = _i[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
        s.prototype[e] = function() {
          var r = arguments;
          if (i && !this.__chain__) {
            var l = this.value();
            return t.apply(ae(l) ? l : [], r);
          }
          return this[n](function(u) {
            return t.apply(ae(u) ? u : [], r);
          });
        };
      }), Lt(ge.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          Ee.call(Rn, i) || (Rn[i] = []), Rn[i].push({ name: t, func: n });
        }
      }), Rn[Wi(a, xe).name] = [{
        name: "wrapper",
        func: a
      }], ge.prototype.clone = xu, ge.prototype.reverse = yu, ge.prototype.value = ku, s.prototype.at = Kc, s.prototype.chain = Yc, s.prototype.commit = Zc, s.prototype.next = Jc, s.prototype.plant = jc, s.prototype.reverse = ed, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = td, s.prototype.first = s.prototype.head, Kn && (s.prototype[Kn] = Xc), s;
    }, Vn = Zo();
    gn ? ((gn.exports = Vn)._ = Vn, br._ = Vn) : We._ = Vn;
  }).call(oi);
})(rr, rr.exports);
var Rh = rr.exports;
const Gh = { class: "d-flex align-items-center mb-30" }, Mh = {
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
    const a = L, b = o, m = Ve(() => b.filters ? b.filters.filter((J) => J.model) : []), C = Ve(() => {
      const J = {};
      return m.value.forEach((G) => {
        J[G.key] = G.model;
      }), J;
    }), S = Rh.debounce(() => {
      a(ui.FILTER_CHANGE, C);
    }, 800);
    function V() {
      a(ui.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (J, G) => (h(), y("div", {
      class: Ue(["base-table-filters", { inactive: o.inactive }])
    }, [
      f("h6", Gh, [
        Y(w(Pt), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        G[1] || (G[1] = nt(" Filters "))
      ]),
      ir(J.$slots, "customFields", {}, void 0, !0),
      (h(!0), y(me, null, Se(o.filters, (z, K) => (h(), y(me, null, [
        z.type === "datetime" || z.type === "datetimehour" ? (h(), ue(w(x0), {
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          label: z.value,
          disabled: o.filters[K].disabled,
          modelValue: o.filters[K].model,
          "onUpdate:modelValue": (H) => o.filters[K].model = H,
          onInput: w(S)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : z.dataSource ? (h(), ue(w($t), {
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          options: z.key === "campaign" ? J.campaignlist : z.dataSource,
          label: z.value,
          disabled: o.filters[K].disabled,
          singleSelect: !1,
          modelValue: o.filters[K].model,
          "onUpdate:modelValue": (H) => o.filters[K].model = H,
          onClick: (H) => J.filterClicked(z.key),
          onInput: w(S)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), ue(w(Vt), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          label: z.value,
          disabled: o.filters[K].disabled,
          modelValue: o.filters[K].model,
          "onUpdate:modelValue": (H) => o.filters[K].model = H,
          onInput: w(S)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      Y(w(dt), {
        type: "tertiary",
        label: "Clear filters",
        onClick: G[0] || (G[0] = (z) => V())
      })
    ], 2));
  }
}, Uh = /* @__PURE__ */ Qe(Mh, [["__scopeId", "data-v-0bc5c036"]]), Wh = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: L }) {
    const a = L, m = o.options || {}, C = new IntersectionObserver(([V]) => {
      a("intersecting", V.isIntersecting);
    }, m), S = U(null);
    return Tn(() => {
      S.value && C.observe(S.value);
    }), ah(() => {
      C.disconnect();
    }), (V, J) => (h(), y("div", {
      ref_key: "targetELement",
      ref: S,
      class: "observer",
      style: { height: "3px" }
    }, [
      ir(V.$slots, "default")
    ], 512));
  }
}, _0 = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", Nh = { class: "query-builder" }, qh = { class: "query-conditions" }, zh = { class: "condition" }, Hh = { class: "cell field" }, Qh = { class: "cell operator" }, Kh = { class: "cell value" }, Yh = {
  key: 0,
  class: "query-operator-outer"
}, Zh = { class: "query-operator" }, Jh = {
  key: 0,
  class: "query-operator-outer"
}, Xh = { class: "query-operator" }, jh = {
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
    return (b, m) => (h(), y("div", Nh, [
      f("div", qh, [
        m[0] || (m[0] = f("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), y(me, null, Se(o.query, (C, S) => (h(), y("div", {
          key: `group-${S}`,
          class: "query-group"
        }, [
          (h(!0), y(me, null, Se(C.conditions, (V, J) => (h(), y("div", {
            key: `condition-${J}`
          }, [
            f("div", zh, [
              f("div", Hh, ne(V.field), 1),
              f("div", Qh, ne(V.operator), 1),
              f("div", Kh, ne(a(V)), 1),
              Y(w(dt), {
                type: "tertiary",
                icon: "bi-arrows-expand"
              })
            ]),
            J < C.conditions.length - 1 ? (h(), y("div", Yh, [
              f("div", Zh, ne(C.logic.replace("$", "").toUpperCase()), 1)
            ])) : B("", !0)
          ]))), 128)),
          S < o.query.length - 1 ? (h(), y("div", Jh, [
            f("div", Xh, ne(o.query[S + 1].logic.replace("$", "").toUpperCase()), 1)
          ])) : B("", !0)
        ]))), 128))
      ])
    ]));
  }
}, e2 = /* @__PURE__ */ Qe(jh, [["__scopeId", "data-v-ddfd5a9f"]]), t2 = { class: "info-card" }, n2 = { class: "segments" }, i2 = { class: "segment-img-wrapper" }, r2 = ["src", "title"], a2 = { class: "segment-info" }, s2 = {
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
    function a(C) {
      const S = [];
      return C.coreEngagement && S.push(`Core Engagement: ${C.coreEngagement}`), C.coreFocus && S.push(`Core Focus: ${C.coreFocus}`), S.length > 0 ? S.join(`
`) : "No information available";
    }
    const b = Ve(() => !L.segmentData || !L.segmentData.segments ? [] : L.isThumbnail ? L.segmentData.segments.slice(0, 5) : L.segmentData.segments);
    function m(C) {
      if (typeof C == "string" && C.includes(","))
        return C;
      const S = typeof C == "string" ? parseInt(C, 10) : C;
      return Number.isNaN(S) ? C : S.toLocaleString();
    }
    return (C, S) => (h(), y("div", t2, [
      S[2] || (S[2] = f("h5", { class: "mb-3" }, "Top Interests", -1)),
      f("div", n2, [
        (h(!0), y(me, null, Se(b.value, (V) => (h(), y("div", {
          class: "segment",
          key: V.name
        }, [
          f("div", i2, [
            f("img", {
              src: V.image,
              alt: "segment",
              title: a(V)
            }, null, 8, r2)
          ]),
          f("div", a2, [
            f("h4", null, ne(V.name), 1),
            f("p", null, [
              S[0] || (S[0] = f("span", null, "Est. Reach:", -1)),
              nt(" " + ne(m(V.reach)) + " ", 1),
              Y(w(d0), {
                class: "pl-1",
                label: "This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience."
              })
            ]),
            f("p", null, [
              S[1] || (S[1] = f("span", null, "Affinity Score: ", -1)),
              nt(" " + ne(V.affinityScore), 1),
              Y(w(d0), {
                class: "pl-1",
                label: "This score indicates how much more likely this persona is to be interested in your brand compared to the average person. It reflects behavioral and interest similarity to your 1PD seed audience"
              })
            ])
          ])
        ]))), 128))
      ])
    ]));
  }
}, l2 = /* @__PURE__ */ Qe(s2, [["__scopeId", "data-v-a7f913e3"]]), o2 = { class: "segment-details-insigts mt-4" }, u2 = { class: "insights-title-wrapper" }, c2 = { class: "mt-3" }, d2 = { class: "query-result" }, f2 = {
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
      var m, C, S;
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
          text: ((S = a.selectedSegment.thumbnail) == null ? void 0 : S.title) || "",
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
      var m, C, S;
      return ((S = (C = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.graph) == null ? void 0 : C.seriesCombined) == null ? void 0 : S.map((V) => ({
        name: V.name,
        data: V.data.map(Number)
      }))) || [];
    });
    const b = Ve(() => {
      var m, C, S, V;
      return ((V = (S = (C = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.segments) == null ? void 0 : C[0]) == null ? void 0 : S.segments) == null ? void 0 : V.slice(0, 2)) || [];
    });
    return Ve(() => b.value.map((S) => parseFloat(S.affinityScore || "0")).reduce((S, V) => S + V, 0).toFixed(2)), Ve(() => b.value.map((C) => parseInt(C.reach || "0", 10)).reduce((C, S) => C + S, 0).toLocaleString()), (m, C) => {
      const S = g0("CataUiTooltip");
      return h(), y("div", null, [
        f("div", o2, [
          f("div", u2, [
            C[1] || (C[1] = f("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            f("p", c2, [
              C[0] || (C[0] = nt("Find the segments that work best with ")),
              f("span", d2, ne(a.selectedSegment.name), 1)
            ]),
            Y(S, { label: "The preview is for your external proofing tool." })
          ])
        ])
      ]);
    };
  }
}, p2 = /* @__PURE__ */ Qe(f2, [["__scopeId", "data-v-0d8f9bc6"]]), h2 = { class: "modal-body" }, m2 = { class: "section" }, g2 = { class: "checkbox-group" }, x2 = { class: "checkbox-group" }, y2 = { class: "sections-wrapper" }, k2 = { class: "section" }, v2 = { class: "checkbox-group-catergory" }, _2 = { class: "section" }, b2 = { class: "ccheckbox-group-catergory" }, E2 = { class: "section" }, S2 = { class: "checkbox-group-category" }, A2 = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: L }) {
    const a = L, b = U([]), m = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], C = ["Build new campaign", "Update current campaign"], S = ["Display & Video 360", "The Trade Desk"], V = ["Infosum", "LiveRamp"], J = ["Open Media Studio", "Audience Builder"];
    function G() {
      a("close");
    }
    const z = () => {
      a("insertSegment"), G();
    };
    return (K, H) => {
      const I = g0("hp");
      return h(), ue(w(y0), {
        onClose: G,
        size: "medium"
      }, {
        header: Ot(() => H[5] || (H[5] = [
          f("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: Ot(() => [
          f("div", h2, [
            f("div", m2, [
              Y(I, null, {
                default: Ot(() => H[6] || (H[6] = [
                  nt("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              f("div", g2, [
                (h(), y(me, null, Se(m, (T) => Y(w(wn), {
                  key: T,
                  label: T,
                  modelValue: b.value,
                  "onUpdate:modelValue": H[0] || (H[0] = (D) => b.value = D),
                  value: T
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            H[10] || (H[10] = f("hr", null, null, -1)),
            f("div", x2, [
              (h(), y(me, null, Se(C, (T) => Y(w(wn), {
                key: T,
                label: T,
                modelValue: b.value,
                "onUpdate:modelValue": H[1] || (H[1] = (D) => b.value = D),
                value: T
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            f("div", y2, [
              f("div", k2, [
                H[7] || (H[7] = f("h3", null, "Cohort", -1)),
                f("div", v2, [
                  (h(), y(me, null, Se(S, (T) => Y(w(wn), {
                    key: T,
                    label: T,
                    modelValue: b.value,
                    "onUpdate:modelValue": H[2] || (H[2] = (D) => b.value = D),
                    value: T
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", _2, [
                H[8] || (H[8] = f("h3", null, "Clean Room", -1)),
                f("div", b2, [
                  (h(), y(me, null, Se(V, (T) => Y(w(wn), {
                    key: T,
                    label: T,
                    modelValue: b.value,
                    "onUpdate:modelValue": H[3] || (H[3] = (D) => b.value = D),
                    value: T
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", E2, [
                H[9] || (H[9] = f("h3", null, "WPP Open", -1)),
                f("div", S2, [
                  (h(), y(me, null, Se(J, (T) => Y(w(wn), {
                    key: T,
                    label: T,
                    modelValue: b.value,
                    "onUpdate:modelValue": H[4] || (H[4] = (D) => b.value = D),
                    value: T
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ])
            ])
          ])
        ]),
        footer: Ot(() => [
          Y(w(dt), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: G
          }),
          Y(w(dt), {
            type: "primary",
            label: "Push",
            onClick: z
          })
        ]),
        _: 1
      });
    };
  }
}, b0 = /* @__PURE__ */ Qe(A2, [["__scopeId", "data-v-faf4ae39"]]), w2 = [
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
}, E0 = {
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
      default: "https://sm-standard-segments-838902823068.europe-west1.run.app",
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
    U([]);
    const m = on(), C = U(null), S = U(null), V = U(!1), J = U([]), G = U(""), z = U([]), K = U(""), H = U(""), I = U(!1), T = [
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
    ], D = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], Z = U(T[0]), xe = U(D[0]), pe = U(!1), ce = U([
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
    ]), de = [
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
    ], q = U({}), $ = U(""), F = U({
      sortColumn: "name",
      sortOrder: 1
    });
    function P() {
      m.set_selectedSegmentType("standard"), m.set_selectedSegment($.value), b("showInsightsExplorer", $.value);
    }
    async function ke() {
      var x;
      if (!((x = $.value) != null && x.segmentId))
        return;
      const M = `${a.baseUrl}/api/v1/segments/${$.value.segmentId}`;
      try {
        const re = await fetch(M, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!re.ok) {
          const bt = await re.text();
          throw new Error(bt || "Failed to delete segment");
        }
        $.value = "", await m.fetch_segments(K.value);
      } catch (re) {
        console.error("Error deleting segment:", re);
      }
    }
    function Be(M) {
      return M.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (x) => x.toUpperCase());
    }
    function Ge(M) {
      return M == null ? "" : (typeof M == "string" ? parseInt(M, 10) : M).toLocaleString();
    }
    function Oe(M) {
      q.value = M, m.set_filterQuery(M), m.fetch_segments(K.value);
    }
    async function it(M) {
      if (M && m.get_isLastPage && !pe.value && m.get_segments && m.get_segments.length > 0) {
        pe.value = !0;
        try {
          await m.fetch_nextSegmentPage(K.value), pe.value = !1;
        } catch {
          pe.value = !1;
        }
      }
    }
    async function _t() {
      ce.value.map((M) => {
        M.key !== "market" && (M.model = "");
      }), m.reset_filterQuery(), await m.fetch_segments(K.value);
    }
    function un(M) {
      F.value = M;
    }
    function cn() {
      V.value = !V.value;
    }
    function Tt(M) {
      $.value = M.row;
    }
    function Dt() {
      I.value = !0;
    }
    async function Hn() {
      await m.set_token(a.token), await m.set_brandId(a.brandId), await m.set_tenantId(a.tenantId), await m.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? $.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && ($.value = a.selectedSegment), await m.fetch_segment_settings(a.brandId);
      try {
        const M = await m.get_segment_settings;
        M && (z.value = await M.platforms.map((x) => ({
          value: x.platform_id,
          label: x.platform,
          locations: x.locations.map((re) => ({
            value: re.value,
            label: re.display_name
          }))
        }))), K.value = z.value[0].value;
      } catch (M) {
        console.log(M);
      }
    }
    return Tn(() => {
      S.value = C.value, Hn();
    }), ln(K, async (M, x) => {
      M && x !== M && (J.value = z.value[M - 1].locations, G.value = J.value[0].value, pe.value = !0, m.set_platform(M), await m.fetch_segments(M), Z.value = T[0], pe.value = !1);
    }), ln(H, async (M) => {
      M && (M == null ? void 0 : M.length) < 3 || (m.set_searchTerm(M), m.fetch_segments(K.value));
    }), ln(G, async (M) => {
      m.set_locationQuery(M), m.fetch_segments(K.value);
    }), ln(F, async (M) => {
      m.set_sortQuery(M), m.fetch_segments(K.value);
    }), ln(Z, async (M) => {
      const x = M.id;
      m.set_categoryQuery(x), m.fetch_segments();
    }), Ve(() => C2.charts.map((M) => {
      var Et, Rt;
      const x = E0[M.type] || ((Et = M.type) == null ? void 0 : Et.toLowerCase()), re = Fa[x] || {};
      console.log("type", x), console.log("baseOptions", re);
      let bt = {}, It = [];
      return x === "line" || x === "area" ? (bt = {
        xaxis: {
          categories: M.data.map((De) => De.key),
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
      }, It = [{
        name: ((Rt = M.data[0]) == null ? void 0 : Rt.valueType) || "Value",
        data: M.data.map((De) => Number(De.value))
      }]) : x === "bar" ? (bt = {
        xaxis: {
          categories: M.data.map((De) => De.key)
        }
      }, It = [{
        name: M.title,
        data: M.data.map((De) => Number(De.value))
      }]) : x === "donut" || x === "pie" ? (bt = {
        labels: M.data.map((De) => De.key)
      }, It = M.data.map((De) => Number(De.value))) : x === "bubble" && (It = [{
        name: M.title,
        data: M.data.map((De) => ({
          x: Number(De.x),
          y: Number(De.y),
          z: Number(De.z)
        }))
      }]), console.log("series", It), console.log("dynamicOptions", bt), {
        series: It,
        options: {
          ...re,
          ...bt,
          title: {
            ...re.title,
            text: M.title
          },
          chart: {
            // ...baseOptions.chart,
            type: x
          }
        },
        chartType: x
      };
    })), (M, x) => (h(), y(me, null, [
      f("div", T2, [
        f("div", D2, [
          f("div", I2, [
            f("div", L2, [
              Y(w($t), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: z.value,
                modelValue: K.value,
                "onUpdate:modelValue": x[0] || (x[0] = (re) => K.value = re),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              Y(w($t), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: J.value,
                modelValue: G.value,
                "onUpdate:modelValue": x[1] || (x[1] = (re) => G.value = re),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            Y(w(Vt), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: H.value,
              "onUpdate:modelValue": x[2] || (x[2] = (re) => H.value = re)
            }, null, 8, ["modelValue"])
          ]),
          f("div", B2, [
            f("div", F2, [
              f("div", $2, [
                Y(w(Ia), {
                  tabs: T,
                  modelValue: Z.value,
                  "onUpdate:modelValue": x[3] || (x[3] = (re) => Z.value = re),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              f("div", V2, [
                Y(w(Pt), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: x[4] || (x[4] = (re) => cn())
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
              Y(Ph, {
                stickyHeader: 0,
                columns: de,
                rows: w(m).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: x[5] || (x[5] = (re) => Tt(re)),
                onColumnSorted: x[6] || (x[6] = (re) => un(re)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              pe.value ? (h(), y("div", P2, [
                Y(w(zn), { size: "xlarge" })
              ])) : B("", !0),
              Y(Wh, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: x[7] || (x[7] = (re) => it(re))
              })
            ], 512),
            V.value ? (h(), ue(Uh, {
              key: 0,
              filters: ce.value,
              onClearFilters: x[8] || (x[8] = (re) => _t()),
              onFilterChange: x[9] || (x[9] = (re) => Oe(re))
            }, null, 8, ["filters"])) : B("", !0)
          ])
        ]),
        f("div", R2, [
          f("div", {
            class: Ue(["outer-wrapper-segment-details", { "standard-empty": !$.value }])
          }, [
            $.value ? (h(), y("div", G2, [
              $.value ? (h(), y("div", M2, ne($.value.name), 1)) : B("", !0),
              x[24] || (x[24] = f("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              f("div", U2, [
                $.value.name ? (h(), y("div", W2, [
                  x[15] || (x[15] = f("div", { class: "description-term" }, "Name", -1)),
                  f("div", N2, ne($.value.name), 1)
                ])) : B("", !0),
                $.value.description ? (h(), y("div", q2, [
                  x[16] || (x[16] = f("div", { class: "description-term" }, "Description", -1)),
                  f("div", z2, ne($.value.description), 1)
                ])) : B("", !0),
                $.value.sourceCreatedDate ? (h(), y("div", H2, [
                  x[17] || (x[17] = f("div", { class: "description-term" }, "Created", -1)),
                  f("div", Q2, ne(w(Cn)($.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                $.value.sourceUpdatedDate ? (h(), y("div", K2, [
                  x[18] || (x[18] = f("div", { class: "description-term" }, "Updated", -1)),
                  f("div", Y2, ne(w(Cn)($.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                $.value.status ? (h(), y("div", Z2, [
                  x[19] || (x[19] = f("div", { class: "description-term" }, "Status", -1)),
                  f("div", J2, ne($.value.status.value), 1)
                ])) : B("", !0),
                $.value.expiration_date ? (h(), y("div", X2, [
                  x[20] || (x[20] = f("div", { class: "description-term" }, "Expiration", -1)),
                  f("div", j2, ne($.value.expiration_date), 1)
                ])) : B("", !0),
                $.value.id ? (h(), y("div", em, [
                  x[21] || (x[21] = f("div", { class: "description-term" }, "Segmnent ID", -1)),
                  f("div", tm, ne($.value.id), 1)
                ])) : B("", !0),
                $.value.audience_id ? (h(), y("div", nm, [
                  x[22] || (x[22] = f("div", { class: "description-term" }, "Audience ID", -1)),
                  f("div", im, ne($.value.audience_id), 1)
                ])) : B("", !0),
                $.value.count ? (h(), y("div", rm, [
                  x[23] || (x[23] = f("div", { class: "description-term" }, "Last count", -1)),
                  f("div", am, ne(Ge($.value.count)), 1),
                  $.value.refreshCountDate ? (h(), y("span", sm, " (" + ne(w(Cn)($.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : B("", !0)
                ])) : B("", !0),
                $.value.platform_specific ? (h(!0), y(me, { key: 9 }, Se($.value.platform_specific, (re) => (h(), y("div", lm, [
                  f("div", om, ne(Be(re.label)), 1),
                  f("div", um, ne(re.value), 1)
                ]))), 256)) : B("", !0)
              ]),
              f("div", null, [
                Y(w(Ia), {
                  tabs: D,
                  modelValue: xe.value,
                  "onUpdate:modelValue": x[10] || (x[10] = (re) => xe.value = re),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                xe.value.id === 2 ? (h(), ue(e2, {
                  key: 0,
                  query: $.value.query
                }, null, 8, ["query"])) : B("", !0)
              ])
            ])) : B("", !0),
            $.value ? B("", !0) : (h(), y("div", cm, [
              f("div", null, [
                f("img", {
                  class: "",
                  alt: "standardIcon",
                  src: w(_0)
                }, null, 8, dm)
              ]),
              x[25] || (x[25] = f("div", { class: "standard-view-title" }, [
                f("div", null, "Select a standard segment from the list"),
                f("div", null, "or"),
                f("div", null, [
                  f("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          $.value.name ? (h(), y("div", fm, [
            f("div", pm, [
              x[26] || (x[26] = f("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              f("div", hm, [
                f("span", null, ne($.value.name ? `${`${$.value.name} - `}` : "none"), 1),
                f("span", null, ne(Ge($.value.count)), 1)
              ])
            ]),
            f("div", null, [
              Y(w(dt), {
                type: "secondary",
                label: "Explore",
                onClick: x[11] || (x[11] = (re) => P()),
                class: "mr-2"
              }),
              Y(w(dt), {
                type: "delete",
                label: "Delete",
                onClick: x[12] || (x[12] = (re) => ke()),
                class: "mr-2 redButton"
              }),
              Y(w(dt), {
                type: "primary",
                label: "Push to destination",
                onClick: x[13] || (x[13] = (re) => Dt())
              })
            ])
          ])) : B("", !0)
        ])
      ]),
      I.value ? (h(), ue(b0, {
        key: 0,
        onClose: x[14] || (x[14] = (re) => I.value = !1)
      })) : B("", !0)
    ], 64));
  }
}, gm = /* @__PURE__ */ Qe(mm, [["__scopeId", "data-v-4765dd48"]]), xm = { class: "feedback-title-wrapper" }, ym = { class: "title" }, km = { class: "feedback-text" }, vm = {
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
      var m, C, S;
      return o.feedback ? (h(), y("div", {
        key: 0,
        class: Ue(["ai-query-feedback", [o.feedback.type]])
      }, [
        f("div", xm, [
          Y(w(Pt), {
            class: "pr-2",
            size: "16px",
            icon: L[(m = o.feedback) == null ? void 0 : m.type],
            color: L[`icon-color-${(C = o.feedback) == null ? void 0 : C.type}`]
          }, null, 8, ["icon", "color"]),
          f("div", ym, ne(o.feedback.title), 1)
        ]),
        f("p", km, ne((S = o.feedback) == null ? void 0 : S.text), 1)
      ], 2)) : B("", !0);
    };
  }
}, h0 = /* @__PURE__ */ Qe(vm, [["__scopeId", "data-v-8b6b4205"]]), _m = { key: 0 }, bm = { class: "d-flex justify-content-between" }, Em = { class: "query-results" }, Sm = { class: "query-result" }, Am = { class: "query-result-count" }, wm = {
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
    U(!1);
    const m = U(!1), C = {
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
    }, S = [
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
    function V() {
      a("explore-insights");
    }
    function J(G) {
      return G == null ? "" : (typeof G == "string" ? parseInt(G, 10) : G).toLocaleString();
    }
    return (G, z) => (h(), y("div", null, [
      o.savingDraft ? B("", !0) : (h(), y("div", _m, [
        f("div", bm, [
          z[1] || (z[1] = f("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          m.value ? (h(), ue(w(dt), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: z[0] || (z[0] = (K) => V())
          })) : B("", !0)
        ]),
        f("div", Em, [
          f("div", Sm, [
            z[2] || (z[2] = nt(" Segment size ")),
            f("span", Am, ne(J(b.segmentCount)), 1),
            z[3] || (z[3] = nt(" records. "))
          ])
        ]),
        m.value ? (h(), y("div", wm, [
          Y(w(La), {
            options: C,
            series: S
          })
        ])) : B("", !0)
      ])),
      o.savingDraft ? (h(), y("div", Cm, [
        Y(w(zn), { size: "xlarge" }),
        z[4] || (z[4] = f("p", null, "Connecting to Open Intelligence...", -1))
      ])) : B("", !0)
    ]));
  }
}, Dm = /* @__PURE__ */ Qe(Tm, [["__scopeId", "data-v-dea42952"]]), Im = { class: "query-attributes" }, Lm = ["onClick", "onKeydown"], Bm = {
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
    function m(C, S) {
      return S[C];
    }
    return (C, S) => (h(), y("div", Im, [
      o.fetching ? (h(), ue(w(zn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : B("", !0),
      (h(!0), y(me, null, Se(o.tables, (V) => (h(), y("div", {
        class: Ue(["query-attributes-group", { closed: o.collapsed.includes(V.display_name) }]),
        key: V.display_name
      }, [
        f("div", {
          class: "query-attributes-group-toggle",
          onClick: (J) => b(V.display_name),
          onKeydown: $a((J) => b(V.display_name), ["enter"])
        }, [
          S[3] || (S[3] = f("span", { class: "arrow" }, null, -1)),
          nt(" " + ne(V.display_name), 1)
        ], 40, Lm),
        o.collapsed.includes(V.display_name) ? B("", !0) : (h(), y("div", Bm, [
          Y(w(Ba), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (J) => m(J, V.columns),
            onDragEnd: S[2] || (S[2] = (J) => C.$emit("drag-end"))
          }, {
            default: Ot(() => [
              (h(!0), y(me, null, Se(V.columns, (J) => (h(), ue(w(uh), {
                key: J.display_name
              }, {
                default: Ot(() => [
                  f("div", {
                    class: "attribute",
                    onMousedown: S[0] || (S[0] = (G) => C.$emit("drag-start")),
                    onMouseup: S[1] || (S[1] = (G) => C.$emit("drag-end"))
                  }, [
                    Y(w(Pt), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    f("div", {
                      class: "attribute-content",
                      onClick: sh((G) => C.$emit("click-attribute", J), ["stop"])
                    }, [
                      f("span", $m, ne(J.type), 1),
                      f("span", Vm, ne(J.display_name), 1)
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
}, Pm = /* @__PURE__ */ Qe(Om, [["__scopeId", "data-v-d9536002"]]), Rm = { class: "freeform-tab" }, Gm = {
  __name: "FreeForm",
  setup(o) {
    ar();
    const L = U("");
    return (a, b) => (h(), y("div", Rm, [
      Y(w(Vt), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: L.value,
        "onUpdate:modelValue": b[0] || (b[0] = (m) => L.value = m)
      }, null, 8, ["modelValue"])
    ]));
  }
}, Mm = /* @__PURE__ */ Qe(Gm, [["__scopeId", "data-v-87b28c22"]]), Um = { class: "query-builder" }, Wm = { class: "query-builder-left" }, Nm = { class: "query-tabs" }, qm = { class: "source" }, zm = {
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
      default: "https://sm-standard-segments-838902823068.europe-west1.run.app",
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
    U();
    const S = [
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
    ], V = U(S[0]), J = U([]), G = U(J.value[0]), z = U([]), K = U(z.value[0]), H = U(""), I = U(null), T = U(!1), D = U(null), Z = U(!0), xe = U(!1), pe = U([]), ce = U([]), de = U(!1), q = U(!1), $ = U(""), F = U(""), P = U(!1), ke = U(!1), Be = U(!1), Ge = U(""), Oe = U(!1), it = U(!1), _t = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], un = [
      { value: "$eq", label: "equal" }
    ], cn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$in", label: "in" },
      { value: "$nin", label: "not in" }
    ], Tt = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$bw", label: "begins with" },
      { value: "$nbw", label: "not begins with" },
      { value: "$ew", label: "ends with" },
      { value: "$new", label: "not ends with" }
    ], Dt = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$bt", label: "between" },
      { value: "$nbt", label: "not between" }
    ], Hn = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], M = U(0), x = U({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), re = () => {
      b.set_selectedSegmentType("custom"), b.set_activeTab("custom"), b.set_selectedSegment(I.value), C("showInsightsExplorer", I.value);
    };
    function bt(X) {
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
      let W = "$and";
      return X.reduce((be, O) => {
        if (O.logic)
          return W = O.logic, be;
        if (Array.isArray(O.group)) {
          const le = O.group.filter((Ke) => Ke.statement).map((Ke) => {
            const [Yt, Zt, mn] = Ke.statement;
            return {
              field: Yt,
              operator: A[Zt] || Zt,
              value: mn,
              type: Ke.input_type
            };
          });
          return [
            ...be,
            {
              logic: W,
              conditions: le
            }
          ];
        }
        return be;
      }, []);
    }
    async function It(X) {
      const A = {
        brandName: a.brandName,
        name: X.name,
        description: X.description,
        count: X.count || H.value,
        market: b.query.demographics.market
      }, W = `https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments/insights/${X.segmentId}`, be = await fetch(W, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(A)
      });
      if (!be.ok) {
        const O = await be.json();
        throw new Error(O.message || "Failed to generate insights");
      }
      await be.json();
    }
    async function Et() {
      Ge.value = "saving", Oe.value = !1, Be.value = !0;
      const X = {
        platformId: K.value,
        count: H.value,
        region: b.query.demographics.region,
        market: b.query.demographics.market,
        description: x.value.description,
        name: x.value.name,
        query: bt(x.value.conditions)
      };
      try {
        const A = await fetch("https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          },
          body: JSON.stringify(X)
        }), W = await A.json();
        if (!A.ok)
          throw new Error(W.message || "Failed to save segment");
        ke.value = !0, q.value = !0, Ge.value = "generating", I.value = W.data[0], await It(W.data[0]), Ge.value = "done";
      } catch (A) {
        console.error("Error saving segment or generating insights:", A), Ge.value = "";
      } finally {
        Be.value = !1, Oe.value = !0;
      }
    }
    async function Rt() {
      P.value = !0;
      const X = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: F.value
      };
      x.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const A = await m.generate_ai_query(X, K.value, G.value), W = {
        text: A.message,
        type: A.query ? "info" : "warning",
        title: "AI Assumption"
      }, be = {
        text: A.query,
        type: "query",
        title: "Query Gen"
      };
      m.set_ai_generated_message(W), m.set_ai_generated_query(be), A.attrs.forEach((O, le) => {
        le === 0 ? D.value = "queryGroupDrop" : D.value = x.value.conditions[0].id;
        const Ke = String(O.value), Yt = /* @__PURE__ */ new Set([Ke]);
        Array.isArray(O.valueOptions) && O.valueOptions.forEach((mn) => {
          Yt.add(String(mn));
        });
        const Zt = {
          payload: {
            display_name: O.field,
            input_type: O.input_type,
            operators: O.operator,
            selectors: Array.from(Yt)
            // No dups, formatted correctly
          }
        };
        qe(Zt), c0();
      }), P.value = !1;
    }
    async function De() {
      x.value.conditions.forEach((X) => {
        Array.isArray(X.group) && (X == null || X.group.forEach((A) => {
          A.input_type === "select" && A.statement[2].length > 1 && A.statement[1] === "$eq" && (A.statement[1] = "$in"), A.input_type === "select" && A.statement[2].length > 1 && A.statement[1] === "$neq" && (A.statement[1] = "$nin");
        }));
      });
    }
    async function dn() {
      de.value = !0, V.value.id === 1 && await De(), H.value = await m.run_query(x.value, K.value, G.value), H.value && (q.value = !0), de.value = !1, ke.value = !1;
    }
    function Kt(X, A) {
      var be, O;
      return X === "operatorsQueries" ? (be = _t.find((le) => le.value === A)) == null ? void 0 : be.label : (O = fi(X).find((le) => le.value === A)) == null ? void 0 : O.label;
    }
    function fi(X) {
      switch (X) {
        case "select":
          return cn;
        case "boolean":
          return un;
        case "string":
          return Tt;
        case "date":
          return Dt;
        case "int":
          return Hn;
        default:
          return [];
      }
    }
    function fn(X) {
      T.value = X;
    }
    async function In() {
      xe.value = !0, await m.fetch_database_model(K.value, G.value), xe.value = !1;
    }
    async function pi() {
      Z.value = !0, await m.fetch_custom_segment_settings();
      const X = await m.get_segment_settings;
      X && (z.value = await X.platforms.map((A) => ({
        value: A.platform_id,
        label: A.platform,
        locations: A.locations.map((W) => ({
          value: W.value,
          label: W.display_name
        }))
      })), K.value = z.value[0].value), Z.value = !1;
    }
    function qe(X) {
      console.log(X);
      const A = X.payload ? X.payload : X;
      if (M.value < m.settings.maxSubQuery) {
        const W = A.selectors.map((le) => ({
          value: le,
          label: le
        }));
        let be = [];
        W.length > 2 ? be[0] = W[0].value : W.length > 0 ? be = W[0].value : be = null;
        const O = W.length > 0 && A.input_type !== "boolean" ? "select" : A.input_type;
        if (D.value === "queryGroupDrop") {
          M.value += 1, x.value.conditions.length > 0 && x.value.conditions.push({ logic: "$or" });
          const le = {
            id: Ca(),
            group: [
              {
                id: Ca(),
                statement: [A.display_name, "$eq", be],
                selectors: W,
                input_type: O
              }
            ]
          };
          x.value.conditions.push(le);
        } else if (D.value !== null) {
          M.value += 1;
          const le = x.value.conditions.findIndex(
            (Ke) => Ke.id === D.value
          );
          le !== -1 && (x.value.conditions[le].group.push({ logic: "$and" }), x.value.conditions[le].group.push({
            id: Ca(),
            statement: [A.display_name, "$eq", be],
            selectors: W,
            input_type: O
          }));
        }
        D.value = null;
      }
    }
    function pn(X) {
      var A;
      (A = x.value.conditions[0]) != null && A.id ? D.value = x.value.conditions[0].id : D.value = "queryGroupDrop", qe(X), c0();
    }
    function lr(X, A, W) {
      if (x.value.conditions[A].group.length === 1)
        x.value.conditions.length > A + 1 ? x.value.conditions.splice(A, 2) : x.value.conditions.splice(A, 1), M.value -= 1;
      else {
        const be = x.value.conditions[A].group.findIndex(
          (O) => O.id === W
        );
        x.value.conditions[A].group.splice(be - 1, 2), M.value -= 1;
      }
    }
    function ft(X) {
      const A = pe.value.indexOf(X);
      A >= 0 ? pe.value.splice(A, 1) : pe.value.push(X);
    }
    function hi(X) {
      const A = ce.value.indexOf(X);
      A >= 0 ? ce.value.splice(A, 1) : ce.value.push(X);
    }
    function or() {
      H.value = "", x.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function hn() {
      x.value = { ...x.value, count: H.value }, V.value.id === 3 && (x.value = {
        ...x.value,
        freeForm: m.freeFormQuery
      }), C("insertSegment", x.value), it.value = !0;
    }
    async function rt() {
      await b.set_token(a.token), await b.set_brandId(a.brandId), await b.set_tenantId(a.tenantId), await m.set_customSegmentUrl(a.customSegmentUrl), await m.fetch_custom_segment_settings(), await pi();
    }
    return Tn(() => {
      rt();
    }), ln(K, async (X, A) => {
      X && A !== X && (J.value = z.value.find((W) => W.value == X).locations, G.value = J.value[0].value, await or(), await In());
    }), ln(V, async (X, A) => {
      X && A !== X && X.id === 2 && (F.value = "", m.set_ai_generated_message(null), m.set_ai_generated_query(null));
    }), (X, A) => (h(), y("div", Um, [
      f("div", Wm, [
        Z.value ? (h(), ue(w(zn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), y(me, { key: 1 }, [
          f("div", Nm, [
            Y(w(Ia), {
              tabs: S,
              modelValue: V.value,
              "onUpdate:modelValue": A[0] || (A[0] = (W) => V.value = W),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          f("div", qm, [
            Y(w($t), {
              style: { width: "45%" },
              class: "source w-100",
              options: z.value,
              modelValue: K.value,
              "onUpdate:modelValue": A[1] || (A[1] = (W) => K.value = W),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            Y(w($t), {
              style: { width: "45%" },
              class: "source w-100",
              options: J.value,
              modelValue: G.value,
              "onUpdate:modelValue": A[2] || (A[2] = (W) => G.value = W),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            w(b).brief.market ? (h(), ue(w(Vt), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: w(b).brief.market,
              "onUpdate:modelValue": A[3] || (A[3] = (W) => w(b).brief.market = W),
              label: "Market"
            }, null, 8, ["modelValue"])) : B("", !0)
          ]),
          K.value && G.value ? (h(), y(me, { key: 0 }, [
            V.value.id === 1 ? (h(), ue(Pm, {
              key: 0,
              tables: w(m).get_databaseModel.tables,
              collapsed: ce.value,
              fetching: xe.value,
              onClickAttribute: pn,
              onDragStart: A[4] || (A[4] = (W) => fn(!0)),
              onDragEnd: A[5] || (A[5] = (W) => fn(!1)),
              onToggleGroup: hi
            }, null, 8, ["tables", "collapsed", "fetching"])) : B("", !0),
            V.value.id === 2 ? (h(), y("div", zm, [
              Y(w(Vt), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: F.value,
                "onUpdate:modelValue": A[6] || (A[6] = (W) => F.value = W)
              }, null, 8, ["modelValue"]),
              Y(w(dt), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !F.value,
                loading: P.value,
                onClick: A[7] || (A[7] = (W) => Rt())
              }, null, 8, ["disabled", "loading"]),
              w(m).get_aiGeneratedMessage ? (h(), ue(h0, {
                key: 0,
                feedback: w(m).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : B("", !0),
              w(m).get_aiGeneratedQuery ? (h(), ue(h0, {
                key: 1,
                feedback: w(m).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : B("", !0)
            ])) : B("", !0),
            V.value.id === 3 ? (h(), y("div", Hm, [
              Y(Mm)
            ])) : B("", !0)
          ], 64)) : B("", !0)
        ], 64))
      ]),
      f("div", Qm, [
        f("div", Km, [
          f("div", Ym, [
            f("div", null, [
              A[16] || (A[16] = f("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              f("div", Zm, [
                Y(w(dt), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !K.value || !G.value,
                  loading: de.value,
                  onClick: A[8] || (A[8] = (W) => dn())
                }, null, 8, ["disabled", "loading"]),
                Y(w(dt), {
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !x.value.name || !x.value.description || !H.value || ke.value,
                  loading: Be.value,
                  onClick: A[9] || (A[9] = (W) => Et())
                }, null, 8, ["disabled", "loading"])
              ])
            ]),
            V.value.id !== 3 ? (h(), y("div", Jm, [
              f("div", Xm, [
                (h(!0), y(me, null, Se(x.value.conditions, (W, be) => (h(), y("div", {
                  class: "query-outer",
                  key: W.id
                }, [
                  W.group ? (h(), y("div", jm, [
                    f("div", {
                      class: "collapse-subQuery",
                      onClick: (O) => ft(W.id),
                      onKeydown: $a((O) => ft(W.id), ["enter"])
                    }, [
                      Y(w(Pt), {
                        icon: pe.value.indexOf(W.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, eg),
                    f("div", tg, [
                      pe.value.indexOf(W.id) === -1 ? (h(), y("div", ng, [
                        (h(!0), y(me, null, Se(W.group, (O) => (h(), y("div", ig, [
                          O.logic && pe.value.indexOf(W.id) === -1 ? (h(), y("div", rg, [
                            Y(w($t), {
                              class: "query-operator",
                              modelValue: O.logic,
                              "onUpdate:modelValue": (le) => O.logic = le,
                              singleSelect: !0,
                              options: _t,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : B("", !0),
                          O.statement ? (h(), y("div", {
                            key: 1,
                            class: Ue(["sub-query", { "single-subquery": W.group.length === 1 }])
                          }, [
                            Y(w(Vt), {
                              readonly: "",
                              modelValue: O.statement[0],
                              "onUpdate:modelValue": (le) => O.statement[0] = le
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            Y(w($t), {
                              modelValue: O.statement[1],
                              "onUpdate:modelValue": (le) => O.statement[1] = le,
                              singleSelect: !0,
                              options: fi(O.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            O.selectors.length < 3 && O.selectors.length > 0 ? (h(), ue(w($t), {
                              key: 0,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (le) => O.statement[2] = le,
                              options: O.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            O.selectors.length > 2 && O.input_type !== "boolean" ? (h(), ue(w($t), {
                              key: 1,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (le) => O.statement[2] = le,
                              options: O.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            O.input_type === "int" ? (h(), ue(w(Vt), {
                              key: 2,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (le) => O.statement[2] = le,
                              error: O.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : B("", !0),
                            O.input_type === "string" ? (h(), ue(w(Vt), {
                              key: 3,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (le) => O.statement[2] = le,
                              error: O.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : O.input_type === "date" ? (h(), ue(w(x0), {
                              key: 4,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (le) => O.statement[2] = le,
                              range: O.statement[1] === "$bt" || O.statement[1] === "$nbt",
                              error: O.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : B("", !0),
                            Y(w(Pt), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (le) => lr(W.id, be, O.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : B("", !0)
                        ]))), 256))
                      ])) : (h(), y("p", ag, [
                        (h(!0), y(me, null, Se(W.group, (O, le) => (h(), y("span", {
                          key: O.id
                        }, [
                          O.statement ? (h(), y("span", sg, [
                            f("b", null, ne(O == null ? void 0 : O.statement[0]), 1),
                            nt(" " + ne(Kt(O.input_type, O == null ? void 0 : O.statement[1])) + " ", 1),
                            f("b", null, ne((O == null ? void 0 : O.statement[2]) || "?"), 1)
                          ])) : (h(), y("span", lg, ne(Kt("operatorsQueries", O.logic)), 1))
                        ]))), 128))
                      ])),
                      T.value && M.value < w(m).settings.maxSubQuery ? (h(), ue(w(Ba), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (O) => D.value = W.id,
                        onDrop: qe
                      }, {
                        default: Ot(() => A[17] || (A[17] = [
                          f("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : B("", !0)
                    ])
                  ])) : B("", !0),
                  x.value.conditions.length > 1 && be < x.value.conditions.length - 1 && W.logic ? (h(), y("div", og, [
                    Y(w($t), {
                      class: "query-operator",
                      modelValue: W.logic,
                      "onUpdate:modelValue": (O) => W.logic = O,
                      singleSelect: !0,
                      options: _t,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : B("", !0)
                ]))), 128))
              ]),
              x.value.conditions.length === 0 ? (h(), y("div", ug, [
                f("span", null, [
                  f("img", {
                    class: "",
                    alt: "standardIcon",
                    src: w(_0)
                  }, null, 8, cg)
                ])
              ])) : B("", !0),
              T.value && M.value < w(m).settings.maxSubQuery || x.value.conditions.length === 0 ? (h(), ue(w(Ba), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: A[10] || (A[10] = (W) => D.value = "queryGroupDrop"),
                onDrop: qe
              }, {
                default: Ot(() => [
                  f("div", {
                    class: Ue(["drop-indicator", {
                      "mt-25": x.value.conditions.length > 0,
                      "p-5": x.value.conditions.length === 0
                    }])
                  }, [
                    x.value.conditions.length <= 0 ? (h(), y("span", dg, " Drag and drop attributes or AI generated rules ")) : B("", !0)
                  ], 2)
                ]),
                _: 1
              })) : B("", !0)
            ])) : B("", !0)
          ]),
          de.value || q.value ? (h(), y("div", fg, [
            !de.value && q.value ? (h(), ue(Dm, {
              key: 0,
              segmentData: H.value,
              segmentCount: H.value
            }, null, 8, ["segmentData", "segmentCount"])) : B("", !0),
            de.value ? (h(), y("div", pg, [
              Y(w(zn), {
                size: "xlarge",
                class: "mt-3"
              }),
              A[18] || (A[18] = f("p", { class: "mt-3" }, "Running query...", -1))
            ])) : B("", !0),
            Ge.value === "saving" || Ge.value === "generating" ? (h(), y("div", hg, [
              Y(w(zn), {
                size: "xlarge",
                class: "mt-3"
              }),
              Ge.value === "saving" ? (h(), y("p", mg, "Saving segment...")) : (h(), y("p", gg, "Generating insights..."))
            ])) : B("", !0),
            Ge.value === "done" && I.value ? (h(), ue(p2, {
              key: 3,
              selectedSegment: I.value,
              location: "custom",
              onShowInsightsExplorer: re
            }, null, 8, ["selectedSegment"])) : B("", !0)
          ])) : B("", !0)
        ]),
        f("div", xg, [
          f("div", yg, [
            Y(w(Vt), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: x.value.name,
              "onUpdate:modelValue": A[11] || (A[11] = (W) => x.value.name = W),
              type: "text"
            }, null, 8, ["modelValue"]),
            Y(w(Vt), {
              class: "segment-name",
              label: "Segment description",
              modelValue: x.value.description,
              "onUpdate:modelValue": A[12] || (A[12] = (W) => x.value.description = W),
              type: "text"
            }, null, 8, ["modelValue"])
          ]),
          f("div", kg, [
            Y(w(dt), {
              type: "secondary",
              label: "Explore",
              size: "small",
              onClick: A[13] || (A[13] = (W) => re()),
              class: "mx-1",
              disabled: !H.value || !x.value.name && V.value.id === 1 || !x.value.name && V.value.id === 2 || x.value.conditions.length <= 0 && V.value.id !== 3 || !Oe.value
            }, null, 8, ["disabled"]),
            Y(w(dt), {
              size: "small",
              label: "Push to destination",
              disabled: !H.value || !x.value.name && V.value.id === 1 || !x.value.name && V.value.id === 2 || x.value.conditions.length <= 0 && V.value.id !== 3,
              onClick: A[14] || (A[14] = (W) => hn())
            }, null, 8, ["disabled"])
          ])
        ])
      ]),
      it.value ? (h(), ue(b0, {
        key: 0,
        onClose: A[15] || (A[15] = (W) => it.value = !1)
      })) : B("", !0)
    ]));
  }
}, _g = /* @__PURE__ */ Qe(vg, [["__scopeId", "data-v-6be8cfb2"]]), bg = { class: "tag-section" }, Eg = { class: "rating-card" }, Sg = { class: "header" }, Ag = { class: "title" }, wg = { class: "pb-2" }, Cg = { class: "content-wrapper" }, Tg = { class: "content" }, Dg = { class: "publishers" }, Ig = { class: "publisher-item" }, Lg = { class: "ratings" }, Bg = { class: "rating" }, Fg = {
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
    const L = U([]), a = o, b = Ve(() => a.charts.filter((C) => C.type === "bubble")), m = Ve(() => a.tags);
    return Tn(() => {
      L.value = new Array(b.value.length).fill(!1);
    }), (C, S) => (h(), y("div", bg, [
      (h(!0), y(me, null, Se(m.value, (V, J) => (h(), y("div", {
        class: Ue(["card-wrapper", { "full-width": V.section === "Owned Intelligence" }]),
        key: V.title + J
      }, [
        f("div", Eg, [
          f("div", Sg, [
            f("h2", Ag, [
              f("span", wg, ne(V.title), 1)
            ])
          ]),
          f("div", Cg, [
            f("div", Tg, [
              f("div", Dg, [
                (h(!0), y(me, null, Se(V.data[0].label, (G, z) => (h(), y("div", { key: G }, [
                  f("div", Ig, ne(G), 1),
                  f("div", Lg, [
                    f("div", Bg, [
                      (h(!0), y(me, null, Se(Math.floor(parseFloat(V.data[0].score[z])), (K, H) => (h(), y("span", {
                        key: `filled-${H}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), y(me, null, Se(5 - Math.floor(parseFloat(V.data[0].score[z])), (K, H) => (h(), y("span", {
                        key: `empty-${H}`,
                        class: "dot"
                      }))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            S[0] || (S[0] = f("div", { class: "logo-wrapper" }, [
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
}, m0 = /* @__PURE__ */ Qe(Fg, [["__scopeId", "data-v-8ab7bec3"]]), $g = { class: "chart-section-title my-3" }, Vg = { class: "chart-section" }, Og = { key: 0 }, Pg = { class: "chart-title" }, Rg = {
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
    const L = o, a = U([]), b = U([]), m = U(null), C = U(!1), S = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], V = (I, T) => {
      var Be, Ge;
      const D = "area", Z = Fa[D] || {}, xe = ((Be = I.data[0]) == null ? void 0 : Be.label) || [], ce = (((Ge = I.data[0]) == null ? void 0 : Ge.score) || []).map((Oe) => Number.isNaN(Number(Oe)) ? Oe : Number(Oe)), de = [{ name: I.title, data: ce }], q = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], $ = xe.map((Oe, it) => q[Math.floor(it / (52 / 12))]), F = [], P = /* @__PURE__ */ new Set();
      $.forEach((Oe) => {
        P.has(Oe) ? F.push("") : (F.push(Oe), P.add(Oe));
      });
      const ke = {
        xaxis: {
          categories: F,
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
        colors: [S[T % S.length]],
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
          custom: ({ series: Oe, seriesIndex: it, dataPointIndex: _t, w: un }) => {
            const cn = un.globals.labels[_t], Tt = Oe[it][_t];
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
                            <span style="font-weight: 600;">${Tt}</span>
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
        section: I.section,
        chartType: D,
        title: I.title === "Digital Media Consumption Index Weekly" ? "Digital Media Consumption Annual View" : I.title,
        series: de,
        options: {
          ...Z,
          ...ke,
          chart: {
            type: D,
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
    }, J = (I) => {
      if (!I)
        return "bar";
      const T = I.toString().toLowerCase().trim();
      return (T.includes("vertical") || T.includes("verical")) && (T.includes("bar") || T.includes("bars") || T.includes("chart")) || T === "horizontal" ? "bar" : T === "donut" ? "donut" : T === "pie" ? "pie" : T === "radar" ? "radar" : T === "line" ? "line" : T === "area" ? "area" : T;
    }, G = Ve(() => L.charts.filter((I) => I.data && I.data.length > 0).map((I, T) => {
      var $, F;
      const D = J(E0[I.type] || I.type), Z = Fa[D] || {}, xe = (($ = I.data[0]) == null ? void 0 : $.label) || [], ce = (((F = I.data[0]) == null ? void 0 : F.score) || []).map((P) => Number.isNaN(Number(P)) ? P : Number(P));
      let de = [], q = {};
      if (D === "horizontal")
        de = [{ name: I.title, data: ce }], q = {
          labels: xe,
          colors: [S[T % S.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (D === "bar" || D === "vertical bar" || D === "vertical bars" || D === "Vertical bars" || D === "vertical chart")
        I.title === "Digital Media Consumption Index Hourly" || I.title === "Digital Media Consumption Index Daily" ? (de = [{ name: "Indexed Consumption", data: ce }], q = {
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
          colors: [S[T % S.length]],
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
              const Oe = Ge.globals.labels[Be], it = P[ke][Be];
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
        }) : (I.title === "Personality archetype" && console.log(ce), de = [{ name: I.title, data: ce }], q = {
          labels: xe,
          colors: [S[T % S.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (D === "line" || D === "area")
          return V(I, T);
        D === "radar" ? (de = [{ name: I.title, data: ce }], q = { labels: xe }) : (D === "donut" || D === "pie") && (de = ce, q = { labels: xe });
      }
      return {
        section: I.section,
        chartType: D,
        title: I.title,
        series: de,
        options: {
          ...Z,
          ...q,
          chart: { type: D }
        }
      };
    }));
    Tn(() => {
      a.value = new Array(G.value.length).fill(!1), m.value && f0(
        m,
        ([I], T) => {
          I.isIntersecting && (C.value = !0, T.disconnect());
        },
        { threshold: 0.1 }
      );
    });
    const z = (I, T) => {
      if (!I || a.value[T])
        return;
      b.value[T] = I;
      const { stop: D } = f0(
        I,
        ([Z]) => {
          Z.isIntersecting && (a.value[T] = !0, D());
        },
        { threshold: 0.1 }
      );
    }, K = () => {
      const I = G.value.length;
      return I === 1 ? "full-width" : I === 2 ? "half-width" : "third-width";
    }, H = Ve(() => {
      const { paidSocial: I } = L, T = I.data.map((D) => D.name);
      return {
        chartType: "bar",
        title: I.title,
        section: I.section,
        description: I.description,
        series: [
          {
            name: "Audience",
            data: I.data.map((D) => Number(D.x))
          },
          {
            name: "Population",
            data: I.data.map((D) => Number(D.y))
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
            categories: T,
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
    return (I, T) => (h(), y("div", null, [
      f("h5", $g, ne(G.value[0].section.charAt(0).toUpperCase() + G.value[0].section.slice(1)), 1),
      f("div", Vg, [
        (h(!0), y(me, null, Se(G.value, (D, Z) => (h(), y("div", {
          key: D.title + Z,
          ref_for: !0,
          ref: (xe) => z(xe, Z),
          class: Ue(["chart-wrapper", K()])
        }, [
          a.value[Z] ? (h(), y("div", Og, [
            f("div", Pg, ne(D.title === "Digital Media Consumption Index Weekly" ? "Digital Media Consumption Annual View" : D.title), 1),
            Y(w(La), {
              options: D.options,
              series: D.series,
              type: D.chartType,
              width: "100%",
              height: D.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : B("", !0)
        ], 2))), 128))
      ]),
      G.value[0].section === "Paid Intelligence" ? (h(), ue(m0, {
        key: 0,
        tags: o.tags.slice(0, 2)
      }, null, 8, ["tags"])) : B("", !0),
      G.value[0].section === "Paid Intelligence" ? (h(), y("h5", Rg, ne(o.paidSocial.section), 1)) : B("", !0),
      G.value[0].section === "Paid Intelligence" ? (h(), y("div", Gg, [
        f("div", {
          ref_key: "paidSocialEl",
          ref: m,
          class: Ue(["chart-wrapper", { "full-width": !0 }])
        }, [
          f("div", Mg, ne(o.paidSocial.title), 1),
          C.value ? (h(), ue(w(La), {
            key: 0,
            options: H.value.options,
            series: H.value.series,
            type: "bar",
            width: "100%",
            height: "500"
          }, null, 8, ["options", "series"])) : B("", !0)
        ], 512)
      ])) : B("", !0),
      o.tags[2].section === "Owned Intelligence" && G.value[0].section === "Paid Intelligence" ? (h(), y("h5", Ug, ne(o.tags[2].section), 1)) : B("", !0),
      o.tags[2].section === "Owned Intelligence" && G.value[0].section === "Paid Intelligence" ? (h(), ue(m0, {
        key: 4,
        tags: o.tags.slice(2)
      }, null, 8, ["tags"])) : B("", !0)
    ]));
  }
}, Ng = /* @__PURE__ */ Qe(Wg, [["__scopeId", "data-v-2761b5b5"]]), qg = "5.12.1", zg = 25, Hg = 0, Qg = 100, Kg = 450, Yg = 450, Zg = "*Final5", Jg = 0, Xg = [], jg = [
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
    const a = L, b = on(), m = b.get_selectedSegment, C = U(null), S = Ve(() => C.value || {}), V = U(), J = U([]), G = U(!0), z = U([]);
    Tn(async () => {
      var I, T, D, Z, xe;
      if (m != null && m.segmentId)
        try {
          G.value = !0;
          const pe = await ci.get(
            `https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments/insights/${m != null && m.segmentId ? m == null ? void 0 : m.segmentId : (I = on.get_selectedSegment) == null ? void 0 : I.segmentId}`,
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
          (T = pe == null ? void 0 : pe.data) != null && T.data || a("apiError", {
            error: "Empty response",
            headline: "Error",
            message: "Sorry, an error occurred while getting your insights."
          }), C.value = (Z = (D = pe.data) == null ? void 0 : D.data) == null ? void 0 : Z[0];
          const ce = C.value.charts.reduce((de, q, $, F) => ($ < 2 ? (de[0] || (de[0] = []), de[0].push(q)) : $ < 5 ? (de[1] || (de[1] = []), de[1].push(q)) : (de[2] || (de[2] = []), de[2].push(q)), de), []);
          J.value = C.value.segments[0], z.value = Object.values(ce), await dh(3e3), G.value = !1;
        } catch (pe) {
          G.value = !1;
          const ce = {
            error: pe,
            headline: "Error",
            message: ((xe = pe == null ? void 0 : pe.response) == null ? void 0 : xe.data) || "Sorry, an error occurred while getting your insights."
          };
          a(ce);
        }
    }), Ve(() => {
      var I, T, D;
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
          categories: ((T = (I = m.thumbnail) == null ? void 0 : I.graph) == null ? void 0 : T.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((D = m.thumbnail) == null ? void 0 : D.title) || "",
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
      var I, T, D;
      return ((D = (T = (I = m.thumbnail) == null ? void 0 : I.graph) == null ? void 0 : T.seriesCombined) == null ? void 0 : D.map((Z) => ({
        name: Z.name,
        data: Z.data.map(Number)
      }))) || [];
    });
    const K = Ve(() => {
      var I, T, D, Z;
      return ((Z = (D = (T = (I = m.thumbnail) == null ? void 0 : I.segments) == null ? void 0 : T[0]) == null ? void 0 : D.segments) == null ? void 0 : Z.slice(0, 4)) || [];
    });
    Ve(() => K.value.map((D) => parseFloat(D.affinityScore || "0")).reduce((D, Z) => D + Z, 0).toFixed(2)), Ve(() => K.value.map((T) => parseInt(T.reach || "0", 10)).reduce((T, D) => T + D, 0).toLocaleString());
    function H(I) {
      return I == null ? "" : (typeof I == "string" ? parseInt(I, 10) : I).toLocaleString();
    }
    return (I, T) => {
      var D, Z, xe;
      return h(), y(me, null, [
        G.value ? (h(), y("div", i3, [
          Y(w(ch), {
            height: "40vh",
            ref_key: "anim",
            ref: V,
            "animation-data": w(n3),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          T[0] || (T[0] = f("h6", null, [
            nt("Generating Open Intelligence Insights"),
            f("span", { class: "dot-animate" }, [
              f("span", null, "."),
              f("span", null, "."),
              f("span", null, ".")
            ])
          ], -1))
        ])) : B("", !0),
        G.value ? B("", !0) : (h(), y("div", r3, [
          f("div", a3, [
            f("h6", s3, [
              f("div", l3, [
                f("div", o3, [
                  T[1] || (T[1] = f("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  nt(ne(((D = w(m)) == null ? void 0 : D.name) || "Segment Overview"), 1)
                ]),
                f("div", u3, [
                  T[2] || (T[2] = f("strong", null, "Count:", -1)),
                  nt(" " + ne(H((Z = w(m)) == null ? void 0 : Z.count)), 1)
                ]),
                f("div", c3, [
                  T[3] || (T[3] = f("strong", null, "Description:", -1)),
                  nt(" " + ne((xe = w(m)) == null ? void 0 : xe.description), 1)
                ])
              ]),
              T[4] || (T[4] = f("span", { class: "logo-wrapper" }, [
                f("span", null, "Enrichment Source:"),
                f("img", {
                  src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                  alt: "logo",
                  width: "120"
                })
              ], -1))
            ]),
            C.value ? (h(), y("div", d3, [
              f("div", f3, [
                f("div", p3, [
                  f("div", h3, [
                    (h(), ue(l2, {
                      key: I.index,
                      "segment-data": J.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ])) : B("", !0),
            C.value ? (h(!0), y(me, { key: 1 }, Se(z.value, (pe, ce) => {
              var de;
              return h(), y("div", {
                class: "charts-outer-wrapper",
                key: ((de = pe == null ? void 0 : pe[0]) == null ? void 0 : de.section) + ce
              }, [
                pe ? (h(), ue(Ng, {
                  key: 0,
                  charts: pe || [],
                  tags: S.value.tags || [],
                  paidSocial: C.value.paidSocial
                }, null, 8, ["charts", "tags", "paidSocial"])) : B("", !0)
              ]);
            }), 128)) : B("", !0)
          ])
        ]))
      ], 64);
    };
  }
}, g3 = /* @__PURE__ */ Qe(m3, [["__scopeId", "data-v-f49d0dc0"]]), x3 = { key: 0 }, y3 = { key: 1 }, k3 = {
  __name: "SegmentManagerModal",
  props: {
    baseUrl: {
      type: String,
      default: "https://sm-standard-segments-838902823068.europe-west1.run.app"
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
    const a = L, b = on(), m = ar(), C = o, S = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], V = U("standard"), J = U(S[0]), G = U(!1), z = U(null);
    function K(D) {
      z.value = D, G.value = !0;
    }
    function H() {
      a("close");
    }
    function I(D) {
      a("insertSegment", D);
    }
    function T() {
      G.value = !1;
    }
    return Tn(() => {
      b.set_brandId(C.brandId), b.set_token(C.token), b.set_tenantId(C.tenantId), b.set_baseUrl(C.baseUrl), m.set_customSegmentUrl(C.customSegmentUrl), V.value = b.get_activeTab;
    }), (D, Z) => (h(), ue(w(y0), {
      onClose: H,
      size: "large"
    }, {
      header: Ot(() => [
        G.value ? B("", !0) : (h(), y("div", x3, [
          Z[1] || (Z[1] = f("div", { class: "header" }, [
            f("h4", null, "Segment Manager")
          ], -1)),
          Y(w(oh), {
            tabs: S,
            modelValue: J.value,
            "onUpdate:modelValue": Z[0] || (Z[0] = (xe) => J.value = xe),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        G.value ? (h(), y("div", y3, [
          f("div", {
            onClick: T,
            class: "navigation"
          }, [
            Y(w(Pt), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            Z[2] || (Z[2] = f("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          Z[3] || (Z[3] = f("div", { class: "discovery-header" }, [
            f("div", { class: "discovery-header-title" }, [
              f("h6", null, "Segment Manager"),
              f("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ])
          ], -1))
        ])) : B("", !0)
      ]),
      body: Ot(() => [
        J.value.id === 1 && !G.value ? (h(), ue(gm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: I,
          onShowInsightsExplorer: K,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: z.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : B("", !0),
        J.value.id === 2 && !G.value ? (h(), ue(_g, {
          key: 1,
          onInsertSegment: I,
          onShowInsightsExplorer: K,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : B("", !0),
        G.value ? (h(), ue(g3, { key: 2 })) : B("", !0)
      ]),
      _: 1
    }));
  }
}, I3 = /* @__PURE__ */ Qe(k3, [["__scopeId", "data-v-59b52212"]]);
export {
  I3 as BetaSegmentManagerModal,
  _g as CustomSegments,
  g3 as ExploreInsights,
  gm as StandardSegments,
  ar as useCustomSegmentStore,
  on as useSegmentManagerStore
};
