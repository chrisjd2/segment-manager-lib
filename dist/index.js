import { ref as q, computed as Fe, watch as on, createElementBlock as x, openBlock as h, normalizeClass as We, createElementVNode as f, createCommentVNode as B, normalizeStyle as _n, createBlock as pe, unref as S, Fragment as xe, renderList as Ae, createTextVNode as nt, toDisplayString as ie, withKeys as $a, renderSlot as ji, createVNode as Z, onMounted as Sn, onUnmounted as rh, resolveComponent as g0, withCtx as $t, withModifiers as ah, nextTick as c0 } from "vue";
import { CataUiInputCheckbox as bn, CataUiIcon as Vt, CataUiStatusLabel as sh, CataUiInputDate as x0, CataUiInputSelect as Bt, CataUiInput as Ft, CataUiButton as it, CataUiTooltip as d0, CataUiModal as y0, CataUiTabs as Ia, CataUiSpinner as Wn, CataUiTabSwitch as lh } from "@catalyst/ui-library";
import { defineStore as k0 } from "pinia";
import li from "axios";
import En from "dayjs";
import { CataCoreUiChart as La } from "@catalyst-core/ui-library";
import { v4 as Ca } from "uuid";
import { Container as Ba, Draggable as oh } from "vue3-smooth-dnd";
import { LottieAnimation as uh } from "lottie-web-vue";
import { useIntersectionObserver as f0, promiseTimeout as ch } from "@vueuse/core";
const dh = {
  async fetch_database_model(o, T) {
    try {
      const a = await gh(o, T);
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
    var T;
    try {
      const a = await xh(o);
      this.set_custom_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((T = a.response) == null ? void 0 : T.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(b);
    }
  },
  async generate_ai_query(o, T) {
    var a;
    try {
      return (await kh(o, T)).data;
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
    var T;
    try {
      const a = await validateQuery(o);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((T = a == null ? void 0 : a.response) == null ? void 0 : T.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(b);
    }
  },
  async run_query(o, T) {
    var a;
    try {
      return (await yh(o, T)).count;
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
}, tr = k0("customSegmentStore", {
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
}), An = "", nr = li.create(), oi = li.create();
li.create();
nr.interceptors.request.use(
  (o) => {
    const T = un();
    return o.baseURL = T.baseUrl, o.headers.Authorization = `Bearer ${T.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = T.tenantId, o.headers["brand-id"] = T.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", v0(o), o;
  },
  (o) => Promise.reject(o)
);
oi.interceptors.request.use(
  (o) => {
    const T = un(), a = tr();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${T.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = T.tenantId, o.headers["brand-id"] = T.brandId, v0(o), o;
  },
  (o) => Promise.reject(o)
);
const ph = () => li.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), v0 = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, p0 = (o, T) => nr.get(`${An}/api/v1/segments/${T ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), hh = (o) => nr.get(`${An}/api/v1/insights/${o}`, { params: queryParams }).then((T) => T.data).catch((T) => {
  throw T;
}), mh = () => nr.get(`${An}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), gh = (o, T) => oi.get(`${An}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), xh = () => oi.get(`${An}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), yh = (o, T) => oi.post(`${An}/api/v1/query/${T}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), kh = (o, T) => oi.post(`${An}/api/v1/query/gen/${T}`, o).then((a) => a.data).catch((a) => {
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
      const T = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting insights your data."
      };
      this.set_ApiError(T);
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
      const T = {
        ...this.query,
        page: 1
      }, a = await p0(T, o);
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
      const T = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(T);
    }
  },
  async fetch_nextSegmentPage() {
    var a;
    const o = this.platform, T = {
      ...this.query,
      page: this.currentPage + 1
    };
    try {
      const b = await p0(T, o), g = b.data.map(($) => ({
        ...$,
        status: {
          type: $.status,
          value: $.status ? $.status : "active",
          color: this.stateColors[$.status]
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
    var T;
    try {
      const a = await mh(o);
      this.set_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((T = a.response) == null ? void 0 : T.data) || "Sorry, an error occurred while getting your data."
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
}, un = k0("segmentManagerStore", {
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
}), Ke = (o, T) => {
  const a = o.__vccOpts || o;
  for (const [b, g] of T)
    a[b] = g;
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
  setup(o, { emit: T }) {
    const a = T, b = o, g = q(null), $ = q(!1), L = q(1), G = q([]), O = q(null), D = q(!1), M = q({}), Y = Fe(
      {
        get() {
          return b.checkedRows;
        },
        set(H) {
          G.value = H;
        }
      }
    ), Q = Fe(() => b.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${b.stickyHeader}px;` : "");
    function I() {
      b.expandable && b.rows.length > 0 && (D.value = !D.value, D.value === !1 && (M.value = {}));
    }
    function A(H) {
      return b.expandable && H.details.length === 1;
    }
    function C(H) {
      M[H] ? M[H] = !M[H] : this.$set(M, H, !0);
    }
    function J(H) {
      O.value = H;
    }
    function ye(H, V, F) {
      F.key !== "actions" && F.type !== "link" && V.showInAction !== !1 && a("rowClicked", { event: H, row: V });
    }
    function he(H) {
      b.sortable && H.key !== "actions" && H.type !== "link" && (g.value === H.key ? L.value *= -1 : (g.value = H.key, L.value = 1), a("columnSorted", { sortColumn: g.value, sortOrder: L }));
    }
    function ce(H, V) {
      let F = "";
      if (typeof H == "object" ? F = H.value : F = H, V === "datetime") {
        const P = En(new Date(F));
        return En(P).format("DD MMM YYYY");
      }
      if (V === "datetimehour") {
        const P = En(new Date(F));
        return En(P).format("DD MMM YYYY, HH:mm");
      }
      return V === "number" || (typeof F == "number" || typeof F == "string" && !Number.isNaN(Number(F))) && String(F).trim() !== "" ? (typeof F == "string" ? Number(F) : F).toLocaleString() : F;
    }
    function de(H) {
      return H == null ? "" : (typeof H == "string" ? parseInt(H, 10) : H).toLocaleString();
    }
    return on($, (H) => {
      H === "true" || H === !0 ? b.rows.forEach((V) => {
        !G.value.includes(V.id) && V.showInAction !== !1 && G.value.push(V.id);
      }) : G.value = [], a("rowChecked", G.value);
    }), (H, V) => (h(), x("div", {
      class: We(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      f("table", {
        class: We(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        f("thead", null, [
          f("tr", {
            onClick: V[1] || (V[1] = (F) => I())
          }, [
            !o.collapseControls && !o.expandable ? (h(), x("th", {
              key: 0,
              class: "checkbox-container",
              style: _n(Q.value)
            }, [
              o.selectable ? (h(), pe(S(bn), {
                key: 0,
                modelValue: $.value,
                "onUpdate:modelValue": V[0] || (V[0] = (F) => $.value = F)
              }, null, 8, ["modelValue"])) : B("", !0)
            ], 4)) : B("", !0),
            o.expandable ? (h(), x("th", {
              key: 1,
              class: We(["text-center", {
                expandable: o.expandable
              }]),
              style: _n(Q.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), pe(S(Vt), {
                key: 0,
                class: "expand-icon",
                icon: D.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: D.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : B("", !0)
            ], 6)) : B("", !0),
            (h(!0), x(xe, null, Ae(o.columns, (F) => (h(), x("th", {
              style: _n(Q.value),
              key: F.id,
              onClick: (P) => he(F),
              class: We({
                actions: F.key === "actions",
                active: g.value === F.key,
                sortable: o.sortable && F.key !== "actions" && F.type != "link",
                expandable: o.expandable
              })
            }, [
              F.key !== "actions" && F.type != "link" ? (h(), x(xe, { key: 0 }, [
                nt(ie(F.value) + " ", 1),
                o.sortable ? (h(), pe(S(Vt), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : B("", !0)
              ], 64)) : B("", !0)
            ], 14, bh))), 128))
          ])
        ]),
        o.rows ? (h(), x("tbody", Eh, [
          (h(!0), x(xe, null, Ae(o.rows, (F) => (h(), x(xe, null, [
            (h(!0), x(xe, null, Ae(F.details, (P) => (h(), x(xe, null, [
              o.expandable & D.value || A(F) ? (h(), x("tr", {
                class: We({ expandable: o.expandable && P.details.length === 1 }),
                key: P.id,
                onClick: (ve) => C(P.id)
              }, [
                f("td", Ah, [
                  P.details.length > 1 ? (h(), pe(S(Vt), {
                    key: 0,
                    class: "expand-icon",
                    icon: M.value[P.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: M.value[P.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : B("", !0)
                ]),
                (h(!0), x(xe, null, Ae(o.columns, (ve) => (h(), x("td", {
                  style: _n({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[ve.key] ? `${o.minWidthCell[ve.key]}px` : "0px"
                  }),
                  key: ve.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ce(P[ve.key].value || P[ve.key], ve.type)
                    }, ie(ce(P[ve.key], ve.type)), 9, wh)
                  ])
                ], 4))), 128))
              ], 10, Sh)) : B("", !0),
              P.details.length > 1 && M.value[P.id] ? (h(!0), x(xe, { key: 1 }, Ae(P.details, (ve) => (h(), x("tr", {
                class: "subrow-details",
                key: ve.id
              }, [
                V[4] || (V[4] = f("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), x(xe, null, Ae(o.columns, ($e) => (h(), x("td", {
                  style: _n({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[$e.key] ? `${o.minWidthCell[$e.key]}px` : "0px"
                  }),
                  key: $e.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ce(ve[$e.key], $e.type)
                    }, ie(ce(ve[$e.key], $e.type)), 9, Ch)
                  ])
                ], 4))), 128))
              ]))), 128)) : B("", !0)
            ], 64))), 256)),
            (o.expandable && F.details.length) > 1 || o.expandable && F.details[0].details.length > 1 || !o.expandable ? (h(), x("tr", {
              class: We({
                active: Y.value.includes(F.id),
                static: F.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: O.value === F._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: F.id,
              onClick: (P) => J(F._id)
            }, [
              o.collapseControls ? B("", !0) : (h(), x("td", Dh, [
                o.selectable && F.showInAction !== !1 ? (h(), pe(S(bn), {
                  key: 0,
                  modelValue: Y.value,
                  "onUpdate:modelValue": V[2] || (V[2] = (P) => Y.value = P),
                  val: F.id,
                  onInput: V[3] || (V[3] = (P) => H.$emit(S(si).ROW_CHECKED, G.value))
                }, null, 8, ["modelValue", "val"])) : B("", !0)
              ])),
              (h(!0), x(xe, null, Ae(o.columns, (P) => (h(), x("td", {
                class: We({
                  actions: P.key === "actions",
                  fixedActions: o.fixedActions && P.key === "actions"
                }),
                style: _n({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[P.key] ? `${o.minWidthCell[P.key]}px` : "0px"
                }),
                key: P.key,
                onKeydown: $a((ve) => ye(ve, F, P), ["enter"]),
                onClick: (ve) => ye(ve, F, P)
              }, [
                F[P.key] !== void 0 && F[P.key] !== null && P.key !== "actions" ? (h(), x(xe, { key: 0 }, [
                  F[P.key].icon ? (h(), x("img", {
                    key: 0,
                    alt: "",
                    src: F[P.key].icon,
                    class: We(P.key)
                  }, null, 10, Lh)) : F[P.key].biicon ? (h(), x("span", {
                    key: 1,
                    class: We(["table-bi-icon", F[P.key].biicon]),
                    style: _n({ color: F[P.key].color })
                  }, null, 6)) : B("", !0),
                  F[P.key].type ? (h(), pe(S(sh), {
                    key: 2,
                    "font-size": 12,
                    label: F[P.key].value,
                    color: F[P.key].color
                  }, null, 8, ["label", "color"])) : P.type === "link" ? ji(H.$slots, "linkHandler", {
                    key: 3,
                    link: { row: F, columnKey: P.key }
                  }, void 0, !0) : P.type === "number" ? (h(), x("span", Bh, ie(de(F[P.key])), 1)) : (h(), x("span", {
                    key: 5,
                    title: ce(F[P.key].value || F[P.key], P.type)
                  }, ie(ce(F[P.key], P.type)), 9, Fh))
                ], 64)) : B("", !0),
                P.key === "actions" ? ji(H.$slots, "actionButton", {
                  key: 1,
                  row: F
                }, void 0, !0) : B("", !0)
              ], 46, Ih))), 128))
            ], 10, Th)) : B("", !0)
          ], 64))), 256))
        ])) : B("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), x("p", $h, " No matches found ")) : B("", !0)
    ], 2));
  }
}, Oh = /* @__PURE__ */ Ke(Vh, [["__scopeId", "data-v-bdd2a344"]]);
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
(function(o, T) {
  (function() {
    var a, b = "4.17.21", g = 200, $ = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", L = "Expected a function", G = "Invalid `variable` option passed into `_.template`", O = "__lodash_hash_undefined__", D = 500, M = "__lodash_placeholder__", Y = 1, Q = 2, I = 4, A = 1, C = 2, J = 1, ye = 2, he = 4, ce = 8, de = 16, H = 32, V = 64, F = 128, P = 256, ve = 512, $e = 30, Me = "...", Pe = 800, kt = 16, Ot = 1, cn = 2, dn = 3, Ct = 1 / 0, ze = 9007199254740991, ne = 17976931348623157e292, z = NaN, w = 4294967295, se = w - 1, vt = w >>> 1, Tt = [
      ["ary", F],
      ["bind", J],
      ["bindKey", ye],
      ["curry", ce],
      ["curryRight", de],
      ["flip", ve],
      ["partial", H],
      ["partialRight", V],
      ["rearg", P]
    ], _t = "[object Arguments]", Pt = "[object Array]", De = "[object AsyncFunction]", Kt = "[object Boolean]", Yt = "[object Date]", ir = "[object DOMException]", wn = "[object Error]", Rt = "[object Function]", ui = "[object GeneratorFunction]", rt = "[object Map]", Zt = "[object Number]", rr = "[object Null]", bt = "[object Object]", ci = "[object Promise]", ar = "[object Proxy]", j = "[object RegExp]", E = "[object Set]", W = "[object String]", we = "[object Symbol]", U = "[object Undefined]", le = "[object WeakMap]", Jt = "[object WeakSet]", Nn = "[object ArrayBuffer]", Cn = "[object DataView]", sr = "[object Float32Array]", lr = "[object Float64Array]", or = "[object Int8Array]", ur = "[object Int16Array]", cr = "[object Int32Array]", dr = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", pr = "[object Uint16Array]", hr = "[object Uint32Array]", E0 = /\b__p \+= '';/g, S0 = /\b(__p \+=) '' \+/g, A0 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Va = /&(?:amp|lt|gt|quot|#39);/g, Oa = /[&<>"']/g, w0 = RegExp(Va.source), C0 = RegExp(Oa.source), T0 = /<%-([\s\S]+?)%>/g, D0 = /<%([\s\S]+?)%>/g, Pa = /<%=([\s\S]+?)%>/g, I0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, L0 = /^\w*$/, B0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, F0 = RegExp(mr.source), gr = /^\s+/, $0 = /\s/, V0 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, O0 = /\{\n\/\* \[wrapped with (.+)\] \*/, P0 = /,? & /, R0 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, G0 = /[()=,{}\[\]\/\s]/, M0 = /\\(\\)?/g, U0 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ra = /\w*$/, W0 = /^[-+]0x[0-9a-f]+$/i, N0 = /^0b[01]+$/i, q0 = /^\[object .+?Constructor\]$/, z0 = /^0o[0-7]+$/i, H0 = /^(?:0|[1-9]\d*)$/, Q0 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, di = /($^)/, K0 = /['\n\r\u2028\u2029\\]/g, fi = "\\ud800-\\udfff", Y0 = "\\u0300-\\u036f", Z0 = "\\ufe20-\\ufe2f", J0 = "\\u20d0-\\u20ff", Ga = Y0 + Z0 + J0, Ma = "\\u2700-\\u27bf", Ua = "a-z\\xdf-\\xf6\\xf8-\\xff", X0 = "\\xac\\xb1\\xd7\\xf7", j0 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", eo = "\\u2000-\\u206f", to = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Wa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Na = "\\ufe0e\\ufe0f", qa = X0 + j0 + eo + to, xr = "['’]", no = "[" + fi + "]", za = "[" + qa + "]", pi = "[" + Ga + "]", Ha = "\\d+", io = "[" + Ma + "]", Qa = "[" + Ua + "]", Ka = "[^" + fi + qa + Ha + Ma + Ua + Wa + "]", yr = "\\ud83c[\\udffb-\\udfff]", ro = "(?:" + pi + "|" + yr + ")", Ya = "[^" + fi + "]", kr = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Tn = "[" + Wa + "]", Za = "\\u200d", Ja = "(?:" + Qa + "|" + Ka + ")", ao = "(?:" + Tn + "|" + Ka + ")", Xa = "(?:" + xr + "(?:d|ll|m|re|s|t|ve))?", ja = "(?:" + xr + "(?:D|LL|M|RE|S|T|VE))?", es = ro + "?", ts = "[" + Na + "]?", so = "(?:" + Za + "(?:" + [Ya, kr, vr].join("|") + ")" + ts + es + ")*", lo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", oo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ns = ts + es + so, uo = "(?:" + [io, kr, vr].join("|") + ")" + ns, co = "(?:" + [Ya + pi + "?", pi, kr, vr, no].join("|") + ")", fo = RegExp(xr, "g"), po = RegExp(pi, "g"), _r = RegExp(yr + "(?=" + yr + ")|" + co + ns, "g"), ho = RegExp([
      Tn + "?" + Qa + "+" + Xa + "(?=" + [za, Tn, "$"].join("|") + ")",
      ao + "+" + ja + "(?=" + [za, Tn + Ja, "$"].join("|") + ")",
      Tn + "?" + Ja + "+" + Xa,
      Tn + "+" + ja,
      oo,
      lo,
      Ha,
      uo
    ].join("|"), "g"), mo = RegExp("[" + Za + fi + Ga + Na + "]"), go = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, xo = [
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
    ], yo = -1, Te = {};
    Te[sr] = Te[lr] = Te[or] = Te[ur] = Te[cr] = Te[dr] = Te[fr] = Te[pr] = Te[hr] = !0, Te[_t] = Te[Pt] = Te[Nn] = Te[Kt] = Te[Cn] = Te[Yt] = Te[wn] = Te[Rt] = Te[rt] = Te[Zt] = Te[bt] = Te[j] = Te[E] = Te[W] = Te[le] = !1;
    var Ce = {};
    Ce[_t] = Ce[Pt] = Ce[Nn] = Ce[Cn] = Ce[Kt] = Ce[Yt] = Ce[sr] = Ce[lr] = Ce[or] = Ce[ur] = Ce[cr] = Ce[rt] = Ce[Zt] = Ce[bt] = Ce[j] = Ce[E] = Ce[W] = Ce[we] = Ce[dr] = Ce[fr] = Ce[pr] = Ce[hr] = !0, Ce[wn] = Ce[Rt] = Ce[le] = !1;
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
    }, Eo = parseFloat, So = parseInt, is = typeof ai == "object" && ai && ai.Object === Object && ai, Ao = typeof self == "object" && self && self.Object === Object && self, Ne = is || Ao || Function("return this")(), br = T && !T.nodeType && T, fn = br && !0 && o && !o.nodeType && o, rs = fn && fn.exports === br, Er = rs && is.process, dt = function() {
      try {
        var d = fn && fn.require && fn.require("util").types;
        return d || Er && Er.binding && Er.binding("util");
      } catch {
      }
    }(), as = dt && dt.isArrayBuffer, ss = dt && dt.isDate, ls = dt && dt.isMap, os = dt && dt.isRegExp, us = dt && dt.isSet, cs = dt && dt.isTypedArray;
    function at(d, y, m) {
      switch (m.length) {
        case 0:
          return d.call(y);
        case 1:
          return d.call(y, m[0]);
        case 2:
          return d.call(y, m[0], m[1]);
        case 3:
          return d.call(y, m[0], m[1], m[2]);
      }
      return d.apply(y, m);
    }
    function wo(d, y, m, N) {
      for (var re = -1, _e = d == null ? 0 : d.length; ++re < _e; ) {
        var Re = d[re];
        y(N, Re, m(Re), d);
      }
      return N;
    }
    function ft(d, y) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N && y(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function Co(d, y) {
      for (var m = d == null ? 0 : d.length; m-- && y(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function ds(d, y) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N; )
        if (!y(d[m], m, d))
          return !1;
      return !0;
    }
    function Xt(d, y) {
      for (var m = -1, N = d == null ? 0 : d.length, re = 0, _e = []; ++m < N; ) {
        var Re = d[m];
        y(Re, m, d) && (_e[re++] = Re);
      }
      return _e;
    }
    function hi(d, y) {
      var m = d == null ? 0 : d.length;
      return !!m && Dn(d, y, 0) > -1;
    }
    function Sr(d, y, m) {
      for (var N = -1, re = d == null ? 0 : d.length; ++N < re; )
        if (m(y, d[N]))
          return !0;
      return !1;
    }
    function Ie(d, y) {
      for (var m = -1, N = d == null ? 0 : d.length, re = Array(N); ++m < N; )
        re[m] = y(d[m], m, d);
      return re;
    }
    function jt(d, y) {
      for (var m = -1, N = y.length, re = d.length; ++m < N; )
        d[re + m] = y[m];
      return d;
    }
    function Ar(d, y, m, N) {
      var re = -1, _e = d == null ? 0 : d.length;
      for (N && _e && (m = d[++re]); ++re < _e; )
        m = y(m, d[re], re, d);
      return m;
    }
    function To(d, y, m, N) {
      var re = d == null ? 0 : d.length;
      for (N && re && (m = d[--re]); re--; )
        m = y(m, d[re], re, d);
      return m;
    }
    function wr(d, y) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N; )
        if (y(d[m], m, d))
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
    function fs(d, y, m) {
      var N;
      return m(d, function(re, _e, Re) {
        if (y(re, _e, Re))
          return N = _e, !1;
      }), N;
    }
    function mi(d, y, m, N) {
      for (var re = d.length, _e = m + (N ? 1 : -1); N ? _e-- : ++_e < re; )
        if (y(d[_e], _e, d))
          return _e;
      return -1;
    }
    function Dn(d, y, m) {
      return y === y ? No(d, y, m) : mi(d, ps, m);
    }
    function Bo(d, y, m, N) {
      for (var re = m - 1, _e = d.length; ++re < _e; )
        if (N(d[re], y))
          return re;
      return -1;
    }
    function ps(d) {
      return d !== d;
    }
    function hs(d, y) {
      var m = d == null ? 0 : d.length;
      return m ? Dr(d, y) / m : z;
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
    function ms(d, y, m, N, re) {
      return re(d, function(_e, Re, Se) {
        m = N ? (N = !1, _e) : y(m, _e, Re, Se);
      }), m;
    }
    function Fo(d, y) {
      var m = d.length;
      for (d.sort(y); m--; )
        d[m] = d[m].value;
      return d;
    }
    function Dr(d, y) {
      for (var m, N = -1, re = d.length; ++N < re; ) {
        var _e = y(d[N]);
        _e !== a && (m = m === a ? _e : m + _e);
      }
      return m;
    }
    function Ir(d, y) {
      for (var m = -1, N = Array(d); ++m < d; )
        N[m] = y(m);
      return N;
    }
    function $o(d, y) {
      return Ie(y, function(m) {
        return [m, d[m]];
      });
    }
    function gs(d) {
      return d && d.slice(0, vs(d) + 1).replace(gr, "");
    }
    function st(d) {
      return function(y) {
        return d(y);
      };
    }
    function Lr(d, y) {
      return Ie(y, function(m) {
        return d[m];
      });
    }
    function qn(d, y) {
      return d.has(y);
    }
    function xs(d, y) {
      for (var m = -1, N = d.length; ++m < N && Dn(y, d[m], 0) > -1; )
        ;
      return m;
    }
    function ys(d, y) {
      for (var m = d.length; m-- && Dn(y, d[m], 0) > -1; )
        ;
      return m;
    }
    function Vo(d, y) {
      for (var m = d.length, N = 0; m--; )
        d[m] === y && ++N;
      return N;
    }
    var Oo = Tr(ko), Po = Tr(vo);
    function Ro(d) {
      return "\\" + bo[d];
    }
    function Go(d, y) {
      return d == null ? a : d[y];
    }
    function In(d) {
      return mo.test(d);
    }
    function Mo(d) {
      return go.test(d);
    }
    function Uo(d) {
      for (var y, m = []; !(y = d.next()).done; )
        m.push(y.value);
      return m;
    }
    function Br(d) {
      var y = -1, m = Array(d.size);
      return d.forEach(function(N, re) {
        m[++y] = [re, N];
      }), m;
    }
    function ks(d, y) {
      return function(m) {
        return d(y(m));
      };
    }
    function en(d, y) {
      for (var m = -1, N = d.length, re = 0, _e = []; ++m < N; ) {
        var Re = d[m];
        (Re === y || Re === M) && (d[m] = M, _e[re++] = m);
      }
      return _e;
    }
    function gi(d) {
      var y = -1, m = Array(d.size);
      return d.forEach(function(N) {
        m[++y] = N;
      }), m;
    }
    function Wo(d) {
      var y = -1, m = Array(d.size);
      return d.forEach(function(N) {
        m[++y] = [N, N];
      }), m;
    }
    function No(d, y, m) {
      for (var N = m - 1, re = d.length; ++N < re; )
        if (d[N] === y)
          return N;
      return -1;
    }
    function qo(d, y, m) {
      for (var N = m + 1; N--; )
        if (d[N] === y)
          return N;
      return N;
    }
    function Ln(d) {
      return In(d) ? Ho(d) : Do(d);
    }
    function Et(d) {
      return In(d) ? Qo(d) : Io(d);
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
      y = y == null ? Ne : Bn.defaults(Ne.Object(), y, Bn.pick(Ne, xo));
      var m = y.Array, N = y.Date, re = y.Error, _e = y.Function, Re = y.Math, Se = y.Object, Fr = y.RegExp, Zo = y.String, pt = y.TypeError, xi = m.prototype, Jo = _e.prototype, Fn = Se.prototype, yi = y["__core-js_shared__"], ki = Jo.toString, Ee = Fn.hasOwnProperty, Xo = 0, _s = function() {
        var e = /[^.]+$/.exec(yi && yi.keys && yi.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), vi = Fn.toString, jo = ki.call(Se), eu = Ne._, tu = Fr(
        "^" + ki.call(Ee).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), _i = rs ? y.Buffer : a, tn = y.Symbol, bi = y.Uint8Array, bs = _i ? _i.allocUnsafe : a, Ei = ks(Se.getPrototypeOf, Se), Es = Se.create, Ss = Fn.propertyIsEnumerable, Si = xi.splice, As = tn ? tn.isConcatSpreadable : a, zn = tn ? tn.iterator : a, pn = tn ? tn.toStringTag : a, Ai = function() {
        try {
          var e = yn(Se, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), nu = y.clearTimeout !== Ne.clearTimeout && y.clearTimeout, iu = N && N.now !== Ne.Date.now && N.now, ru = y.setTimeout !== Ne.setTimeout && y.setTimeout, wi = Re.ceil, Ci = Re.floor, $r = Se.getOwnPropertySymbols, au = _i ? _i.isBuffer : a, ws = y.isFinite, su = xi.join, lu = ks(Se.keys, Se), Ge = Re.max, He = Re.min, ou = N.now, uu = y.parseInt, Cs = Re.random, cu = xi.reverse, Vr = yn(y, "DataView"), Hn = yn(y, "Map"), Or = yn(y, "Promise"), $n = yn(y, "Set"), Qn = yn(y, "WeakMap"), Kn = yn(Se, "create"), Ti = Qn && new Qn(), Vn = {}, du = kn(Vr), fu = kn(Hn), pu = kn(Or), hu = kn($n), mu = kn(Qn), Di = tn ? tn.prototype : a, Yn = Di ? Di.valueOf : a, Ts = Di ? Di.toString : a;
      function s(e) {
        if (Be(e) && !ae(e) && !(e instanceof ge)) {
          if (e instanceof ht)
            return e;
          if (Ee.call(e, "__wrapped__"))
            return Dl(e);
        }
        return new ht(e);
      }
      var On = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!Le(t))
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
      }, s.prototype = Ii.prototype, s.prototype.constructor = s, ht.prototype = On(Ii.prototype), ht.prototype.constructor = ht;
      function ge(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = w, this.__views__ = [];
      }
      function gu() {
        var e = new ge(this.__wrapped__);
        return e.__actions__ = Xe(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Xe(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Xe(this.__views__), e;
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
        var e = this.__wrapped__.value(), t = this.__dir__, n = ae(e), i = t < 0, r = n ? e.length : 0, l = I1(0, r, this.__views__), u = l.start, c = l.end, p = c - u, k = i ? c : u - 1, v = this.__iteratees__, _ = v.length, R = 0, K = He(p, this.__takeCount__);
        if (!n || !i && r == p && K == p)
          return Xs(e, this.__actions__);
        var ee = [];
        e:
          for (; p-- && R < K; ) {
            k += t;
            for (var ue = -1, te = e[k]; ++ue < _; ) {
              var me = v[ue], ke = me.iteratee, ut = me.type, Je = ke(te);
              if (ut == cn)
                te = Je;
              else if (!Je) {
                if (ut == Ot)
                  continue e;
                break e;
              }
            }
            ee[R++] = te;
          }
        return ee;
      }
      ge.prototype = On(Ii.prototype), ge.prototype.constructor = ge;
      function hn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function ku() {
        this.__data__ = Kn ? Kn(null) : {}, this.size = 0;
      }
      function vu(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function _u(e) {
        var t = this.__data__;
        if (Kn) {
          var n = t[e];
          return n === O ? a : n;
        }
        return Ee.call(t, e) ? t[e] : a;
      }
      function bu(e) {
        var t = this.__data__;
        return Kn ? t[e] !== a : Ee.call(t, e);
      }
      function Eu(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Kn && t === a ? O : t, this;
      }
      hn.prototype.clear = ku, hn.prototype.delete = vu, hn.prototype.get = _u, hn.prototype.has = bu, hn.prototype.set = Eu;
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
        var t = this.__data__, n = Li(t, e);
        if (n < 0)
          return !1;
        var i = t.length - 1;
        return n == i ? t.pop() : Si.call(t, n, 1), --this.size, !0;
      }
      function wu(e) {
        var t = this.__data__, n = Li(t, e);
        return n < 0 ? a : t[n][1];
      }
      function Cu(e) {
        return Li(this.__data__, e) > -1;
      }
      function Tu(e, t) {
        var n = this.__data__, i = Li(n, e);
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
          hash: new hn(),
          map: new (Hn || Gt)(),
          string: new hn()
        };
      }
      function Iu(e) {
        var t = Ni(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Lu(e) {
        return Ni(this, e).get(e);
      }
      function Bu(e) {
        return Ni(this, e).has(e);
      }
      function Fu(e, t) {
        var n = Ni(this, e), i = n.size;
        return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
      }
      Mt.prototype.clear = Du, Mt.prototype.delete = Iu, Mt.prototype.get = Lu, Mt.prototype.has = Bu, Mt.prototype.set = Fu;
      function mn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Mt(); ++t < n; )
          this.add(e[t]);
      }
      function $u(e) {
        return this.__data__.set(e, O), this;
      }
      function Vu(e) {
        return this.__data__.has(e);
      }
      mn.prototype.add = mn.prototype.push = $u, mn.prototype.has = Vu;
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
          if (!Hn || i.length < g - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Mt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      St.prototype.clear = Ou, St.prototype.delete = Pu, St.prototype.get = Ru, St.prototype.has = Gu, St.prototype.set = Mu;
      function Ds(e, t) {
        var n = ae(e), i = !n && vn(e), r = !n && !i && ln(e), l = !n && !i && !r && Mn(e), u = n || i || r || l, c = u ? Ir(e.length, Zo) : [], p = c.length;
        for (var k in e)
          (t || Ee.call(e, k)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
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
        return qi(Xe(e), gn(t, 0, e.length));
      }
      function Wu(e) {
        return qi(Xe(e));
      }
      function Pr(e, t, n) {
        (n !== a && !At(e[t], n) || n === a && !(t in e)) && Ut(e, t, n);
      }
      function Zn(e, t, n) {
        var i = e[t];
        (!(Ee.call(e, t) && At(i, n)) || n === a && !(t in e)) && Ut(e, t, n);
      }
      function Li(e, t) {
        for (var n = e.length; n--; )
          if (At(e[n][0], t))
            return n;
        return -1;
      }
      function Nu(e, t, n, i) {
        return nn(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ls(e, t) {
        return e && It(t, Ue(t), e);
      }
      function qu(e, t) {
        return e && It(t, et(t), e);
      }
      function Ut(e, t, n) {
        t == "__proto__" && Ai ? Ai(e, t, {
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
        var u, c = t & Y, p = t & Q, k = t & I;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!Le(e))
          return e;
        var v = ae(e);
        if (v) {
          if (u = B1(e), !c)
            return Xe(e, u);
        } else {
          var _ = Qe(e), R = _ == Rt || _ == ui;
          if (ln(e))
            return tl(e, c);
          if (_ == bt || _ == _t || R && !r) {
            if (u = p || R ? {} : vl(e), !c)
              return p ? _1(e, qu(u, e)) : v1(e, Ls(u, e));
          } else {
            if (!Ce[_])
              return r ? e : {};
            u = F1(e, _, c);
          }
        }
        l || (l = new St());
        var K = l.get(e);
        if (K)
          return K;
        l.set(e, u), Yl(e) ? e.forEach(function(te) {
          u.add(mt(te, t, n, te, e, l));
        }) : Ql(e) && e.forEach(function(te, me) {
          u.set(me, mt(te, t, n, me, e, l));
        });
        var ee = k ? p ? ra : ia : p ? et : Ue, ue = v ? a : ee(e);
        return ft(ue || e, function(te, me) {
          ue && (me = te, te = e[me]), Zn(u, me, mt(te, t, n, me, e, l));
        }), u;
      }
      function zu(e) {
        var t = Ue(e);
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
      function Jn(e, t, n, i) {
        var r = -1, l = hi, u = !0, c = e.length, p = [], k = t.length;
        if (!c)
          return p;
        n && (t = Ie(t, st(n))), i ? (l = Sr, u = !1) : t.length >= g && (l = qn, u = !1, t = new mn(t));
        e:
          for (; ++r < c; ) {
            var v = e[r], _ = n == null ? v : n(v);
            if (v = i || v !== 0 ? v : 0, u && _ === _) {
              for (var R = k; R--; )
                if (t[R] === _)
                  continue e;
              p.push(v);
            } else
              l(t, _, i) || p.push(v);
          }
        return p;
      }
      var nn = sl(Dt), $s = sl(Mr, !0);
      function Hu(e, t) {
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
      function Qu(e, t, n, i) {
        var r = e.length;
        for (n = oe(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : oe(i), i < 0 && (i += r), i = n > i ? 0 : Jl(i); n < i; )
          e[n++] = t;
        return e;
      }
      function Vs(e, t) {
        var n = [];
        return nn(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function qe(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = V1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? qe(c, t - 1, n, i, r) : jt(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Gr = ll(), Os = ll(!0);
      function Dt(e, t) {
        return e && Gr(e, t, Ue);
      }
      function Mr(e, t) {
        return e && Os(e, t, Ue);
      }
      function Fi(e, t) {
        return Xt(t, function(n) {
          return zt(e[n]);
        });
      }
      function xn(e, t) {
        t = an(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[Lt(t[n++])];
        return n && n == i ? e : a;
      }
      function Ps(e, t, n) {
        var i = t(e);
        return ae(e) ? i : jt(i, n(e));
      }
      function Ye(e) {
        return e == null ? e === a ? U : rr : pn && pn in Se(e) ? D1(e) : W1(e);
      }
      function Ur(e, t) {
        return e > t;
      }
      function Ku(e, t) {
        return e != null && Ee.call(e, t);
      }
      function Yu(e, t) {
        return e != null && t in Se(e);
      }
      function Zu(e, t, n) {
        return e >= He(t, n) && e < Ge(t, n);
      }
      function Wr(e, t, n) {
        for (var i = n ? Sr : hi, r = e[0].length, l = e.length, u = l, c = m(l), p = 1 / 0, k = []; u--; ) {
          var v = e[u];
          u && t && (v = Ie(v, st(t))), p = He(v.length, p), c[u] = !n && (t || r >= 120 && v.length >= 120) ? new mn(u && v) : a;
        }
        v = e[0];
        var _ = -1, R = c[0];
        e:
          for (; ++_ < r && k.length < p; ) {
            var K = v[_], ee = t ? t(K) : K;
            if (K = n || K !== 0 ? K : 0, !(R ? qn(R, ee) : i(k, ee, n))) {
              for (u = l; --u; ) {
                var ue = c[u];
                if (!(ue ? qn(ue, ee) : i(e[u], ee, n)))
                  continue e;
              }
              R && R.push(ee), k.push(K);
            }
          }
        return k;
      }
      function Ju(e, t, n, i) {
        return Dt(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function Xn(e, t, n) {
        t = an(t, e), e = Sl(e, t);
        var i = e == null ? e : e[Lt(xt(t))];
        return i == null ? a : at(i, e, n);
      }
      function Rs(e) {
        return Be(e) && Ye(e) == _t;
      }
      function Xu(e) {
        return Be(e) && Ye(e) == Nn;
      }
      function ju(e) {
        return Be(e) && Ye(e) == Yt;
      }
      function jn(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Be(e) && !Be(t) ? e !== e && t !== t : e1(e, t, n, i, jn, r);
      }
      function e1(e, t, n, i, r, l) {
        var u = ae(e), c = ae(t), p = u ? Pt : Qe(e), k = c ? Pt : Qe(t);
        p = p == _t ? bt : p, k = k == _t ? bt : k;
        var v = p == bt, _ = k == bt, R = p == k;
        if (R && ln(e)) {
          if (!ln(t))
            return !1;
          u = !0, v = !1;
        }
        if (R && !v)
          return l || (l = new St()), u || Mn(e) ? xl(e, t, n, i, r, l) : C1(e, t, p, n, i, r, l);
        if (!(n & A)) {
          var K = v && Ee.call(e, "__wrapped__"), ee = _ && Ee.call(t, "__wrapped__");
          if (K || ee) {
            var ue = K ? e.value() : e, te = ee ? t.value() : t;
            return l || (l = new St()), r(ue, te, n, i, l);
          }
        }
        return R ? (l || (l = new St()), T1(e, t, n, i, r, l)) : !1;
      }
      function t1(e) {
        return Be(e) && Qe(e) == rt;
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
            var _ = new St();
            if (i)
              var R = i(k, v, p, e, t, _);
            if (!(R === a ? jn(v, k, A | C, i, _) : R))
              return !1;
          }
        }
        return !0;
      }
      function Gs(e) {
        if (!Le(e) || P1(e))
          return !1;
        var t = zt(e) ? tu : q0;
        return t.test(kn(e));
      }
      function n1(e) {
        return Be(e) && Ye(e) == j;
      }
      function i1(e) {
        return Be(e) && Qe(e) == E;
      }
      function r1(e) {
        return Be(e) && Zi(e.length) && !!Te[Ye(e)];
      }
      function Ms(e) {
        return typeof e == "function" ? e : e == null ? tt : typeof e == "object" ? ae(e) ? Ns(e[0], e[1]) : Ws(e) : o0(e);
      }
      function qr(e) {
        if (!ni(e))
          return lu(e);
        var t = [];
        for (var n in Se(e))
          Ee.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function a1(e) {
        if (!Le(e))
          return U1(e);
        var t = ni(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !Ee.call(e, i)) || n.push(i);
        return n;
      }
      function zr(e, t) {
        return e < t;
      }
      function Us(e, t) {
        var n = -1, i = je(e) ? m(e.length) : [];
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
        return oa(e) && _l(t) ? bl(Lt(e), t) : function(n) {
          var i = ya(n, e);
          return i === a && i === t ? ka(n, e) : jn(t, i, A | C);
        };
      }
      function $i(e, t, n, i, r) {
        e !== t && Gr(t, function(l, u) {
          if (r || (r = new St()), Le(l))
            s1(e, t, u, n, $i, i, r);
          else {
            var c = i ? i(ca(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Pr(e, u, c);
          }
        }, et);
      }
      function s1(e, t, n, i, r, l, u) {
        var c = ca(e, n), p = ca(t, n), k = u.get(p);
        if (k) {
          Pr(e, n, k);
          return;
        }
        var v = l ? l(c, p, n + "", e, t, u) : a, _ = v === a;
        if (_) {
          var R = ae(p), K = !R && ln(p), ee = !R && !K && Mn(p);
          v = p, R || K || ee ? ae(c) ? v = c : Ve(c) ? v = Xe(c) : K ? (_ = !1, v = tl(p, !0)) : ee ? (_ = !1, v = nl(p, !0)) : v = [] : ri(p) || vn(p) ? (v = c, vn(c) ? v = Xl(c) : (!Le(c) || zt(c)) && (v = vl(p))) : _ = !1;
        }
        _ && (u.set(p, v), r(v, p, i, l, u), u.delete(p)), Pr(e, n, v);
      }
      function qs(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, qt(t, n) ? e[t] : a;
      }
      function zs(e, t, n) {
        t.length ? t = Ie(t, function(l) {
          return ae(l) ? function(u) {
            return xn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [tt];
        var i = -1;
        t = Ie(t, st(X()));
        var r = Us(e, function(l, u, c) {
          var p = Ie(t, function(k) {
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
          var u = t[i], c = xn(e, u);
          n(c, u) && ei(l, an(u, e), c);
        }
        return l;
      }
      function o1(e) {
        return function(t) {
          return xn(t, e);
        };
      }
      function Hr(e, t, n, i) {
        var r = i ? Bo : Dn, l = -1, u = t.length, c = e;
        for (e === t && (t = Xe(t)), n && (c = Ie(e, st(n))); ++l < u; )
          for (var p = 0, k = t[l], v = n ? n(k) : k; (p = r(c, v, p, i)) > -1; )
            c !== e && Si.call(c, p, 1), Si.call(e, p, 1);
        return e;
      }
      function Qs(e, t) {
        for (var n = e ? t.length : 0, i = n - 1; n--; ) {
          var r = t[n];
          if (n == i || r !== l) {
            var l = r;
            qt(r) ? Si.call(e, r, 1) : Zr(e, r);
          }
        }
        return e;
      }
      function Qr(e, t) {
        return e + Ci(Cs() * (t - e + 1));
      }
      function u1(e, t, n, i) {
        for (var r = -1, l = Ge(wi((t - e) / (n || 1)), 0), u = m(l); l--; )
          u[i ? l : ++r] = e, e += n;
        return u;
      }
      function Kr(e, t) {
        var n = "";
        if (!e || t < 1 || t > ze)
          return n;
        do
          t % 2 && (n += e), t = Ci(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function fe(e, t) {
        return da(El(e, t, tt), e + "");
      }
      function c1(e) {
        return Is(Un(e));
      }
      function d1(e, t) {
        var n = Un(e);
        return qi(n, gn(t, 0, n.length));
      }
      function ei(e, t, n, i) {
        if (!Le(e))
          return e;
        t = an(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var p = Lt(t[r]), k = n;
          if (p === "__proto__" || p === "constructor" || p === "prototype")
            return e;
          if (r != u) {
            var v = c[p];
            k = i ? i(v, p, c) : a, k === a && (k = Le(v) ? v : qt(t[r + 1]) ? [] : {});
          }
          Zn(c, p, k), c = c[p];
        }
        return e;
      }
      var Ks = Ti ? function(e, t) {
        return Ti.set(e, t), e;
      } : tt, f1 = Ai ? function(e, t) {
        return Ai(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: _a(t),
          writable: !0
        });
      } : tt;
      function p1(e) {
        return qi(Un(e));
      }
      function gt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = m(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function h1(e, t) {
        var n;
        return nn(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function Vi(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= vt) {
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
        for (var u = t !== t, c = t === null, p = ot(t), k = t === a; r < l; ) {
          var v = Ci((r + l) / 2), _ = n(e[v]), R = _ !== a, K = _ === null, ee = _ === _, ue = ot(_);
          if (u)
            var te = i || ee;
          else
            k ? te = ee && (i || R) : c ? te = ee && R && (i || !K) : p ? te = ee && R && !K && (i || !ue) : K || ue ? te = !1 : te = i ? _ <= t : _ < t;
          te ? r = v + 1 : l = v;
        }
        return He(l, se);
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
        return typeof e == "number" ? e : ot(e) ? z : +e;
      }
      function lt(e) {
        if (typeof e == "string")
          return e;
        if (ae(e))
          return Ie(e, lt) + "";
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
          var k = t ? null : A1(e);
          if (k)
            return gi(k);
          u = !1, r = qn, p = new mn();
        } else
          p = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var v = e[i], _ = t ? t(v) : v;
            if (v = n || v !== 0 ? v : 0, u && _ === _) {
              for (var R = p.length; R--; )
                if (p[R] === _)
                  continue e;
              t && p.push(_), c.push(v);
            } else
              r(p, _, n) || (p !== c && p.push(_), c.push(v));
          }
        return c;
      }
      function Zr(e, t) {
        return t = an(t, e), e = Sl(e, t), e == null || delete e[Lt(xt(t))];
      }
      function Js(e, t, n, i) {
        return ei(e, t, n(xn(e, t)), i);
      }
      function Oi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? gt(e, i ? 0 : l, i ? l + 1 : r) : gt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Xs(e, t) {
        var n = e;
        return n instanceof ge && (n = n.value()), Ar(t, function(i, r) {
          return r.func.apply(r.thisArg, jt([i], r.args));
        }, n);
      }
      function Jr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? rn(e[0]) : [];
        for (var r = -1, l = m(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = Jn(l[r] || u, e[c], t, n));
        return rn(qe(l, 1), t, n);
      }
      function js(e, t, n) {
        for (var i = -1, r = e.length, l = t.length, u = {}; ++i < r; ) {
          var c = i < l ? t[i] : a;
          n(u, e[i], c);
        }
        return u;
      }
      function Xr(e) {
        return Ve(e) ? e : [];
      }
      function jr(e) {
        return typeof e == "function" ? e : tt;
      }
      function an(e, t) {
        return ae(e) ? e : oa(e, t) ? [e] : Tl(be(e));
      }
      var m1 = fe;
      function sn(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : gt(e, t, n);
      }
      var el = nu || function(e) {
        return Ne.clearTimeout(e);
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
      function g1(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function x1(e) {
        var t = new e.constructor(e.source, Ra.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function y1(e) {
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
        for (var r = -1, l = e.length, u = n.length, c = -1, p = t.length, k = Ge(l - u, 0), v = m(p + k), _ = !i; ++c < p; )
          v[c] = t[c];
        for (; ++r < u; )
          (_ || r < l) && (v[n[r]] = e[r]);
        for (; k--; )
          v[c++] = e[r++];
        return v;
      }
      function al(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, p = -1, k = t.length, v = Ge(l - c, 0), _ = m(v + k), R = !i; ++r < v; )
          _[r] = e[r];
        for (var K = r; ++p < k; )
          _[K + p] = t[p];
        for (; ++u < c; )
          (R || r < l) && (_[K + n[u]] = e[r++]);
        return _;
      }
      function Xe(e, t) {
        var n = -1, i = e.length;
        for (t || (t = m(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function It(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], p = i ? i(n[c], e[c], c, n, e) : a;
          p === a && (p = e[c]), r ? Ut(n, c, p) : Zn(n, c, p);
        }
        return n;
      }
      function v1(e, t) {
        return It(e, la(e), t);
      }
      function _1(e, t) {
        return It(e, yl(e), t);
      }
      function Pi(e, t) {
        return function(n, i) {
          var r = ae(n) ? wo : Nu, l = t ? t() : {};
          return r(n, e, X(i, 2), l);
        };
      }
      function Pn(e) {
        return fe(function(t, n) {
          var i = -1, r = n.length, l = r > 1 ? n[r - 1] : a, u = r > 2 ? n[2] : a;
          for (l = e.length > 3 && typeof l == "function" ? (r--, l) : a, u && Ze(n[0], n[1], u) && (l = r < 3 ? a : l, r = 1), t = Se(t); ++i < r; ) {
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
        var i = t & J, r = ti(e);
        function l() {
          var u = this && this !== Ne && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function ol(e) {
        return function(t) {
          t = be(t);
          var n = In(t) ? Et(t) : a, i = n ? n[0] : t.charAt(0), r = n ? sn(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function Rn(e) {
        return function(t) {
          return Ar(s0(a0(t).replace(fo, "")), e, "");
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
          var n = On(e.prototype), i = e.apply(n, t);
          return Le(i) ? i : n;
        };
      }
      function E1(e, t, n) {
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
          var v = this && this !== Ne && this instanceof r ? i : e;
          return at(v, this, u);
        }
        return r;
      }
      function ul(e) {
        return function(t, n, i) {
          var r = Se(t);
          if (!je(t)) {
            var l = X(n, 3);
            t = Ue(t), n = function(c) {
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
              throw new pt(L);
            if (r && !u && Wi(l) == "wrapper")
              var u = new ht([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Wi(l), p = c == "wrapper" ? aa(l) : a;
            p && ua(p[0]) && p[1] == (F | ce | H | P) && !p[4].length && p[9] == 1 ? u = u[Wi(p[0])].apply(u, p[3]) : u = l.length == 1 && ua(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var k = arguments, v = k[0];
            if (u && k.length == 1 && ae(v))
              return u.plant(v).value();
            for (var _ = 0, R = n ? t[_].apply(this, k) : v; ++_ < n; )
              R = t[_].call(this, R);
            return R;
          };
        });
      }
      function Ri(e, t, n, i, r, l, u, c, p, k) {
        var v = t & F, _ = t & J, R = t & ye, K = t & (ce | de), ee = t & ve, ue = R ? a : ti(e);
        function te() {
          for (var me = arguments.length, ke = m(me), ut = me; ut--; )
            ke[ut] = arguments[ut];
          if (K)
            var Je = Gn(te), ct = Vo(ke, Je);
          if (i && (ke = rl(ke, i, r, K)), l && (ke = al(ke, l, u, K)), me -= ct, K && me < k) {
            var Oe = en(ke, Je);
            return pl(
              e,
              t,
              Ri,
              te.placeholder,
              n,
              ke,
              Oe,
              c,
              p,
              k - me
            );
          }
          var wt = _ ? n : this, Qt = R ? wt[e] : e;
          return me = ke.length, c ? ke = N1(ke, c) : ee && me > 1 && ke.reverse(), v && p < me && (ke.length = p), this && this !== Ne && this instanceof te && (Qt = ue || ti(Qt)), Qt.apply(wt, ke);
        }
        return te;
      }
      function dl(e, t) {
        return function(n, i) {
          return Ju(n, e, t(i), {});
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
        return Nt(function(t) {
          return t = Ie(t, st(X())), fe(function(n) {
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
        var i = Kr(t, wi(e / Ln(t)));
        return In(t) ? sn(Et(i), 0, e).join("") : i.slice(0, e);
      }
      function S1(e, t, n, i) {
        var r = t & J, l = ti(e);
        function u() {
          for (var c = -1, p = arguments.length, k = -1, v = i.length, _ = m(v + p), R = this && this !== Ne && this instanceof u ? l : e; ++k < v; )
            _[k] = i[k];
          for (; p--; )
            _[k++] = arguments[++c];
          return at(R, r ? n : this, _);
        }
        return u;
      }
      function fl(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && Ze(t, n, i) && (n = i = a), t = Ht(t), n === a ? (n = t, t = 0) : n = Ht(n), i = i === a ? t < n ? 1 : -1 : Ht(i), u1(t, n, i, e);
        };
      }
      function Ui(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = yt(t), n = yt(n)), e(t, n);
        };
      }
      function pl(e, t, n, i, r, l, u, c, p, k) {
        var v = t & ce, _ = v ? u : a, R = v ? a : u, K = v ? l : a, ee = v ? a : l;
        t |= v ? H : V, t &= ~(v ? V : H), t & he || (t &= -4);
        var ue = [
          e,
          t,
          r,
          K,
          _,
          ee,
          R,
          c,
          p,
          k
        ], te = n.apply(a, ue);
        return ua(e) && Al(te, ue), te.placeholder = i, wl(te, e, t);
      }
      function na(e) {
        var t = Re[e];
        return function(n, i) {
          if (n = yt(n), i = i == null ? 0 : He(oe(i), 292), i && ws(n)) {
            var r = (be(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (be(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var A1 = $n && 1 / gi(new $n([, -0]))[1] == Ct ? function(e) {
        return new $n(e);
      } : Sa;
      function hl(e) {
        return function(t) {
          var n = Qe(t);
          return n == rt ? Br(t) : n == E ? Wo(t) : $o(t, e(t));
        };
      }
      function Wt(e, t, n, i, r, l, u, c) {
        var p = t & ye;
        if (!p && typeof e != "function")
          throw new pt(L);
        var k = i ? i.length : 0;
        if (k || (t &= -97, i = r = a), u = u === a ? u : Ge(oe(u), 0), c = c === a ? c : oe(c), k -= r ? r.length : 0, t & V) {
          var v = i, _ = r;
          i = r = a;
        }
        var R = p ? a : aa(e), K = [
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
        if (R && M1(K, R), e = K[0], t = K[1], n = K[2], i = K[3], r = K[4], c = K[9] = K[9] === a ? p ? 0 : e.length : Ge(K[9] - k, 0), !c && t & (ce | de) && (t &= -25), !t || t == J)
          var ee = b1(e, t, n);
        else
          t == ce || t == de ? ee = E1(e, t, c) : (t == H || t == (J | H)) && !r.length ? ee = S1(e, t, n, i) : ee = Ri.apply(a, K);
        var ue = R ? Ks : Al;
        return wl(ue(ee, K), e, t);
      }
      function ml(e, t, n, i) {
        return e === a || At(e, Fn[n]) && !Ee.call(i, n) ? t : e;
      }
      function gl(e, t, n, i, r, l) {
        return Le(e) && Le(t) && (l.set(t, e), $i(e, t, a, gl, l), l.delete(t)), e;
      }
      function w1(e) {
        return ri(e) ? a : e;
      }
      function xl(e, t, n, i, r, l) {
        var u = n & A, c = e.length, p = t.length;
        if (c != p && !(u && p > c))
          return !1;
        var k = l.get(e), v = l.get(t);
        if (k && v)
          return k == t && v == e;
        var _ = -1, R = !0, K = n & C ? new mn() : a;
        for (l.set(e, t), l.set(t, e); ++_ < c; ) {
          var ee = e[_], ue = t[_];
          if (i)
            var te = u ? i(ue, ee, _, t, e, l) : i(ee, ue, _, e, t, l);
          if (te !== a) {
            if (te)
              continue;
            R = !1;
            break;
          }
          if (K) {
            if (!wr(t, function(me, ke) {
              if (!qn(K, ke) && (ee === me || r(ee, me, n, i, l)))
                return K.push(ke);
            })) {
              R = !1;
              break;
            }
          } else if (!(ee === ue || r(ee, ue, n, i, l))) {
            R = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), R;
      }
      function C1(e, t, n, i, r, l, u) {
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
            return At(+e, +t);
          case wn:
            return e.name == t.name && e.message == t.message;
          case j:
          case W:
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
            i |= C, u.set(e, t);
            var v = xl(c(e), c(t), i, r, l, u);
            return u.delete(e), v;
          case we:
            if (Yn)
              return Yn.call(e) == Yn.call(t);
        }
        return !1;
      }
      function T1(e, t, n, i, r, l) {
        var u = n & A, c = ia(e), p = c.length, k = ia(t), v = k.length;
        if (p != v && !u)
          return !1;
        for (var _ = p; _--; ) {
          var R = c[_];
          if (!(u ? R in t : Ee.call(t, R)))
            return !1;
        }
        var K = l.get(e), ee = l.get(t);
        if (K && ee)
          return K == t && ee == e;
        var ue = !0;
        l.set(e, t), l.set(t, e);
        for (var te = u; ++_ < p; ) {
          R = c[_];
          var me = e[R], ke = t[R];
          if (i)
            var ut = u ? i(ke, me, R, t, e, l) : i(me, ke, R, e, t, l);
          if (!(ut === a ? me === ke || r(me, ke, n, i, l) : ut)) {
            ue = !1;
            break;
          }
          te || (te = R == "constructor");
        }
        if (ue && !te) {
          var Je = e.constructor, ct = t.constructor;
          Je != ct && "constructor" in e && "constructor" in t && !(typeof Je == "function" && Je instanceof Je && typeof ct == "function" && ct instanceof ct) && (ue = !1);
        }
        return l.delete(e), l.delete(t), ue;
      }
      function Nt(e) {
        return da(El(e, a, Bl), e + "");
      }
      function ia(e) {
        return Ps(e, Ue, la);
      }
      function ra(e) {
        return Ps(e, et, yl);
      }
      var aa = Ti ? function(e) {
        return Ti.get(e);
      } : Sa;
      function Wi(e) {
        for (var t = e.name + "", n = Vn[t], i = Ee.call(Vn, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function Gn(e) {
        var t = Ee.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function X() {
        var e = s.iteratee || ba;
        return e = e === ba ? Ms : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Ni(e, t) {
        var n = e.__data__;
        return O1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function sa(e) {
        for (var t = Ue(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, _l(r)];
        }
        return t;
      }
      function yn(e, t) {
        var n = Go(e, t);
        return Gs(n) ? n : a;
      }
      function D1(e) {
        var t = Ee.call(e, pn), n = e[pn];
        try {
          e[pn] = a;
          var i = !0;
        } catch {
        }
        var r = vi.call(e);
        return i && (t ? e[pn] = n : delete e[pn]), r;
      }
      var la = $r ? function(e) {
        return e == null ? [] : (e = Se(e), Xt($r(e), function(t) {
          return Ss.call(e, t);
        }));
      } : Aa, yl = $r ? function(e) {
        for (var t = []; e; )
          jt(t, la(e)), e = Ei(e);
        return t;
      } : Aa, Qe = Ye;
      (Vr && Qe(new Vr(new ArrayBuffer(1))) != Cn || Hn && Qe(new Hn()) != rt || Or && Qe(Or.resolve()) != ci || $n && Qe(new $n()) != E || Qn && Qe(new Qn()) != le) && (Qe = function(e) {
        var t = Ye(e), n = t == bt ? e.constructor : a, i = n ? kn(n) : "";
        if (i)
          switch (i) {
            case du:
              return Cn;
            case fu:
              return rt;
            case pu:
              return ci;
            case hu:
              return E;
            case mu:
              return le;
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
              t = He(t, e + u);
              break;
            case "takeRight":
              e = Ge(e, t - u);
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
        t = an(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = Lt(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && Zi(r) && qt(u, r) && (ae(e) || vn(e)));
      }
      function B1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && Ee.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function vl(e) {
        return typeof e.constructor == "function" && !ni(e) ? On(Ei(e)) : {};
      }
      function F1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case Nn:
            return ea(e);
          case Kt:
          case Yt:
            return new i(+e);
          case Cn:
            return g1(e, n);
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
          case W:
            return new i(e);
          case j:
            return x1(e);
          case E:
            return new i();
          case we:
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
        return ae(e) || vn(e) || !!(As && e && e[As]);
      }
      function qt(e, t) {
        var n = typeof e;
        return t = t ?? ze, !!t && (n == "number" || n != "symbol" && H0.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ze(e, t, n) {
        if (!Le(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? je(n) && qt(t, n.length) : i == "string" && t in n) ? At(n[t], e) : !1;
      }
      function oa(e, t) {
        if (ae(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || ot(e) ? !0 : L0.test(e) || !I0.test(e) || t != null && e in Se(t);
      }
      function O1(e) {
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
      function P1(e) {
        return !!_s && _s in e;
      }
      var R1 = yi ? zt : wa;
      function ni(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Fn;
        return e === n;
      }
      function _l(e) {
        return e === e && !Le(e);
      }
      function bl(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in Se(n));
        };
      }
      function G1(e) {
        var t = Ki(e, function(i) {
          return n.size === D && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function M1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (J | ye | F), u = i == F && n == ce || i == F && n == P && e[7].length <= t[8] || i == (F | P) && t[7].length <= t[8] && n == ce;
        if (!(l || u))
          return e;
        i & J && (e[2] = t[2], r |= n & J ? 0 : he);
        var c = t[3];
        if (c) {
          var p = e[3];
          e[3] = p ? rl(p, c, t[4]) : c, e[4] = p ? en(e[3], M) : t[4];
        }
        return c = t[5], c && (p = e[5], e[5] = p ? al(p, c, t[6]) : c, e[6] = p ? en(e[5], M) : t[6]), c = t[7], c && (e[7] = c), i & F && (e[8] = e[8] == null ? t[8] : He(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
      }
      function U1(e) {
        var t = [];
        if (e != null)
          for (var n in Se(e))
            t.push(n);
        return t;
      }
      function W1(e) {
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
      function N1(e, t) {
        for (var n = e.length, i = He(t.length, n), r = Xe(e); i--; ) {
          var l = t[i];
          e[i] = qt(l, n) ? r[l] : a;
        }
        return e;
      }
      function ca(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Al = Cl(Ks), ii = ru || function(e, t) {
        return Ne.setTimeout(e, t);
      }, da = Cl(f1);
      function wl(e, t, n) {
        var i = t + "";
        return da(e, $1(i, q1(L1(i), n)));
      }
      function Cl(e) {
        var t = 0, n = 0;
        return function() {
          var i = ou(), r = kt - (i - n);
          if (n = i, r > 0) {
            if (++t >= Pe)
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
      var Tl = G1(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(B0, function(n, i, r, l) {
          t.push(r ? l.replace(M0, "$1") : i || n);
        }), t;
      });
      function Lt(e) {
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
      function q1(e, t) {
        return ft(Tt, function(n) {
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
      function z1(e, t, n) {
        (n ? Ze(e, t, n) : t === a) ? t = 1 : t = Ge(oe(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = m(wi(i / t)); r < i; )
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
        for (var t = m(e - 1), n = arguments[0], i = e; i--; )
          t[i - 1] = arguments[i];
        return jt(ae(n) ? Xe(n) : [n], qe(t, 1));
      }
      var K1 = fe(function(e, t) {
        return Ve(e) ? Jn(e, qe(t, 1, Ve, !0)) : [];
      }), Y1 = fe(function(e, t) {
        var n = xt(t);
        return Ve(n) && (n = a), Ve(e) ? Jn(e, qe(t, 1, Ve, !0), X(n, 2)) : [];
      }), Z1 = fe(function(e, t) {
        var n = xt(t);
        return Ve(n) && (n = a), Ve(e) ? Jn(e, qe(t, 1, Ve, !0), a, n) : [];
      });
      function J1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : oe(t), gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function X1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : oe(t), t = i - t, gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function j1(e, t) {
        return e && e.length ? Oi(e, X(t, 3), !0, !0) : [];
      }
      function ec(e, t) {
        return e && e.length ? Oi(e, X(t, 3), !0) : [];
      }
      function tc(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && Ze(e, t, n) && (n = 0, i = r), Qu(e, t, n, i)) : [];
      }
      function Il(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : oe(n);
        return r < 0 && (r = Ge(i + r, 0)), mi(e, X(t, 3), r);
      }
      function Ll(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = oe(n), r = n < 0 ? Ge(i + r, 0) : He(r, i - 1)), mi(e, X(t, 3), r, !0);
      }
      function Bl(e) {
        var t = e == null ? 0 : e.length;
        return t ? qe(e, 1) : [];
      }
      function nc(e) {
        var t = e == null ? 0 : e.length;
        return t ? qe(e, Ct) : [];
      }
      function ic(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : oe(t), qe(e, t)) : [];
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
        var r = n == null ? 0 : oe(n);
        return r < 0 && (r = Ge(i + r, 0)), Dn(e, t, r);
      }
      function sc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 0, -1) : [];
      }
      var lc = fe(function(e) {
        var t = Ie(e, Xr);
        return t.length && t[0] === e[0] ? Wr(t) : [];
      }), oc = fe(function(e) {
        var t = xt(e), n = Ie(e, Xr);
        return t === xt(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Wr(n, X(t, 2)) : [];
      }), uc = fe(function(e) {
        var t = xt(e), n = Ie(e, Xr);
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
        return n !== a && (r = oe(n), r = r < 0 ? Ge(i + r, 0) : He(r, i - 1)), t === t ? qo(e, t, r) : mi(e, ps, r, !0);
      }
      function fc(e, t) {
        return e && e.length ? qs(e, oe(t)) : a;
      }
      var pc = fe($l);
      function $l(e, t) {
        return e && e.length && t && t.length ? Hr(e, t) : e;
      }
      function hc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, X(n, 2)) : e;
      }
      function mc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, a, n) : e;
      }
      var gc = Nt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Rr(e, t);
        return Qs(e, Ie(t, function(r) {
          return qt(r, n) ? +r : r;
        }).sort(il)), i;
      });
      function xc(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var i = -1, r = [], l = e.length;
        for (t = X(t, 3); ++i < l; ) {
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
        return i ? (n && typeof n != "number" && Ze(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : oe(t), n = n === a ? i : oe(n)), gt(e, t, n)) : [];
      }
      function kc(e, t) {
        return Vi(e, t);
      }
      function vc(e, t, n) {
        return Yr(e, t, X(n, 2));
      }
      function _c(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Vi(e, t);
          if (i < n && At(e[i], t))
            return i;
        }
        return -1;
      }
      function bc(e, t) {
        return Vi(e, t, !0);
      }
      function Ec(e, t, n) {
        return Yr(e, t, X(n, 2), !0);
      }
      function Sc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Vi(e, t, !0) - 1;
          if (At(e[i], t))
            return i;
        }
        return -1;
      }
      function Ac(e) {
        return e && e.length ? Ys(e) : [];
      }
      function wc(e, t) {
        return e && e.length ? Ys(e, X(t, 2)) : [];
      }
      function Cc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 1, t) : [];
      }
      function Tc(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : oe(t), gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Dc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : oe(t), t = i - t, gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Ic(e, t) {
        return e && e.length ? Oi(e, X(t, 3), !1, !0) : [];
      }
      function Lc(e, t) {
        return e && e.length ? Oi(e, X(t, 3)) : [];
      }
      var Bc = fe(function(e) {
        return rn(qe(e, 1, Ve, !0));
      }), Fc = fe(function(e) {
        var t = xt(e);
        return Ve(t) && (t = a), rn(qe(e, 1, Ve, !0), X(t, 2));
      }), $c = fe(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, rn(qe(e, 1, Ve, !0), a, t);
      });
      function Vc(e) {
        return e && e.length ? rn(e) : [];
      }
      function Oc(e, t) {
        return e && e.length ? rn(e, X(t, 2)) : [];
      }
      function Pc(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? rn(e, a, t) : [];
      }
      function pa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = Xt(e, function(n) {
          if (Ve(n))
            return t = Ge(n.length, t), !0;
        }), Ir(t, function(n) {
          return Ie(e, Cr(n));
        });
      }
      function Vl(e, t) {
        if (!(e && e.length))
          return [];
        var n = pa(e);
        return t == null ? n : Ie(n, function(i) {
          return at(t, a, i);
        });
      }
      var Rc = fe(function(e, t) {
        return Ve(e) ? Jn(e, t) : [];
      }), Gc = fe(function(e) {
        return Jr(Xt(e, Ve));
      }), Mc = fe(function(e) {
        var t = xt(e);
        return Ve(t) && (t = a), Jr(Xt(e, Ve), X(t, 2));
      }), Uc = fe(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, Jr(Xt(e, Ve), a, t);
      }), Wc = fe(pa);
      function Nc(e, t) {
        return js(e || [], t || [], Zn);
      }
      function qc(e, t) {
        return js(e || [], t || [], ei);
      }
      var zc = fe(function(e) {
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
      function zi(e, t) {
        return t(e);
      }
      var Qc = Nt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Rr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof ge) || !qt(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: zi,
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
        for (var t, n = this; n instanceof Ii; ) {
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
            func: zi,
            args: [fa],
            thisArg: a
          }), new ht(t, this.__chain__);
        }
        return this.thru(fa);
      }
      function ed() {
        return Xs(this.__wrapped__, this.__actions__);
      }
      var td = Pi(function(e, t, n) {
        Ee.call(e, n) ? ++e[n] : Ut(e, n, 1);
      });
      function nd(e, t, n) {
        var i = ae(e) ? ds : Hu;
        return n && Ze(e, t, n) && (t = a), i(e, X(t, 3));
      }
      function id(e, t) {
        var n = ae(e) ? Xt : Vs;
        return n(e, X(t, 3));
      }
      var rd = ul(Il), ad = ul(Ll);
      function sd(e, t) {
        return qe(Hi(e, t), 1);
      }
      function ld(e, t) {
        return qe(Hi(e, t), Ct);
      }
      function od(e, t, n) {
        return n = n === a ? 1 : oe(n), qe(Hi(e, t), n);
      }
      function Pl(e, t) {
        var n = ae(e) ? ft : nn;
        return n(e, X(t, 3));
      }
      function Rl(e, t) {
        var n = ae(e) ? Co : $s;
        return n(e, X(t, 3));
      }
      var ud = Pi(function(e, t, n) {
        Ee.call(e, n) ? e[n].push(t) : Ut(e, n, [t]);
      });
      function cd(e, t, n, i) {
        e = je(e) ? e : Un(e), n = n && !i ? oe(n) : 0;
        var r = e.length;
        return n < 0 && (n = Ge(r + n, 0)), Ji(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && Dn(e, t, n) > -1;
      }
      var dd = fe(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = je(e) ? m(e.length) : [];
        return nn(e, function(u) {
          l[++i] = r ? at(t, u, n) : Xn(u, t, n);
        }), l;
      }), fd = Pi(function(e, t, n) {
        Ut(e, n, t);
      });
      function Hi(e, t) {
        var n = ae(e) ? Ie : Us;
        return n(e, X(t, 3));
      }
      function pd(e, t, n, i) {
        return e == null ? [] : (ae(t) || (t = t == null ? [] : [t]), n = i ? a : n, ae(n) || (n = n == null ? [] : [n]), zs(e, t, n));
      }
      var hd = Pi(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function md(e, t, n) {
        var i = ae(e) ? Ar : ms, r = arguments.length < 3;
        return i(e, X(t, 4), n, r, nn);
      }
      function gd(e, t, n) {
        var i = ae(e) ? To : ms, r = arguments.length < 3;
        return i(e, X(t, 4), n, r, $s);
      }
      function xd(e, t) {
        var n = ae(e) ? Xt : Vs;
        return n(e, Yi(X(t, 3)));
      }
      function yd(e) {
        var t = ae(e) ? Is : c1;
        return t(e);
      }
      function kd(e, t, n) {
        (n ? Ze(e, t, n) : t === a) ? t = 1 : t = oe(t);
        var i = ae(e) ? Uu : d1;
        return i(e, t);
      }
      function vd(e) {
        var t = ae(e) ? Wu : p1;
        return t(e);
      }
      function _d(e) {
        if (e == null)
          return 0;
        if (je(e))
          return Ji(e) ? Ln(e) : e.length;
        var t = Qe(e);
        return t == rt || t == E ? e.size : qr(e).length;
      }
      function bd(e, t, n) {
        var i = ae(e) ? wr : h1;
        return n && Ze(e, t, n) && (t = a), i(e, X(t, 3));
      }
      var Ed = fe(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Ze(e, t[0], t[1]) ? t = [] : n > 2 && Ze(t[0], t[1], t[2]) && (t = [t[0]]), zs(e, qe(t, 1), []);
      }), Qi = iu || function() {
        return Ne.Date.now();
      };
      function Sd(e, t) {
        if (typeof t != "function")
          throw new pt(L);
        return e = oe(e), function() {
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
          throw new pt(L);
        return e = oe(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var ha = fe(function(e, t, n) {
        var i = J;
        if (n.length) {
          var r = en(n, Gn(ha));
          i |= H;
        }
        return Wt(e, i, t, n, r);
      }), Ul = fe(function(e, t, n) {
        var i = J | ye;
        if (n.length) {
          var r = en(n, Gn(Ul));
          i |= H;
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
        var i, r, l, u, c, p, k = 0, v = !1, _ = !1, R = !0;
        if (typeof e != "function")
          throw new pt(L);
        t = yt(t) || 0, Le(n) && (v = !!n.leading, _ = "maxWait" in n, l = _ ? Ge(yt(n.maxWait) || 0, t) : l, R = "trailing" in n ? !!n.trailing : R);
        function K(Oe) {
          var wt = i, Qt = r;
          return i = r = a, k = Oe, u = e.apply(Qt, wt), u;
        }
        function ee(Oe) {
          return k = Oe, c = ii(me, t), v ? K(Oe) : u;
        }
        function ue(Oe) {
          var wt = Oe - p, Qt = Oe - k, u0 = t - wt;
          return _ ? He(u0, l - Qt) : u0;
        }
        function te(Oe) {
          var wt = Oe - p, Qt = Oe - k;
          return p === a || wt >= t || wt < 0 || _ && Qt >= l;
        }
        function me() {
          var Oe = Qi();
          if (te(Oe))
            return ke(Oe);
          c = ii(me, ue(Oe));
        }
        function ke(Oe) {
          return c = a, R && i ? K(Oe) : (i = r = a, u);
        }
        function ut() {
          c !== a && el(c), k = 0, i = p = r = c = a;
        }
        function Je() {
          return c === a ? u : ke(Qi());
        }
        function ct() {
          var Oe = Qi(), wt = te(Oe);
          if (i = arguments, r = this, p = Oe, wt) {
            if (c === a)
              return ee(p);
            if (_)
              return el(c), c = ii(me, t), K(p);
          }
          return c === a && (c = ii(me, t)), u;
        }
        return ct.cancel = ut, ct.flush = Je, ct;
      }
      var Ad = fe(function(e, t) {
        return Fs(e, 1, t);
      }), wd = fe(function(e, t, n) {
        return Fs(e, yt(t) || 0, n);
      });
      function Cd(e) {
        return Wt(e, ve);
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
        return n.cache = new (Ki.Cache || Mt)(), n;
      }
      Ki.Cache = Mt;
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
      function Td(e) {
        return Ml(2, e);
      }
      var Dd = m1(function(e, t) {
        t = t.length == 1 && ae(t[0]) ? Ie(t[0], st(X())) : Ie(qe(t, 1), st(X()));
        var n = t.length;
        return fe(function(i) {
          for (var r = -1, l = He(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return at(e, this, i);
        });
      }), ma = fe(function(e, t) {
        var n = en(t, Gn(ma));
        return Wt(e, H, a, t, n);
      }), zl = fe(function(e, t) {
        var n = en(t, Gn(zl));
        return Wt(e, V, a, t, n);
      }), Id = Nt(function(e, t) {
        return Wt(e, P, a, a, a, t);
      });
      function Ld(e, t) {
        if (typeof e != "function")
          throw new pt(L);
        return t = t === a ? t : oe(t), fe(e, t);
      }
      function Bd(e, t) {
        if (typeof e != "function")
          throw new pt(L);
        return t = t == null ? 0 : Ge(oe(t), 0), fe(function(n) {
          var i = n[t], r = sn(n, 0, t);
          return i && jt(r, i), at(e, this, r);
        });
      }
      function Fd(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new pt(L);
        return Le(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), ql(e, t, {
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
        return ae(e) ? e : [e];
      }
      function Pd(e) {
        return mt(e, I);
      }
      function Rd(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, I, t);
      }
      function Gd(e) {
        return mt(e, Y | I);
      }
      function Md(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, Y | I, t);
      }
      function Ud(e, t) {
        return t == null || Bs(e, t, Ue(t));
      }
      function At(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Wd = Ui(Ur), Nd = Ui(function(e, t) {
        return e >= t;
      }), vn = Rs(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Rs : function(e) {
        return Be(e) && Ee.call(e, "callee") && !Ss.call(e, "callee");
      }, ae = m.isArray, qd = as ? st(as) : Xu;
      function je(e) {
        return e != null && Zi(e.length) && !zt(e);
      }
      function Ve(e) {
        return Be(e) && je(e);
      }
      function zd(e) {
        return e === !0 || e === !1 || Be(e) && Ye(e) == Kt;
      }
      var ln = au || wa, Hd = ss ? st(ss) : ju;
      function Qd(e) {
        return Be(e) && e.nodeType === 1 && !ri(e);
      }
      function Kd(e) {
        if (e == null)
          return !0;
        if (je(e) && (ae(e) || typeof e == "string" || typeof e.splice == "function" || ln(e) || Mn(e) || vn(e)))
          return !e.length;
        var t = Qe(e);
        if (t == rt || t == E)
          return !e.size;
        if (ni(e))
          return !qr(e).length;
        for (var n in e)
          if (Ee.call(e, n))
            return !1;
        return !0;
      }
      function Yd(e, t) {
        return jn(e, t);
      }
      function Zd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? jn(e, t, a, n) : !!i;
      }
      function ga(e) {
        if (!Be(e))
          return !1;
        var t = Ye(e);
        return t == wn || t == ir || typeof e.message == "string" && typeof e.name == "string" && !ri(e);
      }
      function Jd(e) {
        return typeof e == "number" && ws(e);
      }
      function zt(e) {
        if (!Le(e))
          return !1;
        var t = Ye(e);
        return t == Rt || t == ui || t == De || t == ar;
      }
      function Hl(e) {
        return typeof e == "number" && e == oe(e);
      }
      function Zi(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ze;
      }
      function Le(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Be(e) {
        return e != null && typeof e == "object";
      }
      var Ql = ls ? st(ls) : t1;
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
          throw new re($);
        return Gs(e);
      }
      function nf(e) {
        return e === null;
      }
      function rf(e) {
        return e == null;
      }
      function Kl(e) {
        return typeof e == "number" || Be(e) && Ye(e) == Zt;
      }
      function ri(e) {
        if (!Be(e) || Ye(e) != bt)
          return !1;
        var t = Ei(e);
        if (t === null)
          return !0;
        var n = Ee.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && ki.call(n) == jo;
      }
      var xa = os ? st(os) : n1;
      function af(e) {
        return Hl(e) && e >= -9007199254740991 && e <= ze;
      }
      var Yl = us ? st(us) : i1;
      function Ji(e) {
        return typeof e == "string" || !ae(e) && Be(e) && Ye(e) == W;
      }
      function ot(e) {
        return typeof e == "symbol" || Be(e) && Ye(e) == we;
      }
      var Mn = cs ? st(cs) : r1;
      function sf(e) {
        return e === a;
      }
      function lf(e) {
        return Be(e) && Qe(e) == le;
      }
      function of(e) {
        return Be(e) && Ye(e) == Jt;
      }
      var uf = Ui(zr), cf = Ui(function(e, t) {
        return e <= t;
      });
      function Zl(e) {
        if (!e)
          return [];
        if (je(e))
          return Ji(e) ? Et(e) : Xe(e);
        if (zn && e[zn])
          return Uo(e[zn]());
        var t = Qe(e), n = t == rt ? Br : t == E ? gi : Un;
        return n(e);
      }
      function Ht(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = yt(e), e === Ct || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * ne;
        }
        return e === e ? e : 0;
      }
      function oe(e) {
        var t = Ht(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Jl(e) {
        return e ? gn(oe(e), 0, w) : 0;
      }
      function yt(e) {
        if (typeof e == "number")
          return e;
        if (ot(e))
          return z;
        if (Le(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Le(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = gs(e);
        var n = N0.test(e);
        return n || z0.test(e) ? So(e.slice(2), n ? 2 : 8) : W0.test(e) ? z : +e;
      }
      function Xl(e) {
        return It(e, et(e));
      }
      function df(e) {
        return e ? gn(oe(e), -9007199254740991, ze) : e === 0 ? e : 0;
      }
      function be(e) {
        return e == null ? "" : lt(e);
      }
      var ff = Pn(function(e, t) {
        if (ni(t) || je(t)) {
          It(t, Ue(t), e);
          return;
        }
        for (var n in t)
          Ee.call(t, n) && Zn(e, n, t[n]);
      }), jl = Pn(function(e, t) {
        It(t, et(t), e);
      }), Xi = Pn(function(e, t, n, i) {
        It(t, et(t), e, i);
      }), pf = Pn(function(e, t, n, i) {
        It(t, Ue(t), e, i);
      }), hf = Nt(Rr);
      function mf(e, t) {
        var n = On(e);
        return t == null ? n : Ls(n, t);
      }
      var gf = fe(function(e, t) {
        e = Se(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && Ze(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = et(l), c = -1, p = u.length; ++c < p; ) {
            var k = u[c], v = e[k];
            (v === a || At(v, Fn[k]) && !Ee.call(e, k)) && (e[k] = l[k]);
          }
        return e;
      }), xf = fe(function(e) {
        return e.push(a, gl), at(e0, a, e);
      });
      function yf(e, t) {
        return fs(e, X(t, 3), Dt);
      }
      function kf(e, t) {
        return fs(e, X(t, 3), Mr);
      }
      function vf(e, t) {
        return e == null ? e : Gr(e, X(t, 3), et);
      }
      function _f(e, t) {
        return e == null ? e : Os(e, X(t, 3), et);
      }
      function bf(e, t) {
        return e && Dt(e, X(t, 3));
      }
      function Ef(e, t) {
        return e && Mr(e, X(t, 3));
      }
      function Sf(e) {
        return e == null ? [] : Fi(e, Ue(e));
      }
      function Af(e) {
        return e == null ? [] : Fi(e, et(e));
      }
      function ya(e, t, n) {
        var i = e == null ? a : xn(e, t);
        return i === a ? n : i;
      }
      function wf(e, t) {
        return e != null && kl(e, t, Ku);
      }
      function ka(e, t) {
        return e != null && kl(e, t, Yu);
      }
      var Cf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), e[t] = n;
      }, _a(tt)), Tf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), Ee.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, X), Df = fe(Xn);
      function Ue(e) {
        return je(e) ? Ds(e) : qr(e);
      }
      function et(e) {
        return je(e) ? Ds(e, !0) : a1(e);
      }
      function If(e, t) {
        var n = {};
        return t = X(t, 3), Dt(e, function(i, r, l) {
          Ut(n, t(i, r, l), i);
        }), n;
      }
      function Lf(e, t) {
        var n = {};
        return t = X(t, 3), Dt(e, function(i, r, l) {
          Ut(n, r, t(i, r, l));
        }), n;
      }
      var Bf = Pn(function(e, t, n) {
        $i(e, t, n);
      }), e0 = Pn(function(e, t, n, i) {
        $i(e, t, n, i);
      }), Ff = Nt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Ie(t, function(l) {
          return l = an(l, e), i || (i = l.length > 1), l;
        }), It(e, ra(e), n), i && (n = mt(n, Y | Q | I, w1));
        for (var r = t.length; r--; )
          Zr(n, t[r]);
        return n;
      });
      function $f(e, t) {
        return t0(e, Yi(X(t)));
      }
      var Vf = Nt(function(e, t) {
        return e == null ? {} : l1(e, t);
      });
      function t0(e, t) {
        if (e == null)
          return {};
        var n = Ie(ra(e), function(i) {
          return [i];
        });
        return t = X(t), Hs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function Of(e, t, n) {
        t = an(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[Lt(t[i])];
          l === a && (i = r, l = n), e = zt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Pf(e, t, n) {
        return e == null ? e : ei(e, t, n);
      }
      function Rf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : ei(e, t, n, i);
      }
      var n0 = hl(Ue), i0 = hl(et);
      function Gf(e, t, n) {
        var i = ae(e), r = i || ln(e) || Mn(e);
        if (t = X(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : Le(e) ? n = zt(l) ? On(Ei(e)) : {} : n = {};
        }
        return (r ? ft : Dt)(e, function(u, c, p) {
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
      function Un(e) {
        return e == null ? [] : Lr(e, Ue(e));
      }
      function Nf(e) {
        return e == null ? [] : Lr(e, et(e));
      }
      function qf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = yt(n), n = n === n ? n : 0), t !== a && (t = yt(t), t = t === t ? t : 0), gn(yt(e), t, n);
      }
      function zf(e, t, n) {
        return t = Ht(t), n === a ? (n = t, t = 0) : n = Ht(n), e = yt(e), Zu(e, t, n);
      }
      function Hf(e, t, n) {
        if (n && typeof n != "boolean" && Ze(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Ht(e), t === a ? (t = e, e = 0) : t = Ht(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = Cs();
          return He(e + r * (t - e + Eo("1e-" + ((r + "").length - 1))), t);
        }
        return Qr(e, t);
      }
      var Qf = Rn(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? r0(t) : t);
      });
      function r0(e) {
        return va(be(e).toLowerCase());
      }
      function a0(e) {
        return e = be(e), e && e.replace(Q0, Oo).replace(po, "");
      }
      function Kf(e, t, n) {
        e = be(e), t = lt(t);
        var i = e.length;
        n = n === a ? i : gn(oe(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Yf(e) {
        return e = be(e), e && C0.test(e) ? e.replace(Oa, Po) : e;
      }
      function Zf(e) {
        return e = be(e), e && F0.test(e) ? e.replace(mr, "\\$&") : e;
      }
      var Jf = Rn(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), Xf = Rn(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), jf = ol("toLowerCase");
      function ep(e, t, n) {
        e = be(e), t = oe(t);
        var i = t ? Ln(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return Mi(Ci(r), n) + e + Mi(wi(r), n);
      }
      function tp(e, t, n) {
        e = be(e), t = oe(t);
        var i = t ? Ln(e) : 0;
        return t && i < t ? e + Mi(t - i, n) : e;
      }
      function np(e, t, n) {
        e = be(e), t = oe(t);
        var i = t ? Ln(e) : 0;
        return t && i < t ? Mi(t - i, n) + e : e;
      }
      function ip(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), uu(be(e).replace(gr, ""), t || 0);
      }
      function rp(e, t, n) {
        return (n ? Ze(e, t, n) : t === a) ? t = 1 : t = oe(t), Kr(be(e), t);
      }
      function ap() {
        var e = arguments, t = be(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var sp = Rn(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function lp(e, t, n) {
        return n && typeof n != "number" && Ze(e, t, n) && (t = n = a), n = n === a ? w : n >>> 0, n ? (e = be(e), e && (typeof t == "string" || t != null && !xa(t)) && (t = lt(t), !t && In(e)) ? sn(Et(e), 0, n) : e.split(t, n)) : [];
      }
      var op = Rn(function(e, t, n) {
        return e + (n ? " " : "") + va(t);
      });
      function up(e, t, n) {
        return e = be(e), n = n == null ? 0 : gn(oe(n), 0, e.length), t = lt(t), e.slice(n, n + t.length) == t;
      }
      function cp(e, t, n) {
        var i = s.templateSettings;
        n && Ze(e, t, n) && (t = a), e = be(e), t = Xi({}, t, i, ml);
        var r = Xi({}, t.imports, i.imports, ml), l = Ue(r), u = Lr(r, l), c, p, k = 0, v = t.interpolate || di, _ = "__p += '", R = Fr(
          (t.escape || di).source + "|" + v.source + "|" + (v === Pa ? U0 : di).source + "|" + (t.evaluate || di).source + "|$",
          "g"
        ), K = "//# sourceURL=" + (Ee.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++yo + "]") + `
`;
        e.replace(R, function(te, me, ke, ut, Je, ct) {
          return ke || (ke = ut), _ += e.slice(k, ct).replace(K0, Ro), me && (c = !0, _ += `' +
__e(` + me + `) +
'`), Je && (p = !0, _ += `';
` + Je + `;
__p += '`), ke && (_ += `' +
((__t = (` + ke + `)) == null ? '' : __t) +
'`), k = ct + te.length, te;
        }), _ += `';
`;
        var ee = Ee.call(t, "variable") && t.variable;
        if (!ee)
          _ = `with (obj) {
` + _ + `
}
`;
        else if (G0.test(ee))
          throw new re(G);
        _ = (p ? _.replace(E0, "") : _).replace(S0, "$1").replace(A0, "$1;"), _ = "function(" + (ee || "obj") + `) {
` + (ee ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (p ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + _ + `return __p
}`;
        var ue = l0(function() {
          return _e(l, K + "return " + _).apply(a, u);
        });
        if (ue.source = _, ga(ue))
          throw ue;
        return ue;
      }
      function dp(e) {
        return be(e).toLowerCase();
      }
      function fp(e) {
        return be(e).toUpperCase();
      }
      function pp(e, t, n) {
        if (e = be(e), e && (n || t === a))
          return gs(e);
        if (!e || !(t = lt(t)))
          return e;
        var i = Et(e), r = Et(t), l = xs(i, r), u = ys(i, r) + 1;
        return sn(i, l, u).join("");
      }
      function hp(e, t, n) {
        if (e = be(e), e && (n || t === a))
          return e.slice(0, vs(e) + 1);
        if (!e || !(t = lt(t)))
          return e;
        var i = Et(e), r = ys(i, Et(t)) + 1;
        return sn(i, 0, r).join("");
      }
      function mp(e, t, n) {
        if (e = be(e), e && (n || t === a))
          return e.replace(gr, "");
        if (!e || !(t = lt(t)))
          return e;
        var i = Et(e), r = xs(i, Et(t));
        return sn(i, r).join("");
      }
      function gp(e, t) {
        var n = $e, i = Me;
        if (Le(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? oe(t.length) : n, i = "omission" in t ? lt(t.omission) : i;
        }
        e = be(e);
        var l = e.length;
        if (In(e)) {
          var u = Et(e);
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
            for (r.global || (r = Fr(r.source, be(Ra.exec(r)) + "g")), r.lastIndex = 0; k = r.exec(v); )
              var _ = k.index;
            p = p.slice(0, _ === a ? c : _);
          }
        } else if (e.indexOf(lt(r), c) != c) {
          var R = p.lastIndexOf(r);
          R > -1 && (p = p.slice(0, R));
        }
        return p + i;
      }
      function xp(e) {
        return e = be(e), e && w0.test(e) ? e.replace(Va, zo) : e;
      }
      var yp = Rn(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), va = ol("toUpperCase");
      function s0(e, t, n) {
        return e = be(e), t = n ? a : t, t === a ? Mo(e) ? Ko(e) : Lo(e) : e.match(t) || [];
      }
      var l0 = fe(function(e, t) {
        try {
          return at(e, a, t);
        } catch (n) {
          return ga(n) ? n : new re(n);
        }
      }), kp = Nt(function(e, t) {
        return ft(t, function(n) {
          n = Lt(n), Ut(e, n, ha(e[n], e));
        }), e;
      });
      function vp(e) {
        var t = e == null ? 0 : e.length, n = X();
        return e = t ? Ie(e, function(i) {
          if (typeof i[1] != "function")
            throw new pt(L);
          return [n(i[0]), i[1]];
        }) : [], fe(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (at(l[0], this, i))
              return at(l[1], this, i);
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
      function tt(e) {
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
      var Cp = fe(function(e, t) {
        return function(n) {
          return Xn(n, e, t);
        };
      }), Tp = fe(function(e, t) {
        return function(n) {
          return Xn(e, n, t);
        };
      });
      function Ea(e, t, n) {
        var i = Ue(t), r = Fi(t, i);
        n == null && !(Le(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Fi(t, Ue(t)));
        var l = !(Le(n) && "chain" in n) || !!n.chain, u = zt(e);
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
      function Dp() {
        return Ne._ === this && (Ne._ = eu), this;
      }
      function Sa() {
      }
      function Ip(e) {
        return e = oe(e), fe(function(t) {
          return qs(t, e);
        });
      }
      var Lp = ta(Ie), Bp = ta(ds), Fp = ta(wr);
      function o0(e) {
        return oa(e) ? Cr(Lt(e)) : o1(e);
      }
      function $p(e) {
        return function(t) {
          return e == null ? a : xn(e, t);
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
        if (e = oe(e), e < 1 || e > ze)
          return [];
        var n = w, i = He(e, w);
        t = X(t), e -= w;
        for (var r = Ir(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Up(e) {
        return ae(e) ? Ie(e, Lt) : ot(e) ? [e] : Xe(Tl(be(e)));
      }
      function Wp(e) {
        var t = ++Xo;
        return be(e) + t;
      }
      var Np = Gi(function(e, t) {
        return e + t;
      }, 0), qp = na("ceil"), zp = Gi(function(e, t) {
        return e / t;
      }, 1), Hp = na("floor");
      function Qp(e) {
        return e && e.length ? Bi(e, tt, Ur) : a;
      }
      function Kp(e, t) {
        return e && e.length ? Bi(e, X(t, 2), Ur) : a;
      }
      function Yp(e) {
        return hs(e, tt);
      }
      function Zp(e, t) {
        return hs(e, X(t, 2));
      }
      function Jp(e) {
        return e && e.length ? Bi(e, tt, zr) : a;
      }
      function Xp(e, t) {
        return e && e.length ? Bi(e, X(t, 2), zr) : a;
      }
      var jp = Gi(function(e, t) {
        return e * t;
      }, 1), eh = na("round"), th = Gi(function(e, t) {
        return e - t;
      }, 0);
      function nh(e) {
        return e && e.length ? Dr(e, tt) : 0;
      }
      function ih(e, t) {
        return e && e.length ? Dr(e, X(t, 2)) : 0;
      }
      return s.after = Sd, s.ary = Gl, s.assign = ff, s.assignIn = jl, s.assignInWith = Xi, s.assignWith = pf, s.at = hf, s.before = Ml, s.bind = ha, s.bindAll = kp, s.bindKey = Ul, s.castArray = Od, s.chain = Ol, s.chunk = z1, s.compact = H1, s.concat = Q1, s.cond = vp, s.conforms = _p, s.constant = _a, s.countBy = td, s.create = mf, s.curry = Wl, s.curryRight = Nl, s.debounce = ql, s.defaults = gf, s.defaultsDeep = xf, s.defer = Ad, s.delay = wd, s.difference = K1, s.differenceBy = Y1, s.differenceWith = Z1, s.drop = J1, s.dropRight = X1, s.dropRightWhile = j1, s.dropWhile = ec, s.fill = tc, s.filter = id, s.flatMap = sd, s.flatMapDeep = ld, s.flatMapDepth = od, s.flatten = Bl, s.flattenDeep = nc, s.flattenDepth = ic, s.flip = Cd, s.flow = Ep, s.flowRight = Sp, s.fromPairs = rc, s.functions = Sf, s.functionsIn = Af, s.groupBy = ud, s.initial = sc, s.intersection = lc, s.intersectionBy = oc, s.intersectionWith = uc, s.invert = Cf, s.invertBy = Tf, s.invokeMap = dd, s.iteratee = ba, s.keyBy = fd, s.keys = Ue, s.keysIn = et, s.map = Hi, s.mapKeys = If, s.mapValues = Lf, s.matches = Ap, s.matchesProperty = wp, s.memoize = Ki, s.merge = Bf, s.mergeWith = e0, s.method = Cp, s.methodOf = Tp, s.mixin = Ea, s.negate = Yi, s.nthArg = Ip, s.omit = Ff, s.omitBy = $f, s.once = Td, s.orderBy = pd, s.over = Lp, s.overArgs = Dd, s.overEvery = Bp, s.overSome = Fp, s.partial = ma, s.partialRight = zl, s.partition = hd, s.pick = Vf, s.pickBy = t0, s.property = o0, s.propertyOf = $p, s.pull = pc, s.pullAll = $l, s.pullAllBy = hc, s.pullAllWith = mc, s.pullAt = gc, s.range = Vp, s.rangeRight = Op, s.rearg = Id, s.reject = xd, s.remove = xc, s.rest = Ld, s.reverse = fa, s.sampleSize = kd, s.set = Pf, s.setWith = Rf, s.shuffle = vd, s.slice = yc, s.sortBy = Ed, s.sortedUniq = Ac, s.sortedUniqBy = wc, s.split = lp, s.spread = Bd, s.tail = Cc, s.take = Tc, s.takeRight = Dc, s.takeRightWhile = Ic, s.takeWhile = Lc, s.tap = Hc, s.throttle = Fd, s.thru = zi, s.toArray = Zl, s.toPairs = n0, s.toPairsIn = i0, s.toPath = Up, s.toPlainObject = Xl, s.transform = Gf, s.unary = $d, s.union = Bc, s.unionBy = Fc, s.unionWith = $c, s.uniq = Vc, s.uniqBy = Oc, s.uniqWith = Pc, s.unset = Mf, s.unzip = pa, s.unzipWith = Vl, s.update = Uf, s.updateWith = Wf, s.values = Un, s.valuesIn = Nf, s.without = Rc, s.words = s0, s.wrap = Vd, s.xor = Gc, s.xorBy = Mc, s.xorWith = Uc, s.zip = Wc, s.zipObject = Nc, s.zipObjectDeep = qc, s.zipWith = zc, s.entries = n0, s.entriesIn = i0, s.extend = jl, s.extendWith = Xi, Ea(s, s), s.add = Np, s.attempt = l0, s.camelCase = Qf, s.capitalize = r0, s.ceil = qp, s.clamp = qf, s.clone = Pd, s.cloneDeep = Gd, s.cloneDeepWith = Md, s.cloneWith = Rd, s.conformsTo = Ud, s.deburr = a0, s.defaultTo = bp, s.divide = zp, s.endsWith = Kf, s.eq = At, s.escape = Yf, s.escapeRegExp = Zf, s.every = nd, s.find = rd, s.findIndex = Il, s.findKey = yf, s.findLast = ad, s.findLastIndex = Ll, s.findLastKey = kf, s.floor = Hp, s.forEach = Pl, s.forEachRight = Rl, s.forIn = vf, s.forInRight = _f, s.forOwn = bf, s.forOwnRight = Ef, s.get = ya, s.gt = Wd, s.gte = Nd, s.has = wf, s.hasIn = ka, s.head = Fl, s.identity = tt, s.includes = cd, s.indexOf = ac, s.inRange = zf, s.invoke = Df, s.isArguments = vn, s.isArray = ae, s.isArrayBuffer = qd, s.isArrayLike = je, s.isArrayLikeObject = Ve, s.isBoolean = zd, s.isBuffer = ln, s.isDate = Hd, s.isElement = Qd, s.isEmpty = Kd, s.isEqual = Yd, s.isEqualWith = Zd, s.isError = ga, s.isFinite = Jd, s.isFunction = zt, s.isInteger = Hl, s.isLength = Zi, s.isMap = Ql, s.isMatch = Xd, s.isMatchWith = jd, s.isNaN = ef, s.isNative = tf, s.isNil = rf, s.isNull = nf, s.isNumber = Kl, s.isObject = Le, s.isObjectLike = Be, s.isPlainObject = ri, s.isRegExp = xa, s.isSafeInteger = af, s.isSet = Yl, s.isString = Ji, s.isSymbol = ot, s.isTypedArray = Mn, s.isUndefined = sf, s.isWeakMap = lf, s.isWeakSet = of, s.join = cc, s.kebabCase = Jf, s.last = xt, s.lastIndexOf = dc, s.lowerCase = Xf, s.lowerFirst = jf, s.lt = uf, s.lte = cf, s.max = Qp, s.maxBy = Kp, s.mean = Yp, s.meanBy = Zp, s.min = Jp, s.minBy = Xp, s.stubArray = Aa, s.stubFalse = wa, s.stubObject = Pp, s.stubString = Rp, s.stubTrue = Gp, s.multiply = jp, s.nth = fc, s.noConflict = Dp, s.noop = Sa, s.now = Qi, s.pad = ep, s.padEnd = tp, s.padStart = np, s.parseInt = ip, s.random = Hf, s.reduce = md, s.reduceRight = gd, s.repeat = rp, s.replace = ap, s.result = Of, s.round = eh, s.runInContext = d, s.sample = yd, s.size = _d, s.snakeCase = sp, s.some = bd, s.sortedIndex = kc, s.sortedIndexBy = vc, s.sortedIndexOf = _c, s.sortedLastIndex = bc, s.sortedLastIndexBy = Ec, s.sortedLastIndexOf = Sc, s.startCase = op, s.startsWith = up, s.subtract = th, s.sum = nh, s.sumBy = ih, s.template = cp, s.times = Mp, s.toFinite = Ht, s.toInteger = oe, s.toLength = Jl, s.toLower = dp, s.toNumber = yt, s.toSafeInteger = df, s.toString = be, s.toUpper = fp, s.trim = pp, s.trimEnd = hp, s.trimStart = mp, s.truncate = gp, s.unescape = xp, s.uniqueId = Wp, s.upperCase = yp, s.upperFirst = va, s.each = Pl, s.eachRight = Rl, s.first = Fl, Ea(s, function() {
        var e = {};
        return Dt(s, function(t, n) {
          Ee.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = b, ft(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), ft(["drop", "take"], function(e, t) {
        ge.prototype[e] = function(n) {
          n = n === a ? 1 : Ge(oe(n), 0);
          var i = this.__filtered__ && !t ? new ge(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = He(n, i.__takeCount__) : i.__views__.push({
            size: He(n, w),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, ge.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), ft(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == Ot || n == dn;
        ge.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: X(r, 3),
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
        return this.filter(tt);
      }, ge.prototype.find = function(e) {
        return this.filter(e).head();
      }, ge.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, ge.prototype.invokeMap = fe(function(e, t) {
        return typeof e == "function" ? new ge(this) : this.map(function(n) {
          return Xn(n, e, t);
        });
      }), ge.prototype.reject = function(e) {
        return this.filter(Yi(X(e)));
      }, ge.prototype.slice = function(e, t) {
        e = oe(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new ge(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = oe(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, ge.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, ge.prototype.toArray = function() {
        return this.take(w);
      }, Dt(ge.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, p = u instanceof ge, k = c[0], v = p || ae(u), _ = function(me) {
            var ke = r.apply(s, jt([me], c));
            return i && R ? ke[0] : ke;
          };
          v && n && typeof k == "function" && k.length != 1 && (p = v = !1);
          var R = this.__chain__, K = !!this.__actions__.length, ee = l && !R, ue = p && !K;
          if (!l && v) {
            u = ue ? u : new ge(this);
            var te = e.apply(u, c);
            return te.__actions__.push({ func: zi, args: [_], thisArg: a }), new ht(te, R);
          }
          return ee && ue ? e.apply(this, c) : (te = this.thru(_), ee ? i ? te.value()[0] : te.value() : te);
        });
      }), ft(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = xi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
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
      }), Dt(ge.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          Ee.call(Vn, i) || (Vn[i] = []), Vn[i].push({ name: t, func: n });
        }
      }), Vn[Ri(a, ye).name] = [{
        name: "wrapper",
        func: a
      }], ge.prototype.clone = gu, ge.prototype.reverse = xu, ge.prototype.value = yu, s.prototype.at = Qc, s.prototype.chain = Kc, s.prototype.commit = Yc, s.prototype.next = Zc, s.prototype.plant = Xc, s.prototype.reverse = jc, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = ed, s.prototype.first = s.prototype.head, zn && (s.prototype[zn] = Jc), s;
    }, Bn = Yo();
    fn ? ((fn.exports = Bn)._ = Bn, br._ = Bn) : Ne._ = Bn;
  }).call(ai);
})(er, er.exports);
var Ph = er.exports;
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
    si.FILTER_CHANGE,
    si.CLEAR_FILTERS
  ],
  setup(o, { emit: T }) {
    const a = T, b = o, g = Fe(() => b.filters ? b.filters.filter((O) => O.model) : []), $ = Fe(() => {
      const O = {};
      return g.value.forEach((D) => {
        O[D.key] = D.model;
      }), O;
    }), L = Ph.debounce(() => {
      a(si.FILTER_CHANGE, $);
    }, 800);
    function G() {
      a(si.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (O, D) => (h(), x("div", {
      class: We(["base-table-filters", { inactive: o.inactive }])
    }, [
      f("h6", Rh, [
        Z(S(Vt), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        D[1] || (D[1] = nt(" Filters "))
      ]),
      ji(O.$slots, "customFields", {}, void 0, !0),
      (h(!0), x(xe, null, Ae(o.filters, (M, Y) => (h(), x(xe, null, [
        M.type === "datetime" || M.type === "datetimehour" ? (h(), pe(S(x0), {
          class: "filter-elm",
          key: `${o.prefix}${M.key}`,
          label: M.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (Q) => o.filters[Y].model = Q,
          onInput: S(L)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : M.dataSource ? (h(), pe(S(Bt), {
          class: "filter-elm",
          key: `${o.prefix}${M.key}`,
          options: M.key === "campaign" ? O.campaignlist : M.dataSource,
          label: M.value,
          disabled: o.filters[Y].disabled,
          singleSelect: !1,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (Q) => o.filters[Y].model = Q,
          onClick: (Q) => O.filterClicked(M.key),
          onInput: S(L)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), pe(S(Ft), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${M.key}`,
          label: M.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (Q) => o.filters[Y].model = Q,
          onInput: S(L)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      Z(S(it), {
        type: "tertiary",
        label: "Clear filters",
        onClick: D[0] || (D[0] = (M) => G())
      })
    ], 2));
  }
}, Mh = /* @__PURE__ */ Ke(Gh, [["__scopeId", "data-v-4191254b"]]), Uh = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: T }) {
    const a = T, g = o.options || {}, $ = new IntersectionObserver(([G]) => {
      a("intersecting", G.isIntersecting);
    }, g), L = q(null);
    return Sn(() => {
      L.value && $.observe(L.value);
    }), rh(() => {
      $.disconnect();
    }), (G, O) => (h(), x("div", {
      ref_key: "targetELement",
      ref: L,
      class: "observer",
      style: { height: "3px" }
    }, [
      ji(G.$slots, "default")
    ], 512));
  }
}, _0 = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", Wh = { class: "query-builder" }, Nh = { class: "query-conditions" }, qh = { class: "condition" }, zh = { class: "cell field" }, Hh = { class: "cell operator" }, Qh = { class: "cell value" }, Kh = {
  key: 0,
  class: "query-operator-outer"
}, Yh = {
  __name: "StandardQueryDisplay",
  props: {
    query: {
      type: Array,
      required: !0
    }
  },
  setup(o) {
    const T = o, a = Fe(() => T.query || []), b = ($) => {
      try {
        return new Date($).toISOString().split("T")[0];
      } catch {
        return "-";
      }
    }, g = ($) => {
      const L = $ == null ? void 0 : $.value;
      return L ? $.type === "date" ? b(L) : Array.isArray(L) ? L.join(", ") : typeof L == "boolean" ? L ? "True" : "False" : L : "-";
    };
    return ($, L) => (h(), x("div", Wh, [
      f("div", Nh, [
        L[1] || (L[1] = f("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), x(xe, null, Ae(a.value, (G, O) => (h(), x("div", { key: O }, [
          f("div", qh, [
            f("div", zh, ie(G.field), 1),
            f("div", Hh, ie(G.operator), 1),
            f("div", Qh, ie(g(G)), 1),
            Z(S(it), {
              type: "tertiary",
              icon: "bi-arrows-expand"
            })
          ]),
          a.value.length > 1 && O !== a.value.length - 1 ? (h(), x("div", Kh, L[0] || (L[0] = [
            f("div", { class: "query-operator" }, " And", -1)
          ]))) : B("", !0)
        ]))), 128))
      ])
    ]));
  }
}, Zh = /* @__PURE__ */ Ke(Yh, [["__scopeId", "data-v-ffb4ba57"]]), Jh = { class: "info-card" }, Xh = { class: "segments" }, jh = { class: "segment-img-wrapper" }, e2 = ["src", "title"], t2 = { class: "segment-info" }, n2 = {
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
    const T = o;
    function a(g) {
      const $ = [];
      return g.coreEngagement && $.push(`Core Engagement: ${g.coreEngagement}`), g.coreFocus && $.push(`Core Focus: ${g.coreFocus}`), $.length > 0 ? $.join(`
`) : "No information available";
    }
    const b = Fe(() => !T.segmentData || !T.segmentData.segments ? [] : T.isThumbnail ? T.segmentData.segments.slice(0, 5) : T.segmentData.segments);
    return (g, $) => (h(), x("div", Jh, [
      $[2] || ($[2] = f("h5", { class: "mb-3" }, "Top Interests", -1)),
      f("div", Xh, [
        (h(!0), x(xe, null, Ae(b.value, (L) => (h(), x("div", {
          class: "segment",
          key: L.name
        }, [
          f("div", jh, [
            f("img", {
              src: L.image,
              alt: "segment",
              title: a(L)
            }, null, 8, e2)
          ]),
          f("div", t2, [
            f("h4", null, ie(L.name), 1),
            f("p", null, [
              $[0] || ($[0] = f("span", null, "Est. Reach:", -1)),
              nt(" " + ie(L.reach) + " ", 1),
              Z(S(d0), {
                class: "pl-1",
                label: "This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience."
              })
            ]),
            f("p", null, [
              $[1] || ($[1] = f("span", null, "Affinity Score: ", -1)),
              nt(" " + ie(L.affinityScore), 1),
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
}, i2 = /* @__PURE__ */ Ke(n2, [["__scopeId", "data-v-0ac0320a"]]), r2 = { class: "segment-details-insigts mt-4" }, a2 = { class: "insights-title-wrapper" }, s2 = { class: "mt-3" }, l2 = { class: "query-result" }, o2 = {
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
  setup(o, { emit: T }) {
    const a = o, b = un(), g = T;
    Fe(() => {
      var G, O, D;
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
          categories: ((O = (G = a.selectedSegment.thumbnail) == null ? void 0 : G.graph) == null ? void 0 : O.labels) || []
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
    }), Fe(() => {
      var G, O, D;
      return ((D = (O = (G = a.selectedSegment.thumbnail) == null ? void 0 : G.graph) == null ? void 0 : O.seriesCombined) == null ? void 0 : D.map((M) => ({
        name: M.name,
        data: M.data.map(Number)
      }))) || [];
    });
    const $ = Fe(() => {
      var G, O, D, M;
      return ((M = (D = (O = (G = a.selectedSegment.thumbnail) == null ? void 0 : G.segments) == null ? void 0 : O[0]) == null ? void 0 : D.segments) == null ? void 0 : M.slice(0, 2)) || [];
    });
    Fe(() => $.value.map((D) => parseFloat(D.affinityScore || "0")).reduce((D, M) => D + M, 0).toFixed(2)), Fe(() => $.value.map((O) => parseInt(O.reach || "0", 10)).reduce((O, D) => O + D, 0).toLocaleString());
    function L() {
      b.set_selectedSegmentType(a.location), b.set_activeTab("custom"), b.set_selectedSegment(a.selectedSegment), g("showInsightsExplorer", a.selectedSegment);
    }
    return (G, O) => {
      const D = g0("CataUiTooltip");
      return h(), x("div", null, [
        f("div", r2, [
          f("div", a2, [
            O[2] || (O[2] = f("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            f("p", s2, [
              O[1] || (O[1] = nt("Find the segments that work best with ")),
              f("span", l2, ie(a.selectedSegment.name), 1)
            ]),
            Z(D, { label: "The preview is for your external proofing tool." })
          ]),
          Z(S(it), {
            type: "secondary",
            label: "Explore",
            onClick: O[0] || (O[0] = (M) => L())
          })
        ])
      ]);
    };
  }
}, u2 = /* @__PURE__ */ Ke(o2, [["__scopeId", "data-v-ba5f76ba"]]), c2 = { class: "modal-body" }, d2 = { class: "section" }, f2 = { class: "checkbox-group" }, p2 = { class: "checkbox-group" }, h2 = { class: "sections-wrapper" }, m2 = { class: "section" }, g2 = { class: "checkbox-group-catergory" }, x2 = { class: "section" }, y2 = { class: "ccheckbox-group-catergory" }, k2 = { class: "section" }, v2 = { class: "checkbox-group-category" }, _2 = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: T }) {
    const a = T, b = q([]), g = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], $ = ["Build new campaign", "Update current campaign"], L = ["Display & Video 360", "The Trade Desk"], G = ["Infosum", "LiveRamp"], O = ["Open Media Studio", "Audience Builder"];
    function D() {
      a("close");
    }
    const M = () => {
      a("insertSegment"), D();
    };
    return (Y, Q) => {
      const I = g0("hp");
      return h(), pe(S(y0), {
        onClose: D,
        size: "medium"
      }, {
        header: $t(() => Q[5] || (Q[5] = [
          f("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: $t(() => [
          f("div", c2, [
            f("div", d2, [
              Z(I, null, {
                default: $t(() => Q[6] || (Q[6] = [
                  nt("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              f("div", f2, [
                (h(), x(xe, null, Ae(g, (A) => Z(S(bn), {
                  key: A,
                  label: A,
                  modelValue: b.value,
                  "onUpdate:modelValue": Q[0] || (Q[0] = (C) => b.value = C),
                  value: A
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            Q[10] || (Q[10] = f("hr", null, null, -1)),
            f("div", p2, [
              (h(), x(xe, null, Ae($, (A) => Z(S(bn), {
                key: A,
                label: A,
                modelValue: b.value,
                "onUpdate:modelValue": Q[1] || (Q[1] = (C) => b.value = C),
                value: A
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            f("div", h2, [
              f("div", m2, [
                Q[7] || (Q[7] = f("h3", null, "Cohort", -1)),
                f("div", g2, [
                  (h(), x(xe, null, Ae(L, (A) => Z(S(bn), {
                    key: A,
                    label: A,
                    modelValue: b.value,
                    "onUpdate:modelValue": Q[2] || (Q[2] = (C) => b.value = C),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", x2, [
                Q[8] || (Q[8] = f("h3", null, "Clean Room", -1)),
                f("div", y2, [
                  (h(), x(xe, null, Ae(G, (A) => Z(S(bn), {
                    key: A,
                    label: A,
                    modelValue: b.value,
                    "onUpdate:modelValue": Q[3] || (Q[3] = (C) => b.value = C),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", k2, [
                Q[9] || (Q[9] = f("h3", null, "WPP Open", -1)),
                f("div", v2, [
                  (h(), x(xe, null, Ae(O, (A) => Z(S(bn), {
                    key: A,
                    label: A,
                    modelValue: b.value,
                    "onUpdate:modelValue": Q[4] || (Q[4] = (C) => b.value = C),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ])
            ])
          ])
        ]),
        footer: $t(() => [
          Z(S(it), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: D
          }),
          Z(S(it), {
            type: "primary",
            label: "Push",
            onClick: M
          })
        ]),
        _: 1
      });
    };
  }
}, b2 = /* @__PURE__ */ Ke(_2, [["__scopeId", "data-v-44c63bbf"]]), E2 = [
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
], S2 = {
  charts: E2
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
}, A2 = { class: "segment-details" }, w2 = { class: "wrapper-left" }, C2 = { class: "source-wrapper" }, T2 = { class: "source-container" }, D2 = { class: "sub-controls" }, I2 = { class: "sub-tab-container" }, L2 = { class: "sub-controls-tabs" }, B2 = { class: "sub-controls-tools" }, F2 = { class: "list" }, $2 = {
  key: 0,
  class: "d-flex justify-content-center pt-40 pb-40"
}, V2 = { class: "wrapper-right" }, O2 = {
  key: 0,
  class: "segment-details-wrapper"
}, P2 = {
  key: 0,
  class: "segment-details-title"
}, R2 = { class: "segment-details-content" }, G2 = {
  key: 0,
  class: "description-row"
}, M2 = { class: "description-detail" }, U2 = {
  key: 1,
  class: "description-row"
}, W2 = { class: "description-detail" }, N2 = {
  key: 2,
  class: "description-row"
}, q2 = { class: "description-detail" }, z2 = {
  key: 3,
  class: "description-row"
}, H2 = { class: "description-detail" }, Q2 = {
  key: 4,
  class: "description-row"
}, K2 = { class: "description-detail" }, Y2 = {
  key: 5,
  class: "description-row"
}, Z2 = { class: "description-detail" }, J2 = {
  key: 6,
  class: "description-row"
}, X2 = { class: "description-detail" }, j2 = {
  key: 7,
  class: "description-row"
}, em = { class: "description-detail" }, tm = {
  key: 8,
  class: "description-row"
}, nm = { class: "description-detail-bold" }, im = {
  key: 0,
  class: "description-detail"
}, rm = { class: "description-row" }, am = { class: "description-term" }, sm = { class: "description-detail" }, lm = {
  key: 1,
  class: "standard-view"
}, om = ["src"], um = {
  key: 0,
  class: "footer"
}, cm = { class: "footer-text" }, dm = { class: "footer-description-detail" }, fm = {
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
  setup(o, { emit: T }) {
    const a = o, b = T;
    q([]);
    const g = un(), $ = q(null), L = q(null), G = q(!1), O = q([]), D = q(""), M = q([]), Y = q(""), Q = q(""), I = q(!1), A = [
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
    ], C = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], J = q(A[0]), ye = q(C[0]), he = q(!1), ce = q([
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
    ], H = q({}), V = q(""), F = q({
      sortColumn: "name",
      sortOrder: 1
    });
    function P() {
      g.set_selectedSegmentType("standard"), g.set_selectedSegment(V.value), b("showInsightsExplorer", V.value);
    }
    async function ve() {
      var w;
      if (!((w = V.value) != null && w.segmentId))
        return;
      const z = `${a.baseUrl}/api/v1/segments/${V.value.segmentId}`;
      try {
        const se = await fetch(z, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!se.ok) {
          const vt = await se.text();
          throw new Error(vt || "Failed to delete segment");
        }
        V.value = "", await g.fetch_segments(Y.value);
      } catch (se) {
        console.error("Error deleting segment:", se);
      }
    }
    function $e(z) {
      return z.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (w) => w.toUpperCase());
    }
    function Me(z) {
      return z == null ? "" : (typeof z == "string" ? parseInt(z, 10) : z).toLocaleString();
    }
    function Pe(z) {
      H.value = z, g.set_filterQuery(z), g.fetch_segments(Y.value);
    }
    async function kt(z) {
      if (z && g.get_isLastPage && !he.value && g.get_segments && g.get_segments.length > 0) {
        he.value = !0;
        try {
          await g.fetch_nextSegmentPage(Y.value), he.value = !1;
        } catch {
          he.value = !1;
        }
      }
    }
    async function Ot() {
      ce.value.map((z) => {
        z.key !== "market" && (z.model = "");
      }), g.reset_filterQuery(), await g.fetch_segments(Y.value);
    }
    function cn(z) {
      F.value = z;
    }
    function dn() {
      G.value = !G.value;
    }
    function Ct(z) {
      V.value = z.row;
    }
    function ze() {
      I.value = !0;
    }
    async function ne() {
      await g.set_token(a.token), await g.set_brandId(a.brandId), await g.set_tenantId(a.tenantId), await g.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? V.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && (V.value = a.selectedSegment), await g.fetch_segment_settings(a.brandId);
      try {
        const z = await g.get_segment_settings;
        z && (M.value = await z.platforms.map((w) => ({
          value: w.platform_id,
          label: w.platform,
          locations: w.locations.map((se) => ({
            value: se.value,
            label: se.display_name
          }))
        }))), Y.value = M.value[0].value;
      } catch (z) {
        console.log(z);
      }
    }
    return Sn(() => {
      L.value = $.value, ne();
    }), on(Y, async (z, w) => {
      z && w !== z && (O.value = M.value[z - 1].locations, D.value = O.value[0].value, he.value = !0, g.set_platform(z), await g.fetch_segments(z), J.value = A[0], he.value = !1);
    }), on(Q, async (z) => {
      z && (z == null ? void 0 : z.length) < 3 || (g.set_searchTerm(z), g.fetch_segments(Y.value));
    }), on(D, async (z) => {
      g.set_locationQuery(z), g.fetch_segments(Y.value);
    }), on(F, async (z) => {
      g.set_sortQuery(z), g.fetch_segments(Y.value);
    }), on(J, async (z) => {
      const w = z.id;
      g.set_categoryQuery(w), g.fetch_segments();
    }), Fe(() => S2.charts.map((z) => {
      var _t, Pt;
      const w = b0[z.type] || ((_t = z.type) == null ? void 0 : _t.toLowerCase()), se = Fa[w] || {};
      console.log("type", w), console.log("baseOptions", se);
      let vt = {}, Tt = [];
      return w === "line" || w === "area" ? (vt = {
        xaxis: {
          categories: z.data.map((De) => De.key),
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
      }, Tt = [{
        name: ((Pt = z.data[0]) == null ? void 0 : Pt.valueType) || "Value",
        data: z.data.map((De) => Number(De.value))
      }]) : w === "bar" ? (vt = {
        xaxis: {
          categories: z.data.map((De) => De.key)
        }
      }, Tt = [{
        name: z.title,
        data: z.data.map((De) => Number(De.value))
      }]) : w === "donut" || w === "pie" ? (vt = {
        labels: z.data.map((De) => De.key)
      }, Tt = z.data.map((De) => Number(De.value))) : w === "bubble" && (Tt = [{
        name: z.title,
        data: z.data.map((De) => ({
          x: Number(De.x),
          y: Number(De.y),
          z: Number(De.z)
        }))
      }]), console.log("series", Tt), console.log("dynamicOptions", vt), {
        series: Tt,
        options: {
          ...se,
          ...vt,
          title: {
            ...se.title,
            text: z.title
          },
          chart: {
            // ...baseOptions.chart,
            type: w
          }
        },
        chartType: w
      };
    })), (z, w) => (h(), x(xe, null, [
      f("div", A2, [
        f("div", w2, [
          f("div", C2, [
            f("div", T2, [
              Z(S(Bt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: M.value,
                modelValue: Y.value,
                "onUpdate:modelValue": w[0] || (w[0] = (se) => Y.value = se),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              Z(S(Bt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: O.value,
                modelValue: D.value,
                "onUpdate:modelValue": w[1] || (w[1] = (se) => D.value = se),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            Z(S(Ft), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: Q.value,
              "onUpdate:modelValue": w[2] || (w[2] = (se) => Q.value = se)
            }, null, 8, ["modelValue"])
          ]),
          f("div", D2, [
            f("div", I2, [
              f("div", L2, [
                Z(S(Ia), {
                  tabs: A,
                  modelValue: J.value,
                  "onUpdate:modelValue": w[3] || (w[3] = (se) => J.value = se),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              f("div", B2, [
                Z(S(Vt), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: w[4] || (w[4] = (se) => dn())
                })
              ])
            ])
          ]),
          f("div", F2, [
            f("div", {
              class: "list-list",
              ref_key: "list",
              ref: $
            }, [
              Z(Oh, {
                stickyHeader: 0,
                columns: de,
                rows: S(g).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: w[5] || (w[5] = (se) => Ct(se)),
                onColumnSorted: w[6] || (w[6] = (se) => cn(se)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              he.value ? (h(), x("div", $2, [
                Z(S(Wn), { size: "xlarge" })
              ])) : B("", !0),
              Z(Uh, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: w[7] || (w[7] = (se) => kt(se))
              })
            ], 512),
            G.value ? (h(), pe(Mh, {
              key: 0,
              filters: ce.value,
              onClearFilters: w[8] || (w[8] = (se) => Ot()),
              onFilterChange: w[9] || (w[9] = (se) => Pe(se))
            }, null, 8, ["filters"])) : B("", !0)
          ])
        ]),
        f("div", V2, [
          f("div", {
            class: We(["outer-wrapper-segment-details", { "standard-empty": !V.value }])
          }, [
            V.value ? (h(), x("div", O2, [
              V.value ? (h(), x("div", P2, ie(V.value.name), 1)) : B("", !0),
              w[24] || (w[24] = f("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              f("div", R2, [
                V.value.name ? (h(), x("div", G2, [
                  w[15] || (w[15] = f("div", { class: "description-term" }, "Name", -1)),
                  f("div", M2, ie(V.value.name), 1)
                ])) : B("", !0),
                V.value.description ? (h(), x("div", U2, [
                  w[16] || (w[16] = f("div", { class: "description-term" }, "Description", -1)),
                  f("div", W2, ie(V.value.description), 1)
                ])) : B("", !0),
                V.value.sourceCreatedDate ? (h(), x("div", N2, [
                  w[17] || (w[17] = f("div", { class: "description-term" }, "Created", -1)),
                  f("div", q2, ie(S(En)(V.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                V.value.sourceUpdatedDate ? (h(), x("div", z2, [
                  w[18] || (w[18] = f("div", { class: "description-term" }, "Updated", -1)),
                  f("div", H2, ie(S(En)(V.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                V.value.status ? (h(), x("div", Q2, [
                  w[19] || (w[19] = f("div", { class: "description-term" }, "Status", -1)),
                  f("div", K2, ie(V.value.status.value), 1)
                ])) : B("", !0),
                V.value.expiration_date ? (h(), x("div", Y2, [
                  w[20] || (w[20] = f("div", { class: "description-term" }, "Expiration", -1)),
                  f("div", Z2, ie(V.value.expiration_date), 1)
                ])) : B("", !0),
                V.value.id ? (h(), x("div", J2, [
                  w[21] || (w[21] = f("div", { class: "description-term" }, "Segmnent ID", -1)),
                  f("div", X2, ie(V.value.id), 1)
                ])) : B("", !0),
                V.value.audience_id ? (h(), x("div", j2, [
                  w[22] || (w[22] = f("div", { class: "description-term" }, "Audience ID", -1)),
                  f("div", em, ie(V.value.audience_id), 1)
                ])) : B("", !0),
                V.value.count ? (h(), x("div", tm, [
                  w[23] || (w[23] = f("div", { class: "description-term" }, "Last count", -1)),
                  f("div", nm, ie(Me(V.value.count)), 1),
                  V.value.refreshCountDate ? (h(), x("span", im, " (" + ie(S(En)(V.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : B("", !0)
                ])) : B("", !0),
                V.value.platform_specific ? (h(!0), x(xe, { key: 9 }, Ae(V.value.platform_specific, (se) => (h(), x("div", rm, [
                  f("div", am, ie($e(se.label)), 1),
                  f("div", sm, ie(se.value), 1)
                ]))), 256)) : B("", !0)
              ]),
              f("div", null, [
                Z(S(Ia), {
                  tabs: C,
                  modelValue: ye.value,
                  "onUpdate:modelValue": w[10] || (w[10] = (se) => ye.value = se),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                ye.value.id === 2 ? (h(), pe(Zh, {
                  key: 0,
                  query: V.value.query
                }, null, 8, ["query"])) : B("", !0)
              ])
            ])) : B("", !0),
            V.value ? B("", !0) : (h(), x("div", lm, [
              f("div", null, [
                f("img", {
                  class: "",
                  alt: "standardIcon",
                  src: S(_0)
                }, null, 8, om)
              ]),
              w[25] || (w[25] = f("div", { class: "standard-view-title" }, [
                f("div", null, "Select a standard segment from the list"),
                f("div", null, "or"),
                f("div", null, [
                  f("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          V.value.name ? (h(), x("div", um, [
            f("div", cm, [
              w[26] || (w[26] = f("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              f("div", dm, [
                f("span", null, ie(V.value.name ? `${`${V.value.name} - `}` : "none"), 1),
                f("span", null, ie(Me(V.value.count)), 1)
              ])
            ]),
            f("div", null, [
              Z(S(it), {
                type: "secondary",
                label: "Explore",
                onClick: w[11] || (w[11] = (se) => P()),
                class: "mr-2"
              }),
              Z(S(it), {
                type: "delete",
                label: "Delete",
                onClick: w[12] || (w[12] = (se) => ve()),
                class: "mr-2 redButton"
              }),
              Z(S(it), {
                type: "primary",
                label: "Push to destination",
                onClick: w[13] || (w[13] = (se) => ze())
              })
            ])
          ])) : B("", !0)
        ])
      ]),
      I.value ? (h(), pe(b2, {
        key: 0,
        onClose: w[14] || (w[14] = (se) => I.value = !1)
      })) : B("", !0)
    ], 64));
  }
}, pm = /* @__PURE__ */ Ke(fm, [["__scopeId", "data-v-e027e21a"]]), hm = { class: "feedback-title-wrapper" }, mm = { class: "title" }, gm = { class: "feedback-text" }, xm = {
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
    const T = {
      warning: "bi-exclamation-triangle-fill",
      info: "bi-info-circle-fill",
      query: "bi-magic",
      "icon-color-warning": "#FA5D05",
      "icon-color-info": "#8B919A",
      "icon-color-query": "#528233"
    };
    return (a, b) => {
      var g, $, L;
      return o.feedback ? (h(), x("div", {
        key: 0,
        class: We(["ai-query-feedback", [o.feedback.type]])
      }, [
        f("div", hm, [
          Z(S(Vt), {
            class: "pr-2",
            size: "16px",
            icon: T[(g = o.feedback) == null ? void 0 : g.type],
            color: T[`icon-color-${($ = o.feedback) == null ? void 0 : $.type}`]
          }, null, 8, ["icon", "color"]),
          f("div", mm, ie(o.feedback.title), 1)
        ]),
        f("p", gm, ie((L = o.feedback) == null ? void 0 : L.text), 1)
      ], 2)) : B("", !0);
    };
  }
}, h0 = /* @__PURE__ */ Ke(xm, [["__scopeId", "data-v-db7f7814"]]), ym = { key: 0 }, km = { class: "d-flex justify-content-between" }, vm = { class: "query-results" }, _m = { class: "query-result" }, bm = { class: "query-result-count" }, Em = {
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
  setup(o, { emit: T }) {
    const a = T, b = o;
    q(!1);
    const g = q(!1), $ = {
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
    function G() {
      a("explore-insights");
    }
    function O(D) {
      return D == null ? "" : (typeof D == "string" ? parseInt(D, 10) : D).toLocaleString();
    }
    return (D, M) => (h(), x("div", null, [
      o.savingDraft ? B("", !0) : (h(), x("div", ym, [
        f("div", km, [
          M[1] || (M[1] = f("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          g.value ? (h(), pe(S(it), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: M[0] || (M[0] = (Y) => G())
          })) : B("", !0)
        ]),
        f("div", vm, [
          f("div", _m, [
            M[2] || (M[2] = nt(" Segment size ")),
            f("span", bm, ie(O(b.segmentCount)), 1),
            M[3] || (M[3] = nt(" records. "))
          ])
        ]),
        g.value ? (h(), x("div", Em, [
          Z(S(La), {
            options: $,
            series: L
          })
        ])) : B("", !0)
      ])),
      o.savingDraft ? (h(), x("div", Sm, [
        Z(S(Wn), { size: "xlarge" }),
        M[4] || (M[4] = f("p", null, "Connecting to Open Intelligence...", -1))
      ])) : B("", !0)
    ]));
  }
}, wm = /* @__PURE__ */ Ke(Am, [["__scopeId", "data-v-3a77bed4"]]), Cm = { class: "query-attributes" }, Tm = ["onClick", "onKeydown"], Dm = {
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
  setup(o, { emit: T }) {
    const a = T;
    function b($) {
      a("toggle-group", $);
    }
    function g($, L) {
      return L[$];
    }
    return ($, L) => (h(), x("div", Cm, [
      o.fetching ? (h(), pe(S(Wn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : B("", !0),
      (h(!0), x(xe, null, Ae(o.tables, (G) => (h(), x("div", {
        class: We(["query-attributes-group", { closed: o.collapsed.includes(G.display_name) }]),
        key: G.display_name
      }, [
        f("div", {
          class: "query-attributes-group-toggle",
          onClick: (O) => b(G.display_name),
          onKeydown: $a((O) => b(G.display_name), ["enter"])
        }, [
          L[3] || (L[3] = f("span", { class: "arrow" }, null, -1)),
          nt(" " + ie(G.display_name), 1)
        ], 40, Tm),
        o.collapsed.includes(G.display_name) ? B("", !0) : (h(), x("div", Dm, [
          Z(S(Ba), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (O) => g(O, G.columns),
            onDragEnd: L[2] || (L[2] = (O) => $.$emit("drag-end"))
          }, {
            default: $t(() => [
              (h(!0), x(xe, null, Ae(G.columns, (O) => (h(), pe(S(oh), {
                key: O.display_name
              }, {
                default: $t(() => [
                  f("div", {
                    class: "attribute",
                    onMousedown: L[0] || (L[0] = (D) => $.$emit("drag-start")),
                    onMouseup: L[1] || (L[1] = (D) => $.$emit("drag-end"))
                  }, [
                    Z(S(Vt), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    f("div", {
                      class: "attribute-content",
                      onClick: ah((D) => $.$emit("click-attribute", O), ["stop"])
                    }, [
                      f("span", Lm, ie(O.type), 1),
                      f("span", Bm, ie(O.display_name), 1)
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
}, $m = /* @__PURE__ */ Ke(Fm, [["__scopeId", "data-v-4e61c8b0"]]), Vm = { class: "freeform-tab" }, Om = {
  __name: "FreeForm",
  setup(o) {
    tr();
    const T = q("");
    return (a, b) => (h(), x("div", Vm, [
      Z(S(Ft), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: T.value,
        "onUpdate:modelValue": b[0] || (b[0] = (g) => T.value = g)
      }, null, 8, ["modelValue"])
    ]));
  }
}, Pm = /* @__PURE__ */ Ke(Om, [["__scopeId", "data-v-f29f192b"]]), Rm = { class: "query-builder" }, Gm = { class: "query-builder-left" }, Mm = { class: "query-tabs" }, Um = { class: "source" }, Wm = {
  key: 1,
  class: "ai-query-tab"
}, Nm = {
  key: 2,
  class: ""
}, qm = { class: "query-builder-right" }, zm = { class: "query-content-scrollable" }, Hm = { class: "query-editor-wrapper" }, Qm = { class: "query-runner-button-wrapper" }, Km = {
  key: 0,
  class: "query-editor"
}, Ym = { class: "queries" }, Zm = {
  key: 0,
  class: "query"
}, Jm = ["onClick", "onKeydown"], Xm = { class: "w-100 pr-10" }, jm = {
  key: 0,
  class: "sub-query-outer"
}, eg = { class: "sub-queries" }, tg = {
  key: 0,
  class: "query-operator-inner",
  style: { width: "fit-content" }
}, ng = {
  key: 1,
  class: "pt-3 pb-2"
}, ig = { key: 0 }, rg = {
  key: 1,
  class: "px-2"
}, ag = {
  key: 1,
  class: "query-operator-outer"
}, sg = {
  key: 0,
  class: "inital-view"
}, lg = ["src"], og = { key: 0 }, ug = {
  key: 0,
  class: "query-results-wrapper"
}, cg = {
  key: 1,
  class: "loading-query-run"
}, dg = {
  key: 2,
  class: "loading-query-run"
}, fg = {
  key: 0,
  class: "mt-3"
}, pg = {
  key: 1,
  class: "mt-3"
}, hg = { class: "query-builder-footer" }, mg = { class: "query-builder-footer-fields" }, gg = {
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
  setup(o, { emit: T }) {
    const a = o, b = un(), g = tr(), $ = T;
    q();
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
    ], G = q(L[0]), O = q([]), D = q(O.value[0]), M = q([]), Y = q(M.value[0]), Q = q(""), I = q(null), A = q(!1), C = q(null), J = q(!0), ye = q(!1), he = q([]), ce = q([]), de = q(!1), H = q(!1), V = q(""), F = q(""), P = q(!1), ve = q(!1), $e = q(!1), Me = q(""), Pe = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], kt = [
      { value: "$eq", label: "equal" }
    ], Ot = [
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
    ], Ct = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], ze = q(0), ne = q({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), z = () => {
      b.set_selectedSegmentType("custom"), b.set_activeTab("custom"), b.set_selectedSegment(I.value), $("showInsightsExplorer", I.value);
    };
    function w(j) {
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
      return j.filter((W) => W.statement).map(({ statement: W, input_type: we }) => {
        const [U, le, Jt] = W;
        return {
          field: U,
          operator: E[le] || le,
          value: Jt,
          type: we
        };
      });
    }
    async function se(j) {
      const E = {
        brandName: a.brandName,
        name: j.name,
        description: j.description,
        count: j.count || Q.value
      }, W = `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${j.segmentId}`, we = await fetch(W, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(E)
      });
      if (!we.ok) {
        const U = await we.json();
        throw new Error(U.message || "Failed to generate insights");
      }
      await we.json();
    }
    async function vt() {
      Me.value = "saving", $e.value = !0;
      const j = {
        platformId: Y.value,
        count: Q.value,
        region: b.query.demographics.region,
        market: b.query.demographics.market,
        description: ne.value.description,
        name: ne.value.name,
        query: w(ne.value.conditions[0].group)
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
        }), W = await E.json();
        if (!E.ok)
          throw new Error(W.message || "Failed to save segment");
        ve.value = !0, H.value = !0, Me.value = "generating", I.value = W.data[0], await se(W.data[0]), Me.value = "done";
      } catch (E) {
        console.error("Error saving segment or generating insights:", E), Me.value = "";
      } finally {
        $e.value = !1;
      }
    }
    async function Tt() {
      P.value = !0;
      const j = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: F.value
      };
      ne.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const E = await g.generate_ai_query(j, Y.value, D.value), W = {
        text: E.message,
        type: E.query ? "info" : "warning",
        title: "AI Assumption"
      }, we = {
        text: E.query,
        type: "query",
        title: "Query Gen"
      };
      g.set_ai_generated_message(W), g.set_ai_generated_query(we), E.attrs.forEach((U, le) => {
        le === 0 ? C.value = "queryGroupDrop" : C.value = ne.value.conditions[0].id;
        const Jt = {
          payload: {
            display_name: U.field,
            input_type: U.input_type,
            operators: U.operator,
            selectors: []
          }
        };
        Jt.payload.selectors.push(U.value), Rt(Jt), c0();
      }), P.value = !1;
    }
    async function _t() {
      ne.value.conditions.forEach((j) => {
        j.group.forEach((E) => {
          E.input_type === "select" && E.statement[2].length > 1 && E.statement[1] === "$eq" && (E.statement[1] = "$in"), E.input_type === "select" && E.statement[2].length > 1 && E.statement[1] === "$neq" && (E.statement[1] = "$nin");
        });
      });
    }
    async function Pt() {
      de.value = !0, G.value.id === 1 && await _t(), Q.value = await g.run_query(ne.value, Y.value, D.value), Q.value && (H.value = !0), de.value = !1, ve.value = !1;
    }
    function De(j, E) {
      var we, U;
      return j === "operatorsQueries" ? (we = Pe.find((le) => le.value === E)) == null ? void 0 : we.label : (U = Kt(j).find((le) => le.value === E)) == null ? void 0 : U.label;
    }
    function Kt(j) {
      switch (j) {
        case "select":
          return Ot;
        case "boolean":
          return kt;
        case "string":
          return cn;
        case "date":
          return dn;
        case "int":
          return Ct;
        default:
          return [];
      }
    }
    function Yt(j) {
      A.value = j;
    }
    async function ir() {
      ye.value = !0, await g.fetch_database_model(Y.value, D.value), ye.value = !1;
    }
    async function wn() {
      J.value = !0, await g.fetch_custom_segment_settings();
      const j = await g.get_segment_settings;
      j && (M.value = await j.platforms.map((E) => ({
        value: E.platform_id,
        label: E.platform,
        locations: E.locations.map((W) => ({
          value: W.value,
          label: W.display_name
        }))
      })), Y.value = M.value[0].value), J.value = !1;
    }
    function Rt(j) {
      const E = j.payload ? j.payload : j;
      if (ze.value < g.settings.maxSubQuery) {
        const W = E.selectors.map((le) => ({
          value: le,
          label: le
        }));
        let we = [];
        W.length > 2 ? we[0] = W[0].value : W.length > 0 ? we = W[0].value : we = null;
        const U = W.length > 0 && E.input_type !== "boolean" ? "select" : E.input_type;
        if (C.value === "queryGroupDrop") {
          ze.value += 1, ne.value.conditions.length > 0 && ne.value.conditions.push({ logic: "$or" });
          const le = {
            id: Ca(),
            group: [
              {
                id: Ca(),
                statement: [E.display_name, "$eq", we],
                selectors: W,
                input_type: U
              }
            ]
          };
          ne.value.conditions.push(le);
        } else if (C.value !== null) {
          ze.value += 1;
          const le = ne.value.conditions.findIndex(
            (Jt) => Jt.id === C.value
          );
          le !== -1 && (ne.value.conditions[le].group.push({ logic: "$and" }), ne.value.conditions[le].group.push({
            id: Ca(),
            statement: [E.display_name, "$eq", we],
            selectors: W,
            input_type: U
          }));
        }
        C.value = null;
      }
    }
    function ui(j) {
      var E;
      (E = ne.value.conditions[0]) != null && E.id ? C.value = ne.value.conditions[0].id : C.value = "queryGroupDrop", Rt(j), c0();
    }
    function rt(j, E, W) {
      if (ne.value.conditions[E].group.length === 1)
        ne.value.conditions.length > E + 1 ? ne.value.conditions.splice(E, 2) : ne.value.conditions.splice(E, 1), ze.value -= 1;
      else {
        const we = ne.value.conditions[E].group.findIndex(
          (U) => U.id === W
        );
        ne.value.conditions[E].group.splice(we - 1, 2), ze.value -= 1;
      }
    }
    function Zt(j) {
      const E = he.value.indexOf(j);
      E >= 0 ? he.value.splice(E, 1) : he.value.push(j);
    }
    function rr(j) {
      const E = ce.value.indexOf(j);
      E >= 0 ? ce.value.splice(E, 1) : ce.value.push(j);
    }
    function bt() {
      Q.value = "", ne.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function ci() {
      ne.value = { ...ne.value, count: Q.value }, G.value.id === 3 && (ne.value = {
        ...ne.value,
        freeForm: g.freeFormQuery
      }), $("insertSegment", ne.value);
    }
    async function ar() {
      await b.set_token(a.token), await b.set_brandId(a.brandId), await b.set_tenantId(a.tenantId), await g.set_customSegmentUrl(a.customSegmentUrl), await g.fetch_custom_segment_settings(), await wn();
    }
    return Sn(() => {
      ar();
    }), on(Y, async (j, E) => {
      j && E !== j && (O.value = M.value.find((W) => W.value == j).locations, D.value = O.value[0].value, await bt(), await ir());
    }), on(G, async (j, E) => {
      j && E !== j && j.id === 2 && (F.value = "", g.set_ai_generated_message(null), g.set_ai_generated_query(null));
    }), (j, E) => (h(), x("div", Rm, [
      f("div", Gm, [
        J.value ? (h(), pe(S(Wn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), x(xe, { key: 1 }, [
          f("div", Mm, [
            Z(S(Ia), {
              tabs: L,
              modelValue: G.value,
              "onUpdate:modelValue": E[0] || (E[0] = (W) => G.value = W),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          f("div", Um, [
            Z(S(Bt), {
              style: { width: "45%" },
              class: "source w-100",
              options: M.value,
              modelValue: Y.value,
              "onUpdate:modelValue": E[1] || (E[1] = (W) => Y.value = W),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            Z(S(Bt), {
              style: { width: "45%" },
              class: "source w-100",
              options: O.value,
              modelValue: D.value,
              "onUpdate:modelValue": E[2] || (E[2] = (W) => D.value = W),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            S(b).brief.market ? (h(), pe(S(Ft), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: S(b).brief.market,
              "onUpdate:modelValue": E[3] || (E[3] = (W) => S(b).brief.market = W),
              label: "Market"
            }, null, 8, ["modelValue"])) : B("", !0)
          ]),
          Y.value && D.value ? (h(), x(xe, { key: 0 }, [
            G.value.id === 1 ? (h(), pe($m, {
              key: 0,
              tables: S(g).get_databaseModel.tables,
              collapsed: ce.value,
              fetching: ye.value,
              onClickAttribute: ui,
              onDragStart: E[4] || (E[4] = (W) => Yt(!0)),
              onDragEnd: E[5] || (E[5] = (W) => Yt(!1)),
              onToggleGroup: rr
            }, null, 8, ["tables", "collapsed", "fetching"])) : B("", !0),
            G.value.id === 2 ? (h(), x("div", Wm, [
              Z(S(Ft), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: F.value,
                "onUpdate:modelValue": E[6] || (E[6] = (W) => F.value = W)
              }, null, 8, ["modelValue"]),
              Z(S(it), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !F.value,
                loading: P.value,
                onClick: E[7] || (E[7] = (W) => Tt())
              }, null, 8, ["disabled", "loading"]),
              S(g).get_aiGeneratedMessage ? (h(), pe(h0, {
                key: 0,
                feedback: S(g).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : B("", !0),
              S(g).get_aiGeneratedQuery ? (h(), pe(h0, {
                key: 1,
                feedback: S(g).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : B("", !0)
            ])) : B("", !0),
            G.value.id === 3 ? (h(), x("div", Nm, [
              Z(Pm)
            ])) : B("", !0)
          ], 64)) : B("", !0)
        ], 64))
      ]),
      f("div", qm, [
        f("div", zm, [
          f("div", Hm, [
            f("div", null, [
              E[14] || (E[14] = f("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              f("div", Qm, [
                Z(S(it), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !Y.value || !D.value,
                  loading: de.value,
                  onClick: E[8] || (E[8] = (W) => Pt())
                }, null, 8, ["disabled", "loading"]),
                Z(S(it), {
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !ne.value.name || !ne.value.description || !Q.value || ve.value,
                  loading: $e.value,
                  onClick: E[9] || (E[9] = (W) => vt())
                }, null, 8, ["disabled", "loading"])
              ])
            ]),
            G.value.id !== 3 ? (h(), x("div", Km, [
              f("div", Ym, [
                (h(!0), x(xe, null, Ae(ne.value.conditions, (W, we) => (h(), x("div", {
                  class: "query-outer",
                  key: W.id
                }, [
                  W.group ? (h(), x("div", Zm, [
                    f("div", {
                      class: "collapse-subQuery",
                      onClick: (U) => Zt(W.id),
                      onKeydown: $a((U) => Zt(W.id), ["enter"])
                    }, [
                      Z(S(Vt), {
                        icon: he.value.indexOf(W.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, Jm),
                    f("div", Xm, [
                      he.value.indexOf(W.id) === -1 ? (h(), x("div", jm, [
                        (h(!0), x(xe, null, Ae(W.group, (U) => (h(), x("div", eg, [
                          U.logic && he.value.indexOf(W.id) === -1 ? (h(), x("div", tg, [
                            Z(S(Bt), {
                              class: "query-operator",
                              modelValue: U.logic,
                              "onUpdate:modelValue": (le) => U.logic = le,
                              singleSelect: !0,
                              options: Pe,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : B("", !0),
                          U.statement ? (h(), x("div", {
                            key: 1,
                            class: We(["sub-query", { "single-subquery": W.group.length === 1 }])
                          }, [
                            Z(S(Ft), {
                              readonly: "",
                              modelValue: U.statement[0],
                              "onUpdate:modelValue": (le) => U.statement[0] = le
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            Z(S(Bt), {
                              modelValue: U.statement[1],
                              "onUpdate:modelValue": (le) => U.statement[1] = le,
                              singleSelect: !0,
                              options: Kt(U.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            U.selectors.length < 3 && U.selectors.length > 0 ? (h(), pe(S(Bt), {
                              key: 0,
                              modelValue: U.statement[2],
                              "onUpdate:modelValue": (le) => U.statement[2] = le,
                              options: U.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            U.selectors.length > 2 && U.input_type !== "boolean" ? (h(), pe(S(Bt), {
                              key: 1,
                              modelValue: U.statement[2],
                              "onUpdate:modelValue": (le) => U.statement[2] = le,
                              options: U.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            U.input_type === "int" ? (h(), pe(S(Ft), {
                              key: 2,
                              modelValue: U.statement[2],
                              "onUpdate:modelValue": (le) => U.statement[2] = le,
                              error: U.statement[2] ? "" : V.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : B("", !0),
                            U.input_type === "string" ? (h(), pe(S(Ft), {
                              key: 3,
                              modelValue: U.statement[2],
                              "onUpdate:modelValue": (le) => U.statement[2] = le,
                              error: U.statement[2] ? "" : V.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : U.input_type === "date" ? (h(), pe(S(x0), {
                              key: 4,
                              modelValue: U.statement[2],
                              "onUpdate:modelValue": (le) => U.statement[2] = le,
                              range: U.statement[1] === "$bt" || U.statement[1] === "$nbt",
                              error: U.statement[2] ? "" : V.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : B("", !0),
                            Z(S(Vt), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (le) => rt(W.id, we, U.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : B("", !0)
                        ]))), 256))
                      ])) : (h(), x("p", ng, [
                        (h(!0), x(xe, null, Ae(W.group, (U, le) => (h(), x("span", {
                          key: U.id
                        }, [
                          U.statement ? (h(), x("span", ig, [
                            f("b", null, ie(U == null ? void 0 : U.statement[0]), 1),
                            nt(" " + ie(De(U.input_type, U == null ? void 0 : U.statement[1])) + " ", 1),
                            f("b", null, ie((U == null ? void 0 : U.statement[2]) || "?"), 1)
                          ])) : (h(), x("span", rg, ie(De("operatorsQueries", U.logic)), 1))
                        ]))), 128))
                      ])),
                      A.value && ze.value < S(g).settings.maxSubQuery ? (h(), pe(S(Ba), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (U) => C.value = W.id,
                        onDrop: Rt
                      }, {
                        default: $t(() => E[15] || (E[15] = [
                          f("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : B("", !0)
                    ])
                  ])) : B("", !0),
                  ne.value.conditions.length > 1 && we < ne.value.conditions.length - 1 && W.logic ? (h(), x("div", ag, [
                    Z(S(Bt), {
                      class: "query-operator",
                      modelValue: W.logic,
                      "onUpdate:modelValue": (U) => W.logic = U,
                      singleSelect: !0,
                      options: Pe,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : B("", !0)
                ]))), 128))
              ]),
              ne.value.conditions.length === 0 ? (h(), x("div", sg, [
                f("span", null, [
                  f("img", {
                    class: "",
                    alt: "standardIcon",
                    src: S(_0)
                  }, null, 8, lg)
                ])
              ])) : B("", !0),
              A.value && ze.value < S(g).settings.maxSubQuery || ne.value.conditions.length === 0 ? (h(), pe(S(Ba), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: E[10] || (E[10] = (W) => C.value = "queryGroupDrop"),
                onDrop: Rt
              }, {
                default: $t(() => [
                  f("div", {
                    class: We(["drop-indicator", {
                      "mt-25": ne.value.conditions.length > 0,
                      "p-5": ne.value.conditions.length === 0
                    }])
                  }, [
                    ne.value.conditions.length <= 0 ? (h(), x("span", og, " Drag and drop attributes or AI generated rules ")) : B("", !0)
                  ], 2)
                ]),
                _: 1
              })) : B("", !0)
            ])) : B("", !0)
          ]),
          de.value || H.value ? (h(), x("div", ug, [
            !de.value && H.value ? (h(), pe(wm, {
              key: 0,
              segmentData: Q.value,
              segmentCount: Q.value
            }, null, 8, ["segmentData", "segmentCount"])) : B("", !0),
            de.value ? (h(), x("div", cg, [
              Z(S(Wn), {
                size: "xlarge",
                class: "mt-3"
              }),
              E[16] || (E[16] = f("p", { class: "mt-3" }, "Running query...", -1))
            ])) : B("", !0),
            Me.value === "saving" || Me.value === "generating" ? (h(), x("div", dg, [
              Z(S(Wn), {
                size: "xlarge",
                class: "mt-3"
              }),
              Me.value === "saving" ? (h(), x("p", fg, "Saving segment...")) : (h(), x("p", pg, "Generating insights..."))
            ])) : B("", !0),
            Me.value === "done" && I.value ? (h(), pe(u2, {
              key: 3,
              selectedSegment: I.value,
              location: "custom",
              onShowInsightsExplorer: z
            }, null, 8, ["selectedSegment"])) : B("", !0)
          ])) : B("", !0)
        ]),
        f("div", hg, [
          f("div", mg, [
            Z(S(Ft), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: ne.value.name,
              "onUpdate:modelValue": E[11] || (E[11] = (W) => ne.value.name = W),
              type: "text"
            }, null, 8, ["modelValue"]),
            Z(S(Ft), {
              class: "segment-name",
              label: "Segment description",
              modelValue: ne.value.description,
              "onUpdate:modelValue": E[12] || (E[12] = (W) => ne.value.description = W),
              type: "text"
            }, null, 8, ["modelValue"]),
            Z(S(it), {
              size: "small",
              label: "Push to destination",
              disabled: !Q.value || !ne.value.name && G.value.id === 1 || !ne.value.name && G.value.id === 2 || ne.value.conditions.length <= 0 && G.value.id !== 3,
              onClick: E[13] || (E[13] = (W) => ci())
            }, null, 8, ["disabled"])
          ])
        ])
      ])
    ]));
  }
}, xg = /* @__PURE__ */ Ke(gg, [["__scopeId", "data-v-9186b8d4"]]), yg = { class: "tag-section" }, kg = { class: "rating-card" }, vg = { class: "header" }, _g = { class: "title" }, bg = { class: "pb-2" }, Eg = { class: "content-wrapper" }, Sg = { class: "content" }, Ag = { class: "publishers" }, wg = { class: "publisher-item" }, Cg = { class: "ratings" }, Tg = { class: "rating" }, Dg = {
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
    const T = q([]), a = o, b = Fe(() => a.charts.filter(($) => $.type === "bubble")), g = Fe(() => a.tags);
    return Sn(() => {
      T.value = new Array(b.value.length).fill(!1);
    }), ($, L) => (h(), x("div", yg, [
      (h(!0), x(xe, null, Ae(g.value, (G, O) => (h(), x("div", {
        class: We(["card-wrapper", { "full-width": G.section === "Owned Intelligence" }]),
        key: G.title + O
      }, [
        f("div", kg, [
          f("div", vg, [
            f("h2", _g, [
              f("span", bg, ie(G.title), 1)
            ])
          ]),
          f("div", Eg, [
            f("div", Sg, [
              f("div", Ag, [
                (h(!0), x(xe, null, Ae(G.data[0].label, (D, M) => (h(), x("div", { key: D }, [
                  f("div", wg, ie(D), 1),
                  f("div", Cg, [
                    f("div", Tg, [
                      (h(!0), x(xe, null, Ae(Math.floor(parseFloat(G.data[0].score[M])), (Y, Q) => (h(), x("span", {
                        key: `filled-${Q}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), x(xe, null, Ae(5 - Math.floor(parseFloat(G.data[0].score[M])), (Y, Q) => (h(), x("span", {
                        key: `empty-${Q}`,
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
      ], 2))), 128))
    ]));
  }
}, m0 = /* @__PURE__ */ Ke(Dg, [["__scopeId", "data-v-6d44fa3a"]]), Ig = { class: "chart-section-title my-3" }, Lg = { class: "chart-section" }, Bg = { key: 0 }, Fg = { class: "chart-title" }, $g = {
  key: 1,
  class: "chart-section-title my-4"
}, Vg = {
  key: 2,
  class: "pb-4"
}, Og = { class: "chart-title" }, Pg = {
  key: 3,
  class: "chart-section-title my-4"
}, Rg = {
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
    const T = o, a = q([]), b = q([]), g = q(null), $ = q(!1), L = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], G = (I, A) => {
      var $e, Me;
      const C = "area", J = Fa[C] || {}, ye = (($e = I.data[0]) == null ? void 0 : $e.label) || [], ce = (((Me = I.data[0]) == null ? void 0 : Me.score) || []).map((Pe) => Number.isNaN(Number(Pe)) ? Pe : Number(Pe)), de = [{ name: I.title, data: ce }], H = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], V = ye.map((Pe, kt) => H[Math.floor(kt / (52 / 12))]), F = [], P = /* @__PURE__ */ new Set();
      V.forEach((Pe) => {
        P.has(Pe) ? F.push("") : (F.push(Pe), P.add(Pe));
      });
      const ve = {
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
        colors: [L[A % L.length]],
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
          custom: ({ series: Pe, seriesIndex: kt, dataPointIndex: Ot, w: cn }) => {
            const dn = cn.globals.labels[Ot], Ct = Pe[kt][Ot];
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
                            Week ${dn}
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
        section: I.section,
        chartType: C,
        title: I.title,
        series: de,
        options: {
          ...J,
          ...ve,
          chart: {
            type: C,
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
    }, O = (I) => {
      if (!I)
        return "bar";
      const A = I.toString().toLowerCase().trim();
      return (A.includes("vertical") || A.includes("verical")) && (A.includes("bar") || A.includes("bars") || A.includes("chart")) || A === "horizontal" ? "bar" : A === "donut" ? "donut" : A === "pie" ? "pie" : A === "radar" ? "radar" : A === "line" ? "line" : A === "area" ? "area" : A;
    }, D = Fe(() => T.charts.filter((I) => I.data && I.data.length > 0).map((I, A) => {
      var V, F;
      const C = O(b0[I.type] || I.type), J = Fa[C] || {}, ye = ((V = I.data[0]) == null ? void 0 : V.label) || [], ce = (((F = I.data[0]) == null ? void 0 : F.score) || []).map((P) => Number.isNaN(Number(P)) ? P : Number(P));
      let de = [], H = {};
      if (C === "horizontal")
        de = [{ name: I.title, data: ce }], H = {
          labels: ye,
          colors: [L[A % L.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (C === "bar" || C === "vertical bar" || C === "vertical bars" || C === "Vertical bars" || C === "vertical chart")
        I.title === "Average View of Digital consumption (Daily)" ? (de = [{ name: "Indexed Consumption", data: ce }], H = {
          xaxis: {
            categories: ye,
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
          colors: [L[A % L.length]],
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
            custom: ({ series: P, seriesIndex: ve, dataPointIndex: $e, w: Me }) => {
              const Pe = Me.globals.labels[$e], kt = P[ve][$e];
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
                            Hour ${Pe}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption: </span>
                            <span style="font-weight: 600;">${kt}</span>
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
        }) : (I.title === "Personality archetype" && console.log(ce), de = [{ name: I.title, data: ce }], H = {
          labels: ye,
          colors: [L[A % L.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (C === "line" || C === "area")
          return G(I, A);
        C === "radar" ? (de = [{ name: I.title, data: ce }], H = { labels: ye }) : (C === "donut" || C === "pie") && (de = ce, H = { labels: ye });
      }
      return {
        section: I.section,
        chartType: C,
        title: I.title,
        series: de,
        options: {
          ...J,
          ...H,
          chart: { type: C }
        }
      };
    }));
    Sn(() => {
      a.value = new Array(D.value.length).fill(!1), g.value && f0(
        g,
        ([I], A) => {
          I.isIntersecting && ($.value = !0, A.disconnect());
        },
        { threshold: 0.1 }
      );
    });
    const M = (I, A) => {
      if (!I || a.value[A])
        return;
      b.value[A] = I;
      const { stop: C } = f0(
        I,
        ([J]) => {
          J.isIntersecting && (a.value[A] = !0, C());
        },
        { threshold: 0.1 }
      );
    }, Y = () => {
      const I = D.value.length;
      return I === 1 ? "full-width" : I === 2 ? "half-width" : "third-width";
    }, Q = Fe(() => {
      const { paidSocial: I } = T, A = I.data.map((C) => C.name);
      return {
        chartType: "bar",
        title: I.title,
        section: I.section,
        description: I.description,
        series: [
          {
            name: "Audience",
            data: I.data.map((C) => Number(C.x))
          },
          {
            name: "Population",
            data: I.data.map((C) => Number(C.y))
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
            categories: A,
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
    return (I, A) => (h(), x("div", null, [
      f("h5", Ig, ie(D.value[0].section.charAt(0).toUpperCase() + D.value[0].section.slice(1)), 1),
      f("div", Lg, [
        (h(!0), x(xe, null, Ae(D.value, (C, J) => (h(), x("div", {
          key: C.title + J,
          ref_for: !0,
          ref: (ye) => M(ye, J),
          class: We(["chart-wrapper", Y()])
        }, [
          a.value[J] ? (h(), x("div", Bg, [
            f("div", Fg, ie(C.title), 1),
            Z(S(La), {
              options: C.options,
              series: C.series,
              type: C.chartType,
              width: "100%",
              height: C.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : B("", !0)
        ], 2))), 128))
      ]),
      D.value[0].section === "Paid Intelligence" ? (h(), pe(m0, {
        key: 0,
        tags: o.tags.slice(0, 2)
      }, null, 8, ["tags"])) : B("", !0),
      D.value[0].section === "Paid Intelligence" ? (h(), x("h5", $g, ie(o.paidSocial.section), 1)) : B("", !0),
      D.value[0].section === "Paid Intelligence" ? (h(), x("div", Vg, [
        f("div", {
          ref_key: "paidSocialEl",
          ref: g,
          class: We(["chart-wrapper", { "full-width": !0 }])
        }, [
          f("div", Og, ie(o.paidSocial.title), 1),
          $.value ? (h(), pe(S(La), {
            key: 0,
            options: Q.value.options,
            series: Q.value.series,
            type: "bar",
            width: "100%",
            height: "500"
          }, null, 8, ["options", "series"])) : B("", !0)
        ], 512)
      ])) : B("", !0),
      o.tags[2].section === "Owned Intelligence" && D.value[0].section === "Paid Intelligence" ? (h(), x("h5", Pg, ie(o.tags[2].section), 1)) : B("", !0),
      o.tags[2].section === "Owned Intelligence" && D.value[0].section === "Paid Intelligence" ? (h(), pe(m0, {
        key: 4,
        tags: o.tags.slice(2)
      }, null, 8, ["tags"])) : B("", !0)
    ]));
  }
}, Gg = /* @__PURE__ */ Ke(Rg, [["__scopeId", "data-v-271335c2"]]), Mg = "5.12.1", Ug = 25, Wg = 0, Ng = 100, qg = 450, zg = 450, Hg = "*Final5", Qg = 0, Kg = [], Yg = [
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
], Zg = [], Jg = {}, Xg = {
  v: Mg,
  fr: Ug,
  ip: Wg,
  op: Ng,
  w: qg,
  h: zg,
  nm: Hg,
  ddd: Qg,
  assets: Kg,
  layers: Yg,
  markers: Zg,
  props: Jg
}, jg = {
  key: 0,
  class: "explore-insights-loader"
}, e3 = {
  key: 1,
  class: "explore-insights-wrapper"
}, t3 = { class: "explore-insights" }, n3 = { class: "explore-insights-subtitle" }, i3 = { class: "d-flex flex-column" }, r3 = { class: "mb-2" }, a3 = { class: "pd-segment-title-details" }, s3 = { class: "pd-segment-title-details" }, l3 = { key: 0 }, o3 = { class: "thumbnail-card" }, u3 = { class: "thumbnail-segment-cards" }, c3 = { class: "segment-card-row" }, d3 = {
  __name: "ExploreInsights",
  emits: ["apiError"],
  setup(o, { emit: T }) {
    const a = T, b = un(), g = b.get_selectedSegment, $ = q(null), L = Fe(() => $.value || {}), G = q(), O = q([]), D = q(!0), M = q([]);
    Sn(async () => {
      var I, A, C, J, ye;
      if (g != null && g.segmentId)
        try {
          D.value = !0;
          const he = await li.get(
            `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${g != null && g.segmentId ? g == null ? void 0 : g.segmentId : (I = un.get_selectedSegment) == null ? void 0 : I.segmentId}`,
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
          (A = he == null ? void 0 : he.data) != null && A.data || a("apiError", {
            error: "Empty response",
            headline: "Error",
            message: "Sorry, an error occurred while getting your insights."
          }), $.value = (J = (C = he.data) == null ? void 0 : C.data) == null ? void 0 : J[0];
          const ce = $.value.charts.reduce((de, H, V, F) => (V < 2 ? (de[0] || (de[0] = []), de[0].push(H)) : V < 5 ? (de[1] || (de[1] = []), de[1].push(H)) : (de[2] || (de[2] = []), de[2].push(H)), de), []);
          O.value = $.value.segments[0], M.value = Object.values(ce), await ch(3e3), D.value = !1;
        } catch (he) {
          D.value = !1;
          const ce = {
            error: he,
            headline: "Error",
            message: ((ye = he == null ? void 0 : he.response) == null ? void 0 : ye.data) || "Sorry, an error occurred while getting your insights."
          };
          a(ce);
        }
    }), Fe(() => {
      var I, A, C;
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
          categories: ((A = (I = g.thumbnail) == null ? void 0 : I.graph) == null ? void 0 : A.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((C = g.thumbnail) == null ? void 0 : C.title) || "",
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
      var I, A, C;
      return ((C = (A = (I = g.thumbnail) == null ? void 0 : I.graph) == null ? void 0 : A.seriesCombined) == null ? void 0 : C.map((J) => ({
        name: J.name,
        data: J.data.map(Number)
      }))) || [];
    });
    const Y = Fe(() => {
      var I, A, C, J;
      return ((J = (C = (A = (I = g.thumbnail) == null ? void 0 : I.segments) == null ? void 0 : A[0]) == null ? void 0 : C.segments) == null ? void 0 : J.slice(0, 4)) || [];
    });
    Fe(() => Y.value.map((C) => parseFloat(C.affinityScore || "0")).reduce((C, J) => C + J, 0).toFixed(2)), Fe(() => Y.value.map((A) => parseInt(A.reach || "0", 10)).reduce((A, C) => A + C, 0).toLocaleString());
    function Q(I) {
      return I == null ? "" : (typeof I == "string" ? parseInt(I, 10) : I).toLocaleString();
    }
    return (I, A) => {
      var C, J, ye;
      return h(), x(xe, null, [
        D.value ? (h(), x("div", jg, [
          Z(S(uh), {
            height: "40vh",
            ref_key: "anim",
            ref: G,
            "animation-data": S(Xg),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          A[0] || (A[0] = f("h6", null, [
            nt("Generating Open Intelligence Insights"),
            f("span", { class: "dot-animate" }, [
              f("span", null, "."),
              f("span", null, "."),
              f("span", null, ".")
            ])
          ], -1))
        ])) : B("", !0),
        D.value ? B("", !0) : (h(), x("div", e3, [
          f("div", t3, [
            f("h6", n3, [
              f("div", i3, [
                f("div", r3, [
                  A[1] || (A[1] = f("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  nt(ie(((C = S(g)) == null ? void 0 : C.name) || "Segment Overview"), 1)
                ]),
                f("div", a3, [
                  A[2] || (A[2] = f("strong", null, "Count:", -1)),
                  nt(" " + ie(Q((J = S(g)) == null ? void 0 : J.count)), 1)
                ]),
                f("div", s3, [
                  A[3] || (A[3] = f("strong", null, "Description:", -1)),
                  nt(" " + ie((ye = S(g)) == null ? void 0 : ye.description), 1)
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
            $.value ? (h(), x("div", l3, [
              f("div", o3, [
                f("div", u3, [
                  f("div", c3, [
                    (h(), pe(i2, {
                      key: I.index,
                      "segment-data": O.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ])) : B("", !0),
            $.value ? (h(!0), x(xe, { key: 1 }, Ae(M.value, (he, ce) => {
              var de;
              return h(), x("div", {
                class: "charts-outer-wrapper",
                key: ((de = he == null ? void 0 : he[0]) == null ? void 0 : de.section) + ce
              }, [
                he ? (h(), pe(Gg, {
                  key: 0,
                  charts: he || [],
                  tags: L.value.tags || [],
                  paidSocial: $.value.paidSocial
                }, null, 8, ["charts", "tags", "paidSocial"])) : B("", !0)
              ]);
            }), 128)) : B("", !0)
          ])
        ]))
      ], 64);
    };
  }
}, f3 = /* @__PURE__ */ Ke(d3, [["__scopeId", "data-v-048fede1"]]), p3 = { key: 0 }, h3 = { key: 1 }, m3 = { class: "discovery-header" }, g3 = {
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
  setup(o, { emit: T }) {
    const a = T, b = un(), g = tr(), $ = o, L = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], G = q("standard"), O = q(L[0]), D = q(!1), M = q(null);
    function Y(C) {
      M.value = C, D.value = !0;
    }
    function Q() {
      a("close");
    }
    function I(C) {
      a("insertSegment", C);
    }
    function A() {
      D.value = !1;
    }
    return Sn(() => {
      b.set_brandId($.brandId), b.set_token($.token), b.set_tenantId($.tenantId), b.set_baseUrl($.baseUrl), g.set_customSegmentUrl($.customSegmentUrl), G.value = b.get_activeTab;
    }), (C, J) => (h(), pe(S(y0), {
      onClose: Q,
      size: "large"
    }, {
      header: $t(() => [
        D.value ? B("", !0) : (h(), x("div", p3, [
          J[1] || (J[1] = f("div", { class: "header" }, [
            f("h4", null, "Segment Manager")
          ], -1)),
          Z(S(lh), {
            tabs: L,
            modelValue: O.value,
            "onUpdate:modelValue": J[0] || (J[0] = (ye) => O.value = ye),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        D.value ? (h(), x("div", h3, [
          f("div", {
            onClick: A,
            class: "navigation"
          }, [
            Z(S(Vt), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            J[2] || (J[2] = f("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          f("div", m3, [
            J[3] || (J[3] = f("div", { class: "discovery-header-title" }, [
              f("h6", null, "Segment Manager"),
              f("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ], -1)),
            Z(S(it), { label: "Go to activation" })
          ])
        ])) : B("", !0)
      ]),
      body: $t(() => [
        O.value.id === 1 && !D.value ? (h(), pe(pm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: I,
          onShowInsightsExplorer: Y,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: M.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : B("", !0),
        O.value.id === 2 && !D.value ? (h(), pe(xg, {
          key: 1,
          onInsertSegment: I,
          onShowInsightsExplorer: Y,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : B("", !0),
        D.value ? (h(), pe(f3, { key: 2 })) : B("", !0)
      ]),
      _: 1
    }));
  }
}, C3 = /* @__PURE__ */ Ke(g3, [["__scopeId", "data-v-087600d9"]]);
export {
  C3 as BetaSegmentManagerModal,
  xg as CustomSegments,
  f3 as ExploreInsights,
  pm as StandardSegments,
  tr as useCustomSegmentStore,
  un as useSegmentManagerStore
};
