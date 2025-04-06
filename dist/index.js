import { ref as z, computed as Oe, watch as ln, createElementBlock as y, openBlock as h, normalizeClass as We, createElementVNode as p, createCommentVNode as B, normalizeStyle as kn, createBlock as fe, unref as w, Fragment as me, renderList as we, createTextVNode as tt, toDisplayString as ie, withKeys as Fa, renderSlot as ji, createVNode as Y, onMounted as bn, onUnmounted as th, resolveComponent as fl, withCtx as Lt, withModifiers as nh, nextTick as ul } from "vue";
import { CataUiInputCheckbox as vn, CataUiIcon as Bt, CataUiStatusLabel as ih, CataUiInputDate as pl, CataUiInputSelect as Dt, CataUiInput as It, CataUiButton as nt, CataUiModal as hl, CataUiTabs as Ia, CataUiSpinner as Mn, CataUiTabSwitch as rh } from "@catalyst/ui-library";
import { defineStore as ml } from "pinia";
import li from "axios";
import _n from "dayjs";
import { CataCoreUiChart as gl } from "@catalyst-core/ui-library";
import { v4 as Ca } from "uuid";
import { Container as La, Draggable as ah } from "vue3-smooth-dnd";
import { LottieAnimation as sh } from "lottie-web-vue";
import { useIntersectionObserver as lh, promiseTimeout as oh } from "@vueuse/core";
const uh = {
  async fetch_database_model(o, D) {
    try {
      const a = await hh(o, D);
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
      const a = await mh(o);
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
      return (await xh(o, D)).data;
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
      return (await gh(o, D)).count;
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
}, ch = {
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
}, tr = ml("customSegmentStore", {
  state: () => ({
    customSegmentUrl: "",
    databaseModel: [],
    settings: null,
    aiGeneratedInfo: null,
    aiGeneratedQuery: null,
    aiGeneratedInfoMessage: null,
    freeFormQuery: null
  }),
  actions: uh,
  getters: ch
}), En = "", nr = li.create(), oi = li.create();
li.create();
nr.interceptors.request.use(
  (o) => {
    const D = on();
    return o.baseURL = D.baseUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", xl(o), o;
  },
  (o) => Promise.reject(o)
);
oi.interceptors.request.use(
  (o) => {
    const D = on(), a = tr();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, xl(o), o;
  },
  (o) => Promise.reject(o)
);
const dh = () => li.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), xl = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, cl = (o, D) => nr.get(`${En}/api/v1/segments/${D ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), fh = (o) => nr.get(`${En}/api/v1/insights/${o}`, { params: queryParams }).then((D) => D.data).catch((D) => {
  throw D;
}), ph = () => nr.get(`${En}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), hh = (o, D) => oi.get(`${En}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), mh = () => oi.get(`${En}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), gh = (o, D) => oi.post(`${En}/api/v1/query/${D}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), xh = (o, D) => oi.post(`${En}/api/v1/query/gen/${D}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), yh = {
  async fetch_appSettings() {
    try {
      const o = await dh();
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
      return await fh(this.brandId, this.tenantId);
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
      }, a = await cl(D, o);
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
      const A = await cl(D, o), k = A.data.map((U) => ({
        ...U,
        status: {
          type: U.status,
          value: U.status ? U.status : "active",
          color: this.stateColors[U.status]
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
      const a = await ph(o);
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
}, kh = {
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
}, on = ml("segmentManagerStore", {
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
  actions: yh,
  getters: kh
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
  for (const [A, k] of D)
    a[A] = k;
  return a;
}, vh = ["onClick"], _h = { key: 0 }, bh = ["onClick"], Eh = { class: "text-center" }, Sh = ["title"], Ah = ["title"], wh = ["onClick"], Ch = {
  key: 0,
  class: "checkbox-container"
}, Th = ["onKeydown", "onClick"], Dh = ["src"], Ih = {
  key: 4,
  class: "d-flex justify-content-end pr-45"
}, Lh = ["title"], Bh = {
  key: 0,
  class: "no-matches"
}, Fh = {
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
    const a = D, A = o, k = z(null), U = z(!1), P = z(1), L = z([]), F = z(null), V = z(!1), E = z({}), x = Oe(
      {
        get() {
          return A.checkedRows;
        },
        set(H) {
          L.value = H;
        }
      }
    ), C = Oe(() => A.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${A.stickyHeader}px;` : "");
    function G() {
      A.expandable && A.rows.length > 0 && (V.value = !V.value, V.value === !1 && (E.value = {}));
    }
    function Z(H) {
      return A.expandable && H.details.length === 1;
    }
    function ye(H) {
      E[H] ? E[H] = !E[H] : this.$set(E, H, !0);
    }
    function K(H) {
      F.value = H;
    }
    function ge(H, $, I) {
      I.key !== "actions" && I.type !== "link" && $.showInAction !== !1 && a("rowClicked", { event: H, row: $ });
    }
    function xe(H) {
      A.sortable && H.key !== "actions" && H.type !== "link" && (k.value === H.key ? P.value *= -1 : (k.value = H.key, P.value = 1), a("columnSorted", { sortColumn: k.value, sortOrder: P }));
    }
    function ve(H, $) {
      let I = "";
      if (typeof H == "object" ? I = H.value : I = H, $ === "datetime") {
        const W = _n(new Date(I));
        return _n(W).format("DD MMM YYYY");
      }
      if ($ === "datetimehour") {
        const W = _n(new Date(I));
        return _n(W).format("DD MMM YYYY, HH:mm");
      }
      return $ === "number" || (typeof I == "number" || typeof I == "string" && !Number.isNaN(Number(I))) && String(I).trim() !== "" ? (typeof I == "string" ? Number(I) : I).toLocaleString() : I;
    }
    function Ie(H) {
      return H == null ? "" : (typeof H == "string" ? parseInt(H, 10) : H).toLocaleString();
    }
    return ln(U, (H) => {
      H === "true" || H === !0 ? A.rows.forEach(($) => {
        !L.value.includes($.id) && $.showInAction !== !1 && L.value.push($.id);
      }) : L.value = [], a("rowChecked", L.value);
    }), (H, $) => (h(), y("div", {
      class: We(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      p("table", {
        class: We(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        p("thead", null, [
          p("tr", {
            onClick: $[1] || ($[1] = (I) => G())
          }, [
            !o.collapseControls && !o.expandable ? (h(), y("th", {
              key: 0,
              class: "checkbox-container",
              style: kn(C.value)
            }, [
              o.selectable ? (h(), fe(w(vn), {
                key: 0,
                modelValue: U.value,
                "onUpdate:modelValue": $[0] || ($[0] = (I) => U.value = I)
              }, null, 8, ["modelValue"])) : B("", !0)
            ], 4)) : B("", !0),
            o.expandable ? (h(), y("th", {
              key: 1,
              class: We(["text-center", {
                expandable: o.expandable
              }]),
              style: kn(C.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), fe(w(Bt), {
                key: 0,
                class: "expand-icon",
                icon: V.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: V.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : B("", !0)
            ], 6)) : B("", !0),
            (h(!0), y(me, null, we(o.columns, (I) => (h(), y("th", {
              style: kn(C.value),
              key: I.id,
              onClick: (W) => xe(I),
              class: We({
                actions: I.key === "actions",
                active: k.value === I.key,
                sortable: o.sortable && I.key !== "actions" && I.type != "link",
                expandable: o.expandable
              })
            }, [
              I.key !== "actions" && I.type != "link" ? (h(), y(me, { key: 0 }, [
                tt(ie(I.value) + " ", 1),
                o.sortable ? (h(), fe(w(Bt), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : B("", !0)
              ], 64)) : B("", !0)
            ], 14, vh))), 128))
          ])
        ]),
        o.rows ? (h(), y("tbody", _h, [
          (h(!0), y(me, null, we(o.rows, (I) => (h(), y(me, null, [
            (h(!0), y(me, null, we(I.details, (W) => (h(), y(me, null, [
              o.expandable & V.value || Z(I) ? (h(), y("tr", {
                class: We({ expandable: o.expandable && W.details.length === 1 }),
                key: W.id,
                onClick: (oe) => ye(W.id)
              }, [
                p("td", Eh, [
                  W.details.length > 1 ? (h(), fe(w(Bt), {
                    key: 0,
                    class: "expand-icon",
                    icon: E.value[W.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: E.value[W.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : B("", !0)
                ]),
                (h(!0), y(me, null, we(o.columns, (oe) => (h(), y("td", {
                  style: kn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[oe.key] ? `${o.minWidthCell[oe.key]}px` : "0px"
                  }),
                  key: oe.key
                }, [
                  p("template", null, [
                    p("span", {
                      title: ve(W[oe.key].value || W[oe.key], oe.type)
                    }, ie(ve(W[oe.key], oe.type)), 9, Sh)
                  ])
                ], 4))), 128))
              ], 10, bh)) : B("", !0),
              W.details.length > 1 && E.value[W.id] ? (h(!0), y(me, { key: 1 }, we(W.details, (oe) => (h(), y("tr", {
                class: "subrow-details",
                key: oe.id
              }, [
                $[4] || ($[4] = p("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), y(me, null, we(o.columns, (Fe) => (h(), y("td", {
                  style: kn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Fe.key] ? `${o.minWidthCell[Fe.key]}px` : "0px"
                  }),
                  key: Fe.key
                }, [
                  p("template", null, [
                    p("span", {
                      title: ve(oe[Fe.key], Fe.type)
                    }, ie(ve(oe[Fe.key], Fe.type)), 9, Ah)
                  ])
                ], 4))), 128))
              ]))), 128)) : B("", !0)
            ], 64))), 256)),
            (o.expandable && I.details.length) > 1 || o.expandable && I.details[0].details.length > 1 || !o.expandable ? (h(), y("tr", {
              class: We({
                active: x.value.includes(I.id),
                static: I.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: F.value === I._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: I.id,
              onClick: (W) => K(I._id)
            }, [
              o.collapseControls ? B("", !0) : (h(), y("td", Ch, [
                o.selectable && I.showInAction !== !1 ? (h(), fe(w(vn), {
                  key: 0,
                  modelValue: x.value,
                  "onUpdate:modelValue": $[2] || ($[2] = (W) => x.value = W),
                  val: I.id,
                  onInput: $[3] || ($[3] = (W) => H.$emit(w(si).ROW_CHECKED, L.value))
                }, null, 8, ["modelValue", "val"])) : B("", !0)
              ])),
              (h(!0), y(me, null, we(o.columns, (W) => (h(), y("td", {
                class: We({
                  actions: W.key === "actions",
                  fixedActions: o.fixedActions && W.key === "actions"
                }),
                style: kn({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[W.key] ? `${o.minWidthCell[W.key]}px` : "0px"
                }),
                key: W.key,
                onKeydown: Fa((oe) => ge(oe, I, W), ["enter"]),
                onClick: (oe) => ge(oe, I, W)
              }, [
                I[W.key] !== void 0 && I[W.key] !== null && W.key !== "actions" ? (h(), y(me, { key: 0 }, [
                  I[W.key].icon ? (h(), y("img", {
                    key: 0,
                    alt: "",
                    src: I[W.key].icon,
                    class: We(W.key)
                  }, null, 10, Dh)) : I[W.key].biicon ? (h(), y("span", {
                    key: 1,
                    class: We(["table-bi-icon", I[W.key].biicon]),
                    style: kn({ color: I[W.key].color })
                  }, null, 6)) : B("", !0),
                  I[W.key].type ? (h(), fe(w(ih), {
                    key: 2,
                    "font-size": 12,
                    label: I[W.key].value,
                    color: I[W.key].color
                  }, null, 8, ["label", "color"])) : W.type === "link" ? ji(H.$slots, "linkHandler", {
                    key: 3,
                    link: { row: I, columnKey: W.key }
                  }, void 0, !0) : W.type === "number" ? (h(), y("span", Ih, ie(Ie(I[W.key])), 1)) : (h(), y("span", {
                    key: 5,
                    title: ve(I[W.key].value || I[W.key], W.type)
                  }, ie(ve(I[W.key], W.type)), 9, Lh))
                ], 64)) : B("", !0),
                W.key === "actions" ? ji(H.$slots, "actionButton", {
                  key: 1,
                  row: I
                }, void 0, !0) : B("", !0)
              ], 46, Th))), 128))
            ], 10, wh)) : B("", !0)
          ], 64))), 256))
        ])) : B("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), y("p", Bh, " No matches found ")) : B("", !0)
    ], 2));
  }
}, $h = /* @__PURE__ */ Qe(Fh, [["__scopeId", "data-v-b2e5eec6"]]);
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
    var a, A = "4.17.21", k = 200, U = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", P = "Expected a function", L = "Invalid `variable` option passed into `_.template`", F = "__lodash_hash_undefined__", V = 500, E = "__lodash_placeholder__", x = 1, C = 2, G = 4, Z = 1, ye = 2, K = 1, ge = 2, xe = 4, ve = 8, Ie = 16, H = 32, $ = 64, I = 128, W = 256, oe = 512, Fe = 30, Ne = "...", Ft = 800, un = 16, zt = 1, Un = 2, Wn = 3, Ht = 1 / 0, qe = 9007199254740991, te = 17976931348623157e292, q = NaN, T = 4294967295, ae = T - 1, yt = T >>> 1, At = [
      ["ary", I],
      ["bind", K],
      ["bindKey", ge],
      ["curry", ve],
      ["curryRight", Ie],
      ["flip", oe],
      ["partial", H],
      ["partialRight", $],
      ["rearg", W]
    ], kt = "[object Arguments]", $t = "[object Array]", Te = "[object AsyncFunction]", Qt = "[object Boolean]", Kt = "[object Date]", ir = "[object DOMException]", Sn = "[object Error]", Vt = "[object Function]", ui = "[object GeneratorFunction]", it = "[object Map]", Yt = "[object Number]", rr = "[object Null]", vt = "[object Object]", ci = "[object Promise]", ar = "[object Proxy]", X = "[object RegExp]", S = "[object Set]", M = "[object String]", Se = "[object Symbol]", R = "[object Undefined]", se = "[object WeakMap]", Zt = "[object WeakSet]", Nn = "[object ArrayBuffer]", An = "[object DataView]", sr = "[object Float32Array]", lr = "[object Float64Array]", or = "[object Int8Array]", ur = "[object Int16Array]", cr = "[object Int32Array]", dr = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", pr = "[object Uint16Array]", hr = "[object Uint32Array]", vl = /\b__p \+= '';/g, _l = /\b(__p \+=) '' \+/g, bl = /(__e\(.*?\)|\b__t\)) \+\n'';/g, $a = /&(?:amp|lt|gt|quot|#39);/g, Va = /[&<>"']/g, El = RegExp($a.source), Sl = RegExp(Va.source), Al = /<%-([\s\S]+?)%>/g, wl = /<%([\s\S]+?)%>/g, Oa = /<%=([\s\S]+?)%>/g, Cl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Tl = /^\w*$/, Dl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, Il = RegExp(mr.source), gr = /^\s+/, Ll = /\s/, Bl = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Fl = /\{\n\/\* \[wrapped with (.+)\] \*/, $l = /,? & /, Vl = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ol = /[()=,{}\[\]\/\s]/, Pl = /\\(\\)?/g, Rl = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Pa = /\w*$/, Gl = /^[-+]0x[0-9a-f]+$/i, Ml = /^0b[01]+$/i, Ul = /^\[object .+?Constructor\]$/, Wl = /^0o[0-7]+$/i, Nl = /^(?:0|[1-9]\d*)$/, ql = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, di = /($^)/, zl = /['\n\r\u2028\u2029\\]/g, fi = "\\ud800-\\udfff", Hl = "\\u0300-\\u036f", Ql = "\\ufe20-\\ufe2f", Kl = "\\u20d0-\\u20ff", Ra = Hl + Ql + Kl, Ga = "\\u2700-\\u27bf", Ma = "a-z\\xdf-\\xf6\\xf8-\\xff", Yl = "\\xac\\xb1\\xd7\\xf7", Zl = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Jl = "\\u2000-\\u206f", Xl = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ua = "A-Z\\xc0-\\xd6\\xd8-\\xde", Wa = "\\ufe0e\\ufe0f", Na = Yl + Zl + Jl + Xl, xr = "['’]", jl = "[" + fi + "]", qa = "[" + Na + "]", pi = "[" + Ra + "]", za = "\\d+", eo = "[" + Ga + "]", Ha = "[" + Ma + "]", Qa = "[^" + fi + Na + za + Ga + Ma + Ua + "]", yr = "\\ud83c[\\udffb-\\udfff]", to = "(?:" + pi + "|" + yr + ")", Ka = "[^" + fi + "]", kr = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", wn = "[" + Ua + "]", Ya = "\\u200d", Za = "(?:" + Ha + "|" + Qa + ")", no = "(?:" + wn + "|" + Qa + ")", Ja = "(?:" + xr + "(?:d|ll|m|re|s|t|ve))?", Xa = "(?:" + xr + "(?:D|LL|M|RE|S|T|VE))?", ja = to + "?", es = "[" + Wa + "]?", io = "(?:" + Ya + "(?:" + [Ka, kr, vr].join("|") + ")" + es + ja + ")*", ro = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", ao = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ts = es + ja + io, so = "(?:" + [eo, kr, vr].join("|") + ")" + ts, lo = "(?:" + [Ka + pi + "?", pi, kr, vr, jl].join("|") + ")", oo = RegExp(xr, "g"), uo = RegExp(pi, "g"), _r = RegExp(yr + "(?=" + yr + ")|" + lo + ts, "g"), co = RegExp([
      wn + "?" + Ha + "+" + Ja + "(?=" + [qa, wn, "$"].join("|") + ")",
      no + "+" + Xa + "(?=" + [qa, wn + Za, "$"].join("|") + ")",
      wn + "?" + Za + "+" + Ja,
      wn + "+" + Xa,
      ao,
      ro,
      za,
      so
    ].join("|"), "g"), fo = RegExp("[" + Ya + fi + Ra + Wa + "]"), po = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ho = [
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
    Ce[sr] = Ce[lr] = Ce[or] = Ce[ur] = Ce[cr] = Ce[dr] = Ce[fr] = Ce[pr] = Ce[hr] = !0, Ce[kt] = Ce[$t] = Ce[Nn] = Ce[Qt] = Ce[An] = Ce[Kt] = Ce[Sn] = Ce[Vt] = Ce[it] = Ce[Yt] = Ce[vt] = Ce[X] = Ce[S] = Ce[M] = Ce[se] = !1;
    var Ae = {};
    Ae[kt] = Ae[$t] = Ae[Nn] = Ae[An] = Ae[Qt] = Ae[Kt] = Ae[sr] = Ae[lr] = Ae[or] = Ae[ur] = Ae[cr] = Ae[it] = Ae[Yt] = Ae[vt] = Ae[X] = Ae[S] = Ae[M] = Ae[Se] = Ae[dr] = Ae[fr] = Ae[pr] = Ae[hr] = !0, Ae[Sn] = Ae[Vt] = Ae[se] = !1;
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
    }, vo = parseFloat, _o = parseInt, ns = typeof ai == "object" && ai && ai.Object === Object && ai, bo = typeof self == "object" && self && self.Object === Object && self, Me = ns || bo || Function("return this")(), br = D && !D.nodeType && D, cn = br && !0 && o && !o.nodeType && o, is = cn && cn.exports === br, Er = is && ns.process, ct = function() {
      try {
        var d = cn && cn.require && cn.require("util").types;
        return d || Er && Er.binding && Er.binding("util");
      } catch {
      }
    }(), rs = ct && ct.isArrayBuffer, as = ct && ct.isDate, ss = ct && ct.isMap, ls = ct && ct.isRegExp, os = ct && ct.isSet, us = ct && ct.isTypedArray;
    function rt(d, g, m) {
      switch (m.length) {
        case 0:
          return d.call(g);
        case 1:
          return d.call(g, m[0]);
        case 2:
          return d.call(g, m[0], m[1]);
        case 3:
          return d.call(g, m[0], m[1], m[2]);
      }
      return d.apply(g, m);
    }
    function Eo(d, g, m, N) {
      for (var ne = -1, ke = d == null ? 0 : d.length; ++ne < ke; ) {
        var Pe = d[ne];
        g(N, Pe, m(Pe), d);
      }
      return N;
    }
    function dt(d, g) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N && g(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function So(d, g) {
      for (var m = d == null ? 0 : d.length; m-- && g(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function cs(d, g) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N; )
        if (!g(d[m], m, d))
          return !1;
      return !0;
    }
    function Jt(d, g) {
      for (var m = -1, N = d == null ? 0 : d.length, ne = 0, ke = []; ++m < N; ) {
        var Pe = d[m];
        g(Pe, m, d) && (ke[ne++] = Pe);
      }
      return ke;
    }
    function hi(d, g) {
      var m = d == null ? 0 : d.length;
      return !!m && Cn(d, g, 0) > -1;
    }
    function Sr(d, g, m) {
      for (var N = -1, ne = d == null ? 0 : d.length; ++N < ne; )
        if (m(g, d[N]))
          return !0;
      return !1;
    }
    function De(d, g) {
      for (var m = -1, N = d == null ? 0 : d.length, ne = Array(N); ++m < N; )
        ne[m] = g(d[m], m, d);
      return ne;
    }
    function Xt(d, g) {
      for (var m = -1, N = g.length, ne = d.length; ++m < N; )
        d[ne + m] = g[m];
      return d;
    }
    function Ar(d, g, m, N) {
      var ne = -1, ke = d == null ? 0 : d.length;
      for (N && ke && (m = d[++ne]); ++ne < ke; )
        m = g(m, d[ne], ne, d);
      return m;
    }
    function Ao(d, g, m, N) {
      var ne = d == null ? 0 : d.length;
      for (N && ne && (m = d[--ne]); ne--; )
        m = g(m, d[ne], ne, d);
      return m;
    }
    function wr(d, g) {
      for (var m = -1, N = d == null ? 0 : d.length; ++m < N; )
        if (g(d[m], m, d))
          return !0;
      return !1;
    }
    var wo = Cr("length");
    function Co(d) {
      return d.split("");
    }
    function To(d) {
      return d.match(Vl) || [];
    }
    function ds(d, g, m) {
      var N;
      return m(d, function(ne, ke, Pe) {
        if (g(ne, ke, Pe))
          return N = ke, !1;
      }), N;
    }
    function mi(d, g, m, N) {
      for (var ne = d.length, ke = m + (N ? 1 : -1); N ? ke-- : ++ke < ne; )
        if (g(d[ke], ke, d))
          return ke;
      return -1;
    }
    function Cn(d, g, m) {
      return g === g ? Mo(d, g, m) : mi(d, fs, m);
    }
    function Do(d, g, m, N) {
      for (var ne = m - 1, ke = d.length; ++ne < ke; )
        if (N(d[ne], g))
          return ne;
      return -1;
    }
    function fs(d) {
      return d !== d;
    }
    function ps(d, g) {
      var m = d == null ? 0 : d.length;
      return m ? Dr(d, g) / m : q;
    }
    function Cr(d) {
      return function(g) {
        return g == null ? a : g[d];
      };
    }
    function Tr(d) {
      return function(g) {
        return d == null ? a : d[g];
      };
    }
    function hs(d, g, m, N, ne) {
      return ne(d, function(ke, Pe, Ee) {
        m = N ? (N = !1, ke) : g(m, ke, Pe, Ee);
      }), m;
    }
    function Io(d, g) {
      var m = d.length;
      for (d.sort(g); m--; )
        d[m] = d[m].value;
      return d;
    }
    function Dr(d, g) {
      for (var m, N = -1, ne = d.length; ++N < ne; ) {
        var ke = g(d[N]);
        ke !== a && (m = m === a ? ke : m + ke);
      }
      return m;
    }
    function Ir(d, g) {
      for (var m = -1, N = Array(d); ++m < d; )
        N[m] = g(m);
      return N;
    }
    function Lo(d, g) {
      return De(g, function(m) {
        return [m, d[m]];
      });
    }
    function ms(d) {
      return d && d.slice(0, ks(d) + 1).replace(gr, "");
    }
    function at(d) {
      return function(g) {
        return d(g);
      };
    }
    function Lr(d, g) {
      return De(g, function(m) {
        return d[m];
      });
    }
    function qn(d, g) {
      return d.has(g);
    }
    function gs(d, g) {
      for (var m = -1, N = d.length; ++m < N && Cn(g, d[m], 0) > -1; )
        ;
      return m;
    }
    function xs(d, g) {
      for (var m = d.length; m-- && Cn(g, d[m], 0) > -1; )
        ;
      return m;
    }
    function Bo(d, g) {
      for (var m = d.length, N = 0; m--; )
        d[m] === g && ++N;
      return N;
    }
    var Fo = Tr(go), $o = Tr(xo);
    function Vo(d) {
      return "\\" + ko[d];
    }
    function Oo(d, g) {
      return d == null ? a : d[g];
    }
    function Tn(d) {
      return fo.test(d);
    }
    function Po(d) {
      return po.test(d);
    }
    function Ro(d) {
      for (var g, m = []; !(g = d.next()).done; )
        m.push(g.value);
      return m;
    }
    function Br(d) {
      var g = -1, m = Array(d.size);
      return d.forEach(function(N, ne) {
        m[++g] = [ne, N];
      }), m;
    }
    function ys(d, g) {
      return function(m) {
        return d(g(m));
      };
    }
    function jt(d, g) {
      for (var m = -1, N = d.length, ne = 0, ke = []; ++m < N; ) {
        var Pe = d[m];
        (Pe === g || Pe === E) && (d[m] = E, ke[ne++] = m);
      }
      return ke;
    }
    function gi(d) {
      var g = -1, m = Array(d.size);
      return d.forEach(function(N) {
        m[++g] = N;
      }), m;
    }
    function Go(d) {
      var g = -1, m = Array(d.size);
      return d.forEach(function(N) {
        m[++g] = [N, N];
      }), m;
    }
    function Mo(d, g, m) {
      for (var N = m - 1, ne = d.length; ++N < ne; )
        if (d[N] === g)
          return N;
      return -1;
    }
    function Uo(d, g, m) {
      for (var N = m + 1; N--; )
        if (d[N] === g)
          return N;
      return N;
    }
    function Dn(d) {
      return Tn(d) ? No(d) : wo(d);
    }
    function _t(d) {
      return Tn(d) ? qo(d) : Co(d);
    }
    function ks(d) {
      for (var g = d.length; g-- && Ll.test(d.charAt(g)); )
        ;
      return g;
    }
    var Wo = Tr(yo);
    function No(d) {
      for (var g = _r.lastIndex = 0; _r.test(d); )
        ++g;
      return g;
    }
    function qo(d) {
      return d.match(_r) || [];
    }
    function zo(d) {
      return d.match(co) || [];
    }
    var Ho = function d(g) {
      g = g == null ? Me : In.defaults(Me.Object(), g, In.pick(Me, ho));
      var m = g.Array, N = g.Date, ne = g.Error, ke = g.Function, Pe = g.Math, Ee = g.Object, Fr = g.RegExp, Qo = g.String, ft = g.TypeError, xi = m.prototype, Ko = ke.prototype, Ln = Ee.prototype, yi = g["__core-js_shared__"], ki = Ko.toString, be = Ln.hasOwnProperty, Yo = 0, vs = function() {
        var e = /[^.]+$/.exec(yi && yi.keys && yi.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), vi = Ln.toString, Zo = ki.call(Ee), Jo = Me._, Xo = Fr(
        "^" + ki.call(be).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), _i = is ? g.Buffer : a, en = g.Symbol, bi = g.Uint8Array, _s = _i ? _i.allocUnsafe : a, Ei = ys(Ee.getPrototypeOf, Ee), bs = Ee.create, Es = Ln.propertyIsEnumerable, Si = xi.splice, Ss = en ? en.isConcatSpreadable : a, zn = en ? en.iterator : a, dn = en ? en.toStringTag : a, Ai = function() {
        try {
          var e = gn(Ee, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), jo = g.clearTimeout !== Me.clearTimeout && g.clearTimeout, eu = N && N.now !== Me.Date.now && N.now, tu = g.setTimeout !== Me.setTimeout && g.setTimeout, wi = Pe.ceil, Ci = Pe.floor, $r = Ee.getOwnPropertySymbols, nu = _i ? _i.isBuffer : a, As = g.isFinite, iu = xi.join, ru = ys(Ee.keys, Ee), Re = Pe.max, ze = Pe.min, au = N.now, su = g.parseInt, ws = Pe.random, lu = xi.reverse, Vr = gn(g, "DataView"), Hn = gn(g, "Map"), Or = gn(g, "Promise"), Bn = gn(g, "Set"), Qn = gn(g, "WeakMap"), Kn = gn(Ee, "create"), Ti = Qn && new Qn(), Fn = {}, ou = xn(Vr), uu = xn(Hn), cu = xn(Or), du = xn(Bn), fu = xn(Qn), Di = en ? en.prototype : a, Yn = Di ? Di.valueOf : a, Cs = Di ? Di.toString : a;
      function s(e) {
        if (Be(e) && !re(e) && !(e instanceof pe)) {
          if (e instanceof pt)
            return e;
          if (be.call(e, "__wrapped__"))
            return T0(e);
        }
        return new pt(e);
      }
      var $n = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!Le(t))
            return {};
          if (bs)
            return bs(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = a, n;
        };
      }();
      function Ii() {
      }
      function pt(e, t) {
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
      }, s.prototype = Ii.prototype, s.prototype.constructor = s, pt.prototype = $n(Ii.prototype), pt.prototype.constructor = pt;
      function pe(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = T, this.__views__ = [];
      }
      function pu() {
        var e = new pe(this.__wrapped__);
        return e.__actions__ = Je(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Je(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Je(this.__views__), e;
      }
      function hu() {
        if (this.__filtered__) {
          var e = new pe(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function mu() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = re(e), i = t < 0, r = n ? e.length : 0, l = C1(0, r, this.__views__), u = l.start, c = l.end, f = c - u, v = i ? c : u - 1, _ = this.__iteratees__, b = _.length, O = 0, Q = ze(f, this.__takeCount__);
        if (!n || !i && r == f && Q == f)
          return Js(e, this.__actions__);
        var j = [];
        e:
          for (; f-- && O < Q; ) {
            v += t;
            for (var ue = -1, ee = e[v]; ++ue < b; ) {
              var de = _[ue], he = de.iteratee, ot = de.type, Ze = he(ee);
              if (ot == Un)
                ee = Ze;
              else if (!Ze) {
                if (ot == zt)
                  continue e;
                break e;
              }
            }
            j[O++] = ee;
          }
        return j;
      }
      pe.prototype = $n(Ii.prototype), pe.prototype.constructor = pe;
      function fn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function gu() {
        this.__data__ = Kn ? Kn(null) : {}, this.size = 0;
      }
      function xu(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function yu(e) {
        var t = this.__data__;
        if (Kn) {
          var n = t[e];
          return n === F ? a : n;
        }
        return be.call(t, e) ? t[e] : a;
      }
      function ku(e) {
        var t = this.__data__;
        return Kn ? t[e] !== a : be.call(t, e);
      }
      function vu(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Kn && t === a ? F : t, this;
      }
      fn.prototype.clear = gu, fn.prototype.delete = xu, fn.prototype.get = yu, fn.prototype.has = ku, fn.prototype.set = vu;
      function Ot(e) {
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
      Ot.prototype.clear = _u, Ot.prototype.delete = bu, Ot.prototype.get = Eu, Ot.prototype.has = Su, Ot.prototype.set = Au;
      function Pt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function wu() {
        this.size = 0, this.__data__ = {
          hash: new fn(),
          map: new (Hn || Ot)(),
          string: new fn()
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
      Pt.prototype.clear = wu, Pt.prototype.delete = Cu, Pt.prototype.get = Tu, Pt.prototype.has = Du, Pt.prototype.set = Iu;
      function pn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Pt(); ++t < n; )
          this.add(e[t]);
      }
      function Lu(e) {
        return this.__data__.set(e, F), this;
      }
      function Bu(e) {
        return this.__data__.has(e);
      }
      pn.prototype.add = pn.prototype.push = Lu, pn.prototype.has = Bu;
      function bt(e) {
        var t = this.__data__ = new Ot(e);
        this.size = t.size;
      }
      function Fu() {
        this.__data__ = new Ot(), this.size = 0;
      }
      function $u(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function Vu(e) {
        return this.__data__.get(e);
      }
      function Ou(e) {
        return this.__data__.has(e);
      }
      function Pu(e, t) {
        var n = this.__data__;
        if (n instanceof Ot) {
          var i = n.__data__;
          if (!Hn || i.length < k - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Pt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      bt.prototype.clear = Fu, bt.prototype.delete = $u, bt.prototype.get = Vu, bt.prototype.has = Ou, bt.prototype.set = Pu;
      function Ts(e, t) {
        var n = re(e), i = !n && yn(e), r = !n && !i && sn(e), l = !n && !i && !r && Rn(e), u = n || i || r || l, c = u ? Ir(e.length, Qo) : [], f = c.length;
        for (var v in e)
          (t || be.call(e, v)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
          Ut(v, f))) && c.push(v);
        return c;
      }
      function Ds(e) {
        var t = e.length;
        return t ? e[Qr(0, t - 1)] : a;
      }
      function Ru(e, t) {
        return qi(Je(e), hn(t, 0, e.length));
      }
      function Gu(e) {
        return qi(Je(e));
      }
      function Pr(e, t, n) {
        (n !== a && !Et(e[t], n) || n === a && !(t in e)) && Rt(e, t, n);
      }
      function Zn(e, t, n) {
        var i = e[t];
        (!(be.call(e, t) && Et(i, n)) || n === a && !(t in e)) && Rt(e, t, n);
      }
      function Li(e, t) {
        for (var n = e.length; n--; )
          if (Et(e[n][0], t))
            return n;
        return -1;
      }
      function Mu(e, t, n, i) {
        return tn(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Is(e, t) {
        return e && Ct(t, Ge(t), e);
      }
      function Uu(e, t) {
        return e && Ct(t, je(t), e);
      }
      function Rt(e, t, n) {
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
      function hn(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function ht(e, t, n, i, r, l) {
        var u, c = t & x, f = t & C, v = t & G;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!Le(e))
          return e;
        var _ = re(e);
        if (_) {
          if (u = D1(e), !c)
            return Je(e, u);
        } else {
          var b = He(e), O = b == Vt || b == ui;
          if (sn(e))
            return e0(e, c);
          if (b == vt || b == kt || O && !r) {
            if (u = f || O ? {} : k0(e), !c)
              return f ? y1(e, Uu(u, e)) : x1(e, Is(u, e));
          } else {
            if (!Ae[b])
              return r ? e : {};
            u = I1(e, b, c);
          }
        }
        l || (l = new bt());
        var Q = l.get(e);
        if (Q)
          return Q;
        l.set(e, u), K0(e) ? e.forEach(function(ee) {
          u.add(ht(ee, t, n, ee, e, l));
        }) : H0(e) && e.forEach(function(ee, de) {
          u.set(de, ht(ee, t, n, de, e, l));
        });
        var j = v ? f ? ra : ia : f ? je : Ge, ue = _ ? a : j(e);
        return dt(ue || e, function(ee, de) {
          ue && (de = ee, ee = e[de]), Zn(u, de, ht(ee, t, n, de, e, l));
        }), u;
      }
      function Wu(e) {
        var t = Ge(e);
        return function(n) {
          return Ls(n, e, t);
        };
      }
      function Ls(e, t, n) {
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
      function Bs(e, t, n) {
        if (typeof e != "function")
          throw new ft(P);
        return ii(function() {
          e.apply(a, n);
        }, t);
      }
      function Jn(e, t, n, i) {
        var r = -1, l = hi, u = !0, c = e.length, f = [], v = t.length;
        if (!c)
          return f;
        n && (t = De(t, at(n))), i ? (l = Sr, u = !1) : t.length >= k && (l = qn, u = !1, t = new pn(t));
        e:
          for (; ++r < c; ) {
            var _ = e[r], b = n == null ? _ : n(_);
            if (_ = i || _ !== 0 ? _ : 0, u && b === b) {
              for (var O = v; O--; )
                if (t[O] === b)
                  continue e;
              f.push(_);
            } else
              l(t, b, i) || f.push(_);
          }
        return f;
      }
      var tn = a0(wt), Fs = a0(Mr, !0);
      function Nu(e, t) {
        var n = !0;
        return tn(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Bi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !lt(u) : n(u, c)))
            var c = u, f = l;
        }
        return f;
      }
      function qu(e, t, n, i) {
        var r = e.length;
        for (n = le(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : le(i), i < 0 && (i += r), i = n > i ? 0 : Z0(i); n < i; )
          e[n++] = t;
        return e;
      }
      function $s(e, t) {
        var n = [];
        return tn(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function Ue(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = B1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? Ue(c, t - 1, n, i, r) : Xt(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Gr = s0(), Vs = s0(!0);
      function wt(e, t) {
        return e && Gr(e, t, Ge);
      }
      function Mr(e, t) {
        return e && Vs(e, t, Ge);
      }
      function Fi(e, t) {
        return Jt(t, function(n) {
          return Wt(e[n]);
        });
      }
      function mn(e, t) {
        t = rn(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[Tt(t[n++])];
        return n && n == i ? e : a;
      }
      function Os(e, t, n) {
        var i = t(e);
        return re(e) ? i : Xt(i, n(e));
      }
      function Ke(e) {
        return e == null ? e === a ? R : rr : dn && dn in Ee(e) ? w1(e) : G1(e);
      }
      function Ur(e, t) {
        return e > t;
      }
      function zu(e, t) {
        return e != null && be.call(e, t);
      }
      function Hu(e, t) {
        return e != null && t in Ee(e);
      }
      function Qu(e, t, n) {
        return e >= ze(t, n) && e < Re(t, n);
      }
      function Wr(e, t, n) {
        for (var i = n ? Sr : hi, r = e[0].length, l = e.length, u = l, c = m(l), f = 1 / 0, v = []; u--; ) {
          var _ = e[u];
          u && t && (_ = De(_, at(t))), f = ze(_.length, f), c[u] = !n && (t || r >= 120 && _.length >= 120) ? new pn(u && _) : a;
        }
        _ = e[0];
        var b = -1, O = c[0];
        e:
          for (; ++b < r && v.length < f; ) {
            var Q = _[b], j = t ? t(Q) : Q;
            if (Q = n || Q !== 0 ? Q : 0, !(O ? qn(O, j) : i(v, j, n))) {
              for (u = l; --u; ) {
                var ue = c[u];
                if (!(ue ? qn(ue, j) : i(e[u], j, n)))
                  continue e;
              }
              O && O.push(j), v.push(Q);
            }
          }
        return v;
      }
      function Ku(e, t, n, i) {
        return wt(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function Xn(e, t, n) {
        t = rn(t, e), e = E0(e, t);
        var i = e == null ? e : e[Tt(gt(t))];
        return i == null ? a : rt(i, e, n);
      }
      function Ps(e) {
        return Be(e) && Ke(e) == kt;
      }
      function Yu(e) {
        return Be(e) && Ke(e) == Nn;
      }
      function Zu(e) {
        return Be(e) && Ke(e) == Kt;
      }
      function jn(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Be(e) && !Be(t) ? e !== e && t !== t : Ju(e, t, n, i, jn, r);
      }
      function Ju(e, t, n, i, r, l) {
        var u = re(e), c = re(t), f = u ? $t : He(e), v = c ? $t : He(t);
        f = f == kt ? vt : f, v = v == kt ? vt : v;
        var _ = f == vt, b = v == vt, O = f == v;
        if (O && sn(e)) {
          if (!sn(t))
            return !1;
          u = !0, _ = !1;
        }
        if (O && !_)
          return l || (l = new bt()), u || Rn(e) ? g0(e, t, n, i, r, l) : S1(e, t, f, n, i, r, l);
        if (!(n & Z)) {
          var Q = _ && be.call(e, "__wrapped__"), j = b && be.call(t, "__wrapped__");
          if (Q || j) {
            var ue = Q ? e.value() : e, ee = j ? t.value() : t;
            return l || (l = new bt()), r(ue, ee, n, i, l);
          }
        }
        return O ? (l || (l = new bt()), A1(e, t, n, i, r, l)) : !1;
      }
      function Xu(e) {
        return Be(e) && He(e) == it;
      }
      function Nr(e, t, n, i) {
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
          var f = c[0], v = e[f], _ = c[1];
          if (u && c[2]) {
            if (v === a && !(f in e))
              return !1;
          } else {
            var b = new bt();
            if (i)
              var O = i(v, _, f, e, t, b);
            if (!(O === a ? jn(_, v, Z | ye, i, b) : O))
              return !1;
          }
        }
        return !0;
      }
      function Rs(e) {
        if (!Le(e) || $1(e))
          return !1;
        var t = Wt(e) ? Xo : Ul;
        return t.test(xn(e));
      }
      function ju(e) {
        return Be(e) && Ke(e) == X;
      }
      function e1(e) {
        return Be(e) && He(e) == S;
      }
      function t1(e) {
        return Be(e) && Zi(e.length) && !!Ce[Ke(e)];
      }
      function Gs(e) {
        return typeof e == "function" ? e : e == null ? et : typeof e == "object" ? re(e) ? Ws(e[0], e[1]) : Us(e) : ll(e);
      }
      function qr(e) {
        if (!ni(e))
          return ru(e);
        var t = [];
        for (var n in Ee(e))
          be.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function n1(e) {
        if (!Le(e))
          return R1(e);
        var t = ni(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !be.call(e, i)) || n.push(i);
        return n;
      }
      function zr(e, t) {
        return e < t;
      }
      function Ms(e, t) {
        var n = -1, i = Xe(e) ? m(e.length) : [];
        return tn(e, function(r, l, u) {
          i[++n] = t(r, l, u);
        }), i;
      }
      function Us(e) {
        var t = sa(e);
        return t.length == 1 && t[0][2] ? _0(t[0][0], t[0][1]) : function(n) {
          return n === e || Nr(n, e, t);
        };
      }
      function Ws(e, t) {
        return oa(e) && v0(t) ? _0(Tt(e), t) : function(n) {
          var i = ya(n, e);
          return i === a && i === t ? ka(n, e) : jn(t, i, Z | ye);
        };
      }
      function $i(e, t, n, i, r) {
        e !== t && Gr(t, function(l, u) {
          if (r || (r = new bt()), Le(l))
            i1(e, t, u, n, $i, i, r);
          else {
            var c = i ? i(ca(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Pr(e, u, c);
          }
        }, je);
      }
      function i1(e, t, n, i, r, l, u) {
        var c = ca(e, n), f = ca(t, n), v = u.get(f);
        if (v) {
          Pr(e, n, v);
          return;
        }
        var _ = l ? l(c, f, n + "", e, t, u) : a, b = _ === a;
        if (b) {
          var O = re(f), Q = !O && sn(f), j = !O && !Q && Rn(f);
          _ = f, O || Q || j ? re(c) ? _ = c : $e(c) ? _ = Je(c) : Q ? (b = !1, _ = e0(f, !0)) : j ? (b = !1, _ = t0(f, !0)) : _ = [] : ri(f) || yn(f) ? (_ = c, yn(c) ? _ = J0(c) : (!Le(c) || Wt(c)) && (_ = k0(f))) : b = !1;
        }
        b && (u.set(f, _), r(_, f, i, l, u), u.delete(f)), Pr(e, n, _);
      }
      function Ns(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, Ut(t, n) ? e[t] : a;
      }
      function qs(e, t, n) {
        t.length ? t = De(t, function(l) {
          return re(l) ? function(u) {
            return mn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [et];
        var i = -1;
        t = De(t, at(J()));
        var r = Ms(e, function(l, u, c) {
          var f = De(t, function(v) {
            return v(l);
          });
          return { criteria: f, index: ++i, value: l };
        });
        return Io(r, function(l, u) {
          return g1(l, u, n);
        });
      }
      function r1(e, t) {
        return zs(e, t, function(n, i) {
          return ka(e, i);
        });
      }
      function zs(e, t, n) {
        for (var i = -1, r = t.length, l = {}; ++i < r; ) {
          var u = t[i], c = mn(e, u);
          n(c, u) && ei(l, rn(u, e), c);
        }
        return l;
      }
      function a1(e) {
        return function(t) {
          return mn(t, e);
        };
      }
      function Hr(e, t, n, i) {
        var r = i ? Do : Cn, l = -1, u = t.length, c = e;
        for (e === t && (t = Je(t)), n && (c = De(e, at(n))); ++l < u; )
          for (var f = 0, v = t[l], _ = n ? n(v) : v; (f = r(c, _, f, i)) > -1; )
            c !== e && Si.call(c, f, 1), Si.call(e, f, 1);
        return e;
      }
      function Hs(e, t) {
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
        return e + Ci(ws() * (t - e + 1));
      }
      function s1(e, t, n, i) {
        for (var r = -1, l = Re(wi((t - e) / (n || 1)), 0), u = m(l); l--; )
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
      function ce(e, t) {
        return da(b0(e, t, et), e + "");
      }
      function l1(e) {
        return Ds(Gn(e));
      }
      function o1(e, t) {
        var n = Gn(e);
        return qi(n, hn(t, 0, n.length));
      }
      function ei(e, t, n, i) {
        if (!Le(e))
          return e;
        t = rn(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var f = Tt(t[r]), v = n;
          if (f === "__proto__" || f === "constructor" || f === "prototype")
            return e;
          if (r != u) {
            var _ = c[f];
            v = i ? i(_, f, c) : a, v === a && (v = Le(_) ? _ : Ut(t[r + 1]) ? [] : {});
          }
          Zn(c, f, v), c = c[f];
        }
        return e;
      }
      var Qs = Ti ? function(e, t) {
        return Ti.set(e, t), e;
      } : et, u1 = Ai ? function(e, t) {
        return Ai(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: _a(t),
          writable: !0
        });
      } : et;
      function c1(e) {
        return qi(Gn(e));
      }
      function mt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = m(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function d1(e, t) {
        var n;
        return tn(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function Vi(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= yt) {
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
        for (var u = t !== t, c = t === null, f = lt(t), v = t === a; r < l; ) {
          var _ = Ci((r + l) / 2), b = n(e[_]), O = b !== a, Q = b === null, j = b === b, ue = lt(b);
          if (u)
            var ee = i || j;
          else
            v ? ee = j && (i || O) : c ? ee = j && O && (i || !Q) : f ? ee = j && O && !Q && (i || !ue) : Q || ue ? ee = !1 : ee = i ? b <= t : b < t;
          ee ? r = _ + 1 : l = _;
        }
        return ze(l, ae);
      }
      function Ks(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !Et(c, f)) {
            var f = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Ys(e) {
        return typeof e == "number" ? e : lt(e) ? q : +e;
      }
      function st(e) {
        if (typeof e == "string")
          return e;
        if (re(e))
          return De(e, st) + "";
        if (lt(e))
          return Cs ? Cs.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function nn(e, t, n) {
        var i = -1, r = hi, l = e.length, u = !0, c = [], f = c;
        if (n)
          u = !1, r = Sr;
        else if (l >= k) {
          var v = t ? null : b1(e);
          if (v)
            return gi(v);
          u = !1, r = qn, f = new pn();
        } else
          f = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var _ = e[i], b = t ? t(_) : _;
            if (_ = n || _ !== 0 ? _ : 0, u && b === b) {
              for (var O = f.length; O--; )
                if (f[O] === b)
                  continue e;
              t && f.push(b), c.push(_);
            } else
              r(f, b, n) || (f !== c && f.push(b), c.push(_));
          }
        return c;
      }
      function Zr(e, t) {
        return t = rn(t, e), e = E0(e, t), e == null || delete e[Tt(gt(t))];
      }
      function Zs(e, t, n, i) {
        return ei(e, t, n(mn(e, t)), i);
      }
      function Oi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? mt(e, i ? 0 : l, i ? l + 1 : r) : mt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Js(e, t) {
        var n = e;
        return n instanceof pe && (n = n.value()), Ar(t, function(i, r) {
          return r.func.apply(r.thisArg, Xt([i], r.args));
        }, n);
      }
      function Jr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? nn(e[0]) : [];
        for (var r = -1, l = m(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = Jn(l[r] || u, e[c], t, n));
        return nn(Ue(l, 1), t, n);
      }
      function Xs(e, t, n) {
        for (var i = -1, r = e.length, l = t.length, u = {}; ++i < r; ) {
          var c = i < l ? t[i] : a;
          n(u, e[i], c);
        }
        return u;
      }
      function Xr(e) {
        return $e(e) ? e : [];
      }
      function jr(e) {
        return typeof e == "function" ? e : et;
      }
      function rn(e, t) {
        return re(e) ? e : oa(e, t) ? [e] : C0(_e(e));
      }
      var f1 = ce;
      function an(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : mt(e, t, n);
      }
      var js = jo || function(e) {
        return Me.clearTimeout(e);
      };
      function e0(e, t) {
        if (t)
          return e.slice();
        var n = e.length, i = _s ? _s(n) : new e.constructor(n);
        return e.copy(i), i;
      }
      function ea(e) {
        var t = new e.constructor(e.byteLength);
        return new bi(t).set(new bi(e)), t;
      }
      function p1(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function h1(e) {
        var t = new e.constructor(e.source, Pa.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function m1(e) {
        return Yn ? Ee(Yn.call(e)) : {};
      }
      function t0(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function n0(e, t) {
        if (e !== t) {
          var n = e !== a, i = e === null, r = e === e, l = lt(e), u = t !== a, c = t === null, f = t === t, v = lt(t);
          if (!c && !v && !l && e > t || l && u && f && !c && !v || i && u && f || !n && f || !r)
            return 1;
          if (!i && !l && !v && e < t || v && n && r && !i && !l || c && n && r || !u && r || !f)
            return -1;
        }
        return 0;
      }
      function g1(e, t, n) {
        for (var i = -1, r = e.criteria, l = t.criteria, u = r.length, c = n.length; ++i < u; ) {
          var f = n0(r[i], l[i]);
          if (f) {
            if (i >= c)
              return f;
            var v = n[i];
            return f * (v == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function i0(e, t, n, i) {
        for (var r = -1, l = e.length, u = n.length, c = -1, f = t.length, v = Re(l - u, 0), _ = m(f + v), b = !i; ++c < f; )
          _[c] = t[c];
        for (; ++r < u; )
          (b || r < l) && (_[n[r]] = e[r]);
        for (; v--; )
          _[c++] = e[r++];
        return _;
      }
      function r0(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, f = -1, v = t.length, _ = Re(l - c, 0), b = m(_ + v), O = !i; ++r < _; )
          b[r] = e[r];
        for (var Q = r; ++f < v; )
          b[Q + f] = t[f];
        for (; ++u < c; )
          (O || r < l) && (b[Q + n[u]] = e[r++]);
        return b;
      }
      function Je(e, t) {
        var n = -1, i = e.length;
        for (t || (t = m(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function Ct(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], f = i ? i(n[c], e[c], c, n, e) : a;
          f === a && (f = e[c]), r ? Rt(n, c, f) : Zn(n, c, f);
        }
        return n;
      }
      function x1(e, t) {
        return Ct(e, la(e), t);
      }
      function y1(e, t) {
        return Ct(e, x0(e), t);
      }
      function Pi(e, t) {
        return function(n, i) {
          var r = re(n) ? Eo : Mu, l = t ? t() : {};
          return r(n, e, J(i, 2), l);
        };
      }
      function Vn(e) {
        return ce(function(t, n) {
          var i = -1, r = n.length, l = r > 1 ? n[r - 1] : a, u = r > 2 ? n[2] : a;
          for (l = e.length > 3 && typeof l == "function" ? (r--, l) : a, u && Ye(n[0], n[1], u) && (l = r < 3 ? a : l, r = 1), t = Ee(t); ++i < r; ) {
            var c = n[i];
            c && e(t, c, i, l);
          }
          return t;
        });
      }
      function a0(e, t) {
        return function(n, i) {
          if (n == null)
            return n;
          if (!Xe(n))
            return e(n, i);
          for (var r = n.length, l = t ? r : -1, u = Ee(n); (t ? l-- : ++l < r) && i(u[l], l, u) !== !1; )
            ;
          return n;
        };
      }
      function s0(e) {
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
        var i = t & K, r = ti(e);
        function l() {
          var u = this && this !== Me && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function l0(e) {
        return function(t) {
          t = _e(t);
          var n = Tn(t) ? _t(t) : a, i = n ? n[0] : t.charAt(0), r = n ? an(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function On(e) {
        return function(t) {
          return Ar(al(rl(t).replace(oo, "")), e, "");
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
          var n = $n(e.prototype), i = e.apply(n, t);
          return Le(i) ? i : n;
        };
      }
      function v1(e, t, n) {
        var i = ti(e);
        function r() {
          for (var l = arguments.length, u = m(l), c = l, f = Pn(r); c--; )
            u[c] = arguments[c];
          var v = l < 3 && u[0] !== f && u[l - 1] !== f ? [] : jt(u, f);
          if (l -= v.length, l < n)
            return f0(
              e,
              t,
              Ri,
              r.placeholder,
              a,
              u,
              v,
              a,
              a,
              n - l
            );
          var _ = this && this !== Me && this instanceof r ? i : e;
          return rt(_, this, u);
        }
        return r;
      }
      function o0(e) {
        return function(t, n, i) {
          var r = Ee(t);
          if (!Xe(t)) {
            var l = J(n, 3);
            t = Ge(t), n = function(c) {
              return l(r[c], c, r);
            };
          }
          var u = e(t, n, i);
          return u > -1 ? r[l ? t[u] : u] : a;
        };
      }
      function u0(e) {
        return Mt(function(t) {
          var n = t.length, i = n, r = pt.prototype.thru;
          for (e && t.reverse(); i--; ) {
            var l = t[i];
            if (typeof l != "function")
              throw new ft(P);
            if (r && !u && Wi(l) == "wrapper")
              var u = new pt([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Wi(l), f = c == "wrapper" ? aa(l) : a;
            f && ua(f[0]) && f[1] == (I | ve | H | W) && !f[4].length && f[9] == 1 ? u = u[Wi(f[0])].apply(u, f[3]) : u = l.length == 1 && ua(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var v = arguments, _ = v[0];
            if (u && v.length == 1 && re(_))
              return u.plant(_).value();
            for (var b = 0, O = n ? t[b].apply(this, v) : _; ++b < n; )
              O = t[b].call(this, O);
            return O;
          };
        });
      }
      function Ri(e, t, n, i, r, l, u, c, f, v) {
        var _ = t & I, b = t & K, O = t & ge, Q = t & (ve | Ie), j = t & oe, ue = O ? a : ti(e);
        function ee() {
          for (var de = arguments.length, he = m(de), ot = de; ot--; )
            he[ot] = arguments[ot];
          if (Q)
            var Ze = Pn(ee), ut = Bo(he, Ze);
          if (i && (he = i0(he, i, r, Q)), l && (he = r0(he, l, u, Q)), de -= ut, Q && de < v) {
            var Ve = jt(he, Ze);
            return f0(
              e,
              t,
              Ri,
              ee.placeholder,
              n,
              he,
              Ve,
              c,
              f,
              v - de
            );
          }
          var St = b ? n : this, qt = O ? St[e] : e;
          return de = he.length, c ? he = M1(he, c) : j && de > 1 && he.reverse(), _ && f < de && (he.length = f), this && this !== Me && this instanceof ee && (qt = ue || ti(qt)), qt.apply(St, he);
        }
        return ee;
      }
      function c0(e, t) {
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
            typeof n == "string" || typeof i == "string" ? (n = st(n), i = st(i)) : (n = Ys(n), i = Ys(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ta(e) {
        return Mt(function(t) {
          return t = De(t, at(J())), ce(function(n) {
            var i = this;
            return e(t, function(r) {
              return rt(r, i, n);
            });
          });
        });
      }
      function Mi(e, t) {
        t = t === a ? " " : st(t);
        var n = t.length;
        if (n < 2)
          return n ? Kr(t, e) : t;
        var i = Kr(t, wi(e / Dn(t)));
        return Tn(t) ? an(_t(i), 0, e).join("") : i.slice(0, e);
      }
      function _1(e, t, n, i) {
        var r = t & K, l = ti(e);
        function u() {
          for (var c = -1, f = arguments.length, v = -1, _ = i.length, b = m(_ + f), O = this && this !== Me && this instanceof u ? l : e; ++v < _; )
            b[v] = i[v];
          for (; f--; )
            b[v++] = arguments[++c];
          return rt(O, r ? n : this, b);
        }
        return u;
      }
      function d0(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && Ye(t, n, i) && (n = i = a), t = Nt(t), n === a ? (n = t, t = 0) : n = Nt(n), i = i === a ? t < n ? 1 : -1 : Nt(i), s1(t, n, i, e);
        };
      }
      function Ui(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = xt(t), n = xt(n)), e(t, n);
        };
      }
      function f0(e, t, n, i, r, l, u, c, f, v) {
        var _ = t & ve, b = _ ? u : a, O = _ ? a : u, Q = _ ? l : a, j = _ ? a : l;
        t |= _ ? H : $, t &= ~(_ ? $ : H), t & xe || (t &= -4);
        var ue = [
          e,
          t,
          r,
          Q,
          b,
          j,
          O,
          c,
          f,
          v
        ], ee = n.apply(a, ue);
        return ua(e) && S0(ee, ue), ee.placeholder = i, A0(ee, e, t);
      }
      function na(e) {
        var t = Pe[e];
        return function(n, i) {
          if (n = xt(n), i = i == null ? 0 : ze(le(i), 292), i && As(n)) {
            var r = (_e(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (_e(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var b1 = Bn && 1 / gi(new Bn([, -0]))[1] == Ht ? function(e) {
        return new Bn(e);
      } : Sa;
      function p0(e) {
        return function(t) {
          var n = He(t);
          return n == it ? Br(t) : n == S ? Go(t) : Lo(t, e(t));
        };
      }
      function Gt(e, t, n, i, r, l, u, c) {
        var f = t & ge;
        if (!f && typeof e != "function")
          throw new ft(P);
        var v = i ? i.length : 0;
        if (v || (t &= -97, i = r = a), u = u === a ? u : Re(le(u), 0), c = c === a ? c : le(c), v -= r ? r.length : 0, t & $) {
          var _ = i, b = r;
          i = r = a;
        }
        var O = f ? a : aa(e), Q = [
          e,
          t,
          n,
          i,
          r,
          _,
          b,
          l,
          u,
          c
        ];
        if (O && P1(Q, O), e = Q[0], t = Q[1], n = Q[2], i = Q[3], r = Q[4], c = Q[9] = Q[9] === a ? f ? 0 : e.length : Re(Q[9] - v, 0), !c && t & (ve | Ie) && (t &= -25), !t || t == K)
          var j = k1(e, t, n);
        else
          t == ve || t == Ie ? j = v1(e, t, c) : (t == H || t == (K | H)) && !r.length ? j = _1(e, t, n, i) : j = Ri.apply(a, Q);
        var ue = O ? Qs : S0;
        return A0(ue(j, Q), e, t);
      }
      function h0(e, t, n, i) {
        return e === a || Et(e, Ln[n]) && !be.call(i, n) ? t : e;
      }
      function m0(e, t, n, i, r, l) {
        return Le(e) && Le(t) && (l.set(t, e), $i(e, t, a, m0, l), l.delete(t)), e;
      }
      function E1(e) {
        return ri(e) ? a : e;
      }
      function g0(e, t, n, i, r, l) {
        var u = n & Z, c = e.length, f = t.length;
        if (c != f && !(u && f > c))
          return !1;
        var v = l.get(e), _ = l.get(t);
        if (v && _)
          return v == t && _ == e;
        var b = -1, O = !0, Q = n & ye ? new pn() : a;
        for (l.set(e, t), l.set(t, e); ++b < c; ) {
          var j = e[b], ue = t[b];
          if (i)
            var ee = u ? i(ue, j, b, t, e, l) : i(j, ue, b, e, t, l);
          if (ee !== a) {
            if (ee)
              continue;
            O = !1;
            break;
          }
          if (Q) {
            if (!wr(t, function(de, he) {
              if (!qn(Q, he) && (j === de || r(j, de, n, i, l)))
                return Q.push(he);
            })) {
              O = !1;
              break;
            }
          } else if (!(j === ue || r(j, ue, n, i, l))) {
            O = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), O;
      }
      function S1(e, t, n, i, r, l, u) {
        switch (n) {
          case An:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case Nn:
            return !(e.byteLength != t.byteLength || !l(new bi(e), new bi(t)));
          case Qt:
          case Kt:
          case Yt:
            return Et(+e, +t);
          case Sn:
            return e.name == t.name && e.message == t.message;
          case X:
          case M:
            return e == t + "";
          case it:
            var c = Br;
          case S:
            var f = i & Z;
            if (c || (c = gi), e.size != t.size && !f)
              return !1;
            var v = u.get(e);
            if (v)
              return v == t;
            i |= ye, u.set(e, t);
            var _ = g0(c(e), c(t), i, r, l, u);
            return u.delete(e), _;
          case Se:
            if (Yn)
              return Yn.call(e) == Yn.call(t);
        }
        return !1;
      }
      function A1(e, t, n, i, r, l) {
        var u = n & Z, c = ia(e), f = c.length, v = ia(t), _ = v.length;
        if (f != _ && !u)
          return !1;
        for (var b = f; b--; ) {
          var O = c[b];
          if (!(u ? O in t : be.call(t, O)))
            return !1;
        }
        var Q = l.get(e), j = l.get(t);
        if (Q && j)
          return Q == t && j == e;
        var ue = !0;
        l.set(e, t), l.set(t, e);
        for (var ee = u; ++b < f; ) {
          O = c[b];
          var de = e[O], he = t[O];
          if (i)
            var ot = u ? i(he, de, O, t, e, l) : i(de, he, O, e, t, l);
          if (!(ot === a ? de === he || r(de, he, n, i, l) : ot)) {
            ue = !1;
            break;
          }
          ee || (ee = O == "constructor");
        }
        if (ue && !ee) {
          var Ze = e.constructor, ut = t.constructor;
          Ze != ut && "constructor" in e && "constructor" in t && !(typeof Ze == "function" && Ze instanceof Ze && typeof ut == "function" && ut instanceof ut) && (ue = !1);
        }
        return l.delete(e), l.delete(t), ue;
      }
      function Mt(e) {
        return da(b0(e, a, L0), e + "");
      }
      function ia(e) {
        return Os(e, Ge, la);
      }
      function ra(e) {
        return Os(e, je, x0);
      }
      var aa = Ti ? function(e) {
        return Ti.get(e);
      } : Sa;
      function Wi(e) {
        for (var t = e.name + "", n = Fn[t], i = be.call(Fn, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function Pn(e) {
        var t = be.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function J() {
        var e = s.iteratee || ba;
        return e = e === ba ? Gs : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Ni(e, t) {
        var n = e.__data__;
        return F1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function sa(e) {
        for (var t = Ge(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, v0(r)];
        }
        return t;
      }
      function gn(e, t) {
        var n = Oo(e, t);
        return Rs(n) ? n : a;
      }
      function w1(e) {
        var t = be.call(e, dn), n = e[dn];
        try {
          e[dn] = a;
          var i = !0;
        } catch {
        }
        var r = vi.call(e);
        return i && (t ? e[dn] = n : delete e[dn]), r;
      }
      var la = $r ? function(e) {
        return e == null ? [] : (e = Ee(e), Jt($r(e), function(t) {
          return Es.call(e, t);
        }));
      } : Aa, x0 = $r ? function(e) {
        for (var t = []; e; )
          Xt(t, la(e)), e = Ei(e);
        return t;
      } : Aa, He = Ke;
      (Vr && He(new Vr(new ArrayBuffer(1))) != An || Hn && He(new Hn()) != it || Or && He(Or.resolve()) != ci || Bn && He(new Bn()) != S || Qn && He(new Qn()) != se) && (He = function(e) {
        var t = Ke(e), n = t == vt ? e.constructor : a, i = n ? xn(n) : "";
        if (i)
          switch (i) {
            case ou:
              return An;
            case uu:
              return it;
            case cu:
              return ci;
            case du:
              return S;
            case fu:
              return se;
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
              t = ze(t, e + u);
              break;
            case "takeRight":
              e = Re(e, t - u);
              break;
          }
        }
        return { start: e, end: t };
      }
      function T1(e) {
        var t = e.match(Fl);
        return t ? t[1].split($l) : [];
      }
      function y0(e, t, n) {
        t = rn(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = Tt(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && Zi(r) && Ut(u, r) && (re(e) || yn(e)));
      }
      function D1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && be.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function k0(e) {
        return typeof e.constructor == "function" && !ni(e) ? $n(Ei(e)) : {};
      }
      function I1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case Nn:
            return ea(e);
          case Qt:
          case Kt:
            return new i(+e);
          case An:
            return p1(e, n);
          case sr:
          case lr:
          case or:
          case ur:
          case cr:
          case dr:
          case fr:
          case pr:
          case hr:
            return t0(e, n);
          case it:
            return new i();
          case Yt:
          case M:
            return new i(e);
          case X:
            return h1(e);
          case S:
            return new i();
          case Se:
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
        return re(e) || yn(e) || !!(Ss && e && e[Ss]);
      }
      function Ut(e, t) {
        var n = typeof e;
        return t = t ?? qe, !!t && (n == "number" || n != "symbol" && Nl.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ye(e, t, n) {
        if (!Le(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? Xe(n) && Ut(t, n.length) : i == "string" && t in n) ? Et(n[t], e) : !1;
      }
      function oa(e, t) {
        if (re(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || lt(e) ? !0 : Tl.test(e) || !Cl.test(e) || t != null && e in Ee(t);
      }
      function F1(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function ua(e) {
        var t = Wi(e), n = s[t];
        if (typeof n != "function" || !(t in pe.prototype))
          return !1;
        if (e === n)
          return !0;
        var i = aa(n);
        return !!i && e === i[0];
      }
      function $1(e) {
        return !!vs && vs in e;
      }
      var V1 = yi ? Wt : wa;
      function ni(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Ln;
        return e === n;
      }
      function v0(e) {
        return e === e && !Le(e);
      }
      function _0(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in Ee(n));
        };
      }
      function O1(e) {
        var t = Ki(e, function(i) {
          return n.size === V && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function P1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (K | ge | I), u = i == I && n == ve || i == I && n == W && e[7].length <= t[8] || i == (I | W) && t[7].length <= t[8] && n == ve;
        if (!(l || u))
          return e;
        i & K && (e[2] = t[2], r |= n & K ? 0 : xe);
        var c = t[3];
        if (c) {
          var f = e[3];
          e[3] = f ? i0(f, c, t[4]) : c, e[4] = f ? jt(e[3], E) : t[4];
        }
        return c = t[5], c && (f = e[5], e[5] = f ? r0(f, c, t[6]) : c, e[6] = f ? jt(e[5], E) : t[6]), c = t[7], c && (e[7] = c), i & I && (e[8] = e[8] == null ? t[8] : ze(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
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
      function b0(e, t, n) {
        return t = Re(t === a ? e.length - 1 : t, 0), function() {
          for (var i = arguments, r = -1, l = Re(i.length - t, 0), u = m(l); ++r < l; )
            u[r] = i[t + r];
          r = -1;
          for (var c = m(t + 1); ++r < t; )
            c[r] = i[r];
          return c[t] = n(u), rt(e, this, c);
        };
      }
      function E0(e, t) {
        return t.length < 2 ? e : mn(e, mt(t, 0, -1));
      }
      function M1(e, t) {
        for (var n = e.length, i = ze(t.length, n), r = Je(e); i--; ) {
          var l = t[i];
          e[i] = Ut(l, n) ? r[l] : a;
        }
        return e;
      }
      function ca(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var S0 = w0(Qs), ii = tu || function(e, t) {
        return Me.setTimeout(e, t);
      }, da = w0(u1);
      function A0(e, t, n) {
        var i = t + "";
        return da(e, L1(i, U1(T1(i), n)));
      }
      function w0(e) {
        var t = 0, n = 0;
        return function() {
          var i = au(), r = un - (i - n);
          if (n = i, r > 0) {
            if (++t >= Ft)
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
      var C0 = O1(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(Dl, function(n, i, r, l) {
          t.push(r ? l.replace(Pl, "$1") : i || n);
        }), t;
      });
      function Tt(e) {
        if (typeof e == "string" || lt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function xn(e) {
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
        return dt(At, function(n) {
          var i = "_." + n[0];
          t & n[1] && !hi(e, i) && e.push(i);
        }), e.sort();
      }
      function T0(e) {
        if (e instanceof pe)
          return e.clone();
        var t = new pt(e.__wrapped__, e.__chain__);
        return t.__actions__ = Je(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function W1(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = Re(le(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = m(wi(i / t)); r < i; )
          u[l++] = mt(e, r, r += t);
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
        return Xt(re(n) ? Je(n) : [n], Ue(t, 1));
      }
      var z1 = ce(function(e, t) {
        return $e(e) ? Jn(e, Ue(t, 1, $e, !0)) : [];
      }), H1 = ce(function(e, t) {
        var n = gt(t);
        return $e(n) && (n = a), $e(e) ? Jn(e, Ue(t, 1, $e, !0), J(n, 2)) : [];
      }), Q1 = ce(function(e, t) {
        var n = gt(t);
        return $e(n) && (n = a), $e(e) ? Jn(e, Ue(t, 1, $e, !0), a, n) : [];
      });
      function K1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : le(t), mt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Y1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : le(t), t = i - t, mt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Z1(e, t) {
        return e && e.length ? Oi(e, J(t, 3), !0, !0) : [];
      }
      function J1(e, t) {
        return e && e.length ? Oi(e, J(t, 3), !0) : [];
      }
      function X1(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && Ye(e, t, n) && (n = 0, i = r), qu(e, t, n, i)) : [];
      }
      function D0(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : le(n);
        return r < 0 && (r = Re(i + r, 0)), mi(e, J(t, 3), r);
      }
      function I0(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = le(n), r = n < 0 ? Re(i + r, 0) : ze(r, i - 1)), mi(e, J(t, 3), r, !0);
      }
      function L0(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ue(e, 1) : [];
      }
      function j1(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ue(e, Ht) : [];
      }
      function ec(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : le(t), Ue(e, t)) : [];
      }
      function tc(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = {}; ++t < n; ) {
          var r = e[t];
          i[r[0]] = r[1];
        }
        return i;
      }
      function B0(e) {
        return e && e.length ? e[0] : a;
      }
      function nc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : le(n);
        return r < 0 && (r = Re(i + r, 0)), Cn(e, t, r);
      }
      function ic(e) {
        var t = e == null ? 0 : e.length;
        return t ? mt(e, 0, -1) : [];
      }
      var rc = ce(function(e) {
        var t = De(e, Xr);
        return t.length && t[0] === e[0] ? Wr(t) : [];
      }), ac = ce(function(e) {
        var t = gt(e), n = De(e, Xr);
        return t === gt(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Wr(n, J(t, 2)) : [];
      }), sc = ce(function(e) {
        var t = gt(e), n = De(e, Xr);
        return t = typeof t == "function" ? t : a, t && n.pop(), n.length && n[0] === e[0] ? Wr(n, a, t) : [];
      });
      function lc(e, t) {
        return e == null ? "" : iu.call(e, t);
      }
      function gt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : a;
      }
      function oc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i;
        return n !== a && (r = le(n), r = r < 0 ? Re(i + r, 0) : ze(r, i - 1)), t === t ? Uo(e, t, r) : mi(e, fs, r, !0);
      }
      function uc(e, t) {
        return e && e.length ? Ns(e, le(t)) : a;
      }
      var cc = ce(F0);
      function F0(e, t) {
        return e && e.length && t && t.length ? Hr(e, t) : e;
      }
      function dc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, J(n, 2)) : e;
      }
      function fc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, a, n) : e;
      }
      var pc = Mt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Rr(e, t);
        return Hs(e, De(t, function(r) {
          return Ut(r, n) ? +r : r;
        }).sort(n0)), i;
      });
      function hc(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var i = -1, r = [], l = e.length;
        for (t = J(t, 3); ++i < l; ) {
          var u = e[i];
          t(u, i, e) && (n.push(u), r.push(i));
        }
        return Hs(e, r), n;
      }
      function fa(e) {
        return e == null ? e : lu.call(e);
      }
      function mc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (n && typeof n != "number" && Ye(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : le(t), n = n === a ? i : le(n)), mt(e, t, n)) : [];
      }
      function gc(e, t) {
        return Vi(e, t);
      }
      function xc(e, t, n) {
        return Yr(e, t, J(n, 2));
      }
      function yc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Vi(e, t);
          if (i < n && Et(e[i], t))
            return i;
        }
        return -1;
      }
      function kc(e, t) {
        return Vi(e, t, !0);
      }
      function vc(e, t, n) {
        return Yr(e, t, J(n, 2), !0);
      }
      function _c(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Vi(e, t, !0) - 1;
          if (Et(e[i], t))
            return i;
        }
        return -1;
      }
      function bc(e) {
        return e && e.length ? Ks(e) : [];
      }
      function Ec(e, t) {
        return e && e.length ? Ks(e, J(t, 2)) : [];
      }
      function Sc(e) {
        var t = e == null ? 0 : e.length;
        return t ? mt(e, 1, t) : [];
      }
      function Ac(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : le(t), mt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function wc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : le(t), t = i - t, mt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Cc(e, t) {
        return e && e.length ? Oi(e, J(t, 3), !1, !0) : [];
      }
      function Tc(e, t) {
        return e && e.length ? Oi(e, J(t, 3)) : [];
      }
      var Dc = ce(function(e) {
        return nn(Ue(e, 1, $e, !0));
      }), Ic = ce(function(e) {
        var t = gt(e);
        return $e(t) && (t = a), nn(Ue(e, 1, $e, !0), J(t, 2));
      }), Lc = ce(function(e) {
        var t = gt(e);
        return t = typeof t == "function" ? t : a, nn(Ue(e, 1, $e, !0), a, t);
      });
      function Bc(e) {
        return e && e.length ? nn(e) : [];
      }
      function Fc(e, t) {
        return e && e.length ? nn(e, J(t, 2)) : [];
      }
      function $c(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? nn(e, a, t) : [];
      }
      function pa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = Jt(e, function(n) {
          if ($e(n))
            return t = Re(n.length, t), !0;
        }), Ir(t, function(n) {
          return De(e, Cr(n));
        });
      }
      function $0(e, t) {
        if (!(e && e.length))
          return [];
        var n = pa(e);
        return t == null ? n : De(n, function(i) {
          return rt(t, a, i);
        });
      }
      var Vc = ce(function(e, t) {
        return $e(e) ? Jn(e, t) : [];
      }), Oc = ce(function(e) {
        return Jr(Jt(e, $e));
      }), Pc = ce(function(e) {
        var t = gt(e);
        return $e(t) && (t = a), Jr(Jt(e, $e), J(t, 2));
      }), Rc = ce(function(e) {
        var t = gt(e);
        return t = typeof t == "function" ? t : a, Jr(Jt(e, $e), a, t);
      }), Gc = ce(pa);
      function Mc(e, t) {
        return Xs(e || [], t || [], Zn);
      }
      function Uc(e, t) {
        return Xs(e || [], t || [], ei);
      }
      var Wc = ce(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : a;
        return n = typeof n == "function" ? (e.pop(), n) : a, $0(e, n);
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
      var qc = Mt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Rr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof pe) || !Ut(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: zi,
          args: [r],
          thisArg: a
        }), new pt(i, this.__chain__).thru(function(l) {
          return t && !l.length && l.push(a), l;
        }));
      });
      function zc() {
        return V0(this);
      }
      function Hc() {
        return new pt(this.value(), this.__chain__);
      }
      function Qc() {
        this.__values__ === a && (this.__values__ = Y0(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? a : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Kc() {
        return this;
      }
      function Yc(e) {
        for (var t, n = this; n instanceof Ii; ) {
          var i = T0(n);
          i.__index__ = 0, i.__values__ = a, t ? r.__wrapped__ = i : t = i;
          var r = i;
          n = n.__wrapped__;
        }
        return r.__wrapped__ = e, t;
      }
      function Zc() {
        var e = this.__wrapped__;
        if (e instanceof pe) {
          var t = e;
          return this.__actions__.length && (t = new pe(this)), t = t.reverse(), t.__actions__.push({
            func: zi,
            args: [fa],
            thisArg: a
          }), new pt(t, this.__chain__);
        }
        return this.thru(fa);
      }
      function Jc() {
        return Js(this.__wrapped__, this.__actions__);
      }
      var Xc = Pi(function(e, t, n) {
        be.call(e, n) ? ++e[n] : Rt(e, n, 1);
      });
      function jc(e, t, n) {
        var i = re(e) ? cs : Nu;
        return n && Ye(e, t, n) && (t = a), i(e, J(t, 3));
      }
      function ed(e, t) {
        var n = re(e) ? Jt : $s;
        return n(e, J(t, 3));
      }
      var td = o0(D0), nd = o0(I0);
      function id(e, t) {
        return Ue(Hi(e, t), 1);
      }
      function rd(e, t) {
        return Ue(Hi(e, t), Ht);
      }
      function ad(e, t, n) {
        return n = n === a ? 1 : le(n), Ue(Hi(e, t), n);
      }
      function O0(e, t) {
        var n = re(e) ? dt : tn;
        return n(e, J(t, 3));
      }
      function P0(e, t) {
        var n = re(e) ? So : Fs;
        return n(e, J(t, 3));
      }
      var sd = Pi(function(e, t, n) {
        be.call(e, n) ? e[n].push(t) : Rt(e, n, [t]);
      });
      function ld(e, t, n, i) {
        e = Xe(e) ? e : Gn(e), n = n && !i ? le(n) : 0;
        var r = e.length;
        return n < 0 && (n = Re(r + n, 0)), Ji(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && Cn(e, t, n) > -1;
      }
      var od = ce(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = Xe(e) ? m(e.length) : [];
        return tn(e, function(u) {
          l[++i] = r ? rt(t, u, n) : Xn(u, t, n);
        }), l;
      }), ud = Pi(function(e, t, n) {
        Rt(e, n, t);
      });
      function Hi(e, t) {
        var n = re(e) ? De : Ms;
        return n(e, J(t, 3));
      }
      function cd(e, t, n, i) {
        return e == null ? [] : (re(t) || (t = t == null ? [] : [t]), n = i ? a : n, re(n) || (n = n == null ? [] : [n]), qs(e, t, n));
      }
      var dd = Pi(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function fd(e, t, n) {
        var i = re(e) ? Ar : hs, r = arguments.length < 3;
        return i(e, J(t, 4), n, r, tn);
      }
      function pd(e, t, n) {
        var i = re(e) ? Ao : hs, r = arguments.length < 3;
        return i(e, J(t, 4), n, r, Fs);
      }
      function hd(e, t) {
        var n = re(e) ? Jt : $s;
        return n(e, Yi(J(t, 3)));
      }
      function md(e) {
        var t = re(e) ? Ds : l1;
        return t(e);
      }
      function gd(e, t, n) {
        (n ? Ye(e, t, n) : t === a) ? t = 1 : t = le(t);
        var i = re(e) ? Ru : o1;
        return i(e, t);
      }
      function xd(e) {
        var t = re(e) ? Gu : c1;
        return t(e);
      }
      function yd(e) {
        if (e == null)
          return 0;
        if (Xe(e))
          return Ji(e) ? Dn(e) : e.length;
        var t = He(e);
        return t == it || t == S ? e.size : qr(e).length;
      }
      function kd(e, t, n) {
        var i = re(e) ? wr : d1;
        return n && Ye(e, t, n) && (t = a), i(e, J(t, 3));
      }
      var vd = ce(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Ye(e, t[0], t[1]) ? t = [] : n > 2 && Ye(t[0], t[1], t[2]) && (t = [t[0]]), qs(e, Ue(t, 1), []);
      }), Qi = eu || function() {
        return Me.Date.now();
      };
      function _d(e, t) {
        if (typeof t != "function")
          throw new ft(P);
        return e = le(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function R0(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, Gt(e, I, a, a, a, a, t);
      }
      function G0(e, t) {
        var n;
        if (typeof t != "function")
          throw new ft(P);
        return e = le(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var ha = ce(function(e, t, n) {
        var i = K;
        if (n.length) {
          var r = jt(n, Pn(ha));
          i |= H;
        }
        return Gt(e, i, t, n, r);
      }), M0 = ce(function(e, t, n) {
        var i = K | ge;
        if (n.length) {
          var r = jt(n, Pn(M0));
          i |= H;
        }
        return Gt(t, i, e, n, r);
      });
      function U0(e, t, n) {
        t = n ? a : t;
        var i = Gt(e, ve, a, a, a, a, a, t);
        return i.placeholder = U0.placeholder, i;
      }
      function W0(e, t, n) {
        t = n ? a : t;
        var i = Gt(e, Ie, a, a, a, a, a, t);
        return i.placeholder = W0.placeholder, i;
      }
      function N0(e, t, n) {
        var i, r, l, u, c, f, v = 0, _ = !1, b = !1, O = !0;
        if (typeof e != "function")
          throw new ft(P);
        t = xt(t) || 0, Le(n) && (_ = !!n.leading, b = "maxWait" in n, l = b ? Re(xt(n.maxWait) || 0, t) : l, O = "trailing" in n ? !!n.trailing : O);
        function Q(Ve) {
          var St = i, qt = r;
          return i = r = a, v = Ve, u = e.apply(qt, St), u;
        }
        function j(Ve) {
          return v = Ve, c = ii(de, t), _ ? Q(Ve) : u;
        }
        function ue(Ve) {
          var St = Ve - f, qt = Ve - v, ol = t - St;
          return b ? ze(ol, l - qt) : ol;
        }
        function ee(Ve) {
          var St = Ve - f, qt = Ve - v;
          return f === a || St >= t || St < 0 || b && qt >= l;
        }
        function de() {
          var Ve = Qi();
          if (ee(Ve))
            return he(Ve);
          c = ii(de, ue(Ve));
        }
        function he(Ve) {
          return c = a, O && i ? Q(Ve) : (i = r = a, u);
        }
        function ot() {
          c !== a && js(c), v = 0, i = f = r = c = a;
        }
        function Ze() {
          return c === a ? u : he(Qi());
        }
        function ut() {
          var Ve = Qi(), St = ee(Ve);
          if (i = arguments, r = this, f = Ve, St) {
            if (c === a)
              return j(f);
            if (b)
              return js(c), c = ii(de, t), Q(f);
          }
          return c === a && (c = ii(de, t)), u;
        }
        return ut.cancel = ot, ut.flush = Ze, ut;
      }
      var bd = ce(function(e, t) {
        return Bs(e, 1, t);
      }), Ed = ce(function(e, t, n) {
        return Bs(e, xt(t) || 0, n);
      });
      function Sd(e) {
        return Gt(e, oe);
      }
      function Ki(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new ft(P);
        var n = function() {
          var i = arguments, r = t ? t.apply(this, i) : i[0], l = n.cache;
          if (l.has(r))
            return l.get(r);
          var u = e.apply(this, i);
          return n.cache = l.set(r, u) || l, u;
        };
        return n.cache = new (Ki.Cache || Pt)(), n;
      }
      Ki.Cache = Pt;
      function Yi(e) {
        if (typeof e != "function")
          throw new ft(P);
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
        return G0(2, e);
      }
      var wd = f1(function(e, t) {
        t = t.length == 1 && re(t[0]) ? De(t[0], at(J())) : De(Ue(t, 1), at(J()));
        var n = t.length;
        return ce(function(i) {
          for (var r = -1, l = ze(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return rt(e, this, i);
        });
      }), ma = ce(function(e, t) {
        var n = jt(t, Pn(ma));
        return Gt(e, H, a, t, n);
      }), q0 = ce(function(e, t) {
        var n = jt(t, Pn(q0));
        return Gt(e, $, a, t, n);
      }), Cd = Mt(function(e, t) {
        return Gt(e, W, a, a, a, t);
      });
      function Td(e, t) {
        if (typeof e != "function")
          throw new ft(P);
        return t = t === a ? t : le(t), ce(e, t);
      }
      function Dd(e, t) {
        if (typeof e != "function")
          throw new ft(P);
        return t = t == null ? 0 : Re(le(t), 0), ce(function(n) {
          var i = n[t], r = an(n, 0, t);
          return i && Xt(r, i), rt(e, this, r);
        });
      }
      function Id(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new ft(P);
        return Le(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), N0(e, t, {
          leading: i,
          maxWait: t,
          trailing: r
        });
      }
      function Ld(e) {
        return R0(e, 1);
      }
      function Bd(e, t) {
        return ma(jr(t), e);
      }
      function Fd() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return re(e) ? e : [e];
      }
      function $d(e) {
        return ht(e, G);
      }
      function Vd(e, t) {
        return t = typeof t == "function" ? t : a, ht(e, G, t);
      }
      function Od(e) {
        return ht(e, x | G);
      }
      function Pd(e, t) {
        return t = typeof t == "function" ? t : a, ht(e, x | G, t);
      }
      function Rd(e, t) {
        return t == null || Ls(e, t, Ge(t));
      }
      function Et(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Gd = Ui(Ur), Md = Ui(function(e, t) {
        return e >= t;
      }), yn = Ps(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Ps : function(e) {
        return Be(e) && be.call(e, "callee") && !Es.call(e, "callee");
      }, re = m.isArray, Ud = rs ? at(rs) : Yu;
      function Xe(e) {
        return e != null && Zi(e.length) && !Wt(e);
      }
      function $e(e) {
        return Be(e) && Xe(e);
      }
      function Wd(e) {
        return e === !0 || e === !1 || Be(e) && Ke(e) == Qt;
      }
      var sn = nu || wa, Nd = as ? at(as) : Zu;
      function qd(e) {
        return Be(e) && e.nodeType === 1 && !ri(e);
      }
      function zd(e) {
        if (e == null)
          return !0;
        if (Xe(e) && (re(e) || typeof e == "string" || typeof e.splice == "function" || sn(e) || Rn(e) || yn(e)))
          return !e.length;
        var t = He(e);
        if (t == it || t == S)
          return !e.size;
        if (ni(e))
          return !qr(e).length;
        for (var n in e)
          if (be.call(e, n))
            return !1;
        return !0;
      }
      function Hd(e, t) {
        return jn(e, t);
      }
      function Qd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? jn(e, t, a, n) : !!i;
      }
      function ga(e) {
        if (!Be(e))
          return !1;
        var t = Ke(e);
        return t == Sn || t == ir || typeof e.message == "string" && typeof e.name == "string" && !ri(e);
      }
      function Kd(e) {
        return typeof e == "number" && As(e);
      }
      function Wt(e) {
        if (!Le(e))
          return !1;
        var t = Ke(e);
        return t == Vt || t == ui || t == Te || t == ar;
      }
      function z0(e) {
        return typeof e == "number" && e == le(e);
      }
      function Zi(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= qe;
      }
      function Le(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Be(e) {
        return e != null && typeof e == "object";
      }
      var H0 = ss ? at(ss) : Xu;
      function Yd(e, t) {
        return e === t || Nr(e, t, sa(t));
      }
      function Zd(e, t, n) {
        return n = typeof n == "function" ? n : a, Nr(e, t, sa(t), n);
      }
      function Jd(e) {
        return Q0(e) && e != +e;
      }
      function Xd(e) {
        if (V1(e))
          throw new ne(U);
        return Rs(e);
      }
      function jd(e) {
        return e === null;
      }
      function ef(e) {
        return e == null;
      }
      function Q0(e) {
        return typeof e == "number" || Be(e) && Ke(e) == Yt;
      }
      function ri(e) {
        if (!Be(e) || Ke(e) != vt)
          return !1;
        var t = Ei(e);
        if (t === null)
          return !0;
        var n = be.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && ki.call(n) == Zo;
      }
      var xa = ls ? at(ls) : ju;
      function tf(e) {
        return z0(e) && e >= -9007199254740991 && e <= qe;
      }
      var K0 = os ? at(os) : e1;
      function Ji(e) {
        return typeof e == "string" || !re(e) && Be(e) && Ke(e) == M;
      }
      function lt(e) {
        return typeof e == "symbol" || Be(e) && Ke(e) == Se;
      }
      var Rn = us ? at(us) : t1;
      function nf(e) {
        return e === a;
      }
      function rf(e) {
        return Be(e) && He(e) == se;
      }
      function af(e) {
        return Be(e) && Ke(e) == Zt;
      }
      var sf = Ui(zr), lf = Ui(function(e, t) {
        return e <= t;
      });
      function Y0(e) {
        if (!e)
          return [];
        if (Xe(e))
          return Ji(e) ? _t(e) : Je(e);
        if (zn && e[zn])
          return Ro(e[zn]());
        var t = He(e), n = t == it ? Br : t == S ? gi : Gn;
        return n(e);
      }
      function Nt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = xt(e), e === Ht || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * te;
        }
        return e === e ? e : 0;
      }
      function le(e) {
        var t = Nt(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Z0(e) {
        return e ? hn(le(e), 0, T) : 0;
      }
      function xt(e) {
        if (typeof e == "number")
          return e;
        if (lt(e))
          return q;
        if (Le(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Le(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = ms(e);
        var n = Ml.test(e);
        return n || Wl.test(e) ? _o(e.slice(2), n ? 2 : 8) : Gl.test(e) ? q : +e;
      }
      function J0(e) {
        return Ct(e, je(e));
      }
      function of(e) {
        return e ? hn(le(e), -9007199254740991, qe) : e === 0 ? e : 0;
      }
      function _e(e) {
        return e == null ? "" : st(e);
      }
      var uf = Vn(function(e, t) {
        if (ni(t) || Xe(t)) {
          Ct(t, Ge(t), e);
          return;
        }
        for (var n in t)
          be.call(t, n) && Zn(e, n, t[n]);
      }), X0 = Vn(function(e, t) {
        Ct(t, je(t), e);
      }), Xi = Vn(function(e, t, n, i) {
        Ct(t, je(t), e, i);
      }), cf = Vn(function(e, t, n, i) {
        Ct(t, Ge(t), e, i);
      }), df = Mt(Rr);
      function ff(e, t) {
        var n = $n(e);
        return t == null ? n : Is(n, t);
      }
      var pf = ce(function(e, t) {
        e = Ee(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && Ye(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = je(l), c = -1, f = u.length; ++c < f; ) {
            var v = u[c], _ = e[v];
            (_ === a || Et(_, Ln[v]) && !be.call(e, v)) && (e[v] = l[v]);
          }
        return e;
      }), hf = ce(function(e) {
        return e.push(a, m0), rt(j0, a, e);
      });
      function mf(e, t) {
        return ds(e, J(t, 3), wt);
      }
      function gf(e, t) {
        return ds(e, J(t, 3), Mr);
      }
      function xf(e, t) {
        return e == null ? e : Gr(e, J(t, 3), je);
      }
      function yf(e, t) {
        return e == null ? e : Vs(e, J(t, 3), je);
      }
      function kf(e, t) {
        return e && wt(e, J(t, 3));
      }
      function vf(e, t) {
        return e && Mr(e, J(t, 3));
      }
      function _f(e) {
        return e == null ? [] : Fi(e, Ge(e));
      }
      function bf(e) {
        return e == null ? [] : Fi(e, je(e));
      }
      function ya(e, t, n) {
        var i = e == null ? a : mn(e, t);
        return i === a ? n : i;
      }
      function Ef(e, t) {
        return e != null && y0(e, t, zu);
      }
      function ka(e, t) {
        return e != null && y0(e, t, Hu);
      }
      var Sf = c0(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), e[t] = n;
      }, _a(et)), Af = c0(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = vi.call(t)), be.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, J), wf = ce(Xn);
      function Ge(e) {
        return Xe(e) ? Ts(e) : qr(e);
      }
      function je(e) {
        return Xe(e) ? Ts(e, !0) : n1(e);
      }
      function Cf(e, t) {
        var n = {};
        return t = J(t, 3), wt(e, function(i, r, l) {
          Rt(n, t(i, r, l), i);
        }), n;
      }
      function Tf(e, t) {
        var n = {};
        return t = J(t, 3), wt(e, function(i, r, l) {
          Rt(n, r, t(i, r, l));
        }), n;
      }
      var Df = Vn(function(e, t, n) {
        $i(e, t, n);
      }), j0 = Vn(function(e, t, n, i) {
        $i(e, t, n, i);
      }), If = Mt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = De(t, function(l) {
          return l = rn(l, e), i || (i = l.length > 1), l;
        }), Ct(e, ra(e), n), i && (n = ht(n, x | C | G, E1));
        for (var r = t.length; r--; )
          Zr(n, t[r]);
        return n;
      });
      function Lf(e, t) {
        return el(e, Yi(J(t)));
      }
      var Bf = Mt(function(e, t) {
        return e == null ? {} : r1(e, t);
      });
      function el(e, t) {
        if (e == null)
          return {};
        var n = De(ra(e), function(i) {
          return [i];
        });
        return t = J(t), zs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function Ff(e, t, n) {
        t = rn(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[Tt(t[i])];
          l === a && (i = r, l = n), e = Wt(l) ? l.call(e) : l;
        }
        return e;
      }
      function $f(e, t, n) {
        return e == null ? e : ei(e, t, n);
      }
      function Vf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : ei(e, t, n, i);
      }
      var tl = p0(Ge), nl = p0(je);
      function Of(e, t, n) {
        var i = re(e), r = i || sn(e) || Rn(e);
        if (t = J(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : Le(e) ? n = Wt(l) ? $n(Ei(e)) : {} : n = {};
        }
        return (r ? dt : wt)(e, function(u, c, f) {
          return t(n, u, c, f);
        }), n;
      }
      function Pf(e, t) {
        return e == null ? !0 : Zr(e, t);
      }
      function Rf(e, t, n) {
        return e == null ? e : Zs(e, t, jr(n));
      }
      function Gf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : Zs(e, t, jr(n), i);
      }
      function Gn(e) {
        return e == null ? [] : Lr(e, Ge(e));
      }
      function Mf(e) {
        return e == null ? [] : Lr(e, je(e));
      }
      function Uf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = xt(n), n = n === n ? n : 0), t !== a && (t = xt(t), t = t === t ? t : 0), hn(xt(e), t, n);
      }
      function Wf(e, t, n) {
        return t = Nt(t), n === a ? (n = t, t = 0) : n = Nt(n), e = xt(e), Qu(e, t, n);
      }
      function Nf(e, t, n) {
        if (n && typeof n != "boolean" && Ye(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Nt(e), t === a ? (t = e, e = 0) : t = Nt(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = ws();
          return ze(e + r * (t - e + vo("1e-" + ((r + "").length - 1))), t);
        }
        return Qr(e, t);
      }
      var qf = On(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? il(t) : t);
      });
      function il(e) {
        return va(_e(e).toLowerCase());
      }
      function rl(e) {
        return e = _e(e), e && e.replace(ql, Fo).replace(uo, "");
      }
      function zf(e, t, n) {
        e = _e(e), t = st(t);
        var i = e.length;
        n = n === a ? i : hn(le(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Hf(e) {
        return e = _e(e), e && Sl.test(e) ? e.replace(Va, $o) : e;
      }
      function Qf(e) {
        return e = _e(e), e && Il.test(e) ? e.replace(mr, "\\$&") : e;
      }
      var Kf = On(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), Yf = On(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), Zf = l0("toLowerCase");
      function Jf(e, t, n) {
        e = _e(e), t = le(t);
        var i = t ? Dn(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return Mi(Ci(r), n) + e + Mi(wi(r), n);
      }
      function Xf(e, t, n) {
        e = _e(e), t = le(t);
        var i = t ? Dn(e) : 0;
        return t && i < t ? e + Mi(t - i, n) : e;
      }
      function jf(e, t, n) {
        e = _e(e), t = le(t);
        var i = t ? Dn(e) : 0;
        return t && i < t ? Mi(t - i, n) + e : e;
      }
      function ep(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), su(_e(e).replace(gr, ""), t || 0);
      }
      function tp(e, t, n) {
        return (n ? Ye(e, t, n) : t === a) ? t = 1 : t = le(t), Kr(_e(e), t);
      }
      function np() {
        var e = arguments, t = _e(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var ip = On(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function rp(e, t, n) {
        return n && typeof n != "number" && Ye(e, t, n) && (t = n = a), n = n === a ? T : n >>> 0, n ? (e = _e(e), e && (typeof t == "string" || t != null && !xa(t)) && (t = st(t), !t && Tn(e)) ? an(_t(e), 0, n) : e.split(t, n)) : [];
      }
      var ap = On(function(e, t, n) {
        return e + (n ? " " : "") + va(t);
      });
      function sp(e, t, n) {
        return e = _e(e), n = n == null ? 0 : hn(le(n), 0, e.length), t = st(t), e.slice(n, n + t.length) == t;
      }
      function lp(e, t, n) {
        var i = s.templateSettings;
        n && Ye(e, t, n) && (t = a), e = _e(e), t = Xi({}, t, i, h0);
        var r = Xi({}, t.imports, i.imports, h0), l = Ge(r), u = Lr(r, l), c, f, v = 0, _ = t.interpolate || di, b = "__p += '", O = Fr(
          (t.escape || di).source + "|" + _.source + "|" + (_ === Oa ? Rl : di).source + "|" + (t.evaluate || di).source + "|$",
          "g"
        ), Q = "//# sourceURL=" + (be.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++mo + "]") + `
`;
        e.replace(O, function(ee, de, he, ot, Ze, ut) {
          return he || (he = ot), b += e.slice(v, ut).replace(zl, Vo), de && (c = !0, b += `' +
__e(` + de + `) +
'`), Ze && (f = !0, b += `';
` + Ze + `;
__p += '`), he && (b += `' +
((__t = (` + he + `)) == null ? '' : __t) +
'`), v = ut + ee.length, ee;
        }), b += `';
`;
        var j = be.call(t, "variable") && t.variable;
        if (!j)
          b = `with (obj) {
` + b + `
}
`;
        else if (Ol.test(j))
          throw new ne(L);
        b = (f ? b.replace(vl, "") : b).replace(_l, "$1").replace(bl, "$1;"), b = "function(" + (j || "obj") + `) {
` + (j ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (f ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + b + `return __p
}`;
        var ue = sl(function() {
          return ke(l, Q + "return " + b).apply(a, u);
        });
        if (ue.source = b, ga(ue))
          throw ue;
        return ue;
      }
      function op(e) {
        return _e(e).toLowerCase();
      }
      function up(e) {
        return _e(e).toUpperCase();
      }
      function cp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return ms(e);
        if (!e || !(t = st(t)))
          return e;
        var i = _t(e), r = _t(t), l = gs(i, r), u = xs(i, r) + 1;
        return an(i, l, u).join("");
      }
      function dp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.slice(0, ks(e) + 1);
        if (!e || !(t = st(t)))
          return e;
        var i = _t(e), r = xs(i, _t(t)) + 1;
        return an(i, 0, r).join("");
      }
      function fp(e, t, n) {
        if (e = _e(e), e && (n || t === a))
          return e.replace(gr, "");
        if (!e || !(t = st(t)))
          return e;
        var i = _t(e), r = gs(i, _t(t));
        return an(i, r).join("");
      }
      function pp(e, t) {
        var n = Fe, i = Ne;
        if (Le(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? le(t.length) : n, i = "omission" in t ? st(t.omission) : i;
        }
        e = _e(e);
        var l = e.length;
        if (Tn(e)) {
          var u = _t(e);
          l = u.length;
        }
        if (n >= l)
          return e;
        var c = n - Dn(i);
        if (c < 1)
          return i;
        var f = u ? an(u, 0, c).join("") : e.slice(0, c);
        if (r === a)
          return f + i;
        if (u && (c += f.length - c), xa(r)) {
          if (e.slice(c).search(r)) {
            var v, _ = f;
            for (r.global || (r = Fr(r.source, _e(Pa.exec(r)) + "g")), r.lastIndex = 0; v = r.exec(_); )
              var b = v.index;
            f = f.slice(0, b === a ? c : b);
          }
        } else if (e.indexOf(st(r), c) != c) {
          var O = f.lastIndexOf(r);
          O > -1 && (f = f.slice(0, O));
        }
        return f + i;
      }
      function hp(e) {
        return e = _e(e), e && El.test(e) ? e.replace($a, Wo) : e;
      }
      var mp = On(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), va = l0("toUpperCase");
      function al(e, t, n) {
        return e = _e(e), t = n ? a : t, t === a ? Po(e) ? zo(e) : To(e) : e.match(t) || [];
      }
      var sl = ce(function(e, t) {
        try {
          return rt(e, a, t);
        } catch (n) {
          return ga(n) ? n : new ne(n);
        }
      }), gp = Mt(function(e, t) {
        return dt(t, function(n) {
          n = Tt(n), Rt(e, n, ha(e[n], e));
        }), e;
      });
      function xp(e) {
        var t = e == null ? 0 : e.length, n = J();
        return e = t ? De(e, function(i) {
          if (typeof i[1] != "function")
            throw new ft(P);
          return [n(i[0]), i[1]];
        }) : [], ce(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (rt(l[0], this, i))
              return rt(l[1], this, i);
          }
        });
      }
      function yp(e) {
        return Wu(ht(e, x));
      }
      function _a(e) {
        return function() {
          return e;
        };
      }
      function kp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var vp = u0(), _p = u0(!0);
      function et(e) {
        return e;
      }
      function ba(e) {
        return Gs(typeof e == "function" ? e : ht(e, x));
      }
      function bp(e) {
        return Us(ht(e, x));
      }
      function Ep(e, t) {
        return Ws(e, ht(t, x));
      }
      var Sp = ce(function(e, t) {
        return function(n) {
          return Xn(n, e, t);
        };
      }), Ap = ce(function(e, t) {
        return function(n) {
          return Xn(e, n, t);
        };
      });
      function Ea(e, t, n) {
        var i = Ge(t), r = Fi(t, i);
        n == null && !(Le(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Fi(t, Ge(t)));
        var l = !(Le(n) && "chain" in n) || !!n.chain, u = Wt(e);
        return dt(r, function(c) {
          var f = t[c];
          e[c] = f, u && (e.prototype[c] = function() {
            var v = this.__chain__;
            if (l || v) {
              var _ = e(this.__wrapped__), b = _.__actions__ = Je(this.__actions__);
              return b.push({ func: f, args: arguments, thisArg: e }), _.__chain__ = v, _;
            }
            return f.apply(e, Xt([this.value()], arguments));
          });
        }), e;
      }
      function wp() {
        return Me._ === this && (Me._ = Jo), this;
      }
      function Sa() {
      }
      function Cp(e) {
        return e = le(e), ce(function(t) {
          return Ns(t, e);
        });
      }
      var Tp = ta(De), Dp = ta(cs), Ip = ta(wr);
      function ll(e) {
        return oa(e) ? Cr(Tt(e)) : a1(e);
      }
      function Lp(e) {
        return function(t) {
          return e == null ? a : mn(e, t);
        };
      }
      var Bp = d0(), Fp = d0(!0);
      function Aa() {
        return [];
      }
      function wa() {
        return !1;
      }
      function $p() {
        return {};
      }
      function Vp() {
        return "";
      }
      function Op() {
        return !0;
      }
      function Pp(e, t) {
        if (e = le(e), e < 1 || e > qe)
          return [];
        var n = T, i = ze(e, T);
        t = J(t), e -= T;
        for (var r = Ir(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Rp(e) {
        return re(e) ? De(e, Tt) : lt(e) ? [e] : Je(C0(_e(e)));
      }
      function Gp(e) {
        var t = ++Yo;
        return _e(e) + t;
      }
      var Mp = Gi(function(e, t) {
        return e + t;
      }, 0), Up = na("ceil"), Wp = Gi(function(e, t) {
        return e / t;
      }, 1), Np = na("floor");
      function qp(e) {
        return e && e.length ? Bi(e, et, Ur) : a;
      }
      function zp(e, t) {
        return e && e.length ? Bi(e, J(t, 2), Ur) : a;
      }
      function Hp(e) {
        return ps(e, et);
      }
      function Qp(e, t) {
        return ps(e, J(t, 2));
      }
      function Kp(e) {
        return e && e.length ? Bi(e, et, zr) : a;
      }
      function Yp(e, t) {
        return e && e.length ? Bi(e, J(t, 2), zr) : a;
      }
      var Zp = Gi(function(e, t) {
        return e * t;
      }, 1), Jp = na("round"), Xp = Gi(function(e, t) {
        return e - t;
      }, 0);
      function jp(e) {
        return e && e.length ? Dr(e, et) : 0;
      }
      function eh(e, t) {
        return e && e.length ? Dr(e, J(t, 2)) : 0;
      }
      return s.after = _d, s.ary = R0, s.assign = uf, s.assignIn = X0, s.assignInWith = Xi, s.assignWith = cf, s.at = df, s.before = G0, s.bind = ha, s.bindAll = gp, s.bindKey = M0, s.castArray = Fd, s.chain = V0, s.chunk = W1, s.compact = N1, s.concat = q1, s.cond = xp, s.conforms = yp, s.constant = _a, s.countBy = Xc, s.create = ff, s.curry = U0, s.curryRight = W0, s.debounce = N0, s.defaults = pf, s.defaultsDeep = hf, s.defer = bd, s.delay = Ed, s.difference = z1, s.differenceBy = H1, s.differenceWith = Q1, s.drop = K1, s.dropRight = Y1, s.dropRightWhile = Z1, s.dropWhile = J1, s.fill = X1, s.filter = ed, s.flatMap = id, s.flatMapDeep = rd, s.flatMapDepth = ad, s.flatten = L0, s.flattenDeep = j1, s.flattenDepth = ec, s.flip = Sd, s.flow = vp, s.flowRight = _p, s.fromPairs = tc, s.functions = _f, s.functionsIn = bf, s.groupBy = sd, s.initial = ic, s.intersection = rc, s.intersectionBy = ac, s.intersectionWith = sc, s.invert = Sf, s.invertBy = Af, s.invokeMap = od, s.iteratee = ba, s.keyBy = ud, s.keys = Ge, s.keysIn = je, s.map = Hi, s.mapKeys = Cf, s.mapValues = Tf, s.matches = bp, s.matchesProperty = Ep, s.memoize = Ki, s.merge = Df, s.mergeWith = j0, s.method = Sp, s.methodOf = Ap, s.mixin = Ea, s.negate = Yi, s.nthArg = Cp, s.omit = If, s.omitBy = Lf, s.once = Ad, s.orderBy = cd, s.over = Tp, s.overArgs = wd, s.overEvery = Dp, s.overSome = Ip, s.partial = ma, s.partialRight = q0, s.partition = dd, s.pick = Bf, s.pickBy = el, s.property = ll, s.propertyOf = Lp, s.pull = cc, s.pullAll = F0, s.pullAllBy = dc, s.pullAllWith = fc, s.pullAt = pc, s.range = Bp, s.rangeRight = Fp, s.rearg = Cd, s.reject = hd, s.remove = hc, s.rest = Td, s.reverse = fa, s.sampleSize = gd, s.set = $f, s.setWith = Vf, s.shuffle = xd, s.slice = mc, s.sortBy = vd, s.sortedUniq = bc, s.sortedUniqBy = Ec, s.split = rp, s.spread = Dd, s.tail = Sc, s.take = Ac, s.takeRight = wc, s.takeRightWhile = Cc, s.takeWhile = Tc, s.tap = Nc, s.throttle = Id, s.thru = zi, s.toArray = Y0, s.toPairs = tl, s.toPairsIn = nl, s.toPath = Rp, s.toPlainObject = J0, s.transform = Of, s.unary = Ld, s.union = Dc, s.unionBy = Ic, s.unionWith = Lc, s.uniq = Bc, s.uniqBy = Fc, s.uniqWith = $c, s.unset = Pf, s.unzip = pa, s.unzipWith = $0, s.update = Rf, s.updateWith = Gf, s.values = Gn, s.valuesIn = Mf, s.without = Vc, s.words = al, s.wrap = Bd, s.xor = Oc, s.xorBy = Pc, s.xorWith = Rc, s.zip = Gc, s.zipObject = Mc, s.zipObjectDeep = Uc, s.zipWith = Wc, s.entries = tl, s.entriesIn = nl, s.extend = X0, s.extendWith = Xi, Ea(s, s), s.add = Mp, s.attempt = sl, s.camelCase = qf, s.capitalize = il, s.ceil = Up, s.clamp = Uf, s.clone = $d, s.cloneDeep = Od, s.cloneDeepWith = Pd, s.cloneWith = Vd, s.conformsTo = Rd, s.deburr = rl, s.defaultTo = kp, s.divide = Wp, s.endsWith = zf, s.eq = Et, s.escape = Hf, s.escapeRegExp = Qf, s.every = jc, s.find = td, s.findIndex = D0, s.findKey = mf, s.findLast = nd, s.findLastIndex = I0, s.findLastKey = gf, s.floor = Np, s.forEach = O0, s.forEachRight = P0, s.forIn = xf, s.forInRight = yf, s.forOwn = kf, s.forOwnRight = vf, s.get = ya, s.gt = Gd, s.gte = Md, s.has = Ef, s.hasIn = ka, s.head = B0, s.identity = et, s.includes = ld, s.indexOf = nc, s.inRange = Wf, s.invoke = wf, s.isArguments = yn, s.isArray = re, s.isArrayBuffer = Ud, s.isArrayLike = Xe, s.isArrayLikeObject = $e, s.isBoolean = Wd, s.isBuffer = sn, s.isDate = Nd, s.isElement = qd, s.isEmpty = zd, s.isEqual = Hd, s.isEqualWith = Qd, s.isError = ga, s.isFinite = Kd, s.isFunction = Wt, s.isInteger = z0, s.isLength = Zi, s.isMap = H0, s.isMatch = Yd, s.isMatchWith = Zd, s.isNaN = Jd, s.isNative = Xd, s.isNil = ef, s.isNull = jd, s.isNumber = Q0, s.isObject = Le, s.isObjectLike = Be, s.isPlainObject = ri, s.isRegExp = xa, s.isSafeInteger = tf, s.isSet = K0, s.isString = Ji, s.isSymbol = lt, s.isTypedArray = Rn, s.isUndefined = nf, s.isWeakMap = rf, s.isWeakSet = af, s.join = lc, s.kebabCase = Kf, s.last = gt, s.lastIndexOf = oc, s.lowerCase = Yf, s.lowerFirst = Zf, s.lt = sf, s.lte = lf, s.max = qp, s.maxBy = zp, s.mean = Hp, s.meanBy = Qp, s.min = Kp, s.minBy = Yp, s.stubArray = Aa, s.stubFalse = wa, s.stubObject = $p, s.stubString = Vp, s.stubTrue = Op, s.multiply = Zp, s.nth = uc, s.noConflict = wp, s.noop = Sa, s.now = Qi, s.pad = Jf, s.padEnd = Xf, s.padStart = jf, s.parseInt = ep, s.random = Nf, s.reduce = fd, s.reduceRight = pd, s.repeat = tp, s.replace = np, s.result = Ff, s.round = Jp, s.runInContext = d, s.sample = md, s.size = yd, s.snakeCase = ip, s.some = kd, s.sortedIndex = gc, s.sortedIndexBy = xc, s.sortedIndexOf = yc, s.sortedLastIndex = kc, s.sortedLastIndexBy = vc, s.sortedLastIndexOf = _c, s.startCase = ap, s.startsWith = sp, s.subtract = Xp, s.sum = jp, s.sumBy = eh, s.template = lp, s.times = Pp, s.toFinite = Nt, s.toInteger = le, s.toLength = Z0, s.toLower = op, s.toNumber = xt, s.toSafeInteger = of, s.toString = _e, s.toUpper = up, s.trim = cp, s.trimEnd = dp, s.trimStart = fp, s.truncate = pp, s.unescape = hp, s.uniqueId = Gp, s.upperCase = mp, s.upperFirst = va, s.each = O0, s.eachRight = P0, s.first = B0, Ea(s, function() {
        var e = {};
        return wt(s, function(t, n) {
          be.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = A, dt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), dt(["drop", "take"], function(e, t) {
        pe.prototype[e] = function(n) {
          n = n === a ? 1 : Re(le(n), 0);
          var i = this.__filtered__ && !t ? new pe(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = ze(n, i.__takeCount__) : i.__views__.push({
            size: ze(n, T),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, pe.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), dt(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == zt || n == Wn;
        pe.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: J(r, 3),
            type: n
          }), l.__filtered__ = l.__filtered__ || i, l;
        };
      }), dt(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        pe.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), dt(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        pe.prototype[e] = function() {
          return this.__filtered__ ? new pe(this) : this[n](1);
        };
      }), pe.prototype.compact = function() {
        return this.filter(et);
      }, pe.prototype.find = function(e) {
        return this.filter(e).head();
      }, pe.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, pe.prototype.invokeMap = ce(function(e, t) {
        return typeof e == "function" ? new pe(this) : this.map(function(n) {
          return Xn(n, e, t);
        });
      }), pe.prototype.reject = function(e) {
        return this.filter(Yi(J(e)));
      }, pe.prototype.slice = function(e, t) {
        e = le(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new pe(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = le(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, pe.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, pe.prototype.toArray = function() {
        return this.take(T);
      }, wt(pe.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, f = u instanceof pe, v = c[0], _ = f || re(u), b = function(de) {
            var he = r.apply(s, Xt([de], c));
            return i && O ? he[0] : he;
          };
          _ && n && typeof v == "function" && v.length != 1 && (f = _ = !1);
          var O = this.__chain__, Q = !!this.__actions__.length, j = l && !O, ue = f && !Q;
          if (!l && _) {
            u = ue ? u : new pe(this);
            var ee = e.apply(u, c);
            return ee.__actions__.push({ func: zi, args: [b], thisArg: a }), new pt(ee, O);
          }
          return j && ue ? e.apply(this, c) : (ee = this.thru(b), j ? i ? ee.value()[0] : ee.value() : ee);
        });
      }), dt(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = xi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
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
      }), wt(pe.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          be.call(Fn, i) || (Fn[i] = []), Fn[i].push({ name: t, func: n });
        }
      }), Fn[Ri(a, ge).name] = [{
        name: "wrapper",
        func: a
      }], pe.prototype.clone = pu, pe.prototype.reverse = hu, pe.prototype.value = mu, s.prototype.at = qc, s.prototype.chain = zc, s.prototype.commit = Hc, s.prototype.next = Qc, s.prototype.plant = Yc, s.prototype.reverse = Zc, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = Jc, s.prototype.first = s.prototype.head, zn && (s.prototype[zn] = Kc), s;
    }, In = Ho();
    cn ? ((cn.exports = In)._ = In, br._ = In) : Me._ = In;
  }).call(ai);
})(er, er.exports);
var Vh = er.exports;
const Oh = { class: "d-flex align-items-center mb-30" }, Ph = {
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
    const a = D, A = o, k = Oe(() => A.filters ? A.filters.filter((F) => F.model) : []), U = Oe(() => {
      const F = {};
      return k.value.forEach((V) => {
        F[V.key] = V.model;
      }), F;
    }), P = Vh.debounce(() => {
      a(si.FILTER_CHANGE, U);
    }, 800);
    function L() {
      a(si.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (F, V) => (h(), y("div", {
      class: We(["base-table-filters", { inactive: o.inactive }])
    }, [
      p("h6", Oh, [
        Y(w(Bt), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        V[1] || (V[1] = tt(" Filters "))
      ]),
      ji(F.$slots, "customFields", {}, void 0, !0),
      (h(!0), y(me, null, we(o.filters, (E, x) => (h(), y(me, null, [
        E.type === "datetime" || E.type === "datetimehour" ? (h(), fe(w(pl), {
          class: "filter-elm",
          key: `${o.prefix}${E.key}`,
          label: E.value,
          disabled: o.filters[x].disabled,
          modelValue: o.filters[x].model,
          "onUpdate:modelValue": (C) => o.filters[x].model = C,
          onInput: w(P)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : E.dataSource ? (h(), fe(w(Dt), {
          class: "filter-elm",
          key: `${o.prefix}${E.key}`,
          options: E.key === "campaign" ? F.campaignlist : E.dataSource,
          label: E.value,
          disabled: o.filters[x].disabled,
          singleSelect: !1,
          modelValue: o.filters[x].model,
          "onUpdate:modelValue": (C) => o.filters[x].model = C,
          onClick: (C) => F.filterClicked(E.key),
          onInput: w(P)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), fe(w(It), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${E.key}`,
          label: E.value,
          disabled: o.filters[x].disabled,
          modelValue: o.filters[x].model,
          "onUpdate:modelValue": (C) => o.filters[x].model = C,
          onInput: w(P)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      Y(w(nt), {
        type: "tertiary",
        label: "Clear filters",
        onClick: V[0] || (V[0] = (E) => L())
      })
    ], 2));
  }
}, Rh = /* @__PURE__ */ Qe(Ph, [["__scopeId", "data-v-0bc5c036"]]), Gh = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: D }) {
    const a = D, k = o.options || {}, U = new IntersectionObserver(([L]) => {
      a("intersecting", L.isIntersecting);
    }, k), P = z(null);
    return bn(() => {
      P.value && U.observe(P.value);
    }), th(() => {
      U.disconnect();
    }), (L, F) => (h(), y("div", {
      ref_key: "targetELement",
      ref: P,
      class: "observer",
      style: { height: "3px" }
    }, [
      ji(L.$slots, "default")
    ], 512));
  }
}, yl = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", Mh = { class: "query-builder" }, Uh = { class: "query-conditions" }, Wh = { class: "condition" }, Nh = { class: "cell field" }, qh = { class: "cell operator" }, zh = { class: "cell value" }, Hh = {
  key: 0,
  class: "query-operator-outer"
}, Qh = {
  __name: "StandardQueryDisplay",
  props: {
    query: {
      type: Array,
      required: !0
    }
  },
  setup(o) {
    const D = o, a = Oe(() => D.query || []), A = (U) => {
      try {
        return new Date(U).toISOString().split("T")[0];
      } catch {
        return "-";
      }
    }, k = (U) => {
      const P = U == null ? void 0 : U.value;
      return P ? U.type === "date" ? A(P) : Array.isArray(P) ? P.join(", ") : typeof P == "boolean" ? P ? "True" : "False" : P : "-";
    };
    return (U, P) => (h(), y("div", Mh, [
      p("div", Uh, [
        P[1] || (P[1] = p("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), y(me, null, we(a.value, (L, F) => (h(), y("div", { key: F }, [
          p("div", Wh, [
            p("div", Nh, ie(L.field), 1),
            p("div", qh, ie(L.operator), 1),
            p("div", zh, ie(k(L)), 1),
            Y(w(nt), {
              type: "tertiary",
              icon: "bi-arrows-expand"
            })
          ]),
          a.value.length > 1 && F !== a.value.length - 1 ? (h(), y("div", Hh, P[0] || (P[0] = [
            p("div", { class: "query-operator" }, " And", -1)
          ]))) : B("", !0)
        ]))), 128))
      ])
    ]));
  }
}, Kh = /* @__PURE__ */ Qe(Qh, [["__scopeId", "data-v-3dc13d1f"]]), Yh = { class: "info-card" }, Zh = { class: "segments" }, Jh = { class: "segment-img-wrapper" }, Xh = ["src"], jh = { class: "segment-info" }, e2 = {
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
    const D = o, a = Oe(() => !D.segmentData || !D.segmentData.segments ? [] : D.isThumbnail ? D.segmentData.segments.slice(0, 4) : D.segmentData.segments);
    return (A, k) => (h(), y("div", Yh, [
      k[2] || (k[2] = p("h5", null, "Top Interests", -1)),
      p("div", Zh, [
        (h(!0), y(me, null, we(a.value, (U) => (h(), y("div", {
          class: "segment",
          key: U.name
        }, [
          p("div", Jh, [
            p("img", {
              src: U.image,
              alt: "segment"
            }, null, 8, Xh)
          ]),
          p("div", jh, [
            p("h4", null, ie(U.name), 1),
            p("p", null, [
              k[0] || (k[0] = p("span", null, "Reach:", -1)),
              tt(" " + ie(U.reach), 1)
            ]),
            p("p", null, [
              k[1] || (k[1] = p("span", null, "Share:", -1)),
              tt(" " + ie(U.impressions), 1)
            ])
          ])
        ]))), 128))
      ])
    ]));
  }
}, t2 = /* @__PURE__ */ Qe(e2, [["__scopeId", "data-v-31828828"]]), n2 = { class: "segment-details-insigts mt-4" }, i2 = { class: "insights-title-wrapper" }, r2 = { class: "mt-3" }, a2 = { class: "query-result" }, s2 = {
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
    const a = o, A = on(), k = D;
    Oe(() => {
      var L, F, V;
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
          categories: ((F = (L = a.selectedSegment.thumbnail) == null ? void 0 : L.graph) == null ? void 0 : F.labels) || []
        },
        colors: [
          "#0A2FFF",
          "#0068AD"
        ],
        title: {
          text: ((V = a.selectedSegment.thumbnail) == null ? void 0 : V.title) || "",
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
    }), Oe(() => {
      var L, F, V;
      return ((V = (F = (L = a.selectedSegment.thumbnail) == null ? void 0 : L.graph) == null ? void 0 : F.seriesCombined) == null ? void 0 : V.map((E) => ({
        name: E.name,
        data: E.data.map(Number)
      }))) || [];
    });
    const U = Oe(() => {
      var L, F, V, E;
      return ((E = (V = (F = (L = a.selectedSegment.thumbnail) == null ? void 0 : L.segments) == null ? void 0 : F[0]) == null ? void 0 : V.segments) == null ? void 0 : E.slice(0, 2)) || [];
    });
    Oe(() => U.value.map((V) => parseFloat(V.affinityScore || "0")).reduce((V, E) => V + E, 0).toFixed(2)), Oe(() => U.value.map((F) => parseInt(F.reach || "0", 10)).reduce((F, V) => F + V, 0).toLocaleString());
    function P() {
      A.set_selectedSegmentType(a.location), A.set_activeTab("custom"), A.set_selectedSegment(a.selectedSegment), k("showInsightsExplorer", a.selectedSegment);
    }
    return (L, F) => {
      const V = fl("CataUiTooltip");
      return h(), y("div", null, [
        p("div", n2, [
          p("div", i2, [
            F[2] || (F[2] = p("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            p("p", r2, [
              F[1] || (F[1] = tt("Find the segments that work best with ")),
              p("span", a2, ie(a.selectedSegment.name), 1)
            ]),
            Y(V, { label: "The preview is for your external proofing tool." })
          ]),
          Y(w(nt), {
            type: "secondary",
            label: "Explore",
            onClick: F[0] || (F[0] = (E) => P())
          })
        ])
      ]);
    };
  }
}, l2 = /* @__PURE__ */ Qe(s2, [["__scopeId", "data-v-5b4c0a39"]]), o2 = { class: "modal-body" }, u2 = { class: "section" }, c2 = { class: "checkbox-group" }, d2 = { class: "checkbox-group" }, f2 = { class: "sections-wrapper" }, p2 = { class: "section" }, h2 = { class: "checkbox-group-catergory" }, m2 = { class: "section" }, g2 = { class: "ccheckbox-group-catergory" }, x2 = { class: "section" }, y2 = { class: "checkbox-group-category" }, k2 = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: D }) {
    const a = D, A = z([]), k = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], U = ["Build new campaign", "Update current campaign"], P = ["Display & Video 360", "The Trade Desk"], L = ["Infosum", "LiveRamp"];
    function F() {
      a("close");
    }
    const V = () => {
      a("insertSegment"), F();
    };
    return (E, x) => {
      const C = fl("hp");
      return h(), fe(w(hl), {
        onClose: F,
        size: "medium"
      }, {
        header: Lt(() => x[5] || (x[5] = [
          p("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: Lt(() => [
          p("div", o2, [
            p("div", u2, [
              Y(C, null, {
                default: Lt(() => x[6] || (x[6] = [
                  tt("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              p("div", c2, [
                (h(), y(me, null, we(k, (G) => Y(w(vn), {
                  key: G,
                  label: G,
                  modelValue: A.value,
                  "onUpdate:modelValue": x[0] || (x[0] = (Z) => A.value = Z),
                  value: G
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            x[10] || (x[10] = p("hr", null, null, -1)),
            p("div", d2, [
              (h(), y(me, null, we(U, (G) => Y(w(vn), {
                key: G,
                label: G,
                modelValue: A.value,
                "onUpdate:modelValue": x[1] || (x[1] = (Z) => A.value = Z),
                value: G
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            p("div", f2, [
              p("div", p2, [
                x[7] || (x[7] = p("h3", null, "Cohort", -1)),
                p("div", h2, [
                  (h(), y(me, null, we(P, (G) => Y(w(vn), {
                    key: G,
                    label: G,
                    modelValue: A.value,
                    "onUpdate:modelValue": x[2] || (x[2] = (Z) => A.value = Z),
                    value: G
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              p("div", m2, [
                x[8] || (x[8] = p("h3", null, "Clean Room", -1)),
                p("div", g2, [
                  (h(), y(me, null, we(L, (G) => Y(w(vn), {
                    key: G,
                    label: G,
                    modelValue: A.value,
                    "onUpdate:modelValue": x[3] || (x[3] = (Z) => A.value = Z),
                    value: G
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              p("div", x2, [
                x[9] || (x[9] = p("h3", null, "WPP Open", -1)),
                p("div", y2, [
                  Y(w(vn), {
                    label: "Open Media Studio",
                    modelValue: A.value,
                    "onUpdate:modelValue": x[4] || (x[4] = (G) => A.value = G),
                    value: "Open Media Studio"
                  }, null, 8, ["modelValue"])
                ])
              ])
            ])
          ])
        ]),
        footer: Lt(() => [
          Y(w(nt), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: F
          }),
          Y(w(nt), {
            type: "primary",
            label: "Push",
            onClick: V
          })
        ]),
        _: 1
      });
    };
  }
}, v2 = /* @__PURE__ */ Qe(k2, [["__scopeId", "data-v-258e10c9"]]), _2 = [
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
], b2 = {
  charts: _2
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
}, Ba = {
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
}, kl = {
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
}, E2 = { class: "segment-details" }, S2 = { class: "wrapper-left" }, A2 = { class: "source-wrapper" }, w2 = { class: "source-container" }, C2 = { class: "sub-controls" }, T2 = { class: "sub-tab-container" }, D2 = { class: "sub-controls-tabs" }, I2 = { class: "sub-controls-tools" }, L2 = { class: "list" }, B2 = {
  key: 0,
  class: "d-flex justify-content-center pt-40 pb-40"
}, F2 = { class: "wrapper-right" }, $2 = {
  key: 0,
  class: "segment-details-wrapper"
}, V2 = {
  key: 0,
  class: "segment-details-title"
}, O2 = { class: "segment-details-content" }, P2 = {
  key: 0,
  class: "description-row"
}, R2 = { class: "description-detail" }, G2 = {
  key: 1,
  class: "description-row"
}, M2 = { class: "description-detail" }, U2 = {
  key: 2,
  class: "description-row"
}, W2 = { class: "description-detail" }, N2 = {
  key: 3,
  class: "description-row"
}, q2 = { class: "description-detail" }, z2 = {
  key: 4,
  class: "description-row"
}, H2 = { class: "description-detail" }, Q2 = {
  key: 5,
  class: "description-row"
}, K2 = { class: "description-detail" }, Y2 = {
  key: 6,
  class: "description-row"
}, Z2 = { class: "description-detail" }, J2 = {
  key: 7,
  class: "description-row"
}, X2 = { class: "description-detail" }, j2 = {
  key: 8,
  class: "description-row"
}, em = { class: "description-detail-bold" }, tm = {
  key: 0,
  class: "description-detail"
}, nm = { class: "description-row" }, im = { class: "description-term" }, rm = { class: "description-detail" }, am = {
  key: 1,
  class: "standard-view"
}, sm = ["src"], lm = {
  key: 0,
  class: "footer"
}, om = { class: "footer-text" }, um = { class: "footer-description-detail" }, cm = {
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
    z([]);
    const k = on(), U = z(null), P = z(null), L = z(!1), F = z([]), V = z(""), E = z([]), x = z(""), C = z(""), G = z(!1), Z = [
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
    ], ye = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], K = z(Z[0]), ge = z(ye[0]), xe = z(!1), ve = z([
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
    ]), Ie = [
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
    ], H = z({}), $ = z(""), I = z({
      sortColumn: "name",
      sortOrder: 1
    });
    function W() {
      k.set_selectedSegmentType("standard"), k.set_selectedSegment($.value), A("showInsightsExplorer", $.value);
    }
    async function oe() {
      var T;
      if (!((T = $.value) != null && T.segmentId))
        return;
      const q = `${a.baseUrl}/api/v1/segments/${$.value.segmentId}`;
      try {
        const ae = await fetch(q, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!ae.ok) {
          const yt = await ae.text();
          throw new Error(yt || "Failed to delete segment");
        }
        $.value = "", await k.fetch_segments(x.value);
      } catch (ae) {
        console.error("Error deleting segment:", ae);
      }
    }
    function Fe(q) {
      return q.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (T) => T.toUpperCase());
    }
    function Ne(q) {
      return q == null ? "" : (typeof q == "string" ? parseInt(q, 10) : q).toLocaleString();
    }
    function Ft(q) {
      H.value = q, k.set_filterQuery(q), k.fetch_segments(x.value);
    }
    async function un(q) {
      if (q && k.get_isLastPage && !xe.value && k.get_segments && k.get_segments.length > 0) {
        xe.value = !0;
        try {
          await k.fetch_nextSegmentPage(x.value), xe.value = !1;
        } catch {
          xe.value = !1;
        }
      }
    }
    async function zt() {
      ve.value.map((q) => {
        q.key !== "market" && (q.model = "");
      }), k.reset_filterQuery(), await k.fetch_segments(x.value);
    }
    function Un(q) {
      I.value = q;
    }
    function Wn() {
      L.value = !L.value;
    }
    function Ht(q) {
      $.value = q.row;
    }
    function qe() {
      G.value = !0;
    }
    async function te() {
      await k.set_token(a.token), await k.set_brandId(a.brandId), await k.set_tenantId(a.tenantId), await k.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? $.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && ($.value = a.selectedSegment), await k.fetch_segment_settings(a.brandId);
      try {
        const q = await k.get_segment_settings;
        q && (E.value = await q.platforms.map((T) => ({
          value: T.platform_id,
          label: T.platform,
          locations: T.locations.map((ae) => ({
            value: ae.value,
            label: ae.display_name
          }))
        }))), x.value = E.value[0].value;
      } catch (q) {
        console.log(q);
      }
    }
    return bn(() => {
      P.value = U.value, te();
    }), ln(x, async (q, T) => {
      q && T !== q && (F.value = E.value[q - 1].locations, V.value = F.value[0].value, xe.value = !0, k.set_platform(q), await k.fetch_segments(q), K.value = Z[0], xe.value = !1);
    }), ln(C, async (q) => {
      q && (q == null ? void 0 : q.length) < 3 || (k.set_searchTerm(q), k.fetch_segments(x.value));
    }), ln(V, async (q) => {
      k.set_locationQuery(q), k.fetch_segments(x.value);
    }), ln(I, async (q) => {
      k.set_sortQuery(q), k.fetch_segments(x.value);
    }), ln(K, async (q) => {
      const T = q.id;
      k.set_categoryQuery(T), k.fetch_segments();
    }), Oe(() => b2.charts.map((q) => {
      var kt, $t;
      const T = kl[q.type] || ((kt = q.type) == null ? void 0 : kt.toLowerCase()), ae = Ba[T] || {};
      console.log("type", T), console.log("baseOptions", ae);
      let yt = {}, At = [];
      return T === "line" || T === "area" ? (yt = {
        xaxis: {
          categories: q.data.map((Te) => Te.key),
          labels: { style: { fontSize: "12px", colors: "#777" } },
          axisBorder: { show: !1 },
          axisTicks: { show: !1 }
        },
        yaxis: {
          labels: {
            style: { fontSize: "12px", colors: "#777" },
            formatter: (Te) => Te > 1e3 ? `${(Te / 1e3).toFixed(1)}K` : Te
          }
        }
      }, At = [{
        name: (($t = q.data[0]) == null ? void 0 : $t.valueType) || "Value",
        data: q.data.map((Te) => Number(Te.value))
      }]) : T === "bar" ? (yt = {
        xaxis: {
          categories: q.data.map((Te) => Te.key)
        }
      }, At = [{
        name: q.title,
        data: q.data.map((Te) => Number(Te.value))
      }]) : T === "donut" || T === "pie" ? (yt = {
        labels: q.data.map((Te) => Te.key)
      }, At = q.data.map((Te) => Number(Te.value))) : T === "bubble" && (At = [{
        name: q.title,
        data: q.data.map((Te) => ({
          x: Number(Te.x),
          y: Number(Te.y),
          z: Number(Te.z)
        }))
      }]), console.log("series", At), console.log("dynamicOptions", yt), {
        series: At,
        options: {
          ...ae,
          ...yt,
          title: {
            ...ae.title,
            text: q.title
          },
          chart: {
            // ...baseOptions.chart,
            type: T
          }
        },
        chartType: T
      };
    })), (q, T) => (h(), y(me, null, [
      p("div", E2, [
        p("div", S2, [
          p("div", A2, [
            p("div", w2, [
              Y(w(Dt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: E.value,
                modelValue: x.value,
                "onUpdate:modelValue": T[0] || (T[0] = (ae) => x.value = ae),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              Y(w(Dt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: F.value,
                modelValue: V.value,
                "onUpdate:modelValue": T[1] || (T[1] = (ae) => V.value = ae),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            Y(w(It), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: C.value,
              "onUpdate:modelValue": T[2] || (T[2] = (ae) => C.value = ae)
            }, null, 8, ["modelValue"])
          ]),
          p("div", C2, [
            p("div", T2, [
              p("div", D2, [
                Y(w(Ia), {
                  tabs: Z,
                  modelValue: K.value,
                  "onUpdate:modelValue": T[3] || (T[3] = (ae) => K.value = ae),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              p("div", I2, [
                Y(w(Bt), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: T[4] || (T[4] = (ae) => Wn())
                })
              ])
            ])
          ]),
          p("div", L2, [
            p("div", {
              class: "list-list",
              ref_key: "list",
              ref: U
            }, [
              Y($h, {
                stickyHeader: 0,
                columns: Ie,
                rows: w(k).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: T[5] || (T[5] = (ae) => Ht(ae)),
                onColumnSorted: T[6] || (T[6] = (ae) => Un(ae)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              xe.value ? (h(), y("div", B2, [
                Y(w(Mn), { size: "xlarge" })
              ])) : B("", !0),
              Y(Gh, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: T[7] || (T[7] = (ae) => un(ae))
              })
            ], 512),
            L.value ? (h(), fe(Rh, {
              key: 0,
              filters: ve.value,
              onClearFilters: T[8] || (T[8] = (ae) => zt()),
              onFilterChange: T[9] || (T[9] = (ae) => Ft(ae))
            }, null, 8, ["filters"])) : B("", !0)
          ])
        ]),
        p("div", F2, [
          p("div", {
            class: We(["outer-wrapper-segment-details", { "standard-empty": !$.value }])
          }, [
            $.value ? (h(), y("div", $2, [
              $.value ? (h(), y("div", V2, ie($.value.name), 1)) : B("", !0),
              T[24] || (T[24] = p("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              p("div", O2, [
                $.value.name ? (h(), y("div", P2, [
                  T[15] || (T[15] = p("div", { class: "description-term" }, "Name", -1)),
                  p("div", R2, ie($.value.name), 1)
                ])) : B("", !0),
                $.value.description ? (h(), y("div", G2, [
                  T[16] || (T[16] = p("div", { class: "description-term" }, "Description", -1)),
                  p("div", M2, ie($.value.description), 1)
                ])) : B("", !0),
                $.value.sourceCreatedDate ? (h(), y("div", U2, [
                  T[17] || (T[17] = p("div", { class: "description-term" }, "Created", -1)),
                  p("div", W2, ie(w(_n)($.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                $.value.sourceUpdatedDate ? (h(), y("div", N2, [
                  T[18] || (T[18] = p("div", { class: "description-term" }, "Updated", -1)),
                  p("div", q2, ie(w(_n)($.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                $.value.status ? (h(), y("div", z2, [
                  T[19] || (T[19] = p("div", { class: "description-term" }, "Status", -1)),
                  p("div", H2, ie($.value.status.value), 1)
                ])) : B("", !0),
                $.value.expiration_date ? (h(), y("div", Q2, [
                  T[20] || (T[20] = p("div", { class: "description-term" }, "Expiration", -1)),
                  p("div", K2, ie($.value.expiration_date), 1)
                ])) : B("", !0),
                $.value.id ? (h(), y("div", Y2, [
                  T[21] || (T[21] = p("div", { class: "description-term" }, "Segmnent ID", -1)),
                  p("div", Z2, ie($.value.id), 1)
                ])) : B("", !0),
                $.value.audience_id ? (h(), y("div", J2, [
                  T[22] || (T[22] = p("div", { class: "description-term" }, "Audience ID", -1)),
                  p("div", X2, ie($.value.audience_id), 1)
                ])) : B("", !0),
                $.value.count ? (h(), y("div", j2, [
                  T[23] || (T[23] = p("div", { class: "description-term" }, "Last count", -1)),
                  p("div", em, ie(Ne($.value.count)), 1),
                  $.value.refreshCountDate ? (h(), y("span", tm, " (" + ie(w(_n)($.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : B("", !0)
                ])) : B("", !0),
                $.value.platform_specific ? (h(!0), y(me, { key: 9 }, we($.value.platform_specific, (ae) => (h(), y("div", nm, [
                  p("div", im, ie(Fe(ae.label)), 1),
                  p("div", rm, ie(ae.value), 1)
                ]))), 256)) : B("", !0)
              ]),
              p("div", null, [
                Y(w(Ia), {
                  tabs: ye,
                  modelValue: ge.value,
                  "onUpdate:modelValue": T[10] || (T[10] = (ae) => ge.value = ae),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                ge.value.id === 2 ? (h(), fe(Kh, {
                  key: 0,
                  query: $.value.query
                }, null, 8, ["query"])) : B("", !0)
              ])
            ])) : B("", !0),
            $.value ? B("", !0) : (h(), y("div", am, [
              p("div", null, [
                p("img", {
                  class: "",
                  alt: "standardIcon",
                  src: w(yl)
                }, null, 8, sm)
              ]),
              T[25] || (T[25] = p("div", { class: "standard-view-title" }, [
                p("div", null, "Select a standard segment from the list"),
                p("div", null, "or"),
                p("div", null, [
                  p("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          $.value.name ? (h(), y("div", lm, [
            p("div", om, [
              T[26] || (T[26] = p("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              p("div", um, [
                p("span", null, ie($.value.name ? `${`${$.value.name} - `}` : "none"), 1),
                p("span", null, ie(Ne($.value.count)), 1)
              ])
            ]),
            p("div", null, [
              Y(w(nt), {
                type: "secondary",
                label: "Explore",
                onClick: T[11] || (T[11] = (ae) => W()),
                class: "mr-2"
              }),
              Y(w(nt), {
                type: "delete",
                label: "Delete",
                onClick: T[12] || (T[12] = (ae) => oe()),
                class: "mr-2 redButton"
              }),
              Y(w(nt), {
                type: "primary",
                label: "Push to destination",
                onClick: T[13] || (T[13] = (ae) => qe())
              })
            ])
          ])) : B("", !0)
        ])
      ]),
      G.value ? (h(), fe(v2, {
        key: 0,
        onClose: T[14] || (T[14] = (ae) => G.value = !1)
      })) : B("", !0)
    ], 64));
  }
}, dm = /* @__PURE__ */ Qe(cm, [["__scopeId", "data-v-ee51002a"]]), fm = { class: "feedback-title-wrapper" }, pm = { class: "title" }, hm = { class: "feedback-text" }, mm = {
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
      var k, U, P;
      return o.feedback ? (h(), y("div", {
        key: 0,
        class: We(["ai-query-feedback", [o.feedback.type]])
      }, [
        p("div", fm, [
          Y(w(Bt), {
            class: "pr-2",
            size: "16px",
            icon: D[(k = o.feedback) == null ? void 0 : k.type],
            color: D[`icon-color-${(U = o.feedback) == null ? void 0 : U.type}`]
          }, null, 8, ["icon", "color"]),
          p("div", pm, ie(o.feedback.title), 1)
        ]),
        p("p", hm, ie((P = o.feedback) == null ? void 0 : P.text), 1)
      ], 2)) : B("", !0);
    };
  }
}, dl = /* @__PURE__ */ Qe(mm, [["__scopeId", "data-v-8b6b4205"]]), gm = { key: 0 }, xm = { class: "d-flex justify-content-between" }, ym = { class: "query-results" }, km = { class: "query-result" }, vm = { class: "query-result-count" }, _m = {
  key: 0,
  class: "segment-insights"
}, bm = {
  key: 1,
  class: "loading"
}, Em = {
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
    z(!1);
    const k = z(!1), U = {
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
    }, P = [
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
    function L() {
      a("explore-insights");
    }
    function F(V) {
      return V == null ? "" : (typeof V == "string" ? parseInt(V, 10) : V).toLocaleString();
    }
    return (V, E) => (h(), y("div", null, [
      o.savingDraft ? B("", !0) : (h(), y("div", gm, [
        p("div", xm, [
          E[1] || (E[1] = p("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          k.value ? (h(), fe(w(nt), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: E[0] || (E[0] = (x) => L())
          })) : B("", !0)
        ]),
        p("div", ym, [
          p("div", km, [
            E[2] || (E[2] = tt(" Segment size ")),
            p("span", vm, ie(F(A.segmentCount)), 1),
            E[3] || (E[3] = tt(" records. "))
          ])
        ]),
        k.value ? (h(), y("div", _m, [
          Y(w(gl), {
            options: U,
            series: P
          })
        ])) : B("", !0)
      ])),
      o.savingDraft ? (h(), y("div", bm, [
        Y(w(Mn), { size: "xlarge" }),
        E[4] || (E[4] = p("p", null, "Connecting to Open Intelligence...", -1))
      ])) : B("", !0)
    ]));
  }
}, Sm = /* @__PURE__ */ Qe(Em, [["__scopeId", "data-v-dea42952"]]), Am = { class: "query-attributes" }, wm = ["onClick", "onKeydown"], Cm = {
  key: 0,
  class: "query-attributes-group-items"
}, Tm = ["onClick"], Dm = { class: "attribute-type" }, Im = { class: "attribute-name" }, Lm = {
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
    function A(U) {
      a("toggle-group", U);
    }
    function k(U, P) {
      return P[U];
    }
    return (U, P) => (h(), y("div", Am, [
      o.fetching ? (h(), fe(w(Mn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : B("", !0),
      (h(!0), y(me, null, we(o.tables, (L) => (h(), y("div", {
        class: We(["query-attributes-group", { closed: o.collapsed.includes(L.display_name) }]),
        key: L.display_name
      }, [
        p("div", {
          class: "query-attributes-group-toggle",
          onClick: (F) => A(L.display_name),
          onKeydown: Fa((F) => A(L.display_name), ["enter"])
        }, [
          P[3] || (P[3] = p("span", { class: "arrow" }, null, -1)),
          tt(" " + ie(L.display_name), 1)
        ], 40, wm),
        o.collapsed.includes(L.display_name) ? B("", !0) : (h(), y("div", Cm, [
          Y(w(La), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (F) => k(F, L.columns),
            onDragEnd: P[2] || (P[2] = (F) => U.$emit("drag-end"))
          }, {
            default: Lt(() => [
              (h(!0), y(me, null, we(L.columns, (F) => (h(), fe(w(ah), {
                key: F.display_name
              }, {
                default: Lt(() => [
                  p("div", {
                    class: "attribute",
                    onMousedown: P[0] || (P[0] = (V) => U.$emit("drag-start")),
                    onMouseup: P[1] || (P[1] = (V) => U.$emit("drag-end"))
                  }, [
                    Y(w(Bt), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    p("div", {
                      class: "attribute-content",
                      onClick: nh((V) => U.$emit("click-attribute", F), ["stop"])
                    }, [
                      p("span", Dm, ie(F.type), 1),
                      p("span", Im, ie(F.display_name), 1)
                    ], 8, Tm)
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
}, Bm = /* @__PURE__ */ Qe(Lm, [["__scopeId", "data-v-d9536002"]]), Fm = { class: "freeform-tab" }, $m = {
  __name: "FreeForm",
  setup(o) {
    tr();
    const D = z("");
    return (a, A) => (h(), y("div", Fm, [
      Y(w(It), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: D.value,
        "onUpdate:modelValue": A[0] || (A[0] = (k) => D.value = k)
      }, null, 8, ["modelValue"])
    ]));
  }
}, Vm = /* @__PURE__ */ Qe($m, [["__scopeId", "data-v-87b28c22"]]), Om = { class: "query-builder" }, Pm = { class: "query-builder-left" }, Rm = { class: "query-tabs" }, Gm = { class: "source" }, Mm = {
  key: 1,
  class: "ai-query-tab"
}, Um = {
  key: 2,
  class: ""
}, Wm = { class: "query-builder-right" }, Nm = { class: "query-content-scrollable" }, qm = { class: "query-editor-wrapper" }, zm = { class: "query-runner-button-wrapper" }, Hm = {
  key: 0,
  class: "query-editor"
}, Qm = { class: "queries" }, Km = {
  key: 0,
  class: "query"
}, Ym = ["onClick", "onKeydown"], Zm = { class: "w-100 pr-10" }, Jm = {
  key: 0,
  class: "sub-query-outer"
}, Xm = { class: "sub-queries" }, jm = {
  key: 0,
  class: "query-operator-inner",
  style: { width: "fit-content" }
}, eg = {
  key: 1,
  class: "pt-3 pb-2"
}, tg = { key: 0 }, ng = {
  key: 1,
  class: "px-2"
}, ig = {
  key: 1,
  class: "query-operator-outer"
}, rg = {
  key: 0,
  class: "inital-view"
}, ag = ["src"], sg = { key: 0 }, lg = {
  key: 0,
  class: "query-results-wrapper"
}, og = {
  key: 1,
  class: "loading-query-run"
}, ug = {
  key: 2,
  class: "loading-query-run"
}, cg = {
  key: 0,
  class: "mt-3"
}, dg = {
  key: 1,
  class: "mt-3"
}, fg = { class: "query-builder-footer" }, pg = { class: "query-builder-footer-fields" }, hg = {
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
    const a = o, A = on(), k = tr(), U = D;
    z();
    const P = [
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
    ], L = z(P[0]), F = z([]), V = z(F.value[0]), E = z([]), x = z(E.value[0]), C = z(""), G = z(null), Z = z(!1), ye = z(null), K = z(!0), ge = z(!1), xe = z([]), ve = z([]), Ie = z(!1), H = z(!1), $ = z(""), I = z(""), W = z(!1), oe = z(!1), Fe = z(!1), Ne = z(""), Ft = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], un = [
      { value: "$eq", label: "equal" }
    ], zt = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$in", label: "in" },
      { value: "$nin", label: "not in" }
    ], Un = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$bw", label: "begins with" },
      { value: "$nbw", label: "not begins with" },
      { value: "$ew", label: "ends with" },
      { value: "$new", label: "not ends with" }
    ], Wn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$bt", label: "between" },
      { value: "$nbt", label: "not between" }
    ], Ht = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], qe = z(0), te = z({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), q = () => {
      A.set_selectedSegmentType("custom"), A.set_activeTab("custom"), A.set_selectedSegment(G.value), U("showInsightsExplorer", G.value);
    };
    function T(X) {
      const S = {
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
      return X.filter((M) => M.statement).map(({ statement: M, input_type: Se }) => {
        const [R, se, Zt] = M;
        return {
          field: R,
          operator: S[se] || se,
          value: Zt,
          type: Se
        };
      });
    }
    async function ae(X) {
      const S = {
        brandName: a.brandName,
        name: X.name,
        description: X.description,
        count: X.count || C.value
      }, M = `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${X.segmentId}`, Se = await fetch(M, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(S)
      });
      if (!Se.ok) {
        const R = await Se.json();
        throw new Error(R.message || "Failed to generate insights");
      }
      await Se.json();
    }
    async function yt() {
      Ne.value = "saving", Fe.value = !0;
      const X = {
        platformId: x.value,
        count: C.value,
        region: A.query.demographics.region,
        market: A.query.demographics.market,
        description: te.value.description,
        name: te.value.name,
        query: T(te.value.conditions[0].group)
      };
      try {
        const S = await fetch("https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          },
          body: JSON.stringify(X)
        }), M = await S.json();
        if (!S.ok)
          throw new Error(M.message || "Failed to save segment");
        oe.value = !0, H.value = !0, Ne.value = "generating", G.value = M.data[0], await ae(M.data[0]), Ne.value = "done";
      } catch (S) {
        console.error("Error saving segment or generating insights:", S), Ne.value = "";
      } finally {
        Fe.value = !1;
      }
    }
    async function At() {
      W.value = !0;
      const X = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: I.value
      };
      te.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const S = await k.generate_ai_query(X, x.value, V.value), M = {
        text: S.message,
        type: S.query ? "info" : "warning",
        title: "AI Assumption"
      }, Se = {
        text: S.query,
        type: "query",
        title: "Query Gen"
      };
      k.set_ai_generated_message(M), k.set_ai_generated_query(Se), S.attrs.forEach((R, se) => {
        se === 0 ? ye.value = "queryGroupDrop" : ye.value = te.value.conditions[0].id;
        const Zt = {
          payload: {
            display_name: R.field,
            input_type: R.input_type,
            operators: R.operator,
            selectors: []
          }
        };
        Zt.payload.selectors.push(R.value), Vt(Zt), ul();
      }), W.value = !1;
    }
    async function kt() {
      te.value.conditions.forEach((X) => {
        X.group.forEach((S) => {
          S.input_type === "select" && S.statement[2].length > 1 && S.statement[1] === "$eq" && (S.statement[1] = "$in"), S.input_type === "select" && S.statement[2].length > 1 && S.statement[1] === "$neq" && (S.statement[1] = "$nin");
        });
      });
    }
    async function $t() {
      Ie.value = !0, L.value.id === 1 && await kt(), C.value = await k.run_query(te.value, x.value, V.value), C.value && (H.value = !0), Ie.value = !1, oe.value = !1;
    }
    function Te(X, S) {
      var Se, R;
      return X === "operatorsQueries" ? (Se = Ft.find((se) => se.value === S)) == null ? void 0 : Se.label : (R = Qt(X).find((se) => se.value === S)) == null ? void 0 : R.label;
    }
    function Qt(X) {
      switch (X) {
        case "select":
          return zt;
        case "boolean":
          return un;
        case "string":
          return Un;
        case "date":
          return Wn;
        case "int":
          return Ht;
        default:
          return [];
      }
    }
    function Kt(X) {
      Z.value = X;
    }
    async function ir() {
      ge.value = !0, await k.fetch_database_model(x.value, V.value), ge.value = !1;
    }
    async function Sn() {
      K.value = !0, await k.fetch_custom_segment_settings();
      const X = await k.get_segment_settings;
      X && (E.value = await X.platforms.map((S) => ({
        value: S.platform_id,
        label: S.platform,
        locations: S.locations.map((M) => ({
          value: M.value,
          label: M.display_name
        }))
      })), x.value = E.value[0].value), K.value = !1;
    }
    function Vt(X) {
      const S = X.payload ? X.payload : X;
      if (qe.value < k.settings.maxSubQuery) {
        const M = S.selectors.map((se) => ({
          value: se,
          label: se
        }));
        let Se = [];
        M.length > 2 ? Se[0] = M[0].value : M.length > 0 ? Se = M[0].value : Se = null;
        const R = M.length > 0 && S.input_type !== "boolean" ? "select" : S.input_type;
        if (ye.value === "queryGroupDrop") {
          qe.value += 1, te.value.conditions.length > 0 && te.value.conditions.push({ logic: "$or" });
          const se = {
            id: Ca(),
            group: [
              {
                id: Ca(),
                statement: [S.display_name, "$eq", Se],
                selectors: M,
                input_type: R
              }
            ]
          };
          te.value.conditions.push(se);
        } else if (ye.value !== null) {
          qe.value += 1;
          const se = te.value.conditions.findIndex(
            (Zt) => Zt.id === ye.value
          );
          se !== -1 && (te.value.conditions[se].group.push({ logic: "$and" }), te.value.conditions[se].group.push({
            id: Ca(),
            statement: [S.display_name, "$eq", Se],
            selectors: M,
            input_type: R
          }));
        }
        ye.value = null;
      }
    }
    function ui(X) {
      var S;
      (S = te.value.conditions[0]) != null && S.id ? ye.value = te.value.conditions[0].id : ye.value = "queryGroupDrop", Vt(X), ul();
    }
    function it(X, S, M) {
      if (te.value.conditions[S].group.length === 1)
        te.value.conditions.length > S + 1 ? te.value.conditions.splice(S, 2) : te.value.conditions.splice(S, 1), qe.value -= 1;
      else {
        const Se = te.value.conditions[S].group.findIndex(
          (R) => R.id === M
        );
        te.value.conditions[S].group.splice(Se - 1, 2), qe.value -= 1;
      }
    }
    function Yt(X) {
      const S = xe.value.indexOf(X);
      S >= 0 ? xe.value.splice(S, 1) : xe.value.push(X);
    }
    function rr(X) {
      const S = ve.value.indexOf(X);
      S >= 0 ? ve.value.splice(S, 1) : ve.value.push(X);
    }
    function vt() {
      C.value = "", te.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function ci() {
      te.value = { ...te.value, count: C.value }, L.value.id === 3 && (te.value = {
        ...te.value,
        freeForm: k.freeFormQuery
      }), U("insertSegment", te.value);
    }
    async function ar() {
      await A.set_token(a.token), await A.set_brandId(a.brandId), await A.set_tenantId(a.tenantId), await k.set_customSegmentUrl(a.customSegmentUrl), await k.fetch_custom_segment_settings(), await Sn();
    }
    return bn(() => {
      ar();
    }), ln(x, async (X, S) => {
      X && S !== X && (F.value = E.value.find((M) => M.value == X).locations, V.value = F.value[0].value, await vt(), await ir());
    }), ln(L, async (X, S) => {
      X && S !== X && X.id === 2 && (I.value = "", k.set_ai_generated_message(null), k.set_ai_generated_query(null));
    }), (X, S) => (h(), y("div", Om, [
      p("div", Pm, [
        K.value ? (h(), fe(w(Mn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), y(me, { key: 1 }, [
          p("div", Rm, [
            Y(w(Ia), {
              tabs: P,
              modelValue: L.value,
              "onUpdate:modelValue": S[0] || (S[0] = (M) => L.value = M),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          p("div", Gm, [
            Y(w(Dt), {
              style: { width: "45%" },
              class: "source w-100",
              options: E.value,
              modelValue: x.value,
              "onUpdate:modelValue": S[1] || (S[1] = (M) => x.value = M),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            Y(w(Dt), {
              style: { width: "45%" },
              class: "source w-100",
              options: F.value,
              modelValue: V.value,
              "onUpdate:modelValue": S[2] || (S[2] = (M) => V.value = M),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            w(A).brief.market ? (h(), fe(w(It), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: w(A).brief.market,
              "onUpdate:modelValue": S[3] || (S[3] = (M) => w(A).brief.market = M),
              label: "Market"
            }, null, 8, ["modelValue"])) : B("", !0)
          ]),
          x.value && V.value ? (h(), y(me, { key: 0 }, [
            L.value.id === 1 ? (h(), fe(Bm, {
              key: 0,
              tables: w(k).get_databaseModel.tables,
              collapsed: ve.value,
              fetching: ge.value,
              onClickAttribute: ui,
              onDragStart: S[4] || (S[4] = (M) => Kt(!0)),
              onDragEnd: S[5] || (S[5] = (M) => Kt(!1)),
              onToggleGroup: rr
            }, null, 8, ["tables", "collapsed", "fetching"])) : B("", !0),
            L.value.id === 2 ? (h(), y("div", Mm, [
              Y(w(It), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: I.value,
                "onUpdate:modelValue": S[6] || (S[6] = (M) => I.value = M)
              }, null, 8, ["modelValue"]),
              Y(w(nt), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !I.value,
                loading: W.value,
                onClick: S[7] || (S[7] = (M) => At())
              }, null, 8, ["disabled", "loading"]),
              w(k).get_aiGeneratedMessage ? (h(), fe(dl, {
                key: 0,
                feedback: w(k).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : B("", !0),
              w(k).get_aiGeneratedQuery ? (h(), fe(dl, {
                key: 1,
                feedback: w(k).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : B("", !0)
            ])) : B("", !0),
            L.value.id === 3 ? (h(), y("div", Um, [
              Y(Vm)
            ])) : B("", !0)
          ], 64)) : B("", !0)
        ], 64))
      ]),
      p("div", Wm, [
        p("div", Nm, [
          p("div", qm, [
            p("div", null, [
              S[14] || (S[14] = p("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              p("div", zm, [
                Y(w(nt), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !x.value || !V.value,
                  loading: Ie.value,
                  onClick: S[8] || (S[8] = (M) => $t())
                }, null, 8, ["disabled", "loading"]),
                Y(w(nt), {
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !te.value.name || !te.value.description || !C.value || oe.value,
                  loading: Fe.value,
                  onClick: S[9] || (S[9] = (M) => yt())
                }, null, 8, ["disabled", "loading"])
              ])
            ]),
            L.value.id !== 3 ? (h(), y("div", Hm, [
              p("div", Qm, [
                (h(!0), y(me, null, we(te.value.conditions, (M, Se) => (h(), y("div", {
                  class: "query-outer",
                  key: M.id
                }, [
                  M.group ? (h(), y("div", Km, [
                    p("div", {
                      class: "collapse-subQuery",
                      onClick: (R) => Yt(M.id),
                      onKeydown: Fa((R) => Yt(M.id), ["enter"])
                    }, [
                      Y(w(Bt), {
                        icon: xe.value.indexOf(M.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, Ym),
                    p("div", Zm, [
                      xe.value.indexOf(M.id) === -1 ? (h(), y("div", Jm, [
                        (h(!0), y(me, null, we(M.group, (R) => (h(), y("div", Xm, [
                          R.logic && xe.value.indexOf(M.id) === -1 ? (h(), y("div", jm, [
                            Y(w(Dt), {
                              class: "query-operator",
                              modelValue: R.logic,
                              "onUpdate:modelValue": (se) => R.logic = se,
                              singleSelect: !0,
                              options: Ft,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : B("", !0),
                          R.statement ? (h(), y("div", {
                            key: 1,
                            class: We(["sub-query", { "single-subquery": M.group.length === 1 }])
                          }, [
                            Y(w(It), {
                              readonly: "",
                              modelValue: R.statement[0],
                              "onUpdate:modelValue": (se) => R.statement[0] = se
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            Y(w(Dt), {
                              modelValue: R.statement[1],
                              "onUpdate:modelValue": (se) => R.statement[1] = se,
                              singleSelect: !0,
                              options: Qt(R.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            R.selectors.length < 3 && R.selectors.length > 0 ? (h(), fe(w(Dt), {
                              key: 0,
                              modelValue: R.statement[2],
                              "onUpdate:modelValue": (se) => R.statement[2] = se,
                              options: R.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            R.selectors.length > 2 && R.input_type !== "boolean" ? (h(), fe(w(Dt), {
                              key: 1,
                              modelValue: R.statement[2],
                              "onUpdate:modelValue": (se) => R.statement[2] = se,
                              options: R.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            R.input_type === "int" ? (h(), fe(w(It), {
                              key: 2,
                              modelValue: R.statement[2],
                              "onUpdate:modelValue": (se) => R.statement[2] = se,
                              error: R.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : B("", !0),
                            R.input_type === "string" ? (h(), fe(w(It), {
                              key: 3,
                              modelValue: R.statement[2],
                              "onUpdate:modelValue": (se) => R.statement[2] = se,
                              error: R.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : R.input_type === "date" ? (h(), fe(w(pl), {
                              key: 4,
                              modelValue: R.statement[2],
                              "onUpdate:modelValue": (se) => R.statement[2] = se,
                              range: R.statement[1] === "$bt" || R.statement[1] === "$nbt",
                              error: R.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : B("", !0),
                            Y(w(Bt), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (se) => it(M.id, Se, R.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : B("", !0)
                        ]))), 256))
                      ])) : (h(), y("p", eg, [
                        (h(!0), y(me, null, we(M.group, (R, se) => (h(), y("span", {
                          key: R.id
                        }, [
                          R.statement ? (h(), y("span", tg, [
                            p("b", null, ie(R == null ? void 0 : R.statement[0]), 1),
                            tt(" " + ie(Te(R.input_type, R == null ? void 0 : R.statement[1])) + " ", 1),
                            p("b", null, ie((R == null ? void 0 : R.statement[2]) || "?"), 1)
                          ])) : (h(), y("span", ng, ie(Te("operatorsQueries", R.logic)), 1))
                        ]))), 128))
                      ])),
                      Z.value && qe.value < w(k).settings.maxSubQuery ? (h(), fe(w(La), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (R) => ye.value = M.id,
                        onDrop: Vt
                      }, {
                        default: Lt(() => S[15] || (S[15] = [
                          p("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : B("", !0)
                    ])
                  ])) : B("", !0),
                  te.value.conditions.length > 1 && Se < te.value.conditions.length - 1 && M.logic ? (h(), y("div", ig, [
                    Y(w(Dt), {
                      class: "query-operator",
                      modelValue: M.logic,
                      "onUpdate:modelValue": (R) => M.logic = R,
                      singleSelect: !0,
                      options: Ft,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : B("", !0)
                ]))), 128))
              ]),
              te.value.conditions.length === 0 ? (h(), y("div", rg, [
                p("span", null, [
                  p("img", {
                    class: "",
                    alt: "standardIcon",
                    src: w(yl)
                  }, null, 8, ag)
                ])
              ])) : B("", !0),
              Z.value && qe.value < w(k).settings.maxSubQuery || te.value.conditions.length === 0 ? (h(), fe(w(La), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: S[10] || (S[10] = (M) => ye.value = "queryGroupDrop"),
                onDrop: Vt
              }, {
                default: Lt(() => [
                  p("div", {
                    class: We(["drop-indicator", {
                      "mt-25": te.value.conditions.length > 0,
                      "p-5": te.value.conditions.length === 0
                    }])
                  }, [
                    te.value.conditions.length <= 0 ? (h(), y("span", sg, " Drag and drop attributes or AI generated rules ")) : B("", !0)
                  ], 2)
                ]),
                _: 1
              })) : B("", !0)
            ])) : B("", !0)
          ]),
          Ie.value || H.value ? (h(), y("div", lg, [
            !Ie.value && H.value ? (h(), fe(Sm, {
              key: 0,
              segmentData: C.value,
              segmentCount: C.value
            }, null, 8, ["segmentData", "segmentCount"])) : B("", !0),
            Ie.value ? (h(), y("div", og, [
              Y(w(Mn), {
                size: "xlarge",
                class: "mt-3"
              }),
              S[16] || (S[16] = p("p", { class: "mt-3" }, "Running query...", -1))
            ])) : B("", !0),
            Ne.value === "saving" || Ne.value === "generating" ? (h(), y("div", ug, [
              Y(w(Mn), {
                size: "xlarge",
                class: "mt-3"
              }),
              Ne.value === "saving" ? (h(), y("p", cg, "Saving segment...")) : (h(), y("p", dg, "Generating insights..."))
            ])) : B("", !0),
            Ne.value === "done" && G.value ? (h(), fe(l2, {
              key: 3,
              selectedSegment: G.value,
              location: "custom",
              onShowInsightsExplorer: q
            }, null, 8, ["selectedSegment"])) : B("", !0)
          ])) : B("", !0)
        ]),
        p("div", fg, [
          p("div", pg, [
            Y(w(It), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: te.value.name,
              "onUpdate:modelValue": S[11] || (S[11] = (M) => te.value.name = M),
              type: "text"
            }, null, 8, ["modelValue"]),
            Y(w(It), {
              class: "segment-name",
              label: "Segment description",
              modelValue: te.value.description,
              "onUpdate:modelValue": S[12] || (S[12] = (M) => te.value.description = M),
              type: "text"
            }, null, 8, ["modelValue"]),
            Y(w(nt), {
              size: "small",
              label: "Push to destination",
              disabled: !C.value || !te.value.name && L.value.id === 1 || !te.value.name && L.value.id === 2 || te.value.conditions.length <= 0 && L.value.id !== 3,
              onClick: S[13] || (S[13] = (M) => ci())
            }, null, 8, ["disabled"])
          ])
        ])
      ])
    ]));
  }
}, mg = /* @__PURE__ */ Qe(hg, [["__scopeId", "data-v-ed36e366"]]), gg = { class: "tag-section" }, xg = { class: "rating-card" }, yg = { class: "header" }, kg = { class: "title" }, vg = { class: "pb-2" }, _g = { class: "content-wrapper" }, bg = { class: "content" }, Eg = { class: "publishers" }, Sg = { class: "publisher-item" }, Ag = { class: "ratings" }, wg = { class: "rating" }, Cg = {
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
    const D = z([]), a = o, A = Oe(() => a.charts.filter((U) => U.type === "bubble")), k = Oe(() => a.tags);
    return bn(() => {
      D.value = new Array(A.value.length).fill(!1);
    }), (U, P) => (h(), y("div", gg, [
      (h(!0), y(me, null, we(k.value, (L, F) => (h(), y("div", {
        class: We(["card-wrapper", { "full-width": L.title.includes("Publishers") }]),
        key: L.title + F
      }, [
        p("div", xg, [
          p("div", yg, [
            p("h2", kg, [
              p("span", vg, ie(L.title), 1)
            ])
          ]),
          p("div", _g, [
            p("div", bg, [
              p("div", Eg, [
                (h(!0), y(me, null, we(L.data[0].label, (V, E) => (h(), y("div", { key: V }, [
                  p("div", Sg, ie(V), 1),
                  p("div", Ag, [
                    p("div", wg, [
                      (h(!0), y(me, null, we(Math.floor(parseFloat(L.data[0].score[E])), (x, C) => (h(), y("span", {
                        key: `filled-${C}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), y(me, null, we(5 - Math.floor(parseFloat(L.data[0].score[E])), (x, C) => (h(), y("span", {
                        key: `empty-${C}`,
                        class: "dot"
                      }))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            P[0] || (P[0] = p("div", { class: "logo-wrapper" }, [
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
}, Tg = /* @__PURE__ */ Qe(Cg, [["__scopeId", "data-v-04684fcc"]]), Dg = { class: "chart-section-title my-3" }, Ig = { class: "chart-section" }, Lg = { key: 0 }, Bg = { class: "chart-title" }, Fg = {
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
    const D = o, a = z([]), A = z([]), k = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], U = (E, x) => {
      var I, W;
      const C = "area", G = Ba[C] || {}, Z = ((I = E.data[0]) == null ? void 0 : I.label) || [], K = (((W = E.data[0]) == null ? void 0 : W.score) || []).map((oe) => Number.isNaN(Number(oe)) ? oe : Number(oe)), ge = [{ name: E.title, data: K }], xe = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ve = Z.map((oe, Fe) => xe[Math.floor(Fe / (52 / 12))]), Ie = [], H = /* @__PURE__ */ new Set();
      ve.forEach((oe) => {
        H.has(oe) ? Ie.push("") : (Ie.push(oe), H.add(oe));
      });
      const $ = {
        xaxis: {
          categories: Ie,
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
        colors: [k[x % k.length]],
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
          custom: ({ series: oe, seriesIndex: Fe, dataPointIndex: Ne, w: Ft }) => {
            const un = Ft.globals.labels[Ne], zt = oe[Fe][Ne];
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
                            Week ${un}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption (Annual): </span>
                            <span style="font-weight: 600;">${zt}</span>
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
        section: E.section,
        chartType: C,
        title: E.title,
        series: ge,
        options: {
          ...G,
          ...$,
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
    }, P = (E) => {
      if (!E)
        return "bar";
      const x = E.toString().toLowerCase().trim();
      return (x.includes("vertical") || x.includes("verical")) && (x.includes("bar") || x.includes("bars") || x.includes("chart")) || x === "horizontal" ? "bar" : x === "donut" ? "donut" : x === "pie" ? "pie" : x === "radar" ? "radar" : x === "line" ? "line" : x === "area" ? "area" : x;
    }, L = Oe(() => D.charts.filter((E) => E.data && E.data.length > 0).map((E, x) => {
      var ve, Ie;
      const C = P(kl[E.type] || E.type), G = Ba[C] || {}, Z = ((ve = E.data[0]) == null ? void 0 : ve.label) || [], K = (((Ie = E.data[0]) == null ? void 0 : Ie.score) || []).map((H) => Number.isNaN(Number(H)) ? H : Number(H));
      let ge = [], xe = {};
      if (C === "horizontal")
        ge = [{ name: E.title, data: K }], xe = {
          labels: Z,
          colors: [k[x % k.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (C === "bar" || C === "vertical bar" || C === "vertical bars" || C === "Vertical bars" || C === "vertical chart")
        E.title === "Average View of Digital consumption (Daily)" ? (ge = [{ name: "Indexed Consumption", data: K }], xe = {
          xaxis: {
            categories: Z,
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
              formatter: (H) => `${H}:00`
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
          colors: [k[x % k.length]],
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
            custom: ({ series: H, seriesIndex: $, dataPointIndex: I, w: W }) => {
              const oe = W.globals.labels[I], Fe = H[$][I];
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
                            Hour ${oe}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption: </span>
                            <span style="font-weight: 600;">${Fe}</span>
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
        }) : (E.title === "Personality archetype" && console.log(K), ge = [{ name: E.title, data: K }], xe = {
          labels: Z,
          colors: [k[x % k.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (C === "line" || C === "area")
          return U(E, x);
        C === "radar" ? (ge = [{ name: E.title, data: K }], xe = { labels: Z }) : (C === "donut" || C === "pie") && (ge = K, xe = { labels: Z });
      }
      return {
        section: E.section,
        chartType: C,
        title: E.title,
        series: ge,
        options: {
          ...G,
          ...xe,
          chart: { type: C }
        }
      };
    }));
    bn(() => {
      a.value = new Array(L.value.length).fill(!1);
    });
    const F = (E, x) => {
      if (!E || a.value[x])
        return;
      A.value[x] = E;
      const { stop: C } = lh(
        E,
        ([G]) => {
          G.isIntersecting && (a.value[x] = !0, C());
        },
        { threshold: 0.1 }
      );
    }, V = () => {
      const E = L.value.length;
      return E === 1 ? "full-width" : E === 2 ? "half-width" : "third-width";
    };
    return (E, x) => (h(), y("div", null, [
      p("h5", Dg, ie(L.value[0].section.charAt(0).toUpperCase() + L.value[0].section.slice(1)), 1),
      p("div", Ig, [
        (h(!0), y(me, null, we(L.value, (C, G) => (h(), y("div", {
          key: C.title + G,
          ref_for: !0,
          ref: (Z) => F(Z, G),
          class: We(["chart-wrapper", V()])
        }, [
          a.value[G] ? (h(), y("div", Lg, [
            p("div", Bg, ie(C.title), 1),
            Y(w(gl), {
              options: C.options,
              series: C.series,
              type: C.chartType,
              width: "100%",
              height: C.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : B("", !0)
        ], 2))), 128)),
        L.value.length === 2 ? (h(), fe(Tg, {
          key: 0,
          tags: o.tags || [],
          charts: o.charts || []
        }, null, 8, ["tags", "charts"])) : B("", !0)
      ])
    ]));
  }
}, $g = /* @__PURE__ */ Qe(Fg, [["__scopeId", "data-v-56f1fb32"]]), Vg = "5.12.1", Og = 25, Pg = 0, Rg = 100, Gg = 450, Mg = 450, Ug = "*Final5", Wg = 0, Ng = [], qg = [
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
], zg = [], Hg = {}, Qg = {
  v: Vg,
  fr: Og,
  ip: Pg,
  op: Rg,
  w: Gg,
  h: Mg,
  nm: Ug,
  ddd: Wg,
  assets: Ng,
  layers: qg,
  markers: zg,
  props: Hg
}, Kg = {
  key: 0,
  class: "explore-insights-loader"
}, Yg = {
  key: 1,
  class: "explore-insights-wrapper"
}, Zg = { class: "explore-insights" }, Jg = { class: "explore-insights-subtitle" }, Xg = { class: "d-flex flex-column" }, jg = { class: "mb-2" }, e3 = { class: "pd-segment-title-details" }, t3 = { class: "pd-segment-title-details" }, n3 = { class: "thumbnail-card" }, i3 = { class: "thumbnail-segment-cards" }, r3 = { class: "segment-card-row" }, a3 = {
  __name: "ExploreInsights",
  setup(o) {
    const D = on(), a = D.get_selectedSegment, A = z(null), k = Oe(() => A.value || {}), U = z(), P = z([]), L = z(!0), F = z([]);
    bn(async () => {
      var x, C, G;
      if (a != null && a.segmentId)
        try {
          L.value = !0;
          const Z = await li.get(
            `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${a != null && a.segmentId ? a == null ? void 0 : a.segmentId : (x = on.get_selectedSegment) == null ? void 0 : x.segmentId}`,
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
          A.value = (G = (C = Z.data) == null ? void 0 : C.data) == null ? void 0 : G[0];
          const ye = A.value.charts.reduce((K, ge, xe, ve) => (xe < 2 ? (K[0] || (K[0] = []), K[0].push(ge)) : xe < 5 ? (K[1] || (K[1] = []), K[1].push(ge)) : (K[2] || (K[2] = []), K[2].push(ge)), K), []);
          P.value = A.value.segments[0], F.value = Object.values(ye), await oh(5e3), L.value = !1;
        } catch (Z) {
          L.value = !1, console.error("Failed to fetch insights:", Z);
        }
    }), Oe(() => {
      var x, C, G;
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
          categories: ((C = (x = a.thumbnail) == null ? void 0 : x.graph) == null ? void 0 : C.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((G = a.thumbnail) == null ? void 0 : G.title) || "",
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
    }), Oe(() => {
      var x, C, G;
      return ((G = (C = (x = a.thumbnail) == null ? void 0 : x.graph) == null ? void 0 : C.seriesCombined) == null ? void 0 : G.map((Z) => ({
        name: Z.name,
        data: Z.data.map(Number)
      }))) || [];
    });
    const V = Oe(() => {
      var x, C, G, Z;
      return ((Z = (G = (C = (x = a.thumbnail) == null ? void 0 : x.segments) == null ? void 0 : C[0]) == null ? void 0 : G.segments) == null ? void 0 : Z.slice(0, 4)) || [];
    });
    Oe(() => V.value.map((G) => parseFloat(G.affinityScore || "0")).reduce((G, Z) => G + Z, 0).toFixed(2)), Oe(() => V.value.map((C) => parseInt(C.reach || "0", 10)).reduce((C, G) => C + G, 0).toLocaleString());
    function E(x) {
      return x == null ? "" : (typeof x == "string" ? parseInt(x, 10) : x).toLocaleString();
    }
    return (x, C) => {
      var G, Z, ye;
      return h(), y(me, null, [
        L.value ? (h(), y("div", Kg, [
          Y(w(sh), {
            height: "40vh",
            ref_key: "anim",
            ref: U,
            "animation-data": w(Qg),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          C[0] || (C[0] = p("h6", null, [
            tt("Generating Open Intelligence Insights"),
            p("span", { class: "dot-animate" }, [
              p("span", null, "."),
              p("span", null, "."),
              p("span", null, ".")
            ])
          ], -1))
        ])) : B("", !0),
        L.value ? B("", !0) : (h(), y("div", Yg, [
          p("div", Zg, [
            p("h6", Jg, [
              p("div", Xg, [
                p("div", jg, [
                  C[1] || (C[1] = p("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  tt(ie(((G = w(a)) == null ? void 0 : G.name) || "Segment Overview"), 1)
                ]),
                p("div", e3, [
                  C[2] || (C[2] = p("strong", null, "Count:", -1)),
                  tt(" " + ie(E((Z = w(a)) == null ? void 0 : Z.count)), 1)
                ]),
                p("div", t3, [
                  C[3] || (C[3] = p("strong", null, "Description:", -1)),
                  tt(" " + ie((ye = w(a)) == null ? void 0 : ye.description), 1)
                ])
              ]),
              C[4] || (C[4] = p("span", { class: "logo-wrapper" }, [
                p("span", null, "Enrichment Source:"),
                p("img", {
                  src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                  alt: "logo",
                  width: "120"
                })
              ], -1))
            ]),
            p("div", null, [
              p("div", n3, [
                p("div", i3, [
                  p("div", r3, [
                    (h(), fe(t2, {
                      key: x.index,
                      "segment-data": P.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ]),
            (h(!0), y(me, null, we(F.value, (K, ge) => {
              var xe;
              return h(), y("div", {
                key: ((xe = K == null ? void 0 : K[0]) == null ? void 0 : xe.section) + ge
              }, [
                K ? (h(), fe($g, {
                  key: 0,
                  charts: K || [],
                  tags: k.value.tags || []
                }, null, 8, ["charts", "tags"])) : B("", !0)
              ]);
            }), 128))
          ])
        ]))
      ], 64);
    };
  }
}, s3 = /* @__PURE__ */ Qe(a3, [["__scopeId", "data-v-22c7c607"]]), l3 = { key: 0 }, o3 = { key: 1 }, u3 = { class: "discovery-header" }, c3 = {
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
    const a = D, A = on(), k = tr(), U = o, P = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], L = z("standard"), F = z(P[0]), V = z(!1), E = z(null);
    function x(ye) {
      E.value = ye, V.value = !0;
    }
    function C() {
      a("close");
    }
    function G(ye) {
      a("insertSegment", ye);
    }
    function Z() {
      V.value = !1;
    }
    return bn(() => {
      A.set_brandId(U.brandId), A.set_token(U.token), A.set_tenantId(U.tenantId), A.set_baseUrl(U.baseUrl), k.set_customSegmentUrl(U.customSegmentUrl), L.value = A.get_activeTab;
    }), (ye, K) => (h(), fe(w(hl), {
      onClose: C,
      size: "large"
    }, {
      header: Lt(() => [
        V.value ? B("", !0) : (h(), y("div", l3, [
          K[1] || (K[1] = p("div", { class: "header" }, [
            p("h4", null, "Segment Manager")
          ], -1)),
          Y(w(rh), {
            tabs: P,
            modelValue: F.value,
            "onUpdate:modelValue": K[0] || (K[0] = (ge) => F.value = ge),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        V.value ? (h(), y("div", o3, [
          p("div", {
            onClick: Z,
            class: "navigation"
          }, [
            Y(w(Bt), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            K[2] || (K[2] = p("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          p("div", u3, [
            K[3] || (K[3] = p("div", { class: "discovery-header-title" }, [
              p("h6", null, "Segment Manager"),
              p("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ], -1)),
            Y(w(nt), { label: "Go to activation" })
          ])
        ])) : B("", !0)
      ]),
      body: Lt(() => [
        F.value.id === 1 && !V.value ? (h(), fe(dm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: G,
          onShowInsightsExplorer: x,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: E.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : B("", !0),
        F.value.id === 2 && !V.value ? (h(), fe(mg, {
          key: 1,
          onInsertSegment: G,
          onShowInsightsExplorer: x,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : B("", !0),
        V.value ? (h(), fe(s3, { key: 2 })) : B("", !0)
      ]),
      _: 1
    }));
  }
}, _3 = /* @__PURE__ */ Qe(c3, [["__scopeId", "data-v-80068011"]]);
export {
  _3 as BetaSegmentManagerModal,
  mg as CustomSegments,
  s3 as ExploreInsights,
  dm as StandardSegments,
  tr as useCustomSegmentStore,
  on as useSegmentManagerStore
};
