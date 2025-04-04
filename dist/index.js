import { ref as M, computed as Fe, watch as jt, createElementBlock as y, openBlock as h, normalizeClass as Ge, createElementVNode as p, createCommentVNode as B, normalizeStyle as mn, createBlock as ue, unref as C, Fragment as me, renderList as Ae, createTextVNode as je, toDisplayString as ee, withKeys as Ba, renderSlot as ji, createVNode as H, onMounted as yn, onUnmounted as t2, resolveComponent as dl, withCtx as It, withModifiers as n2, nextTick as ol } from "vue";
import { CataUiInputCheckbox as gn, CataUiIcon as Lt, CataUiStatusLabel as i2, CataUiInputDate as fl, CataUiInputSelect as Tt, CataUiInput as Dt, CataUiButton as et, CataUiModal as pl, CataUiTabs as Da, CataUiSpinner as Rn, CataUiTabSwitch as r2 } from "@catalyst/ui-library";
import { defineStore as hl } from "pinia";
import si from "axios";
import xn from "dayjs";
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
      const S = {
        error: a,
        headline: "Error",
        message: a.response.data || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(S);
    }
  },
  async fetch_custom_segment_settings(o) {
    var D;
    try {
      const a = await m2(o);
      this.set_custom_segment_settings(a.data);
    } catch (a) {
      const S = {
        error: a,
        headline: "Error",
        message: ((D = a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(S);
    }
  },
  async generate_ai_query(o, D) {
    var a;
    try {
      return (await x2(o, D)).data;
    } catch (S) {
      const k = {
        error: S,
        headline: "Error",
        message: ((a = S == null ? void 0 : S.response) == null ? void 0 : a.data) || "Sorry, an error occurred while generating your query."
      };
      this.set_ApiError(k);
    }
  },
  async validate_query(o) {
    var D;
    try {
      const a = await validateQuery(o);
    } catch (a) {
      const S = {
        error: a,
        headline: "Error",
        message: ((D = a == null ? void 0 : a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(S);
    }
  },
  async run_query(o, D) {
    var a;
    try {
      return (await g2(o, D)).count;
    } catch (S) {
      const k = {
        error: S,
        headline: "Error",
        message: ((a = S == null ? void 0 : S.response) == null ? void 0 : a.data) || "Sorry, an error occurred while validating your query."
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
}), kn = "", nr = si.create(), li = si.create();
si.create();
nr.interceptors.request.use(
  (o) => {
    const D = en();
    return o.baseURL = D.baseUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", gl(o), o;
  },
  (o) => Promise.reject(o)
);
li.interceptors.request.use(
  (o) => {
    const D = en(), a = tr();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${D.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = D.tenantId, o.headers["brand-id"] = D.brandId, gl(o), o;
  },
  (o) => Promise.reject(o)
);
const d2 = () => si.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), gl = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, ul = (o, D) => nr.get(`${kn}/api/v1/segments/${D ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), f2 = (o) => nr.get(`${kn}/api/v1/insights/${o}`, { params: queryParams }).then((D) => D.data).catch((D) => {
  throw D;
}), p2 = () => nr.get(`${kn}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), h2 = (o, D) => li.get(`${kn}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), m2 = () => li.get(`${kn}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), g2 = (o, D) => li.post(`${kn}/api/v1/query/${D}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), x2 = (o, D) => li.post(`${kn}/api/v1/query/gen/${D}`, o).then((a) => a.data).catch((a) => {
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
      let S;
      a != null && a.data && (S = a.data.map((k) => ({
        ...k,
        status: {
          type: k.status,
          value: k.status ? k.status : "active",
          color: this.stateColors[k.status]
        }
      }))), this.set_numberOfPages(a.totalPages), this.set_segments(S);
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
      const S = await ul(D, o), k = S.data.map((U) => ({
        ...U,
        status: {
          type: U.status,
          value: U.status ? U.status : "active",
          color: this.stateColors[U.status]
        }
      }));
      this.set_numberOfPages(S.totalPages), this.add_segments(k);
    } catch (S) {
      const k = {
        error: S,
        headline: "Error",
        message: ((a = S.response) == null ? void 0 : a.data) || "Sorry, an error occurred while getting your data."
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
      const S = {
        error: a,
        headline: "Error",
        message: ((D = a.response) == null ? void 0 : D.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(S);
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
}, en = hl("segmentManagerStore", {
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
  for (const [S, k] of D)
    a[S] = k;
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
    const a = D, S = o, k = M(null), U = M(!1), N = M(1), V = M([]), O = M(null), F = M(!1), b = M({}), g = Fe(
      {
        get() {
          return S.checkedRows;
        },
        set(X) {
          V.value = X;
        }
      }
    ), L = Fe(() => S.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${S.stickyHeader}px;` : "");
    function q() {
      S.expandable && S.rows.length > 0 && (F.value = !F.value, F.value === !1 && (b.value = {}));
    }
    function re(X) {
      return S.expandable && X.details.length === 1;
    }
    function se(X) {
      b[X] ? b[X] = !b[X] : this.$set(b, X, !0);
    }
    function j(X) {
      O.value = X;
    }
    function pe(X, J, A) {
      A.key !== "actions" && A.type !== "link" && J.showInAction !== !1 && a("rowClicked", { event: X, row: J });
    }
    function ye(X) {
      S.sortable && X.key !== "actions" && X.type !== "link" && (k.value === X.key ? N.value *= -1 : (k.value = X.key, N.value = 1), a("columnSorted", { sortColumn: k.value, sortOrder: N }));
    }
    function ge(X, J) {
      let A = "";
      if (typeof X == "object" ? A = X.value : A = X, J === "datetime") {
        const G = xn(new Date(A));
        return xn(G).format("DD MMM YYYY");
      }
      if (J === "datetimehour") {
        const G = xn(new Date(A));
        return xn(G).format("DD MMM YYYY, HH:mm");
      }
      return A;
    }
    return jt(U, (X) => {
      X === "true" || X === !0 ? S.rows.forEach((J) => {
        !V.value.includes(J.id) && J.showInAction !== !1 && V.value.push(J.id);
      }) : V.value = [], a("rowChecked", V.value);
    }), (X, J) => (h(), y("div", {
      class: Ge(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      p("table", {
        class: Ge(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        p("thead", null, [
          p("tr", {
            onClick: J[1] || (J[1] = (A) => q())
          }, [
            !o.collapseControls && !o.expandable ? (h(), y("th", {
              key: 0,
              class: "checkbox-container",
              style: mn(L.value)
            }, [
              o.selectable ? (h(), ue(C(gn), {
                key: 0,
                modelValue: U.value,
                "onUpdate:modelValue": J[0] || (J[0] = (A) => U.value = A)
              }, null, 8, ["modelValue"])) : B("", !0)
            ], 4)) : B("", !0),
            o.expandable ? (h(), y("th", {
              key: 1,
              class: Ge(["text-center", {
                expandable: o.expandable
              }]),
              style: mn(L.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), ue(C(Lt), {
                key: 0,
                class: "expand-icon",
                icon: F.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: F.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : B("", !0)
            ], 6)) : B("", !0),
            (h(!0), y(me, null, Ae(o.columns, (A) => (h(), y("th", {
              style: mn(L.value),
              key: A.id,
              onClick: (G) => ye(A),
              class: Ge({
                actions: A.key === "actions",
                active: k.value === A.key,
                sortable: o.sortable && A.key !== "actions" && A.type != "link",
                expandable: o.expandable
              })
            }, [
              A.key !== "actions" && A.type != "link" ? (h(), y(me, { key: 0 }, [
                je(ee(A.value) + " ", 1),
                o.sortable ? (h(), ue(C(Lt), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : B("", !0)
              ], 64)) : B("", !0)
            ], 14, v2))), 128))
          ])
        ]),
        o.rows ? (h(), y("tbody", _2, [
          (h(!0), y(me, null, Ae(o.rows, (A) => (h(), y(me, null, [
            (h(!0), y(me, null, Ae(A.details, (G) => (h(), y(me, null, [
              o.expandable & F.value || re(A) ? (h(), y("tr", {
                class: Ge({ expandable: o.expandable && G.details.length === 1 }),
                key: G.id,
                onClick: (ve) => se(G.id)
              }, [
                p("td", E2, [
                  G.details.length > 1 ? (h(), ue(C(Lt), {
                    key: 0,
                    class: "expand-icon",
                    icon: b.value[G.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: b.value[G.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : B("", !0)
                ]),
                (h(!0), y(me, null, Ae(o.columns, (ve) => (h(), y("td", {
                  style: mn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[ve.key] ? `${o.minWidthCell[ve.key]}px` : "0px"
                  }),
                  key: ve.key
                }, [
                  p("template", null, [
                    p("span", {
                      title: ge(G[ve.key].value || G[ve.key], ve.type)
                    }, ee(ge(G[ve.key], ve.type)), 9, S2)
                  ])
                ], 4))), 128))
              ], 10, b2)) : B("", !0),
              G.details.length > 1 && b.value[G.id] ? (h(!0), y(me, { key: 1 }, Ae(G.details, (ve) => (h(), y("tr", {
                class: "subrow-details",
                key: ve.id
              }, [
                J[4] || (J[4] = p("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), y(me, null, Ae(o.columns, (Me) => (h(), y("td", {
                  style: mn({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Me.key] ? `${o.minWidthCell[Me.key]}px` : "0px"
                  }),
                  key: Me.key
                }, [
                  p("template", null, [
                    p("span", {
                      title: ge(ve[Me.key], Me.type)
                    }, ee(ge(ve[Me.key], Me.type)), 9, A2)
                  ])
                ], 4))), 128))
              ]))), 128)) : B("", !0)
            ], 64))), 256)),
            (o.expandable && A.details.length) > 1 || o.expandable && A.details[0].details.length > 1 || !o.expandable ? (h(), y("tr", {
              class: Ge({
                active: g.value.includes(A.id),
                static: A.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: O.value === A._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: A.id,
              onClick: (G) => j(A._id)
            }, [
              o.collapseControls ? B("", !0) : (h(), y("td", C2, [
                o.selectable && A.showInAction !== !1 ? (h(), ue(C(gn), {
                  key: 0,
                  modelValue: g.value,
                  "onUpdate:modelValue": J[2] || (J[2] = (G) => g.value = G),
                  val: A.id,
                  onInput: J[3] || (J[3] = (G) => X.$emit(C(ai).ROW_CHECKED, V.value))
                }, null, 8, ["modelValue", "val"])) : B("", !0)
              ])),
              (h(!0), y(me, null, Ae(o.columns, (G) => (h(), y("td", {
                class: Ge({
                  actions: G.key === "actions",
                  fixedActions: o.fixedActions && G.key === "actions"
                }),
                style: mn({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[G.key] ? `${o.minWidthCell[G.key]}px` : "0px"
                }),
                key: G.key,
                onKeydown: Ba((ve) => pe(ve, A, G), ["enter"]),
                onClick: (ve) => pe(ve, A, G)
              }, [
                A[G.key] !== void 0 && A[G.key] !== null && G.key !== "actions" ? (h(), y(me, { key: 0 }, [
                  A[G.key].icon ? (h(), y("img", {
                    key: 0,
                    alt: "",
                    src: A[G.key].icon,
                    class: Ge(G.key)
                  }, null, 10, D2)) : A[G.key].biicon ? (h(), y("span", {
                    key: 1,
                    class: Ge(["table-bi-icon", A[G.key].biicon]),
                    style: mn({ color: A[G.key].color })
                  }, null, 6)) : B("", !0),
                  A[G.key].type ? (h(), ue(C(i2), {
                    key: 2,
                    "font-size": 12,
                    label: A[G.key].value,
                    color: A[G.key].color
                  }, null, 8, ["label", "color"])) : G.type === "link" ? ji(X.$slots, "linkHandler", {
                    key: 3,
                    link: { row: A, columnKey: G.key }
                  }, void 0, !0) : G.type === "number" ? (h(), y("span", I2, ee(A[G.key]), 1)) : (h(), y("span", {
                    key: 5,
                    title: ge(A[G.key].value || A[G.key], G.type)
                  }, ee(ge(A[G.key], G.type)), 9, L2))
                ], 64)) : B("", !0),
                G.key === "actions" ? ji(X.$slots, "actionButton", {
                  key: 1,
                  row: A
                }, void 0, !0) : B("", !0)
              ], 46, T2))), 128))
            ], 10, w2)) : B("", !0)
          ], 64))), 256))
        ])) : B("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), y("p", B2, " No matches found ")) : B("", !0)
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
    var a, S = "4.17.21", k = 200, U = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", N = "Expected a function", V = "Invalid `variable` option passed into `_.template`", O = "__lodash_hash_undefined__", F = 500, b = "__lodash_placeholder__", g = 1, L = 2, q = 4, re = 1, se = 2, j = 1, pe = 2, ye = 4, ge = 8, X = 16, J = 32, A = 64, G = 128, ve = 256, Me = 512, tn = 30, lt = "...", nn = 800, Gn = 16, vn = 1, Mn = 2, Un = 3, Wt = 1 / 0, Ue = 9007199254740991, w = 17976931348623157e292, I = NaN, Q = 4294967295, gt = Q - 1, Et = Q >>> 1, _n = [
      ["ary", G],
      ["bind", j],
      ["bindKey", pe],
      ["curry", ge],
      ["curryRight", X],
      ["flip", Me],
      ["partial", J],
      ["partialRight", A],
      ["rearg", ve]
    ], xt = "[object Arguments]", be = "[object Array]", oi = "[object AsyncFunction]", Nt = "[object Boolean]", rn = "[object Date]", ir = "[object DOMException]", Bt = "[object Error]", bn = "[object Function]", ui = "[object GeneratorFunction]", Ke = "[object Map]", an = "[object Number]", rr = "[object Null]", yt = "[object Object]", ci = "[object Promise]", te = "[object Proxy]", T = "[object RegExp]", R = "[object Set]", we = "[object String]", P = "[object Symbol]", de = "[object Undefined]", St = "[object WeakMap]", kl = "[object WeakSet]", Wn = "[object ArrayBuffer]", En = "[object DataView]", ar = "[object Float32Array]", sr = "[object Float64Array]", lr = "[object Int8Array]", or = "[object Int16Array]", ur = "[object Int32Array]", cr = "[object Uint8Array]", dr = "[object Uint8ClampedArray]", fr = "[object Uint16Array]", pr = "[object Uint32Array]", vl = /\b__p \+= '';/g, _l = /\b(__p \+=) '' \+/g, bl = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Fa = /&(?:amp|lt|gt|quot|#39);/g, Va = /[&<>"']/g, El = RegExp(Fa.source), Sl = RegExp(Va.source), Al = /<%-([\s\S]+?)%>/g, wl = /<%([\s\S]+?)%>/g, $a = /<%=([\s\S]+?)%>/g, Cl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Tl = /^\w*$/, Dl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, hr = /[\\^$.*+?()[\]{}|]/g, Il = RegExp(hr.source), mr = /^\s+/, Ll = /\s/, Bl = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Fl = /\{\n\/\* \[wrapped with (.+)\] \*/, Vl = /,? & /, $l = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ol = /[()=,{}\[\]\/\s]/, Pl = /\\(\\)?/g, Rl = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Oa = /\w*$/, Gl = /^[-+]0x[0-9a-f]+$/i, Ml = /^0b[01]+$/i, Ul = /^\[object .+?Constructor\]$/, Wl = /^0o[0-7]+$/i, Nl = /^(?:0|[1-9]\d*)$/, ql = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, di = /($^)/, zl = /['\n\r\u2028\u2029\\]/g, fi = "\\ud800-\\udfff", Hl = "\\u0300-\\u036f", Ql = "\\ufe20-\\ufe2f", Kl = "\\u20d0-\\u20ff", Pa = Hl + Ql + Kl, Ra = "\\u2700-\\u27bf", Ga = "a-z\\xdf-\\xf6\\xf8-\\xff", Yl = "\\xac\\xb1\\xd7\\xf7", Zl = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Xl = "\\u2000-\\u206f", Jl = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ma = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ua = "\\ufe0e\\ufe0f", Wa = Yl + Zl + Xl + Jl, gr = "['’]", jl = "[" + fi + "]", Na = "[" + Wa + "]", pi = "[" + Pa + "]", qa = "\\d+", eo = "[" + Ra + "]", za = "[" + Ga + "]", Ha = "[^" + fi + Wa + qa + Ra + Ga + Ma + "]", xr = "\\ud83c[\\udffb-\\udfff]", to = "(?:" + pi + "|" + xr + ")", Qa = "[^" + fi + "]", yr = "(?:\\ud83c[\\udde6-\\uddff]){2}", kr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Sn = "[" + Ma + "]", Ka = "\\u200d", Ya = "(?:" + za + "|" + Ha + ")", no = "(?:" + Sn + "|" + Ha + ")", Za = "(?:" + gr + "(?:d|ll|m|re|s|t|ve))?", Xa = "(?:" + gr + "(?:D|LL|M|RE|S|T|VE))?", Ja = to + "?", ja = "[" + Ua + "]?", io = "(?:" + Ka + "(?:" + [Qa, yr, kr].join("|") + ")" + ja + Ja + ")*", ro = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", ao = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", es = ja + Ja + io, so = "(?:" + [eo, yr, kr].join("|") + ")" + es, lo = "(?:" + [Qa + pi + "?", pi, yr, kr, jl].join("|") + ")", oo = RegExp(gr, "g"), uo = RegExp(pi, "g"), vr = RegExp(xr + "(?=" + xr + ")|" + lo + es, "g"), co = RegExp([
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
    Ce[ar] = Ce[sr] = Ce[lr] = Ce[or] = Ce[ur] = Ce[cr] = Ce[dr] = Ce[fr] = Ce[pr] = !0, Ce[xt] = Ce[be] = Ce[Wn] = Ce[Nt] = Ce[En] = Ce[rn] = Ce[Bt] = Ce[bn] = Ce[Ke] = Ce[an] = Ce[yt] = Ce[T] = Ce[R] = Ce[we] = Ce[St] = !1;
    var Se = {};
    Se[xt] = Se[be] = Se[Wn] = Se[En] = Se[Nt] = Se[rn] = Se[ar] = Se[sr] = Se[lr] = Se[or] = Se[ur] = Se[Ke] = Se[an] = Se[yt] = Se[T] = Se[R] = Se[we] = Se[P] = Se[cr] = Se[dr] = Se[fr] = Se[pr] = !0, Se[Bt] = Se[bn] = Se[St] = !1;
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
    }, vo = parseFloat, _o = parseInt, ts = typeof ri == "object" && ri && ri.Object === Object && ri, bo = typeof self == "object" && self && self.Object === Object && self, Pe = ts || bo || Function("return this")(), _r = D && !D.nodeType && D, sn = _r && !0 && o && !o.nodeType && o, ns = sn && sn.exports === _r, br = ns && ts.process, ot = function() {
      try {
        var d = sn && sn.require && sn.require("util").types;
        return d || br && br.binding && br.binding("util");
      } catch {
      }
    }(), is = ot && ot.isArrayBuffer, rs = ot && ot.isDate, as = ot && ot.isMap, ss = ot && ot.isRegExp, ls = ot && ot.isSet, os = ot && ot.isTypedArray;
    function tt(d, x, m) {
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
    function Eo(d, x, m, W) {
      for (var ne = -1, xe = d == null ? 0 : d.length; ++ne < xe; ) {
        var Ve = d[ne];
        x(W, Ve, m(Ve), d);
      }
      return W;
    }
    function ut(d, x) {
      for (var m = -1, W = d == null ? 0 : d.length; ++m < W && x(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function So(d, x) {
      for (var m = d == null ? 0 : d.length; m-- && x(d[m], m, d) !== !1; )
        ;
      return d;
    }
    function us(d, x) {
      for (var m = -1, W = d == null ? 0 : d.length; ++m < W; )
        if (!x(d[m], m, d))
          return !1;
      return !0;
    }
    function qt(d, x) {
      for (var m = -1, W = d == null ? 0 : d.length, ne = 0, xe = []; ++m < W; ) {
        var Ve = d[m];
        x(Ve, m, d) && (xe[ne++] = Ve);
      }
      return xe;
    }
    function hi(d, x) {
      var m = d == null ? 0 : d.length;
      return !!m && An(d, x, 0) > -1;
    }
    function Er(d, x, m) {
      for (var W = -1, ne = d == null ? 0 : d.length; ++W < ne; )
        if (m(x, d[W]))
          return !0;
      return !1;
    }
    function Te(d, x) {
      for (var m = -1, W = d == null ? 0 : d.length, ne = Array(W); ++m < W; )
        ne[m] = x(d[m], m, d);
      return ne;
    }
    function zt(d, x) {
      for (var m = -1, W = x.length, ne = d.length; ++m < W; )
        d[ne + m] = x[m];
      return d;
    }
    function Sr(d, x, m, W) {
      var ne = -1, xe = d == null ? 0 : d.length;
      for (W && xe && (m = d[++ne]); ++ne < xe; )
        m = x(m, d[ne], ne, d);
      return m;
    }
    function Ao(d, x, m, W) {
      var ne = d == null ? 0 : d.length;
      for (W && ne && (m = d[--ne]); ne--; )
        m = x(m, d[ne], ne, d);
      return m;
    }
    function Ar(d, x) {
      for (var m = -1, W = d == null ? 0 : d.length; ++m < W; )
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
      var W;
      return m(d, function(ne, xe, Ve) {
        if (x(ne, xe, Ve))
          return W = xe, !1;
      }), W;
    }
    function mi(d, x, m, W) {
      for (var ne = d.length, xe = m + (W ? 1 : -1); W ? xe-- : ++xe < ne; )
        if (x(d[xe], xe, d))
          return xe;
      return -1;
    }
    function An(d, x, m) {
      return x === x ? Mo(d, x, m) : mi(d, ds, m);
    }
    function Do(d, x, m, W) {
      for (var ne = m - 1, xe = d.length; ++ne < xe; )
        if (W(d[ne], x))
          return ne;
      return -1;
    }
    function ds(d) {
      return d !== d;
    }
    function fs(d, x) {
      var m = d == null ? 0 : d.length;
      return m ? Tr(d, x) / m : I;
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
    function ps(d, x, m, W, ne) {
      return ne(d, function(xe, Ve, Ee) {
        m = W ? (W = !1, xe) : x(m, xe, Ve, Ee);
      }), m;
    }
    function Io(d, x) {
      var m = d.length;
      for (d.sort(x); m--; )
        d[m] = d[m].value;
      return d;
    }
    function Tr(d, x) {
      for (var m, W = -1, ne = d.length; ++W < ne; ) {
        var xe = x(d[W]);
        xe !== a && (m = m === a ? xe : m + xe);
      }
      return m;
    }
    function Dr(d, x) {
      for (var m = -1, W = Array(d); ++m < d; )
        W[m] = x(m);
      return W;
    }
    function Lo(d, x) {
      return Te(x, function(m) {
        return [m, d[m]];
      });
    }
    function hs(d) {
      return d && d.slice(0, ys(d) + 1).replace(mr, "");
    }
    function nt(d) {
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
      for (var m = -1, W = d.length; ++m < W && An(x, d[m], 0) > -1; )
        ;
      return m;
    }
    function gs(d, x) {
      for (var m = d.length; m-- && An(x, d[m], 0) > -1; )
        ;
      return m;
    }
    function Bo(d, x) {
      for (var m = d.length, W = 0; m--; )
        d[m] === x && ++W;
      return W;
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
      return d.forEach(function(W, ne) {
        m[++x] = [ne, W];
      }), m;
    }
    function xs(d, x) {
      return function(m) {
        return d(x(m));
      };
    }
    function Ht(d, x) {
      for (var m = -1, W = d.length, ne = 0, xe = []; ++m < W; ) {
        var Ve = d[m];
        (Ve === x || Ve === b) && (d[m] = b, xe[ne++] = m);
      }
      return xe;
    }
    function gi(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(W) {
        m[++x] = W;
      }), m;
    }
    function Go(d) {
      var x = -1, m = Array(d.size);
      return d.forEach(function(W) {
        m[++x] = [W, W];
      }), m;
    }
    function Mo(d, x, m) {
      for (var W = m - 1, ne = d.length; ++W < ne; )
        if (d[W] === x)
          return W;
      return -1;
    }
    function Uo(d, x, m) {
      for (var W = m + 1; W--; )
        if (d[W] === x)
          return W;
      return W;
    }
    function Cn(d) {
      return wn(d) ? No(d) : wo(d);
    }
    function kt(d) {
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
      x = x == null ? Pe : Tn.defaults(Pe.Object(), x, Tn.pick(Pe, ho));
      var m = x.Array, W = x.Date, ne = x.Error, xe = x.Function, Ve = x.Math, Ee = x.Object, Br = x.RegExp, Qo = x.String, ct = x.TypeError, xi = m.prototype, Ko = xe.prototype, Dn = Ee.prototype, yi = x["__core-js_shared__"], ki = Ko.toString, _e = Dn.hasOwnProperty, Yo = 0, ks = function() {
        var e = /[^.]+$/.exec(yi && yi.keys && yi.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), vi = Dn.toString, Zo = ki.call(Ee), Xo = Pe._, Jo = Br(
        "^" + ki.call(_e).replace(hr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), _i = ns ? x.Buffer : a, Qt = x.Symbol, bi = x.Uint8Array, vs = _i ? _i.allocUnsafe : a, Ei = xs(Ee.getPrototypeOf, Ee), _s = Ee.create, bs = Dn.propertyIsEnumerable, Si = xi.splice, Es = Qt ? Qt.isConcatSpreadable : a, qn = Qt ? Qt.iterator : a, ln = Qt ? Qt.toStringTag : a, Ai = function() {
        try {
          var e = fn(Ee, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), jo = x.clearTimeout !== Pe.clearTimeout && x.clearTimeout, eu = W && W.now !== Pe.Date.now && W.now, tu = x.setTimeout !== Pe.setTimeout && x.setTimeout, wi = Ve.ceil, Ci = Ve.floor, Fr = Ee.getOwnPropertySymbols, nu = _i ? _i.isBuffer : a, Ss = x.isFinite, iu = xi.join, ru = xs(Ee.keys, Ee), $e = Ve.max, We = Ve.min, au = W.now, su = x.parseInt, As = Ve.random, lu = xi.reverse, Vr = fn(x, "DataView"), zn = fn(x, "Map"), $r = fn(x, "Promise"), In = fn(x, "Set"), Hn = fn(x, "WeakMap"), Qn = fn(Ee, "create"), Ti = Hn && new Hn(), Ln = {}, ou = pn(Vr), uu = pn(zn), cu = pn($r), du = pn(In), fu = pn(Hn), Di = Qt ? Qt.prototype : a, Kn = Di ? Di.valueOf : a, ws = Di ? Di.toString : a;
      function s(e) {
        if (Ie(e) && !ie(e) && !(e instanceof fe)) {
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
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Q, this.__views__ = [];
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
        var e = this.__wrapped__.value(), t = this.__dir__, n = ie(e), i = t < 0, r = n ? e.length : 0, l = C1(0, r, this.__views__), u = l.start, c = l.end, f = c - u, v = i ? c : u - 1, _ = this.__iteratees__, E = _.length, $ = 0, z = We(f, this.__takeCount__);
        if (!n || !i && r == f && z == f)
          return Zs(e, this.__actions__);
        var Y = [];
        e:
          for (; f-- && $ < z; ) {
            v += t;
            for (var le = -1, Z = e[v]; ++le < E; ) {
              var ce = _[le], he = ce.iteratee, at = ce.type, Qe = he(Z);
              if (at == Mn)
                Z = Qe;
              else if (!Qe) {
                if (at == vn)
                  continue e;
                break e;
              }
            }
            Y[$++] = Z;
          }
        return Y;
      }
      fe.prototype = Bn(Ii.prototype), fe.prototype.constructor = fe;
      function on(e) {
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
          return n === O ? a : n;
        }
        return _e.call(t, e) ? t[e] : a;
      }
      function ku(e) {
        var t = this.__data__;
        return Qn ? t[e] !== a : _e.call(t, e);
      }
      function vu(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Qn && t === a ? O : t, this;
      }
      on.prototype.clear = gu, on.prototype.delete = xu, on.prototype.get = yu, on.prototype.has = ku, on.prototype.set = vu;
      function Ft(e) {
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
      Ft.prototype.clear = _u, Ft.prototype.delete = bu, Ft.prototype.get = Eu, Ft.prototype.has = Su, Ft.prototype.set = Au;
      function Vt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function wu() {
        this.size = 0, this.__data__ = {
          hash: new on(),
          map: new (zn || Ft)(),
          string: new on()
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
      Vt.prototype.clear = wu, Vt.prototype.delete = Cu, Vt.prototype.get = Tu, Vt.prototype.has = Du, Vt.prototype.set = Iu;
      function un(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Vt(); ++t < n; )
          this.add(e[t]);
      }
      function Lu(e) {
        return this.__data__.set(e, O), this;
      }
      function Bu(e) {
        return this.__data__.has(e);
      }
      un.prototype.add = un.prototype.push = Lu, un.prototype.has = Bu;
      function vt(e) {
        var t = this.__data__ = new Ft(e);
        this.size = t.size;
      }
      function Fu() {
        this.__data__ = new Ft(), this.size = 0;
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
        if (n instanceof Ft) {
          var i = n.__data__;
          if (!zn || i.length < k - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Vt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      vt.prototype.clear = Fu, vt.prototype.delete = Vu, vt.prototype.get = $u, vt.prototype.has = Ou, vt.prototype.set = Pu;
      function Cs(e, t) {
        var n = ie(e), i = !n && hn(e), r = !n && !i && Jt(e), l = !n && !i && !r && On(e), u = n || i || r || l, c = u ? Dr(e.length, Qo) : [], f = c.length;
        for (var v in e)
          (t || _e.call(e, v)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
          Rt(v, f))) && c.push(v);
        return c;
      }
      function Ts(e) {
        var t = e.length;
        return t ? e[Hr(0, t - 1)] : a;
      }
      function Ru(e, t) {
        return qi(Ye(e), cn(t, 0, e.length));
      }
      function Gu(e) {
        return qi(Ye(e));
      }
      function Or(e, t, n) {
        (n !== a && !_t(e[t], n) || n === a && !(t in e)) && $t(e, t, n);
      }
      function Yn(e, t, n) {
        var i = e[t];
        (!(_e.call(e, t) && _t(i, n)) || n === a && !(t in e)) && $t(e, t, n);
      }
      function Li(e, t) {
        for (var n = e.length; n--; )
          if (_t(e[n][0], t))
            return n;
        return -1;
      }
      function Mu(e, t, n, i) {
        return Kt(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ds(e, t) {
        return e && wt(t, Oe(t), e);
      }
      function Uu(e, t) {
        return e && wt(t, Xe(t), e);
      }
      function $t(e, t, n) {
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
      function cn(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function ft(e, t, n, i, r, l) {
        var u, c = t & g, f = t & L, v = t & q;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!De(e))
          return e;
        var _ = ie(e);
        if (_) {
          if (u = D1(e), !c)
            return Ye(e, u);
        } else {
          var E = Ne(e), $ = E == bn || E == ui;
          if (Jt(e))
            return js(e, c);
          if (E == yt || E == xt || $ && !r) {
            if (u = f || $ ? {} : y0(e), !c)
              return f ? y1(e, Uu(u, e)) : x1(e, Ds(u, e));
          } else {
            if (!Se[E])
              return r ? e : {};
            u = I1(e, E, c);
          }
        }
        l || (l = new vt());
        var z = l.get(e);
        if (z)
          return z;
        l.set(e, u), Q0(e) ? e.forEach(function(Z) {
          u.add(ft(Z, t, n, Z, e, l));
        }) : z0(e) && e.forEach(function(Z, ce) {
          u.set(ce, ft(Z, t, n, ce, e, l));
        });
        var Y = v ? f ? ia : na : f ? Xe : Oe, le = _ ? a : Y(e);
        return ut(le || e, function(Z, ce) {
          le && (ce = Z, Z = e[ce]), Yn(u, ce, ft(Z, t, n, ce, e, l));
        }), u;
      }
      function Wu(e) {
        var t = Oe(e);
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
        var r = -1, l = hi, u = !0, c = e.length, f = [], v = t.length;
        if (!c)
          return f;
        n && (t = Te(t, nt(n))), i ? (l = Er, u = !1) : t.length >= k && (l = Nn, u = !1, t = new un(t));
        e:
          for (; ++r < c; ) {
            var _ = e[r], E = n == null ? _ : n(_);
            if (_ = i || _ !== 0 ? _ : 0, u && E === E) {
              for (var $ = v; $--; )
                if (t[$] === E)
                  continue e;
              f.push(_);
            } else
              l(t, E, i) || f.push(_);
          }
        return f;
      }
      var Kt = r0(At), Bs = r0(Gr, !0);
      function Nu(e, t) {
        var n = !0;
        return Kt(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Bi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !rt(u) : n(u, c)))
            var c = u, f = l;
        }
        return f;
      }
      function qu(e, t, n, i) {
        var r = e.length;
        for (n = ae(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : ae(i), i < 0 && (i += r), i = n > i ? 0 : Y0(i); n < i; )
          e[n++] = t;
        return e;
      }
      function Fs(e, t) {
        var n = [];
        return Kt(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function Re(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = B1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? Re(c, t - 1, n, i, r) : zt(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Rr = a0(), Vs = a0(!0);
      function At(e, t) {
        return e && Rr(e, t, Oe);
      }
      function Gr(e, t) {
        return e && Vs(e, t, Oe);
      }
      function Fi(e, t) {
        return qt(t, function(n) {
          return Gt(e[n]);
        });
      }
      function dn(e, t) {
        t = Zt(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[Ct(t[n++])];
        return n && n == i ? e : a;
      }
      function $s(e, t, n) {
        var i = t(e);
        return ie(e) ? i : zt(i, n(e));
      }
      function ze(e) {
        return e == null ? e === a ? de : rr : ln && ln in Ee(e) ? w1(e) : G1(e);
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
        for (var i = n ? Er : hi, r = e[0].length, l = e.length, u = l, c = m(l), f = 1 / 0, v = []; u--; ) {
          var _ = e[u];
          u && t && (_ = Te(_, nt(t))), f = We(_.length, f), c[u] = !n && (t || r >= 120 && _.length >= 120) ? new un(u && _) : a;
        }
        _ = e[0];
        var E = -1, $ = c[0];
        e:
          for (; ++E < r && v.length < f; ) {
            var z = _[E], Y = t ? t(z) : z;
            if (z = n || z !== 0 ? z : 0, !($ ? Nn($, Y) : i(v, Y, n))) {
              for (u = l; --u; ) {
                var le = c[u];
                if (!(le ? Nn(le, Y) : i(e[u], Y, n)))
                  continue e;
              }
              $ && $.push(Y), v.push(z);
            }
          }
        return v;
      }
      function Ku(e, t, n, i) {
        return At(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function Xn(e, t, n) {
        t = Zt(t, e), e = b0(e, t);
        var i = e == null ? e : e[Ct(ht(t))];
        return i == null ? a : tt(i, e, n);
      }
      function Os(e) {
        return Ie(e) && ze(e) == xt;
      }
      function Yu(e) {
        return Ie(e) && ze(e) == Wn;
      }
      function Zu(e) {
        return Ie(e) && ze(e) == rn;
      }
      function Jn(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Ie(e) && !Ie(t) ? e !== e && t !== t : Xu(e, t, n, i, Jn, r);
      }
      function Xu(e, t, n, i, r, l) {
        var u = ie(e), c = ie(t), f = u ? be : Ne(e), v = c ? be : Ne(t);
        f = f == xt ? yt : f, v = v == xt ? yt : v;
        var _ = f == yt, E = v == yt, $ = f == v;
        if ($ && Jt(e)) {
          if (!Jt(t))
            return !1;
          u = !0, _ = !1;
        }
        if ($ && !_)
          return l || (l = new vt()), u || On(e) ? m0(e, t, n, i, r, l) : S1(e, t, f, n, i, r, l);
        if (!(n & re)) {
          var z = _ && _e.call(e, "__wrapped__"), Y = E && _e.call(t, "__wrapped__");
          if (z || Y) {
            var le = z ? e.value() : e, Z = Y ? t.value() : t;
            return l || (l = new vt()), r(le, Z, n, i, l);
          }
        }
        return $ ? (l || (l = new vt()), A1(e, t, n, i, r, l)) : !1;
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
          var f = c[0], v = e[f], _ = c[1];
          if (u && c[2]) {
            if (v === a && !(f in e))
              return !1;
          } else {
            var E = new vt();
            if (i)
              var $ = i(v, _, f, e, t, E);
            if (!($ === a ? Jn(_, v, re | se, i, E) : $))
              return !1;
          }
        }
        return !0;
      }
      function Ps(e) {
        if (!De(e) || V1(e))
          return !1;
        var t = Gt(e) ? Jo : Ul;
        return t.test(pn(e));
      }
      function ju(e) {
        return Ie(e) && ze(e) == T;
      }
      function e1(e) {
        return Ie(e) && Ne(e) == R;
      }
      function t1(e) {
        return Ie(e) && Zi(e.length) && !!Ce[ze(e)];
      }
      function Rs(e) {
        return typeof e == "function" ? e : e == null ? Je : typeof e == "object" ? ie(e) ? Us(e[0], e[1]) : Ms(e) : sl(e);
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
        return Kt(e, function(r, l, u) {
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
        return la(e) && k0(t) ? v0(Ct(e), t) : function(n) {
          var i = xa(n, e);
          return i === a && i === t ? ya(n, e) : Jn(t, i, re | se);
        };
      }
      function Vi(e, t, n, i, r) {
        e !== t && Rr(t, function(l, u) {
          if (r || (r = new vt()), De(l))
            i1(e, t, u, n, Vi, i, r);
          else {
            var c = i ? i(ua(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Or(e, u, c);
          }
        }, Xe);
      }
      function i1(e, t, n, i, r, l, u) {
        var c = ua(e, n), f = ua(t, n), v = u.get(f);
        if (v) {
          Or(e, n, v);
          return;
        }
        var _ = l ? l(c, f, n + "", e, t, u) : a, E = _ === a;
        if (E) {
          var $ = ie(f), z = !$ && Jt(f), Y = !$ && !z && On(f);
          _ = f, $ || z || Y ? ie(c) ? _ = c : Le(c) ? _ = Ye(c) : z ? (E = !1, _ = js(f, !0)) : Y ? (E = !1, _ = e0(f, !0)) : _ = [] : ii(f) || hn(f) ? (_ = c, hn(c) ? _ = Z0(c) : (!De(c) || Gt(c)) && (_ = y0(f))) : E = !1;
        }
        E && (u.set(f, _), r(_, f, i, l, u), u.delete(f)), Or(e, n, _);
      }
      function Ws(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, Rt(t, n) ? e[t] : a;
      }
      function Ns(e, t, n) {
        t.length ? t = Te(t, function(l) {
          return ie(l) ? function(u) {
            return dn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [Je];
        var i = -1;
        t = Te(t, nt(K()));
        var r = Gs(e, function(l, u, c) {
          var f = Te(t, function(v) {
            return v(l);
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
          var u = t[i], c = dn(e, u);
          n(c, u) && jn(l, Zt(u, e), c);
        }
        return l;
      }
      function a1(e) {
        return function(t) {
          return dn(t, e);
        };
      }
      function zr(e, t, n, i) {
        var r = i ? Do : An, l = -1, u = t.length, c = e;
        for (e === t && (t = Ye(t)), n && (c = Te(e, nt(n))); ++l < u; )
          for (var f = 0, v = t[l], _ = n ? n(v) : v; (f = r(c, _, f, i)) > -1; )
            c !== e && Si.call(c, f, 1), Si.call(e, f, 1);
        return e;
      }
      function zs(e, t) {
        for (var n = e ? t.length : 0, i = n - 1; n--; ) {
          var r = t[n];
          if (n == i || r !== l) {
            var l = r;
            Rt(r) ? Si.call(e, r, 1) : Yr(e, r);
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
        if (!e || t < 1 || t > Ue)
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
        return qi(n, cn(t, 0, n.length));
      }
      function jn(e, t, n, i) {
        if (!De(e))
          return e;
        t = Zt(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var f = Ct(t[r]), v = n;
          if (f === "__proto__" || f === "constructor" || f === "prototype")
            return e;
          if (r != u) {
            var _ = c[f];
            v = i ? i(_, f, c) : a, v === a && (v = De(_) ? _ : Rt(t[r + 1]) ? [] : {});
          }
          Yn(c, f, v), c = c[f];
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
        return Kt(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function $i(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= Et) {
          for (; i < r; ) {
            var l = i + r >>> 1, u = e[l];
            u !== null && !rt(u) && (n ? u <= t : u < t) ? i = l + 1 : r = l;
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
        for (var u = t !== t, c = t === null, f = rt(t), v = t === a; r < l; ) {
          var _ = Ci((r + l) / 2), E = n(e[_]), $ = E !== a, z = E === null, Y = E === E, le = rt(E);
          if (u)
            var Z = i || Y;
          else
            v ? Z = Y && (i || $) : c ? Z = Y && $ && (i || !z) : f ? Z = Y && $ && !z && (i || !le) : z || le ? Z = !1 : Z = i ? E <= t : E < t;
          Z ? r = _ + 1 : l = _;
        }
        return We(l, gt);
      }
      function Qs(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !_t(c, f)) {
            var f = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Ks(e) {
        return typeof e == "number" ? e : rt(e) ? I : +e;
      }
      function it(e) {
        if (typeof e == "string")
          return e;
        if (ie(e))
          return Te(e, it) + "";
        if (rt(e))
          return ws ? ws.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function Yt(e, t, n) {
        var i = -1, r = hi, l = e.length, u = !0, c = [], f = c;
        if (n)
          u = !1, r = Er;
        else if (l >= k) {
          var v = t ? null : b1(e);
          if (v)
            return gi(v);
          u = !1, r = Nn, f = new un();
        } else
          f = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var _ = e[i], E = t ? t(_) : _;
            if (_ = n || _ !== 0 ? _ : 0, u && E === E) {
              for (var $ = f.length; $--; )
                if (f[$] === E)
                  continue e;
              t && f.push(E), c.push(_);
            } else
              r(f, E, n) || (f !== c && f.push(E), c.push(_));
          }
        return c;
      }
      function Yr(e, t) {
        return t = Zt(t, e), e = b0(e, t), e == null || delete e[Ct(ht(t))];
      }
      function Ys(e, t, n, i) {
        return jn(e, t, n(dn(e, t)), i);
      }
      function Oi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? pt(e, i ? 0 : l, i ? l + 1 : r) : pt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Zs(e, t) {
        var n = e;
        return n instanceof fe && (n = n.value()), Sr(t, function(i, r) {
          return r.func.apply(r.thisArg, zt([i], r.args));
        }, n);
      }
      function Zr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? Yt(e[0]) : [];
        for (var r = -1, l = m(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = Zn(l[r] || u, e[c], t, n));
        return Yt(Re(l, 1), t, n);
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
      function Zt(e, t) {
        return ie(e) ? e : la(e, t) ? [e] : w0(ke(e));
      }
      var f1 = oe;
      function Xt(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : pt(e, t, n);
      }
      var Js = jo || function(e) {
        return Pe.clearTimeout(e);
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
          var n = e !== a, i = e === null, r = e === e, l = rt(e), u = t !== a, c = t === null, f = t === t, v = rt(t);
          if (!c && !v && !l && e > t || l && u && f && !c && !v || i && u && f || !n && f || !r)
            return 1;
          if (!i && !l && !v && e < t || v && n && r && !i && !l || c && n && r || !u && r || !f)
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
            var v = n[i];
            return f * (v == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function n0(e, t, n, i) {
        for (var r = -1, l = e.length, u = n.length, c = -1, f = t.length, v = $e(l - u, 0), _ = m(f + v), E = !i; ++c < f; )
          _[c] = t[c];
        for (; ++r < u; )
          (E || r < l) && (_[n[r]] = e[r]);
        for (; v--; )
          _[c++] = e[r++];
        return _;
      }
      function i0(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, f = -1, v = t.length, _ = $e(l - c, 0), E = m(_ + v), $ = !i; ++r < _; )
          E[r] = e[r];
        for (var z = r; ++f < v; )
          E[z + f] = t[f];
        for (; ++u < c; )
          ($ || r < l) && (E[z + n[u]] = e[r++]);
        return E;
      }
      function Ye(e, t) {
        var n = -1, i = e.length;
        for (t || (t = m(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function wt(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], f = i ? i(n[c], e[c], c, n, e) : a;
          f === a && (f = e[c]), r ? $t(n, c, f) : Yn(n, c, f);
        }
        return n;
      }
      function x1(e, t) {
        return wt(e, sa(e), t);
      }
      function y1(e, t) {
        return wt(e, g0(e), t);
      }
      function Pi(e, t) {
        return function(n, i) {
          var r = ie(n) ? Eo : Mu, l = t ? t() : {};
          return r(n, e, K(i, 2), l);
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
        var i = t & j, r = ei(e);
        function l() {
          var u = this && this !== Pe && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function s0(e) {
        return function(t) {
          t = ke(t);
          var n = wn(t) ? kt(t) : a, i = n ? n[0] : t.charAt(0), r = n ? Xt(n, 1).join("") : t.slice(1);
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
          var v = l < 3 && u[0] !== f && u[l - 1] !== f ? [] : Ht(u, f);
          if (l -= v.length, l < n)
            return d0(
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
          var _ = this && this !== Pe && this instanceof r ? i : e;
          return tt(_, this, u);
        }
        return r;
      }
      function l0(e) {
        return function(t, n, i) {
          var r = Ee(t);
          if (!Ze(t)) {
            var l = K(n, 3);
            t = Oe(t), n = function(c) {
              return l(r[c], c, r);
            };
          }
          var u = e(t, n, i);
          return u > -1 ? r[l ? t[u] : u] : a;
        };
      }
      function o0(e) {
        return Pt(function(t) {
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
            f && oa(f[0]) && f[1] == (G | ge | J | ve) && !f[4].length && f[9] == 1 ? u = u[Wi(f[0])].apply(u, f[3]) : u = l.length == 1 && oa(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var v = arguments, _ = v[0];
            if (u && v.length == 1 && ie(_))
              return u.plant(_).value();
            for (var E = 0, $ = n ? t[E].apply(this, v) : _; ++E < n; )
              $ = t[E].call(this, $);
            return $;
          };
        });
      }
      function Ri(e, t, n, i, r, l, u, c, f, v) {
        var _ = t & G, E = t & j, $ = t & pe, z = t & (ge | X), Y = t & Me, le = $ ? a : ei(e);
        function Z() {
          for (var ce = arguments.length, he = m(ce), at = ce; at--; )
            he[at] = arguments[at];
          if (z)
            var Qe = $n(Z), st = Bo(he, Qe);
          if (i && (he = n0(he, i, r, z)), l && (he = i0(he, l, u, z)), ce -= st, z && ce < v) {
            var Be = Ht(he, Qe);
            return d0(
              e,
              t,
              Ri,
              Z.placeholder,
              n,
              he,
              Be,
              c,
              f,
              v - ce
            );
          }
          var bt = E ? n : this, Ut = $ ? bt[e] : e;
          return ce = he.length, c ? he = M1(he, c) : Y && ce > 1 && he.reverse(), _ && f < ce && (he.length = f), this && this !== Pe && this instanceof Z && (Ut = le || ei(Ut)), Ut.apply(bt, he);
        }
        return Z;
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
            typeof n == "string" || typeof i == "string" ? (n = it(n), i = it(i)) : (n = Ks(n), i = Ks(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ea(e) {
        return Pt(function(t) {
          return t = Te(t, nt(K())), oe(function(n) {
            var i = this;
            return e(t, function(r) {
              return tt(r, i, n);
            });
          });
        });
      }
      function Mi(e, t) {
        t = t === a ? " " : it(t);
        var n = t.length;
        if (n < 2)
          return n ? Qr(t, e) : t;
        var i = Qr(t, wi(e / Cn(t)));
        return wn(t) ? Xt(kt(i), 0, e).join("") : i.slice(0, e);
      }
      function _1(e, t, n, i) {
        var r = t & j, l = ei(e);
        function u() {
          for (var c = -1, f = arguments.length, v = -1, _ = i.length, E = m(_ + f), $ = this && this !== Pe && this instanceof u ? l : e; ++v < _; )
            E[v] = i[v];
          for (; f--; )
            E[v++] = arguments[++c];
          return tt($, r ? n : this, E);
        }
        return u;
      }
      function c0(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && He(t, n, i) && (n = i = a), t = Mt(t), n === a ? (n = t, t = 0) : n = Mt(n), i = i === a ? t < n ? 1 : -1 : Mt(i), s1(t, n, i, e);
        };
      }
      function Ui(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = mt(t), n = mt(n)), e(t, n);
        };
      }
      function d0(e, t, n, i, r, l, u, c, f, v) {
        var _ = t & ge, E = _ ? u : a, $ = _ ? a : u, z = _ ? l : a, Y = _ ? a : l;
        t |= _ ? J : A, t &= ~(_ ? A : J), t & ye || (t &= -4);
        var le = [
          e,
          t,
          r,
          z,
          E,
          Y,
          $,
          c,
          f,
          v
        ], Z = n.apply(a, le);
        return oa(e) && E0(Z, le), Z.placeholder = i, S0(Z, e, t);
      }
      function ta(e) {
        var t = Ve[e];
        return function(n, i) {
          if (n = mt(n), i = i == null ? 0 : We(ae(i), 292), i && Ss(n)) {
            var r = (ke(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (ke(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var b1 = In && 1 / gi(new In([, -0]))[1] == Wt ? function(e) {
        return new In(e);
      } : Ea;
      function f0(e) {
        return function(t) {
          var n = Ne(t);
          return n == Ke ? Lr(t) : n == R ? Go(t) : Lo(t, e(t));
        };
      }
      function Ot(e, t, n, i, r, l, u, c) {
        var f = t & pe;
        if (!f && typeof e != "function")
          throw new ct(N);
        var v = i ? i.length : 0;
        if (v || (t &= -97, i = r = a), u = u === a ? u : $e(ae(u), 0), c = c === a ? c : ae(c), v -= r ? r.length : 0, t & A) {
          var _ = i, E = r;
          i = r = a;
        }
        var $ = f ? a : ra(e), z = [
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
        if ($ && P1(z, $), e = z[0], t = z[1], n = z[2], i = z[3], r = z[4], c = z[9] = z[9] === a ? f ? 0 : e.length : $e(z[9] - v, 0), !c && t & (ge | X) && (t &= -25), !t || t == j)
          var Y = k1(e, t, n);
        else
          t == ge || t == X ? Y = v1(e, t, c) : (t == J || t == (j | J)) && !r.length ? Y = _1(e, t, n, i) : Y = Ri.apply(a, z);
        var le = $ ? Hs : E0;
        return S0(le(Y, z), e, t);
      }
      function p0(e, t, n, i) {
        return e === a || _t(e, Dn[n]) && !_e.call(i, n) ? t : e;
      }
      function h0(e, t, n, i, r, l) {
        return De(e) && De(t) && (l.set(t, e), Vi(e, t, a, h0, l), l.delete(t)), e;
      }
      function E1(e) {
        return ii(e) ? a : e;
      }
      function m0(e, t, n, i, r, l) {
        var u = n & re, c = e.length, f = t.length;
        if (c != f && !(u && f > c))
          return !1;
        var v = l.get(e), _ = l.get(t);
        if (v && _)
          return v == t && _ == e;
        var E = -1, $ = !0, z = n & se ? new un() : a;
        for (l.set(e, t), l.set(t, e); ++E < c; ) {
          var Y = e[E], le = t[E];
          if (i)
            var Z = u ? i(le, Y, E, t, e, l) : i(Y, le, E, e, t, l);
          if (Z !== a) {
            if (Z)
              continue;
            $ = !1;
            break;
          }
          if (z) {
            if (!Ar(t, function(ce, he) {
              if (!Nn(z, he) && (Y === ce || r(Y, ce, n, i, l)))
                return z.push(he);
            })) {
              $ = !1;
              break;
            }
          } else if (!(Y === le || r(Y, le, n, i, l))) {
            $ = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), $;
      }
      function S1(e, t, n, i, r, l, u) {
        switch (n) {
          case En:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case Wn:
            return !(e.byteLength != t.byteLength || !l(new bi(e), new bi(t)));
          case Nt:
          case rn:
          case an:
            return _t(+e, +t);
          case Bt:
            return e.name == t.name && e.message == t.message;
          case T:
          case we:
            return e == t + "";
          case Ke:
            var c = Lr;
          case R:
            var f = i & re;
            if (c || (c = gi), e.size != t.size && !f)
              return !1;
            var v = u.get(e);
            if (v)
              return v == t;
            i |= se, u.set(e, t);
            var _ = m0(c(e), c(t), i, r, l, u);
            return u.delete(e), _;
          case P:
            if (Kn)
              return Kn.call(e) == Kn.call(t);
        }
        return !1;
      }
      function A1(e, t, n, i, r, l) {
        var u = n & re, c = na(e), f = c.length, v = na(t), _ = v.length;
        if (f != _ && !u)
          return !1;
        for (var E = f; E--; ) {
          var $ = c[E];
          if (!(u ? $ in t : _e.call(t, $)))
            return !1;
        }
        var z = l.get(e), Y = l.get(t);
        if (z && Y)
          return z == t && Y == e;
        var le = !0;
        l.set(e, t), l.set(t, e);
        for (var Z = u; ++E < f; ) {
          $ = c[E];
          var ce = e[$], he = t[$];
          if (i)
            var at = u ? i(he, ce, $, t, e, l) : i(ce, he, $, e, t, l);
          if (!(at === a ? ce === he || r(ce, he, n, i, l) : at)) {
            le = !1;
            break;
          }
          Z || (Z = $ == "constructor");
        }
        if (le && !Z) {
          var Qe = e.constructor, st = t.constructor;
          Qe != st && "constructor" in e && "constructor" in t && !(typeof Qe == "function" && Qe instanceof Qe && typeof st == "function" && st instanceof st) && (le = !1);
        }
        return l.delete(e), l.delete(t), le;
      }
      function Pt(e) {
        return ca(_0(e, a, I0), e + "");
      }
      function na(e) {
        return $s(e, Oe, sa);
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
      function K() {
        var e = s.iteratee || _a;
        return e = e === _a ? Rs : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Ni(e, t) {
        var n = e.__data__;
        return F1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function aa(e) {
        for (var t = Oe(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, k0(r)];
        }
        return t;
      }
      function fn(e, t) {
        var n = Oo(e, t);
        return Ps(n) ? n : a;
      }
      function w1(e) {
        var t = _e.call(e, ln), n = e[ln];
        try {
          e[ln] = a;
          var i = !0;
        } catch {
        }
        var r = vi.call(e);
        return i && (t ? e[ln] = n : delete e[ln]), r;
      }
      var sa = Fr ? function(e) {
        return e == null ? [] : (e = Ee(e), qt(Fr(e), function(t) {
          return bs.call(e, t);
        }));
      } : Sa, g0 = Fr ? function(e) {
        for (var t = []; e; )
          zt(t, sa(e)), e = Ei(e);
        return t;
      } : Sa, Ne = ze;
      (Vr && Ne(new Vr(new ArrayBuffer(1))) != En || zn && Ne(new zn()) != Ke || $r && Ne($r.resolve()) != ci || In && Ne(new In()) != R || Hn && Ne(new Hn()) != St) && (Ne = function(e) {
        var t = ze(e), n = t == yt ? e.constructor : a, i = n ? pn(n) : "";
        if (i)
          switch (i) {
            case ou:
              return En;
            case uu:
              return Ke;
            case cu:
              return ci;
            case du:
              return R;
            case fu:
              return St;
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
        t = Zt(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = Ct(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && Zi(r) && Rt(u, r) && (ie(e) || hn(e)));
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
          case Nt:
          case rn:
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
          case an:
          case we:
            return new i(e);
          case T:
            return h1(e);
          case R:
            return new i();
          case P:
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
        return ie(e) || hn(e) || !!(Es && e && e[Es]);
      }
      function Rt(e, t) {
        var n = typeof e;
        return t = t ?? Ue, !!t && (n == "number" || n != "symbol" && Nl.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function He(e, t, n) {
        if (!De(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? Ze(n) && Rt(t, n.length) : i == "string" && t in n) ? _t(n[t], e) : !1;
      }
      function la(e, t) {
        if (ie(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || rt(e) ? !0 : Tl.test(e) || !Cl.test(e) || t != null && e in Ee(t);
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
      var $1 = yi ? Gt : Aa;
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
          return n.size === F && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function P1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (j | pe | G), u = i == G && n == ge || i == G && n == ve && e[7].length <= t[8] || i == (G | ve) && t[7].length <= t[8] && n == ge;
        if (!(l || u))
          return e;
        i & j && (e[2] = t[2], r |= n & j ? 0 : ye);
        var c = t[3];
        if (c) {
          var f = e[3];
          e[3] = f ? n0(f, c, t[4]) : c, e[4] = f ? Ht(e[3], b) : t[4];
        }
        return c = t[5], c && (f = e[5], e[5] = f ? i0(f, c, t[6]) : c, e[6] = f ? Ht(e[5], b) : t[6]), c = t[7], c && (e[7] = c), i & G && (e[8] = e[8] == null ? t[8] : We(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
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
          return c[t] = n(u), tt(e, this, c);
        };
      }
      function b0(e, t) {
        return t.length < 2 ? e : dn(e, pt(t, 0, -1));
      }
      function M1(e, t) {
        for (var n = e.length, i = We(t.length, n), r = Ye(e); i--; ) {
          var l = t[i];
          e[i] = Rt(l, n) ? r[l] : a;
        }
        return e;
      }
      function ua(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var E0 = A0(Hs), ni = tu || function(e, t) {
        return Pe.setTimeout(e, t);
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
            if (++t >= nn)
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
      function Ct(e) {
        if (typeof e == "string" || rt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function pn(e) {
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
        (n ? He(e, t, n) : t === a) ? t = 1 : t = $e(ae(t), 0);
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
        return zt(ie(n) ? Ye(n) : [n], Re(t, 1));
      }
      var z1 = oe(function(e, t) {
        return Le(e) ? Zn(e, Re(t, 1, Le, !0)) : [];
      }), H1 = oe(function(e, t) {
        var n = ht(t);
        return Le(n) && (n = a), Le(e) ? Zn(e, Re(t, 1, Le, !0), K(n, 2)) : [];
      }), Q1 = oe(function(e, t) {
        var n = ht(t);
        return Le(n) && (n = a), Le(e) ? Zn(e, Re(t, 1, Le, !0), a, n) : [];
      });
      function K1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : ae(t), pt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Y1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : ae(t), t = i - t, pt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Z1(e, t) {
        return e && e.length ? Oi(e, K(t, 3), !0, !0) : [];
      }
      function X1(e, t) {
        return e && e.length ? Oi(e, K(t, 3), !0) : [];
      }
      function J1(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && He(e, t, n) && (n = 0, i = r), qu(e, t, n, i)) : [];
      }
      function T0(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : ae(n);
        return r < 0 && (r = $e(i + r, 0)), mi(e, K(t, 3), r);
      }
      function D0(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = ae(n), r = n < 0 ? $e(i + r, 0) : We(r, i - 1)), mi(e, K(t, 3), r, !0);
      }
      function I0(e) {
        var t = e == null ? 0 : e.length;
        return t ? Re(e, 1) : [];
      }
      function j1(e) {
        var t = e == null ? 0 : e.length;
        return t ? Re(e, Wt) : [];
      }
      function ec(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : ae(t), Re(e, t)) : [];
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
        var r = n == null ? 0 : ae(n);
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
        return t === ht(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Ur(n, K(t, 2)) : [];
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
        return n !== a && (r = ae(n), r = r < 0 ? $e(i + r, 0) : We(r, i - 1)), t === t ? Uo(e, t, r) : mi(e, ds, r, !0);
      }
      function uc(e, t) {
        return e && e.length ? Ws(e, ae(t)) : a;
      }
      var cc = oe(B0);
      function B0(e, t) {
        return e && e.length && t && t.length ? zr(e, t) : e;
      }
      function dc(e, t, n) {
        return e && e.length && t && t.length ? zr(e, t, K(n, 2)) : e;
      }
      function fc(e, t, n) {
        return e && e.length && t && t.length ? zr(e, t, a, n) : e;
      }
      var pc = Pt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Pr(e, t);
        return zs(e, Te(t, function(r) {
          return Rt(r, n) ? +r : r;
        }).sort(t0)), i;
      });
      function hc(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var i = -1, r = [], l = e.length;
        for (t = K(t, 3); ++i < l; ) {
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
        return i ? (n && typeof n != "number" && He(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : ae(t), n = n === a ? i : ae(n)), pt(e, t, n)) : [];
      }
      function gc(e, t) {
        return $i(e, t);
      }
      function xc(e, t, n) {
        return Kr(e, t, K(n, 2));
      }
      function yc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = $i(e, t);
          if (i < n && _t(e[i], t))
            return i;
        }
        return -1;
      }
      function kc(e, t) {
        return $i(e, t, !0);
      }
      function vc(e, t, n) {
        return Kr(e, t, K(n, 2), !0);
      }
      function _c(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = $i(e, t, !0) - 1;
          if (_t(e[i], t))
            return i;
        }
        return -1;
      }
      function bc(e) {
        return e && e.length ? Qs(e) : [];
      }
      function Ec(e, t) {
        return e && e.length ? Qs(e, K(t, 2)) : [];
      }
      function Sc(e) {
        var t = e == null ? 0 : e.length;
        return t ? pt(e, 1, t) : [];
      }
      function Ac(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : ae(t), pt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function wc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : ae(t), t = i - t, pt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Cc(e, t) {
        return e && e.length ? Oi(e, K(t, 3), !1, !0) : [];
      }
      function Tc(e, t) {
        return e && e.length ? Oi(e, K(t, 3)) : [];
      }
      var Dc = oe(function(e) {
        return Yt(Re(e, 1, Le, !0));
      }), Ic = oe(function(e) {
        var t = ht(e);
        return Le(t) && (t = a), Yt(Re(e, 1, Le, !0), K(t, 2));
      }), Lc = oe(function(e) {
        var t = ht(e);
        return t = typeof t == "function" ? t : a, Yt(Re(e, 1, Le, !0), a, t);
      });
      function Bc(e) {
        return e && e.length ? Yt(e) : [];
      }
      function Fc(e, t) {
        return e && e.length ? Yt(e, K(t, 2)) : [];
      }
      function Vc(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? Yt(e, a, t) : [];
      }
      function fa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = qt(e, function(n) {
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
          return tt(t, a, i);
        });
      }
      var $c = oe(function(e, t) {
        return Le(e) ? Zn(e, t) : [];
      }), Oc = oe(function(e) {
        return Zr(qt(e, Le));
      }), Pc = oe(function(e) {
        var t = ht(e);
        return Le(t) && (t = a), Zr(qt(e, Le), K(t, 2));
      }), Rc = oe(function(e) {
        var t = ht(e);
        return t = typeof t == "function" ? t : a, Zr(qt(e, Le), a, t);
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
      var qc = Pt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Pr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof fe) || !Rt(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
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
        _e.call(e, n) ? ++e[n] : $t(e, n, 1);
      });
      function jc(e, t, n) {
        var i = ie(e) ? us : Nu;
        return n && He(e, t, n) && (t = a), i(e, K(t, 3));
      }
      function ed(e, t) {
        var n = ie(e) ? qt : Fs;
        return n(e, K(t, 3));
      }
      var td = l0(T0), nd = l0(D0);
      function id(e, t) {
        return Re(Hi(e, t), 1);
      }
      function rd(e, t) {
        return Re(Hi(e, t), Wt);
      }
      function ad(e, t, n) {
        return n = n === a ? 1 : ae(n), Re(Hi(e, t), n);
      }
      function $0(e, t) {
        var n = ie(e) ? ut : Kt;
        return n(e, K(t, 3));
      }
      function O0(e, t) {
        var n = ie(e) ? So : Bs;
        return n(e, K(t, 3));
      }
      var sd = Pi(function(e, t, n) {
        _e.call(e, n) ? e[n].push(t) : $t(e, n, [t]);
      });
      function ld(e, t, n, i) {
        e = Ze(e) ? e : Pn(e), n = n && !i ? ae(n) : 0;
        var r = e.length;
        return n < 0 && (n = $e(r + n, 0)), Xi(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && An(e, t, n) > -1;
      }
      var od = oe(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = Ze(e) ? m(e.length) : [];
        return Kt(e, function(u) {
          l[++i] = r ? tt(t, u, n) : Xn(u, t, n);
        }), l;
      }), ud = Pi(function(e, t, n) {
        $t(e, n, t);
      });
      function Hi(e, t) {
        var n = ie(e) ? Te : Gs;
        return n(e, K(t, 3));
      }
      function cd(e, t, n, i) {
        return e == null ? [] : (ie(t) || (t = t == null ? [] : [t]), n = i ? a : n, ie(n) || (n = n == null ? [] : [n]), Ns(e, t, n));
      }
      var dd = Pi(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function fd(e, t, n) {
        var i = ie(e) ? Sr : ps, r = arguments.length < 3;
        return i(e, K(t, 4), n, r, Kt);
      }
      function pd(e, t, n) {
        var i = ie(e) ? Ao : ps, r = arguments.length < 3;
        return i(e, K(t, 4), n, r, Bs);
      }
      function hd(e, t) {
        var n = ie(e) ? qt : Fs;
        return n(e, Yi(K(t, 3)));
      }
      function md(e) {
        var t = ie(e) ? Ts : l1;
        return t(e);
      }
      function gd(e, t, n) {
        (n ? He(e, t, n) : t === a) ? t = 1 : t = ae(t);
        var i = ie(e) ? Ru : o1;
        return i(e, t);
      }
      function xd(e) {
        var t = ie(e) ? Gu : c1;
        return t(e);
      }
      function yd(e) {
        if (e == null)
          return 0;
        if (Ze(e))
          return Xi(e) ? Cn(e) : e.length;
        var t = Ne(e);
        return t == Ke || t == R ? e.size : Nr(e).length;
      }
      function kd(e, t, n) {
        var i = ie(e) ? Ar : d1;
        return n && He(e, t, n) && (t = a), i(e, K(t, 3));
      }
      var vd = oe(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && He(e, t[0], t[1]) ? t = [] : n > 2 && He(t[0], t[1], t[2]) && (t = [t[0]]), Ns(e, Re(t, 1), []);
      }), Qi = eu || function() {
        return Pe.Date.now();
      };
      function _d(e, t) {
        if (typeof t != "function")
          throw new ct(N);
        return e = ae(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function P0(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, Ot(e, G, a, a, a, a, t);
      }
      function R0(e, t) {
        var n;
        if (typeof t != "function")
          throw new ct(N);
        return e = ae(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var pa = oe(function(e, t, n) {
        var i = j;
        if (n.length) {
          var r = Ht(n, $n(pa));
          i |= J;
        }
        return Ot(e, i, t, n, r);
      }), G0 = oe(function(e, t, n) {
        var i = j | pe;
        if (n.length) {
          var r = Ht(n, $n(G0));
          i |= J;
        }
        return Ot(t, i, e, n, r);
      });
      function M0(e, t, n) {
        t = n ? a : t;
        var i = Ot(e, ge, a, a, a, a, a, t);
        return i.placeholder = M0.placeholder, i;
      }
      function U0(e, t, n) {
        t = n ? a : t;
        var i = Ot(e, X, a, a, a, a, a, t);
        return i.placeholder = U0.placeholder, i;
      }
      function W0(e, t, n) {
        var i, r, l, u, c, f, v = 0, _ = !1, E = !1, $ = !0;
        if (typeof e != "function")
          throw new ct(N);
        t = mt(t) || 0, De(n) && (_ = !!n.leading, E = "maxWait" in n, l = E ? $e(mt(n.maxWait) || 0, t) : l, $ = "trailing" in n ? !!n.trailing : $);
        function z(Be) {
          var bt = i, Ut = r;
          return i = r = a, v = Be, u = e.apply(Ut, bt), u;
        }
        function Y(Be) {
          return v = Be, c = ni(ce, t), _ ? z(Be) : u;
        }
        function le(Be) {
          var bt = Be - f, Ut = Be - v, ll = t - bt;
          return E ? We(ll, l - Ut) : ll;
        }
        function Z(Be) {
          var bt = Be - f, Ut = Be - v;
          return f === a || bt >= t || bt < 0 || E && Ut >= l;
        }
        function ce() {
          var Be = Qi();
          if (Z(Be))
            return he(Be);
          c = ni(ce, le(Be));
        }
        function he(Be) {
          return c = a, $ && i ? z(Be) : (i = r = a, u);
        }
        function at() {
          c !== a && Js(c), v = 0, i = f = r = c = a;
        }
        function Qe() {
          return c === a ? u : he(Qi());
        }
        function st() {
          var Be = Qi(), bt = Z(Be);
          if (i = arguments, r = this, f = Be, bt) {
            if (c === a)
              return Y(f);
            if (E)
              return Js(c), c = ni(ce, t), z(f);
          }
          return c === a && (c = ni(ce, t)), u;
        }
        return st.cancel = at, st.flush = Qe, st;
      }
      var bd = oe(function(e, t) {
        return Ls(e, 1, t);
      }), Ed = oe(function(e, t, n) {
        return Ls(e, mt(t) || 0, n);
      });
      function Sd(e) {
        return Ot(e, Me);
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
        return n.cache = new (Ki.Cache || Vt)(), n;
      }
      Ki.Cache = Vt;
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
        t = t.length == 1 && ie(t[0]) ? Te(t[0], nt(K())) : Te(Re(t, 1), nt(K()));
        var n = t.length;
        return oe(function(i) {
          for (var r = -1, l = We(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return tt(e, this, i);
        });
      }), ha = oe(function(e, t) {
        var n = Ht(t, $n(ha));
        return Ot(e, J, a, t, n);
      }), N0 = oe(function(e, t) {
        var n = Ht(t, $n(N0));
        return Ot(e, A, a, t, n);
      }), Cd = Pt(function(e, t) {
        return Ot(e, ve, a, a, a, t);
      });
      function Td(e, t) {
        if (typeof e != "function")
          throw new ct(N);
        return t = t === a ? t : ae(t), oe(e, t);
      }
      function Dd(e, t) {
        if (typeof e != "function")
          throw new ct(N);
        return t = t == null ? 0 : $e(ae(t), 0), oe(function(n) {
          var i = n[t], r = Xt(n, 0, t);
          return i && zt(r, i), tt(e, this, r);
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
        return ie(e) ? e : [e];
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
        return t == null || Is(e, t, Oe(t));
      }
      function _t(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Gd = Ui(Mr), Md = Ui(function(e, t) {
        return e >= t;
      }), hn = Os(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Os : function(e) {
        return Ie(e) && _e.call(e, "callee") && !bs.call(e, "callee");
      }, ie = m.isArray, Ud = is ? nt(is) : Yu;
      function Ze(e) {
        return e != null && Zi(e.length) && !Gt(e);
      }
      function Le(e) {
        return Ie(e) && Ze(e);
      }
      function Wd(e) {
        return e === !0 || e === !1 || Ie(e) && ze(e) == Nt;
      }
      var Jt = nu || Aa, Nd = rs ? nt(rs) : Zu;
      function qd(e) {
        return Ie(e) && e.nodeType === 1 && !ii(e);
      }
      function zd(e) {
        if (e == null)
          return !0;
        if (Ze(e) && (ie(e) || typeof e == "string" || typeof e.splice == "function" || Jt(e) || On(e) || hn(e)))
          return !e.length;
        var t = Ne(e);
        if (t == Ke || t == R)
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
        return t == Bt || t == ir || typeof e.message == "string" && typeof e.name == "string" && !ii(e);
      }
      function Kd(e) {
        return typeof e == "number" && Ss(e);
      }
      function Gt(e) {
        if (!De(e))
          return !1;
        var t = ze(e);
        return t == bn || t == ui || t == oi || t == te;
      }
      function q0(e) {
        return typeof e == "number" && e == ae(e);
      }
      function Zi(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ue;
      }
      function De(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Ie(e) {
        return e != null && typeof e == "object";
      }
      var z0 = as ? nt(as) : Ju;
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
          throw new ne(U);
        return Ps(e);
      }
      function jd(e) {
        return e === null;
      }
      function ef(e) {
        return e == null;
      }
      function H0(e) {
        return typeof e == "number" || Ie(e) && ze(e) == an;
      }
      function ii(e) {
        if (!Ie(e) || ze(e) != yt)
          return !1;
        var t = Ei(e);
        if (t === null)
          return !0;
        var n = _e.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && ki.call(n) == Zo;
      }
      var ga = ss ? nt(ss) : ju;
      function tf(e) {
        return q0(e) && e >= -9007199254740991 && e <= Ue;
      }
      var Q0 = ls ? nt(ls) : e1;
      function Xi(e) {
        return typeof e == "string" || !ie(e) && Ie(e) && ze(e) == we;
      }
      function rt(e) {
        return typeof e == "symbol" || Ie(e) && ze(e) == P;
      }
      var On = os ? nt(os) : t1;
      function nf(e) {
        return e === a;
      }
      function rf(e) {
        return Ie(e) && Ne(e) == St;
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
          return Xi(e) ? kt(e) : Ye(e);
        if (qn && e[qn])
          return Ro(e[qn]());
        var t = Ne(e), n = t == Ke ? Lr : t == R ? gi : Pn;
        return n(e);
      }
      function Mt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = mt(e), e === Wt || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * w;
        }
        return e === e ? e : 0;
      }
      function ae(e) {
        var t = Mt(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Y0(e) {
        return e ? cn(ae(e), 0, Q) : 0;
      }
      function mt(e) {
        if (typeof e == "number")
          return e;
        if (rt(e))
          return I;
        if (De(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = De(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = hs(e);
        var n = Ml.test(e);
        return n || Wl.test(e) ? _o(e.slice(2), n ? 2 : 8) : Gl.test(e) ? I : +e;
      }
      function Z0(e) {
        return wt(e, Xe(e));
      }
      function of(e) {
        return e ? cn(ae(e), -9007199254740991, Ue) : e === 0 ? e : 0;
      }
      function ke(e) {
        return e == null ? "" : it(e);
      }
      var uf = Fn(function(e, t) {
        if (ti(t) || Ze(t)) {
          wt(t, Oe(t), e);
          return;
        }
        for (var n in t)
          _e.call(t, n) && Yn(e, n, t[n]);
      }), X0 = Fn(function(e, t) {
        wt(t, Xe(t), e);
      }), Ji = Fn(function(e, t, n, i) {
        wt(t, Xe(t), e, i);
      }), cf = Fn(function(e, t, n, i) {
        wt(t, Oe(t), e, i);
      }), df = Pt(Pr);
      function ff(e, t) {
        var n = Bn(e);
        return t == null ? n : Ds(n, t);
      }
      var pf = oe(function(e, t) {
        e = Ee(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && He(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = Xe(l), c = -1, f = u.length; ++c < f; ) {
            var v = u[c], _ = e[v];
            (_ === a || _t(_, Dn[v]) && !_e.call(e, v)) && (e[v] = l[v]);
          }
        return e;
      }), hf = oe(function(e) {
        return e.push(a, h0), tt(J0, a, e);
      });
      function mf(e, t) {
        return cs(e, K(t, 3), At);
      }
      function gf(e, t) {
        return cs(e, K(t, 3), Gr);
      }
      function xf(e, t) {
        return e == null ? e : Rr(e, K(t, 3), Xe);
      }
      function yf(e, t) {
        return e == null ? e : Vs(e, K(t, 3), Xe);
      }
      function kf(e, t) {
        return e && At(e, K(t, 3));
      }
      function vf(e, t) {
        return e && Gr(e, K(t, 3));
      }
      function _f(e) {
        return e == null ? [] : Fi(e, Oe(e));
      }
      function bf(e) {
        return e == null ? [] : Fi(e, Xe(e));
      }
      function xa(e, t, n) {
        var i = e == null ? a : dn(e, t);
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
      }, K), wf = oe(Xn);
      function Oe(e) {
        return Ze(e) ? Cs(e) : Nr(e);
      }
      function Xe(e) {
        return Ze(e) ? Cs(e, !0) : n1(e);
      }
      function Cf(e, t) {
        var n = {};
        return t = K(t, 3), At(e, function(i, r, l) {
          $t(n, t(i, r, l), i);
        }), n;
      }
      function Tf(e, t) {
        var n = {};
        return t = K(t, 3), At(e, function(i, r, l) {
          $t(n, r, t(i, r, l));
        }), n;
      }
      var Df = Fn(function(e, t, n) {
        Vi(e, t, n);
      }), J0 = Fn(function(e, t, n, i) {
        Vi(e, t, n, i);
      }), If = Pt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Te(t, function(l) {
          return l = Zt(l, e), i || (i = l.length > 1), l;
        }), wt(e, ia(e), n), i && (n = ft(n, g | L | q, E1));
        for (var r = t.length; r--; )
          Yr(n, t[r]);
        return n;
      });
      function Lf(e, t) {
        return j0(e, Yi(K(t)));
      }
      var Bf = Pt(function(e, t) {
        return e == null ? {} : r1(e, t);
      });
      function j0(e, t) {
        if (e == null)
          return {};
        var n = Te(ia(e), function(i) {
          return [i];
        });
        return t = K(t), qs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function Ff(e, t, n) {
        t = Zt(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[Ct(t[i])];
          l === a && (i = r, l = n), e = Gt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Vf(e, t, n) {
        return e == null ? e : jn(e, t, n);
      }
      function $f(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : jn(e, t, n, i);
      }
      var el = f0(Oe), tl = f0(Xe);
      function Of(e, t, n) {
        var i = ie(e), r = i || Jt(e) || On(e);
        if (t = K(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : De(e) ? n = Gt(l) ? Bn(Ei(e)) : {} : n = {};
        }
        return (r ? ut : At)(e, function(u, c, f) {
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
        return e == null ? [] : Ir(e, Oe(e));
      }
      function Mf(e) {
        return e == null ? [] : Ir(e, Xe(e));
      }
      function Uf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = mt(n), n = n === n ? n : 0), t !== a && (t = mt(t), t = t === t ? t : 0), cn(mt(e), t, n);
      }
      function Wf(e, t, n) {
        return t = Mt(t), n === a ? (n = t, t = 0) : n = Mt(n), e = mt(e), Qu(e, t, n);
      }
      function Nf(e, t, n) {
        if (n && typeof n != "boolean" && He(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Mt(e), t === a ? (t = e, e = 0) : t = Mt(t)), e > t) {
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
        e = ke(e), t = it(t);
        var i = e.length;
        n = n === a ? i : cn(ae(n), 0, i);
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
        e = ke(e), t = ae(t);
        var i = t ? Cn(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return Mi(Ci(r), n) + e + Mi(wi(r), n);
      }
      function Jf(e, t, n) {
        e = ke(e), t = ae(t);
        var i = t ? Cn(e) : 0;
        return t && i < t ? e + Mi(t - i, n) : e;
      }
      function jf(e, t, n) {
        e = ke(e), t = ae(t);
        var i = t ? Cn(e) : 0;
        return t && i < t ? Mi(t - i, n) + e : e;
      }
      function ep(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), su(ke(e).replace(mr, ""), t || 0);
      }
      function tp(e, t, n) {
        return (n ? He(e, t, n) : t === a) ? t = 1 : t = ae(t), Qr(ke(e), t);
      }
      function np() {
        var e = arguments, t = ke(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var ip = Vn(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function rp(e, t, n) {
        return n && typeof n != "number" && He(e, t, n) && (t = n = a), n = n === a ? Q : n >>> 0, n ? (e = ke(e), e && (typeof t == "string" || t != null && !ga(t)) && (t = it(t), !t && wn(e)) ? Xt(kt(e), 0, n) : e.split(t, n)) : [];
      }
      var ap = Vn(function(e, t, n) {
        return e + (n ? " " : "") + ka(t);
      });
      function sp(e, t, n) {
        return e = ke(e), n = n == null ? 0 : cn(ae(n), 0, e.length), t = it(t), e.slice(n, n + t.length) == t;
      }
      function lp(e, t, n) {
        var i = s.templateSettings;
        n && He(e, t, n) && (t = a), e = ke(e), t = Ji({}, t, i, p0);
        var r = Ji({}, t.imports, i.imports, p0), l = Oe(r), u = Ir(r, l), c, f, v = 0, _ = t.interpolate || di, E = "__p += '", $ = Br(
          (t.escape || di).source + "|" + _.source + "|" + (_ === $a ? Rl : di).source + "|" + (t.evaluate || di).source + "|$",
          "g"
        ), z = "//# sourceURL=" + (_e.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++mo + "]") + `
`;
        e.replace($, function(Z, ce, he, at, Qe, st) {
          return he || (he = at), E += e.slice(v, st).replace(zl, $o), ce && (c = !0, E += `' +
__e(` + ce + `) +
'`), Qe && (f = !0, E += `';
` + Qe + `;
__p += '`), he && (E += `' +
((__t = (` + he + `)) == null ? '' : __t) +
'`), v = st + Z.length, Z;
        }), E += `';
`;
        var Y = _e.call(t, "variable") && t.variable;
        if (!Y)
          E = `with (obj) {
` + E + `
}
`;
        else if (Ol.test(Y))
          throw new ne(V);
        E = (f ? E.replace(vl, "") : E).replace(_l, "$1").replace(bl, "$1;"), E = "function(" + (Y || "obj") + `) {
` + (Y ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (f ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + E + `return __p
}`;
        var le = al(function() {
          return xe(l, z + "return " + E).apply(a, u);
        });
        if (le.source = E, ma(le))
          throw le;
        return le;
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
        if (!e || !(t = it(t)))
          return e;
        var i = kt(e), r = kt(t), l = ms(i, r), u = gs(i, r) + 1;
        return Xt(i, l, u).join("");
      }
      function dp(e, t, n) {
        if (e = ke(e), e && (n || t === a))
          return e.slice(0, ys(e) + 1);
        if (!e || !(t = it(t)))
          return e;
        var i = kt(e), r = gs(i, kt(t)) + 1;
        return Xt(i, 0, r).join("");
      }
      function fp(e, t, n) {
        if (e = ke(e), e && (n || t === a))
          return e.replace(mr, "");
        if (!e || !(t = it(t)))
          return e;
        var i = kt(e), r = ms(i, kt(t));
        return Xt(i, r).join("");
      }
      function pp(e, t) {
        var n = tn, i = lt;
        if (De(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? ae(t.length) : n, i = "omission" in t ? it(t.omission) : i;
        }
        e = ke(e);
        var l = e.length;
        if (wn(e)) {
          var u = kt(e);
          l = u.length;
        }
        if (n >= l)
          return e;
        var c = n - Cn(i);
        if (c < 1)
          return i;
        var f = u ? Xt(u, 0, c).join("") : e.slice(0, c);
        if (r === a)
          return f + i;
        if (u && (c += f.length - c), ga(r)) {
          if (e.slice(c).search(r)) {
            var v, _ = f;
            for (r.global || (r = Br(r.source, ke(Oa.exec(r)) + "g")), r.lastIndex = 0; v = r.exec(_); )
              var E = v.index;
            f = f.slice(0, E === a ? c : E);
          }
        } else if (e.indexOf(it(r), c) != c) {
          var $ = f.lastIndexOf(r);
          $ > -1 && (f = f.slice(0, $));
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
          return tt(e, a, t);
        } catch (n) {
          return ma(n) ? n : new ne(n);
        }
      }), gp = Pt(function(e, t) {
        return ut(t, function(n) {
          n = Ct(n), $t(e, n, pa(e[n], e));
        }), e;
      });
      function xp(e) {
        var t = e == null ? 0 : e.length, n = K();
        return e = t ? Te(e, function(i) {
          if (typeof i[1] != "function")
            throw new ct(N);
          return [n(i[0]), i[1]];
        }) : [], oe(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (tt(l[0], this, i))
              return tt(l[1], this, i);
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
        var i = Oe(t), r = Fi(t, i);
        n == null && !(De(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = Fi(t, Oe(t)));
        var l = !(De(n) && "chain" in n) || !!n.chain, u = Gt(e);
        return ut(r, function(c) {
          var f = t[c];
          e[c] = f, u && (e.prototype[c] = function() {
            var v = this.__chain__;
            if (l || v) {
              var _ = e(this.__wrapped__), E = _.__actions__ = Ye(this.__actions__);
              return E.push({ func: f, args: arguments, thisArg: e }), _.__chain__ = v, _;
            }
            return f.apply(e, zt([this.value()], arguments));
          });
        }), e;
      }
      function wp() {
        return Pe._ === this && (Pe._ = Xo), this;
      }
      function Ea() {
      }
      function Cp(e) {
        return e = ae(e), oe(function(t) {
          return Ws(t, e);
        });
      }
      var Tp = ea(Te), Dp = ea(us), Ip = ea(Ar);
      function sl(e) {
        return la(e) ? wr(Ct(e)) : a1(e);
      }
      function Lp(e) {
        return function(t) {
          return e == null ? a : dn(e, t);
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
        if (e = ae(e), e < 1 || e > Ue)
          return [];
        var n = Q, i = We(e, Q);
        t = K(t), e -= Q;
        for (var r = Dr(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Rp(e) {
        return ie(e) ? Te(e, Ct) : rt(e) ? [e] : Ye(w0(ke(e)));
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
        return e && e.length ? Bi(e, K(t, 2), Mr) : a;
      }
      function Hp(e) {
        return fs(e, Je);
      }
      function Qp(e, t) {
        return fs(e, K(t, 2));
      }
      function Kp(e) {
        return e && e.length ? Bi(e, Je, qr) : a;
      }
      function Yp(e, t) {
        return e && e.length ? Bi(e, K(t, 2), qr) : a;
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
        return e && e.length ? Tr(e, K(t, 2)) : 0;
      }
      return s.after = _d, s.ary = P0, s.assign = uf, s.assignIn = X0, s.assignInWith = Ji, s.assignWith = cf, s.at = df, s.before = R0, s.bind = pa, s.bindAll = gp, s.bindKey = G0, s.castArray = Fd, s.chain = V0, s.chunk = W1, s.compact = N1, s.concat = q1, s.cond = xp, s.conforms = yp, s.constant = va, s.countBy = Jc, s.create = ff, s.curry = M0, s.curryRight = U0, s.debounce = W0, s.defaults = pf, s.defaultsDeep = hf, s.defer = bd, s.delay = Ed, s.difference = z1, s.differenceBy = H1, s.differenceWith = Q1, s.drop = K1, s.dropRight = Y1, s.dropRightWhile = Z1, s.dropWhile = X1, s.fill = J1, s.filter = ed, s.flatMap = id, s.flatMapDeep = rd, s.flatMapDepth = ad, s.flatten = I0, s.flattenDeep = j1, s.flattenDepth = ec, s.flip = Sd, s.flow = vp, s.flowRight = _p, s.fromPairs = tc, s.functions = _f, s.functionsIn = bf, s.groupBy = sd, s.initial = ic, s.intersection = rc, s.intersectionBy = ac, s.intersectionWith = sc, s.invert = Sf, s.invertBy = Af, s.invokeMap = od, s.iteratee = _a, s.keyBy = ud, s.keys = Oe, s.keysIn = Xe, s.map = Hi, s.mapKeys = Cf, s.mapValues = Tf, s.matches = bp, s.matchesProperty = Ep, s.memoize = Ki, s.merge = Df, s.mergeWith = J0, s.method = Sp, s.methodOf = Ap, s.mixin = ba, s.negate = Yi, s.nthArg = Cp, s.omit = If, s.omitBy = Lf, s.once = Ad, s.orderBy = cd, s.over = Tp, s.overArgs = wd, s.overEvery = Dp, s.overSome = Ip, s.partial = ha, s.partialRight = N0, s.partition = dd, s.pick = Bf, s.pickBy = j0, s.property = sl, s.propertyOf = Lp, s.pull = cc, s.pullAll = B0, s.pullAllBy = dc, s.pullAllWith = fc, s.pullAt = pc, s.range = Bp, s.rangeRight = Fp, s.rearg = Cd, s.reject = hd, s.remove = hc, s.rest = Td, s.reverse = da, s.sampleSize = gd, s.set = Vf, s.setWith = $f, s.shuffle = xd, s.slice = mc, s.sortBy = vd, s.sortedUniq = bc, s.sortedUniqBy = Ec, s.split = rp, s.spread = Dd, s.tail = Sc, s.take = Ac, s.takeRight = wc, s.takeRightWhile = Cc, s.takeWhile = Tc, s.tap = Nc, s.throttle = Id, s.thru = zi, s.toArray = K0, s.toPairs = el, s.toPairsIn = tl, s.toPath = Rp, s.toPlainObject = Z0, s.transform = Of, s.unary = Ld, s.union = Dc, s.unionBy = Ic, s.unionWith = Lc, s.uniq = Bc, s.uniqBy = Fc, s.uniqWith = Vc, s.unset = Pf, s.unzip = fa, s.unzipWith = F0, s.update = Rf, s.updateWith = Gf, s.values = Pn, s.valuesIn = Mf, s.without = $c, s.words = rl, s.wrap = Bd, s.xor = Oc, s.xorBy = Pc, s.xorWith = Rc, s.zip = Gc, s.zipObject = Mc, s.zipObjectDeep = Uc, s.zipWith = Wc, s.entries = el, s.entriesIn = tl, s.extend = X0, s.extendWith = Ji, ba(s, s), s.add = Mp, s.attempt = al, s.camelCase = qf, s.capitalize = nl, s.ceil = Up, s.clamp = Uf, s.clone = Vd, s.cloneDeep = Od, s.cloneDeepWith = Pd, s.cloneWith = $d, s.conformsTo = Rd, s.deburr = il, s.defaultTo = kp, s.divide = Wp, s.endsWith = zf, s.eq = _t, s.escape = Hf, s.escapeRegExp = Qf, s.every = jc, s.find = td, s.findIndex = T0, s.findKey = mf, s.findLast = nd, s.findLastIndex = D0, s.findLastKey = gf, s.floor = Np, s.forEach = $0, s.forEachRight = O0, s.forIn = xf, s.forInRight = yf, s.forOwn = kf, s.forOwnRight = vf, s.get = xa, s.gt = Gd, s.gte = Md, s.has = Ef, s.hasIn = ya, s.head = L0, s.identity = Je, s.includes = ld, s.indexOf = nc, s.inRange = Wf, s.invoke = wf, s.isArguments = hn, s.isArray = ie, s.isArrayBuffer = Ud, s.isArrayLike = Ze, s.isArrayLikeObject = Le, s.isBoolean = Wd, s.isBuffer = Jt, s.isDate = Nd, s.isElement = qd, s.isEmpty = zd, s.isEqual = Hd, s.isEqualWith = Qd, s.isError = ma, s.isFinite = Kd, s.isFunction = Gt, s.isInteger = q0, s.isLength = Zi, s.isMap = z0, s.isMatch = Yd, s.isMatchWith = Zd, s.isNaN = Xd, s.isNative = Jd, s.isNil = ef, s.isNull = jd, s.isNumber = H0, s.isObject = De, s.isObjectLike = Ie, s.isPlainObject = ii, s.isRegExp = ga, s.isSafeInteger = tf, s.isSet = Q0, s.isString = Xi, s.isSymbol = rt, s.isTypedArray = On, s.isUndefined = nf, s.isWeakMap = rf, s.isWeakSet = af, s.join = lc, s.kebabCase = Kf, s.last = ht, s.lastIndexOf = oc, s.lowerCase = Yf, s.lowerFirst = Zf, s.lt = sf, s.lte = lf, s.max = qp, s.maxBy = zp, s.mean = Hp, s.meanBy = Qp, s.min = Kp, s.minBy = Yp, s.stubArray = Sa, s.stubFalse = Aa, s.stubObject = Vp, s.stubString = $p, s.stubTrue = Op, s.multiply = Zp, s.nth = uc, s.noConflict = wp, s.noop = Ea, s.now = Qi, s.pad = Xf, s.padEnd = Jf, s.padStart = jf, s.parseInt = ep, s.random = Nf, s.reduce = fd, s.reduceRight = pd, s.repeat = tp, s.replace = np, s.result = Ff, s.round = Xp, s.runInContext = d, s.sample = md, s.size = yd, s.snakeCase = ip, s.some = kd, s.sortedIndex = gc, s.sortedIndexBy = xc, s.sortedIndexOf = yc, s.sortedLastIndex = kc, s.sortedLastIndexBy = vc, s.sortedLastIndexOf = _c, s.startCase = ap, s.startsWith = sp, s.subtract = Jp, s.sum = jp, s.sumBy = e2, s.template = lp, s.times = Pp, s.toFinite = Mt, s.toInteger = ae, s.toLength = Y0, s.toLower = op, s.toNumber = mt, s.toSafeInteger = of, s.toString = ke, s.toUpper = up, s.trim = cp, s.trimEnd = dp, s.trimStart = fp, s.truncate = pp, s.unescape = hp, s.uniqueId = Gp, s.upperCase = mp, s.upperFirst = ka, s.each = $0, s.eachRight = O0, s.first = L0, ba(s, function() {
        var e = {};
        return At(s, function(t, n) {
          _e.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = S, ut(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), ut(["drop", "take"], function(e, t) {
        fe.prototype[e] = function(n) {
          n = n === a ? 1 : $e(ae(n), 0);
          var i = this.__filtered__ && !t ? new fe(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = We(n, i.__takeCount__) : i.__views__.push({
            size: We(n, Q),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, fe.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), ut(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == vn || n == Un;
        fe.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: K(r, 3),
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
        return this.filter(Yi(K(e)));
      }, fe.prototype.slice = function(e, t) {
        e = ae(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new fe(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = ae(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, fe.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, fe.prototype.toArray = function() {
        return this.take(Q);
      }, At(fe.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, f = u instanceof fe, v = c[0], _ = f || ie(u), E = function(ce) {
            var he = r.apply(s, zt([ce], c));
            return i && $ ? he[0] : he;
          };
          _ && n && typeof v == "function" && v.length != 1 && (f = _ = !1);
          var $ = this.__chain__, z = !!this.__actions__.length, Y = l && !$, le = f && !z;
          if (!l && _) {
            u = le ? u : new fe(this);
            var Z = e.apply(u, c);
            return Z.__actions__.push({ func: zi, args: [E], thisArg: a }), new dt(Z, $);
          }
          return Y && le ? e.apply(this, c) : (Z = this.thru(E), Y ? i ? Z.value()[0] : Z.value() : Z);
        });
      }), ut(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = xi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
        s.prototype[e] = function() {
          var r = arguments;
          if (i && !this.__chain__) {
            var l = this.value();
            return t.apply(ie(l) ? l : [], r);
          }
          return this[n](function(u) {
            return t.apply(ie(u) ? u : [], r);
          });
        };
      }), At(fe.prototype, function(e, t) {
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
    sn ? ((sn.exports = Tn)._ = Tn, _r._ = Tn) : Pe._ = Tn;
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
    const a = D, S = o, k = Fe(() => S.filters ? S.filters.filter((O) => O.model) : []), U = Fe(() => {
      const O = {};
      return k.value.forEach((F) => {
        O[F.key] = F.model;
      }), O;
    }), N = $2.debounce(() => {
      a(ai.FILTER_CHANGE, U);
    }, 800);
    function V() {
      a(ai.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (O, F) => (h(), y("div", {
      class: Ge(["base-table-filters", { inactive: o.inactive }])
    }, [
      p("h6", O2, [
        H(C(Lt), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        F[1] || (F[1] = je(" Filters "))
      ]),
      ji(O.$slots, "customFields", {}, void 0, !0),
      (h(!0), y(me, null, Ae(o.filters, (b, g) => (h(), y(me, null, [
        b.type === "datetime" || b.type === "datetimehour" ? (h(), ue(C(fl), {
          class: "filter-elm",
          key: `${o.prefix}${b.key}`,
          label: b.value,
          disabled: o.filters[g].disabled,
          modelValue: o.filters[g].model,
          "onUpdate:modelValue": (L) => o.filters[g].model = L,
          onInput: C(N)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : b.dataSource ? (h(), ue(C(Tt), {
          class: "filter-elm",
          key: `${o.prefix}${b.key}`,
          options: b.key === "campaign" ? O.campaignlist : b.dataSource,
          label: b.value,
          disabled: o.filters[g].disabled,
          singleSelect: !1,
          modelValue: o.filters[g].model,
          "onUpdate:modelValue": (L) => o.filters[g].model = L,
          onClick: (L) => O.filterClicked(b.key),
          onInput: C(N)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), ue(C(Dt), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${b.key}`,
          label: b.value,
          disabled: o.filters[g].disabled,
          modelValue: o.filters[g].model,
          "onUpdate:modelValue": (L) => o.filters[g].model = L,
          onInput: C(N)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      H(C(et), {
        type: "tertiary",
        label: "Clear filters",
        onClick: F[0] || (F[0] = (b) => V())
      })
    ], 2));
  }
}, R2 = /* @__PURE__ */ qe(P2, [["__scopeId", "data-v-0bc5c036"]]), G2 = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: D }) {
    const a = D, k = o.options || {}, U = new IntersectionObserver(([V]) => {
      a("intersecting", V.isIntersecting);
    }, k), N = M(null);
    return yn(() => {
      N.value && U.observe(N.value);
    }), t2(() => {
      U.disconnect();
    }), (V, O) => (h(), y("div", {
      ref_key: "targetELement",
      ref: N,
      class: "observer",
      style: { height: "3px" }
    }, [
      ji(V.$slots, "default")
    ], 512));
  }
}, xl = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", M2 = { class: "query-builder" }, U2 = { class: "query-conditions" }, W2 = { class: "condition" }, N2 = { key: 0 }, q2 = { key: 1 }, z2 = {
  key: 0,
  class: "query-operator-outer"
}, H2 = {
  __name: "StandardQueryDisplay",
  setup(o) {
    M({
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
    }), M({
      gender: null,
      productCategory: null
    });
    const D = M([
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
    ]), a = (S) => new Date(S).toISOString().split("T")[0];
    return (S, k) => (h(), y("div", M2, [
      p("div", U2, [
        k[1] || (k[1] = p("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), y(me, null, Ae(D.value, (U, N) => (h(), y("div", { key: N }, [
          p("div", W2, [
            p("strong", null, ee(U.field), 1),
            p("span", null, ee(U.operator), 1),
            U.type === "date" ? (h(), y("span", N2, ee(a(U.value)), 1)) : (h(), y("span", q2, ee(U.value), 1)),
            H(C(et), {
              type: "tertiary",
              icon: "bi-arrows-expand"
            })
          ]),
          D.value.length > 1 && N !== D.value.length - 1 ? (h(), y("div", z2, k[0] || (k[0] = [
            p("div", { class: "query-operator" }, " And", -1)
          ]))) : B("", !0)
        ]))), 128))
      ])
    ]));
  }
}, Q2 = /* @__PURE__ */ qe(H2, [["__scopeId", "data-v-695e5081"]]), K2 = { class: "info-card" }, Y2 = { class: "segments" }, Z2 = { class: "segment-img-wrapper" }, X2 = ["src"], J2 = { class: "segment-info" }, j2 = {
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
    return (S, k) => (h(), y("div", K2, [
      k[2] || (k[2] = p("h5", null, "Top Interests", -1)),
      p("div", Y2, [
        (h(!0), y(me, null, Ae(a.value, (U) => (h(), y("div", {
          class: "segment",
          key: U.name
        }, [
          p("div", Z2, [
            p("img", {
              src: U.image,
              alt: "segment"
            }, null, 8, X2)
          ]),
          p("div", J2, [
            p("h4", null, ee(U.name), 1),
            p("p", null, [
              k[0] || (k[0] = p("span", null, "Reach:", -1)),
              je(" " + ee(U.reach), 1)
            ]),
            p("p", null, [
              k[1] || (k[1] = p("span", null, "Share:", -1)),
              je(" " + ee(U.impressions), 1)
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
    const a = o, S = en(), k = D;
    Fe(() => {
      var V, O, F;
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
          categories: ((O = (V = a.selectedSegment.thumbnail) == null ? void 0 : V.graph) == null ? void 0 : O.labels) || []
        },
        colors: [
          "#0A2FFF",
          "#0068AD"
        ],
        title: {
          text: ((F = a.selectedSegment.thumbnail) == null ? void 0 : F.title) || "",
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
      var V, O, F;
      return ((F = (O = (V = a.selectedSegment.thumbnail) == null ? void 0 : V.graph) == null ? void 0 : O.seriesCombined) == null ? void 0 : F.map((b) => ({
        name: b.name,
        data: b.data.map(Number)
      }))) || [];
    });
    const U = Fe(() => {
      var V, O, F, b;
      return ((b = (F = (O = (V = a.selectedSegment.thumbnail) == null ? void 0 : V.segments) == null ? void 0 : O[0]) == null ? void 0 : F.segments) == null ? void 0 : b.slice(0, 2)) || [];
    });
    Fe(() => U.value.map((F) => parseFloat(F.affinityScore || "0")).reduce((F, b) => F + b, 0).toFixed(2)), Fe(() => U.value.map((O) => parseInt(O.reach || "0", 10)).reduce((O, F) => O + F, 0).toLocaleString());
    function N() {
      S.set_selectedSegmentType(a.location), S.set_activeTab("custom"), S.set_selectedSegment(a.selectedSegment), k("showInsightsExplorer", a.selectedSegment);
    }
    return (V, O) => {
      const F = dl("CataUiTooltip");
      return h(), y("div", null, [
        p("div", th, [
          p("div", nh, [
            O[2] || (O[2] = p("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            p("p", ih, [
              O[1] || (O[1] = je("Find the segments that work best with ")),
              p("span", rh, ee(a.selectedSegment.name), 1)
            ]),
            H(F, { label: "The preview is for your external proofing tool." })
          ]),
          H(C(et), {
            type: "secondary",
            label: "Explore",
            onClick: O[0] || (O[0] = (b) => N())
          })
        ])
      ]);
    };
  }
}, sh = /* @__PURE__ */ qe(ah, [["__scopeId", "data-v-5b4c0a39"]]), lh = { class: "modal-body" }, oh = { class: "section" }, uh = { class: "checkbox-group" }, ch = { class: "checkbox-group" }, dh = { class: "sections-wrapper" }, fh = { class: "section" }, ph = { class: "checkbox-group-catergory" }, hh = { class: "section" }, mh = { class: "ccheckbox-group-catergory" }, gh = { class: "section" }, xh = { class: "checkbox-group-category" }, yh = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: D }) {
    const a = D, S = M([]), k = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], U = ["Build new campaign", "Update current campaign"], N = ["Display & Video 360", "The Trade Desk"], V = ["Infosum", "LiveRamp"];
    function O() {
      a("close");
    }
    const F = () => {
      a("insertSegment"), O();
    };
    return (b, g) => {
      const L = dl("hp");
      return h(), ue(C(pl), {
        onClose: O,
        size: "medium"
      }, {
        header: It(() => g[5] || (g[5] = [
          p("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: It(() => [
          p("div", lh, [
            p("div", oh, [
              H(L, null, {
                default: It(() => g[6] || (g[6] = [
                  je("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              p("div", uh, [
                (h(), y(me, null, Ae(k, (q) => H(C(gn), {
                  key: q,
                  label: q,
                  modelValue: S.value,
                  "onUpdate:modelValue": g[0] || (g[0] = (re) => S.value = re),
                  value: q
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            g[10] || (g[10] = p("hr", null, null, -1)),
            p("div", ch, [
              (h(), y(me, null, Ae(U, (q) => H(C(gn), {
                key: q,
                label: q,
                modelValue: S.value,
                "onUpdate:modelValue": g[1] || (g[1] = (re) => S.value = re),
                value: q
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            p("div", dh, [
              p("div", fh, [
                g[7] || (g[7] = p("h3", null, "Cohort", -1)),
                p("div", ph, [
                  (h(), y(me, null, Ae(N, (q) => H(C(gn), {
                    key: q,
                    label: q,
                    modelValue: S.value,
                    "onUpdate:modelValue": g[2] || (g[2] = (re) => S.value = re),
                    value: q
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              p("div", hh, [
                g[8] || (g[8] = p("h3", null, "Clean Room", -1)),
                p("div", mh, [
                  (h(), y(me, null, Ae(V, (q) => H(C(gn), {
                    key: q,
                    label: q,
                    modelValue: S.value,
                    "onUpdate:modelValue": g[3] || (g[3] = (re) => S.value = re),
                    value: q
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              p("div", gh, [
                g[9] || (g[9] = p("h3", null, "WPP Open", -1)),
                p("div", xh, [
                  H(C(gn), {
                    label: "Open Media Studio",
                    modelValue: S.value,
                    "onUpdate:modelValue": g[4] || (g[4] = (q) => S.value = q),
                    value: "Open Media Studio"
                  }, null, 8, ["modelValue"])
                ])
              ])
            ])
          ])
        ]),
        footer: It(() => [
          H(C(et), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: O
          }),
          H(C(et), {
            type: "primary",
            label: "Push",
            onClick: F
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
}, $h = { class: "segment-details-content" }, Oh = {
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
    const a = o, S = D;
    M([]);
    const k = en(), U = M(null), N = M(null), V = M(!1), O = M([]), F = M(""), b = M([]), g = M(""), L = M(""), q = M(!1), re = [
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
    ], se = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], j = M(re[0]), pe = M(se[0]), ye = M(!1), ge = M([
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
    ]), X = [
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
    ], J = M({}), A = M(""), G = M({
      sortColumn: "name",
      sortOrder: 1
    });
    function ve() {
      k.set_selectedSegmentType("standard"), k.set_selectedSegment(A.value), S("showInsightsExplorer", A.value);
    }
    async function Me() {
      var I;
      if (!((I = A.value) != null && I.segmentId))
        return;
      const w = `${a.baseUrl}/api/v1/segments/${A.value.segmentId}`;
      try {
        const Q = await fetch(w, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!Q.ok) {
          const gt = await Q.text();
          throw new Error(gt || "Failed to delete segment");
        }
        A.value = "", await k.fetch_segments(g.value);
      } catch (Q) {
        console.error("Error deleting segment:", Q);
      }
    }
    function tn(w) {
      return w.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (I) => I.toUpperCase());
    }
    function lt(w) {
      J.value = w, k.set_filterQuery(w), k.fetch_segments(g.value);
    }
    async function nn(w) {
      if (w && k.get_isLastPage && !ye.value && k.get_segments && k.get_segments.length > 0) {
        ye.value = !0;
        try {
          await k.fetch_nextSegmentPage(g.value), ye.value = !1;
        } catch {
          ye.value = !1;
        }
      }
    }
    async function Gn() {
      ge.value.map((w) => {
        w.key !== "market" && (w.model = "");
      }), k.reset_filterQuery(), await k.fetch_segments(g.value);
    }
    function vn(w) {
      G.value = w;
    }
    function Mn() {
      V.value = !V.value;
    }
    function Un(w) {
      A.value = w.row;
    }
    function Wt() {
      q.value = !0;
    }
    async function Ue() {
      await k.set_token(a.token), await k.set_brandId(a.brandId), await k.set_tenantId(a.tenantId), await k.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? A.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && (A.value = a.selectedSegment), await k.fetch_segment_settings(a.brandId);
      try {
        const w = await k.get_segment_settings;
        w && (b.value = await w.platforms.map((I) => ({
          value: I.platform_id,
          label: I.platform,
          locations: I.locations.map((Q) => ({
            value: Q.value,
            label: Q.display_name
          }))
        }))), g.value = b.value[0].value;
      } catch (w) {
        console.log(w);
      }
    }
    return yn(() => {
      N.value = U.value, Ue();
    }), jt(g, async (w, I) => {
      w && I !== w && (O.value = b.value[w - 1].locations, F.value = O.value[0].value, ye.value = !0, k.set_platform(w), await k.fetch_segments(w), j.value = re[0], ye.value = !1);
    }), jt(L, async (w) => {
      w && (w == null ? void 0 : w.length) < 3 || (k.set_searchTerm(w), k.fetch_segments(g.value));
    }), jt(F, async (w) => {
      k.set_locationQuery(w), k.fetch_segments(g.value);
    }), jt(G, async (w) => {
      k.set_sortQuery(w), k.fetch_segments(g.value);
    }), jt(j, async (w) => {
      const I = w.id;
      k.set_categoryQuery(I), k.fetch_segments();
    }), Fe(() => _h.charts.map((w) => {
      var _n, xt;
      const I = yl[w.type] || ((_n = w.type) == null ? void 0 : _n.toLowerCase()), Q = La[I] || {};
      console.log("type", I), console.log("baseOptions", Q);
      let gt = {}, Et = [];
      return I === "line" || I === "area" ? (gt = {
        xaxis: {
          categories: w.data.map((be) => be.key),
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
      }, Et = [{
        name: ((xt = w.data[0]) == null ? void 0 : xt.valueType) || "Value",
        data: w.data.map((be) => Number(be.value))
      }]) : I === "bar" ? (gt = {
        xaxis: {
          categories: w.data.map((be) => be.key)
        }
      }, Et = [{
        name: w.title,
        data: w.data.map((be) => Number(be.value))
      }]) : I === "donut" || I === "pie" ? (gt = {
        labels: w.data.map((be) => be.key)
      }, Et = w.data.map((be) => Number(be.value))) : I === "bubble" && (Et = [{
        name: w.title,
        data: w.data.map((be) => ({
          x: Number(be.x),
          y: Number(be.y),
          z: Number(be.z)
        }))
      }]), console.log("series", Et), console.log("dynamicOptions", gt), {
        series: Et,
        options: {
          ...Q,
          ...gt,
          title: {
            ...Q.title,
            text: w.title
          },
          chart: {
            // ...baseOptions.chart,
            type: I
          }
        },
        chartType: I
      };
    })), (w, I) => (h(), y(me, null, [
      p("div", bh, [
        p("div", Eh, [
          p("div", Sh, [
            p("div", Ah, [
              H(C(Tt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: b.value,
                modelValue: g.value,
                "onUpdate:modelValue": I[0] || (I[0] = (Q) => g.value = Q),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              H(C(Tt), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: O.value,
                modelValue: F.value,
                "onUpdate:modelValue": I[1] || (I[1] = (Q) => F.value = Q),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            H(C(Dt), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: L.value,
              "onUpdate:modelValue": I[2] || (I[2] = (Q) => L.value = Q)
            }, null, 8, ["modelValue"])
          ]),
          p("div", wh, [
            p("div", Ch, [
              p("div", Th, [
                H(C(Da), {
                  tabs: re,
                  modelValue: j.value,
                  "onUpdate:modelValue": I[3] || (I[3] = (Q) => j.value = Q),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              p("div", Dh, [
                H(C(Lt), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: I[4] || (I[4] = (Q) => Mn())
                })
              ])
            ])
          ]),
          p("div", Ih, [
            p("div", {
              class: "list-list",
              ref_key: "list",
              ref: U
            }, [
              H(V2, {
                stickyHeader: 0,
                columns: X,
                rows: C(k).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: I[5] || (I[5] = (Q) => Un(Q)),
                onColumnSorted: I[6] || (I[6] = (Q) => vn(Q)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              ye.value ? (h(), y("div", Lh, [
                H(C(Rn), { size: "xlarge" })
              ])) : B("", !0),
              H(G2, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: I[7] || (I[7] = (Q) => nn(Q))
              })
            ], 512),
            V.value ? (h(), ue(R2, {
              key: 0,
              filters: ge.value,
              onClearFilters: I[8] || (I[8] = (Q) => Gn()),
              onFilterChange: I[9] || (I[9] = (Q) => lt(Q))
            }, null, 8, ["filters"])) : B("", !0)
          ])
        ]),
        p("div", Bh, [
          p("div", {
            class: Ge(["outer-wrapper-segment-details", { "standard-empty": !A.value }])
          }, [
            A.value ? (h(), y("div", Fh, [
              A.value ? (h(), y("div", Vh, ee(A.value.name), 1)) : B("", !0),
              I[24] || (I[24] = p("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              p("div", $h, [
                A.value.name ? (h(), y("div", Oh, [
                  I[15] || (I[15] = p("div", { class: "description-term" }, "Name", -1)),
                  p("div", Ph, ee(A.value.name), 1)
                ])) : B("", !0),
                A.value.description ? (h(), y("div", Rh, [
                  I[16] || (I[16] = p("div", { class: "description-term" }, "Description", -1)),
                  p("div", Gh, ee(A.value.description), 1)
                ])) : B("", !0),
                A.value.sourceCreatedDate ? (h(), y("div", Mh, [
                  I[17] || (I[17] = p("div", { class: "description-term" }, "Created", -1)),
                  p("div", Uh, ee(C(xn)(A.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                A.value.sourceUpdatedDate ? (h(), y("div", Wh, [
                  I[18] || (I[18] = p("div", { class: "description-term" }, "Updated", -1)),
                  p("div", Nh, ee(C(xn)(A.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                A.value.status ? (h(), y("div", qh, [
                  I[19] || (I[19] = p("div", { class: "description-term" }, "Status", -1)),
                  p("div", zh, ee(A.value.status.value), 1)
                ])) : B("", !0),
                A.value.expiration_date ? (h(), y("div", Hh, [
                  I[20] || (I[20] = p("div", { class: "description-term" }, "Expiration", -1)),
                  p("div", Qh, ee(A.value.expiration_date), 1)
                ])) : B("", !0),
                A.value.id ? (h(), y("div", Kh, [
                  I[21] || (I[21] = p("div", { class: "description-term" }, "Segmnent ID", -1)),
                  p("div", Yh, ee(A.value.id), 1)
                ])) : B("", !0),
                A.value.audience_id ? (h(), y("div", Zh, [
                  I[22] || (I[22] = p("div", { class: "description-term" }, "Audience ID", -1)),
                  p("div", Xh, ee(A.value.audience_id), 1)
                ])) : B("", !0),
                A.value.count ? (h(), y("div", Jh, [
                  I[23] || (I[23] = p("div", { class: "description-term" }, "Last count", -1)),
                  p("div", jh, ee(A.value.count), 1),
                  A.value.refreshCountDate ? (h(), y("span", em, " (" + ee(C(xn)(A.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : B("", !0)
                ])) : B("", !0),
                A.value.platform_specific ? (h(!0), y(me, { key: 9 }, Ae(A.value.platform_specific, (Q) => (h(), y("div", tm, [
                  p("div", nm, ee(tn(Q.label)), 1),
                  p("div", im, ee(Q.value), 1)
                ]))), 256)) : B("", !0)
              ]),
              p("div", null, [
                H(C(Da), {
                  tabs: se,
                  modelValue: pe.value,
                  "onUpdate:modelValue": I[10] || (I[10] = (Q) => pe.value = Q),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                pe.value.id === 2 ? (h(), ue(Q2, { key: 0 })) : B("", !0)
              ])
            ])) : B("", !0),
            A.value ? B("", !0) : (h(), y("div", rm, [
              p("div", null, [
                p("img", {
                  class: "",
                  alt: "standardIcon",
                  src: C(xl)
                }, null, 8, am)
              ]),
              I[25] || (I[25] = p("div", { class: "standard-view-title" }, [
                p("div", null, "Select a standard segment from the list"),
                p("div", null, "or"),
                p("div", null, [
                  p("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          A.value.name ? (h(), y("div", sm, [
            p("div", lm, [
              I[26] || (I[26] = p("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              p("div", om, [
                p("span", null, ee(A.value.name ? `${`${A.value.name} - `}` : "none"), 1),
                p("span", null, ee(A.value.count), 1)
              ])
            ]),
            p("div", null, [
              H(C(et), {
                type: "secondary",
                label: "Explore",
                onClick: I[11] || (I[11] = (Q) => ve()),
                class: "mr-2"
              }),
              H(C(et), {
                type: "delete",
                label: "Delete",
                onClick: I[12] || (I[12] = (Q) => Me()),
                class: "mr-2 redButton"
              }),
              H(C(et), {
                type: "primary",
                label: "Push to destination",
                onClick: I[13] || (I[13] = (Q) => Wt())
              })
            ])
          ])) : B("", !0)
        ])
      ]),
      q.value ? (h(), ue(kh, {
        key: 0,
        onClose: I[14] || (I[14] = (Q) => q.value = !1)
      })) : B("", !0)
    ], 64));
  }
}, cm = /* @__PURE__ */ qe(um, [["__scopeId", "data-v-88cbdb10"]]), dm = { class: "feedback-title-wrapper" }, fm = { class: "title" }, pm = { class: "feedback-text" }, hm = {
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
    return (a, S) => {
      var k, U, N;
      return o.feedback ? (h(), y("div", {
        key: 0,
        class: Ge(["ai-query-feedback", [o.feedback.type]])
      }, [
        p("div", dm, [
          H(C(Lt), {
            class: "pr-2",
            size: "16px",
            icon: D[(k = o.feedback) == null ? void 0 : k.type],
            color: D[`icon-color-${(U = o.feedback) == null ? void 0 : U.type}`]
          }, null, 8, ["icon", "color"]),
          p("div", fm, ee(o.feedback.title), 1)
        ]),
        p("p", pm, ee((N = o.feedback) == null ? void 0 : N.text), 1)
      ], 2)) : B("", !0);
    };
  }
}, cl = /* @__PURE__ */ qe(hm, [["__scopeId", "data-v-8b6b4205"]]), mm = { class: "freeform-tab" }, gm = {
  __name: "FreeForm",
  setup(o) {
    tr();
    const D = M("");
    return (a, S) => (h(), y("div", mm, [
      H(C(Dt), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: D.value,
        "onUpdate:modelValue": S[0] || (S[0] = (k) => D.value = k)
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
    const a = D, S = o;
    M(!1);
    const k = M(!1), U = {
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
    function V() {
      a("explore-insights");
    }
    return (O, F) => (h(), y("div", null, [
      o.savingDraft ? B("", !0) : (h(), y("div", ym, [
        p("div", km, [
          F[1] || (F[1] = p("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          k.value ? (h(), ue(C(et), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: F[0] || (F[0] = (b) => V())
          })) : B("", !0)
        ]),
        p("div", vm, [
          p("div", _m, [
            F[2] || (F[2] = je(" Segment size ")),
            p("span", bm, ee(S.segmentCount), 1),
            F[3] || (F[3] = je(" records. "))
          ])
        ]),
        k.value ? (h(), y("div", Em, [
          H(C(ml), {
            options: U,
            series: N
          })
        ])) : B("", !0)
      ])),
      o.savingDraft ? (h(), y("div", Sm, [
        H(C(Rn), { size: "xlarge" }),
        F[4] || (F[4] = p("p", null, "Connecting to Open Intelligence...", -1))
      ])) : B("", !0)
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
    function S(U) {
      a("toggle-group", U);
    }
    function k(U, N) {
      return N[U];
    }
    return (U, N) => (h(), y("div", Cm, [
      o.fetching ? (h(), ue(C(Rn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : B("", !0),
      (h(!0), y(me, null, Ae(o.tables, (V) => (h(), y("div", {
        class: Ge(["query-attributes-group", { closed: o.collapsed.includes(V.display_name) }]),
        key: V.display_name
      }, [
        p("div", {
          class: "query-attributes-group-toggle",
          onClick: (O) => S(V.display_name),
          onKeydown: Ba((O) => S(V.display_name), ["enter"])
        }, [
          N[3] || (N[3] = p("span", { class: "arrow" }, null, -1)),
          je(" " + ee(V.display_name), 1)
        ], 40, Tm),
        o.collapsed.includes(V.display_name) ? B("", !0) : (h(), y("div", Dm, [
          H(C(Ia), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (O) => k(O, V.columns),
            onDragEnd: N[2] || (N[2] = (O) => U.$emit("drag-end"))
          }, {
            default: It(() => [
              (h(!0), y(me, null, Ae(V.columns, (O) => (h(), ue(C(a2), {
                key: O.display_name
              }, {
                default: It(() => [
                  p("div", {
                    class: "attribute",
                    onMousedown: N[0] || (N[0] = (F) => U.$emit("drag-start")),
                    onMouseup: N[1] || (N[1] = (F) => U.$emit("drag-end"))
                  }, [
                    H(C(Lt), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    p("div", {
                      class: "attribute-content",
                      onClick: n2((F) => U.$emit("click-attribute", O), ["stop"])
                    }, [
                      p("span", Lm, ee(O.type), 1),
                      p("span", Bm, ee(O.display_name), 1)
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
    const a = o, S = en(), k = tr(), U = D;
    M();
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
    ], V = M(N[0]), O = M([]), F = M(O.value[0]), b = M([]), g = M(b.value[0]), L = M(""), q = M(null), re = M(!1), se = M(null), j = M(!0), pe = M(!1), ye = M([]), ge = M([]), X = M(!1), J = M(!1), A = M(""), G = M(""), ve = M(!1), Me = M(!1), tn = M(!1), lt = M(""), nn = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], Gn = [
      { value: "$eq", label: "equal" }
    ], vn = [
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
    ], Wt = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], Ue = M(0), w = M({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), I = () => {
      S.set_selectedSegmentType("custom"), S.set_activeTab("custom"), S.set_selectedSegment(q.value), U("showInsightsExplorer", q.value);
    };
    async function Q(te) {
      const T = {
        brandName: a.brandName,
        name: te.name,
        description: te.description,
        count: te.count || L.value
      }, R = `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${te.segmentId}`, we = await fetch(R, {
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
      const P = await we.json();
      console.log("Insights generated:", P);
    }
    async function gt() {
      lt.value = "saving", tn.value = !0;
      const te = {
        platformId: g.value,
        count: L.value,
        region: S.query.demographics.region,
        market: S.query.demographics.market,
        description: w.value.description,
        name: w.value.name,
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
          body: JSON.stringify(te)
        }), R = await T.json();
        if (!T.ok)
          throw new Error(R.message || "Failed to save segment");
        Me.value = !0, J.value = !0, lt.value = "generating", q.value = R.data[0], await Q(R.data[0]), lt.value = "done";
      } catch (T) {
        console.error("Error saving segment or generating insights:", T), lt.value = "";
      } finally {
        tn.value = !1;
      }
    }
    async function Et() {
      ve.value = !0;
      const te = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: G.value
      };
      w.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const T = await k.generate_ai_query(te, g.value, F.value), R = {
        text: T.message,
        type: T.query ? "info" : "warning",
        title: "AI Assumption"
      }, we = {
        text: T.query,
        type: "query",
        title: "Query Gen"
      };
      k.set_ai_generated_message(R), k.set_ai_generated_query(we), T.attrs.forEach((P, de) => {
        de === 0 ? se.value = "queryGroupDrop" : se.value = w.value.conditions[0].id;
        const St = {
          payload: {
            display_name: P.field,
            input_type: P.input_type,
            operators: P.operator,
            selectors: []
          }
        };
        St.payload.selectors.push(P.value), Bt(St), ol();
      }), ve.value = !1;
    }
    async function _n() {
      w.value.conditions.forEach((te) => {
        te.group.forEach((T) => {
          T.input_type === "select" && T.statement[2].length > 1 && T.statement[1] === "$eq" && (T.statement[1] = "$in"), T.input_type === "select" && T.statement[2].length > 1 && T.statement[1] === "$neq" && (T.statement[1] = "$nin");
        });
      });
    }
    async function xt() {
      X.value = !0, V.value.id === 1 && await _n(), L.value = await k.run_query(w.value, g.value, F.value), L.value && (J.value = !0), X.value = !1;
    }
    function be(te, T) {
      var we, P;
      return te === "operatorsQueries" ? (we = nn.find((de) => de.value === T)) == null ? void 0 : we.label : (P = oi(te).find((de) => de.value === T)) == null ? void 0 : P.label;
    }
    function oi(te) {
      switch (te) {
        case "select":
          return vn;
        case "boolean":
          return Gn;
        case "string":
          return Mn;
        case "date":
          return Un;
        case "int":
          return Wt;
        default:
          return [];
      }
    }
    function Nt(te) {
      re.value = te;
    }
    async function rn() {
      pe.value = !0, await k.fetch_database_model(g.value, F.value), pe.value = !1;
    }
    async function ir() {
      j.value = !0, await k.fetch_custom_segment_settings();
      const te = await k.get_segment_settings;
      te && (b.value = await te.platforms.map((T) => ({
        value: T.platform_id,
        label: T.platform,
        locations: T.locations.map((R) => ({
          value: R.value,
          label: R.display_name
        }))
      })), g.value = b.value[0].value), j.value = !1;
    }
    function Bt(te) {
      const T = te.payload ? te.payload : te;
      if (Ue.value < k.settings.maxSubQuery) {
        const R = T.selectors.map((de) => ({
          value: de,
          label: de
        }));
        let we = [];
        R.length > 2 ? we[0] = R[0].value : R.length > 0 ? we = R[0].value : we = null;
        const P = R.length > 0 && T.input_type !== "boolean" ? "select" : T.input_type;
        if (se.value === "queryGroupDrop") {
          Ue.value += 1, w.value.conditions.length > 0 && w.value.conditions.push({ logic: "$or" });
          const de = {
            id: wa(),
            group: [
              {
                id: wa(),
                statement: [T.display_name, "$eq", we],
                selectors: R,
                input_type: P
              }
            ]
          };
          w.value.conditions.push(de);
        } else if (se.value !== null) {
          Ue.value += 1;
          const de = w.value.conditions.findIndex(
            (St) => St.id === se.value
          );
          de !== -1 && (w.value.conditions[de].group.push({ logic: "$and" }), w.value.conditions[de].group.push({
            id: wa(),
            statement: [T.display_name, "$eq", we],
            selectors: R,
            input_type: P
          }));
        }
        se.value = null;
      }
    }
    function bn(te) {
      var T;
      (T = w.value.conditions[0]) != null && T.id ? se.value = w.value.conditions[0].id : se.value = "queryGroupDrop", Bt(te), ol();
    }
    function ui(te, T, R) {
      if (w.value.conditions[T].group.length === 1)
        w.value.conditions.length > T + 1 ? w.value.conditions.splice(T, 2) : w.value.conditions.splice(T, 1), Ue.value -= 1;
      else {
        const we = w.value.conditions[T].group.findIndex(
          (P) => P.id === R
        );
        w.value.conditions[T].group.splice(we - 1, 2), Ue.value -= 1;
      }
    }
    function Ke(te) {
      const T = ye.value.indexOf(te);
      T >= 0 ? ye.value.splice(T, 1) : ye.value.push(te);
    }
    function an(te) {
      const T = ge.value.indexOf(te);
      T >= 0 ? ge.value.splice(T, 1) : ge.value.push(te);
    }
    function rr() {
      L.value = "", w.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function yt() {
      w.value = { ...w.value, count: L.value }, V.value.id === 3 && (w.value = {
        ...w.value,
        freeForm: k.freeFormQuery
      }), U("insertSegment", w.value);
    }
    async function ci() {
      await S.set_token(a.token), await S.set_brandId(a.brandId), await S.set_tenantId(a.tenantId), await k.set_customSegmentUrl(a.customSegmentUrl), await k.fetch_custom_segment_settings(), await ir();
    }
    return yn(() => {
      ci();
    }), jt(g, async (te, T) => {
      te && T !== te && (O.value = b.value.find((R) => R.value == te).locations, F.value = O.value[0].value, await rr(), await rn());
    }), jt(V, async (te, T) => {
      te && T !== te && te.id === 2 && (G.value = "", k.set_ai_generated_message(null), k.set_ai_generated_query(null));
    }), (te, T) => (h(), y("div", $m, [
      p("div", Om, [
        j.value ? (h(), ue(C(Rn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), y(me, { key: 1 }, [
          p("div", Pm, [
            H(C(Da), {
              tabs: N,
              modelValue: V.value,
              "onUpdate:modelValue": T[0] || (T[0] = (R) => V.value = R),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          p("div", Rm, [
            H(C(Tt), {
              style: { width: "45%" },
              class: "source w-100",
              options: b.value,
              modelValue: g.value,
              "onUpdate:modelValue": T[1] || (T[1] = (R) => g.value = R),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            H(C(Tt), {
              style: { width: "45%" },
              class: "source w-100",
              options: O.value,
              modelValue: F.value,
              "onUpdate:modelValue": T[2] || (T[2] = (R) => F.value = R),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            C(S).brief.market ? (h(), ue(C(Dt), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: C(S).brief.market,
              "onUpdate:modelValue": T[3] || (T[3] = (R) => C(S).brief.market = R),
              label: "Market"
            }, null, 8, ["modelValue"])) : B("", !0)
          ]),
          g.value && F.value ? (h(), y(me, { key: 0 }, [
            V.value.id === 1 ? (h(), ue(Vm, {
              key: 0,
              tables: C(k).get_databaseModel.tables,
              collapsed: ge.value,
              fetching: pe.value,
              onClickAttribute: bn,
              onDragStart: T[4] || (T[4] = (R) => Nt(!0)),
              onDragEnd: T[5] || (T[5] = (R) => Nt(!1)),
              onToggleGroup: an
            }, null, 8, ["tables", "collapsed", "fetching"])) : B("", !0),
            V.value.id === 2 ? (h(), y("div", Gm, [
              H(C(Dt), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: G.value,
                "onUpdate:modelValue": T[6] || (T[6] = (R) => G.value = R)
              }, null, 8, ["modelValue"]),
              H(C(et), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !G.value,
                loading: ve.value,
                onClick: T[7] || (T[7] = (R) => Et())
              }, null, 8, ["disabled", "loading"]),
              C(k).get_aiGeneratedMessage ? (h(), ue(cl, {
                key: 0,
                feedback: C(k).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : B("", !0),
              C(k).get_aiGeneratedQuery ? (h(), ue(cl, {
                key: 1,
                feedback: C(k).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : B("", !0)
            ])) : B("", !0),
            V.value.id === 3 ? (h(), y("div", Mm, [
              H(xm)
            ])) : B("", !0)
          ], 64)) : B("", !0)
        ], 64))
      ]),
      p("div", Um, [
        p("div", Wm, [
          p("div", Nm, [
            p("div", null, [
              T[14] || (T[14] = p("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              p("div", qm, [
                H(C(et), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !g.value || !F.value,
                  loading: X.value,
                  onClick: T[8] || (T[8] = (R) => xt())
                }, null, 8, ["disabled", "loading"]),
                Me.value ? B("", !0) : (h(), ue(C(et), {
                  key: 0,
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !w.value.name || !w.value.description || !L.value,
                  loading: tn.value,
                  onClick: T[9] || (T[9] = (R) => gt())
                }, null, 8, ["disabled", "loading"]))
              ])
            ]),
            V.value.id !== 3 ? (h(), y("div", zm, [
              p("div", Hm, [
                (h(!0), y(me, null, Ae(w.value.conditions, (R, we) => (h(), y("div", {
                  class: "query-outer",
                  key: R.id
                }, [
                  R.group ? (h(), y("div", Qm, [
                    p("div", {
                      class: "collapse-subQuery",
                      onClick: (P) => Ke(R.id),
                      onKeydown: Ba((P) => Ke(R.id), ["enter"])
                    }, [
                      H(C(Lt), {
                        icon: ye.value.indexOf(R.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, Km),
                    p("div", Ym, [
                      ye.value.indexOf(R.id) === -1 ? (h(), y("div", Zm, [
                        (h(!0), y(me, null, Ae(R.group, (P) => (h(), y("div", Xm, [
                          P.logic && ye.value.indexOf(R.id) === -1 ? (h(), y("div", Jm, [
                            H(C(Tt), {
                              class: "query-operator",
                              modelValue: P.logic,
                              "onUpdate:modelValue": (de) => P.logic = de,
                              singleSelect: !0,
                              options: nn,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : B("", !0),
                          P.statement ? (h(), y("div", {
                            key: 1,
                            class: Ge(["sub-query", { "single-subquery": R.group.length === 1 }])
                          }, [
                            H(C(Dt), {
                              readonly: "",
                              modelValue: P.statement[0],
                              "onUpdate:modelValue": (de) => P.statement[0] = de
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            H(C(Tt), {
                              modelValue: P.statement[1],
                              "onUpdate:modelValue": (de) => P.statement[1] = de,
                              singleSelect: !0,
                              options: oi(P.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            P.selectors.length < 3 && P.selectors.length > 0 ? (h(), ue(C(Tt), {
                              key: 0,
                              modelValue: P.statement[2],
                              "onUpdate:modelValue": (de) => P.statement[2] = de,
                              options: P.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            P.selectors.length > 2 && P.input_type !== "boolean" ? (h(), ue(C(Tt), {
                              key: 1,
                              modelValue: P.statement[2],
                              "onUpdate:modelValue": (de) => P.statement[2] = de,
                              options: P.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            P.input_type === "int" ? (h(), ue(C(Dt), {
                              key: 2,
                              modelValue: P.statement[2],
                              "onUpdate:modelValue": (de) => P.statement[2] = de,
                              error: P.statement[2] ? "" : A.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : B("", !0),
                            P.input_type === "string" ? (h(), ue(C(Dt), {
                              key: 3,
                              modelValue: P.statement[2],
                              "onUpdate:modelValue": (de) => P.statement[2] = de,
                              error: P.statement[2] ? "" : A.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : P.input_type === "date" ? (h(), ue(C(fl), {
                              key: 4,
                              modelValue: P.statement[2],
                              "onUpdate:modelValue": (de) => P.statement[2] = de,
                              range: P.statement[1] === "$bt" || P.statement[1] === "$nbt",
                              error: P.statement[2] ? "" : A.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : B("", !0),
                            H(C(Lt), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (de) => ui(R.id, we, P.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : B("", !0)
                        ]))), 256))
                      ])) : (h(), y("p", jm, [
                        (h(!0), y(me, null, Ae(R.group, (P, de) => (h(), y("span", {
                          key: P.id
                        }, [
                          P.statement ? (h(), y("span", e3, [
                            p("b", null, ee(P == null ? void 0 : P.statement[0]), 1),
                            je(" " + ee(be(P.input_type, P == null ? void 0 : P.statement[1])) + " ", 1),
                            p("b", null, ee((P == null ? void 0 : P.statement[2]) || "?"), 1)
                          ])) : (h(), y("span", t3, ee(be("operatorsQueries", P.logic)), 1))
                        ]))), 128))
                      ])),
                      re.value && Ue.value < C(k).settings.maxSubQuery ? (h(), ue(C(Ia), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (P) => se.value = R.id,
                        onDrop: Bt
                      }, {
                        default: It(() => T[15] || (T[15] = [
                          p("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : B("", !0)
                    ])
                  ])) : B("", !0),
                  w.value.conditions.length > 1 && we < w.value.conditions.length - 1 && R.logic ? (h(), y("div", n3, [
                    H(C(Tt), {
                      class: "query-operator",
                      modelValue: R.logic,
                      "onUpdate:modelValue": (P) => R.logic = P,
                      singleSelect: !0,
                      options: nn,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : B("", !0)
                ]))), 128))
              ]),
              w.value.conditions.length === 0 ? (h(), y("div", i3, [
                p("span", null, [
                  p("img", {
                    class: "",
                    alt: "standardIcon",
                    src: C(xl)
                  }, null, 8, r3)
                ])
              ])) : B("", !0),
              re.value && Ue.value < C(k).settings.maxSubQuery || w.value.conditions.length === 0 ? (h(), ue(C(Ia), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: T[10] || (T[10] = (R) => se.value = "queryGroupDrop"),
                onDrop: Bt
              }, {
                default: It(() => [
                  p("div", {
                    class: Ge(["drop-indicator", {
                      "mt-25": w.value.conditions.length > 0,
                      "p-5": w.value.conditions.length === 0
                    }])
                  }, [
                    w.value.conditions.length <= 0 ? (h(), y("span", a3, " Drag and drop attributes or AI generated rules ")) : B("", !0)
                  ], 2)
                ]),
                _: 1
              })) : B("", !0)
            ])) : B("", !0)
          ]),
          X.value || J.value ? (h(), y("div", s3, [
            !X.value && J.value ? (h(), ue(wm, {
              key: 0,
              segmentData: L.value,
              segmentCount: L.value
            }, null, 8, ["segmentData", "segmentCount"])) : B("", !0),
            X.value ? (h(), y("div", l3, [
              H(C(Rn), {
                size: "xlarge",
                class: "mt-3"
              }),
              T[16] || (T[16] = p("p", { class: "mt-3" }, "Running query...", -1))
            ])) : B("", !0),
            lt.value === "saving" || lt.value === "generating" ? (h(), y("div", o3, [
              H(C(Rn), {
                size: "xlarge",
                class: "mt-3"
              }),
              lt.value === "saving" ? (h(), y("p", u3, "Saving segment...")) : (h(), y("p", c3, "Generating insights..."))
            ])) : B("", !0),
            lt.value === "done" && q.value ? (h(), ue(sh, {
              key: 3,
              selectedSegment: q.value,
              location: "custom",
              onShowInsightsExplorer: I
            }, null, 8, ["selectedSegment"])) : B("", !0)
          ])) : B("", !0)
        ]),
        p("div", d3, [
          p("div", f3, [
            H(C(Dt), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: w.value.name,
              "onUpdate:modelValue": T[11] || (T[11] = (R) => w.value.name = R),
              type: "text"
            }, null, 8, ["modelValue"]),
            H(C(Dt), {
              class: "segment-name",
              label: "Segment description",
              modelValue: w.value.description,
              "onUpdate:modelValue": T[12] || (T[12] = (R) => w.value.description = R),
              type: "text"
            }, null, 8, ["modelValue"])
          ]),
          p("div", p3, [
            H(C(et), {
              size: "small",
              label: "Push to destination",
              disabled: !L.value || !w.value.name && V.value.id === 1 || !w.value.name && V.value.id === 2 || w.value.conditions.length <= 0 && V.value.id !== 3,
              onClick: T[13] || (T[13] = (R) => yt())
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
    const D = M([]), a = o, S = Fe(() => a.charts.filter((U) => U.type === "bubble")), k = Fe(() => a.tags);
    return yn(() => {
      D.value = new Array(S.value.length).fill(!1);
    }), (U, N) => (h(), y("div", g3, [
      (h(!0), y(me, null, Ae(k.value, (V, O) => (h(), y("div", {
        class: Ge(["card-wrapper", { "full-width": V.title.includes("Publishers") }]),
        key: V.title + O
      }, [
        p("div", x3, [
          p("div", y3, [
            p("h2", k3, [
              p("span", v3, ee(V.title), 1)
            ])
          ]),
          p("div", _3, [
            p("div", b3, [
              p("div", E3, [
                (h(!0), y(me, null, Ae(V.data[0].label, (F, b) => (h(), y("div", { key: F }, [
                  p("div", S3, ee(F), 1),
                  p("div", A3, [
                    p("div", w3, [
                      (h(!0), y(me, null, Ae(Math.floor(parseFloat(V.data[0].score[b])), (g, L) => (h(), y("span", {
                        key: `filled-${L}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), y(me, null, Ae(5 - Math.floor(parseFloat(V.data[0].score[b])), (g, L) => (h(), y("span", {
                        key: `empty-${L}`,
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
    const D = o, a = M([]), S = M([]), k = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], U = (b, g) => {
      var ge, X;
      const L = "area", q = La[L] || {}, re = ((ge = b.data[0]) == null ? void 0 : ge.label) || [], j = (((X = b.data[0]) == null ? void 0 : X.score) || []).map((J) => Number.isNaN(Number(J)) ? J : Number(J)), pe = [{ name: b.title, data: j }], ye = {
        labels: re,
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
            formatter(J) {
              return J;
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
        section: b.section,
        chartType: L,
        title: b.title,
        series: pe,
        options: {
          ...q,
          ...ye,
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
    }, N = (b) => {
      if (!b)
        return "bar";
      const g = b.toString().toLowerCase().trim();
      return (g.includes("vertical") || g.includes("verical")) && (g.includes("bar") || g.includes("bars") || g.includes("chart")) || g === "horizontal" ? "bar" : g === "donut" ? "donut" : g === "pie" ? "pie" : g === "radar" ? "radar" : g === "line" ? "line" : g === "area" ? "area" : g;
    }, V = Fe(() => D.charts.filter((b) => b.data && b.data.length > 0).map((b, g) => {
      var ge, X;
      const L = N(yl[b.type] || b.type), q = La[L] || {}, re = ((ge = b.data[0]) == null ? void 0 : ge.label) || [], j = (((X = b.data[0]) == null ? void 0 : X.score) || []).map((J) => Number.isNaN(Number(J)) ? J : Number(J));
      let pe = [], ye = {};
      if (L === "horizontal")
        pe = [{ name: b.title, data: j }], ye = {
          labels: re,
          colors: [k[g % k.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (L === "bar" || L === "vertical bar" || L === "vertical bars" || L === "Vertical bars" || L === "vertical chart")
        b.title === "Average View of Digital consumption (Daily)" ? (pe = [{ name: b.title, data: j }], ye = {
          labels: re,
          colors: [k[g % k.length]],
          plotOptions: { bar: { horizontal: !1, distributed: !1 } }
        }) : (b.title === "Personality archetype" && console.log(j), pe = [{ name: b.title, data: j }], ye = {
          labels: re,
          colors: [k[g % k.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (L === "line" || L === "area")
          return U(b, g);
        L === "radar" ? (pe = [{ name: b.title, data: j }], ye = { labels: re }) : (L === "donut" || L === "pie") && (pe = j, ye = { labels: re });
      }
      return {
        section: b.section,
        chartType: L,
        title: b.title,
        series: pe,
        options: {
          ...q,
          ...ye,
          chart: { type: L }
        }
      };
    }));
    yn(() => {
      a.value = new Array(V.value.length).fill(!1);
    });
    const O = (b, g) => {
      if (!b || a.value[g])
        return;
      S.value[g] = b;
      const { stop: L } = l2(
        b,
        ([q]) => {
          q.isIntersecting && (a.value[g] = !0, L());
        },
        { threshold: 0.1 }
      );
    }, F = () => {
      const b = V.value.length;
      return b === 1 ? "full-width" : b === 2 ? "half-width" : "third-width";
    };
    return (b, g) => (h(), y("div", null, [
      p("h5", D3, ee(V.value[0].section), 1),
      p("div", I3, [
        (h(!0), y(me, null, Ae(V.value, (L, q) => (h(), y("div", {
          key: L.title + q,
          ref_for: !0,
          ref: (re) => O(re, q),
          class: Ge(["chart-wrapper", F()])
        }, [
          a.value[q] ? (h(), y("div", L3, [
            p("div", B3, ee(L.title), 1),
            H(C(ml), {
              options: L.options,
              series: L.series,
              type: L.chartType,
              width: "100%",
              height: L.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : B("", !0)
        ], 2))), 128)),
        V.value.length === 2 ? (h(), ue(T3, {
          key: 0,
          tags: o.tags || [],
          charts: o.charts || []
        }, null, 8, ["tags", "charts"])) : B("", !0)
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
    const D = en(), a = D.get_selectedSegment, S = M(null), k = Fe(() => S.value || {}), U = M(), N = M([]), V = M(!0), O = M([]);
    yn(async () => {
      var b, g, L;
      if (a != null && a.segmentId)
        try {
          V.value = !0;
          const q = await si.get(
            `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${a != null && a.segmentId ? a == null ? void 0 : a.segmentId : (b = en.get_selectedSegment) == null ? void 0 : b.segmentId}`,
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
          S.value = (L = (g = q.data) == null ? void 0 : g.data) == null ? void 0 : L[0];
          const re = S.value.charts.reduce((se, j, pe) => {
            if (pe < 2)
              pe === 0 ? se.push([j]) : se[0].push(j);
            else {
              const ye = pe - 2, ge = Math.floor(ye / 3) + 1;
              se[ge] || (se[ge] = []), se[ge].push(j);
            }
            return se;
          }, []);
          N.value = S.value.segments[0], O.value = Object.values(re), await o2(5e3), V.value = !1;
        } catch (q) {
          V.value = !1, console.error("Failed to fetch insights:", q);
        }
    }), Fe(() => {
      var b, g, L;
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
          categories: ((g = (b = a.thumbnail) == null ? void 0 : b.graph) == null ? void 0 : g.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((L = a.thumbnail) == null ? void 0 : L.title) || "",
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
      var b, g, L;
      return ((L = (g = (b = a.thumbnail) == null ? void 0 : b.graph) == null ? void 0 : g.seriesCombined) == null ? void 0 : L.map((q) => ({
        name: q.name,
        data: q.data.map(Number)
      }))) || [];
    });
    const F = Fe(() => {
      var b, g, L, q;
      return ((q = (L = (g = (b = a.thumbnail) == null ? void 0 : b.segments) == null ? void 0 : g[0]) == null ? void 0 : L.segments) == null ? void 0 : q.slice(0, 4)) || [];
    });
    return Fe(() => F.value.map((L) => parseFloat(L.affinityScore || "0")).reduce((L, q) => L + q, 0).toFixed(2)), Fe(() => F.value.map((g) => parseInt(g.reach || "0", 10)).reduce((g, L) => g + L, 0).toLocaleString()), (b, g) => {
      var L, q, re;
      return h(), y(me, null, [
        V.value ? (h(), y("div", K3, [
          H(C(s2), {
            height: "40vh",
            ref_key: "anim",
            ref: U,
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
        ])) : B("", !0),
        V.value ? B("", !0) : (h(), y("div", Y3, [
          p("div", Z3, [
            p("h6", X3, [
              p("div", J3, [
                p("div", j3, [
                  g[1] || (g[1] = p("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  je(ee(((L = C(a)) == null ? void 0 : L.name) || "Segment Overview"), 1)
                ]),
                p("div", eg, [
                  g[2] || (g[2] = p("strong", null, "Count:", -1)),
                  je(" " + ee((q = C(a)) == null ? void 0 : q.count), 1)
                ]),
                p("div", tg, [
                  g[3] || (g[3] = p("strong", null, "Description:", -1)),
                  je(" " + ee((re = C(a)) == null ? void 0 : re.description), 1)
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
                      key: b.index,
                      "segment-data": N.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ]),
            (h(!0), y(me, null, Ae(O.value, (se, j) => {
              var pe;
              return h(), y("div", {
                key: ((pe = se == null ? void 0 : se[0]) == null ? void 0 : pe.section) + j
              }, [
                se ? (h(), ue(V3, {
                  key: 0,
                  charts: se || [],
                  tags: k.value.tags || []
                }, null, 8, ["charts", "tags"])) : B("", !0)
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
    const a = D, S = en(), k = tr(), U = o, N = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], V = M("standard"), O = M(N[0]), F = M(!1), b = M(null);
    function g(se) {
      b.value = se, F.value = !0;
    }
    function L() {
      a("close");
    }
    function q(se) {
      a("insertSegment", se);
    }
    function re() {
      F.value = !1;
    }
    return yn(() => {
      S.set_brandId(U.brandId), S.set_token(U.token), S.set_tenantId(U.tenantId), S.set_baseUrl(U.baseUrl), k.set_customSegmentUrl(U.customSegmentUrl), V.value = S.get_activeTab;
    }), (se, j) => (h(), ue(C(pl), {
      onClose: L,
      size: "large"
    }, {
      header: It(() => [
        F.value ? B("", !0) : (h(), y("div", lg, [
          j[1] || (j[1] = p("div", { class: "header" }, [
            p("h4", null, "Segment Manager")
          ], -1)),
          H(C(r2), {
            tabs: N,
            modelValue: O.value,
            "onUpdate:modelValue": j[0] || (j[0] = (pe) => O.value = pe),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        F.value ? (h(), y("div", og, [
          p("div", {
            onClick: re,
            class: "navigation"
          }, [
            H(C(Lt), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            j[2] || (j[2] = p("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          p("div", ug, [
            j[3] || (j[3] = p("div", { class: "discovery-header-title" }, [
              p("h6", null, "Segment Manager"),
              p("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ], -1)),
            H(C(et), { label: "Go to activation" })
          ])
        ])) : B("", !0)
      ]),
      body: It(() => [
        O.value.id === 1 && !F.value ? (h(), ue(cm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: q,
          onShowInsightsExplorer: g,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: b.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : B("", !0),
        O.value.id === 2 && !F.value ? (h(), ue(m3, {
          key: 1,
          onInsertSegment: q,
          onShowInsightsExplorer: g,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : B("", !0),
        F.value ? (h(), ue(sg, { key: 2 })) : B("", !0)
      ]),
      _: 1
    }));
  }
}, _g = /* @__PURE__ */ qe(cg, [["__scopeId", "data-v-80068011"]]);
export {
  _g as BetaSegmentManagerModal,
  m3 as CustomSegments,
  sg as ExploreInsights,
  cm as StandardSegments,
  tr as useCustomSegmentStore,
  en as useSegmentManagerStore
};
