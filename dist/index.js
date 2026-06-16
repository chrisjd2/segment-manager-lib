import { ref as N, computed as Te, watch as un, createElementBlock as x, openBlock as h, normalizeClass as Ue, createElementVNode as f, createCommentVNode as D, normalizeStyle as wn, createBlock as le, unref as A, Fragment as he, renderList as Ee, createTextVNode as it, toDisplayString as ne, withKeys as $a, renderSlot as sr, createVNode as Z, onMounted as In, onUnmounted as ah, resolveComponent as g0, withCtx as Pt, withModifiers as sh, nextTick as c0 } from "vue";
import { CataUiInputCheckbox as Cn, CataUiIcon as Rt, CataUiStatusLabel as lh, CataUiInputDate as x0, CataUiInputSelect as Vt, CataUiInput as Ot, CataUiButton as nt, CataUiTooltip as d0, CataUiModal as y0, CataUiSpinner as Dn, CataUiTabs as Ia, CataUiTabSwitch as oh } from "@catalyst/ui-library";
import { defineStore as k0 } from "pinia";
import hi from "axios";
import Tn from "dayjs";
import { CataCoreUiChart as La } from "@catalyst-core/ui-library";
import { v4 as Ca } from "uuid";
import { Container as Ba, Draggable as uh } from "vue3-smooth-dnd";
import { LottieAnimation as ch } from "lottie-web-vue";
import { useIntersectionObserver as f0, promiseTimeout as dh } from "@vueuse/core";
const fh = {
  async fetch_database_model(o, I) {
    try {
      const a = await xh(o, I);
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
    var I;
    try {
      const a = await yh(o);
      this.set_custom_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((I = a.response) == null ? void 0 : I.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(b);
    }
  },
  async generate_ai_query(o, I) {
    var a;
    try {
      return (await vh(o, I)).data;
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
    var I;
    try {
      const a = await validateQuery(o);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((I = a == null ? void 0 : a.response) == null ? void 0 : I.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(b);
    }
  },
  async run_query(o, I) {
    var a;
    try {
      return (await kh(o, I)).count;
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
}, or = k0("customSegmentStore", {
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
}), Ln = "", ur = hi.create(), mi = hi.create();
hi.create();
ur.interceptors.request.use(
  (o) => {
    const I = cn();
    return o.baseURL = I.baseUrl, o.headers.Authorization = `Bearer ${I.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = I.tenantId, o.headers["brand-id"] = I.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", v0(o), o;
  },
  (o) => Promise.reject(o)
);
mi.interceptors.request.use(
  (o) => {
    const I = cn(), a = or();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${I.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = I.tenantId, o.headers["brand-id"] = I.brandId, v0(o), o;
  },
  (o) => Promise.reject(o)
);
const hh = () => hi.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), v0 = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, p0 = (o, I) => ur.get(`${Ln}/api/v1/segments/${I ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), mh = (o) => ur.get(`${Ln}/api/v1/insights/${o}`, { params: queryParams }).then((I) => I.data).catch((I) => {
  throw I;
}), gh = () => ur.get(`${Ln}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), xh = (o, I) => mi.get(`${Ln}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), yh = () => mi.get(`${Ln}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), kh = (o, I) => mi.post(`${Ln}/api/v1/query/${I}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), vh = (o, I) => mi.post(`${Ln}/api/v1/query/gen/${I}`, o).then((a) => a.data).catch((a) => {
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
      const I = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting insights your data."
      };
      this.set_ApiError(I);
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
      const I = {
        ...this.query,
        page: 1
      }, a = await p0(I, o);
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
      const I = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(I);
    }
  },
  async fetch_nextSegmentPage() {
    var a;
    const o = this.platform, I = {
      ...this.query,
      page: this.currentPage + 1
    };
    try {
      const b = await p0(I, o), m = b.data.map((T) => ({
        ...T,
        status: {
          type: T.status,
          value: T.status ? T.status : "active",
          color: this.stateColors[T.status]
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
    var I;
    try {
      const a = await gh(o);
      this.set_segment_settings(a.data);
    } catch (a) {
      const b = {
        error: a,
        headline: "Error",
        message: ((I = a.response) == null ? void 0 : I.data) || "Sorry, an error occurred while getting your data."
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
}, cn = k0("segmentManagerStore", {
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
}), pi = Object.freeze({
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
}), Qe = (o, I) => {
  const a = o.__vccOpts || o;
  for (const [b, m] of I)
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
  setup(o, { emit: I }) {
    const a = I, b = o, m = N(null), T = N(!1), w = N(1), z = N([]), X = N(null), O = N(!1), H = N({}), Y = Te(
      {
        get() {
          return b.checkedRows;
        },
        set(M) {
          z.value = M;
        }
      }
    ), fe = Te(() => b.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${b.stickyHeader}px;` : "");
    function R() {
      b.expandable && b.rows.length > 0 && (O.value = !O.value, O.value === !1 && (H.value = {}));
    }
    function S(M) {
      return b.expandable && M.details.length === 1;
    }
    function L(M) {
      H[M] ? H[M] = !H[M] : this.$set(H, M, !0);
    }
    function $(M) {
      X.value = M;
    }
    function Q(M, F, B) {
      B.key !== "actions" && B.type !== "link" && F.showInAction !== !1 && a("rowClicked", { event: M, row: F });
    }
    function De(M) {
      b.sortable && M.key !== "actions" && M.type !== "link" && (m.value === M.key ? w.value *= -1 : (m.value = M.key, w.value = 1), a("columnSorted", { sortColumn: m.value, sortOrder: w }));
    }
    function ie(M, F) {
      let B = "";
      if (typeof M == "object" ? B = M.value : B = M, F === "datetime") {
        const P = Tn(new Date(B));
        return Tn(P).format("DD MMM YYYY");
      }
      if (F === "datetimehour") {
        const P = Tn(new Date(B));
        return Tn(P).format("DD MMM YYYY, HH:mm");
      }
      return F === "number" || (typeof B == "number" || typeof B == "string" && !Number.isNaN(Number(B))) && String(B).trim() !== "" ? (typeof B == "string" ? Number(B) : B).toLocaleString() : B;
    }
    function ye(M) {
      return M == null ? "" : (typeof M == "string" ? parseInt(M, 10) : M).toLocaleString();
    }
    return un(T, (M) => {
      M === "true" || M === !0 ? b.rows.forEach((F) => {
        !z.value.includes(F.id) && F.showInAction !== !1 && z.value.push(F.id);
      }) : z.value = [], a("rowChecked", z.value);
    }), (M, F) => (h(), x("div", {
      class: Ue(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      f("table", {
        class: Ue(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        f("thead", null, [
          f("tr", {
            onClick: F[1] || (F[1] = (B) => R())
          }, [
            !o.collapseControls && !o.expandable ? (h(), x("th", {
              key: 0,
              class: "checkbox-container",
              style: wn(fe.value)
            }, [
              o.selectable ? (h(), le(A(Cn), {
                key: 0,
                modelValue: T.value,
                "onUpdate:modelValue": F[0] || (F[0] = (B) => T.value = B)
              }, null, 8, ["modelValue"])) : D("", !0)
            ], 4)) : D("", !0),
            o.expandable ? (h(), x("th", {
              key: 1,
              class: Ue(["text-center", {
                expandable: o.expandable
              }]),
              style: wn(fe.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), le(A(Rt), {
                key: 0,
                class: "expand-icon",
                icon: O.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: O.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : D("", !0)
            ], 6)) : D("", !0),
            (h(!0), x(he, null, Ee(o.columns, (B) => (h(), x("th", {
              style: wn(fe.value),
              key: B.id,
              onClick: (P) => De(B),
              class: Ue({
                actions: B.key === "actions",
                active: m.value === B.key,
                sortable: o.sortable && B.key !== "actions" && B.type != "link",
                expandable: o.expandable
              })
            }, [
              B.key !== "actions" && B.type != "link" ? (h(), x(he, { key: 0 }, [
                it(ne(B.value) + " ", 1),
                o.sortable ? (h(), le(A(Rt), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : D("", !0)
              ], 64)) : D("", !0)
            ], 14, Eh))), 128))
          ])
        ]),
        o.rows ? (h(), x("tbody", Sh, [
          (h(!0), x(he, null, Ee(o.rows, (B) => (h(), x(he, null, [
            (h(!0), x(he, null, Ee(B.details, (P) => (h(), x(he, null, [
              o.expandable & O.value || S(B) ? (h(), x("tr", {
                class: Ue({ expandable: o.expandable && P.details.length === 1 }),
                key: P.id,
                onClick: (xe) => L(P.id)
              }, [
                f("td", wh, [
                  P.details.length > 1 ? (h(), le(A(Rt), {
                    key: 0,
                    class: "expand-icon",
                    icon: H.value[P.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: H.value[P.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : D("", !0)
                ]),
                (h(!0), x(he, null, Ee(o.columns, (xe) => (h(), x("td", {
                  style: wn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[xe.key] ? `${o.minWidthCell[xe.key]}px` : "0px"
                  }),
                  key: xe.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ie(P[xe.key].value || P[xe.key], xe.type)
                    }, ne(ie(P[xe.key], xe.type)), 9, Ch)
                  ])
                ], 4))), 128))
              ], 10, Ah)) : D("", !0),
              P.details.length > 1 && H.value[P.id] ? (h(!0), x(he, { key: 1 }, Ee(P.details, (xe) => (h(), x("tr", {
                class: "subrow-details",
                key: xe.id
              }, [
                F[4] || (F[4] = f("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), x(he, null, Ee(o.columns, (Fe) => (h(), x("td", {
                  style: wn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Fe.key] ? `${o.minWidthCell[Fe.key]}px` : "0px"
                  }),
                  key: Fe.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ie(xe[Fe.key], Fe.type)
                    }, ne(ie(xe[Fe.key], Fe.type)), 9, Th)
                  ])
                ], 4))), 128))
              ]))), 128)) : D("", !0)
            ], 64))), 256)),
            (o.expandable && B.details.length) > 1 || o.expandable && B.details[0].details.length > 1 || !o.expandable ? (h(), x("tr", {
              class: Ue({
                active: Y.value.includes(B.id),
                static: B.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: X.value === B._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: B.id,
              onClick: (P) => $(B._id)
            }, [
              o.collapseControls ? D("", !0) : (h(), x("td", Ih, [
                o.selectable && B.showInAction !== !1 ? (h(), le(A(Cn), {
                  key: 0,
                  modelValue: Y.value,
                  "onUpdate:modelValue": F[2] || (F[2] = (P) => Y.value = P),
                  val: B.id,
                  onInput: F[3] || (F[3] = (P) => M.$emit(A(pi).ROW_CHECKED, z.value))
                }, null, 8, ["modelValue", "val"])) : D("", !0)
              ])),
              (h(!0), x(he, null, Ee(o.columns, (P) => (h(), x("td", {
                class: Ue({
                  actions: P.key === "actions",
                  fixedActions: o.fixedActions && P.key === "actions"
                }),
                style: wn({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[P.key] ? `${o.minWidthCell[P.key]}px` : "0px"
                }),
                key: P.key,
                onKeydown: $a((xe) => Q(xe, B, P), ["enter"]),
                onClick: (xe) => Q(xe, B, P)
              }, [
                B[P.key] !== void 0 && B[P.key] !== null && P.key !== "actions" ? (h(), x(he, { key: 0 }, [
                  B[P.key].icon ? (h(), x("img", {
                    key: 0,
                    alt: "",
                    src: B[P.key].icon,
                    class: Ue(P.key)
                  }, null, 10, Bh)) : B[P.key].biicon ? (h(), x("span", {
                    key: 1,
                    class: Ue(["table-bi-icon", B[P.key].biicon]),
                    style: wn({ color: B[P.key].color })
                  }, null, 6)) : D("", !0),
                  B[P.key].type ? (h(), le(A(lh), {
                    key: 2,
                    "font-size": 12,
                    label: B[P.key].value,
                    color: B[P.key].color
                  }, null, 8, ["label", "color"])) : P.type === "link" ? sr(M.$slots, "linkHandler", {
                    key: 3,
                    link: { row: B, columnKey: P.key }
                  }, void 0, !0) : P.type === "number" ? (h(), x("span", Fh, ne(ye(B[P.key])), 1)) : (h(), x("span", {
                    key: 5,
                    title: ie(B[P.key].value || B[P.key], P.type)
                  }, ne(ie(B[P.key], P.type)), 9, $h))
                ], 64)) : D("", !0),
                P.key === "actions" ? sr(M.$slots, "actionButton", {
                  key: 1,
                  row: B
                }, void 0, !0) : D("", !0)
              ], 46, Lh))), 128))
            ], 10, Dh)) : D("", !0)
          ], 64))), 256))
        ])) : D("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), x("p", Vh, " No matches found ")) : D("", !0)
    ], 2));
  }
}, Ph = /* @__PURE__ */ Qe(Oh, [["__scopeId", "data-v-b2e5eec6"]]);
var fi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, lr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
lr.exports;
(function(o, I) {
  (function() {
    var a, b = "4.17.21", m = 200, T = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", w = "Expected a function", z = "Invalid `variable` option passed into `_.template`", X = "__lodash_hash_undefined__", O = 500, H = "__lodash_placeholder__", Y = 1, fe = 2, R = 4, S = 1, L = 2, $ = 1, Q = 2, De = 4, ie = 8, ye = 16, M = 32, F = 64, B = 128, P = 256, xe = 512, Fe = 30, pt = "...", Oe = 800, Pe = 16, Et = 1, Gt = 2, Mt = 3, Dt = 1 / 0, It = 9007199254740991, Yn = 17976931348623157e292, Zt = NaN, Xe = 4294967295, U = Xe - 1, y = Xe >>> 1, ae = [
      ["ary", B],
      ["bind", $],
      ["bindKey", Q],
      ["curry", ie],
      ["curryRight", ye],
      ["flip", xe],
      ["partial", M],
      ["partialRight", F],
      ["rearg", P]
    ], qe = "[object Arguments]", rt = "[object Array]", Bn = "[object AsyncFunction]", Lt = "[object Boolean]", Se = "[object Date]", cr = "[object DOMException]", dn = "[object Error]", fn = "[object Function]", Zn = "[object GeneratorFunction]", at = "[object Map]", pn = "[object Number]", Fn = "[object Null]", St = "[object Object]", gi = "[object Promise]", xi = "[object Proxy]", hn = "[object RegExp]", st = "[object Set]", mn = "[object String]", $n = "[object Symbol]", J = "[object Undefined]", C = "[object WeakMap]", W = "[object WeakSet]", _e = "[object ArrayBuffer]", V = "[object DataView]", de = "[object Float32Array]", ht = "[object Float64Array]", Xt = "[object Int8Array]", Jt = "[object Int16Array]", gn = "[object Int32Array]", dr = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", pr = "[object Uint16Array]", hr = "[object Uint32Array]", S0 = /\b__p \+= '';/g, A0 = /\b(__p \+=) '' \+/g, w0 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Va = /&(?:amp|lt|gt|quot|#39);/g, Oa = /[&<>"']/g, C0 = RegExp(Va.source), T0 = RegExp(Oa.source), D0 = /<%-([\s\S]+?)%>/g, I0 = /<%([\s\S]+?)%>/g, Pa = /<%=([\s\S]+?)%>/g, L0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, B0 = /^\w*$/, F0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, $0 = RegExp(mr.source), gr = /^\s+/, V0 = /\s/, O0 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, P0 = /\{\n\/\* \[wrapped with (.+)\] \*/, R0 = /,? & /, G0 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, M0 = /[()=,{}\[\]\/\s]/, U0 = /\\(\\)?/g, N0 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ra = /\w*$/, W0 = /^[-+]0x[0-9a-f]+$/i, q0 = /^0b[01]+$/i, z0 = /^\[object .+?Constructor\]$/, H0 = /^0o[0-7]+$/i, Q0 = /^(?:0|[1-9]\d*)$/, K0 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, yi = /($^)/, Y0 = /['\n\r\u2028\u2029\\]/g, ki = "\\ud800-\\udfff", Z0 = "\\u0300-\\u036f", X0 = "\\ufe20-\\ufe2f", J0 = "\\u20d0-\\u20ff", Ga = Z0 + X0 + J0, Ma = "\\u2700-\\u27bf", Ua = "a-z\\xdf-\\xf6\\xf8-\\xff", j0 = "\\xac\\xb1\\xd7\\xf7", eo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", to = "\\u2000-\\u206f", no = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Na = "A-Z\\xc0-\\xd6\\xd8-\\xde", Wa = "\\ufe0e\\ufe0f", qa = j0 + eo + to + no, xr = "['’]", io = "[" + ki + "]", za = "[" + qa + "]", vi = "[" + Ga + "]", Ha = "\\d+", ro = "[" + Ma + "]", Qa = "[" + Ua + "]", Ka = "[^" + ki + qa + Ha + Ma + Ua + Na + "]", yr = "\\ud83c[\\udffb-\\udfff]", ao = "(?:" + vi + "|" + yr + ")", Ya = "[^" + ki + "]", kr = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Vn = "[" + Na + "]", Za = "\\u200d", Xa = "(?:" + Qa + "|" + Ka + ")", so = "(?:" + Vn + "|" + Ka + ")", Ja = "(?:" + xr + "(?:d|ll|m|re|s|t|ve))?", ja = "(?:" + xr + "(?:D|LL|M|RE|S|T|VE))?", es = ao + "?", ts = "[" + Wa + "]?", lo = "(?:" + Za + "(?:" + [Ya, kr, vr].join("|") + ")" + ts + es + ")*", oo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", uo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ns = ts + es + lo, co = "(?:" + [ro, kr, vr].join("|") + ")" + ns, fo = "(?:" + [Ya + vi + "?", vi, kr, vr, io].join("|") + ")", po = RegExp(xr, "g"), ho = RegExp(vi, "g"), _r = RegExp(yr + "(?=" + yr + ")|" + fo + ns, "g"), mo = RegExp([
      Vn + "?" + Qa + "+" + Ja + "(?=" + [za, Vn, "$"].join("|") + ")",
      so + "+" + ja + "(?=" + [za, Vn + Xa, "$"].join("|") + ")",
      Vn + "?" + Xa + "+" + Ja,
      Vn + "+" + ja,
      uo,
      oo,
      Ha,
      co
    ].join("|"), "g"), go = RegExp("[" + Za + ki + Ga + Wa + "]"), xo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, yo = [
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
    Ce[de] = Ce[ht] = Ce[Xt] = Ce[Jt] = Ce[gn] = Ce[dr] = Ce[fr] = Ce[pr] = Ce[hr] = !0, Ce[qe] = Ce[rt] = Ce[_e] = Ce[Lt] = Ce[V] = Ce[Se] = Ce[dn] = Ce[fn] = Ce[at] = Ce[pn] = Ce[St] = Ce[hn] = Ce[st] = Ce[mn] = Ce[C] = !1;
    var we = {};
    we[qe] = we[rt] = we[_e] = we[V] = we[Lt] = we[Se] = we[de] = we[ht] = we[Xt] = we[Jt] = we[gn] = we[at] = we[pn] = we[St] = we[hn] = we[st] = we[mn] = we[$n] = we[dr] = we[fr] = we[pr] = we[hr] = !0, we[dn] = we[fn] = we[C] = !1;
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
    }, So = parseFloat, Ao = parseInt, is = typeof fi == "object" && fi && fi.Object === Object && fi, wo = typeof self == "object" && self && self.Object === Object && self, Ne = is || wo || Function("return this")(), br = I && !I.nodeType && I, xn = br && !0 && o && !o.nodeType && o, rs = xn && xn.exports === br, Er = rs && is.process, mt = function() {
      try {
        var d = xn && xn.require && xn.require("util").types;
        return d || Er && Er.binding && Er.binding("util");
      } catch {
      }
    }(), as = mt && mt.isArrayBuffer, ss = mt && mt.isDate, ls = mt && mt.isMap, os = mt && mt.isRegExp, us = mt && mt.isSet, cs = mt && mt.isTypedArray;
    function lt(d, k, g) {
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
    function Co(d, k, g, q) {
      for (var re = -1, ke = d == null ? 0 : d.length; ++re < ke; ) {
        var Re = d[re];
        k(q, Re, g(Re), d);
      }
      return q;
    }
    function gt(d, k) {
      for (var g = -1, q = d == null ? 0 : d.length; ++g < q && k(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function To(d, k) {
      for (var g = d == null ? 0 : d.length; g-- && k(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function ds(d, k) {
      for (var g = -1, q = d == null ? 0 : d.length; ++g < q; )
        if (!k(d[g], g, d))
          return !1;
      return !0;
    }
    function jt(d, k) {
      for (var g = -1, q = d == null ? 0 : d.length, re = 0, ke = []; ++g < q; ) {
        var Re = d[g];
        k(Re, g, d) && (ke[re++] = Re);
      }
      return ke;
    }
    function _i(d, k) {
      var g = d == null ? 0 : d.length;
      return !!g && On(d, k, 0) > -1;
    }
    function Sr(d, k, g) {
      for (var q = -1, re = d == null ? 0 : d.length; ++q < re; )
        if (g(k, d[q]))
          return !0;
      return !1;
    }
    function Ie(d, k) {
      for (var g = -1, q = d == null ? 0 : d.length, re = Array(q); ++g < q; )
        re[g] = k(d[g], g, d);
      return re;
    }
    function en(d, k) {
      for (var g = -1, q = k.length, re = d.length; ++g < q; )
        d[re + g] = k[g];
      return d;
    }
    function Ar(d, k, g, q) {
      var re = -1, ke = d == null ? 0 : d.length;
      for (q && ke && (g = d[++re]); ++re < ke; )
        g = k(g, d[re], re, d);
      return g;
    }
    function Do(d, k, g, q) {
      var re = d == null ? 0 : d.length;
      for (q && re && (g = d[--re]); re--; )
        g = k(g, d[re], re, d);
      return g;
    }
    function wr(d, k) {
      for (var g = -1, q = d == null ? 0 : d.length; ++g < q; )
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
      var q;
      return g(d, function(re, ke, Re) {
        if (k(re, ke, Re))
          return q = ke, !1;
      }), q;
    }
    function bi(d, k, g, q) {
      for (var re = d.length, ke = g + (q ? 1 : -1); q ? ke-- : ++ke < re; )
        if (k(d[ke], ke, d))
          return ke;
      return -1;
    }
    function On(d, k, g) {
      return k === k ? qo(d, k, g) : bi(d, ps, g);
    }
    function Fo(d, k, g, q) {
      for (var re = g - 1, ke = d.length; ++re < ke; )
        if (q(d[re], k))
          return re;
      return -1;
    }
    function ps(d) {
      return d !== d;
    }
    function hs(d, k) {
      var g = d == null ? 0 : d.length;
      return g ? Dr(d, k) / g : Zt;
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
    function ms(d, k, g, q, re) {
      return re(d, function(ke, Re, Ae) {
        g = q ? (q = !1, ke) : k(g, ke, Re, Ae);
      }), g;
    }
    function $o(d, k) {
      var g = d.length;
      for (d.sort(k); g--; )
        d[g] = d[g].value;
      return d;
    }
    function Dr(d, k) {
      for (var g, q = -1, re = d.length; ++q < re; ) {
        var ke = k(d[q]);
        ke !== a && (g = g === a ? ke : g + ke);
      }
      return g;
    }
    function Ir(d, k) {
      for (var g = -1, q = Array(d); ++g < d; )
        q[g] = k(g);
      return q;
    }
    function Vo(d, k) {
      return Ie(k, function(g) {
        return [g, d[g]];
      });
    }
    function gs(d) {
      return d && d.slice(0, vs(d) + 1).replace(gr, "");
    }
    function ot(d) {
      return function(k) {
        return d(k);
      };
    }
    function Lr(d, k) {
      return Ie(k, function(g) {
        return d[g];
      });
    }
    function Xn(d, k) {
      return d.has(k);
    }
    function xs(d, k) {
      for (var g = -1, q = d.length; ++g < q && On(k, d[g], 0) > -1; )
        ;
      return g;
    }
    function ys(d, k) {
      for (var g = d.length; g-- && On(k, d[g], 0) > -1; )
        ;
      return g;
    }
    function Oo(d, k) {
      for (var g = d.length, q = 0; g--; )
        d[g] === k && ++q;
      return q;
    }
    var Po = Tr(vo), Ro = Tr(_o);
    function Go(d) {
      return "\\" + Eo[d];
    }
    function Mo(d, k) {
      return d == null ? a : d[k];
    }
    function Pn(d) {
      return go.test(d);
    }
    function Uo(d) {
      return xo.test(d);
    }
    function No(d) {
      for (var k, g = []; !(k = d.next()).done; )
        g.push(k.value);
      return g;
    }
    function Br(d) {
      var k = -1, g = Array(d.size);
      return d.forEach(function(q, re) {
        g[++k] = [re, q];
      }), g;
    }
    function ks(d, k) {
      return function(g) {
        return d(k(g));
      };
    }
    function tn(d, k) {
      for (var g = -1, q = d.length, re = 0, ke = []; ++g < q; ) {
        var Re = d[g];
        (Re === k || Re === H) && (d[g] = H, ke[re++] = g);
      }
      return ke;
    }
    function Ei(d) {
      var k = -1, g = Array(d.size);
      return d.forEach(function(q) {
        g[++k] = q;
      }), g;
    }
    function Wo(d) {
      var k = -1, g = Array(d.size);
      return d.forEach(function(q) {
        g[++k] = [q, q];
      }), g;
    }
    function qo(d, k, g) {
      for (var q = g - 1, re = d.length; ++q < re; )
        if (d[q] === k)
          return q;
      return -1;
    }
    function zo(d, k, g) {
      for (var q = g + 1; q--; )
        if (d[q] === k)
          return q;
      return q;
    }
    function Rn(d) {
      return Pn(d) ? Qo(d) : Io(d);
    }
    function At(d) {
      return Pn(d) ? Ko(d) : Lo(d);
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
      k = k == null ? Ne : Gn.defaults(Ne.Object(), k, Gn.pick(Ne, yo));
      var g = k.Array, q = k.Date, re = k.Error, ke = k.Function, Re = k.Math, Ae = k.Object, Fr = k.RegExp, Xo = k.String, xt = k.TypeError, Si = g.prototype, Jo = ke.prototype, Mn = Ae.prototype, Ai = k["__core-js_shared__"], wi = Jo.toString, be = Mn.hasOwnProperty, jo = 0, _s = function() {
        var e = /[^.]+$/.exec(Ai && Ai.keys && Ai.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), Ci = Mn.toString, eu = wi.call(Ae), tu = Ne._, nu = Fr(
        "^" + wi.call(be).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ti = rs ? k.Buffer : a, nn = k.Symbol, Di = k.Uint8Array, bs = Ti ? Ti.allocUnsafe : a, Ii = ks(Ae.getPrototypeOf, Ae), Es = Ae.create, Ss = Mn.propertyIsEnumerable, Li = Si.splice, As = nn ? nn.isConcatSpreadable : a, Jn = nn ? nn.iterator : a, yn = nn ? nn.toStringTag : a, Bi = function() {
        try {
          var e = En(Ae, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), iu = k.clearTimeout !== Ne.clearTimeout && k.clearTimeout, ru = q && q.now !== Ne.Date.now && q.now, au = k.setTimeout !== Ne.setTimeout && k.setTimeout, Fi = Re.ceil, $i = Re.floor, $r = Ae.getOwnPropertySymbols, su = Ti ? Ti.isBuffer : a, ws = k.isFinite, lu = Si.join, ou = ks(Ae.keys, Ae), Ge = Re.max, ze = Re.min, uu = q.now, cu = k.parseInt, Cs = Re.random, du = Si.reverse, Vr = En(k, "DataView"), jn = En(k, "Map"), Or = En(k, "Promise"), Un = En(k, "Set"), ei = En(k, "WeakMap"), ti = En(Ae, "create"), Vi = ei && new ei(), Nn = {}, fu = Sn(Vr), pu = Sn(jn), hu = Sn(Or), mu = Sn(Un), gu = Sn(ei), Oi = nn ? nn.prototype : a, ni = Oi ? Oi.valueOf : a, Ts = Oi ? Oi.toString : a;
      function s(e) {
        if (Be(e) && !se(e) && !(e instanceof me)) {
          if (e instanceof yt)
            return e;
          if (be.call(e, "__wrapped__"))
            return Dl(e);
        }
        return new yt(e);
      }
      var Wn = /* @__PURE__ */ function() {
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
      function Pi() {
      }
      function yt(e, t) {
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
      }, s.prototype = Pi.prototype, s.prototype.constructor = s, yt.prototype = Wn(Pi.prototype), yt.prototype.constructor = yt;
      function me(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Xe, this.__views__ = [];
      }
      function xu() {
        var e = new me(this.__wrapped__);
        return e.__actions__ = Je(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Je(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Je(this.__views__), e;
      }
      function yu() {
        if (this.__filtered__) {
          var e = new me(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function ku() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = se(e), i = t < 0, r = n ? e.length : 0, l = L1(0, r, this.__views__), u = l.start, c = l.end, p = c - u, v = i ? c : u - 1, _ = this.__iteratees__, E = _.length, G = 0, K = ze(p, this.__takeCount__);
        if (!n || !i && r == p && K == p)
          return Js(e, this.__actions__);
        var ee = [];
        e:
          for (; p-- && G < K; ) {
            v += t;
            for (var ue = -1, te = e[v]; ++ue < E; ) {
              var pe = _[ue], ge = pe.iteratee, dt = pe.type, Ze = ge(te);
              if (dt == Gt)
                te = Ze;
              else if (!Ze) {
                if (dt == Et)
                  continue e;
                break e;
              }
            }
            ee[G++] = te;
          }
        return ee;
      }
      me.prototype = Wn(Pi.prototype), me.prototype.constructor = me;
      function kn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function vu() {
        this.__data__ = ti ? ti(null) : {}, this.size = 0;
      }
      function _u(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function bu(e) {
        var t = this.__data__;
        if (ti) {
          var n = t[e];
          return n === X ? a : n;
        }
        return be.call(t, e) ? t[e] : a;
      }
      function Eu(e) {
        var t = this.__data__;
        return ti ? t[e] !== a : be.call(t, e);
      }
      function Su(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = ti && t === a ? X : t, this;
      }
      kn.prototype.clear = vu, kn.prototype.delete = _u, kn.prototype.get = bu, kn.prototype.has = Eu, kn.prototype.set = Su;
      function Ut(e) {
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
        var t = this.__data__, n = Ri(t, e);
        if (n < 0)
          return !1;
        var i = t.length - 1;
        return n == i ? t.pop() : Li.call(t, n, 1), --this.size, !0;
      }
      function Cu(e) {
        var t = this.__data__, n = Ri(t, e);
        return n < 0 ? a : t[n][1];
      }
      function Tu(e) {
        return Ri(this.__data__, e) > -1;
      }
      function Du(e, t) {
        var n = this.__data__, i = Ri(n, e);
        return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
      }
      Ut.prototype.clear = Au, Ut.prototype.delete = wu, Ut.prototype.get = Cu, Ut.prototype.has = Tu, Ut.prototype.set = Du;
      function Nt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Iu() {
        this.size = 0, this.__data__ = {
          hash: new kn(),
          map: new (jn || Ut)(),
          string: new kn()
        };
      }
      function Lu(e) {
        var t = Zi(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Bu(e) {
        return Zi(this, e).get(e);
      }
      function Fu(e) {
        return Zi(this, e).has(e);
      }
      function $u(e, t) {
        var n = Zi(this, e), i = n.size;
        return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
      }
      Nt.prototype.clear = Iu, Nt.prototype.delete = Lu, Nt.prototype.get = Bu, Nt.prototype.has = Fu, Nt.prototype.set = $u;
      function vn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Nt(); ++t < n; )
          this.add(e[t]);
      }
      function Vu(e) {
        return this.__data__.set(e, X), this;
      }
      function Ou(e) {
        return this.__data__.has(e);
      }
      vn.prototype.add = vn.prototype.push = Vu, vn.prototype.has = Ou;
      function wt(e) {
        var t = this.__data__ = new Ut(e);
        this.size = t.size;
      }
      function Pu() {
        this.__data__ = new Ut(), this.size = 0;
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
        if (n instanceof Ut) {
          var i = n.__data__;
          if (!jn || i.length < m - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Nt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      wt.prototype.clear = Pu, wt.prototype.delete = Ru, wt.prototype.get = Gu, wt.prototype.has = Mu, wt.prototype.set = Uu;
      function Ds(e, t) {
        var n = se(e), i = !n && An(e), r = !n && !i && on(e), l = !n && !i && !r && Qn(e), u = n || i || r || l, c = u ? Ir(e.length, Xo) : [], p = c.length;
        for (var v in e)
          (t || be.call(e, v)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
          Ht(v, p))) && c.push(v);
        return c;
      }
      function Is(e) {
        var t = e.length;
        return t ? e[Qr(0, t - 1)] : a;
      }
      function Nu(e, t) {
        return Xi(Je(e), _n(t, 0, e.length));
      }
      function Wu(e) {
        return Xi(Je(e));
      }
      function Pr(e, t, n) {
        (n !== a && !Ct(e[t], n) || n === a && !(t in e)) && Wt(e, t, n);
      }
      function ii(e, t, n) {
        var i = e[t];
        (!(be.call(e, t) && Ct(i, n)) || n === a && !(t in e)) && Wt(e, t, n);
      }
      function Ri(e, t) {
        for (var n = e.length; n--; )
          if (Ct(e[n][0], t))
            return n;
        return -1;
      }
      function qu(e, t, n, i) {
        return rn(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ls(e, t) {
        return e && Ft(t, Me(t), e);
      }
      function zu(e, t) {
        return e && Ft(t, et(t), e);
      }
      function Wt(e, t, n) {
        t == "__proto__" && Bi ? Bi(e, t, {
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
      function _n(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function kt(e, t, n, i, r, l) {
        var u, c = t & Y, p = t & fe, v = t & R;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!Le(e))
          return e;
        var _ = se(e);
        if (_) {
          if (u = F1(e), !c)
            return Je(e, u);
        } else {
          var E = He(e), G = E == fn || E == Zn;
          if (on(e))
            return tl(e, c);
          if (E == St || E == qe || G && !r) {
            if (u = p || G ? {} : vl(e), !c)
              return p ? b1(e, zu(u, e)) : _1(e, Ls(u, e));
          } else {
            if (!we[E])
              return r ? e : {};
            u = $1(e, E, c);
          }
        }
        l || (l = new wt());
        var K = l.get(e);
        if (K)
          return K;
        l.set(e, u), Yl(e) ? e.forEach(function(te) {
          u.add(kt(te, t, n, te, e, l));
        }) : Ql(e) && e.forEach(function(te, pe) {
          u.set(pe, kt(te, t, n, pe, e, l));
        });
        var ee = v ? p ? ra : ia : p ? et : Me, ue = _ ? a : ee(e);
        return gt(ue || e, function(te, pe) {
          ue && (pe = te, te = e[pe]), ii(u, pe, kt(te, t, n, pe, e, l));
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
          throw new xt(w);
        return ci(function() {
          e.apply(a, n);
        }, t);
      }
      function ri(e, t, n, i) {
        var r = -1, l = _i, u = !0, c = e.length, p = [], v = t.length;
        if (!c)
          return p;
        n && (t = Ie(t, ot(n))), i ? (l = Sr, u = !1) : t.length >= m && (l = Xn, u = !1, t = new vn(t));
        e:
          for (; ++r < c; ) {
            var _ = e[r], E = n == null ? _ : n(_);
            if (_ = i || _ !== 0 ? _ : 0, u && E === E) {
              for (var G = v; G--; )
                if (t[G] === E)
                  continue e;
              p.push(_);
            } else
              l(t, E, i) || p.push(_);
          }
        return p;
      }
      var rn = sl(Bt), $s = sl(Mr, !0);
      function Qu(e, t) {
        var n = !0;
        return rn(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Gi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !ct(u) : n(u, c)))
            var c = u, p = l;
        }
        return p;
      }
      function Ku(e, t, n, i) {
        var r = e.length;
        for (n = oe(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : oe(i), i < 0 && (i += r), i = n > i ? 0 : Xl(i); n < i; )
          e[n++] = t;
        return e;
      }
      function Vs(e, t) {
        var n = [];
        return rn(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function We(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = O1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? We(c, t - 1, n, i, r) : en(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Gr = ll(), Os = ll(!0);
      function Bt(e, t) {
        return e && Gr(e, t, Me);
      }
      function Mr(e, t) {
        return e && Os(e, t, Me);
      }
      function Mi(e, t) {
        return jt(t, function(n) {
          return Qt(e[n]);
        });
      }
      function bn(e, t) {
        t = sn(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[$t(t[n++])];
        return n && n == i ? e : a;
      }
      function Ps(e, t, n) {
        var i = t(e);
        return se(e) ? i : en(i, n(e));
      }
      function Ke(e) {
        return e == null ? e === a ? J : Fn : yn && yn in Ae(e) ? I1(e) : W1(e);
      }
      function Ur(e, t) {
        return e > t;
      }
      function Yu(e, t) {
        return e != null && be.call(e, t);
      }
      function Zu(e, t) {
        return e != null && t in Ae(e);
      }
      function Xu(e, t, n) {
        return e >= ze(t, n) && e < Ge(t, n);
      }
      function Nr(e, t, n) {
        for (var i = n ? Sr : _i, r = e[0].length, l = e.length, u = l, c = g(l), p = 1 / 0, v = []; u--; ) {
          var _ = e[u];
          u && t && (_ = Ie(_, ot(t))), p = ze(_.length, p), c[u] = !n && (t || r >= 120 && _.length >= 120) ? new vn(u && _) : a;
        }
        _ = e[0];
        var E = -1, G = c[0];
        e:
          for (; ++E < r && v.length < p; ) {
            var K = _[E], ee = t ? t(K) : K;
            if (K = n || K !== 0 ? K : 0, !(G ? Xn(G, ee) : i(v, ee, n))) {
              for (u = l; --u; ) {
                var ue = c[u];
                if (!(ue ? Xn(ue, ee) : i(e[u], ee, n)))
                  continue e;
              }
              G && G.push(ee), v.push(K);
            }
          }
        return v;
      }
      function Ju(e, t, n, i) {
        return Bt(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function ai(e, t, n) {
        t = sn(t, e), e = Sl(e, t);
        var i = e == null ? e : e[$t(_t(t))];
        return i == null ? a : lt(i, e, n);
      }
      function Rs(e) {
        return Be(e) && Ke(e) == qe;
      }
      function ju(e) {
        return Be(e) && Ke(e) == _e;
      }
      function e1(e) {
        return Be(e) && Ke(e) == Se;
      }
      function si(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Be(e) && !Be(t) ? e !== e && t !== t : t1(e, t, n, i, si, r);
      }
      function t1(e, t, n, i, r, l) {
        var u = se(e), c = se(t), p = u ? rt : He(e), v = c ? rt : He(t);
        p = p == qe ? St : p, v = v == qe ? St : v;
        var _ = p == St, E = v == St, G = p == v;
        if (G && on(e)) {
          if (!on(t))
            return !1;
          u = !0, _ = !1;
        }
        if (G && !_)
          return l || (l = new wt()), u || Qn(e) ? xl(e, t, n, i, r, l) : T1(e, t, p, n, i, r, l);
        if (!(n & S)) {
          var K = _ && be.call(e, "__wrapped__"), ee = E && be.call(t, "__wrapped__");
          if (K || ee) {
            var ue = K ? e.value() : e, te = ee ? t.value() : t;
            return l || (l = new wt()), r(ue, te, n, i, l);
          }
        }
        return G ? (l || (l = new wt()), D1(e, t, n, i, r, l)) : !1;
      }
      function n1(e) {
        return Be(e) && He(e) == at;
      }
      function Wr(e, t, n, i) {
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
            var E = new wt();
            if (i)
              var G = i(v, _, p, e, t, E);
            if (!(G === a ? si(_, v, S | L, i, E) : G))
              return !1;
          }
        }
        return !0;
      }
      function Gs(e) {
        if (!Le(e) || R1(e))
          return !1;
        var t = Qt(e) ? nu : z0;
        return t.test(Sn(e));
      }
      function i1(e) {
        return Be(e) && Ke(e) == hn;
      }
      function r1(e) {
        return Be(e) && He(e) == st;
      }
      function a1(e) {
        return Be(e) && ir(e.length) && !!Ce[Ke(e)];
      }
      function Ms(e) {
        return typeof e == "function" ? e : e == null ? tt : typeof e == "object" ? se(e) ? Ws(e[0], e[1]) : Ns(e) : o0(e);
      }
      function qr(e) {
        if (!ui(e))
          return ou(e);
        var t = [];
        for (var n in Ae(e))
          be.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function s1(e) {
        if (!Le(e))
          return N1(e);
        var t = ui(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !be.call(e, i)) || n.push(i);
        return n;
      }
      function zr(e, t) {
        return e < t;
      }
      function Us(e, t) {
        var n = -1, i = je(e) ? g(e.length) : [];
        return rn(e, function(r, l, u) {
          i[++n] = t(r, l, u);
        }), i;
      }
      function Ns(e) {
        var t = sa(e);
        return t.length == 1 && t[0][2] ? bl(t[0][0], t[0][1]) : function(n) {
          return n === e || Wr(n, e, t);
        };
      }
      function Ws(e, t) {
        return oa(e) && _l(t) ? bl($t(e), t) : function(n) {
          var i = ya(n, e);
          return i === a && i === t ? ka(n, e) : si(t, i, S | L);
        };
      }
      function Ui(e, t, n, i, r) {
        e !== t && Gr(t, function(l, u) {
          if (r || (r = new wt()), Le(l))
            l1(e, t, u, n, Ui, i, r);
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
          var G = se(p), K = !G && on(p), ee = !G && !K && Qn(p);
          _ = p, G || K || ee ? se(c) ? _ = c : $e(c) ? _ = Je(c) : K ? (E = !1, _ = tl(p, !0)) : ee ? (E = !1, _ = nl(p, !0)) : _ = [] : di(p) || An(p) ? (_ = c, An(c) ? _ = Jl(c) : (!Le(c) || Qt(c)) && (_ = vl(p))) : E = !1;
        }
        E && (u.set(p, _), r(_, p, i, l, u), u.delete(p)), Pr(e, n, _);
      }
      function qs(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, Ht(t, n) ? e[t] : a;
      }
      function zs(e, t, n) {
        t.length ? t = Ie(t, function(l) {
          return se(l) ? function(u) {
            return bn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [tt];
        var i = -1;
        t = Ie(t, ot(j()));
        var r = Us(e, function(l, u, c) {
          var p = Ie(t, function(v) {
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
          var u = t[i], c = bn(e, u);
          n(c, u) && li(l, sn(u, e), c);
        }
        return l;
      }
      function u1(e) {
        return function(t) {
          return bn(t, e);
        };
      }
      function Hr(e, t, n, i) {
        var r = i ? Fo : On, l = -1, u = t.length, c = e;
        for (e === t && (t = Je(t)), n && (c = Ie(e, ot(n))); ++l < u; )
          for (var p = 0, v = t[l], _ = n ? n(v) : v; (p = r(c, _, p, i)) > -1; )
            c !== e && Li.call(c, p, 1), Li.call(e, p, 1);
        return e;
      }
      function Qs(e, t) {
        for (var n = e ? t.length : 0, i = n - 1; n--; ) {
          var r = t[n];
          if (n == i || r !== l) {
            var l = r;
            Ht(r) ? Li.call(e, r, 1) : Zr(e, r);
          }
        }
        return e;
      }
      function Qr(e, t) {
        return e + $i(Cs() * (t - e + 1));
      }
      function c1(e, t, n, i) {
        for (var r = -1, l = Ge(Fi((t - e) / (n || 1)), 0), u = g(l); l--; )
          u[i ? l : ++r] = e, e += n;
        return u;
      }
      function Kr(e, t) {
        var n = "";
        if (!e || t < 1 || t > It)
          return n;
        do
          t % 2 && (n += e), t = $i(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function ce(e, t) {
        return da(El(e, t, tt), e + "");
      }
      function d1(e) {
        return Is(Kn(e));
      }
      function f1(e, t) {
        var n = Kn(e);
        return Xi(n, _n(t, 0, n.length));
      }
      function li(e, t, n, i) {
        if (!Le(e))
          return e;
        t = sn(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var p = $t(t[r]), v = n;
          if (p === "__proto__" || p === "constructor" || p === "prototype")
            return e;
          if (r != u) {
            var _ = c[p];
            v = i ? i(_, p, c) : a, v === a && (v = Le(_) ? _ : Ht(t[r + 1]) ? [] : {});
          }
          ii(c, p, v), c = c[p];
        }
        return e;
      }
      var Ks = Vi ? function(e, t) {
        return Vi.set(e, t), e;
      } : tt, p1 = Bi ? function(e, t) {
        return Bi(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: _a(t),
          writable: !0
        });
      } : tt;
      function h1(e) {
        return Xi(Kn(e));
      }
      function vt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = g(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function m1(e, t) {
        var n;
        return rn(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function Ni(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= y) {
          for (; i < r; ) {
            var l = i + r >>> 1, u = e[l];
            u !== null && !ct(u) && (n ? u <= t : u < t) ? i = l + 1 : r = l;
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
        for (var u = t !== t, c = t === null, p = ct(t), v = t === a; r < l; ) {
          var _ = $i((r + l) / 2), E = n(e[_]), G = E !== a, K = E === null, ee = E === E, ue = ct(E);
          if (u)
            var te = i || ee;
          else
            v ? te = ee && (i || G) : c ? te = ee && G && (i || !K) : p ? te = ee && G && !K && (i || !ue) : K || ue ? te = !1 : te = i ? E <= t : E < t;
          te ? r = _ + 1 : l = _;
        }
        return ze(l, U);
      }
      function Ys(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !Ct(c, p)) {
            var p = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Zs(e) {
        return typeof e == "number" ? e : ct(e) ? Zt : +e;
      }
      function ut(e) {
        if (typeof e == "string")
          return e;
        if (se(e))
          return Ie(e, ut) + "";
        if (ct(e))
          return Ts ? Ts.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function an(e, t, n) {
        var i = -1, r = _i, l = e.length, u = !0, c = [], p = c;
        if (n)
          u = !1, r = Sr;
        else if (l >= m) {
          var v = t ? null : w1(e);
          if (v)
            return Ei(v);
          u = !1, r = Xn, p = new vn();
        } else
          p = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var _ = e[i], E = t ? t(_) : _;
            if (_ = n || _ !== 0 ? _ : 0, u && E === E) {
              for (var G = p.length; G--; )
                if (p[G] === E)
                  continue e;
              t && p.push(E), c.push(_);
            } else
              r(p, E, n) || (p !== c && p.push(E), c.push(_));
          }
        return c;
      }
      function Zr(e, t) {
        return t = sn(t, e), e = Sl(e, t), e == null || delete e[$t(_t(t))];
      }
      function Xs(e, t, n, i) {
        return li(e, t, n(bn(e, t)), i);
      }
      function Wi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? vt(e, i ? 0 : l, i ? l + 1 : r) : vt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Js(e, t) {
        var n = e;
        return n instanceof me && (n = n.value()), Ar(t, function(i, r) {
          return r.func.apply(r.thisArg, en([i], r.args));
        }, n);
      }
      function Xr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? an(e[0]) : [];
        for (var r = -1, l = g(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = ri(l[r] || u, e[c], t, n));
        return an(We(l, 1), t, n);
      }
      function js(e, t, n) {
        for (var i = -1, r = e.length, l = t.length, u = {}; ++i < r; ) {
          var c = i < l ? t[i] : a;
          n(u, e[i], c);
        }
        return u;
      }
      function Jr(e) {
        return $e(e) ? e : [];
      }
      function jr(e) {
        return typeof e == "function" ? e : tt;
      }
      function sn(e, t) {
        return se(e) ? e : oa(e, t) ? [e] : Tl(ve(e));
      }
      var g1 = ce;
      function ln(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : vt(e, t, n);
      }
      var el = iu || function(e) {
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
        return new Di(t).set(new Di(e)), t;
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
        return ni ? Ae(ni.call(e)) : {};
      }
      function nl(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function il(e, t) {
        if (e !== t) {
          var n = e !== a, i = e === null, r = e === e, l = ct(e), u = t !== a, c = t === null, p = t === t, v = ct(t);
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
        for (var r = -1, l = e.length, u = n.length, c = -1, p = t.length, v = Ge(l - u, 0), _ = g(p + v), E = !i; ++c < p; )
          _[c] = t[c];
        for (; ++r < u; )
          (E || r < l) && (_[n[r]] = e[r]);
        for (; v--; )
          _[c++] = e[r++];
        return _;
      }
      function al(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, p = -1, v = t.length, _ = Ge(l - c, 0), E = g(_ + v), G = !i; ++r < _; )
          E[r] = e[r];
        for (var K = r; ++p < v; )
          E[K + p] = t[p];
        for (; ++u < c; )
          (G || r < l) && (E[K + n[u]] = e[r++]);
        return E;
      }
      function Je(e, t) {
        var n = -1, i = e.length;
        for (t || (t = g(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function Ft(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], p = i ? i(n[c], e[c], c, n, e) : a;
          p === a && (p = e[c]), r ? Wt(n, c, p) : ii(n, c, p);
        }
        return n;
      }
      function _1(e, t) {
        return Ft(e, la(e), t);
      }
      function b1(e, t) {
        return Ft(e, yl(e), t);
      }
      function qi(e, t) {
        return function(n, i) {
          var r = se(n) ? Co : qu, l = t ? t() : {};
          return r(n, e, j(i, 2), l);
        };
      }
      function qn(e) {
        return ce(function(t, n) {
          var i = -1, r = n.length, l = r > 1 ? n[r - 1] : a, u = r > 2 ? n[2] : a;
          for (l = e.length > 3 && typeof l == "function" ? (r--, l) : a, u && Ye(n[0], n[1], u) && (l = r < 3 ? a : l, r = 1), t = Ae(t); ++i < r; ) {
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
        var i = t & $, r = oi(e);
        function l() {
          var u = this && this !== Ne && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function ol(e) {
        return function(t) {
          t = ve(t);
          var n = Pn(t) ? At(t) : a, i = n ? n[0] : t.charAt(0), r = n ? ln(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function zn(e) {
        return function(t) {
          return Ar(s0(a0(t).replace(po, "")), e, "");
        };
      }
      function oi(e) {
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
          var n = Wn(e.prototype), i = e.apply(n, t);
          return Le(i) ? i : n;
        };
      }
      function S1(e, t, n) {
        var i = oi(e);
        function r() {
          for (var l = arguments.length, u = g(l), c = l, p = Hn(r); c--; )
            u[c] = arguments[c];
          var v = l < 3 && u[0] !== p && u[l - 1] !== p ? [] : tn(u, p);
          if (l -= v.length, l < n)
            return pl(
              e,
              t,
              zi,
              r.placeholder,
              a,
              u,
              v,
              a,
              a,
              n - l
            );
          var _ = this && this !== Ne && this instanceof r ? i : e;
          return lt(_, this, u);
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
        return zt(function(t) {
          var n = t.length, i = n, r = yt.prototype.thru;
          for (e && t.reverse(); i--; ) {
            var l = t[i];
            if (typeof l != "function")
              throw new xt(w);
            if (r && !u && Yi(l) == "wrapper")
              var u = new yt([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Yi(l), p = c == "wrapper" ? aa(l) : a;
            p && ua(p[0]) && p[1] == (B | ie | M | P) && !p[4].length && p[9] == 1 ? u = u[Yi(p[0])].apply(u, p[3]) : u = l.length == 1 && ua(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var v = arguments, _ = v[0];
            if (u && v.length == 1 && se(_))
              return u.plant(_).value();
            for (var E = 0, G = n ? t[E].apply(this, v) : _; ++E < n; )
              G = t[E].call(this, G);
            return G;
          };
        });
      }
      function zi(e, t, n, i, r, l, u, c, p, v) {
        var _ = t & B, E = t & $, G = t & Q, K = t & (ie | ye), ee = t & xe, ue = G ? a : oi(e);
        function te() {
          for (var pe = arguments.length, ge = g(pe), dt = pe; dt--; )
            ge[dt] = arguments[dt];
          if (K)
            var Ze = Hn(te), ft = Oo(ge, Ze);
          if (i && (ge = rl(ge, i, r, K)), l && (ge = al(ge, l, u, K)), pe -= ft, K && pe < v) {
            var Ve = tn(ge, Ze);
            return pl(
              e,
              t,
              zi,
              te.placeholder,
              n,
              ge,
              Ve,
              c,
              p,
              v - pe
            );
          }
          var Tt = E ? n : this, Yt = G ? Tt[e] : e;
          return pe = ge.length, c ? ge = q1(ge, c) : ee && pe > 1 && ge.reverse(), _ && p < pe && (ge.length = p), this && this !== Ne && this instanceof te && (Yt = ue || oi(Yt)), Yt.apply(Tt, ge);
        }
        return te;
      }
      function dl(e, t) {
        return function(n, i) {
          return Ju(n, e, t(i), {});
        };
      }
      function Hi(e, t) {
        return function(n, i) {
          var r;
          if (n === a && i === a)
            return t;
          if (n !== a && (r = n), i !== a) {
            if (r === a)
              return i;
            typeof n == "string" || typeof i == "string" ? (n = ut(n), i = ut(i)) : (n = Zs(n), i = Zs(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ta(e) {
        return zt(function(t) {
          return t = Ie(t, ot(j())), ce(function(n) {
            var i = this;
            return e(t, function(r) {
              return lt(r, i, n);
            });
          });
        });
      }
      function Qi(e, t) {
        t = t === a ? " " : ut(t);
        var n = t.length;
        if (n < 2)
          return n ? Kr(t, e) : t;
        var i = Kr(t, Fi(e / Rn(t)));
        return Pn(t) ? ln(At(i), 0, e).join("") : i.slice(0, e);
      }
      function A1(e, t, n, i) {
        var r = t & $, l = oi(e);
        function u() {
          for (var c = -1, p = arguments.length, v = -1, _ = i.length, E = g(_ + p), G = this && this !== Ne && this instanceof u ? l : e; ++v < _; )
            E[v] = i[v];
          for (; p--; )
            E[v++] = arguments[++c];
          return lt(G, r ? n : this, E);
        }
        return u;
      }
      function fl(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && Ye(t, n, i) && (n = i = a), t = Kt(t), n === a ? (n = t, t = 0) : n = Kt(n), i = i === a ? t < n ? 1 : -1 : Kt(i), c1(t, n, i, e);
        };
      }
      function Ki(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = bt(t), n = bt(n)), e(t, n);
        };
      }
      function pl(e, t, n, i, r, l, u, c, p, v) {
        var _ = t & ie, E = _ ? u : a, G = _ ? a : u, K = _ ? l : a, ee = _ ? a : l;
        t |= _ ? M : F, t &= ~(_ ? F : M), t & De || (t &= -4);
        var ue = [
          e,
          t,
          r,
          K,
          E,
          ee,
          G,
          c,
          p,
          v
        ], te = n.apply(a, ue);
        return ua(e) && Al(te, ue), te.placeholder = i, wl(te, e, t);
      }
      function na(e) {
        var t = Re[e];
        return function(n, i) {
          if (n = bt(n), i = i == null ? 0 : ze(oe(i), 292), i && ws(n)) {
            var r = (ve(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (ve(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var w1 = Un && 1 / Ei(new Un([, -0]))[1] == Dt ? function(e) {
        return new Un(e);
      } : Sa;
      function hl(e) {
        return function(t) {
          var n = He(t);
          return n == at ? Br(t) : n == st ? Wo(t) : Vo(t, e(t));
        };
      }
      function qt(e, t, n, i, r, l, u, c) {
        var p = t & Q;
        if (!p && typeof e != "function")
          throw new xt(w);
        var v = i ? i.length : 0;
        if (v || (t &= -97, i = r = a), u = u === a ? u : Ge(oe(u), 0), c = c === a ? c : oe(c), v -= r ? r.length : 0, t & F) {
          var _ = i, E = r;
          i = r = a;
        }
        var G = p ? a : aa(e), K = [
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
        if (G && U1(K, G), e = K[0], t = K[1], n = K[2], i = K[3], r = K[4], c = K[9] = K[9] === a ? p ? 0 : e.length : Ge(K[9] - v, 0), !c && t & (ie | ye) && (t &= -25), !t || t == $)
          var ee = E1(e, t, n);
        else
          t == ie || t == ye ? ee = S1(e, t, c) : (t == M || t == ($ | M)) && !r.length ? ee = A1(e, t, n, i) : ee = zi.apply(a, K);
        var ue = G ? Ks : Al;
        return wl(ue(ee, K), e, t);
      }
      function ml(e, t, n, i) {
        return e === a || Ct(e, Mn[n]) && !be.call(i, n) ? t : e;
      }
      function gl(e, t, n, i, r, l) {
        return Le(e) && Le(t) && (l.set(t, e), Ui(e, t, a, gl, l), l.delete(t)), e;
      }
      function C1(e) {
        return di(e) ? a : e;
      }
      function xl(e, t, n, i, r, l) {
        var u = n & S, c = e.length, p = t.length;
        if (c != p && !(u && p > c))
          return !1;
        var v = l.get(e), _ = l.get(t);
        if (v && _)
          return v == t && _ == e;
        var E = -1, G = !0, K = n & L ? new vn() : a;
        for (l.set(e, t), l.set(t, e); ++E < c; ) {
          var ee = e[E], ue = t[E];
          if (i)
            var te = u ? i(ue, ee, E, t, e, l) : i(ee, ue, E, e, t, l);
          if (te !== a) {
            if (te)
              continue;
            G = !1;
            break;
          }
          if (K) {
            if (!wr(t, function(pe, ge) {
              if (!Xn(K, ge) && (ee === pe || r(ee, pe, n, i, l)))
                return K.push(ge);
            })) {
              G = !1;
              break;
            }
          } else if (!(ee === ue || r(ee, ue, n, i, l))) {
            G = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), G;
      }
      function T1(e, t, n, i, r, l, u) {
        switch (n) {
          case V:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case _e:
            return !(e.byteLength != t.byteLength || !l(new Di(e), new Di(t)));
          case Lt:
          case Se:
          case pn:
            return Ct(+e, +t);
          case dn:
            return e.name == t.name && e.message == t.message;
          case hn:
          case mn:
            return e == t + "";
          case at:
            var c = Br;
          case st:
            var p = i & S;
            if (c || (c = Ei), e.size != t.size && !p)
              return !1;
            var v = u.get(e);
            if (v)
              return v == t;
            i |= L, u.set(e, t);
            var _ = xl(c(e), c(t), i, r, l, u);
            return u.delete(e), _;
          case $n:
            if (ni)
              return ni.call(e) == ni.call(t);
        }
        return !1;
      }
      function D1(e, t, n, i, r, l) {
        var u = n & S, c = ia(e), p = c.length, v = ia(t), _ = v.length;
        if (p != _ && !u)
          return !1;
        for (var E = p; E--; ) {
          var G = c[E];
          if (!(u ? G in t : be.call(t, G)))
            return !1;
        }
        var K = l.get(e), ee = l.get(t);
        if (K && ee)
          return K == t && ee == e;
        var ue = !0;
        l.set(e, t), l.set(t, e);
        for (var te = u; ++E < p; ) {
          G = c[E];
          var pe = e[G], ge = t[G];
          if (i)
            var dt = u ? i(ge, pe, G, t, e, l) : i(pe, ge, G, e, t, l);
          if (!(dt === a ? pe === ge || r(pe, ge, n, i, l) : dt)) {
            ue = !1;
            break;
          }
          te || (te = G == "constructor");
        }
        if (ue && !te) {
          var Ze = e.constructor, ft = t.constructor;
          Ze != ft && "constructor" in e && "constructor" in t && !(typeof Ze == "function" && Ze instanceof Ze && typeof ft == "function" && ft instanceof ft) && (ue = !1);
        }
        return l.delete(e), l.delete(t), ue;
      }
      function zt(e) {
        return da(El(e, a, Bl), e + "");
      }
      function ia(e) {
        return Ps(e, Me, la);
      }
      function ra(e) {
        return Ps(e, et, yl);
      }
      var aa = Vi ? function(e) {
        return Vi.get(e);
      } : Sa;
      function Yi(e) {
        for (var t = e.name + "", n = Nn[t], i = be.call(Nn, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function Hn(e) {
        var t = be.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function j() {
        var e = s.iteratee || ba;
        return e = e === ba ? Ms : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Zi(e, t) {
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
      function En(e, t) {
        var n = Mo(e, t);
        return Gs(n) ? n : a;
      }
      function I1(e) {
        var t = be.call(e, yn), n = e[yn];
        try {
          e[yn] = a;
          var i = !0;
        } catch {
        }
        var r = Ci.call(e);
        return i && (t ? e[yn] = n : delete e[yn]), r;
      }
      var la = $r ? function(e) {
        return e == null ? [] : (e = Ae(e), jt($r(e), function(t) {
          return Ss.call(e, t);
        }));
      } : Aa, yl = $r ? function(e) {
        for (var t = []; e; )
          en(t, la(e)), e = Ii(e);
        return t;
      } : Aa, He = Ke;
      (Vr && He(new Vr(new ArrayBuffer(1))) != V || jn && He(new jn()) != at || Or && He(Or.resolve()) != gi || Un && He(new Un()) != st || ei && He(new ei()) != C) && (He = function(e) {
        var t = Ke(e), n = t == St ? e.constructor : a, i = n ? Sn(n) : "";
        if (i)
          switch (i) {
            case fu:
              return V;
            case pu:
              return at;
            case hu:
              return gi;
            case mu:
              return st;
            case gu:
              return C;
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
              e = Ge(e, t - u);
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
        t = sn(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = $t(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && ir(r) && Ht(u, r) && (se(e) || An(e)));
      }
      function F1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && be.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function vl(e) {
        return typeof e.constructor == "function" && !ui(e) ? Wn(Ii(e)) : {};
      }
      function $1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case _e:
            return ea(e);
          case Lt:
          case Se:
            return new i(+e);
          case V:
            return x1(e, n);
          case de:
          case ht:
          case Xt:
          case Jt:
          case gn:
          case dr:
          case fr:
          case pr:
          case hr:
            return nl(e, n);
          case at:
            return new i();
          case pn:
          case mn:
            return new i(e);
          case hn:
            return y1(e);
          case st:
            return new i();
          case $n:
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
        return se(e) || An(e) || !!(As && e && e[As]);
      }
      function Ht(e, t) {
        var n = typeof e;
        return t = t ?? It, !!t && (n == "number" || n != "symbol" && Q0.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ye(e, t, n) {
        if (!Le(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? je(n) && Ht(t, n.length) : i == "string" && t in n) ? Ct(n[t], e) : !1;
      }
      function oa(e, t) {
        if (se(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || ct(e) ? !0 : B0.test(e) || !L0.test(e) || t != null && e in Ae(t);
      }
      function P1(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function ua(e) {
        var t = Yi(e), n = s[t];
        if (typeof n != "function" || !(t in me.prototype))
          return !1;
        if (e === n)
          return !0;
        var i = aa(n);
        return !!i && e === i[0];
      }
      function R1(e) {
        return !!_s && _s in e;
      }
      var G1 = Ai ? Qt : wa;
      function ui(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Mn;
        return e === n;
      }
      function _l(e) {
        return e === e && !Le(e);
      }
      function bl(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in Ae(n));
        };
      }
      function M1(e) {
        var t = tr(e, function(i) {
          return n.size === O && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function U1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < ($ | Q | B), u = i == B && n == ie || i == B && n == P && e[7].length <= t[8] || i == (B | P) && t[7].length <= t[8] && n == ie;
        if (!(l || u))
          return e;
        i & $ && (e[2] = t[2], r |= n & $ ? 0 : De);
        var c = t[3];
        if (c) {
          var p = e[3];
          e[3] = p ? rl(p, c, t[4]) : c, e[4] = p ? tn(e[3], H) : t[4];
        }
        return c = t[5], c && (p = e[5], e[5] = p ? al(p, c, t[6]) : c, e[6] = p ? tn(e[5], H) : t[6]), c = t[7], c && (e[7] = c), i & B && (e[8] = e[8] == null ? t[8] : ze(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
      }
      function N1(e) {
        var t = [];
        if (e != null)
          for (var n in Ae(e))
            t.push(n);
        return t;
      }
      function W1(e) {
        return Ci.call(e);
      }
      function El(e, t, n) {
        return t = Ge(t === a ? e.length - 1 : t, 0), function() {
          for (var i = arguments, r = -1, l = Ge(i.length - t, 0), u = g(l); ++r < l; )
            u[r] = i[t + r];
          r = -1;
          for (var c = g(t + 1); ++r < t; )
            c[r] = i[r];
          return c[t] = n(u), lt(e, this, c);
        };
      }
      function Sl(e, t) {
        return t.length < 2 ? e : bn(e, vt(t, 0, -1));
      }
      function q1(e, t) {
        for (var n = e.length, i = ze(t.length, n), r = Je(e); i--; ) {
          var l = t[i];
          e[i] = Ht(l, n) ? r[l] : a;
        }
        return e;
      }
      function ca(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Al = Cl(Ks), ci = au || function(e, t) {
        return Ne.setTimeout(e, t);
      }, da = Cl(p1);
      function wl(e, t, n) {
        var i = t + "";
        return da(e, V1(i, z1(B1(i), n)));
      }
      function Cl(e) {
        var t = 0, n = 0;
        return function() {
          var i = uu(), r = Pe - (i - n);
          if (n = i, r > 0) {
            if (++t >= Oe)
              return arguments[0];
          } else
            t = 0;
          return e.apply(a, arguments);
        };
      }
      function Xi(e, t) {
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
      function $t(e) {
        if (typeof e == "string" || ct(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function Sn(e) {
        if (e != null) {
          try {
            return wi.call(e);
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
        return gt(ae, function(n) {
          var i = "_." + n[0];
          t & n[1] && !_i(e, i) && e.push(i);
        }), e.sort();
      }
      function Dl(e) {
        if (e instanceof me)
          return e.clone();
        var t = new yt(e.__wrapped__, e.__chain__);
        return t.__actions__ = Je(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function H1(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = Ge(oe(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = g(Fi(i / t)); r < i; )
          u[l++] = vt(e, r, r += t);
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
        return en(se(n) ? Je(n) : [n], We(t, 1));
      }
      var Y1 = ce(function(e, t) {
        return $e(e) ? ri(e, We(t, 1, $e, !0)) : [];
      }), Z1 = ce(function(e, t) {
        var n = _t(t);
        return $e(n) && (n = a), $e(e) ? ri(e, We(t, 1, $e, !0), j(n, 2)) : [];
      }), X1 = ce(function(e, t) {
        var n = _t(t);
        return $e(n) && (n = a), $e(e) ? ri(e, We(t, 1, $e, !0), a, n) : [];
      });
      function J1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : oe(t), vt(e, t < 0 ? 0 : t, i)) : [];
      }
      function j1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : oe(t), t = i - t, vt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function ec(e, t) {
        return e && e.length ? Wi(e, j(t, 3), !0, !0) : [];
      }
      function tc(e, t) {
        return e && e.length ? Wi(e, j(t, 3), !0) : [];
      }
      function nc(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && Ye(e, t, n) && (n = 0, i = r), Ku(e, t, n, i)) : [];
      }
      function Il(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : oe(n);
        return r < 0 && (r = Ge(i + r, 0)), bi(e, j(t, 3), r);
      }
      function Ll(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = oe(n), r = n < 0 ? Ge(i + r, 0) : ze(r, i - 1)), bi(e, j(t, 3), r, !0);
      }
      function Bl(e) {
        var t = e == null ? 0 : e.length;
        return t ? We(e, 1) : [];
      }
      function ic(e) {
        var t = e == null ? 0 : e.length;
        return t ? We(e, Dt) : [];
      }
      function rc(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : oe(t), We(e, t)) : [];
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
        var r = n == null ? 0 : oe(n);
        return r < 0 && (r = Ge(i + r, 0)), On(e, t, r);
      }
      function lc(e) {
        var t = e == null ? 0 : e.length;
        return t ? vt(e, 0, -1) : [];
      }
      var oc = ce(function(e) {
        var t = Ie(e, Jr);
        return t.length && t[0] === e[0] ? Nr(t) : [];
      }), uc = ce(function(e) {
        var t = _t(e), n = Ie(e, Jr);
        return t === _t(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Nr(n, j(t, 2)) : [];
      }), cc = ce(function(e) {
        var t = _t(e), n = Ie(e, Jr);
        return t = typeof t == "function" ? t : a, t && n.pop(), n.length && n[0] === e[0] ? Nr(n, a, t) : [];
      });
      function dc(e, t) {
        return e == null ? "" : lu.call(e, t);
      }
      function _t(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : a;
      }
      function fc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i;
        return n !== a && (r = oe(n), r = r < 0 ? Ge(i + r, 0) : ze(r, i - 1)), t === t ? zo(e, t, r) : bi(e, ps, r, !0);
      }
      function pc(e, t) {
        return e && e.length ? qs(e, oe(t)) : a;
      }
      var hc = ce($l);
      function $l(e, t) {
        return e && e.length && t && t.length ? Hr(e, t) : e;
      }
      function mc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, j(n, 2)) : e;
      }
      function gc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, a, n) : e;
      }
      var xc = zt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Rr(e, t);
        return Qs(e, Ie(t, function(r) {
          return Ht(r, n) ? +r : r;
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
        return i ? (n && typeof n != "number" && Ye(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : oe(t), n = n === a ? i : oe(n)), vt(e, t, n)) : [];
      }
      function vc(e, t) {
        return Ni(e, t);
      }
      function _c(e, t, n) {
        return Yr(e, t, j(n, 2));
      }
      function bc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Ni(e, t);
          if (i < n && Ct(e[i], t))
            return i;
        }
        return -1;
      }
      function Ec(e, t) {
        return Ni(e, t, !0);
      }
      function Sc(e, t, n) {
        return Yr(e, t, j(n, 2), !0);
      }
      function Ac(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Ni(e, t, !0) - 1;
          if (Ct(e[i], t))
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
        return t ? vt(e, 1, t) : [];
      }
      function Dc(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : oe(t), vt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Ic(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : oe(t), t = i - t, vt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Lc(e, t) {
        return e && e.length ? Wi(e, j(t, 3), !1, !0) : [];
      }
      function Bc(e, t) {
        return e && e.length ? Wi(e, j(t, 3)) : [];
      }
      var Fc = ce(function(e) {
        return an(We(e, 1, $e, !0));
      }), $c = ce(function(e) {
        var t = _t(e);
        return $e(t) && (t = a), an(We(e, 1, $e, !0), j(t, 2));
      }), Vc = ce(function(e) {
        var t = _t(e);
        return t = typeof t == "function" ? t : a, an(We(e, 1, $e, !0), a, t);
      });
      function Oc(e) {
        return e && e.length ? an(e) : [];
      }
      function Pc(e, t) {
        return e && e.length ? an(e, j(t, 2)) : [];
      }
      function Rc(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? an(e, a, t) : [];
      }
      function pa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = jt(e, function(n) {
          if ($e(n))
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
          return lt(t, a, i);
        });
      }
      var Gc = ce(function(e, t) {
        return $e(e) ? ri(e, t) : [];
      }), Mc = ce(function(e) {
        return Xr(jt(e, $e));
      }), Uc = ce(function(e) {
        var t = _t(e);
        return $e(t) && (t = a), Xr(jt(e, $e), j(t, 2));
      }), Nc = ce(function(e) {
        var t = _t(e);
        return t = typeof t == "function" ? t : a, Xr(jt(e, $e), a, t);
      }), Wc = ce(pa);
      function qc(e, t) {
        return js(e || [], t || [], ii);
      }
      function zc(e, t) {
        return js(e || [], t || [], li);
      }
      var Hc = ce(function(e) {
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
      function Ji(e, t) {
        return t(e);
      }
      var Kc = zt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Rr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof me) || !Ht(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: Ji,
          args: [r],
          thisArg: a
        }), new yt(i, this.__chain__).thru(function(l) {
          return t && !l.length && l.push(a), l;
        }));
      });
      function Yc() {
        return Ol(this);
      }
      function Zc() {
        return new yt(this.value(), this.__chain__);
      }
      function Xc() {
        this.__values__ === a && (this.__values__ = Zl(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? a : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Jc() {
        return this;
      }
      function jc(e) {
        for (var t, n = this; n instanceof Pi; ) {
          var i = Dl(n);
          i.__index__ = 0, i.__values__ = a, t ? r.__wrapped__ = i : t = i;
          var r = i;
          n = n.__wrapped__;
        }
        return r.__wrapped__ = e, t;
      }
      function ed() {
        var e = this.__wrapped__;
        if (e instanceof me) {
          var t = e;
          return this.__actions__.length && (t = new me(this)), t = t.reverse(), t.__actions__.push({
            func: Ji,
            args: [fa],
            thisArg: a
          }), new yt(t, this.__chain__);
        }
        return this.thru(fa);
      }
      function td() {
        return Js(this.__wrapped__, this.__actions__);
      }
      var nd = qi(function(e, t, n) {
        be.call(e, n) ? ++e[n] : Wt(e, n, 1);
      });
      function id(e, t, n) {
        var i = se(e) ? ds : Qu;
        return n && Ye(e, t, n) && (t = a), i(e, j(t, 3));
      }
      function rd(e, t) {
        var n = se(e) ? jt : Vs;
        return n(e, j(t, 3));
      }
      var ad = ul(Il), sd = ul(Ll);
      function ld(e, t) {
        return We(ji(e, t), 1);
      }
      function od(e, t) {
        return We(ji(e, t), Dt);
      }
      function ud(e, t, n) {
        return n = n === a ? 1 : oe(n), We(ji(e, t), n);
      }
      function Pl(e, t) {
        var n = se(e) ? gt : rn;
        return n(e, j(t, 3));
      }
      function Rl(e, t) {
        var n = se(e) ? To : $s;
        return n(e, j(t, 3));
      }
      var cd = qi(function(e, t, n) {
        be.call(e, n) ? e[n].push(t) : Wt(e, n, [t]);
      });
      function dd(e, t, n, i) {
        e = je(e) ? e : Kn(e), n = n && !i ? oe(n) : 0;
        var r = e.length;
        return n < 0 && (n = Ge(r + n, 0)), rr(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && On(e, t, n) > -1;
      }
      var fd = ce(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = je(e) ? g(e.length) : [];
        return rn(e, function(u) {
          l[++i] = r ? lt(t, u, n) : ai(u, t, n);
        }), l;
      }), pd = qi(function(e, t, n) {
        Wt(e, n, t);
      });
      function ji(e, t) {
        var n = se(e) ? Ie : Us;
        return n(e, j(t, 3));
      }
      function hd(e, t, n, i) {
        return e == null ? [] : (se(t) || (t = t == null ? [] : [t]), n = i ? a : n, se(n) || (n = n == null ? [] : [n]), zs(e, t, n));
      }
      var md = qi(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function gd(e, t, n) {
        var i = se(e) ? Ar : ms, r = arguments.length < 3;
        return i(e, j(t, 4), n, r, rn);
      }
      function xd(e, t, n) {
        var i = se(e) ? Do : ms, r = arguments.length < 3;
        return i(e, j(t, 4), n, r, $s);
      }
      function yd(e, t) {
        var n = se(e) ? jt : Vs;
        return n(e, nr(j(t, 3)));
      }
      function kd(e) {
        var t = se(e) ? Is : d1;
        return t(e);
      }
      function vd(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = oe(t);
        var i = se(e) ? Nu : f1;
        return i(e, t);
      }
      function _d(e) {
        var t = se(e) ? Wu : h1;
        return t(e);
      }
      function bd(e) {
        if (e == null)
          return 0;
        if (je(e))
          return rr(e) ? Rn(e) : e.length;
        var t = He(e);
        return t == at || t == st ? e.size : qr(e).length;
      }
      function Ed(e, t, n) {
        var i = se(e) ? wr : m1;
        return n && Ye(e, t, n) && (t = a), i(e, j(t, 3));
      }
      var Sd = ce(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Ye(e, t[0], t[1]) ? t = [] : n > 2 && Ye(t[0], t[1], t[2]) && (t = [t[0]]), zs(e, We(t, 1), []);
      }), er = ru || function() {
        return Ne.Date.now();
      };
      function Ad(e, t) {
        if (typeof t != "function")
          throw new xt(w);
        return e = oe(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Gl(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, qt(e, B, a, a, a, a, t);
      }
      function Ml(e, t) {
        var n;
        if (typeof t != "function")
          throw new xt(w);
        return e = oe(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var ha = ce(function(e, t, n) {
        var i = $;
        if (n.length) {
          var r = tn(n, Hn(ha));
          i |= M;
        }
        return qt(e, i, t, n, r);
      }), Ul = ce(function(e, t, n) {
        var i = $ | Q;
        if (n.length) {
          var r = tn(n, Hn(Ul));
          i |= M;
        }
        return qt(t, i, e, n, r);
      });
      function Nl(e, t, n) {
        t = n ? a : t;
        var i = qt(e, ie, a, a, a, a, a, t);
        return i.placeholder = Nl.placeholder, i;
      }
      function Wl(e, t, n) {
        t = n ? a : t;
        var i = qt(e, ye, a, a, a, a, a, t);
        return i.placeholder = Wl.placeholder, i;
      }
      function ql(e, t, n) {
        var i, r, l, u, c, p, v = 0, _ = !1, E = !1, G = !0;
        if (typeof e != "function")
          throw new xt(w);
        t = bt(t) || 0, Le(n) && (_ = !!n.leading, E = "maxWait" in n, l = E ? Ge(bt(n.maxWait) || 0, t) : l, G = "trailing" in n ? !!n.trailing : G);
        function K(Ve) {
          var Tt = i, Yt = r;
          return i = r = a, v = Ve, u = e.apply(Yt, Tt), u;
        }
        function ee(Ve) {
          return v = Ve, c = ci(pe, t), _ ? K(Ve) : u;
        }
        function ue(Ve) {
          var Tt = Ve - p, Yt = Ve - v, u0 = t - Tt;
          return E ? ze(u0, l - Yt) : u0;
        }
        function te(Ve) {
          var Tt = Ve - p, Yt = Ve - v;
          return p === a || Tt >= t || Tt < 0 || E && Yt >= l;
        }
        function pe() {
          var Ve = er();
          if (te(Ve))
            return ge(Ve);
          c = ci(pe, ue(Ve));
        }
        function ge(Ve) {
          return c = a, G && i ? K(Ve) : (i = r = a, u);
        }
        function dt() {
          c !== a && el(c), v = 0, i = p = r = c = a;
        }
        function Ze() {
          return c === a ? u : ge(er());
        }
        function ft() {
          var Ve = er(), Tt = te(Ve);
          if (i = arguments, r = this, p = Ve, Tt) {
            if (c === a)
              return ee(p);
            if (E)
              return el(c), c = ci(pe, t), K(p);
          }
          return c === a && (c = ci(pe, t)), u;
        }
        return ft.cancel = dt, ft.flush = Ze, ft;
      }
      var wd = ce(function(e, t) {
        return Fs(e, 1, t);
      }), Cd = ce(function(e, t, n) {
        return Fs(e, bt(t) || 0, n);
      });
      function Td(e) {
        return qt(e, xe);
      }
      function tr(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new xt(w);
        var n = function() {
          var i = arguments, r = t ? t.apply(this, i) : i[0], l = n.cache;
          if (l.has(r))
            return l.get(r);
          var u = e.apply(this, i);
          return n.cache = l.set(r, u) || l, u;
        };
        return n.cache = new (tr.Cache || Nt)(), n;
      }
      tr.Cache = Nt;
      function nr(e) {
        if (typeof e != "function")
          throw new xt(w);
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
        t = t.length == 1 && se(t[0]) ? Ie(t[0], ot(j())) : Ie(We(t, 1), ot(j()));
        var n = t.length;
        return ce(function(i) {
          for (var r = -1, l = ze(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return lt(e, this, i);
        });
      }), ma = ce(function(e, t) {
        var n = tn(t, Hn(ma));
        return qt(e, M, a, t, n);
      }), zl = ce(function(e, t) {
        var n = tn(t, Hn(zl));
        return qt(e, F, a, t, n);
      }), Ld = zt(function(e, t) {
        return qt(e, P, a, a, a, t);
      });
      function Bd(e, t) {
        if (typeof e != "function")
          throw new xt(w);
        return t = t === a ? t : oe(t), ce(e, t);
      }
      function Fd(e, t) {
        if (typeof e != "function")
          throw new xt(w);
        return t = t == null ? 0 : Ge(oe(t), 0), ce(function(n) {
          var i = n[t], r = ln(n, 0, t);
          return i && en(r, i), lt(e, this, r);
        });
      }
      function $d(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new xt(w);
        return Le(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), ql(e, t, {
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
        return se(e) ? e : [e];
      }
      function Rd(e) {
        return kt(e, R);
      }
      function Gd(e, t) {
        return t = typeof t == "function" ? t : a, kt(e, R, t);
      }
      function Md(e) {
        return kt(e, Y | R);
      }
      function Ud(e, t) {
        return t = typeof t == "function" ? t : a, kt(e, Y | R, t);
      }
      function Nd(e, t) {
        return t == null || Bs(e, t, Me(t));
      }
      function Ct(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Wd = Ki(Ur), qd = Ki(function(e, t) {
        return e >= t;
      }), An = Rs(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Rs : function(e) {
        return Be(e) && be.call(e, "callee") && !Ss.call(e, "callee");
      }, se = g.isArray, zd = as ? ot(as) : ju;
      function je(e) {
        return e != null && ir(e.length) && !Qt(e);
      }
      function $e(e) {
        return Be(e) && je(e);
      }
      function Hd(e) {
        return e === !0 || e === !1 || Be(e) && Ke(e) == Lt;
      }
      var on = su || wa, Qd = ss ? ot(ss) : e1;
      function Kd(e) {
        return Be(e) && e.nodeType === 1 && !di(e);
      }
      function Yd(e) {
        if (e == null)
          return !0;
        if (je(e) && (se(e) || typeof e == "string" || typeof e.splice == "function" || on(e) || Qn(e) || An(e)))
          return !e.length;
        var t = He(e);
        if (t == at || t == st)
          return !e.size;
        if (ui(e))
          return !qr(e).length;
        for (var n in e)
          if (be.call(e, n))
            return !1;
        return !0;
      }
      function Zd(e, t) {
        return si(e, t);
      }
      function Xd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? si(e, t, a, n) : !!i;
      }
      function ga(e) {
        if (!Be(e))
          return !1;
        var t = Ke(e);
        return t == dn || t == cr || typeof e.message == "string" && typeof e.name == "string" && !di(e);
      }
      function Jd(e) {
        return typeof e == "number" && ws(e);
      }
      function Qt(e) {
        if (!Le(e))
          return !1;
        var t = Ke(e);
        return t == fn || t == Zn || t == Bn || t == xi;
      }
      function Hl(e) {
        return typeof e == "number" && e == oe(e);
      }
      function ir(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= It;
      }
      function Le(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Be(e) {
        return e != null && typeof e == "object";
      }
      var Ql = ls ? ot(ls) : n1;
      function jd(e, t) {
        return e === t || Wr(e, t, sa(t));
      }
      function ef(e, t, n) {
        return n = typeof n == "function" ? n : a, Wr(e, t, sa(t), n);
      }
      function tf(e) {
        return Kl(e) && e != +e;
      }
      function nf(e) {
        if (G1(e))
          throw new re(T);
        return Gs(e);
      }
      function rf(e) {
        return e === null;
      }
      function af(e) {
        return e == null;
      }
      function Kl(e) {
        return typeof e == "number" || Be(e) && Ke(e) == pn;
      }
      function di(e) {
        if (!Be(e) || Ke(e) != St)
          return !1;
        var t = Ii(e);
        if (t === null)
          return !0;
        var n = be.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && wi.call(n) == eu;
      }
      var xa = os ? ot(os) : i1;
      function sf(e) {
        return Hl(e) && e >= -9007199254740991 && e <= It;
      }
      var Yl = us ? ot(us) : r1;
      function rr(e) {
        return typeof e == "string" || !se(e) && Be(e) && Ke(e) == mn;
      }
      function ct(e) {
        return typeof e == "symbol" || Be(e) && Ke(e) == $n;
      }
      var Qn = cs ? ot(cs) : a1;
      function lf(e) {
        return e === a;
      }
      function of(e) {
        return Be(e) && He(e) == C;
      }
      function uf(e) {
        return Be(e) && Ke(e) == W;
      }
      var cf = Ki(zr), df = Ki(function(e, t) {
        return e <= t;
      });
      function Zl(e) {
        if (!e)
          return [];
        if (je(e))
          return rr(e) ? At(e) : Je(e);
        if (Jn && e[Jn])
          return No(e[Jn]());
        var t = He(e), n = t == at ? Br : t == st ? Ei : Kn;
        return n(e);
      }
      function Kt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = bt(e), e === Dt || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * Yn;
        }
        return e === e ? e : 0;
      }
      function oe(e) {
        var t = Kt(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Xl(e) {
        return e ? _n(oe(e), 0, Xe) : 0;
      }
      function bt(e) {
        if (typeof e == "number")
          return e;
        if (ct(e))
          return Zt;
        if (Le(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Le(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = gs(e);
        var n = q0.test(e);
        return n || H0.test(e) ? Ao(e.slice(2), n ? 2 : 8) : W0.test(e) ? Zt : +e;
      }
      function Jl(e) {
        return Ft(e, et(e));
      }
      function ff(e) {
        return e ? _n(oe(e), -9007199254740991, It) : e === 0 ? e : 0;
      }
      function ve(e) {
        return e == null ? "" : ut(e);
      }
      var pf = qn(function(e, t) {
        if (ui(t) || je(t)) {
          Ft(t, Me(t), e);
          return;
        }
        for (var n in t)
          be.call(t, n) && ii(e, n, t[n]);
      }), jl = qn(function(e, t) {
        Ft(t, et(t), e);
      }), ar = qn(function(e, t, n, i) {
        Ft(t, et(t), e, i);
      }), hf = qn(function(e, t, n, i) {
        Ft(t, Me(t), e, i);
      }), mf = zt(Rr);
      function gf(e, t) {
        var n = Wn(e);
        return t == null ? n : Ls(n, t);
      }
      var xf = ce(function(e, t) {
        e = Ae(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && Ye(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = et(l), c = -1, p = u.length; ++c < p; ) {
            var v = u[c], _ = e[v];
            (_ === a || Ct(_, Mn[v]) && !be.call(e, v)) && (e[v] = l[v]);
          }
        return e;
      }), yf = ce(function(e) {
        return e.push(a, gl), lt(e0, a, e);
      });
      function kf(e, t) {
        return fs(e, j(t, 3), Bt);
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
        return e && Bt(e, j(t, 3));
      }
      function Sf(e, t) {
        return e && Mr(e, j(t, 3));
      }
      function Af(e) {
        return e == null ? [] : Mi(e, Me(e));
      }
      function wf(e) {
        return e == null ? [] : Mi(e, et(e));
      }
      function ya(e, t, n) {
        var i = e == null ? a : bn(e, t);
        return i === a ? n : i;
      }
      function Cf(e, t) {
        return e != null && kl(e, t, Yu);
      }
      function ka(e, t) {
        return e != null && kl(e, t, Zu);
      }
      var Tf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Ci.call(t)), e[t] = n;
      }, _a(tt)), Df = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Ci.call(t)), be.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, j), If = ce(ai);
      function Me(e) {
        return je(e) ? Ds(e) : qr(e);
      }
      function et(e) {
        return je(e) ? Ds(e, !0) : s1(e);
      }
      function Lf(e, t) {
        var n = {};
        return t = j(t, 3), Bt(e, function(i, r, l) {
          Wt(n, t(i, r, l), i);
        }), n;
      }
      function Bf(e, t) {
        var n = {};
        return t = j(t, 3), Bt(e, function(i, r, l) {
          Wt(n, r, t(i, r, l));
        }), n;
      }
      var Ff = qn(function(e, t, n) {
        Ui(e, t, n);
      }), e0 = qn(function(e, t, n, i) {
        Ui(e, t, n, i);
      }), $f = zt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Ie(t, function(l) {
          return l = sn(l, e), i || (i = l.length > 1), l;
        }), Ft(e, ra(e), n), i && (n = kt(n, Y | fe | R, C1));
        for (var r = t.length; r--; )
          Zr(n, t[r]);
        return n;
      });
      function Vf(e, t) {
        return t0(e, nr(j(t)));
      }
      var Of = zt(function(e, t) {
        return e == null ? {} : o1(e, t);
      });
      function t0(e, t) {
        if (e == null)
          return {};
        var n = Ie(ra(e), function(i) {
          return [i];
        });
        return t = j(t), Hs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function Pf(e, t, n) {
        t = sn(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[$t(t[i])];
          l === a && (i = r, l = n), e = Qt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Rf(e, t, n) {
        return e == null ? e : li(e, t, n);
      }
      function Gf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : li(e, t, n, i);
      }
      var n0 = hl(Me), i0 = hl(et);
      function Mf(e, t, n) {
        var i = se(e), r = i || on(e) || Qn(e);
        if (t = j(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : Le(e) ? n = Qt(l) ? Wn(Ii(e)) : {} : n = {};
        }
        return (r ? gt : Bt)(e, function(u, c, p) {
          return t(n, u, c, p);
        }), n;
      }
      function Uf(e, t) {
        return e == null ? !0 : Zr(e, t);
      }
      function Nf(e, t, n) {
        return e == null ? e : Xs(e, t, jr(n));
      }
      function Wf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : Xs(e, t, jr(n), i);
      }
      function Kn(e) {
        return e == null ? [] : Lr(e, Me(e));
      }
      function qf(e) {
        return e == null ? [] : Lr(e, et(e));
      }
      function zf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = bt(n), n = n === n ? n : 0), t !== a && (t = bt(t), t = t === t ? t : 0), _n(bt(e), t, n);
      }
      function Hf(e, t, n) {
        return t = Kt(t), n === a ? (n = t, t = 0) : n = Kt(n), e = bt(e), Xu(e, t, n);
      }
      function Qf(e, t, n) {
        if (n && typeof n != "boolean" && Ye(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Kt(e), t === a ? (t = e, e = 0) : t = Kt(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = Cs();
          return ze(e + r * (t - e + So("1e-" + ((r + "").length - 1))), t);
        }
        return Qr(e, t);
      }
      var Kf = zn(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? r0(t) : t);
      });
      function r0(e) {
        return va(ve(e).toLowerCase());
      }
      function a0(e) {
        return e = ve(e), e && e.replace(K0, Po).replace(ho, "");
      }
      function Yf(e, t, n) {
        e = ve(e), t = ut(t);
        var i = e.length;
        n = n === a ? i : _n(oe(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Zf(e) {
        return e = ve(e), e && T0.test(e) ? e.replace(Oa, Ro) : e;
      }
      function Xf(e) {
        return e = ve(e), e && $0.test(e) ? e.replace(mr, "\\$&") : e;
      }
      var Jf = zn(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), jf = zn(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), ep = ol("toLowerCase");
      function tp(e, t, n) {
        e = ve(e), t = oe(t);
        var i = t ? Rn(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return Qi($i(r), n) + e + Qi(Fi(r), n);
      }
      function np(e, t, n) {
        e = ve(e), t = oe(t);
        var i = t ? Rn(e) : 0;
        return t && i < t ? e + Qi(t - i, n) : e;
      }
      function ip(e, t, n) {
        e = ve(e), t = oe(t);
        var i = t ? Rn(e) : 0;
        return t && i < t ? Qi(t - i, n) + e : e;
      }
      function rp(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), cu(ve(e).replace(gr, ""), t || 0);
      }
      function ap(e, t, n) {
        return (n ? Ye(e, t, n) : t === a) ? t = 1 : t = oe(t), Kr(ve(e), t);
      }
      function sp() {
        var e = arguments, t = ve(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var lp = zn(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function op(e, t, n) {
        return n && typeof n != "number" && Ye(e, t, n) && (t = n = a), n = n === a ? Xe : n >>> 0, n ? (e = ve(e), e && (typeof t == "string" || t != null && !xa(t)) && (t = ut(t), !t && Pn(e)) ? ln(At(e), 0, n) : e.split(t, n)) : [];
      }
      var up = zn(function(e, t, n) {
        return e + (n ? " " : "") + va(t);
      });
      function cp(e, t, n) {
        return e = ve(e), n = n == null ? 0 : _n(oe(n), 0, e.length), t = ut(t), e.slice(n, n + t.length) == t;
      }
      function dp(e, t, n) {
        var i = s.templateSettings;
        n && Ye(e, t, n) && (t = a), e = ve(e), t = ar({}, t, i, ml);
        var r = ar({}, t.imports, i.imports, ml), l = Me(r), u = Lr(r, l), c, p, v = 0, _ = t.interpolate || yi, E = "__p += '", G = Fr(
          (t.escape || yi).source + "|" + _.source + "|" + (_ === Pa ? N0 : yi).source + "|" + (t.evaluate || yi).source + "|$",
          "g"
        ), K = "//# sourceURL=" + (be.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ko + "]") + `
`;
        e.replace(G, function(te, pe, ge, dt, Ze, ft) {
          return ge || (ge = dt), E += e.slice(v, ft).replace(Y0, Go), pe && (c = !0, E += `' +
__e(` + pe + `) +
'`), Ze && (p = !0, E += `';
` + Ze + `;
__p += '`), ge && (E += `' +
((__t = (` + ge + `)) == null ? '' : __t) +
'`), v = ft + te.length, te;
        }), E += `';
`;
        var ee = be.call(t, "variable") && t.variable;
        if (!ee)
          E = `with (obj) {
` + E + `
}
`;
        else if (M0.test(ee))
          throw new re(z);
        E = (p ? E.replace(S0, "") : E).replace(A0, "$1").replace(w0, "$1;"), E = "function(" + (ee || "obj") + `) {
` + (ee ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (p ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + E + `return __p
}`;
        var ue = l0(function() {
          return ke(l, K + "return " + E).apply(a, u);
        });
        if (ue.source = E, ga(ue))
          throw ue;
        return ue;
      }
      function fp(e) {
        return ve(e).toLowerCase();
      }
      function pp(e) {
        return ve(e).toUpperCase();
      }
      function hp(e, t, n) {
        if (e = ve(e), e && (n || t === a))
          return gs(e);
        if (!e || !(t = ut(t)))
          return e;
        var i = At(e), r = At(t), l = xs(i, r), u = ys(i, r) + 1;
        return ln(i, l, u).join("");
      }
      function mp(e, t, n) {
        if (e = ve(e), e && (n || t === a))
          return e.slice(0, vs(e) + 1);
        if (!e || !(t = ut(t)))
          return e;
        var i = At(e), r = ys(i, At(t)) + 1;
        return ln(i, 0, r).join("");
      }
      function gp(e, t, n) {
        if (e = ve(e), e && (n || t === a))
          return e.replace(gr, "");
        if (!e || !(t = ut(t)))
          return e;
        var i = At(e), r = xs(i, At(t));
        return ln(i, r).join("");
      }
      function xp(e, t) {
        var n = Fe, i = pt;
        if (Le(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? oe(t.length) : n, i = "omission" in t ? ut(t.omission) : i;
        }
        e = ve(e);
        var l = e.length;
        if (Pn(e)) {
          var u = At(e);
          l = u.length;
        }
        if (n >= l)
          return e;
        var c = n - Rn(i);
        if (c < 1)
          return i;
        var p = u ? ln(u, 0, c).join("") : e.slice(0, c);
        if (r === a)
          return p + i;
        if (u && (c += p.length - c), xa(r)) {
          if (e.slice(c).search(r)) {
            var v, _ = p;
            for (r.global || (r = Fr(r.source, ve(Ra.exec(r)) + "g")), r.lastIndex = 0; v = r.exec(_); )
              var E = v.index;
            p = p.slice(0, E === a ? c : E);
          }
        } else if (e.indexOf(ut(r), c) != c) {
          var G = p.lastIndexOf(r);
          G > -1 && (p = p.slice(0, G));
        }
        return p + i;
      }
      function yp(e) {
        return e = ve(e), e && C0.test(e) ? e.replace(Va, Ho) : e;
      }
      var kp = zn(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), va = ol("toUpperCase");
      function s0(e, t, n) {
        return e = ve(e), t = n ? a : t, t === a ? Uo(e) ? Yo(e) : Bo(e) : e.match(t) || [];
      }
      var l0 = ce(function(e, t) {
        try {
          return lt(e, a, t);
        } catch (n) {
          return ga(n) ? n : new re(n);
        }
      }), vp = zt(function(e, t) {
        return gt(t, function(n) {
          n = $t(n), Wt(e, n, ha(e[n], e));
        }), e;
      });
      function _p(e) {
        var t = e == null ? 0 : e.length, n = j();
        return e = t ? Ie(e, function(i) {
          if (typeof i[1] != "function")
            throw new xt(w);
          return [n(i[0]), i[1]];
        }) : [], ce(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (lt(l[0], this, i))
              return lt(l[1], this, i);
          }
        });
      }
      function bp(e) {
        return Hu(kt(e, Y));
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
        return Ms(typeof e == "function" ? e : kt(e, Y));
      }
      function wp(e) {
        return Ns(kt(e, Y));
      }
      function Cp(e, t) {
        return Ws(e, kt(t, Y));
      }
      var Tp = ce(function(e, t) {
        return function(n) {
          return ai(n, e, t);
        };
      }), Dp = ce(function(e, t) {
        return function(n) {
          return ai(e, n, t);
        };
      });
      function Ea(e, t, n) {
        var i = Me(t), r = Mi(t, i);
        n == null && !(Le(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Mi(t, Me(t)));
        var l = !(Le(n) && "chain" in n) || !!n.chain, u = Qt(e);
        return gt(r, function(c) {
          var p = t[c];
          e[c] = p, u && (e.prototype[c] = function() {
            var v = this.__chain__;
            if (l || v) {
              var _ = e(this.__wrapped__), E = _.__actions__ = Je(this.__actions__);
              return E.push({ func: p, args: arguments, thisArg: e }), _.__chain__ = v, _;
            }
            return p.apply(e, en([this.value()], arguments));
          });
        }), e;
      }
      function Ip() {
        return Ne._ === this && (Ne._ = tu), this;
      }
      function Sa() {
      }
      function Lp(e) {
        return e = oe(e), ce(function(t) {
          return qs(t, e);
        });
      }
      var Bp = ta(Ie), Fp = ta(ds), $p = ta(wr);
      function o0(e) {
        return oa(e) ? Cr($t(e)) : u1(e);
      }
      function Vp(e) {
        return function(t) {
          return e == null ? a : bn(e, t);
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
        if (e = oe(e), e < 1 || e > It)
          return [];
        var n = Xe, i = ze(e, Xe);
        t = j(t), e -= Xe;
        for (var r = Ir(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Np(e) {
        return se(e) ? Ie(e, $t) : ct(e) ? [e] : Je(Tl(ve(e)));
      }
      function Wp(e) {
        var t = ++jo;
        return ve(e) + t;
      }
      var qp = Hi(function(e, t) {
        return e + t;
      }, 0), zp = na("ceil"), Hp = Hi(function(e, t) {
        return e / t;
      }, 1), Qp = na("floor");
      function Kp(e) {
        return e && e.length ? Gi(e, tt, Ur) : a;
      }
      function Yp(e, t) {
        return e && e.length ? Gi(e, j(t, 2), Ur) : a;
      }
      function Zp(e) {
        return hs(e, tt);
      }
      function Xp(e, t) {
        return hs(e, j(t, 2));
      }
      function Jp(e) {
        return e && e.length ? Gi(e, tt, zr) : a;
      }
      function jp(e, t) {
        return e && e.length ? Gi(e, j(t, 2), zr) : a;
      }
      var eh = Hi(function(e, t) {
        return e * t;
      }, 1), th = na("round"), nh = Hi(function(e, t) {
        return e - t;
      }, 0);
      function ih(e) {
        return e && e.length ? Dr(e, tt) : 0;
      }
      function rh(e, t) {
        return e && e.length ? Dr(e, j(t, 2)) : 0;
      }
      return s.after = Ad, s.ary = Gl, s.assign = pf, s.assignIn = jl, s.assignInWith = ar, s.assignWith = hf, s.at = mf, s.before = Ml, s.bind = ha, s.bindAll = vp, s.bindKey = Ul, s.castArray = Pd, s.chain = Ol, s.chunk = H1, s.compact = Q1, s.concat = K1, s.cond = _p, s.conforms = bp, s.constant = _a, s.countBy = nd, s.create = gf, s.curry = Nl, s.curryRight = Wl, s.debounce = ql, s.defaults = xf, s.defaultsDeep = yf, s.defer = wd, s.delay = Cd, s.difference = Y1, s.differenceBy = Z1, s.differenceWith = X1, s.drop = J1, s.dropRight = j1, s.dropRightWhile = ec, s.dropWhile = tc, s.fill = nc, s.filter = rd, s.flatMap = ld, s.flatMapDeep = od, s.flatMapDepth = ud, s.flatten = Bl, s.flattenDeep = ic, s.flattenDepth = rc, s.flip = Td, s.flow = Sp, s.flowRight = Ap, s.fromPairs = ac, s.functions = Af, s.functionsIn = wf, s.groupBy = cd, s.initial = lc, s.intersection = oc, s.intersectionBy = uc, s.intersectionWith = cc, s.invert = Tf, s.invertBy = Df, s.invokeMap = fd, s.iteratee = ba, s.keyBy = pd, s.keys = Me, s.keysIn = et, s.map = ji, s.mapKeys = Lf, s.mapValues = Bf, s.matches = wp, s.matchesProperty = Cp, s.memoize = tr, s.merge = Ff, s.mergeWith = e0, s.method = Tp, s.methodOf = Dp, s.mixin = Ea, s.negate = nr, s.nthArg = Lp, s.omit = $f, s.omitBy = Vf, s.once = Dd, s.orderBy = hd, s.over = Bp, s.overArgs = Id, s.overEvery = Fp, s.overSome = $p, s.partial = ma, s.partialRight = zl, s.partition = md, s.pick = Of, s.pickBy = t0, s.property = o0, s.propertyOf = Vp, s.pull = hc, s.pullAll = $l, s.pullAllBy = mc, s.pullAllWith = gc, s.pullAt = xc, s.range = Op, s.rangeRight = Pp, s.rearg = Ld, s.reject = yd, s.remove = yc, s.rest = Bd, s.reverse = fa, s.sampleSize = vd, s.set = Rf, s.setWith = Gf, s.shuffle = _d, s.slice = kc, s.sortBy = Sd, s.sortedUniq = wc, s.sortedUniqBy = Cc, s.split = op, s.spread = Fd, s.tail = Tc, s.take = Dc, s.takeRight = Ic, s.takeRightWhile = Lc, s.takeWhile = Bc, s.tap = Qc, s.throttle = $d, s.thru = Ji, s.toArray = Zl, s.toPairs = n0, s.toPairsIn = i0, s.toPath = Np, s.toPlainObject = Jl, s.transform = Mf, s.unary = Vd, s.union = Fc, s.unionBy = $c, s.unionWith = Vc, s.uniq = Oc, s.uniqBy = Pc, s.uniqWith = Rc, s.unset = Uf, s.unzip = pa, s.unzipWith = Vl, s.update = Nf, s.updateWith = Wf, s.values = Kn, s.valuesIn = qf, s.without = Gc, s.words = s0, s.wrap = Od, s.xor = Mc, s.xorBy = Uc, s.xorWith = Nc, s.zip = Wc, s.zipObject = qc, s.zipObjectDeep = zc, s.zipWith = Hc, s.entries = n0, s.entriesIn = i0, s.extend = jl, s.extendWith = ar, Ea(s, s), s.add = qp, s.attempt = l0, s.camelCase = Kf, s.capitalize = r0, s.ceil = zp, s.clamp = zf, s.clone = Rd, s.cloneDeep = Md, s.cloneDeepWith = Ud, s.cloneWith = Gd, s.conformsTo = Nd, s.deburr = a0, s.defaultTo = Ep, s.divide = Hp, s.endsWith = Yf, s.eq = Ct, s.escape = Zf, s.escapeRegExp = Xf, s.every = id, s.find = ad, s.findIndex = Il, s.findKey = kf, s.findLast = sd, s.findLastIndex = Ll, s.findLastKey = vf, s.floor = Qp, s.forEach = Pl, s.forEachRight = Rl, s.forIn = _f, s.forInRight = bf, s.forOwn = Ef, s.forOwnRight = Sf, s.get = ya, s.gt = Wd, s.gte = qd, s.has = Cf, s.hasIn = ka, s.head = Fl, s.identity = tt, s.includes = dd, s.indexOf = sc, s.inRange = Hf, s.invoke = If, s.isArguments = An, s.isArray = se, s.isArrayBuffer = zd, s.isArrayLike = je, s.isArrayLikeObject = $e, s.isBoolean = Hd, s.isBuffer = on, s.isDate = Qd, s.isElement = Kd, s.isEmpty = Yd, s.isEqual = Zd, s.isEqualWith = Xd, s.isError = ga, s.isFinite = Jd, s.isFunction = Qt, s.isInteger = Hl, s.isLength = ir, s.isMap = Ql, s.isMatch = jd, s.isMatchWith = ef, s.isNaN = tf, s.isNative = nf, s.isNil = af, s.isNull = rf, s.isNumber = Kl, s.isObject = Le, s.isObjectLike = Be, s.isPlainObject = di, s.isRegExp = xa, s.isSafeInteger = sf, s.isSet = Yl, s.isString = rr, s.isSymbol = ct, s.isTypedArray = Qn, s.isUndefined = lf, s.isWeakMap = of, s.isWeakSet = uf, s.join = dc, s.kebabCase = Jf, s.last = _t, s.lastIndexOf = fc, s.lowerCase = jf, s.lowerFirst = ep, s.lt = cf, s.lte = df, s.max = Kp, s.maxBy = Yp, s.mean = Zp, s.meanBy = Xp, s.min = Jp, s.minBy = jp, s.stubArray = Aa, s.stubFalse = wa, s.stubObject = Rp, s.stubString = Gp, s.stubTrue = Mp, s.multiply = eh, s.nth = pc, s.noConflict = Ip, s.noop = Sa, s.now = er, s.pad = tp, s.padEnd = np, s.padStart = ip, s.parseInt = rp, s.random = Qf, s.reduce = gd, s.reduceRight = xd, s.repeat = ap, s.replace = sp, s.result = Pf, s.round = th, s.runInContext = d, s.sample = kd, s.size = bd, s.snakeCase = lp, s.some = Ed, s.sortedIndex = vc, s.sortedIndexBy = _c, s.sortedIndexOf = bc, s.sortedLastIndex = Ec, s.sortedLastIndexBy = Sc, s.sortedLastIndexOf = Ac, s.startCase = up, s.startsWith = cp, s.subtract = nh, s.sum = ih, s.sumBy = rh, s.template = dp, s.times = Up, s.toFinite = Kt, s.toInteger = oe, s.toLength = Xl, s.toLower = fp, s.toNumber = bt, s.toSafeInteger = ff, s.toString = ve, s.toUpper = pp, s.trim = hp, s.trimEnd = mp, s.trimStart = gp, s.truncate = xp, s.unescape = yp, s.uniqueId = Wp, s.upperCase = kp, s.upperFirst = va, s.each = Pl, s.eachRight = Rl, s.first = Fl, Ea(s, function() {
        var e = {};
        return Bt(s, function(t, n) {
          be.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = b, gt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), gt(["drop", "take"], function(e, t) {
        me.prototype[e] = function(n) {
          n = n === a ? 1 : Ge(oe(n), 0);
          var i = this.__filtered__ && !t ? new me(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = ze(n, i.__takeCount__) : i.__views__.push({
            size: ze(n, Xe),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, me.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), gt(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == Et || n == Mt;
        me.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: j(r, 3),
            type: n
          }), l.__filtered__ = l.__filtered__ || i, l;
        };
      }), gt(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        me.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), gt(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        me.prototype[e] = function() {
          return this.__filtered__ ? new me(this) : this[n](1);
        };
      }), me.prototype.compact = function() {
        return this.filter(tt);
      }, me.prototype.find = function(e) {
        return this.filter(e).head();
      }, me.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, me.prototype.invokeMap = ce(function(e, t) {
        return typeof e == "function" ? new me(this) : this.map(function(n) {
          return ai(n, e, t);
        });
      }), me.prototype.reject = function(e) {
        return this.filter(nr(j(e)));
      }, me.prototype.slice = function(e, t) {
        e = oe(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new me(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = oe(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, me.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, me.prototype.toArray = function() {
        return this.take(Xe);
      }, Bt(me.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, p = u instanceof me, v = c[0], _ = p || se(u), E = function(pe) {
            var ge = r.apply(s, en([pe], c));
            return i && G ? ge[0] : ge;
          };
          _ && n && typeof v == "function" && v.length != 1 && (p = _ = !1);
          var G = this.__chain__, K = !!this.__actions__.length, ee = l && !G, ue = p && !K;
          if (!l && _) {
            u = ue ? u : new me(this);
            var te = e.apply(u, c);
            return te.__actions__.push({ func: Ji, args: [E], thisArg: a }), new yt(te, G);
          }
          return ee && ue ? e.apply(this, c) : (te = this.thru(E), ee ? i ? te.value()[0] : te.value() : te);
        });
      }), gt(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Si[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
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
      }), Bt(me.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          be.call(Nn, i) || (Nn[i] = []), Nn[i].push({ name: t, func: n });
        }
      }), Nn[zi(a, Q).name] = [{
        name: "wrapper",
        func: a
      }], me.prototype.clone = xu, me.prototype.reverse = yu, me.prototype.value = ku, s.prototype.at = Kc, s.prototype.chain = Yc, s.prototype.commit = Zc, s.prototype.next = Xc, s.prototype.plant = jc, s.prototype.reverse = ed, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = td, s.prototype.first = s.prototype.head, Jn && (s.prototype[Jn] = Jc), s;
    }, Gn = Zo();
    xn ? ((xn.exports = Gn)._ = Gn, br._ = Gn) : Ne._ = Gn;
  }).call(fi);
})(lr, lr.exports);
var Rh = lr.exports;
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
    pi.FILTER_CHANGE,
    pi.CLEAR_FILTERS
  ],
  setup(o, { emit: I }) {
    const a = I, b = o, m = Te(() => b.filters ? b.filters.filter((X) => X.model) : []), T = Te(() => {
      const X = {};
      return m.value.forEach((O) => {
        X[O.key] = O.model;
      }), X;
    }), w = Rh.debounce(() => {
      a(pi.FILTER_CHANGE, T);
    }, 800);
    function z() {
      a(pi.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (X, O) => (h(), x("div", {
      class: Ue(["base-table-filters", { inactive: o.inactive }])
    }, [
      f("h6", Gh, [
        Z(A(Rt), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        O[1] || (O[1] = it(" Filters "))
      ]),
      sr(X.$slots, "customFields", {}, void 0, !0),
      (h(!0), x(he, null, Ee(o.filters, (H, Y) => (h(), x(he, null, [
        H.type === "datetime" || H.type === "datetimehour" ? (h(), le(A(x0), {
          class: "filter-elm",
          key: `${o.prefix}${H.key}`,
          label: H.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (fe) => o.filters[Y].model = fe,
          onInput: A(w)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : H.dataSource ? (h(), le(A(Vt), {
          class: "filter-elm",
          key: `${o.prefix}${H.key}`,
          options: H.key === "campaign" ? X.campaignlist : H.dataSource,
          label: H.value,
          disabled: o.filters[Y].disabled,
          singleSelect: !1,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (fe) => o.filters[Y].model = fe,
          onClick: (fe) => X.filterClicked(H.key),
          onInput: A(w)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), le(A(Ot), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${H.key}`,
          label: H.value,
          disabled: o.filters[Y].disabled,
          modelValue: o.filters[Y].model,
          "onUpdate:modelValue": (fe) => o.filters[Y].model = fe,
          onInput: A(w)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      Z(A(nt), {
        type: "tertiary",
        label: "Clear filters",
        onClick: O[0] || (O[0] = (H) => z())
      })
    ], 2));
  }
}, Uh = /* @__PURE__ */ Qe(Mh, [["__scopeId", "data-v-0bc5c036"]]), Nh = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: I }) {
    const a = I, m = o.options || {}, T = new IntersectionObserver(([z]) => {
      a("intersecting", z.isIntersecting);
    }, m), w = N(null);
    return In(() => {
      w.value && T.observe(w.value);
    }), ah(() => {
      T.disconnect();
    }), (z, X) => (h(), x("div", {
      ref_key: "targetELement",
      ref: w,
      class: "observer",
      style: { height: "3px" }
    }, [
      sr(z.$slots, "default")
    ], 512));
  }
}, _0 = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", Wh = { class: "query-builder" }, qh = { class: "query-conditions" }, zh = { class: "condition" }, Hh = { class: "cell field" }, Qh = { class: "cell operator" }, Kh = { class: "cell value" }, Yh = {
  key: 0,
  class: "query-operator-outer"
}, Zh = { class: "query-operator" }, Xh = {
  key: 0,
  class: "query-operator-outer"
}, Jh = { class: "query-operator" }, jh = {
  __name: "StandardQueryDisplay",
  props: {
    query: {
      type: Array,
      required: !0
    }
  },
  setup(o) {
    const I = (b) => {
      try {
        return new Date(b).toISOString().split("T")[0];
      } catch {
        return "-";
      }
    }, a = (b) => {
      const m = b == null ? void 0 : b.value;
      return m ? b.type === "date" ? I(m) : Array.isArray(m) ? m.join(", ") : typeof m == "boolean" ? m ? "True" : "False" : m : "-";
    };
    return (b, m) => (h(), x("div", Wh, [
      f("div", qh, [
        m[0] || (m[0] = f("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), x(he, null, Ee(o.query, (T, w) => (h(), x("div", {
          key: `group-${w}`,
          class: "query-group"
        }, [
          (h(!0), x(he, null, Ee(T.conditions, (z, X) => (h(), x("div", {
            key: `condition-${X}`
          }, [
            f("div", zh, [
              f("div", Hh, ne(z.field), 1),
              f("div", Qh, ne(z.operator), 1),
              f("div", Kh, ne(a(z)), 1),
              Z(A(nt), {
                type: "tertiary",
                icon: "bi-arrows-expand"
              })
            ]),
            X < T.conditions.length - 1 ? (h(), x("div", Yh, [
              f("div", Zh, ne(T.logic.replace("$", "").toUpperCase()), 1)
            ])) : D("", !0)
          ]))), 128)),
          w < o.query.length - 1 ? (h(), x("div", Xh, [
            f("div", Jh, ne(o.query[w + 1].logic.replace("$", "").toUpperCase()), 1)
          ])) : D("", !0)
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
    const I = o;
    function a(T) {
      const w = [];
      return T.coreEngagement && w.push(`Core Engagement: ${T.coreEngagement}`), T.coreFocus && w.push(`Core Focus: ${T.coreFocus}`), w.length > 0 ? w.join(`
`) : "No information available";
    }
    const b = Te(() => !I.segmentData || !I.segmentData.segments ? [] : I.isThumbnail ? I.segmentData.segments.slice(0, 5) : I.segmentData.segments);
    function m(T) {
      if (typeof T == "string" && T.includes(","))
        return T;
      const w = typeof T == "string" ? parseInt(T, 10) : T;
      return Number.isNaN(w) ? T : w.toLocaleString();
    }
    return (T, w) => (h(), x("div", t2, [
      w[2] || (w[2] = f("h5", { class: "mb-3" }, "Top Interests", -1)),
      f("div", n2, [
        (h(!0), x(he, null, Ee(b.value, (z) => (h(), x("div", {
          class: "segment",
          key: z.name
        }, [
          f("div", i2, [
            f("img", {
              src: z.image,
              alt: "segment",
              title: a(z)
            }, null, 8, r2)
          ]),
          f("div", a2, [
            f("h4", null, ne(z.name), 1),
            f("p", null, [
              w[0] || (w[0] = f("span", null, "Est. Reach:", -1)),
              it(" " + ne(m(z.reach)) + " ", 1),
              Z(A(d0), {
                class: "pl-1",
                label: "This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience."
              })
            ]),
            f("p", null, [
              w[1] || (w[1] = f("span", null, "Affinity Score: ", -1)),
              it(" " + ne(z.affinityScore), 1),
              Z(A(d0), {
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
  setup(o, { emit: I }) {
    const a = o;
    cn(), Te(() => {
      var m, T, w;
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
          categories: ((T = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.graph) == null ? void 0 : T.labels) || []
        },
        colors: [
          "#0A2FFF",
          "#0068AD"
        ],
        title: {
          text: ((w = a.selectedSegment.thumbnail) == null ? void 0 : w.title) || "",
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
    }), Te(() => {
      var m, T, w;
      return ((w = (T = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.graph) == null ? void 0 : T.seriesCombined) == null ? void 0 : w.map((z) => ({
        name: z.name,
        data: z.data.map(Number)
      }))) || [];
    });
    const b = Te(() => {
      var m, T, w, z;
      return ((z = (w = (T = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.segments) == null ? void 0 : T[0]) == null ? void 0 : w.segments) == null ? void 0 : z.slice(0, 2)) || [];
    });
    return Te(() => b.value.map((w) => parseFloat(w.affinityScore || "0")).reduce((w, z) => w + z, 0).toFixed(2)), Te(() => b.value.map((T) => parseInt(T.reach || "0", 10)).reduce((T, w) => T + w, 0).toLocaleString()), (m, T) => {
      const w = g0("CataUiTooltip");
      return h(), x("div", null, [
        f("div", o2, [
          f("div", u2, [
            T[1] || (T[1] = f("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            f("p", c2, [
              T[0] || (T[0] = it("Find the segments that work best with ")),
              f("span", d2, ne(a.selectedSegment.name), 1)
            ]),
            Z(w, { label: "The preview is for your external proofing tool." })
          ])
        ])
      ]);
    };
  }
}, p2 = /* @__PURE__ */ Qe(f2, [["__scopeId", "data-v-0d8f9bc6"]]), h2 = {
  key: 0,
  class: "push-status"
}, m2 = {
  key: 1,
  class: "push-status"
}, g2 = {
  key: 2,
  class: "modal-body"
}, x2 = { class: "section" }, y2 = { class: "checkbox-group" }, k2 = { class: "checkbox-group" }, v2 = { class: "sections-wrapper" }, _2 = { class: "section" }, b2 = { class: "checkbox-group-catergory" }, E2 = { class: "section" }, S2 = { class: "ccheckbox-group-catergory" }, A2 = { class: "section" }, w2 = { class: "checkbox-group-category" }, C2 = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: I }) {
    const a = I, b = N([]), m = N("form"), T = Te(() => `Audience pushed to ${b.value.length ? b.value.join(", ") : "the selected destination(s)"}`), w = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], z = ["Build new campaign", "Update current campaign"], X = ["Display & Video 360", "The Trade Desk"], O = ["Infosum", "LiveRamp"], H = ["Open Media Studio", "Audience Builder"];
    function Y() {
      a("close");
    }
    const fe = () => {
      m.value = "loading", setTimeout(() => {
        a("insertSegment"), m.value = "confirmed";
      }, 2500);
    };
    return (R, S) => {
      const L = g0("hp");
      return h(), le(A(y0), {
        onClose: Y,
        size: "medium"
      }, {
        header: Pt(() => S[5] || (S[5] = [
          f("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: Pt(() => [
          m.value === "loading" ? (h(), x("div", h2, [
            Z(A(Dn), { size: "xlarge" }),
            S[6] || (S[6] = f("p", null, "Pushing audience...", -1))
          ])) : m.value === "confirmed" ? (h(), x("div", m2, [
            f("p", null, ne(T.value), 1)
          ])) : (h(), x("div", g2, [
            f("div", x2, [
              Z(L, null, {
                default: Pt(() => S[7] || (S[7] = [
                  it("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              f("div", y2, [
                (h(), x(he, null, Ee(w, ($) => Z(A(Cn), {
                  key: $,
                  label: $,
                  modelValue: b.value,
                  "onUpdate:modelValue": S[0] || (S[0] = (Q) => b.value = Q),
                  value: $
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            S[11] || (S[11] = f("hr", null, null, -1)),
            f("div", k2, [
              (h(), x(he, null, Ee(z, ($) => Z(A(Cn), {
                key: $,
                label: $,
                modelValue: b.value,
                "onUpdate:modelValue": S[1] || (S[1] = (Q) => b.value = Q),
                value: $
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            f("div", v2, [
              f("div", _2, [
                S[8] || (S[8] = f("h3", null, "Cohort", -1)),
                f("div", b2, [
                  (h(), x(he, null, Ee(X, ($) => Z(A(Cn), {
                    key: $,
                    label: $,
                    modelValue: b.value,
                    "onUpdate:modelValue": S[2] || (S[2] = (Q) => b.value = Q),
                    value: $
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", E2, [
                S[9] || (S[9] = f("h3", null, "Clean Room", -1)),
                f("div", S2, [
                  (h(), x(he, null, Ee(O, ($) => Z(A(Cn), {
                    key: $,
                    label: $,
                    modelValue: b.value,
                    "onUpdate:modelValue": S[3] || (S[3] = (Q) => b.value = Q),
                    value: $
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", A2, [
                S[10] || (S[10] = f("h3", null, "WPP Open", -1)),
                f("div", w2, [
                  (h(), x(he, null, Ee(H, ($) => Z(A(Cn), {
                    key: $,
                    label: $,
                    modelValue: b.value,
                    "onUpdate:modelValue": S[4] || (S[4] = (Q) => b.value = Q),
                    value: $
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ])
            ])
          ]))
        ]),
        footer: Pt(() => [
          m.value === "confirmed" ? (h(), le(A(nt), {
            key: 0,
            type: "primary",
            label: "Ok",
            onClick: Y
          })) : m.value === "form" ? (h(), x(he, { key: 1 }, [
            Z(A(nt), {
              class: "mr-2",
              type: "secondary",
              label: "Cancel",
              onClick: Y
            }),
            Z(A(nt), {
              type: "primary",
              label: "Push",
              onClick: fe
            })
          ], 64)) : D("", !0)
        ]),
        _: 1
      });
    };
  }
}, b0 = /* @__PURE__ */ Qe(C2, [["__scopeId", "data-v-44f24252"]]), T2 = [
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
], D2 = {
  charts: T2
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
}, I2 = { class: "segment-details" }, L2 = { class: "wrapper-left" }, B2 = { class: "source-wrapper" }, F2 = { class: "source-container" }, $2 = { class: "sub-controls" }, V2 = { class: "sub-tab-container" }, O2 = { class: "sub-controls-tabs" }, P2 = { class: "sub-controls-tools" }, R2 = { class: "list" }, G2 = {
  key: 0,
  class: "d-flex justify-content-center pt-40 pb-40"
}, M2 = { class: "wrapper-right" }, U2 = {
  key: 0,
  class: "segment-details-wrapper"
}, N2 = {
  key: 0,
  class: "segment-details-title"
}, W2 = { class: "segment-details-content" }, q2 = {
  key: 0,
  class: "description-row"
}, z2 = { class: "description-detail" }, H2 = {
  key: 1,
  class: "description-row"
}, Q2 = { class: "description-detail" }, K2 = {
  key: 2,
  class: "description-row"
}, Y2 = { class: "description-detail" }, Z2 = {
  key: 3,
  class: "description-row"
}, X2 = { class: "description-detail" }, J2 = {
  key: 4,
  class: "description-row"
}, j2 = { class: "description-detail" }, em = {
  key: 5,
  class: "description-row"
}, tm = { class: "description-detail" }, nm = {
  key: 6,
  class: "description-row"
}, im = { class: "description-detail" }, rm = {
  key: 7,
  class: "description-row"
}, am = { class: "description-detail" }, sm = {
  key: 8,
  class: "description-row"
}, lm = { class: "description-detail-bold" }, om = {
  key: 0,
  class: "description-detail"
}, um = { class: "description-row" }, cm = { class: "description-term" }, dm = { class: "description-detail" }, fm = {
  key: 1,
  class: "standard-view"
}, pm = ["src"], hm = {
  key: 0,
  class: "footer"
}, mm = { class: "footer-text" }, gm = { class: "footer-description-detail" }, xm = {
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
  setup(o, { emit: I }) {
    const a = o, b = I;
    N([]);
    const m = cn(), T = N(null), w = N(null), z = N(!1), X = N([]), O = N(""), H = N([]), Y = N(""), fe = N(""), R = N(!1), S = [
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
    ], L = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], $ = N(S[0]), Q = N(L[0]), De = N(!1), ie = N([
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
    ]), ye = [
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
    ], M = N({}), F = N(""), B = N({
      sortColumn: "name",
      sortOrder: 1
    }), P = [
      "3d28abf8-b549-4535-9ccd-51f0f0fd2371",
      "3d28abf8-b549-4535-9ccd-51f0f0fd2376"
    ], xe = Te(() => {
      const U = new URLSearchParams(window.location.search);
      return P.includes(U.get("tenantId"));
    });
    function Fe() {
      m.set_selectedSegmentType("standard"), m.set_selectedSegment(F.value), b("showInsightsExplorer", F.value);
    }
    async function pt() {
      var y;
      if (!((y = F.value) != null && y.segmentId))
        return;
      const U = `${a.baseUrl}/api/v1/segments/${F.value.segmentId}`;
      try {
        const ae = await fetch(U, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!ae.ok) {
          const qe = await ae.text();
          throw new Error(qe || "Failed to delete segment");
        }
        F.value = "", await m.fetch_segments(Y.value);
      } catch (ae) {
        console.error("Error deleting segment:", ae);
      }
    }
    function Oe(U) {
      return U.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (y) => y.toUpperCase());
    }
    function Pe(U) {
      return U == null ? "" : (typeof U == "string" ? parseInt(U, 10) : U).toLocaleString();
    }
    function Et(U) {
      M.value = U, m.set_filterQuery(U), m.fetch_segments(Y.value);
    }
    async function Gt(U) {
      if (U && m.get_isLastPage && !De.value && m.get_segments && m.get_segments.length > 0) {
        De.value = !0;
        try {
          await m.fetch_nextSegmentPage(Y.value), De.value = !1;
        } catch {
          De.value = !1;
        }
      }
    }
    async function Mt() {
      ie.value.map((U) => {
        U.key !== "market" && (U.model = "");
      }), m.reset_filterQuery(), await m.fetch_segments(Y.value);
    }
    function Dt(U) {
      B.value = U;
    }
    function It() {
      z.value = !z.value;
    }
    function Yn(U) {
      F.value = U.row;
    }
    function Zt() {
      R.value = !0;
    }
    async function Xe() {
      await m.set_token(a.token), await m.set_brandId(a.brandId), await m.set_tenantId(a.tenantId), await m.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? F.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && (F.value = a.selectedSegment), await m.fetch_segment_settings(a.brandId);
      try {
        const U = await m.get_segment_settings;
        U && (H.value = await U.platforms.map((y) => ({
          value: y.platform_id,
          label: y.platform,
          locations: y.locations.map((ae) => ({
            value: ae.value,
            label: ae.display_name
          }))
        }))), Y.value = H.value[0].value;
      } catch (U) {
        console.log(U);
      }
    }
    return In(() => {
      w.value = T.value, Xe();
    }), un(Y, async (U, y) => {
      U && y !== U && (X.value = H.value[U - 1].locations, O.value = X.value[0].value, De.value = !0, m.set_platform(U), await m.fetch_segments(U), $.value = S[0], De.value = !1);
    }), un(fe, async (U) => {
      U && (U == null ? void 0 : U.length) < 3 || (m.set_searchTerm(U), m.fetch_segments(Y.value));
    }), un(O, async (U) => {
      m.set_locationQuery(U), m.fetch_segments(Y.value);
    }), un(B, async (U) => {
      m.set_sortQuery(U), m.fetch_segments(Y.value);
    }), un($, async (U) => {
      const y = U.id;
      m.set_categoryQuery(y), m.fetch_segments();
    }), Te(() => D2.charts.map((U) => {
      var Bn, Lt;
      const y = E0[U.type] || ((Bn = U.type) == null ? void 0 : Bn.toLowerCase()), ae = Fa[y] || {};
      console.log("type", y), console.log("baseOptions", ae);
      let qe = {}, rt = [];
      return y === "line" || y === "area" ? (qe = {
        xaxis: {
          categories: U.data.map((Se) => Se.key),
          labels: { style: { fontSize: "12px", colors: "#777" } },
          axisBorder: { show: !1 },
          axisTicks: { show: !1 }
        },
        yaxis: {
          labels: {
            style: { fontSize: "12px", colors: "#777" },
            formatter: (Se) => Se > 1e3 ? `${(Se / 1e3).toFixed(1)}K` : Se
          }
        }
      }, rt = [{
        name: ((Lt = U.data[0]) == null ? void 0 : Lt.valueType) || "Value",
        data: U.data.map((Se) => Number(Se.value))
      }]) : y === "bar" ? (qe = {
        xaxis: {
          categories: U.data.map((Se) => Se.key)
        }
      }, rt = [{
        name: U.title,
        data: U.data.map((Se) => Number(Se.value))
      }]) : y === "donut" || y === "pie" ? (qe = {
        labels: U.data.map((Se) => Se.key)
      }, rt = U.data.map((Se) => Number(Se.value))) : y === "bubble" && (rt = [{
        name: U.title,
        data: U.data.map((Se) => ({
          x: Number(Se.x),
          y: Number(Se.y),
          z: Number(Se.z)
        }))
      }]), console.log("series", rt), console.log("dynamicOptions", qe), {
        series: rt,
        options: {
          ...ae,
          ...qe,
          title: {
            ...ae.title,
            text: U.title
          },
          chart: {
            // ...baseOptions.chart,
            type: y
          }
        },
        chartType: y
      };
    })), (U, y) => (h(), x(he, null, [
      f("div", I2, [
        f("div", L2, [
          f("div", B2, [
            f("div", F2, [
              Z(A(Vt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: H.value,
                modelValue: Y.value,
                "onUpdate:modelValue": y[0] || (y[0] = (ae) => Y.value = ae),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              Z(A(Vt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: X.value,
                modelValue: O.value,
                "onUpdate:modelValue": y[1] || (y[1] = (ae) => O.value = ae),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            Z(A(Ot), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: fe.value,
              "onUpdate:modelValue": y[2] || (y[2] = (ae) => fe.value = ae)
            }, null, 8, ["modelValue"])
          ]),
          f("div", $2, [
            f("div", V2, [
              f("div", O2, [
                Z(A(Ia), {
                  tabs: S,
                  modelValue: $.value,
                  "onUpdate:modelValue": y[3] || (y[3] = (ae) => $.value = ae),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              f("div", P2, [
                Z(A(Rt), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: y[4] || (y[4] = (ae) => It())
                })
              ])
            ])
          ]),
          f("div", R2, [
            f("div", {
              class: "list-list",
              ref_key: "list",
              ref: T
            }, [
              Z(Ph, {
                stickyHeader: 0,
                columns: ye,
                rows: A(m).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: y[5] || (y[5] = (ae) => Yn(ae)),
                onColumnSorted: y[6] || (y[6] = (ae) => Dt(ae)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              De.value ? (h(), x("div", G2, [
                Z(A(Dn), { size: "xlarge" })
              ])) : D("", !0),
              Z(Nh, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: y[7] || (y[7] = (ae) => Gt(ae))
              })
            ], 512),
            z.value ? (h(), le(Uh, {
              key: 0,
              filters: ie.value,
              onClearFilters: y[8] || (y[8] = (ae) => Mt()),
              onFilterChange: y[9] || (y[9] = (ae) => Et(ae))
            }, null, 8, ["filters"])) : D("", !0)
          ])
        ]),
        f("div", M2, [
          f("div", {
            class: Ue(["outer-wrapper-segment-details", { "standard-empty": !F.value }])
          }, [
            F.value ? (h(), x("div", U2, [
              F.value ? (h(), x("div", N2, ne(F.value.name), 1)) : D("", !0),
              y[24] || (y[24] = f("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              f("div", W2, [
                F.value.name ? (h(), x("div", q2, [
                  y[15] || (y[15] = f("div", { class: "description-term" }, "Name", -1)),
                  f("div", z2, ne(F.value.name), 1)
                ])) : D("", !0),
                F.value.description ? (h(), x("div", H2, [
                  y[16] || (y[16] = f("div", { class: "description-term" }, "Description", -1)),
                  f("div", Q2, ne(F.value.description), 1)
                ])) : D("", !0),
                F.value.sourceCreatedDate ? (h(), x("div", K2, [
                  y[17] || (y[17] = f("div", { class: "description-term" }, "Created", -1)),
                  f("div", Y2, ne(A(Tn)(F.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : D("", !0),
                F.value.sourceUpdatedDate ? (h(), x("div", Z2, [
                  y[18] || (y[18] = f("div", { class: "description-term" }, "Updated", -1)),
                  f("div", X2, ne(A(Tn)(F.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : D("", !0),
                F.value.status ? (h(), x("div", J2, [
                  y[19] || (y[19] = f("div", { class: "description-term" }, "Status", -1)),
                  f("div", j2, ne(F.value.status.value), 1)
                ])) : D("", !0),
                F.value.expiration_date ? (h(), x("div", em, [
                  y[20] || (y[20] = f("div", { class: "description-term" }, "Expiration", -1)),
                  f("div", tm, ne(F.value.expiration_date), 1)
                ])) : D("", !0),
                F.value.id ? (h(), x("div", nm, [
                  y[21] || (y[21] = f("div", { class: "description-term" }, "Segmnent ID", -1)),
                  f("div", im, ne(F.value.id), 1)
                ])) : D("", !0),
                F.value.audience_id ? (h(), x("div", rm, [
                  y[22] || (y[22] = f("div", { class: "description-term" }, "Audience ID", -1)),
                  f("div", am, ne(F.value.audience_id), 1)
                ])) : D("", !0),
                F.value.count ? (h(), x("div", sm, [
                  y[23] || (y[23] = f("div", { class: "description-term" }, "Last count", -1)),
                  f("div", lm, ne(Pe(F.value.count)), 1),
                  F.value.refreshCountDate ? (h(), x("span", om, " (" + ne(A(Tn)(F.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : D("", !0)
                ])) : D("", !0),
                F.value.platform_specific ? (h(!0), x(he, { key: 9 }, Ee(F.value.platform_specific, (ae) => (h(), x("div", um, [
                  f("div", cm, ne(Oe(ae.label)), 1),
                  f("div", dm, ne(ae.value), 1)
                ]))), 256)) : D("", !0)
              ]),
              f("div", null, [
                Z(A(Ia), {
                  tabs: L,
                  modelValue: Q.value,
                  "onUpdate:modelValue": y[10] || (y[10] = (ae) => Q.value = ae),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                Q.value.id === 2 ? (h(), le(e2, {
                  key: 0,
                  query: F.value.query
                }, null, 8, ["query"])) : D("", !0)
              ])
            ])) : D("", !0),
            F.value ? D("", !0) : (h(), x("div", fm, [
              f("div", null, [
                f("img", {
                  class: "",
                  alt: "standardIcon",
                  src: A(_0)
                }, null, 8, pm)
              ]),
              y[25] || (y[25] = f("div", { class: "standard-view-title" }, [
                f("div", null, "Select a standard segment from the list"),
                f("div", null, "or"),
                f("div", null, [
                  f("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          F.value.name ? (h(), x("div", hm, [
            f("div", mm, [
              y[26] || (y[26] = f("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              f("div", gm, [
                f("span", null, ne(F.value.name ? `${`${F.value.name} - `}` : "none"), 1),
                f("span", null, ne(Pe(F.value.count)), 1)
              ])
            ]),
            f("div", null, [
              xe.value ? D("", !0) : (h(), le(A(nt), {
                key: 0,
                type: "secondary",
                label: "Explore",
                onClick: y[11] || (y[11] = (ae) => Fe()),
                class: "mr-2"
              })),
              Z(A(nt), {
                type: "delete",
                label: "Delete",
                onClick: y[12] || (y[12] = (ae) => pt()),
                class: "mr-2 redButton"
              }),
              Z(A(nt), {
                type: "primary",
                label: "Push to destination",
                onClick: y[13] || (y[13] = (ae) => Zt())
              })
            ])
          ])) : D("", !0)
        ])
      ]),
      R.value ? (h(), le(b0, {
        key: 0,
        onClose: y[14] || (y[14] = (ae) => R.value = !1)
      })) : D("", !0)
    ], 64));
  }
}, ym = /* @__PURE__ */ Qe(xm, [["__scopeId", "data-v-3604e882"]]), km = { class: "feedback-title-wrapper" }, vm = { class: "title" }, _m = { class: "feedback-text" }, bm = {
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
    const I = {
      warning: "bi-exclamation-triangle-fill",
      info: "bi-info-circle-fill",
      query: "bi-magic",
      "icon-color-warning": "#FA5D05",
      "icon-color-info": "#8B919A",
      "icon-color-query": "#528233"
    };
    return (a, b) => {
      var m, T, w;
      return o.feedback ? (h(), x("div", {
        key: 0,
        class: Ue(["ai-query-feedback", [o.feedback.type]])
      }, [
        f("div", km, [
          Z(A(Rt), {
            class: "pr-2",
            size: "16px",
            icon: I[(m = o.feedback) == null ? void 0 : m.type],
            color: I[`icon-color-${(T = o.feedback) == null ? void 0 : T.type}`]
          }, null, 8, ["icon", "color"]),
          f("div", vm, ne(o.feedback.title), 1)
        ]),
        f("p", _m, ne((w = o.feedback) == null ? void 0 : w.text), 1)
      ], 2)) : D("", !0);
    };
  }
}, h0 = /* @__PURE__ */ Qe(bm, [["__scopeId", "data-v-8b6b4205"]]), Em = { key: 0 }, Sm = { class: "d-flex justify-content-between" }, Am = { class: "query-results" }, wm = { class: "query-result" }, Cm = { class: "query-result-count" }, Tm = {
  key: 0,
  class: "segment-insights"
}, Dm = {
  key: 1,
  class: "loading"
}, Im = {
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
  setup(o, { emit: I }) {
    const a = I, b = o;
    N(!1);
    const m = N(!1), T = {
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
    }, w = [
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
    function z() {
      a("explore-insights");
    }
    function X(O) {
      return O == null ? "" : (typeof O == "string" ? parseInt(O, 10) : O).toLocaleString();
    }
    return (O, H) => (h(), x("div", null, [
      o.savingDraft ? D("", !0) : (h(), x("div", Em, [
        f("div", Sm, [
          H[1] || (H[1] = f("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          m.value ? (h(), le(A(nt), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: H[0] || (H[0] = (Y) => z())
          })) : D("", !0)
        ]),
        f("div", Am, [
          f("div", wm, [
            H[2] || (H[2] = it(" Segment size ")),
            f("span", Cm, ne(X(b.segmentCount)), 1),
            H[3] || (H[3] = it(" records. "))
          ])
        ]),
        m.value ? (h(), x("div", Tm, [
          Z(A(La), {
            options: T,
            series: w
          })
        ])) : D("", !0)
      ])),
      o.savingDraft ? (h(), x("div", Dm, [
        Z(A(Dn), { size: "xlarge" }),
        H[4] || (H[4] = f("p", null, "Connecting to Open Intelligence...", -1))
      ])) : D("", !0)
    ]));
  }
}, Lm = /* @__PURE__ */ Qe(Im, [["__scopeId", "data-v-dea42952"]]), Bm = { class: "query-attributes" }, Fm = ["onClick", "onKeydown"], $m = {
  key: 0,
  class: "query-attributes-group-items"
}, Vm = ["onClick"], Om = { class: "attribute-type" }, Pm = { class: "attribute-name" }, Rm = {
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
  setup(o, { emit: I }) {
    const a = I;
    function b(T) {
      a("toggle-group", T);
    }
    function m(T, w) {
      return w[T];
    }
    return (T, w) => (h(), x("div", Bm, [
      o.fetching ? (h(), le(A(Dn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : D("", !0),
      (h(!0), x(he, null, Ee(o.tables, (z) => (h(), x("div", {
        class: Ue(["query-attributes-group", { closed: o.collapsed.includes(z.display_name) }]),
        key: z.display_name
      }, [
        f("div", {
          class: "query-attributes-group-toggle",
          onClick: (X) => b(z.display_name),
          onKeydown: $a((X) => b(z.display_name), ["enter"])
        }, [
          w[3] || (w[3] = f("span", { class: "arrow" }, null, -1)),
          it(" " + ne(z.display_name), 1)
        ], 40, Fm),
        o.collapsed.includes(z.display_name) ? D("", !0) : (h(), x("div", $m, [
          Z(A(Ba), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (X) => m(X, z.columns),
            onDragEnd: w[2] || (w[2] = (X) => T.$emit("drag-end"))
          }, {
            default: Pt(() => [
              (h(!0), x(he, null, Ee(z.columns, (X) => (h(), le(A(uh), {
                key: X.display_name
              }, {
                default: Pt(() => [
                  f("div", {
                    class: "attribute",
                    onMousedown: w[0] || (w[0] = (O) => T.$emit("drag-start")),
                    onMouseup: w[1] || (w[1] = (O) => T.$emit("drag-end"))
                  }, [
                    Z(A(Rt), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    f("div", {
                      class: "attribute-content",
                      onClick: sh((O) => T.$emit("click-attribute", X), ["stop"])
                    }, [
                      f("span", Om, ne(X.type), 1),
                      f("span", Pm, ne(X.display_name), 1)
                    ], 8, Vm)
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
}, Gm = /* @__PURE__ */ Qe(Rm, [["__scopeId", "data-v-d9536002"]]), Mm = { class: "freeform-tab" }, Um = {
  __name: "FreeForm",
  setup(o) {
    or();
    const I = N("");
    return (a, b) => (h(), x("div", Mm, [
      Z(A(Ot), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: I.value,
        "onUpdate:modelValue": b[0] || (b[0] = (m) => I.value = m)
      }, null, 8, ["modelValue"])
    ]));
  }
}, Nm = /* @__PURE__ */ Qe(Um, [["__scopeId", "data-v-87b28c22"]]), Wm = { class: "query-builder" }, qm = { class: "query-builder-left" }, zm = { class: "query-tabs" }, Hm = { class: "source" }, Qm = {
  key: 1,
  class: "ai-query-tab"
}, Km = {
  key: 2,
  class: ""
}, Ym = { class: "query-builder-right" }, Zm = { class: "query-content-scrollable" }, Xm = { class: "query-editor-wrapper" }, Jm = { class: "query-runner-button-wrapper" }, jm = {
  key: 0,
  class: "query-editor"
}, eg = { class: "queries" }, tg = {
  key: 0,
  class: "query"
}, ng = ["onClick", "onKeydown"], ig = { class: "w-100 pr-10" }, rg = {
  key: 0,
  class: "sub-query-outer"
}, ag = { class: "sub-queries" }, sg = {
  key: 0,
  class: "query-operator-inner",
  style: { width: "fit-content" }
}, lg = {
  key: 1,
  class: "pt-3 pb-2"
}, og = { key: 0 }, ug = {
  key: 1,
  class: "px-2"
}, cg = {
  key: 1,
  class: "query-operator-outer"
}, dg = {
  key: 0,
  class: "inital-view"
}, fg = ["src"], pg = { key: 0 }, hg = {
  key: 0,
  class: "query-results-wrapper"
}, mg = {
  key: 1,
  class: "loading-query-run"
}, gg = {
  key: 2,
  class: "loading-query-run"
}, xg = {
  key: 0,
  class: "mt-3"
}, yg = {
  key: 1,
  class: "mt-3"
}, kg = { class: "query-builder-footer" }, vg = { class: "query-builder-footer-fields" }, _g = { class: "query-builder-footer-buttons" }, bg = {
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
  setup(o, { emit: I }) {
    const a = o, b = cn(), m = or(), T = I, w = [
      "3d28abf8-b549-4535-9ccd-51f0f0fd2371",
      "3d28abf8-b549-4535-9ccd-51f0f0fd2376"
    ], z = Te(() => {
      const J = new URLSearchParams(window.location.search);
      return w.includes(J.get("tenantId"));
    });
    N();
    const X = [
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
    ], O = N(X[0]), H = N([]), Y = N(H.value[0]), fe = N([]), R = N(fe.value[0]), S = N(""), L = N(null), $ = N(!1), Q = N(null), De = N(!0), ie = N(!1), ye = N([]), M = N([]), F = N(!1), B = N(!1), P = N(""), xe = N(""), Fe = N(!1), pt = N(!1), Oe = N(!1), Pe = N(""), Et = N(!1), Gt = N(!1), Mt = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], Dt = [
      { value: "$eq", label: "equal" }
    ], It = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$in", label: "in" },
      { value: "$nin", label: "not in" }
    ], Yn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$bw", label: "begins with" },
      { value: "$nbw", label: "not begins with" },
      { value: "$ew", label: "ends with" },
      { value: "$new", label: "not ends with" }
    ], Zt = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$bt", label: "between" },
      { value: "$nbt", label: "not between" }
    ], Xe = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], U = N(0), y = N({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), ae = () => {
      b.set_selectedSegmentType("custom"), b.set_activeTab("custom"), b.set_selectedSegment(L.value), T("showInsightsExplorer", L.value);
    };
    function qe(J) {
      const C = {
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
      return J.reduce((_e, V) => {
        if (V.logic)
          return W = V.logic, _e;
        if (Array.isArray(V.group)) {
          const de = V.group.filter((ht) => ht.statement).map((ht) => {
            const [Xt, Jt, gn] = ht.statement;
            return {
              field: Xt,
              operator: C[Jt] || Jt,
              value: gn,
              type: ht.input_type
            };
          });
          return [
            ..._e,
            {
              logic: W,
              conditions: de
            }
          ];
        }
        return _e;
      }, []);
    }
    async function rt(J) {
      const C = {
        brandName: a.brandName,
        name: J.name,
        description: J.description,
        count: J.count || S.value,
        market: b.query.demographics.market
      }, W = `https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments/insights/${J.segmentId}`, _e = await fetch(W, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(C)
      });
      if (!_e.ok) {
        const V = await _e.json();
        throw new Error(V.message || "Failed to generate insights");
      }
      await _e.json();
    }
    async function Bn() {
      Pe.value = "saving", Et.value = !1, Oe.value = !0;
      const J = {
        platformId: R.value,
        count: S.value,
        region: b.query.demographics.region,
        market: b.query.demographics.market,
        description: y.value.description,
        name: y.value.name,
        query: qe(y.value.conditions)
      };
      try {
        const C = await fetch("https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          },
          body: JSON.stringify(J)
        }), W = await C.json();
        if (!C.ok)
          throw new Error(W.message || "Failed to save segment");
        pt.value = !0, B.value = !0, Pe.value = "generating", L.value = W.data[0], await rt(W.data[0]), Pe.value = "done";
      } catch (C) {
        console.error("Error saving segment or generating insights:", C), Pe.value = "";
      } finally {
        Oe.value = !1, Et.value = !0;
      }
    }
    async function Lt() {
      Fe.value = !0;
      const J = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: xe.value
      };
      y.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const C = await m.generate_ai_query(J, R.value, Y.value), W = {
        text: C.message,
        type: C.query ? "info" : "warning",
        title: "AI Assumption"
      }, _e = {
        text: C.query,
        type: "query",
        title: "Query Gen"
      };
      m.set_ai_generated_message(W), m.set_ai_generated_query(_e), C.attrs.forEach((V, de) => {
        de === 0 ? Q.value = "queryGroupDrop" : Q.value = y.value.conditions[0].id;
        const ht = String(V.value), Xt = /* @__PURE__ */ new Set([ht]);
        Array.isArray(V.valueOptions) && V.valueOptions.forEach((gn) => {
          Xt.add(String(gn));
        });
        const Jt = {
          payload: {
            display_name: V.field,
            input_type: V.input_type,
            operators: V.operator,
            selectors: Array.from(Xt)
            // No dups, formatted correctly
          }
        };
        Fn(Jt), c0();
      }), Fe.value = !1;
    }
    async function Se() {
      y.value.conditions.forEach((J) => {
        Array.isArray(J.group) && (J == null || J.group.forEach((C) => {
          C.input_type === "select" && C.statement[2].length > 1 && C.statement[1] === "$eq" && (C.statement[1] = "$in"), C.input_type === "select" && C.statement[2].length > 1 && C.statement[1] === "$neq" && (C.statement[1] = "$nin");
        }));
      });
    }
    async function cr() {
      F.value = !0, O.value.id === 1 && await Se(), S.value = await m.run_query(y.value, R.value, Y.value), S.value && (B.value = !0), F.value = !1, pt.value = !1;
    }
    function dn(J, C) {
      var _e, V;
      return J === "operatorsQueries" ? (_e = Mt.find((de) => de.value === C)) == null ? void 0 : _e.label : (V = fn(J).find((de) => de.value === C)) == null ? void 0 : V.label;
    }
    function fn(J) {
      switch (J) {
        case "select":
          return It;
        case "boolean":
          return Dt;
        case "string":
          return Yn;
        case "date":
          return Zt;
        case "int":
          return Xe;
        default:
          return [];
      }
    }
    function Zn(J) {
      $.value = J;
    }
    async function at() {
      ie.value = !0, await m.fetch_database_model(R.value, Y.value), ie.value = !1;
    }
    async function pn() {
      De.value = !0, await m.fetch_custom_segment_settings();
      const J = await m.get_segment_settings;
      J && (fe.value = await J.platforms.map((C) => ({
        value: C.platform_id,
        label: C.platform,
        locations: C.locations.map((W) => ({
          value: W.value,
          label: W.display_name
        }))
      })), R.value = fe.value[0].value), De.value = !1;
    }
    function Fn(J) {
      console.log(J);
      const C = J.payload ? J.payload : J;
      if (U.value < m.settings.maxSubQuery) {
        const W = C.selectors.map((de) => ({
          value: de,
          label: de
        }));
        let _e = [];
        W.length > 2 ? _e[0] = W[0].value : W.length > 0 ? _e = W[0].value : _e = null;
        const V = W.length > 0 && C.input_type !== "boolean" ? "select" : C.input_type;
        if (Q.value === "queryGroupDrop") {
          U.value += 1, y.value.conditions.length > 0 && y.value.conditions.push({ logic: "$or" });
          const de = {
            id: Ca(),
            group: [
              {
                id: Ca(),
                statement: [C.display_name, "$eq", _e],
                selectors: W,
                input_type: V
              }
            ]
          };
          y.value.conditions.push(de);
        } else if (Q.value !== null) {
          U.value += 1;
          const de = y.value.conditions.findIndex(
            (ht) => ht.id === Q.value
          );
          de !== -1 && (y.value.conditions[de].group.push({ logic: "$and" }), y.value.conditions[de].group.push({
            id: Ca(),
            statement: [C.display_name, "$eq", _e],
            selectors: W,
            input_type: V
          }));
        }
        Q.value = null;
      }
    }
    function St(J) {
      var C;
      (C = y.value.conditions[0]) != null && C.id ? Q.value = y.value.conditions[0].id : Q.value = "queryGroupDrop", Fn(J), c0();
    }
    function gi(J, C, W) {
      if (y.value.conditions[C].group.length === 1)
        y.value.conditions.length > C + 1 ? y.value.conditions.splice(C, 2) : y.value.conditions.splice(C, 1), U.value -= 1;
      else {
        const _e = y.value.conditions[C].group.findIndex(
          (V) => V.id === W
        );
        y.value.conditions[C].group.splice(_e - 1, 2), U.value -= 1;
      }
    }
    function xi(J) {
      const C = ye.value.indexOf(J);
      C >= 0 ? ye.value.splice(C, 1) : ye.value.push(J);
    }
    function hn(J) {
      const C = M.value.indexOf(J);
      C >= 0 ? M.value.splice(C, 1) : M.value.push(J);
    }
    function st() {
      S.value = "", y.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function mn() {
      y.value = { ...y.value, count: S.value }, O.value.id === 3 && (y.value = {
        ...y.value,
        freeForm: m.freeFormQuery
      }), T("insertSegment", y.value), Gt.value = !0;
    }
    async function $n() {
      await b.set_token(a.token), await b.set_brandId(a.brandId), await b.set_tenantId(a.tenantId), await m.set_customSegmentUrl(a.customSegmentUrl), await m.fetch_custom_segment_settings(), await pn();
    }
    return In(() => {
      $n();
    }), un(R, async (J, C) => {
      J && C !== J && (H.value = fe.value.find((W) => W.value == J).locations, Y.value = H.value[0].value, await st(), await at());
    }), un(O, async (J, C) => {
      J && C !== J && J.id === 2 && (xe.value = "", m.set_ai_generated_message(null), m.set_ai_generated_query(null));
    }), (J, C) => (h(), x("div", Wm, [
      f("div", qm, [
        De.value ? (h(), le(A(Dn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), x(he, { key: 1 }, [
          f("div", zm, [
            Z(A(Ia), {
              tabs: X,
              modelValue: O.value,
              "onUpdate:modelValue": C[0] || (C[0] = (W) => O.value = W),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          f("div", Hm, [
            Z(A(Vt), {
              style: { width: "45%" },
              class: "source w-100",
              options: fe.value,
              modelValue: R.value,
              "onUpdate:modelValue": C[1] || (C[1] = (W) => R.value = W),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            Z(A(Vt), {
              style: { width: "45%" },
              class: "source w-100",
              options: H.value,
              modelValue: Y.value,
              "onUpdate:modelValue": C[2] || (C[2] = (W) => Y.value = W),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            A(b).brief.market ? (h(), le(A(Ot), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: A(b).brief.market,
              "onUpdate:modelValue": C[3] || (C[3] = (W) => A(b).brief.market = W),
              label: "Market"
            }, null, 8, ["modelValue"])) : D("", !0)
          ]),
          R.value && Y.value ? (h(), x(he, { key: 0 }, [
            O.value.id === 1 ? (h(), le(Gm, {
              key: 0,
              tables: A(m).get_databaseModel.tables,
              collapsed: M.value,
              fetching: ie.value,
              onClickAttribute: St,
              onDragStart: C[4] || (C[4] = (W) => Zn(!0)),
              onDragEnd: C[5] || (C[5] = (W) => Zn(!1)),
              onToggleGroup: hn
            }, null, 8, ["tables", "collapsed", "fetching"])) : D("", !0),
            O.value.id === 2 ? (h(), x("div", Qm, [
              Z(A(Ot), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: xe.value,
                "onUpdate:modelValue": C[6] || (C[6] = (W) => xe.value = W)
              }, null, 8, ["modelValue"]),
              Z(A(nt), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !xe.value,
                loading: Fe.value,
                onClick: C[7] || (C[7] = (W) => Lt())
              }, null, 8, ["disabled", "loading"]),
              A(m).get_aiGeneratedMessage ? (h(), le(h0, {
                key: 0,
                feedback: A(m).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : D("", !0),
              A(m).get_aiGeneratedQuery ? (h(), le(h0, {
                key: 1,
                feedback: A(m).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : D("", !0)
            ])) : D("", !0),
            O.value.id === 3 ? (h(), x("div", Km, [
              Z(Nm)
            ])) : D("", !0)
          ], 64)) : D("", !0)
        ], 64))
      ]),
      f("div", Ym, [
        f("div", Zm, [
          f("div", Xm, [
            f("div", null, [
              C[16] || (C[16] = f("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              f("div", Jm, [
                Z(A(nt), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Querys",
                  disabled: !R.value || !Y.value,
                  loading: F.value,
                  onClick: C[8] || (C[8] = (W) => cr())
                }, null, 8, ["disabled", "loading"]),
                Z(A(nt), {
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Querys",
                  disabled: !y.value.name || !y.value.description || !S.value || pt.value,
                  loading: Oe.value,
                  onClick: C[9] || (C[9] = (W) => Bn())
                }, null, 8, ["disabled", "loading"])
              ])
            ]),
            O.value.id !== 3 ? (h(), x("div", jm, [
              f("div", eg, [
                (h(!0), x(he, null, Ee(y.value.conditions, (W, _e) => (h(), x("div", {
                  class: "query-outer",
                  key: W.id
                }, [
                  W.group ? (h(), x("div", tg, [
                    f("div", {
                      class: "collapse-subQuery",
                      onClick: (V) => xi(W.id),
                      onKeydown: $a((V) => xi(W.id), ["enter"])
                    }, [
                      Z(A(Rt), {
                        icon: ye.value.indexOf(W.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, ng),
                    f("div", ig, [
                      ye.value.indexOf(W.id) === -1 ? (h(), x("div", rg, [
                        (h(!0), x(he, null, Ee(W.group, (V) => (h(), x("div", ag, [
                          V.logic && ye.value.indexOf(W.id) === -1 ? (h(), x("div", sg, [
                            Z(A(Vt), {
                              class: "query-operator",
                              modelValue: V.logic,
                              "onUpdate:modelValue": (de) => V.logic = de,
                              singleSelect: !0,
                              options: Mt,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : D("", !0),
                          V.statement ? (h(), x("div", {
                            key: 1,
                            class: Ue(["sub-query", { "single-subquery": W.group.length === 1 }])
                          }, [
                            Z(A(Ot), {
                              readonly: "",
                              modelValue: V.statement[0],
                              "onUpdate:modelValue": (de) => V.statement[0] = de
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            Z(A(Vt), {
                              modelValue: V.statement[1],
                              "onUpdate:modelValue": (de) => V.statement[1] = de,
                              singleSelect: !0,
                              options: fn(V.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            V.selectors.length < 3 && V.selectors.length > 0 ? (h(), le(A(Vt), {
                              key: 0,
                              modelValue: V.statement[2],
                              "onUpdate:modelValue": (de) => V.statement[2] = de,
                              options: V.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : D("", !0),
                            V.selectors.length > 2 && V.input_type !== "boolean" ? (h(), le(A(Vt), {
                              key: 1,
                              modelValue: V.statement[2],
                              "onUpdate:modelValue": (de) => V.statement[2] = de,
                              options: V.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : D("", !0),
                            V.input_type === "int" ? (h(), le(A(Ot), {
                              key: 2,
                              modelValue: V.statement[2],
                              "onUpdate:modelValue": (de) => V.statement[2] = de,
                              error: V.statement[2] ? "" : P.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : D("", !0),
                            V.input_type === "string" ? (h(), le(A(Ot), {
                              key: 3,
                              modelValue: V.statement[2],
                              "onUpdate:modelValue": (de) => V.statement[2] = de,
                              error: V.statement[2] ? "" : P.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : V.input_type === "date" ? (h(), le(A(x0), {
                              key: 4,
                              modelValue: V.statement[2],
                              "onUpdate:modelValue": (de) => V.statement[2] = de,
                              range: V.statement[1] === "$bt" || V.statement[1] === "$nbt",
                              error: V.statement[2] ? "" : P.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : D("", !0),
                            Z(A(Rt), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (de) => gi(W.id, _e, V.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : D("", !0)
                        ]))), 256))
                      ])) : (h(), x("p", lg, [
                        (h(!0), x(he, null, Ee(W.group, (V, de) => (h(), x("span", {
                          key: V.id
                        }, [
                          V.statement ? (h(), x("span", og, [
                            f("b", null, ne(V == null ? void 0 : V.statement[0]), 1),
                            it(" " + ne(dn(V.input_type, V == null ? void 0 : V.statement[1])) + " ", 1),
                            f("b", null, ne((V == null ? void 0 : V.statement[2]) || "?"), 1)
                          ])) : (h(), x("span", ug, ne(dn("operatorsQueries", V.logic)), 1))
                        ]))), 128))
                      ])),
                      $.value && U.value < A(m).settings.maxSubQuery ? (h(), le(A(Ba), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (V) => Q.value = W.id,
                        onDrop: Fn
                      }, {
                        default: Pt(() => C[17] || (C[17] = [
                          f("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : D("", !0)
                    ])
                  ])) : D("", !0),
                  y.value.conditions.length > 1 && _e < y.value.conditions.length - 1 && W.logic ? (h(), x("div", cg, [
                    Z(A(Vt), {
                      class: "query-operator",
                      modelValue: W.logic,
                      "onUpdate:modelValue": (V) => W.logic = V,
                      singleSelect: !0,
                      options: Mt,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : D("", !0)
                ]))), 128))
              ]),
              y.value.conditions.length === 0 ? (h(), x("div", dg, [
                f("span", null, [
                  f("img", {
                    class: "",
                    alt: "standardIcon",
                    src: A(_0)
                  }, null, 8, fg)
                ])
              ])) : D("", !0),
              $.value && U.value < A(m).settings.maxSubQuery || y.value.conditions.length === 0 ? (h(), le(A(Ba), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: C[10] || (C[10] = (W) => Q.value = "queryGroupDrop"),
                onDrop: Fn
              }, {
                default: Pt(() => [
                  f("div", {
                    class: Ue(["drop-indicator", {
                      "mt-25": y.value.conditions.length > 0,
                      "p-5": y.value.conditions.length === 0
                    }])
                  }, [
                    y.value.conditions.length <= 0 ? (h(), x("span", pg, " Drag and drop attributes or AI generated rules ")) : D("", !0)
                  ], 2)
                ]),
                _: 1
              })) : D("", !0)
            ])) : D("", !0)
          ]),
          F.value || B.value ? (h(), x("div", hg, [
            !F.value && B.value ? (h(), le(Lm, {
              key: 0,
              segmentData: S.value,
              segmentCount: S.value
            }, null, 8, ["segmentData", "segmentCount"])) : D("", !0),
            F.value ? (h(), x("div", mg, [
              Z(A(Dn), {
                size: "xlarge",
                class: "mt-3"
              }),
              C[18] || (C[18] = f("p", { class: "mt-3" }, "Running query...", -1))
            ])) : D("", !0),
            Pe.value === "saving" || Pe.value === "generating" ? (h(), x("div", gg, [
              Z(A(Dn), {
                size: "xlarge",
                class: "mt-3"
              }),
              Pe.value === "saving" ? (h(), x("p", xg, "Saving segment...")) : (h(), x("p", yg, "Generating insights..."))
            ])) : D("", !0),
            Pe.value === "done" && L.value ? (h(), le(p2, {
              key: 3,
              selectedSegment: L.value,
              location: "custom",
              onShowInsightsExplorer: ae
            }, null, 8, ["selectedSegment"])) : D("", !0)
          ])) : D("", !0)
        ]),
        f("div", kg, [
          f("div", vg, [
            Z(A(Ot), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: y.value.name,
              "onUpdate:modelValue": C[11] || (C[11] = (W) => y.value.name = W),
              type: "text"
            }, null, 8, ["modelValue"]),
            Z(A(Ot), {
              class: "segment-name",
              label: "Segment description",
              modelValue: y.value.description,
              "onUpdate:modelValue": C[12] || (C[12] = (W) => y.value.description = W),
              type: "text"
            }, null, 8, ["modelValue"])
          ]),
          f("div", _g, [
            z.value ? D("", !0) : (h(), le(A(nt), {
              key: 0,
              type: "secondary",
              label: "Explore",
              size: "small",
              onClick: C[13] || (C[13] = (W) => ae()),
              class: "mx-1",
              disabled: !S.value || !y.value.name && O.value.id === 1 || !y.value.name && O.value.id === 2 || y.value.conditions.length <= 0 && O.value.id !== 3 || !Et.value
            }, null, 8, ["disabled"])),
            Z(A(nt), {
              size: "small",
              label: "Push to destination",
              disabled: !S.value || !y.value.name && O.value.id === 1 || !y.value.name && O.value.id === 2 || y.value.conditions.length <= 0 && O.value.id !== 3,
              onClick: C[14] || (C[14] = (W) => mn())
            }, null, 8, ["disabled"])
          ])
        ])
      ]),
      Gt.value ? (h(), le(b0, {
        key: 0,
        onClose: C[15] || (C[15] = (W) => Gt.value = !1)
      })) : D("", !0)
    ]));
  }
}, Eg = /* @__PURE__ */ Qe(bg, [["__scopeId", "data-v-6384d91c"]]), Sg = { class: "tag-section" }, Ag = { class: "rating-card" }, wg = { class: "header" }, Cg = { class: "title" }, Tg = { class: "pb-2" }, Dg = { class: "content-wrapper" }, Ig = { class: "content" }, Lg = { class: "publishers" }, Bg = { class: "publisher-item" }, Fg = { class: "ratings" }, $g = { class: "rating" }, Vg = {
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
    const I = N([]), a = o, b = Te(() => a.charts.filter((T) => T.type === "bubble")), m = Te(() => a.tags);
    return In(() => {
      I.value = new Array(b.value.length).fill(!1);
    }), (T, w) => (h(), x("div", Sg, [
      (h(!0), x(he, null, Ee(m.value, (z, X) => (h(), x("div", {
        class: Ue(["card-wrapper", { "full-width": z.section === "Owned Intelligence" }]),
        key: z.title + X
      }, [
        f("div", Ag, [
          f("div", wg, [
            f("h2", Cg, [
              f("span", Tg, ne(z.title), 1)
            ])
          ]),
          f("div", Dg, [
            f("div", Ig, [
              f("div", Lg, [
                (h(!0), x(he, null, Ee(z.data[0].label, (O, H) => (h(), x("div", { key: O }, [
                  f("div", Bg, ne(O), 1),
                  f("div", Fg, [
                    f("div", $g, [
                      (h(!0), x(he, null, Ee(Math.floor(parseFloat(z.data[0].score[H])), (Y, fe) => (h(), x("span", {
                        key: `filled-${fe}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), x(he, null, Ee(5 - Math.floor(parseFloat(z.data[0].score[H])), (Y, fe) => (h(), x("span", {
                        key: `empty-${fe}`,
                        class: "dot"
                      }))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            w[0] || (w[0] = f("div", { class: "logo-wrapper" }, [
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
}, m0 = /* @__PURE__ */ Qe(Vg, [["__scopeId", "data-v-8ab7bec3"]]), Og = { class: "chart-section-title my-3" }, Pg = { class: "chart-section" }, Rg = { key: 0 }, Gg = { class: "chart-title" }, Mg = {
  key: 1,
  class: "chart-section-title my-4"
}, Ug = {
  key: 2,
  class: "pb-4"
}, Ng = { class: "chart-title" }, Wg = {
  key: 3,
  class: "chart-section-title my-4"
}, qg = {
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
    const I = o, a = N([]), b = N([]), m = N(null), T = N(!1), w = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], z = (R, S) => {
      var Fe, pt;
      const L = "area", $ = Fa[L] || {}, Q = ((Fe = R.data[0]) == null ? void 0 : Fe.label) || [], ie = (((pt = R.data[0]) == null ? void 0 : pt.score) || []).map((Oe) => Number.isNaN(Number(Oe)) ? Oe : Number(Oe)), ye = [{ name: R.title, data: ie }], M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], F = Q.map((Oe, Pe) => M[Math.floor(Pe / (52 / 12))]), B = [], P = /* @__PURE__ */ new Set();
      F.forEach((Oe) => {
        P.has(Oe) ? B.push("") : (B.push(Oe), P.add(Oe));
      });
      const xe = {
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
        colors: [w[S % w.length]],
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
          custom: ({ series: Oe, seriesIndex: Pe, dataPointIndex: Et, w: Gt }) => {
            const Mt = Gt.globals.labels[Et], Dt = Oe[Pe][Et];
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
                            Week ${Mt}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption (Annual): </span>
                            <span style="font-weight: 600;">${Dt}</span>
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
        section: R.section,
        chartType: L,
        title: R.title === "Digital Media Consumption Index Weekly" ? "Digital Media Consumption Annual View" : R.title,
        series: ye,
        options: {
          ...$,
          ...xe,
          chart: {
            type: L,
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
    }, X = (R) => {
      if (!R)
        return "bar";
      const S = R.toString().toLowerCase().trim();
      return (S.includes("vertical") || S.includes("verical")) && (S.includes("bar") || S.includes("bars") || S.includes("chart")) || S === "horizontal" ? "bar" : S === "donut" ? "donut" : S === "pie" ? "pie" : S === "radar" ? "radar" : S === "line" ? "line" : S === "area" ? "area" : S;
    }, O = Te(() => I.charts.filter((R) => R.data && R.data.length > 0).map((R, S) => {
      var F, B;
      const L = X(E0[R.type] || R.type), $ = Fa[L] || {}, Q = ((F = R.data[0]) == null ? void 0 : F.label) || [], ie = (((B = R.data[0]) == null ? void 0 : B.score) || []).map((P) => Number.isNaN(Number(P)) ? P : Number(P));
      let ye = [], M = {};
      if (L === "horizontal")
        ye = [{ name: R.title, data: ie }], M = {
          labels: Q,
          colors: [w[S % w.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (L === "bar" || L === "vertical bar" || L === "vertical bars" || L === "Vertical bars" || L === "vertical chart")
        R.title === "Digital Media Consumption Index Hourly" || R.title === "Digital Media Consumption Index Daily" ? (ye = [{ name: "Indexed Consumption", data: ie }], M = {
          xaxis: {
            categories: Q,
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
          colors: [w[S % w.length]],
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
            custom: ({ series: P, seriesIndex: xe, dataPointIndex: Fe, w: pt }) => {
              const Oe = pt.globals.labels[Fe], Pe = P[xe][Fe];
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
                            <span style="font-weight: 600;">${Pe}</span>
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
        }) : (R.title === "Personality archetype" && console.log(ie), ye = [{ name: R.title, data: ie }], M = {
          labels: Q,
          colors: [w[S % w.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (L === "line" || L === "area")
          return z(R, S);
        L === "radar" ? (ye = [{ name: R.title, data: ie }], M = { labels: Q }) : (L === "donut" || L === "pie") && (ye = ie, M = { labels: Q });
      }
      return {
        section: R.section,
        chartType: L,
        title: R.title,
        series: ye,
        options: {
          ...$,
          ...M,
          chart: { type: L }
        }
      };
    }));
    In(() => {
      a.value = new Array(O.value.length).fill(!1), m.value && f0(
        m,
        ([R], S) => {
          R.isIntersecting && (T.value = !0, S.disconnect());
        },
        { threshold: 0.1 }
      );
    });
    const H = (R, S) => {
      if (!R || a.value[S])
        return;
      b.value[S] = R;
      const { stop: L } = f0(
        R,
        ([$]) => {
          $.isIntersecting && (a.value[S] = !0, L());
        },
        { threshold: 0.1 }
      );
    }, Y = () => {
      const R = O.value.length;
      return R === 1 ? "full-width" : R === 2 ? "half-width" : "third-width";
    }, fe = Te(() => {
      const { paidSocial: R } = I, S = R.data.map((L) => L.name);
      return {
        chartType: "bar",
        title: R.title,
        section: R.section,
        description: R.description,
        series: [
          {
            name: "Audience",
            data: R.data.map((L) => Number(L.x))
          },
          {
            name: "Population",
            data: R.data.map((L) => Number(L.y))
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
            categories: S,
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
    return (R, S) => (h(), x("div", null, [
      f("h5", Og, ne(O.value[0].section.charAt(0).toUpperCase() + O.value[0].section.slice(1)), 1),
      f("div", Pg, [
        (h(!0), x(he, null, Ee(O.value, (L, $) => (h(), x("div", {
          key: L.title + $,
          ref_for: !0,
          ref: (Q) => H(Q, $),
          class: Ue(["chart-wrapper", Y()])
        }, [
          a.value[$] ? (h(), x("div", Rg, [
            f("div", Gg, ne(L.title === "Digital Media Consumption Index Weekly" ? "Digital Media Consumption Annual View" : L.title), 1),
            Z(A(La), {
              options: L.options,
              series: L.series,
              type: L.chartType,
              width: "100%",
              height: L.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : D("", !0)
        ], 2))), 128))
      ]),
      O.value[0].section === "Paid Intelligence" ? (h(), le(m0, {
        key: 0,
        tags: o.tags.slice(0, 2)
      }, null, 8, ["tags"])) : D("", !0),
      O.value[0].section === "Paid Intelligence" ? (h(), x("h5", Mg, ne(o.paidSocial.section), 1)) : D("", !0),
      O.value[0].section === "Paid Intelligence" ? (h(), x("div", Ug, [
        f("div", {
          ref_key: "paidSocialEl",
          ref: m,
          class: Ue(["chart-wrapper", { "full-width": !0 }])
        }, [
          f("div", Ng, ne(o.paidSocial.title), 1),
          T.value ? (h(), le(A(La), {
            key: 0,
            options: fe.value.options,
            series: fe.value.series,
            type: "bar",
            width: "100%",
            height: "500"
          }, null, 8, ["options", "series"])) : D("", !0)
        ], 512)
      ])) : D("", !0),
      o.tags[2].section === "Owned Intelligence" && O.value[0].section === "Paid Intelligence" ? (h(), x("h5", Wg, ne(o.tags[2].section), 1)) : D("", !0),
      o.tags[2].section === "Owned Intelligence" && O.value[0].section === "Paid Intelligence" ? (h(), le(m0, {
        key: 4,
        tags: o.tags.slice(2)
      }, null, 8, ["tags"])) : D("", !0)
    ]));
  }
}, zg = /* @__PURE__ */ Qe(qg, [["__scopeId", "data-v-2761b5b5"]]), Hg = "5.12.1", Qg = 25, Kg = 0, Yg = 100, Zg = 450, Xg = 450, Jg = "*Final5", jg = 0, e3 = [], t3 = [
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
], n3 = [], i3 = {}, r3 = {
  v: Hg,
  fr: Qg,
  ip: Kg,
  op: Yg,
  w: Zg,
  h: Xg,
  nm: Jg,
  ddd: jg,
  assets: e3,
  layers: t3,
  markers: n3,
  props: i3
}, a3 = {
  key: 0,
  class: "explore-insights-wrapper",
  style: { width: "100%", height: "100%" }
}, s3 = { key: 1 }, l3 = {
  key: 0,
  class: "explore-insights-loader"
}, o3 = {
  key: 1,
  class: "explore-insights-wrapper"
}, u3 = { class: "explore-insights" }, c3 = { class: "explore-insights-subtitle" }, d3 = { class: "d-flex flex-column" }, f3 = { class: "mb-2" }, p3 = { class: "pd-segment-title-details" }, h3 = { class: "pd-segment-title-details" }, m3 = { key: 0 }, g3 = { class: "thumbnail-card" }, x3 = { class: "thumbnail-segment-cards" }, y3 = { class: "segment-card-row" }, k3 = {
  __name: "ExploreInsights",
  emits: ["apiError"],
  setup(o, { emit: I }) {
    const a = I, b = cn(), m = b.get_selectedSegment, T = N(null), w = Te(() => T.value || {}), z = N(), X = N([]), O = N(!0), H = N([]);
    In(async () => {
      var S, L, $, Q, De;
      if (m != null && m.segmentId)
        try {
          O.value = !0;
          const ie = await hi.get(
            `https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments/insights/${m != null && m.segmentId ? m == null ? void 0 : m.segmentId : (S = cn.get_selectedSegment) == null ? void 0 : S.segmentId}`,
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
          (L = ie == null ? void 0 : ie.data) != null && L.data || a("apiError", {
            error: "Empty response",
            headline: "Error",
            message: "Sorry, an error occurred while getting your insights."
          }), T.value = (Q = ($ = ie.data) == null ? void 0 : $.data) == null ? void 0 : Q[0];
          const ye = T.value.charts.reduce((M, F, B, P) => (B < 2 ? (M[0] || (M[0] = []), M[0].push(F)) : B < 5 ? (M[1] || (M[1] = []), M[1].push(F)) : (M[2] || (M[2] = []), M[2].push(F)), M), []);
          X.value = T.value.segments[0], H.value = Object.values(ye), await dh(3e3), O.value = !1;
        } catch (ie) {
          O.value = !1;
          const ye = {
            error: ie,
            headline: "Error",
            message: ((De = ie == null ? void 0 : ie.response) == null ? void 0 : De.data) || "Sorry, an error occurred while getting your insights."
          };
          a(ye);
        }
    });
    const Y = Te(() => b.tenantId === "3d28abf8-b549-4535-9ccd-51f0f0fd2000");
    Te(() => {
      var S, L, $;
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
          categories: ((L = (S = m.thumbnail) == null ? void 0 : S.graph) == null ? void 0 : L.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: (($ = m.thumbnail) == null ? void 0 : $.title) || "",
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
    }), Te(() => {
      var S, L, $;
      return (($ = (L = (S = m.thumbnail) == null ? void 0 : S.graph) == null ? void 0 : L.seriesCombined) == null ? void 0 : $.map((Q) => ({
        name: Q.name,
        data: Q.data.map(Number)
      }))) || [];
    });
    const fe = Te(() => {
      var S, L, $, Q;
      return ((Q = ($ = (L = (S = m.thumbnail) == null ? void 0 : S.segments) == null ? void 0 : L[0]) == null ? void 0 : $.segments) == null ? void 0 : Q.slice(0, 4)) || [];
    });
    Te(() => fe.value.map(($) => parseFloat($.affinityScore || "0")).reduce(($, Q) => $ + Q, 0).toFixed(2)), Te(() => fe.value.map((L) => parseInt(L.reach || "0", 10)).reduce((L, $) => L + $, 0).toLocaleString());
    function R(S) {
      return S == null ? "" : (typeof S == "string" ? parseInt(S, 10) : S).toLocaleString();
    }
    return (S, L) => {
      var $, Q, De;
      return Y.value ? (h(), x("div", a3, L[0] || (L[0] = [
        f("iframe", {
          src: 'https://lookerstudio.google.com/embed/reporting/25d1a942-d229-4f79-b3d2-4179fe189479/page/HZZdF?params={"ds3.ou":"all","ds3.segment_id":"0f04a842-ce62-4aa4-a978-79ea1b3e2992"}',
          style: { border: "0", width: "100%", height: "90vh" },
          allowfullscreen: ""
        }, null, -1)
      ]))) : (h(), x("div", s3, [
        O.value ? (h(), x("div", l3, [
          Z(A(ch), {
            height: "40vh",
            ref_key: "anim",
            ref: z,
            "animation-data": A(r3),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          L[1] || (L[1] = f("h6", null, [
            it("Generating Open Intelligence Insights"),
            f("span", { class: "dot-animate" }, [
              f("span", null, "."),
              f("span", null, "."),
              f("span", null, ".")
            ])
          ], -1))
        ])) : D("", !0),
        O.value ? D("", !0) : (h(), x("div", o3, [
          f("div", u3, [
            f("h6", c3, [
              f("div", d3, [
                f("div", f3, [
                  L[2] || (L[2] = f("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  it(ne((($ = A(m)) == null ? void 0 : $.name) || "Segment Overview"), 1)
                ]),
                f("div", p3, [
                  L[3] || (L[3] = f("strong", null, "Count:", -1)),
                  it(" " + ne(R((Q = A(m)) == null ? void 0 : Q.count)), 1)
                ]),
                f("div", h3, [
                  L[4] || (L[4] = f("strong", null, "Description:", -1)),
                  it(" " + ne((De = A(m)) == null ? void 0 : De.description), 1)
                ])
              ]),
              L[5] || (L[5] = f("span", { class: "logo-wrapper" }, [
                f("span", null, "Enrichment Source:"),
                f("img", {
                  src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                  alt: "logo",
                  width: "120"
                })
              ], -1))
            ]),
            T.value && X.value.length > 0 ? (h(), x("div", m3, [
              f("div", g3, [
                f("div", x3, [
                  f("div", y3, [
                    (h(), le(l2, {
                      key: S.index,
                      "segment-data": X.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ])) : D("", !0),
            T.value ? (h(!0), x(he, { key: 1 }, Ee(H.value, (ie, ye) => {
              var M;
              return h(), x("div", {
                class: "charts-outer-wrapper",
                key: ((M = ie == null ? void 0 : ie[0]) == null ? void 0 : M.section) + ye
              }, [
                ie ? (h(), le(zg, {
                  key: 0,
                  charts: ie || [],
                  tags: w.value.tags || [],
                  paidSocial: T.value.paidSocial
                }, null, 8, ["charts", "tags", "paidSocial"])) : D("", !0)
              ]);
            }), 128)) : D("", !0)
          ])
        ]))
      ]));
    };
  }
}, v3 = /* @__PURE__ */ Qe(k3, [["__scopeId", "data-v-0be41ee7"]]), _3 = { key: 0 }, b3 = { key: 1 }, E3 = {
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
  setup(o, { emit: I }) {
    const a = I, b = cn(), m = or(), T = o, w = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], z = N("standard"), X = N(w[0]), O = N(!1), H = N(null);
    function Y(L) {
      H.value = L, O.value = !0;
    }
    function fe() {
      a("close");
    }
    function R(L) {
      a("insertSegment", L);
    }
    function S() {
      O.value = !1;
    }
    return In(() => {
      b.set_brandId(T.brandId), b.set_token(T.token), b.set_tenantId(T.tenantId), b.set_baseUrl(T.baseUrl), m.set_customSegmentUrl(T.customSegmentUrl), z.value = b.get_activeTab;
    }), (L, $) => (h(), le(A(y0), {
      onClose: fe,
      size: "large"
    }, {
      header: Pt(() => [
        O.value ? D("", !0) : (h(), x("div", _3, [
          $[1] || ($[1] = f("div", { class: "header" }, [
            f("h4", null, "Segment Manager")
          ], -1)),
          Z(A(oh), {
            tabs: w,
            modelValue: X.value,
            "onUpdate:modelValue": $[0] || ($[0] = (Q) => X.value = Q),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        O.value ? (h(), x("div", b3, [
          f("div", {
            onClick: S,
            class: "navigation"
          }, [
            Z(A(Rt), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            $[2] || ($[2] = f("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          $[3] || ($[3] = f("div", { class: "discovery-header" }, [
            f("div", { class: "discovery-header-title" }, [
              f("h6", null, "Segment Manager"),
              f("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ])
          ], -1))
        ])) : D("", !0)
      ]),
      body: Pt(() => [
        X.value.id === 1 && !O.value ? (h(), le(ym, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: R,
          onShowInsightsExplorer: Y,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: H.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : D("", !0),
        X.value.id === 2 && !O.value ? (h(), le(Eg, {
          key: 1,
          onInsertSegment: R,
          onShowInsightsExplorer: Y,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : D("", !0),
        O.value ? (h(), le(v3, { key: 2 })) : D("", !0)
      ]),
      _: 1
    }));
  }
}, $3 = /* @__PURE__ */ Qe(E3, [["__scopeId", "data-v-59b52212"]]);
export {
  $3 as BetaSegmentManagerModal,
  Eg as CustomSegments,
  v3 as ExploreInsights,
  ym as StandardSegments,
  or as useCustomSegmentStore,
  cn as useSegmentManagerStore
};
